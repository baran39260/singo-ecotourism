# Design — 1-foundation

این سند **تصمیمات فنی** غیر-پیش‌پا افتاده این پروپوزال را ثبت می‌کند. چیزهایی که در proposal.md فقط اشاره شده اند، اینجا تفصیل و دلیل‌شان می‌آید.

---

## Decision 1: اجبار مرز core / overrides با ESLint، نه فقط قاعده اجتماعی

### Context

مرز `src/core/` قفل و `src/overrides/` باز، **ستون فقرات مدل کسب‌وکار** است. اگر مشتری Premium کد هسته را دست‌کاری کند، آپدیت نسخه بعدی کل سایتش را می‌شکند و بار پشتیبانی روی ما می‌افتد.

### Options

- **الف) فقط مستندسازی و اعتماد** — در README بنویسیم «core را دست نزن». ❌ رد: انسان فراموش می‌کند، مشتری دیو دست‌به‌دست می‌شود، ما قرارداد را نمی‌توانیم اثبات کنیم.
- **ب) ESLint rule سفارشی + تست CI** — هر PR که قانون را نقض کند، CI فیل می‌شود. ✅ انتخاب.
- **ج) پکیج‌بندی core به‌صورت npm package جداگانه** — ایزوله‌سازی در سطح build. عالی است ولی پیچیدگی monorepo می‌آورد که در نسخه ۰.۳ PROJECT.md رد شد.

### Decision

**ب + آماده‌شدن برای ج در پروپوزال ۸.**

دو rule سفارشی:

1. `singo/no-core-internal-leak` — فایل‌های درون `core/` نباید از `overrides/` import کنند.
2. `singo/overrides-stable-api` — فایل‌های درون `overrides/` فقط می‌توانند از سطح root `core/` import کنند (نه از زیرپوشه‌های داخلی). این باعث می‌شود API سطحی core پایدار باشد.

در پروپوزال ۸ (محصول‌سازی)، اگر نیاز شد core را به پکیج جدا ببریم، این مرز قبلاً در کد اجرا شده و مهاجرت آسان می‌شود.

### Risks

- نوشتن ESLint rule سفارشی زمان می‌برد (~۴ ساعت). ارزش دارد.
- ممکن است edge case پیدا شود. با تست unit پوشش می‌دهیم.

---

## Decision 2: `site.config.ts` با Zod schema، نه JSON

### Context

کانفیگ مشتری باید هم **type-safe** باشد (تا در dev خطا بخوریم) و هم **قابل اعتبارسنجی در runtime** (تا هنگام deploy مشتری، اگر فیلدی جا افتاد، واضح error بدهد).

### Options

- **الف) JSON + TypeScript type** — ساده ولی runtime validation دستی می‌خواهد.
- **ب) TS فایل با as const + Zod infer** — هم dev-time، هم runtime validation خودکار. ✅
- **ج) YAML + code-gen** — قابل ویرایش برای non-dev، ولی toolchain سنگین‌تر.

### Decision

**ب**. `site.config.ts` یک object تایپ‌دار export می‌کند، Zod schema در `src/lib/config-schema.ts` تعریف می‌شود، و در `src/lib/get-site-config.ts` در startup parse می‌شود.

```ts
// مفهومی
const raw = siteConfigRaw;
const config = siteConfigSchema.parse(raw); // runtime error if invalid
```

### Consequences

- مشتری که non-dev است، باید یاد بگیرد فایل TS ادیت کند. **قابل قبول** چون راه‌اندازی توسط تیم سینگو انجام می‌شود (طبق بخش ۱۱ PROJECT.md).
- در پروپوزال ۲ که پنل ادمین اضافه می‌شود، بخشی از کانفیگ (مثل phone, address) از DB خوانده می‌شود، نه `site.config.ts`. مرز دقیق در پروپوزال ۲ تعیین می‌شود.

---

## Decision 3: Theming با Tailwind v4 `@theme inline` + inline `<style>`

### Context

سند نسخه ۰.۳ Tailwind v4 را تصویب کرده. باید روشن کنیم دقیقاً چطور `primaryColor` از config به UI می‌رسد.

### Mechanism

1. در `app/layout.tsx` سرور:

   ```tsx
   const config = await getSiteConfig();
   const theme = generateTheme(config.brand.primaryColor);
   // theme = { primary: '#17A2B8', primaryHover: '#...', primaryMuted: '#...', ... }

   return (
     <html lang="fa" dir="rtl">
       <head>
         <style dangerouslySetInnerHTML={{ __html: `
           :root {
             --brand-primary: ${theme.primary};
             --brand-primary-hover: ${theme.primaryHover};
             --brand-primary-muted: ${theme.primaryMuted};
             ...
           }
         ` }} />
       </head>
       ...
   ```

2. در `globals.css`:

   ```css
   @theme inline {
     --color-primary: var(--brand-primary);
     --color-primary-hover: var(--brand-primary-hover);
     ...
   }
   ```

3. در کامپوننت‌ها: `className="bg-primary hover:bg-primary-hover"`.

### Cache Concerns

اگر Home با PPR به‌صورت static prerender شود، CSS inline هم static می‌شود. تغییر `primaryColor` در config **بعد از build** تا redeploy اعمال نمی‌شود. این قابل قبول است چون:

- در مدل تک-مستاجری، تغییر برند یک عملیات نادر است
- مشتری پس از تغییر برند، پروژه را rebuild می‌کند (توسط تیم ما یا Managed Hosting)

اگر در پروپوزال بعدی نیاز به تغییر runtime رنگ از پنل ادمین شد، rebuild webhook‌محور با `revalidateTag` پیاده می‌شود.

### Alternatives rejected

- **CSS-in-JS (Emotion/styled-components):** bundle overhead، تداخل با RSC، ناسازگار با SSG.
- **Variables only در JS و inline style روی کامپوننت‌ها:** class reuse نمی‌شود، Tailwind bypass می‌شود.

---

## Decision 4: Auth.js v5 Split Config

### Context

Auth.js v5 به‌دلیل محدودیت‌های Edge Runtime روی Vercel/لیارا، توصیه رسمی دارد که config را به دو فایل تقسیم کنیم. اگر این را از روز اول اشتباه بسازیم، فاز ۳ (پروپوزال رزرو) مجبور به بازسازی می‌شود.

### Structure

```ts
// src/lib/auth.config.ts — edge-safe
export default {
  providers: [
    // فقط declaration، بدون DB call
    Credentials({ id: 'otp', credentials: { ... }, authorize: async () => null }),
  ],
  pages: { signIn: '/login' },
  callbacks: {
    authorized({ auth, request }) {
      // فقط path check، بدون DB
      const isProtected = request.nextUrl.pathname.startsWith('/owner');
      return !isProtected || !!auth?.user;
    },
  },
} satisfies NextAuthConfig;
```

```ts
// src/lib/auth.ts — Node runtime
import authConfig from './auth.config';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from './db';

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  session: { strategy: 'database' }, // پیشنهاد کارشناس: برای suspend کردن سریع
  providers: [
    // authorize واقعی با DB call
    Credentials({
      id: 'otp',
      credentials: { phone: {}, code: {} },
      authorize: async (creds) => {
        // mock در این پروپوزال؛ کاوه‌نگار واقعی در پروپوزال ۲
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.role = user.role;
      session.user.id = user.id;
      return session;
    },
  },
});
```

```ts
// src/middleware.ts — edge
import NextAuth from 'next-auth';
import authConfig from './lib/auth.config';
export default NextAuth(authConfig).auth;
export const config = { matcher: ['/owner/:path*', '/admin/:path*'] };
```

### Why DB session (not JWT)

کارشناس Next.js توصیه کرد: در صورت نیاز به revoke فوری کاربر (مثلاً owner تعلیق)، DB session مستقیماً اثر می‌کند؛ JWT باید منتظر expire باشد. برای محصولی که فروشنده کنترل دارد، این امنیت بیشتر است.

### Trade-off

DB session یک DB query اضافه روی هر request دارد. با توجه به scale تک-مستاجری (حداکثر چند صد کاربر فعال در یک سایت)، **ناچیز** است.

---

## Decision 5: OTP Mock Provider در این پروپوزال

### Context

اتصال واقعی کاوه‌نگار نیازمند API key است و تست‌ها نباید پیامک واقعی بفرستند. از طرف دیگر، فلوی کامل OTP باید در این پروپوزال کار کند تا پروپوزال‌های بعدی بر آن سوار شوند.

### Decision

یک Provider `OtpMockProvider` در `src/core/auth/otp-mock-provider.ts` که:

- در dev/test: کد ثابت `123456` برای همه شماره‌ها معتبر است
- کد را در کنسول لاگ می‌کند
- رابط `SmsClient` دارد که در پروپوزال ۲ با کاوه‌نگار جایگزین می‌شود

این رابط از همین الان در `src/core/notifications/sms-client.ts` تعریف می‌شود:

```ts
export interface SmsClient {
  sendOtp(phone: string, code: string): Promise<void>;
  send(phone: string, message: string): Promise<void>;
}
```

`MockSmsClient` یک پیاده‌سازی است، `KavenegarSmsClient` در پروپوزال ۲ اضافه می‌شود.

### Why not real Kavenegar now?

- افزودن dependency که در این پروپوزال تست نمی‌شود، YAGNI است
- API key مدیریت نشده باعث leak در repo می‌شود
- مرز پروپوزال‌ها باید پاک باشد

---

## Decision 6: PPR فعال از روز اول

### Context

PPR در Next.js 15 از experimental خارج شده ولی هنوز opt-in است. اگر از روز اول فعال نکنیم، فاز‌های بعدی (به‌خصوص صفحه Home با تستیمونیال dynamic و اقامتگاه‌های dynamic) مجبور به refactor می‌شوند.

### Decision

```ts
// next.config.ts
export default {
  experimental: { ppr: 'incremental' },
};
```

`incremental` (نه `true`) یعنی باید صریحاً در هر صفحه `export const experimental_ppr = true` بگذاریم. این کنترل دقیق‌تر می‌دهد و ریسک regression را کاهش می‌دهد.

در این پروپوزال، فقط `/` (Home) PPR می‌گیرد. بقیه صفحات static معمولی هستند.

---

## Decision 7: seed data برای Owner/Admin در dev

### Context

وقتی توسعه‌دهنده locally پروژه را می‌آورد، باید بدون ثبت‌نام دستی بتواند به `/owner` و `/admin` برود.

### Decision

`prisma/seed.ts`:

- ۱ کاربر ADMIN با شماره `09000000001` و کد OTP ثابت
- ۱ کاربر OWNER با شماره `09000000002`
- ۱ کاربر GUEST با شماره `09000000003`

seed فقط در `NODE_ENV=development` اجرا می‌شود؛ در production تیم راه‌اندازی مشتری، کاربر ADMIN واقعی را دستی می‌سازد (در پروپوزال ۸ ابزار CLI اضافه می‌شود).

---

## Decision 8: Lighthouse ≥ ۹۰ به‌عنوان gate

### Context

کارشناس صنعت تأکید کرد که **کیفیت سایت دمو** نقش حیاتی در فروش دارد. اگر از همان ابتدا Lighthouse Performance پایین باشد، فاز‌های بعدی با بار اضافه شروع می‌شوند.

### Decision

CI اگر Lighthouse < ۹۰ بود، PR را مسدود می‌کند. معیار Performance و Accessibility هر دو.

ابزار: `@lhci/cli` در GitHub Actions، روی `/` و `/about` و `/contact`.

---

---

## Decision 9: تفکیک «Showcase» از «Template» در پروپوزال‌ها

### Context

در ارزیابی کارشناسی، ایراد بحرانی کشف شد: هدف اصلی کاربر دو چیز است که با هم تنش دارند:

- **سایت نمونه** که باید **خیره‌کننده باشد** و مشتری را به خرید قانع کند (ویترین فروش)
- **تمپلیت قابل تکرار** که باید **ساده برای rebrand** باشد (مکانیک محصول)

اگر پروپوزال ۱ تلاش کند هر دو را همزمان ارضا کند، scope ۳ برابر می‌شود و هیچ‌کدام به کیفیت نهایی نمی‌رسد.

### Decision

**تفکیک به دو پروپوزال جدا:**

- `1-foundation` (این پروپوزال) + `2-content-management` + `3-reservation-system` + … تا `7-seo-and-map` → تمپلیت کامل و کار‌کن می‌سازند با **محتوای skeleton و عکس‌های عمومی**
- `8-showcase-content` (جدید، اضافه‌شده به project.md) → محتوای ویترین فروش را با عکاسی واقعی، تستیمونیال، داستان برند، انیمیشن‌های ویژه landing پر می‌کند
- `9-productize-template` → بسته‌بندی برای فروش
- `10-pilot-deployment` → مشتری واقعی

در `1-foundation`، Home یک skeleton کار‌کن است با متن placeholder (از i18n) و تصاویر عمومی. **هدف این فاز، «باور کردن معماری» است، نه «تکان دادن مشتری بالقوه».**

### Consequences

- فاز ۱ زودتر تمام می‌شود و پروپوزال‌های بعدی blocked نمی‌شوند
- فاز ۸ (محتوای ویترین) بعد از SEO و نقشه می‌آید، پس می‌تواند واقع‌بینانه و هدف‌مند طراحی شود
- ریسک: اگر فاز ۸ فراموش/تأخیر شود، سایت دمو هیچ‌وقت جذاب نمی‌شود. **کاهش:** acceptance criteria پروپوزال ۹ (محصول‌سازی) اجازه نمی‌دهد بدون ۸ جلو برود

---

## Decision 10: i18n scaffolding از روز اول (حتی با فقط فارسی)

### Context

در `site.config.ts` فیلد `features.multilingual: boolean` داریم. اگر foundation همه متون را inline فارسی hardcode کند، فعال کردن multilingual در پروپوزال بعدی نیازمند **۸۰ ساعت refactor** است (هر کامپوننت باید بازنویسی شود).

### Decision

**`next-intl` از همین foundation نصب و فعال می‌شود**، ولی فقط `fa` فعال است (`features.multilingual: false`).

فایل `messages/fa.json` تنها منبع حقیقت متون. هیچ متن فارسی در JSX خام. یک ESLint rule سفارشی (`no-hardcoded-fa-strings`) با warning (نه error) به تدریج همه موارد را پاک می‌کند.

### Cost-benefit

- **هزینه در این فاز:** ~۶-۸ ساعت نصب + نوشتن کلیدها برای متون این فاز
- **صرفه‌جویی در آینده:** ~۷۰-۸۰ ساعت اگر multilingual فعال شود
- **Bundle cost:** next-intl با یک locale ~۵KB gzipped — ناچیز

### Alternatives rejected

- **شروع با hardcode و refactor بعدی:** تجربه گذشته نشان می‌دهد این refactor همیشه به ۳-۴ برابر تخمین می‌رسد.
- **i18next:** سنگین‌تر، SSR integration پیچیده‌تر.

---

## Decision 11: SEO پایه در foundation، SEO پویا در پروپوزال ۷

### Context

در نسخه ۱ پروپوزال، تمام SEO به پروپوزال ۷ معوق شده بود. ارزیابی کارشناسی نشان داد این اشتباه است چون:

- سایت دمو در پایان پروپوزال ۱ می‌تواند روی staging/staging-domain deploy شود
- اگر بدون SEO پایه deploy شود، Google بدون metadata ایندکس می‌کند
- تغییر بعدی meta tags باعث «thrashing» در Search Console می‌شود

### Decision

**مرز دقیق بین پروپوزال ۱ (پایه) و پروپوزال ۷ (پویا):**

پروپوزال ۱ شامل:

- `generateMetadata` در هر صفحه با خواندن از config (title, description, OG image)
- Favicon و Apple icon
- `opengraph-image.tsx` با `ImageResponse` (fallback ساده بر پایه brand color)
- `robots.txt` استاتیک

پروپوزال ۷ شامل:

- sitemap پویا per-listing
- JSON-LD `LodgingBusiness` schema.org
- OG images دینامیک per listing
- robots پویا با قوانین پیچیده

### Consequences

- فاز ۱ کمی سنگین‌تر می‌شود (~۱ روز کار اضافه)
- سایت staging از همان روز ۱ درست ایندکس می‌شود
- پروپوزال ۷ تمیزتر می‌شود (فقط به pageهای dynamic ربط دارد)

---

## Decision 12: Rate Limiting از روز اول روی OTP

### Context

OTP endpoint بدون rate limit = **نقطه ورود حمله SMS bombing**. حتی با mock، اگر الگو از روز اول درست نباشد، هنگام اتصال به کاوه‌نگار در پروپوزال ۲، هزینه واقعی پیامک منفجر می‌شود.

### Decision

- پکیج: `@upstash/ratelimit` با Redis backend
- `NODE_ENV=development`: in-memory fallback (بدون نیاز به Redis)
- `NODE_ENV=production`: Redis واجب؛ اگر `RATE_LIMIT_REDIS_URL` نبود، startup fail می‌شود
- دو پروفایل پیش‌فرض:
  - `otp`: ۳ درخواست در ۶۰ ثانیه per IP + per phone (هر کدام زودتر رسید)
  - `api`: ۶۰ درخواست در ۶۰ ثانیه per IP
- پاسخ: HTTP 429 با header `Retry-After: <seconds>` و JSON `{ error: "RATE_LIMIT_EXCEEDED", retryAfter }`

### Why per-IP AND per-phone?

فقط per-IP: مهاجم با چندین IP دور می‌زند و یک شماره قربانی را با ۱۰۰ SMS بمباران می‌کند
فقط per-phone: مهاجم با یک IP چندین شماره مختلف را تست می‌کند (enumeration)
هر دو کلید، دفاع در عمق

### Consequences

- dev experience: ۳ بار OTP ارسال، ثانیه ۶۱ دوباره — منطقی
- نیاز به Redis در prod: **قابل قبول**، Upstash free tier کافی است

---

## Decision 13: Sentry Scaffolding در foundation، DSN اختیاری در dev

### Context

خطاهای runtime در production، بدون monitoring، **نامرئی** هستند. اگر Sentry در پروپوزال‌های بعدی اضافه شود، خطاهای قبلی از دست می‌روند. از طرف دیگر، در dev نیازی به DSN واقعی نداریم.

### Decision

- `@sentry/nextjs` در foundation نصب و پیکربندی می‌شود
- DSN از `SENTRY_DSN` env خوانده می‌شود
- در dev: اگر DSN نباشد، Sentry silent می‌ماند (فقط console log)
- در prod: اگر DSN نباشد، startup یک warning بزرگ می‌دهد (نه crash، چون شاید مشتری عمداً نمی‌خواهد)
- خطاها با tag `brand.slug` از config ارسال می‌شوند تا در پنل Sentry بتوان بین مشتریان فیلتر کرد (مفید در Managed Hosting که یک حساب Sentry چندین مشتری را پوشش می‌دهد)
- `app/error.tsx` و `app/global-error.tsx` با UI سفارشی فارسی

### Alternatives rejected

- **Rollbar / Bugsnag:** Sentry در صنعت ایران آشناتر است
- **Console-only logging:** بی‌فایده در prod
- **Self-hosted Sentry:** تصمیم به تعویق می‌افتد تا پروپوزال Managed Hosting

---

## Decision 14: Asset Strategy — کجا عکس/لوگو/فونت بگذاریم

### Context

در نسخه ۱ پروپوزال، منشأ دارایی‌ها (لوگو، تصاویر Home، فونت) مشخص نبود.

### Decision

**سه سطح:**

- **فونت (ثابت برای همه مشتریان):** از `next/font/local` با فایل‌های در `src/fonts/`. ایران‌سانس یا وزیرمتن.
- **لوگو و Favicon (متغیر per مشتری):** در `public/brand/logo.svg` و `public/brand/favicon.png`. در `site.config.ts` مسیر ارجاع داده می‌شود. مشتری این فایل‌ها را جایگزین می‌کند.
- **تصاویر Home/Hero (متغیر per مشتری):** در این فاز از Unsplash (عکس آزاد) با attribution در `docs/ASSETS.md`. در پروپوزال ۲، آپلود از پنل ادمین جایگزین می‌شود.

### Arvan S3 کِی وارد می‌شود؟

پروپوزال ۲ (content-management). در این پروپوزال هیچ upload در runtime نیست؛ همه assetها build-time هستند.

---

## Decision 15: Migration Strategy — Expand-Contract از روز اول

### Context

چون هر مشتری یک دیتابیس مستقل دارد، به‌روزرسانی از v1.0 به v1.1 باید **بدون downtime و بدون data loss** باشد. تنها راه: الگوی expand-contract.

### Decision

حتی در این فاز که یک migration اول است، قاعده را در `docs/ARCHITECTURE.md` و `openspec/project.md` ثبت می‌کنیم:

1. **افزودن فیلد اجباری ممنوع:** همیشه nullable → backfill → NOT NULL در migration بعدی
2. **حذف ستون ممنوع در یک نسخه:** deprecate → stop writing → حذف در ≥ ۲ نسخه بعد
3. **تغییر نام ستون ممنوع:** ستون جدید → migrate data → حذف قدیمی در چند مرحله
4. **هر migration باید `down` داشته باشد** مگر فیزیکی غیرممکن

این قاعده در CI هم چک می‌شود (ESLint rule یا Prisma lint).

---

---

## Decision 16: ساختار Feature-Sliced به جای layer-based

### Context

ساختار اولیه `src/components`, `src/lib`, `src/app` (layer-based) برای پروژه‌های کوچک خوب است. اما این محصول قرار است در ۱۰ فاز رشد کند: booking, payment, compliance, content, owner-panel، …

### Options

- **الف) Layer-based:** `components/`, `services/`, `repositories/` در سطح بالا. → پس از ۵ feature، هر تغییر باید در ۴ پوشه دنبال شود. spaghetti.
- **ب) Feature-Sliced:** هر feature یک فولدر مستقل با لایه‌بندی داخلی. ✅ انتخاب.
- **ج) DDD سختگیرانه (Clean Architecture):** Aggregateها، Value Objects، Domain Events. → برای تیم ۲ نفره overkill.

### Decision

ساختار feature-sliced از روز اول در پروپوزال foundation معرفی می‌شود. در این فاز تنها feature `auth` است (که کوچک است)، ولی پوشه‌بندی استاندارد همان موقع تثبیت می‌شود تا پروپوزال ۲ روی الگوی موجود سوار شود.

### Implementation در پروپوزال ۱

```
src/
├── app/                          روتینگ Next.js
├── features/
│   └── auth/                     تنها feature این فاز
│       ├── components/
│       ├── server/
│       │   ├── actions.ts        signUp, verifyOtp, signOut Server Actions
│       │   ├── queries.ts        getCurrentUser
│       │   └── repository.ts     UserRepository (Prisma wrapper)
│       ├── services/             AuthService با business logic
│       ├── schemas/              loginSchema, signupSchema (Zod)
│       ├── types.ts
│       └── index.ts              public API
├── core/                         قفل، شامل cross-cutting
│   ├── clients/                  interfaces + implementations برای SMS, …
│   ├── errors/                   AppError, errorCodes
│   ├── logger/
│   ├── result/                   Result type utility
│   └── security/                 rate-limit, csrf
├── overrides/
├── components/ui/                shadcn (shared، neutral)
├── components/layout/            Navbar, Footer (shared)
└── lib/                          هیچ business logic — فقط helpers
    ├── db.ts
    ├── auth.ts
    ├── auth.config.ts
    ├── get-site-config.ts
    └── theme.ts
```

ESLint rule جدید: `singo/no-feature-internal-import` — جلوگیری از import به مسیر داخلی feature (فقط از index.ts).

---

## Decision 17: Server Actions به‌عنوان الگوی پیش‌فرض mutation

### Context

Next.js 15 + React 19 الگوی Server Actions را بالغ کرده. سال ۲۰۲۶ هر mutation از طریق REST API نوشتن آنتی‌پترن است (مگر برای webhooks).

### Decision

**در این پروپوزال:**

- `signUp`, `verifyOtp`, `signOut` همه Server Action با `useActionState`
- `submitContactForm` Server Action
- API Route فقط برای `/api/auth/[...nextauth]` (واجب توسط Auth.js)

**قاعده عمومی برای همه پروپوزال‌ها:** mutations → Server Action، queries → RSC + service، REST → فقط webhooks/callbacks.

### الگوی Server Action

```ts
// features/auth/server/actions.ts
'use server';
export async function signUpAction(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = signupSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { ok: false, fieldErrors: parsed.error.flatten() };

  const result = await authService.signUp(parsed.data);
  if (!result.ok) return { ok: false, error: result.error.message };

  revalidatePath('/');
  return { ok: true, data: result.data };
}
```

UI با `useActionState`:

```tsx
const [state, formAction, isPending] = useActionState(signUpAction, initialState);
```

### Why not tRPC?

- Server Actions حالا feature بومی است
- یک abstraction کمتر
- برای محصولی که public API ندارد، tRPC سرریز است

---

## Decision 18: Result Type با AppError

### Context

JavaScript exception به‌عنوان control flow ضدالگو است:

- در type system دیده نمی‌شود (تابع `Promise<User>` ممکن است throw کند، caller نمی‌داند)
- در تست سخت پوشش داده می‌شود
- در Server Actions با Server↔Client serialization مشکل دارد

### Decision

الگوی Result که در `src/core/result/index.ts` تعریف می‌شود:

```ts
export type Result<T, E = AppError> = { ok: true; data: T } | { ok: false; error: E };

export const ok = <T>(data: T): Result<T> => ({ ok: true, data });
export const err = <E>(error: E): Result<never, E> => ({ ok: false, error });

export class AppError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly statusCode: number = 400,
    public readonly meta?: Record<string, unknown>,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

// کدهای خطا در src/core/errors/codes.ts
export const ErrorCode = {
  VALIDATION_FAILED: 'VALIDATION_FAILED',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  INVALID_OTP: 'INVALID_OTP',
  // ...
} as const;
```

### کاربرد

- **Service و Repository:** همیشه Result برمی‌گرداند (مگر برای read کوچک که not-found واقعاً غیرعادی است؛ در آن صورت throw می‌شود و Sentry می‌گیرد)
- **Server Action:** Result را به `ActionState` تبدیل می‌کند که سریالایز می‌شود به client
- **RSC query:** اگر Result.ok=false باشد، یا fallback UI یا redirect/notFound

### When to throw still

- DB connection lost
- Third-party crash (Sentry می‌گیرد)
- Programmer error (`assert` که نباید رخ دهد)

---

## Decision 19: Repository / Service / Action سه‌لایه

### Context

بدون لایه‌بندی، در پروپوزال ۳ که state machine رزرو ۸ حالت دارد، business logic در Server Action ۳۰۰ خطی می‌شود. تست واحد غیرممکن.

### Decision

سه لایه با مسئولیت‌های دقیق در هر feature:

#### Repository (`features/<f>/server/repository.ts`)

- فقط Prisma calls
- متدهایی مثل `findById`, `findByPhone`, `create`, `update`
- **خروجی domain type** (نه Prisma type خام)
- **هیچ business logic، هیچ validation، هیچ تماس خارجی**

```ts
// features/auth/server/repository.ts
export const userRepository = {
  async findByPhone(phone: string): Promise<User | null> {
    const row = await db.user.findUnique({ where: { phone } });
    return row ? toUser(row) : null;
  },
  async create(input: UserCreateInput): Promise<User> {
    const row = await db.user.create({ data: input });
    return toUser(row);
  },
};
```

#### Service (`features/<f>/services/`)

- Business logic، orchestration
- استفاده از یک یا چند repository
- استفاده از client interfaces (SmsClient, …)
- برمی‌گرداند `Result<T, AppError>`
- **هیچ Prisma direct call، هیچ Next.js import**

```ts
// features/auth/services/auth-service.ts
export class AuthService {
  constructor(
    private users: typeof userRepository,
    private sms: SmsClient,
    private rateLimit: RateLimiter,
  ) {}

  async sendOtp(phone: string): Promise<Result<{ expiresAt: Date }>> {
    const limited = await this.rateLimit.check(`otp:${phone}`);
    if (limited) return err(new AppError('RATE_LIMIT_EXCEEDED', '...'));

    const code = generateOtp();
    await this.users.upsertOtp(phone, code);
    await this.sms.sendOtp(phone, code);
    return ok({ expiresAt: addMinutes(new Date(), 2) });
  }
}
```

#### Server Action / RSC query

- Validation با Zod
- صدا زدن service
- تبدیل Result به ActionState یا UI

### Why constructors / classes?

برای DI و mock کردن در تست. اگر کلاس اضافی نخواستید، factory function هم قابل قبول است:

```ts
export const authService = createAuthService(userRepository, smsClient, rateLimiter);
```

---

## Decision 20: Pino برای Structured Logging

### Context

بدون لاگ ساختاریافته، debug کردن مشکلات production کابوس است. Sentry فقط errors می‌گیرد، نه info/debug/audit.

### Decision

- پکیج: `pino` + `pino-pretty` در dev
- در `src/core/logger/index.ts` یک instance singleton
- در dev: pretty-print با رنگ
- در prod: JSON یک‌خطی (مناسب CloudWatch/Datadog/Loki)
- request ID propagation با `AsyncLocalStorage` (در Node 20+ بومی)
- ESLint rule: `no-console` در `src/` (فقط در tests و scripts مجاز)

```ts
// src/core/logger/index.ts
import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL ?? (isDev ? 'debug' : 'info'),
  transport: isDev ? { target: 'pino-pretty' } : undefined,
  base: { env: process.env.NODE_ENV, brand: getSiteConfig().brand.slug },
});

// helper برای request-scoped logger
export function getRequestLogger() {
  const reqId = requestContext.getStore()?.requestId;
  return reqId ? logger.child({ reqId }) : logger;
}
```

### Sentry integration

خطاها همزمان به Pino (برای متن قابل grep) و Sentry (برای aggregation و alert) می‌روند:

```ts
catch (e) {
  logger.error({ err: e }, 'Operation failed');
  Sentry.captureException(e);
}
```

### Audit log

عملیات حساس (login, signup, role change, owner panel mutation) با `logger.info({ event: 'audit', action: 'login', userId })` ثبت می‌شوند تا قابل query باشند.

---

## Decision 21: Dependency Injection با Container ساده

### Context

الگوی `SmsClient` interface از قبل بود. باید این الگو را یک‌جا برای **همه** clientهای خارجی متمرکز کنیم.

### Decision

در `src/core/clients/` همه interfaceها:

```
src/core/clients/
├── sms/
│   ├── sms-client.ts          interface
│   ├── mock-sms-client.ts     پیاده‌سازی dev/test
│   └── kavenegar-sms-client.ts (در پروپوزال ۲)
├── storage/
│   ├── storage-client.ts      interface (آماده برای پروپوزال ۲)
├── payment/                    آماده برای پروپوزال ۵
├── whatsapp/                   آماده برای پروپوزال ۶
└── notification/
```

در `src/lib/container.ts` factory ساده:

```ts
let _container: AppContainer | null = null;

export function container(): AppContainer {
  if (_container) return _container;
  _container = {
    smsClient: createSmsClient(),
    storageClient: createStorageClient(),
    rateLimiter: createRateLimiter(),
    logger: logger,
  };
  return _container;
}

function createSmsClient(): SmsClient {
  if (process.env.NODE_ENV === 'development' && !process.env.KAVENEGAR_API_KEY) {
    return new MockSmsClient();
  }
  return new KavenegarSmsClient(process.env.KAVENEGAR_API_KEY!);
}
```

Service ها از container می‌گیرند:

```ts
const auth = new AuthService(userRepository, container().smsClient, container().rateLimiter);
```

در تست container override می‌شود.

### Alternatives rejected

- **InversifyJS / tsyringe:** decorator-heavy، overkill برای این scale
- **Manual passing everywhere:** prop drilling در سطح backend

---

## Decision 22: قراردادهای کد و VSCode workspace

### Context

بدون قرارداد صریح، هر توسعه‌دهنده استایل خودش را می‌نویسد → review اصطکاک می‌گیرد، diff شلوغ می‌شود.

### Decision

- **`.vscode/settings.json`** در repo: format on save، ESLint auto-fix، import organize on save
- **`.vscode/extensions.json`** با لیست توصیه‌شده: ESLint, Prettier, Tailwind CSS, Prisma, Error Lens
- **Prettier config** قطعی: 2 space, single quote, trailing comma all, 100 char width
- **ESLint config** بر پایه `next/core-web-vitals` + قواعد سفارشی:
  - `singo/no-core-internal-leak`
  - `singo/overrides-stable-api`
  - `singo/no-feature-internal-import`
  - `singo/no-hardcoded-fa-strings`
  - `no-console` (فقط warn در tests)
  - `@typescript-eslint/no-explicit-any` (error)
  - `@typescript-eslint/no-non-null-assertion` (warn)
  - `import/order` با گروه‌بندی استاندارد
- **Conventional Commits** با commitlint + commitizen
- **PR template** در `.github/PULL_REQUEST_TEMPLATE.md` با چک‌لیست (testها سبز؟ مرز core رعایت؟ spec آپدیت؟)

این موارد در tasks.md بخش جدید «۱۶. DX و قراردادها» اضافه می‌شوند.

---

## Decision 23: Cache Components به جای PPR (Next.js 16)

### Context

در plan اولیه (نوشته‌شده برای Next.js 15)، تصمیم بر استفاده از **PPR incremental** بود (تصمیم ۶ بالا). اما در زمان scaffolding، `pnpm create next-app@latest` نسخه ۱۶.۲.۴ را آورد. در Next.js 16:

- فلگ `experimental.ppr` **حذف** و با `cacheComponents: true` جایگزین شده
- این فلگ یکپارچه `useCache`, `dynamicIO`, و PPR را کنترل می‌کند
- مرجع: `node_modules/.pnpm/next@16.2.4/.../docs/.../cacheComponents.md`

### Paradigm Shift

|                 | PPR (Next.js 15)                       | Cache Components (Next.js 16)              |
| --------------- | -------------------------------------- | ------------------------------------------ |
| پیش‌فرض صفحه    | static                                 | **dynamic**                                |
| برای دیگر حالت  | `export const experimental_ppr = true` | `'use cache'` directive                    |
| دکوراسیون scope | per page                               | per page / function / component            |
| Activity API    | ندارد                                  | دارد (state preservation هنگام navigation) |

این یک **inversion of default** است و روی همه پروپوزال‌های آینده اثر دارد.

### Decision

- در `next.config.ts`: `cacheComponents: true` فعال
- در tasks مرتبط با صفحات با محتوای cacheable (`/`, `/about`, `/rooms/[slug]`, `/blog/[slug]`)، در ابتدای فایل page باید `'use cache'` آمده باشد
- `cacheTag(...)` و `cacheLife(...)` برای کنترل invalidation و TTL استفاده می‌شوند
- صفحاتی که نیاز به session دارند یا واقعاً dynamic هستند (`/owner/*`, `/dashboard`) — هیچ directive لازم ندارند (پیش‌فرض dynamic)

### Implication روی پروپوزال‌های بعدی

تصمیم ۴ پروپوزال ۲ (PPR + ISR per room/blog) به این صورت **به‌روز می‌شود**:

- `generateStaticParams` همچنان لیست aktif rooms را برمی‌گرداند
- در فایل `app/(site)/rooms/[slug]/page.tsx`، خط اول `'use cache'`
- `cacheTag('room:'+slug)` در `getRoom(slug)` query
- `cacheLife({ stale: 3600 })` به‌جای `revalidate: 3600`
- `revalidateTag('room:'+slug)` در `updateRoomAction` بدون تغییر کار می‌کند

این به‌روزرسانی در پروپوزال ۲ هنگام ورود به آن فاز اعمال می‌شود.

### Trade-off

- **+** API یکپارچه‌تر (یک فلگ به جای سه)
- **+** کنترل granular در سطح component (نه فقط page)
- **+** Activity API برای حفظ state در navigation
- **−** ذهنیت توسعه‌دهنده باید عوض شود (paradigm shift)
- **−** در ابتدا اشتباهات احتمالی (فراموشی `'use cache'` → کندی)

### Mitigation

- در `docs/ARCHITECTURE.md` (task 16.5) یک بخش روشن درباره الگوی `'use cache'` بنویسیم
- در PR template چک‌لیست: «اگر صفحه ساکن است، `'use cache'` گذاشته‌ای؟»
- در آینده، یک ESLint rule سفارشی که صفحات بدون `'use cache'` و بدون اشاره به session را warn کند

---

## Decision 24: مرز معماری — رفتار قاعده‌های ESLint سفارشی

### Context

پس از پیاده‌سازی بخش ۲ و مرور کارشناسی، چند سؤال طراحی روی plugin سفارشی
(`tools/eslint-plugin-singo/`) باز ماند که باید به‌صورت رسمی پاسخ داده شوند.

### Decision

#### الف) Scope مرز core

`singo/no-core-internal-leak` (در ابتدا فقط `core → overrides`) به **`core → overrides` و
`core → features`** هر دو گسترش یافت. دلیل:

- core کد cross-cutting infrastructure است (logger, errors, clients, security)
- وابستگی به overrides → آپدیت Premium می‌شکند
- وابستگی به features → core متعهد به یک domain خاص می‌شود (آنتی‌پترن)
- اگر core نیاز به business logic دارد، باید **interface در core** تعریف کند و
  feature آن را پیاده‌سازی کند (الگوی Dependency Inversion)

پیاده‌سازی: یک rule با دو `messageId` (`overrides`, `features`) و پیام فارسی متفاوت.

#### ب) Type-only imports هم block می‌شوند

این تصمیم **سختگیرانه**: حتی `import type { X } from '@/overrides/...'` block است،
نه فقط value imports. دلیل:

- type-only imports زمان اجرا حذف می‌شوند، **ولی coupling compile-time دارند**
- اگر type در overrides تغییر کند، core ‌build فیل می‌شود → معماری شکست خورد
- intent معماری «هیچ آگاهی از overrides در core» است، نه فقط «هیچ کد از overrides در core»
- تشخیص type-only در runtime ESLint پیچیده است (نیاز به TS parser)؛ پس همه
  `ImportDeclaration` و `ImportExpression` و `Export*Declaration` بدون استثنا چک می‌شوند

اگر یک case واقعی پیدا شد که type-only ضروری بود (مثلاً Conditional Type)،
exception در همان فایل با `// eslint-disable-next-line` قابل قبول است
(در PR review توجیه شود).

#### ج) Dynamic imports هم پوشش داده می‌شوند

`import('@/overrides/...')` به‌عنوان bypass، یک شکاف امنیت معماری بود.
حالا `ImportExpression` AST selector به همه ruleها اضافه شده.

استثنا: `import(variable)` که string literal نیست، قابل تحلیل static نیست
و اجباراً نادیده گرفته می‌شود (محدودیت ذاتی ESLint). اگر کسی این الگو
را برای bypass استفاده کرد، code review باید بگیرد.

#### د) Severity `overrides-stable-api` ارتقا یافت به `error`

از `warn` به `error` ارتقا یافت. دلیل:

- این مرز یک **مدل کسب‌وکار** است، نه ترجیح استایل
- اگر مشتری Premium از deep import استفاده کند، نسخه بعدی سینگو
  ممکن است سایتش را بشکند → از پوشش آپدیت خارج می‌شود
- warning در CI ignore می‌شود؛ error فیل می‌کند → دیسیپلین واقعی

#### ه) Anchor شدن paths به `/src/`

تشخیص اولیه با `path.includes('/overrides/')` آسیب‌پذیر بود
(false positive روی `node_modules/somepkg/overrides/...`). همه paths
به `/src/overrides/`, `/src/features/`, `/src/core/` anchor شدند.

#### و) Integration test با ESLint API

علاوه بر unit test با `RuleTester`, یک integration test
(`tests/integration.test.mjs`) ESLint API را برنامه‌ریزی صدا می‌زند تا
تأیید کند ruleها در `eslint.config.mjs` واقعی repo درست ثبت شده‌اند
و severity صحیح دارند. اگر فردا کسی plugin را در config اشتباه ثبت کند
یا severity را غیرعمد تغییر دهد، این test fail می‌شود.

### Trade-offs

| تصمیم                    | مزیت                                      | هزینه                                                      |
| ------------------------ | ----------------------------------------- | ---------------------------------------------------------- |
| core → features هم block | معماری clean، Dependency Inversion اجباری | اگر کسی واقعاً نیاز داشته باشد، باید refactor با interface |
| type-only block          | معماری sealed compile-time                | escape hatch با eslint-disable در موارد نادر               |
| dynamic import block     | جلوگیری از bypass عمدی                    | محدودیت در dynamic plugin loading اگر در آینده نیاز شد     |
| severity error           | CI واقعاً فیل می‌کند                      | لحظه‌ای ممکن است PR developer را بلاک کند                  |
| anchor /src/             | false positive صفر                        | هیچ                                                        |
| integration test         | regression detection                      | یک تست اضافه که باید نگه‌داری شود                          |

### Migration

پروپوزال‌های بعدی که در core کد می‌نویسند:

- اگر نیاز به دسترسی به یک feature دارند → interface در core تعریف کنند
- اگر نیاز به دسترسی به سیستم نظارت/SMS/Storage دارند → از `core/clients/` استفاده کنند
- هیچ‌گاه `import` یا `import type` به `@/features/*` یا `@/overrides/*` ننویسند

---

## Trade-offs خلاصه

| تصمیم                       | مزیت                                      | هزینه                                             |
| --------------------------- | ----------------------------------------- | ------------------------------------------------- |
| ESLint rule سفارشی          | مرز قفل از روز اول                        | ۴-۶ ساعت نوشتن + نگهداری                          |
| Zod در `site.config.ts`     | type-safe + runtime safe                  | مشتری non-dev باید TS ببیند                       |
| Tailwind v4 @theme inline   | پشتیبانی بومی CSS vars                    | v4 هنوز edge-case دارد                            |
| DB session                  | امنیت و revoke فوری                       | یک DB hit اضافه per request                       |
| OTP mock                    | ایزوله از خدمات خارجی                     | یک provider موقت که باید جایگزین شود              |
| PPR incremental             | کنترل دقیق                                | هر صفحه باید opt-in صریح داشته باشد               |
| تفکیک showcase از template  | اسکوپ هر پروپوزال تمیز                    | پروپوزال ۸ جدید اضافه شد                          |
| i18n از روز اول             | جلوگیری از refactor ۸۰ساعته               | +۶-۸ ساعت کار در این فاز                          |
| SEO پایه در foundation      | staging از روز ۱ درست ایندکس              | +۱ روز کار                                        |
| Rate limit از روز اول       | جلوگیری از SMS bombing                    | Redis در prod لازم                                |
| Sentry scaffolding          | خطاهای prod مرئی                          | +۴ ساعت setup                                     |
| Expand-contract migrations  | به‌روزرسانی مشتری بدون downtime           | هر تغییر اسکیما در چند migration                  |
| Feature-Sliced organization | scale تا ۱۰+ feature بدون spaghetti       | overhead کوچک در فاز ۱ که فقط ۱ feature دارد      |
| Server Actions به جای REST  | type safety، DX بهتر، یک abstraction کمتر | webhooks همچنان REST لازم دارند                   |
| Result type                 | type-safe error handling، تست راحت        | verbose بودن نسبت به throw                        |
| Repository/Service split    | تست unit، تعویض ORM در آینده ممکن         | یک لایه اضافه برای CRUD ساده                      |
| Pino structured logging     | debug prod ممکن، audit log داریم          | پیکربندی اولیه‌ای می‌خواهد                        |
| Container DI                | تست‌پذیری، تعویض provider                 | کمی boilerplate                                   |
| قراردادهای کد سفت           | review سریع، diff تمیز                    | adaptation اولیه برای تیم                         |
| Cache Components (Next 16)  | API یکپارچه، granular per component       | inversion of default — فراموشی `'use cache'` ممکن |

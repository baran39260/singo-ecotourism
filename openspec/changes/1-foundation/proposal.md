# Proposal: ۱ — بنیاد پروژه (Foundation)

> **وضعیت:** در حال بررسی (نسخه ۲ — پس از ارزیابی کارشناسی)
> **نویسنده:** تیم سینگو
> **تاریخ:** 2026-04-24
> **پیش‌نیاز:** بخش «Prerequisites» زیر را ببینید
> **پروپوزال‌های متکی به این:** همه پروپوزال‌های بعدی (۲ تا ۱۰)

## Prerequisites (قبل از شروع اجرا)

وضعیت تصمیمات (به‌روز شده 2026-04-25):

- [x] **برند دمو:** **برند ساختگی موقت** انتخاب شد. تصمیم نهایی ساختگی-vs-پایلوت‌واقعی به پروپوزال ۸ موکول شد. در `site.config.ts` این فاز یک نام placeholder قرار می‌گیرد.
- [~] **انتخاب هاست:** ⏸ به تأخیر افتاد — توسعه فعلاً فقط لوکال است. این تصمیم قبل از پروپوزال ۹/۱۰ گرفته می‌شود.
- [~] **دامنه staging:** ⏸ همراه با هاست به تأخیر افتاد. در این فاز فقط `localhost:3000` کافی است.
- [~] **Sentry DSN:** ⏸ به تأخیر افتاد — کد Sentry scaffold می‌شود ولی DSN در `.env.local` خالی می‌ماند. silent در dev قابل قبول است.
- [x] **GitHub repo:** ساخته شده.

### تاثیر این تأخیرها بر پروپوزال

این تصمیمات scope این پروپوزال را تغییر **نمی‌دهد**، فقط بعضی Acceptance Criteria موقتاً نرم می‌شوند:

- معیار «deploy روی staging» → جایگزین: «`pnpm build && pnpm start` لوکال بدون خطا»
- معیار «خطا در Sentry ظاهر شود (با DSN معتبر)» → جایگزین: «خطا در console لاگ شود؛ تست واقعی Sentry در فاز deploy»
- معیار «`RATE_LIMIT_REDIS_URL` در prod الزامی» → فعلاً غیرقابل اعمال؛ in-memory در dev کافی
- باقی معیارها (ESLint، تست‌ها، Lighthouse، تست خارجی راه‌اندازی) **بدون تغییر**

ساختار کد به‌گونه‌ای ساخته می‌شود که هنگام تصمیم به deploy، فقط env تنظیم شود و کار کند — بدون refactor.

---

## Why

پروژه greenfield است و هنوز هیچ کدی وجود ندارد. قبل از شروع فیچرهای بیزینسی (رزرو، پرداخت، انطباق قانونی، پنل owner)، باید یک **بنیاد فنی پایدار** بگذاریم که:

۱. تصمیمات معماری نسخه ۰.۳ سند محصول را در کد تثبیت کند
۲. **مرز core/overrides را از روز اول اجباری کند** — اگر این مرز از ابتدا درست نباشد، عقب‌نشینی در فاز محصول‌سازی (پروپوزال ۸) غیرممکن می‌شود
۳. **سیستم تم پویا مبتنی بر `site.config.ts`** را بسازد تا هر تغییر بعدی (اتاق، بلاگ، گالری) با این سیستم هم‌راستا باشد
۴. احراز هویت پایه با نقش‌های `GUEST / OWNER / ADMIN` را فراهم کند
۵. صفحات عمومی پایه (Home, About, Contact, Legal) را به‌عنوان **skeleton قابل دیدن** بسازد تا ویترین اولیه فروش داشته باشیم

بدون این بنیاد، هر پروپوزال بعدی ناچار به بازسازی زیرساخت است.

## What Changes

این پروپوزال **صرفاً** این موارد را پیاده می‌کند (محدوده دقیق، پس از ارزیابی کارشناسی گسترش یافته):

### ۱. Scaffolding فنی

- **راه‌اندازی Next.js 15 + Tailwind v4 + TypeScript strict**
- **PPR فعال (incremental)** برای صفحات عمومی
- **Prisma 5+ با اسکیمای اولیه:** فقط مدل‌های `User`, `Session`, `Account`, `VerificationToken` (مدل‌های Auth.js)
- **Sentry scaffolding:** `@sentry/nextjs` نصب، کانفیگ با DSN از env، Error Boundary ریشه

### ۲. ستون فقرات سفارشی‌سازی

- **فایل `site.config.ts`** با schema Zod (فیلدهای brand, contact, features, integrations محدود به این فاز)
- **سیستم theming پویا:** تزریق `primaryColor` از config به CSS Variables با Tailwind v4 `@theme inline`، تولید مشتقات رنگ با `culori` روی سرور
- **ساختار پوشه‌ها:** `src/core/`, `src/overrides/`, `src/components/` با **دو ESLint rule سفارشی** برای مرز core↔overrides
- **سیستم `getSiteConfig()`** با React `cache()` (یک‌بار در هر request)
- **`.env.example` جامع** با همه متغیرهای مورد نیاز این فاز و placeholder برای فازهای بعدی

### ۳. i18n از روز اول (حتی با فقط فارسی)

- **`next-intl` راه‌اندازی** با `messages/fa.json`
- همه متون UI از طریق `useTranslations()` یا `getTranslations()` خوانده می‌شوند
- هیچ متن فارسی hardcoded در کامپوننت‌ها
- ساختار آماده برای `en` و `ar` در فازهای بعدی (feature flag)

### ۴. SEO پایه (بر خلاف برنامه قبلی که به پروپوزال ۷ معوق شده بود)

- **`generateMetadata`** در هر صفحه، خواننده از `site.config.ts`
- **Favicon** تولیدشده از `brand.logo`
- **Open Graph پیش‌فرض** با `opengraph-image.tsx` (fallback ساده بر پایه brandColor)
- **`robots.txt` استاتیک** (پویا در پروپوزال ۷)
- **`<html lang="fa" dir="rtl">`** با `<meta description>` پویا

> این تصمیم مهم است: SEO پویا پیشرفته (sitemap per listing، JSON-LD) در پروپوزال ۷ می‌ماند، اما SEO پایه **حتماً** در foundation است تا سایت دمو از روز ۱ ایندکس درست شود.

### ۵. Auth + امنیت

- **Auth.js v5 با split config:**
  - `auth.config.ts` — edge-safe
  - `auth.ts` — PrismaAdapter + DB session
- Credentials Provider با OTP پیامکی (**Mock در این فاز**؛ رابط `SmsClient` آماده)
- نقش‌ها: `Role` enum با `GUEST | OWNER | ADMIN`
- **Rate limiting on OTP endpoints** — in-memory در dev، Redis در prod (از طریق Upstash یا لیارا Redis)
- Helper `getCurrentUser()` با `cache()`

### ۶. صفحات عمومی skeleton (داده ثابت از i18n)

- `/` — Home با hero + ۳ سکشن معرفی + CTA (اسکلت؛ پر شدن محتوای نهایی در پروپوزال ۸)
- `/about` — درباره ما (متن placeholder)
- `/contact` — فرم با React Hook Form + Zod → API stub
- `/terms`, `/privacy`, `/cancellation` — اسناد حقوقی template ایران
- `not-found.tsx` و `error.tsx`

### ۷. Middleware و محافظت

- Middleware edge-safe (فقط `auth.config.ts` را import می‌کند)
- مسیرهای `/owner/*` و `/admin/*` محافظت می‌شوند

### ۸. seed script اصلاح‌شده

- ۳ کاربر نمونه با **شماره‌های موبایل ایرانی معتبر** (`09120000001` و …)
- فقط در `NODE_ENV=development`

### ۹. تست و CI

- **Playwright E2E:** بارگذاری صفحات، ثبت‌نام OTP، محافظت مسیر، تغییر رنگ برند
- **Vitest unit:** ESLint ruleها، `getSiteConfig`، `SmsClient` mock، rate limiter
- **GitHub Actions:** typecheck + lint + vitest + playwright + **Lighthouse CI (≥۹۰ Performance، ≥۹۵ Accessibility)**

### ۱۰. مستندسازی «قابل تحویل»

- `README.md` جامع
- `docs/SETUP.md` کامل تا حدی که یک توسعه‌دهنده بیرونی بتواند در ≤ ۲ ساعت پروژه را بالا بیاورد و یک سایت با برند متفاوت ببیند

## What is OUT of scope

این پروپوزال این‌ها را پیاده **نمی‌کند** (هرکدام پروپوزال جدا دارد):

- ❌ CRUD اتاق، گالری، جاذبه، بلاگ (→ پروپوزال ۲)
- ❌ اتصال واقعی کاوه‌نگار، آپلود آروان S3 (→ پروپوزال ۲)
- ❌ سیستم رزرو و تقویم (→ پروپوزال ۳)
- ❌ سامانه مسافر، مالیات ۹٪، مؤدیان (→ پروپوزال ۴)
- ❌ درگاه زرین‌پال (→ پروپوزال ۵)
- ❌ پنل owner و اعلان واتساپ (→ پروپوزال ۶)
- ❌ sitemap پویا، JSON-LD LodgingBusiness، نقشه MapLibre (→ پروپوزال ۷)
- ❌ محتوای نهایی ویترین (عکاسی، تستیمونیال، داستان برند) (→ پروپوزال ۸)
- ❌ اسکریپت `setup-customer` و ابزار CLI (→ پروپوزال ۹)

### تفاوت scaffolding در این پروپوزال با «محصول قابل فروش»

این پروپوزال **سایت کار‌کن با scaffolding کامل** تحویل می‌دهد، اما **سایت قابل فروش یا ویترین نهایی** نیست. سایت در پایان این پروپوزال:

- ✅ قابل اجرای محلی
- ✅ قابل deploy روی staging
- ✅ قابل تغییر برند از طریق `site.config.ts`
- ❌ هنوز فاقد محتوای اقامتگاه، رزرو، پرداخت
- ❌ هنوز فاقد عکاسی واقعی و داستان برند قانع‌کننده

## Impact

### Affected Capabilities (spec deltas)

این پروپوزال سه capability جدید اضافه می‌کند (همه با ADDED requirements چون greenfield است):

- `site-foundation` — theming، config، ساختار پوشه، مرز core/overrides
- `auth` — ثبت‌نام، ورود، نقش‌ها، محافظت مسیر
- `public-pages` — صفحات عمومی پایه با داده ثابت

### Affected Code

- کل `src/` ایجاد می‌شود
- `prisma/schema.prisma` با مدل‌های Auth.js
- `site.config.ts` با schema اولیه Zod
- GitHub Actions workflow در `.github/workflows/`

### Affected Users

- کسی هنوز از محصول استفاده نمی‌کند، پس تاثیر خارجی صفر است.
- **ولی** این پروپوزال سقف و کف تمام پروپوزال‌های بعدی را تعیین می‌کند، پس دقت در design حیاتی است.

### Risks

| ریسک                                                           | کاهش                                                                        |
| -------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `site.config.ts` خیلی زود قفل شود و فیلدهای لازم بعدی جا نشوند | schema با Zod و optional بودن فیلدهای آینده؛ بازنگری در هر پروپوزال بعدی    |
| مرز core/overrides به‌درستی اعمال نشود                         | ESLint rule سفارشی + تست import graph                                       |
| Tailwind v4 هنوز جوان است و edge cases دارد                    | PoC سریع در هفته اول؛ fallback به v3 اگر blocker بود                        |
| Auth.js v5 split config پیچیدگی زیاد دارد                      | دنبال کردن دقیق مستند Auth.js؛ separate تست برای edge بودن `auth.config.ts` |
| SMS bombing روی OTP endpoint                                   | rate limit از روز اول (درس از incident مشابه در صنعت)                       |
| i18n scaffolding بار اضافه می‌آورد برای سایت تک‌زبانه          | با next-intl، اگر فقط fa فعال باشد، bundle impact ≤ ۵KB است — ناچیز         |
| DSN Sentry در هنگام dev نداریم                                 | Sentry در dev silent fail می‌شود؛ فقط در production DSN الزامی است          |

## Estimated Effort

- **زمان:** **۴-۵ هفته** نفر-تقویمی برای تیم ۲ نفره (تخمین اولیه ۲-۳ هفته با ورود ۵ دسته کار جدید به scope و واقع‌نگری کارشناسانه اصلاح شد)
- **پیچیدگی فنی:** متوسط تا بالا (Tailwind v4 + Auth.js v5 + ESLint rule سفارشی + i18n + Sentry + Lighthouse CI همه جدید هستند)
- **نقاط ریسک بالا:**
  - Tailwind v4 `@theme inline` با SSR
  - Auth.js v5 split config
  - ESLint rule سفارشی برای core boundary
  - Rate limit که هم dev هم prod کار کند

## Acceptance Criteria

این پروپوزال وقتی **انجام‌شده** محسوب می‌شود که:

### فنی

- [ ] `pnpm dev` بدون خطا اجرا شود و صفحه `/` نمایش دهد
- [ ] `pnpm build` و `pnpm start` در حالت production بدون خطا کار کند
- [ ] تغییر `primaryColor` در `site.config.ts` + rebuild، رنگ‌های UI را عوض کند
- [ ] تغییر `brand.name` در config، عنوان HTML، Navbar، Footer، و متادیتای SEO را عوض کند
- [ ] کاربر بتواند با OTP mock (کد `123456`) ثبت‌نام و ورود کند
- [ ] ارسال بیش از ۳ درخواست OTP در ۶۰ ثانیه از یک IP، بلاک شود (HTTP 429)
- [ ] مسیر `/owner` بدون auth به `/login` ریدایرکت شود
- [ ] کاربر با نقش GUEST که به `/admin` می‌رود، HTTP 403 ببیند
- [ ] همه متون UI از `messages/fa.json` بخوانند؛ هیچ متن hardcode در کامپوننت‌ها نباشد
- [ ] صفحه `/` متادیتای درست (title, description, OG image) بر اساس `site.config.ts` داشته باشد
- [ ] Error Boundary ریشه یک خطای سفارشی نشان دهد و به Sentry گزارش کند (در prod با DSN معتبر)

### کیفیت

- [ ] `pnpm typecheck && pnpm lint` بدون خطا پاس شود
- [ ] ESLint از `import` در `core/` به `overrides/` **جلوگیری کند**
- [ ] Playwright E2E suite سبز باشد (حداقل ۵ تست: Home، signup، login، rate limit، protected route)
- [ ] Vitest unit tests سبز (حداقل ۱۰ تست)
- [ ] GitHub Actions برای PR سبز شود (typecheck + lint + test + lighthouse)
- [ ] Lighthouse Performance ≥ ۹۰ روی `/` و `/about` و `/contact`
- [ ] Lighthouse Accessibility ≥ ۹۵ روی همان صفحات
- [ ] bundle size صفحه Home ≤ ۱۵۰KB gzipped

### کسب‌وکاری (مهم‌ترین معیار — کاربر اصلی)

- [ ] **«تست خارجی راه‌اندازی»:** یک توسعه‌دهنده که پروژه را نمی‌شناسد، با خواندن فقط `README.md` و `docs/SETUP.md` بتواند در **≤ ۲ ساعت**:
  1. ریپو را clone کند
  2. dependencies نصب و DB محلی بالا بیاورد
  3. `site.config.ts` را با برند ساختگی متفاوت (مثلاً «هتل بوتیک آبی») پر کند
  4. سایت را لوکال اجرا کند
  5. سایتی با آن برند جدید (نام، رنگ، لوگو جایگزین) ببیند
     این تست در پایان فاز با یک نفر خارج از تیم انجام می‌شود.
- [ ] `.env.example` شامل همه متغیرهای این فاز + placeholderهای فازهای بعدی (با کامنت)
- [ ] بدون «Singo» هارد‌کد در UI (فقط از طریق config، تا مشتری بتواند brand.name را عوض کند)

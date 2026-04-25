# Spec Delta — site-foundation

> این فایل **delta** نسبت به `openspec/specs/site-foundation/spec.md` است. چون پروژه greenfield است، همه requirements زیر `ADDED` هستند.

## ADDED Requirements

### Requirement: پروژه باید با Next.js 16 App Router راه‌اندازی شود

پروژه باید از Next.js 16+ (در زمان scaffolding، نسخه ۱۶.۲.۴) با App Router، React 19، TypeScript strict، و **`cacheComponents: true`** استفاده کند. توجه: در plan قبلی Next.js 15 ذکر شده بود. در زمان scaffolding، `pnpm create next-app@latest` نسخه ۱۶ نصب کرد. در Next.js 16، فلگ `experimental.ppr` با `cacheComponents` (یکپارچه با `useCache` و `dynamicIO`) جایگزین شده است.

#### Scenario: اجرای محلی

- **WHEN** توسعه‌دهنده `pnpm dev` را اجرا می‌کند
- **THEN** سرور روی پورت 3000 بالا می‌آید
- **AND** تغییر در فایل‌های `src/` با HMR منعکس می‌شود
- **AND** هیچ خطای TypeScript یا ESLint در کنسول نیست

#### Scenario: build موفق

- **WHEN** `pnpm build` اجرا می‌شود
- **THEN** build بدون خطا کامل می‌شود
- **AND** خروجی شامل خط "Cache Components enabled" است
- **AND** صفحات استاتیک به‌صورت prerender شده گزارش می‌شوند

---

### Requirement: فایل `site.config.ts` باید نقطه اصلی سفارشی‌سازی باشد

یک فایل `site.config.ts` در ریشه پروژه وجود دارد که کانفیگ مشتری را نگه می‌دارد. این فایل با Zod schema در `src/lib/config-schema.ts` اعتبارسنجی می‌شود.

#### Scenario: خواندن کانفیگ در Server Component

- **WHEN** یک Server Component تابع `getSiteConfig()` را صدا می‌زند
- **THEN** کانفیگ parse شده و type-safe برگردانده می‌شود
- **AND** در همان request اگر دوباره صدا زده شود، نتیجه cached برگردانده می‌شود (از `cache()` React)

#### Scenario: کانفیگ نامعتبر

- **WHEN** فیلد اجباری در `site.config.ts` موجود نیست یا مقدار نامعتبر دارد
- **THEN** `getSiteConfig()` با پیام خطای روشن Zod پرتاب می‌کند
- **AND** build فیل می‌شود تا مشتری قبل از deploy متوجه شود

#### Scenario: فیلدهای پشتیبانی‌شده در این فاز

کانفیگ باید حداقل این فیلدها را داشته باشد:

- `brand.name` (string)
- `brand.slug` (string)
- `brand.domain` (string)
- `brand.logo` (path string)
- `brand.primaryColor` (hex string)
- `brand.socials` (object اختیاری)
- `contact.phone`, `contact.address`, `contact.lat`, `contact.lng`
- `features.blog`, `features.gallery`, `features.multilingual` (boolean)

فیلدهای مربوط به رزرو، integrations پرداخت، legal و غیره در پروپوزال‌های بعدی اضافه می‌شوند.

---

### Requirement: سیستم تم پویا باید `primaryColor` را به UI تزریق کند

هنگام render لایوت اصلی، رنگ اصلی از کانفیگ خوانده و به‌صورت CSS Variables در `<head>` تزریق می‌شود. Tailwind v4 این Variableها را مصرف می‌کند.

#### Scenario: تغییر رنگ برند

- **WHEN** توسعه‌دهنده `brand.primaryColor` را در `site.config.ts` تغییر می‌دهد
- **AND** صفحه را reload می‌کند (یا build دوباره اجرا می‌شود)
- **THEN** همه المان‌هایی که از class `bg-primary` یا `text-primary` استفاده می‌کنند، رنگ جدید را می‌گیرند

#### Scenario: مشتقات رنگ

- **WHEN** `primaryColor` تنظیم می‌شود
- **THEN** مشتقات `primaryHover`, `primaryMuted`, `primaryForeground` به‌صورت خودکار در سرور با `culori` تولید می‌شوند
- **AND** در CSS به‌صورت `--color-primary-hover` و غیره در دسترس‌اند

---

### Requirement: ساختار پوشه باید مرز core/overrides را اعمال کند

پروژه باید سه ناحیه جدا داشته باشد:

- `src/core/` — کد قفل (مشتری دست نمی‌زند)
- `src/overrides/` — نقطه مجاز سفارشی‌سازی کد (فقط پلن Premium)
- `src/components/`, `src/lib/`, `src/app/` — کد عادی پروژه

#### Scenario: جلوگیری از import غیرمجاز core → overrides

- **WHEN** توسعه‌دهنده در یک فایل درون `src/core/` تلاش می‌کند از `@/overrides/...` import کند
- **THEN** ESLint error می‌دهد
- **AND** CI (GitHub Actions) PR را مسدود می‌کند

#### Scenario: مجاز بودن overrides → core

- **WHEN** یک فایل در `src/overrides/` از `@/core/...` import می‌کند
- **THEN** ESLint مشکلی اعلام نمی‌کند

#### Scenario: محدودیت سطح import در overrides

- **WHEN** یک فایل در `src/overrides/` تلاش می‌کند از یک فایل عمیق مثل `@/core/booking/internal/state-machine` import کند (با سطح چند-پوشه‌ای)
- **THEN** ESLint warning می‌دهد
- **AND** فقط import از سطح سطحی `@/core/booking` مجاز است (API سطحی پایدار)

---

### Requirement: پروژه باید RTL و فارسی پیش‌فرض باشد

لایوت اصلی باید `<html lang="fa" dir="rtl">` داشته باشد. همه متون پیش‌فرض فارسی‌اند. فونت فارسی (ایران‌سانس یا وزیرمتن) با `next/font` لود می‌شود.

#### Scenario: بارگذاری صفحه

- **WHEN** کاربر صفحه‌ای را باز می‌کند
- **THEN** HTML با `dir="rtl"` صادر می‌شود
- **AND** متن از راست به چپ چیده می‌شود
- **AND** فونت فارسی لود می‌شود بدون FOUT طولانی

---

### Requirement: Lighthouse باید حداقل ۹۰ در Performance و ۹۵ در Accessibility و SEO باشد

صفحات عمومی (Home, About, Contact) باید این حداقل‌ها را در Lighthouse داشته باشند.

#### Scenario: چک CI

- **WHEN** یک PR باز می‌شود
- **THEN** GitHub Actions Lighthouse CI را اجرا می‌کند
- **AND** اگر Performance < ۹۰ یا Accessibility < ۹۵ یا SEO < ۹۵ باشد، PR مسدود می‌شود

---

### Requirement: SEO پایه باید از `site.config.ts` متادیتا تولید کند

هر صفحه باید `generateMetadata` داشته باشد که title، description، Open Graph tags را بر اساس کانفیگ تولید کند. این **SEO پویا پیشرفته نیست** (آن در پروپوزال ۷ می‌آید)، بلکه **SEO پایه** است تا سایت staging از روز اول درست ایندکس شود.

#### Scenario: Title و Description صفحه اصلی

- **WHEN** کاربر `/` را باز می‌کند
- **THEN** `<title>` برابر `brand.name` به‌علاوه شعار پیش‌فرض است
- **AND** `<meta name="description">` از i18n خوانده می‌شود (نه hardcode)

#### Scenario: Title template

- **WHEN** صفحه `/about` render می‌شود
- **THEN** title به شکل `درباره ما | ${brand.name}` است (با استفاده از `metadata.title.template`)

#### Scenario: Open Graph fallback

- **WHEN** لینک صفحه `/` در شبکه اجتماعی share می‌شود
- **THEN** تصویر OG یک تصویر تولیدشده توسط `opengraph-image.tsx` با `brand.name` و `primaryColor` نمایش داده می‌شود
- **AND** `og:title` و `og:description` درست پر شده‌اند

#### Scenario: Favicon

- **WHEN** مرورگر سایت را لود می‌کند
- **THEN** favicon از `brand.logo` تولیدشده نمایش داده می‌شود
- **AND** Apple touch icon برای iOS هم موجود است

#### Scenario: robots.txt استاتیک

- **WHEN** کاربر به `/robots.txt` می‌رود
- **THEN** محتوای ساده `User-agent: * \n Allow: /` برگردانده می‌شود
- **AND** در این فاز sitemap.xml ارجاع داده نمی‌شود (آن در پروپوزال ۷)

---

### Requirement: همه متون UI باید از i18n layer بیایند

هیچ متن فارسی مستقیم در JSX کامپوننت‌ها نباید باشد. همه متون از `messages/fa.json` از طریق `next-intl` خوانده می‌شوند.

#### Scenario: رندر متن در Server Component

- **GIVEN** یک Server Component مثل Navbar
- **WHEN** می‌خواهد متن «درباره ما» نمایش دهد
- **THEN** از `getTranslations('Navbar')` استفاده می‌کند و `t('about')` را صدا می‌زند
- **AND** در JSX هیچ string literal فارسی وجود ندارد

#### Scenario: رندر متن در Client Component

- **GIVEN** یک Client Component (مثل فرم تماس)
- **WHEN** متن label/placeholder/error نیاز است
- **THEN** از hook `useTranslations('ContactForm')` استفاده می‌شود
- **AND** `NextIntlClientProvider` در layout wrapper شده

#### Scenario: ESLint جلوی hardcode را می‌گیرد

- **WHEN** توسعه‌دهنده متن فارسی مستقیم در JSX می‌نویسد
- **THEN** ESLint warning صادر می‌کند
- **AND** در CI این warning به error تبدیل می‌شود (در نهایت این فاز)

#### Scenario: آماده برای چندزبانه بدون refactor

- **GIVEN** `features.multilingual: false` فعلاً
- **WHEN** در پروپوزال بعدی `features.multilingual: true` و `messages/en.json` اضافه می‌شود
- **THEN** هیچ کامپوننت نیازی به تغییر ندارد
- **AND** فقط routing و locale switching اضافه می‌شود

---

### Requirement: Sentry باید برای خطایابی production آماده باشد

`@sentry/nextjs` نصب و پیکربندی می‌شود. DSN از env خوانده می‌شود. Error Boundary ریشه UI سفارشی فارسی دارد.

#### Scenario: خطای runtime در production

- **GIVEN** DSN معتبر در `SENTRY_DSN` env تنظیم شده
- **WHEN** کامپوننت Server خطایی throw می‌کند
- **THEN** خطا در Sentry ثبت می‌شود با tag `brand.slug` از config
- **AND** کاربر صفحه `app/error.tsx` را با UI دوستانه می‌بیند
- **AND** صفحه دکمه «تلاش دوباره» و لینک بازگشت به Home دارد

#### Scenario: dev بدون DSN

- **GIVEN** `NODE_ENV=development` و `SENTRY_DSN` خالی
- **WHEN** خطا throw می‌شود
- **THEN** خطا فقط در console لاگ می‌شود
- **AND** Sentry تماس شبکه‌ای نمی‌زند
- **AND** برنامه crash نمی‌کند

#### Scenario: production بدون DSN

- **GIVEN** `NODE_ENV=production` و `SENTRY_DSN` خالی
- **WHEN** برنامه startup می‌شود
- **THEN** یک warning بزرگ در stdout لاگ می‌شود: «Sentry DSN تنظیم نشده — خطاهای production مانیتور نمی‌شوند»
- **AND** برنامه ادامه می‌دهد (crash نمی‌کند)

---

### Requirement: `.env.example` باید جامع و مستند باشد

فایل `.env.example` شامل **همه** متغیرهای محیطی این فاز + placeholder برای فازهای بعدی (با کامنت) باشد.

#### Scenario: راه‌اندازی پروژه جدید

- **WHEN** توسعه‌دهنده تازه `.env.example` را کپی به `.env.local` می‌کند
- **THEN** همه متغیرهای لازم را می‌بیند با توضیح فارسی/انگلیسی
- **AND** کامنت‌ها مشخص می‌کنند کدام متغیر در کدام پروپوزال فعال می‌شود
- **AND** هیچ secret واقعی در `.env.example` نیست

#### Scenario: متغیرهای این فاز

`.env.example` حداقل این‌ها را دارد:

- `DATABASE_URL` — PostgreSQL connection string
- `NEXTAUTH_SECRET` — رمز Auth.js
- `NEXTAUTH_URL` — URL پایه
- `SENTRY_DSN` — اختیاری در dev
- `RATE_LIMIT_REDIS_URL` — اختیاری در dev
- `NODE_ENV`

با placeholder برای فازهای بعدی:

- `# KAVENEGAR_API_KEY` — در پروپوزال ۲
- `# ARVAN_S3_*` — در پروپوزال ۲
- `# ZARINPAL_MERCHANT_ID` — در پروپوزال ۵
- `# WHATSAPP_API_KEY` — در پروپوزال ۶
- `# MODAYAN_CERT_PATH` — در پروپوزال ۴

---

### Requirement: پروژه باید «تست خارجی راه‌اندازی» را پاس کند

معیار نهایی برای مطابقت با هدف اصلی محصول (تمپلیت قابل فروش): یک توسعه‌دهنده خارج از تیم باید بتواند در **≤ ۲ ساعت** سایت را با برند متفاوت بالا بیاورد.

#### Scenario: راه‌اندازی خارجی

- **GIVEN** توسعه‌دهنده‌ای که پروژه را قبلاً ندیده
- **AND** فقط `README.md` و `docs/SETUP.md` در دسترس دارد
- **WHEN** دستورالعمل را دنبال می‌کند
- **THEN** در ≤ ۲ ساعت:
  1. ریپو را clone می‌کند
  2. `pnpm install` می‌زند
  3. PostgreSQL محلی را بالا می‌آورد (docker-compose که در setup آمده)
  4. `.env.local` را پر می‌کند
  5. `pnpm prisma migrate dev && pnpm prisma db seed` می‌زند
  6. `site.config.ts` را با برند ساختگی متفاوت تغییر می‌دهد
  7. `pnpm dev` اجرا می‌کند
  8. سایتی با آن برند جدید (نام، رنگ، لوگو) می‌بیند

#### Scenario: بدون «Singo» هاردکد

- **WHEN** کاربر `brand.name` را در config عوض می‌کند
- **THEN** هیچ‌کجا در UI کلمه «سینگو» یا «Singo» دیده نمی‌شود (مگر در پیام‌های dev tools)

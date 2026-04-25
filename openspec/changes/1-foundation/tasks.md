# Tasks — 1-foundation

تسک‌ها به ترتیب اجرا. هر جعبه هنگام اتمام واقعی تیک بخورد.

> **تخمین کل:** **۵-۶ هفته** برای تیم ۲ نفره (پس از ارزیابی معماری دوم: افزودن Repository/Service، Result type، Pino، Container DI، Feature-Sliced organization، VSCode setup).

## 0. پیش‌نیازها (قبل از شروع)

- [x] 0.1 **برند ساختگی موقت** انتخاب شود (مثلاً «اقامتگاه ساحلی سنگ سیاه» یا «بومگردی دلگشا»). تصمیم نهایی ساختگی-vs-پایلوت تا قبل از پروپوزال ۸ به تأخیر می‌افتد.
- [~] 0.2 ⏸ **انتخاب هاست به تأخیر افتاد** — توسعه فعلاً فقط لوکال است. قبل از پروپوزال ۹ (productize) یا ۱۰ (pilot-deployment) تصمیم گرفته می‌شود.
- [~] 0.3 ⏸ **ثبت‌نام Sentry به تأخیر افتاد** — کد Sentry scaffold می‌شود ولی DSN خالی می‌ماند. در dev بدون DSN silent است؛ هنگام اولین deploy روی staging/prod، DSN واقعی تنظیم می‌شود.
- [x] 0.4 ساخت repo GitHub + دسترسی تیم — انجام شد

## 1. Scaffolding اولیه ✅

- [x] 1.1 ایجاد پروژه با `pnpm create next-app` — **Next.js 16.2.4 + React 19.2.4** (نه ۱۵ که در پلن آمده بود؛ بزرگ‌تر، شامل cacheComponents)
- [x] 1.2 Tailwind v4.2.4 از scaffold فعال است (`@tailwindcss/postcss` + `@import 'tailwindcss'` + `@theme inline`)
- [x] 1.3 TypeScript strict + قواعد سختگیرانه‌تر (`noUncheckedIndexedAccess`, `noImplicitOverride`, `noUnusedLocals`, `noUnusedParameters`, `exactOptionalPropertyTypes`)
- [x] 1.4 نصب Prettier + prettier-plugin-tailwindcss + Husky + lint-staged + commitlint + config-conventional
  - `.prettierrc.json` و `.prettierignore`
  - `commitlint.config.mjs`
  - `.husky/pre-commit` (lint-staged) + `.husky/commit-msg` (commitlint)
  - `lint-staged` config در package.json
- [x] 1.5 **`cacheComponents: true` در `next.config.ts`** — جایگزین Next.js 16 برای `experimental.ppr` (یکپارچه با `useCache` و `dynamicIO`). در build به‌صورت "Cache Components enabled" گزارش می‌شود.
- [x] 1.6 فونت فارسی Vazirmatn با `next/font/local` و فایل محلی `src/fonts/Vazirmatn-Variable.woff2` (از پکیج `vazirmatn`). `<html lang="fa" dir="rtl">` در layout.
- [x] 1.7 `.env.example` جامع با همه متغیرهای این فاز + placeholderهای کامنت‌شده برای پروپوزال‌های ۲-۶
- [x] 1.8 `.gitignore` کامل: dependencies, build, IDEs, env files, Playwright, Sentry, public/uploads (پروپوزال ۲)

**تأیید عملکرد:**

- `pnpm typecheck` → بدون خطا
- `pnpm lint` → بدون خطا (۰ warning پس از اصلاح commitlint config)
- `pnpm build` → موفق، `/` به‌عنوان static prerender شد، Cache Components فعال

### اصلاحات remediation (پس از مرور کارشناسی بخش ۱)

- [x] R.1 **فونت** — تعویض `next/font/google` به `next/font/local` با فایل Vazirmatn از پکیج `vazirmatn` در `src/fonts/Vazirmatn-Variable.woff2` (تضمین build از داخل ایران بدون VPN)
- [x] R.2 **CSS** — اصلاح خود-ارجاع `--font-sans: var(--font-sans)` در `globals.css` به `--font-sans: var(--font-vazirmatn)`
- [x] R.3 **README.md** — بازنویسی کامل با معرفی پروژه، scripts، ساختار، اصول معماری
- [x] R.4 **tsconfig** — حذف `exactOptionalPropertyTypes` (تداخل مکرر با React/Next types)
- [x] R.5 **next.config** — حذف `reactStrictMode` redundant + کامنت paradigm shift
- [x] R.6 **package.json** — اصلاح `engines.pnpm` از `>=9.0.0` به `>=10.0.0`
- [x] R.7 **pnpm-workspace.yaml** — افزودن کامنت توضیحی
- [x] R.8 **public/** — حذف ۵ SVG و favicon از scaffolder + `.gitkeep`
- [x] R.9 **AGENTS.md ریشه** — بازنویسی به‌عنوان pointer به `openspec/AGENTS.md`
- [x] R.10 **`.editorconfig`** — اضافه شد (همگام با Prettier)
- [x] R.11 **design.md decision 23** — مستندسازی paradigm shift از PPR به Cache Components

## 2. ساختار پوشه و قاعده مرز (Feature-Sliced)

- [ ] 2.1 ایجاد ساختار feature-sliced:
  - `src/app/`
  - `src/features/auth/{components,server,services,schemas,types.ts,index.ts}`
  - `src/core/{clients,errors,logger,result,security}/`
  - `src/overrides/`
  - `src/components/{ui,layout}/`
  - `src/lib/` (فقط helpers، بدون business logic)
- [ ] 2.2 نوشتن ESLint rule سفارشی `singo/no-core-internal-leak` (سخت — error)
- [ ] 2.3 نوشتن ESLint rule سفارشی `singo/overrides-stable-api` (warning)
- [ ] 2.4 نوشتن ESLint rule سفارشی `singo/no-feature-internal-import` (سخت — error؛ import به feature فقط از `index.ts`)
- [ ] 2.5 تست unit برای هر سه rule با Vitest
- [ ] 2.6 README کوتاه در هر فولدر سطح بالا که محدوده و قواعد آن را توضیح می‌دهد

## 3. `site.config.ts` و سیستم تم

- [ ] 3.1 تعریف schema Zod در `src/lib/config-schema.ts` (فیلدهای این فاز)
- [ ] 3.2 ایجاد `site.config.ts` در ریشه با مقادیر برند دمو
- [ ] 3.3 نوشتن `src/lib/get-site-config.ts` با `cache()` برای خواندن یک‌بار در هر request
- [ ] 3.4 نوشتن `src/lib/theme.ts` که با `culori` مشتقات رنگ (`primaryHover`, `primaryMuted`, `primaryForeground`) می‌سازد
- [ ] 3.5 تزریق CSS Variables در `app/layout.tsx` با `<style>` inline
- [ ] 3.6 پیکربندی Tailwind v4 `@theme inline` در `globals.css` برای خواندن CSS Variables
- [ ] 3.7 تست unit: تغییر primaryColor → مشتقات صحیح تولید شود
- [ ] 3.8 تست E2E: تغییر `site.config.ts` → rebuild → رنگ UI عوض شود

## 4. i18n (next-intl)

- [ ] 4.1 نصب `next-intl` و پیکربندی پایه
- [ ] 4.2 ایجاد `messages/fa.json` به‌عنوان منبع حقیقت متون
- [ ] 4.3 تنظیم `src/i18n.ts` و `middleware` برای routing (فعلاً فقط `fa`)
- [ ] 4.4 استفاده از `NextIntlClientProvider` و `getTranslations` در لایوت
- [ ] 4.5 قاعده ESLint که متن فارسی مستقیم در JSX را warn کند (`no-hardcoded-fa-strings`)
- [ ] 4.6 تست: اضافه کردن `messages/en.json` ساختگی و سوییچ → همه متون عوض شوند (بدون فعال کردن feature flag multilingual)

## 5. Prisma و دیتابیس

- [ ] 5.1 نصب Prisma و راه‌اندازی `prisma/schema.prisma`
- [ ] 5.2 افزودن مدل‌های Auth.js (`User`, `Account`, `Session`, `VerificationToken`)
- [ ] 5.3 افزودن enum `Role { GUEST OWNER ADMIN }` و فیلد `role` در `User`
- [ ] 5.4 افزودن فیلد `phone` (unique) و `nationalId` (nullable) در `User`
- [ ] 5.5 اولین migration با Prisma
- [ ] 5.6 `src/lib/db.ts` با Prisma client singleton (HMR-safe)
- [ ] 5.7 `prisma/seed.ts` با **شماره‌های موبایل ایرانی معتبر**:
  - `09120000001` — ADMIN
  - `09120000002` — OWNER
  - `09120000003` — GUEST
- [ ] 5.8 Guard در `seed.ts`: اگر `NODE_ENV=production` → خروج فوری

## 6. Cross-cutting infrastructure (Result, Logger, Container, Errors)

- [ ] 6.1 ایجاد `src/core/result/index.ts` با `Result<T, E>`, `ok()`, `err()`, و helper `isOk` / `isErr`
- [ ] 6.2 ایجاد `src/core/errors/app-error.ts` با کلاس `AppError`
- [ ] 6.3 ایجاد `src/core/errors/codes.ts` با enum `ErrorCode` (شروع: VALIDATION_FAILED, RATE_LIMIT_EXCEEDED, USER_NOT_FOUND, INVALID_OTP, OTP_EXPIRED, UNAUTHORIZED, FORBIDDEN)
- [ ] 6.4 ایجاد `src/core/logger/index.ts` با Pino:
  - level از env (`LOG_LEVEL`)، default `debug` در dev
  - `pino-pretty` در dev، JSON در prod
  - base context: env, brand.slug
- [ ] 6.5 ایجاد `src/core/logger/request-context.ts` با `AsyncLocalStorage` برای request ID
- [ ] 6.6 ایجاد middleware که برای هر request یک ID می‌سازد و در context می‌گذارد
- [ ] 6.7 ایجاد `src/core/clients/sms/sms-client.ts` با interface
- [ ] 6.8 ایجاد `src/core/clients/sms/mock-sms-client.ts` (کد ثابت `123456`، لاگ از طریق Pino)
- [ ] 6.9 ایجاد `src/core/clients/storage/storage-client.ts` فقط interface (پیاده‌سازی در پروپوزال ۲)
- [ ] 6.10 ایجاد `src/lib/container.ts` با factory ساده برای container
- [ ] 6.11 ESLint rule `no-console` در `src/` (warn در tests/scripts)
- [ ] 6.12 unit test برای Result helperها
- [ ] 6.13 unit test برای logger context propagation

## 7. Auth.js v5 با split config + Feature Auth

- [ ] 7.1 نصب `next-auth@beta` و `@auth/prisma-adapter`
- [ ] 7.2 ایجاد `src/lib/auth.config.ts` (edge-safe، فقط providers declaration)
- [ ] 7.3 ایجاد `src/lib/auth.ts` با PrismaAdapter + DB session
- [ ] 7.4 ایجاد `features/auth/schemas/index.ts` با `phoneSchema`, `otpSchema`, `signupSchema`, `loginSchema`
- [ ] 7.5 ایجاد `features/auth/types.ts` با `z.infer` از schemas + `User` domain type
- [ ] 7.6 ایجاد `features/auth/server/repository.ts`:
  - `userRepository.findByPhone()`
  - `userRepository.create()`
  - `userRepository.upsertOtp()`
  - `userRepository.findOtp()`
  - تابع `toUser()` mapper از Prisma type به domain User
- [ ] 7.7 ایجاد `features/auth/services/auth-service.ts` با `AuthService`:
  - `sendOtp(phone): Result<{expiresAt}>`
  - `verifyOtp(phone, code): Result<{userId}>`
  - استفاده از container().smsClient و container().rateLimiter
- [ ] 7.8 ایجاد `features/auth/server/actions.ts` با Server Actions:
  - `sendOtpAction`
  - `verifyOtpAction`
  - `signOutAction`
  - همه با `useActionState` pattern
- [ ] 7.9 ایجاد `features/auth/server/queries.ts` با `getCurrentUser()` (با React `cache()`)
- [ ] 7.10 ایجاد `features/auth/index.ts` با re-export فقط مواردی که بیرون استفاده می‌شوند
- [ ] 7.11 صفحه `/login` با فرم: استفاده از Server Action، useActionState، Zod
- [ ] 7.12 صفحه `/signup` مشابه
- [ ] 7.13 API route `/api/auth/[...nextauth]/route.ts`
- [ ] 7.14 `src/middleware.ts` edge با matcher `/owner/:path*`, `/admin/:path*`
- [ ] 7.15 unit test برای AuthService با mock repository و mock SmsClient
- [ ] 7.16 integration test برای userRepository با test database

## 8. Rate Limiting

- [ ] 8.1 نصب `@upstash/ratelimit` و `@upstash/redis` (یا معادل برای Redis لیارا)
- [ ] 8.2 تعریف `src/core/security/rate-limit.ts` با interface `RateLimiter` + پیاده‌سازی Upstash
- [ ] 8.3 پیاده‌سازی `InMemoryRateLimiter` برای dev بدون Redis
- [ ] 8.4 دو پروفایل پیش‌فرض: `otp` (۳ در ۶۰ ثانیه) و `api` (۶۰ در دقیقه)
- [ ] 8.5 اعمال rate limit در `AuthService.sendOtp` (per IP + per phone)
- [ ] 8.6 اعمال rate limit در Server Action تماس
- [ ] 8.7 پاسخ HTTP 429 با header `Retry-After` در API routes
- [ ] 8.8 تست unit با mock storage
- [ ] 8.9 تست E2E: ارسال ۴ درخواست OTP → چهارمی 429 بگیرد

## 9. SEO پایه

- [ ] 9.1 `app/layout.tsx`: `generateMetadata` که از `getSiteConfig()` می‌خواند (title template, description, OG defaults)
- [ ] 9.2 `app/icon.tsx` یا `public/favicon.ico` تولیدشده از `brand.logo`
- [ ] 9.3 `app/apple-icon.tsx` برای iOS
- [ ] 9.4 `app/opengraph-image.tsx` که با `ImageResponse` یک تصویر پیش‌فرض بر پایه `brandColor` و `brand.name` می‌سازد
- [ ] 9.5 `app/robots.ts` استاتیک (allow all؛ پویا در پروپوزال ۷)
- [ ] 9.6 هر صفحه (`/`, `/about`, `/contact`) `generateMetadata` مختص خود داشته باشد
- [ ] 9.7 تست: Meta tagها در view-source صفحه Home درست باشند
- [ ] 9.8 تست Lighthouse SEO ≥ ۹۵

## 10. Sentry

- [ ] 10.1 نصب `@sentry/nextjs`
- [ ] 10.2 `pnpm sentry-wizard` یا تنظیم دستی `sentry.client.config.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts`
- [ ] 10.3 DSN از `process.env.SENTRY_DSN` خوانده شود؛ در dev اختیاری
- [ ] 10.4 Error Boundary ریشه در `app/error.tsx` با UI سفارشی فارسی
- [ ] 10.5 `app/global-error.tsx` برای خطاهای فاجعه‌بار
- [ ] 10.6 tag کردن خطاها با `brand.slug` از config
- [ ] 10.7 یکپارچه‌سازی Sentry با Pino logger (errors همزمان به هر دو می‌روند)
- [ ] 10.8 تست دستی: throw یک خطا در dev → console log از طریق Pino

## 11. Layout و صفحات عمومی

- [ ] 11.1 `src/app/layout.tsx` با HTML `lang="fa" dir="rtl"`, font, CSS vars theme, i18n provider
- [ ] 11.2 `src/components/layout/Navbar.tsx` خواننده از `getSiteConfig()` + i18n
- [ ] 11.3 `src/components/layout/Footer.tsx` با اطلاعات تماس از config + i18n
- [ ] 11.4 `src/app/page.tsx` — Home skeleton با hero + ۳ سکشن معرفی + CTA (همه متون از i18n)
- [ ] 11.5 `src/app/about/page.tsx` — درباره ما
- [ ] 11.6 `src/app/contact/page.tsx` — فرم با React Hook Form + Zod، Server Action `submitContactAction`
- [ ] 11.7 ایجاد `features/contact/` با schema, action, service ساده (حتی برای فرم تماس الگو رعایت شود)
- [ ] 11.8 `src/app/(legal)/terms/page.tsx`, `privacy/page.tsx`, `cancellation/page.tsx`
- [ ] 11.9 `src/app/not-found.tsx` — 404 با هویت بصری برند
- [ ] 11.10 `src/app/(auth)/layout.tsx` — لایوت مستقل برای login/signup

## 12. shadcn/ui

- [ ] 12.1 راه‌اندازی shadcn/ui (`pnpm dlx shadcn@latest init`)
- [ ] 12.2 نصب کامپوننت‌های این فاز: `button`, `input`, `label`, `form`, `card`, `separator`, `toast`, `sonner`
- [ ] 12.3 تنظیم RTL و هم‌خوانی با تم پویا (CSS vars از layout)
- [ ] 12.4 تست A11y keyboard navigation روی `button` و `input`

## 13. Asset Strategy

- [ ] 13.1 ساخت `public/brand/` برای لوگو و favicon
- [ ] 13.2 جایگذاری لوگو SVG برند دمو
- [ ] 13.3 تصاویر hero از Unsplash یا عکس‌های آزاد (با attribution در `docs/ASSETS.md`)
- [ ] 13.4 `next/image` با sizes و priority درست
- [ ] 13.5 تست: هیچ تصویر > ۲۰۰KB در صفحه Home

## 14. DX و قراردادهای کد (Conventions)

- [ ] 14.1 `.vscode/settings.json` با: format on save، ESLint auto-fix on save، organize imports on save، tailwindcss intellisense
- [ ] 14.2 `.vscode/extensions.json` با extensions توصیه‌شده: `dbaeumer.vscode-eslint`, `esbenp.prettier-vscode`, `bradlc.vscode-tailwindcss`, `prisma.prisma`, `usernamehw.errorlens`, `streetsidesoftware.code-spell-checker`
- [ ] 14.3 `.prettierrc.json`: 2 space, single quote, trailing comma all, 100 char width, semicolons
- [ ] 14.4 ESLint config کامل با قواعد:
  - `next/core-web-vitals`
  - `@typescript-eslint/no-explicit-any: error`
  - `@typescript-eslint/no-non-null-assertion: warn`
  - `import/order` با grouping استاندارد
  - `no-console: warn` (در tests فعال نباشد)
  - قواعد سفارشی singo (در tasks 2.2, 2.3, 2.4)
- [ ] 14.5 max-lines: 300 (warn at 250)، max-lines-per-function: 75 (warn at 50)
- [ ] 14.6 نصب `commitlint` + `commitizen` + Husky hook برای enforce conventional commits
- [ ] 14.7 `.github/PULL_REQUEST_TEMPLATE.md` با چک‌لیست:
  - [ ] testها سبز
  - [ ] spec در `openspec/` آپدیت
  - [ ] مرز core/overrides/feature رعایت
  - [ ] هیچ متن hardcode فارسی
  - [ ] Result type استفاده شده (نه throw در business logic)
  - [ ] CHANGELOG آپدیت (در پروپوزال ۹ اضافه می‌شود)
- [ ] 14.8 `.editorconfig` برای استانداردسازی editor settings
- [ ] 14.9 `docs/CONVENTIONS.md` که قواعد بخش ۹.۱۰ project.md را تفصیل می‌دهد

## 15. تست و CI

### تست واحد و یکپارچه (Vitest)

- [ ] 15.1 نصب Vitest + `@testing-library/react` + `@testing-library/user-event`
- [ ] 15.2 پیکربندی `vitest.config.ts` با coverage threshold ۸۰٪ روی `src/features/` و `src/core/`
- [ ] 15.3 unit test: Result helperها (ok, err, isOk, isErr)
- [ ] 15.4 unit test: AppError + ErrorCode
- [ ] 15.5 unit test: ESLint ruleهای سفارشی
- [ ] 15.6 unit test: `get-site-config` (cache یک‌بار در هر request)
- [ ] 15.7 unit test: `theme.ts` (تولید مشتقات رنگ)
- [ ] 15.8 unit test: `MockSmsClient`
- [ ] 15.9 unit test: rate limiter (in-memory)
- [ ] 15.10 unit test: `AuthService` با mock repository و mock SmsClient و mock RateLimiter
- [ ] 15.11 unit test: container factory (تعویض client بر اساس env)
- [ ] 15.12 unit test: logger context propagation با AsyncLocalStorage
- [ ] 15.13 integration test: `userRepository` با test DB (Prisma + Postgres در docker)

### تست E2E (Playwright)

- [ ] 15.14 نصب Playwright و پیکربندی `playwright.config.ts`
- [ ] 15.15 تست E2E: بارگذاری Home، همه سکشن‌ها
- [ ] 15.16 تست E2E: ثبت‌نام OTP موفق + ایجاد session
- [ ] 15.17 تست E2E: ورود + لاگ‌اوت
- [ ] 15.18 تست E2E: ۴ درخواست OTP → چهارمی 429
- [ ] 15.19 تست E2E: ریدایرکت `/owner` بدون auth به `/login`
- [ ] 15.20 تست E2E: GUEST روی `/admin` → 403
- [ ] 15.21 تست E2E: تغییر `site.config.ts` → rebuild → رنگ UI عوض شود

### CI

- [ ] 15.22 GitHub Actions workflow: typecheck + lint + vitest (با coverage) + playwright + Lighthouse CI + commitlint
- [ ] 15.23 Lighthouse CI با threshold Performance ≥ ۹۰ و Accessibility ≥ ۹۵ و SEO ≥ ۹۵
- [ ] 15.24 شکست build اگر coverage < ۸۰٪ روی `src/features/` و `src/core/`

## 16. مستندسازی (ضروری برای «تست خارجی راه‌اندازی»)

- [ ] 16.1 `README.md` پروژه: معرفی، نصب، اجرا، تست، build
- [ ] 16.2 `docs/SETUP.md`: مراحل کامل راه‌اندازی یک سایت جدید از این تمپلیت
- [ ] 16.3 `docs/CUSTOMIZATION.md`: همه فیلدهای `site.config.ts` با مثال
- [ ] 16.4 `docs/ASSETS.md`: منبع تصاویر/فونت و attribution
- [ ] 16.5 `docs/ARCHITECTURE.md`: توضیح کامل: Feature-Sliced، مرز core/overrides، Repository/Service/Action، Result type، Pino logger، Container DI، PPR، Auth split config
- [ ] 16.6 `docs/CONVENTIONS.md`: قواعد کد (هم‌گام با بخش ۹.۱۰ project.md)
- [ ] 16.7 `docs/TESTING.md`: راهنمای نوشتن تست unit/integration/E2E
- [ ] 16.8 README کوتاه در هر فولدر سطح بالا (`features/`, `core/`, `overrides/`)
- [ ] 16.9 اضافه کردن `# وضعیت فعلی` در `openspec/project.md` بعد از تکمیل

## 17. کیفیت و تحویل

- [ ] 17.1 `pnpm build` بدون خطا
- [ ] 17.2 Lighthouse: Performance ≥ ۹۰، Accessibility ≥ ۹۵، SEO ≥ ۹۵
- [ ] 17.3 تست RTL روی Chrome/Safari/Firefox، موبایل و دسکتاپ
- [ ] 17.4 bundle size صفحه Home ≤ ۱۵۰KB gzipped
- [ ] 17.5 جست‌وجو در کد برای «Singo» hardcoded — نباید هیچ‌کجا در UI باشد
- [ ] 17.6 جست‌وجو در کد برای `console.log` خارج از tests/scripts — صفر مورد
- [ ] 17.7 جست‌وجو در کد برای `any` — صفر مورد در `src/features/` و `src/core/`
- [ ] 17.8 **تست خارجی راه‌اندازی:** یک توسعه‌دهنده خارج از تیم با `SETUP.md` در ≤ ۲ ساعت پروژه را با برند متفاوت بالا بیاورد
- [ ] 17.9 بازبینی کد با کاربر و تأیید نهایی
- [ ] 17.10 Archive پروپوزال: ادغام spec deltaها در `openspec/specs/` و انتقال فولدر به `openspec/changes/archive/`

# Spec Delta — architecture

> این فایل **delta** نسبت به `openspec/specs/architecture/spec.md` است. الزامات بنیادی معماری که در همه فاز‌های آینده باید رعایت شوند.

## ADDED Requirements

### Requirement: کد با ساختار Feature-Sliced سازماندهی شود

هر دامنه (feature) یک فولدر مستقل در `src/features/` با ساختار ثابت دارد. import بین features فقط از `index.ts` آن feature مجاز است.

#### Scenario: ساختار feature

- **WHEN** یک feature جدید (مثل `booking`) ایجاد می‌شود
- **THEN** ساختار زیر را دارد:
  - `components/`
  - `server/{actions.ts, queries.ts, repository.ts}`
  - `services/`
  - `schemas/`
  - `types.ts`
  - `index.ts` (public API)
- **AND** هر چه که قرار است feature دیگر استفاده کند، از `index.ts` re-export می‌شود

#### Scenario: جلوگیری از import داخلی

- **WHEN** فایلی در `features/booking/` تلاش می‌کند `import { x } from '@/features/auth/services/internal-helper'` بنویسد
- **THEN** ESLint rule `singo/no-feature-internal-import` خطا می‌دهد
- **AND** فقط `import { x } from '@/features/auth'` مجاز است

#### Scenario: مرز core/features/components

- `core/` می‌تواند داخل `core/` import کند
- `features/` می‌تواند از `core/` و `components/` و `lib/` import کند، و از `features/<other>` فقط از index
- `components/` می‌تواند از `core/` و `lib/` import کند، نه از `features/`
- `app/` می‌تواند از همه import کند

---

### Requirement: Mutationها از طریق Server Actions باشند، نه REST API

هر تغییر داده (create/update/delete) که از فرم/UI می‌آید، باید Server Action باشد. API Route فقط برای webhooks، callbacks، یا public API.

#### Scenario: فرم با Server Action

- **GIVEN** یک فرم در صفحه login
- **WHEN** کاربر submit می‌کند
- **THEN** فرم به یک Server Action متصل است (با `useActionState`)
- **AND** Server Action ورودی را با Zod parse می‌کند
- **AND** خروجی یک `ActionState` تایپ‌شده است

#### Scenario: webhook با API Route

- **GIVEN** زرین‌پال callback به `/api/webhooks/zarinpal/callback` می‌فرستد
- **THEN** این یک API Route است (Server Action قابل استفاده نیست)
- **AND** signature verify می‌شود قبل از پردازش

#### Scenario: ممنوع بودن fetch به API داخلی

- **WHEN** یک Client Component می‌خواهد داده تغییر دهد
- **THEN** نباید `fetch('/api/...')` بزند
- **AND** باید Server Action را صدا بزند (با import مستقیم از feature)

---

### Requirement: لایه‌بندی Repository → Service → Action باید رعایت شود

هیچ Server Action یا React Component مجاز نیست مستقیم Prisma صدا بزند. همه Database access از طریق Repository، همه business logic در Service.

#### Scenario: ساختار AuthService

- **GIVEN** Server Action `verifyOtpAction`
- **WHEN** اجرا می‌شود
- **THEN** `authService.verifyOtp()` را صدا می‌زند
- **AND** AuthService از `userRepository` استفاده می‌کند
- **AND** AuthService مستقیم `db.user.findUnique` صدا نمی‌زند

#### Scenario: ممنوع بودن Prisma در action

- **WHEN** فایلی در `features/<f>/server/actions.ts` `import { db } from '@/lib/db'` می‌نویسد
- **THEN** ESLint warning می‌دهد (در فاز بعدی به error تبدیل می‌شود)
- **AND** Code review باید reject کند

#### Scenario: Repository خروجی domain type

- **GIVEN** `userRepository.findByPhone()`
- **WHEN** صدا زده می‌شود
- **THEN** خروجی `User` (domain type) است، نه `User` Prisma type خام
- **AND** mapper `toUser()` تبدیل را انجام می‌دهد
- **AND** فیلدهای داخلی Prisma (مثل `_count`) به بیرون درز نمی‌کنند

---

### Requirement: Errorهای قابل پیش‌بینی با Result Type مدیریت شوند

برای errorهای business (validation, not found, conflict, rate limit)، service و repository از `Result<T, AppError>` استفاده می‌کنند، نه throw.

#### Scenario: Service موفق

- **GIVEN** `authService.sendOtp('09120000001')` با ورودی صحیح
- **WHEN** اجرا می‌شود
- **THEN** `{ ok: true, data: { expiresAt } }` برمی‌گرداند
- **AND** هیچ exception پرتاب نمی‌کند

#### Scenario: Service ناموفق

- **GIVEN** rate limit exceeded
- **WHEN** `authService.sendOtp` صدا زده می‌شود
- **THEN** `{ ok: false, error: AppError({ code: 'RATE_LIMIT_EXCEEDED', ... }) }` برمی‌گرداند
- **AND** هیچ exception پرتاب نمی‌کند

#### Scenario: throw فقط برای errorهای غیرمنتظره

- **GIVEN** اتصال DB قطع شده
- **WHEN** `userRepository.findByPhone` صدا زده می‌شود
- **THEN** Prisma exception throw می‌کند
- **AND** Sentry آن را می‌گیرد
- **AND** Error Boundary به کاربر «خطای سرور» نمایش می‌دهد

#### Scenario: تبدیل Result به ActionState

- **GIVEN** Server Action `verifyOtpAction` که `authService.verifyOtp()` را صدا می‌زند
- **WHEN** Result `{ ok: false, error }` می‌گیرد
- **THEN** آن را به `{ ok: false, errorCode: error.code, errorMessage: error.message }` تبدیل و به client می‌دهد
- **AND** UI بر اساس errorCode پیام i18n مناسب نشان می‌دهد

---

### Requirement: Zod باید منبع حقیقت تایپ‌ها باشد

تایپ‌های دامنه (domain types) از Zod schemas با `z.infer` استخراج می‌شوند. تایپ‌های Prisma فقط در repository استفاده می‌شوند و به بیرون درز نمی‌کنند.

#### Scenario: تعریف schema و type

- **GIVEN** `features/auth/schemas/index.ts` که `signupSchema` تعریف کرده
- **WHEN** `features/auth/types.ts` نوشته می‌شود
- **THEN** `export type SignupInput = z.infer<typeof signupSchema>` استفاده می‌شود
- **AND** هیچ تعریف دستی duplicate نیست

#### Scenario: Validation در Server Action

- **GIVEN** Server Action دریافت‌کننده `FormData`
- **WHEN** اجرا می‌شود
- **THEN** اول `signupSchema.safeParse(formData)` اجرا می‌شود
- **AND** اگر fail بود، `{ ok: false, fieldErrors }` برمی‌گرداند
- **AND** هیچ تماس بعدی به service بدون داده parse-شده انجام نمی‌شود

---

### Requirement: لاگ ساختاریافته با Pino

تمام لاگ‌ها از `src/core/logger/index.ts` استفاده می‌کنند. `console.log` در `src/` ممنوع.

#### Scenario: log در dev

- **GIVEN** `NODE_ENV=development`
- **WHEN** `logger.info({ event: 'audit', action: 'login', userId: '...' }, 'User logged in')` اجرا می‌شود
- **THEN** لاگ pretty-print شده با رنگ در stdout چاپ می‌شود

#### Scenario: log در prod

- **GIVEN** `NODE_ENV=production`
- **WHEN** همان لاگ اجرا می‌شود
- **THEN** JSON یک‌خطی با timestamp ISO، level، msg، و فیلدهای structured چاپ می‌شود

#### Scenario: request ID propagation

- **GIVEN** middleware برای هر request یک `requestId` ساخته
- **WHEN** هر لاگی در طی پردازش آن request زده می‌شود
- **THEN** فیلد `reqId` در آن لاگ موجود است
- **AND** می‌توان همه لاگ‌های یک request را با grep پیدا کرد

#### Scenario: console.log ممنوع

- **WHEN** توسعه‌دهنده `console.log('debug')` در `src/features/` می‌نویسد
- **THEN** ESLint warning می‌دهد
- **AND** CI شکست می‌خورد (در صورت تکرار، error می‌شود)

---

### Requirement: کلاینت‌های خارجی با Interface و Container DI

هر سرویس خارجی (SMS, Storage, Payment, WhatsApp, ...) ابتدا به‌صورت interface در `src/core/clients/` تعریف می‌شود. پیاده‌سازی concrete جداگانه. در `src/lib/container.ts` factory انتخاب می‌کند.

#### Scenario: استفاده از SMS client در service

- **GIVEN** AuthService نیاز به ارسال OTP دارد
- **WHEN** instance می‌شود
- **THEN** SmsClient از container().smsClient می‌گیرد
- **AND** نوع آن `SmsClient` (interface) است، نه `KavenegarSmsClient`

#### Scenario: تعویض implementation

- **WHEN** پروپوزال ۲ `KavenegarSmsClient` را اضافه می‌کند
- **THEN** فقط factory در container تغییر می‌کند
- **AND** هیچ خط کد در `AuthService` تغییر نمی‌کند

#### Scenario: mock در تست

- **GIVEN** unit test برای AuthService
- **WHEN** AuthService instance می‌شود
- **THEN** SmsClient mock داده می‌شود (`new MockSmsClient()` یا یک stub vitest)
- **AND** هیچ تماس واقعی شبکه‌ای انجام نمی‌شود

---

### Requirement: همه مدل‌های Prisma فیلدهای Audit دارند

هر مدل با `createdAt` و `updatedAt`. مدل‌های حساس (Booking, Payment) با `createdBy` و `updatedBy`.

#### Scenario: مدل پایه

- **GIVEN** هر مدل Prisma که در فاز‌های بعدی اضافه می‌شود
- **THEN** فیلدهای زیر اجباری:
  - `createdAt DateTime @default(now())`
  - `updatedAt DateTime @updatedAt`

#### Scenario: مدل حساس

- **GIVEN** مدل Booking یا Payment
- **THEN** علاوه بر بالا:
  - `createdBy String?` (FK به User)
  - `updatedBy String?`

#### Scenario: Soft delete انتخابی

- Soft delete (`deletedAt DateTime?`) **فقط** برای مدل‌هایی که نیاز به تاریخچه دارند: Room, Listing, BlogPost
- **هرگز** برای: Booking, Payment, Compliance records (که audit trail قانونی دارند)

---

### Requirement: همه ورودی‌های مرز با Zod اعتبارسنجی شوند

هر داده‌ای که از خارج (form, query, body, third-party response) وارد می‌شود، قبل از هر استفاده با Zod parse می‌شود.

#### Scenario: ورودی form

- **WHEN** Server Action `FormData` دریافت می‌کند
- **THEN** اولین خط `schema.safeParse()` است

#### Scenario: ورودی query string

- **WHEN** صفحه‌ای پارامتر `?page=2&sort=newest` می‌گیرد
- **THEN** با `searchParamsSchema.parse()` اعتبارسنجی می‌شود قبل از استفاده

#### Scenario: پاسخ third-party

- **WHEN** `KavenegarSmsClient` پاسخ JSON از کاوه‌نگار می‌گیرد
- **THEN** با `kavenegarResponseSchema.safeParse()` parse می‌شود
- **AND** اگر فرمت تغییر کرده، error مشخص (نه crash مبهم)

#### Scenario: ممنوعیت any

- **WHEN** توسعه‌دهنده `let x: any = ...` در `src/features/` یا `src/core/` می‌نویسد
- **THEN** ESLint error می‌دهد
- **AND** PR مسدود می‌شود

---

### Requirement: قراردادهای کد اعمال شوند

نام‌گذاری، formatting، و سایر قراردادهای بخش ۹.۱۰ project.md از طریق ESLint + Prettier + commitlint اجباری شوند.

#### Scenario: format on save

- **GIVEN** VSCode با `.vscode/settings.json` که از repo می‌آید
- **WHEN** توسعه‌دهنده فایلی save می‌کند
- **THEN** Prettier اعمال می‌شود
- **AND** ESLint auto-fixها اعمال می‌شوند
- **AND** importها مرتب می‌شوند

#### Scenario: commit با فرمت اشتباه

- **WHEN** توسعه‌دهنده commit با پیام «fix bug» می‌زند
- **THEN** commitlint reject می‌کند
- **AND** پیشنهاد می‌دهد: `fix: <description>` یا `feat: <description>`

#### Scenario: PR template

- **WHEN** توسعه‌دهنده PR باز می‌کند
- **THEN** description پیش‌پر می‌شود با چک‌لیست استاندارد

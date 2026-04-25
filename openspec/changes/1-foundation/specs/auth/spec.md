# Spec Delta — auth

> این فایل **delta** نسبت به `openspec/specs/auth/spec.md` است. چون پروژه greenfield است، همه requirements زیر `ADDED` هستند.

## ADDED Requirements

### Requirement: کاربر باید با شماره موبایل و OTP ثبت‌نام/ورود کند

تنها روش احراز هویت در این فاز، شماره موبایل ایرانی + کد یک‌بارمصرف پیامکی است. ایمیل/پسورد در این فاز پشتیبانی نمی‌شود.

#### Scenario: ثبت‌نام موفق با OTP

- **GIVEN** کاربر جدید با شماره `09123456789`
- **WHEN** در `/signup` شماره را وارد و روی «ارسال کد» کلیک می‌کند
- **THEN** کد OTP به شماره ارسال می‌شود (در این پروپوزال mock، کد `123456` است)
- **AND** فرم مرحله دوم (وارد کردن کد) نمایش داده می‌شود
- **WHEN** کاربر کد صحیح را وارد می‌کند
- **THEN** یک کاربر جدید با نقش پیش‌فرض `GUEST` در DB ساخته می‌شود
- **AND** session ایجاد و به `/` ریدایرکت می‌شود

#### Scenario: ورود کاربر موجود

- **GIVEN** کاربری که قبلاً ثبت‌نام کرده
- **WHEN** در `/login` شماره موبایل را وارد می‌کند و کد صحیح می‌زند
- **THEN** session ایجاد می‌شود با نقش موجود کاربر (GUEST یا OWNER یا ADMIN)

#### Scenario: کد نامعتبر

- **WHEN** کاربر کد اشتباه وارد می‌کند
- **THEN** فرم خطای «کد نامعتبر» نشان می‌دهد
- **AND** session ایجاد نمی‌شود

#### Scenario: اعتبارسنجی فرمت شماره ایرانی

- **WHEN** کاربر شماره‌ای که با `09` شروع نمی‌شود یا طول آن ۱۱ رقم نیست وارد می‌کند
- **THEN** فرم خطای اعتبارسنجی پیش از ارسال نشان می‌دهد

---

### Requirement: سه نقش `GUEST`, `OWNER`, `ADMIN` در سیستم تعریف شوند

هر کاربر دقیقاً یک نقش دارد. نقش در فیلد `role` جدول `User` (enum Prisma) ذخیره می‌شود.

#### Scenario: نقش پیش‌فرض

- **WHEN** کاربر جدید ثبت‌نام می‌کند
- **THEN** نقش او `GUEST` است

#### Scenario: دسترسی نقش‌ها

- `GUEST` می‌تواند به `/`, `/about`, `/contact`, `/dashboard` دسترسی داشته باشد
- `OWNER` همه چیز GUEST + `/owner/*`
- `ADMIN` همه مسیرها

#### Scenario: دسترسی به role در کد

- **WHEN** یک Server Component تابع `getCurrentUser()` را صدا می‌زند
- **THEN** `{ id, phone, role }` برگردانده می‌شود
- **AND** در همان request، از `cache()` استفاده می‌شود (نه DB hit اضافه)

---

### Requirement: Middleware باید مسیرهای محافظت‌شده را پوشش دهد

مسیرهای `/owner/*` و `/admin/*` نیازمند session هستند. مسیر `/admin/*` فقط با نقش `ADMIN` قابل دسترسی است.

#### Scenario: دسترسی بدون session

- **GIVEN** کاربر بدون session
- **WHEN** به `/owner/dashboard` می‌رود
- **THEN** به `/login?callbackUrl=/owner/dashboard` ریدایرکت می‌شود
- **AND** بعد از ورود موفق، به `/owner/dashboard` برگردانده می‌شود

#### Scenario: دسترسی GUEST به `/admin`

- **GIVEN** کاربر با نقش `GUEST`
- **WHEN** به `/admin/anywhere` می‌رود
- **THEN** به صفحه 403 ریدایرکت می‌شود (نه صفحه login)

#### Scenario: دسترسی OWNER به پنل خود

- **GIVEN** کاربر با نقش `OWNER`
- **WHEN** به `/owner/dashboard` می‌رود
- **THEN** دسترسی دارد و صفحه render می‌شود

---

### Requirement: Auth.js v5 باید با split config پیاده شود

پیکربندی Auth باید به دو فایل تقسیم شود:

- `src/lib/auth.config.ts` — edge-safe، بدون DB call، فقط declarations
- `src/lib/auth.ts` — Node runtime، با PrismaAdapter و DB session

#### Scenario: Middleware در edge runtime

- **GIVEN** `src/middleware.ts` که فقط `auth.config.ts` را import می‌کند
- **WHEN** middleware روی edge اجرا می‌شود
- **THEN** هیچ import از Prisma یا `auth.ts` ندارد
- **AND** بدون خطا اجرا می‌شود

#### Scenario: session strategy

- **WHEN** کاربر login می‌کند
- **THEN** session در جدول `Session` دیتابیس ذخیره می‌شود (نه JWT)
- **AND** cookie فقط شناسه session را دارد، نه کل payload

---

### Requirement: رابط `SmsClient` باید از روز اول تعریف شود

برای جلوگیری از coupling زودهنگام به یک ارائه‌دهنده خاص، یک رابط `SmsClient` در `src/core/notifications/sms-client.ts` تعریف می‌شود. در این فاز فقط `MockSmsClient` پیاده‌سازی می‌شود.

#### Scenario: رابط

```ts
interface SmsClient {
  sendOtp(phone: string, code: string): Promise<void>;
  send(phone: string, message: string): Promise<void>;
}
```

#### Scenario: Mock در dev/test

- **GIVEN** `NODE_ENV !== production`
- **WHEN** `MockSmsClient.sendOtp('09123456789', '123456')` صدا زده می‌شود
- **THEN** کد در `console.log` چاپ می‌شود
- **AND** هیچ تماس شبکه‌ای انجام نمی‌شود

#### Scenario: Production بدون provider واقعی

- **GIVEN** `NODE_ENV === production` و `MockSmsClient` فعال
- **WHEN** برنامه startup می‌شود
- **THEN** یک warning لاگ می‌شود: «SmsClient واقعی تنظیم نشده — پروپوزال ۲ باید KavenegarSmsClient را اضافه کند»

---

### Requirement: seed script برای محیط توسعه

اسکریپت `prisma/seed.ts` باید سه کاربر نمونه بسازد تا توسعه‌دهنده بدون ثبت‌نام دستی بتواند کار کند.

#### Scenario: اجرای seed

- **WHEN** `pnpm prisma db seed` اجرا می‌شود
- **THEN** سه کاربر ساخته می‌شوند با **شماره‌های موبایل ایرانی معتبر**:
  - `09120000001` با نقش `ADMIN`
  - `09120000002` با نقش `OWNER`
  - `09120000003` با نقش `GUEST`
- **AND** هر سه با کد OTP ثابت `123456` قابل ورودند (در dev)

#### Scenario: جلوگیری از اجرای seed در production

- **WHEN** seed در `NODE_ENV=production` اجرا شود
- **THEN** بلافاصله خطا می‌دهد و خروج می‌کند

#### Scenario: رعایت اعتبارسنجی شماره موبایل

- **GIVEN** regex اعتبارسنجی شماره موبایل ایرانی (`/^09\d{9}$/` با prefixهای معتبر `091`, `092`, `093`, `099`)
- **WHEN** seed اجرا می‌شود
- **THEN** همه شماره‌ها از این regex پاس می‌شوند
- **AND** این تضمین می‌کند seed در آینده با افزودن validation نمی‌شکند

---

### Requirement: OTP endpoints باید Rate Limit داشته باشند

برای جلوگیری از SMS bombing و enumeration، endpoint ارسال OTP باید rate limit داشته باشد — هم per IP، هم per phone number.

#### Scenario: محدودیت per IP

- **GIVEN** یک IP مشخص
- **WHEN** بیش از ۳ درخواست OTP در ۶۰ ثانیه ارسال می‌کند
- **THEN** چهارمین درخواست HTTP 429 برمی‌گرداند
- **AND** header `Retry-After: <seconds>` دارد
- **AND** body شامل `{ error: "RATE_LIMIT_EXCEEDED", retryAfter: <number> }` است

#### Scenario: محدودیت per phone number

- **GIVEN** چند IP مختلف
- **WHEN** همه‌شان برای یک شماره موبایل مشخص OTP می‌فرستند (بیش از ۳ در ۶۰ ثانیه)
- **THEN** چهارمین درخواست بلاک می‌شود حتی اگر از IP جدید باشد

#### Scenario: dev بدون Redis

- **GIVEN** `NODE_ENV=development` و بدون `RATE_LIMIT_REDIS_URL`
- **WHEN** rate limiter استفاده می‌شود
- **THEN** از یک in-memory store استفاده می‌کند
- **AND** رفتار مشابه prod دارد (۳ در ۶۰ ثانیه)
- **AND** هیچ خطای startup ندارد

#### Scenario: prod بدون Redis

- **GIVEN** `NODE_ENV=production` و بدون `RATE_LIMIT_REDIS_URL`
- **WHEN** برنامه startup می‌شود
- **THEN** با پیام خطای روشن crash می‌کند: «RATE_LIMIT_REDIS_URL الزامی در production»
- **AND** اجازه نمی‌دهد برنامه بالا بیاید (چون رها کردن امنیت در prod قابل قبول نیست)

#### Scenario: پاک کردن پنجره rate limit

- **GIVEN** کاربر قبلاً rate limit خورده
- **WHEN** ۶۰ ثانیه از اولین درخواست گذشت
- **THEN** sliding window ریست می‌شود
- **AND** کاربر می‌تواند دوباره درخواست بدهد

---

### Requirement: API route تماس نیز باید Rate Limit داشته باشد

`POST /api/contact` endpoint spam-prone است. باید rate limit ضعیف‌تر (پروفایل `api`) داشته باشد.

#### Scenario: اسپم کردن فرم تماس

- **GIVEN** یک IP
- **WHEN** بیش از ۶۰ درخواست در ۶۰ ثانیه می‌فرستد
- **THEN** درخواست‌های اضافه HTTP 429 برمی‌گردانند

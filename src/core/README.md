# `src/core/` — هسته قفل

⛔ **این پوشه را مشتری تغییر نمی‌دهد.** هر مشتری Premium که `core/` را دست‌کاری کند، از پوشش آپدیت نسخه‌های آینده خارج می‌شود (بخش ۲.۲ [`docs/PROJECT.md`](../../docs/PROJECT.md)).

## محتوا

| زیرپوشه            | محتوا                                               | پروپوزال                  |
| ------------------ | --------------------------------------------------- | ------------------------- |
| `result/`          | `Result<T, E>`, `ok()`, `err()`                     | ۱ (task 6.1)              |
| `errors/`          | `AppError`, `ErrorCode` enum                        | ۱ (task 6.2-6.3)          |
| `logger/`          | Pino instance + `AsyncLocalStorage` request context | ۱ (task 6.4-6.6)          |
| `clients/sms/`     | interface `SmsClient` + پیاده‌سازی Mock/Kavenegar   | ۱ Mock، ۲ Kavenegar       |
| `clients/storage/` | interface `StorageClient` + پیاده‌سازی Mock/Arvan   | ۱ interface، ۲ پیاده‌سازی |
| `security/`        | rate limiter (in-memory + Upstash Redis)            | ۱ (task 8)                |

پوشه‌های آینده (پروپوزال‌های بعدی): `clients/payment/`, `clients/whatsapp/`, `compliance/`, `notifications/`, `booking/state-machine/`.

## قواعد (با ESLint اجباری — `singo/no-core-internal-leak`)

- ❌ هیچ import از `@/overrides/*` (value یا type یا dynamic — همه block)
- ❌ هیچ import از `@/features/*` — core نباید به feature خاصی متعهد باشد
- ✅ از `@/core/*` و `@/lib/*` آزاد
- ✅ از `@/components/*` (در صورت نیاز) آزاد
- ✅ از npm packages آزاد

اگر core نیاز به business logic feature دارد، **الگوی Dependency Inversion** را
اعمال کنید: یک interface در `core/clients/<service>/` تعریف کنید و feature
آن را پیاده‌سازی کند (الگوی `SmsClient`/`StorageClient` را ببینید).

## افزودن چیز جدید

اگر می‌خواهید چیزی به `core/` اضافه کنید، اول از خود بپرسید:

1. آیا این **به feature خاصی متعلق است**؟ → به `features/<X>/` ببرید.
2. آیا این **business logic** است؟ → احتمالاً به `features/` متعلق است.
3. آیا این **cross-cutting infrastructure** است (logger, error, client interface)؟ → بله، `core/`.

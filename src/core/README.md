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

## قواعد

- ❌ هیچ import از `@/overrides` (با ESLint `singo/no-core-internal-leak` اجباری)
- ❌ هیچ import از `@/features/*` — core نباید به feature خاصی وابسته باشد
- ✅ از `@/core/*` و `@/lib/*` می‌تواند import کند
- ✅ از npm packageها می‌تواند import کند

## افزودن چیز جدید

اگر می‌خواهید چیزی به `core/` اضافه کنید، اول از خود بپرسید:

1. آیا این **به feature خاصی متعلق است**؟ → به `features/<X>/` ببرید.
2. آیا این **business logic** است؟ → احتمالاً به `features/` متعلق است.
3. آیا این **cross-cutting infrastructure** است (logger, error, client interface)؟ → بله، `core/`.

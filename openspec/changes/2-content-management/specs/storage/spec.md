# Spec Delta — storage

## ADDED Requirements

### Requirement: Interface `StorageClient` باید سه عملیات اصلی پشتیبانی کند

```ts
interface StorageClient {
  getPresignedUploadUrl(
    key: string,
    contentType: string,
    expiresIn?: number,
  ): Promise<{ url: string; fields?: Record<string, string> }>;

  getPublicUrl(key: string): string;

  delete(key: string): Promise<void>;
}
```

#### Scenario: گرفتن presigned URL

- **GIVEN** کاربر OWNER می‌خواهد تصویر آپلود کند
- **WHEN** Server Action `getUploadUrlAction('rooms/abc.jpg', 'image/jpeg')` صدا زده می‌شود
- **THEN** validate انجام می‌شود (allowlist mime type)
- **AND** key یکتا با UUID ساخته می‌شود
- **AND** `storageClient.getPresignedUploadUrl()` صدا زده می‌شود
- **AND** URL با expiry ۱۵ دقیقه برمی‌گردد

#### Scenario: نمایش تصویر

- **GIVEN** key `rooms/uuid.webp` در DB
- **WHEN** RSC تصویر را render می‌کند
- **THEN** `<Image src={storageClient.getPublicUrl(key)} ...>` استفاده می‌شود

#### Scenario: حذف تصویر

- **WHEN** owner تصویر را حذف می‌کند
- **THEN** Server Action رکورد DB را پاک می‌کند
- **AND** `storageClient.delete(key)` صدا می‌زند
- **AND** اگر S3 خطا داد، فقط لاگ می‌شود (DB حذف اولویت دارد)

---

### Requirement: پیاده‌سازی MockStorageClient برای dev

#### Scenario: dev بدون آروان

- **GIVEN** `NODE_ENV=development` و `ARVAN_S3_ENDPOINT` خالی
- **WHEN** container ساخته می‌شود
- **THEN** `MockStorageClient` انتخاب می‌شود
- **AND** آپلودها در `public/uploads/` ذخیره می‌شوند
- **AND** URL محلی `/uploads/...` برگردانده می‌شود

---

### Requirement: پیاده‌سازی ArvanS3StorageClient

#### Scenario: prod با آروان

- **GIVEN** env متغیرهای آروان تنظیم شده‌اند
- **WHEN** container ساخته می‌شود
- **THEN** `ArvanS3StorageClient` با AWS SDK v3 (S3-compatible) instance می‌شود
- **AND** آپلود مستقیم client → S3 کار می‌کند

---

### Requirement: پردازش WebP و thumbnail در API Route با node runtime

#### Scenario: پس از confirm آپلود

- **GIVEN** کاربر `confirmUploadAction(key)` را صدا زده
- **WHEN** Server Action اجرا می‌شود
- **THEN** رکورد DB با URL اصلی ساخته می‌شود
- **AND** `after()` یک fetch به `/api/internal/process-image` با token signed می‌فرستد
- **AND** آن endpoint با `runtime: 'nodejs'` تصویر را با `sharp` به WebP در ۳ اندازه (320, 800, 1600) تبدیل می‌کند
- **AND** width و height در DB آپدیت می‌شوند
- **AND** `revalidateTag` صدا می‌زند

---

### Requirement: محدودیت‌های امنیتی آپلود

#### Scenario: mime type غیرمجاز

- **WHEN** فایل `application/pdf` upload شود
- **THEN** Server Action با AppError `INVALID_FILE_TYPE` reject می‌کند

#### Scenario: size بیش از حد

- **WHEN** فایل > ۱۰MB upload شود
- **THEN** client-side ابتدا رد می‌کند
- **AND** S3 با policy ست‌شده در presigned URL هم رد می‌کند

#### Scenario: rate limit آپلود

- **WHEN** owner بیش از ۲۰ آپلود در دقیقه می‌کند
- **THEN** rate limit (`upload` profile جدید) فعال می‌شود
- **AND** HTTP 429

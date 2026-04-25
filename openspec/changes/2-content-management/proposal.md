# Proposal: ۲ — مدیریت محتوا (Content Management)

> **وضعیت:** پیش‌نویس (نوشته‌شده با استانداردهای معماری Phase 1)
> **نویسنده:** تیم سینگو
> **تاریخ:** 2026-04-25
> **پیش‌نیاز:** پروپوزال ۱ (`1-foundation`) کاملاً پیاده شده باشد
> **پروپوزال‌های متکی به این:** ۳، ۶، ۷، ۸

---

## Why

پروپوزال ۱ یک **شل کار‌کن** ساخت — صفحات skeleton با متن از i18n و کاربر می‌تواند ثبت‌نام کند. اما **هیچ محتوای دامنه‌ای** (اقامتگاه، اتاق، گالری، جاذبه، بلاگ) ندارد. صاحب اقامتگاه نمی‌تواند چیزی به سایت اضافه کند.

این پروپوزال:

1. **مدل‌های محتوا** را در Prisma اضافه می‌کند (Room, Gallery, Attraction, BlogPost, ContactMessage)
2. **پنل Owner** را با CRUD برای این مدل‌ها می‌سازد
3. **صفحات عمومی** را به‌جای داده استاتیک، به داده real از DB متصل می‌کند
4. **آپلود تصویر** را با آروان S3 پیاده می‌کند (پیاده‌سازی واقعی `StorageClient`)
5. **پیامک واقعی** را با کاوه‌نگار پیاده می‌کند (پیاده‌سازی واقعی `SmsClient`)

این فاز **پایه برای فاز رزرو** (پروپوزال ۳) است: بدون مدل Room، رزرو معنی ندارد.

## Prerequisites

- [ ] پروپوزال ۱ کاملاً archive شده و spec ها به `openspec/specs/` ادغام شده‌اند
- [ ] تست‌های پروپوزال ۱ همه سبز
- [ ] **تصمیم درباره account آروان S3:** ساخته شده یا تصمیم به تأخیر؟ — اگر تأخیر، فقط `MockStorageClient` استفاده می‌شود (فایل‌ها در `public/uploads/` لوکال)
- [ ] **تصمیم درباره account کاوه‌نگار:** ساخته شده یا تأخیر؟ — اگر تأخیر، `MockSmsClient` ادامه می‌دهد

> این تأخیرها قابل قبول‌اند چون container DI الگو را پایدار نگه می‌دارد. هنگام آماده‌بودن، فقط env و factory آپدیت می‌شود.

## What Changes

### ۱. مدل‌های دامنه (Prisma)

- `Room` (اتاق/واحد قابل رزرو)
- `RoomImage` (تصاویر گالری اتاق)
- `Amenity` + `RoomAmenity` (امکانات و رابطه many-to-many)
- `Gallery` + `GalleryImage` (گالری مستقل سایت)
- `Attraction` (جاذبه‌های نزدیک با مختصات)
- `BlogPost` + `BlogCategory` (سیستم بلاگ ساده)
- `ContactMessage` (ذخیره پیام‌های فرم تماس از فاز ۱)

همه با فیلدهای audit (createdAt, updatedAt) و soft delete (`deletedAt`) برای Room/Gallery/BlogPost.

### ۲. Featureهای جدید

- `features/room/` — CRUD اتاق با repository, service, action
- `features/gallery/` — مدیریت گالری
- `features/attraction/` — جاذبه‌ها
- `features/blog/` — بلاگ
- `features/contact/` (تکمیل از فاز ۱) — ذخیره پیام‌ها در DB

هر کدام با ساختار Feature-Sliced استاندارد.

### ۳. پنل Owner (`/owner/*`)

- `/owner` — داشبورد (تعداد اتاق، آخرین پیام تماس، …)
- `/owner/rooms` — لیست + ایجاد + ویرایش + soft delete اتاق
- `/owner/rooms/:id` — جزئیات و گالری
- `/owner/gallery` — مدیریت گالری مستقل
- `/owner/attractions` — مدیریت جاذبه‌ها
- `/owner/blog` — مدیریت بلاگ (با rich text editor ساده)
- `/owner/messages` — مشاهده پیام‌های فرم تماس
- `/owner/settings` — تنظیمات کلی (شامل توصیف برند، اطلاعات تماس)

### ۴. صفحات عمومی به‌روزرسانی‌شده

- `/` (Home) — حالا اقامتگاه‌های ویژه را از DB می‌خواند (نه placeholder)
- `/rooms` — لیست همه اتاق‌ها با فیلتر ساده (ظرفیت، قیمت)
- `/rooms/[slug]` — صفحه جزئیات اتاق با گالری و امکانات (هنوز بدون رزرو — آن در فاز ۳)
- `/attractions` — لیست جاذبه‌های نزدیک
- `/blog` و `/blog/[slug]` — اگر `features.blog: true` فعال باشد
- `/gallery` — اگر `features.gallery: true` فعال باشد

### ۵. Storage واقعی (آروان S3)

- `ArvanS3StorageClient` پیاده‌سازی `StorageClient`
- `next/image` با custom loader برای آروان CDN
- `MockStorageClient` (لوکال فایل) به‌عنوان fallback dev بدون credentials
- آپلود با presigned URL (مستقیم از client به S3، بدون عبور از سرور Next.js)
- محدودیت سایز و فرمت در سمت سرور (Zod)
- WebP conversion سرور (با `sharp`) قبل از آپلود

### ۶. SMS واقعی (کاوه‌نگار)

- `KavenegarSmsClient` پیاده‌سازی `SmsClient`
- استفاده از template OTP کاوه‌نگار
- handle خطاهای کاوه‌نگار (شماره نامعتبر، quota، …)

### ۷. Rich text editor

- `tiptap` برای ویرایش بلاگ و توصیف اتاق
- خروجی HTML تمیز با sanitization (DOMPurify در client + sanitize-html در server)

## What is OUT of scope

- ❌ سیستم رزرو (→ پروپوزال ۳)
- ❌ تقویم در دسترس بودن اتاق (→ پروپوزال ۳)
- ❌ کد ملی، مالیات ۹٪، مؤدیان (→ پروپوزال ۴)
- ❌ پرداخت (→ پروپوزال ۵)
- ❌ اعلان واتساپ به owner (→ پروپوزال ۶)
- ❌ نقشه interactive روی صفحه جاذبه‌ها (→ پروپوزال ۷)
- ❌ SEO پیشرفته (sitemap per room, JSON-LD) (→ پروپوزال ۷)
- ❌ نظرات کاربر روی اتاق‌ها (→ پروپوزال آینده، احتمالاً ۶ یا ۸)

## Impact

### Affected Capabilities (spec deltas)

- **ADDED `content-management`** — تعریف کلی CRUD محتوا و Repository pattern
- **ADDED `owner-panel`** — UI پنل owner، routing، protected access
- **MODIFIED `public-pages`** — صفحات public حالا از DB می‌خوانند
- **MODIFIED `auth`** — `MockSmsClient` به `KavenegarSmsClient` در prod (بدون تغییر API)
- **ADDED `storage`** — interface و پیاده‌سازی آپلود تصویر

### Affected Code

- `prisma/schema.prisma` با ۸-۱۰ مدل جدید
- `src/features/{room,gallery,attraction,blog,contact}/` — ۵ feature جدید
- `src/app/owner/` — کل ساختار پنل
- `src/app/(site)/{rooms,attractions,blog,gallery}/` — صفحات public جدید
- `src/core/clients/storage/arvan-s3-storage-client.ts`
- `src/core/clients/sms/kavenegar-sms-client.ts`

### Affected Users

- **Owner:** برای اولین بار می‌تواند محتوا را خودش مدیریت کند
- **Guest:** صفحات با محتوای واقعی می‌بیند، نه placeholder
- **Admin (Singo team):** هنگام راه‌اندازی مشتری جدید، می‌تواند seed محتوا را به صورت SQL یا script بدهد و بعد owner ادامه دهد

### Risks

| ریسک                                          | کاهش                                                              |
| --------------------------------------------- | ----------------------------------------------------------------- |
| Rich text editor (tiptap) bundle size بزرگ    | code splitting + dynamic import در صفحات owner                    |
| Upload به آروان از client مستقیم با CORS مشکل | تست زودهنگام؛ fallback به upload از سرور اگر مشکل بود             |
| sharp روی edge runtime کار نمی‌کند            | WebP conversion فقط در API Route یا Server Action با node runtime |
| `Slug` تکراری در Room/BlogPost                | unique constraint در Prisma + auto-suffix در service              |
| owner اشتباهاً همه اتاق‌ها را delete کند      | soft delete + UI confirmation + undo (۳۰ روز)                     |
| migration روی DB موجود (با کاربران از فاز ۱)  | همه migrations expand-contract، test روی staging                  |
| sanitization HTML ناکافی → XSS                | دو لایه: DOMPurify (client) + sanitize-html (server) + CSP header |

## Estimated Effort

- **زمان:** **۶-۷ هفته** نفر-تقویمی برای تیم ۲ نفره
  - مدل‌ها و migrations: ۳ روز
  - feature room (CRUD + UI): ۱.۵ هفته
  - feature gallery + attraction: ۱ هفته
  - feature blog + tiptap: ۱.۵ هفته
  - پنل owner shell + داشبورد: ۱ هفته
  - upload و آروان S3: ۱ هفته
  - کاوه‌نگار: ۲ روز
  - تست + مستندسازی: ۱ هفته
- **پیچیدگی فنی:** متوسط (CRUD ساده + upload + rich text)
- **نقاط ریسک بالا:** آپلود مستقیم از client، sharp روی edge، sanitization HTML

## Acceptance Criteria

### فنی

- [ ] همه featureهای جدید ساختار Feature-Sliced استاندارد را رعایت می‌کنند
- [ ] هیچ Server Action مستقیم `db.*` صدا نمی‌زند (همه از طریق repository)
- [ ] همه service ها Result type برمی‌گردانند
- [ ] coverage ≥ ۸۰٪ روی featureهای جدید
- [ ] `pnpm build` بدون خطا
- [ ] migration روی DB پروپوزال ۱ بدون data loss اجرا می‌شود (تست شده)
- [ ] expand-contract pattern رعایت شده (هیچ تغییر شکست‌بار)

### کاربردی

- [ ] owner می‌تواند اتاق ایجاد، ویرایش، و حذف (soft) کند
- [ ] owner می‌تواند تصویر آپلود کند (لوکال یا آروان بسته به env)
- [ ] owner می‌تواند جاذبه با مختصات اضافه کند (نقشه interactive در فاز ۷)
- [ ] owner می‌تواند بلاگ پست بنویسد با rich text editor
- [ ] owner می‌تواند پیام‌های فرم تماس را ببیند
- [ ] guest در `/rooms` لیست واقعی اتاق‌ها را می‌بیند
- [ ] guest در `/rooms/[slug]` جزئیات اتاق + گالری را می‌بیند
- [ ] feature flag `features.blog: false` صفحات بلاگ را مخفی می‌کند

### کیفیت محصول

- [ ] **تست خارجی owner:** یک نفر non-tech (مثلاً صاحب یک اقامتگاه واقعی یا شبیه‌ساز) باید بتواند **بدون آموزش** ۳ اتاق با ۵ تصویر هرکدام در ≤ ۳۰ دقیقه ایجاد کند
- [ ] هیچ XSS قابل پیاده‌سازی در فیلدهای rich text (با تست penetration ساده)
- [ ] Lighthouse `/rooms` و `/rooms/[slug]` ≥ ۹۰ Performance با ۲۰ اتاق نمونه
- [ ] صفحه `/rooms` با ۱۰۰ اتاق در DB، در ≤ ۲ ثانیه TTI

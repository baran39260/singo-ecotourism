# Tasks — 2-content-management

> **تخمین:** ۶-۷ هفته. هر تسک باید ساختار Feature-Sliced و Repository/Service/Action را رعایت کند.

## 0. پیش‌نیازها

- [ ] 0.1 پروپوزال ۱ archive شده، spec ها در `openspec/specs/`
- [ ] 0.2 testهای پروپوزال ۱ سبز روی main
- [ ] 0.3 تصمیم آروان S3: حساب آماده یا تأخیر (تعیین می‌کند `MockStorageClient` فعال بماند)
- [ ] 0.4 تصمیم کاوه‌نگار: حساب آماده یا تأخیر

## 1. مدل‌های Prisma

- [ ] 1.1 افزودن مدل `Room` با فیلدهای: id, slug (unique), title, description, capacity, basePrice, area, bedCount, deletedAt, createdAt, updatedAt
- [ ] 1.2 افزودن مدل `RoomImage` با: id, roomId (FK), url, alt, order, createdAt
- [ ] 1.3 افزودن مدل `Amenity` با: id, slug, label, icon
- [ ] 1.4 افزودن جدول رابطه `RoomAmenity` (many-to-many)
- [ ] 1.5 افزودن مدل `Gallery` با: id, slug, title, deletedAt, createdAt, updatedAt
- [ ] 1.6 افزودن مدل `GalleryImage` با: id, galleryId, url, alt, order
- [ ] 1.7 افزودن مدل `Attraction` با: id, title, description, lat, lng, distanceKm, imageUrl, createdAt, updatedAt
- [ ] 1.8 افزودن مدل `BlogCategory` با: id, slug, name
- [ ] 1.9 افزودن مدل `BlogPost` با: id, slug, title, excerpt, contentHtml, categoryId, coverImageUrl, publishedAt, deletedAt, createdAt, updatedAt
- [ ] 1.10 افزودن مدل `ContactMessage` با: id, name, phone, email, message, readAt, createdAt
- [ ] 1.11 ایجاد migration (تک migration یا چند migration کوچک، هر دو قابل قبول)
- [ ] 1.12 آپدیت `prisma/seed.ts` با: ۳ Amenity پیش‌فرض، ۲ Room نمونه، ۲ Attraction، ۱ BlogCategory، ۱ BlogPost
- [ ] 1.13 تست integration: seed اجرا شود و داده‌ها قابل query باشند

## 2. Feature: room (CRUD اتاق)

- [ ] 2.1 ایجاد `features/room/schemas/index.ts` با: `roomCreateSchema`, `roomUpdateSchema`, `roomFilterSchema`, `slugSchema`
- [ ] 2.2 ایجاد `features/room/types.ts` (z.infer از schemas + `Room`, `RoomWithImages`)
- [ ] 2.3 ایجاد `features/room/server/repository.ts`:
  - `roomRepository.findBySlug(slug)`
  - `roomRepository.findById(id)`
  - `roomRepository.list(filter)` — با pagination
  - `roomRepository.listFeatured(limit)` — برای صفحه اصلی
  - `roomRepository.create(input, ownerId)`
  - `roomRepository.update(id, input)`
  - `roomRepository.softDelete(id)`
  - `roomRepository.restore(id)` — undo
  - mapper `toRoom()`, `toRoomWithImages()`
- [ ] 2.4 ایجاد `features/room/services/room-service.ts` با Result type روی همه متدها
- [ ] 2.5 ایجاد `features/room/server/queries.ts` با `getRooms`, `getRoom(slug)`, `getFeaturedRooms` (با React `cache()`)
- [ ] 2.6 ایجاد `features/room/server/actions.ts` با:
  - `createRoomAction`
  - `updateRoomAction`
  - `softDeleteRoomAction` + `restoreRoomAction`
  - `addRoomImageAction`, `removeRoomImageAction`, `reorderRoomImagesAction`
  - همه با `revalidateTag('rooms')` و `revalidateTag('room:'+slug)`
- [ ] 2.7 ایجاد `features/room/index.ts` با public API
- [ ] 2.8 unit test: `RoomService` با mock repository
- [ ] 2.9 integration test: `roomRepository` با test DB
- [ ] 2.10 ESLint check: هیچ import داخلی به feature

## 3. Feature: gallery

- [ ] 3.1-3.10 مشابه ساختار feature room (schemas, types, repository, service, queries, actions, index, tests)

## 4. Feature: attraction

- [ ] 4.1-4.10 مشابه ساختار feature room
- [ ] 4.11 اعتبارسنجی مختصات GPS در schema (lat: -90..90, lng: -180..180)

## 5. Feature: blog

- [ ] 5.1-5.10 مشابه ساختار feature room (با مدل BlogPost و BlogCategory)
- [ ] 5.11 منطق `publishedAt`: draft (null) و published (timestamp)
- [ ] 5.12 query عمومی فقط publishedAt < now برمی‌گرداند
- [ ] 5.13 `featureFlag.blog === false` → query در public pages اجرا نشود

## 6. Feature: contact (تکمیل از فاز ۱)

- [ ] 6.1 افزودن `repository.ts` و `service.ts` به feature موجود
- [ ] 6.2 update `submitContactAction`: حالا واقعاً در DB ذخیره می‌کند
- [ ] 6.3 `contactService.list(filter)` برای پنل owner
- [ ] 6.4 `contactService.markAsRead(id)`
- [ ] 6.5 unit + integration test

## 7. Storage Client (آروان S3)

- [ ] 7.1 ارتقای interface `StorageClient` در `core/clients/storage/`:
  - `getPresignedUploadUrl(key, contentType): { url, fields }`
  - `getPublicUrl(key): string`
  - `delete(key): Promise<void>`
- [ ] 7.2 پیاده‌سازی `MockStorageClient` (فایل در `public/uploads/`، URL محلی)
- [ ] 7.3 پیاده‌سازی `ArvanS3StorageClient` با AWS SDK v3 (آروان S3-compatible است)
- [ ] 7.4 آپدیت `container.ts`: انتخاب بر اساس env (`ARVAN_S3_ENDPOINT` etc.)
- [ ] 7.5 ایجاد `next.config.ts` image loader سفارشی برای آروان CDN
- [ ] 7.6 تنظیم CORS در S3 bucket آروان (mostly through Arvan panel)
- [ ] 7.7 unit test: MockStorageClient
- [ ] 7.8 integration test: ArvanS3StorageClient (skip اگر env tanha نیست)

## 8. آپلود تصویر (سرور و کلاینت)

- [ ] 8.1 Server Action `getUploadUrlAction(filename, contentType)` که presigned URL برمی‌گرداند
- [ ] 8.2 اعتبارسنجی: contentType فقط `image/jpeg|png|webp`، size ≤ ۱۰MB در client‌side
- [ ] 8.3 client component `ImageUploader` با drag-drop (react-dropzone یا native)
- [ ] 8.4 progress bar برای آپلود
- [ ] 8.5 Server Action `confirmUploadAction(key, dimensions)` که URL را به DB می‌نویسد
- [ ] 8.6 پردازش WebP در سرور با `sharp` (در API route با node runtime)
- [ ] 8.7 thumbnail generation (سه اندازه: 320, 800, 1600)
- [ ] 8.8 جلوگیری از orphan images: cron یا cleanup که keyهای بدون رفرنس را پس از ۲۴ ساعت حذف می‌کند
- [ ] 8.9 تست E2E: آپلود واقعی و دیدن در گالری

## 9. SMS Client (کاوه‌نگار)

- [ ] 9.1 پیاده‌سازی `KavenegarSmsClient` در `core/clients/sms/`
- [ ] 9.2 استفاده از template OTP کاوه‌نگار (نه پیامک متنی برای OTP — bulk SMS بلاک می‌شود)
- [ ] 9.3 retry با exponential backoff (۲ تلاش)
- [ ] 9.4 لاگ از طریق Pino با اطلاعات (شماره، template، messageId)
- [ ] 9.5 آپدیت `container.ts`: انتخاب بر اساس env
- [ ] 9.6 تست integration با mock کاوه‌نگار (msw یا nock)

## 10. Rich Text Editor (Tiptap)

- [ ] 10.1 نصب `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-image`, `@tiptap/extension-link`
- [ ] 10.2 ایجاد کامپوننت `components/ui/rich-editor/` با toolbar فارسی
- [ ] 10.3 dynamic import (`next/dynamic` با `ssr: false`) برای bundle splitting
- [ ] 10.4 خروجی HTML با `editor.getHTML()`
- [ ] 10.5 sanitize در client با DOMPurify قبل از submit
- [ ] 10.6 sanitize در server با `sanitize-html` در service `createBlogPost`
- [ ] 10.7 تست XSS: تلاش inject `<script>`, `<iframe>`, `onerror=` → همه حذف شوند
- [ ] 10.8 افزودن CSP header در `next.config.ts` (`Content-Security-Policy`)

## 11. پنل Owner

- [ ] 11.1 `app/owner/layout.tsx` با sidebar navigation و header
- [ ] 11.2 محافظت با middleware (از فاز ۱) — فقط نقش OWNER یا ADMIN
- [ ] 11.3 `app/owner/page.tsx` — داشبورد:
  - تعداد اتاق
  - تعداد پیام unread
  - آخرین فعالیت
  - لینک‌های سریع
- [ ] 11.4 `app/owner/rooms/page.tsx` — جدول لیست اتاق با فیلتر، sort، delete (soft)
- [ ] 11.5 `app/owner/rooms/new/page.tsx` — فرم ایجاد اتاق
- [ ] 11.6 `app/owner/rooms/[id]/page.tsx` — فرم ویرایش + گالری اتاق
- [ ] 11.7 `app/owner/gallery/page.tsx` — مدیریت گالری مستقل
- [ ] 11.8 `app/owner/attractions/page.tsx` — مدیریت جاذبه‌ها (نقشه پیش‌نمایش در فاز ۷)
- [ ] 11.9 `app/owner/blog/page.tsx` و `[id]/page.tsx` — مدیریت بلاگ با rich editor
- [ ] 11.10 `app/owner/messages/page.tsx` — لیست پیام‌های تماس
- [ ] 11.11 `app/owner/settings/page.tsx` — تنظیمات ساده owner (در پروپوزال ۹ کامل می‌شود)
- [ ] 11.12 همه فرم‌ها با Server Action + `useActionState`
- [ ] 11.13 toast notification با `sonner` پس از هر action موفق/ناموفق

## 12. صفحات Public به‌روز

- [ ] 12.1 `app/(site)/page.tsx` — Home حالا `getFeaturedRooms()` صدا می‌زند
- [ ] 12.2 `app/(site)/rooms/page.tsx` — لیست اتاق با فیلتر URL state (با `nuqs`)
- [ ] 12.3 `app/(site)/rooms/[slug]/page.tsx` — جزئیات اتاق + گالری lightbox + امکانات + جاذبه‌های نزدیک
- [ ] 12.4 `app/(site)/attractions/page.tsx` — لیست جاذبه‌ها (نقشه در فاز ۷)
- [ ] 12.5 `app/(site)/gallery/page.tsx` — گالری با lightbox (فقط اگر feature فعال)
- [ ] 12.6 `app/(site)/blog/page.tsx` — لیست پست‌ها با pagination
- [ ] 12.7 `app/(site)/blog/[slug]/page.tsx` — متن پست
- [ ] 12.8 PPR opt-in در صفحاتی که هم static و هم dynamic دارند
- [ ] 12.9 Loading UI با Suspense + skeleton

## 13. SEO به‌روز برای صفحات جدید

- [ ] 13.1 `generateMetadata` در `/rooms/[slug]` با title=room.title، description از excerpt
- [ ] 13.2 `generateMetadata` در `/blog/[slug]` با اطلاعات پست و OG image
- [ ] 13.3 `generateStaticParams` برای آماده‌سازی پر‌استفاده‌ها (با ISR)
- [ ] 13.4 ⚠️ JSON-LD و sitemap dynamic در پروپوزال ۷ — اینجا فقط متادیتای پایه

## 14. تست

- [ ] 14.1 unit test برای هر service (mock repository, mock storage, mock sms)
- [ ] 14.2 integration test برای هر repository با test DB
- [ ] 14.3 unit test sanitization HTML (XSS تست)
- [ ] 14.4 E2E: owner از login تا ایجاد اتاق با ۳ تصویر
- [ ] 14.5 E2E: owner ایجاد بلاگ پست با rich text
- [ ] 14.6 E2E: owner دیدن پیام‌های تماس
- [ ] 14.7 E2E: guest دیدن لیست اتاق و کلیک روی یک اتاق
- [ ] 14.8 E2E: feature flag blog=false → 404 روی `/blog`
- [ ] 14.9 E2E: rate limit روی فرم تماس
- [ ] 14.10 coverage ≥ ۸۰٪ روی featureهای جدید

## 15. مستندسازی

- [ ] 15.1 آپدیت `docs/CUSTOMIZATION.md`: حالا feature flagها فعال هستند
- [ ] 15.2 `docs/OWNER_GUIDE.md`: راهنمای کاربری برای صاحب اقامتگاه (فارسی، با اسکرین‌شات)
- [ ] 15.3 آپدیت `docs/ARCHITECTURE.md`: storage و sms واقعی
- [ ] 15.4 آپدیت `.env.example`: `ARVAN_S3_*`, `KAVENEGAR_API_KEY`
- [ ] 15.5 آپدیت `openspec/project.md` بخش وضعیت فعلی

## 16. کیفیت و تحویل

- [ ] 16.1 build بدون خطا
- [ ] 16.2 Lighthouse `/rooms` و `/rooms/[slug]` ≥ ۹۰
- [ ] 16.3 با ۱۰۰ اتاق نمونه، صفحه `/rooms` ≤ ۲ ثانیه TTI
- [ ] 16.4 **تست خارجی owner:** یک نفر non-tech ۳ اتاق با ۵ تصویر در ≤ ۳۰ دقیقه ایجاد کند
- [ ] 16.5 تست XSS penetration ساده روی فیلدهای rich text
- [ ] 16.6 بازبینی کد و تأیید کاربر
- [ ] 16.7 archive: ادغام spec deltaها در `openspec/specs/`

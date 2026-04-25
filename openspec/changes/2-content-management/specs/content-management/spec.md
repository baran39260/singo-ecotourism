# Spec Delta — content-management

## ADDED Requirements

### Requirement: مدل Room باید CRUD کامل با soft delete داشته باشد

Owner می‌تواند اتاق‌ها را ایجاد، ویرایش، حذف نرم، و بازیابی کند. اتاق حذف‌شده در صفحات public دیده نمی‌شود.

#### Scenario: ایجاد اتاق جدید

- **GIVEN** کاربر OWNER در `/owner/rooms/new`
- **WHEN** فرم را با عنوان «اتاق دو نفره ساحلی» و قیمت ۵۰۰,۰۰۰ پر می‌کند و submit می‌زند
- **THEN** Server Action `createRoomAction` صدا زده می‌شود
- **AND** ورودی با `roomCreateSchema` اعتبارسنجی می‌شود
- **AND** `roomService.create()` صدا زده می‌شود که `Result<Room>` برمی‌گرداند
- **AND** اگر موفق، slug خودکار `otaq-do-nafare-saheli` ساخته می‌شود
- **AND** `revalidateTag('rooms')` صدا زده می‌شود
- **AND** کاربر به `/owner/rooms` ریدایرکت می‌شود با toast «اتاق ایجاد شد»

#### Scenario: ویرایش اتاق

- **GIVEN** اتاق با id موجود
- **WHEN** owner فرم ویرایش را submit می‌کند
- **THEN** `updateRoomAction` اجرا، `revalidateTag('room:'+slug)` و `revalidateTag('rooms')` صدا زده می‌شود

#### Scenario: حذف نرم

- **WHEN** owner دکمه حذف می‌زند و در dialog تأیید می‌کند
- **THEN** `deletedAt` به `now()` ست می‌شود
- **AND** اتاق در صفحات public دیده نمی‌شود
- **AND** در پنل owner تب «حذف‌شده‌ها» قابل دسترس است
- **AND** دکمه «بازیابی» در آن تب وجود دارد

#### Scenario: بازیابی

- **WHEN** owner در تب حذف‌شده‌ها روی «بازیابی» می‌زند
- **AND** کمتر از ۳۰ روز از حذف گذشته
- **THEN** `deletedAt = null` می‌شود
- **AND** اتاق دوباره در صفحات public ظاهر می‌شود

#### Scenario: slug تکراری

- **WHEN** owner اتاق با عنوان مشابه اتاق موجود می‌سازد
- **THEN** slug با suffix عدد ساخته می‌شود (`otaq-do-nafare-2`)
- **AND** ذخیره موفق

#### Scenario: validation شکست خورده

- **WHEN** owner فرم با عنوان خالی submit می‌کند
- **THEN** Server Action `{ ok: false, fieldErrors: { title: ["عنوان الزامی است"] } }` برمی‌گرداند
- **AND** UI خطا را زیر فیلد نشان می‌دهد

---

### Requirement: مدل Gallery باید مجموعه‌های تصویر مستقل پشتیبانی کند

علاوه بر گالری هر اتاق، owner می‌تواند گالری‌های مستقل (مثلاً «جشنواره نوروز ۱۴۰۵») بسازد که در `/gallery` نمایش داده می‌شوند.

#### Scenario: ایجاد گالری مستقل

- **WHEN** owner یک گالری با ۱۰ تصویر می‌سازد
- **THEN** قابل دیدن در `/gallery` است
- **AND** lightbox باز می‌شود با کلیک

---

### Requirement: مدل Attraction باید مختصات GPS معتبر داشته باشد

جاذبه‌ها (مثل «جزیره ناز») با عنوان، توضیح، فاصله، و مختصات latitude/longitude ذخیره می‌شوند.

#### Scenario: ورودی معتبر

- **WHEN** owner جاذبه با lat=26.95, lng=56.27 ثبت می‌کند
- **THEN** اعتبارسنجی موفق
- **AND** در `/attractions` نمایش داده می‌شود

#### Scenario: ورودی نامعتبر

- **WHEN** lat=200 وارد می‌شود
- **THEN** Zod خطا می‌دهد، Server Action `{ ok: false, fieldErrors }` برمی‌گرداند

#### Scenario: نقشه

- در این پروپوزال نقشه interactive نیست
- **WHEN** کاربر `/attractions` را باز می‌کند
- **THEN** فقط لیست با مختصات نوشتاری
- **AND** نقشه interactive در پروپوزال ۷ اضافه می‌شود

---

### Requirement: مدل BlogPost باید با Rich Text و publish/draft کار کند

Owner می‌تواند پست بلاگ بنویسد با Tiptap editor. پست تا زمانی که `publishedAt` پر نشود، draft است.

#### Scenario: ذخیره draft

- **WHEN** owner پست می‌نویسد و «ذخیره draft» می‌زند
- **THEN** `publishedAt = null` در DB
- **AND** در صفحات public دیده نمی‌شود
- **AND** در پنل owner تحت «draftها» قابل دسترس است

#### Scenario: انتشار

- **WHEN** owner «انتشار» می‌زند
- **THEN** `publishedAt = now()`
- **AND** بلافاصله در `/blog` ظاهر می‌شود (با `revalidateTag`)

#### Scenario: HTML امن

- **GIVEN** owner در editor تلاش می‌کند `<script>alert(1)</script>` paste کند
- **WHEN** ذخیره می‌کند
- **THEN** سرور با `sanitize-html` پاک می‌کند
- **AND** در DB فقط متن amn ذخیره می‌شود
- **AND** در صفحه public هیچ JS اجرا نمی‌شود

#### Scenario: feature flag غیرفعال

- **GIVEN** `features.blog: false` در `site.config.ts`
- **WHEN** کاربر به `/blog` می‌رود
- **THEN** 404 می‌بیند
- **AND** لینک «بلاگ» در Navbar نمایش داده نمی‌شود

---

### Requirement: مدل ContactMessage باید پیام‌های فرم تماس را ذخیره کند

فرم `/contact` (از پروپوزال ۱) که قبلاً stub بود، حالا واقعی ذخیره می‌کند.

#### Scenario: ارسال پیام

- **WHEN** کاربر فرم تماس را پر می‌کند
- **THEN** Server Action `submitContactAction` پیام را در DB ذخیره می‌کند
- **AND** `readAt = null` (unread)
- **AND** کاربر toast «پیام شما دریافت شد» می‌بیند

#### Scenario: مشاهده در پنل owner

- **WHEN** owner به `/owner/messages` می‌رود
- **THEN** لیست پیام‌ها با sort newest first
- **AND** unread با badge مشخص

#### Scenario: علامت‌گذاری به‌عنوان خوانده‌شده

- **WHEN** owner پیامی را باز می‌کند
- **THEN** `readAt` به `now()` ست می‌شود

---

### Requirement: همه featureها از ساختار Repository/Service/Action استفاده کنند

طبق اصل ۹.۳ project.md، هیچ Server Action مستقیم Prisma صدا نمی‌زند.

#### Scenario: ساختار feature room

- **WHEN** فایل `features/room/server/actions.ts` بررسی می‌شود
- **THEN** هیچ `import { db } from '@/lib/db'` وجود ندارد
- **AND** فقط import از `roomService` است

#### Scenario: ساختار feature blog

- **WHEN** فایل `features/blog/services/blog-service.ts` بررسی می‌شود
- **THEN** خروجی همه متدها `Result<T, AppError>` است
- **AND** هیچ throw در business path وجود ندارد

---

### Requirement: همه مدل‌ها فیلدهای Audit و Soft Delete (در صورت نیاز) دارند

طبق اصل ۹.۸ project.md.

#### Scenario: مدل با audit

- **WHEN** هر مدل جدید (Room, Gallery, BlogPost, Attraction, ContactMessage) بررسی می‌شود
- **THEN** فیلد `createdAt DateTime @default(now())` دارد
- **AND** فیلد `updatedAt DateTime @updatedAt` دارد

#### Scenario: مدل با soft delete

- **WHEN** Room, Gallery, BlogPost بررسی می‌شوند
- **THEN** فیلد `deletedAt DateTime?` دارند
- **AND** ContactMessage فیلد `deletedAt` ندارد (پیام مالی نیست ولی audit دارد)
- **AND** Attraction فیلد `deletedAt` ندارد (می‌تواند hard delete شود)

---

### Requirement: query عمومی از داده soft-deleted مخفی نگه می‌دارد

#### Scenario: query در repository

- **WHEN** `roomRepository.list()` صدا زده می‌شود
- **THEN** `where: { deletedAt: null }` به‌صورت پیش‌فرض اعمال می‌شود
- **AND** برای دسترسی به deleted، متد جداگانه `listDeleted()` استفاده می‌شود (فقط در پنل owner)

# Spec Delta — owner-panel

## ADDED Requirements

### Requirement: پنل owner دسترسی محافظت‌شده باید داشته باشد

طبق پروپوزال ۱، middleware مسیرهای `/owner/*` را محافظت می‌کند. این پروپوزال صفحات این مسیر را اضافه می‌کند.

#### Scenario: کاربر بدون session

- **WHEN** کاربر بدون login به `/owner` می‌رود
- **THEN** به `/login?callbackUrl=/owner` ریدایرکت می‌شود

#### Scenario: کاربر GUEST

- **WHEN** کاربر با نقش GUEST به `/owner` می‌رود
- **THEN** به صفحه 403 ریدایرکت می‌شود (نه login)

#### Scenario: کاربر OWNER یا ADMIN

- **WHEN** کاربر OWNER یا ADMIN به `/owner` می‌رود
- **THEN** داشبورد owner نمایش داده می‌شود

---

### Requirement: داشبورد owner باید خلاصه فعالیت نشان دهد

#### Scenario: محتوای داشبورد

- **WHEN** owner به `/owner` می‌رود
- **THEN** کارت‌های زیر دیده می‌شوند:
  - تعداد اتاق فعال
  - تعداد پیام unread فرم تماس
  - لینک «اضافه کردن اتاق جدید»
  - لینک «نوشتن بلاگ پست»
  - وضعیت feature flagها

---

### Requirement: مدیریت اتاق در پنل owner

#### Scenario: لیست اتاق‌ها

- **WHEN** owner به `/owner/rooms` می‌رود
- **THEN** جدول اتاق‌ها با ستون‌های: عنوان، ظرفیت، قیمت، تعداد تصویر، اقدامات (ویرایش، حذف)
- **AND** فیلتر و sort روی ستون‌ها
- **AND** دکمه «اتاق جدید» در بالا

#### Scenario: ایجاد اتاق

- **WHEN** owner روی «اتاق جدید» می‌زند
- **THEN** فرم با فیلدهای title, description, capacity, basePrice, area, bedCount, امکانات (multi-select)
- **AND** بعد از submit، به صفحه ویرایش همان اتاق می‌رود تا تصاویر آپلود کند

#### Scenario: آپلود تصویر

- **WHEN** owner در صفحه اتاق روی «افزودن تصویر» می‌زند
- **THEN** drag-drop area باز می‌شود
- **AND** پس از انتخاب فایل، progress bar نمایش داده می‌شود
- **AND** پس از موفقیت، تصویر در گالری اتاق ظاهر می‌شود
- **AND** اگر فایل > ۱۰MB یا غیر-image، خطا

#### Scenario: تغییر ترتیب تصاویر

- **WHEN** owner تصاویر را drag می‌کند
- **THEN** ترتیب در DB ذخیره می‌شود (`order` field)

---

### Requirement: مدیریت بلاگ با Rich Text Editor

#### Scenario: ایجاد پست

- **WHEN** owner در `/owner/blog/new` پست می‌نویسد
- **THEN** Tiptap editor با toolbar فارسی نمایش داده می‌شود
- **AND** قابلیت‌ها: bold, italic, heading, list, link, image
- **AND** دو دکمه: «ذخیره draft» و «انتشار»

#### Scenario: تصویر در پست

- **WHEN** owner در editor تصویر اضافه می‌کند
- **THEN** همان upload flow اتاق استفاده می‌شود
- **AND** URL در HTML پست embed می‌شود

#### Scenario: dynamic loading editor

- **GIVEN** RichEditor با `dynamic({ ssr: false })` لود می‌شود
- **WHEN** صفحه `/owner/blog/new` باز می‌شود
- **THEN** Skeleton نمایش داده می‌شود
- **AND** پس از لود کامل، editor render می‌شود

---

### Requirement: مدیریت پیام‌های تماس

#### Scenario: لیست پیام‌ها

- **WHEN** owner به `/owner/messages` می‌رود
- **THEN** لیست پیام‌ها با ستون‌های: نام، شماره، تاریخ، وضعیت (unread badge)
- **AND** sort newest first

#### Scenario: مشاهده جزئیات

- **WHEN** owner روی یک پیام کلیک می‌کند
- **THEN** متن کامل پیام نمایش داده می‌شود
- **AND** `readAt` به `now()` ست می‌شود
- **AND** unread badge کم می‌شود

---

### Requirement: navigation پنل owner

#### Scenario: sidebar

- در `/owner/*` همیشه sidebar چپ (در RTL راست) نشان داده می‌شود با لینک‌ها:
  - داشبورد
  - اتاق‌ها
  - گالری
  - جاذبه‌ها
  - بلاگ (فقط اگر `features.blog`)
  - پیام‌ها (با badge unread count)
  - تنظیمات
  - خروج

#### Scenario: header

- نام owner و avatar (initials) در بالا
- اعلان‌ها (در پروپوزال ۶ اضافه می‌شود — placeholder در این فاز)

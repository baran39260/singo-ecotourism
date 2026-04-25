# Spec Delta — public-pages

## MODIFIED Requirements

### Requirement: صفحه اصلی `/` باید Skeleton جذاب نمایش دهد

> **تغییر از پروپوزال ۱:** صفحه اصلی به‌جای داده‌های کاملاً ثابت، حالا اقامتگاه‌های ویژه را از DB می‌خواند.

#### Scenario: ساختار صفحه (به‌روز)

- **WHEN** کاربر به `/` می‌رود
- **THEN** بخش‌ها به ترتیب:
  1. Navbar
  2. Hero با CTA «مشاهده اقامتگاه‌ها» (لینک به `/rooms`)
  3. سکشن **«اقامتگاه‌های ویژه»** — حالا از `getFeaturedRooms()` می‌خواند (تا ۳ اتاق)
  4. سکشن معرفی ۳-ستونه
  5. سکشن CTA
  6. Footer

#### Scenario: PPR (به‌روز)

- **WHEN** صفحه `/` render می‌شود
- **THEN** Hero و معرفی به‌صورت static prerender
- **AND** سکشن «اقامتگاه‌های ویژه» dynamic (با Suspense + skeleton)
- **AND** revalidate hourly + tag-based on owner update

#### Scenario: داده خالی

- **GIVEN** هیچ اتاقی هنوز ایجاد نشده
- **WHEN** صفحه `/` باز می‌شود
- **THEN** سکشن «اقامتگاه‌های ویژه» جای خود را به متن «به زودی...» می‌دهد
- **AND** صفحه crash نمی‌کند

## ADDED Requirements

### Requirement: صفحه `/rooms` لیست اتاق‌ها با فیلتر

#### Scenario: لیست بدون فیلتر

- **WHEN** کاربر به `/rooms` می‌رود
- **THEN** همه اتاق‌های فعال (deletedAt: null) نمایش داده می‌شوند
- **AND** card هر اتاق: تصویر اول، عنوان، ظرفیت، قیمت، دکمه «مشاهده»

#### Scenario: فیلتر URL state

- **WHEN** کاربر فیلتر «ظرفیت ≥ ۳» را اعمال می‌کند
- **THEN** URL به `/rooms?capacity=3` تغییر می‌کند (با nuqs)
- **AND** فقط اتاق‌های مطابق نمایش داده می‌شوند
- **AND** back button کار می‌کند

#### Scenario: pagination

- **GIVEN** بیش از ۱۲ اتاق در DB
- **WHEN** صفحه `/rooms` render می‌شود
- **THEN** ۱۲ اتاق اول نمایش داده می‌شوند
- **AND** دکمه‌های pagination یا «بارگذاری بیشتر»
- **AND** URL به `/rooms?page=2` تغییر می‌کند

#### Scenario: نتیجه خالی

- **WHEN** فیلتر هیچ اتاقی برنمی‌گرداند
- **THEN** پیام «اتاق مطابق فیلتر یافت نشد» با دکمه «حذف فیلترها»

---

### Requirement: صفحه `/rooms/[slug]` جزئیات اتاق

#### Scenario: نمایش اتاق

- **WHEN** کاربر به `/rooms/otaq-do-nafare` می‌رود
- **THEN** نمایش:
  - گالری با lightbox
  - عنوان، توضیح
  - مشخصات (ظرفیت، متراژ، تخت)
  - امکانات (با icon)
  - **placeholder رزرو:** «رزرو این اتاق به زودی فعال می‌شود» (در پروپوزال ۳ واقعی)
  - جاذبه‌های نزدیک (تا ۳ نزدیک‌ترین)

#### Scenario: اتاق غیرموجود

- **WHEN** slug نامعتبر است
- **THEN** 404 سفارشی با لینک به `/rooms`

#### Scenario: SEO

- **WHEN** crawler صفحه را می‌خواند
- **THEN** `<title>` = `${room.title} | ${brand.name}`
- **AND** `<meta description>` = excerpt اتاق
- **AND** OG image = اولین تصویر اتاق
- **AND** JSON-LD LodgingBusiness در پروپوزال ۷ اضافه می‌شود

---

### Requirement: صفحه `/attractions` لیست جاذبه‌ها

#### Scenario: نمایش لیست

- **WHEN** کاربر به `/attractions` می‌رود
- **THEN** card هر جاذبه: تصویر، عنوان، توضیح، فاصله نوشتاری
- **AND** sort بر اساس distanceKm صعودی

#### Scenario: نقشه

- در این پروپوزال نقشه interactive نیست
- نقشه و marker در پروپوزال ۷

---

### Requirement: صفحه `/blog` و `/blog/[slug]` با feature flag

#### Scenario: feature فعال

- **GIVEN** `features.blog: true`
- **WHEN** کاربر به `/blog` می‌رود
- **THEN** لیست پست‌های published نمایش داده می‌شود
- **AND** لینک «بلاگ» در Navbar فعال است

#### Scenario: feature غیرفعال

- **GIVEN** `features.blog: false`
- **WHEN** کاربر به `/blog` می‌رود
- **THEN** 404
- **AND** لینک در Navbar مخفی

#### Scenario: درخواست HTML امن

- **WHEN** کاربر `/blog/post-x` را باز می‌کند
- **THEN** `contentHtml` که قبلاً sanitize شده render می‌شود
- **AND** هیچ JS اجرا نمی‌شود
- **AND** CSP header از inline script جلوگیری می‌کند

---

### Requirement: صفحه `/gallery` با feature flag

#### Scenario: نمایش گالری

- **GIVEN** `features.gallery: true`
- **WHEN** کاربر به `/gallery` می‌رود
- **THEN** لیست همه galleryها با cover image و عنوان
- **AND** کلیک روی هر کدام به صفحه detail آن گالری

#### Scenario: lightbox

- **WHEN** کاربر روی تصویر در گالری کلیک می‌کند
- **THEN** lightbox باز می‌شود با navigation chevron
- **AND** keyboard arrow keys کار می‌کنند
- **AND** ESC می‌بندد

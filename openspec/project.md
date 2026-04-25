# Project Context — Singo

> این سند **context پایدار** پروژه است. همه پروپوزال‌های اوپن‌اسپک باید این را بخوانند. اگر اطلاعات اینجا با پروپوزال در تضاد بود، اول این سند را آپدیت کن.

## ۱. محصول (What are we building?)

**سینگو** یک **محصول تمپلیت حرفه‌ای وب‌سایت اقامتگاه و بومگرد** است. یک سایت نمونه (Showcase) می‌سازیم و سپس این تمپلیت را به اقامتگاه‌ها، هتل‌های کوچک و بومگردهای ایران می‌فروشیم تا هرکدام **سایت اختصاصی مستقل** خودشان را داشته باشند.

- **هر مشتری = یک دیپلوی مستقل** (نه SaaS چند-مستاجری)
- **مدل درآمد:** لایسنس یک‌باره + راه‌اندازی + پشتیبانی اختیاری + Managed Hosting اختیاری
- **بازار هدف:** اقامتگاه‌های بومگردی و هتل‌های کوچک/متوسط ایران (شروع از قشم)

سند جامع محصول: [`docs/PROJECT.md`](../docs/PROJECT.md).

## ۲. اصول بنیادی (Non-negotiable Principles)

این اصول در همه پروپوزال‌ها اعمال می‌شوند:

1. **تک-مستاجری است.** هیچ فیلد `tenantId` در اسکیما نباشد. هیچ Middleware tenant resolution نباشد. هر مشتری دیتابیس و دیپلوی مستقل دارد.

2. **مرز سفارشی‌سازی بسته است.** مشتری فقط از این سه راه محصول را سفارشی می‌کند:
   - فایل `site.config.ts` در ریشه
   - پنل ادمین (محتوا و تنظیمات مشتری)
   - دایرکتوری `src/overrides/` (برای پلن Premium)

   دایرکتوری `src/core/` **قفل** است. هر مشتری که core را دست‌کاری کند، از پوشش آپدیت خارج می‌شود.

3. **انطباق قانونی ایران از روز اول.** اسکیمای Booking از ابتدا باید این سه را در خود داشته باشد:
   - کد ملی میهمان (validate + ارسال به سامانه مسافر پلیس اماکن)
   - محاسبه مالیات ارزش افزوده ۹٪ گردشگری
   - صدور فاکتور سامانه مؤدیان (اجباری از ۱۴۰۳)

4. **رزرو پیش‌فرض Instant است، نه Request-to-Book.** مدل Hybrid: ۷۰٪ Instant + ۳۰٪ بافر، قابل تنظیم در `site.config.ts`. deadline تأیید ۳۰ دقیقه.

5. **ارتباط owner واتساپ-محور است.** هر رزرو جدید → اعلان واتساپ با دکمه تأیید/رد. پنل وب تکمیلی است، نه اصلی.

6. **فارسی/RTL پیش‌فرض.** چندزبانه به‌صورت feature flag.

## ۳. استک فنی قطعی‌شده

| لایه      | انتخاب                                                                              | نکته                                                                                    |
| --------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Framework | Next.js 16 App Router + React 19 + cacheComponents (PPR/useCache/dynamicIO یکپارچه) | در plan اولیه ۱۵+PPR ذکر شده بود؛ scaffolding با `create-next-app@latest` نسخه ۱۶ آورد. |
| زبان      | TypeScript strict                                                                   |                                                                                         |
| استایل    | **Tailwind v4** + CSS Variables                                                     | نه v3                                                                                   |
| UI        | shadcn/ui                                                                           |                                                                                         |
| DB        | PostgreSQL                                                                          | هر مشتری مستقل                                                                          |
| ORM       | Prisma 5+                                                                           | بدون Client Extensions برای tenant                                                      |
| Auth      | Auth.js v5 با split config                                                          | edge-safe + Node                                                                        |
| Forms     | React Hook Form + Zod                                                               |                                                                                         |
| Animation | Framer Motion (محدود)                                                               | فقط landing                                                                             |
| Map       | **MapLibre GL + Neshan/Parsimap**                                                   | نه Leaflet+OSM، نه Mapbox                                                               |
| Payment   | زرین‌پال                                                                            |                                                                                         |
| State     | React state + `nuqs`                                                                | Zustand حذف شد                                                                          |
| Upload    | **S3 آروان** + `next/image` custom loader                                           | نه Cloudinary                                                                           |
| SMS       | کاوه‌نگار یا SMS.ir                                                                 |                                                                                         |
| WhatsApp  | WhatsApp Business API یا UltraMsg                                                   |                                                                                         |
| Calendar  | `date-fns-jalali`                                                                   | نه moment-jalaali                                                                       |
| Jobs      | BullMQ + Redis                                                                      | یا لیارا Scheduler برای ساده‌ها                                                         |
| Errors    | Sentry                                                                              |                                                                                         |
| Host      | لیارا یا آروان‌کلاود                                                                |                                                                                         |

## ۴. ساختار ریپو (مرجع)

```
singo-ecotourism/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/ui/       # shadcn
│   ├── core/                # ⛔ قفل برای مشتری
│   │   ├── booking/
│   │   ├── compliance/
│   │   ├── notifications/
│   │   └── payments/
│   ├── lib/
│   └── overrides/           # ✅ نقطه سفارشی‌سازی مشتری Premium
├── site.config.ts           # کانفیگ اصلی مشتری
├── prisma/
├── openspec/                # همین پوشه
└── docs/
```

## ۵. واژه‌نامه (Glossary)

- **مشتری (Customer):** صاحب اقامتگاه/هتل که لایسنس سینگو را می‌خرد
- **میهمان (Guest):** کاربر نهایی که در سایت مشتری رزرو می‌کند
- **صاحب (Owner):** در پنل اقامتگاه = نقش ادمین داخلی سایت مشتری
- **ادمین سینگو (Singo Admin):** تیم توسعه که تمپلیت را می‌سازد و می‌فروشد
- **Showcase Site:** سایت دمو که به‌عنوان ویترین فروش ساخته می‌شود
- **Core:** کد هسته غیرقابل دست‌کاری توسط مشتری
- **Overrides:** دایرکتوری مجاز برای سفارشی‌سازی کد در پلن Premium

## ۶. وضعیت فعلی

- هیچ کدی هنوز نوشته نشده است.
- `docs/PROJECT.md` نسخه ۰.۳ محصول را تعریف می‌کند.
- دو ارزیابی کارشناسی (صنعت گردشگری + Next.js) انجام شده و یافته‌های آن‌ها در نسخه ۰.۳ اعمال شده.
- در حال تعریف اولین تغییر (`1-foundation`) برای شروع پیاده‌سازی.

## ۷. نقشه پروپوزال‌ها (Planned Changes)

پروپوزال‌ها به ترتیب زمانی قرار است نوشته و اجرا شوند. هر کدام محدوده مستقل دارد. **دو مسیر موازی** در میانه کار وجود دارد: یک مسیر «مکانیک محصول» (رزرو/پرداخت/انطباق) و یک مسیر «کیفیت ویترین فروش» (محتوا/SEO/پرداخت ویژه دمو).

| #   | شناسه                    | محدوده                                                                                            | پیش‌نیاز |
| --- | ------------------------ | ------------------------------------------------------------------------------------------------- | -------- |
| ۱   | `1-foundation`           | ساختار اپ، theming، auth، SEO پایه، i18n scaffold، Sentry، صفحات عمومی skeleton                   | -        |
| ۲   | `2-content-management`   | CRUD اتاق‌ها، گالری، جاذبه‌ها، بلاگ از پنل ادمین + آروان S3 + کاوه‌نگار                           | ۱        |
| ۳   | `3-reservation-system`   | Hybrid Instant Booking، تقویم، قفل ظرفیت، سیاست لغو                                               | ۲        |
| ۴   | `4-compliance-module`    | کد ملی، مالیات ۹٪، سامانه مسافر، سامانه مؤدیان                                                    | ۳        |
| ۵   | `5-payment-integration`  | زرین‌پال، هولد، استرداد، محاسبه نهایی                                                             | ۴        |
| ۶   | `6-owner-panel-whatsapp` | داشبورد owner + اعلان واتساپ + تأیید/رد                                                           | ۳        |
| ۷   | `7-seo-and-map`          | sitemap/robots پویا، JSON-LD LodgingBusiness، نقشه MapLibre + نشان                                | ۲        |
| ۸   | `8-showcase-content`     | محتوای دمو: عکاسی واقعی، تستیمونیال، داستان برند، انیمیشن ویژه landing                            | ۷        |
| ۹   | `9-productize-template`  | `site.config.ts` کامل، `overrides/`، اسکریپت `setup-customer`، مستند فروش، مهاجرت expand-contract | ۱-۷      |
| ۱۰  | `10-pilot-deployment`    | راه‌اندازی اولین مشتری واقعی با دامنه اختصاصی                                                     | ۹        |

این ترتیب غیرقابل تغییر نیست. اگر ضرورت کسب‌وکار تغییر کرد، می‌توان پروپوزال بعدی را بازتعریف کرد.

### تفکیک «Showcase» از «Template»

نکته حیاتی که در نسخه اول اوپن‌اسپک گم شده بود:

- پروپوزال‌های ۱ تا ۷ **تمپلیت** را می‌سازند (scaffold + مکانیک کامل + SEO + نقشه)
- پروپوزال ۸ **صرفاً ویترین فروش** را با محتوای واقعی/حرفه‌ای پر می‌کند
- پروپوزال ۹ تمپلیت را برای **فروش به مشتری** بسته‌بندی می‌کند
- پروپوزال ۱۰ تمپلیت را روی **یک مشتری واقعی** اجرا می‌کند

این تفکیک جلوی تنش «سایت نمونه زیبا باشد یا تمپلیت ساده» را می‌گیرد: هر دو، در پروپوزال‌های متفاوت.

## ۸. معیار کیفیت تحویل

هر پروپوزال قبل از merge باید این‌ها را داشته باشد:

- همه taskها در `tasks.md` تیک خورده
- Lighthouse Performance ≥ ۹۰ (برای تغییرات UI)
- تست‌های E2E مرتبط (Playwright)
- بدون `any` در TypeScript
- RTL روی موبایل و دسکتاپ تست شده
- مستند کاربری در `docs/` به‌روز شده
- همه متون UI از طریق i18n layer (نه hardcode)
- هیچ secret در کد نباشد (فقط در env)

## ۹. اصول معماری (Architecture Principles)

این اصول **در همه پروپوزال‌ها** رعایت می‌شوند. اضافه کردن استثنا فقط با تأیید صریح در `design.md` همان پروپوزال.

### ۹.۱ سازماندهی Feature-Sliced

هر دامنه (booking, content, payment, …) یک فولدر مستقل با ساختار ثابت دارد:

```
src/features/<feature>/
├── components/       کامپوننت‌های UI خاص feature
├── server/
│   ├── actions.ts    Server Actions (mutations)
│   ├── queries.ts    توابع query برای استفاده در RSC
│   └── repository.ts لایه دسترسی به DB (Prisma wrapper)
├── services/         منطق تجاری (orchestration)
├── schemas/          Zod schemas (منبع حقیقت types)
├── types.ts          تایپ‌های دامنه (z.infer از schemas)
├── constants.ts      ثابت‌ها
└── index.ts          Public API — فقط چیزهایی که feature دیگر مجاز است import کند
```

**قاعده طلایی:** import بین features فقط از `index.ts` مجاز است. `import { x } from '@/features/booking/services/internal-helper'` ممنوع. ESLint rule `singo/no-feature-internal-import` این را اعمال می‌کند.

### ۹.۲ Server Actions برای Mutations، RSC برای Queries

| نوع عملیات                  | الگو                              | مثال                                            |
| --------------------------- | --------------------------------- | ----------------------------------------------- |
| خواندن داده برای رندر       | RSC مستقیم → service → repository | `app/rooms/page.tsx` که `getRooms()` صدا می‌زند |
| تغییر داده از فرم           | Server Action با `useActionState` | ثبت رزرو، آپدیت اتاق                            |
| Webhook یا callback خارجی   | API Route                         | `/api/webhooks/zarinpal`                        |
| دسترسی برنامه‌نویسی (آینده) | API Route با احراز هویت توکن      | `/api/v1/bookings`                              |

**Server Actions همیشه:**

- ورودی را با Zod parse می‌کنند
- یک `ActionResult<T>` برمی‌گردانند (نه throw)
- اگر mutation موفق بود، `revalidateTag` یا `revalidatePath` مرتبط را صدا می‌زنند

### ۹.۳ لایه‌بندی: Repository → Service → Action/RSC

سه لایه با مسئولیت‌های جدا:

- **Repository:** wrapper نازک روی Prisma. متدهایی مثل `findById`, `create`, `update`. هیچ business logic ندارد. تایپ خروجی domain type است نه Prisma type خام.
- **Service:** business logic، orchestration، تماس با چند repository، صدا زدن external clients (SmsClient, PaymentClient). برمی‌گرداند `Result<T, AppError>`.
- **Server Action / RSC query:** فقط presentation. ورودی parse، service صدا می‌زند، خروجی به UI می‌دهد.

**هیچ Server Action مستقیم Prisma صدا نمی‌زند.** هیچ کامپوننت React مستقیم Prisma صدا نمی‌زند.

### ۹.۴ Result Type به‌جای Throw

برای errorهای **قابل پیش‌بینی** (validation, business rule violation, not found, conflict)، از `Result<T, AppError>` استفاده می‌شود:

```ts
type Result<T, E = AppError> = { ok: true; data: T } | { ok: false; error: E };

class AppError extends Error {
  constructor(
    public code: string, // 'BOOKING_CONFLICT', 'ROOM_NOT_FOUND', ...
    public message: string,
    public statusCode: number = 400,
    public meta?: Record<string, unknown>,
  ) {
    super(message);
  }
}
```

برای errorهای **غیرمنتظره** (DB down, third-party crash) throw مجاز است؛ Sentry آن‌ها را می‌گیرد.

این تصمیم کد را **type-safe**، **قابل تست**، و **خوانا** نگه می‌دارد.

### ۹.۵ Zod به‌عنوان منبع حقیقت Types

الگو:

```ts
// schemas/room.ts
export const roomCreateSchema = z.object({
  title: z.string().min(3).max(100),
  capacity: z.number().int().min(1).max(20),
  basePrice: z.number().int().min(0),
});

// types.ts
export type RoomCreateInput = z.infer<typeof roomCreateSchema>;
```

Domain types از Zod inferr می‌شوند. Prisma types فقط در repository استفاده می‌شوند و **به بیرون درز نمی‌کنند**. Repository یک domain type برمی‌گرداند که با Prisma model هم‌خوان است (با تابع mapper).

### ۹.۶ Structured Logging (Pino)

تمام لاگ‌ها از `src/lib/logger.ts` می‌گذرند:

- در dev: pretty-print با رنگ
- در prod: JSON یک‌خطی با timestamp، level، context
- request ID با `AsyncLocalStorage` propagate می‌شود تا همه لاگ‌های یک request به هم مرتبط شوند
- خطاها همزمان به Pino و Sentry می‌روند
- ممنوع: `console.log` در کد product (ESLint error)

### ۹.۷ Dependency Injection با Interface

هر سرویس خارجی (SMS, Email, Storage, Payment, WhatsApp, Maps, …) **با یک interface در `src/core/clients/`** تعریف می‌شود. پیاده‌سازی concrete (`KavenegarSmsClient`, `ArvanS3StorageClient`, …) در `src/core/clients/<service>/` می‌نشینند. در `src/lib/container.ts` یک factory ساده آن‌ها را instance می‌کند.

این الگو:

- تست‌پذیری بالا (mock implementation در تست)
- جایگزینی provider بدون تغییر business logic (اگر فردا کاوه‌نگار به SMS.ir سوییچ شد)
- مرزبندی واضح وابستگی‌های خارجی

### ۹.۸ فیلدهای Audit روی همه مدل‌ها

هر جدول Prisma:

- `createdAt DateTime @default(now())`
- `updatedAt DateTime @updatedAt`

برای جدول‌های حساس (Booking, Payment, RoomEdit) اضافه:

- `createdBy String?` (FK به User)
- `updatedBy String?`

Soft delete (`deletedAt DateTime?`) فقط جایی که نیاز به نگه‌داشتن تاریخچه است (Room, Listing). **هرگز برای Booking و Payment** که audit trail قانونی دارند.

### ۹.۹ Boundary Validation

هر داده‌ای که از مرز (form, query string, body, third-party) وارد می‌شود، باید با Zod parse شود **قبل از** هر استفاده. `as` type assertion ممنوع مگر با کامنت توضیحی. `any` ممنوع مطلق (ESLint error).

### ۹.۱۰ قراردادهای کد (Conventions)

| مورد                 | قاعده                                          | مثال                                  |
| -------------------- | ---------------------------------------------- | ------------------------------------- |
| نام فایل             | kebab-case                                     | `room-list.tsx`, `booking-service.ts` |
| نام کامپوننت         | PascalCase                                     | `RoomList`                            |
| نام تابع/متغیر       | camelCase                                      | `getRoomById`                         |
| نام ثابت             | SCREAMING_SNAKE                                | `MAX_BOOKING_DAYS`                    |
| نام type/interface   | PascalCase، بدون پیشوند `I`                    | `Room`, `BookingService`              |
| Boolean              | با پیشوند `is/has/can/should`                  | `isAvailable`, `hasOverlap`           |
| ترتیب import         | builtin → external → internal alias → relative | با `eslint-plugin-import`             |
| حداکثر طول فایل      | ۳۰۰ خط (warning بالای ۲۵۰)                     | تجزیه به ماژول‌های کوچک‌تر            |
| حداکثر prop کامپوننت | ۸ (warning بالای ۶)                            | object as prop به‌جای ۱۰ prop         |

### ۹.۱۱ تست در سه لایه

- **Unit (Vitest):** repository با in-memory DB یا mock، service با repository mock، utility توابع خالص. سرعت بالا.
- **Integration (Vitest + testcontainers یا Prisma test DB):** service با repository واقعی روی DB واقعی. در CI روی postgres container.
- **E2E (Playwright):** فلوهای کامل کاربری از مرورگر. حداقل smoke test برای هر صفحه عمومی.

هر فیچر جدید **حداقل** یک unit test و یک integration test دارد.

---

## ۱۰. قوانین مهاجرت اسکیما (برای محصول فروخته‌شده)

چون هر مشتری یک دیتابیس مستقل دارد و نسخه‌های مختلف را در زمان‌های مختلف دریافت می‌کند، **الگوی expand-contract** اجباری است:

1. افزودن فیلد اجباری ممنوع در یک migration. همیشه:
   - Migration A: فیلد nullable اضافه شود
   - کد نسخه جدید بتواند هم با null هم با مقدار کار کند
   - Backfill دستی یا خودکار
   - Migration B (در نسخه بعدی): تبدیل به NOT NULL
2. حذف ستون/جدول در یک نسخه ممنوع. همیشه:
   - Migration A: فیلد deprecate شود (stop writing)
   - کد نسخه جدید ستون را نخواند
   - Migration B (در نسخه بعدی ≥ ۲ نسخه بعد): حذف واقعی
3. تغییر نام ستون ممنوع. به‌جای آن: ستون جدید + migrate data + حذف قدیمی در چند مرحله.
4. هر migration باید **reversible** (با `down`) باشد مگر در موارد فیزیکی غیرممکن.

این قوانین در پروپوزال ۱-foundation تثبیت می‌شوند و در همه پروپوزال‌های بعدی اعمال می‌شوند.

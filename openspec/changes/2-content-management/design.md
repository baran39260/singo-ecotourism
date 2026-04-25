# Design — 2-content-management

تصمیمات فنی غیر-پیش‌پا‌افتاده این پروپوزال. اصول معماری از `openspec/project.md` بخش ۹ و `1-foundation/design.md` (تصمیمات ۱-۲۲) فرض شده و رعایت می‌شوند.

---

## Decision 1: آپلود مستقیم Client → S3 با Presigned URL

### Context

سه راه برای آپلود تصویر به آروان S3:

- **الف) آپلود به سرور Next.js → سرور به S3 می‌فرستد.** ساده ولی سرور Next bottleneck می‌شود؛ هزینه bandwidth دو برابر؛ memory consumption بالا برای فایل‌های ۱۰MB.
- **ب) Presigned URL از سرور بگیر، client مستقیم به S3 آپلود کن.** ✅ معمول صنعت.
- **ج) Presigned POST با policy.** انعطاف بالا ولی پیچیده‌تر.

### Decision

**ب** + WebP conversion سرور.

### Flow

1. Client: `getUploadUrlAction(filename, contentType)` صدا می‌زند
2. Server: validate (extension, mime type allowlist)، نام unique با UUID می‌سازد، presigned URL برمی‌گرداند با expiry ۱۵ دقیقه
3. Client: مستقیم به S3 PUT با progress
4. Client: پس از موفقیت، `confirmUploadAction(key)` صدا می‌زند
5. Server: WebP conversion + thumbnail generation در background (با `after()` در Next.js 15)
6. Server: URL را به DB می‌نویسد و key را به جدول `RoomImage` یا مشابه

### Edge cases

- **Orphan images:** اگر کاربر confirm نزد، فایل در S3 می‌ماند. cron روزانه (یا cleanup در پروپوزال آینده) فایل‌های بدون رفرنس DB در ۲۴ ساعت گذشته را حذف می‌کند
- **upload کنسل شده در میانه:** S3 خودش partial را cleanup می‌کند

### CSP و CORS

- در آروان S3 panel: CORS اجازه از `https://*.singo.example.com` و `localhost:3000` در dev
- `Content-Security-Policy: img-src 'self' https://*.arvanstorage.ir`

### Why not S3 SDK مستقیم در client?

SDK کامل bundle بزرگ. presigned URL یک fetch ساده است.

---

## Decision 2: Sharp برای WebP در API Route، نه Server Action

### Context

`sharp` از native binary استفاده می‌کند. در:

- Edge runtime: کار نمی‌کند
- Vercel Serverless Function: کار می‌کند ولی cold start سنگین (~۲s)
- Node.js standalone (لیارا/آروان): مشکلی نیست

### Decision

WebP conversion در یک API Route با `export const runtime = 'nodejs'` اجباری. Server Action مستقیم آن را صدا نمی‌زند.

### Flow

- بعد از `confirmUploadAction`، یک background fetch به `/api/internal/process-image?key=...` با signed token صدا زده می‌شود
- آن endpoint از S3 می‌خواند، WebP می‌سازد در سه اندازه، آپلود می‌کند، و در DB ثبت می‌کند
- در زمان response به user، فقط فایل اصلی نمایش داده می‌شود؛ پس از process، URL آپدیت می‌شود (با `revalidateTag`)

### Alternative considered

- **Imgproxy/Thumbor به‌عنوان سرویس جدا:** overkill برای این scale
- **آروان image processing endpoint:** اگر آروان این feature را داشت، استفاده می‌کنیم — ولی تا تأیید نشده، خودمان می‌سازیم

---

## Decision 3: Sanitization HTML در دو لایه

### Context

Rich text editor خروجی HTML تولید می‌کند. اگر کاربر malicious صاحب نقش OWNER باشد و XSS بفرستد، **در سایت guest اجرا می‌شود**. این بحرانی است.

### Decision

**دفاع در عمق با دو لایه:**

1. **Client (DOMPurify) قبل از submit:**
   - فقط whitelist عناصر و attributes
   - حذف `<script>`, `<iframe>`, `<object>`, `<embed>`, `<svg>` (svg می‌تواند JS داشته باشد)
   - حذف هر attribute `on*` (onclick, onerror, ...)
   - حذف `javascript:` URLs
   - این UX را بهتر می‌کند: کاربر بلافاصله می‌بیند چه حذف شد

2. **Server (sanitize-html) در service:**
   - ⚠️ **منبع حقیقت** — حتی اگر client بایپس شود، server محافظت می‌کند
   - همان rules
   - اگر sanitize تغییری کرد، در لاگ ثبت می‌شود (ممکن است حمله باشد)

3. **CSP header:**
   - `script-src 'self'` — هیچ inline script
   - `object-src 'none'`
   - این آخرین خط دفاع است

### Allowed tags

```
p, h2, h3, h4, br, hr, strong, em, u, s, blockquote,
ul, ol, li, a (href, target, rel),
img (src, alt, loading)
```

### Test

ESLint custom test و یک test penetration ساده در tests/security/xss.test.ts:

- `<script>alert(1)</script>` → باید پاک شود
- `<img src=x onerror=alert(1)>` → onerror باید پاک شود
- `<a href="javascript:alert(1)">` → href باید پاک شود
- `<iframe src=...>` → کل iframe باید پاک شود

---

## Decision 4: PPR + ISR per room/blog

### Context

صفحات `/rooms/[slug]` و `/blog/[slug]` ساکن هستند (تغییر کم) ولی نباید کاملاً static باشند چون owner ممکن است ادیت کند.

### Decision

- `generateStaticParams()` در `/rooms/[slug]` لیست همه اتاق‌های فعال را برمی‌گرداند → در build زمان prerender می‌شوند
- ISR با `revalidate: 3600` (هر ساعت بازساخت)
- در action `updateRoomAction`، `revalidateTag('room:'+slug)` صدا می‌زند → فوری در next request به‌روز می‌شود
- PPR برای صفحات public (`/`, `/rooms`) با static shell + dynamic لیست

### Why not full static?

- بیش از ۱۰۰ اتاق در پروپوزال‌های آینده (وقتی چند مشتری دارند) → build time می‌بَرد
- ISR + cache tag ترکیب بهتر می‌دهد

### Why not full SSR?

- TTFB بدتر برای visitor
- صفحات کم‌تغییر هستند

---

## Decision 5: URL state با nuqs برای فیلترها

### Context

صفحه `/rooms` فیلتر دارد (capacity, priceMin, priceMax, …). state این فیلترها کجا زندگی می‌کند؟

### Decision

**`nuqs`** برای URL state. مزایا:

- shareable URLs (`/rooms?capacity=3&priceMin=500000`)
- back button کار می‌کند
- SSR/SSG سازگار (می‌توان از `searchParams` در RSC خواند)
- نیاز به Zustand یا Context ندارد

### Pattern

- در RSC: `searchParams` از پارامتر صفحه + `roomFilterSchema.parse()`
- در client component فیلتر: `useQueryStates` از nuqs
- Server هیچ‌چیز را push نمی‌کند؛ فقط می‌خواند

---

## Decision 6: Tiptap با dynamic import

### Context

Tiptap + extensions ~۱۰۰KB gzipped. اگر روی هر صفحه owner لود شود، slow.

### Decision

- در فایل `RichEditor.tsx` با `'use client'`
- در صفحات owner که نیاز است: `const RichEditor = dynamic(() => import('@/components/ui/rich-editor'), { ssr: false, loading: () => <Skeleton /> })`
- این editor فقط هنگام نیاز لود می‌شود

### Trade-off

- اولین interaction کمی delay دارد
- ولی صفحه owner اولیه (داشبورد، لیست‌ها) سبک باقی می‌ماند

---

## Decision 7: Slug generation با fallback unique

### Context

کاربر اتاق «اتاق دو نفره ساحلی» می‌سازد → slug چه شود؟ `اتاق-دو-نفره-ساحلی` (فارسی) یا transliterate به `otaq-do-nafare-saheli`؟

### Decision

- استفاده از پکیج `slugify` با گزینه فارسی به انگلیسی (transliterate)
- اگر slug تکراری بود، append عدد: `otaq-do-nafare-saheli-2`
- service تابع `generateUniqueSlug(title)` دارد که چک می‌کند

### Why transliterate?

- URL در مرورگر موبایل با حروف فارسی بد render می‌شود
- بعضی social platforms encode می‌کنند → URL زشت
- SEO هر دو را قبول می‌کند

### کاربر می‌تواند override کند

فیلد `slug` در فرم ادیت قابل تغییر است (با اعتبارسنجی regex `^[a-z0-9-]+$`).

---

## Decision 8: Soft delete با undo ۳۰ روزه

### Context

صاحب اقامتگاه ممکن است اشتباهاً یک اتاق را delete کند. ۳ ماه بعد بفهمد و عصبانی باشد.

### Decision

- `deletedAt DateTime?` در Room, Gallery, BlogPost
- delete = set `deletedAt = now()`
- query پیش‌فرض: `where: { deletedAt: null }`
- پنل owner یک تب «حذف‌شده‌ها» دارد که می‌تواند restore کند (اگر < ۳۰ روز از delete گذشته)
- cron (در پروپوزال آینده): پس از ۳۰ روز، hard delete

### Why نه برای Booking?

رزرو **سند مالی** است. حذف نمی‌شود، فقط `status = CANCELLED`. در پروپوزال ۳ تأکید می‌شود.

---

## Decision 9: کاوه‌نگار با Template OTP

### Context

کاوه‌نگار دو راه دارد:

- **پیامک متنی (سرویس فروش):** برای OTP بلاک می‌شود (ضدالگوریتم spam)
- **Template OTP (سرویس Lookup):** template از قبل تأیید‌شده، فقط value را می‌فرستی، تحویل سریع‌تر

### Decision

**Template OTP** اجباری. در صورت از دست رفتن template، fallback به متنی نباید رخ دهد (هزینه و ریسک).

### Cost

- ساخت template: یک‌باره، رایگان
- هر OTP: ~۲۰۰ تومان
- در dev: همچنان `MockSmsClient`، صفر هزینه

---

## Decision 10: Image dimensions نگه‌داری در DB

### Context

`next/image` نیاز به `width` و `height` دارد برای جلوگیری از CLS. اگر هر بار از S3 دانلود کنیم تا اندازه بگیریم، slow.

### Decision

- جدول `RoomImage` فیلدهای `width`, `height` را دارد
- هنگام upload و WebP conversion، sharp اندازه را اندازه می‌گیرد و در DB می‌نویسد
- `next/image` از این مقادیر استفاده می‌کند

---

## Trade-offs خلاصه

| تصمیم                  | مزیت                     | هزینه                          |
| ---------------------- | ------------------------ | ------------------------------ |
| Presigned URL          | عدم bottleneck سرور      | پیچیدگی orphan cleanup         |
| Sharp در API Route     | جلوگیری از edge crash    | یک API endpoint اضافه          |
| Sanitization دولایه    | XSS sealed               | ۵۰KB DOMPurify در bundle owner |
| PPR + ISR              | balance perf و freshness | tag invalidation discipline    |
| nuqs                   | URL shareable، SSR-safe  | یک پکیج جدید                   |
| Tiptap dynamic         | bundle landing سبک       | ۲۰۰ms اولین focus              |
| Transliterate slug     | URL تمیز                 | کاربر شاید override کند        |
| Soft delete + undo     | جلوگیری از خطای انسانی   | پیچیدگی query                  |
| Kavenegar Template OTP | تحویل سریع               | اجبار به ساختن template        |
| Width/Height در DB     | بدون CLS                 | یک ستون اضافه                  |

# پرامپت Google Stitch — طراحی رابط کاربری سینگو

> **هدف این سند:** یک پرامپت آماده، جامع و دقیق برای استفاده در [Google Stitch](https://stitch.withgoogle.com) که بر پایه `docs/PROJECT.md`، `openspec/project.md` و پروپوزال‌های ۱ تا ۸ نوشته شده. خروجی Stitch قرار است به‌عنوان **مرجع بصری** برای پیاده‌سازی Next.js + Tailwind v4 + shadcn/ui استفاده شود — نه کد نهایی.

---

## نحوه استفاده

۱. **بخش "The Prompt" (پایین) را copy کن** و در یک Stitch project جدید paste کن.
۲. هر صفحه را جداگانه از Stitch بخواه (Stitch بهتر page-by-page کار می‌کند تا سعی در تولید همه چیز در یک شات).
۳. اگر Stitch خروجی‌اش انگلیسی شد، بگو `Translate all UI labels to Persian/Farsi using the provided strings.`
۴. RTL را در Stitch Settings فعال کن (Layout direction → Right-to-left).

> **نکته:** Stitch روی پرامپت انگلیسی پایدارتر است؛ اما متن‌های UI نمونه به فارسی واقعی نوشته شده‌اند تا خروجی فارسی بدهد.

---

# The Prompt

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 1. Project Context

You are designing the UI for **Singo (سینگو)**, a premium **ecotourism & boutique accommodation website template** for the Iranian market. Singo is sold as a **sellable template product** — each customer (a single boutique hotel, traditional guesthouse, or "بومگردی") gets their own independent deployment of this template, branded to their identity.

**The showcase brand for this design** is a fictional Qeshm-island ecolodge:

- **Brand name (Persian):** اقامتگاه ساحلی سنگ سیاه
- **Brand name (Latin):** Sang-e Siah Ecolodge
- **Tagline (Persian):** «جایی که خرچنگ‌ها تو را بیدار می‌کنند»
- **Tagline (English):** *Where the crabs wake you up*
- **Location:** Qeshm Island, Persian Gulf, Iran — surrounded by mangrove forests (جنگل حرا), the Stars Valley (دره ستارگان), and tidal beaches.
- **Brand story:** A traditional, family-run ecolodge built from local stone and palm wood. Slow tourism. Authentic Qeshmi cuisine. Stargazing nights. Boat tours through mangroves.

**The word "Singo (سینگو)" means "crab" in the Qeshmi dialect.** The crab is a recurring brand motif — used in the logo, micro-illustrations, and empty states.

**Audience persona (the guest):**

- Iranian urban traveler, 28–45, professional, books trips on mobile
- Values authentic experiences, photogenic stays, slow living, sustainability
- Currently uses Jabama / Shab.ir / Snapptrip — expects **instant booking**, not request-to-book
- 75%+ of traffic is mobile

---

## 2. Design Principles (non-negotiable)

1. **RTL by default.** Persian (Farsi) is the primary language. All layouts, paddings, icons (chevrons, arrows) flow right-to-left. Numbers stay LTR but Persian digits (`۰۱۲۳۴۵۶۷۸۹`) are used for prices and dates.
2. **Mobile-first.** Design 360px width first, then scale up to 768 / 1024 / 1440. Touch targets ≥ 44×44px.
3. **Minimal, editorial, photo-forward.** Like a high-end travel magazine (think *Cereal Magazine*, *Airbnb Plus*, *Mr & Mrs Smith*). Not corporate. Not skeuomorphic. Not "dashboard-y" on the public side.
4. **Calm, not loud.** Generous whitespace, large hero photography, restrained typography hierarchy. Animations must be slow and subtle (200–400ms ease-out).
5. **Trust signals are visible but not noisy.** The Iranian market needs to see: tourism license number, Modayan (مؤدیان) tax compliance, secure payment badge, real photos, real reviews — but never as a dense bar.
6. **Accessibility WCAG AA.** Contrast ratios ≥ 4.5:1 for body text. Focus rings always visible. Form labels never inside the input only.
7. **Performance-aware design.** Avoid heavy gradients and stacked blurs that hurt mobile rendering. Prefer flat colors + 1 layer of soft shadow.

---

## 3. Visual Language

### 3.1 Color Palette

The palette is inspired by Qeshm island: turquoise sea, sandy beach, red soil (خاک سرخ), mangrove green.

| Token                  | HEX       | Usage                                                                  |
| ---------------------- | --------- | ---------------------------------------------------------------------- |
| `--brand-primary`      | `#0E7C86` | Sea turquoise. Primary CTA, links, key icons. Logo color.              |
| `--brand-primary-soft` | `#E6F4F5` | Tinted backgrounds, hover states for ghost buttons.                    |
| `--brand-secondary`    | `#C2410C` | Qeshmi red soil. Accents, sale badges, sparingly.                      |
| `--brand-tertiary`     | `#3F6B3A` | Mangrove green. Eco/sustainability tags, "available" states.           |
| `--brand-sand`         | `#F5EFE3` | Page background warm off-white. Cards on this base feel soft.          |
| `--brand-ink`          | `#1A1F2C` | Headings and primary text. Near-black with a hint of blue.             |
| `--neutral-700`        | `#374151` | Body text on light backgrounds.                                        |
| `--neutral-500`        | `#6B7280` | Secondary text, captions, metadata.                                    |
| `--neutral-300`        | `#D1D5DB` | Borders, dividers.                                                     |
| `--neutral-100`        | `#F3F4F6` | Disabled bg, skeleton placeholder.                                     |
| `--surface`            | `#FFFFFF` | Card surface.                                                          |
| `--success`            | `#15803D` | Booking confirmed, success toasts.                                     |
| `--warning`            | `#B45309` | Pending payment, hold states.                                          |
| `--danger`             | `#B91C1C` | Errors, cancellation, validation failures.                             |

> Treat `--brand-primary` as a CSS variable — it can be overridden per customer. Generate `primaryHover` (10% darker), `primaryMuted` (90% lighter), `primaryForeground` (white) automatically.

### 3.2 Typography

- **Font family (UI + body):** **Vazirmatn Variable** for all Persian and Latin text. Already loaded locally.
- **Display alternative (optional):** **Estedad** for very large hero headlines if needed.
- **Numerals:** Persian digits (`۰۱۲۳۴۵۶۷۸۹`) for prices, dates, ratings shown in UI. ASCII digits only inside form inputs.

| Style       | Size (mobile / desktop) | Weight | Line height | Usage                                       |
| ----------- | ----------------------- | ------ | ----------- | ------------------------------------------- |
| Display XL  | 36 / 56                 | 700    | 1.15        | Hero headline only                          |
| Display L   | 28 / 40                 | 700    | 1.2         | Section titles on landing                   |
| H1          | 24 / 32                 | 700    | 1.25        | Page titles                                 |
| H2          | 20 / 24                 | 600    | 1.3         | Subsection titles                           |
| H3          | 18 / 20                 | 600    | 1.4         | Card titles                                 |
| Body L      | 16 / 17                 | 400    | 1.7         | Long-form content (blog, room description)  |
| Body M      | 14 / 15                 | 400    | 1.6         | Default UI text                             |
| Caption     | 12 / 13                 | 400    | 1.5         | Metadata, helper text                       |
| Overline    | 11 / 12                 | 600    | 1.4         | All-caps tags above titles, letter-spacing  |

### 3.3 Spacing & Layout

- **Base unit:** 4px. Allowed spacings: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128.
- **Container max-width:** 1280px on desktop. Side gutter: 16px on mobile, 24px on tablet, 32px+ on desktop.
- **Grid:** 12 columns on desktop, 8 on tablet, 4 on mobile. Gap: 16px mobile / 24px desktop.
- **Section vertical rhythm:** 64–96px on desktop, 48–64px on mobile.

### 3.4 Border radius

- `radius-sm`: 6px (inputs, small chips)
- `radius-md`: 12px (buttons, badges)
- `radius-lg`: 20px (cards, modals)
- `radius-xl`: 28px (hero image, feature cards)
- `radius-full`: 9999px (pills, avatars)

### 3.5 Elevation (shadows)

Use sparingly. Prefer borders over shadows on data-dense surfaces (owner panel).

- `shadow-sm`: `0 1px 2px rgba(26,31,44,0.06)`
- `shadow-md`: `0 6px 16px rgba(26,31,44,0.08)`
- `shadow-lg`: `0 16px 40px rgba(26,31,44,0.12)`

### 3.6 Iconography

- **Icon set:** Lucide (line, 1.5px stroke, 20px or 24px). Consistent rounded line-caps.
- Custom icons only for: crab (brand mark), tide indicator, mangrove leaf, dhow boat (لنج).
- **Never** use full-color emoji as icons in UI chrome.

### 3.7 Imagery direction

- **Hero photography:** Natural light, golden hour, warm tones. Wide horizons, sea, palm trees, traditional architecture, hands preparing food, low-saturation.
- **Avoid:** corporate stock smiles, fisheye, heavy filters, drone shots that feel real-estate-listing-y.
- All images have soft rounded corners (`radius-xl`) and subtle 1px inset highlight on top edge.

### 3.8 Motion

- Page transitions: 250ms fade.
- Card hover: scale 1.02 + shadow lift, 200ms ease-out.
- Drawer/modal: slide from edge, 320ms cubic-bezier(0.32, 0.72, 0, 1).
- Skeleton shimmer: 1.4s linear infinite.
- **No** parallax scroll, **no** auto-playing video on first paint.

---

## 4. Page-by-Page Specifications

> Generate each of the following pages as a separate Stitch screen. All screens share the global Header, Footer, and design system above. Persian sample copy is provided — preserve it verbatim.

### Layouts groups

- **(site)** — public marketing pages (Header + Footer, full-bleed)
- **(auth)** — minimal centered layout, no Header
- **/dashboard** — guest area, top-bar + content
- **/owner** — owner panel, sidebar + content
- **/admin** — Singo team admin (light reuse of /owner shell)

---

### 4.1 Home — `/`

**Goal:** Convince a Persian traveler in 4 seconds that this place is real, beautiful, and bookable right now.

**Sections, top to bottom:**

1. **Sticky Header** (transparent on hero, solid white after 80px scroll).
   - Right side (RTL start): Logo + brand name "اقامتگاه ساحلی سنگ سیاه".
   - Center: nav links → اتاق‌ها · جاذبه‌ها · گالری · بلاگ · درباره ما · تماس
   - Left side (RTL end): زبان (FA/EN toggle, FA active), "ورود" link, primary CTA button "رزرو فوری".
   - Mobile: hamburger drawer.

2. **Hero (full-viewport, 80vh on desktop, 70vh mobile)**
   - Background: large photo of a stone-built lodge at sunset overlooking turquoise water with a dhow boat (لنج) on the horizon.
   - Overlay: 30% bottom-up dark gradient.
   - Centered content (or right-aligned in RTL):
     - Overline (all-caps small): «قشم — جنگل حرا»
     - Display XL headline: «شب‌هایت را به ستاره‌های قشم بسپار»
     - Body L subhead: «اقامتگاهی از جنس سنگ، حرا و آرامش — رزرو همین لحظه، تأیید فوری.»
     - **Inline search/booking widget** (the most important element on the page):
       - Card on glass-morphism (white 90% opacity, blur 20, `radius-xl`, `shadow-lg`).
       - 4 fields side-by-side on desktop, stacked on mobile:
         - تاریخ ورود (Persian Jalali date picker, placeholder: «۲۵ اردیبهشت»)
         - تاریخ خروج (placeholder: «۲۸ اردیبهشت»)
         - تعداد میهمان (stepper: «۲ بزرگسال»)
         - Primary CTA button: «جستجوی اتاق» with search icon.
       - Below the fields: tiny inline trust line: «✓ تأیید فوری  ✓ کمیسیون صفر  ✓ کنسلی انعطاف‌پذیر»

3. **"چرا سنگ سیاه؟" — 3 value pillars (3-column on desktop, scroll-snap carousel on mobile)**
   - Each pillar: large outline icon (crab / mangrove leaf / star), H3 title, 2-line body.
   - Pillars:
     - **رزرو مستقیم، بدون واسطه** — «رزرو از خود اقامتگاه با ۲۰٪ قیمت کمتر از جاباما.»
     - **تجربه‌ای واقعی از قشم** — «صبحانه محلی، تور قایق به جنگل حرا، شب‌گردی ستارگان.»
     - **انتخاب پایدار** — «معماری بومی، انرژی خورشیدی، استخدام نیروی محلی.»

4. **Featured rooms — "اتاق‌های ما" (3-card row → carousel on mobile)**
   - Each card: 4:5 portrait photo, badge top-right "موجود" (green dot), H3 room name, 1-line teaser, price line «از ۲٫۸۰۰٫۰۰۰ تومان / شب», star rating with count.
   - Sample rooms: «سوئیت سنگ» / «اتاق دو-تخته رو به دریا» / «خانه چوبی حرا (۴ نفره)»
   - "مشاهده همه اتاق‌ها →" link below.

5. **Tide & weather widget (Qeshm-specific differentiator)**
   - Two-pane card on `--brand-primary-soft` background.
   - Right pane: «جزر و مد امروز» — animated wave illustration + table of 4 today's tide times in Persian digits.
   - Left pane: «هوا در روز ورود شما» — placeholder showing 28° / sunny when no date selected; updates when widget date set.
   - Caption: «پیشنهاد: قایق‌سواری در جنگل حرا — ۲ ساعت قبل از مد بالا.»

6. **Attractions teaser — "اطراف اقامتگاه" (4-card masonry)**
   - Distance pill on each card («۸ کیلومتر»).
   - Names: دره ستارگان · جنگل حرا · غار خربس · ساحل سیمیلان
   - On hover: card lifts, photo zooms 1.05.

7. **Add-on experiences strip (horizontal scroll on mobile)**
   - Cards: «صبحانه محلی قشمی», «تور قایق حرا», «شام روی ساحل», «ترانسفر از فرودگاه»
   - Each card: small photo, name, price («از ۳۵۰٫۰۰۰ تومان»), "افزودن به رزرو" ghost button.

8. **Story strip — "از کجا شروع شد"**
   - 2-column: portrait photo of an elderly local woman + story text «۴۰ سال پیش، مادربزرگ سنگ‌ها را از دریا جمع کرد...»
   - "بیشتر بخوانید" link → /about.

9. **Testimonials — "از زبان میهمانان" (3 quotes, fade-rotate carousel)**
   - Each: 5-star, quote, guest first name + city (e.g. «نیلوفر — تهران»), trip-month.
   - At the end: aggregate score «۴٫۹ از ۵ — بر اساس ۲۱۸ نظر تأیید شده».

10. **Blog teaser — "از وبلاگ ما" (3 latest posts)**
    - Card: 16:9 photo, category overline («راهنمای سفر»), H3 title, date, reading time.

11. **Final CTA band**
    - Full-width section, `--brand-primary` background, white text.
    - Headline: «هنوز شک داری؟»
    - Subhead: «کنسلی رایگان تا ۲۴ ساعت قبل از ورود.»
    - Two buttons: primary white "رزرو همین حالا"، ghost-outline "تماس با ما در واتساپ" (with WhatsApp icon).

12. **Footer (4 columns on desktop, accordion on mobile)**
    - Col 1: Logo + brand line + 60-word about.
    - Col 2: لینک‌ها → اتاق‌ها / جاذبه‌ها / بلاگ / گالری
    - Col 3: تماس → آدرس کامل، تلفن، ایمیل، نقشه pin.
    - Col 4: خبرنامه → input + "عضویت" button + small social icons.
    - Bottom strip: copyright, لینک‌های حقوقی (قوانین · حریم خصوصی · سیاست لغو), tourism license number, Modayan compliance badge, Enamad badge placeholder, payment methods strip.

---

### 4.2 Rooms list — `/rooms`

**Goal:** Let the guest filter and pick a room confidently.

- **Header bar:** "اتاق‌های اقامتگاه" H1 + 1-line subhead "۸ اتاق منحصربه‌فرد، آماده رزرو فوری."
- **Filter rail (left side on desktop, top sheet drawer on mobile):**
  - تاریخ ورود / خروج (date range picker, Jalali)
  - تعداد میهمان (stepper)
  - بازه قیمت (slider, ۰–۱۰ میلیون تومان, Persian digits)
  - ظرفیت (chips: ۱-۲ نفره / ۳-۴ نفره / ۵+ نفره)
  - امکانات (checkboxes: وای‌فای / صبحانه / تهویه / حمام اختصاصی / حیوان مجاز / استخر / اتاق خانوادگی)
  - چیدمان نتایج (radio: پیشنهادی / ارزان‌ترین / گران‌ترین / محبوب‌ترین)
  - "اعمال فیلتر" primary + "پاک کردن" ghost.
- **Results grid (3-col desktop / 2-col tablet / 1-col mobile):**
  - **Room card:**
    - 4:3 photo with image-count badge "۸ عکس" bottom-right.
    - Top-left badge if `instantBookable=true`: «رزرو فوری ⚡» on brand-primary background.
    - Below image: H3 title, 1-line description, amenity row (4 small icons + "+۳"), capacity «۲ بزرگسال + ۱ کودک», star rating.
    - Price block right-aligned: «از ۲٫۸۰۰٫۰۰۰ تومان» bold + «/شب» small below.
    - Hover: image fade to next photo (subtle slideshow tease), shadow lift.
- **Empty state:** crab illustration + "نتیجه‌ای پیدا نشد. فیلترها را تغییر بده." + "پاک کردن فیلتر" button.
- **Sticky bottom bar on mobile:** "فیلتر (۳)" left, "چیدمان" right.

---

### 4.3 Room detail — `/rooms/[slug]`

**Goal:** Make the guest fall in love and book. This is **the most important conversion page**.

1. **Breadcrumb:** صفحه اصلی › اتاق‌ها › سوئیت سنگ
2. **Photo gallery (sticky on scroll until booking widget anchors):**
   - 1 large hero image left + 4 thumbnails right grid (desktop). On click → full-screen lightbox.
   - Mobile: swipeable carousel with dots.
   - Bottom-right of gallery: "مشاهده همه ۱۲ عکس" button → opens grid lightbox.
3. **Two-column main layout (desktop, single column mobile):**
   - **Left/main column:**
     - H1 title «سوئیت سنگ — رو به دریا»
     - Meta row: ★ ۴٫۹ (۲۱ نظر) · «۲ بزرگسال + ۱ کودک» · «۴۵ متر مربع» · «طبقه همکف»
     - Quick-trust chips: «کنسلی انعطاف‌پذیر»، «رزرو فوری»، «حیوان مجاز»
     - **Tab section:** توضیحات | امکانات | قوانین | نظرات
       - **توضیحات:** 200-word description, "ادامه مطلب ↓" expand.
       - **امکانات** (categorized grid):
         - راحتی: وای‌فای، تهویه، یخچال، چای‌ساز
         - حمام: حمام اختصاصی، آب گرم خورشیدی، حوله
         - فضای باز: تراس خصوصی، چشم‌انداز دریا، مبلمان حصیری
         - غذا: صبحانه شامل، آشپزخانه مشترک
       - **قوانین:** ورود از ۱۴:۰۰ · خروج تا ۱۲:۰۰ · سیگار ممنوع · مهمانی ممنوع · حیوان مجاز با شرط.
       - **نظرات:** rating breakdown bar (5/4/3/2/1) + 5 review cards (avatar, name, city, stars, date, comment, owner reply if any).
     - **Map block:** "موقعیت اقامتگاه" — embedded MapLibre map with brand-color pin, 320px tall, lazy-loaded. Address line below + "مسیر در نشان" external link.
     - **Nearby attractions** (3 cards) — same component as Home.
     - **House rules + cancellation policy** accordion.
4. **Right column — sticky booking card (desktop only; mobile shows fixed-bottom CTA):**
   - White card, `radius-xl`, `shadow-md`.
   - Price headline: «از ۲٫۸۰۰٫۰۰۰ تومان» + «/ شب» small.
   - Date range picker (Jalali) showing 2 months.
   - Guests stepper (بزرگسال / کودک / نوزاد).
   - **Calculation box** appears once dates picked:
     - ۲٫۸۰۰٫۰۰۰ × ۳ شب = ۸٫۴۰۰٫۰۰۰
     - مالیات ۹٪ گردشگری: ۷۵۶٫۰۰۰
     - تخفیف عضویت (اگر لاگین): -۱۰۰٫۰۰۰
     - **مجموع: ۹٫۰۵۶٫۰۰۰ تومان**
   - Primary CTA: «رزرو و پرداخت» (full-width, lg).
   - Below: "هیچ مبلغی هنوز پرداخت نشده." caption.
   - Cancellation note: «✓ کنسلی رایگان تا ۲۴ ساعت قبل از ورود.»
   - Owner contact ghost button: «تماس با میزبان در واتساپ» with WhatsApp icon.
5. **Mobile sticky bottom bar:**
   - Right: «از ۲٫۸۰۰٫۰۰۰ تومان / شب» small.
   - Left: full-height "بررسی و رزرو" primary button → opens bottom sheet with full booking widget.

---

### 4.4 Booking checkout — `/checkout`

**Goal:** Frictionless 3-step checkout that complies with Iranian law (national-ID, 9% tourism VAT, Modayan invoice).

Three-step stepper at top: **۱. اطلاعات میهمان** → **۲. خدمات اضافه** → **۳. پرداخت**

#### Step 1 — Guest info

- **Right column (40% on desktop, top on mobile): order summary card** (sticky)
  - Small room photo + title.
  - Dates: «ورود ۲۵ اردیبهشت — خروج ۲۸ اردیبهشت — ۳ شب»
  - Guests: «۲ بزرگسال»
  - Subtotal, tax, addons, total breakdown.
  - "ویرایش رزرو" small text link.
- **Left column: form**
  - Section "اطلاعات سرپرست رزرو":
    - نام و نام خانوادگی (Persian text input)
    - **کد ملی** (10-digit input with live validation, error state shown inline) — REQUIRED, with tooltip "طبق قانون ایران، ثبت کد ملی الزامی است (سامانه مسافر پلیس اماکن)."
    - شماره موبایل (verified — locked with green check if logged in)
    - ایمیل (optional)
  - Section "اطلاعات میهمانان همراه" — dynamic list, "+ افزودن میهمان" button. Each row: name + national-ID.
  - Section "ساعت ورود" — radio grouped chips: ۱۴–۱۶ / ۱۶–۱۸ / ۱۸–۲۰ / بعد از ۲۰
  - Section "درخواست‌های ویژه" (textarea, optional, max 300 chars).
  - Bottom: "ادامه ←" primary button, "بازگشت" ghost button.

#### Step 2 — Add-ons

- Title: "خدمات اضافه (اختیاری)"
- Cards in 2-col grid, each with image, name, price/unit, stepper, and short description:
  - **صبحانه محلی قشمی** — ۳۵۰٫۰۰۰ تومان / نفر / روز
  - **تور قایق به جنگل حرا** — ۱٫۲۰۰٫۰۰۰ تومان / قایق
  - **شام روی ساحل (با هماهنگی قبلی)** — ۸۵۰٫۰۰۰ تومان / نفر
  - **ترانسفر از فرودگاه قشم** — ۴۰۰٫۰۰۰ تومان / یک طرفه
  - **تخت اضافه** — ۲۰۰٫۰۰۰ تومان / شب
- Right summary updates live as items added.

#### Step 3 — Payment

- "پرداخت امن از طریق زرین‌پال" with Zarinpal logo.
- Final breakdown with **VAT line clearly labeled** «مالیات ارزش افزوده گردشگری ۹٪» — required by Iranian tourism law.
- Modayan note: «فاکتور رسمی الکترونیکی پس از تأیید پرداخت برای شما ارسال خواهد شد.»
- Two checkboxes (required):
  - ☐ «قوانین رزرو و سیاست لغو را خواندم و می‌پذیرم.» (with link to policy)
  - ☐ «صحت اطلاعات کد ملی میهمانان را تأیید می‌کنم.»
- Optional checkbox:
  - ☐ «تمایل به دریافت پیشنهادهای ویژه دارم.»
- Big primary button: «پرداخت ۹٫۰۵۶٫۰۰۰ تومان» with lock icon.
- Below: small icons row → Enamad, SSL, زرین‌پال, مؤدیان.

#### Booking confirmation `/checkout/success`

- Big green check illustration (with crab winking).
- Headline: «رزرو شما با موفقیت ثبت شد 🎉»
- Booking code: `SNG-1405-0421-X3K` (large, copyable).
- Summary card.
- Note: «اطلاعات رزرو برای میزبان از طریق واتساپ ارسال شد. در صورت تأیید نهایی، ایمیل تأییدیه دریافت خواهید کرد.»
- Buttons: "مشاهده در داشبورد من" + "ذخیره به تقویم" + "اشتراک‌گذاری در واتساپ".

---

### 4.5 Attractions — `/attractions`

- Header with H1 «اطراف اقامتگاه — قشم به روایت ما» + 1-paragraph intro.
- **Map-first layout:**
  - Top: full-width 50vh interactive MapLibre map with custom brand pins (crab icon for the lodge, smaller pins for attractions). Cluster markers on zoom-out.
  - Right side over map (desktop) or below (mobile): scrollable list of attractions; clicking a list item highlights its pin.
- **Attraction list cards (below map):**
  - 16:9 photo, distance pill «۸ کیلومتر», name, category chip (طبیعی / تاریخی / غذا / ساحل / تور), 2-line description, "مشاهده روی نقشه" link, "افزودن تور به رزرو" ghost button.
  - Sample list: دره ستارگان · جنگل حرا · غار خربس · ساحل سیمیلان · بازار درگهان · سفر به جزیره هنگام (دلفین‌های وحشی).

---

### 4.6 Blog — `/blog` and `/blog/[slug]`

**`/blog` index:**
- Featured post (large 16:9 hero card) + grid of 6 cards.
- Sidebar (desktop): دسته‌بندی‌ها (chips) · پربازدیدترین‌ها (top-3 list with thumbnail) · عضویت در خبرنامه.
- Mobile: filter sheet trigger + linear list.

**`/blog/[slug]`:**
- Wide hero photo (60vh), title overlay bottom.
- Meta row: نویسنده (avatar + name) · تاریخ شمسی · زمان مطالعه ۵ دقیقه · category.
- Article body: max-width 720px, body L typography, drop-caps optional, in-article images full-bleed within container.
- Floating right-rail TOC on desktop (sticky, highlights current section).
- End of article: tag chips, share buttons (واتساپ، تلگرام، کپی لینک), author bio card.
- Below: "مطالب مرتبط" 3-card row, then comment placeholder section.

---

### 4.7 Gallery — `/gallery`

- Filter chips on top: همه · اتاق‌ها · غذا · طبیعت · فعالیت‌ها · شب‌ها.
- Masonry grid (3-col desktop / 2-col tablet / 1-col mobile), images with subtle hover zoom.
- Click → full-screen lightbox with arrow nav, swipe on mobile, image caption.
- Lazy-loaded with shimmer skeletons.

---

### 4.8 About — `/about`

- 50vh hero with story-mode title «از خرچنگ تا اقامتگاه — داستان سنگ سیاه».
- Editorial long-form layout: alternating image-left / text-right blocks.
- Pull-quote in brand-primary color halfway through.
- Team section: 3 round-photo cards (مالک، آشپز، راهنمای تور).
- Values strip (4 icons: پایداری، اصالت، مهمان‌نوازی، آرامش).
- Final CTA band linking to /rooms.

---

### 4.9 Contact — `/contact`

- Two columns:
  - **Right (form):** فرم تماس → نام · ایمیل · شماره · موضوع (select: رزرو / همکاری / بازخورد / سایر) · پیام · ارسال button. Server-side validation states.
  - **Left (info):**
    - Address card with map preview, "مسیر در نشان" link.
    - Phone, WhatsApp (with green WA icon), email.
    - Working hours table (شنبه تا چهارشنبه: ۰۸–۲۲ / پنج‌شنبه و جمعه: ۰۸–۲۴).
    - Social icons row.
- Below the fold: FAQ accordion (5 items: ساعت ورود؟ / حیوان مجاز؟ / پارکینگ؟ / غذا؟ / دسترسی با اتوبوس؟).

---

### 4.10 Auth — `/login` & `/signup` & `/verify-otp`

**Layout:** centered card on a soft `--brand-sand` background with a faint crab-pattern. No site Header. Logo top-center.

#### `/login`
- Card title: «ورود به سنگ سیاه»
- Subtitle: «با شماره موبایل خود وارد شو.»
- Single field: شماره موبایل (placeholder `09120000000`, ASCII numerals only).
- Primary button: «ارسال کد تأیید» (full-width).
- Below: «حساب نداری؟ ثبت‌نام کن →»
- Footer note: «با ادامه، شرایط استفاده و حریم خصوصی را می‌پذیری.»

#### `/verify-otp`
- Card title: «کد تأیید را وارد کن»
- Subtitle: «کد ۶ رقمی به شماره ۰۹۱۲··۰۱۲۳ ارسال شد.» (masked)
- 6 individual digit inputs (auto-advance, paste support).
- Resend timer: «ارسال مجدد در ۰۰:۵۹» → after expires becomes a button «ارسال مجدد».
- Primary CTA "تأیید و ورود" auto-submits when 6 digits entered.
- Below: "تغییر شماره" small link.
- Error state: red border on inputs + helper text «کد اشتباه است. دوباره تلاش کن.»
- Rate-limit state (after 4 attempts): card-wide warning «به دلیل تلاش‌های زیاد، ۶۰ ثانیه دیگر امکان ارسال داری.»

#### `/signup`
- Same shape as login but step 1 collects: نام، شماره، (اختیاری) ایمیل. Step 2 is OTP. After OTP, optional national-ID field "بعداً تکمیل می‌کنم" link to skip.

---

### 4.11 Guest dashboard — `/dashboard`

**Layout:** simple top-bar (logo + avatar dropdown), max-width 1024px content.

- **Tabs:** نمای کلی · رزروهای من · علاقه‌مندی‌ها · نظرات · پروفایل · اعلان‌ها.
- **نمای کلی:**
  - Hero greeting card: «سلام نیلوفر 🌅 — ۲ شب تا ورودت به سنگ سیاه باقی مانده.» with quick links.
  - Upcoming booking card (large): photo + dates + check-in countdown + "جزئیات" + "تماس با میزبان".
  - Quick stats row: «۳ رزرو موفق» · «۵ نظر» · «امتیاز عضویت ۲۸۵»
- **رزروهای من:**
  - Tabs: همه · در انتظار · تأیید‌شده · کامل‌شده · لغو.
  - Booking row card: status chip (color per state), photo, dates, total, "جزئیات" → modal with full info, "دانلود فاکتور مؤدیان" link.
- **علاقه‌مندی‌ها:** grid of room cards with heart-filled icon, "حذف" on hover.
- **نظرات:** list of past stays with "نوشتن نظر" CTA on completed stays without review.
- **پروفایل:** form with name, email, national-ID (with validation), phone (read-only), avatar upload, "ذخیره" button.

---

### 4.12 Owner panel — `/owner/*`

**Layout:** Sidebar (right side in RTL) + content area. Sidebar collapses to icon-only on tablet, off-canvas drawer on mobile.

**Sidebar items (with Lucide icons):**
- داشبورد · اتاق‌ها · تقویم · رزروها · پیام‌ها · گالری · جاذبه‌ها · بلاگ · چک‌لیست نظافت · گزارش مالی · تنظیمات · خروج

**Top bar:** breadcrumb · search · notification bell (with red dot for new bookings) · WhatsApp shortcut (opens WA web with owner number prefilled, useful when guest left a message) · avatar.

#### `/owner` — Dashboard

- Greeting row: «صبح بخیر، حمید 🌞 — امروز ۲ ورود و ۱ خروج داری.»
- 4 KPI tiles (top row):
  - رزروهای امروز: ۲ (with upward arrow if up vs yesterday)
  - درآمد ماه: ۲۸٫۴ میلیون تومان
  - نرخ اشغال این ماه: ۶۸٪
  - میانگین امتیاز: ۴٫۸ ★
- **"رزروهای جدید نیازمند تأیید" priority box** (top-right, brand-secondary border): list of pending bookings with quick approve/reject buttons. Empty state crab + "همه چیز روبراه است."
- **Today/tomorrow timeline:** horizontal lane showing arrivals (green chevron) and departures (gray chevron) of next 7 days.
- **Charts row (2 chart cards):**
  - Booking volume — last 30 days bar chart.
  - Revenue trend — last 6 months line chart.
- **Recent activity feed** (right column): «۱۲ دقیقه پیش — رزرو جدید سوئیت سنگ» / «۲ ساعت پیش — پیام تماس از مریم.»

#### `/owner/rooms`

- Table view (desktop) / card view (mobile).
- Columns: تصویر · عنوان · ظرفیت · قیمت پایه · وضعیت (فعال/غیرفعال) · رزرو فوری? · عملیات (ویرایش، تکثیر، حذف نرم).
- Top: search + "اتاق جدید +" primary button.
- Empty state: illustration + "هنوز اتاقی اضافه نکرده‌ای."

**`/owner/rooms/new` and `/owner/rooms/[id]/edit`:**
- Tabbed form: اطلاعات کلی · گالری · امکانات · قیمت‌گذاری · در دسترس بودن · SEO.
- اطلاعات کلی: عنوان، slug (auto-generated, editable), توضیح کوتاه، توضیح بلند (tiptap rich text editor), ظرفیت بزرگسال + کودک، متراژ، طبقه.
- گالری: drag-drop upload area + sortable thumb grid; mark a primary photo. Direct upload to Arvan S3.
- امکانات: multi-select chips grouped by category.
- قیمت‌گذاری: قیمت پایه شب · قیمت آخر هفته (اختیاری) · قیمت فصل اوج (اختیاری) · قیمت کودک · شب اضافه.
- در دسترس بودن: toggle "رزرو فوری فعال است" + Jalali calendar to mark blocked dates with reason dropdown (تعمیرات / رزرو خارجی جاباما / دست‌چین / بافر).
- SEO: meta title, description, OG image override.
- Footer: "ذخیره پیش‌نویس" + "انتشار" + "حذف" (with confirm modal).

#### `/owner/calendar`

- Full-screen Jalali calendar (month view default; toggles to ۲ ماه / ۳ ماه / لیست).
- Each day cell shows: number of bookings as colored bars (one bar per room), tap reveals popover with bookings.
- Filter rail: by اتاق, by وضعیت (تأییدشده / در انتظار / مسدود).
- Right side panel (desktop): selected day details — list of bookings + "افزودن مسدودی" button + tide/weather hint.

#### `/owner/bookings`

- List view with rich filters: وضعیت · تاریخ · اتاق · کانال (سایت / جاباما / شب / دستی).
- Each row: status chip · کد رزرو · نام میهمان · اتاق · تاریخ‌ها · مبلغ · کانال · سه نقطه (...) menu (مشاهده، تأیید، رد، استرداد، چاپ فاکتور مؤدیان).
- Bulk actions toolbar appears on selection.
- Single booking page `/owner/bookings/[id]`:
  - Three-column: راست = جزئیات میهمان (نام، کد ملی، تماس، WA quick-button) · وسط = جدول مالی + add-ons + پرداخت · چپ = تایم‌لاین وضعیت + log audit.
  - Action bar at top: تأیید · رد · لغو · استرداد · ارسال پیامک · گفت‌وگو در واتساپ · چاپ فاکتور مؤدیان.

#### `/owner/messages`

- Inbox-style two-pane: list of contact messages (right), reading pane (left). Mark read/unread, archive, "پاسخ از طریق ایمیل" link.

#### `/owner/cleaning`

- Per-day card list of rooms needing turnover (between checkout and next check-in).
- Each card: اتاق · ساعت خروج میهمان قبلی · ساعت ورود بعدی · checkbox list (تخت‌خواب · حمام · کف · صبحانه‌ست · …) · assign-to dropdown (نیروی خدمات).
- Mark-complete CTA. Daily summary KPI: «۳ از ۴ اتاق آماده.»

#### `/owner/reports`

- Date range picker.
- KPI tiles: درآمد، تعداد رزرو، نرخ اشغال، ADR، RevPAR.
- Charts: monthly trend, channel breakdown (site vs Jabama vs Shab), top rooms.
- Export to PDF/CSV button.
- Tax summary section: «مالیات ۹٪ گردشگری جمع‌آوری‌شده در دوره: ۲٫۸ میلیون تومان».

#### `/owner/settings`

- Sections: برند (logo, colors — Premium plan only) · اطلاعات تماس · سیاست رزرو (mode: instant/hybrid/request, ratio slider, cancellation policy radio) · پرداخت (Zarinpal merchant, Modayan tax-id) · پیامک و واتساپ (templates) · زبان (FA / EN / AR feature flags) · کاربران تیم.

---

### 4.13 Admin (Singo team) — `/admin`

> Light shell only in this template; mostly used by the Singo team during deployment. Reuse owner-panel chrome with a different accent color.

- Pages: مشتریان (لیست تمپلیت‌های نصب‌شده در Managed Hosting) · گزارش‌ها · تنظیمات سیستم · لاگ‌های Sentry summary · ابزار مهاجرت نسخه.

---

### 4.14 Legal — `/terms`, `/privacy`, `/cancellation`

- Long-form layout, max-width 720px, sticky right-rail TOC.
- "آخرین به‌روزرسانی: ۲۵ اردیبهشت ۱۴۰۵" caption top.
- Print-friendly button.

---

### 4.15 Errors — `not-found`, `error`

- 404: large playful crab illustration sitting on a "404" sign + "این صفحه شنا کرده رفته." + "بازگشت به خانه" CTA.
- 500: similar tone — "یک موج بزرگ آمد و چیزی شکست. تیم ما خبر دارد." + retry button + report-id displayed.

---

## 5. Component Library (used across pages)

> Stitch should produce these as reusable components.

### 5.1 Buttons

- **Primary** — `--brand-primary` bg, white text, `radius-md`, 44px tall (sm: 36px, lg: 52px). Hover: 10% darker. Active: 90% darker. Focus: 2px ring `--brand-primary` 40% opacity.
- **Secondary (ghost-outline)** — 1.5px border `--brand-primary`, transparent bg, brand-primary text. Hover: `--brand-primary-soft` bg.
- **Ghost** — no border, only text, hover bg `--neutral-100`.
- **Danger** — `--danger` bg.
- **Icon button** — 40×40 square, `radius-md`, ghost-style.
- **Loading state** — spinner replaces label, button stays the same width (no jump).
- **Disabled** — 50% opacity, `cursor-not-allowed`.

### 5.2 Inputs

- 44px tall, `radius-sm`, 1px `--neutral-300` border.
- Focus: 2px ring brand-primary 40% + border brand-primary.
- Error: `--danger` border + helper text below in `--danger` color.
- Success (after async validation, e.g., national-ID): green check icon at the trailing edge.
- Label always above input (14px, weight 500). Helper text below in 12px `--neutral-500`.
- Persian text: `direction: rtl`. Numeric inputs (phone, national-ID, OTP): `direction: ltr` even in RTL layout.

### 5.3 Date pickers (Jalali)

- Bottom-sheet on mobile, popover on desktop.
- Two-month grid for range selection, with selected range highlighted in `--brand-primary-soft` and endpoints in `--brand-primary` solid circle.
- Persian week starts شنبه (Saturday).
- Day labels: ش ی د س چ پ ج.
- Today's cell has a hollow brand-primary outline.
- Disabled days (blocked, in-past): strikethrough + low contrast.
- Sticky footer with "پاک کردن" and "تأیید" buttons.

### 5.4 Cards

- White surface, `radius-lg`, `shadow-sm` default, `shadow-md` on hover.
- 1px `--neutral-300` border on cards over `--brand-sand` background.
- Image cards: rounded top corners only (or fully rounded if image fills).
- Card padding: 16px mobile, 20–24px desktop.

### 5.5 Modals / drawers / sheets

- Backdrop: `rgba(26,31,44,0.5)` + 4px blur.
- Modal: centered, max-width 560px, `radius-lg`, dismissible via X / backdrop / Esc.
- Drawer: slides from the start side (right in RTL). Width 360px desktop, full-screen mobile.
- Bottom sheet (mobile-first): rounded top, drag-handle indicator, swipe to dismiss.

### 5.6 Toasts (Sonner)

- Top-right (RTL: top-left from user's perspective, but consistent with Sonner default — pick whichever feels native).
- Variants: info, success, warning, error.
- Icon + message + close X.
- Auto-dismiss 5s except error (until dismissed).

### 5.7 Empty states

- Illustration (crab-themed), short headline, 1-line body, primary CTA.
- Variants: no rooms, no bookings, no messages, no search results, offline.

### 5.8 Skeletons

- Match the layout of the actual content (room card skeleton mirrors room card shape).
- Shimmer animation 1.4s, very subtle.
- Never use spinners for content load — always skeletons.

### 5.9 Status badges

| State                   | Color (bg / text)                  | Sample label              |
| ----------------------- | ---------------------------------- | ------------------------- |
| Instant bookable        | brand-primary / white              | «رزرو فوری»               |
| Confirmed               | success-soft / success             | «تأیید شد»                |
| Pending payment         | warning-soft / warning             | «در انتظار پرداخت»        |
| Cancelled               | neutral-100 / neutral-500          | «لغو شده»                 |
| Sold out                | danger-soft / danger               | «تکمیل ظرفیت»             |
| New (badge dot)         | brand-secondary                    | red dot only              |

### 5.10 Forms (composite)

- React Hook Form + Zod patterns visible in UI: inline field errors, summary error block at top on submit-fail (a11y).
- Multi-step forms (booking checkout, signup): visible progress bar at top.

### 5.11 Map widget

- MapLibre style, brand-tinted (light desaturated map). Custom markers in `--brand-primary`. Cluster bubbles with count.
- Floating zoom and recenter buttons at the start-bottom corner.
- Attribution to نشان bottom-left.

### 5.12 Calendar (Jalali) for owner

- Month grid, color-coded cells, hover preview.
- Drag-select for blocking date ranges.
- Right-rail filters and per-day popover.

---

## 6. Special UX micro-features (Singo signature touches)

These are what differentiate Singo from a generic hotel template. Stitch should surface them visibly.

1. **Tide indicator** — small wave icon + current tide level in the room detail and home pages (when location is coastal).
2. **Crab mascot** — appears in empty states, 404, signup welcome, and as tiny decorative loaders. Always smiling, always Qeshmi. Three poses: waving, sleeping, surprised.
3. **WhatsApp-first contact** — every contact CTA pairs phone with a green-tinted WhatsApp button. On owner panel, "گفت‌وگو در واتساپ" is the default action, "تماس تلفنی" secondary.
4. **Persian Jalali calendar throughout.** Never show Gregorian unless user explicitly toggles in profile settings.
5. **Modayan compliance line.** A single small line in the footer and on receipts: «این فاکتور توسط سامانه مؤدیان (شماره: ...) صادر شده.» Build trust without being noisy.
6. **Tourism license badge.** Bottom of footer + on About page: «دارای مجوز رسمی از سازمان میراث فرهنگی، صنایع دستی و گردشگری — شماره ۱۰۸۹/ق».
7. **Trust trio** appears on rooms list filter empty state and home hero: «✓ تأیید فوری  ✓ کمیسیون صفر  ✓ کنسلی انعطاف‌پذیر».
8. **Add-to-WhatsApp summary** on booking success — generates a pre-filled WA message a guest can send to family with their booking summary.
9. **Eco-tag** (small mangrove-leaf icon) on rooms and add-ons that meet sustainability criteria (solar, local food, plastic-free).
10. **Persian numerals** rendered for prices, dates, ratings (۰۱۲۳۴۵۶۷۸۹), but **inputs always accept ASCII** to avoid IME issues.

---

## 7. Responsive behavior

| Breakpoint | Width      | Layout notes                                                        |
| ---------- | ---------- | ------------------------------------------------------------------- |
| `sm`       | < 640px    | 1-col, stacked nav (drawer), bottom-sheet pickers, sticky bottom CTAs |
| `md`       | 640–1024px | 2-col grids, hybrid drawer/sheet pickers                              |
| `lg`       | 1024–1280px| Full sidebar (owner), 3-col room grid                                 |
| `xl`       | ≥ 1280px   | Max content 1280px, generous gutters                                  |

Hero photography always full-bleed. Room/blog cards re-flow gracefully. Owner panel sidebar collapses at `md`.

---

## 8. Accessibility checklist Stitch should respect

- All interactive elements ≥ 44×44px tap target on mobile.
- Color is never the only signal (status uses icon + text + color).
- Focus rings always visible (2px brand-primary 40% opacity).
- Form fields have explicit labels (no placeholder-as-label).
- Error messages announced with `role="alert"` semantics.
- Page hierarchy uses one H1, then H2/H3 in order.
- Image alt-text in Persian for all editorial photos; decorative images `alt=""`.
- Color contrast ≥ 4.5:1 for body, ≥ 3:1 for large text.
- `lang="fa"` and `dir="rtl"` on `<html>`.

---

## 9. Sample copy & glossary (Persian — preserve verbatim)

| Concept              | Persian label               |
| -------------------- | --------------------------- |
| Book now             | رزرو فوری                   |
| Search               | جستجو                       |
| Check-in / out       | ورود / خروج                 |
| Guests               | میهمانان                    |
| Adults / Children    | بزرگسال / کودک              |
| Per night            | / شب                        |
| Total                | مجموع                       |
| Tax (VAT 9%)         | مالیات ارزش افزوده ۹٪       |
| Cancel               | لغو                         |
| Confirm              | تأیید                       |
| Pay                  | پرداخت                      |
| Loading              | در حال بارگذاری             |
| Error                | خطا                         |
| Try again            | دوباره تلاش کن              |
| Back                 | بازگشت                      |
| Next                 | بعدی                        |
| Save                 | ذخیره                       |
| Edit                 | ویرایش                      |
| Delete               | حذف                         |
| Login                | ورود                        |
| Sign up              | ثبت‌نام                     |
| Logout               | خروج                        |
| Profile              | پروفایل                     |
| Bookings             | رزروها                      |
| Rooms                | اتاق‌ها                     |
| Attractions          | جاذبه‌ها                    |
| Blog                 | بلاگ                        |
| Gallery              | گالری                       |
| About                | درباره ما                   |
| Contact              | تماس                        |
| Owner                | میزبان                      |
| Guest                | میهمان                      |
| National ID          | کد ملی                      |
| Phone number         | شماره موبایل                |
| OTP code             | کد تأیید                    |
| WhatsApp             | واتساپ                      |
| Map                  | نقشه                        |
| Add to booking       | افزودن به رزرو              |
| Available            | در دسترس                    |
| Sold out             | تکمیل ظرفیت                 |
| Eco                  | پایدار / بومی               |

---

## 10. Output instructions for Stitch

When generating each page:

1. Use **the exact Persian copy** provided. Do not auto-translate to English.
2. Apply **`dir="rtl"`** at the page level; mirror all paddings, margins, icons, and arrow directions accordingly.
3. Use **Vazirmatn** for all text. Fall back to `Inter` only if Vazirmatn not available in Stitch — but flag this.
4. Use **Persian digits** (`۰۱۲۳۴۵۶۷۸۹`) in all displayed numbers (prices, dates, ratings).
5. Use **only the colors from §3.1**. No invented hues.
6. Photography: choose images of **Qeshm island, Persian Gulf, mangrove forests, traditional Iranian ecolodges, Persian cuisine** — not Mediterranean / Bali / Maldives.
7. Generate **mobile (360px)** AND **desktop (1440px)** versions of every page.
8. Include **states**: default, hover (desktop), active, loading skeleton, empty, error — at least the four most relevant per component.
9. Keep **components consistent** across pages. The room card on Home, /rooms, /dashboard, and /owner all share the same visual DNA, only data and density change.
10. Annotate **interaction notes** (animations, transitions) directly in Stitch frame comments.

---

## 11. What NOT to design (out of scope for first pass)

- ❌ Email templates (separate spec).
- ❌ PDF invoice layouts (Modayan generates server-side).
- ❌ WhatsApp message templates (separate spec).
- ❌ Print/check-in slip layouts.
- ❌ Multi-language UI variants (English, Arabic) — design FA only; multilingual is feature-flagged later.
- ❌ Internal Singo company website (this is the customer-facing template only).

---

## 12. Deliverables expected from Stitch

- One Stitch project named **"Singo — Sang-e Siah Showcase"**.
- ≥ 25 frames covering all sections of §4 (each page in mobile + desktop).
- A **Design System frame** at the start showing tokens, type scale, color swatches, components in all states.
- Component sticker sheet (button, input, card, badge, calendar, map widget, modal, toast, empty state).
- Export options: Figma copy + Stitch shareable link + PNG of each frame.

---

> **End of prompt.** Begin with the Design System frame, then Home (mobile → desktop), then proceed top-to-bottom through §4.

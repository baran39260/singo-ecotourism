# `src/app/` — Next.js App Router

routing و pages با Next.js 16 App Router. **این لایه فقط presentation است.** business logic اینجا نمی‌نشیند.

## ساختار پیش‌بینی‌شده (در طول پروپوزال‌ها)

```
app/
├── layout.tsx                  RootLayout (RTL، فونت، تم)
├── page.tsx                    Home — `'use cache'` در پروپوزال ۲
├── globals.css                 Tailwind + theme variables
├── (site)/                     Route group صفحات عمومی
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── rooms/page.tsx          (پروپوزال ۲)
│   ├── rooms/[slug]/page.tsx   (پروپوزال ۲)
│   ├── attractions/page.tsx    (پروپوزال ۲)
│   ├── blog/                   (پروپوزال ۲ + feature flag)
│   └── gallery/                (پروپوزال ۲ + feature flag)
├── (auth)/
│   ├── login/page.tsx          (پروپوزال ۱ task 7.11)
│   └── signup/page.tsx         (پروپوزال ۱ task 7.12)
├── (legal)/
│   ├── terms/page.tsx
│   ├── privacy/page.tsx
│   └── cancellation/page.tsx
├── owner/                      پنل صاحب (محافظت‌شده با middleware)
├── admin/                      پنل ادمین تیم سینگو
├── api/
│   ├── auth/[...nextauth]/     Auth.js handler (waiver)
│   ├── webhooks/               webhookها (پرداخت، sms callback)
│   └── internal/               endpointهای داخلی (process-image در پروپوزال ۲)
├── opengraph-image.tsx         OG image تولیدشده (پروپوزال ۱ task 9.4)
├── icon.tsx                    favicon از brand.logo
├── robots.ts                   robots.txt (استاتیک در فاز ۱، پویا در ۷)
├── error.tsx                   Error Boundary سفارشی فارسی
├── global-error.tsx            خطاهای فاجعه‌بار
└── not-found.tsx               404 سفارشی
```

## قواعد

- ✅ از `features/<X>` (فقط `index.ts`) و `components/` و `lib/` import کنید
- ❌ مستقیم Prisma صدا نزنید — از `features/<X>/server/queries.ts` استفاده کنید
- ✅ Server Actions در همان `app/` تعریف نمی‌شوند — در `features/<X>/server/actions.ts` و سپس import می‌کنید
- ✅ `'use cache'` directive در صفحات static (Next.js 16 paradigm، [design.md decision 23](../../openspec/changes/1-foundation/design.md))

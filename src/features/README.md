# `src/features/` — ماژول‌های دامنه

ساختار **Feature-Sliced**: هر دامنه (auth, room, booking, payment, …) یک فولدر مستقل با ساختار ثابت دارد.

## ساختار استاندارد یک feature

```
features/<name>/
├── components/       کامپوننت‌های React مخصوص feature (login form, room card, …)
├── server/
│   ├── actions.ts    Server Actions (mutations) — entry برای فرم‌ها
│   ├── queries.ts    توابع query برای استفاده در RSC (با React `cache()`)
│   └── repository.ts wrapper نازک Prisma — هیچ business logic
├── services/         business logic، orchestration، Result type
├── schemas/          Zod schemas — منبع حقیقت تایپ‌ها
├── types.ts          z.infer از schemas + domain types
└── index.ts          ★ Public API — تنها مسیر import از خارج
```

## قواعد import (اجباری با ESLint)

| مبدأ               | مقصد                                 | مجاز؟                                 |
| ------------------ | ------------------------------------ | ------------------------------------- |
| داخل feature `<X>` | داخل feature `<X>`                   | ✅ آزاد                               |
| feature `<X>`      | feature `<Y>/index.ts`               | ✅                                    |
| feature `<X>`      | feature `<Y>/server/internal-helper` | ❌ `singo/no-feature-internal-import` |
| feature `<X>`      | `core/`, `lib/`, `components/`       | ✅                                    |
| feature `<X>`      | `overrides/`                         | ⚠️ نه به‌طور پیش‌فرض                  |
| `app/`             | feature `<X>/index.ts`               | ✅                                    |
| `app/`             | feature `<X>/server/queries`         | ❌ از `index.ts` بخواهید              |

## افزودن feature جدید

```bash
mkdir -p src/features/<name>/{components,server,services,schemas}
touch src/features/<name>/{types.ts,index.ts}
```

سپس در `index.ts` فقط چیزهایی را export کنید که قرار است feature دیگر یا `app/` استفاده کنند.

## Featureهای فعلی

- [`auth/`](./auth/) — احراز هویت با OTP، نقش‌های GUEST/OWNER/ADMIN (پروپوزال ۱)
- (در پروپوزال ۲ اضافه می‌شوند: `room/`, `gallery/`, `attraction/`, `blog/`, `contact/`)

# `src/overrides/` — نقطه سفارشی‌سازی پلن Premium

✅ **این تنها مکانی است که مشتری مجاز به نوشتن کد است.**

## فلسفه

سینگو یک محصول قابل فروش است (بخش ۲.۱ [`docs/PROJECT.md`](../../docs/PROJECT.md)). مشتری Premium ممکن است نیاز به سفارشی‌سازی فراتر از `site.config.ts` و پنل ادمین داشته باشد. به‌جای دست زدن به `core/` (که آپدیت‌ها را می‌شکند)، در `overrides/` کامپوننت‌های هسته را override می‌کند.

## محتوای پیش‌بینی‌شده (در پروپوزال ۹)

```
overrides/
├── components/    کامپوننت‌های UI override-شده (مثلاً Hero سفارشی)
├── styles/        CSS سفارشی فراتر از theme
└── brand/         دارایی‌های بصری اختصاصی (لوگو، فونت ثانویه)
```

## قواعد import (اجباری با ESLint)

- ✅ از سطح بالای `core/` می‌تواند import کند: `import { logger } from '@/core'` ← مجاز
- ❌ از مسیرهای داخلی `core/` نمی‌تواند: `import { _internal } from '@/core/logger/internal/buffer'` ← `singo/overrides-stable-api` warning
- ✅ از `lib/`, `components/`, `features/<X>` (فقط index)
- این تضمین می‌کند **API سطحی core** پایدار می‌ماند و مشتری بین نسخه‌ها نمی‌شکند

## چه چیزی override می‌شود و چه چیزی نه

| هدف override              | روش پیشنهادی                                              |
| ------------------------- | --------------------------------------------------------- |
| تغییر رنگ، فونت           | `site.config.ts` (نه overrides)                           |
| تغییر متن                 | پنل ادمین یا `messages/fa.json`                           |
| تغییر layout صفحه         | `overrides/components/Layout.tsx`                         |
| تغییر business logic رزرو | ❌ ممنوع — به جای آن feature flag در `site.config.ts`     |
| اضافه کردن صفحه جدید      | `app/(custom)/...` در نسخه custom (پلن Enterprise، آینده) |

اگر `site.config.ts` و پنل ادمین کافی نبودند، اول بپرسید: **«آیا این یک نیاز عمومی است که باید به core اضافه شود؟»** — اگر بله، PR به repo اصلی.

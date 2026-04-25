# `src/` — کد منبع

ساختار **Feature-Sliced** بر اساس [openspec/project.md بخش ۹.۱](../openspec/project.md).

| فولدر                          | مسئولیت                                           | قاعده                                                                |
| ------------------------------ | ------------------------------------------------- | -------------------------------------------------------------------- |
| [`app/`](./app/)               | روتینگ Next.js App Router                         | فقط presentation و گرفتن داده از features                            |
| [`features/`](./features/)     | ماژول‌های دامنه (auth, room, booking, …)          | هر feature فقط از طریق `index.ts` خود قابل دسترس                     |
| [`core/`](./core/)             | کد cross-cutting قفل (logger, result, clients, …) | ⛔ مشتری دست نمی‌زند، با ESLint اجباری                               |
| [`overrides/`](./overrides/)   | نقطه سفارشی‌سازی پلن Premium                      | ✅ تنها مکانی که مشتری می‌تواند کد override کند                      |
| [`components/`](./components/) | کامپوننت‌های مشترک UI (shadcn، layout، features)  | بدون business logic؛ presentation                                    |
| [`lib/`](./lib/)               | helper functions کوتاه و عمومی                    | ⚠️ بدون business logic — اگر business دارد به feature/core منتقل شود |
| [`fonts/`](./fonts/)           | فونت‌های محلی (Vazirmatn)                         | فایل‌های `.woff2`                                                    |

## قواعد import (با ESLint اجباری)

```
app/        → می‌تواند از همه import کند
features/X/ → می‌تواند از core/, lib/, components/, و features/Y (فقط index) import کند
core/       → فقط از core/ و lib/ — هرگز از features/ یا overrides/
components/ → از core/, lib/ — نه از features/
overrides/  → فقط از سطح بالای core/ (نه deep paths)
lib/        → فقط از lib/ — هیچ business logic
```

ESLint ruleها در `tools/eslint-plugin-singo/`:

- `singo/no-core-internal-leak` — جلوگیری از import core → overrides
- `singo/overrides-stable-api` — overrides فقط از API سطح بالای core
- `singo/no-feature-internal-import` — features فقط از طریق `index.ts`

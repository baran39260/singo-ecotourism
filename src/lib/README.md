# `src/lib/` — Helperهای عمومی

⚠️ **قاعده طلایی:** هیچ business logic اینجا نباشد. اگر تابعی نیاز به DB، service، یا knowledge از domain دارد → به `features/` یا `core/` ببرید.

## محتوای پیش‌بینی‌شده

| فایل                 | محتوا                                      | پروپوزال      |
| -------------------- | ------------------------------------------ | ------------- |
| `db.ts`              | Prisma client singleton (HMR-safe)         | ۱ (task 5.6)  |
| `auth.ts`            | NextAuth instance با adapter               | ۱ (task 7.3)  |
| `auth.config.ts`     | NextAuth config edge-safe (split config)   | ۱ (task 7.2)  |
| `get-site-config.ts` | خواندن `site.config.ts` با React `cache()` | ۱ (task 3.3)  |
| `theme.ts`           | تولید مشتقات رنگ از brand color            | ۱ (task 3.4)  |
| `config-schema.ts`   | Zod schema برای `site.config.ts`           | ۱ (task 3.1)  |
| `container.ts`       | factory برای DI container                  | ۱ (task 6.10) |
| `session.ts`         | helper `getCurrentUser()` با cache         | ۱ (task 6.8)  |
| `utils.ts`           | helperهای ریز (cn, formatDate, …)          | به مرور       |

## قاعده تشخیص

| اگر تابع/فایل …                                                | باید برود به …                                   |
| -------------------------------------------------------------- | ------------------------------------------------ |
| Pure function، عمومی، بدون state                               | `lib/`                                           |
| Pure function ولی domain-aware (مثلاً `calculateBookingPrice`) | `features/booking/`                              |
| Manage external resource (DB, SMS, Storage)                    | `core/` (interface) + `lib/` (instance creation) |
| React component                                                | `components/` یا `features/<X>/components/`      |

## قواعد import

- ✅ از `core/` و سایر `lib/` می‌توان import کرد
- ❌ از `features/` نباید — lib پایین‌ترین لایه است
- ✅ از npm packages آزاد است

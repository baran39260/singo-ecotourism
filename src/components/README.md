# `src/components/` — کامپوننت‌های مشترک

کامپوننت‌های **بدون business logic** که در چند feature استفاده می‌شوند یا layout سراسری را می‌سازند.

## ساختار

| زیرپوشه     | محتوا                                                                       | منبع                                         |
| ----------- | --------------------------------------------------------------------------- | -------------------------------------------- |
| `ui/`       | کامپوننت‌های پایه shadcn/ui (button, input, card, …)                        | تولید شده با `pnpm dlx shadcn add` (task ۱۲) |
| `layout/`   | Navbar, Footer, Sidebar — layout سراسری                                     | task 11.2-11.3                               |
| `features/` | کامپوننت‌های دارای منطق UI کوچک ولی feature-agnostic (مثلاً `<EmptyState>`) | به مرور                                      |

## قاعده مهم: تفاوت با `features/<X>/components/`

- اینجا (`src/components/`): **مشترک**، می‌تواند در چند feature استفاده شود
- آنجا (`features/<X>/components/`): **اختصاصی** برای آن feature، نباید بیرون استفاده شود

اگر یک کامپوننت در دو feature استفاده می‌شود، یا به اینجا منتقل کنید یا یکی از دو feature را به دیگری متصل کنید (با تأمل).

## قواعد import

- ✅ از `core/`, `lib/`, ‌`components/ui/`, `components/layout/` می‌توان import کرد
- ❌ از `features/` نباید import کرد (وگرنه coupling به feature خاص)
- ❌ از `overrides/` نباید import کرد

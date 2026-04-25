# OpenSpec — سینگو

این پوشه مبتنی بر چارچوب **[OpenSpec](https://github.com/Fission-AI/OpenSpec)** سازمان‌دهی شده است.

## ساختار

```
openspec/
├── project.md              # context پایدار پروژه — همه پروپوزال‌ها این را می‌خوانند
├── specs/                  # وضعیت فعلی قابلیت‌ها (truth)
│   └── <capability>/
│       └── spec.md
└── changes/                # پروپوزال‌های در حال بررسی یا تأییدشده و هنوز اجرا‌نشده
    └── <change-id>/
        ├── proposal.md     # چرا، چه چیز، چه تاثیر
        ├── tasks.md        # چک‌لیست پیاده‌سازی
        ├── design.md       # تصمیمات فنی (اختیاری)
        └── specs/          # تغییرات در spec‌ها (ADDED / MODIFIED / REMOVED)
            └── <capability>/
                └── spec.md
```

## جریان کار

۱. **نوشتن پروپوزال:** یک فولدر جدید در `changes/` ساخته می‌شود (مثلاً `1-foundation/`) با حداقل `proposal.md` و `tasks.md`.

۲. **بررسی و تأیید:** کاربر پروپوزال را می‌خواند، تغییرات لازم اعمال می‌شود، تأیید می‌شود.

۳. **پیاده‌سازی:** taskهای `tasks.md` یکی‌یکی تیک می‌خورند.

۴. **Archive:** وقتی تغییر کامل اجرا شد، spec deltaها با `specs/` ادغام می‌شوند و فولدر `changes/<id>` آرشیو می‌شود (یا به `changes/archive/` منتقل می‌شود).

## پروپوزال‌های برنامه‌ریزی شده

| #   | شناسه                    | محدوده                                                                 | وضعیت        |
| --- | ------------------------ | ---------------------------------------------------------------------- | ------------ |
| ۱   | `1-foundation`           | ساختار اپ، theming، auth، SEO پایه، i18n، Sentry، صفحات عمومی skeleton | در حال بررسی |
| ۲   | `2-content-management`   | CRUD محتوا از پنل ادمین + آروان S3 + کاوه‌نگار واقعی                   | منتظر        |
| ۳   | `3-reservation-system`   | Hybrid Instant Booking                                                 | منتظر        |
| ۴   | `4-compliance-module`    | سامانه مسافر، مالیات ۹٪، مؤدیان                                        | منتظر        |
| ۵   | `5-payment-integration`  | زرین‌پال                                                               | منتظر        |
| ۶   | `6-owner-panel-whatsapp` | پنل owner + اعلان واتساپ                                               | منتظر        |
| ۷   | `7-seo-and-map`          | SEO پویا (sitemap/JSON-LD)، نقشه MapLibre                              | منتظر        |
| ۸   | `8-showcase-content`     | محتوای ویترین فروش: عکاسی، تستیمونیال، داستان برند                     | منتظر        |
| ۹   | `9-productize-template`  | site.config.ts کامل، overrides/، اسکریپت setup، مستندسازی فروش         | منتظر        |
| ۱۰  | `10-pilot-deployment`    | اولین مشتری واقعی                                                      | منتظر        |

جزئیات در [`project.md`](./project.md).

## قاعده طلایی

اگر در حال نوشتن/پیاده‌سازی یک پروپوزال هستید، **اول `project.md` را بخوانید**. اصول بنیادی (تک-مستاجری بودن، مرز core/overrides، انطباق قانونی، Instant Booking پیش‌فرض، WhatsApp-first) در همه پروپوزال‌ها رعایت می‌شوند.

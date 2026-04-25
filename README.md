123
# سینگو (Singo)

تمپلیت حرفه‌ای وب‌سایت **اقامتگاه‌های بومگردی و هتل‌های کوچک ایران** — هر مشتری، یک سایت اختصاصی مستقل، نه پلتفرم چند-مستاجری.

> «سینگو» در گویش قشمی به معنای **خرچنگ** است.

## وضعیت

نسخه: **0.1.0** (در حال توسعه — پروپوزال `1-foundation`)
Stack: Next.js 16 · React 19 · Tailwind v4 · TypeScript strict · Cache Components

## شروع سریع

```bash
# نصب وابستگی‌ها
pnpm install

# کپی env و پر کردن مقادیر
cp .env.example .env.local

# اجرای dev server
pnpm dev
```

دسترسی: <http://localhost:3000>

## دستورهای کاربردی

| دستور               | توضیح                              |
| ------------------- | ---------------------------------- |
| `pnpm dev`          | اجرای dev server با Turbopack      |
| `pnpm build`        | build production                   |
| `pnpm start`        | اجرای production build             |
| `pnpm typecheck`    | بررسی TypeScript                   |
| `pnpm lint`         | اجرای ESLint                       |
| `pnpm format`       | فرمت‌بندی Prettier روی همه فایل‌ها |
| `pnpm format:check` | بررسی فرمت بدون تغییر              |

## اسناد

- 📋 [`docs/PROJECT.md`](docs/PROJECT.md) — سند جامع محصول، چشم‌انداز، مدل کسب‌وکار
- 📐 [`openspec/`](openspec/) — اسپک‌های فنی و پروپوزال‌های توسعه (OpenSpec)
- 🤖 [`openspec/AGENTS.md`](openspec/AGENTS.md) — راهنمای AI assistantها

## ساختار پروژه

```
src/
├── app/             # Next.js App Router
├── core/            # ⛔ کد قفل (مرز کسب‌وکار)
├── features/        # ماژول‌های دامنه (Feature-Sliced)
├── components/ui/   # کامپوننت‌های مشترک shadcn
├── overrides/       # ✅ نقطه سفارشی‌سازی پلن Premium
├── lib/             # helperهای عمومی
└── fonts/           # فونت‌های محلی (Vazirmatn)

site.config.ts       # کانفیگ مشتری (نام برند، رنگ، …)
prisma/              # اسکیمای دیتابیس
openspec/            # اسپک‌های فنی
docs/                # اسناد محصول
```

## اصول معماری

پیش از کار روی هر فیچر، حتماً [`openspec/project.md`](openspec/project.md) را بخوانید:

1. **تک-مستاجری** — هیچ `tenantId` در اسکیما
2. **مرز core/overrides** — با ESLint اجباری
3. **انطباق قانونی ایران** — built-in (سامانه مسافر، مالیات ۹٪، مؤدیان)
4. **رزرو پیش‌فرض Instant** (نه Request-to-Book)
5. **اعلان owner از واتساپ** (نه فقط پنل وب)
6. **RTL فارسی پیش‌فرض**
7. **همه متون از i18n layer** (نه hardcode)
8. **هیچ secret در کد** — فقط env

## لایسنس

Proprietary — تصمیم نهایی در پروپوزال ۹ گرفته می‌شود.

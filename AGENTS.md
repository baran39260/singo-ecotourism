# AGENTS.md — راهنمای دستیار AI

این پروژه از چارچوب **OpenSpec** برای مدیریت توسعه استفاده می‌کند. **قبل از هر تغییری**، فایل‌های زیر را به ترتیب بخوانید:

۱. [`openspec/project.md`](openspec/project.md) — اصول بنیادی (تک-مستاجری، مرز core/overrides، انطباق قانونی، …)
۲. [`openspec/AGENTS.md`](openspec/AGENTS.md) — راهنمای کامل AI برای کار با OpenSpec و این repo
۳. پروپوزال در حال اجرا در [`openspec/changes/<id>/`](openspec/changes/)
۴. [`docs/PROJECT.md`](docs/PROJECT.md) — context محصول و کسب‌وکار

## توجه به Next.js 16

این پروژه از **Next.js 16** استفاده می‌کند که با Next.js 15 (و training data شما) **تفاوت‌های breaking** دارد:

- `experimental.ppr` حذف شده؛ جایگزین آن `cacheComponents: true` است
- با `cacheComponents`، کامپوننت‌ها **dynamic به‌طور پیش‌فرض** هستند و برای static از `'use cache'` directive استفاده می‌شود (برعکس PPR)
- Auth.js v5 با split config (edge-safe + Node)
- Tailwind v4 با `@theme inline`

برای شک، مستندات محلی Next.js را بخوانید: `node_modules/.pnpm/next@*/node_modules/next/dist/docs/`.

## خلاصه قواعد

- ❌ هیچ فیلد `tenantId` در اسکیما
- ❌ هیچ متن hardcode فارسی در JSX (همه از i18n)
- ❌ هیچ secret در کد
- ❌ هیچ `console.log` در `src/` (Pino logger)
- ❌ هیچ `any` در business logic
- ❌ هیچ Server Action مستقیم Prisma call (از repository استفاده شود)
- ✅ Feature-Sliced organization در `src/features/`
- ✅ Result type برای errorهای قابل پیش‌بینی
- ✅ Server Actions برای mutations، RSC برای queries، REST فقط برای webhooks

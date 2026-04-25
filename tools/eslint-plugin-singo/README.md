# eslint-plugin-singo

Plugin سفارشی ESLint برای اجرای مرزهای معماری سینگو.

این plugin محلی است (publish نشده) و توسط `eslint.config.mjs` با `import` بارگذاری می‌شود.

## Rules

| نام                                                                        | severity | توضیح                                                                                     |
| -------------------------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------- |
| [`singo/no-core-internal-leak`](rules/no-core-internal-leak.mjs)           | `error`  | core نباید از `overrides/` یا `features/` import کند (value، type، dynamic — همه)         |
| [`singo/overrides-stable-api`](rules/overrides-stable-api.mjs)             | `error`  | overrides فقط از سطح بالای core import کند (`@/core` یا `@/core/<topdir>`)، نه مسیر داخلی |
| [`singo/no-feature-internal-import`](rules/no-feature-internal-import.mjs) | `error`  | به feature فقط از `index.ts` آن import شود (یا از داخل همان feature)                      |

همه ruleها این AST nodeها را پوشش می‌دهند:

- `ImportDeclaration` — `import x from '...'`
- `ImportExpression` — `import('...')` ← جلوگیری از bypass عمدی
- `ExportAllDeclaration` — `export * from '...'`
- `ExportNamedDeclaration` — `export { x } from '...'`

و type-only imports هم block می‌شوند (طبق design.md decision 24).

## فعال‌سازی

در `eslint.config.mjs`:

```js
import singo from './tools/eslint-plugin-singo/index.mjs';

export default defineConfig([
  // …
  {
    plugins: { singo },
    rules: {
      'singo/no-core-internal-leak': 'error',
      'singo/overrides-stable-api': 'warn',
      'singo/no-feature-internal-import': 'error',
    },
  },
]);
```

## تست

```bash
pnpm test tools/eslint-plugin-singo
```

تست‌ها در `tests/` با Vitest و `eslint`'s `RuleTester` نوشته شده‌اند.

## افزودن rule جدید

۱. فایل جدید در `rules/<name>.mjs` با schema استاندارد ESLint
۲. import + register در `index.mjs`
۳. تست در `tests/<name>.test.mjs`
۴. اضافه کردن به `eslint.config.mjs`
۵. به‌روزرسانی این README

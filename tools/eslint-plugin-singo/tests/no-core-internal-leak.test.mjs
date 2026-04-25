import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';
import rule from '../rules/no-core-internal-leak.mjs';
import { inCore, inSrc } from './helpers.mjs';

RuleTester.it = it;
RuleTester.describe = describe;

const ruleTester = new RuleTester({
  languageOptions: { ecmaVersion: 'latest', sourceType: 'module' },
});

ruleTester.run('singo/no-core-internal-leak', rule, {
  valid: [
    // import داخل core — مجاز
    {
      filename: inCore('logger', 'index.ts'),
      code: "import { x } from '@/core/result';",
    },
    // import از lib — مجاز
    {
      filename: inCore('logger', 'index.ts'),
      code: "import { db } from '@/lib/db';",
    },
    // import از npm package — مجاز
    {
      filename: inCore('clients', 'sms', 'kavenegar.ts'),
      code: "import pino from 'pino';",
    },
    // فایل خارج از core — قاعده اعمال نمی‌شود
    {
      filename: inSrc('lib', 'utils.ts'),
      code: "import { x } from '@/overrides/components/Hero';",
    },
    {
      filename: inSrc('app', 'page.tsx'),
      code: "import { x } from '@/features/auth';",
    },
    // import relative داخل core
    {
      filename: inCore('logger', 'index.ts'),
      code: "import { y } from './request-context';",
    },
  ],
  invalid: [
    // ─── overrides leak (alias) ───────────────────────────────
    {
      filename: inCore('logger', 'index.ts'),
      code: "import { Hero } from '@/overrides/components/Hero';",
      errors: [{ messageId: 'overrides' }],
    },
    {
      filename: inCore('result', 'index.ts'),
      code: "import x from '@/overrides';",
      errors: [{ messageId: 'overrides' }],
    },
    // ─── overrides leak (relative) ────────────────────────────
    {
      filename: inCore('logger', 'index.ts'),
      code: "import { Brand } from '../../overrides/brand/logo';",
      errors: [{ messageId: 'overrides' }],
    },
    // ─── overrides leak (export from) ─────────────────────────
    {
      filename: inCore('clients', 'storage', 'index.ts'),
      code: "export { x } from '@/overrides/storage';",
      errors: [{ messageId: 'overrides' }],
    },
    // ─── overrides leak (export *) ────────────────────────────
    {
      filename: inCore('clients', 'storage', 'index.ts'),
      code: "export * from '@/overrides';",
      errors: [{ messageId: 'overrides' }],
    },
    // ─── overrides leak (dynamic import — bypass جلوگیری) ─────
    {
      filename: inCore('booking', 'index.ts'),
      code: "const m = await import('@/overrides/tweak');",
      errors: [{ messageId: 'overrides' }],
    },
    // type-only imports در integration.test.mjs تست می‌شوند (نیاز به TS parser)
    // ─── features leak (alias) ────────────────────────────────
    {
      filename: inCore('logger', 'index.ts'),
      code: "import { authService } from '@/features/auth';",
      errors: [{ messageId: 'features' }],
    },
    {
      filename: inCore('booking', 'state.ts'),
      code: "import { repo } from '@/features/auth/server/repository';",
      errors: [{ messageId: 'features' }],
    },
    // ─── features leak (dynamic import) ───────────────────────
    {
      filename: inCore('booking', 'state.ts'),
      code: "const m = await import('@/features/auth');",
      errors: [{ messageId: 'features' }],
    },
    // ─── features leak (relative) ─────────────────────────────
    {
      filename: inCore('booking', 'state.ts'),
      code: "import { x } from '../../features/auth/index';",
      errors: [{ messageId: 'features' }],
    },
  ],
});

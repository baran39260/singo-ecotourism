import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';
import rule from '../rules/no-feature-internal-import.mjs';
import { inApp, inCore, inFeature, inSrc } from './helpers.mjs';

RuleTester.it = it;
RuleTester.describe = describe;

const ruleTester = new RuleTester({
  languageOptions: { ecmaVersion: 'latest', sourceType: 'module' },
});

ruleTester.run('singo/no-feature-internal-import', rule, {
  valid: [
    // app به feature از طریق index — مجاز
    {
      filename: inApp('login', 'page.tsx'),
      code: "import { signUpAction } from '@/features/auth';",
    },
    // app با index صریح — مجاز
    {
      filename: inApp('owner', 'page.tsx'),
      code: "import { x } from '@/features/auth/index';",
    },
    // app با index.ts صریح — مجاز
    {
      filename: inApp('owner', 'page.tsx'),
      code: "import { x } from '@/features/auth/index.ts';",
    },
    // داخل همان feature، مسیر داخلی — مجاز
    {
      filename: inFeature('auth', 'server', 'actions.ts'),
      code: "import { schema } from '@/features/auth/schemas/login';",
    },
    {
      filename: inFeature('auth', 'services', 'auth-service.ts'),
      code: "import { userRepository } from '@/features/auth/server/repository';",
    },
    // import از feature دیگر با index — مجاز
    {
      filename: inFeature('booking', 'services', 'booking-service.ts'),
      code: "import { getCurrentUser } from '@/features/auth';",
    },
    // import از core — قاعده فقط روی features کار می‌کند
    {
      filename: inApp('page.tsx'),
      code: "import { logger } from '@/core/logger';",
    },
    {
      filename: inCore('logger', 'index.ts'),
      code: "import pino from 'pino';",
    },
    // ─── Edge case: فایل مستقیماً در src/features/ root است ───
    // (مثلاً یک hypothetical index.ts برای barrel همه features)
    // در این حالت featureOfFile باید null برگرداند، نه 'index.ts'
    {
      filename: inSrc('features', 'index.ts'),
      code: "export { auth } from '@/features/auth';",
    },
  ],
  invalid: [
    // ─── app به مسیر داخلی feature ───────────────────────────
    {
      filename: inApp('login', 'page.tsx'),
      code: "import { authService } from '@/features/auth/services/auth-service';",
      errors: [
        {
          messageId: 'deepImport',
          data: {
            source: '@/features/auth/services/auth-service',
            targetFeature: 'auth',
          },
        },
      ],
    },
    // ─── app به server داخلی ─────────────────────────────────
    {
      filename: inApp('page.tsx'),
      code: "import { repo } from '@/features/auth/server/repository';",
      errors: [{ messageId: 'deepImport' }],
    },
    // ─── feature به مسیر داخلی feature دیگر ──────────────────
    {
      filename: inFeature('booking', 'services', 'booking.ts'),
      code: "import { x } from '@/features/auth/server/queries';",
      errors: [{ messageId: 'deepImport' }],
    },
    // ─── core به مسیر داخلی feature ──────────────────────────
    // (این هم توسط no-core-internal-leak می‌گیرد، ولی این rule هم درست عمل می‌کند)
    {
      filename: inCore('logger', 'index.ts'),
      code: "import { x } from '@/features/auth/types';",
      errors: [{ messageId: 'deepImport' }],
    },
    // ─── export from با مسیر داخلی ───────────────────────────
    {
      filename: inApp('barrel.ts'),
      code: "export { y } from '@/features/auth/schemas/login';",
      errors: [{ messageId: 'deepImport' }],
    },
    // ─── export * با مسیر داخلی ──────────────────────────────
    {
      filename: inApp('barrel.ts'),
      code: "export * from '@/features/auth/components';",
      errors: [{ messageId: 'deepImport' }],
    },
    // ─── dynamic import داخلی ────────────────────────────────
    {
      filename: inApp('login', 'page.tsx'),
      code: "const m = await import('@/features/auth/services/auth-service');",
      errors: [{ messageId: 'deepImport' }],
    },
    // type-only imports در integration.test.mjs تست می‌شوند (نیاز به TS parser)
  ],
});

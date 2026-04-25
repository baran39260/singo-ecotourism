import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';
import rule from '../rules/overrides-stable-api.mjs';
import { inOverrides, inSrc } from './helpers.mjs';

RuleTester.it = it;
RuleTester.describe = describe;

const ruleTester = new RuleTester({
  languageOptions: { ecmaVersion: 'latest', sourceType: 'module' },
});

ruleTester.run('singo/overrides-stable-api', rule, {
  valid: [
    // import از روت core
    {
      filename: inOverrides('components', 'Hero.tsx'),
      code: "import { logger } from '@/core';",
    },
    // import از سطح ۱ زیر core
    {
      filename: inOverrides('components', 'Hero.tsx'),
      code: "import { logger } from '@/core/logger';",
    },
    // import از npm
    {
      filename: inOverrides('components', 'Hero.tsx'),
      code: "import React from 'react';",
    },
    // import از features (با index)
    {
      filename: inOverrides('components', 'Hero.tsx'),
      code: "import { auth } from '@/features/auth';",
    },
    // فایل خارج از overrides — قاعده اعمال نمی‌شود
    {
      filename: inSrc('lib', 'utils.ts'),
      code: "import { x } from '@/core/logger/internal/buffer';",
    },
  ],
  invalid: [
    // ─── deep import (alias، ۲ سطح زیر core) ──────────────────
    {
      filename: inOverrides('components', 'Hero.tsx'),
      code: "import { buf } from '@/core/logger/internal/buffer';",
      errors: [{ messageId: 'deepImport' }],
    },
    // ─── deep import (۳ سطح) ─────────────────────────────────
    {
      filename: inOverrides('storage', 'custom.ts'),
      code: "import { x } from '@/core/clients/storage/internals';",
      errors: [{ messageId: 'deepImport' }],
    },
    // ─── deep import — even '/index' explicit مسدود است ──────
    // (راه فرار آنتی‌پترن: اگر کسی '/index' بنویسد تا rule را دور بزند)
    {
      filename: inOverrides('barrel.ts'),
      code: "import { x } from '@/core/logger/index';",
      errors: [{ messageId: 'deepImport' }],
    },
    // ─── export from با مسیر داخلی ───────────────────────────
    {
      filename: inOverrides('barrel.ts'),
      code: "export { y } from '@/core/security/rate-limit/in-memory';",
      errors: [{ messageId: 'deepImport' }],
    },
    // ─── export * ────────────────────────────────────────────
    {
      filename: inOverrides('barrel.ts'),
      code: "export * from '@/core/logger/internal/setup';",
      errors: [{ messageId: 'deepImport' }],
    },
    // ─── dynamic import ─────────────────────────────────────
    {
      filename: inOverrides('components', 'Hero.tsx'),
      code: "const m = await import('@/core/logger/internal/buffer');",
      errors: [{ messageId: 'deepImport' }],
    },
    // type-only imports در integration.test.mjs تست می‌شوند (نیاز به TS parser)
  ],
});

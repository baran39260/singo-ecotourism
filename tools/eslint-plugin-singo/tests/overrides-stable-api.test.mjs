import { RuleTester } from 'eslint';
import path from 'node:path';
import { describe, it } from 'vitest';
import rule from '../rules/overrides-stable-api.mjs';

RuleTester.it = it;
RuleTester.describe = describe;

const REPO = process.cwd();
const inOverrides = (...segs) => path.join(REPO, 'src', 'overrides', ...segs);
const inOther = (...segs) => path.join(REPO, 'src', ...segs);

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
    // import از سطح ۱ زیر core (یک topdir)
    {
      filename: inOverrides('components', 'Hero.tsx'),
      code: "import { logger } from '@/core/logger';",
    },
    // import از کتابخانه npm
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
      filename: inOther('lib', 'utils.ts'),
      code: "import { x } from '@/core/logger/internal/buffer';",
    },
  ],
  invalid: [
    // import به مسیر داخلی core — ۲ سطح زیر
    {
      filename: inOverrides('components', 'Hero.tsx'),
      code: "import { buf } from '@/core/logger/internal/buffer';",
      errors: [{ messageId: 'deepImport' }],
    },
    // import به مسیر داخلی — ۳ سطح
    {
      filename: inOverrides('storage', 'custom.ts'),
      code: "import { x } from '@/core/clients/storage/internals';",
      errors: [{ messageId: 'deepImport' }],
    },
    // export from با مسیر داخلی
    {
      filename: inOverrides('barrel.ts'),
      code: "export { y } from '@/core/security/rate-limit/in-memory';",
      errors: [{ messageId: 'deepImport' }],
    },
  ],
});

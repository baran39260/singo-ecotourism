import { RuleTester } from 'eslint';
import path from 'node:path';
import { describe, it } from 'vitest';
import rule from '../rules/no-core-internal-leak.mjs';

// RuleTester به یک test framework نیاز دارد. به Vitest وصل می‌کنیم.
RuleTester.it = it;
RuleTester.describe = describe;

const REPO = process.cwd();
const inCore = (...segs) => path.join(REPO, 'src', 'core', ...segs);
const inOther = (...segs) => path.join(REPO, 'src', ...segs);

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
});

ruleTester.run('singo/no-core-internal-leak', rule, {
  valid: [
    // import از core داخل core — مجاز
    {
      filename: inCore('logger', 'index.ts'),
      code: "import { x } from '@/core/result';",
    },
    // import از lib داخل core — مجاز
    {
      filename: inCore('logger', 'index.ts'),
      code: "import { db } from '@/lib/db';",
    },
    // import از npm package — مجاز
    {
      filename: inCore('clients', 'sms', 'kavenegar.ts'),
      code: "import pino from 'pino';",
    },
    // فایل خارج از core — قاعده اعمال نمی‌شود حتی اگر از overrides import کند
    {
      filename: inOther('lib', 'utils.ts'),
      code: "import { x } from '@/overrides/components/Hero';",
    },
    // import relative به فایل دیگری در core
    {
      filename: inCore('logger', 'index.ts'),
      code: "import { y } from './request-context';",
    },
  ],
  invalid: [
    // alias import به overrides از داخل core
    {
      filename: inCore('logger', 'index.ts'),
      code: "import { Hero } from '@/overrides/components/Hero';",
      errors: [{ messageId: 'forbidden' }],
    },
    // alias import روت overrides
    {
      filename: inCore('result', 'index.ts'),
      code: "import x from '@/overrides';",
      errors: [{ messageId: 'forbidden' }],
    },
    // relative import به overrides (../../overrides/...)
    {
      filename: inCore('logger', 'index.ts'),
      code: "import { Brand } from '../../overrides/brand/logo';",
      errors: [{ messageId: 'forbidden' }],
    },
    // export from
    {
      filename: inCore('clients', 'storage', 'index.ts'),
      code: "export { x } from '@/overrides/storage';",
      errors: [{ messageId: 'forbidden' }],
    },
  ],
});

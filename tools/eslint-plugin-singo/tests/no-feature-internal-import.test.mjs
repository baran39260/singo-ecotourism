import { RuleTester } from 'eslint';
import path from 'node:path';
import { describe, it } from 'vitest';
import rule from '../rules/no-feature-internal-import.mjs';

RuleTester.it = it;
RuleTester.describe = describe;

const REPO = process.cwd();
const inFeature = (name, ...segs) => path.join(REPO, 'src', 'features', name, ...segs);
const inApp = (...segs) => path.join(REPO, 'src', 'app', ...segs);
const inCore = (...segs) => path.join(REPO, 'src', 'core', ...segs);

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
    // app به index صریح — مجاز
    {
      filename: inApp('owner', 'page.tsx'),
      code: "import { x } from '@/features/auth/index';",
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
    // import از core/lib/components/npm — قاعده فقط روی features کار می‌کند
    {
      filename: inApp('page.tsx'),
      code: "import { logger } from '@/core/logger';",
    },
    // فایل غیرفیچر، import از npm — مجاز
    {
      filename: inCore('logger', 'index.ts'),
      code: "import pino from 'pino';",
    },
  ],
  invalid: [
    // app به مسیر داخلی feature
    {
      filename: inApp('login', 'page.tsx'),
      code: "import { authService } from '@/features/auth/services/auth-service';",
      errors: [
        {
          messageId: 'deepImport',
          data: { source: '@/features/auth/services/auth-service', targetFeature: 'auth' },
        },
      ],
    },
    // app به server داخلی feature
    {
      filename: inApp('page.tsx'),
      code: "import { repo } from '@/features/auth/server/repository';",
      errors: [{ messageId: 'deepImport' }],
    },
    // feature دیگر به مسیر داخلی
    {
      filename: inFeature('booking', 'services', 'booking.ts'),
      code: "import { x } from '@/features/auth/server/queries';",
      errors: [{ messageId: 'deepImport' }],
    },
    // core به مسیر داخلی feature
    {
      filename: inCore('logger', 'index.ts'),
      code: "import { x } from '@/features/auth/types';",
      errors: [{ messageId: 'deepImport' }],
    },
    // export from با مسیر داخلی
    {
      filename: inApp('barrel.ts'),
      code: "export { y } from '@/features/auth/schemas/login';",
      errors: [{ messageId: 'deepImport' }],
    },
  ],
});

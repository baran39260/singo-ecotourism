/**
 * Integration test — تأیید می‌کند ruleهای plugin هنگام اجرای ESLint با
 * `eslint.config.mjs` واقعی repo درست trigger می‌شوند.
 *
 * این تست از `pnpm lint` یک گام جلوتر است: ESLint API را برنامه‌ریزی صدا
 * می‌زند، یک کد در حافظه به آن می‌دهد، و بررسی می‌کند که rule مورد انتظار
 * فعال شده است. اگر فردا کسی plugin را در config اشتباه ثبت کند یا
 * severity را غیرعمد به off تغییر دهد، این تست fail می‌شود.
 *
 * مرجع: بازخورد مرور کارشناسی بخش ۲ (شکاف ۷).
 */

import { ESLint } from 'eslint';
import { describe, expect, it } from 'vitest';
import { inApp, inCore, inFeature, inOverrides, REPO } from './helpers.mjs';

const eslint = new ESLint({ cwd: REPO });

async function lintCode(code, filePath) {
  const results = await eslint.lintText(code, { filePath });
  return results[0];
}

describe('eslint.config.mjs integration', () => {
  describe('singo/no-core-internal-leak', () => {
    it('errors on core → overrides', async () => {
      const code = "import { x } from '@/overrides/foo';\nexport { x };\n";
      const r = await lintCode(code, inCore('test.ts'));
      const ours = r.messages.filter((m) => m.ruleId === 'singo/no-core-internal-leak');
      expect(ours).toHaveLength(1);
      expect(ours[0].severity).toBe(2); // error
      expect(ours[0].message).toMatch(/overrides/);
    });

    it('errors on core → features', async () => {
      const code = "import { x } from '@/features/auth';\nexport { x };\n";
      const r = await lintCode(code, inCore('test.ts'));
      const ours = r.messages.filter((m) => m.ruleId === 'singo/no-core-internal-leak');
      expect(ours).toHaveLength(1);
      expect(ours[0].severity).toBe(2);
      expect(ours[0].message).toMatch(/features/);
    });

    it('errors on core dynamic import to overrides', async () => {
      const code = "export const m = import('@/overrides/foo');\n";
      const r = await lintCode(code, inCore('test.ts'));
      const ours = r.messages.filter((m) => m.ruleId === 'singo/no-core-internal-leak');
      expect(ours).toHaveLength(1);
    });

    it('passes for core → core/lib/npm', async () => {
      const code = `
        import { logger } from '@/core/logger';
        import { db } from '@/lib/db';
        import pino from 'pino';
        export { logger, db, pino };
      `;
      const r = await lintCode(code, inCore('test.ts'));
      const ours = r.messages.filter((m) => m.ruleId === 'singo/no-core-internal-leak');
      expect(ours).toHaveLength(0);
    });
  });

  describe('singo/overrides-stable-api', () => {
    it('errors on overrides → deep core path', async () => {
      const code = "import { buf } from '@/core/logger/internal/buffer';\nexport { buf };\n";
      const r = await lintCode(code, inOverrides('Hero.tsx'));
      const ours = r.messages.filter((m) => m.ruleId === 'singo/overrides-stable-api');
      expect(ours).toHaveLength(1);
      expect(ours[0].severity).toBe(2); // error (ارتقا از warn — design.md decision 24)
    });

    it('passes for overrides → top-level core', async () => {
      const code = "import { logger } from '@/core/logger';\nexport { logger };\n";
      const r = await lintCode(code, inOverrides('Hero.tsx'));
      const ours = r.messages.filter((m) => m.ruleId === 'singo/overrides-stable-api');
      expect(ours).toHaveLength(0);
    });
  });

  describe('singo/no-feature-internal-import', () => {
    it('errors on app → feature internal', async () => {
      const code = "import { repo } from '@/features/auth/server/repository';\nexport { repo };\n";
      const r = await lintCode(code, inApp('login', 'page.tsx'));
      const ours = r.messages.filter((m) => m.ruleId === 'singo/no-feature-internal-import');
      expect(ours).toHaveLength(1);
      expect(ours[0].severity).toBe(2);
    });

    it('passes for app → feature index', async () => {
      const code = "import { auth } from '@/features/auth';\nexport { auth };\n";
      const r = await lintCode(code, inApp('login', 'page.tsx'));
      const ours = r.messages.filter((m) => m.ruleId === 'singo/no-feature-internal-import');
      expect(ours).toHaveLength(0);
    });

    it('passes for internal import within same feature', async () => {
      const code = "import { schema } from '@/features/auth/schemas/login';\nexport { schema };\n";
      const r = await lintCode(code, inFeature('auth', 'server', 'actions.ts'));
      const ours = r.messages.filter((m) => m.ruleId === 'singo/no-feature-internal-import');
      expect(ours).toHaveLength(0);
    });
  });

  // type-only imports هم block می‌شوند (طبق design.md decision 24).
  // این تست‌ها در integration test اجرا می‌شوند چون به TS parser نیاز دارند
  // (RuleTester پیش‌فرض JavaScript خالص parse می‌کند).
  describe('type-only imports (TS-only syntax)', () => {
    it('blocks type-only import: core → overrides', async () => {
      const code = "import type { Tweak } from '@/overrides/tweak';\nexport type { Tweak };\n";
      const r = await lintCode(code, inCore('test.ts'));
      const ours = r.messages.filter((m) => m.ruleId === 'singo/no-core-internal-leak');
      expect(ours.length).toBeGreaterThanOrEqual(1);
    });

    it('blocks type-only import: core → features', async () => {
      const code =
        "import type { AuthState } from '@/features/auth';\nexport type { AuthState };\n";
      const r = await lintCode(code, inCore('test.ts'));
      const ours = r.messages.filter((m) => m.ruleId === 'singo/no-core-internal-leak');
      expect(ours.length).toBeGreaterThanOrEqual(1);
    });

    it('blocks type-only deep import: overrides → core internal', async () => {
      const code =
        "import type { Buffer } from '@/core/logger/internal/buffer';\nexport type { Buffer };\n";
      const r = await lintCode(code, inOverrides('Hero.tsx'));
      const ours = r.messages.filter((m) => m.ruleId === 'singo/overrides-stable-api');
      expect(ours.length).toBeGreaterThanOrEqual(1);
    });

    it('blocks type-only feature internal import', async () => {
      const code =
        "import type { AuthState } from '@/features/auth/types';\nexport type { AuthState };\n";
      const r = await lintCode(code, inApp('login', 'page.tsx'));
      const ours = r.messages.filter((m) => m.ruleId === 'singo/no-feature-internal-import');
      expect(ours.length).toBeGreaterThanOrEqual(1);
    });
  });
});

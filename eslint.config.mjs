import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import singo from './tools/eslint-plugin-singo/index.mjs';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // قواعد سفارشی سینگو برای اعمال مرز معماری.
  // مرجع: openspec/project.md بخش ۹ + design.md decisions 1, 16, 22.
  {
    plugins: { singo },
    rules: {
      'singo/no-core-internal-leak': 'error',
      'singo/overrides-stable-api': 'warn',
      'singo/no-feature-internal-import': 'error',
    },
  },

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // ابزارهای داخلی — تست plugin خودش با RuleTester بررسی می‌شود
    'tools/eslint-plugin-singo/tests/**',
  ]),
]);

export default eslintConfig;

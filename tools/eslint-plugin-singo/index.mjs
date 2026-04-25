/**
 * eslint-plugin-singo
 *
 * Pluginـ سفارشی برای اجرای مرزهای معماری سینگو با ESLint.
 * مرجع: openspec/project.md بخش ۹، design.md decisions 1, 16, 22.
 *
 * این plugin به‌صورت محلی توسط `eslint.config.mjs` بارگذاری می‌شود
 * (publish-نشده). برای جزئیات هر rule، فایل rule را ببینید.
 */

import noCoreInternalLeak from './rules/no-core-internal-leak.mjs';
import overridesStableApi from './rules/overrides-stable-api.mjs';
import noFeatureInternalImport from './rules/no-feature-internal-import.mjs';

const plugin = {
  meta: {
    // canonical: نام بدون پیشوند `eslint-plugin-` (طبق ESLint convention)
    name: 'singo',
    version: '0.1.0',
  },
  rules: {
    'no-core-internal-leak': noCoreInternalLeak,
    'overrides-stable-api': overridesStableApi,
    'no-feature-internal-import': noFeatureInternalImport,
  },
};

export default plugin;

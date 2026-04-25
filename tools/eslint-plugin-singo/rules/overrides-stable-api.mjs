/**
 * `singo/overrides-stable-api`
 *
 * فایل‌های درون `src/overrides/` فقط می‌توانند از **سطح بالای** core
 * import کنند، نه از مسیرهای داخلی.
 *
 * - مجاز: `import { logger } from '@/core'` یا `'@/core/logger'`
 * - ممنوع: `import { _internal } from '@/core/logger/internal/buffer'`
 * - ممنوع: `import { x } from '@/core/logger/index'` (راه فرار آنتی‌پترن — صریحاً block)
 *
 * چرا: API سطح بالای core پایدار است (با semver محصول مدیریت می‌شود).
 * مسیرهای داخلی ممکن است بین نسخه‌ها refactor شوند. اگر مشتری Premium
 * از مسیر داخلی استفاده کند، نسخه‌گیری ما آپدیت او را می‌شکند.
 *
 * مرجع: openspec/project.md بخش ۹.۱ + design.md decision 1
 */

import path from 'node:path';

const SRC_OVERRIDES = path.join(path.sep, 'src', 'overrides') + path.sep;
// مجاز: '@/core'، '@/core/<topdir>'  (یک یا صفر سطح زیر core)
// ممنوع: '@/core/<topdir>/<deeper>'، '@/core/<topdir>/index' (هر چیز عمیق‌تر از یک سطح)
const ALIAS_CORE_DEEP = /^@\/core(?:\/[^/]+){2,}/;
const ALIAS_CORE = /^@\/core(\/|$)/;

function normalize(p) {
  return p.split('/').join(path.sep);
}

function isInsideOverrides(filename) {
  return normalize(filename).includes(SRC_OVERRIDES);
}

/** @type {import('eslint').Rule.RuleModule} */
const rule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'overrides/ فقط از سطح بالای core/ import کند، نه مسیر داخلی',
      recommended: true,
      url: 'https://github.com/baran39260/singo-ecotourism/blob/main/tools/eslint-plugin-singo/rules/overrides-stable-api.mjs',
    },
    schema: [],
    messages: {
      deepImport:
        'overrides فقط می‌تواند از سطح بالای core import کند: «{{source}}» یک مسیر داخلی است. به‌جای آن از @/core یا @/core/<topdir> استفاده کنید — API داخلی بین نسخه‌ها ناپایدار است.',
    },
  },
  create(context) {
    const filename = context.filename ?? context.getFilename();
    if (!isInsideOverrides(filename)) return {};

    const check = (node) => {
      const sourceValue = node.source?.value;
      if (typeof sourceValue !== 'string') return;
      // فقط alias paths را چک می‌کنیم؛ relative path از overrides به core
      // معمولاً عمیق است و اشتباه شایع نیست (overrides و core هم‌سطح‌اند).
      if (!ALIAS_CORE.test(sourceValue)) return;
      if (ALIAS_CORE_DEEP.test(sourceValue)) {
        context.report({ node, messageId: 'deepImport', data: { source: sourceValue } });
      }
    };

    return {
      ImportDeclaration: check,
      ImportExpression: check,
      ExportAllDeclaration: check,
      ExportNamedDeclaration: check,
    };
  },
};

export default rule;

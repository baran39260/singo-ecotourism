/**
 * `singo/overrides-stable-api`
 *
 * فایل‌های درون `src/overrides/` فقط می‌توانند از **سطح بالای** core
 * import کنند، نه از مسیرهای داخلی.
 *
 * - مجاز: `import { logger } from '@/core'` یا `'@/core/logger'`
 * - ممنوع: `import { _internal } from '@/core/logger/internal/buffer'`
 *
 * چرا: API سطح بالای core پایدار است (با semver محصول مدیریت می‌شود).
 * مسیرهای داخلی ممکن است بین نسخه‌ها refactor شوند. اگر مشتری Premium
 * از مسیر داخلی استفاده کند، نسخه‌گیری ما آپدیت او را می‌شکند.
 *
 * مرجع spec: openspec/changes/1-foundation/specs/site-foundation/spec.md
 */

import path from 'node:path';

const SRC_DIR = `${path.sep}src${path.sep}`;
const OVERRIDES_PREFIX = `${path.sep}overrides${path.sep}`;
// مجاز: '@/core'، '@/core/logger'، '@/core/clients'  (یک یا صفر سطح زیر core)
// ممنوع: '@/core/logger/something/deeper'
const ALIAS_CORE_DEEP = /^@\/core(?:\/[^/]+){2,}/;
const ALIAS_CORE = /^@\/core(\/|$)/;

function normalize(p) {
  return p.split('/').join(path.sep);
}

function isInsideOverrides(filename) {
  const norm = normalize(filename);
  return norm.includes(OVERRIDES_PREFIX) && norm.includes(SRC_DIR);
}

/** @type {import('eslint').Rule.RuleModule} */
const rule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'overrides/ فقط از سطح بالای core/ import کند، نه مسیر داخلی',
      recommended: true,
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
      const source = node.source?.value;
      if (typeof source !== 'string') return;

      // فقط alias paths را چک می‌کنیم؛ relative path از overrides به core
      // معمولاً عمیق است و اشتباه شایع نیست (overrides و core هم‌سطح‌اند).
      if (!ALIAS_CORE.test(source)) return;
      if (ALIAS_CORE_DEEP.test(source)) {
        context.report({ node, messageId: 'deepImport', data: { source } });
      }
    };

    return {
      ImportDeclaration: check,
      ExportAllDeclaration: check,
      ExportNamedDeclaration: check,
    };
  },
};

export default rule;

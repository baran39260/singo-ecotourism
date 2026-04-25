/**
 * `singo/no-core-internal-leak`
 *
 * فایل‌های درون `src/core/` نباید از:
 *   ۱. `src/overrides/`  ← مرز محصول/سفارشی‌سازی
 *   ۲. `src/features/`   ← مرز هسته/دامنه (core نباید به feature خاص متعهد باشد)
 * import کنند.
 *
 * چرا:
 *   - core کد قفل عمومی است که برای همه مشتری‌ها به‌روز می‌شود
 *   - وابستگی به overrides → آپدیت مشتری Premium می‌شکند
 *   - وابستگی به features → core متعهد به یک domain خاص می‌شود (آنتی‌پترن)
 *
 * مرجع: openspec/project.md بخش ۹.۱ + design.md decisions 1, 19
 */

import path from 'node:path';

const SRC_OVERRIDES = path.join(path.sep, 'src', 'overrides') + path.sep;
const SRC_FEATURES = path.join(path.sep, 'src', 'features') + path.sep;
const SRC_CORE = path.join(path.sep, 'src', 'core') + path.sep;

const ALIAS_OVERRIDES = /^@\/overrides(\/|$)/;
const ALIAS_FEATURES = /^@\/features(\/|$)/;

function normalize(p) {
  return p.split('/').join(path.sep);
}

function isInsideCore(filename) {
  return normalize(filename).includes(SRC_CORE);
}

/**
 * نوع leak را تشخیص می‌دهد یا null برمی‌گرداند.
 * @returns {'overrides' | 'features' | null}
 */
function detectLeak(source, importerFilename) {
  if (typeof source !== 'string') return null;

  // Alias paths
  if (ALIAS_OVERRIDES.test(source)) return 'overrides';
  if (ALIAS_FEATURES.test(source)) return 'features';

  // Relative paths — resolve و چک کن
  if (source.startsWith('.')) {
    const importerDir = path.dirname(importerFilename);
    const resolved = path.resolve(importerDir, source);
    if (resolved.includes(SRC_OVERRIDES)) return 'overrides';
    if (resolved.includes(SRC_FEATURES)) return 'features';
  }

  return null;
}

/** @type {import('eslint').Rule.RuleModule} */
const rule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'core نباید از overrides یا features import کند',
      recommended: true,
      url: 'https://github.com/baran39260/singo-ecotourism/blob/main/tools/eslint-plugin-singo/rules/no-core-internal-leak.mjs',
    },
    schema: [],
    messages: {
      overrides:
        'core نباید از overrides import کند: «{{source}}». core کد قفل عمومی است؛ اگر به overrides وابسته شود، آپدیت برای مشتری Premium می‌شکند.',
      features:
        'core نباید از features import کند: «{{source}}». core نباید به یک domain خاص متعهد باشد. به‌جای آن interface در core تعریف کنید و feature آن را پیاده‌سازی کند.',
    },
  },
  create(context) {
    const filename = context.filename ?? context.getFilename();
    if (!isInsideCore(filename)) return {};

    const check = (node) => {
      const sourceValue = node.source?.value;
      const leak = detectLeak(sourceValue, filename);
      if (!leak) return;
      context.report({
        node,
        messageId: leak,
        data: { source: sourceValue },
      });
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

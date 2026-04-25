/**
 * `singo/no-core-internal-leak`
 *
 * فایل‌های درون `src/core/` نباید از `src/overrides/` import کنند.
 *
 * چرا: `core/` کد قفل و عمومی است که برای همه مشتری‌ها به‌روز می‌شود.
 * `overrides/` کد سفارشی هر مشتری Premium است. اگر core به overrides
 * وابسته شود، آپدیت بعدی نسخه برای آن مشتری می‌شکند و انتزاع محصول
 * زیر سؤال می‌رود (project.md بخش ۲ + design.md decision 1).
 *
 * مرجع spec: openspec/changes/1-foundation/specs/site-foundation/spec.md
 */

import path from 'node:path';

const SRC_DIR = `${path.sep}src${path.sep}`;
const OVERRIDES_PREFIX = `${path.sep}overrides${path.sep}`;
const ALIAS_OVERRIDES = /^@\/overrides(\/|$)/;

function normalize(p) {
  return p.split('/').join(path.sep);
}

function isInsideCore(filename) {
  const norm = normalize(filename);
  const idx = norm.indexOf(SRC_DIR);
  if (idx === -1) return false;
  return norm.slice(idx).startsWith(`${SRC_DIR}core${path.sep}`);
}

function importsFromOverrides(source, importerFilename) {
  if (ALIAS_OVERRIDES.test(source)) return true;
  if (!source.startsWith('.')) return false;
  const importerDir = path.dirname(importerFilename);
  const resolved = path.resolve(importerDir, source);
  return resolved.includes(OVERRIDES_PREFIX);
}

/** @type {import('eslint').Rule.RuleModule} */
const rule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'فایل‌های درون core/ نباید از overrides/ import کنند',
      recommended: true,
    },
    schema: [],
    messages: {
      forbidden:
        'core نباید از overrides import کند: «{{source}}». core کد قفل عمومی است؛ اگر به overrides وابسته شود، آپدیت برای مشتری Premium می‌شکند.',
    },
  },
  create(context) {
    const filename = context.filename ?? context.getFilename();
    if (!isInsideCore(filename)) return {};

    const check = (node) => {
      const source = node.source?.value;
      if (typeof source !== 'string') return;
      if (importsFromOverrides(source, filename)) {
        context.report({ node, messageId: 'forbidden', data: { source } });
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

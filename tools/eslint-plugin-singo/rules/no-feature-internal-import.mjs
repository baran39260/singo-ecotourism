/**
 * `singo/no-feature-internal-import`
 *
 * import به یک feature **از خارج آن feature** فقط از طریق `index.ts` آن
 * مجاز است، نه از مسیرهای داخلی.
 *
 * - مجاز از خارج: `import { x } from '@/features/auth'`
 * - مجاز از خارج: `import { x } from '@/features/auth/index'`
 * - ممنوع از خارج: `import { x } from '@/features/auth/server/internal-helper'`
 * - مجاز در داخل همان feature: هر مسیر آزاد است
 *
 * چرا: مرز feature بسته نگه داشته می‌شود تا refactor داخلی بدون شکستن
 * کد بقیه ممکن شود. این قاعده ستون فقرات Feature-Sliced organization است
 * (project.md بخش ۹.۱ + design.md decision 16).
 */

import path from 'node:path';

const SRC_DIR = `${path.sep}src${path.sep}`;
// matches @/features/<X>/<deeper>...   (که <deeper> چیزی غیر از 'index' است)
const ALIAS_FEATURE_INTERNAL = /^@\/features\/([^/]+)\/(?!index(?:\.[a-z]+)?$)(.+)/;
// matches @/features/<X>  یا  @/features/<X>/index
const ALIAS_FEATURE_PUBLIC = /^@\/features\/([^/]+)(?:\/index(?:\.[a-z]+)?)?$/;

function normalize(p) {
  return p.split('/').join(path.sep);
}

/** اگر فایل داخل یک feature است، نام feature را برمی‌گرداند، وگرنه null. */
function featureOfFile(filename) {
  const norm = normalize(filename);
  const idx = norm.indexOf(`${SRC_DIR}features${path.sep}`);
  if (idx === -1) return null;
  const after = norm.slice(idx + SRC_DIR.length + 'features'.length + 1);
  const featureName = after.split(path.sep)[0];
  return featureName || null;
}

/** اگر import به یک feature است، نام feature هدف و عمق را برمی‌گرداند. */
function parseFeatureImport(source) {
  const internalMatch = ALIAS_FEATURE_INTERNAL.exec(source);
  if (internalMatch) return { feature: internalMatch[1], internal: true };
  const publicMatch = ALIAS_FEATURE_PUBLIC.exec(source);
  if (publicMatch) return { feature: publicMatch[1], internal: false };
  return null;
}

/** @type {import('eslint').Rule.RuleModule} */
const rule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'به feature فقط از طریق index.ts آن import کنید، نه مسیر داخلی',
      recommended: true,
    },
    schema: [],
    messages: {
      deepImport:
        'import داخلی به feature «{{targetFeature}}» مجاز نیست: «{{source}}». از @/features/{{targetFeature}} (index) import کنید — این مرز Feature-Sliced را حفظ می‌کند.',
    },
  },
  create(context) {
    const filename = context.filename ?? context.getFilename();
    const ownFeature = featureOfFile(filename);

    const check = (node) => {
      const source = node.source?.value;
      if (typeof source !== 'string') return;
      const target = parseFeatureImport(source);
      if (!target || !target.internal) return;
      // import داخل همان feature آزاد است
      if (ownFeature && ownFeature === target.feature) return;
      context.report({
        node,
        messageId: 'deepImport',
        data: { source, targetFeature: target.feature },
      });
    };

    return {
      ImportDeclaration: check,
      ExportAllDeclaration: check,
      ExportNamedDeclaration: check,
    };
  },
};

export default rule;

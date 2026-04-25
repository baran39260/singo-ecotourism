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

const SRC_FEATURES = path.join(path.sep, 'src', 'features') + path.sep;
// matches @/features/<X>/<deeper>...   (که <deeper> چیزی غیر از 'index' است)
const ALIAS_FEATURE_INTERNAL = /^@\/features\/([^/]+)\/(?!index(?:\.[a-z]+)?$)(.+)/;
// matches @/features/<X>  یا  @/features/<X>/index
const ALIAS_FEATURE_PUBLIC = /^@\/features\/([^/]+)(?:\/index(?:\.[a-z]+)?)?$/;

function normalize(p) {
  return p.split('/').join(path.sep);
}

/**
 * اگر فایل داخل یک feature است، نام feature را برمی‌گرداند، وگرنه null.
 *
 * Edge case: اگر پس از `src/features/`، اولین segment یک فایل (مثلاً `index.ts`)
 * باشد نه یک پوشه، فایل خارج از یک feature خاص است (مثل barrel root).
 */
function featureOfFile(filename) {
  const norm = normalize(filename);
  const idx = norm.indexOf(SRC_FEATURES);
  if (idx === -1) return null;
  const after = norm.slice(idx + SRC_FEATURES.length);
  const segments = after.split(path.sep);
  if (segments.length < 2) return null; // فایل مستقیم در features/ root است
  const featureName = segments[0];
  if (!featureName || featureName.includes('.')) return null; // index.ts و غیره
  return featureName;
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
      url: 'https://github.com/baran39260/singo-ecotourism/blob/main/tools/eslint-plugin-singo/rules/no-feature-internal-import.mjs',
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
      const sourceValue = node.source?.value;
      if (typeof sourceValue !== 'string') return;
      const target = parseFeatureImport(sourceValue);
      if (!target || !target.internal) return;
      // import داخل همان feature آزاد است
      if (ownFeature && ownFeature === target.feature) return;
      context.report({
        node,
        messageId: 'deepImport',
        data: { source: sourceValue, targetFeature: target.feature },
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

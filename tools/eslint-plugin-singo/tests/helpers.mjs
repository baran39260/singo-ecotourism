/**
 * Helperهای مشترک تست‌های plugin.
 *
 * استفاده از `import.meta.url` به‌جای `process.cwd()` تا تست‌ها مستقل
 * از دایرکتوری اجرا کار کنند (بازخورد مرور کارشناسی بخش ۲).
 */
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// tools/eslint-plugin-singo/tests/ → repo root
export const REPO = path.resolve(__dirname, '..', '..', '..');

export const inSrc = (...segs) => path.join(REPO, 'src', ...segs);
export const inCore = (...segs) => inSrc('core', ...segs);
export const inOverrides = (...segs) => inSrc('overrides', ...segs);
export const inFeature = (name, ...segs) => inSrc('features', name, ...segs);
export const inApp = (...segs) => inSrc('app', ...segs);

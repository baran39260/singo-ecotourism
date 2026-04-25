import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // مسیرهای جستجوی تست — هم src/ و هم tools/
    include: ['src/**/*.test.{ts,tsx,mjs,js}', 'tools/**/*.test.{ts,tsx,mjs,js}'],
    // محیط پیش‌فرض node؛ تست‌های React در پروپوزال ۲ به jsdom سوییچ می‌کنند
    environment: 'node',
    globals: false,
    // در فاز ۱ هنوز coverage threshold نداریم؛ در task 15.2 (پروپوزال ۱) فعال می‌شود
  },
});

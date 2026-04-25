# `src/fonts/` — فونت‌های محلی

فایل‌های فونت محلی که با `next/font/local` در [`app/layout.tsx`](../app/layout.tsx) لود می‌شوند.

## فعلی

- `Vazirmatn-Variable.woff2` — فونت متغیر Vazirmatn (تمام وزن‌های ۱۰۰-۹۰۰)
  - منبع: پکیج npm [`vazirmatn`](https://www.npmjs.com/package/vazirmatn) v33.0.3
  - فایل اصلی: `node_modules/vazirmatn/fonts/webfonts/Vazirmatn[wght].woff2`
  - **چرا local نه `next/font/google`؟** ⤷ از داخل ایران بدون VPN، تماس به `fonts.google.com` در زمان build ممکن است fail شود. local تضمین می‌کند build مستقل از CDN خارجی است.

## افزودن فونت جدید (مثلاً برای پلن Premium که فونت اختصاصی می‌خواهد)

۱. فایل `.woff2` را در این پوشه بگذارید
۲. در `app/layout.tsx`:

```ts
const customFont = localFont({
  src: '../fonts/Custom-Variable.woff2',
  variable: '--font-custom',
});
```

۳. در `globals.css` `@theme inline { --font-custom: var(--font-custom); }`

⚠️ هرگز فایل ttf را اینجا نگذارید — فقط woff2 (سبک‌تر، modern browsers).

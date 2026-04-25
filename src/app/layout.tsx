import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

// فونت فارسی پیش‌فرض. فایل از پکیج `vazirmatn` کپی شده و در repo کامیت می‌شود
// تا build بدون نیاز به دانلود از Google Fonts (که ممکن است از داخل ایران بلاک باشد) کار کند.
const vazirmatn = localFont({
  src: '../fonts/Vazirmatn-Variable.woff2',
  variable: '--font-vazirmatn',
  display: 'swap',
  weight: '100 900', // variable font: کل بازه وزن
});

export const metadata: Metadata = {
  // مقادیر placeholder. در task 9 (SEO پایه) از site.config.ts خوانده می‌شود.
  title: 'سینگو',
  description: 'تمپلیت وب‌سایت اقامتگاه و بومگرد',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}

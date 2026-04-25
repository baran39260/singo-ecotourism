import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // در Next.js 16، فلگ `cacheComponents` جایگزین `experimental.ppr` شده و
  // PPR، useCache و dynamicIO را به‌صورت یکپارچه فعال می‌کند.
  //
  // ⚠️ نکته paradigm shift: با cacheComponents، کامپوننت‌ها به‌طور پیش‌فرض
  // dynamic هستند و برای static باید `'use cache'` directive بگذاریم.
  // این برعکس PPR در Next.js 15 است. جزئیات: openspec design.md decision 23.
  //
  // مرجع: node_modules/.../next/dist/docs/.../cacheComponents.md
  cacheComponents: true,

  // reactStrictMode حذف شد: در Next.js 16 App Router به‌طور پیش‌فرض فعال است.
};

export default nextConfig;

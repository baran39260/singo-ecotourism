// صفحه placeholder موقت برای تأیید scaffolding.
// در taskهای بعدی فاز ۱ (بخش ۱۱) با Hero کامل + i18n + داده از site.config.ts بازنویسی می‌شود.
export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-6 p-8 text-center">
      <h1 className="text-4xl font-bold tracking-tight">سینگو</h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-400">
        تمپلیت وب‌سایت اقامتگاه و بومگرد — در حال توسعه
      </p>
      <p className="text-sm text-zinc-500">
        پروپوزال{' '}
        <code className="rounded bg-zinc-100 px-2 py-0.5 dark:bg-zinc-800">1-foundation</code> — تسک
        ۱: Scaffolding تکمیل شد
      </p>
    </main>
  );
}

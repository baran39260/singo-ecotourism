// مرجع: https://commitlint.js.org/
// قراردادها بر پایه Conventional Commits + کامیت‌های Singo که با شناسه پروپوزال شروع می‌شوند.
// مثال: feat(auth): add otp send action for [1-foundation] task 7.6
const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [0],
    'header-max-length': [2, 'always', 120],
  },
};

export default config;

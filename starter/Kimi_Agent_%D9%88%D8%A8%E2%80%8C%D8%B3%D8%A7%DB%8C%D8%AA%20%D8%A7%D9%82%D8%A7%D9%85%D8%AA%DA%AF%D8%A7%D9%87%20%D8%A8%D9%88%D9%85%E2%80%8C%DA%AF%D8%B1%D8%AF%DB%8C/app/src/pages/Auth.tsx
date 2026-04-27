import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, RefreshCw } from 'lucide-react'

export default function Auth() {
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (phone.length < 10) {
      setError('لطفاً شماره موبایل معتبر وارد کنید')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep('otp')
    }, 1500)
  }

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (otp.some((d) => !d)) {
      setError('لطفاً کد ۶ رقمی را کامل وارد کنید')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      alert('ورود با موفقیت انجام شد!')
    }, 1500)
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus()
    }
  }

  return (
    <div
      className="min-h-[100dvh] flex items-center justify-center px-4"
      style={{
        background: 'linear-gradient(135deg, var(--warm-cream) 0%, var(--light-sand) 100%)',
        paddingTop: 80,
      }}
    >
      <div
        className="w-full max-w-[420px]"
        style={{
          background: '#fff',
          borderRadius: 24,
          padding: 'clamp(32px, 5vw, 48px)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
        }}
      >
        {/* Back link */}
        <Link
          to="/"
          className="flex items-center gap-1 text-sm mb-8 transition-colors hover:text-[var(--deep-sand)]"
          style={{ color: 'var(--warm-gray)' }}
        >
          <ChevronLeft size={16} /> بازگشت
        </Link>

        {/* Logo */}
        <div className="text-center mb-8">
          <h1
            className="font-bold text-2xl mb-2"
            style={{ color: 'var(--charcoal)' }}
          >
            دلگشا
          </h1>
          <p className="text-sm" style={{ color: 'var(--warm-gray)' }}>
            {step === 'phone' ? 'ورود با شماره موبایل' : 'کد تأیید را وارد کنید'}
          </p>
        </div>

        {step === 'phone' ? (
          <form onSubmit={handlePhoneSubmit} className="space-y-6">
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: 'var(--charcoal)' }}
              >
                شماره موبایل
              </label>
              <div className="flex items-center gap-2">
                <span
                  className="flex-shrink-0 text-sm font-medium px-3 py-3 rounded-xl"
                  style={{ background: 'var(--light-sand)', color: 'var(--charcoal)' }}
                >
                  +۹۸
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="۹۱۲۳۴۵۶۷۸۹"
                  maxLength={10}
                  className="flex-1 text-base outline-none"
                  style={{
                    border: '1px solid var(--light-sand)',
                    borderRadius: 12,
                    padding: '12px 16px',
                    color: 'var(--charcoal)',
                    background: 'var(--warm-cream)',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--deep-sand)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--light-sand)')}
                />
              </div>
              {error && (
                <p className="text-xs mt-2" style={{ color: 'var(--terracotta)' }}>
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full text-sm font-semibold py-4 rounded-full transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
              style={{ background: 'var(--deep-sand)', color: '#fff' }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <RefreshCw size={16} className="animate-spin" /> در حال ارسال...
                </span>
              ) : (
                'دریافت کد تأیید'
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: 'var(--charcoal)' }}
              >
                کد ۶ رقمی
              </label>
              <div className="flex gap-2 justify-center" dir="ltr">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    maxLength={1}
                    className="w-12 h-14 text-center text-lg font-semibold outline-none"
                    style={{
                      border: '1px solid var(--light-sand)',
                      borderRadius: 12,
                      color: 'var(--charcoal)',
                      background: 'var(--warm-cream)',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--deep-sand)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--light-sand)')}
                  />
                ))}
              </div>
              {error && (
                <p className="text-xs mt-2 text-center" style={{ color: 'var(--terracotta)' }}>
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full text-sm font-semibold py-4 rounded-full transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
              style={{ background: 'var(--deep-sand)', color: '#fff' }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <RefreshCw size={16} className="animate-spin" /> در حال بررسی...
                </span>
              ) : (
                'ورود'
              )}
            </button>

            <button
              type="button"
              onClick={() => { setStep('phone'); setOtp(['', '', '', '', '', '']) }}
              className="w-full text-sm py-2 transition-colors hover:text-[var(--deep-sand)]"
              style={{ color: 'var(--warm-gray)' }}
            >
              تغییر شماره موبایل
            </button>
          </form>
        )}

        <p className="text-xs text-center mt-8" style={{ color: 'var(--warm-gray)' }}>
          با ورود،{' '}
          <a href="#" className="underline hover:text-[var(--deep-sand)] transition-colors">
            شرایط استفاده
          </a>{' '}
          را می‌پذیرم
        </p>
      </div>
    </div>
  )
}

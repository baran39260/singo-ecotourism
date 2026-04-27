import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, Mail, MapPin, Clock, Instagram, Send, MessageCircle } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-animate', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: pageRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    })
    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div ref={pageRef} style={{ background: 'var(--warm-cream)', minHeight: '100vh', paddingTop: 120 }}>
      <div className="mx-auto px-6 pb-20" style={{ maxWidth: 1280 }}>
        {/* Header */}
        <div className="text-center mb-16 contact-animate">
          <h1
            className="font-bold mb-4"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              lineHeight: 1.15,
              color: 'var(--charcoal)',
            }}
          >
            تماس با ما
          </h1>
          <p className="text-base" style={{ color: 'var(--warm-gray)', maxWidth: 500, margin: '0 auto', lineHeight: 1.75 }}>
            ما همیشه اینجاییم تا به سوالات شما پاسخ دهیم
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Contact Info */}
          <div>
            <div className="space-y-8 mb-12">
              <div className="contact-animate flex items-start gap-4">
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    background: 'var(--light-sand)',
                  }}
                >
                  <Phone size={24} style={{ color: 'var(--deep-sand)' }} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: 'var(--charcoal)' }}>تلفن</h3>
                  <p className="text-sm" style={{ color: 'var(--warm-gray)' }}>۰۳۱-۵۵۴۴۳۲۱۱</p>
                  <p className="text-sm" style={{ color: 'var(--warm-gray)' }}>۰۹۱۳-۱۲۳۴۵۶۷</p>
                </div>
              </div>

              <div className="contact-animate flex items-start gap-4">
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    background: 'var(--light-sand)',
                  }}
                >
                  <Mail size={24} style={{ color: 'var(--deep-sand)' }} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: 'var(--charcoal)' }}>ایمیل</h3>
                  <p className="text-sm" style={{ color: 'var(--warm-gray)' }}>hello@delgasha.ir</p>
                  <p className="text-sm" style={{ color: 'var(--warm-gray)' }}>booking@delgasha.ir</p>
                </div>
              </div>

              <div className="contact-animate flex items-start gap-4">
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    background: 'var(--light-sand)',
                  }}
                >
                  <MapPin size={24} style={{ color: 'var(--deep-sand)' }} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: 'var(--charcoal)' }}>آدرس</h3>
                  <p className="text-sm" style={{ color: 'var(--warm-gray)' }}>
                    کاشان، روستاهای اطراف، خیابان باغ‌های پسته، اقامتگاه دلگشا
                  </p>
                </div>
              </div>

              <div className="contact-animate flex items-start gap-4">
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    background: 'var(--light-sand)',
                  }}
                >
                  <Clock size={24} style={{ color: 'var(--deep-sand)' }} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: 'var(--charcoal)' }}>ساعت کاری</h3>
                  <p className="text-sm" style={{ color: 'var(--warm-gray)' }}>پذیرش: ۲۴ ساعته</p>
                  <p className="text-sm" style={{ color: 'var(--warm-gray)' }}>خدمات: هر روز ۸ صبح تا ۱۰ شب</p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="contact-animate pt-8" style={{ borderTop: '1px solid var(--light-sand)' }}>
              <h3 className="font-semibold mb-4" style={{ color: 'var(--charcoal)' }}>شبکه‌های اجتماعی</h3>
              <div className="flex items-center gap-4">
                <a
                  href="#"
                  className="flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: 'var(--light-sand)',
                    color: 'var(--muted-olive)',
                  }}
                >
                  <Instagram size={22} />
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: 'var(--light-sand)',
                    color: 'var(--muted-olive)',
                  }}
                >
                  <Send size={22} />
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: 'var(--light-sand)',
                    color: 'var(--muted-olive)',
                  }}
                >
                  <MessageCircle size={22} />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div
            className="contact-animate"
            style={{
              background: '#fff',
              borderRadius: 24,
              padding: 'clamp(32px, 5vw, 48px)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            }}
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="font-semibold mb-6" style={{ color: 'var(--charcoal)', fontSize: '1.3rem' }}>
                  فرم تماس
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--charcoal)' }}>
                      نام
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full text-base outline-none"
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
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--charcoal)' }}>
                      نام خانوادگی
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full text-base outline-none"
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
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--charcoal)' }}>
                    ایمیل
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full text-base outline-none"
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

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--charcoal)' }}>
                    موضوع
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full text-base outline-none"
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

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--charcoal)' }}>
                    پیام
                  </label>
                  <textarea
                    rows={4}
                    required
                    className="w-full text-base outline-none resize-none"
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

                <button
                  type="submit"
                  className="w-full text-sm font-semibold py-4 rounded-full transition-all duration-300 hover:scale-[1.02]"
                  style={{ background: 'var(--deep-sand)', color: '#fff' }}
                >
                  ارسال پیام
                </button>
              </form>
            ) : (
              <div className="text-center py-12">
                <div
                  className="flex items-center justify-center mx-auto mb-6"
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    background: 'var(--light-sand)',
                  }}
                >
                  <Send size={32} style={{ color: 'var(--deep-sand)' }} />
                </div>
                <h2 className="font-semibold text-xl mb-3" style={{ color: 'var(--charcoal)' }}>
                  پیام شما ارسال شد
                </h2>
                <p className="text-sm" style={{ color: 'var(--warm-gray)' }}>
                  با تشکر از تماس شما. تیم ما در اسرع وقت پاسخگو خواهد بود.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

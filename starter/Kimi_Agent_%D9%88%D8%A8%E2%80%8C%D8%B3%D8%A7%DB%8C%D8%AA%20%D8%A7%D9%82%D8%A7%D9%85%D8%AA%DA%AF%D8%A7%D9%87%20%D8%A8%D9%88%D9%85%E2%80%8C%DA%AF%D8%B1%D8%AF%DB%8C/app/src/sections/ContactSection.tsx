import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, Mail, MapPin } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function ContactSection() {
  const [isOpen, setIsOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = sectionRef.current?.querySelectorAll('.animate-in')
      if (els && els.length > 0) {
        gsap.from(els, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      }
    })
    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--warm-cream)',
        padding: 'clamp(80px, 10vh, 140px) clamp(20px, 5vw, 80px)',
      }}
    >
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center" style={{ maxWidth: 1280 }}>
        {/* Left: Folding Form */}
        <div className="animate-in flex justify-center">
          <div
            style={{
              width: '100%',
              maxWidth: 400,
              height: 520,
              perspective: 1200,
            }}
          >
            <div
              className="relative w-full h-full"
              style={{
                transformStyle: 'preserve-3d',
                transform: isOpen ? 'rotateY(-3deg)' : 'rotateY(0deg)',
                transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
              }}
            >
              {/* Left flap */}
              <div
                className="absolute top-0 overflow-hidden"
                style={{
                  right: 0,
                  width: '50%',
                  height: '100%',
                  background: '#fff',
                  border: '1px solid var(--light-sand)',
                  borderRadius: '0 8px 8px 0',
                  transformOrigin: 'right center',
                  transform: isOpen ? 'rotateY(0deg)' : 'rotateY(50deg)',
                  transition: 'all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  opacity: isOpen ? 0 : 1,
                  transitionDelay: isOpen ? '0.3s' : '0s',
                  zIndex: 10,
                }}
              />

              {/* Right flap */}
              <div
                className="absolute top-0 overflow-hidden"
                style={{
                  left: 0,
                  width: '50%',
                  height: '100%',
                  background: '#fff',
                  border: '1px solid var(--light-sand)',
                  borderRadius: '8px 0 0 8px',
                  transformOrigin: 'left center',
                  transform: isOpen ? 'rotateY(0deg)' : 'rotateY(-50deg)',
                  transition: 'all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) 0.15s',
                  opacity: isOpen ? 0 : 1,
                  transitionDelay: isOpen ? '0.45s' : '0.15s',
                  zIndex: 10,
                }}
              />

              {/* Center panel */}
              <div
                className="absolute top-0 flex flex-col justify-end"
                style={{
                  right: '12.5%',
                  width: '75%',
                  height: '100%',
                  background: '#fff',
                  borderRadius: 8,
                  padding: 20,
                  zIndex: 5,
                  boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                }}
              >
                {!isOpen ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    {/* Decorative SVG */}
                    <svg
                      width="120"
                      height="120"
                      viewBox="0 0 120 120"
                      fill="none"
                      className="mb-6"
                    >
                      <rect x="20" y="30" width="80" height="60" rx="4" stroke="var(--deep-sand)" strokeWidth="1.5" strokeDasharray="4 2" />
                      <path d="M35 90 L45 60 L55 75 L65 50 L75 70 L85 55" stroke="var(--terracotta)" strokeWidth="1.5" strokeLinecap="round" />
                      <circle cx="45" cy="45" r="8" stroke="var(--muted-olive)" strokeWidth="1" />
                      <path d="M60 25 Q70 15 80 25" stroke="var(--deep-sand)" strokeWidth="1" fill="none" />
                    </svg>
                    <p
                      className="text-sm mb-6"
                      style={{ color: 'var(--warm-gray)', lineHeight: 1.75 }}
                    >
                      سوالی دارید؟ پیامی بفرستید
                    </p>
                    <button
                      onClick={() => setIsOpen(true)}
                      className="text-sm font-medium transition-all duration-300 hover:scale-105"
                      style={{
                        background: 'var(--deep-sand)',
                        color: '#fff',
                        borderRadius: 50,
                        padding: '12px 32px',
                      }}
                    >
                      تماس با ما
                    </button>
                  </div>
                ) : (
                  <div
                    style={{
                      opacity: isOpen ? 1 : 0,
                      transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
                      transition: 'opacity 0.4s ease 0.5s, transform 0.4s ease 0.5s',
                    }}
                  >
                    {!submitted ? (
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                          <input
                            type="text"
                            placeholder="نام"
                            required
                            className="w-full bg-transparent text-base outline-none"
                            style={{
                              borderBottom: '1px solid var(--light-sand)',
                              padding: '12px 0',
                              color: 'var(--charcoal)',
                            }}
                            onFocus={(e) => (e.target.style.borderColor = 'var(--deep-sand)')}
                            onBlur={(e) => (e.target.style.borderColor = 'var(--light-sand)')}
                          />
                        </div>
                        <div>
                          <input
                            type="email"
                            placeholder="ایمیل"
                            required
                            className="w-full bg-transparent text-base outline-none"
                            style={{
                              borderBottom: '1px solid var(--light-sand)',
                              padding: '12px 0',
                              color: 'var(--charcoal)',
                            }}
                            onFocus={(e) => (e.target.style.borderColor = 'var(--deep-sand)')}
                            onBlur={(e) => (e.target.style.borderColor = 'var(--light-sand)')}
                          />
                        </div>
                        <div>
                          <textarea
                            placeholder="پیام"
                            rows={3}
                            required
                            className="w-full bg-transparent text-base outline-none resize-none"
                            style={{
                              borderBottom: '1px solid var(--light-sand)',
                              padding: '12px 0',
                              color: 'var(--charcoal)',
                            }}
                            onFocus={(e) => (e.target.style.borderColor = 'var(--deep-sand)')}
                            onBlur={(e) => (e.target.style.borderColor = 'var(--light-sand)')}
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full text-sm font-semibold transition-all duration-300 hover:opacity-90"
                          style={{
                            background: 'var(--deep-sand)',
                            color: '#fff',
                            borderRadius: 50,
                            padding: '14px 40px',
                          }}
                        >
                          ارسال پیام
                        </button>
                      </form>
                    ) : (
                      <div className="text-center py-8">
                        <p
                          className="text-lg font-semibold mb-2"
                          style={{ color: 'var(--muted-olive)' }}
                        >
                          ارسال شد ✓
                        </p>
                        <p className="text-sm" style={{ color: 'var(--warm-gray)' }}>
                          با تشکر از پیام شما
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Contact Info */}
        <div className="animate-in">
          <h2
            className="font-semibold mb-10"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              lineHeight: 1.2,
              color: 'var(--charcoal)',
            }}
          >
            با ما در تماس باشید
          </h2>

          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div
                className="flex items-center justify-center"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: 'var(--light-sand)',
                }}
              >
                <Phone size={22} style={{ color: 'var(--muted-olive)' }} />
              </div>
              <div>
                <p className="text-xs mb-1" style={{ color: 'var(--warm-gray)' }}>تلفن</p>
                <p className="text-sm font-medium" style={{ color: 'var(--charcoal)' }}>۰۳۱-۵۵۴۴۳۲۱۱</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div
                className="flex items-center justify-center"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: 'var(--light-sand)',
                }}
              >
                <Mail size={22} style={{ color: 'var(--muted-olive)' }} />
              </div>
              <div>
                <p className="text-xs mb-1" style={{ color: 'var(--warm-gray)' }}>ایمیل</p>
                <p className="text-sm font-medium" style={{ color: 'var(--charcoal)' }}>hello@delgasha.ir</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div
                className="flex items-center justify-center"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: 'var(--light-sand)',
                }}
              >
                <MapPin size={22} style={{ color: 'var(--muted-olive)' }} />
              </div>
              <div>
                <p className="text-xs mb-1" style={{ color: 'var(--warm-gray)' }}>آدرس</p>
                <p className="text-sm font-medium" style={{ color: 'var(--charcoal)' }}>
                  کاشان، روستاهای اطراف، خیابان باغ‌های پسته
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8" style={{ borderTop: '1px solid var(--light-sand)' }}>
            <p className="text-sm" style={{ color: 'var(--warm-gray)' }}>
              <a href="#" className="transition-colors duration-300 hover:text-[var(--deep-sand)]">اینستاگرام</a>
              {' — '}
              <a href="#" className="transition-colors duration-300 hover:text-[var(--deep-sand)]">واتساپ</a>
              {' — '}
              <a href="#" className="transition-colors duration-300 hover:text-[var(--deep-sand)]">تلگرام</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

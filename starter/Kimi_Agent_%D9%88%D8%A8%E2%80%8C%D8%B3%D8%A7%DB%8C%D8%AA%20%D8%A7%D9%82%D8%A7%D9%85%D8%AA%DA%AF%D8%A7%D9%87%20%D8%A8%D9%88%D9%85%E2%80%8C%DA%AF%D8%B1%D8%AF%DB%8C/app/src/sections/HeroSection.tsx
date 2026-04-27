import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Calendar, Users, Search } from 'lucide-react'
import gsap from 'gsap'

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pillRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()
    tl.to(pillRef.current, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 })
      .to(headingRef.current, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.4')
      .to(subtitleRef.current, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .to(labelRef.current, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.6')
      .to(scrollIndicatorRef.current, { opacity: 1, duration: 0.6 }, '-=0.3')
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (scrollIndicatorRef.current) {
        scrollIndicatorRef.current.style.opacity = window.scrollY > 50 ? '0' : '1'
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100dvh' }}
    >
      {/* Background image with Ken Burns */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-courtyard.jpg"
          alt="حیاط اقامتگاه دلگشا"
          className="w-full h-full object-cover"
          style={{ animation: 'kenBurns 20s ease-in-out infinite alternate' }}
        />
        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(30,30,28,0.6) 0%, rgba(30,30,28,0.2) 40%, transparent 70%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-end h-full pb-[15vh]">
        {/* Label */}
        <div
          ref={labelRef}
          className="opacity-0 translate-y-4 mb-4 text-center"
          style={{
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.08em',
            color: 'rgba(255,255,255,0.7)',
          }}
        >
          اقامتگاه بوم‌گردی دلگشا — کاشان
        </div>

        {/* Search Pill */}
        <div
          ref={pillRef}
          className="opacity-0 translate-y-8 flex items-center gap-1 w-full max-w-[800px] mx-4 mb-8"
          style={{
            height: 72,
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(8px)',
            borderRadius: 50,
            padding: '8px 8px 8px 24px',
            boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
          }}
        >
          <div className="hidden sm:flex items-center gap-2 flex-1 min-w-0">
            <MapPin size={20} style={{ color: 'var(--warm-gray)', flexShrink: 0 }} />
            <span className="text-sm truncate" style={{ color: 'var(--warm-gray)' }}>
              مقصد
            </span>
          </div>
          <div className="hidden sm:block w-px h-8" style={{ background: 'var(--light-sand)' }} />
          <div className="hidden md:flex items-center gap-2 flex-1 min-w-0">
            <Calendar size={20} style={{ color: 'var(--warm-gray)', flexShrink: 0 }} />
            <span className="text-sm truncate" style={{ color: 'var(--warm-gray)' }}>
              تاریخ ورود
            </span>
          </div>
          <div className="hidden md:block w-px h-8" style={{ background: 'var(--light-sand)' }} />
          <div className="hidden md:flex items-center gap-2 flex-1 min-w-0">
            <Calendar size={20} style={{ color: 'var(--warm-gray)', flexShrink: 0 }} />
            <span className="text-sm truncate" style={{ color: 'var(--warm-gray)' }}>
              تاریخ خروج
            </span>
          </div>
          <div className="hidden lg:block w-px h-8" style={{ background: 'var(--light-sand)' }} />
          <div className="hidden lg:flex items-center gap-2 flex-1 min-w-0">
            <Users size={20} style={{ color: 'var(--warm-gray)', flexShrink: 0 }} />
            <span className="text-sm truncate" style={{ color: 'var(--warm-gray)' }}>
              مهمان‌ها
            </span>
          </div>
          <Link
            to="/rooms"
            className="flex items-center justify-center transition-all duration-300 hover:scale-105 flex-shrink-0"
            style={{
              width: 56,
              height: 56,
              background: 'var(--deep-sand)',
              borderRadius: '50%',
            }}
          >
            <Search size={22} color="#fff" />
          </Link>
        </div>

        {/* Heading */}
        <h1
          ref={headingRef}
          className="opacity-0 translate-y-10 text-center font-bold px-4"
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 7rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#fff',
            textShadow: '0 2px 20px rgba(0,0,0,0.3)',
          }}
        >
          خانه‌ای در دل طبیعت
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="opacity-0 translate-y-8 mt-4 text-center px-4"
          style={{
            fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)',
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.85)',
          }}
        >
          سنتی‌ترین تجربه اقامت، مدرن‌ترین امکانات
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-0 transition-opacity duration-500"
      >
        <div
          className="w-px bg-white/50 relative overflow-hidden"
          style={{ height: 40 }}
        >
          <div
            className="w-full bg-white"
            style={{
              height: 8,
              borderRadius: '50%',
              position: 'absolute',
              top: 0,
              animation: 'scrollDot 1.5s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes kenBurns {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        @keyframes scrollDot {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(40px); opacity: 0; }
        }
      `}</style>
    </section>
  )
}

import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function PhilosophyStatement() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = sectionRef.current?.querySelectorAll('.animate-in')
      if (els && els.length > 0) {
        gsap.from(els, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--light-sand)',
        padding: 'clamp(80px, 10vh, 140px) clamp(20px, 5vw, 80px)',
      }}
    >
      <div className="mx-auto text-center" style={{ maxWidth: 640 }}>
        <h2
          className="animate-in font-semibold mb-8"
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            lineHeight: 1.2,
            color: 'var(--charcoal)',
          }}
        >
          طراحی‌شده برای{' '}
          <span style={{ color: 'var(--deep-sand)' }}>شما</span>
        </h2>
        <p
          className="animate-in mb-10"
          style={{
            fontSize: 18,
            lineHeight: 1.75,
            color: 'var(--warm-gray)',
          }}
        >
          در دلگشا، هر جزئیات با دقت انتخاب شده — از سنگ‌های دست‌کنده دیوارها تا پارچه‌های دستباف روی تخت. ما معتقدیم اقامت باید بیش از یک شب خواب خوب باشد. باید داستانی برای بردن با خود داشته باشد.
        </p>
        <Link
          to="/about"
          className="animate-in inline-block text-sm font-medium transition-all duration-300 hover:bg-[var(--charcoal)] hover:text-[var(--warm-cream)]"
          style={{
            border: '1px solid var(--charcoal)',
            background: 'transparent',
            color: 'var(--charcoal)',
            borderRadius: 50,
            padding: '12px 28px',
          }}
        >
          درباره دلگشا
        </Link>
      </div>
    </section>
  )
}

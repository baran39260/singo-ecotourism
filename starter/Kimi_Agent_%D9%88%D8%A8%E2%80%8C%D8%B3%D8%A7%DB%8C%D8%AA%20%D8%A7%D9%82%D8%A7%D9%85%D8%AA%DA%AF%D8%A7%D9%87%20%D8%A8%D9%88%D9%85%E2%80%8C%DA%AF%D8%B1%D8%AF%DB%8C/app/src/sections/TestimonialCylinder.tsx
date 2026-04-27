import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft, ChevronRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  { text: 'زیباترین اقامتگاهی که تجربه کردم', author: 'احمد از تهران' },
  { text: 'صبحانه محلی، فضای آرام، مهمان‌نوازی بی‌نظیر', author: 'سارا از اصفهان' },
  { text: 'برگشتیم به خانه با کیفی از هدیه‌های دست‌ساز', author: 'مریم از شیراز' },
]

export default function TestimonialCylinder() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [rotation, setRotation] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isAnimating = useRef(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    })
    return () => ctx.revert()
  }, [])

  const goTo = (index: number) => {
    if (isAnimating.current) return
    isAnimating.current = true
    const targetRotation = -index * 120
    gsap.to({ val: rotation }, {
      val: targetRotation,
      duration: 1,
      ease: 'power2.inOut',
      onUpdate: function() {
        setRotation(this.targets()[0].val)
      },
      onComplete: () => {
        setActiveIndex(index)
        isAnimating.current = false
      },
    })
  }

  const goNext = () => goTo((activeIndex + 1) % testimonials.length)
  const goPrev = () => goTo((activeIndex - 1 + testimonials.length) % testimonials.length)

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden flex flex-col items-center justify-center"
      style={{
        background: 'var(--deep-charcoal)',
        height: '50vh',
        minHeight: 400,
      }}
    >
      <div
        className="relative"
        style={{
          width: 400,
          height: 200,
          perspective: 1200,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateY(${rotation}deg)`,
            transition: isAnimating.current ? 'none' : 'transform 0.1s linear',
          }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="absolute inset-0 flex items-center justify-center text-center px-10"
              style={{
                transform: `rotateY(${i * 120}deg) translateZ(150px)`,
                backfaceVisibility: 'hidden',
              }}
            >
              <div>
                <p
                  className="mb-4 font-normal"
                  style={{
                    fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                    lineHeight: 1.6,
                    color: '#fff',
                    textShadow: '0 0 40px rgba(201,168,124,0.3)',
                  }}
                >
                  "{t.text}"
                </p>
                <span
                  className="text-sm"
                  style={{ color: 'var(--deep-sand)' }}
                >
                  — {t.author}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-6 mt-12">
        <button
          onClick={goPrev}
          className="flex items-center justify-center transition-all duration-300 hover:border-[var(--deep-sand)] hover:text-[var(--deep-sand)]"
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: '1px solid var(--warm-gray)',
            color: 'var(--warm-gray)',
            background: 'transparent',
          }}
          aria-label="قبلی"
        >
          <ChevronRight size={18} />
        </button>

        <div className="flex items-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="transition-all duration-300"
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: i === activeIndex ? 'var(--deep-sand)' : 'var(--warm-gray)',
              }}
              aria-label={`نظر ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goNext}
          className="flex items-center justify-center transition-all duration-300 hover:border-[var(--deep-sand)] hover:text-[var(--deep-sand)]"
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: '1px solid var(--warm-gray)',
            color: 'var(--warm-gray)',
            background: 'transparent',
          }}
          aria-label="بعدی"
        >
          <ChevronLeft size={18} />
        </button>
      </div>
    </section>
  )
}

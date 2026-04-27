import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    image: '/images/experience-breakfast.jpg',
    title: 'صبحانه سنتی',
    desc: 'صبحانه‌ای از محصولات بومی با نان تازه، ماست محلی، و عسل کوهستان',
    tag: 'غذا',
  },
  {
    image: '/images/experience-craft.jpg',
    title: 'کارگاه صنایع دستی',
    desc: 'یادگیری گلیم‌بافی و سفالگری از هنرمندان محلی',
    tag: 'فرهنگ',
  },
  {
    image: '/images/experience-nature.jpg',
    title: 'گردش در طبیعت',
    desc: 'مسیرهای پیاده‌روی در باغ‌های پسته و تپه‌های اطراف',
    tag: 'ماجراجویی',
  },
]

export default function ExperienceHighlights() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.children
      if (!cards) return

      gsap.from(cards, {
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
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="experiences"
      ref={sectionRef}
      style={{
        background: 'var(--warm-cream)',
        padding: 'clamp(80px, 10vh, 140px) clamp(20px, 5vw, 80px)',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1280 }}>
        <h2
          className="font-semibold text-center mb-16"
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            lineHeight: 1.2,
            color: 'var(--charcoal)',
          }}
        >
          تجربه‌های دلگشا
        </h2>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="group overflow-hidden transition-all duration-400 hover:-translate-y-1"
              style={{
                background: '#fff',
                borderRadius: 24,
                boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              }}
            >
              <div className="overflow-hidden" style={{ aspectRatio: '16/10' }}>
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.03]"
                />
              </div>
              <div style={{ padding: 32 }}>
                <span
                  className="inline-block text-xs font-medium mb-3"
                  style={{
                    background: 'var(--light-sand)',
                    color: 'var(--muted-olive)',
                    borderRadius: 50,
                    padding: '4px 12px',
                  }}
                >
                  {exp.tag}
                </span>
                <h3
                  className="font-semibold mb-2"
                  style={{
                    fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
                    lineHeight: 1.3,
                    color: 'var(--charcoal)',
                  }}
                >
                  {exp.title}
                </h3>
                <p
                  className="text-sm"
                  style={{ color: 'var(--warm-gray)', lineHeight: 1.75 }}
                >
                  {exp.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

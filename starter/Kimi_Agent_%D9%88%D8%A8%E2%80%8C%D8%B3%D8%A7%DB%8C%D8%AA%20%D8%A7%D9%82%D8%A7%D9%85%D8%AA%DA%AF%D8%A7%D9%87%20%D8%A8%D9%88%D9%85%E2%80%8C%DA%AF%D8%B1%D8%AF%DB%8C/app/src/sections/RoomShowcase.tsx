import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const rooms = [
  {
    slug: 'kingsari',
    title: 'اتاق کینگ ساری',
    desc: 'سوئیتی مجلل با تاقچه‌های سنتی و پنجره‌های ارسی',
    image: '/images/room-kingsari.jpg',
    price: '۲,۸۰۰,۰۰۰',
  },
  {
    slug: 'zagros',
    title: 'اتاق زاگرس',
    desc: 'چشم‌انداز بی‌نظیر کوهستان با شومینه سنتی',
    image: '/images/room-zagros.jpg',
    price: '۲,۴۰۰,۰۰۰',
  },
  {
    slug: 'bakhtiari',
    title: 'اتاق بختیاری',
    desc: 'سقف بلند خرپایی با تابلو فرش دستباف',
    image: '/images/room-bakhtiari.jpg',
    price: '۳,۲۰۰,۰۰۰',
  },
  {
    slug: 'alborz',
    title: 'تراس البرز',
    desc: 'حیاط خصوصی با چراغ‌های ریسه‌ای و یاسmin',
    image: '/images/room-alborz.jpg',
    price: '۲,۶۰۰,۰۰۰',
  },
]

export default function RoomShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollContainer = scrollContainerRef.current
      if (!scrollContainer) return

      const scrollWidth = scrollContainer.scrollWidth - window.innerWidth

      gsap.to(scrollContainer, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: 'var(--charcoal)', minHeight: '100vh' }}
    >
      {/* Text overlay */}
      <div
        className="absolute top-8 right-8 z-10"
        style={{
          background: 'rgba(42,42,40,0.6)',
          backdropFilter: 'blur(12px)',
          borderRadius: 16,
          padding: 32,
          maxWidth: 360,
        }}
      >
        <h2
          className="font-semibold mb-3"
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            lineHeight: 1.2,
            color: '#fff',
          }}
        >
          اتاق‌های دلگشا
        </h2>
        <p className="text-sm mb-6" style={{ color: 'var(--warm-gray)', lineHeight: 1.75 }}>
          هر اتاق داستانی از هنر و طبیعت
        </p>
        <Link
          to="/rooms"
          className="text-sm font-medium transition-colors duration-300 hover:text-[var(--terracotta)]"
          style={{ color: 'var(--deep-sand)' }}
        >
          مشاهده همه اتاق‌ها ←
        </Link>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={scrollContainerRef}
        className="flex items-center h-screen gap-8 px-8"
        style={{ width: 'max-content' }}
      >
        {rooms.map((room) => (
          <Link
            key={room.slug}
            to={`/rooms/${room.slug}`}
            className="group relative flex-shrink-0 overflow-hidden"
            style={{
              width: '45vw',
              minWidth: 320,
              maxWidth: 600,
              aspectRatio: '16/10',
              borderRadius: 16,
            }}
          >
            <img
              src={room.image}
              alt={room.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(30,30,28,0.7) 0%, transparent 50%)',
              }}
            />
            <div className="absolute bottom-0 right-0 left-0 p-6">
              <h3
                className="font-semibold mb-1"
                style={{
                  fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
                  color: '#fff',
                }}
              >
                {room.title}
              </h3>
              <p className="text-sm mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {room.desc}
              </p>
              <span
                className="text-sm font-medium"
                style={{ color: 'var(--deep-sand)' }}
              >
                از {room.price} تومان / شب
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

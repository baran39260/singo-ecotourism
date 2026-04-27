import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Users, Bed, Bath, Wifi } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const allRooms = [
  {
    slug: 'kingsari',
    title: 'اتاق کینگ ساری',
    desc: 'سوئیتی مجلل با تاقچه‌های سنتی و پنجره‌های ارسی',
    image: '/images/room-kingsari.jpg',
    price: '۲,۸۰۰,۰۰۰',
    capacity: 2,
    beds: 1,
    baths: 1,
    tags: ['لوکس', 'ویو رو به باغ'],
  },
  {
    slug: 'zagros',
    title: 'اتاق زاگرس',
    desc: 'چشم‌انداز بی‌نظیر کوهستان با شومینه سنتی',
    image: '/images/room-zagros.jpg',
    price: '۲,۴۰۰,۰۰۰',
    capacity: 2,
    beds: 1,
    baths: 1,
    tags: ['ویو کوه', 'شومینه'],
  },
  {
    slug: 'bakhtiari',
    title: 'اتاق بختیاری',
    desc: 'سقف بلند خرپایی با تابلو فرش دستباف',
    image: '/images/room-bakhtiari.jpg',
    price: '۳,۲۰۰,۰۰۰',
    capacity: 4,
    beds: 2,
    baths: 1,
    tags: ['لوفت', 'ویو کوه'],
  },
  {
    slug: 'alborz',
    title: 'تراس البرز',
    desc: 'حیاط خصوصی با چراغ‌های ریسه‌ای و یاسmin',
    image: '/images/room-alborz.jpg',
    price: '۲,۶۰۰,۰۰۰',
    capacity: 2,
    beds: 1,
    baths: 1,
    tags: ['تراس', 'رمانتیک'],
  },
  {
    slug: 'gilani',
    title: 'اتاق گیلانی',
    desc: 'محاط در سبزی باغ با پنجره‌های رو به مزارع',
    image: '/images/experience-nature.jpg',
    price: '۲,۲۰۰,۰۰۰',
    capacity: 2,
    beds: 1,
    baths: 1,
    tags: ['ویو باغ', 'آرام'],
  },
  {
    slug: 'qashqai',
    title: 'چادر قشقایی',
    desc: 'تجربه اقامت در چادر سنتی با تمام امکانات مدرن',
    image: '/images/lodge-exterior.jpg',
    price: '۱,۸۰۰,۰۰۰',
    capacity: 2,
    beds: 1,
    baths: 1,
    tags: ['ماجراجویی', 'منحصربفرد'],
  },
]

const filterTags = ['همه', 'لوکس', 'ویو کوه', 'ویو باغ', 'تراس', 'شومینه', 'منحصربفرد']

export default function Rooms() {
  const [activeFilter, setActiveFilter] = useState('همه')
  const pageRef = useRef<HTMLDivElement>(null)

  const filteredRooms = activeFilter === 'همه'
    ? allRooms
    : allRooms.filter((room) => room.tags.includes(activeFilter))

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.room-card', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: pageRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    })
    return () => ctx.revert()
  }, [activeFilter])

  return (
    <div ref={pageRef} style={{ background: 'var(--warm-cream)', minHeight: '100vh', paddingTop: 120 }}>
      <div className="mx-auto px-6" style={{ maxWidth: 1280 }}>
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="font-bold mb-4"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              lineHeight: 1.15,
              color: 'var(--charcoal)',
            }}
          >
            اتاق‌های دلگشا
          </h1>
          <p className="text-base" style={{ color: 'var(--warm-gray)', maxWidth: 500, margin: '0 auto', lineHeight: 1.75 }}>
            هر اتاق داستانی از هنر و طبیعت ایران
          </p>
        </div>

        {/* Filter tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filterTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className="text-xs font-medium px-4 py-2 rounded-full transition-all duration-300"
              style={{
                background: activeFilter === tag ? 'var(--deep-sand)' : 'transparent',
                color: activeFilter === tag ? '#fff' : 'var(--charcoal)',
                border: `1px solid ${activeFilter === tag ? 'var(--deep-sand)' : 'var(--light-sand)'}`,
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Room grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
          {filteredRooms.map((room) => (
            <Link
              key={room.slug}
              to={`/rooms/${room.slug}`}
              className="room-card group"
            >
              <div
                className="overflow-hidden mb-5"
                style={{ borderRadius: 16, aspectRatio: '16/10' }}
              >
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {room.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-medium px-3 py-1 rounded-full"
                    style={{
                      background: 'var(--light-sand)',
                      color: 'var(--muted-olive)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3
                className="font-semibold mb-2"
                style={{
                  fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
                  color: 'var(--charcoal)',
                }}
              >
                {room.title}
              </h3>

              <p className="text-sm mb-4" style={{ color: 'var(--warm-gray)', lineHeight: 1.6 }}>
                {room.desc}
              </p>

              <div className="flex items-center gap-4 mb-4 text-xs" style={{ color: 'var(--warm-gray)' }}>
                <span className="flex items-center gap-1">
                  <Users size={14} /> {room.capacity} نفر
                </span>
                <span className="flex items-center gap-1">
                  <Bed size={14} /> {room.beds} تخت
                </span>
                <span className="flex items-center gap-1">
                  <Bath size={14} /> {room.baths}
                </span>
                <span className="flex items-center gap-1">
                  <Wifi size={14} /> وای‌فای
                </span>
              </div>

              <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid var(--light-sand)' }}>
                <span className="text-sm font-semibold" style={{ color: 'var(--deep-sand)' }}>
                  از {room.price} تومان
                </span>
                <span
                  className="text-xs font-medium transition-colors duration-300 group-hover:text-[var(--deep-sand)]"
                  style={{ color: 'var(--warm-gray)' }}
                >
                  مشاهده جزئیات ←
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Heart, Leaf, Users, Award } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const values = [
  {
    icon: Heart,
    title: 'مهمان‌نوازی اصیل',
    desc: 'ما معتقدیم مهمان‌نوازی ایرانی فراتر از یک خدمت است — یک هنر است که از نسل به نسل منتقل شده.',
  },
  {
    icon: Leaf,
    title: 'پایداری محیطی',
    desc: 'از انرژی خورشیدی تا آب‌رسانی قطره‌ای، هر جنبه از اقامتگاه با احترام به طبیعت طراحی شده.',
  },
  {
    icon: Users,
    title: 'حمایت از جامعه محلی',
    desc: 'تمام مواد غذایی از کشاورزان محلی تهیه می‌شود و صنایع دستی از هنرمندان منطقه خریداری می‌شود.',
  },
  {
    icon: Award,
    title: 'کیفیت بی‌نظیر',
    desc: 'هر جزئیات — از پارچه تخت‌خواب تا صابون حمام — با دقت و سلیقه انتخاب شده است.',
  },
]

export default function About() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-animate', {
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

  return (
    <div ref={pageRef} style={{ background: 'var(--warm-cream)', minHeight: '100vh', paddingTop: 120 }}>
      {/* Hero */}
      <div className="mx-auto px-6 mb-20" style={{ maxWidth: 1280 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="about-animate">
            <h1
              className="font-bold mb-6"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                lineHeight: 1.15,
                color: 'var(--charcoal)',
              }}
            >
              داستانی که در{' '}
              <span style={{ color: 'var(--deep-sand)' }}>دلگشا</span>{' '}
              ساخته شد
            </h1>
            <p className="text-base mb-6" style={{ color: 'var(--warm-gray)', lineHeight: 1.75 }}>
              اقامتگاه دلگشا در قلب روستاهای تاریخی کاشان، در خانه‌ای با بیش از ۱۵۰ سال تاریخ بنا شده است. ما با حفظ معماری اصیل و افزودن امکانات مدرن، فضایی را خلق کرده‌ایم که در آن گذشته و حال به زیبایی هم می‌آمیزند.
            </p>
            <p className="text-base" style={{ color: 'var(--warm-gray)', lineHeight: 1.75 }}>
              از سال ۱۳۹۸، دلگشا میزبان مسافران از سراسر ایران و جهان بوده است. هر مهمان با یک تجربه منحصربفرد از اینجا می‌رود — تجربه‌ای از آرامش، زیبایی، و ارتباط با فرهنگ ایرانی.
            </p>
          </div>
          <div className="about-animate overflow-hidden" style={{ borderRadius: 24 }}>
            <img
              src="/images/lodge-exterior.jpg"
              alt="نمای بیرونی اقامتگاه دلگشا"
              className="w-full h-full object-cover"
              style={{ aspectRatio: '16/10' }}
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div
        className="py-16 mb-20"
        style={{ background: 'var(--charcoal)' }}
      >
        <div className="mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8" style={{ maxWidth: 1280 }}>
          {[
            { value: '۱۵۰+', label: 'سال تاریخ' },
            { value: '۲۵۰۰+', label: 'مهمان راضی' },
            { value: '۸', label: 'اتاق منحصربفرد' },
            { value: '۴.۹', label: 'امتیاز مهمانان' },
          ].map((stat, i) => (
            <div key={i} className="text-center about-animate">
              <p
                className="font-bold mb-2"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  color: 'var(--deep-sand)',
                }}
              >
                {stat.value}
              </p>
              <p className="text-sm" style={{ color: 'var(--warm-gray)' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="mx-auto px-6 mb-20" style={{ maxWidth: 1280 }}>
        <h2
          className="about-animate font-semibold text-center mb-12"
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            color: 'var(--charcoal)',
          }}
        >
          ارزش‌های ما
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val, i) => (
            <div
              key={i}
              className="about-animate p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1"
              style={{
                background: '#fff',
                boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              }}
            >
              <div
                className="flex items-center justify-center mb-6"
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  background: 'var(--light-sand)',
                }}
              >
                <val.icon size={26} style={{ color: 'var(--deep-sand)' }} />
              </div>
              <h3
                className="font-semibold mb-3"
                style={{
                  fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)',
                  color: 'var(--charcoal)',
                }}
              >
                {val.title}
              </h3>
              <p className="text-sm" style={{ color: 'var(--warm-gray)', lineHeight: 1.75 }}>
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div className="mx-auto px-6 pb-20" style={{ maxWidth: 1280 }}>
        <h2
          className="about-animate font-semibold text-center mb-12"
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            color: 'var(--charcoal)',
          }}
        >
          لحظه‌های دلگشا
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            '/images/hero-courtyard.jpg',
            '/images/lodge-lobby.jpg',
            '/images/experience-breakfast.jpg',
            '/images/lodge-detail.jpg',
          ].map((img, i) => (
            <div
              key={i}
              className="about-animate overflow-hidden"
              style={{ borderRadius: 16, aspectRatio: i === 0 ? '16/10' : '1/1' }}
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

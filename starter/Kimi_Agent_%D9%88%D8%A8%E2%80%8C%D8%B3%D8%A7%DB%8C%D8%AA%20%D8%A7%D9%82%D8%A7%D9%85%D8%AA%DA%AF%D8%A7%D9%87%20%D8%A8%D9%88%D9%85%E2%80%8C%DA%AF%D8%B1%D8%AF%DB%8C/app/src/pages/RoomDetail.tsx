import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { Users, Bed, Bath, Wifi, Wind, Coffee, Car, Sun, ChevronLeft, Check } from 'lucide-react'

const roomsData: Record<string, {
  title: string
  desc: string
  longDesc: string
  image: string
  gallery: string[]
  price: string
  capacity: number
  beds: number
  baths: number
  size: string
  amenities: string[]
}> = {
  kingsari: {
    title: 'اتاق کینگ ساری',
    desc: 'سوئیتی مجلل با تاقچه‌های سنتی و پنجره‌های ارسی',
    longDesc: 'اتاق کینگ ساری بزرگترین و مجلل‌ترین سوئیت اقامتگاه دلگشاست. این اتاق با پنجره‌های ارسی (گره‌چینی) نور را به شکل هندسی روی دیوارها و کف سنگی می‌تاباند. تاقچه‌های دیواری با ظروف سفالی و گل‌های خشک، فضایی کاملاً ایرانی و دلنشین ایجاد کرده‌اند. سرویس بهداشتی سنگی با وان مسی، تجربه‌ای لوکس از سبک زندگی سنتی ایرانی است.',
    image: '/images/room-kingsari.jpg',
    gallery: ['/images/room-kingsari.jpg', '/images/experience-breakfast.jpg', '/images/hero-courtyard.jpg'],
    price: '۲,۸۰۰,۰۰۰',
    capacity: 2,
    beds: 1,
    baths: 1,
    size: '۴۵ متر',
    amenities: ['پنجره ارسی', 'وان مسی', 'شومینه', 'چای‌ساز مسی', 'مبلمان سنتی', 'چشم‌انداز باغ'],
  },
  zagros: {
    title: 'اتاق زاگرس',
    desc: 'چشم‌انداز بی‌نظیر کوهستان با شومینه سنتی',
    longDesc: 'اتاق زاگرس برای دوستداران طبیعت و آرامش طراحی شده است. پنجره بزرگ این اتاق، رو به رشته‌کوه‌های زاگرس است و در فصول مختلف، رنگ‌های متفاوتی را به اتاق می‌بخشد. شومینه سنگی با چوب‌های معطر، شب‌های سرد کوهستان را گرم و دلنشین می‌کند.',
    image: '/images/room-zagros.jpg',
    gallery: ['/images/room-zagros.jpg', '/images/experience-nature.jpg', '/images/lodge-exterior.jpg'],
    price: '۲,۴۰۰,۰۰۰',
    capacity: 2,
    beds: 1,
    baths: 1,
    size: '۳۸ متر',
    amenities: ['شومینه', 'ویو کوه', 'تراس', 'حوله‌های دستباف', 'چای‌ساز مسی', 'صندلی راحتی'],
  },
  bakhtiari: {
    title: 'اتاق بختیاری',
    desc: 'سقف بلند خرپایی با تابلو فرش دستباف',
    longDesc: 'اتاق بختیاری با سقف خرپایی چوبی و تابلو فرش دستباف بزرگ روی دیوار، یادآور خانه‌های روستایی ایران است. این اتاق فضای نشیمن مجزا دارد و برای خانواده‌های کوچک یا گروه‌های دوستانه ایده‌آل است. وان مسی در کنار پنجره بزرگ، تجربه‌ای منحصربفرد از استراحت را فراهم می‌کند.',
    image: '/images/room-bakhtiari.jpg',
    gallery: ['/images/room-bakhtiari.jpg', '/images/experience-craft.jpg', '/images/lodge-lobby.jpg'],
    price: '۳,۲۰۰,۰۰۰',
    capacity: 4,
    beds: 2,
    baths: 1,
    size: '۶۰ متر',
    amenities: ['سقف خرپایی', 'تابلو فرش', 'وان مسی', 'فضای نشیمن', 'میز کار', 'ویو باغ'],
  },
  alborz: {
    title: 'تراس البرز',
    desc: 'حیاط خصوصی با چراغ‌های ریسه‌ای و یاسmin',
    longDesc: 'تراس البرز یک اتاق رو به حیاط با تراس خصوصی است. این اتاق با درختان یاسmin و چراغ‌های ریسه‌ای، فضایی رمانتیک و دلنشین برای زوج‌ها فراهم کرده است. صبحانه در تراس خصوصی، یکی از خاطره‌انگیزترین تجربیات اقامت در دلگشاست.',
    image: '/images/room-alborz.jpg',
    gallery: ['/images/room-alborz.jpg', '/images/hero-courtyard.jpg', '/images/lodge-detail.jpg'],
    price: '۲,۶۰۰,۰۰۰',
    capacity: 2,
    beds: 1,
    baths: 1,
    size: '۴۰ متر + تراس',
    amenities: ['تراس خصوصی', 'چراغ ریسه‌ای', 'گلدان‌های گل', 'میز صبحانه', 'ویو باغ', 'حمام سنگی'],
  },
}

export default function RoomDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [mainImage, setMainImage] = useState(0)
  const room = roomsData[slug || '']

  if (!room) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]" style={{ paddingTop: 120 }}>
        <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--charcoal)' }}>اتاق یافت نشد</h2>
        <Link to="/rooms" className="text-sm" style={{ color: 'var(--deep-sand)' }}>
          بازگشت به لیست اتاق‌ها ←
        </Link>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--warm-cream)', minHeight: '100vh', paddingTop: 100 }}>
      <div className="mx-auto px-6" style={{ maxWidth: 1280 }}>
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm" style={{ color: 'var(--warm-gray)' }}>
          <Link to="/" className="hover:text-[var(--deep-sand)] transition-colors">خانه</Link>
          <ChevronLeft size={14} />
          <Link to="/rooms" className="hover:text-[var(--deep-sand)] transition-colors">اتاق‌ها</Link>
          <ChevronLeft size={14} />
          <span style={{ color: 'var(--charcoal)' }}>{room.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-20">
          {/* Left: Images */}
          <div>
            <div
              className="overflow-hidden mb-4"
              style={{ borderRadius: 16, aspectRatio: '16/10' }}
            >
              <img
                src={room.gallery[mainImage]}
                alt={room.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-3">
              {room.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainImage(i)}
                  className="overflow-hidden flex-shrink-0"
                  style={{
                    width: 80,
                    height: 60,
                    borderRadius: 8,
                    border: mainImage === i ? '2px solid var(--deep-sand)' : '2px solid transparent',
                  }}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div>
            <h1
              className="font-bold mb-3"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                lineHeight: 1.15,
                color: 'var(--charcoal)',
              }}
            >
              {room.title}
            </h1>

            <p className="text-base mb-6" style={{ color: 'var(--warm-gray)', lineHeight: 1.75 }}>
              {room.longDesc}
            </p>

            {/* Quick info */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="text-center p-4 rounded-xl" style={{ background: 'var(--light-sand)' }}>
                <Users size={20} className="mx-auto mb-2" style={{ color: 'var(--muted-olive)' }} />
                <p className="text-xs" style={{ color: 'var(--warm-gray)' }}>ظرفیت</p>
                <p className="text-sm font-semibold" style={{ color: 'var(--charcoal)' }}>{room.capacity} نفر</p>
              </div>
              <div className="text-center p-4 rounded-xl" style={{ background: 'var(--light-sand)' }}>
                <Bed size={20} className="mx-auto mb-2" style={{ color: 'var(--muted-olive)' }} />
                <p className="text-xs" style={{ color: 'var(--warm-gray)' }}>تخت</p>
                <p className="text-sm font-semibold" style={{ color: 'var(--charcoal)' }}>{room.beds}</p>
              </div>
              <div className="text-center p-4 rounded-xl" style={{ background: 'var(--light-sand)' }}>
                <Bath size={20} className="mx-auto mb-2" style={{ color: 'var(--muted-olive)' }} />
                <p className="text-xs" style={{ color: 'var(--warm-gray)' }}>سرویس</p>
                <p className="text-sm font-semibold" style={{ color: 'var(--charcoal)' }}>{room.baths}</p>
              </div>
              <div className="text-center p-4 rounded-xl" style={{ background: 'var(--light-sand)' }}>
                <Sun size={20} className="mx-auto mb-2" style={{ color: 'var(--muted-olive)' }} />
                <p className="text-xs" style={{ color: 'var(--warm-gray)' }}>متراژ</p>
                <p className="text-sm font-semibold" style={{ color: 'var(--charcoal)' }}>{room.size}</p>
              </div>
            </div>

            {/* Amenities */}
            <h3 className="font-semibold mb-4" style={{ color: 'var(--charcoal)' }}>امکانات</h3>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {room.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center gap-2">
                  <Check size={16} style={{ color: 'var(--deep-sand)' }} />
                  <span className="text-sm" style={{ color: 'var(--charcoal)' }}>{amenity}</span>
                </div>
              ))}
            </div>

            {/* Common amenities */}
            <div className="flex flex-wrap gap-4 mb-8 pt-6" style={{ borderTop: '1px solid var(--light-sand)' }}>
              <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--warm-gray)' }}>
                <Wifi size={14} /> وای‌فای رایگان
              </span>
              <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--warm-gray)' }}>
                <Wind size={14} /> تهویه مطبوع
              </span>
              <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--warm-gray)' }}>
                <Coffee size={14} /> صبحانه شامل
              </span>
              <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--warm-gray)' }}>
                <Car size={14} /> پارکینگ
              </span>
            </div>

            {/* Price & CTA */}
            <div
              className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl"
              style={{ background: 'var(--light-sand)' }}
            >
              <div>
                <p className="text-xs mb-1" style={{ color: 'var(--warm-gray)' }}>قیمت هر شب</p>
                <p className="text-2xl font-bold" style={{ color: 'var(--deep-sand)' }}>
                  {room.price} <span className="text-sm font-normal" style={{ color: 'var(--warm-gray)' }}>تومان</span>
                </p>
              </div>
              <Link
                to="/auth"
                className="text-sm font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
                style={{ background: 'var(--deep-sand)', color: '#fff' }}
              >
                رزرو این اتاق
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

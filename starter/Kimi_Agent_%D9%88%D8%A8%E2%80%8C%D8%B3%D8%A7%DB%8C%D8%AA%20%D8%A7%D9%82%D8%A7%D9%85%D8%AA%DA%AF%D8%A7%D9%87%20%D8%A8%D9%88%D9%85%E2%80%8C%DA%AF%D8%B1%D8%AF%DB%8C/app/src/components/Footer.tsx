import { Link } from 'react-router-dom'
import { Instagram, Phone, Send } from 'lucide-react'

const quickLinks = [
  { label: 'اتاق‌ها', href: '/rooms' },
  { label: 'تجربه‌ها', href: '/#experiences' },
  { label: 'گالری', href: '/#memoir' },
  { label: 'وبلاگ', href: '/about' },
]

const legalLinks = [
  { label: 'حریم خصوصی', href: '#' },
  { label: 'شرایط استفاده', href: '#' },
  { label: 'امکانات دسترسی', href: '#' },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--deep-charcoal)' }}>
      <div className="mx-auto" style={{ maxWidth: 1280, padding: '60px clamp(20px, 5vw, 80px) 40px' }}>
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8">
          <Link
            to="/"
            className="font-bold text-2xl"
            style={{ color: 'var(--warm-cream)', fontFamily: 'Vazirmatn' }}
          >
            دلگشا
          </Link>
          <div className="flex items-center gap-8">
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm transition-colors duration-300 hover:text-[var(--deep-sand)]"
                style={{ color: 'var(--warm-gray)' }}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link
            to="/rooms"
            className="text-sm font-medium px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
            style={{ background: 'var(--deep-sand)', color: '#fff' }}
          >
            رزرو
          </Link>
        </div>

        {/* Divider */}
        <div className="w-full h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />

        {/* Bottom row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10">
          {/* Quick access */}
          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ color: 'var(--warm-cream)' }}>
              دسترسی سریع
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-xs transition-colors duration-300 hover:text-[var(--deep-sand)]"
                    style={{ color: 'var(--warm-gray)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ color: 'var(--warm-cream)' }}>
              قانونی
            </h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-xs transition-colors duration-300 hover:text-[var(--deep-sand)]"
                    style={{ color: 'var(--warm-gray)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ color: 'var(--warm-cream)' }}>
              شبکه‌های اجتماعی
            </h4>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="transition-colors duration-300 hover:text-[var(--deep-sand)]"
                style={{ color: 'var(--warm-gray)' }}
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="transition-colors duration-300 hover:text-[var(--deep-sand)]"
                style={{ color: 'var(--warm-gray)' }}
                aria-label="WhatsApp"
              >
                <Phone size={20} />
              </a>
              <a
                href="#"
                className="transition-colors duration-300 hover:text-[var(--deep-sand)]"
                style={{ color: 'var(--warm-gray)' }}
                aria-label="Telegram"
              >
                <Send size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-10 pb-4 text-center">
          <p className="text-xs" style={{ color: 'var(--warm-gray)' }}>
            © ۲۰۲۵ اقامتگاه دلگشا. تمامی حقوق محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  )
}

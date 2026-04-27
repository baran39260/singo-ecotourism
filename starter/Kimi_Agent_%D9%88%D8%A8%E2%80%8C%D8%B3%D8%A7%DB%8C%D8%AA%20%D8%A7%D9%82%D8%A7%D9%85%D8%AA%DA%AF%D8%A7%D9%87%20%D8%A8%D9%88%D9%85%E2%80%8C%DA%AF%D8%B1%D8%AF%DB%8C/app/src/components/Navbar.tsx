import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'اتاق‌ها', href: '/rooms' },
  { label: 'تجربه‌ها', href: '/#experiences' },
  { label: 'گالری', href: '/#memoir' },
  { label: 'درباره ما', href: '/about' },
  { label: 'تماس', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  const isHome = location.pathname === '/'

  return (
    <>
      <nav
        className="fixed top-0 right-0 left-0 z-[1000] transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(251, 247, 241, 0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--light-sand)' : '1px solid transparent',
        }}
      >
        <div
          className="flex items-center justify-between h-[72px] mx-auto"
          style={{ maxWidth: 1280, padding: '0 clamp(20px, 5vw, 80px)' }}
        >
          {/* Right: Hamburger + Nav links (desktop) */}
          <div className="flex items-center gap-6">
            <button
              className="lg:hidden p-2 -mr-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="منو"
            >
              {mobileOpen ? (
                <X size={24} style={{ color: 'var(--charcoal)' }} />
              ) : (
                <Menu size={24} style={{ color: scrolled || !isHome ? 'var(--charcoal)' : '#fff' }} />
              )}
            </button>
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-[11px] font-medium tracking-[0.08em] uppercase transition-colors duration-300 hover:text-[var(--deep-sand)]"
                  style={{ color: scrolled || !isHome ? 'var(--charcoal)' : 'rgba(255,255,255,0.9)' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Center: Logo */}
          <Link
            to="/"
            className="absolute left-1/2 -translate-x-1/2 font-bold text-2xl tracking-tight"
            style={{ color: scrolled || !isHome ? 'var(--charcoal)' : '#fff' }}
          >
            دلگشا
          </Link>

          {/* Left: Reserve button */}
          <Link
            to="/rooms"
            className="hidden sm:flex items-center gap-2 text-sm font-medium px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
            style={{
              background: scrolled || !isHome ? 'var(--deep-sand)' : 'rgba(255,255,255,0.95)',
              color: scrolled || !isHome ? '#fff' : 'var(--charcoal)',
            }}
          >
            رزرو
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[999] lg:hidden transition-all duration-500 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(251, 247, 241, 0.98)', backdropFilter: 'blur(20px)' }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-2xl font-semibold transition-colors duration-300 hover:text-[var(--deep-sand)]"
              style={{ color: 'var(--charcoal)' }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/rooms"
            className="mt-4 text-lg font-medium px-10 py-4 rounded-full"
            style={{ background: 'var(--deep-sand)', color: '#fff' }}
            onClick={() => setMobileOpen(false)}
          >
            رزرو کنید
          </Link>
        </div>
      </div>
    </>
  )
}

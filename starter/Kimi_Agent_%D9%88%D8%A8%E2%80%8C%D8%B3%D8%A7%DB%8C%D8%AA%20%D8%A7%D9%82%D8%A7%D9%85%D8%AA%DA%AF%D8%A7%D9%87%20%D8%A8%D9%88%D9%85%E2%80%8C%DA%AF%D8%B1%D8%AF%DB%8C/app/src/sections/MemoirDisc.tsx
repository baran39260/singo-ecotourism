import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const photos = [
  '/images/room-kingsari.jpg',
  '/images/experience-breakfast.jpg',
  '/images/room-zagros.jpg',
  '/images/guest-1.jpg',
  '/images/room-bakhtiari.jpg',
  '/images/experience-craft.jpg',
  '/images/room-alborz.jpg',
  '/images/experience-nature.jpg',
  '/images/lodge-lobby.jpg',
  '/images/lodge-exterior.jpg',
  '/images/hero-courtyard.jpg',
  '/images/lodge-detail.jpg',
]

export default function MemoirDisc() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const discRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef(0)
  const rotationStart = useRef(0)
  const autoRotateRef = useRef<number>(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    let lastTime = performance.now()
    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000
      lastTime = time
      if (!isDragging) {
        autoRotateRef.current += delta * 15
      }
      setRotation((prev) => {
        if (isDragging) return prev
        return autoRotateRef.current
      })
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [isDragging])

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true)
    dragStart.current = e.clientX
    rotationStart.current = rotation
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return
    const delta = (e.clientX - dragStart.current) * 0.3
    autoRotateRef.current = rotationStart.current - delta
    setRotation(rotationStart.current - delta)
  }

  const handlePointerUp = () => {
    setIsDragging(false)
  }

  return (
    <section
      id="memoir"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: 'var(--warm-cream)',
        padding: 'clamp(80px, 10vh, 140px) 0',
        minHeight: '100vh',
      }}
    >
      <div className="text-center mb-16 px-4">
        <h2
          className="font-semibold mb-4"
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            lineHeight: 1.2,
            color: 'var(--charcoal)',
          }}
        >
          خاطرات مهمانان
        </h2>
        <p
          className="mx-auto"
          style={{
            maxWidth: 480,
            color: 'var(--warm-gray)',
            lineHeight: 1.75,
          }}
        >
          لحظه‌هایی که در دلگشا ساخته شدند
        </p>
      </div>

      <div
        className="relative mx-auto cursor-grab active:cursor-grabbing select-none"
        style={{ width: '100%', maxWidth: 900, height: 500, perspective: 1200 }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <div
          ref={discRef}
          className="absolute inset-0"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateY(${rotation}deg)`,
            transition: isDragging ? 'none' : 'transform 0.1s linear',
          }}
        >
          {photos.map((photo, i) => {
            const angle = (i / photos.length) * 360
            const radius = 380
            return (
              <div
                key={i}
                className="absolute left-1/2 top-1/2"
                style={{
                  width: 220,
                  height: 280,
                  marginLeft: -110,
                  marginTop: -140,
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                }}
              >
                <div
                  className="w-full h-full overflow-hidden transition-transform duration-300 hover:scale-105"
                  style={{
                    background: '#fff',
                    padding: 10,
                    borderRadius: 8,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.1)',
                  }}
                >
                  <img
                    src={photo}
                    alt={`خاطره ${i + 1}`}
                    className="w-full h-full object-cover"
                    style={{ borderRadius: 4 }}
                    draggable={false}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="text-center mt-12">
        <a
          href="#"
          className="text-sm transition-colors duration-300 hover:text-[var(--deep-sand)]"
          style={{ color: 'var(--terracotta)', textDecoration: 'underline', textUnderlineOffset: 4 }}
        >
          مشاهده همه خاطرات →
        </a>
      </div>
    </section>
  )
}

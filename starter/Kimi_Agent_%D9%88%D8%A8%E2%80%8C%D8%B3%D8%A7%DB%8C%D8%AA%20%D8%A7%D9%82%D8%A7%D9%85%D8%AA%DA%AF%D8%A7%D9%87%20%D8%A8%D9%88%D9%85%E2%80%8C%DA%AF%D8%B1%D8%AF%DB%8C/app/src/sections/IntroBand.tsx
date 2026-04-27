import Marquee from 'react-fast-marquee'

export default function IntroBand() {
  const text = 'سفری به اعماق فرهنگ ایران — اقامتی فراموش‌نشدنی — '
  const repeatedText = text.repeat(4)

  return (
    <section
      className="overflow-hidden"
      style={{ background: 'var(--charcoal)', padding: '40px 0' }}
    >
      <Marquee
        direction="right"
        speed={80}
        gradient={false}
        className="overflow-hidden"
      >
        <span
          className="inline-block whitespace-nowrap font-bold px-4"
          style={{
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: 'var(--warm-cream)',
          }}
        >
          {repeatedText}
        </span>
      </Marquee>
    </section>
  )
}

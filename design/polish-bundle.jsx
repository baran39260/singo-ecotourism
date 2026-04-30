// Polish layer — reveal hook, skeleton image, bottom sheet, sticky CTA, split hero

// ============ useReveal ============
// Adds .visible class when element scrolls into view (single-shot)
function useReveal(threshold = 0.15) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("visible");
      return;
    }
    // Fallback: if not fired within 1.5s, force visible (defensive)
    const fallback = setTimeout(() => {
      el.classList.add("visible");
    }, 1500);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            clearTimeout(fallback);
            io.unobserve(e.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -5% 0px" }
    );
    io.observe(el);
    return () => { io.disconnect(); clearTimeout(fallback); };
  }, [threshold]);
  return ref;
}

// Reveal wrapper component
function Reveal({ children, stagger = false, threshold = 0.15, className = "", as: Tag = "div", ...rest }) {
  const ref = useReveal(threshold);
  const cls = (stagger ? "reveal-stagger " : "reveal ") + className;
  return <Tag ref={ref} className={cls} {...rest}>{children}</Tag>;
}

// ============ SkeletonImage ============
// Image with placeholder shimmer that fades out when loaded
function SkeletonImage({ src, alt, className = "", style = {}, ...rest }) {
  const [loaded, setLoaded] = React.useState(false);
  const imgRef = React.useRef(null);
  // Handle cached images — onLoad may fire before React attaches handler
  React.useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [src]);
  return (
    <div className={"skel-img-wrap " + (loaded ? "loaded " : "") + className} style={style}>
      <div className="skel-img-placeholder">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
      </div>
      <img
        ref={imgRef}
        src={src}
        alt={alt || ""}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={loaded ? "loaded" : ""}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        {...rest}
      />
    </div>
  );
}

// ============ Bottom Sheet ============
function BottomSheet({ open, onClose, title, children, footer }) {
  React.useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  // Defensive: don't render anything when closed (avoids flash of unstyled content if CSS fails to load)
  if (!open) return null;
  return (
    <>
      <div className="bs-backdrop open" onClick={onClose}/>
      <div className="bottom-sheet open" role="dialog">
        <div className="bs-handle"/>
        <div className="bs-header">
          <h3>{title}</h3>
          <button className="bs-close" onClick={onClose} aria-label="بستن">×</button>
        </div>
        <div className="bs-body">{children}</div>
        {footer && <div className="bs-footer">{footer}</div>}
      </div>
    </>
  );
}

// ============ Mobile Sticky CTA ============
function MobileStickyCta({ onBookClick }) {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 720);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  if (!isMobile) return null;
  return (
    <div className="mobile-sticky-cta">
      <div className="price-stack">
        <span className="from">از</span>
        <span className="price">۲٬۸۰۰٬۰۰۰ <small>تومان / شب</small></span>
      </div>
      <button className="btn-cta-mobile" onClick={onBookClick}>
        رزرو فوری ←
      </button>
    </div>
  );
}

// ============ Mini Jalali date picker (in bottom sheet) ============
function MiniJalaliPicker({ start, end, onChange }) {
  // Simulated اردیبهشت ۱۴۰۵ — 31 days, starts شنبه (col 0)
  const startCol = 0;
  const days = 31;
  const cells = [];
  for (let i = 0; i < startCol; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  const weekDays = ["ش","ی","د","س","چ","پ","ج"];

  const handleClick = (d) => {
    if (!start || (start && end)) {
      onChange({ start: d, end: null });
    } else if (d > start) {
      onChange({ start, end: d });
    } else {
      onChange({ start: d, end: null });
    }
  };

  return (
    <div>
      <div className="bs-cal-month-title">اردیبهشت ۱۴۰۵</div>
      <div className="bs-cal-grid">
        {weekDays.map((w, i) => <div key={"h"+i} className="h">{w}</div>)}
        {cells.map((d, i) => {
          if (!d) return <div key={"e"+i}/>;
          const isStart = d === start;
          const isEnd = d === end;
          const inRange = start && end && d > start && d < end;
          let cls = "d";
          if (isStart) cls += " start";
          if (isEnd) cls += " end";
          if (inRange) cls += " in-range";
          if (d < 25) cls += " disabled";
          return (
            <div key={d} className={cls} onClick={() => handleClick(d)}>
              {fa(d)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============ HeroSplit — split-screen variation ============
function HeroSplit({ tweaks }) {
  const heroImg = window.__resources.hero;
  const ref = useReveal(0.05);
  return (
    <section className="container" style={{paddingTop: 8}}>
      <div ref={ref} className="hero-split reveal">
        <div className="hero-split-content">
          <div className="hero-split-meta">
            <span className="meta-item">
              <span className="dot"/>
              ۳ اتاق در دسترس امشب
            </span>
            <span className="meta-item">
              <IconLeaf size={12} style={{color: "var(--brand-tertiary)"}}/>
              اقامتگاه پایدار
            </span>
            <span className="meta-item">
              ★ {fa("4.8")} از {fa("327")} نظر
            </span>
          </div>
          <span className="t-overline hero-overline">قشم — جنگل حرا</span>
          <h1 className="t-display-xl hero-title mt-4">{tweaks.heroTitle}</h1>
          <p className="t-body-l hero-sub">{tweaks.heroSubtitle}</p>

          <div className="booking-widget" dir="rtl">
            <div className="bw-field">
              <span className="label">تاریخ ورود</span>
              <span className="value">۲۵ اردیبهشت</span>
            </div>
            <div className="bw-field">
              <span className="label">تاریخ خروج</span>
              <span className="value">۲۸ اردیبهشت</span>
            </div>
            <div className="bw-field">
              <span className="label">میهمانان</span>
              <span className="value">۲ بزرگسال</span>
            </div>
            <button className="btn btn-primary btn-cta">
              <IconSearch size={16}/>
              جستجوی اتاق
            </button>
          </div>
        </div>
        <div className="hero-split-image">
          <SkeletonImage src={heroImg} alt="غروب آفتاب در ساحل قشم با لنج سنتی"/>
          <div className="hero-split-stats">
            <div className="stat-card">
              <b>{fa("8")}</b>
              <small>اتاق و سوئیت</small>
            </div>
            <div className="stat-card">
              <b>★ {fa("4.8")}</b>
              <small>امتیاز مهمانان</small>
            </div>
            <div className="stat-card">
              <b>{fa("12")} دقیقه</b>
              <small>تا جنگل حرا</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { useReveal, Reveal, SkeletonImage, BottomSheet, MobileStickyCta, MiniJalaliPicker, HeroSplit });

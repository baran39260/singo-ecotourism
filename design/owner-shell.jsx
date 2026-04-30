// Owner panel shell — sidebar + topbar layout

function OwnerShell({ active, title, crumb, children, headActions }) {
  const navItems = [
    { section: "اصلی" },
    { id: "dashboard", icon: "🏠", label: "داشبورد", href: "owner-dashboard.html" },
    { id: "calendar", icon: "📅", label: "تقویم", href: "owner-calendar.html" },
    { id: "bookings", icon: "📋", label: "رزروها", href: "owner-bookings.html", badge: "۸" },
    { section: "عملیات" },
    { id: "cleaning", icon: "🧹", label: "نظافت", href: "owner-cleaning.html", badge: "۳" },
    { id: "messages", icon: "💬", label: "پیام‌ها", href: "owner-bookings.html", badge: "۲" },
    { id: "rooms", icon: "🛏", label: "اتاق‌ها", href: "#" },
    { section: "گزارش‌ها" },
    { id: "finance", icon: "💰", label: "گزارش مالی", href: "owner-finance.html" },
    { id: "reviews", icon: "⭐", label: "نظرات", href: "#" },
    { id: "settings", icon: "⚙", label: "تنظیمات", href: "#" },
  ];

  return (
    <div className="owner-shell">
      <aside className="owner-sidebar">
        <div className="owner-brand">
          <div className="logo-mark">س</div>
          <div className="info">
            <b>سنگ سیاه</b>
            <small>پنل میزبان</small>
          </div>
        </div>
        <nav className="owner-nav">
          {navItems.map((item, i) => item.section ? (
            <div key={"s"+i} className="owner-nav-section">{item.section}</div>
          ) : (
            <a key={item.id} href={item.href} className={active === item.id ? "active" : ""}>
              <span style={{fontSize: 14, width: 18, textAlign: "center"}}>{item.icon}</span>
              <span>{item.label}</span>
              {item.badge && <span className="badge-mini">{item.badge}</span>}
            </a>
          ))}
        </nav>
        <div className="owner-sidebar-foot">
          <div className="av">ن</div>
          <div className="nm">
            <b>نازنین فرشاد</b>
            <small>مدیر اقامتگاه</small>
          </div>
        </div>
      </aside>

      <div className="owner-main">
        <header className="owner-topbar">
          <div>
            <div className="crumb">پنل میزبان · {crumb || title}</div>
            <h1>{title}</h1>
          </div>
          <div className="actions">
            {headActions}
            <button className="icon-btn" title="جستجو">🔍</button>
            <button className="icon-btn" title="پیام‌ها"><span>✉</span><span className="dot"/></button>
            <button className="icon-btn" title="اعلانات"><span>🔔</span><span className="dot"/></button>
            <a href="index.html" className="btn-owner btn-owner-ghost">مشاهده سایت ↗</a>
          </div>
        </header>
        <main className="owner-content">{children}</main>
      </div>
    </div>
  );
}

// Spark line SVG generator
function SparkLine({ values, color = "#0E7C86", height = 36, fillOpacity = 0.15 }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const w = 100;
  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  });
  return (
    <svg width="100%" height={height} viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none">
      <polyline points={points.join(" ")} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <polygon points={`0,${height} ${points.join(" ")} ${w},${height}`} fill={color} opacity={fillOpacity}/>
    </svg>
  );
}

// Persian number formatter
function faNum(n) {
  if (typeof n !== "string") n = String(n);
  const map = { "0":"۰","1":"۱","2":"۲","3":"۳","4":"۴","5":"۵","6":"۶","7":"۷","8":"۸","9":"۹" };
  return n.replace(/[0-9]/g, d => map[d]);
}

// Format toman with thousand separator
function faToman(n) {
  return faNum(Number(n).toLocaleString("en-US"));
}

Object.assign(window, { OwnerShell, SparkLine, faNum, faToman });

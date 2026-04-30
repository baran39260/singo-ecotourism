// Shared header/footer for sub-pages
function PageHeader({ active }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const link = (key, label, href) =>
    <a className={"nav-link" + (active === key ? " active" : "")} href={href}>{label}</a>;
  return (
    <header className={"site-header scrolled"}>
      <div className="container nav-row">
        <a className="brand" href="index.html">
          <IconLogo size={40} />
          <div className="brand-name">
            اقامتگاه ساحلی سنگ سیاه
            <small>Sang-e Siah · Qeshm</small>
          </div>
        </a>
        <nav className="nav-links">
          {link("rooms", "اتاق‌ها", "rooms.html")}
          {link("attractions", "جاذبه‌ها", "attractions.html")}
          {link("gallery", "گالری", "gallery.html")}
          {link("blog", "بلاگ", "blog.html")}
          {link("about", "درباره ما", "about.html")}
          {link("contact", "تماس", "contact.html")}
        </nav>
        <div className="nav-actions">
          <div className="lang-toggle inline-only">
            <span className="active">FA</span><span>EN</span>
          </div>
          <a className="nav-link inline-only" href="login.html">ورود</a>
          <a className="btn btn-primary btn-sm" style={{height: 40}} href="rooms.html">رزرو فوری</a>
        </div>
      </div>
    </header>
  );
}

function PageFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-bottom" style={{marginTop: 0, paddingTop: 0, borderTop: "none"}}>
          <span>© ۱۴۰۵ اقامتگاه سنگ سیاه. تمامی حقوق محفوظ است.</span>
          <div className="trust-badges">
            <span className="trust-badge">مجوز گردشگری ۱۰۸۹/ق</span>
            <span className="trust-badge">سامانه مؤدیان ✓</span>
            <span className="trust-badge">اینماد</span>
            <span className="trust-badge" style={{background: "rgba(14,124,134,0.2)", borderColor: "rgba(14,124,134,0.4)"}}>زرین‌پال</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { PageHeader, PageFooter });

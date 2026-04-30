// Sang-e Siah — Section components

const fa = (n) => String(n).replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[d]);

// ============ Header ============
function Header({ tweaks, transparentOnHero = false }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={"site-header" + (scrolled ? " scrolled" : "")}>
      <div className="container nav-row">
        <div className="brand">
          <IconLogo size={40} />
          <div className="brand-name">
            اقامتگاه ساحلی سنگ سیاه
            <small>Sang-e Siah · Qeshm</small>
          </div>
        </div>
        <nav className="nav-links">
          <a className="nav-link" href="rooms.html">اتاق‌ها</a>
          <a className="nav-link" href="attractions.html">جاذبه‌ها</a>
          <a className="nav-link" href="gallery.html">گالری</a>
          <a className="nav-link" href="blog.html">بلاگ</a>
          <a className="nav-link" href="about.html">درباره ما</a>
          <a className="nav-link" href="contact.html">تماس</a>
        </nav>
        <div className="nav-actions">
          <div className="lang-toggle inline-only">
            <span className="active">FA</span>
            <span>EN</span>
          </div>
          <a className="nav-link inline-only" href="login.html">ورود</a>
          <a className="nav-link inline-only" href="dashboard.html" title="داشبورد">داشبورد</a>
          <a className="btn btn-primary btn-sm" style={{height: 40}} href="rooms.html">رزرو فوری</a>
        </div>
      </div>
    </header>
  );
}

// ============ Hero ============
function Hero({ tweaks, onOpenDateSheet }) {
  const heroImg = "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&q=80&auto=format&fit=crop";
  return (
    <section className="container" style={{paddingTop: 8}}>
      <div className="hero" style={{minHeight: tweaks.heroHeight + "vh"}}>
        <div className="hero-bg">
          <img src={heroImg} alt="غروب آفتاب در ساحل قشم با لنج سنتی" />
        </div>
        <div className="hero-overlay" />

        <div className="hero-meta">
          <div style={{display: "flex", gap: 8}}>
            <span className="hero-meta-pill"><IconMapPin size={14}/> قشم، خلیج فارس</span>
            <span className="hero-meta-pill"><IconLeaf size={14} style={{color: "#86EFAC"}}/> اقامتگاه پایدار</span>
          </div>
          <span className="hero-meta-pill">
            <span style={{width: 6, height: 6, borderRadius: "50%", background: "#4ADE80", display: "inline-block", boxShadow: "0 0 8px #4ADE80"}}/>
            ۳ اتاق در دسترس امشب
          </span>
        </div>

        <div className="hero-content">
          <div style={{maxWidth: 920}}>
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
              <div className="bw-cta">
                <button className="btn btn-primary btn-lg" style={{height: 64, borderRadius: 16, width: "100%"}}>
                  <IconSearch size={18}/> جستجوی اتاق
                </button>
              </div>
            </div>

            <div className="bw-trust">
              <span><IconCheck size={16} style={{color: "#86EFAC"}}/> تأیید فوری</span>
              <span><IconCheck size={16} style={{color: "#86EFAC"}}/> کمیسیون صفر</span>
              <span><IconCheck size={16} style={{color: "#86EFAC"}}/> کنسلی انعطاف‌پذیر</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ Pillars ============
function Pillars() {
  const items = [
    { icon: <IconHeart size={28}/>, title: "رزرو مستقیم، بدون واسطه", body: "از خود اقامتگاه با حدود ۲۰٪ قیمت کمتر از پلتفرم‌های واسطه رزرو کن. کمیسیون به‌جای پلتفرم، به جیب میزبان می‌رود." },
    { icon: <IconCrabMascot size={36}/>, title: "تجربه‌ای واقعی از قشم", body: "صبحانه محلی، تور قایق به جنگل حرا، شب‌گردی ستارگان. خرچنگ‌ها صبح تو را بیدار می‌کنند، نه ساعت زنگ‌دار." },
    { icon: <IconLeaf size={28}/>, title: "انتخاب پایدار", body: "معماری بومی از سنگ و چوب نخل، انرژی خورشیدی، استخدام نیروی محلی. سفری که اثر خوب می‌گذارد." },
  ];
  return (
    <section className="container section">
      <Reveal className="sec-head">
        <div>
          <span className="t-overline">چرا سنگ سیاه؟</span>
          <h2 className="t-display-l mt-2">سه دلیل ساده برای ماندن</h2>
        </div>
      </Reveal>
      <Reveal className="pillars" stagger>
        {items.map((it, i) => (
          <div className="pillar" key={i}>
            <div className="pillar-icon">{it.icon}</div>
            <h3 className="t-h3">{it.title}</h3>
            <p className="t-body mt-2">{it.body}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

// ============ Rooms ============
function Rooms() {
  const rooms = [
    {
      img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=80&auto=format&fit=crop",
      name: "سوئیت سنگ", teaser: "رو به دریا، تراس خصوصی با چشم‌انداز لنج‌های قدیمی",
      price: "۲٫۸۰۰٫۰۰۰", rating: "۴٫۹", reviews: "۲۱", photos: "۱۲", capacity: "۲ بزرگسال + ۱ کودک",
      ecoScore: "A", ecoReasons: ["انرژی خورشیدی", "مصالح بومی", "بدون پلاستیک یک‌بارمصرف"], instant: true,
    },
    {
      img: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=900&q=80&auto=format&fit=crop",
      name: "اتاق دو-تخته رو به دریا", teaser: "آفتاب صبح روی صورت، معماری گنبدی سنتی",
      price: "۱٫۹۰۰٫۰۰۰", rating: "۴٫۸", reviews: "۳۴", photos: "۸", capacity: "۲ بزرگسال",
      ecoScore: "B", ecoReasons: ["مصرف کم آب", "کمپوست محلی"], instant: true,
    },
    {
      img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80&auto=format&fit=crop",
      name: "خانه چوبی حرا", teaser: "خانه چهارنفره، مناسب خانواده، در دل بیشه حرا",
      price: "۴٫۲۰۰٫۰۰۰", rating: "۵٫۰", reviews: "۱۲", photos: "۱۵", capacity: "۴ نفره",
      ecoScore: "A", ecoReasons: ["چوب محلی", "خنک‌سازی طبیعی", "بازیافت آب خاکستری"], instant: false,
    },
  ];
  return (
    <section className="container section" id="rooms">
      <div className="sec-head">
        <div>
          <span className="t-overline">اتاق‌های ما</span>
          <h2 className="t-display-l mt-2">سه اتاق، سه روایت</h2>
          <p className="lead">هر اتاق با دست‌ساخته‌های محلی و سنگ‌های ساحل قشم چیده شده. هیچ‌کدام تکراری نیستند.</p>
        </div>
        <a href="#all-rooms" className="btn btn-secondary">
          مشاهده همه ۸ اتاق <IconArrowLeft size={16}/>
        </a>
      </div>

      <Reveal className="room-grid" stagger>
        {rooms.map((r, i) => (
          <article className="room-card" key={i}>
            <div className="room-img skel-img-wrap">
              <SkeletonImage src={r.img} alt={r.name} style={{position:"absolute", inset:0}}/>
              <div className="top-row">
                <div style={{display: "flex", gap: 6, alignItems: "center"}}>
                  {r.instant && <span className="badge badge-primary">رزرو فوری ⚡</span>}
                  {r.ecoScore && <EcoBadge score={r.ecoScore} reasons={r.ecoReasons}/>}
                </div>
                <span className="photo-count">{r.photos} عکس</span>
              </div>
            </div>
            <div className="room-body">
              <h3 className="t-h3">{r.name}</h3>
              <div className="room-meta">
                <span className="rating"><IconStarFlat/> {r.rating}</span>
                <span>({r.reviews} نظر)</span>
                <span>· {r.capacity}</span>
              </div>
              <p className="t-body mt-2 text-muted">{r.teaser}</p>
              <div className="room-amenities">
                <span><IconWifi size={14}/> وای‌فای</span>
                <span><IconCoffee size={14}/> صبحانه</span>
                <span><IconWind size={14}/> کولر</span>
                <span><IconBath size={14}/> حمام</span>
              </div>
              <div className="room-price-row">
                <div>
                  <div className="price-num">{r.price}</div>
                  <div className="price-suffix">تومان / شب</div>
                </div>
                <button className="btn btn-secondary btn-sm">جزئیات</button>
              </div>
            </div>
          </article>
        ))}
      </Reveal>
    </section>
  );
}

// ============ Tide & Weather ============
function TideWidget() {
  return (
    <section className="container">
      <div className="tide-card">
        <div className="tide-pane">
          <span className="t-overline" style={{color: "var(--brand-primary)"}}>امروز در قشم</span>
          <h3 className="t-h2 mt-2"><IconTide size={28} style={{display: "inline-block", verticalAlign: "middle", color: "var(--brand-primary)", marginInlineEnd: 8}}/> جزر و مد</h3>

          <div className="wave-anim mt-4">
            <svg viewBox="0 0 1200 48" preserveAspectRatio="none">
              <path d="M0,24 C150,40 300,8 600,24 C900,40 1050,8 1200,24 L1200,48 L0,48 Z" fill="rgba(14,124,134,0.25)"/>
              <path d="M0,28 C150,12 300,44 600,28 C900,12 1050,44 1200,28 L1200,48 L0,48 Z" fill="rgba(14,124,134,0.45)"/>
            </svg>
          </div>

          <div className="tide-times">
            <div className="tide-time">
              <span className="label">مد بالا</span>
              <span className="v"><IconArrowRight size={14} style={{transform: "rotate(-90deg)"}}/> ۰۶:۲۴</span>
            </div>
            <div className="tide-time">
              <span className="label">جزر</span>
              <span className="v"><IconArrowRight size={14} style={{transform: "rotate(90deg)"}}/> ۱۲:۴۸</span>
            </div>
            <div className="tide-time">
              <span className="label">مد بالا</span>
              <span className="v"><IconArrowRight size={14} style={{transform: "rotate(-90deg)"}}/> ۱۸:۵۲</span>
            </div>
            <div className="tide-time">
              <span className="label">جزر</span>
              <span className="v"><IconArrowRight size={14} style={{transform: "rotate(90deg)"}}/> ۰۱:۱۶</span>
            </div>
          </div>

          <div className="tide-tip">
            <IconDhow size={20} style={{color: "var(--brand-primary)", flexShrink: 0, marginTop: 2}}/>
            <span><b>پیشنهاد امروز:</b> قایق‌سواری در جنگل حرا — ۲ ساعت قبل از مد بالا (ساعت ۰۴:۲۴ صبح یا ۱۶:۵۲).</span>
          </div>
        </div>

        <div className="tide-pane">
          <span className="t-overline" style={{color: "var(--brand-secondary)"}}>هوا در روز ورود</span>
          <h3 className="t-h2 mt-2"><IconSun size={28} style={{display: "inline-block", verticalAlign: "middle", color: "#F59E0B", marginInlineEnd: 8}}/> آفتابی و ملایم</h3>
          <div className="weather-display">
            <span className="weather-temp">۲۸°</span>
            <div className="weather-info">
              <div>دمای آب دریا: <b>۲۶°</b></div>
              <div>رطوبت: <b>۶۸٪</b></div>
              <div>وزش باد: <b>ملایم از جنوب</b></div>
              <div>بهترین زمان شناگری: <b>صبح زود</b></div>
            </div>
          </div>
          <div className="tide-tip" style={{marginTop: 28}}>
            <IconStar size={20} style={{color: "#F59E0B", flexShrink: 0, marginTop: 2}}/>
            <span><b>شب صاف برای رصد ستارگان:</b> پیش‌بینی آسمان بدون ابر تا ساعت ۲۲. تور رصد ستارگان دره ستارگان امشب فعال است.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ Attractions ============
function Attractions() {
  const items = [
    { name: "دره ستارگان", dist: "۱۲ کیلومتر", desc: "صخره‌های مرموز که شب‌ها به ستاره می‌مانند", img: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=900&q=80&auto=format&fit=crop" },
    { name: "جنگل حرا", dist: "۸ کیلومتر", desc: "بیشه‌ای روی آب", img: "https://images.unsplash.com/photo-1473773508845-188df298d2d1?w=700&q=80&auto=format&fit=crop" },
    { name: "غار خربس", dist: "۲۲ کیلومتر", desc: "غاری از دل صخره", img: "https://images.unsplash.com/photo-1502209524164-acea936639a2?w=700&q=80&auto=format&fit=crop" },
    { name: "ساحل سیمیلان", dist: "۴ کیلومتر", desc: "ماسه نقره‌ای، آب فیروزه‌ای، شب‌های ساکت برای رصد و قدم زدن کنار ساحل بکر", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80&auto=format&fit=crop" },
  ];
  return (
    <section className="container section" id="attractions">
      <div className="sec-head">
        <div>
          <span className="t-overline">اطراف اقامتگاه</span>
          <h2 className="t-display-l mt-2">قشم به روایت ما</h2>
          <p className="lead">جزیره‌ای که اگر دو روز بمانی، چهار روز در ذهنت باقی می‌ماند.</p>
        </div>
        <a href="#all-attractions" className="btn btn-secondary">
          همه جاذبه‌ها <IconArrowLeft size={16}/>
        </a>
      </div>

      <Reveal className="attr-grid" stagger>
        {items.map((a, i) => (
          <div className="attr-card" key={i}>
            <SkeletonImage src={a.img} alt={a.name} style={{position:"absolute", inset:0}}/>
            <div className="attr-content">
              <span className="distance"><IconMapPin size={12}/> {a.dist}</span>
              <div>
                <h3>{a.name}</h3>
                <p className="desc">{a.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

// ============ Add-ons ============
function Addons() {
  const items = [
    { name: "صبحانه محلی قشمی", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700&q=80&auto=format&fit=crop", price: "۳۵۰٫۰۰۰", unit: "نفر / روز", ecoScore: "A", ecoReasons: ["مواد بومی", "بدون پلاستیک"] },
    { name: "تور قایق به جنگل حرا", img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=700&q=80&auto=format&fit=crop", price: "۱٫۲۰۰٫۰۰۰", unit: "هر قایق", ecoScore: "A", ecoReasons: ["راهنمای محلی", "بدون آلودگی صوتی"] },
    { name: "شام روی ساحل", img: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=700&q=80&auto=format&fit=crop", price: "۸۵۰٫۰۰۰", unit: "نفر", ecoScore: "B", ecoReasons: ["غذای محلی"] },
    { name: "ترانسفر فرودگاه", img: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=700&q=80&auto=format&fit=crop", price: "۴۰۰٫۰۰۰", unit: "یک طرفه", ecoScore: null },
  ];
  return (
    <section className="container section-tight">
      <div className="sec-head">
        <div>
          <span className="t-overline">تجربه‌های اضافه</span>
          <h2 className="t-h1 mt-2">به اقامتت اضافه کن</h2>
        </div>
      </div>
      <Reveal className="addon-strip" stagger>
        {items.map((it, i) => (
          <article className="addon" key={i}>
            <div className="addon-img skel-img-wrap"><SkeletonImage src={it.img} alt={it.name} style={{position:"absolute", inset:0}}/></div>
            <div className="addon-body">
              <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8}}>
                <h4>{it.name}</h4>
                {it.ecoScore && <EcoBadge score={it.ecoScore} reasons={it.ecoReasons}/>}
              </div>
              <p className="t-caption" style={{margin: 0}}>از {it.price} تومان / {it.unit}</p>
              <div className="addon-foot">
                <span className="price">{it.price} تومان</span>
                <button className="add-btn"><IconPlus size={14}/> افزودن</button>
              </div>
            </div>
          </article>
        ))}
      </Reveal>
    </section>
  );
}

// ============ Story ============
function Story() {
  return (
    <section className="container section" id="about">
      <div className="story-grid">
        <div className="story-portrait">
          <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=900&q=80&auto=format&fit=crop" alt="مادربزرگ، بنیان‌گذار اقامتگاه"/>
        </div>
        <div>
          <span className="t-overline">از کجا شروع شد</span>
          <h2 className="t-display-l mt-2">۴۰ سال پیش، مادربزرگ سنگ‌ها را از دریا جمع کرد</h2>
          <p className="story-quote">«می‌گفت این سنگ‌ها قصه دارن. حیف که همه‌شون رو یک نفر بشنوه.»</p>
          <p className="t-body-l text-muted">
            خانه‌ای که الان «سنگ سیاه» را می‌سازد، روزی فقط چند دیوار سنگی رو به دریا بود. حالا سه نسل از خانواده، هر صبح صبحانه قشمی برای میهمانان آماده می‌کنند، با همان دستورهای قدیمی، با نان همیشه تازه.
          </p>
          <div style={{display: "flex", gap: 16, marginTop: 28, flexWrap: "wrap"}}>
            <a className="btn btn-primary" href="#about-page">داستان کامل را بخوان</a>
            <a className="btn btn-ghost" href="#team"><IconArrowLeft size={16}/> آشنایی با تیم</a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ Testimonials ============
function Testimonials() {
  const items = [
    { stars: 5, text: "صبح اول، با صدای موج بیدار شدم. مادر میزبان نان داغ آورد. تا یک ساعت نتوانستم از تراس بلند شوم.", name: "نیلوفر", city: "تهران", month: "اردیبهشت ۱۴۰۵", color: "#0E7C86" },
    { stars: 5, text: "تور قایق حرا، یکی از بهترین تجربه‌های زندگی‌ام بود. راهنما همه چیز را با شور توضیح می‌داد.", name: "حسین", city: "اصفهان", month: "فروردین ۱۴۰۵", color: "#C2410C" },
    { stars: 5, text: "نکته بزرگ این اقامتگاه: همه چیز واقعی است. هیچ‌چیز برای دوربین چیده نشده. خودِ قشم است.", name: "مریم", city: "مشهد", month: "اسفند ۱۴۰۴", color: "#3F6B3A" },
  ];
  return (
    <section className="container section">
      <div className="sec-head">
        <div>
          <span className="t-overline">از زبان میهمانان</span>
          <h2 className="t-display-l mt-2">آن‌چه از سنگ سیاه می‌گویند</h2>
        </div>
      </div>
      <Reveal className="testimonial-row" stagger>
        {items.map((t, i) => (
          <div className="testimonial" key={i}>
            <div className="stars">{"★".repeat(t.stars)}</div>
            <p>«{t.text}»</p>
            <div className="who">
              <div className="avatar" style={{background: t.color + "1c", color: t.color}}>
                {t.name.charAt(0)}
              </div>
              <div>
                <div style={{fontWeight: 600, fontSize: 14}}>{t.name} — {t.city}</div>
                <div className="t-caption" style={{margin: 0}}>{t.month}</div>
              </div>
            </div>
          </div>
        ))}
      </Reveal>
      <div className="aggregate-score">
        <span className="big">۴٫۹</span>
        <div>
          <div style={{display: "flex", gap: 4, color: "#F59E0B"}}>
            <IconStarFlat size={20}/><IconStarFlat size={20}/><IconStarFlat size={20}/><IconStarFlat size={20}/><IconStarFlat size={20}/>
          </div>
          <div className="t-body" style={{marginTop: 6}}>میانگین <b>۴٫۹ از ۵</b> · بر اساس <b>۲۱۸ نظر تأیید شده</b></div>
        </div>
        <a href="#reviews" className="btn btn-ghost" style={{marginInlineStart: "auto"}}>همه نظرات <IconArrowLeft size={16}/></a>
      </div>
    </section>
  );
}

// ============ Blog ============
function Blog() {
  const posts = [
    { cat: "راهنمای سفر", title: "۴۸ ساعت در قشم: راهنمای کامل سفر کوتاه", date: "۱۲ اردیبهشت ۱۴۰۵", time: "۸ دقیقه", img: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=900&q=80&auto=format&fit=crop" },
    { cat: "آشپزی محلی", title: "دستور پخت سوراق، خوراک قشمی فراموش‌شده", date: "۸ اردیبهشت ۱۴۰۵", time: "۵ دقیقه", img: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=900&q=80&auto=format&fit=crop" },
    { cat: "طبیعت", title: "جنگل حرا چرا روی آب می‌روید؟", date: "۲ اردیبهشت ۱۴۰۵", time: "۶ دقیقه", img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=900&q=80&auto=format&fit=crop" },
  ];
  return (
    <section className="container section" id="blog">
      <div className="sec-head">
        <div>
          <span className="t-overline">از وبلاگ ما</span>
          <h2 className="t-display-l mt-2">قصه‌های قشم</h2>
        </div>
        <a href="#all-blog" className="btn btn-secondary">همه نوشته‌ها <IconArrowLeft size={16}/></a>
      </div>
      <Reveal className="blog-grid" stagger>
        {posts.map((p, i) => (
          <a className="blog-card" key={i} href="#post">
            <div className="blog-img skel-img-wrap"><SkeletonImage src={p.img} alt={p.title} style={{position:"absolute", inset:0}}/></div>
            <span className="t-overline" style={{fontSize: 11}}>{p.cat}</span>
            <h3>{p.title}</h3>
            <div className="meta">
              <span>{p.date}</span>
              <span>· {p.time} مطالعه</span>
            </div>
          </a>
        ))}
      </Reveal>
    </section>
  );
}

// ============ CTA Band ============
function CTABand() {
  return (
    <section className="container">
      <div className="cta-band">
        <span className="t-overline" style={{color: "rgba(255,255,255,0.85)"}}>هنوز شک داری؟</span>
        <h2 className="t-display-l mt-2">یک شب بمان، بقیه را خود قشم می‌گوید</h2>
        <p>کنسلی رایگان تا ۲۴ ساعت قبل از ورود. هیچ مبلغی تا تأیید پرداخت نمی‌شود.</p>
        <div className="actions">
          <a className="btn btn-white btn-lg" href="#book">رزرو همین حالا <IconArrowLeft size={18}/></a>
          <a className="btn btn-outline-white btn-lg" href="#whatsapp"><IconWhatsapp size={18}/> تماس در واتساپ</a>
        </div>
      </div>
    </section>
  );
}

// ============ Footer ============
function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="brand" style={{marginBottom: 18}}>
              <IconLogo size={40}/>
              <div className="brand-name" style={{color: "white"}}>
                اقامتگاه ساحلی سنگ سیاه
                <small style={{color: "rgba(255,255,255,0.55)"}}>Sang-e Siah · Qeshm</small>
              </div>
            </div>
            <p className="footer-about">
              اقامتگاه بومی خانوادگی، ساخته‌شده از سنگ‌های ساحل قشم و چوب نخل. سه نسل میزبانی، یک قصه: «جایی که خرچنگ‌ها تو را بیدار می‌کنند.»
            </p>
          </div>
          <div className="footer-col">
            <h5>دسترسی سریع</h5>
            <ul>
              <li><a href="#rooms">اتاق‌ها</a></li>
              <li><a href="#attractions">جاذبه‌ها</a></li>
              <li><a href="#gallery">گالری</a></li>
              <li><a href="#blog">بلاگ</a></li>
              <li><a href="#about">درباره ما</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>تماس</h5>
            <ul>
              <li>قشم، روستای کندالو، ساحل سنگی</li>
              <li dir="ltr" style={{textAlign: "right"}}>۰۹۱۲۳ ۴۵۶ ۷۸۹</li>
              <li>hello@sangesiah.ir</li>
              <li><a href="#wa"><IconWhatsapp size={14} style={{display: "inline-block", verticalAlign: "middle", marginInlineEnd: 4}}/> گفت‌وگو در واتساپ</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>خبرنامه</h5>
            <p style={{fontSize: 13, marginBottom: 14, color: "rgba(255,255,255,0.6)"}}>هر ماه یک قصه از قشم، تخفیف‌های ویژه میهمانان قدیمی.</p>
            <form className="footer-newsletter" onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="ایمیل شما" />
              <button type="submit">عضویت</button>
            </form>
            <div style={{display: "flex", gap: 10, fontSize: 12, color: "rgba(255,255,255,0.55)"}}>
              <span>اینستاگرام</span><span>·</span>
              <span>تلگرام</span><span>·</span>
              <span>واتساپ</span>
            </div>
          </div>
        </div>

        <FooterSignature/>

        <div className="footer-bottom">
          <span>© ۱۴۰۵ اقامتگاه سنگ سیاه. تمامی حقوق محفوظ است.</span>
          <div className="trust-badges">
            <span className="trust-badge">مجوز گردشگری ۱۰۸۹/ق</span>
            <span className="trust-badge">سامانه مؤدیان ✓</span>
            <span className="trust-badge">اینماد</span>
            <span className="trust-badge">SSL</span>
            <span className="trust-badge" style={{background: "rgba(14,124,134,0.2)", borderColor: "rgba(14,124,134,0.4)"}}>زرین‌پال</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Header, Hero, Pillars, Rooms, TideWidget, Attractions, Addons, Story, Testimonials, Blog, CTABand, Footer, fa });

// Blog list, Blog detail, About, Contact

const BLOG_POSTS = [
  { id:"hara", tag:"طبیعت", title:"یک روز در جنگل حرا: راهنمای کامل قایق‌سواری", excerpt:"از بهترین زمان بازدید تا انتخاب لباس و تجهیزات؛ تجربه‌ای که نباید از قشم بدون آن برگردید.", author:"نازنین فرشاد", date:"۱۸ اردیبهشت ۱۴۰۵", read:"۸ دقیقه", img:"https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1200&q=80&auto=format&fit=crop", featured:true },
  { id:"food", tag:"غذا", title:"۷ غذای محلی قشمی که حتماً باید امتحان کنید", excerpt:"از قلیه ماهی تا کباب میگو؛ راهنمای طعم‌های اصیل جنوب.", author:"رضا بحرینی", date:"۱۲ اردیبهشت ۱۴۰۵", read:"۶ دقیقه", img:"https://images.unsplash.com/photo-1559847844-5315695dadae?w=900&q=80&auto=format&fit=crop" },
  { id:"stars", tag:"طبیعت", title:"دره ستارگان: راز شکل‌گیری صخره‌های شگفت‌انگیز", excerpt:"چگونه باد و آب در طول هزاران سال این مجسمه‌های طبیعی را ساختند.", author:"دکتر فرهاد توکلی", date:"۵ اردیبهشت ۱۴۰۵", read:"۱۰ دقیقه", img:"https://images.unsplash.com/photo-1565122256914-6b5d62cd2bde?w=900&q=80&auto=format&fit=crop" },
  { id:"sustainability", tag:"پایداری", title:"چرا اقامتگاه پایدار انتخاب کنیم؟", excerpt:"تأثیر سفر مسئولانه بر جوامع محلی و طبیعت جزیره قشم.", author:"نازنین فرشاد", date:"۲۸ فروردین ۱۴۰۵", read:"۵ دقیقه", img:"https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=900&q=80&auto=format&fit=crop" },
  { id:"loft", tag:"فرهنگ", title:"بندر لافت و معماری بادگیرها", excerpt:"داستان روستایی که هنوز با باد نفس می‌کشد.", author:"محمد طهماسبی", date:"۲۲ فروردین ۱۴۰۵", read:"۷ دقیقه", img:"https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?w=900&q=80&auto=format&fit=crop" },
  { id:"packing", tag:"راهنما", title:"چه چیزهایی به قشم ببریم؟ چک‌لیست کامل سفر", excerpt:"از کرم ضدآفتاب تا کفش مناسب صخره‌نوردی، آنچه که لازم دارید.", author:"رضا بحرینی", date:"۱۵ فروردین ۱۴۰۵", read:"۴ دقیقه", img:"https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=900&q=80&auto=format&fit=crop" },
  { id:"birds", tag:"طبیعت", title:"پرندگان مهاجر زمستانی جزیره", excerpt:"فلامینگوها و پلیکان‌ها در آذر تا اسفند؛ بهشت پرنده‌نگرها.", author:"دکتر فرهاد توکلی", date:"۱۰ فروردین ۱۴۰۵", read:"۹ دقیقه", img:"https://images.unsplash.com/photo-1557409518-691ebcd96038?w=900&q=80&auto=format&fit=crop" },
];

function BlogPage() {
  const featured = BLOG_POSTS.find(p => p.featured);
  const others = BLOG_POSTS.filter(p => !p.featured);
  return (
    <>
      <Header tweaks={{}}/>
      <div className="page-hero">
        <div className="container">
          <span className="t-overline">از قلم تیم سنگ سیاه</span>
          <h1 className="mt-2">بلاگ سفر</h1>
          <p>راهنمای سفر، داستان‌های محلی، توصیه‌های ما برای کاوش جزیره قشم.</p>
        </div>
      </div>
      <div className="container">
        <div className="blog-layout">
          <div>
            <a href={`blog-detail.html?id=${featured.id}`} className="blog-feature">
              <div className="img"><img src={featured.img} alt={featured.title}/></div>
              <div className="body">
                <div style={{display:"flex", gap:8, alignItems:"center", color:"var(--brand-primary)", fontSize:12, fontWeight:600, marginBottom:6}}>
                  <span>پست ویژه</span><span>·</span><span>{featured.tag}</span>
                </div>
                <h2>{featured.title}</h2>
                <p>{featured.excerpt}</p>
                <div style={{display:"flex", gap:14, fontSize:12, color:"var(--neutral-500)"}}>
                  <span>{featured.author}</span><span>·</span><span>{featured.date}</span><span>·</span><span>{featured.read} مطالعه</span>
                </div>
              </div>
            </a>
            <div className="blog-list">
              {others.map(p => (
                <a key={p.id} href={`blog-detail.html?id=${p.id}`} className="blog-card-full">
                  <div className="img"><img src={p.img} alt={p.title}/></div>
                  <div className="body">
                    <div className="tag-row"><span>{p.tag}</span></div>
                    <h3>{p.title}</h3>
                    <div className="meta"><span>{p.date}</span><span>·</span><span>{p.read} مطالعه</span></div>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <aside className="blog-aside">
            <div className="aside-block">
              <h4>دسته‌بندی‌ها</h4>
              <div className="tag-cloud">
                {["طبیعت","غذا","فرهنگ","پایداری","راهنما"].map(t => <span key={t} className="chip">{t}</span>)}
              </div>
            </div>
            <div className="aside-block">
              <h4>پربازدیدترین‌ها</h4>
              {BLOG_POSTS.slice(0,4).map(p => (
                <a key={p.id} href={`blog-detail.html?id=${p.id}`} className="aside-post">
                  <img src={p.img} alt={p.title}/>
                  <div>
                    <h5>{p.title}</h5>
                    <div className="meta">{p.date}</div>
                  </div>
                </a>
              ))}
            </div>
            <div className="aside-block" style={{background:"var(--brand-primary-soft)", borderColor:"var(--brand-primary)"}}>
              <h4 style={{borderColor:"rgba(14,124,134,0.3)"}}>خبرنامه</h4>
              <p style={{fontSize:13, color:"var(--neutral-700)", lineHeight:1.7, marginBottom:12}}>اخبار اقامتگاه، تخفیف‌های فصلی و نوشته‌های جدید.</p>
              <input type="email" placeholder="ایمیل شما" style={{width:"100%", padding:"10px 12px", borderRadius:"var(--r-md)", border:"1px solid var(--neutral-300)", fontSize:13, fontFamily:"inherit", marginBottom:8}}/>
              <button className="btn btn-primary btn-block btn-sm">عضویت</button>
            </div>
          </aside>
        </div>
      </div>
      <Footer/>
    </>
  );
}

function BlogDetailPage() {
  const id = new URLSearchParams(window.location.search).get("id") || "hara";
  const post = BLOG_POSTS.find(p => p.id === id) || BLOG_POSTS[0];
  return (
    <>
      <Header tweaks={{}}/>
      <div className="container">
        <div className="article-head">
          <div className="crumbs">
            <a href="index.html">خانه</a> · <a href="blog.html">بلاگ</a> · <span>{post.tag}</span>
          </div>
          <span className="badge" style={{background:"var(--brand-primary-soft)", color:"var(--brand-primary)"}}>{post.tag}</span>
          <h1 className="mt-2">{post.title}</h1>
          <p className="lead mt-3">{post.excerpt}</p>
          <div className="article-meta">
            <div className="author">
              <div className="av">{post.author.charAt(0)}</div>
              <div>
                <div style={{fontSize:14, fontWeight:600}}>{post.author}</div>
                <div style={{fontSize:12, color:"var(--neutral-500)"}}>نویسنده · {post.date}</div>
              </div>
            </div>
            <div style={{marginInlineStart:"auto", display:"flex", gap:14, fontSize:13, color:"var(--neutral-500)"}}>
              <span><IconClock size={14}/> {post.read} مطالعه</span>
              <span>♥ ۲۴۸</span>
            </div>
          </div>
        </div>
        <div style={{maxWidth:1100, marginInline:"auto"}}>
          <div className="article-cover"><img src={post.img.replace(/w=\d+/,"w=1600")} alt={post.title}/></div>
        </div>
        <article className="article-body">
          <p>قشم بزرگ‌ترین جزیره خلیج فارس است و در میان جاذبه‌های طبیعی‌اش، جنگل حرا چشمگیرترین آن‌هاست. این جنگل دریایی که در زبان محلی به آن «حرا» می‌گویند، گستره‌ای بیش از ۲۰۰ کیلومتر مربع از سواحل شمالی جزیره را پوشانده است.</p>
          <h2>چه زمانی برویم؟</h2>
          <p>بهترین زمان برای بازدید از جنگل حرا بین آبان تا فروردین است؛ هوا ملایم، آب آرام و جریان پرندگان مهاجر در اوج خود قرار دارد. در ساعات اولیه صبح (۶ تا ۹ صبح) نور طلایی پدیدار می‌شود و فرصت ایده‌آلی برای عکاسی فراهم می‌کند.</p>
          <blockquote>توصیه می‌کنیم رزرو قایق را از یک شب قبل انجام دهید؛ صبح‌های زود معمولاً پر می‌شود.</blockquote>
          <h2>چه چیزهایی همراه ببریم؟</h2>
          <ul>
            <li>کلاه آفتابی و کرم ضدآفتاب با SPF بالا</li>
            <li>دوربین یا گوشی با ظرفیت کافی</li>
            <li>کفش راحت و ضدآب</li>
            <li>یک بطری آب و میان‌وعده سبک</li>
            <li>دوربین چشمی برای پرنده‌نگری</li>
          </ul>
          <h2>راهنمای محلی یا سفر مستقل؟</h2>
          <p>اگر اولین سفرتان به قشم است، حتماً با یک راهنمای محلی همراه شوید. آن‌ها داستان‌های جذابی از زندگی صیادان قدیمی، جزر و مدّ، و گونه‌های جانوری منحصربه‌فرد می‌دانند که در هیچ کتابی پیدا نمی‌شود.</p>
          <h3>تماس با اقامتگاه</h3>
          <p>تیم سنگ سیاه می‌تواند تور قایق‌سواری در جنگل حرا را با راهنمای محلی برای شما هماهنگ کند. کافی است در زمان رزرو، گزینه «افزودن تور» را انتخاب کنید یا با ما تماس بگیرید.</p>
        </article>
        <div style={{maxWidth:720, marginInline:"auto"}}>
          <div className="share-bar">
            <span style={{fontSize:13, fontWeight:600}}>اشتراک‌گذاری:</span>
            <div className="icons">
              <button>📤</button>
              <button>💬</button>
              <button>📧</button>
              <button>🔗</button>
            </div>
            <div style={{marginInlineStart:"auto", display:"flex", gap:8}}>
              <button className="btn btn-ghost btn-sm">♥ پسندیدم</button>
            </div>
          </div>
        </div>
        <div style={{paddingBlock:64}}>
          <h3 className="t-h3 mb-4">پست‌های مرتبط</h3>
          <div className="blog-list">
            {BLOG_POSTS.filter(p => p.id !== post.id).slice(0,3).map(p => (
              <a key={p.id} href={`blog-detail.html?id=${p.id}`} className="blog-card-full">
                <div className="img"><img src={p.img} alt={p.title}/></div>
                <div className="body">
                  <div className="tag-row"><span>{p.tag}</span></div>
                  <h3>{p.title}</h3>
                  <div className="meta"><span>{p.date}</span><span>·</span><span>{p.read} مطالعه</span></div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

// =================== ABOUT ===================
function AboutPage() {
  return (
    <>
      <Header tweaks={{}}/>
      <div className="about-hero">
        <div className="container">
          <span className="t-overline">داستان ما</span>
          <h1 className="mt-2">جایی که سنگ، آب و خاطره به هم می‌رسند</h1>
          <p className="lead">سنگ سیاه از یک خانه قدیمی صیادان شروع شد؛ امروز خانه‌ای است برای مسافرانی که به‌دنبال سکوت، اصالت و طبیعت دست‌نخورده‌اند.</p>
        </div>
      </div>

      <section className="about-section">
        <div className="container">
          <div className="story-grid">
            <img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=80" alt="حیاط اقامتگاه"/>
            <div>
              <span className="t-overline">سال ۱۳۹۶</span>
              <h2 className="mt-2">از یک خانه متروکه تا اقامتگاهی پایدار</h2>
              <p>هشت سال پیش، با یک خانه قدیمی سنگی در روستای رمکان، رؤیای ساخت اقامتگاهی متفاوت آغاز شد. خانه‌ای که با مصالح بومی، دست استادکاران محلی و احترام به معماری اصیل قشمی بازسازی شد.</p>
              <p>امروز سنگ سیاه ۸ اتاق دارد و بیش از ۲۰ همکار محلی در آن کار می‌کنند. ۹۲٪ مواد غذایی از کشاورزان همسایه تأمین می‌شود، ۸۰٪ انرژی از خورشید و آب باران جمع‌آوری می‌گردد.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section" style={{background:"var(--brand-sand)"}}>
        <div className="container">
          <div style={{textAlign:"center", maxWidth:640, marginInline:"auto", marginBottom:48}}>
            <span className="t-overline">ارزش‌های ما</span>
            <h2 className="t-h2 mt-2">سه اصل که هیچ‌وقت کنار نمی‌گذاریم</h2>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <div className="icon-circle"><IconLeaf size={28}/></div>
              <h4>پایداری واقعی</h4>
              <p>نه تبلیغات سبز، نه شعار. آب باران جمع می‌کنیم، انرژی خورشیدی استفاده می‌کنیم، پلاستیک یک‌بارمصرف ممنوع است و ضایعات ۸۰٪ بازیافت می‌شوند.</p>
            </div>
            <div className="value-card">
              <div className="icon-circle"><IconHeart size={28}/></div>
              <h4>اقتصاد محلی</h4>
              <p>کارکنان، آشپزها، راهنماها و تأمین‌کنندگان همگی از روستاهای اطراف هستند. سفر شما درآمد ماندگار برای جامعه محلی است.</p>
            </div>
            <div className="value-card">
              <div className="icon-circle"><IconStarFlat size={28}/></div>
              <h4>اصالت معماری</h4>
              <p>گنبدها، بادگیرها و کاشی‌های فیروزه‌ای — همه با مصالح بومی و دست استادکاران محلی. هیچ کپی، هیچ تظاهر.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <div style={{textAlign:"center", maxWidth:640, marginInline:"auto", marginBottom:48}}>
            <span className="t-overline">سفری ۸ ساله</span>
            <h2 className="t-h2 mt-2">نقاط عطف</h2>
          </div>
          <div className="timeline">
            <div className="timeline-item">
              <div className="yr">۱۳۹۶</div>
              <h5>خرید خانه قدیمی در رمکان</h5>
              <p>یک خانه سنگی متروکه، با گنبدهای فروریخته. شروع رؤیا.</p>
            </div>
            <div className="timeline-item">
              <div className="yr">۱۳۹۸</div>
              <h5>افتتاح با ۳ اتاق</h5>
              <p>پس از دو سال بازسازی به سبک سنتی قشمی، اولین مهمان‌ها از راه رسیدند.</p>
            </div>
            <div className="timeline-item">
              <div className="yr">۱۴۰۰</div>
              <h5>گواهی اقامتگاه پایدار</h5>
              <p>اولین اقامتگاه قشم با گواهی پایداری از سازمان میراث فرهنگی.</p>
            </div>
            <div className="timeline-item">
              <div className="yr">۱۴۰۲</div>
              <h5>توسعه به ۸ اتاق</h5>
              <p>افزودن خانه‌های چوبی حرا و سوئیت ماه. همکاری با ۲۰ خانواده محلی.</p>
            </div>
            <div className="timeline-item">
              <div className="yr">۱۴۰۵</div>
              <h5>برنامه آموزش راهنمایان محلی</h5>
              <p>راه‌اندازی دوره آموزش راهنمایان جوان جزیره با همکاری دانشگاه هرمزگان.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section" style={{background:"var(--brand-sand)"}}>
        <div className="container">
          <div style={{textAlign:"center", maxWidth:640, marginInline:"auto", marginBottom:48}}>
            <span className="t-overline">انسان‌های پشت سنگ سیاه</span>
            <h2 className="t-h2 mt-2">تیم ما</h2>
          </div>
          <div className="team-grid">
            {[
              {n:"نازنین فرشاد", r:"بنیان‌گذار و مدیر", img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80"},
              {n:"رضا بحرینی", r:"سرآشپز", img:"https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&q=80"},
              {n:"فاطمه دهقانی", r:"میزبانی و خدمات", img:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80"},
              {n:"محمد طهماسبی", r:"راهنمای ارشد", img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"},
            ].map((m,i) => (
              <div key={i} className="team-card">
                <div className="ph"><img src={m.img} alt={m.n}/></div>
                <h5>{m.n}</h5>
                <div className="role">{m.r}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section" style={{textAlign:"center"}}>
        <div className="container">
          <h2 className="t-h2">آماده‌اید سنگ سیاه را تجربه کنید؟</h2>
          <p className="text-muted mt-2" style={{maxWidth:480, marginInline:"auto"}}>هر فصل، یک قشم متفاوت دارد. حالا وقتش است.</p>
          <div style={{display:"flex", gap:10, justifyContent:"center", marginTop:24, flexWrap:"wrap"}}>
            <a href="rooms.html" className="btn btn-primary">رزرو اتاق</a>
            <a href="contact.html" className="btn btn-ghost">تماس با ما</a>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}

// =================== CONTACT ===================
function ContactPage() {
  const [sent, setSent] = React.useState(false);
  const [open, setOpen] = React.useState(0);
  const faqs = [
    {q:"بهترین زمان سفر به قشم کی است؟", a:"از آبان تا اردیبهشت بهترین فصل است؛ هوا ملایم و آسمان صاف. تابستان گرم و مرطوب است."},
    {q:"چطور به اقامتگاه برسیم؟", a:"از فرودگاه قشم حدود ۴۵ دقیقه با خودرو فاصله داریم. ترانسفر فرودگاهی با هماهنگی قبلی رایگان است."},
    {q:"شرایط کنسلی چیست؟", a:"تا ۷۲ ساعت قبل از ورود، کنسلی رایگان است. بعد از آن ۵۰٪ مبلغ کسر می‌شود."},
    {q:"حیوان خانگی پذیرفته می‌شود؟", a:"در دو اتاق مشخص بله، با هزینه اضافی ۲۰۰ هزار تومان در هر شب."},
    {q:"وعده غذایی شامل چه چیزی است؟", a:"صبحانه قشمی شامل نان تموشی، پنیر محلی، عسل، خرما و چای دم‌کرده در قیمت همه اتاق‌ها است."},
    {q:"آیا تور هم برگزار می‌کنید؟", a:"بله، تورهای جنگل حرا، دره ستارگان، چاه‌کوه و بندر لافت با راهنمای محلی برگزار می‌شود."},
  ];
  return (
    <>
      <Header tweaks={{}}/>
      <div className="page-hero">
        <div className="container">
          <span className="t-overline">در خدمت شما</span>
          <h1 className="mt-2">تماس با ما</h1>
          <p>هر سؤال، درخواست رزرو، یا برنامه‌ریزی سفر را با ما در میان بگذارید. تیم ما در کمتر از ۲ ساعت پاسخ می‌دهد.</p>
        </div>
      </div>

      <div className="container">
        <div className="contact-layout">
          <div className="contact-form">
            {sent ? (
              <div style={{textAlign:"center", padding:"40px 20px"}}>
                <div style={{width:80, height:80, borderRadius:"50%", background:"var(--success-soft)", color:"var(--success)", display:"grid", placeItems:"center", margin:"0 auto 20px"}}>
                  <IconCheck size={36}/>
                </div>
                <h3 className="t-h3">پیام شما ارسال شد</h3>
                <p className="text-muted mt-2">در کمتر از ۲ ساعت با شما تماس می‌گیریم.</p>
                <button className="btn btn-ghost mt-3" onClick={()=>setSent(false)}>ارسال پیام دیگر</button>
              </div>
            ) : (
              <form onSubmit={(e)=>{e.preventDefault(); setSent(true);}}>
                <h3 className="t-h3">یک پیام بگذارید</h3>
                <p className="lead">به همه پیام‌ها پاسخ می‌دهیم.</p>
                <div className="form-row">
                  <div className="form-group">
                    <label>نام و نام خانوادگی</label>
                    <input type="text" required placeholder="نازنین فرشاد"/>
                  </div>
                  <div className="form-group">
                    <label>شماره موبایل</label>
                    <input type="tel" required placeholder="۰۹۱۲ ۳۴۵ ۶۷۸۹"/>
                  </div>
                </div>
                <div className="form-group">
                  <label>ایمیل</label>
                  <input type="email" required placeholder="name@example.com"/>
                </div>
                <div className="form-group">
                  <label>موضوع</label>
                  <select>
                    <option>درخواست رزرو</option>
                    <option>سؤال درباره اتاق‌ها</option>
                    <option>هماهنگی تور</option>
                    <option>همکاری</option>
                    <option>سایر</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>پیام شما</label>
                  <textarea rows="5" required placeholder="چطور می‌توانیم کمکتان کنیم؟"></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-block">ارسال پیام</button>
              </form>
            )}
          </div>

          <div className="contact-info">
            <div className="info-card">
              <div className="icn"><IconPhone size={20}/></div>
              <div>
                <h5>تلفن</h5>
                <p dir="ltr" style={{textAlign:"right"}}>+۹۸ ۹۱۷ ۸۸۸ ۲۲۲۲</p>
                <p style={{fontSize:12, color:"var(--neutral-500)"}}>هر روز ۸ صبح تا ۱۰ شب</p>
              </div>
            </div>
            <div className="info-card">
              <div className="icn"><IconMail size={20}/></div>
              <div>
                <h5>ایمیل</h5>
                <p><a href="mailto:hello@sangesiah.ir">hello@sangesiah.ir</a></p>
                <p style={{fontSize:12, color:"var(--neutral-500)"}}>پاسخ در کمتر از ۲ ساعت</p>
              </div>
            </div>
            <div className="info-card">
              <div className="icn"><IconMapPin size={20}/></div>
              <div>
                <h5>نشانی</h5>
                <p>جزیره قشم، روستای رمکان، خیابان ساحل، کوچه نخل دوم</p>
                <p style={{fontSize:12, color:"var(--neutral-500)"}}>۴۵ دقیقه از فرودگاه قشم</p>
              </div>
            </div>
            <div className="info-card" style={{background:"var(--brand-primary-soft)", borderColor:"var(--brand-primary)"}}>
              <div className="icn" style={{background:"var(--brand-primary)", color:"white"}}>💬</div>
              <div>
                <h5>واتس‌اپ</h5>
                <p>سریع‌ترین راه گفتگو</p>
                <a href="#" className="btn btn-primary btn-sm" style={{marginTop:8, display:"inline-flex"}}>شروع چت</a>
              </div>
            </div>
          </div>
        </div>

        <section style={{paddingBlock:64}}>
          <div style={{textAlign:"center", marginBottom:32}}>
            <span className="t-overline">پاسخ‌های آماده</span>
            <h2 className="t-h2 mt-2">سؤالات پرتکرار</h2>
          </div>
          <div className="faq-list">
            {faqs.map((f,i) => (
              <div key={i} className={"faq-item" + (open === i ? " open" : "")}>
                <div className="faq-q" onClick={()=>setOpen(open === i ? -1 : i)}>
                  <span>{f.q}</span>
                  <span className="ch">+</span>
                </div>
                <div className="faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer/>
    </>
  );
}

Object.assign(window, { BlogPage, BlogDetailPage, AboutPage, ContactPage });

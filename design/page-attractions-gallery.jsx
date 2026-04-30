// Attractions, Gallery, Blog, About, Contact, Login, Dashboard, BlogDetail pages

// =================== ATTRACTIONS ===================
function AttractionsPage() {
  const attrs = [
    { id:1, name:"جنگل حرا", cat:"طبیعی", dist:"۱۵ کیلومتر", time:"۲۰ دقیقه",
      img:"https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=900&q=80&auto=format&fit=crop",
      desc:"بزرگ‌ترین جنگل مانگرو خاورمیانه، با قایق‌سواری در میان درختان دریایی و پرندگان مهاجر." },
    { id:2, name:"دره ستارگان", cat:"طبیعی", dist:"۳۸ کیلومتر", time:"۴۵ دقیقه",
      img:"https://images.unsplash.com/photo-1565122256914-6b5d62cd2bde?w=900&q=80&auto=format&fit=crop",
      desc:"صخره‌های شگفت‌انگیز با اشکال هندسی، هزاران سال شکل‌گرفته از باد و آب." },
    { id:3, name:"غارهای خربس", cat:"تاریخی", dist:"۱۲ کیلومتر", time:"۱۸ دقیقه",
      img:"https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=900&q=80&auto=format&fit=crop",
      desc:"غارهای دست‌کند ۲۰۰۰ ساله، یادگار تمدن مادی و معبد میترایی." },
    { id:4, name:"ساحل سیمین (نقره‌ای)", cat:"طبیعی", dist:"۸ کیلومتر", time:"۱۰ دقیقه",
      img:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80&auto=format&fit=crop",
      desc:"ساحلی با شن‌های براق نقره‌ای، مناسب پیاده‌روی غروب و عکاسی." },
    { id:5, name:"تنگه چاه‌کوه", cat:"طبیعی", dist:"۲۸ کیلومتر", time:"۳۵ دقیقه",
      img:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80&auto=format&fit=crop",
      desc:"تنگه‌ای باریک با دیواره‌های بلند سنگی، حاصل قرن‌ها فرسایش طبیعی." },
    { id:6, name:"بازار قدیم درگهان", cat:"فرهنگی", dist:"۲۲ کیلومتر", time:"۲۸ دقیقه",
      img:"https://images.unsplash.com/photo-1601891897015-d54a04eb1d4f?w=900&q=80&auto=format&fit=crop",
      desc:"بازار رنگارنگ پارچه و عطر و ادویه؛ قلب تجاری جزیره از دیرباز." },
    { id:7, name:"بندر لافت", cat:"فرهنگی", dist:"۳۲ کیلومتر", time:"۴۰ دقیقه",
      img:"https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?w=900&q=80&auto=format&fit=crop",
      desc:"روستای ساحلی با خانه‌های بادگیردار و کارگاه‌های لنج‌سازی سنتی." },
    { id:8, name:"جزیره ناز", cat:"طبیعی", dist:"۲۵ کیلومتر", time:"۳۰ دقیقه",
      img:"https://images.unsplash.com/photo-1519046904884-53103b34b206?w=900&q=80&auto=format&fit=crop",
      desc:"جزیره کوچکی که هنگام جزر می‌توانید پیاده به آن بروید." },
    { id:9, name:"تنگه قاسمی", cat:"طبیعی", dist:"۲۰ کیلومتر", time:"۲۴ دقیقه",
      img:"https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=900&q=80&auto=format&fit=crop",
      desc:"شکاف زیبای سنگی با لایه‌های رنگین، مقصد محبوب عکاسان." },
  ];
  const [cat, setCat] = React.useState("همه");
  const cats = ["همه", "طبیعی", "تاریخی", "فرهنگی"];
  const filtered = cat === "همه" ? attrs : attrs.filter(a => a.cat === cat);
  return (
    <>
      <Header tweaks={{}}/>
      <div className="page-hero">
        <div className="container">
          <span className="t-overline">کاوش جزیره قشم</span>
          <h1 className="mt-2">جاذبه‌های اطراف</h1>
          <p>۹ نقطه دیدنی در فاصله ۱۰ تا ۴۵ دقیقه از اقامتگاه. تور خصوصی و راهنمای محلی هم می‌توانیم برایتان هماهنگ کنیم.</p>
        </div>
      </div>
      <div className="container">
        <div className="attr-filter-bar">
          {cats.map(c => (
            <button key={c} className={"chip" + (cat === c ? " active" : "")} onClick={()=>setCat(c)}>{c}</button>
          ))}
        </div>
        <div className="attr-grid">
          {filtered.map(a => (
            <article key={a.id} className="attr-card-full">
              <div className="img-wrap"><img src={a.img} alt={a.name}/></div>
              <div className="body">
                <h3>{a.name}</h3>
                <div className="meta-row">
                  <span><IconMapPin size={12}/> {a.dist}</span>
                  <span>·</span>
                  <span>{a.time}</span>
                  <span style={{marginInlineStart:"auto", color:"var(--brand-primary)", fontWeight:600}}>{a.cat}</span>
                </div>
                <p>{a.desc}</p>
                <div className="foot">
                  <span style={{color:"var(--neutral-500)"}}>راهنمای محلی موجود</span>
                  <a href="contact.html" className="btn btn-ghost btn-sm">هماهنگی تور</a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div style={{paddingBlock: 64, textAlign:"center"}}>
          <h3 className="t-h3">می‌خواهید همه را در یک سفر ببینید؟</h3>
          <p className="text-muted mt-2" style={{maxWidth: 480, marginInline:"auto"}}>تور سه‌روزه قشم‌گردی ما با راهنمای محلی، حمل‌ونقل و ناهار سنتی.</p>
          <a href="contact.html" className="btn btn-primary mt-3" style={{display:"inline-flex"}}>درخواست تور</a>
        </div>
      </div>
      <Footer/>
    </>
  );
}

// =================== GALLERY ===================
function GalleryPage() {
  const photos = [
    { id:1, cat:"اقامتگاه", cap:"تراس سوئیت سنگ هنگام غروب", img:"https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80" },
    { id:2, cat:"اتاق‌ها", cap:"اتاق دو-تخته رو به دریا", img:"https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80" },
    { id:3, cat:"طبیعت", cap:"جنگل حرا در سپیده‌دم", img:"https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&q=80" },
    { id:4, cat:"غذا", cap:"صبحانه قشمی با نان تموشی", img:"https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&q=80" },
    { id:5, cat:"اقامتگاه", cap:"حیاط مرکزی و درخت کنار", img:"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80" },
    { id:6, cat:"طبیعت", cap:"دره ستارگان", img:"https://images.unsplash.com/photo-1565122256914-6b5d62cd2bde?w=800&q=80" },
    { id:7, cat:"اتاق‌ها", cap:"خانه چوبی حرا", img:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80" },
    { id:8, cat:"غذا", cap:"کباب ماهی هامور تازه", img:"https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&q=80" },
    { id:9, cat:"طبیعت", cap:"ساحل سیمین", img:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80" },
    { id:10, cat:"اقامتگاه", cap:"رستوران اقامتگاه", img:"https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80" },
    { id:11, cat:"اتاق‌ها", cap:"حمام سنتی با کاشی فیروزه‌ای", img:"https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80" },
    { id:12, cat:"طبیعت", cap:"تنگه چاه‌کوه", img:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80" },
    { id:13, cat:"غذا", cap:"چای و خرما در عصرگاه", img:"https://images.unsplash.com/photo-1563911892437-1feda0179e1b?w=800&q=80" },
    { id:14, cat:"اقامتگاه", cap:"سقف گنبدی سنتی", img:"https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80" },
    { id:15, cat:"طبیعت", cap:"قایق‌سواری در جنگل حرا", img:"https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80" },
  ];
  const [cat, setCat] = React.useState("همه");
  const [lb, setLb] = React.useState(null);
  const cats = ["همه","اقامتگاه","اتاق‌ها","طبیعت","غذا"];
  const filtered = cat === "همه" ? photos : photos.filter(p => p.cat === cat);
  const next = () => setLb(filtered[(filtered.findIndex(p=>p.id===lb.id)+1)%filtered.length]);
  const prev = () => setLb(filtered[(filtered.findIndex(p=>p.id===lb.id)-1+filtered.length)%filtered.length]);
  React.useEffect(() => {
    if (!lb) return;
    const onKey = (e) => { if(e.key==="Escape") setLb(null); if(e.key==="ArrowLeft") next(); if(e.key==="ArrowRight") prev(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lb]);
  return (
    <>
      <Header tweaks={{}}/>
      <div className="page-hero">
        <div className="container">
          <span className="t-overline">قاب‌های ماندگار</span>
          <h1 className="mt-2">گالری تصاویر</h1>
          <p>عکس‌های اقامتگاه، اتاق‌ها، طبیعت اطراف و غذاهای محلی که در سفرتان منتظرتان است.</p>
        </div>
      </div>
      <div className="container">
        <div className="gallery-tabs">
          {cats.map(c => (
            <button key={c} className={"chip" + (cat === c ? " active" : "")} onClick={()=>setCat(c)}>{c}</button>
          ))}
        </div>
        <div className="masonry" style={{paddingBottom: 64}}>
          {filtered.map(p => (
            <div key={p.id} className="masonry-item" onClick={()=>setLb(p)}>
              <img src={p.img} alt={p.cap} loading="lazy"/>
              <div className="caption">{p.cap}</div>
            </div>
          ))}
        </div>
      </div>
      {lb && (
        <div className="lightbox" onClick={()=>setLb(null)}>
          <button className="lb-close" onClick={(e)=>{e.stopPropagation(); setLb(null);}}>✕</button>
          <button className="lb-nav lb-prev" onClick={(e)=>{e.stopPropagation(); prev();}}>‹</button>
          <img src={lb.img.replace("w=800","w=1600")} alt={lb.cap} onClick={(e)=>e.stopPropagation()}/>
          <button className="lb-nav lb-next" onClick={(e)=>{e.stopPropagation(); next();}}>›</button>
          <div className="lb-cap">{lb.cap}</div>
        </div>
      )}
      <Footer/>
    </>
  );
}

Object.assign(window, { AttractionsPage, GalleryPage });

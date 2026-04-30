// Room detail page

function RoomDetailPage() {
  const [tab, setTab] = React.useState("desc");
  const room = {
    name: "سوئیت سنگ — رو به دریا",
    rating: "۴٫۹", reviews: "۲۱",
    capacity: "۲ بزرگسال + ۱ کودک", size: "۴۵ متر مربع", floor: "طبقه همکف",
    price: "۲٫۸۰۰٫۰۰۰", priceTotal: "۹٫۰۵۶٫۰۰۰",
    photos: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=80&auto=format&fit=crop",
    ]
  };

  return (
    <>
      <Header tweaks={{}}/>
      <div className="container">
        <div className="detail-breadcrumb">
          <a href="index.html">صفحه اصلی</a> ‹ <a href="rooms.html">اتاق‌ها</a> ‹ <span>{room.name}</span>
        </div>
        <div className="detail-title-row">
          <h1 className="t-h1">{room.name}</h1>
          <div className="detail-meta">
            <span className="rating"><IconStarFlat size={16}/> {room.rating}</span>
            <span>({room.reviews} نظر)</span>
            <span>· {room.capacity}</span>
            <span>· {room.size}</span>
            <span>· {room.floor}</span>
          </div>
          <div style={{display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap"}}>
            <span className="badge badge-soft">کنسلی انعطاف‌پذیر</span>
            <span className="badge badge-primary">رزرو فوری</span>
            <span className="badge badge-eco"><IconLeaf size={11}/> پایدار</span>
          </div>
        </div>

        <div className="gallery-grid">
          {room.photos.map((src, i) => (
            <div key={i} className="gallery-tile">
              <img src={src} alt=""/>
              {i === room.photos.length - 1 && <span className="more-btn">مشاهده همه ۱۲ عکس</span>}
            </div>
          ))}
        </div>

        <div className="detail-layout">
          <div>
            <div className="tabs-bar">
              <button className={"tab-btn" + (tab === "desc" ? " active" : "")} onClick={() => setTab("desc")}>توضیحات</button>
              <button className={"tab-btn" + (tab === "amen" ? " active" : "")} onClick={() => setTab("amen")}>امکانات</button>
              <button className={"tab-btn" + (tab === "rules" ? " active" : "")} onClick={() => setTab("rules")}>قوانین</button>
              <button className={"tab-btn" + (tab === "rev" ? " active" : "")} onClick={() => setTab("rev")}>نظرات</button>
            </div>

            {tab === "desc" && (
              <div>
                <p className="t-body-l" style={{lineHeight: 1.9, color: "var(--neutral-700)"}}>
                  سوئیت سنگ، در طبقه همکف اقامتگاه، با تراس خصوصی رو به دریا و چشم‌انداز لنج‌های سنتی قشم. دیوارها از سنگ‌های جمع‌آوری‌شده از ساحل ساخته شده، سقف از چوب نخل، و کف از موزائیک‌های دست‌ساز محلی. تخت‌خواب با ملحفه پنبه ارگانیک، حمام اختصاصی با آب گرم خورشیدی، و آشپزخانه کوچک برای دم کردن چای صبحگاهی.
                </p>
                <p className="t-body-l mt-4" style={{lineHeight: 1.9, color: "var(--neutral-700)"}}>
                  از تراس می‌توانی غروب‌های بی‌نظیر خلیج فارس را تماشا کنی، و شب‌ها صدای موج برایت لالایی می‌گوید. صبح‌ها صبحانه محلی قشمی روی همان تراس برایت سرو می‌شود — نان تازه، خرمای محلی، خاگینه ماهی.
                </p>
                <h3 className="t-h3 mt-8">موقعیت اقامتگاه</h3>
                <div className="map-block mt-4">
                  <div className="map-placeholder">
                    <IconMapPin size={32}/>
                    <div style={{fontWeight: 600}}>قشم، روستای کندالو، ساحل سنگی</div>
                    <a href="#nashan" className="t-caption" style={{color: "var(--brand-primary)", marginTop: 8}}>مسیر در نشان ←</a>
                  </div>
                </div>
              </div>
            )}

            {tab === "amen" && (
              <div className="amenity-grid">
                <div className="amenity-group">
                  <h5>راحتی</h5>
                  <ul>
                    <li><IconWifi size={16}/> وای‌فای پرسرعت</li>
                    <li><IconWind size={16}/> تهویه مطبوع</li>
                    <li><IconCoffee size={16}/> چای‌ساز و قهوه‌جوش</li>
                    <li><IconCheck size={16}/> یخچال کوچک</li>
                  </ul>
                </div>
                <div className="amenity-group">
                  <h5>حمام</h5>
                  <ul>
                    <li><IconBath size={16}/> حمام اختصاصی</li>
                    <li><IconSun size={16}/> آب گرم خورشیدی</li>
                    <li><IconCheck size={16}/> حوله و وسایل بهداشتی</li>
                  </ul>
                </div>
                <div className="amenity-group">
                  <h5>فضای باز</h5>
                  <ul>
                    <li><IconCheck size={16}/> تراس خصوصی</li>
                    <li><IconWaves size={16}/> چشم‌انداز دریا</li>
                    <li><IconCheck size={16}/> مبلمان حصیری</li>
                  </ul>
                </div>
                <div className="amenity-group">
                  <h5>غذا</h5>
                  <ul>
                    <li><IconCoffee size={16}/> صبحانه شامل</li>
                    <li><IconCheck size={16}/> آشپزخانه مشترک</li>
                  </ul>
                </div>
              </div>
            )}

            {tab === "rules" && (
              <ul className="rules-list" style={{listStyle: "none"}}>
                <li><IconCheck size={18} style={{color: "var(--success)"}}/> ورود از ساعت ۱۴:۰۰</li>
                <li><IconCheck size={18} style={{color: "var(--success)"}}/> خروج تا ساعت ۱۲:۰۰</li>
                <li><IconCheck size={18} style={{color: "var(--brand-primary)"}}/> حیوان مجاز با شرط هماهنگی قبلی</li>
                <li>🚭 سیگار ممنوع در فضای داخلی</li>
                <li>🤫 مهمانی و سر و صدای بلند ممنوع</li>
                <li><IconCheck size={18} style={{color: "var(--success)"}}/> کنسلی رایگان تا ۲۴ ساعت قبل از ورود</li>
              </ul>
            )}

            {tab === "rev" && (
              <div>
                <div className="review-summary">
                  <div style={{textAlign: "center"}}>
                    <div style={{fontSize: 56, fontWeight: 700, color: "var(--brand-primary)", lineHeight: 1}}>۴٫۹</div>
                    <div style={{display: "flex", gap: 2, justifyContent: "center", marginTop: 6}}>
                      {[1,2,3,4,5].map(i => <IconStarFlat key={i} size={14}/>)}
                    </div>
                    <div className="t-caption mt-2">از ۲۱ نظر</div>
                  </div>
                  <div className="rating-bars">
                    {[[5,18],[4,2],[3,1],[2,0],[1,0]].map(([s,c]) => (
                      <div key={s} className="rating-bar">
                        <span>{fa(s)} ستاره</span>
                        <div className="bar-bg"><div className="bar-fill" style={{width: (c/21*100) + "%"}}/></div>
                        <span>{fa(c)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {[
                  {n: "نیلوفر", c: "تهران", d: "اردیبهشت ۱۴۰۵", txt: "صبح اول، با صدای موج بیدار شدم. مادر میزبان نان داغ آورد. تا یک ساعت نتوانستم از تراس بلند شوم."},
                  {n: "حسین", c: "اصفهان", d: "فروردین ۱۴۰۵", txt: "تور قایق حرا، یکی از بهترین تجربه‌های زندگی‌ام بود. راهنما همه چیز را با شور توضیح می‌داد."},
                ].map((r, i) => (
                  <div className="review-card" key={i}>
                    <div className="head">
                      <div className="avatar" style={{width: 40, height: 40, borderRadius: "50%", background: "var(--brand-primary-soft)", display: "grid", placeItems: "center", fontWeight: 700, color: "var(--brand-primary)"}}>{r.n.charAt(0)}</div>
                      <div>
                        <div style={{fontWeight: 600, fontSize: 14}}>{r.n} — {r.c}</div>
                        <div className="t-caption" style={{margin: 0}}>{r.d}</div>
                      </div>
                      <div className="stars" style={{marginInlineStart: "auto", color: "#F59E0B"}}>★★★★★</div>
                    </div>
                    <p style={{fontSize: 14, lineHeight: 1.7}}>«{r.txt}»</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <aside>
            <div className="booking-sticky">
              <div className="price-line"><span className="num">{room.price}</span><span className="suf">تومان / شب</span></div>
              <div className="rating-line"><IconStarFlat size={12} style={{display: "inline"}}/> {room.rating} · {room.reviews} نظر</div>

              <div className="date-fields">
                <div><span className="lbl">ورود</span><div className="vl">۲۵ اردیبهشت</div></div>
                <div><span className="lbl">خروج</span><div className="vl">۲۸ اردیبهشت</div></div>
              </div>
              <div className="guest-stepper">
                <div><span className="lbl">میهمانان</span><div className="vl">۲ بزرگسال</div></div>
                <IconChevron size={16} style={{transform: "rotate(90deg)"}}/>
              </div>

              <div className="calc-box">
                <div className="row"><span>۲٫۸۰۰٫۰۰۰ × ۳ شب</span><span>۸٫۴۰۰٫۰۰۰</span></div>
                <div className="row"><span>مالیات گردشگری ۹٪</span><span>۷۵۶٫۰۰۰</span></div>
                <div className="row discount"><span>تخفیف عضویت</span><span>−۱۰۰٫۰۰۰</span></div>
                <div className="row total"><span>مجموع</span><span>{room.priceTotal} تومان</span></div>
              </div>

              <a href="checkout.html" className="btn btn-primary btn-lg btn-block" style={{marginTop: 16}}>رزرو و پرداخت</a>
              <p className="t-caption text-center mt-2" style={{margin: "10px 0 0", textAlign: "center"}}>هیچ مبلغی هنوز پرداخت نشده.</p>
              <button className="btn btn-secondary btn-block mt-4" style={{borderColor: "#22C55E", color: "#15803D"}}>
                <IconWhatsapp size={16}/> تماس با میزبان در واتساپ
              </button>
            </div>
          </aside>
        </div>
      </div>
      <Footer/>
    </>
  );
}

Object.assign(window, { RoomDetailPage });

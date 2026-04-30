// Room list page components

function RoomListCard({ room }) {
  return (
    <article className="room-card-h">
      <div className="img-wrap">
        {room.instant && <span className="list-card-instant-flag"><IconCheck size={11}/> رزرو فوری</span>}
        <img src={room.img} alt={room.name}/>
      </div>
      <div className="body">
        <div className="top-info">
          <div>
            <h3>{room.name}</h3>
            <div style={{fontSize: 13, color: "var(--neutral-500)", marginTop: 4}}>{room.capacity} · {room.size}</div>
          </div>
          <div className="rating"><IconStarFlat/> {room.rating}</div>
        </div>
        <p className="t-caption" style={{margin: "10px 0", color: "var(--neutral-700)"}}>{room.teaser}</p>
        <div className="room-amenities" style={{marginTop: "auto"}}>
          <span><IconWifi size={14}/></span>
          <span><IconCoffee size={14}/></span>
          <span><IconWind size={14}/></span>
          <span><IconBath size={14}/></span>
          {room.eco && <span className="badge badge-eco" style={{marginInlineStart: 4}}><IconLeaf size={11}/> پایدار</span>}
        </div>
        <div className="room-price-row">
          <div>
            <div className="price-num">{room.price}</div>
            <div className="price-suffix">تومان / شب</div>
          </div>
          <a href={`room.html?id=${room.id}`} className="btn btn-primary btn-sm">رزرو</a>
        </div>
      </div>
    </article>
  );
}

function RoomsListPage() {
  const rooms = [
    { id: 1, name: "سوئیت سنگ", teaser: "رو به دریا، تراس خصوصی، چشم‌انداز لنج‌های قدیمی", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=80&auto=format&fit=crop", price: "۲٫۸۰۰٫۰۰۰", rating: "۴٫۹", capacity: "۲ بزرگسال + ۱ کودک", size: "۴۵ متر مربع", instant: true, eco: true },
    { id: 2, name: "اتاق دو-تخته رو به دریا", teaser: "آفتاب صبح، معماری گنبدی سنتی قشمی", img: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=900&q=80&auto=format&fit=crop", price: "۱٫۹۰۰٫۰۰۰", rating: "۴٫۸", capacity: "۲ بزرگسال", size: "۲۸ متر مربع", instant: true, eco: false },
    { id: 3, name: "خانه چوبی حرا", teaser: "خانه چهارنفره مناسب خانواده، در دل بیشه", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80&auto=format&fit=crop", price: "۴٫۲۰۰٫۰۰۰", rating: "۵٫۰", capacity: "۴ نفره", size: "۶۸ متر مربع", instant: false, eco: true },
    { id: 4, name: "اتاق پنجره‌دار", teaser: "ساده و دنج، با پنجره رو به نخلستان", img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80&auto=format&fit=crop", price: "۱٫۵۰۰٫۰۰۰", rating: "۴٫۷", capacity: "۲ بزرگسال", size: "۲۲ متر مربع", instant: true, eco: false },
    { id: 5, name: "سوئیت ماه", teaser: "تراس بزرگ برای رصد ستارگان شب", img: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=900&q=80&auto=format&fit=crop", price: "۳٫۲۰۰٫۰۰۰", rating: "۴٫۹", capacity: "۲ بزرگسال + ۲ کودک", size: "۵۲ متر مربع", instant: true, eco: true },
    { id: 6, name: "خانه سنگ‌چین", teaser: "بازسازی‌شده از خانه قدیمی صیادان", img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=80&auto=format&fit=crop", price: "۲٫۴۰۰٫۰۰۰", rating: "۴٫۸", capacity: "۳ نفره", size: "۳۸ متر مربع", instant: false, eco: true },
  ];

  const [capacity, setCapacity] = React.useState("all");

  return (
    <>
      <Header tweaks={{}}/>
      <div className="rooms-page-head">
        <div className="container">
          <span className="t-overline">اقامتگاه ساحلی سنگ سیاه</span>
          <h1 className="t-h1 mt-2">اتاق‌های اقامتگاه</h1>
          <p className="text-muted mt-2">۸ اتاق منحصربه‌فرد، آماده رزرو فوری.</p>
        </div>
      </div>
      <div className="container" style={{paddingBlock: 32}}>
        <div className="rooms-layout">
          <aside className="filter-rail">
            <h4>فیلترها</h4>
            <div className="filter-section">
              <label style={{fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--neutral-500)"}}>تاریخ ورود/خروج</label>
              <div className="date-fields" style={{marginTop: 8}}>
                <div><span className="lbl">ورود</span><div className="vl">۲۵ اردیبهشت</div></div>
                <div><span className="lbl">خروج</span><div className="vl">۲۸ اردیبهشت</div></div>
              </div>
            </div>
            <div className="filter-section">
              <h5 style={{fontSize: 13, fontWeight: 700, marginBottom: 12}}>ظرفیت</h5>
              <div className="chip-row">
                {["all","2","3-4","5+"].map(c => (
                  <button key={c} className={"chip" + (capacity === c ? " active" : "")} onClick={() => setCapacity(c)}>
                    {c === "all" ? "همه" : c === "2" ? "۱-۲ نفره" : c === "3-4" ? "۳-۴ نفره" : "۵+ نفره"}
                  </button>
                ))}
              </div>
            </div>
            <div className="filter-section">
              <h5 style={{fontSize: 13, fontWeight: 700, marginBottom: 12}}>بازه قیمت (تومان)</h5>
              <input type="range" className="range-slider" min="500000" max="10000000" defaultValue="6000000"/>
              <div className="price-readout"><span>۰</span><span>تا ۶ میلیون</span></div>
            </div>
            <div className="filter-section">
              <h5 style={{fontSize: 13, fontWeight: 700, marginBottom: 12}}>امکانات</h5>
              <div className="checkbox-list">
                <label><input type="checkbox" defaultChecked/> وای‌فای</label>
                <label><input type="checkbox" defaultChecked/> صبحانه شامل</label>
                <label><input type="checkbox"/> تهویه مطبوع</label>
                <label><input type="checkbox"/> حمام اختصاصی</label>
                <label><input type="checkbox"/> چشم‌انداز دریا</label>
                <label><input type="checkbox"/> تراس خصوصی</label>
              </div>
            </div>
            <div className="filter-section">
              <h5 style={{fontSize: 13, fontWeight: 700, marginBottom: 12}}>ویژگی‌ها</h5>
              <div className="checkbox-list">
                <label><input type="checkbox"/> رزرو فوری</label>
                <label><input type="checkbox"/> اقامتگاه پایدار</label>
                <label><input type="checkbox"/> حیوان مجاز</label>
              </div>
            </div>
            <div style={{display: "flex", gap: 8, marginTop: 16}}>
              <button className="btn btn-primary btn-block btn-sm">اعمال</button>
              <button className="btn btn-ghost btn-sm">پاک‌کردن</button>
            </div>
          </aside>

          <div>
            <div className="results-head">
              <div>
                <div className="t-h3">۶ اتاق پیدا شد</div>
                <div className="results-count mt-2">برای ۲۵ تا ۲۸ اردیبهشت ۱۴۰۵ · ۲ بزرگسال</div>
              </div>
              <select className="sort-select">
                <option>چیدمان: پیشنهادی</option>
                <option>ارزان‌ترین</option>
                <option>گران‌ترین</option>
                <option>محبوب‌ترین</option>
              </select>
            </div>
            <div className="rooms-list-grid">
              {rooms.map(r => <RoomListCard key={r.id} room={r}/>)}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

Object.assign(window, { RoomsListPage, RoomListCard });

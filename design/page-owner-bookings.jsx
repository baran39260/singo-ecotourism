// Owner Bookings — list + WhatsApp chat panel

function OwnerBookingsPage() {
  const [filter, setFilter] = React.useState("all");
  const [active, setActive] = React.useState(0);

  const bookings = [
    {
      id: "SS-3712BF", guest: "نازنین فرشاد", phone: "+98 912 345 6789",
      img: "https://i.pravatar.cc/100?img=47",
      room: "سوئیت سنگ", checkIn: "۲۵ اردیبهشت", checkOut: "۲۸ اردیبهشت", nights: 3,
      guests: "۲ بزرگسال", price: 8400000, status: "تایید شده", statusKey: "confirmed",
      paid: true,
    },
    {
      id: "SS-3892AC", guest: "محمد رضایی", phone: "+98 935 222 1144",
      img: "https://i.pravatar.cc/100?img=33",
      room: "اتاق دو-تخته رو به دریا", checkIn: "۲۵ اردیبهشت", checkOut: "۲۷ اردیبهشت", nights: 2,
      guests: "۲ بزرگسال", price: 5600000, status: "ورود امروز", statusKey: "today",
      paid: true,
    },
    {
      id: "SS-3901DE", guest: "خانواده موسوی", phone: "+98 901 555 8822",
      img: "https://i.pravatar.cc/100?img=12",
      room: "خانه چوبی حرا", checkIn: "۲۵ اردیبهشت", checkOut: "۳۰ اردیبهشت", nights: 5,
      guests: "۲ بزرگسال + ۲ کودک", price: 16000000, status: "ورود امروز", statusKey: "today",
      paid: true,
    },
    {
      id: "SS-4012FG", guest: "سارا کریمی", phone: "+98 919 444 7766",
      img: "https://i.pravatar.cc/100?img=44",
      room: "اتاق پنجره‌دار", checkIn: "۲۸ اردیبهشت", checkOut: "۳۱ اردیبهشت", nights: 3,
      guests: "۲ بزرگسال", price: 8400000, status: "در انتظار پرداخت", statusKey: "pending",
      paid: false,
    },
    {
      id: "SS-4023HI", guest: "علی احمدی", phone: "+98 936 111 2233",
      img: "https://i.pravatar.cc/100?img=15",
      room: "سوئیت ماه", checkIn: "۲ خرداد", checkOut: "۵ خرداد", nights: 3,
      guests: "۲ بزرگسال", price: 9600000, status: "تایید شده", statusKey: "confirmed",
      paid: true,
    },
    {
      id: "SS-4045JK", guest: "رضا کیانی", phone: "+98 912 999 0011",
      img: "https://i.pravatar.cc/100?img=68",
      room: "اتاق دو-تخته رو به دریا", checkIn: "۸ خرداد", checkOut: "۱۰ خرداد", nights: 2,
      guests: "۲ بزرگسال", price: 5600000, status: "لغو شده", statusKey: "cancelled",
      paid: false,
    },
    {
      id: "SS-4067LM", guest: "فاطمه دهقانی", phone: "+98 935 887 6655",
      img: "https://i.pravatar.cc/100?img=23",
      room: "خانه سنگ‌چین", checkIn: "۱۲ خرداد", checkOut: "۱۵ خرداد", nights: 3,
      guests: "۴ بزرگسال", price: 11400000, status: "تایید شده", statusKey: "confirmed",
      paid: true,
    },
  ];

  const filtered = filter === "all" ? bookings : bookings.filter(b => b.statusKey === filter);
  const current = bookings[active];

  // Conversation simulating WhatsApp Business API for guest comms
  const messages = [
    { type: "template", text: "این مکالمه از طریق واتس‌اپ بیزینس API ارسال می‌شود" },
    { dir: "out", text: "سلام نازنین جان 🌿\nرزرو شما برای سوئیت سنگ از ۲۵ تا ۲۸ اردیبهشت ثبت شد. کد رزرو: SS-3712BF", time: "۱۸:۲۲", read: true },
    { dir: "in", text: "ممنون. ساعت ورود چنده؟", time: "۱۸:۳۰" },
    { dir: "out", text: "تحویل اتاق از ساعت ۱۴:۰۰ به بعده. اگه زودتر رسیدید می‌تونید چمدان‌ها رو در پذیرش بذارید و از حیاط استفاده کنید 🌊", time: "۱۸:۳۲", read: true },
    { dir: "in", text: "عالیه! یک سوال - ترانسفر فرودگاه دارید؟", time: "۰۹:۱۲" },
    { dir: "out", text: "بله، ترانسفر فرودگاه قشم به اقامتگاه ۸۰۰ هزار تومان (یک‌طرفه) برای ۲ نفر هست. شماره پرواز رو بفرستید تا هماهنگ کنیم.", time: "۰۹:۱۵", read: true },
    { dir: "in", text: "IR3477 - فردا ساعت ۱۲:۳۰ به فرودگاه قشم میرسیم", time: "۰۹:۱۸" },
    { dir: "out", text: "ثبت شد ✓ راننده آقای موسوی با تابلوی نام شما در فرودگاه منتظر خواهند بود. مبلغ ترانسفر هنگام تحویل اتاق به کارت‌خوان پرداخت می‌شود.", time: "۰۹:۲۰", read: true },
    { dir: "in", text: "خیلی ممنون 🙏 یک درخواست دیگه: امکان داره گل تازه توی اتاق باشه؟ سالگرد ازدواج‌مونه", time: "۰۹:۲۵" },
    { dir: "out", text: "تبریک می‌گیم 🌹 حتما ترتیب گل و یک یادداشت دستی فراهم می‌کنیم. هدیه از طرف اقامتگاه. ✨", time: "۰۹:۲۸", read: true },
    { dir: "in", text: "وای خیلی لطف می‌کنید ❤️ تا فردا", time: "۰۹:۳۰" },
  ];

  return (
    <OwnerShell active="bookings" title="رزروها"
      headActions={
        <button className="btn-owner btn-owner-primary">+ رزرو دستی</button>
      }
    >
      <div className="bookings-layout">
        {/* List panel */}
        <div className="bookings-list-panel">
          <div className="bookings-filters">
            <input className="search-input" placeholder="جستجوی نام مهمان یا کد رزرو…"/>
            {[
              {k:"all", l:"همه", c: bookings.length},
              {k:"today", l:"امروز", c: 2},
              {k:"confirmed", l:"تایید شده", c: 3},
              {k:"pending", l:"در انتظار", c: 1},
              {k:"cancelled", l:"لغو شده", c: 1},
            ].map(f => (
              <span key={f.k} className={"filter-pill" + (filter === f.k ? " active" : "")} onClick={() => setFilter(f.k)}>
                {f.l} ({faNum(f.c)})
              </span>
            ))}
          </div>
          <div className="bookings-table">
            {filtered.map((b, i) => (
              <div key={b.id} className={"bk-row" + (active === i ? " active" : "")} onClick={() => setActive(i)}>
                <div className="av"><img src={b.img} alt=""/></div>
                <div>
                  <div className="nm">{b.guest}</div>
                  <div className="meta">{b.room} · {b.checkIn} ← {b.checkOut} · {faNum(b.nights)} شب · {b.guests}</div>
                </div>
                <div style={{textAlign:"end"}}>
                  <div className="price-tag">{faToman(b.price)} ﷼</div>
                  <div className="meta" style={{marginTop:2}}>کد {b.id.split("-")[1]}</div>
                </div>
                <span className={"status-pill " + (b.statusKey === "confirmed" ? "ready" : b.statusKey === "today" ? "cleaning" : b.statusKey === "pending" ? "inspect" : "dirty")}>
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp Chat */}
        <div className="chat-panel">
          <div className="chat-header">
            <div className="av-wa"><img src={current.img} alt=""/></div>
            <div style={{flex:1}}>
              <h4>{current.guest}</h4>
              <div className="status">آنلاین · {current.phone}</div>
            </div>
            <button className="icon-btn" style={{background:"rgba(255,255,255,0.15)", color:"white"}} title="جزئیات رزرو">⋯</button>
          </div>
          <div className="chat-body">
            {messages.map((m, i) => m.type === "template" ? (
              <div key={i} className="bubble template-tag">{m.text}</div>
            ) : (
              <div key={i} className={"bubble " + m.dir}>
                <div style={{whiteSpace:"pre-wrap"}}>{m.text}</div>
                <div className="time">
                  <span>{faNum(m.time)}</span>
                  {m.dir === "out" && <span className="ck">{m.read ? "✓✓" : "✓"}</span>}
                </div>
              </div>
            ))}
          </div>
          <div className="chat-templates">
            <span className="tmpl">📍 آدرس و مسیر</span>
            <span className="tmpl">🕐 ساعت ورود/خروج</span>
            <span className="tmpl">💳 لینک پرداخت</span>
            <span className="tmpl">🌊 جدول جزر و مد</span>
            <span className="tmpl">🍽 منوی صبحانه</span>
            <span className="tmpl">⭐ درخواست نظر</span>
          </div>
          <div className="chat-input-row">
            <button className="icon-btn" style={{background:"transparent"}}>📎</button>
            <input placeholder="پیام خود را بنویسید…"/>
            <button className="send-btn">➤</button>
          </div>
        </div>
      </div>
    </OwnerShell>
  );
}

Object.assign(window, { OwnerBookingsPage });

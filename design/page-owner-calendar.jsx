// Owner Calendar — Jalali month view with date blocking
// Shamsi calendar logic: simulate the month "اردیبهشت ۱۴۰۵"
// Saturday-first week (Persian convention)

function OwnerCalendarPage() {
  const persianMonths = ["فروردین","اردیبهشت","خرداد","تیر","مرداد","شهریور","مهر","آبان","آذر","دی","بهمن","اسفند"];
  const weekDays = ["شنبه","یکشنبه","دوشنبه","سه‌شنبه","چهارشنبه","پنج‌شنبه","جمعه"];
  // Simulated: اردیبهشت ۱۴۰۵ has 31 days, starts on Saturday (col 0)
  const [monthIdx, setMonthIdx] = React.useState(1); // اردیبهشت
  const [year, setYear] = React.useState(1405);
  const [room, setRoom] = React.useState("all");
  const [selected, setSelected] = React.useState([]);
  const [hoverDay, setHoverDay] = React.useState(null);

  const rooms = [
    { id: "all", label: "همه اتاق‌ها (۸ اتاق)" },
    { id: "stone", label: "سوئیت سنگ" },
    { id: "double", label: "اتاق دو-تخته رو به دریا" },
    { id: "hara", label: "خانه چوبی حرا" },
    { id: "window", label: "اتاق پنجره‌دار" },
    { id: "moon", label: "سوئیت ماه" },
    { id: "stonechin", label: "خانه سنگ‌چین" },
  ];

  // Simulated booking data for current month
  // status: available | booked | blocked | maintenance | partial
  const dayData = (day) => {
    const data = {
      1: { status: "booked", price: 2800000, who: "احمدی" },
      2: { status: "booked", price: 2800000, who: "احمدی" },
      3: { status: "booked", price: 2800000, who: "احمدی" },
      4: { status: "available", price: 2800000 },
      5: { status: "available", price: 2800000 },
      6: { status: "weekend", price: 3200000 },
      7: { status: "weekend", price: 3200000 },
      8: { status: "booked", price: 3200000, who: "موسوی" },
      9: { status: "booked", price: 3200000, who: "موسوی" },
      10: { status: "booked", price: 2800000, who: "موسوی" },
      11: { status: "booked", price: 2800000, who: "موسوی" },
      12: { status: "booked", price: 2800000, who: "موسوی" },
      13: { status: "weekend", price: 3200000 },
      14: { status: "weekend", price: 3200000 },
      15: { status: "blocked", reason: "تعمیرات" },
      16: { status: "blocked", reason: "تعمیرات" },
      17: { status: "available", price: 2800000 },
      18: { status: "available", price: 2800000 },
      19: { status: "partial-am", price: 2800000, who: "نیمه‌رزرو" },
      20: { status: "weekend", price: 3200000 },
      21: { status: "weekend", price: 3200000 },
      22: { status: "available", price: 2800000 },
      23: { status: "available", price: 2800000 },
      24: { status: "today-booked", price: 2800000, who: "فرشاد" },
      25: { status: "today", price: 2800000 },
      26: { status: "booked", price: 2800000, who: "رضایی" },
      27: { status: "weekend", price: 3200000 },
      28: { status: "weekend", price: 3200000 },
      29: { status: "maintenance", reason: "نظافت عمیق" },
      30: { status: "available", price: 2800000 },
      31: { status: "available", price: 2800000 },
    };
    return data[day] || { status: "available", price: 2800000 };
  };

  // اردیبهشت ۱۴۰۵: 31 days, starts Saturday → col 0
  const daysInMonth = 31;
  const startCol = 0; // شنبه
  const cells = [];
  for (let i = 0; i < startCol; i++) cells.push({ empty: true });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, ...dayData(d) });
  while (cells.length % 7 !== 0) cells.push({ empty: true });
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  const toggleDay = (day) => {
    if (!day) return;
    setSelected(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
  };

  const dayClass = (cell) => {
    const cls = ["cal-day"];
    if (cell.empty) cls.push("empty");
    if (cell.status === "booked") cls.push("booked");
    if (cell.status === "blocked") cls.push("blocked");
    if (cell.status === "maintenance") cls.push("maintenance");
    if (cell.status === "partial-am") cls.push("partial-am");
    if (cell.status === "weekend") cls.push("weekend");
    if (cell.status === "today" || cell.status === "today-booked") cls.push("today");
    if (cell.status === "today-booked") cls.push("booked");
    if (selected.includes(cell.day)) cls.push("selected");
    return cls.join(" ");
  };

  const navMonth = (delta) => {
    let m = monthIdx + delta, y = year;
    if (m < 0) { m = 11; y -= 1; }
    if (m > 11) { m = 0; y += 1; }
    setMonthIdx(m); setYear(y);
    setSelected([]);
  };

  return (
    <OwnerShell active="calendar" title="تقویم رزرو" crumb="تقویم">
      {/* Toolbar */}
      <div className="calendar-toolbar">
        <div className="month-nav">
          <button className="nav" onClick={() => navMonth(-1)}>›</button>
          <div className="month-title">{persianMonths[monthIdx]} {faNum(year)}</div>
          <button className="nav" onClick={() => navMonth(1)}>‹</button>
          <button className="btn-owner btn-owner-ghost" onClick={() => { setMonthIdx(1); setYear(1405); }}>امروز</button>
        </div>
        <div className="legend" style={{marginInlineStart: "auto"}}>
          <div className="legend-item"><div className="legend-swatch available"/>قابل رزرو</div>
          <div className="legend-item"><div className="legend-swatch booked"/>رزرو شده</div>
          <div className="legend-item"><div className="legend-swatch partial"/>نیمه‌رزرو</div>
          <div className="legend-item"><div className="legend-swatch blocked"/>مسدود</div>
          <div className="legend-item"><div className="legend-swatch maintenance"/>تعمیرات</div>
        </div>
      </div>

      <div className="calendar-shell">
        <div>
          <div className="calendar-grid">
            <div className="cal-head">
              {weekDays.map(d => <div key={d}>{d}</div>)}
            </div>
            {weeks.map((week, wi) => (
              <div key={wi} className="cal-week">
                {week.map((cell, ci) => cell.empty ? (
                  <div key={ci} className="cal-day empty"/>
                ) : (
                  <div
                    key={ci}
                    className={dayClass(cell)}
                    onClick={() => toggleDay(cell.day)}
                    onMouseEnter={() => setHoverDay(cell)}
                    onMouseLeave={() => setHoverDay(null)}
                    title={cell.who ? `${cell.who} · ${faToman(cell.price)} تومان` : (cell.reason || "قابل رزرو")}
                  >
                    <div className="num">{faNum(cell.day)}</div>
                    {cell.who && <div className="px" style={{fontSize: 9, fontWeight: 600}}>{cell.who}</div>}
                    {cell.status === "available" && <div className="px">{faNum((cell.price/1000000).toFixed(1))}م</div>}
                    {cell.status === "weekend" && !cell.who && <div className="px">{faNum((cell.price/1000000).toFixed(1))}م</div>}
                    {cell.reason && <div className="px" style={{fontSize: 9}}>{cell.reason}</div>}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="owner-card" style={{marginTop: 20}}>
            <div className="owner-card-head">
              <h3>خلاصه ماه {persianMonths[monthIdx]}</h3>
            </div>
            <div className="owner-card-body">
              <div className="kpi-grid" style={{marginBottom: 0}}>
                <div className="kpi-card" style={{padding: 14}}>
                  <div className="lbl">شب رزرو شده</div>
                  <div className="val" style={{fontSize: 22}}>{faNum("۱۸")} <span style={{fontSize:12, color:"var(--neutral-500)", fontWeight:400}}>از ۳۱</span></div>
                </div>
                <div className="kpi-card" style={{padding: 14}}>
                  <div className="lbl">نرخ اشغال</div>
                  <div className="val" style={{fontSize: 22}}>{faNum("۵۸")}<span style={{fontSize:14, fontWeight:500, color:"var(--neutral-500)"}}>٪</span></div>
                </div>
                <div className="kpi-card" style={{padding: 14}}>
                  <div className="lbl">درآمد محقق‌شده</div>
                  <div className="val" style={{fontSize: 22}}>{faToman(54600000)}</div>
                </div>
                <div className="kpi-card" style={{padding: 14}}>
                  <div className="lbl">پتانسیل از دست رفته</div>
                  <div className="val" style={{fontSize: 22, color:"var(--brand-secondary)"}}>{faToman(36400000)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="cal-side">
          <div className="filter-room">
            <h4>اتاق</h4>
            {rooms.map(r => (
              <label key={r.id} className={"room-radio" + (room === r.id ? " active" : "")}>
                <input type="radio" name="room" checked={room === r.id} onChange={() => setRoom(r.id)}/>
                <span className="nm">{r.label}</span>
              </label>
            ))}
          </div>

          {selected.length > 0 ? (
            <div className="block-action-card">
              <h4>{faNum(selected.length)} روز انتخاب شده</h4>
              <p>تاریخ‌های انتخابی: {selected.sort((a,b)=>a-b).map(d => faNum(d)).join("، ")} {persianMonths[monthIdx]}</p>
              <div className="btn-block-row">
                <button>🚫 مسدودسازی</button>
                <button className="outline">💰 تغییر قیمت</button>
                <button className="outline" onClick={() => setSelected([])}>لغو</button>
              </div>
            </div>
          ) : (
            <div className="filter-room">
              <h4>راهنما</h4>
              <p style={{fontSize: 12, color: "var(--neutral-500)", lineHeight: 1.7}}>
                روی روزها کلیک کنید تا انتخاب شوند. سپس می‌توانید آن‌ها را مسدود کنید، قیمت تغییر دهید یا تعمیرات ثبت کنید.
              </p>
              <div style={{marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--neutral-200)"}}>
                <h4 style={{marginBottom: 8}}>اقدامات سریع</h4>
                <button className="btn-owner btn-owner-ghost" style={{width:"100%", marginBottom:6, justifyContent:"flex-start"}}>📅 وارد کردن از ایرنبی‌بی</button>
                <button className="btn-owner btn-owner-ghost" style={{width:"100%", marginBottom:6, justifyContent:"flex-start"}}>🔄 همگام‌سازی با اتاقک</button>
                <button className="btn-owner btn-owner-ghost" style={{width:"100%", justifyContent:"flex-start"}}>📊 صدور تقویم iCal</button>
              </div>
            </div>
          )}

          <div className="filter-room">
            <h4>تعرفه فصلی</h4>
            <div style={{display:"flex", flexDirection:"column", gap:10, fontSize:13}}>
              <div style={{display:"flex", justifyContent:"space-between"}}>
                <span>روز عادی</span>
                <span style={{fontWeight:600}}>{faToman(2800000)} ﷼</span>
              </div>
              <div style={{display:"flex", justifyContent:"space-between"}}>
                <span>آخر هفته</span>
                <span style={{fontWeight:600}}>{faToman(3200000)} ﷼</span>
              </div>
              <div style={{display:"flex", justifyContent:"space-between"}}>
                <span>تعطیلات</span>
                <span style={{fontWeight:600, color:"var(--brand-secondary)"}}>{faToman(3800000)} ﷼</span>
              </div>
              <button className="btn-owner btn-owner-outline" style={{marginTop:8, width:"100%"}}>ویرایش تعرفه</button>
            </div>
          </div>
        </div>
      </div>
    </OwnerShell>
  );
}

Object.assign(window, { OwnerCalendarPage });

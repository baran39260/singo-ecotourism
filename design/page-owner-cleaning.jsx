// Owner Cleaning — room status grid + detailed checklist

function OwnerCleaningPage() {
  const [activeRoom, setActiveRoom] = React.useState("hara");
  const [activeTab, setActiveTab] = React.useState("turnover");
  const [completed, setCompleted] = React.useState({
    "bathroom-1": true, "bathroom-2": true, "bathroom-3": false,
    "linens-1": true, "linens-2": true,
    "kitchen-1": false, "kitchen-2": false,
    "common-1": true,
    "outside-1": false, "outside-2": false,
    "supplies-1": false, "supplies-2": false,
    "final-1": false, "final-2": false, "final-3": false,
  });

  const toggleCheck = (id) => setCompleted(p => ({ ...p, [id]: !p[id] }));

  const rooms = [
    { id: "stone", name: "سوئیت سنگ", status: "cleaning", staff: "فاطمه دهقانی", checkIn: "۱۵:۰۰", progress: 65 },
    { id: "double", name: "اتاق دو-تخته رو به دریا", status: "ready", staff: "—", checkIn: "—", progress: 100 },
    { id: "hara", name: "خانه چوبی حرا", status: "dirty", staff: "محول‌نشده", checkIn: "۱۷:۰۰", progress: 0 },
    { id: "window", name: "اتاق پنجره‌دار", status: "inspect", staff: "خانم نوری", checkIn: "—", progress: 95 },
    { id: "moon", name: "سوئیت ماه", status: "ready", staff: "—", checkIn: "—", progress: 100 },
    { id: "stonechin", name: "خانه سنگ‌چین", status: "dirty", staff: "محول‌نشده", checkIn: "فردا ۱۴:۰۰", progress: 0 },
  ];

  const statusLabels = { dirty: "نیاز به نظافت", cleaning: "در حال نظافت", ready: "آماده", inspect: "بازرسی" };

  // Turnover checklist sections
  const sections = [
    {
      title: "حمام و سرویس بهداشتی",
      items: [
        { id: "bathroom-1", label: "تعویض و شست‌وشوی حوله‌ها (۲ تنه + ۲ دستی)", note: "حوله‌های قبلی به سبد رخت‌چرک" },
        { id: "bathroom-2", label: "تمیز کردن کف، دیوارها و کاسه دستشویی با محلول استاندارد" },
        { id: "bathroom-3", label: "شارژ شامپو، بدنشور، صابون پنبه‌ای دست‌ساز", note: "تامین از انبار طبقه دوم" },
      ],
    },
    {
      title: "ملحفه و رختخواب",
      items: [
        { id: "linens-1", label: "تعویض ملحفه، روبالشی و کاور لحاف", note: "ست سفید — ۲۰۰ نخ" },
        { id: "linens-2", label: "بازکردن و وارسی نظم چین تخت (هتل-استایل)" },
      ],
    },
    {
      title: "آشپزخانه/مینی‌بار",
      items: [
        { id: "kitchen-1", label: "خالی کردن، شست‌وشو و خشک کردن یخچال" },
        { id: "kitchen-2", label: "بررسی و تکمیل خوراکی‌های پیشکش (خرمای پیارم، تنقلات محلی)" },
      ],
    },
    {
      title: "فضای مشترک",
      items: [
        { id: "common-1", label: "جارو و تی کشیدن کف فرش‌ها و موکت" },
      ],
    },
    {
      title: "حیاط و فضای باز",
      items: [
        { id: "outside-1", label: "نظافت تراس و چیدمان مجدد صندلی‌ها" },
        { id: "outside-2", label: "آب دادن گلدان‌های گیاه آلوئه‌ورا و شمعدانی" },
      ],
    },
    {
      title: "تامین لوازم",
      items: [
        { id: "supplies-1", label: "آب معدنی محلی (۴ بطری ۵۰۰ml)" },
        { id: "supplies-2", label: "بسته خوش‌آمدگویی + کارت دست‌نویس" },
      ],
    },
    {
      title: "بازرسی نهایی",
      items: [
        { id: "final-1", label: "تست تمام کلیدها، پنکه و کولر گازی" },
        { id: "final-2", label: "ثبت ۴ عکس از وضعیت نهایی اتاق", photo: true },
        { id: "final-3", label: "تأیید نهایی توسط مدیر شیفت" },
      ],
    },
  ];

  const totalItems = sections.reduce((a, s) => a + s.items.length, 0);
  const doneItems = Object.values(completed).filter(Boolean).length;

  return (
    <OwnerShell active="cleaning" title="نظافت و آماده‌سازی" crumb="عملیات"
      headActions={
        <>
          <button className="btn-owner btn-owner-ghost">📷 آلبوم بازرسی</button>
          <button className="btn-owner btn-owner-primary">+ کارگر جدید</button>
        </>
      }
    >
      {/* Top KPIs */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="lbl">آماده پذیرایی</div>
          <div className="val">{faNum("۲")} <span style={{fontSize:13, color:"var(--neutral-500)", fontWeight:500}}>از ۸ اتاق</span></div>
          <div className="delta up">✓ خروج‌های امروز کامل شد</div>
        </div>
        <div className="kpi-card">
          <div className="lbl">در حال نظافت</div>
          <div className="val">{faNum("۱")}</div>
          <div className="delta" style={{color:"var(--brand-secondary)"}}>سوئیت سنگ — ۶۵٪</div>
        </div>
        <div className="kpi-card">
          <div className="lbl">نیاز به نظافت</div>
          <div className="val" style={{color:"#B91C1C"}}>{faNum("۲")}</div>
          <div className="delta down">⚠ خانه حرا تا ۱۷:۰۰</div>
        </div>
        <div className="kpi-card">
          <div className="lbl">میانگین زمان نظافت</div>
          <div className="val">{faNum("۹۲")}<span style={{fontSize:14, color:"var(--neutral-500)", fontWeight:500}}> دقیقه</span></div>
          <div className="delta up">▼ {faNum("۸")} دقیقه از ماه قبل</div>
        </div>
      </div>

      {/* Room status grid */}
      <h3 style={{fontSize:16, fontWeight:700, marginBottom:14, marginTop:8}}>وضعیت اتاق‌ها</h3>
      <div className="cleaning-rooms-grid">
        {rooms.map(r => (
          <div key={r.id} className="room-status-card" onClick={() => setActiveRoom(r.id)} style={activeRoom === r.id ? { borderColor: "var(--brand-primary)", boxShadow: "0 0 0 2px var(--brand-primary-soft)" } : {}}>
            <div className="head">
              <h4>{r.name}</h4>
              <span className={"status-pill " + r.status}>{statusLabels[r.status]}</span>
            </div>
            <div className="body-row">
              <div>👤 {r.staff}</div>
              <div>🕐 ورود مهمان: {r.checkIn}</div>
            </div>
            <div className="progress-track"><div className="progress-fill" style={{width: r.progress + "%", background: r.status === "ready" ? "var(--success)" : r.status === "dirty" ? "#DC2626" : "var(--brand-primary)"}}/></div>
            <div style={{display:"flex", justifyContent:"space-between", fontSize:11, color:"var(--neutral-500)"}}>
              <span>پیشرفت</span>
              <span style={{fontWeight:700}}>{faNum(r.progress)}٪</span>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed checklist for selected room */}
      <div className="checklist-shell">
        <div className="owner-card-head" style={{borderBottom:"1px solid var(--neutral-200)"}}>
          <div>
            <h3>چک‌لیست: {rooms.find(r => r.id === activeRoom)?.name}</h3>
            <div className="sub">آماده‌سازی برای ورود مهمان جدید · زمان تخمینی: ۹۰ دقیقه</div>
          </div>
          <div className="actions">
            <span className="status-pill cleaning">{faNum(doneItems)} از {faNum(totalItems)}</span>
            <button className="btn-owner btn-owner-ghost">📋 چاپ</button>
            <button className="btn-owner btn-owner-primary">ثبت تمام شد</button>
          </div>
        </div>

        <div className="checklist-tabs">
          <div className={"checklist-tab" + (activeTab === "turnover" ? " active" : "")} onClick={() => setActiveTab("turnover")}>
            بین دو مهمان <span className="ct">{faNum(totalItems)}</span>
          </div>
          <div className={"checklist-tab" + (activeTab === "deep" ? " active" : "")} onClick={() => setActiveTab("deep")}>
            نظافت عمیق <span className="ct">{faNum("۲۸")}</span>
          </div>
          <div className={"checklist-tab" + (activeTab === "linens" ? " active" : "")} onClick={() => setActiveTab("linens")}>
            موجودی ملحفه <span className="ct">{faNum("۸")}</span>
          </div>
          <div className={"checklist-tab" + (activeTab === "issues" ? " active" : "")} onClick={() => setActiveTab("issues")}>
            ثبت خرابی <span className="ct">{faNum("۱")}</span>
          </div>
        </div>

        {sections.map(sec => (
          <div key={sec.title} className="check-section">
            <h4>{sec.title}</h4>
            {sec.items.map(item => (
              <div key={item.id} className={"check-row" + (completed[item.id] ? " done" : "")}>
                <div className="check-box" onClick={() => toggleCheck(item.id)}>
                  {completed[item.id] && "✓"}
                </div>
                <div style={{flex: 1}}>
                  <div className="ct-label">{item.label}</div>
                  {item.note && <div className="ct-meta">{item.note}</div>}
                </div>
                {item.photo && <button className="photo-btn">📷 افزودن عکس</button>}
              </div>
            ))}
          </div>
        ))}

        <div className="check-section" style={{background:"#FAFAFA"}}>
          <h4>یادداشت برای شیفت بعد</h4>
          <textarea
            placeholder="مثلاً: سشوار اتاق در حال صدا زدن است، نیاز به سرویس..."
            style={{width:"100%", minHeight:80, padding:12, borderRadius:8, border:"1px solid var(--neutral-200)", fontFamily:"inherit", fontSize:13, resize:"vertical"}}
          />
        </div>
      </div>
    </OwnerShell>
  );
}

Object.assign(window, { OwnerCleaningPage });

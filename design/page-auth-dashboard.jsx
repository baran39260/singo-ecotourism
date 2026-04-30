// Login (with OTP), Dashboard

function LoginPage() {
  const [step, setStep] = React.useState("phone"); // phone | otp
  const [phone, setPhone] = React.useState("");
  const [otp, setOtp] = React.useState(["","","","",""]);
  const [timer, setTimer] = React.useState(60);
  const inputs = React.useRef([]);

  React.useEffect(() => {
    if (step !== "otp" || timer <= 0) return;
    const t = setTimeout(() => setTimer(timer - 1), 1000);
    return () => clearTimeout(t);
  }, [step, timer]);

  const submitPhone = (e) => {
    e.preventDefault();
    setStep("otp");
    setTimer(60);
    setTimeout(() => inputs.current[0]?.focus(), 100);
  };

  const handleOtpChange = (i, v) => {
    if (!/^\d?$/.test(v)) return;
    const newOtp = [...otp];
    newOtp[i] = v;
    setOtp(newOtp);
    if (v && i < 4) inputs.current[i+1]?.focus();
    if (newOtp.every(d => d) && newOtp.join("").length === 5) {
      setTimeout(() => { window.location.href = "dashboard.html"; }, 400);
    }
  };

  const handleKey = (i, e) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) inputs.current[i-1]?.focus();
  };

  return (
    <>
      <Header tweaks={{}}/>
      <div className="auth-page">
        <div className="auth-card">
          {step === "phone" && (
            <>
              <h2>ورود یا ثبت‌نام</h2>
              <p className="lead">شماره موبایل خود را وارد کنید. کد تأیید ارسال می‌شود.</p>
              <form onSubmit={submitPhone}>
                <div className="form-group">
                  <label>شماره موبایل</label>
                  <input
                    type="tel" required
                    placeholder="۰۹۱۲ ۳۴۵ ۶۷۸۹"
                    dir="ltr" style={{textAlign:"right"}}
                    value={phone}
                    onChange={(e)=>setPhone(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">دریافت کد تأیید</button>
              </form>
              <div className="auth-divider">یا</div>
              <button className="btn btn-ghost btn-block" style={{display:"flex", gap:10, justifyContent:"center"}}>
                <span>🔐</span> ورود با گوگل
              </button>
              <p style={{fontSize:12, color:"var(--neutral-500)", textAlign:"center", marginTop:20, lineHeight:1.7}}>
                با ورود، با <a href="#" style={{color:"var(--brand-primary)"}}>قوانین استفاده</a> و <a href="#" style={{color:"var(--brand-primary)"}}>حریم خصوصی</a> سنگ سیاه موافقت می‌کنید.
              </p>
            </>
          )}
          {step === "otp" && (
            <>
              <button onClick={()=>setStep("phone")} style={{marginBottom:16, fontSize:13, color:"var(--neutral-500)"}}>← بازگشت</button>
              <h2>کد تأیید را وارد کنید</h2>
              <p className="lead">کد ۵ رقمی به شماره <span dir="ltr" style={{fontWeight:600, color:"var(--brand-ink)"}}>{phone || "۰۹۱۲ ۳۴۵ ۶۷۸۹"}</span> ارسال شد.</p>
              <div className="otp-row">
                {otp.map((d, i) => (
                  <input
                    key={i}
                    ref={el => inputs.current[i] = el}
                    type="text" inputMode="numeric" maxLength="1"
                    className={"otp-cell" + (d ? " filled" : "")}
                    value={d}
                    onChange={(e)=>handleOtpChange(i, e.target.value)}
                    onKeyDown={(e)=>handleKey(i, e)}
                  />
                ))}
              </div>
              <div className="timer-row">
                {timer > 0 ? (
                  <span>ارسال مجدد کد تا <span dir="ltr" style={{fontWeight:700, color:"var(--brand-primary)"}}>{Math.floor(timer/60)}:{String(timer%60).padStart(2,"0")}</span></span>
                ) : (
                  <button onClick={()=>setTimer(60)} style={{color:"var(--brand-primary)", fontWeight:600}}>ارسال مجدد کد</button>
                )}
              </div>
              <button onClick={()=>{ if(otp.every(d=>d)) window.location.href = "dashboard.html"; }} className="btn btn-primary btn-block">تأیید و ورود</button>
              <p style={{fontSize:12, color:"var(--neutral-500)", textAlign:"center", marginTop:16}}>کد را دریافت نکردید؟ <a href="#" style={{color:"var(--brand-primary)"}}>راهنمایی</a></p>
            </>
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
}

// =================== DASHBOARD ===================
function DashboardPage() {
  const [tab, setTab] = React.useState("bookings");
  const bookings = [
    { id:"SS-3892AC", room:"سوئیت سنگ", img:"https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=80", date:"۲۵ - ۲۸ اردیبهشت ۱۴۰۵", guests:"۲ بزرگسال", price:"۸٫۴۰۰٫۰۰۰", status:"confirmed", statusLabel:"تأیید شده" },
    { id:"SS-3712BF", room:"خانه چوبی حرا", img:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80", date:"۱۲ - ۱۵ خرداد ۱۴۰۵", guests:"۴ نفره", price:"۱۲٫۶۰۰٫۰۰۰", status:"pending", statusLabel:"در انتظار پرداخت" },
    { id:"SS-3501XY", room:"اتاق دو-تخته رو به دریا", img:"https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400&q=80", date:"۸ - ۱۰ فروردین ۱۴۰۵", guests:"۲ بزرگسال", price:"۳٫۸۰۰٫۰۰۰", status:"completed", statusLabel:"اتمام یافته" },
    { id:"SS-3208DD", room:"سوئیت ماه", img:"https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&q=80", date:"۲۰ - ۲۲ بهمن ۱۴۰۴", guests:"۲ بزرگسال + ۱ کودک", price:"۶٫۴۰۰٫۰۰۰", status:"cancelled", statusLabel:"لغو شده" },
  ];

  return (
    <>
      <Header tweaks={{}}/>
      <div className="container">
        <div className="dash-layout">
          <aside className="dash-aside">
            <div className="dash-user">
              <div className="av">ن</div>
              <div>
                <h5>نازنین فرشاد</h5>
                <div className="ph" dir="ltr">+98 912 345 6789</div>
              </div>
            </div>
            <nav className="dash-nav">
              <a className={tab==="bookings" ? "active" : ""} onClick={()=>setTab("bookings")}>📅 رزروهای من</a>
              <a className={tab==="favorites" ? "active" : ""} onClick={()=>setTab("favorites")}>♥ علاقه‌مندی‌ها</a>
              <a className={tab==="reviews" ? "active" : ""} onClick={()=>setTab("reviews")}>⭐ نظرات من</a>
              <a className={tab==="profile" ? "active" : ""} onClick={()=>setTab("profile")}>👤 پروفایل</a>
              <a className={tab==="payment" ? "active" : ""} onClick={()=>setTab("payment")}>💳 روش پرداخت</a>
              <a style={{marginTop:8, color:"var(--danger)"}}>↪ خروج</a>
            </nav>
          </aside>

          <main className="dash-main">
            {tab === "bookings" && (
              <>
                <h2>رزروهای من</h2>
                <p className="sub">همه رزروهای شما، فعال و گذشته.</p>
                <div className="stat-row">
                  <div className="stat-mini" style={{borderColor:"var(--brand-primary)", background:"var(--brand-primary-soft)"}}>
                    <div className="lbl">رزرو فعال</div>
                    <div className="val" style={{color:"var(--brand-primary)"}}>۲</div>
                  </div>
                  <div className="stat-mini">
                    <div className="lbl">شب اقامت</div>
                    <div className="val">۱۸</div>
                  </div>
                  <div className="stat-mini">
                    <div className="lbl">جایزه وفاداری</div>
                    <div className="val">۲٫۴۰۰ امتیاز</div>
                  </div>
                  <div className="stat-mini">
                    <div className="lbl">سطح</div>
                    <div className="val" style={{color:"var(--brand-primary)"}}>طلایی</div>
                  </div>
                </div>
                <div style={{display:"flex", gap:8, marginBottom:20, flexWrap:"wrap"}}>
                  <button className="chip active">همه</button>
                  <button className="chip">فعال</button>
                  <button className="chip">اتمام یافته</button>
                  <button className="chip">لغو شده</button>
                </div>
                {bookings.map(b => (
                  <div key={b.id} className="booking-row">
                    <img src={b.img} alt={b.room}/>
                    <div>
                      <h5>{b.room}</h5>
                      <div className="row-meta">
                        <span>کد: {b.id}</span>
                        <span>·</span>
                        <span>{b.date}</span>
                        <span>·</span>
                        <span>{b.guests}</span>
                      </div>
                      <div style={{marginTop:8, display:"flex", gap:8, alignItems:"center"}}>
                        <span className={"status-tag " + b.status}>{b.statusLabel}</span>
                        <span style={{fontSize:13, fontWeight:600}}>{b.price} <span style={{color:"var(--neutral-500)", fontWeight:400}}>تومان</span></span>
                      </div>
                    </div>
                    <div style={{display:"flex", flexDirection:"column", gap:6}}>
                      <button className="btn btn-ghost btn-sm">جزئیات</button>
                      {b.status === "pending" && <button className="btn btn-primary btn-sm">پرداخت</button>}
                      {b.status === "completed" && <button className="btn btn-ghost btn-sm">ثبت نظر</button>}
                    </div>
                  </div>
                ))}
              </>
            )}

            {tab === "favorites" && (
              <>
                <h2>علاقه‌مندی‌ها</h2>
                <p className="sub">اتاق‌ها و جاذبه‌هایی که برای بعد ذخیره کرده‌اید.</p>
                <div style={{display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap:16}}>
                  {[
                    {n:"خانه چوبی حرا", img:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80", price:"۴٫۲۰۰٫۰۰۰"},
                    {n:"سوئیت ماه", img:"https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=80", price:"۳٫۲۰۰٫۰۰۰"},
                  ].map((r,i) => (
                    <div key={i} style={{background:"white", border:"1px solid var(--neutral-200)", borderRadius:"var(--r-lg)", overflow:"hidden"}}>
                      <img src={r.img} style={{width:"100%", aspectRatio:"4/3", objectFit:"cover"}}/>
                      <div style={{padding:16}}>
                        <h5 style={{fontSize:15, fontWeight:600}}>{r.n}</h5>
                        <div style={{fontSize:13, color:"var(--neutral-500)", marginTop:4}}>{r.price} تومان / شب</div>
                        <a href="rooms.html" className="btn btn-primary btn-sm" style={{marginTop:10, display:"inline-flex"}}>رزرو</a>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {tab === "reviews" && (
              <>
                <h2>نظرات من</h2>
                <p className="sub">۳ نظر ثبت‌شده.</p>
                <div className="review-card">
                  <div className="head">
                    <div style={{width:40, height:40, borderRadius:"50%", background:"var(--brand-primary-soft)", color:"var(--brand-primary)", display:"grid", placeItems:"center", fontWeight:700}}>س</div>
                    <div>
                      <div style={{fontWeight:600}}>سوئیت سنگ</div>
                      <div style={{fontSize:12, color:"var(--neutral-500)"}}>اقامت در فروردین ۱۴۰۵</div>
                    </div>
                    <div style={{marginInlineStart:"auto"}}><IconStarFlat/> ۵٫۰</div>
                  </div>
                  <p style={{fontSize:14, color:"var(--neutral-700)", lineHeight:1.8}}>یکی از بهترین تجربه‌های اقامتی عمرم. تراس رو به دریا، صبحانه عالی، و میزبانی فاطمه‌خانم را هیچ‌وقت فراموش نمی‌کنم.</p>
                </div>
              </>
            )}

            {tab === "profile" && (
              <>
                <h2>پروفایل</h2>
                <p className="sub">اطلاعات شخصی شما.</p>
                <div style={{maxWidth:520}}>
                  <div className="form-row">
                    <div className="form-group"><label>نام</label><input defaultValue="نازنین"/></div>
                    <div className="form-group"><label>نام خانوادگی</label><input defaultValue="فرشاد"/></div>
                  </div>
                  <div className="form-group"><label>ایمیل</label><input type="email" defaultValue="nazanin@example.com"/></div>
                  <div className="form-group"><label>شماره موبایل</label><input dir="ltr" defaultValue="+98 912 345 6789"/></div>
                  <div className="form-group"><label>کد ملی</label><input dir="ltr" defaultValue="0012345678"/></div>
                  <button className="btn btn-primary">ذخیره تغییرات</button>
                </div>
              </>
            )}

            {tab === "payment" && (
              <>
                <h2>روش‌های پرداخت</h2>
                <p className="sub">کارت‌ها و کیف پول‌های ذخیره‌شده.</p>
                <div style={{display:"flex", flexDirection:"column", gap:12, maxWidth:520}}>
                  <div style={{padding:18, background:"linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-deep) 100%)", color:"white", borderRadius:"var(--r-lg)"}}>
                    <div style={{fontSize:11, opacity:0.8, letterSpacing:"0.1em"}}>کارت ملت</div>
                    <div style={{fontSize:18, fontFamily:"monospace", marginTop:14, letterSpacing:"0.1em"}} dir="ltr">**** **** **** 4892</div>
                    <div style={{display:"flex", justifyContent:"space-between", marginTop:14, fontSize:12}}><span>نازنین فرشاد</span><span>۰۸/۰۷</span></div>
                  </div>
                  <button className="btn btn-ghost" style={{borderStyle:"dashed"}}>+ افزودن کارت جدید</button>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
      <Footer/>
    </>
  );
}

Object.assign(window, { LoginPage, DashboardPage });

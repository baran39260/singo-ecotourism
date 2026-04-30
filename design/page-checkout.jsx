// Checkout page (3 steps)

function CheckoutPage() {
  const [step, setStep] = React.useState(1);
  const [addons, setAddons] = React.useState({breakfast: 2, mangrove: 0, beach: 0, transfer: 0});
  const setAd = (k, v) => setAddons(a => ({...a, [k]: Math.max(0, v)}));

  const addonList = [
    { k: "breakfast", name: "صبحانه محلی قشمی", desc: "نان تازه، خرما، خاگینه ماهی، چای", price: 350000, unit: "نفر / روز", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80&auto=format&fit=crop"},
    { k: "mangrove", name: "تور قایق به جنگل حرا", desc: "۲ ساعت، با راهنمای محلی", price: 1200000, unit: "هر قایق", img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80&auto=format&fit=crop"},
    { k: "beach", name: "شام روی ساحل", desc: "ماهی تازه روی ذغال، با هماهنگی قبلی", price: 850000, unit: "نفر", img: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=400&q=80&auto=format&fit=crop"},
    { k: "transfer", name: "ترانسفر فرودگاه قشم", desc: "خودروی اختصاصی، یک طرفه", price: 400000, unit: "یک طرفه", img: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=80&auto=format&fit=crop"},
  ];

  const addonsTotal = addonList.reduce((s, a) => s + a.price * addons[a.k], 0);
  const roomTotal = 8400000;
  const tax = Math.round((roomTotal + addonsTotal) * 0.09);
  const discount = 100000;
  const grand = roomTotal + addonsTotal + tax - discount;
  const fmt = (n) => fa(n.toLocaleString("en-US"));

  return (
    <>
      <Header tweaks={{}}/>
      <div className="checkout-page container">
        <div className="stepper">
          <div className={"step-pill" + (step >= 1 ? (step > 1 ? " done" : " active") : "")}>
            <span className="num">{step > 1 ? "✓" : fa(1)}</span> اطلاعات میهمان
          </div>
          <span className="step-divider"/>
          <div className={"step-pill" + (step >= 2 ? (step > 2 ? " done" : " active") : "")}>
            <span className="num">{step > 2 ? "✓" : fa(2)}</span> خدمات اضافه
          </div>
          <span className="step-divider"/>
          <div className={"step-pill" + (step >= 3 ? " active" : "")}>
            <span className="num">{fa(3)}</span> پرداخت
          </div>
        </div>

        <div className="checkout-layout">
          <div className="checkout-form">
            {step === 1 && (
              <>
                <h3 className="t-h2">اطلاعات سرپرست رزرو</h3>
                <p className="lead">طبق قانون ایران، ثبت کد ملی الزامی است (سامانه پلیس اماکن).</p>
                <div className="form-row">
                  <div className="form-group">
                    <label>نام و نام خانوادگی</label>
                    <input className="input" placeholder="مثال: نیلوفر کریمی"/>
                  </div>
                  <div className="form-group">
                    <label>کد ملی</label>
                    <div className="input-with-check">
                      <input className="input" dir="ltr" placeholder="۱۰ رقم" defaultValue="0012345678"/>
                      <span className="check-mark"><IconCheck size={16}/></span>
                    </div>
                    <span className="helper">کد ملی معتبر است</span>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>شماره موبایل</label>
                    <div className="input-with-check">
                      <input className="input" dir="ltr" defaultValue="09123456789" disabled/>
                      <span className="check-mark"><IconCheck size={16}/></span>
                    </div>
                    <span className="helper">تأیید شده</span>
                  </div>
                  <div className="form-group">
                    <label>ایمیل (اختیاری)</label>
                    <input className="input" type="email" dir="ltr" placeholder="you@example.com"/>
                  </div>
                </div>

                <h3 className="t-h2 mt-12">میهمانان همراه</h3>
                <p className="lead">لطفاً اطلاعات هر میهمان را وارد کنید.</p>
                <div className="form-row">
                  <div className="form-group">
                    <label>نام میهمان دوم</label>
                    <input className="input" placeholder="نام و نام خانوادگی"/>
                  </div>
                  <div className="form-group">
                    <label>کد ملی</label>
                    <input className="input" dir="ltr" placeholder="۱۰ رقم"/>
                  </div>
                </div>
                <button className="btn btn-ghost btn-sm" style={{color: "var(--brand-primary)"}}><IconPlus size={14}/> افزودن میهمان</button>

                <h3 className="t-h2 mt-12">ساعت ورود</h3>
                <div className="chip-row" style={{marginTop: 12}}>
                  {["۱۴–۱۶","۱۶–۱۸","۱۸–۲۰","بعد از ۲۰"].map((t, i) => (
                    <button key={i} className={"chip" + (i === 1 ? " active" : "")}>{t}</button>
                  ))}
                </div>

                <div className="form-group mt-8">
                  <label>درخواست‌های ویژه (اختیاری)</label>
                  <textarea className="input" style={{height: 100, padding: 12, resize: "vertical", fontFamily: "inherit"}} placeholder="مثلاً: تخت اضافه برای کودک، رژیم گیاه‌خواری، ..."></textarea>
                </div>

                <div style={{display: "flex", gap: 10, justifyContent: "space-between", marginTop: 32}}>
                  <a href="room.html" className="btn btn-ghost"><IconChevron size={16}/> بازگشت</a>
                  <button className="btn btn-primary btn-lg" onClick={() => setStep(2)}>ادامه ←</button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h3 className="t-h2">خدمات اضافه</h3>
                <p className="lead">به اقامتت تجربه‌های محلی اضافه کن — کاملاً اختیاری.</p>
                <div className="addon-checkout-grid">
                  {addonList.map(a => (
                    <div key={a.k} className={"addon-co" + (addons[a.k] > 0 ? " selected" : "")}>
                      <img src={a.img} alt={a.name}/>
                      <div className="body">
                        <h5>{a.name}</h5>
                        <p className="desc">{a.desc}</p>
                        <div className="foot">
                          <span className="price">{fmt(a.price)} / {a.unit}</span>
                          <div className="stepper-mini">
                            <button onClick={() => setAd(a.k, addons[a.k] - 1)}><IconMinus size={12}/></button>
                            <span className="v">{fa(addons[a.k])}</span>
                            <button onClick={() => setAd(a.k, addons[a.k] + 1)}><IconPlus size={12}/></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{display: "flex", gap: 10, justifyContent: "space-between", marginTop: 32}}>
                  <button className="btn btn-ghost" onClick={() => setStep(1)}><IconChevron size={16}/> بازگشت</button>
                  <button className="btn btn-primary btn-lg" onClick={() => setStep(3)}>ادامه به پرداخت ←</button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h3 className="t-h2">پرداخت امن</h3>
                <p className="lead">پرداخت از طریق درگاه زرین‌پال انجام می‌شود.</p>

                <div className="payment-box">
                  <div style={{width: 56, height: 56, background: "white", borderRadius: 12, display: "grid", placeItems: "center", flexShrink: 0}}>
                    <div style={{fontWeight: 800, fontSize: 11, color: "#FFB400"}}>زرین‌پال</div>
                  </div>
                  <div>
                    <div style={{fontWeight: 600, fontSize: 14}}>زرین‌پال — درگاه پرداخت رسمی</div>
                    <div className="t-caption">SSL ۲۵۶ بیتی · مورد تأیید بانک مرکزی</div>
                  </div>
                </div>

                <div className="calc-box" style={{borderTop: "none", paddingTop: 0}}>
                  <div className="row"><span>اقامت ۳ شب</span><span>{fmt(roomTotal)}</span></div>
                  {addonsTotal > 0 && <div className="row"><span>خدمات اضافه</span><span>{fmt(addonsTotal)}</span></div>}
                  <div className="row"><span>مالیات ارزش افزوده گردشگری ۹٪</span><span>{fmt(tax)}</span></div>
                  <div className="row discount"><span>تخفیف عضویت</span><span>−{fmt(discount)}</span></div>
                  <div className="row total"><span>مبلغ قابل پرداخت</span><span>{fmt(grand)} تومان</span></div>
                </div>

                <div className="t-caption mt-4" style={{padding: 12, background: "var(--brand-primary-soft)", borderRadius: 8, color: "var(--brand-primary)"}}>
                  📑 فاکتور رسمی الکترونیکی پس از تأیید پرداخت از طریق سامانه مؤدیان برای شما ارسال خواهد شد.
                </div>

                <div style={{marginTop: 20}}>
                  <label className="checkbox-row"><input type="checkbox" defaultChecked/> <span>قوانین رزرو و سیاست لغو را خوانده‌ام و می‌پذیرم.</span></label>
                  <label className="checkbox-row"><input type="checkbox" defaultChecked/> <span>صحت اطلاعات کد ملی میهمانان را تأیید می‌کنم.</span></label>
                  <label className="checkbox-row"><input type="checkbox"/> <span>تمایل به دریافت پیشنهادهای ویژه دارم.</span></label>
                </div>

                <div style={{display: "flex", gap: 10, justifyContent: "space-between", marginTop: 24}}>
                  <button className="btn btn-ghost" onClick={() => setStep(2)}><IconChevron size={16}/> بازگشت</button>
                  <a href="success.html" className="btn btn-primary btn-lg">
                    <IconShield size={16}/> پرداخت {fmt(grand)} تومان
                  </a>
                </div>

                <div className="trust-strip">
                  <span className="tag">🔒 SSL</span>
                  <span className="tag">اینماد</span>
                  <span className="tag">سامانه مؤدیان</span>
                  <span className="tag">زرین‌پال</span>
                </div>
              </>
            )}
          </div>

          <aside>
            <div className="summary-card">
              <h4 style={{fontSize: 14, fontWeight: 700, marginBottom: 16}}>خلاصه رزرو شما</h4>
              <div className="room-mini">
                <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=200&q=80&auto=format&fit=crop" alt=""/>
                <div>
                  <div style={{fontSize: 14, fontWeight: 600}}>سوئیت سنگ</div>
                  <div className="t-caption" style={{margin: 0}}>اقامتگاه سنگ سیاه · قشم</div>
                  <div style={{display: "flex", gap: 4, marginTop: 4, color: "#F59E0B", fontSize: 12}}>★ ۴٫۹</div>
                </div>
              </div>
              <div className="info-rows">
                <div className="row"><span className="label">ورود</span><span>۲۵ اردیبهشت ۱۴۰۵</span></div>
                <div className="row"><span className="label">خروج</span><span>۲۸ اردیبهشت ۱۴۰۵</span></div>
                <div className="row"><span className="label">مدت</span><span>۳ شب</span></div>
                <div className="row"><span className="label">میهمانان</span><span>۲ بزرگسال</span></div>
              </div>
              <div className="info-rows">
                <div className="row"><span>اقامت ۳ شب</span><span>{fmt(roomTotal)}</span></div>
                {addonsTotal > 0 && <div className="row"><span>خدمات اضافه</span><span>{fmt(addonsTotal)}</span></div>}
                <div className="row"><span>مالیات ۹٪</span><span>{fmt(tax)}</span></div>
                <div className="row" style={{color: "var(--success)"}}><span>تخفیف</span><span>−{fmt(discount)}</span></div>
              </div>
              <div style={{display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 17}}>
                <span>مجموع</span><span>{fmt(grand)} تومان</span>
              </div>
              <a href="room.html" style={{display: "block", textAlign: "center", marginTop: 16, color: "var(--brand-primary)", fontSize: 13}}>ویرایش رزرو</a>
            </div>
          </aside>
        </div>
      </div>
      <Footer/>
    </>
  );
}

// shield icon
const IconShield = (p) => (<Icon {...p}><path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6z"/><path d="m9 12 2 2 4-4"/></Icon>);

Object.assign(window, { CheckoutPage, IconShield });

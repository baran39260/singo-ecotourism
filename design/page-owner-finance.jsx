// Owner Finance — revenue with 9% tourism tax breakdown (مالیات گردشگری)

function OwnerFinancePage() {
  const [period, setPeriod] = React.useState("month");

  // اردیبهشت ۱۴۰۵ figures
  const grossRevenue = 28400000; // در روز
  const monthGross = 84600000;
  const cleaningFees = 4200000;
  const platformFee = 4230000; // 5%
  const tourismTax = Math.round(monthGross * 0.09);
  const taxableBase = monthGross - tourismTax;
  const netPayout = monthGross - platformFee - tourismTax;

  return (
    <OwnerShell active="finance" title="گزارش مالی" crumb="گزارش‌ها"
      headActions={
        <>
          <select className="btn-owner btn-owner-ghost" value={period} onChange={e => setPeriod(e.target.value)} style={{padding:"6px 12px"}}>
            <option value="week">این هفته</option>
            <option value="month">این ماه (اردیبهشت ۱۴۰۵)</option>
            <option value="quarter">این فصل</option>
            <option value="year">سال جاری</option>
          </select>
          <button className="btn-owner btn-owner-ghost">📊 صدور Excel</button>
          <button className="btn-owner btn-owner-primary">📥 صورت‌حساب PDF</button>
        </>
      }
    >
      {/* Top KPI row */}
      <div className="finance-kpi-row">
        <div className="finance-card accent">
          <div className="lbl">پرداخت خالص به شما</div>
          <div className="val">{faToman(netPayout)}</div>
          <div className="delta">▲ {faNum("18")}٪ نسبت به فروردین · واریز ۲۸ اردیبهشت</div>
        </div>
        <div className="finance-card">
          <div className="lbl">درآمد ناخالص</div>
          <div className="val">{faToman(monthGross)}</div>
          <div className="delta" style={{color:"var(--neutral-500)"}}>{faNum("18")} رزرو · {faNum("47")} شب</div>
        </div>
        <div className="finance-card">
          <div className="lbl">مالیات گردشگری ۹٪</div>
          <div className="val" style={{color:"#B45309"}}>{faToman(tourismTax)}</div>
          <div className="delta" style={{color:"#B45309"}}>⚠ پرداخت تا ۲۵ خرداد</div>
        </div>
        <div className="finance-card">
          <div className="lbl">میانگین قیمت شب</div>
          <div className="val">{faToman(1800000)}</div>
          <div className="delta" style={{color:"var(--success)"}}>▲ {faNum("6")}٪ از فروردین</div>
        </div>
      </div>

      {/* Tax info banner */}
      <div className="tax-banner">
        <div className="icn">!</div>
        <div style={{flex:1}}>
          <h4>مالیات گردشگری ۹٪ — قانون مالیات بر ارزش افزوده</h4>
          <p>
            بر اساس قانون مالیات بر ارزش افزوده مصوب ۱۴۰۰، اقامتگاه‌های گردشگری مشمول دریافت مالیات ۹٪ از مهمان و واریز به حساب سازمان امور مالیاتی هستند. این مبلغ به صورت خودکار از مهمان دریافت و در صورت‌حساب جداگانه نمایش داده می‌شود.
            {" "}<a href="#">آشنایی با قوانین مالیاتی اقامتگاه‌ها ↗</a>
          </p>
        </div>
      </div>

      {/* Breakdown + Monthly chart */}
      <div className="finance-grid-2">
        {/* Tax breakdown table */}
        <div className="owner-card" style={{margin:0}}>
          <div className="owner-card-head">
            <h3>تفکیک درآمد و کسورات</h3>
            <div className="sub">اردیبهشت ۱۴۰۵</div>
          </div>
          <div className="tax-breakdown">
            <div className="tax-row">
              <div className="label">درآمد ناخالص از رزرو</div>
              <div className="pct">{faNum("18")} رزرو</div>
              <div className="amt">{faToman(monthGross)} ﷼</div>
            </div>
            <div className="tax-row">
              <div className="label">هزینه نظافت دریافتی</div>
              <div className="pct">{faNum("18")} مهمان</div>
              <div className="amt">{faToman(cleaningFees)} ﷼</div>
            </div>
            <div className="tax-row">
              <div className="label">جمع درآمد قابل مالیات</div>
              <div className="pct">پایه محاسبه</div>
              <div className="amt" style={{fontWeight:700}}>{faToman(monthGross + cleaningFees)} ﷼</div>
            </div>
            <div className="tax-row tax-line">
              <div className="label tax-9">
                <span className="info-mark">!</span>
                مالیات گردشگری ({faNum("9")}٪)
              </div>
              <div className="pct">واریز به سامانه مودیان</div>
              <div className="amt" style={{color:"#B45309"}}>−{faToman(tourismTax)} ﷼</div>
            </div>
            <div className="tax-row">
              <div className="label">کارمزد پلتفرم سنگ سیاه</div>
              <div className="pct">{faNum("5")}٪ از ناخالص</div>
              <div className="amt" style={{color:"var(--neutral-700)"}}>−{faToman(platformFee)} ﷼</div>
            </div>
            <div className="tax-row">
              <div className="label">کارمزد درگاه پرداخت</div>
              <div className="pct">۰.۵٪ + کارمزد ثابت</div>
              <div className="amt" style={{color:"var(--neutral-700)"}}>−{faToman(485000)} ﷼</div>
            </div>
            <div className="tax-row total">
              <div className="label">پرداخت خالص به میزبان</div>
              <div className="pct" style={{color:"var(--success)"}}>۲۸ اردیبهشت</div>
              <div className="amt">{faToman(netPayout - 485000)} ﷼</div>
            </div>
          </div>
        </div>

        {/* Monthly chart */}
        <div className="owner-card" style={{margin:0}}>
          <div className="owner-card-head">
            <h3>روند ۶ ماه اخیر</h3>
            <div className="sub">ناخالص و مالیات</div>
          </div>
          <div className="bar-chart">
            <div className="bar-chart-rows">
              {[
                {month:"آذر", val:55, txt:"۵۵ م"},
                {month:"دی", val:62, txt:"۶۲ م"},
                {month:"بهمن", val:71, txt:"۷۱ م"},
                {month:"اسفند", val:88, txt:"۸۸ م"},
                {month:"فروردین", val:75, txt:"۷۵ م"},
                {month:"اردیبهشت", val:92, txt:"۸۴.۶ م", current: true},
              ].map(r => (
                <div key={r.month} className="bar-row">
                  <div className="month" style={r.current ? {color:"var(--brand-primary)", fontWeight:700} : {}}>{r.month}</div>
                  <div className="bar-track">
                    <div className="bar-fill tax-portion" style={{width: r.val + "%"}}/>
                  </div>
                  <div className="v">{faNum(r.txt)} ﷼</div>
                </div>
              ))}
            </div>
            <div className="legend" style={{marginTop:18, paddingTop:14, borderTop:"1px solid var(--neutral-200)"}}>
              <div className="legend-item"><div className="legend-swatch" style={{background:"#F59E0B"}}/>مالیات ۹٪</div>
              <div className="legend-item"><div className="legend-swatch" style={{background:"var(--brand-primary)"}}/>درآمد خالص</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent payouts */}
      <div className="owner-card">
        <div className="owner-card-head">
          <h3>تراکنش‌های اخیر</h3>
          <div className="actions">
            <button className="btn-owner btn-owner-ghost">فیلتر</button>
            <button className="btn-owner btn-owner-outline">مشاهده همه</button>
          </div>
        </div>
        <div className="payouts-table">
          <div className="pt-row">
            <div className="date">۲۵ اردی</div>
            <div className="desc">
              <h5>دریافت از رزرو SS-3712BF</h5>
              <small>نازنین فرشاد · سوئیت سنگ · ۳ شب</small>
            </div>
            <div className="amt in">+{faToman(8400000)} ﷼</div>
            <span className="status-pill ready">تسویه شده</span>
          </div>
          <div className="pt-row">
            <div className="date">۲۵ اردی</div>
            <div className="desc">
              <h5>دریافت از رزرو SS-3892AC</h5>
              <small>محمد رضایی · اتاق دو-تخته · ۲ شب</small>
            </div>
            <div className="amt in">+{faToman(5600000)} ﷼</div>
            <span className="status-pill ready">تسویه شده</span>
          </div>
          <div className="pt-row">
            <div className="date">۲۲ اردی</div>
            <div className="desc">
              <h5>پرداخت مالیات گردشگری فروردین</h5>
              <small>شناسه پیگیری: ۱۴۰۵۰۲۲۲-۸۸۷۲ · سامانه مودیان</small>
            </div>
            <div className="amt out">−{faToman(6750000)} ﷼</div>
            <span className="status-pill ready">پرداخت شد</span>
          </div>
          <div className="pt-row">
            <div className="date">۲۰ اردی</div>
            <div className="desc">
              <h5>دریافت از رزرو SS-3651KL</h5>
              <small>فاطمه دهقانی · خانه چوبی حرا · ۴ شب</small>
            </div>
            <div className="amt in">+{faToman(12800000)} ﷼</div>
            <span className="status-pill ready">تسویه شده</span>
          </div>
          <div className="pt-row">
            <div className="date">۱۸ اردی</div>
            <div className="desc">
              <h5>بازپرداخت لغو رزرو SS-3601MM</h5>
              <small>رضا کیانی · لغو ۴۸ ساعت قبل · ۵۰٪ بازگشت</small>
            </div>
            <div className="amt out">−{faToman(1500000)} ﷼</div>
            <span className="status-pill inspect">بازپرداخت</span>
          </div>
          <div className="pt-row">
            <div className="date">۱۵ اردی</div>
            <div className="desc">
              <h5>کارمزد ماهانه پلتفرم</h5>
              <small>۵٪ از فروش فروردین ۱۴۰۵</small>
            </div>
            <div className="amt out">−{faToman(3750000)} ﷼</div>
            <span className="status-pill ready">تسویه شده</span>
          </div>
          <div className="pt-row">
            <div className="date">۱۰ اردی</div>
            <div className="desc">
              <h5>واریز ماهانه فروردین ۱۴۰۵</h5>
              <small>به حساب بانک تجارت — کارت ****۸۸۴۲</small>
            </div>
            <div className="amt in" style={{color:"var(--brand-primary)", fontSize:14}}>+{faToman(67250000)} ﷼</div>
            <span className="status-pill ready">واریز شد</span>
          </div>
        </div>
      </div>

      {/* Bank info card */}
      <div className="finance-grid-2">
        <div className="owner-card" style={{margin:0}}>
          <div className="owner-card-head">
            <h3>اطلاعات بانکی برای واریز</h3>
            <div className="actions"><button className="btn-owner btn-owner-ghost">ویرایش</button></div>
          </div>
          <div className="owner-card-body">
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, fontSize:13}}>
              <div>
                <div style={{color:"var(--neutral-500)", fontSize:11, marginBottom:4}}>بانک</div>
                <div style={{fontWeight:600}}>بانک تجارت — شعبه قشم مرکزی</div>
              </div>
              <div>
                <div style={{color:"var(--neutral-500)", fontSize:11, marginBottom:4}}>شماره شبا</div>
                <div style={{fontWeight:600, direction:"ltr", fontFamily:"monospace"}}>IR{faNum("75")}-{faNum("0180")}-{faNum("0000")}-****-****-{faNum("8842")}</div>
              </div>
              <div>
                <div style={{color:"var(--neutral-500)", fontSize:11, marginBottom:4}}>صاحب حساب</div>
                <div style={{fontWeight:600}}>نازنین فرشاد</div>
              </div>
              <div>
                <div style={{color:"var(--neutral-500)", fontSize:11, marginBottom:4}}>کد ملی</div>
                <div style={{fontWeight:600}}>۱۲۳-***-***-۸</div>
              </div>
            </div>
          </div>
        </div>

        <div className="owner-card" style={{margin:0, background:"var(--brand-cream)"}}>
          <div className="owner-card-head" style={{borderBottomColor:"#E5DCC5"}}>
            <h3>برنامه واریز</h3>
          </div>
          <div className="owner-card-body">
            <ul style={{display:"flex", flexDirection:"column", gap:14, fontSize:13, lineHeight:1.7}}>
              <li style={{display:"flex", gap:10, alignItems:"flex-start"}}>
                <span style={{color:"var(--success)", fontSize:18}}>✓</span>
                <div><b>هر ۲۸م ماه</b> — واریز خودکار درآمد ماه قبل پس از کسر کارمزد و مالیات</div>
              </li>
              <li style={{display:"flex", gap:10, alignItems:"flex-start"}}>
                <span style={{color:"var(--brand-primary)", fontSize:18}}>i</span>
                <div><b>کسر مالیات گردشگری</b> به صورت خودکار از پرداخت ماهانه و واریز مستقیم به سامانه مودیان</div>
              </li>
              <li style={{display:"flex", gap:10, alignItems:"flex-start"}}>
                <span style={{color:"var(--brand-secondary)", fontSize:18}}>★</span>
                <div><b>پرداخت پیشرفته</b> با کارمزد ۲٪ ظرف ۲۴ ساعت در دسترس است</div>
              </li>
            </ul>
            <button className="btn-owner btn-owner-primary" style={{marginTop:14, width:"100%"}}>درخواست پرداخت پیشرفته</button>
          </div>
        </div>
      </div>
    </OwnerShell>
  );
}

Object.assign(window, { OwnerFinancePage });

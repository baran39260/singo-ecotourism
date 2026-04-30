// Owner Dashboard — KPIs, today's check-in/out timeline, quick actions, activity feed

function OwnerDashboardPage() {
  return (
    <OwnerShell
      active="dashboard"
      title="داشبورد"
      crumb="نمای کلی"
      headActions={
        <select className="btn-owner btn-owner-ghost" style={{padding: "6px 12px"}}>
          <option>۷ روز اخیر</option>
          <option>۳۰ روز اخیر</option>
          <option>این فصل</option>
        </select>
      }
    >
      {/* KPI Row */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="lbl">درآمد ۷ روز اخیر</div>
          <div className="val">{faToman(28400000)} <span style={{fontSize:14, color:"var(--neutral-500)", fontWeight:400}}>تومان</span></div>
          <div className="delta up">▲ {faNum("12")}٪ نسبت به هفته قبل</div>
          <div className="spark">
            <SparkLine values={[12, 18, 15, 22, 19, 28, 32]}/>
          </div>
        </div>
        <div className="kpi-card">
          <div className="lbl">نرخ اشغال</div>
          <div className="val">{faNum("78")}<span style={{fontSize:18, fontWeight:600, color:"var(--neutral-500)"}}>٪</span></div>
          <div className="delta up">▲ {faNum("8")}٪ نسبت به ماه قبل</div>
          <div className="spark">
            <SparkLine values={[60, 65, 70, 68, 72, 75, 78]} color="#15803D"/>
          </div>
        </div>
        <div className="kpi-card">
          <div className="lbl">رزروهای امروز</div>
          <div className="val">{faNum("۵")} <span style={{fontSize:13, color:"var(--neutral-500)", fontWeight:500}}>(۳ ورود + ۲ خروج)</span></div>
          <div className="delta up">▲ {faNum("2")} از دیروز</div>
          <div className="spark">
            <SparkLine values={[2, 3, 1, 4, 3, 5, 5]} color="#C2410C"/>
          </div>
        </div>
        <div className="kpi-card">
          <div className="lbl">امتیاز میانگین</div>
          <div className="val">{faNum("4.8")} <span style={{fontSize:14, color:"#F59E0B"}}>★</span></div>
          <div className="delta up">▲ {faNum("0.1")} این ماه</div>
          <div className="spark">
            <SparkLine values={[4.6, 4.7, 4.7, 4.8, 4.7, 4.8, 4.8]} color="#F59E0B"/>
          </div>
        </div>
      </div>

      {/* Tax warning banner */}
      <div className="tax-banner">
        <div className="icn">!</div>
        <div style={{flex:1}}>
          <h4>یادآوری مالیات گردشگری</h4>
          <p>پرداخت مالیات گردشگری ۹٪ این ماه ({faToman(2556000)} تومان) باید تا ۲۵ اردیبهشت به سامانه مودیان ارسال شود. <a href="owner-finance.html">مشاهده گزارش</a></p>
        </div>
        <button className="btn-owner btn-owner-primary" style={{background:"#F59E0B"}}>پرداخت اکنون</button>
      </div>

      <div className="owner-grid-2">
        {/* Today's check-in/out timeline */}
        <div className="owner-card">
          <div className="owner-card-head">
            <div>
              <h3>برنامه امروز</h3>
              <div className="sub">دوشنبه، ۲۵ اردیبهشت ۱۴۰۵</div>
            </div>
            <div className="actions">
              <button className="btn-owner btn-owner-ghost">چاپ</button>
              <a href="owner-calendar.html" className="btn-owner btn-owner-outline">تقویم کامل</a>
            </div>
          </div>

          <div className="owner-card-body no-pad">
            <div className="timeline-day">
              <div className="day-head">
                <h4>صبح — تا ساعت ۱۲</h4>
                <span className="ct">{faNum("۲")} رویداد</span>
              </div>
              <div className="tl-row">
                <div className="tl-time" dir="ltr">۱۰:۰۰</div>
                <div className="tl-info">
                  <h5>خروج: علی احمدی</h5>
                  <div className="tl-meta">
                    <span>اتاق دو-تخته رو به دریا</span>
                    <span>·</span>
                    <span>کد: SS-3712BF</span>
                    <span>·</span>
                    <span>۲ نفر</span>
                  </div>
                </div>
                <span className="tl-tag checkout">خروج</span>
              </div>
              <div className="tl-row">
                <div className="tl-time" dir="ltr">۱۱:۰۰</div>
                <div className="tl-info">
                  <h5>نظافت: سوئیت سنگ</h5>
                  <div className="tl-meta">
                    <span>برای ورود ساعت ۱۵:۰۰</span>
                    <span>·</span>
                    <span>محول‌شده به: فاطمه دهقانی</span>
                  </div>
                </div>
                <span className="tl-tag cleaning">نظافت</span>
              </div>
            </div>

            <div className="timeline-day">
              <div className="day-head">
                <h4>بعدازظهر — ۱۲ تا ۱۸</h4>
                <span className="ct">{faNum("۳")} رویداد</span>
              </div>
              <div className="tl-row">
                <div className="tl-time" dir="ltr">۱۴:۰۰</div>
                <div className="tl-info">
                  <h5>ورود: نازنین فرشاد + ۱ نفر</h5>
                  <div className="tl-meta">
                    <span>سوئیت سنگ</span>
                    <span>·</span>
                    <span>۳ شب</span>
                    <span>·</span>
                    <span style={{color:"var(--brand-primary)", fontWeight:600}}>ترانسفر فرودگاه: بله</span>
                  </div>
                </div>
                <span className="tl-tag checkin">ورود</span>
              </div>
              <div className="tl-row">
                <div className="tl-time" dir="ltr">۱۵:۰۰</div>
                <div className="tl-info">
                  <h5>ورود: محمد رضایی</h5>
                  <div className="tl-meta">
                    <span>اتاق دو-تخته رو به دریا</span>
                    <span>·</span>
                    <span>۲ شب</span>
                    <span>·</span>
                    <span>کد: SS-3892AC</span>
                  </div>
                </div>
                <span className="tl-tag checkin">ورود</span>
              </div>
              <div className="tl-row">
                <div className="tl-time" dir="ltr">۱۷:۰۰</div>
                <div className="tl-info">
                  <h5>ورود: خانواده موسوی (۴ نفره)</h5>
                  <div className="tl-meta">
                    <span>خانه چوبی حرا</span>
                    <span>·</span>
                    <span>۵ شب</span>
                    <span>·</span>
                    <span style={{color:"var(--brand-secondary)", fontWeight:600}}>درخواست شام: بله</span>
                  </div>
                </div>
                <span className="tl-tag checkin">ورود</span>
              </div>
            </div>

            <div className="timeline-day">
              <div className="day-head">
                <h4>عصر — بعد از ۱۸</h4>
                <span className="ct">{faNum("۱")} رویداد</span>
              </div>
              <div className="tl-row">
                <div className="tl-time" dir="ltr">۱۹:۳۰</div>
                <div className="tl-info">
                  <h5>تور غروب جنگل حرا</h5>
                  <div className="tl-meta">
                    <span>۶ نفر شرکت‌کننده</span>
                    <span>·</span>
                    <span>راهنما: محمد طهماسبی</span>
                  </div>
                </div>
                <span className="tl-tag" style={{background:"#FEF3C7", color:"#92400E"}}>تور</span>
              </div>
            </div>
          </div>
        </div>

        {/* Side: quick actions + activity feed */}
        <div>
          <div className="owner-card">
            <div className="owner-card-head"><h3>اقدامات سریع</h3></div>
            <div className="owner-card-body">
              <div className="qa-grid">
                <div className="qa-tile">
                  <div className="icn">+</div>
                  <h5>رزرو دستی</h5>
                  <p>ثبت مهمان واکین</p>
                </div>
                <div className="qa-tile">
                  <div className="icn">🚫</div>
                  <h5>مسدودسازی تاریخ</h5>
                  <p>برای تعمیرات یا بستگان</p>
                </div>
                <div className="qa-tile">
                  <div className="icn">💰</div>
                  <h5>تعرفه فصلی</h5>
                  <p>ویرایش قیمت‌ها</p>
                </div>
                <div className="qa-tile">
                  <div className="icn">📊</div>
                  <h5>گزارش امروز</h5>
                  <p>صدور PDF</p>
                </div>
              </div>
            </div>
          </div>

          <div className="owner-card">
            <div className="owner-card-head">
              <h3>فعالیت‌های اخیر</h3>
              <div className="actions"><button className="btn-owner btn-owner-ghost" style={{padding:"4px 8px"}}>همه</button></div>
            </div>
            <div className="activity-row">
              <div className="ic">✓</div>
              <div className="body">
                <p><b>رزرو جدید</b> توسط نازنین فرشاد برای سوئیت سنگ</p>
                <div className="ts">۱۲ دقیقه پیش · {faToman(8400000)} تومان</div>
              </div>
            </div>
            <div className="activity-row">
              <div className="ic" style={{background:"#FEF3C7", color:"#92400E"}}>★</div>
              <div className="body">
                <p><b>نظر جدید</b> از محمد رضایی — ۵ ستاره برای اتاق دو-تخته</p>
                <div className="ts">۱ ساعت پیش</div>
              </div>
            </div>
            <div className="activity-row">
              <div className="ic" style={{background:"#DBEAFE", color:"#1E40AF"}}>💬</div>
              <div className="body">
                <p><b>پیام جدید</b> از خانواده موسوی در واتس‌اپ</p>
                <div className="ts">۲ ساعت پیش</div>
              </div>
            </div>
            <div className="activity-row">
              <div className="ic" style={{background:"#FEE2E2", color:"#B91C1C"}}>✕</div>
              <div className="body">
                <p><b>لغو رزرو</b> توسط رضا کیانی برای ۲۸ اردیبهشت</p>
                <div className="ts">۴ ساعت پیش · بازپرداخت {faToman(1500000)} تومان</div>
              </div>
            </div>
            <div className="activity-row">
              <div className="ic">💳</div>
              <div className="body">
                <p><b>پرداخت تأیید شد</b> برای رزرو SS-3892AC</p>
                <div className="ts">دیروز ۲۲:۴۸ · {faToman(3800000)} تومان</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: 7-day occupancy chart */}
      <div className="owner-card">
        <div className="owner-card-head">
          <h3>اشغال ۷ روز اخیر به تفکیک اتاق</h3>
        </div>
        <div className="bar-chart">
          <div className="bar-chart-rows">
            {[
              {name:"سوئیت سنگ", val:100, txt:"۷ از ۷ شب"},
              {name:"اتاق دو-تخته رو به دریا", val:86, txt:"۶ از ۷ شب"},
              {name:"خانه چوبی حرا", val:71, txt:"۵ از ۷ شب"},
              {name:"اتاق پنجره‌دار", val:71, txt:"۵ از ۷ شب"},
              {name:"سوئیت ماه", val:57, txt:"۴ از ۷ شب"},
              {name:"خانه سنگ‌چین", val:71, txt:"۵ از ۷ شب"},
            ].map(r => (
              <div key={r.name} className="bar-row" style={{gridTemplateColumns:"180px 1fr 100px"}}>
                <div className="month" style={{fontSize:13, color:"var(--brand-ink)"}}>{r.name}</div>
                <div className="bar-track">
                  <div className="bar-fill" style={{width: r.val + "%"}}/>
                </div>
                <div className="v">{r.txt}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </OwnerShell>
  );
}

Object.assign(window, { OwnerDashboardPage });

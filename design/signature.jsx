// Singo Signature — Eco badges, empty states, 404, toasts, onboarding tooltips

// ============ ECO BADGE ============
// Combined: leaf icon + tooltip + Eco Score (A/B/C)
// Usage: <EcoBadge score="A" reasons={["solar power", "local materials"]} />
function EcoBadge({ score = "A", reasons = [], variant = "compact", intensity }) {
  const [open, setOpen] = React.useState(false);
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    const handler = () => setTick(t => t + 1);
    window.addEventListener("eco-intensity-changed", handler);
    return () => window.removeEventListener("eco-intensity-changed", handler);
  }, []);
  const colors = {
    A: { bg: "rgba(34,197,94,0.12)", border: "rgba(34,197,94,0.5)", text: "#15803d", label: "ممتاز" },
    B: { bg: "rgba(132,204,22,0.12)", border: "rgba(132,204,22,0.5)", text: "#4d7c0f", label: "خوب" },
    C: { bg: "rgba(234,179,8,0.12)", border: "rgba(234,179,8,0.5)", text: "#a16207", label: "متوسط" },
  };
  const c = colors[score] || colors.A;
  // Resolve intensity from prop or CSS var
  const resolvedIntensity = intensity !== undefined
    ? intensity
    : (typeof document !== "undefined"
        ? parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--eco-intensity") || "1")
        : 1);
  if (resolvedIntensity === 0) return null;

  if (variant === "compact") {
    return (
      <span
        className="eco-badge eco-badge-compact"
        style={{
          background: c.bg,
          borderColor: c.border,
          color: c.text,
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={() => setOpen(!open)}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2c-2 8 4 12 8 14-4 1-8-2-8-2-2 8-7 7-8 6 1-2 4-3 4-7 0-6 4-11 4-11Z"/>
        </svg>
        <span className="eco-score">{score}</span>
        {open && (
          <span className="eco-tooltip">
            <strong>سازگار با محیط زیست — {c.label}</strong>
            {reasons.length > 0 && (
              <ul>
                {reasons.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            )}
          </span>
        )}
      </span>
    );
  }

  // full variant
  return (
    <div className="eco-badge eco-badge-full" style={{
      background: c.bg, borderColor: c.border, color: c.text
    }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2c-2 8 4 12 8 14-4 1-8-2-8-2-2 8-7 7-8 6 1-2 4-3 4-7 0-6 4-11 4-11Z"/>
      </svg>
      <div>
        <div style={{ fontWeight: 700, fontSize: 13 }}>سازگار با محیط زیست — {c.label}</div>
        {reasons.length > 0 && (
          <div style={{ fontSize: 11, opacity: 0.85, marginTop: 2 }}>
            {reasons.join(" · ")}
          </div>
        )}
      </div>
      <span className="eco-score-pill">{score}</span>
    </div>
  );
}

// ============ EMPTY STATE ============
function EmptyState({ title, description, action, crabPose = "sleep" }) {
  return (
    <div className="empty-state">
      <SingoCrab pose={crabPose} size={140} color="var(--brand-primary)" style={{ opacity: 0.85 }}/>
      <h3 className="t-title-l" style={{ marginTop: 8 }}>{title}</h3>
      {description && <p className="t-body-m" style={{ color: "var(--neutral-500)", maxWidth: 360, textAlign: "center" }}>{description}</p>}
      {action && <div style={{ marginTop: 16 }}>{action}</div>}
    </div>
  );
}

// ============ 404 PAGE ============
function NotFound404({ onGoHome }) {
  return (
    <div className="notfound-404">
      <div className="nf-crab">
        <SingoCrab pose="surprise" size={200} color="var(--brand-primary)"/>
      </div>
      <div className="nf-num">۴۰۴</div>
      <h1 className="t-display-l">صفحه‌ای که می‌خواستی پیدا نشد</h1>
      <p className="t-body-l" style={{ color: "var(--neutral-500)", maxWidth: 480 }}>
        شاید موج اون رو با خودش برده. ولی نگران نباش، خرچنگ ما اینجاست راهنماییت کنه.
      </p>
      <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
        <button className="btn btn-primary" onClick={onGoHome}>برگرد به خانه</button>
        <a href="rooms.html" className="btn btn-secondary">دیدن اتاق‌ها</a>
      </div>
    </div>
  );
}

// ============ LOADER (full-page or section) ============
function CrabLoader({ message = "در حال بارگذاری…", size = 100 }) {
  return (
    <div className="crab-loader">
      <div className="crab-loader-anim">
        <SingoCrab pose="wave" size={size} color="var(--brand-primary)"/>
      </div>
      <p className="t-body-m" style={{ color: "var(--neutral-500)", marginTop: 12 }}>{message}</p>
    </div>
  );
}

// ============ TOAST SYSTEM ============
const ToastContext = React.createContext(null);

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);
  const show = React.useCallback((toast) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(t => [...t, { id, ...toast }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), toast.duration || 4000);
  }, []);
  return (
    <ToastContext.Provider value={show}>
      {children}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={"toast toast-" + (t.type || "info")}>
            <div className="toast-crab">
              <SingoCrab
                pose={t.type === "error" ? "surprise" : t.type === "success" ? "wave" : "wave"}
                size={36}
                color={t.type === "error" ? "#dc2626" : t.type === "success" ? "#16a34a" : "var(--brand-primary)"}
              />
            </div>
            <div className="toast-content">
              <div className="toast-title">{t.title}</div>
              {t.message && <div className="toast-msg">{t.message}</div>}
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function useToast() {
  return React.useContext(ToastContext);
}

// ============ ONBOARDING TOOLTIP ============
function OnboardingTooltip({ title, message, onDismiss, position = "bottom" }) {
  return (
    <div className={"onb-tooltip onb-" + position}>
      <SingoCrab pose="wave" size={48} color="var(--brand-primary)"/>
      <div className="onb-content">
        <div className="onb-title">{title}</div>
        <div className="onb-msg">{message}</div>
        <button className="onb-dismiss" onClick={onDismiss}>فهمیدم!</button>
      </div>
    </div>
  );
}

// ============ FOOTER SIGNATURE ============
function FooterSignature() {
  const size = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--crab-size") || "1") * 40;
  return (
    <div className="footer-signature">
      <SingoCrab pose="wave" size={size} color="currentColor"/>
      <div className="footer-sig-text">
        <div className="footer-sig-line">طراحی‌شده با ❤ توسط <strong>Singo</strong></div>
        <div className="footer-sig-sub">پلتفرم اقامتگاه‌های بومی ایران</div>
      </div>
    </div>
  );
}

Object.assign(window, {
  EcoBadge, EmptyState, NotFound404, CrabLoader,
  ToastProvider, useToast, OnboardingTooltip, FooterSignature
});

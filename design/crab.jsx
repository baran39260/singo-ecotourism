// Singo Crab Mascot — line art, single color, 3 poses
// Usage: <SingoCrab pose="wave" size={120} color="currentColor" />
// Poses: "wave", "sleep", "surprise"

function SingoCrab({ pose = "wave", size = 120, color = "currentColor", style = {} }) {
  const stroke = color;
  const sw = 2.2; // stroke width
  const common = {
    fill: "none",
    stroke,
    strokeWidth: sw,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  if (pose === "wave") {
    return (
      <svg width={size} height={size} viewBox="0 0 200 200" style={style} aria-hidden="true">
        {/* body — rounded crab shell */}
        <ellipse cx="100" cy="115" rx="58" ry="38" {...common}/>
        {/* shell texture — 2 small ridges */}
        <path d="M 80 100 Q 85 92 90 100" {...common}/>
        <path d="M 110 100 Q 115 92 120 100" {...common}/>
        {/* eyes on stalks */}
        <line x1="80" y1="80" x2="78" y2="62" {...common}/>
        <line x1="120" y1="80" x2="122" y2="62" {...common}/>
        <circle cx="78" cy="58" r="6" {...common}/>
        <circle cx="122" cy="58" r="6" {...common}/>
        {/* pupils */}
        <circle cx="78" cy="58" r="2" fill={stroke} stroke="none"/>
        <circle cx="122" cy="58" r="2" fill={stroke} stroke="none"/>
        {/* smile */}
        <path d="M 88 122 Q 100 132 112 122" {...common}/>
        {/* legs (right side, 3) */}
        <path d="M 156 110 L 175 100 L 178 90" {...common}/>
        <path d="M 156 122 L 178 122" {...common}/>
        <path d="M 152 138 L 172 148 L 175 158" {...common}/>
        {/* legs (left side, 3) */}
        <path d="M 44 110 L 25 100 L 22 90" {...common}/>
        <path d="M 44 122 L 22 122" {...common}/>
        <path d="M 48 138 L 28 148 L 25 158" {...common}/>
        {/* left claw — tucked */}
        <path d="M 50 90 Q 35 70 42 55" {...common}/>
        <path d="M 42 55 L 32 50 M 42 55 L 50 48" {...common}/>
        {/* right claw — waving up high */}
        <path d="M 150 90 Q 165 60 158 35" {...common}/>
        <path d="M 158 35 L 148 28 M 158 35 L 168 30" {...common}/>
        {/* wave motion lines */}
        <path d="M 175 25 Q 182 28 178 34" {...common}/>
        <path d="M 178 18 Q 188 22 182 30" {...common}/>
      </svg>
    );
  }

  if (pose === "sleep") {
    return (
      <svg width={size} height={size} viewBox="0 0 200 200" style={style} aria-hidden="true">
        {/* body */}
        <ellipse cx="100" cy="120" rx="58" ry="36" {...common}/>
        {/* shell texture */}
        <path d="M 80 105 Q 85 97 90 105" {...common}/>
        <path d="M 110 105 Q 115 97 120 105" {...common}/>
        {/* eyes on stalks — drooped/closed */}
        <line x1="80" y1="88" x2="80" y2="74" {...common}/>
        <line x1="120" y1="88" x2="120" y2="74" {...common}/>
        <circle cx="80" cy="70" r="6" {...common}/>
        <circle cx="120" cy="70" r="6" {...common}/>
        {/* closed eyes — small arcs */}
        <path d="M 75 70 Q 80 73 85 70" {...common}/>
        <path d="M 115 70 Q 120 73 125 70" {...common}/>
        {/* mouth — small o */}
        <ellipse cx="100" cy="128" rx="3" ry="4" {...common}/>
        {/* legs — relaxed */}
        <path d="M 156 115 L 174 110 L 178 102" {...common}/>
        <path d="M 156 128 L 178 130" {...common}/>
        <path d="M 152 142 L 172 152" {...common}/>
        <path d="M 44 115 L 26 110 L 22 102" {...common}/>
        <path d="M 44 128 L 22 130" {...common}/>
        <path d="M 48 142 L 28 152" {...common}/>
        {/* claws — both relaxed at sides */}
        <path d="M 50 95 Q 38 80 45 65" {...common}/>
        <path d="M 45 65 L 36 60 M 45 65 L 53 58" {...common}/>
        <path d="M 150 95 Q 162 80 155 65" {...common}/>
        <path d="M 155 65 L 146 58 M 155 65 L 164 60" {...common}/>
        {/* Z Z Z floating */}
        <text x="138" y="42" fontSize="18" fontFamily="Vazirmatn, system-ui" fontWeight="600" fill={stroke}>Z</text>
        <text x="155" y="28" fontSize="14" fontFamily="Vazirmatn, system-ui" fontWeight="600" fill={stroke} opacity="0.7">z</text>
        <text x="168" y="18" fontSize="11" fontFamily="Vazirmatn, system-ui" fontWeight="600" fill={stroke} opacity="0.5">z</text>
      </svg>
    );
  }

  // "surprise"
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={style} aria-hidden="true">
      {/* body */}
      <ellipse cx="100" cy="115" rx="58" ry="38" {...common}/>
      {/* shell texture */}
      <path d="M 80 100 Q 85 92 90 100" {...common}/>
      <path d="M 110 100 Q 115 92 120 100" {...common}/>
      {/* eyes on stalks — raised high in shock */}
      <line x1="80" y1="80" x2="76" y2="50" {...common}/>
      <line x1="120" y1="80" x2="124" y2="50" {...common}/>
      <circle cx="76" cy="44" r="8" {...common}/>
      <circle cx="124" cy="44" r="8" {...common}/>
      {/* big surprised pupils */}
      <circle cx="76" cy="44" r="3.5" fill={stroke} stroke="none"/>
      <circle cx="124" cy="44" r="3.5" fill={stroke} stroke="none"/>
      {/* O mouth — surprised */}
      <ellipse cx="100" cy="125" rx="6" ry="8" {...common}/>
      {/* legs — splayed/alert */}
      <path d="M 156 108 L 178 95 L 182 82" {...common}/>
      <path d="M 156 122 L 180 120" {...common}/>
      <path d="M 152 138 L 174 148 L 178 162" {...common}/>
      <path d="M 44 108 L 22 95 L 18 82" {...common}/>
      <path d="M 44 122 L 20 120" {...common}/>
      <path d="M 48 138 L 26 148 L 22 162" {...common}/>
      {/* both claws raised */}
      <path d="M 50 90 Q 30 72 38 50" {...common}/>
      <path d="M 38 50 L 28 44 M 38 50 L 46 40" {...common}/>
      <path d="M 150 90 Q 170 72 162 50" {...common}/>
      <path d="M 162 50 L 154 40 M 162 50 L 172 44" {...common}/>
      {/* exclamation marks */}
      <line x1="20" y1="35" x2="20" y2="22" {...common}/>
      <circle cx="20" cy="42" r="1.5" fill={stroke} stroke="none"/>
      <line x1="180" y1="35" x2="180" y2="22" {...common}/>
      <circle cx="180" cy="42" r="1.5" fill={stroke} stroke="none"/>
    </svg>
  );
}

Object.assign(window, { SingoCrab });

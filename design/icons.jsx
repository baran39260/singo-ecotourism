// Inline SVG icon components — Lucide-style 1.5px stroke
const Icon = ({ children, size = 20, className = "", style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
    className={className} style={style}>
    {children}
  </svg>
);

const IconCalendar = (p) => (<Icon {...p}>
  <rect x="3" y="4" width="18" height="18" rx="2" />
  <path d="M16 2v4M8 2v4M3 10h18" />
</Icon>);

const IconUsers = (p) => (<Icon {...p}>
  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
  <circle cx="9" cy="7" r="4" />
  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
</Icon>);

const IconSearch = (p) => (<Icon {...p}>
  <circle cx="11" cy="11" r="8" />
  <path d="m21 21-4.3-4.3" />
</Icon>);

const IconStar = (p) => (<Icon {...p}>
  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
</Icon>);

const IconCheck = (p) => (<Icon {...p}>
  <path d="M20 6L9 17l-5-5" />
</Icon>);

const IconChevron = (p) => (<Icon {...p}>
  <path d="M9 18l6-6-6-6" />
</Icon>);

const IconArrowLeft = (p) => (<Icon {...p}>
  <path d="M19 12H5M12 19l-7-7 7-7" />
</Icon>);

const IconWifi = (p) => (<Icon {...p}>
  <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" />
</Icon>);

const IconCoffee = (p) => (<Icon {...p}>
  <path d="M17 8h1a4 4 0 0 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3" />
</Icon>);

const IconWind = (p) => (<Icon {...p}>
  <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2M9.6 4.6A2 2 0 1 1 11 8H2M12.6 19.4A2 2 0 1 0 14 16H2" />
</Icon>);

const IconBath = (p) => (<Icon {...p}>
  <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1.06-.44 1.5 1.5 0 0 0-1.06 2.56L6 7M2 12h20v4a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4v-4zM6 12V5a2 2 0 0 1 2-2h0M22 12v6M2 12V5" />
</Icon>);

const IconWaves = (p) => (<Icon {...p}>
  <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2s2.4 2 5 2c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2s2.4 2 5 2c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
</Icon>);

const IconSun = (p) => (<Icon {...p}>
  <circle cx="12" cy="12" r="4" />
  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
</Icon>);

const IconMoon = (p) => (<Icon {...p}>
  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
</Icon>);

const IconLeaf = (p) => (<Icon {...p}>
  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 2c1 1.38 2 4.16 2 7 0 5.82-4.83 11-11 11M2 21c0-3 1.85-5.36 5.08-6" />
</Icon>);

const IconArrowRight = (p) => (<Icon {...p}>
  <path d="M5 12h14M12 5l7 7-7 7" />
</Icon>);

const IconWhatsapp = (p) => (<Icon {...p}>
  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
  <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
</Icon>);

const IconMapPin = (p) => (<Icon {...p}>
  <path d="M20 10c0 7-8 12-8 12s-8-5-8-12a8 8 0 0 1 16 0z" />
  <circle cx="12" cy="10" r="3" />
</Icon>);

const IconHeart = (p) => (<Icon {...p}>
  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
</Icon>);

const IconGlobe = (p) => (<Icon {...p}>
  <circle cx="12" cy="12" r="10" />
  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
</Icon>);

const IconMenu = (p) => (<Icon {...p}>
  <path d="M3 12h18M3 6h18M3 18h18" />
</Icon>);

const IconPlus = (p) => (<Icon {...p}>
  <path d="M12 5v14M5 12h14" />
</Icon>);

const IconMinus = (p) => (<Icon {...p}>
  <path d="M5 12h14" />
</Icon>);

const IconLogo = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="22" fill="#0E7C86" />
    {/* Crab silhouette */}
    <g fill="white" fillRule="evenodd">
      <ellipse cx="24" cy="26" rx="9" ry="6.5"/>
      <circle cx="20" cy="24" r="1.6" fill="#0E7C86"/>
      <circle cx="28" cy="24" r="1.6" fill="#0E7C86"/>
      {/* Claws */}
      <path d="M11 22 Q8 18, 11 16 Q14 18, 13 21 Z M37 22 Q40 18, 37 16 Q34 18, 35 21 Z"/>
      {/* Legs */}
      <path d="M14 27 L10 30 M14 29 L10 33 M34 27 L38 30 M34 29 L38 33 M18 31 L17 35 M30 31 L31 35" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
    </g>
  </svg>
);

const IconCrabMascot = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <ellipse cx="16" cy="18" rx="9" ry="6" fill="#C2410C"/>
    <circle cx="13" cy="16" r="1.4" fill="white"/>
    <circle cx="19" cy="16" r="1.4" fill="white"/>
    <circle cx="13.3" cy="16.2" r="0.6" fill="#1A1F2C"/>
    <circle cx="19.3" cy="16.2" r="0.6" fill="#1A1F2C"/>
    <path d="M5 14 Q3 11, 5 9 Q7 11, 6.5 13 Z M27 14 Q29 11, 27 9 Q25 11, 25.5 13 Z" fill="#C2410C"/>
    <path d="M8 19 L5 22 M8 21 L5 24 M24 19 L27 22 M24 21 L27 24 M11 23 L10 26 M21 23 L22 26" stroke="#C2410C" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M14 21 Q16 22, 18 21" stroke="#1A1F2C" strokeWidth="1" strokeLinecap="round" fill="none"/>
  </svg>
);

const IconStarFlat = ({ size = 14, color = "#F59E0B" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

// Custom: tide wave icon
const IconTide = (p) => (<Icon {...p}>
  <path d="M3 14c2-2 3-2 5 0s3 2 5 0 3-2 5 0 3 2 5 0M3 18c2-2 3-2 5 0s3 2 5 0 3-2 5 0 3 2 5 0M5 8l2 2 2-2 2 2 2-2 2 2 2-2 2 2 2-2"/>
</Icon>);

// Custom: dhow boat
const IconDhow = (p) => (<Icon {...p}>
  <path d="M2 18 L22 18 L19 21 L5 21 Z M12 18 L12 4 M12 4 L20 12 L12 12"/>
</Icon>);

const IconClock = (p) => (<Icon {...p}>
  <circle cx="12" cy="12" r="10"/>
  <path d="M12 6v6l4 2"/>
</Icon>);

const IconPhone = (p) => (<Icon {...p}>
  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
</Icon>);

const IconMail = (p) => (<Icon {...p}>
  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
  <path d="M22 6l-10 7L2 6"/>
</Icon>);

Object.assign(window, {
  Icon, IconCalendar, IconUsers, IconSearch, IconStar, IconCheck, IconChevron,
  IconArrowLeft, IconArrowRight, IconWifi, IconCoffee, IconWind, IconBath,
  IconWaves, IconSun, IconMoon, IconLeaf, IconWhatsapp, IconMapPin, IconHeart,
  IconGlobe, IconMenu, IconPlus, IconMinus, IconLogo, IconCrabMascot, IconStarFlat,
  IconTide, IconDhow, IconClock, IconPhone, IconMail
});

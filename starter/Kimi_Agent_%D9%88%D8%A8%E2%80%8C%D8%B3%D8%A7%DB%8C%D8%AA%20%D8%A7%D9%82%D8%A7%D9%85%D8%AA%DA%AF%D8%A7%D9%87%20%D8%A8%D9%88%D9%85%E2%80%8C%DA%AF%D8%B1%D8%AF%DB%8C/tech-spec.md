# Tech Spec — اقامتگاه دلگشا

## Dependencies

### Production

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.0.0 | UI framework |
| react-dom | ^19.0.0 | DOM renderer |
| react-router-dom | ^7.0.0 | Client-side routing (Home, Rooms, Room Detail, Auth, About, Contact) |
| three | ^0.170.0 | WebGL for Memoir Disc and Velocity Gallery |
| @react-three/fiber | ^9.0.0 | React renderer for Three.js |
| @react-three/drei | ^10.0.0 | Helpers: useTexture, View, Environment |
| three-custom-shader-material | ^6.3.0 | Extends MeshStandardMaterial with custom vertex/fragment shaders |
| lenis | ^1.2.0 | Smooth scroll with velocity output |
| gsap | ^3.12.0 | Animation engine + ScrollTrigger |
| postprocessing | ^6.36.0 | Bloom pass for Velocity Gallery |
| html2canvas | ^1.4.0 | Capture HTML elements as textures (for Memoir Disc polaroid labels) |
| lodash | ^4.17.0 | Throttle/debounce for scroll and resize handlers |
| react-fast-marquee | ^1.6.0 | Horizontal scrolling text band (Introduction section) |
| vazirmatn | ^33.0.0 | Persian font (CSS import) |
| tailwindcss | ^4.0.0 | Utility styling |
| @tailwindcss/vite | ^4.0.0 | Tailwind v4 Vite integration |
| lucide-react | ^0.460.0 | Icons |

### Dev

| Package | Version | Purpose |
|---------|---------|---------|
| vite | ^6.0.0 | Build tool |
| @vitejs/plugin-react | ^4.3.0 | React Fast Refresh |
| typescript | ^5.7.0 | Type checking |
| @types/react | ^19.0.0 | React types |
| @types/react-dom | ^19.0.0 | ReactDOM types |
| @types/three | ^0.170.0 | Three.js types |

---

## Component Inventory

### Layout (shared)

| Component | Source | Notes |
|-----------|--------|-------|
| Navbar | Custom | Fixed 72px. Transparent → frosted glass on scroll. "رزرو" pill CTA. |
| Footer | Custom | 5-column link grid (RTL), social icons, copyright. |
| Layout | Custom | Wraps all pages. Initializes Lenis, sets RTL dir, holds Navbar + Footer. |

### Sections (page-specific, used once)

| Component | Page | Notes |
|-----------|------|-------|
| HeroSection | Home | Video bg, floating search pill, overlay gradient. |
| IntroBand | Home | Horizontal scrolling typography marquee. |
| MemoirDisc | Home | Full R3F Canvas with 3D rotating photo cylinder. |
| RoomShowcase | Home | Horizontal scroll gallery with WebGL distortion per image. |
| ExperienceHighlights | Home | 3 static feature cards. |
| PhilosophyStatement | Home | Centered text block. |
| TestimonialCylinder | Home | CSS 3D rotating text cylinder. |
| ContactSection | Home | Two-column: folding paper-flap form (left) + info (right). |
| RoomsListing | Rooms | Filterable grid of room cards. |
| RoomDetail | Room Detail | Image gallery, description, booking form. |
| AuthSection | Auth | Phone + OTP inputs. |
| AboutSection | About | Lodge story, team, values. |
| ContactPage | Contact | Standalone contact with form and map. |

### Reusable Components

| Component | Source | Used By |
|-----------|--------|---------|
| PillButton | Custom | Navbar, Hero, Philosophy, Footer, CTAs everywhere. Primary (filled) + secondary (outline) variants. |
| SectionHeader | Custom | Any section needing centered H2 + subtitle pair. |
| FeatureCard | Custom | ExperienceHighlights. Image top, text bottom, hover lift. |
| RoomCard | Custom | RoomShowcase, RoomsListing. Image, title, price, capacity. |
| GlassCard | Custom | RoomShowcase text overlay. Frosted glass panel. |
| SearchPill | Custom | HeroSection. White pill with destination/date/guests fields + search button. |
| PolaroidFrame | Custom (shader) | MemoirDisc. White-bordered image plane with shadow. |
| FilterTags | Custom | RoomsListing. Horizontal pill tag row, single-select. |
| ImageGallery | Custom | RoomDetail. Thumbnail grid + main image viewer. |
| BookingForm | Custom | RoomDetail, ContactPage. Date/guest inputs + submit. |
| OTPInput | Custom | AuthSection. 6-digit code entry. |

### Hooks

| Hook | Purpose |
|------|---------|
| useLenisVelocity | Provides current Lenis velocity to any component. Shared via context or ref. |
| useMouseWorldPosition | Raycasts mouse onto ground plane, returns world-space xz coords for shaders. |
| useScrollTrigger | Wrapper for GSAP ScrollTrigger setup with common defaults. |

---

## Animation Implementation

| Animation | Library | Approach | Complexity |
|-----------|---------|----------|------------|
| Hero entrance sequence (staggered fade-in) | GSAP | timeline with translateY + opacity, sequential delays | Low |
| Nav background transition | CSS | `transition` on background/backdrop-filter, class toggle on scroll | Low |
| Scroll indicator pulse | CSS @keyframes | Infinite translateY + opacity loop | Low |
| IntroBand horizontal parallax | react-fast-marquee | Continuous RTL scroll, no GSAP needed | Low |
| IntroBand character fade-in | GSAP | Split text to spans, stagger opacity | Medium |
| **Memoir Disc** (3D photo cylinder) | Three.js + R3F | InstancedMesh(24), custom ShaderMaterial with angle/time/hover uniforms, pointer drag with momentum damping | **High** 🔒 |
| Memoir Disc scroll-in fade | GSAP ScrollTrigger | IntersectionObserver triggers opacity 0→1 + scale 0.9→1 | Low |
| **Velocity Gallery** (scroll distortion) | Three.js + R3F + custom-shader-material | Per-image ShaderMaterial planes, Lenis velocity → uScrollSpeed uniform, vertex displacement + RGB shift in fragment shader, Bloom post-processing | **High** 🔒 |
| Velocity Gallery infinite wrap | JS | Reposition images when off-screen using modulo arithmetic | Medium |
| Feature card hover lift | CSS | translateY(-4px) + shadow deepen, transition 0.4s | Low |
| Feature card image zoom | CSS | Scale 1.03 within overflow:hidden | Low |
| Philosophy entrance (word stagger) | GSAP ScrollTrigger | Split to words, staggered fade + translateY | Medium |
| **Testimonial Cylinder** | CSS 3D | 3 faces at 120° intervals, rotateY animation 15s infinite, nav arrows lerp to target angle | **Medium** 🔒 |
| Testimonial pause on hover | CSS | animation-play-state: paused | Low |
| **Folding Paper-Flap Form** | CSS 3D | 3 panels with perspective, rotateY open animation, staggered timing, tilt reveal | **Medium** 🔒 |
| Folding form SVG stroke draw | CSS @keyframes | stroke-dasharray + stroke-dashoffset animation on open | Low |
| Section entrance animations | GSAP ScrollTrigger | Global pattern: translateY(40px) + opacity 0, stagger 0.1s | Low |
| Smooth scrolling | Lenis | Global lerp 0.1, wheelMultiplier 1.4, raf loop | Low |

---

## State & Logic

### Lenis ↔ WebGL Bridge

Lenis must be initialized once at the app root level (Layout component). Its velocity value needs to reach two WebGL scenes per frame:

- **Memoir Disc**: Reads velocity for optional drag momentum (not primary driver — auto-rotation is primary).
- **Velocity Gallery**: Reads velocity every frame to write into `uScrollSpeed` uniform on every image mesh.

Approach: Store Lenis instance in a ref exposed via React context. In each R3F scene, use `useFrame` to read `lenis.velocity` from the ref and write to shader uniforms. Do NOT use React state for velocity — 60fps uniform updates must bypass the React render cycle entirely.

### Routing

React Router v7 with hash-based routing (compatible with static deploy):

- `/` → Home
- `/rooms` → Rooms
- `/rooms/:slug` → Room Detail
- `/auth` → Auth (login + OTP)
- `/about` → About
- `/contact` → Contact

### RTL Implementation

- `<html dir="rtl">` set globally in `index.html`.
- Tailwind configured with `rtl` plugin or native `rtl:` variants.
- All flex containers default to RTL flow; `flex-row` becomes right-to-left automatically via `dir="rtl"`.
- Text alignment: `text-right` is default, no need to specify explicitly.

### Mobile Strategy

- Hero video: Replace with static hero image + CSS Ken Burns (`@keyframes` scale 1 → 1.1 over 20s) on screens below 768px.
- Velocity Gallery: Switch from horizontal scroll to vertical scroll stack. Disable WebGL distortion, use static images.
- Memoir Disc: Scale canvas to full width, reduce instance count to 12 on mobile.
- Testimonial Cylinder: Reduce font size to 18px, translateZ to 100px.
- Folding Form: Reduce width to 320px, collapse to single column.

---

## Other Key Decisions

### Font Strategy

Load Vazirmatn via `@fontsource/vazirmatn` or Google Fonts CSS import in `index.html`. Only weights 400, 500, 600, 700. Variable font preferred (single file, ~120KB woff2).

### Image Strategy

All room and experience images are AI-generated assets at design-time. Stored in `/public/images/` with descriptive filenames matching the asset names in design.md. The Memoir Disc guest photos reuse a subset of these static images (no runtime generation).

### Video Strategy

Hero video is AI-generated at design-time. Stored as MP4 + WebM in `/public/video/`. Must be under 3MB. On mobile, fallback to a static hero JPEG with CSS Ken Burns animation.

### No Backend

This is a frontend-only prototype. Booking forms, auth, and contact submissions are UI-only with console.log or alert feedback. No API integration.

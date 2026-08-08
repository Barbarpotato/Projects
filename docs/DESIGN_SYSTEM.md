# Design System — Barbarpotato Portfolio

> Black & white editorial — a monochrome personal portfolio with no tertiary color, serif editorial headings, and layered motion.

---

## Stack

| Layer         | Library                                               |
| ------------- | ----------------------------------------------------- |
| Framework     | React 18.2 + Vite                                     |
| UI Primitives | Chakra UI v2                                          |
| Animation     | Framer Motion                                         |
| Icons         | React Icons — Feather (`Fi*`), GiHamburger, IoMdClose |
| Flow/Graph    | @xyflow/react                                         |
| Misc          | TagCloud, typewriter-effect                           |

---

## Color Palette

Pure black, pure white, and neutral grays only. No hue, anywhere — not in accents, not in gradients, not in image filters.

### Background

| Token                | Hex                              | Usage                                                  |
| -------------------- | -------------------------------- | ------------------------------------------------------ |
| `bg-base`            | `#ffffff`                        | Page background, all sections                          |
| `bg-nav`             | `rgba(255, 255, 255, 0.60–0.95)` | Navigation glassmorphism (opacity increases on scroll) |
| `bg-scrollbar-track` | `#f0f0f0`                        | Scrollbar track                                        |

### Text

| Token          | Hex       | Usage                                                                                                                                        |
| -------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `text-primary` | `#000000` | All headings, primary body, links                                                                                                            |
| `text-muted`   | `#666666` | Article descriptions, meta, subtitles — chosen for AA contrast on white (`#c0c0c0` and `#d0d0d0` are too light once the background is white) |

### Accent

There is only one accent: `#000000`. It doubles as the interactive/link/border/glow color throughout — there is no separate "bright" or "active" hue.

| Token    | Hex       | Usage                                                                                |
| -------- | --------- | ------------------------------------------------------------------------------------ |
| `accent` | `#000000` | Links, borders, icons, scrollbar thumb, SVG underlines, dots, mind-map branch colors |

### Utility

| Token            | Hex                | Usage                                                                                                                 |
| ---------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `selection-bg`   | `#000000`          | `::selection` background                                                                                              |
| `selection-text` | `#ffffff`          | `::selection` text color                                                                                              |
| `shadow`         | `rgba(0, 0, 0, X)` | All drop shadows / elevation — shadows stay black regardless of theme, they represent physical depth, not brand color |

### Color Behavior Rules

- Default interactive state → `#000000` text/border on `#ffffff` bg.
- Solid-fill elements (CTA pills, selected nodes, badges) → **must always pair `bg="#000000"` with `color="#ffffff"`** (or the inverse). Never set `bg` and `color` to the same value — that was the #1 regression risk when inverting this palette and is checked by hand on every new component.
- Hover feedback without a second hue to lean on: prefer opacity (`0.6`), a translucent black wash (`rgba(0,0,0,0.08–0.15)`), or a solid border/underline going from translucent to opaque. Don't rely on a color swap since there is only one accent color.
- Glow/shadow on card hover → black elevation shadow (`0 10px 36px rgba(0,0,0,0.18–0.32)`), never a white "glow" — a white glow is invisible on a white page.
- Photos/images must stay achromatic: use `filter: grayscale(1)` (plus `contrast`/`brightness` as needed), never `sepia`/`hue-rotate`/`saturate` with a non-zero hue shift.
- `mask-image` / `WebkitMaskImage` gradients that fade an element's visibility must stay black-based (`black`, `rgba(0,0,0,X)`) — mask luminance, not decorative color; swapping this to white inverts the fade.

---

## Typography

### Font Families

```css
--font-playfair: "Playfair Display", Georgia, serif;
--font-outfit: "Outfit", system-ui, -apple-system, sans-serif;
--font-space-grotesk: "Space Grotesk", system-ui, -apple-system, sans-serif;
```

All three fonts are self-hosted as `.woff2` under `/public/fonts/`.

### Usage by Role

All headings use Space Grotesk — Playfair Display is reserved for italic taglines/quotes only (see below), it no longer appears on any `<h*>`, `Heading`, or heading-equivalent element.

| Role                                 | Font             | Weight  | Style  | Size                |
| ------------------------------------ | ---------------- | ------- | ------ | ------------------- |
| Display / Hero name                  | Space Grotesk    | 900     | normal | 34–96px             |
| Section heading                      | Space Grotesk    | 700     | normal | 4xl–6xl             |
| Card title                           | Space Grotesk    | 700     | normal | 2xl–3xl             |
| Section subtitle                     | Space Grotesk    | 700     | normal | 4xl–5xl             |
| Mind-map detail heading              | Space Grotesk    | 700     | normal | 2xl                 |
| Italic tagline / quote (non-heading) | Playfair Display | 400     | italic | md–2xl              |
| Body copy                            | Outfit           | 400     | normal | md–lg               |
| Nav links                            | Outfit           | 500–600 | normal | md                  |
| Buttons / CTAs                       | Outfit           | 500     | normal | md                  |
| Meta / dates                         | Outfit           | 400     | normal | sm                  |
| TagCloud sphere                      | Outfit           | 600     | normal | 1.3em / 12px mobile |

Space Grotesk is only shipped in weights 300/400/500/600/700, upright only (`/public/fonts/space-grotesk-v22-latin-*.woff2`) — headings stay at weight 700 (bold, upright) so every heading maps to a real `@font-face` with nothing synthesized. The one exception is the hero name at weight 900, which predates this rule and still relies on browser fake-bolding.

### Typographic Treatment Pattern

Section headings (Labs, Projects, Onboarding) use a two-line split. Every word — plain or accented — is its own solid black chip:

```
[word one]                ← bold Space Grotesk, weight 700, upright,
[word two]                   each on its own black chip: bg #000000, color #ffffff,
                             px 3–4, py 0.5–1, borderRadius "md"
```

No SVG accents (no ellipse encircle, no curved underline) — the chip itself is the whole treatment.

**Chip** (every heading word, e.g. Labs "Konten" / "Blog" / "Terbaru", Projects "Proyek" / "Favorit", Onboarding "Personal Developer" / "Notebook"):

```jsx
<Box
	as="span"
	display="inline-block"
	bg="#000000"
	color="#ffffff"
	px={{ base: 3, md: 4 }}
	py={{ base: 0.5, md: 1 }}
	borderRadius="md"
>
	Konten
</Box>
```

---

## Spacing

Based on Chakra UI spacing scale (1 unit = 4px).

| Token                     | Value                    | Usage                  |
| ------------------------- | ------------------------ | ---------------------- |
| Section padding Y         | `pt={20} pb={20}` (80px) | All major sections     |
| Card padding              | `p={6}` (24px)           | All card interiors     |
| Stack gap (article cards) | `spacing={5}` (20px)     | Vertical card list     |
| Grid gap                  | `gap={10–14}` (40–56px)  | Two-column layouts     |
| Container max width       | `maxW="7xl"` (1280px)    | All content containers |

---

## Layout

### Grid System

- **Desktop** (≥ md): `templateColumns="1fr 1fr"` — two equal columns
- **Mobile** (< md): single column, stacked vertically

### Carousel Layout

Horizontal scroll strip that bleeds past the container boundary:

```jsx
pl={{ base: '1rem', md: 'max(1rem, calc((100vw - 80rem) / 2 + 1rem))' }}
```

Scrollbar hidden via `'&::-webkit-scrollbar': { display: 'none' }`.

### Navigation

- `position: sticky; top: 0; z-index: 30`
- Glassmorphism background with `backdropFilter: blur(10px)` on scroll
- Border appears only after scroll: `1px solid rgba(0, 0, 0, 0.22)`
- Desktop: centered HStack; Mobile: collapsible VStack via `<Collapse>`

---

## Components

### Card

```
bg: #ffffff
border: 1px solid rgba(0, 0, 0, 0.15)
borderRadius: xl  (Chakra = 12px)
p: 6 (24px)
```

Cards are distinguished from the page purely by border + shadow, never by a different background shade — there's no "elevated dark surface" token left in this palette.

**Hover state** (via `.project-card` class):

```css
transform: scale(1.02);
box-shadow: 0px 0px 25px #000000;
transition: transform 0.1s ease-in-out;
```

**Image zoom** (via `.zoom-container`):

```css
img {
	transition: transform 0.2s ease-in-out;
}
img:hover {
	transform: scale(1.2);
}
```

### Button / CTA

**Solid pill (fills black — text MUST be white):**

```jsx
bg="#000000"
color="#ffffff"
fontFamily="'Outfit', sans-serif"
fontWeight="600"
rightIcon={<FiArrowRight />}
```

**Link variant:**

```jsx
variant="link"
color="#000000"
fontFamily="'Outfit', sans-serif"
fontWeight="500"
rightIcon={<FiArrowRight />}
_hover={{ opacity: 0.6 }}
```

**Icon button (circular nav):**

```jsx
isRound
bg="transparent"
border="2px solid"
borderColor="#000000"
color="#000000"
_hover={{ bg: '#000000', color: '#ffffff', transform: 'scale(1.08)' }}
transition="all 0.2s ease"
```

**Underlined link:**

```jsx
color="#000000"
borderBottom="1.5px solid rgba(0, 0, 0, 0.35)"
_hover={{ borderBottomColor: '#000000' }}
transition="all 0.2s ease"
```

### Navigation Item

- Default: `color="#000000"`, weight 500
- Active: `color="#000000"`, weight 700 + 12×3px dot indicator below
- Hover: `bg: rgba(0, 0, 0, 0.14)`, `translateY(-2px)`
- Mobile active: `bg: rgba(0, 0, 0, 0.1)`, `translateX(4px)` on hover

### Avatar

```css
.avatar {
	border-radius: 70% 30% 30% 70% / 60% 40% 60% 40%; /* blob shape */
	border: 5px solid #000000;
	box-shadow: 0 70px 40px -20px rgba(0, 0, 0, 0.2);
}

.avatar-labs {
	border-radius: 91% 9% 91% 9% / 4% 95% 5% 96%; /* different blob */
	border: 25px double #000000;
}
```

### Social Icon

```css
.social-icon {
	color: #000000;
	transition: transform 0.3s ease-in-out;
}
.social-icon:hover {
	transform: scale(1.3);
}
```

### Scrollbar

```css
::-webkit-scrollbar {
	width: 10px;
	height: 5px;
	border-radius: 5px;
}
::-webkit-scrollbar-track {
	background: #f0f0f0;
	border-radius: 5px;
}
::-webkit-scrollbar-thumb {
	background: #000000;
	border-radius: 5px;
}
::-webkit-scrollbar-thumb:hover {
	background: #444444;
}
```

### React Flow Controls (light theme)

```css
.react-flow__controls {
	border-radius: 8px;
	box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
}
.react-flow__controls-button {
	background: #ffffff !important;
	border-bottom: 1px solid #0d0d0d;
}
.react-flow__controls-button svg {
	fill: #000000;
}
.react-flow__controls-button:hover {
	background: #000000;
}
.react-flow__controls-button:hover svg {
	fill: #ffffff;
}
```

---

## Animation

### Motion Defaults (Framer Motion)

**Scroll-reveal (standard):**

```jsx
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, amount: 0.3 }}
transition={{ duration: 0.6 }}
```

**Staggered list:**

```jsx
// Parent
variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } } }}

// Child
variants={{ hidden: { opacity: 0, y: 40, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } } }}
```

**Card stagger delay:** `delay: index * 0.1` (right column offset: `index * 0.1 + 0.15`)

**TagCloud sphere entrance:**

```jsx
initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
animate={{ opacity: 0.8, scale: 1, rotate: 0 }}
transition={{ duration: 1.8, ease: [0.2, 0.8, 0.2, 1], delay: 0.5 }}
```

**Default transition string:** `"all 0.2s ease"` — used on interactive elements.

### Background Effects

**Animated star field** — three CSS layers (`div.stars`, `.stars2`, `.stars3`), rendered as `#000` dots so they read against the white page:

| Class     | Size  | Duration |
| --------- | ----- | -------- |
| `.stars`  | 1×1px | 60s      |
| `.stars2` | 2×2px | 100s     |
| `.stars3` | 3×3px | 200s     |

Animation: diagonal drift `translateY` + `translateX` both to `-2560px`, infinite loop.

**TagCloud sphere** — rendered into `.tagcloud` span, blurred, items solid black with `opacity: 0.5` on hover:

- Desktop: `filter: blur(2px)`, opacity 0.8
- Mobile: `filter: blur(1px)`, font-size 12px

---

## Design Principles

1. **White by default.** Every section is `#ffffff` background with `#000000` text. Never use a colored or off-white background.

2. **One accent, used with restraint.** `#000000` is the only accent. Interaction state is communicated through opacity, translucency, weight, and motion — not a second hue.

3. **Editorial headings.** Section titles always use Space Grotesk bold (weight 700, upright — no italic). Every word of a two-line heading sits on its own solid black chip (white text) — no SVG stroke accents. Body text always uses Outfit.

4. **Motion on scroll.** Every content block animates in via `whileInView`. Use `viewport={{ once: true }}` to avoid re-triggering.

5. **Subtle scale on hover.** Cards scale `1.02` with a black shadow. Images inside zoom `1.2`. CTAs shift up `translateY(-2px)`.

6. **Cosmos atmosphere, monochrome.** The star field and blurred TagCloud sphere are always present in hero and scroll sections, rendered in black. They reinforce the space/cosmos identity without reintroducing color.

7. **Space Grotesk for all headings.** Display name, section headings, subtitles, and card titles all use it. Playfair Display is now reserved for non-heading italic taglines/quotes only.

8. **Photos are grayscale.** Any photographic image gets `filter: grayscale(1)` (plus contrast/brightness) — never a color tint.

9. **Contrast pairing is load-bearing.** Any solid-fill element (`bg="#000000"`) must pair with `color="#ffffff"`, and vice versa. Because both ends of the palette are literally black and white, an unpaired copy-paste silently makes text invisible instead of just "off-brand" — check every new `bg`/`color` pair by eye.

---
title: MAHESH DESIGNER - Visual Design System
status: final
created: 2026-08-19
updated: 2026-08-19
author: Sally (UX Designer)
tokens:
  colors:
    primary:
      maroon: "#6B1E2D"
      maroon_dark: "#501420"
      deep_red: "#8B1E2D"
      burgundy: "#3A0D18"
    accent:
      gold: "#C9A227"
      gold_light: "#E3C258"
      emerald_green: "#176B55"
      blush_pink: "#F4E3E1"
      royal_blue: "#243B6B"
    neutral:
      warm_white: "#FFFDF9"
      cream: "#F8F1E7"
      soft_beige: "#EDE3D5"
      light_neutral: "#F5F3EF"
      border_subtle: "#E6DEC8"
      dark_text: "#24191B"
      secondary_text: "#6F6260"
      muted_text: "#9A8D8B"
  typography:
    headings:
      font_family: "'Playfair Display', 'Cormorant Garamond', Georgia, serif"
      weight_regular: 400
      weight_medium: 500
      weight_bold: 600
    body:
      font_family: "'Inter', 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif"
      weight_regular: 400
      weight_medium: 500
      weight_semibold: 600
  rounded:
    none: "0px"
    sm: "2px"
    md: "4px"
    lg: "8px"
    full: "9999px"
  spacing:
    container_max_width: "1360px"
    section_padding_y: "80px"
    section_padding_x: "24px"
    gutter: "32px"
---

# MAHESH DESIGNER — Visual Design System (DESIGN.md)

## 1. Brand & Style

MAHESH DESIGNER represents the pinnacle of luxury Indian bridal couture and artisanal Aari craftsmanship. The visual style embodies:

- **Editorial Fashion Heritage:** Clean, spacious, high-contrast layouts reminiscent of *Vogue India* and *Harper's Bazaar*.
- **Tactile Opulence:** Warm ivory and cream surfaces providing a calm gallery backdrop for deep bridal maroons, antique gold zari embroidery, and rich silks.
- **Refined Minimalism:** Generous whitespace, razor-sharp alignment, minimal micro-borders, and whisper-soft shadows.

**Tagline:** *"Crafted for Your Most Beautiful Moments"*

---

## 2. Color System & Distribution Hierarchy

The color balance strictly follows the 70 / 20 / 10 rule:

```
┌────────────────────────────────────────────────────────┐
│ 70% Warm Neutrals (Warm White, Cream, Soft Beige)      │
├──────────────────────────────┬─────────────────────────┤
│ 20% Brand Maroons & Burgundy │ 10% Gold & Jewel Accents│
└──────────────────────────────┴─────────────────────────┘
```

### Color Palette Definitions

| Token | Hex Value | Usage Purpose |
| :--- | :--- | :--- |
| `colors.primary.maroon` | `#6B1E2D` | Primary action buttons, active navigation states, section headlines |
| `colors.primary.deep_red` | `#8B1E2D` | Bridal highlights, hero gradient overlays, high-priority CTAs |
| `colors.primary.burgundy` | `#3A0D18` | Luxury footer background, dark promo cards, admin sidebar |
| `colors.accent.gold` | `#C9A227` | Decorative micro-accents, icons, badges, rating stars, thin borders |
| `colors.accent.emerald_green` | `#176B55` | Special collection tags, festive badges |
| `colors.accent.blush_pink` | `#F4E3E1` | Soft tinted card backgrounds, bridal storytelling highlights |
| `colors.neutral.warm_white` | `#FFFDF9` | Main page body background, card backgrounds |
| `colors.neutral.cream` | `#F8F1E7` | Secondary section backgrounds, filter sidebar background |
| `colors.neutral.soft_beige` | `#EDE3D5` | Card borders, subtle dividers, empty state canvas |
| `colors.neutral.dark_text` | `#24191B` | Primary headings, product titles, high-emphasis text |
| `colors.neutral.secondary_text` | `#6F6260` | Body copy, product descriptions, secondary specs |

---

## 3. Typography

### Scale & Hierarchy

| Level | Font Family | Size (Desktop) | Size (Mobile) | Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Title** | Playfair Display | 54px (3.375rem) | 36px (2.25rem) | 1.15 | -0.02em |
| **Section H2** | Playfair Display | 38px (2.375rem) | 28px (1.75rem) | 1.2 | -0.01em |
| **Subsection H3** | Playfair Display | 26px (1.625rem) | 22px (1.375rem) | 1.25 | 0em |
| **Card / Title H4** | Playfair Display | 19px (1.1875rem) | 18px (1.125rem) | 1.3 | 0em |
| **Body Text** | Inter / Manrope | 15px (0.9375rem) | 14px (0.875rem) | 1.6 | 0.01em |
| **Small / Meta** | Inter / Manrope | 12px (0.75rem) | 11px (0.6875rem) | 1.4 | 0.04em (Uppercase) |
| **Button / Nav** | Inter / Manrope | 13px (0.8125rem) | 12px (0.75rem) | 1.0 | 0.08em (Uppercase, Semibold) |

---

## 4. Layout & Spacing

- **Max Container Width:** `1360px` with fluid responsive horizontal margins.
- **Grid System:** 12-column layout for desktop (80px columns with 32px gutters).
- **Responsive Breakpoints:**
  - `Desktop`: `>= 1024px` (4-column product grid, sticky filter sidebar)
  - `Tablet`: `768px - 1023px` (2-3 column product grid, collapsible side navigation)
  - `Mobile`: `< 768px` (1-2 column product grid, slide-out drawer, sticky bottom action bar on PDP)
- **Vertical Spacing Cadence:**
  - Section Spacing: `96px` (Desktop), `56px` (Mobile)
  - Element Spacing: `8px`, `16px`, `24px`, `32px`, `48px`

---

## 5. Elevation & Depth

To maintain high-fashion editorial purity, heavy dropped shadows are strictly prohibited:

- **Surface Neutral:** `box-shadow: none; border: 1px solid #EDE3D5;`
- **Subtle Elevation (Cards on Hover):** `box-shadow: 0 12px 32px rgba(36, 25, 27, 0.06); transform: translateY(-4px);`
- **Floating Overlays (Navbar on Scroll, Modal, Filter Drawer):** `box-shadow: 0 16px 40px rgba(36, 25, 27, 0.12);`
- **Backdrop Blur:** `backdrop-filter: blur(12px); background: rgba(255, 253, 249, 0.92);`

---

## 6. Shapes & Border Radii

- **Card Radii:** `2px` to `4px` (Crisp, sharp tailoring reflecting fine textile cuts).
- **Buttons:** `2px` or `0px` with uppercase tracked text.
- **Pills / Badges:** `9999px` (Reserved only for status tags like *"Featured"*, *"Aari Craft"*, *"Out of Stock"*).

---

## 7. Component Visual Specifications

### 7.1 Primary Buttons
- **Background:** `#6B1E2D` (Maroon)
- **Text:** `#FFFDF9` (Warm White), 13px uppercase, 600 weight, `letter-spacing: 0.08em`
- **Padding:** `14px 28px`
- **Hover State:** Background shifts to `#501420`, subtle gold bottom border glow.

### 7.2 Secondary / Outline Buttons
- **Background:** Transparent
- **Border:** `1px solid #6B1E2D`
- **Text:** `#6B1E2D`, 13px uppercase
- **Hover State:** Background `#6B1E2D`, Text `#FFFDF9`.

### 7.3 Luxury Product Card
- **Aspect Ratio:** `3:4` vertical portrait orientation.
- **Hover Effect:** Image scale `1.04` with smooth 400ms ease transition. Quick action overlay (Wishlist toggle top-right, "Quick Add" button slides up from bottom).
- **Price Presentation:** Original price in strikethrough muted text (`#9A8D8B`), selling price in bold Maroon (`#6B1E2D`), discount tag in gold pill.

### 7.4 Admin Portal Theme
- **Sidebar:** `#3A0D18` (Burgundy) with `#F8F1E7` (Cream) text and `#C9A227` (Gold) active left-border indicator.
- **Data Table:** Neutral `#FFFDF9` with `#EDE3D5` cell borders, alternating row hover in `#F8F1E7`.

---

## 8. Do's and Don'ts

### Do's:
- ✅ Keep 70% of canvas in warm neutral ivory/cream tones.
- ✅ Use macro photography showing real zari threads, beadwork, and silk weave.
- ✅ Give every section breathing room with at least 80px vertical padding.
- ✅ Highlight handcrafted authenticity in product descriptions.

### Don'ts:
- ❌ Do NOT use bright neon colors, electric blues, or harsh saturated reds.
- ❌ Do NOT use bubbly, high-radius (rounded-2xl) cards or cartoonish iconography.
- ❌ Do NOT clutter product cards with excessive badges or loud discounts.
- ❌ Do NOT use generic system sans-serif fonts for editorial headings.

---
title: MAHESH DESIGNER - Visual Design System
status: final
created: 2026-08-19
updated: 2026-08-20
author: Sally (UX Designer)
tokens:
  colors:
    primary:
      imperial_emerald: "#0D3B2E"
      emerald_deep: "#07261E"
      emerald_soft: "#1A5243"
      emerald_subtle: "#EAF3EF"
    accent:
      antique_gold: "#D4AF37"
      gold_light: "#F3E5AB"
      gold_metallic: "#C59B27"
      gold_subtle: "rgba(212, 175, 55, 0.15)"
      sage: "#A8B5A2"
      sage_light: "#E3E9E0"
    neutral:
      pearl_ivory: "#FDFBF7"
      ivory_cream: "#F7F3EB"
      canvas_subtle: "#F2EDE4"
      border_gold_subtle: "rgba(212, 175, 55, 0.25)"
      border_subtle: "rgba(13, 59, 46, 0.12)"
      deep_charcoal: "#1A1A1A"
      muted_charcoal: "#4A4A4A"
      caption_gray: "#7A7A7A"
  typography:
    headings:
      font_family: "'Playfair Display', 'Cormorant Garamond', Georgia, serif"
      weight_regular: 400
      weight_medium: 500
      weight_bold: 600
    body:
      font_family: "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
      weight_regular: 400
      weight_medium: 500
      weight_semibold: 600
  rounded:
    none: "0px"
    xs: "3px"
    sm: "6px"
    md: "10px"
    lg: "16px"
    full: "9999px"
  spacing:
    container_max_width: "1380px"
    section_padding_y: "96px"
    section_padding_x: "32px"
    gutter: "32px"
---

# MAHESH DESIGNER — Visual Design System (DESIGN.md)

## 1. Brand & Visual Style

MAHESH DESIGNER represents the pinnacle of luxury Indian bridal couture, custom dress stitching, and artisanal Aari craftsmanship. The visual style embodies:

- **Haute Couture Indian Heritage:** Clean, spacious, high-contrast layouts reminiscent of *Vogue India* and elite designer runways.
- **Imperial Emerald & Antique Gold Opulence:** Deep rich `#0D3B2E` imperial emerald surfaces paired with fine `#D4AF37` antique gold accents.
- **Pearl Ivory Gallery Canvas:** Calming `#FDFBF7` pearl ivory surfaces allowing vibrant silk, zari, and threadwork photography to command visual attention.
- **Organic Sage Grounding:** Subtle `#A8B5A2` sage accents providing breathability, modern sophistication, and gentle contrast.

**Tagline:** *"Bespoke Elegance & Timeless Artistry"*

---

## 2. Color System & Distribution Hierarchy

The color balance follows the **60 / 30 / 10** luxury rule:

```
┌────────────────────────────────────────────────────────┐
│ 60% Pearl Ivory & Soft Cream Canvas (#FDFBF7 / #F7F3EB)│
├──────────────────────────────┬─────────────────────────┤
│ 30% Imperial Emerald (#0D3B2E)│ 10% Antique Gold & Sage │
└──────────────────────────────┴─────────────────────────┘
```

### Color Palette Definitions

| Token | Hex Value | Usage Purpose |
| :--- | :--- | :--- |
| `colors.primary.imperial_emerald` | `#0D3B2E` | Primary brand color, hero sections, primary buttons, footer, luxury cards |
| `colors.primary.emerald_deep` | `#07261E` | Deep background overlays, dark luxury cards, footer base |
| `colors.primary.emerald_soft` | `#1A5243` | Active tab states, secondary banners, interactive hover states |
| `colors.accent.antique_gold` | `#D4AF37` | Buttons, borders, icons, highlights, star ratings, premium accents |
| `colors.accent.gold_light` | `#F3E5AB` | Champagne badge highlights, glowing hover effects |
| `colors.accent.sage` | `#A8B5A2` | Subtle secondary badges, measurement helper notes, secondary links |
| `colors.neutral.pearl_ivory` | `#FDFBF7` | Main page background, product catalog canvas, modal surfaces |
| `colors.neutral.ivory_cream` | `#F7F3EB` | Secondary section backgrounds, filter sidebar background |
| `colors.neutral.deep_charcoal` | `#1A1A1A` | Headings, product titles, high-emphasis text |
| `colors.neutral.muted_charcoal` | `#4A4A4A` | Body copy, product descriptions, secondary specs |

---

## 3. Typography

### Scale & Hierarchy

| Level | Font Family | Size (Desktop) | Size (Mobile) | Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Title** | Playfair Display | 56px (3.5rem) | 36px (2.25rem) | 1.15 | -0.02em |
| **Section H2** | Playfair Display | 38px (2.375rem) | 28px (1.75rem) | 1.2 | -0.01em |
| **Subsection H3** | Playfair Display | 26px (1.625rem) | 22px (1.375rem) | 1.25 | 0em |
| **Card / Title H4** | Playfair Display | 20px (1.25rem) | 18px (1.125rem) | 1.3 | 0em |
| **Body Text** | Plus Jakarta Sans | 15px (0.9375rem) | 14px (0.875rem) | 1.6 | 0.01em |
| **Small / Meta** | Plus Jakarta Sans | 12px (0.75rem) | 11px (0.6875rem) | 1.4 | 0.04em (Uppercase) |
| **Button / Nav** | Plus Jakarta Sans | 13px (0.8125rem) | 12px (0.75rem) | 1.0 | 0.08em (Uppercase, Semibold) |

---

## 4. Layout & Spacing

- **Max Container Width:** `1380px` with fluid responsive horizontal margins.
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

- **Surface Neutral:** `box-shadow: none; border: 1px solid rgba(212, 175, 55, 0.2);`
- **Subtle Elevation (Cards on Hover):** `box-shadow: 0 16px 36px rgba(13, 59, 46, 0.10); transform: translateY(-4px); border-color: rgba(212, 175, 55, 0.45);`
- **Floating Overlays (Navbar on Scroll, Modal, Filter Drawer):** `box-shadow: 0 20px 50px rgba(7, 38, 30, 0.18);`
- **Backdrop Blur:** `backdrop-filter: blur(12px); background: rgba(253, 251, 247, 0.94);`

---

## 6. Shapes & Border Radii

- **Card Radii:** `6px` to `10px` with delicate gold borders.
- **Buttons:** `4px` to `6px` with tracked uppercase typography.
- **Pills / Badges:** `9999px` (Reserved for status tags like *"Handmade Aari"*, *"Ready to Ship"*, *"Custom Fit"*).

---

## 7. Component Visual Specifications

### 7.1 Primary Buttons
- **Background:** `#0D3B2E` (Imperial Emerald) with `#D4AF37` (Antique Gold) border
- **Text:** `#FDFBF7` (Pearl Ivory), 13px uppercase, 600 weight, `letter-spacing: 0.08em`
- **Padding:** `14px 28px`
- **Hover State:** Background `#07261E`, gold glow shadow `0 8px 24px rgba(212, 175, 55, 0.35)`.

### 7.2 Secondary / Accent Buttons
- **Background:** `#D4AF37` (Antique Gold)
- **Text:** `#0D3B2E` (Imperial Emerald), 13px uppercase, 700 bold
- **Hover State:** Background `#C59B27`, subtle scale `1.02`.

### 7.3 Luxury Product Card
- **Aspect Ratio:** `3:4` vertical portrait orientation.
- **Hover Effect:** Image scale `1.04` with smooth 400ms ease transition. Wishlist heart toggle top-right, "Quick View" and "Custom Stitch" buttons slide up smoothly.
- **Price Presentation:** Original price strikethrough in `#7A7A7A`, selling price in bold `#0D3B2E`, discount tag in Antique Gold pill.

### 7.4 Custom Stitching Studio
- **Garment & Option Cards:** Ivory surfaces with `#D4AF37` gold outline on selection, `#EAF3EF` emerald subtle background.
- **Measurement Matrix:** Standard size chips + interactive bespoke measurement sliders with visual diagrams.

---

## 8. Do's and Don'ts

### Do's:
- ✅ Keep canvas in serene Pearl Ivory `#FDFBF7` with Imperial Emerald and Antique Gold accents.
- ✅ Highlight handcrafted authenticity, Aari embroidery details, and bespoke tailoring options.
- ✅ Maintain generous whitespace with at least 80-96px vertical section padding.
- ✅ Provide clear real-time pricing updates when custom stitching options are configured.

### Don'ts:
- ❌ Do NOT use harsh neon colors, loud primary blues, or stark flat whites.
- ❌ Do NOT make the interface feel like a discount warehouse; maintain high-fashion boutique aesthetics.
- ❌ Do NOT hide custom measurement instructions; keep sizing guidance prominent and reassuring.

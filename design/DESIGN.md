---
name: Swiss Modernist Technical
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c3c9ae'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8d937b'
  outline-variant: '#434934'
  surface-tint: '#a2d801'
  primary: '#ffffff'
  on-primary: '#263500'
  primary-container: '#bdf532'
  on-primary-container: '#516e00'
  inverse-primary: '#4c6700'
  secondary: '#c6c6c7'
  on-secondary: '#2f3131'
  secondary-container: '#454747'
  on-secondary-container: '#b4b5b5'
  tertiary: '#ffffff'
  on-tertiary: '#372c3f'
  tertiary-container: '#edddf6'
  on-tertiary-container: '#6c6075'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#bdf532'
  primary-fixed-dim: '#a2d801'
  on-primary-fixed: '#141f00'
  on-primary-fixed-variant: '#384e00'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#edddf6'
  tertiary-fixed-dim: '#d1c1d9'
  on-tertiary-fixed: '#211829'
  on-tertiary-fixed-variant: '#4e4256'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-xl:
    fontFamily: Inter
    fontSize: 84px
    fontWeight: '600'
    lineHeight: 88px
    letterSpacing: -0.04em
  display-xl-mobile:
    fontFamily: Inter
    fontSize: 44px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 52px
    letterSpacing: -0.03em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.025em
  headline-md:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: -0.015em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  label-code:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.08em
  label-ui:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 3rem
  space-2xl: 5rem
  space-3xl: 8rem
---

## Brand & Style

This design system embodies pure Swiss modernist discipline engineered for technical authority and conversion. It rejects tech-industry clichés—bento boxes, glowing blurred gradients, floating cards, and synthetic glassmorphism—in favor of structural clarity, typographic hierarchy, and absolute geometric precision.

### Personality & Values
- **Precision:** Mathematical spatial cadence, hairline borders, and rigid alignment.
- **Architectural Clarity:** Information is framed by structural 1px dividers and raw typographic scale rather than decorative containers.
- **High-Stakes Restraint:** Deep carbon neutrals dominate 98% of the surface area; high-voltage electric lime is reserved strictly for conversion vectors and active states.
- **Editorial Substance:** Text-first layouts inspired by mid-century international typographic style, executed within an unyielding modern digital environment.

### Target Audience & Response
Targeted at discerning tech founders, engineering leaders, and design-led enterprise clients seeking top-tier web design and AI integration. The experience must elicit immediate trust through ruthless visual discipline, absolute clarity of capability, and rapid cognitive digestion.

## Colors

The palette operates on stark, uncompromising tonal separation. Color is treated not as decoration, but as functional infrastructure.

### Palette Architecture
- **Primary Accent (`#C6FF3D`):** Electric Lime. Strictly reserved for high-impact primary conversion actions, live availability badges, and active operational states. It must never be diluted with transparency or used for ambient glow effects.
- **Pure Canvas Light (`#FAFAFA`):** Used for primary text on dark themes and as full-bleed alternating editorial section backgrounds.
- **Deep Neutral Base (`#0A0A0A`):** The primary canvas ground, establishing deep contrast without absolute synthetic black (#000000).
- **Secondary Surfaces (`#141414` / `#1C1C1C`):** Subordinate structural panels, alternating rows, and hover fills.
- **Structural Dividers (`#262626` on dark, `#D9D9D9` on light):** Razor-thin 1px mechanical lines that anchor the grid.
- **Muted Metadata (`#8E8E8E`):** Micro-labels, indexing identifiers, technical specs, and subtext.

### Contrast Directives
Interactive components against `#0A0A0A` mandate `#C6FF3D` with `#0A0A0A` typography for maximum readable luminance. In alternating inverted sections (`#FAFAFA` background), borders shift to `#D9D9D9`, text shifts to `#0A0A0A`, and primary interactive accents remain solid `#0A0A0A` with `#FAFAFA` text or `#C6FF3D` outlines to preserve visual gravity.

## Typography

The typographic hierarchy prioritizes systematic density, surgical legibility, and high-impact editorial cadence.

### Font Implementation
- **Primary Typographic Engine (Inter):** Configured with negative tracking at display scales for tight, architectural headlines, and neutral tracking at body scales for sustained reading comfort.
- **Metadata, Tags, & Section Numbering:** Executed via `label-code` with uppercase styling and expanded tracking (+0.08em) to create clear technical rhythm (e.g., `// 01 ARCHITECTURE`, `STATUS: DEPLOYED`).

### Rules for Application
1. **Headlines:** Display and headline styles must enforce tight tracking (`-0.02em` to `-0.04em`) to maintain an authoritative editorial presence.
2. **Indexing:** Every primary section must be prefixed with a 2-digit numeral index (e.g., `01 / CAPABILITIES`) rendered in `label-code` using `#8E8E8E`.
3. **No Decorative Weights:** Only weights 400 (Regular), 500 (Medium), and 600 (Semibold) are permitted. Faux-bold weights and light weights below 400 are prohibited.

## Layout & Spacing

Layouts follow a strict mathematical 12-column grid bound by hairline coordinate frames. Content is organized by coordinate axes rather than free-floating elements.

### Grid & Alignment Mechanics
- **Desktop (1200px+):** 12-column structural grid with `margin: 3rem` and `gutter: 1.5rem`. Max container constraint: `1440px`.
- **Tablet (768px - 1199px):** 8-column grid with `margin: 2rem` and `gutter: 1.25rem`.
- **Mobile (< 768px):** 4-column grid with `margin-mobile: 1.25rem` and `gutter-sm: 1rem`.

### Vertical Cadence & Rhythms
- Sections utilize rhythmic vertical padding: `space-2xl` (5rem) on small viewports and `space-3xl` (8rem) on desktop viewports.
- Spacing is additive and strictly adheres to the 4px baseline token framework. Random inline values are forbidden.
- Columns are visibly severed by uninterrupted full-width 1px dividers rather than whitespace gaps alone.

## Elevation & Depth

This design system deliberately excludes drop shadows, ambient blurs, gradient overlays, and skeuomorphic layers. Visual separation is achieved strictly through planar shifts and explicit 1px hair-line dividers.

### Elevation Tiers
- **Level 0 (Base Canvas):** Solid `#0A0A0A`. The ground layer for primary narratives.
- **Level 1 (Direct Substrate):** Solid `#141414`. Used for alternating data rows, code blocks, and structural field insets.
- **Level 2 (Inverted Floor):** Solid `#FAFAFA`. Full-bleed section breaks providing maximum contextual contrast. Text shifts directly to `#0A0A0A`.
- **Level 3 (Overlay / Modal / Menus):** Solid `#0A0A0A` bounded by a 1px solid border (`#262626`). Floating menus use pure opacity; no backdrop filter or blur may be applied.

### Border Rules
All planar divisions require a 1px solid rule:
- Primary Dark Mode Divider: `#262626`.
- Accent Focus / Active State Rule: `#C6FF3D`.
- Light Mode Inverted Divider: `#D9D9D9`.

## Shapes

The geometric framework is unyielding: **border-radius is locked to 0px across all interactive and structural components.** 

### Geometry Rules
- Buttons, input fields, cards, badges, modal windows, and image viewports are purely rectangular.
- No rounded pills, no soft corners, and no softened nested borders.
- Visual rhythm is created through the precision of the right angle and exact 1px intersecting lines.

## Components

### Buttons & CTAs
- **Primary Action (Conversion):** 
  - Fill: `#C6FF3D`.
  - Border: 1px solid `#C6FF3D`.
  - Text: `#0A0A0A`, `label-ui`, uppercase.
  - Hover: Background shifts to `#FAFAFA`, border shifts to `#FAFAFA`, text remains `#0A0A0A`. No transitional scale or physical movement.
  - Padding: `0.875rem 1.75rem`. Corners: `0px`.
- **Secondary Action (Neutral):**
  - Fill: Transparent.
  - Border: 1px solid `#262626`.
  - Text: `#FAFAFA`, `label-ui`.
  - Hover: Border shifts to `#FAFAFA`.
- **Text Action:**
  - Minimal inline link with an arrow (`→`), underlined with a 1px solid rule spaced 4px below baseline. Hover triggers accent shift to `#C6FF3D`.

### Structural Cards & Data Panels
- Traditional floating cards are prohibited.
- Data containers are formed by bounding grid cells with 1px solid `#262626` borders on all touching sides.
- Internal padding: `space-lg` (1.5rem) desktop, `space-md` (1rem) mobile.
- Hover interaction: Background shifts subtly from `#0A0A0A` to `#141414`. Border remains unchanged or optionally highlights in `#FAFAFA`.

### Technical Chips & Badges
- Height: 24px.
- Styling: Transparent background, 1px solid border (`#262626`).
- Typography: `label-code`, uppercase, tracking `0.08em`, `#8E8E8E`.
- Active / Status Variant: Includes a 6x6px solid square glyph colored in `#C6FF3D`.

### Form Inputs
- Background: `#141414`.
- Border: 1px solid `#262626`. Corners: `0px`.
- Text: `#FAFAFA`, `body-md`. Placeholder: `#6B6B6B`.
- Padding: `0.75rem 1rem`.
- Focus State: Border color switches instantaneously to `#C6FF3D`. Outline rings or glow effects are prohibited.

### Section Dividers & Indexing Rows
- Standard horizontal boundary: 1px continuous solid line across the grid canvas.
- Structural Section Headers: Left-aligned technical index (`01 //`, `02 //`) paired with an uppercase category tag in `label-code` sitting immediately atop display headlines.

### Lists & Key-Value Matrices
- Table-style alternating data rows separated by 1px horizontal rules.
- Row padding: `space-md` vertically.
- Hover: Entire row shifts background to `#141414`, revealing a terminal-style arrow prompt (`→`) on the extreme right border.
---
name: IronPulse
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
  on-surface-variant: '#d5c4ab'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#9e8f78'
  outline-variant: '#514532'
  surface-tint: '#ffba20'
  primary: '#ffdca1'
  on-primary: '#412d00'
  primary-container: '#ffb800'
  on-primary-container: '#6b4c00'
  inverse-primary: '#7c5800'
  secondary: '#c8c6c5'
  on-secondary: '#313030'
  secondary-container: '#474746'
  on-secondary-container: '#b7b5b4'
  tertiary: '#e2e0df'
  on-tertiary: '#303030'
  tertiary-container: '#c6c4c4'
  on-tertiary-container: '#515151'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdea8'
  primary-fixed-dim: '#ffba20'
  on-primary-fixed: '#271900'
  on-primary-fixed-variant: '#5e4200'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#e4e2e1'
  tertiary-fixed-dim: '#c8c6c6'
  on-tertiary-fixed: '#1b1c1c'
  on-tertiary-fixed-variant: '#474747'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-xl:
    fontFamily: Oswald
    fontSize: 84px
    fontWeight: '700'
    lineHeight: 90px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Oswald
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 52px
  headline-lg-mobile:
    fontFamily: Oswald
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 36px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.1em
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

This design system embodies "Dark Industrial Luxury," a high-octane aesthetic tailored for elite fitness and high-performance environments. The brand personality is aggressive, disciplined, and uncompromising. It targets high-achievers who view the gym as a laboratory for physical excellence.

The visual style blends **Minimalism** with **Dark Industrial** elements. It utilizes deep obsidian surfaces, stark high-contrast typography, and "Electric Amber" accents to create a focal point of intense energy. The interface prioritizes "Power and Precision" through razor-sharp edges and wide, cinematic letter spacing. Subtle glassmorphism is used sparingly on elevated cards to introduce a sense of modern technical sophistication without softening the brand’s rugged edge.

## Colors

The palette is anchored in **Obsidian (#0A0A0A)** to provide a deep, immersive background that minimizes distractions. **Electric Amber (#FFB800)** serves as the primary action color, cutting through the darkness with maximum visibility.

- **Primary:** Electric Amber. Used for CTA buttons, active progress bars, and critical data points.
- **Secondary/Tertiary:** Industrial Grays. Used for structural borders and secondary container backgrounds to create depth within the dark mode.
- **Neutral:** Pure Obsidian and Charcoal. Used for deep-level backgrounds and page scaffolding.
- **Success/Warning:** Handled through variants of the gold/amber spectrum, moving toward white for purity or deeper orange for alerts.

## Typography

The typography strategy uses a "Aggressive-Technical" pairing. **Oswald** provides the heavy, condensed impact required for headlines, mirroring the vertical strength of gym equipment. All primary headlines should be set in uppercase to reinforce authority.

**Hanken Grotesk** is the functional workhorse for body content, offering a clean, contemporary feel that remains legible during high-intensity activity. For technical data—such as set counts, weights, and split times—**JetBrains Mono** is used to convey a sense of calculated precision and data-driven performance.

## Layout & Spacing

The design system employs a **Fluid Grid** with wide margins to create a premium, "gallery" feel for fitness imagery and data. 
- **Desktop:** 12-column grid with 64px outer margins to allow the content to breathe.
- **Mobile:** 4-column grid with 16px margins, prioritizing vertical stacks and large touch targets.

Spacing follows a strict 8px base unit. Generous whitespace is a functional requirement here, ensuring that heavy headlines do not feel cluttered. Transitions use a custom **Heavy Snap** cubic-bezier to make the UI feel reactive and mechanically precise.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** rather than traditional soft shadows. In this industrial context, "up" means "lighter charcoal."

- **Level 0 (Base):** Obsidian (#0A0A0A).
- **Level 1 (Cards):** Dark Charcoal (#1A1A1A) with a 1px solid stroke in a slightly lighter gray.
- **Level 2 (Modals/Popovers):** Glassmorphic surfaces using backdrop-blur (20px) and a subtle 3% white tint.

To maintain the "Luxury" aspect, use extremely subtle, long-range ambient glows behind primary action buttons to simulate a neon hardware effect, but keep standard shadows invisible.

## Shapes

The shape language is strictly **Sharp (0px)**. Rounded corners are avoided to maintain an aggressive, industrial aesthetic. Every element—from buttons and input fields to card containers and images—should utilize 90-degree angles to communicate stability, strength, and structural integrity.

## Components

### Buttons
- **Primary:** Solid Electric Amber background, black uppercase Oswald text. On hover, the button should slightly expand (scale 1.02) and trigger a subtle amber outer glow.
- **Secondary:** Ghost style with a 2px amber stroke. No background.
- **Transition:** All state changes must use the `heavy-snap` transition token.

### Cards
- Sharp edges with a #2D2D2D 1px border. 
- Content inside cards should use `label-caps` for headers to distinguish data points.
- Implement subtle backdrop blurring when cards overlay dynamic photography.

### Input Fields
- Underline-only or full-border sharp rectangles. Background should be slightly darker than the surface it sits on. 
- Focus state: The border changes to Electric Amber with a sharp transition.

### Chips & Badges
- Used for workout tags (e.g., "HIIT", "ELITE"). Rectangular, black background with amber text and a 1px amber border.

### Progress Bars
- Thick, 8px tall bars. Background is #1A1A1A, while the progress indicator is a gradient from Amber to Gold, creating a "pulsing" energy effect.
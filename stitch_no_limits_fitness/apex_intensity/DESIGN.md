---
name: Apex Intensity
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#37393a'
  surface-container-lowest: '#0c0f0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#e8bcb6'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#ae8782'
  outline-variant: '#5e3f3b'
  surface-tint: '#ffb4aa'
  primary: '#ffb4aa'
  on-primary: '#690003'
  primary-container: '#e61919'
  on-primary-container: '#fffbff'
  inverse-primary: '#c0000b'
  secondary: '#c6c6c6'
  on-secondary: '#303030'
  secondary-container: '#474747'
  on-secondary-container: '#b5b5b5'
  tertiary: '#e9c400'
  on-tertiary: '#3a3000'
  tertiary-container: '#c9a900'
  on-tertiary-container: '#4c3f00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad5'
  primary-fixed-dim: '#ffb4aa'
  on-primary-fixed: '#410001'
  on-primary-fixed-variant: '#930006'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c6'
  on-secondary-fixed: '#1b1b1b'
  on-secondary-fixed-variant: '#474747'
  tertiary-fixed: '#ffe16d'
  tertiary-fixed-dim: '#e9c400'
  on-tertiary-fixed: '#221b00'
  on-tertiary-fixed-variant: '#544600'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 80px
    fontWeight: '900'
    lineHeight: 88px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 38px
  headline-md:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-bold:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.05em
  cta:
    fontFamily: Montserrat
    fontSize: 20px
    fontWeight: '900'
    lineHeight: 24px
spacing:
  base: 8px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  section-gap: 120px
---

## Brand & Style
The brand personality is aggressive, raw, and uncompromising. It is designed to evoke an immediate visceral response—adrenaline, focus, and urgency. The target audience is dedicated athletes of all genders who view the gym as a battleground for self-improvement.

The visual style is a fusion of **High-Contrast Bold** and **Brutalism**. It prioritizes impact over subtlety, utilizing massive typography, sharp geometric edges, and a "dark mode" foundation that allows vibrant reds and yellows to pop with electric intensity. Imagery should be high-contrast, featuring dramatic "chiaroscuro" lighting that emphasizes muscle definition and grit.

## Colors
The palette is built on a high-tension triad to drive motivation and clarity.

- **Primary Red (#E61919):** Used for primary actions, critical highlights, and brand-heavy sections. It signals energy and blood-pumping intensity.
- **Secondary Black (#000000):** The foundational canvas. It provides the "heavy" feel of a weights room and allows for maximum contrast.
- **Tertiary Yellow (#FFD700):** Reserved for accents, specialized badges, and "caution/attention" style callouts. It adds a layer of "pre-workout" electricity to the dark interface.
- **Neutral White (#FFFFFF):** Primarily used for body copy and high-priority typography to ensure absolute legibility against dark backgrounds.

## Typography
The typography strategy uses **Montserrat** for its structural power and **Inter** for its functional clarity.

- **Headlines:** Must always be uppercase with tight tracking. The "Display" style is intended for hero sections, often overlapping background imagery. Use heavy weights (800-900) to convey strength.
- **Body:** Inter is used for readability. While the brand is aggressive, information regarding training schedules and nutrition must be effortless to consume.
- **Accents:** Use italics for CTAs and motivational pull-quotes to suggest forward motion and speed.

## Layout & Spacing
The layout follows a **Rigid Grid** philosophy. Content is contained within a 12-column grid on desktop and a 4-column grid on mobile. 

- **Density:** Spacing is generous between sections (`section-gap`) to allow the bold typography to "breathe," but tight within components to maintain a sense of compressed energy.
- **Alignment:** Use hard vertical alignments. Elements should feel "stacked" and heavy. 
- **Mobile Reflow:** On mobile, imagery should shift from background-fill to full-width blocks to maintain the "Define Your Muscles" visual impact without losing text legibility.

## Elevation & Depth
In this design system, depth is achieved through **Tonal Layering** and **High-Contrast Outlines** rather than soft shadows.

- **Z-Axis:** Surfaces do not "float" with soft shadows. Instead, use "Secondary Black" (#121212) for containers against a "Pure Black" (#000000) background.
- **Borders:** Use 2px solid primary red or white borders to define interactive areas.
- **Overlays:** Use 40-60% black gradients over photography to ensure white and red typography remains "punchy" and legible.

## Shapes
The shape language is strictly **Sharp (0px)**. Roundness is perceived as "soft" or "friendly," which contradicts the aggressive, high-energy nature of the brand.

- **Corners:** Every button, input field, card, and image container must have 90-degree angles.
- **Diagonals:** Use 45-degree clipped corners or skewed containers (using CSS transforms) for buttons and section dividers to create a sense of movement and "edge."

## Components
- **Buttons:** Primary buttons are Solid Red (#E61919) with White text, using heavy Montserrat Italic. Hover states should "invert" to Yellow (#FFD700) or shift to an Outlined style with a 3px stroke.
- **Input Fields:** Black background with a 2px White border. On focus, the border turns Primary Red. Labels are strictly uppercase Montserrat.
- **Cards:** Used for workout programs. Use a background image with a dark overlay. The title should be in the bottom-left corner in `headline-md`.
- **Chips/Badges:** Use Tertiary Yellow with Black text for "New," "Extreme," or "Pro" level indicators.
- **Call-to-Action (CTA) Blocks:** Full-width sections with Primary Red backgrounds and oversized Black display type. These are the "loudest" elements in the system.
- **Lists:** Use Red "X" or "Check" icons that look like they were painted with a brush or stamped for a raw, gym-wall aesthetic.
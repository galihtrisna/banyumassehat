---
name: Satu Sehat Banyumas Clinical Portal
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#3f4850'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#707881'
  outline-variant: '#bfc7d2'
  surface-tint: '#006398'
  primary: '#006194'
  on-primary: '#ffffff'
  primary-container: '#007bb9'
  on-primary-container: '#fdfcff'
  inverse-primary: '#93ccff'
  secondary: '#00668a'
  on-secondary: '#ffffff'
  secondary-container: '#40c2fd'
  on-secondary-container: '#004d6a'
  tertiary: '#006947'
  on-tertiary: '#ffffff'
  tertiary-container: '#00855b'
  on-tertiary-container: '#f5fff6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cce5ff'
  primary-fixed-dim: '#93ccff'
  on-primary-fixed: '#001d31'
  on-primary-fixed-variant: '#004b73'
  secondary-fixed: '#c4e7ff'
  secondary-fixed-dim: '#7bd0ff'
  on-secondary-fixed: '#001e2c'
  on-secondary-fixed-variant: '#004c69'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system embodies a progressive, high-trust, and accessible public healthcare aesthetic tailored for civic healthcare administration and patient transparency. It strikes an intentional equilibrium between clinical precision and human-centric warmth. 

The visual style blends **Clean Clinical Minimalism** with **Controlled Glassmorphism**. Layouts prioritize psychological reassurance, visual clarity, and rapid cognitive triage through generous whitespace, high-contrast typography, and purposeful data density. Interfaces reject decorative clutter in favor of functional lightness, utilizing translucent frosted surfaces, airy containers, and crisp state indicators to project institutional reliability and technological modernization.

## Colors

The color system is calibrated for institutional integrity, optical ergonomics, and universal accessibility (WCAG AAA compliance for body text, AA for UI components).

- **Primary Range (Sky Trust)**: `#0284C7` anchors primary interactive controls and critical focus states. Supported by `#38BDF8` for secondary highlights, `#E0F2FE` for interactive container fills, and `#F0F9FF` for soft active tints.
- **Neutral Palette (Slate Precision)**: `#0F172A` delivers high-contrast typography and prominent structural elements. `#334155` provides secondary clarity for metadata; `#64748B` serves supportive captions and inactive borders. `#F8FAFC` forms the baseline canvas background, complemented by crisp `#FFFFFF` card surfaces.
- **Status & Triage Semantics**:
  - **Available / Stable (Emerald)**: `#10B981` (Container: `#ECFDF5`, Border: `#A7F3D0`) for bed availability, ready stock, and validated records.
  - **Limited / Warning (Amber)**: `#F59E0B` (Container: `#FFFBEB`, Border: `#FDE68A`) for constrained capacity, awaiting verification, and low supplies.
  - **Critical / Empty (Rose)**: `#EF4444` (Container: `#FEF2F2`, Border: `#FECACA`) for zero-capacity alerts, emergency room saturation, and critical alerts.

## Typography

The design system exclusively implements **Plus Jakarta Sans** for headlines, numerical metrics, and continuous body text to preserve typographic coherence and geometric purity. 

- **Numerical Display**: Tabular figures (`font-variant-numeric: tabular-nums`) must be applied across all dashboard counters, bed status totals, medical record IDs, and data table columns to ensure strict vertical alignment.
- **Readability Rules**: Body copy utilizes open tracking and generous line heights (1.5x - 1.625x) to alleviate cognitive fatigue during high-volume administrative or diagnostic consumption.

## Layout & Spacing

The spatial architecture operates on an 8pt base grid within an airy fluid-grid system designed to maximize visual breathing room:

- **Desktop (1280px+)**: 12-column layout with fixed max-width container of `1440px`, `gutter` of `1.5rem` (24px), and canvas margins of `2.5rem` (40px). Metrics, capacity summaries, and tables expand into logical modular clusters.
- **Tablet (768px - 1279px)**: 8-column layout with `gutter` of `1.25rem` (20px) and margins of `1.5rem` (24px). Sidebar collapses into an overlay drawer.
- **Mobile (< 768px)**: 4-column layout with `gutter-mobile` of `1rem` (16px) and `margin-mobile` of `1rem` (16px). Data displays collapse into vertical stacked cards.
- **Internal Component Rhythm**: Dense tabular rows utilize `space-sm` vertical padding with `space-md` lateral padding; dashboard cards utilize `space-lg` to `space-xl` padding to sustain an uncluttered, modern medical feel.

## Elevation & Depth

Visual hierarchy is constructed via clean chromatic layer tiers, delicate border structures, and soft atmospheric light:

- **Surface Levels**:
  - `Level 0 (Canvas)`: `#F8FAFC` base application plane.
  - `Level 1 (Card/Panel)`: Pure `#FFFFFF` resting atop canvas, defined by a fine border `1px solid rgba(226, 232, 240, 0.8)`. Shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.03), 0 1px 2px -1px rgba(15, 23, 42, 0.03)`.
  - `Level 2 (Hover/Active/Dropdown)`: Lifted floating panels, search autosuggest, and popovers. Shadow: `0 10px 25px -5px rgba(2, 132, 199, 0.06), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`.
  - `Level 3 (Modal/Critical Drawer)`: Persistent modal dialogs and urgent alert sheets. Shadow: `0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`.
- **Glassmorphism Spec**: Navigation bars, quick-filter bars, and floating summary headers feature translucent fills (`rgba(255, 255, 255, 0.8)` or `rgba(240, 249, 255, 0.75)`) combined with a `backdrop-filter: blur(12px)` and subtle outline `rgba(255, 255, 255, 0.6)`.

## Shapes

The geometric framework is friendly, soft, and approachable, avoiding aggressive right angles while maintaining functional rectangular efficiency:

- **Standard Elements (roundedness: 2)**: Standard buttons, text input fields, tooltips, and badges utilize `0.5rem` (8px) corners.
- **Structural Modules (rounded-lg to rounded-2xl)**: Primary dashboard cards, metric tiles, status modules, and data grid wrappers employ `1rem` (16px) to `1.5rem` (24px) continuous radiuses, reinforcing an airy, premium look.
- **Pills / Status Chips**: Triage indicators, active counter badges, and category chips utilize full rounded pill forms (`9999px`).

## Components

- **Buttons**:
  - *Primary*: `#0284C7` background, white label, `0.5rem` corner radius, zero outline, transitioning to `#0369A1` on hover with a subtle `0 4px 12px rgba(2, 132, 199, 0.25)` ambient glow.
  - *Secondary / Ghost*: Background `rgba(224, 242, 254, 0.5)` with `#0284C7` text, elevating on hover to `rgba(224, 242, 254, 0.9)`.
  - *Outline*: `1px solid #CBD5E1`, `#334155` text, shifting to `#0284C7` border and text on interaction.

- **Status Badges & Chips**:
  - Full pill construction (`border-radius: 9999px`), `space-xs` vertical and `space-sm` horizontal padding.
  - *Bed Available*: Background `#ECFDF5`, text `#065F46`, paired with an active pulsing status dot `#10B981`.
  - *Bed Limited*: Background `#FFFBEB`, text `#92400E`, status dot `#F59E0B`.
  - *Bed Critical / Full*: Background `#FEF2F2`, text `#991B1B`, status dot `#EF4444`.

- **Input Fields & Search**:
  - Height: `44px` minimum for tap ergonomics. Background `#FFFFFF` with `1px solid #E2E8F0` border.
  - Active/Focus: Shift border to `#0284C7` with a matching `0 0 0 3px rgba(56, 189, 248, 0.2)` ring. Typography set to `body-md` in `#0F172A`.

- **Data Tables (Clinical Registries)**:
  - Header: `#F8FAFC` background, `label-md` uppercase typography in `#64748B`, `1px solid #E2E8F0` bottom boundary.
  - Cells: `body-md` in `#334155`, height `56px`, subtle bottom row border `1px solid #F1F5F9`. Hover state renders a soft background tint of `#F0F9FF`.

- **Card Metrics & KPI Tiles**:
  - White surface background, `1.5rem` corner radius, `space-lg` padding. Features an isolated icon slot embedded in `#E0F2FE` with `#0284C7` iconography, stacked above a large tabular counter (`headline-lg`) and contextual micro-comparison badge.

- **Checkboxes & Radios**:
  - `20px` diameter with `4px` radius for checkboxes, full circle for radios. Border `#CBD5E1`. On selection, fills with `#0284C7` displaying a crisp white micro-check or centered dot.
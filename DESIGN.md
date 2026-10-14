# Design Direction & System Specification

## Brand Identity & Tone
- **Name**: Deck Studio
- **Archetype**: Professional Editorial & Creative Presentation Workspace (similar to Figma, Linear, and Apple Keynote).
- **Aesthetic Principles**: Matte surfaces, crisp 1px borders, high-contrast typography, zero gimmicky glow orbs, zero decorative emojis.
- **Antislop Dials**: ENERGY: 2 | RHYTHM: 2 | MOTION: 1

## Color System
- **Canvas Base**: `#0C0E12` (Grounded Charcoal)
- **Panel Surface**: `#14171F` (Matte Studio Slate)
- **Card Surface**: `#1A1E27` (Solid Elevated Container)
- **Border Crisp**: `#282D3B` (Structured 1px boundary)
- **Text Primary**: `#F1F5F9` (95% Brightness, High Legibility)
- **Text Secondary**: `#94A3B8` (WCAG AA Compliant Muted Text)
- **Accent**: `#3B82F6` (Deliberate Cobalt Blue, used solely for primary actions and active states)
- **Accent Muted**: `rgba(59, 130, 246, 0.12)` (Focus backgrounds)

## Typography
- **Headings**: `Outfit`, sans-serif (Geometric, high optical weight, tight tracking `-0.02em`)
- **Body & UI**: `Inter`, system-ui, sans-serif (Neutral, clean, legible at small sizes)
- **Monospace**: `JetBrains Mono`, monospace (Strictly for slide metrics, step indices, and code)

## Geometry & Radii
- **Containers & Slide Canvas**: `8px` (Crisp geometric corners)
- **Buttons & Form Inputs**: `6px`
- **Badges & Tabs**: `4px`
- **Rule**: No pill shapes (`border-radius: 9999px`) on standard UI controls.

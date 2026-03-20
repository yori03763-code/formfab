# 🎨 Designer - Complete UX/UI Specification

## Agent: Designer
**Last Sync:** 2026-03-20 17:56 UTC
**Status:** ✅ COMPLETE
**Input From:** Tech Lead

---

# USER FLOWS

## Flow 1: Generation Journey

```
┌────────────────────────────────────────────────────────────────┐
│                        HOME PAGE                               │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  [Hero] "Describe it. Customize it. Print it."          │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │ Textarea: "Describe your 3D model..."              │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  │  [✨ Generate 3D Model]                                  │ │
│  └──────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌────────────────────────────────────────────────────────────────┐
│                    GENERATING STATE                            │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  🎨 Generating your 3D model...                         │ │
│  │  ┌────────────────────────────────────────────────────┐ │ │
│  │  │ ████████████████░░░░░░░░░░░  65%                   │ │ │
│  │  └────────────────────────────────────────────────────┘ │ │
│  │  Creating geometry...                                    │ │
│  └──────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌────────────────────────────────────────────────────────────────┐
│                    CUSTOMIZE VIEW                              │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  ✅ Model Ready!                                         │ │
│  │  ┌─────────────┐                                        │ │
│  │  │   Preview   │  Parts │ Materials │ Scale │ Price     │ │
│  │  │   Image     │                                        │ │
│  │  └─────────────┘                                        │ │
│  │  [Download] [Order] [New Design]                         │ │
│  └──────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
```

---

## Flow 2: Multi-Part Customization

```
CUSTOMIZE VIEW
       │
       ▼
┌─────────────────────────────────────────┐
│  🔧 Parts & Materials                    │
│  ┌─────────────────────────────────────┐│
│  │ Part: [Whole Model      ] ✕        ││
│  │ Material: [White Plastic ▼]         ││
│  │ Size: [30] cm³    $4.50            ││
│  └─────────────────────────────────────┘│
│  ┌─────────────────────────────────────┐│
│  │ Part: [Joints           ] ✕        ││
│  │ Material: [Steel         ▼]         ││
│  │ Size: [10] cm³    $12.00           ││
│  └─────────────────────────────────────┘│
│                                         │
│  [+ Add Part]                           │
└─────────────────────────────────────────┘
```

---

## Flow 3: Order Flow

```
CUSTOMIZE → [Order Now] → CHECKOUT → PAYMENT → CONFIRMATION
                              │
                              ▼
                    ┌─────────────────┐
                    │  Stripe Checkout │
                    │  (hosted page)  │
                    └─────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  Order Placed!  │
                    │  Order #12345   │
                    │  Est. 7-10 days │
                    └─────────────────┘
```

---

# WIREFRAMES

## Home Page (Desktop)

```
┌──────────────────────────────────────────────────────────────────────────┐
│  [Logo: FormFab]                                    [Gallery] [Sign In] │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│                    ✨ AI-Powered 3D Printing                            │
│                                                                          │
│                        Describe it.                                      │
│                     Customize it. Print it.                              │
│                                                                          │
│      Transform ideas into multi-material products. You control          │
│      every part and material.                                           │
│                                                                          │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │  A robot figurine with metal joints and colorful face...       │   │
│   └────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│                        [ ✨ Generate 3D Model ]                         │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│     How It Works                                                        │
│     ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│     │ 1.Describe│  │2.Customize│  │ 3.Price  │  │ 4.Receive│            │
│     └──────────┘  └──────────┘  └──────────┘  └──────────┘            │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│     Available Materials                                                 │
│     ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ │
│     │White   │ │Black   │ │Full    │ │Metallic│ │Steel   │ │Rubber  │ │
│     │Plastic │ │Plastic │ │Color   │ │Plastic │ │        │ │TPE     │ │
│     │$0.15/cm³│ │$0.18/cm³│ │$0.45/cm³│ │$0.35/cm³│ │$1.20/cm³│ │$0.50/cm³│ │
│     └────────┘ └────────┘ └────────┘ └────────┘ └────────┘ └────────┘ │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│  Built by Lava ✨ for Yori & Jinx                                       │
└──────────────────────────────────────────────────────────────────────────┘
```

## Customize View (Mobile)

```
┌────────────────────────┐
│  [←]     ✅ Model Ready │
├────────────────────────┤
│                        │
│   ┌──────────────────┐ │
│   │                  │ │
│   │   [Preview       │ │
│   │    Image]        │ │
│   │                  │ │
│   └──────────────────┘ │
│                        │
├────────────────────────┤
│  📏 Size               │
│  ──●────────── 100%    │
│  50%            300%   │
├────────────────────────┤
│  🔧 Parts              │
│  ┌──────────────────┐  │
│  │ Whole Model   ✕ │  │
│  │ White Plastic ▼ │  │
│  │ 30 cm³  $4.50   │  │
│  └──────────────────┘  │
│  ┌──────────────────┐  │
│  │ + Add Part...    │  │
│  └──────────────────┘  │
├────────────────────────┤
│  💰 Total: $9.50       │
├────────────────────────┤
│ [Download] [Order Now] │
└────────────────────────┘
```

---

# DESIGN SYSTEM

## Colors

```css
/* Brand Colors */
--primary: #6366f1;        /* Indigo */
--primary-light: #818cf8;
--accent: #f472b6;         /* Pink */
--accent-dark: #ec4899;

/* Background Colors */
--bg-dark: #0f172a;        /* Slate 900 */
--bg-darker: #020617;      /* Slate 950 */
--bg-card: rgba(30, 41, 59, 0.7);

/* Text Colors */
--text: #f1f5f9;           /* Slate 100 */
--text-muted: #94a3b8;     /* Slate 400 */
--text-dim: #64748b;       /* Slate 500 */

/* Status Colors */
--success: #4ade80;        /* Green 400 */
--warning: #fbbf24;        /* Amber 400 */
--error: #f87171;          /* Red 400 */
```

## Typography

```css
/* Font Stack */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Headings */
.h1 { font-size: 3rem; font-weight: 900; line-height: 1.1; }
.h2 { font-size: 2rem; font-weight: 800; line-height: 1.2; }
.h3 { font-size: 1.5rem; font-weight: 700; line-height: 1.3; }
.h4 { font-size: 1.25rem; font-weight: 600; line-height: 1.4; }

/* Body */
.body { font-size: 1rem; font-weight: 400; line-height: 1.6; }
.small { font-size: 0.875rem; font-weight: 400; line-height: 1.5; }
```

## Spacing

```css
--space-xs: 0.25rem;   /* 4px */
--space-sm: 0.5rem;    /* 8px */
--space-md: 1rem;      /* 16px */
--space-lg: 1.5rem;    /* 24px */
--space-xl: 2rem;      /* 32px */
--space-2xl: 3rem;     /* 48px */
--space-3xl: 4rem;     /* 64px */
```

## Border Radius

```css
--radius-sm: 6px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 20px;
--radius-full: 9999px;
```

## Components

### Button Primary
```css
.btn-primary {
  background: linear-gradient(135deg, var(--primary), var(--primary-light));
  color: white;
  padding: 1rem 2rem;
  border-radius: var(--radius-md);
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(99, 102, 241, 0.4);
}
```

### Card
```css
.card {
  background: var(--bg-card);
  border-radius: var(--radius-xl);
  border: 1px solid rgba(99, 102, 241, 0.1);
  backdrop-filter: blur(10px);
}
```

### Input
```css
.input {
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: var(--radius-md);
  padding: 0.75rem 1rem;
  color: var(--text);
  width: 100%;
}

.input:focus {
  outline: none;
  border-color: var(--primary-light);
}
```

---

# COMPONENT SPECIFICATIONS

## C-001: Generation Form
```
Purpose: Accept user prompt and initiate generation
States: empty, typing, disabled, loading
Contains:
  - Textarea (max 600 chars)
  - Character counter
  - Generate button
Behavior:
  - Button disabled until prompt entered
  - Show "Generating..." state during generation
  - Clear on completion or error
```

## C-002: Progress Bar
```
Purpose: Show real-time generation progress
States: idle, progressing, complete, error
Contains:
  - Progress bar (0-100%)
  - Status text
Behavior:
  - Updates via WebSocket
  - Smooth animation on progress change
  - Show checkmark on complete
```

## C-003: Part Editor
```
Purpose: Manage model parts
States: empty, has-parts, editing
Contains:
  - Part list (draggable)
  - Add part button
  - Part cards (editable)
Behavior:
  - Default "Whole Model" part
  - Add/remove parts
  - Inline edit part name
  - Material dropdown per part
  - Volume input per part
  - Price display per part
```

## C-004: Material Selector
```
Purpose: Choose material for a part
States: closed, open
Contains:
  - Dropdown trigger
  - Material options (6)
  - Price indicator
Behavior:
  - Show description on hover
  - Update price on select
  - Close on select or click outside
```

## C-005: Scale Slider
```
Purpose: Adjust model size
States: default, dragging
Contains:
  - Slider (50%-300%)
  - Current value display
  - Min/max labels
Behavior:
  - Update price on change
  - Smooth transition
```

## C-006: Price Breakdown
```
Purpose: Show transparent pricing
States: collapsed, expanded
Contains:
  - Part prices
  - Subtotal
  - Shipping
  - Total
Behavior:
  - Update in real-time
  - Highlight changes
```

## C-007: AR Preview Modal
```
Purpose: Show model in AR
States: closed, loading, ready, error
Contains:
  - model-viewer element
  - AR button
  - Close button
Behavior:
  - Open in modal overlay
  - iOS: Quick Look
  - Android: Scene Viewer
  - Fallback: 3D rotate
```

---

# RESPONSIVE BREAKPOINTS

```css
/* Mobile First */
/* Default: 0-767px (mobile) */

/* Tablet */
@media (min-width: 768px) { }

/* Desktop */
@media (min-width: 1024px) { }

/* Large Desktop */
@media (min-width: 1280px) { }
```

---

# ACCESSIBILITY

## Requirements
- [ ] WCAG 2.1 AA compliance
- [ ] Keyboard navigation
- [ ] Screen reader support
- [ ] Color contrast ratio 4.5:1
- [ ] Focus indicators
- [ ] Alt text for images
- [ ] ARIA labels
- [ ] Reduced motion support

---

# HANDOFF TO DEVELOPER

## Components to Build
1. GenerationForm
2. ProgressBar
3. PartEditor
4. MaterialSelector
5. ScaleSlider
6. PriceBreakdown
7. ARModal (Phase 2)

## Pages
1. Home (/)
2. Customize (after generation)
3. Checkout (Stripe)
4. Confirmation
5. Login/Signup
6. Orders (history)

## State Management
- Use Zustand for global state
- Local state for form inputs
- Persist parts to localStorage

## Key Interactions
- WebSocket for progress
- Real-time price updates
- Part drag-and-drop (nice to have)

---

**STATUS:** ✅ COMPLETE - Ready for Developer
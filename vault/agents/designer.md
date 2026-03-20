# 🎨 FormFab - Complete UI/UX Study

## Agent: Designer
**Last Updated:** 2026-03-20 21:55 UTC
**Status:** ✅ COMPLETE

---

# USER JOURNEYS

## Journey 1: First-Time User (Guest)

```
Landing Page → Generate → Customize → Preview → [Download] OR [Sign Up to Order]
```

**Touchpoints:**
1. Hero with generator
2. Real-time generation progress
3. Part editor with materials
4. AR preview
5. Download CTA
6. Signup prompt for ordering

---

## Journey 2: Registered User

```
Login → Dashboard → Generate/Upload → Customize → AR Preview → Checkout → Order History
```

**Touchpoints:**
1. Login/Signup
2. User dashboard
3. Project management
4. Order flow
5. Order tracking

---

# PAGE INVENTORY

## Public Pages (No Auth Required)

| Page | Route | Purpose | Priority |
|------|-------|---------|----------|
| Landing/Home | `/` | Generate & customize | P0 |
| AR Preview | `/ar/:id` | AR view of model | P1 |
| Login | `/login` | User authentication | P0 |
| Signup | `/signup` | User registration | P0 |
| Pricing | `/pricing` | Material & pricing info | P2 |
| Gallery | `/gallery` | Public creations | P3 |

## Protected Pages (Auth Required)

| Page | Route | Purpose | Priority |
|------|-------|---------|----------|
| Dashboard | `/dashboard` | User's projects | P0 |
| Order History | `/orders` | Past orders | P1 |
| Order Detail | `/orders/:id` | Order status | P1 |
| Saved Models | `/models` | Saved designs | P1 |
| Model Editor | `/models/:id/edit` | Edit saved model | P2 |
| Checkout | `/checkout/:id` | Payment flow | P0 |
| Profile | `/profile` | Account settings | P2 |

---

# WIREFRAMES

## 1. Landing Page (`/`)

### Desktop Layout
```
┌──────────────────────────────────────────────────────────────────────────┐
│  [Logo: FormFab]                           [Gallery] [Login] [Sign Up]  │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│                    ✨ Multi-Material 3D Printing                         │
│                                                                          │
│                        Describe it. Customize it. Print it.              │
│                                                                          │
│      Transform ideas into multi-material products. You control           │
│      every part and material. Preview in AR before you order.            │
│                                                                          │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │  A robot figurine with metal joints and colorful face...       │   │
│   └────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│                        [ ✨ Generate 3D Model ]                         │
│                                                                          │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │  [Preview Image/3D Viewer]                                     │   │
│   │                                                                │   │
│   │  🔧 Parts: [Body ▼] [Joints ▼] [Face ▼] [+ Add Part]          │   │
│   │  📏 Scale: [────●────] 100%                                    │   │
│   │  💰 Total: $25.50                                              │   │
│   │                                                                │   │
│   │  [📱 View in AR]  [📥 Download]  [💳 Order Now]                │   │
│   └────────────────────────────────────────────────────────────────┘   │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│     How It Works                                                        │
│     ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│     │ 1.Describe│  │2.Customize│  │ 3.Preview │  │ 4.Receive│            │
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

### Mobile Layout
```
┌────────────────────┐
│ [☰] FormFab  [👤] │
├────────────────────┤
│                    │
│ ✨ Multi-Material  │
│    3D Printing     │
│                    │
│ Describe it.       │
│ Customize it.      │
│ Print it.          │
│                    │
│ ┌────────────────┐ │
│ │ [Text input]   │ │
│ └────────────────┘ │
│                    │
│ [Generate Model]   │
│                    │
│ ┌────────────────┐ │
│ │ [3D Preview]   │ │
│ │                │ │
│ │ Parts:         │ │
│ │ [Body ▼]       │ │
│ │ [Joints ▼]     │ │
│ │ [+ Add]        │ │
│ │                │ │
│ │ Scale: 100%    │ │
│ │ [────●────]    │ │
│ │                │ │
│ │ Total: $25.50  │ │
│ │                │ │
│ │ [AR] [DL] [💳] │ │
│ └────────────────┘ │
│                    │
│ How It Works       │
│ [1][2][3][4]       │
│                    │
│ Materials          │
│ [▣][▣][▣][▣]       │
│                    │
└────────────────────┘
```

---

## 2. Login Page (`/login`)

```
┌──────────────────────────────────────────────────────────────────────────┐
│  [Logo: FormFab]                                              [Home]    │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│                        ┌─────────────────────────┐                      │
│                        │      Welcome Back       │                      │
│                        │                         │                      │
│                        │  Email                  │                      │
│                        │  ┌───────────────────┐  │                      │
│                        │  │                   │  │                      │
│                        │  └───────────────────┘  │                      │
│                        │                         │                      │
│                        │  Password               │                      │
│                        │  ┌───────────────────┐  │                      │
│                        │  │                   │  │                      │
│                        │  └───────────────────┘  │                      │
│                        │                         │                      │
│                        │  [ ] Remember me        │                      │
│                        │                         │                      │
│                        │    [ Sign In ]          │                      │
│                        │                         │                      │
│                        │  ─────────────          │                      │
│                        │                         │                      │
│                        │  New here? [Sign Up]    │                      │
│                        │                         │                      │
│                        │  [Continue with Google] │                      │
│                        │  [Continue with GitHub] │                      │
│                        └─────────────────────────┘                      │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Dashboard (`/dashboard`)

```
┌──────────────────────────────────────────────────────────────────────────┐
│  [Logo]  [Dashboard] [Orders] [Models]           [🔔] [Profile] [Logout]│
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Welcome back, Yori! 👋                                                  │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  Quick Actions                                                   │  │
│  │  [✨ New Project]  [📤 Upload Model]  [📋 View Orders]           │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│  Recent Projects                                                         │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐      │
│  │ [Preview]   │ │ [Preview]   │ │ [Preview]   │ │ [+] New     │      │
│  │ Robot       │ │ Figurine    │ │ Custom Part │ │             │      │
│  │ 2 hours ago │ │ Yesterday   │ │ 3 days ago  │ │             │      │
│  │ [Edit] [🛒] │ │ [Edit] [🛒] │ │ [Edit] [🛒] │ │             │      │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘      │
│                                                                          │
│  Recent Orders                                                           │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │ Order #12345                    Status: 🟢 Processing           │  │
│  │ Robot Figurine (White Plastic + Steel)                          │  │
│  │ $35.50 • Est. delivery: Mar 25                                  │  │
│  │ [Track Order]                                                    │  │
│  ├─────────────────────────────────────────────────────────────────┤  │
│  │ Order #12344                    Status: 🟡 Printing             │  │
│  │ Custom Part (Full Color)                                        │  │
│  │ $22.00 • Est. delivery: Mar 23                                  │  │
│  │ [Track Order]                                                    │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│  Stats                                                                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐                  │
│  │ 15       │ │ 8        │ │ 3        │ │ $245.50  │                  │
│  │ Projects │ │ Orders   │ │ In Cart  │ │ Spent    │                  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘                  │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Order History (`/orders`)

```
┌──────────────────────────────────────────────────────────────────────────┐
│  [Logo]  [Dashboard] [Orders] [Models]           [🔔] [Profile] [Logout]│
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Order History                                [Filter ▼] [Search 🔍]   │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │ [✓] Order #12345        🟢 Processing     $35.50    [Details]  │  │
│  │     Robot Figurine      Est. Mar 25                             │  │
│  │     2 items • White Plastic + Steel                             │  │
│  ├─────────────────────────────────────────────────────────────────┤  │
│  │ [✓] Order #12344        🟡 Printing       $22.00    [Details]  │  │
│  │     Custom Part         Est. Mar 23                             │  │
│  │     1 item • Full Color                                         │  │
│  ├─────────────────────────────────────────────────────────────────┤  │
│  │ [✓] Order #12343        🔵 Shipped        $18.50    [Track]    │  │
│  │     Miniature           Arrives Mar 21                          │  │
│  │     1 item • Metallic Plastic                                   │  │
│  ├─────────────────────────────────────────────────────────────────┤  │
│  │ [✓] Order #12342        ⚫ Delivered       $45.00   [Reorder]  │  │
│  │     Collection Set      Delivered Mar 15                        │  │
│  │     3 items • Mixed Materials                                   │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│  Page 1 of 3  [<] [1] [2] [3] [>]                                       │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Order Detail (`/orders/:id`)

```
┌──────────────────────────────────────────────────────────────────────────┐
│  [← Back to Orders]                                      [Need Help?]   │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Order #12345                           Status: 🟢 Processing           │
│  Placed on Mar 20, 2026                 Estimated Delivery: Mar 25      │
│                                                                          │
│  Progress Tracker                                                        │
│  ━━━━●━━━━━━━━━○━━━━━━━━━○━━━━━━━━━○━━━━━━━━━○━━━━                    │
│  Order   Payment  Printing  Quality   Shipping  Delivered              │
│  Placed           Started   Check     Started                          │
│                                                                          │
│  Items (2)                                                             │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │ [Preview]  Body                                                 │  │
│  │            White Plastic • 30cm³                                │  │
│  │            $4.50                                                │  │
│  ├─────────────────────────────────────────────────────────────────┤  │
│  │ [Preview]  Joints                                               │  │
│  │            Steel • 10cm³                                        │  │
│  │            $12.00                                               │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│  Shipping Address                                                        │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │ Yori Jawad                                                      │  │
│  │ 123 Developer Street                                            │  │
│  │ San Francisco, CA 94102                                         │  │
│  │ United States                                                   │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│  Order Summary                                                           │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │ Subtotal                           $16.50                       │  │
│  │ Shipping                           $5.00                        │  │
│  │ Tax                                $1.00                        │  │
│  │ ─────────────────────────────────────────                        │  │
│  │ Total                              $22.50                       │  │
│  │                                                                │  │
│  │ Paid with Visa •••• 4242                                       │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│  [Download Invoice]  [Contact Support]  [Reorder]                       │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Checkout (`/checkout/:id`)

```
┌──────────────────────────────────────────────────────────────────────────┐
│  [Logo]                                              [Need Help?]       │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Checkout                                     Order Summary              │
│  ─────────                                      ─────────────            │
│                                                  ┌─────────────────┐   │
│  1. Shipping Address                              │ [Preview]       │   │
│  ┌─────────────────────────────────────────┐     │ Robot Figurine  │   │
│  │ Full Name                               │     │                 │   │
│  │ ┌─────────────────────────────────────┐ │     │ 2 items         │   │
│  │ │                                     │ │     │ $16.50          │   │
│  │ └─────────────────────────────────────┘ │     │                 │   │
│  │                                         │     │ Shipping: $5.00 │   │
│  │ Email                                   │     │ Tax: $1.00      │   │
│  │ ┌─────────────────────────────────────┐ │     │ ─────────────── │   │
│  │ │                                     │ │     │ Total: $22.50   │   │
│  │ └─────────────────────────────────────┘ │     └─────────────────┘   │
│  │                                         │                            │
│  │ Street Address                          │  2. Payment               │
│  │ ┌─────────────────────────────────────┐ │  ┌─────────────────────┐  │
│  │ │                                     │ │  │ [🃏 Card] [PayPal] │  │
│  │ └─────────────────────────────────────┘ │  │                     │  │
│  │                                         │  │ Card Number         │  │
│  │ City              State    ZIP          │  │ ┌─────────────────┐ │  │
│  │ ┌──────────────┐ ┌──────┐ ┌──────────┐ │  │ │                 │ │  │
│  │ │              │ │      │ │          │ │  │ └─────────────────┘ │  │
│  │ └──────────────┘ └──────┘ └──────────┘ │  │                     │  │
│  │                                         │  │ Exp Date    CVV     │  │
│  │ Country                               │  │ ┌─────────┐ ┌───────┐ │  │
│  │ ┌─────────────────────────────────────┐ │  │ │ MM/YY   │ │ •••   │ │  │
│  │ │ United States                       │ │  │ └─────────┘ └───────┘ │  │
│  │ └─────────────────────────────────────┘ │  │                     │  │
│  │                                         │  │ [ Pay $22.50 ]      │  │
│  │ [ ] Same as billing address             │  │                     │  │
│  │                                         │  │ 🔒 Secure checkout  │  │
│  └─────────────────────────────────────────┘  └─────────────────────┘  │
│                                                                          │
│  [← Back]                                                                │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 7. AR Preview Page (`/ar/:id`)

### Mobile (AR Mode)
```
┌────────────────────────────────┐
│ [← Back]          [📷 Switch] │
│                                │
│    ┌──────────────────┐       │
│    │                  │       │
│    │   [AR VIEW]      │       │
│    │                  │       │
│    │   3D Model       │       │
│    │   in your space  │       │
│    │                  │       │
│    │                  │       │
│    └──────────────────┘       │
│                                │
│  Tap to place model            │
│  Pinch to scale                │
│  Rotate with one finger        │
│                                │
│  ┌──────────────────────────┐ │
│  │ Current: 100%            │ │
│  │ [────●────]              │ │
│  │ 50%        100%   300%   │ │
│  └──────────────────────────┘ │
│                                │
│  [💾 Save View] [📤 Share]    │
│                                │
└────────────────────────────────┘
```

### Desktop (3D Viewer Fallback)
```
┌──────────────────────────────────────────────────────────────────────────┐
│  [← Back]                                    [Full Screen] [AR Mode 📱] │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                                                                 │   │
│  │                    [3D MODEL VIEWER]                            │   │
│  │                                                                 │   │
│  │         Click + drag to rotate                                  │   │
│  │         Scroll to zoom                                          │   │
│  │         Right-click + drag to pan                               │   │
│  │                                                                 │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  View Controls                                                           │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ [🔄 Reset] [🔍 Zoom In] [🔎 Zoom Out] [🎯 Auto Rotate: ✓]      │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  Material Preview                                                        │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ [White] [Black] [Full Color] [Metallic] [Steel] [Rubber]        │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  [💾 Save View] [📤 Share] [💳 Order This]                              │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

# COMPONENT LIBRARY

## Core Components

### Buttons
```css
.btn-primary {
  background: linear-gradient(135deg, #6366f1, #818cf8);
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
}

.btn-secondary {
  background: transparent;
  border: 2px solid rgba(99, 102, 241, 0.5);
  color: #f1f5f9;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
}

.btn-danger {
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid #ef4444;
  color: #ef4444;
  padding: 0.5rem 1rem;
  border-radius: 8px;
}
```

### Cards
```css
.card {
  background: rgba(30, 41, 59, 0.7);
  border-radius: 16px;
  border: 1px solid rgba(99, 102, 241, 0.1);
  backdrop-filter: blur(10px);
}
```

### Inputs
```css
.input {
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: #f1f5f9;
}
```

### Status Badges
```css
.badge-processing { background: rgba(59, 130, 246, 0.2); color: #3b82f6; }
.badge-printing { background: rgba(245, 158, 11, 0.2); color: #f59e0b; }
.badge-shipped { background: rgba(16, 185, 129, 0.2); color: #10b981; }
.badge-delivered { background: rgba(107, 114, 128, 0.2); color: #6b7280; }
```

---

# RESPONSIVE BREAKPOINTS

```css
/* Mobile First */
/* Default: 0-767px */

/* Tablet */
@media (min-width: 768px) { }

/* Desktop */
@media (min-width: 1024px) { }

/* Large Desktop */
@media (min-width: 1280px) { }
```

---

# ACCESSIBILITY REQUIREMENTS

- [ ] WCAG 2.1 AA compliance
- [ ] Keyboard navigation for all interactive elements
- [ ] Screen reader labels for all buttons/icons
- [ ] Color contrast ratio 4.5:1 minimum
- [ ] Focus indicators on all interactive elements
- [ ] Alt text for all images
- [ ] ARIA labels for complex components
- [ ] Reduced motion support
- [ ] Error messages announced to screen readers

---

# DESIGN PRINCIPLES

1. **User Control First** - AI assists, user decides
2. **Transparent Pricing** - No hidden fees, always visible
3. **Progressive Disclosure** - Show complexity as needed
4. **Immediate Feedback** - Real-time updates everywhere
5. **Mobile-First** - Touch-friendly, large tap targets
6. **Dark Theme** - Default dark mode for 3D work
7. **Accessibility** - WCAG AA compliance required

---

*This document serves as the complete UI/UX specification for FormFab.*
# 🎨 Designer Agent

## Role
UX flows, UI design, user experience.

## Current Status
**Last Updated:** 2026-03-20
**Status:** Active

---

## Input from Tech Lead
- Next.js 14 frontend
- WebSocket for real-time
- model-viewer for AR
- Mobile-first approach

---

## User Flows

### Flow 1: Generation Flow
```
[Home] → [Enter Prompt] → [Generating...] → [Customize] → [Download/Order]
```

**States:**
1. **Empty state:** Prompt input, placeholder
2. **Generating:** Progress bar, status updates
3. **Customize:** Parts, materials, scale, price
4. **Complete:** Download, order, share

---

### Flow 2: Multi-Part Customization
```
[Model Ready] → [Add Parts] → [Assign Materials] → [Set Scale] → [Review Price] → [Order]
```

**Key Interactions:**
- Add part button
- Material dropdown per part
- Volume input per part
- Scale slider
- Live price updates

---

## UI Components

### Implemented
- [x] Hero section with generator
- [x] Progress bar with WebSocket
- [x] Part editor (add/remove/edit)
- [x] Material dropdown
- [x] Scale slider
- [x] Price breakdown
- [x] Materials reference section

### Needed
- [ ] AR preview modal
- [ ] Order confirmation flow
- [ ] User account UI
- [ ] Order history
- [ ] Error states
- [ ] Loading skeletons

---

## Design System

### Colors
```
Primary:      #6366f1 (Indigo)
Primary Light: #818cf8
Accent:       #f472b6 (Pink)
Background:   #0f172a (Dark)
Text:         #f1f5f9
Text Muted:   #94a3b8
Success:      #4ade80
Error:        #f87171
```

### Typography
```
Font:     Inter / System UI
H1:       3rem, 900 weight
H2:       2rem, 800 weight
Body:     1rem, 400 weight
Small:    0.875rem, 400 weight
```

### Spacing
```
xs:  0.25rem
sm:  0.5rem
md:  1rem
lg:  1.5rem
xl:  2rem
2xl: 3rem
```

### Components
```
Button Primary:   Gradient background, 12px radius
Button Secondary: Transparent border
Card:             12-20px radius, glass morphism
Input:            Dark background, light border
Dropdown:         Dark theme, light text
```

---

## Mobile Considerations

- Touch-friendly controls
- Large tap targets (48px+)
- Swipe gestures for AR
- Responsive grid layouts
- Bottom sheet for options

---

## UX Principles

1. **User is in control** - AI assists, doesn't decide
2. **Progressive disclosure** - Show complexity as needed
3. **Immediate feedback** - Real-time updates everywhere
4. **Error prevention** - Validate before processing
5. **Transparent pricing** - Always visible, no surprises

---

## Next Design Tasks
1. [ ] AR preview modal design
2. [ ] Order flow wireframes
3. [ ] Error state designs
4. [ ] Mobile optimization
5. [ ] Animation polish

---

*Pass specs to Developer*
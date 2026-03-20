# FormFab — Text/Image to 3D Print Service

**Tagline:** Describe it. Print it. Ship it.

## Overview

FormFab is a SaaS platform that transforms text prompts or images into 3D-printed products, handling the entire pipeline from AI generation to physical delivery.

## Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **UI:** TailwindCSS + shadcn/ui
- **3D Viewer:** Three.js / React Three Fiber
- **State:** Zustand
- **Payments:** Stripe

### Backend
- **Runtime:** Node.js + Fastify
- **Database:** PostgreSQL (via Supabase)
- **Auth:** Supabase Auth
- **File Storage:** Supabase Storage
- **Queue:** BullMQ + Redis

### External APIs
- **Meshy AI** — Text/Image → 3D Model generation
- **Shapeways** — 3D printing & fulfillment

## Architecture

```
User Input (text/image)
       ↓
   Meshy AI API → 3D Model (GLB/STL)
       ↓
   Preview in Three.js viewer
       ↓
   User selects material & size
       ↓
   Stripe checkout
       ↓
   Shapeways API → Print + Ship
       ↓
   Order tracking
```

## Revenue Model

- Cost: Meshy ($0.01-0.10) + Shapeways ($5-50) + Shipping ($5-10)
- Price: $30-100+ depending on size/material
- Margin: 50-200% markup

## Phases

### Phase 1: MVP Core (Current)
- [ ] Landing page
- [ ] Text to 3D generation
- [ ] Basic 3D viewer
- [ ] Material selection (5 materials)
- [ ] Stripe checkout
- [ ] Shapeways fulfillment integration
- [ ] Order tracking

### Phase 2: Enhanced Features
- [ ] Image to 3D generation
- [ ] User accounts & auth
- [ ] Order history
- [ ] Model refinement tools
- [ ] Custom sizing options

### Phase 3: Scale
- [ ] Subscription plans
- [ ] API for developers
- [ ] White-label option
- [ ] B2B corporate swag

## Project Structure

```
formfab/
├── frontend/          # Next.js app
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── public/
├── backend/           # Fastify API
│   ├── src/
│   │   ├── routes/
│   │   ├── services/
│   │   └── lib/
│   └── tests/
└── shared/            # Shared types & utilities
    └── types/
```

## Getting Started

```bash
# Frontend
cd frontend && npm install && npm run dev

# Backend
cd backend && npm install && npm run dev
```

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
```

### Backend (.env)
```
DATABASE_URL=postgresql://...
MESHY_API_KEY=xxx
SHAPEWAYS_CLIENT_ID=xxx
SHAPEWAYS_CLIENT_SECRET=xxx
STRIPE_SECRET_KEY=sk_test_xxx
```

---

Built by **Lava ✨** for Yori & Jinx
# FormFab — Intelligent 3D Manufacturing Platform

**Tagline:** Describe it. We figure out the rest.

## Overview

FormFab transforms text prompts into multi-material, manufacturing-ready 3D products. We're not just an API wrapper — we're an **intelligence layer** between creative intent and physical production.

## 🎯 What Makes Us Different

### We're NOT Just:
- A Meshy API wrapper
- A Shapeways frontend
- A single-material print service

### We ARE:
- **Material Intelligence** — AI analyzes models and recommends optimal materials per part
- **Measurement Confidence** — AR preview ensures users know exactly what they're getting
- **Assembly-Aware** — Complex products become sub-parts with clear assembly paths

## The Problem We Solve

**Current 3D printing services:**
1. Force users to pick ONE material for the entire product
2. Don't help users understand scale/measurements
3. Can't handle multi-part, multi-material assemblies

**Our solution:**
1. AI analyzes the model → recommends materials per part
2. AR preview shows true scale in user's environment
3. Manufacturing receives clear sub-part instructions with material assignments

## Example User Flow

```
User: "A robot figurine with movable joints"

Step 1: AI Generation (Meshy)
→ 3D model created

Step 2: Intelligence Layer (FormFab)
→ Identify parts: body, joints, eyes, base
→ Recommend materials:
  • Body → White Plastic (lightweight)
  • Joints → Metal pins (durable, articulated)
  • Eyes → Full Color (expressive)
  • Base → Heavy Plastic (stability)

Step 3: AR Preview (FormFab)
→ User sees figurine on their desk
→ Adjusts scale with slider
→ Sees price update in real-time

Step 4: Manufacturing (Shapeways)
→ 4 sub-models sent with material assignments
→ User receives kit or pre-assembled product
```

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         FORMFAB PLATFORM                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────┐    ┌──────────────────┐    ┌──────────────────┐   │
│  │   Frontend  │    │ Intelligence API  │    │   AR Preview     │   │
│  │   (Next.js) │    │   (Fastify)       │    │   (WebXR/Native) │   │
│  │             │    │                  │    │                  │   │
│  │ • Generator │    │ • Material AI    │    │ • Scale preview  │   │
│  │ • Materials │───▶│ • Part analysis │───▶│ • Material view  │   │
│  │ • Checkout  │    │ • Pricing calc   │    │ • Share/Social   │   │
│  │ • Orders    │    │ • Assembly guide │    │                  │   │
│  └─────────────┘    └──────────────────┘    └──────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        EXTERNAL SERVICES                            │
├─────────────────────────────────────────────────────────────────────┤
│  Meshy AI        → Text/Image to 3D                                │
│  Shapeways       → Multi-material manufacturing & fulfillment      │
│  Stripe          → Payments                                        │
│  Supabase        → Auth, Database, Storage                         │
└─────────────────────────────────────────────────────────────────────┘
```

## Tech Stack

### Frontend
- Next.js 14 (App Router)
- Three.js / React Three Fiber (3D viewer)
- Model Viewer (AR preview)
- TailwindCSS
- Zustand (state)

### Backend
- Fastify (Node.js)
- WebSocket (real-time progress)
- PostgreSQL (via Supabase)
- BullMQ + Redis (job queue)

### External APIs
- **Meshy AI** — Text-to-3D, Image-to-3D
- **Shapeways** — 40+ materials, manufacturing, shipping

## Available Materials

| Category | Material | Price/cm³ | Best For |
|----------|----------|-----------|----------|
| Budget | White Plastic | $0.15 | Standard parts |
| Budget | Black Plastic | $0.18 | Contrasting parts |
| Premium | Metallic Plastic | $0.35 | Premium look, plastic cost |
| Premium | Full Color | $0.45 | Detailed, colorful parts |
| Flexible | Rubber/TPE | $0.50 | Grips, flexible parts |
| Durable | Steel | $1.20 | Structural, joints |
| Luxury | Bronze | $1.80 | Premium display pieces |
| Luxury | Silver | $3.50 | Jewelry, heirlooms |

## Key Features

### Implemented ✅
- Text-to-3D generation (Meshy)
- Real-time progress via WebSocket
- Material selection (single)
- Basic landing page

### Next Up 🚧
- AI material recommendation per part
- Multi-part model analysis
- Dimension editor
- AR preview (WebXR)

### Future 🔮
- Assembly instruction generation
- Kit vs pre-assembled options
- Native AR app
- Social sharing

## Revenue Model

**Cost Structure:**
- Meshy: $0.05-0.30 per generation
- Shapeways: $5-50+ per product
- Shipping: $5-15

**Pricing Strategy:**
- Base product (single material): $25-50
- Multi-material upgrade: +40-100%
- AR preview: Included free (conversion driver)
- Rush manufacturing: +50%

**Target Margins:**
- Single material: 50%
- Multi-material: 70%+ (upsell value)

## Competitive Moat

1. **Material Intelligence** — No competitor does AI-based material recommendation
2. **AR Preview** — Reduces returns, increases confidence
3. **Assembly Awareness** — We decompose complex models into manufacturable parts
4. **End-to-End Experience** — From idea to doorstep, one platform

## Project Structure

```
formfab/
├── frontend/          # Next.js app
├── backend/           # Fastify API
├── .planning/         # Vision, roadmap, research
│   ├── VISION.md      # The differentiator
│   ├── ROADMAP.md     # Phased build plan
│   ├── REQUIREMENTS.md
│   └── research/
└── README.md
```

---

**Built by Lava ✨ for Yori & Jinx**

*This is a $1M+ product opportunity. Material intelligence + AR preview = defensible competitive moat.*
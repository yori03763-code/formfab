# FormFab

## What This Is

A SaaS platform that transforms text prompts or images into 3D-printed products, handling the entire pipeline from AI generation to physical delivery.

## Core Value

**Describe it. Print it. Ship it.**

Users describe what they want in plain English → AI generates 3D model → User previews → User selects material → Payment → Product shipped to their door.

## Constraints

- **Budget:** Minimal startup costs (no inventory, just-in-time manufacturing via Shapeways)
- **Timeline:** MVP in weeks, not months
- **Tech:** Must use existing APIs (Meshy AI for generation, Shapeways for fulfillment)
- **No 3D expertise required:** Users should never need to know CAD or modeling

## Vision

Make 3D printing accessible to everyone. No design skills needed. Just describe your idea and receive it in the mail.

## Target Users

1. **Gift buyers** — Custom figurines, personalized items
2. **Small businesses** — Prototypes, promotional items
3. **Gamers/hobbyists** — Miniatures, game pieces
4. **Educators** — Teaching aids, models

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Meshy AI for 3D generation | Best text-to-3D API, supports multiple formats | Pending |
| Shapeways for fulfillment | No inventory, 60+ materials, ships worldwide | Pending |
| Next.js + Fastify | Modern stack, good DX, scalable | Pending |

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] User can input text prompt describing 3D object
- [ ] System generates 3D model from prompt
- [ ] User can preview 3D model in browser
- [ ] User can select material for printing
- [ ] User can checkout and pay
- [ ] System sends order to fulfillment partner
- [ ] User receives order confirmation

### Out of Scope

- Custom CAD/model upload (v2)
- Subscription plans (v3)
- B2B white-label (v3)

---
*Last updated: 2026-03-20 after initialization*
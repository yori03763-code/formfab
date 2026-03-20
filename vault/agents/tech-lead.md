# 🏗️ Tech Lead - Architecture Complete

## Agent: Tech Lead
**Last Sync:** 2026-03-20 17:56 UTC
**Status:** ✅ COMPLETE
**Input From:** Product Owner

---

# ARCHITECTURE OVERVIEW

## System Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │   Browser  │  │  iOS Safari │  │ Android     │            │
│  │   (PWA)    │  │ Quick Look  │  │ Scene Viewer│            │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘            │
│         │                │                │                    │
│         └────────────────┼────────────────┘                    │
│                          │                                      │
│              ┌───────────▼───────────┐                         │
│              │   Next.js Frontend    │                         │
│              │   - React 18          │                         │
│              │   - Three.js          │                         │
│              │   - model-viewer      │                         │
│              │   - Zustand (state)   │                         │
│              └───────────┬───────────┘                         │
└──────────────────────────┼──────────────────────────────────────┘
                           │
                           │ HTTPS / WSS
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│                       BACKEND                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    Fastify Server                        │   │
│  │  - REST API                                             │   │
│  │  - WebSocket Server                                     │   │
│  │  - BullMQ Job Queue                                     │   │
│  └─────────────────────────────────────────────────────────┘   │
│              │                │                │               │
│  ┌───────────▼───┐  ┌────────▼────────┐  ┌───▼───────────┐   │
│  │   Meshy API   │  │  Shapeways API  │  │  Stripe API   │   │
│  │  (Generation) │  │  (Manufacturing)│  │  (Payments)   │   │
│  └───────────────┘  └─────────────────┘  └───────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│                      DATA LAYER                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │    Supabase     │  │      Redis      │  │   Cloudflare    │ │
│  │    PostgreSQL   │  │   (Job Queue)   │  │      R2         │ │
│  │    Auth + DB    │  │                 │  │   (File Store)  │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

# TECH STACK DECISIONS

## Frontend

| Technology | Version | Rationale |
|------------|---------|-----------|
| Next.js | 14.x | App Router, SSR, API routes |
| React | 18.x | Component ecosystem |
| TypeScript | 5.x | Type safety |
| Three.js | 0.160+ | 3D rendering |
| React Three Fiber | 8.x | Declarative 3D |
| model-viewer | 3.x | AR preview (WebXR) |
| Zustand | 4.x | Simple state management |
| TailwindCSS | 3.x | Rapid styling |

## Backend

| Technology | Version | Rationale |
|------------|---------|-----------|
| Node.js | 20.x LTS | JavaScript runtime |
| Fastify | 4.x | Fast, simple, WebSocket |
| TypeScript | 5.x | Type safety |
| BullMQ | 5.x | Job queue |
| Redis | 7.x | Queue backend, caching |

## Data

| Technology | Purpose | Rationale |
|------------|---------|-----------|
| Supabase | Database + Auth | Managed PostgreSQL, real-time |
| Redis | Job queue | BullMQ requirement |
| Cloudflare R2 | File storage | S3-compatible, cheap |

## External APIs

| API | Purpose | Status |
|-----|---------|--------|
| Meshy AI | 3D generation | ✅ Integrated |
| Shapeways | Manufacturing | 🔜 Pending |
| Stripe | Payments | 🔜 Pending |

---

# ARCHITECTURE DECISION RECORDS (ADRs)

## ADR-001: Next.js over Remix
**Date:** 2026-03-20  
**Status:** Accepted

**Context:** Need a React framework for SSR and routing.

**Decision:** Use Next.js 14 with App Router.

**Rationale:**
- Larger ecosystem
- Better documentation
- Vercel integration
- API routes built-in
- App Router is modern

**Consequences:**
- React Server Components available
- Deployable to Vercel easily

---

## ADR-002: Fastify over Express
**Date:** 2026-03-20  
**Status:** Accepted

**Context:** Need Node.js backend with WebSocket support.

**Decision:** Use Fastify 4.x.

**Rationale:**
- 2x faster than Express
- Native WebSocket via plugin
- Better async/await support
- Schema validation built-in

**Consequences:**
- Smaller ecosystem than Express
- Team needs to learn Fastify

---

## ADR-003: Supabase for Auth + DB
**Date:** 2026-03-20  
**Status:** Accepted

**Context:** Need user auth and database.

**Decision:** Use Supabase for both.

**Rationale:**
- Managed PostgreSQL
- Row-level security
- Real-time subscriptions
- Free tier for development
- Auth included

**Consequences:**
- Vendor lock-in
- Free tier limits

---

## ADR-004: Stripe for Payments
**Date:** 2026-03-20  
**Status:** Accepted

**Context:** Need payment processing.

**Decision:** Use Stripe Checkout.

**Rationale:**
- Best-in-class API
- Hosted checkout (less liability)
- Webhooks for events
- Good documentation

**Consequences:**
- 2.9% + $0.30 per transaction
- Must handle webhooks

---

## ADR-005: model-viewer for AR
**Date:** 2026-03-20  
**Status:** Accepted

**Context:** Need AR preview without app.

**Decision:** Use Google's model-viewer.

**Rationale:**
- WebXR standard
- iOS Quick Look support
- Android Scene Viewer
- No app download needed
- Simple integration

**Consequences:**
- Limited customization
- Requires HTTPS

---

## ADR-006: BullMQ for Job Queue
**Date:** 2026-03-20  
**Status:** Accepted

**Context:** Need async job processing for 3D generation.

**Decision:** Use BullMQ with Redis.

**Rationale:**
- Reliable job queue
- Retries, delays, priorities
- UI dashboard available
- Active maintenance

**Consequences:**
- Redis required
- Additional complexity

---

# DATABASE SCHEMA

## Users (Supabase Auth)
```sql
-- Handled by Supabase
-- id, email, created_at, etc.
```

## Models
```sql
CREATE TABLE models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  prompt TEXT NOT NULL,
  meshy_task_id TEXT,
  status TEXT DEFAULT 'pending',
  model_url TEXT,
  thumbnail_url TEXT,
  parts JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Parts
```sql
CREATE TABLE parts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id UUID REFERENCES models(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  material_id INTEGER,
  volume_cm3 INTEGER DEFAULT 30,
  price_cents INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Orders
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  model_id UUID REFERENCES models(id),
  stripe_session_id TEXT,
  stripe_payment_intent_id TEXT,
  status TEXT DEFAULT 'pending',
  total_cents INTEGER,
  shipping_address JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  paid_at TIMESTAMPTZ,
  shipped_at TIMESTAMPTZ
);
```

## Materials
```sql
CREATE TABLE materials (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price_per_cm3 NUMERIC(10,4),
  description TEXT,
  properties TEXT[]
);

INSERT INTO materials VALUES
  (6, 'White Plastic', 0.15, 'Lightweight, affordable', ARRAY['rigid', 'versatile']),
  (26, 'Black Plastic', 0.18, 'Sleek, modern', ARRAY['rigid', 'aesthetic']),
  (25, 'Full Color', 0.45, 'Detailed, colorful', ARRAY['detailed', 'expressive']),
  (80, 'Metallic Plastic', 0.35, 'Premium look', ARRAY['premium', 'durable']),
  (77, 'Steel', 1.20, 'Very durable', ARRAY['strong', 'heavy']),
  (50, 'Rubber/TPE', 0.50, 'Flexible, grippy', ARRAY['flexible', 'soft']);
```

---

# API DESIGN

## REST Endpoints

### Generation
```
POST   /api/generate/text     Start text-to-3D generation
GET    /api/generate/:id      Get generation status
DELETE /api/generate/:id      Cancel generation
```

### Models
```
GET    /api/models            List user's models
GET    /api/models/:id        Get model details
POST   /api/models            Save model
DELETE /api/models/:id        Delete model
```

### Parts
```
POST   /api/models/:id/parts      Add part to model
PUT    /api/parts/:id             Update part
DELETE /api/parts/:id             Remove part
```

### Pricing
```
POST   /api/pricing           Calculate price
```

### Orders
```
POST   /api/orders            Create order
GET    /api/orders            List orders
GET    /api/orders/:id        Get order details
```

### Payments
```
POST   /api/checkout          Create Stripe session
POST   /api/webhook/stripe    Stripe webhook handler
```

### Materials
```
GET    /api/materials         List available materials
```

## WebSocket Events

### Client → Server
```
subscribe:generation:{id}    Subscribe to generation updates
```

### Server → Client
```
progress: { percent, status }
complete: { modelUrl, thumbnailUrl }
error: { message }
```

---

# INFRASTRUCTURE

## Development
| Service | Provider | Cost |
|---------|----------|------|
| Frontend | Local | $0 |
| Backend | VPS | $6/mo |
| Database | Supabase Free | $0 |
| Redis | Local | $0 |
| Tunnels | Cloudflare | $0 |

## Production
| Service | Provider | Cost |
|---------|----------|------|
| Frontend | Vercel Pro | $20/mo |
| Backend | Railway | $5-20/mo |
| Database | Supabase Pro | $25/mo |
| Redis | Upstash | $10/mo |
| Files | Cloudflare R2 | ~$1/mo |
| **Total** | | **~$60-80/mo** |

---

# SECURITY

## Authentication
- Supabase Auth (JWT)
- Email/password + OAuth (Google, GitHub)
- Session management

## Authorization
- Row-level security in Supabase
- Users can only access their own data

## API Security
- Rate limiting (100 req/min per user)
- Input validation (Zod)
- CORS restricted to production domain
- API keys stored in environment variables

## Payment Security
- Stripe handles PCI compliance
- Webhook signature verification
- Idempotency keys for orders

---

# TECHNICAL DEBT

| Item | Severity | Effort | Status |
|------|----------|--------|--------|
| No tests | Critical | 2 days | 🔜 TODO |
| No error handling | High | 1 day | 🔜 TODO |
| Hardcoded URLs | High | 2 hours | 🔜 TODO |
| No rate limiting | Medium | 2 hours | 🔜 TODO |
| No monitoring | Medium | 4 hours | 🔜 TODO |

---

# HANDOFF TO DESIGNER

## Technical Constraints
- Next.js 14 App Router
- TailwindCSS for styling
- model-viewer for AR
- Mobile-first responsive
- WebSocket for real-time

## Key UI Components Needed
1. Generation flow (prompt → progress → result)
2. Part editor (add/edit/remove parts)
3. Material selector (dropdown + descriptions)
4. Scale slider
5. Price breakdown
6. AR preview modal
7. Checkout flow
8. Order confirmation

## Performance Requirements
- First paint < 1s
- Interactive < 3s
- WebSocket reconnect < 2s
- AR model load < 5s

---

**STATUS:** ✅ COMPLETE - Ready for Designer
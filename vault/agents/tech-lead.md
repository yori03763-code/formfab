# 🏗️ Tech Lead Agent

## Role
Architecture decisions, tech stack, infrastructure.

## Current Status
**Last Updated:** 2026-03-20
**Status:** Active

---

## Input from Product Owner
- Multi-part system required
- Real-time progress via WebSocket
- AR preview coming
- Payment integration needed

---

## Architecture

### System Overview
```
┌─────────────────────────────────────────────────────────┐
│                     FRONTEND                             │
│  Next.js 14 + React Three Fiber + WebSocket Client      │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                     BACKEND                              │
│  Fastify + WebSocket + Job Queue (BullMQ)               │
└────────────────────┬────────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
   ┌─────────┐  ┌─────────┐  ┌─────────┐
   │ Meshy   │  │Shapeways│  │ Supabase│
   │   API   │  │   API   │  │   DB    │
   └─────────┘  └─────────┘  └─────────┘
```

---

## Tech Stack Decisions

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Frontend | Next.js 14 | App Router, SSR, great DX |
| 3D Viewer | React Three Fiber | Declarative 3D, good DX |
| AR | model-viewer | WebXR standard, no app needed |
| Backend | Fastify | Fast, simple, WebSocket support |
| Database | PostgreSQL (Supabase) | Managed, real-time, auth |
| Queue | BullMQ + Redis | Job processing, retries |
| Payments | Stripe | Industry standard |
| Hosting | Cloudflare Tunnels | Quick deploy, will use proper hosting |

---

## ADRs (Architecture Decision Records)

### ADR-001: WebSocket for Real-time Progress
**Status:** Accepted  
**Context:** Users need to see generation progress  
**Decision:** WebSocket over polling  
**Consequences:** Better UX, more complex backend

### ADR-002: Multi-part Material System
**Status:** Accepted  
**Context:** Users need control over materials per part  
**Decision:** Client-side part management with server-side validation  
**Consequences:** Flexible, but pricing validation needed

### ADR-003: AR via WebXR
**Status:** Proposed  
**Context:** Users need to preview scale  
**Decision:** Use model-viewer for WebXR (iOS Quick Look + Android Scene Viewer)  
**Consequences:** No app download required

---

## Infrastructure

### Current (Development)
- Backend: VPS with cloudflared tunnel
- Frontend: Same VPS, port 3000
- Database: Supabase (free tier)

### Production (Needed)
- Backend: Railway / Fly.io / AWS
- Frontend: Vercel / Cloudflare Pages
- Database: Supabase Pro
- CDN: Cloudflare
- Monitoring: Sentry

---

## Technical Debt

| Item | Severity | Effort | Status |
|------|----------|--------|--------|
| No tests | High | Medium | 🔜 TODO |
| Hardcoded tunnel URLs | Medium | Low | 🔜 TODO |
| No error boundaries | Medium | Low | 🔜 TODO |
| Missing input validation | High | Low | 🔜 TODO |
| No rate limiting | Medium | Low | 🔜 TODO |

---

## Security Considerations

1. **API Keys:** Meshy key in backend only ✅
2. **CORS:** Currently allows all (restrict in production)
3. **Rate Limiting:** Not implemented (needed)
4. **Input Validation:** Basic (needs improvement)
5. **Authentication:** Not implemented (Phase 3)

---

## API Design

### Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /health | Health check |
| GET | /api/materials | List available materials |
| POST | /api/generate/text | Start text-to-3D |
| GET | /api/generate/:taskId | Get generation status |
| WS | /ws/generate/:taskId | Real-time progress |
| POST | /api/analyze | Analyze prompt for parts |
| POST | /api/pricing | Calculate price |

---

## Next Tasks
1. [ ] Add integration tests
2. [ ] Implement rate limiting
3. [ ] Set up CI/CD
4. [ ] Add proper error handling

---

*Pass specs to Designer*
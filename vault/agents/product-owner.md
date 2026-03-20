# 📋 Product Owner Agent

## Role
Define features, prioritize backlog, manage roadmap.

## Current Status
**Last Updated:** 2026-03-20
**Status:** Active

---

## Input from Business Analyst
- Multi-material is key differentiator
- Target: hobbyist creators, product designers
- Pricing: $25-120 range
- Focus on reducing returns with AR preview

---

## Feature Backlog

### P0 - Must Have (MVP)
| Feature | Priority | Status | Notes |
|---------|----------|--------|-------|
| Text-to-3D generation | Critical | ✅ Done | Meshy integration |
| WebSocket progress | Critical | ✅ Done | Real-time updates |
| Part management | Critical | ✅ Done | Add/remove/edit parts |
| Material selection | Critical | ✅ Done | 6 materials |
| Scale control | High | ✅ Done | Slider 50%-300% |
| Price calculation | Critical | ✅ Done | Per-part pricing |

### P1 - Should Have
| Feature | Priority | Status | Notes |
|---------|----------|--------|-------|
| AI material suggestions | High | 🚧 In Progress | Optional assist |
| AR preview | High | 🔜 Next | WebXR |
| User accounts | Medium | 🔜 Planned | Supabase auth |
| Order history | Medium | 🔜 Planned | Database |

### P2 - Nice to Have
| Feature | Priority | Status | Notes |
|---------|----------|--------|-------|
| Image-to-3D | Medium | 🔜 Planned | Meshy API |
| Assembly instructions | Medium | 🔜 Planned | Auto-generate |
| Social sharing | Low | 🔜 Planned | AR screenshots |
| Gallery | Low | 🔜 Planned | Community |

---

## User Stories

### US-001: Multi-Material Creator
**As a** hobbyist creator  
**I want to** assign different materials to different parts of my model  
**So that** I get a higher quality, more functional product

**Acceptance Criteria:**
- [ ] User can add multiple parts
- [ ] Each part has independent material selection
- [ ] Price updates in real-time
- [ ] User sees total cost before ordering

**Status:** ✅ Implemented

---

### US-002: Scale Confidence
**As a** first-time buyer  
**I want to** see my model at true scale  
**So that** I know exactly what I'm getting

**Acceptance Criteria:**
- [ ] Scale slider from 50% to 300%
- [ ] Reference objects for comparison
- [ ] Dimensions shown in cm and inches
- [ ] AR preview (Phase 3)

**Status:** 🚧 Partial (slider done, AR pending)

---

### US-003: Material Intelligence
**As a** non-technical user  
**I want** AI to suggest materials for my parts  
**So that** I don't have to be a materials expert

**Acceptance Criteria:**
- [ ] AI analyzes prompt for part types
- [ ] Shows recommendations with rationale
- [ ] User can override suggestions
- [ ] User remains in control

**Status:** 🔜 Next (after human controls work)

---

## Priority Matrix

```
High Value ↑
    │  [AR Preview]        [AI Suggestions]
    │  
    │  [Order Flow]       [User Accounts]
    │
    │  [Image-to-3D]      [Gallery]
    │
    └──────────────────────────────────→ High Effort
           Low Effort
```

---

## Roadmap

### Q1 2026 (Current)
- [x] Core generation
- [x] WebSocket progress
- [x] Multi-part system
- [x] Material selection

### Q2 2026
- [ ] AR preview
- [ ] AI material assist
- [ ] User accounts
- [ ] Payment flow

### Q3 2026
- [ ] Image-to-3D
- [ ] Assembly instructions
- [ ] B2B features

---

## Decisions Needed
1. [ ] Payment provider (Stripe vs others)
2. [ ] AR library (model-viewer vs custom)
3. [ ] User auth provider (Supabase vs Auth0)

---

*Pass requirements to Tech Lead*
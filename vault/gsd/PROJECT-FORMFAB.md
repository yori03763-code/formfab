# GSD Project: FormFab 100% Thesis Alignment

**Project ID:** FORMFAB-2026-001  
**Created:** 2026-03-21  
**Target Completion:** 2026-08-21 (22 weeks)  
**Priority:** CRITICAL  
**Status:** PHASE 1 IN PROGRESS

---

## Project Overview

**Goal:** Achieve 100% alignment with thesis vision by implementing all missing features documented in GAP-ANALYSIS-FRONTEND-VS-THESIS.md

**Current State:** 42% of thesis vision implemented  
**Target State:** 100% of thesis vision implemented  
**Gap:** 58% (74 requirements missing)

---

## Success Criteria

### Phase 1 Success (Visualization)
- [ ] Three.js rendering at 60 FPS desktop
- [ ] GLB model loading from Meshy API
- [ ] Per-part material visualization
- [ ] Rotate/zoom/pan controls
- [ ] Part highlighting on hover
- [ ] Part isolation mode

### Phase 2 Success (Assembly)
- [ ] Automated parts list generation
- [ ] Step-by-step instruction generation
- [ ] Visual diagram generation
- [ ] Quality checklists
- [ ] Troubleshooting database

### Phase 3 Success (AI)
- [ ] NLP intent extraction (>90% accuracy)
- [ ] Material knowledge graph
- [ ] AI recommendations with rationale
- [ ] Alternative materials with trade-offs
- [ ] Continuous learning pipeline

### Phase 4 Success (AR)
- [ ] model-viewer integration
- [ ] AR Quick Look (iOS)
- [ ] Scene Viewer (Android)
- [ ] True-scale placement
- [ ] Material preview in AR

### Phase 5 Success (Production)
- [ ] Supabase authentication
- [ ] Stripe payment processing
- [ ] Shapeways order creation
- [ ] GDPR/CCPA compliance
- [ ] Performance targets met (P95 <500ms)

---

## Phase Breakdown

| Phase | Duration | Requirements | Effort | Priority |
|-------|----------|--------------|--------|----------|
| Phase 1: Core Visualization | 4 weeks | 18 | 2-3 dev-weeks | 🔴 Critical |
| Phase 2: Assembly Docs | 4 weeks | 21 | 3-4 dev-weeks | 🔴 Critical |
| Phase 3: AI Enhancement | 6 weeks | 15 | 4-6 dev-weeks | 🔴 Critical |
| Phase 4: AR & Polish | 4 weeks | 10 | 1-2 dev-weeks | 🟡 High |
| Phase 5: Production | 4 weeks | 10 | 2-3 dev-weeks | 🔴 Critical |

**Total:** 22 weeks, 74 requirements, 12-18 dev-weeks

---

## Dependencies

### External Dependencies
- Meshy AI API (3D generation)
- Shapeways API (manufacturing)
- Stripe API (payments)
- Supabase (auth + database)
- Cloudflare (CDN + tunneling)

### Internal Dependencies
```
Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5
   ↓          ↓          ↓          ↓          ↓
 3D Viewer  Assembly   AI Recs    AR       Production
            Manuals    Engine    Preview   Ready
```

### Critical Path
```
Week 1-4:  Phase 1 (Visualization) ─┬─→ Week 9-14:  Phase 3 (AI)
                                    │
Week 5-8:  Phase 2 (Assembly)  ─────┘
                                          ↓
                                    Week 15-18: Phase 4 (AR)
                                          ↓
                                    Week 19-22: Phase 5 (Production)
```

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Three.js performance issues | Medium | High | LOD implementation, lazy loading |
| Meshy API rate limits | High | Medium | Caching, queue system |
| AI model accuracy <85% | Medium | High | Human review fallback |
| Stripe integration delays | Low | High | Start early, use test mode |
| Shapeways API changes | Low | Medium | API abstraction layer |
| Team capacity constraints | Medium | High | Prioritize ruthlessly, defer non-critical |

---

## Resource Requirements

### Development Team
- **Frontend Developer:** 1 FTE (Phases 1, 4)
- **Backend Developer:** 1 FTE (Phases 2, 3, 5)
- **AI/ML Engineer:** 0.5 FTE (Phase 3)
- **QA Engineer:** 0.5 FTE (Phases 1-5)

### Infrastructure
- **Development:** Existing setup
- **Testing:** Supabase test instance, Stripe test mode
- **Staging:** Railway staging environment
- **Production:** Vercel + Railway production

### Budget
| Category | Estimated Cost |
|----------|---------------|
| Development (22 weeks) | $88,000 (2 devs @ $2k/week) |
| AI/ML Engineer (6 weeks) | $12,000 |
| QA (11 weeks) | $11,000 |
| Infrastructure | $2,200 ($100/week × 22) |
| APIs (Meshy, Stripe, etc.) | $3,000 |
| **Total** | **$116,200** |

---

## Governance

### Weekly Cadence
- **Monday:** Sprint planning (1 hour)
- **Wednesday:** Mid-week check-in (30 min)
- **Friday:** Demo + retrospective (1 hour)

### Milestone Reviews
- **End of Phase 1:** Go/No-Go decision for Phase 2
- **End of Phase 2:** Go/No-Go decision for Phase 3
- **End of Phase 3:** Go/No-Go decision for Phase 4
- **End of Phase 4:** Go/No-Go decision for Phase 5
- **End of Phase 5:** Launch readiness review

### Reporting
- **Weekly Status Report:** Every Friday EOD
- **Burn-down Chart:** Updated daily
- **Risk Register:** Updated weekly
- **Budget Tracking:** Updated weekly

---

## Document Control

| Document | Location | Owner | Last Updated |
|----------|----------|-------|--------------|
| Project Charter | This file | PM | 2026-03-21 |
| Gap Analysis | vault/GAP-ANALYSIS-FRONTEND-VS-THESIS.md | Tech Lead | 2026-03-21 |
| Thesis | vault/THESIS-MULTI-MATERIAL-AI*.md | Research | 2026-03-21 |
| Phase Plans | vault/gsd/phases/*.md | Phase Leads | TBD |
| Sprint Backlogs | vault/gsd/sprints/*.md | Dev Team | Weekly |

---

## Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Project Sponsor | Yori | | |
| Project Manager | Lava AI | | 2026-03-21 |
| Tech Lead | TBD | | |
| Product Owner | TBD | | |

---

**Next Action:** Begin Phase 1 Research (Chapter 1 of GSD workflow)

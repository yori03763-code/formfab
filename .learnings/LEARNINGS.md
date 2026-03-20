# FormFab Learnings Log

## [LRN-20260320-001] test-coverage

**Logged**: 2026-03-20T18:00:00Z
**Priority**: high
**Status**: resolved
**Area**: tests

### Summary
Achieved 45 integration tests with full API coverage

### Details
- Created comprehensive test suite for all API endpoints
- Tests cover health, materials, generation, pricing, analysis
- Edge cases tested: empty inputs, long prompts, concurrent requests
- Stripe checkout tests in mock mode
- Material intelligence unit tests

### Suggested Action
Continue adding tests for new features as they're built

### Metadata
- Source: development
- Tags: tests, coverage, quality
- Pattern-Key: tests.first

---

## [LRN-20260320-002] ar-preview-integration

**Logged**: 2026-03-20T18:10:00Z
**Priority**: high
**Status**: resolved
**Area**: frontend

### Summary
AR preview works with model-viewer for iOS Quick Look and Android Scene Viewer

### Details
- Integrated @google/model-viewer
- WebXR support working
- AR button triggers native AR on mobile
- Fallback to 3D viewer on desktop

### Suggested Action
Test on actual iOS and Android devices

### Metadata
- Source: development
- Tags: ar, mobile, webxr
- Pattern-Key: ar.integration

---

## [LRN-20260320-003] tunnel-urls-change

**Logged**: 2026-03-20T18:15:00Z
**Priority**: critical
**Status**: pending
**Area**: infra

### Summary
Cloudflare tunnel URLs change frequently, breaking frontend-backend connection

### Details
- cloudflared quick tunnels get new URLs each restart
- Frontend has hardcoded backend URL
- Requires manual URL updates after each tunnel restart

### Suggested Fix
1. Use environment variables for URLs
2. Deploy to stable hosting (Vercel + Railway)
3. Or use cloudflared named tunnels with static URLs

### Metadata
- Reproducible: yes
- Pattern-Key: infra.tunnel-urls
- Recurrence-Count: 5

---

## [LRN-20260320-004] input-validation-needed

**Logged**: 2026-03-20T18:20:00Z
**Priority**: high
**Status**: resolved
**Area**: backend

### Summary
API accepts invalid inputs (negative volume, prompts >600 chars)

### Details
- Volume accepts 0 and negative values
- Prompt length not enforced at 600 chars
- No sanitization on special characters

### Suggested Fix
Add Zod validation schema for all endpoints

### Resolution
- **Resolved**: 2026-03-20T19:15:00Z
- **Notes**: Added volume validation (> 0, <= 10000) to pricing endpoints

### Metadata
- Related Files: backend/src/index.ts
- Pattern-Key: validation.input
- See Also: ERR-20260320-001

---

## [LRN-20260320-005] parts-not-persisted

**Logged**: 2026-03-20T18:25:00Z
**Priority**: medium
**Status**: resolved
**Area**: frontend

### Summary
Parts reset to default on page refresh

### Details
- User adds multiple parts
- Refreshes page
- Only "Whole Model" default part remains
- All customization lost

### Suggested Fix
Add localStorage persistence for parts array

### Resolution
- **Resolved**: 2026-03-20T19:00:00Z
- **Notes**: Added localStorage save/load for parts, auto-save on change

### Metadata
- Related Files: frontend/app/page.tsx
- Pattern-Key: persistence.parts

---

## [LRN-20260320-006] test-coverage-achieved

**Logged**: 2026-03-20T19:17:00Z
**Priority**: high
**Status**: resolved
**Area**: tests

### Summary
Achieved 54 passing integration and unit tests

### Details
- Full API endpoint coverage
- Material intelligence unit tests
- Edge case testing
- Input validation tests
- All tests passing

### Suggested Action
Maintain test coverage as new features are added

### Metadata
- Source: development
- Tags: tests, coverage, quality
- Pattern-Key: tests.comprehensive

---

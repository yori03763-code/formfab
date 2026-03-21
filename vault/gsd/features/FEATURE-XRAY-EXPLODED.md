# GSD Feature Plan: X-Ray & Exploded View Modes

**Feature ID:** FORMFAB-FEATURE-001  
**Priority:** HIGH (Thesis requirement Ch 9, 19)  
**Status:** RESEARCH → PLANNING → EXECUTION  
**ETA:** 2-3 hours

---

## Thesis Requirements

### Chapter 9: 3D Rendering Architecture
- [ ] X-ray mode (see internal structure)
- [ ] Exploded view capability

### Chapter 19: Visual Assembly Guides
- [ ] Exploded view diagrams
- [ ] Assembly sequence visualization

---

## Research Phase

### X-Ray Mode Research

**Purpose:** Allow users to see internal structure of multi-part assemblies

**Technical Approaches:**

#### Option 1: CSS/Shader Transparency (Recommended)
- Apply opacity to outer parts
- Highlight internal parts
- Real-time toggle
- **Pros:** Fast, no model modification needed
- **Cons:** Less realistic
- **Implementation:** 2-3 hours

#### Option 2: Clipping Planes
- Slice through model
- Show cross-section
- **Pros:** More accurate
- **Cons:** Complex implementation
- **Implementation:** 6-8 hours

#### Option 3: Duplicate Models
- Outer shell model (transparent)
- Inner parts model (visible)
- **Pros:** Clean separation
- **Cons:** Requires model prep
- **Implementation:** 4-6 hours

**Decision:** Option 1 (CSS/Shader Transparency) - Fastest, good enough for MVP

---

### Exploded View Research

**Purpose:** Show how parts fit together for assembly

**Technical Approaches:**

#### Option 1: Offset Along Normals (Recommended)
- Calculate part centers
- Offset each part outward from center
- Animate transition
- **Pros:** Works with any model, automatic
- **Cons:** May need tuning for complex assemblies
- **Implementation:** 3-4 hours

#### Option 2: Pre-defined Explosion Paths
- Define explosion direction per part
- Store in model metadata
- **Pros:** Precise control
- **Cons:** Requires manual setup
- **Implementation:** 6-8 hours

#### Option 3: Physics-Based Explosion
- Simulate explosion with physics
- Parts fly apart naturally
- **Pros:** Realistic
- **Cons:** Overkill, performance heavy
- **Implementation:** 8-12 hours

**Decision:** Option 1 (Offset Along Normals) - Automatic, good results

---

## Planning Phase

### X-Ray Mode Implementation Plan

**Components:**
1. `ModelViewer.tsx` - Add x-ray toggle
2. `PartHighlight.tsx` - Add transparency control
3. `ViewerControls.tsx` - Add X-ray button

**State:**
```typescript
interface ViewerState {
  xrayMode: boolean;
  xrayOpacity: number; // 0.1 - 0.5
}
```

**UI:**
- Toggle button in viewer controls
- Slider for opacity adjustment
- Icon: 🩻 or 👁️

**Implementation Steps:**
1. Add xrayMode state to ModelViewer
2. Pass xrayMode to PartHighlight components
3. Apply material opacity based on xrayMode
4. Add toggle button to controls
5. Add opacity slider
6. Test with multi-part model

---

### Exploded View Implementation Plan

**Components:**
1. `ModelViewer.tsx` - Add exploded toggle
2. `PartHighlight.tsx` - Add offset transform
3. `ViewerControls.tsx` - Add explode button/slider

**State:**
```typescript
interface ViewerState {
  explodedMode: boolean;
  explosionFactor: number; // 0 - 2 (0 = normal, 2 = fully exploded)
}
```

**Algorithm:**
```typescript
function calculateExplosionOffset(part, center, factor) {
  const partCenter = getPartCenter(part);
  const direction = normalize(partCenter - center);
  return direction * factor * explosionScale;
}
```

**UI:**
- Toggle button for explode/collapse
- Slider for explosion amount
- Icon: 💥 or 📦

**Implementation Steps:**
1. Calculate model center point
2. Calculate each part's offset direction
3. Apply transform based on explosionFactor
4. Add toggle button to controls
5. Add slider for explosion amount
6. Animate transition (lerp)
7. Test with multi-part model

---

## Execution Phase

### Sprint: X-Ray & Exploded View (4 hours)

**Hour 1: X-Ray Mode**
- [ ] Add xrayMode state
- [ ] Implement transparency shader
- [ ] Add toggle button
- [ ] Test functionality

**Hour 2: Exploded View (Algorithm)**
- [ ] Calculate model center
- [ ] Calculate part offsets
- [ ] Implement explosion algorithm
- [ ] Test with sample model

**Hour 3: Exploded View (UI)**
- [ ] Add explodedMode state
- [ ] Add toggle button
- [ ] Add explosion slider
- [ ] Animate transitions

**Hour 4: Polish & Testing**
- [ ] Test both modes together
- [ ] Add keyboard shortcuts (X for x-ray, E for explode)
- [ ] Add tooltips
- [ ] Performance testing
- [ ] Bug fixes

---

## Acceptance Criteria

### X-Ray Mode
- [ ] Toggle button visible in viewer controls
- [ ] Clicking toggles x-ray mode
- [ ] Outer parts become transparent (30% opacity)
- [ ] Inner parts remain visible
- [ ] Works with 2+ part assemblies
- [ ] Performance: >30 FPS with x-ray enabled

### Exploded View
- [ ] Toggle button visible in viewer controls
- [ ] Clicking toggles exploded view
- [ ] Slider controls explosion amount (0-100%)
- [ ] Parts move outward from center
- [ ] Smooth animation (lerp)
- [ ] Returns to normal when collapsed
- [ ] Works with 2+ part assemblies
- [ ] Performance: >30 FPS with explosion enabled

### Combined
- [ ] Both modes can be used together
- [ ] No visual artifacts
- [ ] No performance degradation
- [ ] Mobile responsive (touch controls)
- [ ] Keyboard shortcuts work

---

## Technical Specifications

### File Changes

**New Files:**
- `components/ModelViewer/ViewerControls.tsx` (new)
- `components/ModelViewer/useXrayMode.ts` (new)
- `components/ModelViewer/useExplodedView.ts` (new)

**Modified Files:**
- `components/ModelViewer/ModelViewer.tsx`
- `components/ModelViewer/PartHighlight.tsx`
- `app/page.tsx` (add controls to UI)

### Dependencies

No new dependencies needed - pure Three.js/React Three Fiber

### Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| FPS (normal) | 60 | Chrome DevTools |
| FPS (x-ray) | 60 | Chrome DevTools |
| FPS (exploded) | 60 | Chrome DevTools |
| FPS (both) | 60 | Chrome DevTools |
| Memory | <256MB | Chrome DevTools |
| Load time | <3s | Network tab |

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Performance issues | Medium | Medium | LOD, simplify shaders |
| Complex models break | Low | High | Test with 10+ parts |
| Mobile touch issues | Medium | Low | Test on mobile, add touch controls |
| Animation janky | Low | Medium | Use lerp, optimize updates |

---

## Success Metrics

- [ ] 100% of acceptance criteria met
- [ ] All tests passing
- [ ] Performance targets met
- [ ] No console errors
- [ ] Mobile responsive
- [ ] User tested (Yori approval)

---

**Next Action:** Begin implementation (Hour 1: X-Ray Mode)

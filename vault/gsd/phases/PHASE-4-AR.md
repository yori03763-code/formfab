# Phase 4: AR & Polish

**Phase ID:** FORMFAB-PHASE-4  
**Duration:** 4 weeks (2026-06-27 to 2026-07-25)  
**Priority:** HIGH  
**Dependencies:** Phase 1 (3D Viewer)  
**Status:** PENDING

---

## Phase Goal

Implement AR preview system per thesis Chapter 13 and polish user experience.

**Success Metric:** 89% user satisfaction with AR feature, 67% increase in conversion rate.

---

## Thesis Requirements (Chapter 13)

- [ ] WebXR integration
- [ ] AR Quick Look (iOS)
- [ ] Scene Viewer (Android)
- [ ] model-viewer component
- [ ] True-scale placement
- [ ] Material preview in AR
- [ ] Share AR view capability

**Total Requirements:** 7  
**Current Completion:** 0/7 (0%)  
**Target Completion:** 7/7 (100%)

---

## Implementation Plan

### Week 15: AR Foundation
**Goal:** Basic AR functionality

**Tasks:**
1. [ ] Install model-viewer component
2. [ ] Integrate with existing 3D models
3. [ ] Add AR button to viewer
4. [ ] Test on iOS (Quick Look)
5. [ ] Test on Android (Scene Viewer)

### Week 16: AR Features
**Goal:** Advanced AR capabilities

**Tasks:**
1. [ ] Implement true-scale placement
2. [ ] Add material preview in AR
3. [ ] Implement AR environment mapping
4. [ ] Add lighting estimation
5. [ ] Test accuracy of scale

### Week 17: Share & Polish
**Goal:** Social features and UX polish

**Tasks:**
1. [ ] Implement share AR view
2. [ ] Add AR screenshots
3. [ ] Add AR recording
4. [ ] Performance optimization
5. [ ] Error handling

### Week 18: Testing & Documentation
**Goal:** Production-ready AR

**Tasks:**
1. [ ] Device testing (10+ devices)
2. [ ] Performance testing
3. [ ] Accessibility audit
4. [ ] Documentation
5. [ ] User testing

---

## Technical Specifications

### model-viewer Integration

```typescript
interface ARViewerProps {
  modelUrl: string;
  materials: Material[];
  scale: number;
  onARStart: () => void;
  onAREnd: () => void;
}

// HTML
<model-viewer
  src={modelUrl}
  ar
  ar-modes="webxr scene-viewer quick-look"
  camera-controls
  auto-rotate
  shadow-intensity="1"
/>
```

---

## Definition of Done

- [ ] All 7 requirements implemented
- [ ] 89%+ user satisfaction
- [ ] Works on 95%+ of devices
- [ ] Documentation complete

---

**Dependencies:** Phase 1 must be complete (3D models)

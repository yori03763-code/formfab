# Sprint 1: Three.js Foundation

**Sprint ID:** FORMFAB-SPRINT-01  
**Phase:** Phase 1 (Visualization)  
**Duration:** 1 week (2026-03-21 to 2026-03-28)  
**Status:** IN PROGRESS

---

## Sprint Goal

Set up Three.js foundation with basic 3D viewer capable of loading and displaying GLB models with rotate/zoom/pan controls.

---

## Sprint Backlog

### Story 1: Install Dependencies
**ID:** FORMFAB-1.1  
**Priority:** P0  
**Estimate:** 2 hours  
**Status:** TODO

**Tasks:**
- [ ] Install `three` v0.160.0+
- [ ] Install `@react-three/fiber` v8.15.0+
- [ ] Install `@react-three/drei` v9.92.0+
- [ ] Verify installations
- [ ] Update package.json

**Acceptance Criteria:**
- All packages installed
- No dependency conflicts
- TypeScript types working

---

### Story 2: Create ModelViewer Component
**ID:** FORMFAB-1.2  
**Priority:** P0  
**Estimate:** 4 hours  
**Status:** TODO

**Tasks:**
- [ ] Create `components/ModelViewer/ModelViewer.tsx`
- [ ] Set up basic component structure
- [ ] Add TypeScript types
- [ ] Create basic scene
- [ ] Add camera setup
- [ ] Add renderer

**Acceptance Criteria:**
- Component renders without errors
- Basic 3D scene visible
- TypeScript types defined

**Technical Notes:**
```typescript
// Basic structure
export interface ModelViewerProps {
  modelUrl?: string;
  onModelLoad?: (model: GLTF) => void;
  onError?: (error: Error) => void;
}

export const ModelViewer: React.FC<ModelViewerProps> = ({
  modelUrl,
  onModelLoad,
  onError
}) => {
  return (
    <Canvas>
      <Scene />
    </Canvas>
  );
};
```

---

### Story 3: Implement GLB Loading
**ID:** FORMFAB-1.3  
**Priority:** P0  
**Estimate:** 4 hours  
**Status:** TODO

**Tasks:**
- [ ] Create `Model.tsx` component
- [ ] Implement GLB loader using useGLTF hook
- [ ] Add loading state
- [ ] Add error handling
- [ ] Test with sample GLB model

**Acceptance Criteria:**
- Can load GLB from URL
- Loading state visible during load
- Error state shown on failure
- Model appears in scene

**Technical Notes:**
```typescript
import { useGLTF } from '@react-three/drei';

function Model({ url }: { url: string }) {
  const { scene, isLoading, error } = useGLTF(url);
  
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorState error={error} />;
  
  return <primitive object={scene} />;
}
```

---

### Story 4: Add OrbitControls
**ID:** FORMFAB-1.4  
**Priority:** P0  
**Estimate:** 2 hours  
**Status:** TODO

**Tasks:**
- [ ] Import OrbitControls from drei
- [ ] Wrap in Controls component
- [ ] Configure controls (enableZoom, enableRotate, enablePan)
- [ ] Test rotate functionality
- [ ] Test zoom functionality
- [ ] Test pan functionality

**Acceptance Criteria:**
- Left click + drag rotates model
- Right click + drag pans
- Scroll zooms in/out
- Smooth controls

**Technical Notes:**
```typescript
import { OrbitControls } from '@react-three/drei';

function Controls() {
  return (
    <OrbitControls
      enableZoom={true}
      enableRotate={true}
      enablePan={true}
      minDistance={1}
      maxDistance={100}
    />
  );
}
```

---

### Story 5: Add Lighting
**ID:** FORMFAB-1.5  
**Priority:** P1  
**Estimate:** 2 hours  
**Status:** TODO

**Tasks:**
- [ ] Create `Lighting.tsx` component
- [ ] Add ambient light
- [ ] Add directional light
- [ ] Configure shadows
- [ ] Test lighting on model

**Acceptance Criteria:**
- Model properly lit
- Shadows visible
- No harsh shadows
- Good visibility from all angles

**Technical Notes:**
```typescript
function Lighting() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
      />
    </>
  );
}
```

---

### Story 6: Test with Sample Model
**ID:** FORMFAB-1.6  
**Priority:** P0  
**Estimate:** 2 hours  
**Status:** TODO

**Tasks:**
- [ ] Find sample GLB model (use Meshy sample or Three.js example)
- [ ] Load model in viewer
- [ ] Test all controls
- [ ] Test on desktop browser
- [ ] Test on mobile browser
- [ ] Document any issues

**Acceptance Criteria:**
- Sample model loads successfully
- All controls work on desktop
- All controls work on mobile
- Performance acceptable (>30 FPS)

**Test Models:**
- https://threejs.org/examples/models/gltf/Duck/glTF/Duck.gltf
- Or use Meshy API generated model

---

### Story 7: Performance Baseline
**ID:** FORMFAB-1.7  
**Priority:** P1  
**Estimate:** 2 hours  
**Status:** TODO

**Tasks:**
- [ ] Set up FPS counter (use @react-three/drei Stats)
- [ ] Measure FPS on desktop
- [ ] Measure FPS on mobile
- [ ] Document baseline metrics
- [ ] Identify performance issues

**Acceptance Criteria:**
- FPS counter visible in dev mode
- Desktop FPS documented
- Mobile FPS documented
- Performance issues identified

---

## Sprint Metrics

### Velocity
- **Planned:** 18 hours
- **Committed:** 18 hours

### Definition of Done
- [ ] All stories completed
- [ ] Code reviewed
- [ ] Tests passing
- [ ] Documentation updated
- [ ] Deployed to staging

### Risks
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Three.js learning curve | Medium | Low | Use React Three Fiber (easier) |
| Performance issues | Low | Medium | Start with simple models |
| Browser compatibility | Low | Low | Test early on multiple browsers |

---

## Daily Standup Notes

### Day 1 (2026-03-21)
**Done:**
- Sprint planning completed
- Dependencies installed

**TODO:**
- Create ModelViewer component
- Implement GLB loading

**Blockers:** None

### Day 2 (2026-03-22)
**TODO:**
- Complete ModelViewer component
- Add OrbitControls
- Add lighting

### Day 3 (2026-03-23)
**TODO:**
- Test with sample model
- Performance baseline
- Bug fixes

### Day 4 (2026-03-24)
**TODO:**
- Final testing
- Documentation
- Sprint review prep

### Day 5 (2026-03-25)
**TODO:**
- Sprint review
- Sprint retrospective
- Sprint 2 planning

---

## Sprint Review Checklist

- [ ] Demo: 3D viewer loads model
- [ ] Demo: Rotate/zoom/pan works
- [ ] Demo: Loading states visible
- [ ] Demo: Error handling works
- [ ] Performance metrics reviewed
- [ ] Sprint goals met: Yes/No

---

**Next Sprint:** Sprint 2 - Material Visualization (Week 2)

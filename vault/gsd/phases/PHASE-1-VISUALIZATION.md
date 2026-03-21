# Phase 1: Core Visualization

**Phase ID:** FORMFAB-PHASE-1  
**Duration:** 4 weeks (2026-03-21 to 2026-04-18)  
**Priority:** CRITICAL  
**Status:** RESEARCH COMPLETE → PLANNING IN PROGRESS

---

## Phase Goal

Implement complete 3D visualization system per thesis Chapters 8-10, enabling users to see, rotate, and inspect their multi-material 3D models before ordering.

**Success Metric:** Users can view 3D model with per-part material visualization at 60 FPS on desktop, 30 FPS on mobile.

---

## Thesis Requirements (Chapters 8-10)

### Chapter 8: Visualization Need
- [ ] 3D model rendering (60 FPS desktop)
- [ ] Material preview per part
- [ ] Part isolation mode
- [ ] Exploded view capability
- [ ] Scale reference objects
- [ ] Real-time updates (<200ms)

### Chapter 9: 3D Rendering Architecture
- [ ] Three.js + React Three Fiber integration
- [ ] GLB model loading from Meshy API
- [ ] Material mapping per part
- [ ] Lighting and shadows
- [ ] User interaction (rotate, zoom, pan)
- [ ] Performance targets (60/30 FPS)

### Chapter 10: Material Visualization
- [ ] Visual property database for materials
- [ ] Part highlighting on hover
- [ ] Selection mode (click to select)
- [ ] Isolation mode (hide other parts)
- [ ] X-ray mode (internal structure)
- [ ] Material appearance preview

**Total Requirements:** 18  
**Current Completion:** 0/18 (0%)  
**Target Completion:** 18/18 (100%)

---

## Research Summary

### Technology Stack Research

#### Three.js Ecosystem
**Recommended Stack:**
- `three` v0.160.0+ (core 3D engine)
- `@react-three/fiber` v8.15.0+ (React renderer)
- `@react-three/drei` v9.92.0+ (helpers)
- `@react-three/postprocessing` v2.15.0+ (effects)

**Rationale:**
- React Three Fiber provides declarative React API
- Drei includes pre-built controls (OrbitControls, etc.)
- Strong community support, active maintenance
- Compatible with Next.js 16

**Installation:**
```bash
npm install three @react-three/fiber @react-three/drei
```

#### Model Format
**Recommended:** GLB (glTF Binary)

**Rationale:**
- Compressed format (smaller file sizes)
- Supports materials, textures, animations
- Native support in Three.js
- Meshy API outputs GLB

#### AR Integration
**Recommended:** `model-viewer` v3.5.0+

**Rationale:**
- Google-maintained
- Supports both iOS (Quick Look) and Android (Scene Viewer)
- WebXR support
- Easy integration with existing 3D models

**Installation:**
```html
<script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"></script>
```

### Performance Research

#### Optimization Strategies
1. **Level of Detail (LOD)**
   - High poly: 100K+ polygons (desktop, zoomed in)
   - Medium poly: 30K polygons (desktop, default)
   - Low poly: 10K polygons (mobile)

2. **Texture Compression**
   - Use KTX2 format with Basis Universal
   - Reduces texture size by 70-90%

3. **Lazy Loading**
   - Load models only when visible
   - Progressive loading (low-res first)

4. **Instancing**
   - For repeated parts (screws, joints)
   - Reduces draw calls

#### Performance Targets
| Metric | Desktop Target | Mobile Target |
|--------|---------------|---------------|
| FPS | 60 | 30 |
| Initial Load | <3s | <5s |
| Interaction Latency | <16ms | <33ms |
| Memory Usage | <256MB | <128MB |

### User Experience Research

#### Interaction Patterns
**Best Practices from Industry:**
1. **Orbit Controls** (standard for 3D viewers)
   - Left click + drag: Rotate
   - Right click + drag: Pan
   - Scroll: Zoom

2. **Part Selection**
   - Hover: Highlight part
   - Click: Select part, show info panel
   - Double-click: Isolate part

3. **View Presets**
   - Default view
   - Top view
   - Front view
   - Side view
   - Exploded view

#### Accessibility
**WCAG 2.1 AA Requirements:**
- Keyboard navigation support
- Screen reader labels for parts
- High contrast mode
- Reduced motion option

---

## Implementation Plan

### Week 1: Foundation
**Goal:** Basic 3D viewer with model loading

**Tasks:**
1. [ ] Install Three.js dependencies
2. [ ] Create ModelViewer component
3. [ ] Implement GLB loading from URL
4. [ ] Add OrbitControls (rotate/zoom/pan)
5. [ ] Add basic lighting (ambient + directional)
6. [ ] Test with sample GLB model

**Deliverables:**
- ModelViewer component
- Basic scene with lighting
- Working rotate/zoom/pan

**Acceptance Criteria:**
- Can load GLB model from URL
- Can rotate model 360°
- Can zoom in/out
- Can pan around model
- Maintains 60 FPS on desktop

### Week 2: Material Visualization
**Goal:** Per-part material display

**Tasks:**
1. [ ] Create material property database
2. [ ] Implement material mapping (part → material)
3. [ ] Add material appearance (color, roughness, metalness)
4. [ ] Implement part highlighting on hover
5. [ ] Add part info tooltip on hover
6. [ ] Test with multi-material model

**Deliverables:**
- Material database (6 materials)
- Per-part material rendering
- Hover highlighting

**Acceptance Criteria:**
- Each part shows correct material appearance
- Hover highlights part
- Tooltip shows part name + material
- Materials visually distinct

### Week 3: Advanced Features
**Goal:** Part isolation and interaction

**Tasks:**
1. [ ] Implement part selection (click)
2. [ ] Add part isolation mode
3. [ ] Add X-ray mode (transparent parts)
4. [ ] Add exploded view
5. [ ] Add view presets (top, front, side)
6. [ ] Add scale reference object

**Deliverables:**
- Part selection system
- Isolation mode
- X-ray mode
- Exploded view
- View presets

**Acceptance Criteria:**
- Click selects part
- Isolation mode hides other parts
- X-ray shows internal structure
- Exploded view separates parts
- Scale reference visible

### Week 4: Polish & Performance
**Goal:** Production-ready viewer

**Tasks:**
1. [ ] Implement LOD system
2. [ ] Add texture compression
3. [ ] Implement lazy loading
4. [ ] Add loading states
5. [ ] Add error handling
6. [ ] Performance testing (desktop + mobile)
7. [ ] Accessibility audit
8. [ ] Documentation

**Deliverables:**
- Optimized viewer
- Loading states
- Error handling
- Performance report
- Documentation

**Acceptance Criteria:**
- 60 FPS on desktop (tested)
- 30 FPS on mobile (tested)
- Loading states visible
- Errors handled gracefully
- Keyboard accessible
- Screen reader compatible

---

## Technical Specifications

### Component Architecture

```
components/
├── ModelViewer/
│   ├── ModelViewer.tsx        # Main viewer component
│   ├── Scene.tsx              # Three.js scene setup
│   ├── Lighting.tsx           # Lighting setup
│   ├── Controls.tsx           # OrbitControls wrapper
│   ├── Model.tsx              # GLB model loader
│   ├── PartHighlight.tsx      # Hover highlighting
│   ├── PartInfo.tsx           # Part tooltip
│   ├── MaterialPreview.tsx    # Material swatches
│   └── ViewPresets.tsx        # View buttons
├── ARViewer/
│   ├── ARViewer.tsx           # model-viewer wrapper
│   └── ARButton.tsx           # AR trigger button
└── shared/
    ├── LoadingSpinner.tsx     # Loading state
    └── ErrorState.tsx         # Error state
```

### Material Database Schema

```typescript
interface Material {
  id: number;
  name: string;
  visualProperties: {
    baseColor: string;        // Hex color
    roughness: number;        // 0-1
    metalness: number;        // 0-1
    transparency: number;     // 0-1
    texture?: string;         // Texture URL
    normalMap?: string;       // Normal map URL
  };
  mechanicalProperties: {
    tensileStrength: number;  // MPa
    elongation: number;       // %
  };
  costPerCm3: number;         // USD
}
```

### State Management

```typescript
interface ViewerState {
  model: GLTF | null;
  selectedPart: string | null;
  isolatedPart: string | null;
  viewMode: 'default' | 'xray' | 'exploded';
  zoom: number;
  rotation: [number, number];
  materials: Map<string, Material>;
  loading: boolean;
  error: Error | null;
}
```

---

## Risk Mitigation

### Risk 1: Performance Issues
**Mitigation:**
- Implement LOD from day 1
- Use texture compression
- Test on low-end devices weekly
- Have fallback to static images if needed

### Risk 2: Meshy API Changes
**Mitigation:**
- Abstract API calls behind service layer
- Cache models locally
- Have sample models for testing

### Risk 3: Browser Compatibility
**Mitigation:**
- Test on Chrome, Firefox, Safari, Edge
- Use polyfills for WebGL2
- Graceful degradation for old browsers

---

## Definition of Done

### Code Quality
- [ ] All TypeScript types defined
- [ ] ESLint passing
- [ ] Prettier formatted
- [ ] Unit tests written (>80% coverage)
- [ ] Integration tests written

### Performance
- [ ] 60 FPS on desktop (M1 MacBook Pro)
- [ ] 30 FPS on mobile (iPhone 12)
- [ ] Initial load <3s on 4G
- [ ] Memory usage <256MB

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] High contrast mode
- [ ] Reduced motion option

### Documentation
- [ ] Component README
- [ ] API documentation
- [ ] Usage examples
- [ ] Performance tuning guide

---

## Sign-off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Phase Lead | | | |
| Tech Lead | | | |
| QA Lead | | | |
| Product Owner | | | |

---

**Next Step:** Begin Week 1 implementation

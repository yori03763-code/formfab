# Requirements — FormFab

## v1 Requirements (MVP) ✅ COMPLETE

### Generation
- [x] **GEN-01**: User can input text prompt describing 3D object (max 600 chars)
- [x] **GEN-02**: System initiates 3D generation via Meshy API
- [x] **GEN-03**: User sees real-time generation progress via WebSocket
- [x] **GEN-04**: User can preview generated 3D model thumbnail
- [x] **GEN-05**: User can download generated model (GLB format)

### Infrastructure
- [x] **INF-01**: Frontend deployed and accessible via public URL
- [x] **INF-02**: Backend API running with WebSocket support
- [x] **INF-03**: CORS configured for cross-origin requests
- [x] **INF-04**: Meshy API key configured

---

## v2 Requirements (Intelligence Layer) - NEXT

### Material Intelligence
- [ ] **MAT-01**: AI analyzes generated 3D model structure
- [ ] **MAT-02**: System identifies functional parts (body, joints, decorative)
- [ ] **MAT-03**: System recommends optimal material per part
- [ ] **MAT-04**: User sees material recommendation rationale
- [ ] **MAT-05**: User can override AI recommendations

### Multi-Part Support
- [ ] **MP-01**: System detects separable components
- [ ] **MP-02**: System generates sub-models for each part
- [ ] **MP-03**: User sees exploded view preview
- [ ] **MP-04**: Price calculated per part

### Dimension Editor
- [ ] **DIM-01**: User can adjust overall scale via slider
- [ ] **DIM-02**: Real-time price updates on scale change
- [ ] **DIM-03**: Reference objects shown (coin, phone, hand)
- [ ] **DIM-04**: Dimension display in cm and inches

---

## v3 Requirements (AR Preview)

### Web AR
- [ ] **AR-01**: iOS Quick Look support (USDZ export)
- [ ] **AR-02**: Android Scene Viewer support (GLB)
- [ ] **AR-03**: True-scale placement in user's space
- [ ] **AR-04**: Model appears at realistic size

### Material Preview
- [ ] **AR-05**: User can swipe through material options
- [ ] **AR-06**: Visual difference between materials shown
- [ ] **AR-07**: Price displayed for each material option

### Scale Confidence
- [ ] **AR-08**: Place model next to reference objects
- [ ] **AR-09**: Dimensions overlay on model
- [ ] **AR-10**: "Fits in palm" / "Size of mug" indicators

---

## v4 Requirements (Assembly-Aware Manufacturing)

### Sub-Model Generation
- [ ] **ASM-01**: Automatic part separation
- [ ] **ASM-02**: Export each part as separate file
- [ ] **ASM-03**: Assign material to each part
- [ ] **ASM-04**: Generate assembly diagram

### Assembly Options
- [ ] **ASM-05**: Kit option (user assembles, cheaper)
- [ ] **ASM-06**: Pre-assembled option (premium)
- [ ] **ASM-07**: Auto-generated assembly instructions
- [ ] **ASM-08**: QR code linking to video tutorial

### Manufacturing Pipeline
- [ ] **ASM-09**: Multi-part orders sent to Shapeways
- [ ] **ASM-10**: Track each part's manufacturing status
- [ ] **ASM-11**: Consolidated shipping
- [ ] **ASM-12**: Quality check before shipping

---

## v5 Requirements (Native AR App)

### Mobile Apps
- [ ] **APP-01**: iOS app with ARKit + RealityKit
- [ ] **APP-02**: Android app with ARCore + Sceneform
- [ ] **APP-03**: Push notifications for order updates
- [ ] **APP-04**: Order history with 3D previews

### Advanced AR
- [ ] **APP-05**: Multi-material visualization
- [ ] **APP-06**: Environment lighting adaptation
- [ ] **APP-07**: Occlusion support
- [ ] **APP-08**: Recording and sharing

### Social Features
- [ ] **APP-09**: Public gallery of creations
- [ ] **APP-10**: Remix others' designs
- [ ] **APP-11**: Social sharing with AR preview
- [ ] **APP-12**: Community challenges

---

## v6 Requirements (Scale & Platform)

### Developer API
- [ ] **API-01**: REST API for embedding
- [ ] **API-02**: Webhook notifications
- [ ] **API-03**: White-label option
- [ ] **API-04**: Usage-based pricing

### B2B Features
- [ ] **B2B-01**: Bulk ordering
- [ ] **B2B-02**: Custom branding
- [ ] **B2B-03**: Invoice/billing
- [ ] **B2B-04**: Dedicated support

### Advanced AI
- [ ] **AI-01**: Style transfer for existing models
- [ ] **AI-02**: Auto-rigging for posable figures
- [ ] **AI-03**: Texture generation from text
- [ ] **AI-04**: Print optimization (reduce waste)

---

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| GEN-01 to GEN-05 | 1 | ✅ Complete |
| INF-01 to INF-04 | 1 | ✅ Complete |
| MAT-01 to MAT-05 | 2 | Pending |
| MP-01 to MP-04 | 2 | Pending |
| DIM-01 to DIM-04 | 2 | Pending |
| AR-01 to AR-10 | 3 | Pending |
| ASM-01 to ASM-12 | 4 | Pending |
| APP-01 to APP-12 | 5 | Pending |
| API-01 to AI-04 | 6 | Pending |

---

## Competitive Differentiation

| Feature | Shapeways | Sculpteo | FormFab |
|---------|-----------|----------|---------|
| Multi-material per product | ❌ | ❌ | ✅ v2 |
| AI material recommendation | ❌ | ❌ | ✅ v2 |
| AR preview | ❌ | ❌ | ✅ v3 |
| Assembly instructions | ❌ | ❌ | ✅ v4 |
| Native AR app | ❌ | ❌ | ✅ v5 |
| Developer API | Limited | Limited | ✅ v6 |

---

*Last updated: 2026-03-20*
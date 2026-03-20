# Requirements — FormFab

## v1 Requirements (MVP)

### Generation
- [ ] **GEN-01**: User can input text prompt describing 3D object (max 600 chars)
- [ ] **GEN-02**: System initiates 3D generation via Meshy API
- [ ] **GEN-03**: User sees real-time generation progress
- [ ] **GEN-04**: User can preview generated 3D model in browser (rotate/zoom)
- [ ] **GEN-05**: User can download generated model (GLB format)

### Materials & Pricing
- [ ] **MAT-01**: User can select from available printing materials
- [ ] **MAT-02**: User sees material swatch and description
- [ ] **MAT-03**: System calculates price based on material and size
- [ ] **MAT-04**: User sees final price before checkout

### Checkout & Orders
- [ ] **PAY-01**: User can checkout via Stripe
- [ ] **PAY-02**: System creates order after successful payment
- [ ] **PAY-03**: User receives order confirmation
- [ ] **PAY-04**: User can view order status

### Infrastructure
- [ ] **INF-01**: Frontend deployed and accessible via public URL
- [ ] **INF-02**: Backend API running and healthy
- [ ] **INF-03**: Database schema created
- [ ] **INF-04**: All API keys stored securely in environment

---

## v2 Requirements (Enhanced)

### Authentication
- [ ] **AUTH-01**: User can create account with email/password
- [ ] **AUTH-02**: User can login/logout
- [ ] **AUTH-03**: User can view order history

### Image to 3D
- [ ] **IMG-01**: User can upload image for 3D generation
- [ ] **IMG-02**: System processes image via Meshy Image-to-3D API

### Fulfillment
- [ ] **FUL-01**: System sends order to Shapeways automatically
- [ ] **FUL-02**: User receives shipping notification
- [ ] **FUL-03**: User can track shipment

---

## Out of Scope

1. **Custom model upload** — Too complex for MVP
2. **Multi-material prints** — Adds UI complexity
3. **Subscription plans** — v3
4. **Public gallery** — v3
5. **B2B API** — v3

---

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| GEN-01 | 1 | Pending |
| GEN-02 | 1 | Pending |
| GEN-03 | 1 | Pending |
| GEN-04 | 1 | Pending |
| GEN-05 | 1 | Pending |
| MAT-01 | 1 | Pending |
| MAT-02 | 1 | Pending |
| MAT-03 | 1 | Pending |
| MAT-04 | 1 | Pending |
| PAY-01 | 1 | Pending |
| PAY-02 | 1 | Pending |
| PAY-03 | 1 | Pending |
| PAY-04 | 1 | Pending |
| INF-01 | 1 | Pending |
| INF-02 | 1 | Pending |
| INF-03 | 1 | Pending |
| INF-04 | 1 | Pending |
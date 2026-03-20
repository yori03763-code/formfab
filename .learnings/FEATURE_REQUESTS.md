# FormFab Feature Requests

## [FEAT-20260320-001] user-accounts

**Logged**: 2026-03-20T17:56:00Z
**Priority**: high
**Status**: pending
**Area**: backend

### Requested Capability
User authentication and account management

### User Context
- Users want to save their designs
- View order history
- Manage multiple projects

### Complexity Estimate
medium

### Suggested Implementation
- Use Supabase Auth
- Add user_id to models and orders tables
- Protected routes for user data

### Metadata
- Frequency: recurring
- Related Features: order-history, saved-designs

---

## [FEAT-20260320-002] payment-integration

**Logged**: 2026-03-20T17:56:00Z
**Priority**: critical
**Status**: in_progress
**Area**: backend

### Requested Capability
Accept payments for orders

### User Context
- Users need to pay for their orders
- Stripe is preferred provider
- Need order confirmation flow

### Complexity Estimate
medium

### Suggested Implementation
- Stripe Checkout integration (started)
- Webhook handler for payment events
- Order status updates on payment

### Metadata
- Frequency: core-feature
- Related Features: checkout, orders

---

## [FEAT-20260320-003] ar-preview

**Logged**: 2026-03-20T17:56:00Z
**Priority**: high
**Status**: resolved
**Area**: frontend

### Requested Capability
AR preview of 3D models before ordering

### User Context
- Users want to see model at true scale
- Preview in their actual space
- Confidence before purchase

### Complexity Estimate
simple

### Suggested Implementation
- Use model-viewer with WebXR
- iOS Quick Look support
- Android Scene Viewer support

### Resolution
- **Resolved**: 2026-03-20T18:10:00Z
- **Notes**: model-viewer integrated, AR working

### Metadata
- Frequency: core-feature
- Related Features: 3d-viewer

---

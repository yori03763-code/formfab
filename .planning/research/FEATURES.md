# Features Research — FormFab

## Table Stakes (Must Have)

### Generation
- **GEN-01** Text prompt input with character limit display
- **GEN-02** Real-time generation progress indicator
- **GEN-03** 3D model preview with rotation/zoom
- **GEN-04** Download generated model (free tier)

### Ordering
- **ORD-01** Material selection with visual swatches
- **ORD-02** Size/dimensions selector
- **ORD-03** Price calculator (material + size + shipping)
- **ORD-04** Checkout with Stripe
- **ORD-05** Order confirmation email

### User Account
- **AUTH-01** Email/password signup
- **AUTH-02** Login/logout
- **AUTH-03** Order history

## Differentiators (Competitive Advantage)

### AI Features
- **DIFF-01** Image-to-3D upload
- **DIFF-02** Style presets (realistic, cartoon, low-poly)
- **DIFF-03** Model refinement iterations
- **DIFF-04** Auto-sizing based on real-world dimensions

### UX Features
- **DIFF-05** Real-time 3D preview in AR (mobile)
- **DIFF-06** Social sharing of creations
- **DIFF-07** Public gallery of user creations

### Business Features
- **DIFF-08** Subscription for frequent users
- **DIFF-09** B2B API for developers
- **DIFF-10** White-label option for businesses

## Anti-Features (Deliberately NOT Building)

1. **Custom model upload** — Too complex for MVP, invites copyright issues
2. **Multi-material prints** — Shapeways supports but adds complexity
3. **International shipping calculator** — Flat rate initially
4. **User-generated marketplace** — Legal/compliance nightmare

## Complexity Ratings

| Feature | Complexity | Dependencies |
|---------|------------|--------------|
| Text-to-3D | Medium | Meshy API |
| 3D Preview | Medium | Three.js |
| Material Selection | Simple | Shapeways API |
| Checkout | Medium | Stripe |
| Image-to-3D | Medium | Meshy API + File Upload |
| User Auth | Simple | Supabase |
| Order History | Simple | Database |
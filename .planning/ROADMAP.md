# Roadmap — FormFab

## Overview

Building the **Intelligent 3D Manufacturing Platform** — not just an API wrapper.

---

## Phase 1: Core MVP ✅ (Current)

**Goal:** Text-to-3D with real-time progress

**Completed:**
- [x] Backend API (Fastify)
- [x] Meshy integration
- [x] WebSocket real-time progress
- [x] Frontend landing page
- [x] Material selection UI
- [x] Public hosting

**Status:** LIVE at https://lender-flush-forecast-christ.trycloudflare.com

---

## Phase 2: Intelligence Layer (Next)

**Goal:** AI-powered material recommendations and multi-part analysis

### 2.1 Material Recommendation Engine
- [ ] AI analysis of generated 3D model
- [ ] Identify functional parts (joints, structural, decorative)
- [ ] Recommend optimal material per part
- [ ] Display recommendations with rationale

### 2.2 Multi-Part Model Decomposition
- [ ] Analyze model for separable components
- [ ] Generate sub-models for each part
- [ ] Create assembly preview (exploded view)
- [ ] Price each part separately

### 2.3 Dimension Editor
- [ ] Slider to adjust overall scale
- [ ] Real-time price updates
- [ ] Scale reference objects (coin, phone, hand)
- [ ] Unit conversion (cm, inches)

**Success Criteria:**
- Users see AI recommendations for 90%+ of models
- Multi-material orders > 30% of total
- Users adjust dimensions before ordering

---

## Phase 3: AR Preview

**Goal:** Users confident about size before ordering

### 3.1 Web AR (No App Required)
- [ ] Integrate `<model-viewer>` with AR button
- [ ] iOS Quick Look support (USDZ export)
- [ ] Android Scene Viewer support (GLB)
- [ ] True-scale placement in user's space

### 3.2 Material Preview in AR
- [ ] Swipe to see different materials
- [ ] Compare budget vs premium options
- [ ] Share AR screenshot

### 3.3 Scale Confidence
- [ ] Place model next to reference objects
- [ ] Show dimensions overlay
- [ ] "Fits in your palm" / "Size of a coffee mug" indicators

**Success Criteria:**
- 50%+ users try AR preview
- Return rate < 5%
- Social shares from AR screenshots

---

## Phase 4: Assembly-Aware Manufacturing

**Goal:** Complex products become manufacturable sub-parts

### 4.1 Sub-Model Generation
- [ ] Automatic part separation
- [ ] Export each part as separate file
- [ ] Assign material to each part
- [ ] Generate assembly diagram

### 4.2 Assembly Options
- [ ] Kit option (user assembles, cheaper)
- [ ] Pre-assembled option (we assemble, premium)
- [ ] Auto-generated assembly instructions
- [ ] QR code linking to video tutorial

### 4.3 Manufacturing Pipeline
- [ ] Send multi-part orders to Shapeways
- [ ] Track each part's manufacturing status
- [ ] Consolidate shipping
- [ ] Quality check before shipping

**Success Criteria:**
- Complex products (robots, toys) achievable
- Kit vs assembled split: 30/70
- Assembly success rate > 95%

---

## Phase 5: Native AR App

**Goal:** Premium experience, platform features

### 5.1 Mobile Apps
- [ ] iOS app (ARKit + RealityKit)
- [ ] Android app (ARCore + Sceneform)
- [ ] Push notifications for order updates
- [ ] Order history with 3D previews

### 5.2 Advanced AR
- [ ] Multi-material visualization
- [ ] Environment lighting adaptation
- [ ] Occlusion (model behind furniture)
- [ ] Recording and sharing

### 5.3 Social Features
- [ ] Public gallery of creations
- [ ] Remix others' designs
- [ ] Social sharing with AR preview
- [ ] Community challenges

**Success Criteria:**
- App store rating > 4.5
- 20% of orders from app referrals
- Viral coefficient > 1.0

---

## Phase 6: Scale & Platform

**Goal:** $1M+ ARR, defensible moat

### 6.1 API for Developers
- [ ] REST API for embedding
- [ ] Webhook notifications
- [ ] White-label option
- [ ] Usage-based pricing

### 6.2 B2B Features
- [ ] Bulk ordering
- [ ] Custom branding
- [ ] Invoice/billing
- [ ] Dedicated support

### 6.3 Advanced AI
- [ ] Style transfer (make existing models match user style)
- [ ] Auto-rigging for posable figures
- [ ] Texture generation from text
- [ ] Optimization for printing (reduce material waste)

---

## Build Order Summary

```
Phase 1 ✅     Generation + WebSocket
Phase 2        Material Intelligence + Dimensions
Phase 3        AR Preview
Phase 4        Multi-part Assembly
Phase 5        Native App + Social
Phase 6        Platform + Scale
```

---

## What We're Building Towards

**Not this:**
> "Upload model, pick material, pay, wait."

**This:**
> "Describe your idea. Our AI figures out the best materials for each part. Preview it in your space at true scale. Adjust dimensions until it's perfect. We manufacture each part with the right material and ship you a finished product."

---

*Last updated: 2026-03-20*
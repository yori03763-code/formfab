# FormFab Vision — The Differentiator

## Why We're Not Just an API Wrapper

Most 3D printing services are just that — services. You upload a model, pick ONE material, and get a print. That's it.

**We're building something fundamentally different.**

---

## 🎯 The Core Insight

When you describe a product like "a robot figurine with movable joints," you're implicitly describing **multiple materials**:

- **Body** → Plastic (lightweight, cheap)
- **Joints** → Metal (durable, articulated)
- **Eyes** → Full-color (expressive)
- **Base** → Heavy plastic (stability)

**Current solutions make you choose ONE material for the entire product.**

We use AI to:
1. **Analyze** the described/created 3D model
2. **Identify** functional parts and their material needs
3. **Recommend** optimal materials per part
4. **Generate** assembly-ready sub-models
5. **Send** precise manufacturing instructions to fulfillment partners

---

## 🏗️ The Product Stack

### Layer 1: AI Model Generation
- Text/Image → 3D Model (Meshy API)
- **NEW: Multi-part analysis** — AI identifies separable components
- **NEW: Material recommendation** — Each part gets optimal material

### Layer 2: Intelligent Material Assignment
```
User: "A gaming mouse with rubber grip and metal scroll wheel"

AI Analysis:
├── Body: Black Plastic (rigid, lightweight)
├── Grip: Rubber/TPE (textured, ergonomic)
├── Scroll Wheel: Metal (durable, premium feel)
└── Buttons: White Plastic (contrasting, visible)

Sub-models Generated: 4
Assembly Required: Yes
Total Price: $45
```

### Layer 3: Measurement Confidence
**Problem:** Users don't know if a "5cm figurine" is what they want.

**Solution:**
- **AR Preview** (iOS/Android) — Place the model in your real space
- **Scale reference** — Show model next to common objects (coin, phone, hand)
- **Dimension editor** — Drag to resize, see price update in real-time
- **Human scale check** — "This will fit in your palm" / "This is the size of a coffee mug"

### Layer 4: Assembly-Aware Manufacturing
- **Exploded view** — Show how parts fit together
- **Kit option** — User assembles at home (cheaper)
- **Pre-assembled option** — We assemble before shipping (premium)
- **Instructions included** — Auto-generated assembly guide

---

## 📊 Market Analysis

### Current 3D Printing Services

| Service | Multi-Material | AI Analysis | AR Preview | Assembly |
|---------|---------------|-------------|------------|----------|
| Shapeways | ❌ Single only | ❌ | ❌ | ❌ |
| Sculpteo | ❌ Single only | ❌ | ❌ | ❌ |
| Xometry | ❌ Single only | ❌ | ❌ | ❌ |
| i.materialise | ❌ Single only | ❌ | ❌ | ❌ |
| **FormFab** | ✅ Per-part | ✅ | ✅ | ✅ |

### Available Materials (via Shapeways)

**Plastics (Affordable)**
- White Plastic (PA12) — $0.15/cm³
- Black Plastic (PA12) — $0.18/cm³
- Gray Plastic — $0.16/cm³

**Premium Plastics**
- Full Color Plastic — $0.45/cm³ (for detailed/colorful parts)
- Metallic Plastic — $0.35/cm³ (looks like metal, costs like plastic)

**Metals (Durable)**
- Steel — $1.20/cm³
- Bronze — $1.80/cm³
- Silver — $3.50/cm³
- Gold Plated — $3.50/cm³

**Specialty**
- Rubber/TPE — $0.50/cm³ (flexible parts)
- Ceramic — $2.00/cm³ (food-safe, decorative)

---

## 🧠 AI Material Recommendation Engine

### Decision Factors

1. **Function**
   - Articulated joints → Metal pins or durable plastic
   - Flexible parts → TPE/Rubber
   - Structural → Rigid plastic or metal
   - Decorative → Full color or standard plastic

2. **Aesthetics**
   - Premium look → Metallic or actual metal
   - Colorful details → Full color plastic
   - Minimal/modern → Single color plastic

3. **Budget**
   - Budget option → All plastic
   - Premium option → Metal accents
   - Luxury option → Full metal

4. **Use Case**
   - Display only → Fragile materials OK
   - Toys/games → Durable materials required
   - Functional parts → Material-specific (gears, hinges)

### Example: "A custom chess set"

```
AI Analysis:
├── King pieces → Premium Metal (centerpiece)
├── Queen pieces → Metallic Plastic (accent)
├── Other pieces → Black/White Plastic (standard)
└── Board → Full Color Plastic (detailed pattern)

Cost Estimate:
- King set (4): $12
- Queen set (4): $8
- Other pieces (24): $18
- Board: $25
- Total: $63 (vs $150+ for all-metal)

User Options:
[ ] All Plastic (Budget): $35
[ ] Mixed Materials (Recommended): $63
[ ] All Metal (Luxury): $180
```

---

## 🔮 AR Preview Implementation

### Technical Stack
- **iOS:** ARKit + RealityKit
- **Android:** ARCore + Sceneform
- **Web:** Model Viewer (basic) or custom Three.js + WebXR

### Features
1. **True-scale placement** — Place model on your desk, see real size
2. **Material preview** — Swipe to see different material options
3. **Comparison objects** — Place next to phone, keys, coffee mug
4. **Multi-part preview** — See exploded view in AR
5. **Share preview** — Send AR screenshot to friends

### Phase 1 Implementation (Web)
- Use `<model-viewer>` with AR button
- iOS: Quick Look (USDZ format)
- Android: Scene Viewer (GLB format)
- Works without app download

### Phase 2 Implementation (Native)
- Custom AR app
- Better material visualization
- Real-time price adjustment
- Save/view order history

---

## 💡 Competitive Moat

### Why Can't Shapeways Copy This?

1. **They're a factory, not an AI company** — We own the intelligence layer
2. **Their business model is volume** — Ours is value-add per order
3. **They don't analyze models** — We do intelligent decomposition
4. **They can't upsell materials** — Our AI creates natural upsell paths

### Why Can't Meshy Copy This?

1. **They're generation-focused** — We're end-to-end manufacturing
2. **They don't touch fulfillment** — We own the customer relationship
3. **They don't price products** — We handle the entire commerce flow

### Our Unique Position

```
     AI Generation        Material Intelligence        AR Preview        Manufacturing
          ↓                      ↓                        ↓                   ↓
    ┌─────────┐           ┌──────────┐            ┌──────────┐        ┌──────────┐
    │  Meshy  │           │ FormFab  │            │ FormFab  │        │Shapeways │
    │   API   │──────────▶│   AI     │──────────▶│   AR     │───────▶│   API    │
    └─────────┘           └──────────┘            └──────────┘        └──────────┘
                        (Our Secret Sauce)      (Customer Trust)    (Commodity Layer)
```

---

## 📈 Revenue Impact

### Current Single-Material Model
```
User: "A figurine"
→ Single material: Plastic
→ Price: $15
→ Margin: $5
```

### Our Multi-Material Model
```
User: "A figurine"
→ AI: "This could have metal joints for durability"
→ User selects: Metal joints + Plastic body
→ Price: $28
→ Margin: $12 (2.4x increase)
→ Customer satisfaction: Higher (better product)
```

### AR Preview Impact
- 40% reduction in returns (source: IKEA Place app stats)
- Higher conversion rate (users confident before buying)
- Social sharing (free marketing)

---

## 🚀 Implementation Roadmap

### Phase 1: MVP (Current)
- [x] Text-to-3D generation
- [x] Real-time progress (WebSocket)
- [ ] Basic material selection

### Phase 2: Intelligence Layer (Next)
- [ ] AI material recommendation
- [ ] Multi-part model analysis
- [ ] Dimension editor with live pricing

### Phase 3: AR Preview
- [ ] Web-based AR (model-viewer)
- [ ] Scale reference objects
- [ ] Material preview swatches

### Phase 4: Assembly-Aware
- [ ] Sub-model generation
- [ ] Exploded view visualization
- [ ] Assembly instruction generation
- [ ] Kit vs pre-assembled options

### Phase 5: Native AR App
- [ ] iOS/Android apps
- [ ] Advanced AR features
- [ ] Order history
- [ ] Social features

---

## 🎯 Success Metrics

### Engagement
- % of users who interact with material recommendations
- % of users who use AR preview
- Time spent customizing materials

### Revenue
- Average order value (target: 2x single-material)
- Multi-material order %
- Upsell acceptance rate

### Quality
- Return rate (target: <5%)
- Customer satisfaction (NPS)
- Referral rate

---

*Last updated: 2026-03-20*
*This document captures the strategic vision that differentiates FormFab from commodity 3D printing services.*
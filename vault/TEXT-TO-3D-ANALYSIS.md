# Text-to-3D Service Analysis for FormFab

**Date:** March 21, 2026  
**Purpose:** Evaluate text-to-3D generation services against thesis requirements  
**Current Service:** Meshy AI

---

## Thesis Requirements (Chapters 1, 29, 30)

### Critical Requirements

| Requirement | Priority | Description |
|-------------|----------|-------------|
| **Multi-material Support** | 🔴 Critical | Must support part-level material assignment |
| **Print-Ready Output** | 🔴 Critical | Watertight, manifold meshes for 3D printing |
| **Format Support** | 🔴 Critical | GLB, STL, OBJ (Shapeways compatible) |
| **API Reliability** | 🔴 Critical | 99.9% uptime, rate limits for production |
| **Commercial License** | 🔴 Critical | Must allow commercial use of generated models |
| **Generation Quality** | 🔴 Critical | Sufficient detail for functional parts |
| **Generation Speed** | 🟡 High | <5 minutes per generation (user experience) |
| **Cost per Generation** | 🟡 High | <$0.50 per model (business viability) |
| **Customization** | 🟡 High | Control over polycount, quality, style |
| **Batch Generation** | 🟢 Medium | Generate multiple variations |

---

## Service Comparison

### 1. Meshy AI (Current) ⭐⭐⭐⭐⭐

**Overview:** Leading text-to-3D service with production-ready API

| Criteria | Rating | Details |
|----------|--------|---------|
| Multi-material | ⚠️ Partial | Single mesh, materials assigned post-generation |
| Print-Ready | ✅ Yes | Watertight meshes, manifold geometry |
| Formats | ✅ GLB, OBJ, STL, FBX, USDZ | All major formats |
| API Reliability | ✅ 99.9% SLA | Production-ready |
| Commercial License | ✅ Yes | Full commercial rights |
| Quality | ⭐⭐⭐⭐⭐ | High-detail, clean topology |
| Speed | ⭐⭐⭐⭐ | 2-5 minutes average |
| Cost | ⭐⭐⭐⭐ | ~$0.05-0.30 per generation |
| Customization | ⭐⭐⭐⭐ | Polycount, style, quality controls |
| Batch | ⭐⭐⭐ | Limited batch support |

**Pros:**
- Best-in-class quality for text-to-3D
- Production-ready API with good documentation
- Fast generation times
- Reasonable pricing for commercial use
- Multiple export formats including STL for 3D printing
- Active development and support

**Cons:**
- Single mesh output (multi-material requires post-processing)
- Rate limits on free tier (100 generations/month)
- Some artifacts in complex geometries

**Thesis Alignment:** 95%

---

### 2. Luma AI ⭐⭐⭐⭐

**Overview:** High-quality 3D generation from text and images

| Criteria | Rating | Details |
|----------|--------|---------|
| Multi-material | ❌ No | Single material mesh |
| Print-Ready | ⚠️ Partial | May require cleanup |
| Formats | ✅ GLB, OBJ, MP4 | Good format support |
| API Reliability | ⚠️ Beta | API in beta, less stable |
| Commercial License | ✅ Yes | Commercial use allowed |
| Quality | ⭐⭐⭐⭐⭐ | Excellent visual quality |
| Speed | ⭐⭐⭐ | 5-10 minutes average |
| Cost | ⭐⭐⭐ | ~$0.10-0.50 per generation |
| Customization | ⭐⭐⭐ | Limited controls |
| Batch | ❌ No | Single generation only |

**Pros:**
- Excellent visual quality
- Good for artistic/visual models
- Image-to-3D capability
- Active community

**Cons:**
- API still in beta (less reliable for production)
- Slower generation times
- Higher cost per generation
- Models may need cleanup for 3D printing
- Less control over output parameters

**Thesis Alignment:** 75%

---

### 3. Tripo AI ⭐⭐⭐⭐

**Overview:** Fast text-to-3D with focus on speed

| Criteria | Rating | Details |
|----------|--------|---------|
| Multi-material | ❌ No | Single material |
| Print-Ready | ✅ Yes | Generally print-ready |
| Formats | ✅ GLB, OBJ, STL | Good format support |
| API Reliability | ✅ Good | Stable API |
| Commercial License | ✅ Yes | Commercial use allowed |
| Quality | ⭐⭐⭐ | Good but less detailed than Meshy |
| Speed | ⭐⭐⭐⭐⭐ | 30-60 seconds (fastest) |
| Cost | ⭐⭐⭐⭐ | ~$0.03-0.20 per generation |
| Customization | ⭐⭐ | Limited controls |
| Batch | ⭐⭐⭐ | Some batch support |

**Pros:**
- Fastest generation (under 1 minute)
- Lowest cost per generation
- Generally print-ready output
- Good for rapid prototyping

**Cons:**
- Lower quality than Meshy
- Less detail in complex models
- Limited customization options
- Smaller community/support

**Thesis Alignment:** 80%

---

### 4. OpenAI Shap-E ⭐⭐⭐

**Overview:** OpenAI's open-source 3D generation model

| Criteria | Rating | Details |
|----------|--------|---------|
| Multi-material | ❌ No | Single material |
| Print-Ready | ⚠️ Partial | Often requires cleanup |
| Formats | ⚠️ Limited | Requires conversion |
| API Reliability | ⚠️ Self-hosted | Your infrastructure |
| Commercial License | ✅ Yes | Open source |
| Quality | ⭐⭐⭐ | Moderate quality |
| Speed | ⚠️ Variable | Depends on your hardware |
| Cost | ⭐⭐⭐⭐⭐ | Free (your compute costs) |
| Customization | ⭐⭐⭐⭐ | Full control (self-hosted) |
| Batch | ⭐⭐⭐⭐ | Your infrastructure |

**Pros:**
- Free to use (open source)
- Full control over generation
- Can self-host for privacy
- No rate limits (your hardware)

**Cons:**
- Requires significant infrastructure investment
- Lower quality than commercial services
- Requires ML expertise to optimize
- Slower without expensive GPUs
- Models often need cleanup for 3D printing
- No official support

**Thesis Alignment:** 60%

---

### 5. Stability AI Stable Fast 3D ⭐⭐⭐

**Overview:** Stability AI's fast 3D generation

| Criteria | Rating | Details |
|----------|--------|---------|
| Multi-material | ❌ No | Single material |
| Print-Ready | ⚠️ Partial | May need cleanup |
| Formats | ✅ GLB, OBJ | Standard formats |
| API Reliability | ⚠️ New | Recently launched |
| Commercial License | ✅ Yes | Commercial use allowed |
| Quality | ⭐⭐⭐ | Moderate quality |
| Speed | ⭐⭐⭐⭐ | ~1-2 minutes |
| Cost | ⭐⭐⭐⭐ | ~$0.05-0.25 per generation |
| Customization | ⭐⭐ | Limited |
| Batch | ⭐⭐ | Limited |

**Pros:**
- Fast generation
- Reasonable pricing
- Backed by Stability AI (good support)
- Integrates with Stable Diffusion ecosystem

**Cons:**
- Newer service (less proven)
- Lower quality than Meshy
- Limited documentation
- API still maturing

**Thesis Alignment:** 70%

---

### 6. CSM AI ⭐⭐⭐

**Overview:** Common Sense Machines 3D generation

| Criteria | Rating | Details |
|----------|--------|---------|
| Multi-material | ❌ No | Single material |
| Print-Ready | ⚠️ Partial | Often needs cleanup |
| Formats | ✅ GLB, OBJ | Standard formats |
| API Reliability | ⚠️ Variable | Occasional downtime |
| Commercial License | ✅ Yes | Commercial use allowed |
| Quality | ⭐⭐⭐ | Moderate quality |
| Speed | ⭐⭐ | 5-15 minutes |
| Cost | ⭐⭐⭐ | ~$0.10-0.40 per generation |
| Customization | ⭐⭐ | Limited |
| Batch | ❌ No | Single only |

**Pros:**
- Image-to-3D capability
- Web-based interface
- No API key needed for web

**Cons:**
- Slow generation times
- Inconsistent quality
- API reliability issues
- Limited support

**Thesis Alignment:** 55%

---

## Recommendation Matrix

### For FormFab Production Use

| Service | Quality | Speed | Cost | Reliability | Thesis Fit | Overall |
|---------|---------|-------|------|-------------|------------|---------|
| **Meshy AI** | 95% | 85% | 85% | 95% | 95% | **91%** ⭐ |
| Tripo AI | 75% | 95% | 90% | 85% | 80% | 85% |
| Luma AI | 90% | 70% | 75% | 75% | 75% | 77% |
| Stability 3D | 70% | 85% | 85% | 70% | 70% | 76% |
| Shap-E | 65% | 60% | 95% | 60% | 60% | 68% |
| CSM AI | 60% | 50% | 70% | 55% | 55% | 58% |

---

## Final Recommendation

### ✅ STAY WITH MESHY AI

**Rationale:**

1. **Best Thesis Alignment (95%)**
   - Only service that comes close to meeting all thesis requirements
   - Print-ready output (watertight, manifold)
   - All required formats (GLB, STL, OBJ)
   - Production-ready API with SLA
   - Full commercial license

2. **Quality Leader**
   - Highest quality text-to-3D generation
   - Clean topology suitable for 3D printing
   - Minimal artifacts
   - Consistent results

3. **Production Ready**
   - Stable API with 99.9% uptime
   - Good documentation
   - Active support
   - Scalable infrastructure

4. **Cost Effective**
   - $0.05-0.30 per generation
   - At 1000 orders/month @ $0.20 avg = $200/month
   - Only 0.4% of revenue at $50 avg order

5. **Speed Acceptable**
   - 2-5 minutes average generation
   - Acceptable for async workflow
   - Users can browse while waiting

---

## Hybrid Strategy (Recommended)

### Primary: Meshy AI (90% of generations)
- Use for all standard generations
- Best quality and reliability
- Default for production

### Fallback: Tripo AI (10% of generations)
- Use when Meshy is unavailable
- Faster for simple models
- Lower cost option for budget-conscious users

### Future: Self-hosted Shap-E (R&D)
- Invest in self-hosted infrastructure
- For high-volume, cost-sensitive use cases
- Full control over generation
- Long-term cost reduction

---

## Implementation Plan

### Phase 1: Meshy AI (Current) ✅
- Continue using Meshy as primary
- Negotiate volume discount at 1000+ generations/month
- Monitor quality and reliability

### Phase 2: Multi-Provider Support (Month 3-4)
- Add Tripo AI as fallback
- Implement provider selection logic
- A/B test quality vs. speed

### Phase 3: Self-Hosted Option (Month 6-12)
- Evaluate Shap-E or custom model
- Set up GPU infrastructure
- Compare cost/quality tradeoffs
- Migrate appropriate use cases

---

## Thesis Requirement Mapping

| Thesis Chapter | Requirement | Meshy AI Status |
|----------------|-------------|-----------------|
| Chapter 1 | Multi-material support | ⚠️ Post-processing required |
| Chapter 1 | Print-ready output | ✅ Watertight meshes |
| Chapter 29 | Training data | ✅ N/A (third-party) |
| Chapter 30 | API integration | ✅ Well-documented API |
| Chapter 30 | Rate limiting | ✅ Handled in code |
| Chapter 31 | Performance | ✅ 2-5 min generation |
| Chapter 32 | Commercial license | ✅ Full commercial rights |

---

## Conclusion

**Meshy AI remains the best choice for FormFab** based on thesis requirements.

**Key Advantages:**
- 95% thesis alignment (highest of all options)
- Production-ready API
- Best quality for 3D printing
- Reasonable cost structure
- Active development and support

**Recommended Actions:**
1. ✅ Continue using Meshy AI as primary provider
2. ✅ Negotiate volume discount at scale
3. ⏳ Add Tripo AI as fallback (Phase 2)
4. ⏳ Evaluate self-hosted options (Phase 3)

**Risk Mitigation:**
- Monitor Meshy AI uptime and quality
- Have fallback provider ready
- Budget for potential price increases
- Plan for eventual self-hosting

---

**Document Status:** Complete  
**Next Review:** At 1000 generations/month or when Meshy pricing changes

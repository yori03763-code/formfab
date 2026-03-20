# State — FormFab

## Current Status

**Phase:** 1 Complete - MVP Core ✅
**Next:** Phase 2 - Intelligence Layer
**Last Updated:** 2026-03-20 17:03 UTC

## Progress

### Phase 1: Core Infrastructure & Generator ✅
- [x] Backend API setup (Fastify + WebSocket)
- [x] Meshy API integration with real API key
- [x] Frontend generator UI (Next.js)
- [x] WebSocket real-time progress
- [x] Model preview and download
- [x] Public hosting via cloudflared tunnels
- [x] CORS fixed for cross-origin requests

### Phase 2: Intelligence Layer (NEXT)
- [ ] AI material recommendation engine
- [ ] Multi-part model analysis
- [ ] Dimension editor with live pricing
- [ ] Per-part material selection UI

### Phase 3: AR Preview
- [ ] WebXR integration (model-viewer)
- [ ] True-scale placement
- [ ] Material preview in AR
- [ ] Scale reference objects

### Phase 4: Assembly-Aware Manufacturing
- [ ] Sub-model generation
- [ ] Exploded view visualization
- [ ] Assembly instruction generation
- [ ] Kit vs pre-assembled options

### Phase 5: Native AR App
- [ ] iOS/Android apps
- [ ] Advanced AR features
- [ ] Social features

### Phase 6: Scale & Platform
- [ ] API for developers
- [ ] B2B features
- [ ] Advanced AI features

## Live URLs (Updated frequently)
- Frontend: https://vernon-desperate-glasses-sustainability.trycloudflare.com
- Backend: https://senate-museums-highway-dinner.trycloudflare.com

## API Keys
- Meshy: Configured in backend/.env
- Shapeways: Not yet configured (using mock mode)

## Next Actions

1. **Build Material Intelligence Engine**
   - Create AI service to analyze 3D models
   - Identify functional parts (structural, decorative, articulated)
   - Recommend optimal materials based on part function

2. **Add Dimension Editor**
   - Slider for scale adjustment
   - Real-time price calculation
   - Reference objects for scale

3. **Integrate AR Preview**
   - Add model-viewer component
   - Enable Quick Look (iOS) and Scene Viewer (Android)

## Blockers

None currently.

## Key Insight

**We are NOT an API wrapper.** Our differentiator is the intelligence layer:
- Multi-material per product (not single material)
- AR preview for measurement confidence
- Assembly-aware manufacturing

See `.planning/VISION.md` for full strategy.
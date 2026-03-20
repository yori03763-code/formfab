# Stack Research — FormFab

## Frontend

### Framework: Next.js 14 (App Router)
- **Version:** 14.2.x
- **Rationale:** Best DX, built-in API routes, server components for performance
- **Confidence:** High

### 3D Viewer: React Three Fiber + Drei
- **Version:** @react-three/fiber 8.x, @react-three/drei 9.x
- **Rationale:** React-native 3D, great DX, GLB/STL loading built-in
- **Confidence:** High

### Styling: TailwindCSS
- **Version:** 3.4.x
- **Rationale:** Rapid development, dark theme by default
- **Confidence:** High

### State: Zustand
- **Version:** 4.x
- **Rationale:** Simple, no boilerplate, works great with React
- **Confidence:** High

## Backend

### Runtime: Node.js + Fastify
- **Version:** Fastify 4.26.x
- **Rationale:** Faster than Express, great DX, built-in validation
- **Confidence:** High

### Database: PostgreSQL via Supabase
- **Rationale:** Managed, built-in auth, real-time, storage
- **Confidence:** High

### ORM: Prisma or Drizzle
- **Recommendation:** Drizzle (lighter, better DX)
- **Confidence:** Medium

### Queue: BullMQ + Redis
- **Rationale:** Job queue for long-running 3D generation tasks
- **Confidence:** High

## External APIs

### Meshy AI
- **Base URL:** https://api.meshy.ai
- **Auth:** API Key in header
- **Text-to-3D:** POST /openapi/v2/text-to-3d
  - Preview task: 20 credits (Meshy-6)
  - Refine task: adds texturing
  - Formats: glb, obj, fbx, stl, usdz
- **Image-to-3D:** POST /openapi/v1/image-to-3d
  - Requires image_url (public URL or data URI)
  - 20-30 credits depending on options

### Shapeways
- **Base URL:** https://api.shapeways.com
- **Auth:** OAuth 2.0 (Client Credentials)
- **Materials:** GET /materials/v1 (40+ materials)
- **Orders:** POST /orders/v1
- **Pricing:** Dynamic based on volume + material

### Stripe
- **Checkout Sessions:** For payment
- **Webhooks:** For order confirmation
- **Products:** Dynamic creation per order

## File Storage

### Supabase Storage
- Store generated 3D models (GLB/STL)
- User uploads (images for image-to-3D)
- **Bucket structure:**
  - `models/{orderId}/preview.glb`
  - `models/{orderId}/final.stl`
  - `uploads/{userId}/{filename}`
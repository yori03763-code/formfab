# Architecture Research — FormFab

## System Components

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (Next.js)                      │
├─────────────────────────────────────────────────────────────────┤
│  Pages:                                                         │
│  - / (Landing + Generator)                                      │
│  - /preview/:id (3D Model Viewer)                               │
│  - /checkout/:id (Payment)                                      │
│  - /orders (Order History)                                      │
│  - /auth (Login/Signup)                                         │
├─────────────────────────────────────────────────────────────────┤
│  Components:                                                    │
│  - PromptInput                                                  │
│  - ModelViewer (Three.js)                                       │
│  - MaterialSelector                                             │
│  - PriceCalculator                                              │
│  - CheckoutForm                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        BACKEND (Fastify)                        │
├─────────────────────────────────────────────────────────────────┤
│  Routes:                                                        │
│  - POST /api/generate/text → Meshy API                          │
│  - POST /api/generate/image → Meshy API                         │
│  - GET  /api/models/:id → Status/Download                       │
│  - GET  /api/materials → Shapeways materials                    │
│  - POST /api/orders → Create order                              │
│  - POST /api/checkout → Stripe session                          │
│  - GET  /api/orders/:id → Order status                          │
├─────────────────────────────────────────────────────────────────┤
│  Services:                                                      │
│  - MeshyService (generation API)                                │
│  - ShapewaysService (fulfillment API)                           │
│  - StripeService (payments)                                     │
│  - StorageService (Supabase)                                    │
├─────────────────────────────────────────────────────────────────┤
│  Queue Jobs (BullMQ):                                           │
│  - GenerationJob (poll Meshy for completion)                    │
│  - FulfillmentJob (send to Shapeways)                           │
│  - EmailJob (send notifications)                                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      EXTERNAL SERVICES                          │
├─────────────────────────────────────────────────────────────────┤
│  Meshy AI      → 3D Generation                                  │
│  Shapeways     → Printing & Shipping                            │
│  Stripe        → Payments                                       │
│  Supabase      → Database + Auth + Storage                      │
│  Redis         → Job Queue                                      │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

### Generation Flow
```
User Input (text)
    → POST /api/generate/text
    → Meshy API creates task
    → Return task_id
    → Frontend polls GET /api/models/:id
    → Backend polls Meshy for completion
    → On completion: download model, store in Supabase
    → Return model_url to frontend
```

### Order Flow
```
User selects material + size
    → GET /api/materials → prices
    → POST /api/checkout → Stripe session
    → User pays via Stripe
    → Webhook: payment_intent.succeeded
    → Create order in DB
    → Queue FulfillmentJob
    → POST Shapeways API with model
    → Shapeways prints & ships
    → Webhook from Shapeways: order shipped
    → Update order status
    → Email user
```

## Database Schema

```sql
-- Users (Supabase Auth)
-- Built-in: id, email, created_at

-- Models
CREATE TABLE models (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  prompt TEXT NOT NULL,
  type TEXT CHECK (type IN ('text', 'image')),
  meshy_task_id TEXT,
  status TEXT CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  model_url TEXT,
  thumbnail_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Orders
CREATE TABLE orders (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  model_id UUID REFERENCES models,
  material_id INTEGER,
  material_name TEXT,
  size_cm INTEGER,
  stripe_payment_id TEXT,
  status TEXT CHECK (status IN ('pending', 'paid', 'printing', 'shipped', 'delivered')),
  shapeways_order_id TEXT,
  tracking_number TEXT,
  total_price_cents INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  shipped_at TIMESTAMPTZ
);
```

## Build Order

### Phase 1: Core MVP
1. Landing page with generator
2. Meshy text-to-3D integration
3. 3D model viewer
4. Basic material selection
5. Stripe checkout
6. Order creation

### Phase 2: Enhanced
1. User authentication
2. Order history
3. Image-to-3D
4. Email notifications

### Phase 3: Scale
1. Shapeways fulfillment automation
2. Subscription plans
3. Public gallery
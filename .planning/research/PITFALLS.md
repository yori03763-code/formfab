# Pitfalls Research — FormFab

## Technical Pitfalls

### 1. Meshy API Rate Limits & Timeouts
- **Warning Signs:** 429 errors, tasks stuck in "processing"
- **Prevention:** 
  - Implement exponential backoff
  - Queue all API calls through BullMQ
  - Set realistic timeouts (2-5 min for generation)
- **Phase:** Phase 1 (Backend API)

### 2. Large File Handling
- **Warning Signs:** Memory errors, slow uploads, timeouts
- **Prevention:**
  - Stream files, don't buffer in memory
  - Use Supabase Storage for models (they handle large files)
  - Implement file size limits (50MB max)
- **Phase:** Phase 1 (Model storage)

### 3. 3D Viewer Performance
- **Warning Signs:** Laggy rotation, mobile crashes
- **Prevention:**
  - Use low-poly preview models
  - Implement lazy loading
  - Add loading states
  - Test on mobile devices
- **Phase:** Phase 1 (Frontend)

## API Integration Pitfalls

### 4. Meshy Task Polling
- **Warning Signs:** Infinite polling, missed completions
- **Prevention:**
  - Maximum poll attempts (60 polls × 5s = 5min)
  - Webhook support when available
  - Store task state in database
- **Phase:** Phase 1 (Backend)

### 5. Shapeways Order Failures
- **Warning Signs:** Model rejected, material unavailable
- **Prevention:**
  - Validate model before sending
  - Check material restrictions
  - Handle rejection gracefully in UI
  - Implement retry logic
- **Phase:** Phase 2 (Fulfillment)

### 6. Stripe Webhook Handling
- **Warning Signs:** Missing payments, duplicate orders
- **Prevention:**
  - Verify webhook signatures
  - Idempotent order creation
  - Log all webhook events
- **Phase:** Phase 1 (Payments)

## Business Pitfalls

### 7. Pricing Miscalculation
- **Warning Signs:** Orders costing more than charged
- **Prevention:**
  - Real-time pricing from Shapeways API
  - Add margin buffer (20%)
  - Manual review for large orders
- **Phase:** Phase 1 (Pricing)

### 8. Unit Economics
- **Warning Signs:** Low margins, high API costs
- **Prevention:**
  - Calculate cost per order: Meshy ($0.05-0.30) + Shapeways ($5-50) + Shipping ($5)
  - Minimum order price: $25
  - Premium materials have higher margins
- **Phase:** Phase 1 (Pricing)

## UX Pitfalls

### 9. Unclear Generation Progress
- **Warning Signs:** Users refreshing, duplicate submissions
- **Prevention:**
  - Real-time progress updates
  - Disable submit during generation
  - Show estimated time
  - Email when complete
- **Phase:** Phase 1 (Frontend)

### 10. Material Confusion
- **Warning Signs:** Wrong material expectations, returns
- **Prevention:**
  - Clear material descriptions
  - Sample photos for each material
  - Size references
- **Phase:** Phase 1 (Frontend)

## Security Pitfalls

### 11. API Key Exposure
- **Warning Signs:** Keys in frontend code, public repos
- **Prevention:**
  - All API calls through backend
  - Environment variables
  - Rotate keys regularly
- **Phase:** Phase 1 (Backend)

### 12. Payment Fraud
- **Warning Signs:** Chargebacks, suspicious patterns
- **Prevention:**
  - Stripe Radar enabled
  - Manual review for large orders
  - Require verified email
- **Phase:** Phase 2 (Auth)

## Edge Cases

### 13. Inappropriate Content
- **Warning Signs:** Users generating offensive models
- **Prevention:**
  - Meshy has moderation flag
  - Implement own content filter
  - Terms of service
  - Manual review queue
- **Phase:** Phase 1 (Generation)

### 14. Model Quality Issues
- **Warning Signs:** Users unhappy with generated models
- **Prevention:**
  - Show preview before payment
  - Allow regeneration (within limits)
  - Clear expectations in UI
- **Phase:** Phase 1 (Frontend)
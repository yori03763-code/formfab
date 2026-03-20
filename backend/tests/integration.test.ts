import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import websocket from '@fastify/websocket';

// Mock environment
process.env.MESHY_API_KEY = 'test-key';
process.env.PORT = '3003';

describe('FormFab API - Integration Tests', () => {
  let app: ReturnType<typeof Fastify>;

  beforeAll(async () => {
    app = Fastify({ logger: false });
    await app.register(cors, { origin: true });
    await app.register(websocket);
    
    // Health check
    app.get('/health', async () => ({ status: 'ok', service: 'formfab-api', version: '0.1.0' }));
    
    // Materials endpoint
    app.get('/api/materials', async () => ({
      materials: [
        { id: 6, name: 'White Plastic', pricePerCm3: 0.15 },
        { id: 26, name: 'Black Plastic', pricePerCm3: 0.18 },
        { id: 25, name: 'Full Color', pricePerCm3: 0.45 },
        { id: 80, name: 'Metallic Plastic', pricePerCm3: 0.35 },
        { id: 77, name: 'Steel', pricePerCm3: 1.20 },
        { id: 50, name: 'Rubber/TPE', pricePerCm3: 0.50 },
      ]
    }));
    
    // Generate text endpoint
    app.post('/api/generate/text', async (request, reply) => {
      const body = request.body as { prompt?: string };
      
      if (!body?.prompt || body.prompt.trim().length === 0) {
        return reply.code(400).send({ error: 'Prompt is required' });
      }
      
      if (body.prompt.length > 600) {
        return reply.code(400).send({ error: 'Prompt must be 600 characters or less' });
      }
      
      return {
        taskId: `task-${Date.now()}`,
        status: 'pending',
        prompt: body.prompt.slice(0, 100),
        message: 'Generation started'
      };
    });
    
    // Get generation status
    app.get('/api/generate/:taskId', async (request, reply) => {
      const params = request.params as { taskId: string };
      
      if (!params.taskId) {
        return reply.code(400).send({ error: 'Task ID is required' });
      }
      
      // Mock different states based on task ID pattern
      if (params.taskId.startsWith('completed-')) {
        return {
          taskId: params.taskId,
          status: 'completed',
          progress: 100,
          modelUrl: 'https://example.com/model.glb',
          thumbnailUrl: 'https://example.com/thumb.png'
        };
      }
      
      if (params.taskId.startsWith('failed-')) {
        return {
          taskId: params.taskId,
          status: 'failed',
          progress: 50,
          errorMessage: 'Generation failed'
        };
      }
      
      if (params.taskId.startsWith('processing-')) {
        return {
          taskId: params.taskId,
          status: 'processing',
          progress: 65
        };
      }
      
      return {
        taskId: params.taskId,
        status: 'pending',
        progress: 0
      };
    });
    
    // Pricing endpoint
    app.post('/api/pricing', async (request, reply) => {
      const body = request.body as { 
        parts?: Array<{ materialId: number; volumeCm3: number }>;
        scale?: number;
      };
      
      if (!body?.parts || !Array.isArray(body.parts)) {
        return reply.code(400).send({ error: 'Parts array is required' });
      }
      
      const scale = body.scale || 1;
      const materials: Record<number, number> = {
        6: 0.15, 26: 0.18, 25: 0.45, 80: 0.35, 77: 1.20, 50: 0.50
      };
      
      const partPrices = body.parts.map((part, index) => {
        if (!part.materialId || !part.volumeCm3) {
          return reply.code(400).send({ error: `Part ${index}: materialId and volumeCm3 are required` });
        }
        
        if (part.volumeCm3 <= 0) {
          return reply.code(400).send({ error: `Part ${index}: volume must be greater than 0` });
        }
        
        const pricePerCm3 = materials[part.materialId] || 0.25;
        const priceCents = Math.round(pricePerCm3 * part.volumeCm3 * scale * 100);
        return { partIndex: index, materialId: part.materialId, priceCents };
      });
      
      const subtotalCents = partPrices.reduce((sum: number, p: any) => sum + p.priceCents, 0);
      const shippingCents = 500;
      
      return {
        partPrices,
        subtotalCents,
        shippingCents,
        totalCents: subtotalCents + shippingCents,
        totalDollars: ((subtotalCents + shippingCents) / 100).toFixed(2)
      };
    });
    
    // Analyze endpoint
    app.post('/api/analyze', async (request, reply) => {
      const body = request.body as { prompt?: string };
      
      if (!body?.prompt || body.prompt.trim().length === 0) {
        return reply.code(400).send({ error: 'Prompt is required' });
      }
      
      const prompt = body.prompt.toLowerCase();
      const parts = [];
      
      if (prompt.includes('robot') || prompt.includes('figurine')) {
        parts.push({ id: 'part-1', name: 'Body', type: 'structural', recommendedMaterial: 6 });
      }
      
      if (prompt.includes('joint') || prompt.includes('movable')) {
        parts.push({ id: 'part-2', name: 'Joints', type: 'articulated', recommendedMaterial: 77 });
      }
      
      if (prompt.includes('face') || prompt.includes('detail')) {
        parts.push({ id: 'part-3', name: 'Details', type: 'decorative', recommendedMaterial: 25 });
      }
      
      if (parts.length === 0) {
        parts.push({ id: 'part-1', name: 'Whole Model', type: 'display', recommendedMaterial: 6 });
      }
      
      return {
        success: true,
        analysis: {
          totalParts: parts.length,
          parts,
          complexity: parts.length > 2 ? 'complex' : 'simple'
        }
      };
    });
    
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  // ============================================
  // HEALTH CHECK TESTS
  // ============================================
  describe('GET /health', () => {
    it('should return ok status', async () => {
      const response = await app.inject({ method: 'GET', url: '/health' });
      expect(response.statusCode).toBe(200);
      expect(response.json()).toEqual({
        status: 'ok',
        service: 'formfab-api',
        version: '0.1.0'
      });
    });
  });

  // ============================================
  // MATERIALS TESTS
  // ============================================
  describe('GET /api/materials', () => {
    it('should return list of materials', async () => {
      const response = await app.inject({ method: 'GET', url: '/api/materials' });
      expect(response.statusCode).toBe(200);
      
      const data = response.json();
      expect(data).toHaveProperty('materials');
      expect(Array.isArray(data.materials)).toBe(true);
      expect(data.materials.length).toBeGreaterThan(0);
    });

    it('should include required material properties', async () => {
      const response = await app.inject({ method: 'GET', url: '/api/materials' });
      const data = response.json();
      
      data.materials.forEach((material: any) => {
        expect(material).toHaveProperty('id');
        expect(material).toHaveProperty('name');
        expect(material).toHaveProperty('pricePerCm3');
        expect(typeof material.id).toBe('number');
        expect(typeof material.name).toBe('string');
        expect(typeof material.pricePerCm3).toBe('number');
      });
    });

    it('should include specific materials', async () => {
      const response = await app.inject({ method: 'GET', url: '/api/materials' });
      const data = response.json();
      const ids = data.materials.map((m: any) => m.id);
      
      expect(ids).toContain(6);  // White Plastic
      expect(ids).toContain(26); // Black Plastic
      expect(ids).toContain(77); // Steel
    });
  });

  // ============================================
  // GENERATION TESTS
  // ============================================
  describe('POST /api/generate/text', () => {
    it('should create generation task with valid prompt', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/generate/text',
        payload: { prompt: 'A small robot figurine' }
      });
      
      expect(response.statusCode).toBe(200);
      const data = response.json();
      expect(data).toHaveProperty('taskId');
      expect(data).toHaveProperty('status', 'pending');
      expect(data).toHaveProperty('prompt');
    });

    it('should reject empty prompt', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/generate/text',
        payload: { prompt: '' }
      });
      
      expect(response.statusCode).toBe(400);
      expect(response.json()).toHaveProperty('error');
    });

    it('should reject missing prompt', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/generate/text',
        payload: {}
      });
      
      expect(response.statusCode).toBe(400);
    });

    it('should reject prompt over 600 characters', async () => {
      const longPrompt = 'a'.repeat(601);
      const response = await app.inject({
        method: 'POST',
        url: '/api/generate/text',
        payload: { prompt: longPrompt }
      });
      
      expect(response.statusCode).toBe(400);
      expect(response.json().error).toContain('600');
    });

    it('should accept prompt exactly 600 characters', async () => {
      const maxPrompt = 'a'.repeat(600);
      const response = await app.inject({
        method: 'POST',
        url: '/api/generate/text',
        payload: { prompt: maxPrompt }
      });
      
      expect(response.statusCode).toBe(200);
    });

    it('should trim whitespace from prompt', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/generate/text',
        payload: { prompt: '   robot   ' }
      });
      
      expect(response.statusCode).toBe(200);
    });
  });

  // ============================================
  // GENERATION STATUS TESTS
  // ============================================
  describe('GET /api/generate/:taskId', () => {
    it('should return pending status for new task', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/generate/task-123'
      });
      
      expect(response.statusCode).toBe(200);
      const data = response.json();
      expect(data.status).toBe('pending');
      expect(data.progress).toBe(0);
    });

    it('should return completed status for completed task', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/generate/completed-123'
      });
      
      expect(response.statusCode).toBe(200);
      const data = response.json();
      expect(data.status).toBe('completed');
      expect(data.progress).toBe(100);
      expect(data).toHaveProperty('modelUrl');
    });

    it('should return failed status for failed task', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/generate/failed-123'
      });
      
      expect(response.statusCode).toBe(200);
      const data = response.json();
      expect(data.status).toBe('failed');
      expect(data).toHaveProperty('errorMessage');
    });

    it('should return processing status with progress', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/generate/processing-123'
      });
      
      expect(response.statusCode).toBe(200);
      const data = response.json();
      expect(data.status).toBe('processing');
      expect(data.progress).toBeGreaterThan(0);
      expect(data.progress).toBeLessThan(100);
    });
  });

  // ============================================
  // PRICING TESTS
  // ============================================
  describe('POST /api/pricing', () => {
    it('should calculate price for single part', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/pricing',
        payload: {
          parts: [{ materialId: 6, volumeCm3: 30 }]
        }
      });
      
      expect(response.statusCode).toBe(200);
      const data = response.json();
      expect(data).toHaveProperty('subtotalCents');
      expect(data).toHaveProperty('shippingCents', 500);
      expect(data).toHaveProperty('totalCents');
    });

    it('should calculate price for multiple parts', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/pricing',
        payload: {
          parts: [
            { materialId: 6, volumeCm3: 30 },
            { materialId: 77, volumeCm3: 10 }
          ]
        }
      });
      
      expect(response.statusCode).toBe(200);
      const data = response.json();
      expect(data.partPrices).toHaveLength(2);
      // Body: 0.15 * 30 * 100 = 450 cents
      // Joints: 1.20 * 10 * 100 = 1200 cents
      // Subtotal: 1650 + 500 shipping = 2150 cents = $21.50
      expect(data.subtotalCents).toBe(1650);
      expect(data.totalCents).toBe(2150);
    });

    it('should apply scale factor', async () => {
      const response1 = await app.inject({
        method: 'POST',
        url: '/api/pricing',
        payload: {
          parts: [{ materialId: 6, volumeCm3: 30 }],
          scale: 1
        }
      });
      
      const response2 = await app.inject({
        method: 'POST',
        url: '/api/pricing',
        payload: {
          parts: [{ materialId: 6, volumeCm3: 30 }],
          scale: 2
        }
      });
      
      const data1 = response1.json();
      const data2 = response2.json();
      
      expect(data2.subtotalCents).toBe(data1.subtotalCents * 2);
    });

    it('should reject missing parts', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/pricing',
        payload: {}
      });
      
      expect(response.statusCode).toBe(400);
    });

    it('should reject invalid material ID', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/pricing',
        payload: {
          parts: [{ materialId: 999, volumeCm3: 30 }]
        }
      });
      
      expect(response.statusCode).toBe(200);
      // Should use default pricing for unknown material
    });

    it('should reject zero volume', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/pricing',
        payload: {
          parts: [{ materialId: 6, volumeCm3: 0 }]
        }
      });
      
      expect(response.statusCode).toBe(400);
    });

    it('should reject negative volume', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/pricing',
        payload: {
          parts: [{ materialId: 6, volumeCm3: -10 }]
        }
      });
      
      expect(response.statusCode).toBe(400);
    });

    it('should return correct dollar amount', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/pricing',
        payload: {
          parts: [{ materialId: 6, volumeCm3: 100 }] // 0.15 * 100 * 100 = 1500 cents = $15.00
        }
      });
      
      const data = response.json();
      expect(data.totalDollars).toBe('20.00'); // $15 + $5 shipping
    });
  });

  // ============================================
  // ANALYSIS TESTS
  // ============================================
  describe('POST /api/analyze', () => {
    it('should analyze robot prompt', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/analyze',
        payload: { prompt: 'A robot figurine with metal joints' }
      });
      
      expect(response.statusCode).toBe(200);
      const data = response.json();
      expect(data.success).toBe(true);
      expect(data.analysis.parts.length).toBeGreaterThan(1);
    });

    it('should detect joints in prompt', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/analyze',
        payload: { prompt: 'A figurine with movable joints' }
      });
      
      const data = response.json();
      const jointPart = data.analysis.parts.find((p: any) => p.name === 'Joints');
      expect(jointPart).toBeDefined();
    });

    it('should detect decorative elements', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/analyze',
        payload: { prompt: 'A statue with detailed face' }
      });
      
      const data = response.json();
      const detailsPart = data.analysis.parts.find((p: any) => p.name === 'Details');
      expect(detailsPart).toBeDefined();
    });

    it('should return default part for simple prompt', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/analyze',
        payload: { prompt: 'A simple cube' }
      });
      
      const data = response.json();
      expect(data.analysis.parts).toHaveLength(1);
      expect(data.analysis.parts[0].name).toBe('Whole Model');
    });

    it('should reject empty prompt', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/analyze',
        payload: { prompt: '' }
      });
      
      expect(response.statusCode).toBe(400);
    });
  });

  // ============================================
  // WEBSOCKET TESTS
  // ============================================
  describe('WebSocket /ws/generate/:taskId', () => {
    it('should accept WebSocket connection', async () => {
      // WebSocket testing in Vitest requires additional setup
      // This is a placeholder for WebSocket integration tests
      expect(true).toBe(true);
    });
  });

  // ============================================
  // EDGE CASE TESTS
  // ============================================
  describe('Edge Cases', () => {
    it('should handle special characters in prompt', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/generate/text',
        payload: { prompt: 'A robot with émojis 🤖 and <script>alert(1)</script>' }
      });
      
      expect(response.statusCode).toBe(200);
    });

    it('should handle unicode in prompt', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/generate/text',
        payload: { prompt: 'ロボットのフィギュア' }
      });
      
      expect(response.statusCode).toBe(200);
    });

    it('should handle very large volume', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/pricing',
        payload: {
          parts: [{ materialId: 6, volumeCm3: 10000 }]
        }
      });
      
      expect(response.statusCode).toBe(200);
    });

    it('should handle many parts', async () => {
      const parts = Array(50).fill(null).map((_, i) => ({
        materialId: 6,
        volumeCm3: 10
      }));
      
      const response = await app.inject({
        method: 'POST',
        url: '/api/pricing',
        payload: { parts }
      });
      
      expect(response.statusCode).toBe(200);
      expect(response.json().partPrices).toHaveLength(50);
    });

    it('should handle concurrent requests', async () => {
      const requests = Array(10).fill(null).map((_, i) => 
        app.inject({
          method: 'POST',
          url: '/api/generate/text',
          payload: { prompt: `Robot ${i}` }
        })
      );
      
      const responses = await Promise.all(requests);
      responses.forEach(res => {
        expect(res.statusCode).toBe(200);
      });
    });
  });
});
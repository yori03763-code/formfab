import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import websocket from '@fastify/websocket';
import { aiRoutes } from '../src/routes/ai.js';
import { assemblyRoutes } from '../src/routes/assembly.js';

describe('Full Integration Tests - All Endpoints', () => {
  let app: Fastify.FastifyInstance;

  beforeAll(async () => {
    app = Fastify({ logger: false });
    await app.register(cors, { origin: true });
    await app.register(websocket);
    await app.register(aiRoutes);
    await app.register(assemblyRoutes);
    
    // Health endpoint
    app.get('/health', async () => ({ status: 'ok' }));
    
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Health & Basic Endpoints', () => {
    it('GET /health should return ok', async () => {
      const res = await app.inject({ method: 'GET', url: '/health' });
      expect(res.statusCode).toBe(200);
      expect(JSON.parse(res.payload)).toEqual({ status: 'ok' });
    });
  });

  describe('AI Intelligence Layer', () => {
    describe('POST /api/ai/analyze-part', () => {
      it('should analyze structural part', async () => {
        const res = await app.inject({
          method: 'POST',
          url: '/api/ai/analyze-part',
          payload: { partName: 'Base', prompt: 'A sturdy base for a robot' },
        });
        expect(res.statusCode).toBe(200);
        const data = JSON.parse(res.payload);
        expect(data.analysis.partType).toBe('structural');
      });

      it('should analyze articulated part', async () => {
        const res = await app.inject({
          method: 'POST',
          url: '/api/ai/analyze-part',
          payload: { partName: 'Joint', prompt: 'A movable joint for robot arm' },
        });
        expect(res.statusCode).toBe(200);
        const data = JSON.parse(res.payload);
        expect(data.analysis.partType).toBe('articulated');
      });

      it('should analyze decorative part', async () => {
        const res = await app.inject({
          method: 'POST',
          url: '/api/ai/analyze-part',
          payload: { partName: 'Face', prompt: 'A colorful detailed face' },
        });
        expect(res.statusCode).toBe(200);
        const data = JSON.parse(res.payload);
        expect(data.analysis.partType).toBe('decorative');
      });

      it('should handle missing partName', async () => {
        const res = await app.inject({
          method: 'POST',
          url: '/api/ai/analyze-part',
          payload: {},
        });
        expect(res.statusCode).toBe(400);
      });
    });

    describe('POST /api/ai/recommend-material', () => {
      it('should recommend steel for articulated parts', async () => {
        const res = await app.inject({
          method: 'POST',
          url: '/api/ai/recommend-material',
          payload: { partName: 'Joint', partType: 'articulated' },
        });
        expect(res.statusCode).toBe(200);
        const data = JSON.parse(res.payload);
        expect(data.recommendation.materialName).toBe('Steel');
        expect(data.recommendation.confidence).toBeGreaterThan(0.5);
      });

      it('should recommend full color for decorative parts', async () => {
        const res = await app.inject({
          method: 'POST',
          url: '/api/ai/recommend-material',
          payload: { partName: 'Face', partType: 'decorative' },
        });
        expect(res.statusCode).toBe(200);
        const data = JSON.parse(res.payload);
        expect(data.recommendation.materialName).toBe('Full Color Plastic');
      });

      it('should include alternatives', async () => {
        const res = await app.inject({
          method: 'POST',
          url: '/api/ai/recommend-material',
          payload: { partName: 'Base', partType: 'structural' },
        });
        expect(res.statusCode).toBe(200);
        const data = JSON.parse(res.payload);
        expect(data.recommendation.alternatives).toBeDefined();
        expect(Array.isArray(data.recommendation.alternatives)).toBe(true);
      });

      it('should respect budget constraint', async () => {
        const lowBudget = await app.inject({
          method: 'POST',
          url: '/api/ai/recommend-material',
          payload: { partName: 'Base', partType: 'structural', budget: 'low' },
        });
        const highBudget = await app.inject({
          method: 'POST',
          url: '/api/ai/recommend-material',
          payload: { partName: 'Base', partType: 'structural', budget: 'high' },
        });
        
        expect(lowBudget.statusCode).toBe(200);
        expect(highBudget.statusCode).toBe(200);
      });
    });

    describe('POST /api/ai/recommend-all', () => {
      it('should recommend for multiple parts', async () => {
        const parts = [
          { id: '1', name: 'Body', materialId: 6 },
          { id: '2', name: 'Joints', materialId: 77 },
          { id: '3', name: 'Face', materialId: 25 },
        ];
        const res = await app.inject({
          method: 'POST',
          url: '/api/ai/recommend-all',
          payload: { parts, prompt: 'A robot with colorful face' },
        });
        expect(res.statusCode).toBe(200);
        const data = JSON.parse(res.payload);
        expect(Object.keys(data.recommendations).length).toBe(3);
      });

      it('should handle empty parts array', async () => {
        const res = await app.inject({
          method: 'POST',
          url: '/api/ai/recommend-all',
          payload: { parts: [] },
        });
        expect(res.statusCode).toBe(400);
      });
    });

    describe('POST /api/ai/optimize', () => {
      it('should optimize for cost', async () => {
        const parts = [
          { id: '1', name: 'Body', materialId: 77, volumeCm3: 30 }, // Steel
          { id: '2', name: 'Base', materialId: 77, volumeCm3: 50 }, // Steel
        ];
        const res = await app.inject({
          method: 'POST',
          url: '/api/ai/optimize',
          payload: { parts, optimizationGoal: 'cost' },
        });
        expect(res.statusCode).toBe(200);
        const data = JSON.parse(res.payload);
        expect(data.optimized).toBeDefined();
        expect(data.savings).toBeDefined();
        expect(data.savings.savings).toBeGreaterThanOrEqual(0);
      });

      it('should optimize for performance', async () => {
        const parts = [
          { id: '1', name: 'Body', materialId: 6, volumeCm3: 30 }, // Plastic
          { id: '2', name: 'Joint', materialId: 6, volumeCm3: 10 }, // Plastic
        ];
        const res = await app.inject({
          method: 'POST',
          url: '/api/ai/optimize',
          payload: { parts, optimizationGoal: 'performance' },
        });
        expect(res.statusCode).toBe(200);
        const data = JSON.parse(res.payload);
        expect(data.optimized).toBeDefined();
      });

      it('should respect budget constraint', async () => {
        const parts = [
          { id: '1', name: 'Body', materialId: 77, volumeCm3: 30 },
        ];
        const res = await app.inject({
          method: 'POST',
          url: '/api/ai/optimize',
          payload: { parts, optimizationGoal: 'cost', budget: 5 },
        });
        expect(res.statusCode).toBe(200);
      });
    });

    describe('POST /api/ai/insights', () => {
      it('should generate insights for design', async () => {
        const parts = [
          { name: 'Body', materialId: 6, volumeCm3: 30 },
          { name: 'Joints', materialId: 77, volumeCm3: 10 },
        ];
        const res = await app.inject({
          method: 'POST',
          url: '/api/ai/insights',
          payload: { parts, prompt: 'A robot with grip handles' },
        });
        expect(res.statusCode).toBe(200);
        const data = JSON.parse(res.payload);
        expect(data.insights).toBeDefined();
        expect(Array.isArray(data.insights)).toBe(true);
      });

      it('should suggest material changes', async () => {
        const parts = [
          { name: 'Grip', materialId: 6, volumeCm3: 10 }, // Plastic grip
        ];
        const res = await app.inject({
          method: 'POST',
          url: '/api/ai/insights',
          payload: { parts, prompt: 'A grip handle' },
        });
        expect(res.statusCode).toBe(200);
        const data = JSON.parse(res.payload);
        expect(data.insights.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Assembly Manual Generation', () => {
    describe('POST /api/assembly/generate', () => {
      it('should generate manual for simple assembly', async () => {
        const parts = [
          { id: '1', name: 'Base', materialId: 6, connections: [] },
          { id: '2', name: 'Arm', materialId: 77, connections: [{ to: '1', type: 'screw' }] },
        ];
        const res = await app.inject({
          method: 'POST',
          url: '/api/assembly/generate',
          payload: { parts },
        });
        expect(res.statusCode).toBe(200);
        const manual = JSON.parse(res.payload);
        expect(manual.partsList).toBeDefined();
        expect(manual.steps).toBeDefined();
        expect(manual.checklist).toBeDefined();
        expect(manual.troubleshooting).toBeDefined();
      });

      it('should generate parts list', async () => {
        const parts = [
          { id: '1', name: 'Base', materialId: 6, connections: [] },
          { id: '2', name: 'Top', materialId: 25, connections: [{ to: '1', type: 'snap-fit' }] },
        ];
        const res = await app.inject({
          method: 'POST',
          url: '/api/assembly/generate',
          payload: { parts },
        });
        expect(res.statusCode).toBe(200);
        const manual = JSON.parse(res.payload);
        expect(manual.partsList.length).toBe(2);
        expect(manual.partsList[0].name).toBe('Base');
      });

      it('should infer tools from connections', async () => {
        const parts = [
          { id: '1', name: 'Base', materialId: 6, connections: [] },
          { id: '2', name: 'Arm', materialId: 77, connections: [{ to: '1', type: 'screw' }] },
        ];
        const res = await app.inject({
          method: 'POST',
          url: '/api/assembly/generate',
          payload: { parts },
        });
        expect(res.statusCode).toBe(200);
        const manual = JSON.parse(res.payload);
        expect(manual.toolsRequired).toContain('Phillips screwdriver #2');
      });

      it('should generate assembly steps', async () => {
        const parts = [
          { id: '1', name: 'Base', materialId: 6, connections: [] },
          { id: '2', name: 'Arm', materialId: 77, connections: [{ to: '1', type: 'screw' }] },
        ];
        const res = await app.inject({
          method: 'POST',
          url: '/api/assembly/generate',
          payload: { parts },
        });
        expect(res.statusCode).toBe(200);
        const manual = JSON.parse(res.payload);
        expect(manual.steps.length).toBeGreaterThan(0);
        expect(manual.steps[0].number).toBe(1);
        expect(manual.steps[0].instructions).toBeDefined();
      });

      it('should generate quality checklist', async () => {
        const parts = [
          { id: '1', name: 'Base', materialId: 6, connections: [] },
        ];
        const res = await app.inject({
          method: 'POST',
          url: '/api/assembly/generate',
          payload: { parts },
        });
        expect(res.statusCode).toBe(200);
        const manual = JSON.parse(res.payload);
        expect(manual.checklist.length).toBeGreaterThan(0);
      });

      it('should generate troubleshooting guide', async () => {
        const parts = [
          { id: '1', name: 'Base', materialId: 6, connections: [] },
        ];
        const res = await app.inject({
          method: 'POST',
          url: '/api/assembly/generate',
          payload: { parts },
        });
        expect(res.statusCode).toBe(200);
        const manual = JSON.parse(res.payload);
        expect(manual.troubleshooting.length).toBeGreaterThan(0);
      });

      it('should calculate difficulty', async () => {
        const simple = [
          { id: '1', name: 'Base', materialId: 6, connections: [] },
          { id: '2', name: 'Top', materialId: 6, connections: [{ to: '1', type: 'snap-fit' }] },
        ];
        const complex = Array(10).fill(null).map((_, i) => ({
          id: `${i}`,
          name: `Part ${i}`,
          materialId: 6,
          connections: i > 0 ? [{ to: `${i-1}`, type: 'screw' }] : [],
        }));

        const simpleRes = await app.inject({
          method: 'POST',
          url: '/api/assembly/generate',
          payload: { parts: simple },
        });
        const complexRes = await app.inject({
          method: 'POST',
          url: '/api/assembly/generate',
          payload: { parts: complex },
        });

        const simpleManual = JSON.parse(simpleRes.payload);
        const complexManual = JSON.parse(complexRes.payload);

        expect(simpleManual.difficulty).toBe('easy');
        expect(complexManual.difficulty).toBe('hard');
      });

      it('should estimate time', async () => {
        const parts = [
          { id: '1', name: 'Base', materialId: 6, connections: [] },
          { id: '2', name: 'Arm', materialId: 77, connections: [{ to: '1', type: 'screw' }] },
        ];
        const res = await app.inject({
          method: 'POST',
          url: '/api/assembly/generate',
          payload: { parts },
        });
        expect(res.statusCode).toBe(200);
        const manual = JSON.parse(res.payload);
        expect(manual.estimatedTime).toBeGreaterThan(0);
      });

      it('should handle empty parts', async () => {
        const res = await app.inject({
          method: 'POST',
          url: '/api/assembly/generate',
          payload: { parts: [] },
        });
        expect(res.statusCode).toBe(400);
      });

      it('should handle missing parts field', async () => {
        const res = await app.inject({
          method: 'POST',
          url: '/api/assembly/generate',
          payload: {},
        });
        expect(res.statusCode).toBe(400);
      });
    });

    describe('GET /api/assembly/template/:type', () => {
      it('should return snap-fit template', async () => {
        const res = await app.inject({
          method: 'GET',
          url: '/api/assembly/template/snap-fit',
        });
        expect(res.statusCode).toBe(200);
        const data = JSON.parse(res.payload);
        expect(data.type).toBe('snap-fit');
        expect(data.step).toBeDefined();
      });

      it('should return screw template', async () => {
        const res = await app.inject({
          method: 'GET',
          url: '/api/assembly/template/screw',
        });
        expect(res.statusCode).toBe(200);
        const data = JSON.parse(res.payload);
        expect(data.type).toBe('screw');
      });

      it('should return adhesive template', async () => {
        const res = await app.inject({
          method: 'GET',
          url: '/api/assembly/template/adhesive',
        });
        expect(res.statusCode).toBe(200);
        const data = JSON.parse(res.payload);
        expect(data.type).toBe('adhesive');
      });

      it('should return 404 for unknown type', async () => {
        const res = await app.inject({
          method: 'GET',
          url: '/api/assembly/template/unknown',
        });
        expect(res.statusCode).toBe(404);
      });
    });
  });

  describe('Performance & Edge Cases', () => {
    it('should respond within 500ms for AI recommendations', async () => {
      const start = Date.now();
      const res = await app.inject({
        method: 'POST',
        url: '/api/ai/recommend-material',
        payload: { partName: 'Test Part', partType: 'structural' },
      });
      const duration = Date.now() - start;
      expect(res.statusCode).toBe(200);
      expect(duration).toBeLessThan(500);
    });

    it('should respond within 500ms for assembly generation', async () => {
      const parts = [
        { id: '1', name: 'Base', materialId: 6, connections: [] },
        { id: '2', name: 'Arm', materialId: 77, connections: [{ to: '1', type: 'screw' }] },
      ];
      const start = Date.now();
      const res = await app.inject({
        method: 'POST',
        url: '/api/assembly/generate',
        payload: { parts },
      });
      const duration = Date.now() - start;
      expect(res.statusCode).toBe(200);
      expect(duration).toBeLessThan(500);
    });

    it('should handle 100 concurrent requests', async () => {
      const promises = Array(100).fill(null).map(() =>
        app.inject({
          method: 'POST',
          url: '/api/ai/recommend-material',
          payload: { partName: 'Test', partType: 'structural' },
        })
      );
      const results = await Promise.all(promises);
      const successCount = results.filter(r => r.statusCode === 200).length;
      expect(successCount).toBe(100);
    });

    it('should handle very long part names', async () => {
      const longName = 'A'.repeat(500);
      const res = await app.inject({
        method: 'POST',
        url: '/api/ai/analyze-part',
        payload: { partName: longName },
      });
      expect(res.statusCode).toBe(200);
    });

    it('should handle special characters in prompts', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/ai/analyze-part',
        payload: { partName: 'Test<Part>&"Name"', prompt: 'Special chars: <>&"\'"' },
      });
      expect(res.statusCode).toBe(200);
    });
  });
});

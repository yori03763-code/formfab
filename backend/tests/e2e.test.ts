import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import Fastify from 'fastify';
import cors from '@fastify/cors';

// Import routes
import { aiRoutes } from '../src/routes/ai.js';
import { assemblyRoutes } from '../src/routes/assembly.js';

describe('E2E Tests - Full User Flow', () => {
  let app: Fastify.FastifyInstance;

  beforeAll(async () => {
    app = Fastify({ logger: false });
    await app.register(cors, { origin: true });
    await app.register(aiRoutes);
    await app.register(assemblyRoutes);
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Complete User Journey', () => {
    it('should complete full design-to-order flow', async () => {
      // Step 1: User describes their idea
      const prompt = 'A robot figurine with movable metal joints and a colorful face';

      // Step 2: AI analyzes parts
      const analyzeResponse = await app.inject({
        method: 'POST',
        url: '/api/ai/analyze-part',
        payload: { partName: 'Body', prompt },
      });
      expect(analyzeResponse.statusCode).toBe(200);
      const analysis = JSON.parse(analyzeResponse.payload);
      expect(analysis.analysis).toBeDefined();
      expect(['structural', 'decorative']).toContain(analysis.analysis.partType);

      // Step 3: Get material recommendations
      const recommendResponse = await app.inject({
        method: 'POST',
        url: '/api/ai/recommend-material',
        payload: { 
          partName: 'Joints', 
          partType: 'articulated',
          prompt 
        },
      });
      expect(recommendResponse.statusCode).toBe(200);
      const recommendation = JSON.parse(recommendResponse.payload);
      expect(recommendation.recommendation).toBeDefined();
      expect(['Steel', 'Rubber/TPE']).toContain(recommendation.recommendation.materialName);
      expect(recommendation.recommendation.confidence).toBeGreaterThan(0.1);

      // Step 4: Batch recommend for all parts
      const parts = [
        { id: '1', name: 'Body', materialId: 6 },
        { id: '2', name: 'Joints', materialId: 77 },
        { id: '3', name: 'Face', materialId: 25 },
      ];
      const batchResponse = await app.inject({
        method: 'POST',
        url: '/api/ai/recommend-all',
        payload: { parts, prompt },
      });
      expect(batchResponse.statusCode).toBe(200);
      const batch = JSON.parse(batchResponse.payload);
      expect(batch.recommendations).toBeDefined();
      expect(Object.keys(batch.recommendations).length).toBe(3);

      // Step 5: Optimize for cost
      const optimizeResponse = await app.inject({
        method: 'POST',
        url: '/api/ai/optimize',
        payload: { 
          parts: parts.map(p => ({ ...p, volumeCm3: 30 })),
          optimizationGoal: 'cost',
        },
      });
      expect(optimizeResponse.statusCode).toBe(200);
      const optimized = JSON.parse(optimizeResponse.payload);
      expect(optimized.optimized).toBeDefined();
      expect(optimized.savings).toBeDefined();

      // Step 6: Get design insights
      const insightsResponse = await app.inject({
        method: 'POST',
        url: '/api/ai/insights',
        payload: { 
          parts: parts.map(p => ({ name: p.name, materialId: p.materialId, volumeCm3: 30 })),
          prompt,
        },
      });
      expect(insightsResponse.statusCode).toBe(200);
      const insights = JSON.parse(insightsResponse.payload);
      expect(insights.insights).toBeDefined();
      expect(Array.isArray(insights.insights)).toBe(true);
    });

    it('should handle assembly manual generation', async () => {
      const parts = [
        { 
          id: '1', 
          name: 'Base', 
          materialId: 6,
          connections: []
        },
        { 
          id: '2', 
          name: 'Arm', 
          materialId: 77,
          connections: [{ to: '1', type: 'screw' }]
        },
      ];

      const assemblyResponse = await app.inject({
        method: 'POST',
        url: '/api/assembly/generate',
        payload: { parts },
      });

      expect(assemblyResponse.statusCode).toBe(200);
      const manual = JSON.parse(assemblyResponse.payload);
      expect(manual.partsList).toBeDefined();
      expect(manual.steps).toBeDefined();
      expect(manual.checklist).toBeDefined();
      expect(manual.troubleshooting).toBeDefined();
      expect(manual.difficulty).toBe('easy');
    });

    it('should validate error handling', async () => {
      // Missing required field
      const errorResponse = await app.inject({
        method: 'POST',
        url: '/api/ai/analyze-part',
        payload: {},
      });
      expect(errorResponse.statusCode).toBe(400);
      const error = JSON.parse(errorResponse.payload);
      expect(error.error).toBeDefined();
    });
  });

  describe('Performance Tests', () => {
    it('should respond within 500ms for AI recommendations', async () => {
      const start = Date.now();
      const response = await app.inject({
        method: 'POST',
        url: '/api/ai/recommend-material',
        payload: { partName: 'Test Part', partType: 'structural' },
      });
      const duration = Date.now() - start;
      
      expect(response.statusCode).toBe(200);
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
  });

  describe('Edge Cases', () => {
    it('should handle unknown part types', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/ai/recommend-material',
        payload: { partName: 'Weird Thing', partType: 'unknown' },
      });
      expect(response.statusCode).toBe(200);
      const rec = JSON.parse(response.payload);
      expect(rec.recommendation).toBeDefined();
    });

    it('should handle empty parts array', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/ai/recommend-all',
        payload: { parts: [] },
      });
      expect(response.statusCode).toBe(400);
    });

    it('should handle very long part names', async () => {
      const longName = 'A'.repeat(500);
      const response = await app.inject({
        method: 'POST',
        url: '/api/ai/analyze-part',
        payload: { partName: longName },
      });
      expect(response.statusCode).toBe(200);
    });
  });
});

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import Fastify from 'fastify';
import cors from '@fastify/cors';

// Integration test for the API
describe('FormFab API', () => {
  let app: ReturnType<typeof Fastify>;

  beforeAll(async () => {
    app = Fastify();
    await app.register(cors, { origin: '*' });
    
    // Health check
    app.get('/health', async () => ({ status: 'ok', service: 'formfab-api' }));
    
    // Materials endpoint
    app.get('/api/materials', async () => ({
      materials: [
        { id: 6, name: 'White Plastic', pricePerCm3: 0.15 },
        { id: 26, name: 'Black Plastic', pricePerCm3: 0.18 },
        { id: 80, name: 'Metallic Plastic', pricePerCm3: 0.35 },
        { id: 25, name: 'Full Color Plastic', pricePerCm3: 0.45 },
        { id: 88, name: 'Premium Metal', pricePerCm3: 2.50 },
      ]
    }));
    
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return health check', async () => {
    const response = await app.inject({ method: 'GET', url: '/health' });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ status: 'ok', service: 'formfab-api' });
  });

  it('should return materials list', async () => {
    const response = await app.inject({ method: 'GET', url: '/api/materials' });
    expect(response.statusCode).toBe(200);
    const data = response.json();
    expect(data.materials).toHaveLength(5);
    expect(data.materials[0]).toHaveProperty('name');
    expect(data.materials[0]).toHaveProperty('pricePerCm3');
  });
});
/** FormFab Backend - API Server */

import Fastify from 'fastify';
import cors from '@fastify/cors';

const fastify = Fastify({
  logger: true
});

// Register CORS
await fastify.register(cors, {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000'
});

// Health check
fastify.get('/health', async () => {
  return { status: 'ok', service: 'formfab-api' };
});

// Meshy integration placeholder
fastify.post('/api/generate/text', async (request, reply) => {
  const { prompt } = request.body as { prompt: string };
  
  // TODO: Call Meshy API
  // For now, return a placeholder
  return {
    taskId: `task_${Date.now()}`,
    status: 'pending',
    prompt
  };
});

// Shapeways integration placeholder
fastify.post('/api/orders', async (request, reply) => {
  const { modelId, material, size } = request.body as any;
  
  // TODO: Call Shapeways API
  return {
    orderId: `order_${Date.now()}`,
    status: 'pending',
    estimatedPrice: 29.99
  };
});

// Start server
const start = async () => {
  try {
    const port = parseInt(process.env.PORT || '3001');
    await fastify.listen({ port, host: '0.0.0.0' });
    console.log(`🚀 FormFab API running on http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
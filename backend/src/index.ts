/** FormFab Backend - API Server with WebSocket support */

import Fastify from 'fastify';
import cors from '@fastify/cors';
import websocket from '@fastify/websocket';
import { ENV } from './env.js';
import { meshyService } from './services/meshy.js';
import { shapewaysService } from './services/shapeways.js';
import { analyzeModel, calculateTotalPrice } from './services/material-intelligence.js';

const fastify = Fastify({
  logger: true
});

// Register plugins
fastify.register(cors, {
  origin: true // Allow all origins for development
});

fastify.register(websocket);

// Store connected clients for real-time updates
const connectedClients = new Map<string, Set<any>>();

// =====================
// Health Check
// =====================
fastify.get('/health', async () => {
  return { status: 'ok', service: 'formfab-api', version: '0.1.0', websocket: true };
});

// =====================
// WebSocket for real-time progress
// =====================
fastify.register(async function (fastify) {
  fastify.get('/ws/generate/:taskId', { websocket: true }, (connection, req) => {
    const params = req.params as { taskId: string };
    const taskId = params.taskId;
    
    // Add client to the task's client set
    if (!connectedClients.has(taskId)) {
      connectedClients.set(taskId, new Set());
    }
    connectedClients.get(taskId)!.add(connection.socket);
    
    connection.socket.on('close', () => {
      // Remove client when disconnected
      const clients = connectedClients.get(taskId);
      if (clients) {
        clients.delete(connection.socket);
        if (clients.size === 0) {
          connectedClients.delete(taskId);
        }
      }
    });
    
    // Send initial status
    connection.socket.send(JSON.stringify({
      type: 'connected',
      taskId
    }));
  });
});

// Broadcast progress to all connected clients for a task
function broadcastProgress(taskId: string, data: any) {
  const clients = connectedClients.get(taskId);
  if (clients) {
    const message = JSON.stringify(data);
    clients.forEach((client: any) => {
      try {
        client.send(message);
      } catch (e) {
        // Client might be closed
      }
    });
  }
}

// =====================
// Materials
// =====================
fastify.get('/api/materials', async (request, reply) => {
  try {
    const materials = await shapewaysService.getMaterials();
    return { materials };
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ error: 'Failed to fetch materials' });
  }
});

// =====================
// Generation
// =====================
fastify.post('/api/generate/text', async (request, reply) => {
  const body = request.body as { prompt?: string };
  const { prompt } = body;

  if (!prompt || prompt.trim().length === 0) {
    return reply.code(400).send({ error: 'Prompt is required' });
  }

  if (prompt.length > 600) {
    return reply.code(400).send({ error: 'Prompt must be 600 characters or less' });
  }

  try {
    const taskId = await meshyService.createTextTo3DTask(prompt);
    
    // Start polling in background and broadcast updates
    pollAndBroadcast(taskId);
    
    return {
      taskId,
      status: 'pending',
      prompt: prompt.slice(0, 100),
      message: 'Generation started. Connect to /ws/generate/:taskId for real-time updates.',
      websocketUrl: `/ws/generate/${taskId}`
    };
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ error: 'Generation failed' });
  }
});

// Background polling with WebSocket broadcasts
async function pollAndBroadcast(taskId: string) {
  const maxAttempts = 120; // 10 minutes max
  const intervalMs = 3000; // 3 second intervals

  for (let i = 0; i < maxAttempts; i++) {
    try {
      const task = await meshyService.getTaskStatus(taskId);
      
      // Broadcast update to all connected clients
      broadcastProgress(taskId, {
        type: 'progress',
        taskId: task.taskId,
        status: task.status,
        progress: task.progress,
        modelUrl: task.modelUrl,
        thumbnailUrl: task.thumbnailUrl,
        error: task.errorMessage
      });

      if (task.status === 'completed' || task.status === 'failed') {
        // Clean up clients
        connectedClients.delete(taskId);
        return;
      }

      await new Promise(resolve => setTimeout(resolve, intervalMs));
    } catch (error) {
      console.error('Polling error:', error);
      broadcastProgress(taskId, {
        type: 'error',
        taskId,
        error: 'Failed to get task status'
      });
      connectedClients.delete(taskId);
      return;
    }
  }

  // Timeout
  broadcastProgress(taskId, {
    type: 'error',
    taskId,
    error: 'Generation timed out'
  });
  connectedClients.delete(taskId);
}

// REST endpoint still available
fastify.get('/api/generate/:taskId', async (request, reply) => {
  const params = request.params as { taskId: string };
  const { taskId } = params;

  try {
    const task = await meshyService.getTaskStatus(taskId);
    return task;
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ error: 'Failed to get task status' });
  }
});

// =====================
// Pricing
// =====================
fastify.post('/api/pricing', async (request, reply) => {
  const body = request.body as { materialId?: number; volumeCm3?: number };
  const { materialId, volumeCm3 } = body;

  if (!materialId || !volumeCm3) {
    return reply.code(400).send({ error: 'materialId and volumeCm3 are required' });
  }

  if (volumeCm3 <= 0) {
    return reply.code(400).send({ error: 'volumeCm3 must be greater than 0' });
  }

  if (volumeCm3 > 10000) {
    return reply.code(400).send({ error: 'volumeCm3 must be 10000 or less' });
  }

  const priceCents = shapewaysService.calculateOrderPrice(materialId, volumeCm3);
  const shippingCents = 500;
  const totalCents = priceCents + shippingCents;

  return {
    materialId,
    volumeCm3,
    materialPriceCents: priceCents,
    shippingCents,
    totalCents,
    totalDollars: (totalCents / 100).toFixed(2),
  };
});

// =====================
// Material Intelligence
// =====================
fastify.post('/api/analyze', async (request, reply) => {
  const body = request.body as { prompt?: string };
  const { prompt } = body;

  if (!prompt || prompt.trim().length === 0) {
    return reply.code(400).send({ error: 'Prompt is required' });
  }

  try {
    const analysis = analyzeModel(prompt);
    return {
      success: true,
      analysis,
    };
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ error: 'Analysis failed' });
  }
});

fastify.post('/api/calculate-price', async (request, reply) => {
  const body = request.body as { 
    parts?: Array<{ id: string; materialId: number; volumeCm3: number }>;
    selectedMaterials?: Record<string, number>;
  };
  
  const { parts, selectedMaterials } = body;

  if (!parts || !selectedMaterials) {
    return reply.code(400).send({ error: 'parts and selectedMaterials are required' });
  }

  // Validate all parts
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part.volumeCm3 <= 0) {
      return reply.code(400).send({ error: `Part ${i}: volume must be greater than 0` });
    }
    if (part.volumeCm3 > 10000) {
      return reply.code(400).send({ error: `Part ${i}: volume must be 10000 or less` });
    }
  }

  try {
    // Calculate price for each part
    const partPrices = parts.map(part => {
      const materialId = selectedMaterials[part.id] || 6;
      const priceCents = shapewaysService.calculateOrderPrice(materialId, part.volumeCm3);
      return {
        partId: part.id,
        materialId,
        priceCents,
      };
    });

    const subtotalCents = partPrices.reduce((sum, p) => sum + p.priceCents, 0);
    const shippingCents = 500; // Flat rate
    const totalCents = subtotalCents + shippingCents;

    return {
      partPrices,
      subtotalCents,
      shippingCents,
      totalCents,
      totalDollars: (totalCents / 100).toFixed(2),
    };
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ error: 'Price calculation failed' });
  }
});

// =====================
// Start Server
// =====================
const start = async () => {
  try {
    await fastify.listen({ port: ENV.PORT, host: '0.0.0.0' });
    console.log(`\n🚀 FormFab API running on http://localhost:${ENV.PORT}`);
    console.log(`📝 Health: http://localhost:${ENV.PORT}/health`);
    console.log(`🎨 Materials: http://localhost:${ENV.PORT}/api/materials`);
    console.log(`🔌 WebSocket: ws://localhost:${ENV.PORT}/ws/generate/:taskId`);
    
    if (!ENV.MESHY_API_KEY) {
      console.log(`\n⚠️  MESHY_API_KEY not set - running in mock mode`);
    }
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
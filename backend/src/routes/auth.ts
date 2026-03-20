/**
 * Auth Routes
 * User authentication endpoints
 */

import { FastifyInstance } from 'fastify';
import { initSupabase, signUp, signIn, signOut, getCurrentUser, getUserModels, saveOrder } from '../services/supabase.js';

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';

export async function authRoutes(app: FastifyInstance) {
  // Initialize Supabase
  initSupabase(SUPABASE_URL, SUPABASE_ANON_KEY);

  // Sign up
  app.post('/api/auth/signup', async (request, reply) => {
    const body = request.body as { email?: string; password?: string };
    const { email, password } = body;

    if (!email || !password) {
      return reply.code(400).send({ error: 'Email and password are required' });
    }

    const result = await signUp(email, password);
    
    if (result.error) {
      return reply.code(400).send({ error: result.error });
    }

    return { user: result.user };
  });

  // Sign in
  app.post('/api/auth/signin', async (request, reply) => {
    const body = request.body as { email?: string; password?: string };
    const { email, password } = body;

    if (!email || !password) {
      return reply.code(400).send({ error: 'Email and password are required' });
    }

    const result = await signIn(email, password);
    
    if (result.error) {
      return reply.code(401).send({ error: result.error });
    }

    return { user: result.user };
  });

  // Sign out
  app.post('/api/auth/signout', async (request, reply) => {
    const result = await signOut();
    
    if (result.error) {
      return reply.code(500).send({ error: result.error });
    }

    return { success: true };
  });

  // Get current user
  app.get('/api/auth/me', async (request, reply) => {
    const result = await getCurrentUser();
    
    if (result.error) {
      return reply.code(401).send({ error: result.error });
    }

    return { user: result.user };
  });

  // Get user's models
  app.get('/api/models', async (request, reply) => {
    const result = await getCurrentUser();
    
    if (result.error || !result.user) {
      return reply.code(401).send({ error: 'Unauthorized' });
    }

    const modelsResult = await getUserModels(result.user.id);
    
    if (modelsResult.error) {
      return reply.code(500).send({ error: modelsResult.error });
    }

    return { models: modelsResult.models };
  });

  // Save order
  app.post('/api/orders', async (request, reply) => {
    const body = request.body as {
      model_id?: string;
      total_cents?: number;
      status?: string;
      shipping_address?: any;
    };

    const result = await getCurrentUser();
    
    if (result.error || !result.user) {
      return reply.code(401).send({ error: 'Unauthorized' });
    }

    if (!body.model_id || !body.total_cents) {
      return reply.code(400).send({ error: 'model_id and total_cents are required' });
    }

    const orderResult = await saveOrder({
      user_id: result.user.id,
      model_id: body.model_id,
      total_cents: body.total_cents,
      status: body.status || 'pending',
      shipping_address: body.shipping_address,
    });

    if (orderResult.error) {
      return reply.code(500).send({ error: orderResult.error });
    }

    return { id: orderResult.id };
  });
}

/**
 * Supabase Service
 * Handles authentication and database
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabase: SupabaseClient | null = null;

export function initSupabase(url?: string, anonKey?: string) {
  if (url && anonKey) {
    supabase = createClient(url, anonKey);
  }
}

export function getSupabase(): SupabaseClient | null {
  return supabase;
}

export interface User {
  id: string;
  email: string;
  created_at: string;
}

/**
 * Sign up a new user
 */
export async function signUp(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
  if (!supabase) {
    return { user: null, error: 'Supabase not initialized' };
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return { user: null, error: error.message };
    }

    return {
      user: data.user ? {
        id: data.user.id,
        email: data.user.email || '',
        created_at: data.user.created_at,
      } : null,
      error: null,
    };
  } catch (err) {
    return { user: null, error: 'Failed to sign up' };
  }
}

/**
 * Sign in a user
 */
export async function signIn(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
  if (!supabase) {
    return { user: null, error: 'Supabase not initialized' };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { user: null, error: error.message };
    }

    return {
      user: data.user ? {
        id: data.user.id,
        email: data.user.email || '',
        created_at: data.user.created_at,
      } : null,
      error: null,
    };
  } catch (err) {
    return { user: null, error: 'Failed to sign in' };
  }
}

/**
 * Sign out a user
 */
export async function signOut(): Promise<{ error: string | null }> {
  if (!supabase) {
    return { error: 'Supabase not initialized' };
  }

  try {
    const { error } = await supabase.auth.signOut();
    return { error: error ? error.message : null };
  } catch (err) {
    return { error: 'Failed to sign out' };
  }
}

/**
 * Get current user
 */
export async function getCurrentUser(): Promise<{ user: User | null; error: string | null }> {
  if (!supabase) {
    return { user: null, error: 'Supabase not initialized' };
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
      return { user: null, error: error.message };
    }

    return {
      user: user ? {
        id: user.id,
        email: user.email || '',
        created_at: user.created_at,
      } : null,
      error: null,
    };
  } catch (err) {
    return { user: null, error: 'Failed to get user' };
  }
}

/**
 * Save a model to database
 */
export async function saveModel(model: {
  user_id: string;
  prompt: string;
  meshy_task_id?: string;
  model_url?: string;
  thumbnail_url?: string;
  parts?: any[];
}): Promise<{ id: string | null; error: string | null }> {
  if (!supabase) {
    return { id: null, error: 'Supabase not initialized' };
  }

  try {
    const { data, error } = await supabase
      .from('models')
      .insert([model])
      .select()
      .single();

    if (error) {
      return { id: null, error: error.message };
    }

    return { id: data.id, error: null };
  } catch (err) {
    return { id: null, error: 'Failed to save model' };
  }
}

/**
 * Get user's models
 */
export async function getUserModels(userId: string): Promise<{ models: any[]; error: string | null }> {
  if (!supabase) {
    return { models: [], error: 'Supabase not initialized' };
  }

  try {
    const { data, error } = await supabase
      .from('models')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      return { models: [], error: error.message };
    }

    return { models: data || [], error: null };
  } catch (err) {
    return { models: [], error: 'Failed to get models' };
  }
}

/**
 * Save an order to database
 */
export async function saveOrder(order: {
  user_id: string;
  model_id: string;
  total_cents: number;
  status: string;
  shipping_address?: any;
}): Promise<{ id: string | null; error: string | null }> {
  if (!supabase) {
    return { id: null, error: 'Supabase not initialized' };
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([order])
      .select()
      .single();

    if (error) {
      return { id: null, error: error.message };
    }

    return { id: data.id, error: null };
  } catch (err) {
    return { id: null, error: 'Failed to save order' };
  }
}

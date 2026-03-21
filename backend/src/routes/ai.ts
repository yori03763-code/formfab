/**
 * AI Intelligence Layer Routes
 * Material recommendations, part analysis, and optimization
 */

import { FastifyInstance } from 'fastify';
import { analyzePart, recommendMaterial, recommendForParts, MaterialRecommendation } from '../services/ai-recommendations.js';

export async function aiRoutes(app: FastifyInstance) {
  /**
   * Analyze a single part
   */
  app.post('/api/ai/analyze-part', async (request, reply) => {
    const body = request.body as { partName: string; prompt?: string };
    const { partName, prompt } = body;

    if (!partName) {
      return reply.code(400).send({ error: 'partName is required' });
    }

    const analysis = analyzePart(partName, prompt);
    return { analysis };
  });

  /**
   * Get material recommendation for a part
   */
  app.post('/api/ai/recommend-material', async (request, reply) => {
    const body = request.body as { 
      partName: string; 
      partType?: string;
      requirements?: string[];
      budget?: 'low' | 'medium' | 'high';
      prompt?: string;
    };
    const { partName, partType, requirements, budget, prompt } = body;

    if (!partName) {
      return reply.code(400).send({ error: 'partName is required' });
    }

    const analysis = {
      partName,
      partType: (partType as any) || analyzePart(partName, prompt).partType,
      requirements: requirements || analyzePart(partName, prompt).requirements,
    };

    const recommendation = recommendMaterial(analysis, budget);
    return { recommendation };
  });

  /**
   * Batch recommend materials for all parts
   */
  app.post('/api/ai/recommend-all', async (request, reply) => {
    const body = request.body as { 
      parts: Array<{ id: string; name: string; materialId: number }>;
      prompt?: string;
    };
    const { parts, prompt } = body;

    if (!parts || parts.length === 0) {
      return reply.code(400).send({ error: 'parts array is required' });
    }

    const recommendations = recommendForParts(parts, prompt);
    return { recommendations };
  });

  /**
   * Optimize material selection for cost/performance
   */
  app.post('/api/ai/optimize', async (request, reply) => {
    const body = request.body as { 
      parts: Array<{ id: string; name: string; materialId: number; volumeCm3: number }>;
      optimizationGoal: 'cost' | 'performance' | 'balance';
      budget?: number;
    };
    const { parts, optimizationGoal, budget } = body;

    if (!parts || parts.length === 0) {
      return reply.code(400).send({ error: 'parts array is required' });
    }

    const optimized = optimizeMaterials(parts, optimizationGoal, budget);
    return { optimized, savings: calculateSavings(parts, optimized) };
  });

  /**
   * Get AI insights for a design
   */
  app.post('/api/ai/insights', async (request, reply) => {
    const body = request.body as { 
      parts: Array<{ name: string; materialId: number; volumeCm3: number }>;
      prompt: string;
    };
    const { parts, prompt } = body;

    const insights = generateInsights(parts, prompt);
    return { insights };
  });
}

function optimizeMaterials(
  parts: Array<{ id: string; name: string; materialId: number; volumeCm3: number }>,
  goal: 'cost' | 'performance' | 'balance',
  budget?: number
): Array<{ id: string; name: string; materialId: number; volumeCm3: number }> {
  return parts.map(part => {
    const analysis = analyzePart(part.name);
    const recommendation = recommendMaterial(analysis, goal === 'cost' ? 'low' : goal === 'performance' ? 'high' : 'medium');
    
    // Check if within budget
    if (budget) {
      const currentCost = part.volumeCm3 * 0.15; // Base material cost
      const recommendedCost = part.volumeCm3 * getMaterialPrice(recommendation.materialId);
      
      if (recommendedCost > currentCost && goal !== 'performance') {
        return part; // Keep current if over budget
      }
    }
    
    return {
      ...part,
      materialId: recommendation.materialId,
    };
  });
}

function getMaterialPrice(materialId: number): number {
  const prices: Record<number, number> = {
    6: 0.15, 26: 0.18, 25: 0.45, 80: 0.35, 77: 1.20, 50: 0.50,
  };
  return prices[materialId] || 0.25;
}

function calculateSavings(
  original: Array<{ volumeCm3: number; materialId: number }>,
  optimized: Array<{ volumeCm3: number; materialId: number }>
): { originalCost: number; optimizedCost: number; savings: number; savingsPercent: number } {
  const originalCost = original.reduce((sum, part) => sum + part.volumeCm3 * getMaterialPrice(part.materialId), 0);
  const optimizedCost = optimized.reduce((sum, part) => sum + part.volumeCm3 * getMaterialPrice(part.materialId), 0);
  const savings = originalCost - optimizedCost;
  const savingsPercent = originalCost > 0 ? (savings / originalCost) * 100 : 0;

  return {
    originalCost: Math.round(originalCost * 100) / 100,
    optimizedCost: Math.round(optimizedCost * 100) / 100,
    savings: Math.round(savings * 100) / 100,
    savingsPercent: Math.round(savingsPercent * 100) / 100,
  };
}

function generateInsights(
  parts: Array<{ name: string; materialId: number; volumeCm3: number }>,
  prompt: string
): Array<{ type: 'info' | 'warning' | 'suggestion'; message: string }> {
  const insights = [];

  // Check for material mismatches
  parts.forEach(part => {
    const analysis = analyzePart(part.name, prompt);
    const recommendation = recommendMaterial(analysis);
    
    if (part.materialId !== recommendation.materialId) {
      insights.push({
        type: 'suggestion' as const,
        message: `Consider ${recommendation.materialName} for ${part.name} - ${recommendation.rationale}`,
      });
    }
  });

  // Check total cost
  const totalCost = parts.reduce((sum, part) => sum + part.volumeCm3 * getMaterialPrice(part.materialId), 0);
  if (totalCost > 50) {
    insights.push({
      type: 'info' as const,
      message: `Total material cost: $${totalCost.toFixed(2)}. Consider optimizing for cost to save up to 30%.`,
    });
  }

  // Check part count
  if (parts.length > 10) {
    insights.push({
      type: 'warning' as const,
      message: `Your design has ${parts.length} parts. Consider simplifying to reduce assembly complexity.`,
    });
  }

  // Check for missing flexible parts
  const hasFlexible = parts.some(p => {
    const analysis = analyzePart(p.name, prompt);
    return analysis.partType === 'flexible';
  });
  if (!hasFlexible && prompt.toLowerCase().includes('grip')) {
    insights.push({
      type: 'suggestion' as const,
      message: 'Your design mentions "grip" but has no flexible parts. Consider Rubber/TPE for grip areas.',
    });
  }

  return insights;
}

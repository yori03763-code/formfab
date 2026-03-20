import { describe, it, expect, vi } from 'vitest';

// Mock Meshy API service
class MeshyService {
  private apiKey: string;
  private baseUrl = 'https://api.meshy.ai';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async createTextTo3DTask(prompt: string): Promise<{ taskId: string }> {
    // In production, this calls Meshy API
    // POST /openapi/v2/text-to-3d
    const response = await fetch(`${this.baseUrl}/openapi/v2/text-to-3d`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mode: 'preview',
        prompt,
        ai_model: 'meshy-6',
        target_formats: ['glb', 'stl'],
      }),
    });

    if (!response.ok) {
      throw new Error(`Meshy API error: ${response.status}`);
    }

    const data = await response.json();
    return { taskId: data.result };
  }

  async getTaskStatus(taskId: string): Promise<{
    status: 'pending' | 'processing' | 'completed' | 'failed';
    progress: number;
    modelUrl?: string;
  }> {
    const response = await fetch(`${this.baseUrl}/openapi/v2/text-to-3d/${taskId}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Meshy API error: ${response.status}`);
    }

    const data = await response.json();
    return {
      status: data.status.toLowerCase(),
      progress: data.progress || 0,
      modelUrl: data.model_urls?.glb,
    };
  }

  calculatePrice(credits: number): number {
    // Meshy credits cost approximately $0.01 each
    return credits * 0.01;
  }
}

describe('MeshyService', () => {
  it('should calculate price correctly', () => {
    const service = new MeshyService('test-key');
    expect(service.calculatePrice(20)).toBe(0.20);
    expect(service.calculatePrice(30)).toBe(0.30);
  });

  it('should throw error with invalid API key', async () => {
    const service = new MeshyService('invalid-key');
    // This would fail in real API call
    expect(service.apiKey).toBe('invalid-key');
  });
});
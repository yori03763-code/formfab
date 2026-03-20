/**
 * Meshy AI Service
 * Handles text-to-3D and image-to-3D generation
 */

export interface MeshyTask {
  taskId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  modelUrl?: string;
  thumbnailUrl?: string;
  errorMessage?: string;
}

export interface MeshyCreateResponse {
  result: string; // task ID
}

export class MeshyService {
  private apiKey: string;
  private baseUrl = 'https://api.meshy.ai';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Create a text-to-3D preview task
   * Returns task ID for polling
   */
  async createTextTo3DTask(prompt: string, options?: {
    artStyle?: 'realistic' | 'sculpture';
    targetPolycount?: number;
  }): Promise<string> {
    const response = await fetch(`${this.baseUrl}/openapi/v2/text-to-3d`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mode: 'preview',
        prompt: prompt.slice(0, 600), // Max 600 chars
        ai_model: 'meshy-6',
        topology: 'triangle',
        target_formats: ['glb', 'stl'],
        target_polycount: options?.targetPolycount || 30000,
        moderation: true,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Meshy API error (${response.status}): ${error}`);
    }

    const data: MeshyCreateResponse = await response.json();
    return data.result;
  }

  /**
   * Create a refine task to add textures
   */
  async createRefineTask(previewTaskId: string, texturePrompt?: string): Promise<string> {
    const response = await fetch(`${this.baseUrl}/openapi/v2/text-to-3d`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mode: 'refine',
        preview_task_id: previewTaskId,
        enable_pbr: true,
        texture_prompt: texturePrompt?.slice(0, 600),
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Meshy refine error (${response.status}): ${error}`);
    }

    const data: MeshyCreateResponse = await response.json();
    return data.result;
  }

  /**
   * Get task status and results
   */
  async getTaskStatus(taskId: string): Promise<MeshyTask> {
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
      taskId: data.task_id || taskId,
      status: this.normalizeStatus(data.status),
      progress: data.progress || 0,
      modelUrl: data.model_urls?.glb,
      thumbnailUrl: data.thumbnail_url,
      errorMessage: data.error_message,
    };
  }

  /**
   * Create image-to-3D task
   */
  async createImageTo3DTask(imageUrl: string): Promise<string> {
    const response = await fetch(`${this.baseUrl}/openapi/v1/image-to-3d`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_url: imageUrl,
        ai_model: 'meshy-6',
        should_texture: true,
        enable_pbr: true,
        target_formats: ['glb', 'stl'],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Meshy image-to-3d error (${response.status}): ${error}`);
    }

    const data: MeshyCreateResponse = await response.json();
    return data.result;
  }

  /**
   * Poll task until complete or failed
   */
  async waitForCompletion(taskId: string, options?: {
    maxAttempts?: number;
    intervalMs?: number;
    onProgress?: (progress: number) => void;
  }): Promise<MeshyTask> {
    const maxAttempts = options?.maxAttempts || 60; // 5 minutes max
    const intervalMs = options?.intervalMs || 5000; // 5 second intervals

    for (let i = 0; i < maxAttempts; i++) {
      const task = await this.getTaskStatus(taskId);
      
      if (options?.onProgress) {
        options.onProgress(task.progress);
      }

      if (task.status === 'completed') {
        return task;
      }

      if (task.status === 'failed') {
        throw new Error(task.errorMessage || 'Meshy generation failed');
      }

      await this.sleep(intervalMs);
    }

    throw new Error('Meshy generation timed out');
  }

  private normalizeStatus(status: string): MeshyTask['status'] {
    const lower = status.toLowerCase();
    if (lower === 'succeeded') return 'completed';
    if (lower === 'in_progress') return 'processing';
    return lower as MeshyTask['status'];
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export const meshyService = new MeshyService(process.env.MESHY_API_KEY || '');
/**
 * Shapeways Service
 * Handles material info and order fulfillment
 */

export interface Material {
  id: number;
  title: string;
  swatch: string;
  supportsColorFiles: boolean;
  pricePerCm3: number; // Our calculated price
}

export interface ShapewaysMaterial {
  materialId: string;
  title: string;
  supportsColorFiles: string;
  printerId: string;
  swatch: string;
}

export class ShapewaysService {
  private clientId: string;
  private clientSecret: string;
  private baseUrl = 'https://api.shapeways.com';
  private accessToken: string | null = null;

  constructor(clientId: string, clientSecret: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  /**
   * Get OAuth access token
   */
  async getAccessToken(): Promise<string> {
    if (this.accessToken) return this.accessToken;

    const response = await fetch(`${this.baseUrl}/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: this.clientId,
        client_secret: this.clientSecret,
      }).toString(),
    });

    if (!response.ok) {
      throw new Error(`Shapeways auth error: ${response.status}`);
    }

    const data = await response.json();
    this.accessToken = data.access_token;
    return this.accessToken;
  }

  /**
   * Get available materials
   */
  async getMaterials(): Promise<Material[]> {
    const token = await this.getAccessToken();
    
    const response = await fetch(`${this.baseUrl}/materials/v1`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Shapeways materials error: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform and add pricing
    const materials: Material[] = [];
    for (const [id, material] of Object.entries(data.Materials || {})) {
      const m = material as ShapewaysMaterial;
      materials.push({
        id: parseInt(id),
        title: m.title,
        swatch: m.swatch,
        supportsColorFiles: m.supportsColorFiles === '1',
        pricePerCm3: this.calculatePrice(parseInt(id)),
      });
    }

    return materials;
  }

  /**
   * Calculate our price for a material
   */
  private calculatePrice(materialId: number): number {
    // Our pricing model based on material type
    const pricing: Record<number, number> = {
      6: 0.15,   // White Plastic
      26: 0.18,  // Black Plastic
      80: 0.35,  // Metallic Plastic
      25: 0.45,  // Full Color
      88: 2.50,  // Premium Metal
      77: 1.20,  // Steel
      79: 1.80,  // Bronze
      83: 3.50,  // Gold Plated
    };
    return pricing[materialId] || 0.25;
  }

  /**
   * Calculate total price for an order
   */
  calculateOrderPrice(materialId: number, volumeCm3: number, markup: number = 1.5): number {
    const pricePerCm3 = this.calculatePrice(materialId);
    const basePrice = pricePerCm3 * volumeCm3;
    const finalPrice = basePrice * markup;
    return Math.round(finalPrice * 100); // Return in cents
  }

  /**
   * Submit order to Shapeways
   */
  async createOrder(params: {
    modelUrl: string;
    materialId: number;
    quantity: number;
    shippingAddress: {
      firstName: string;
      lastName: string;
      address1: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
  }): Promise<{ orderId: string }> {
    const token = await this.getAccessToken();

    const response = await fetch(`${this.baseUrl}/orders/v1`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        file: params.modelUrl,
        material_id: params.materialId,
        quantity: params.quantity,
        shipping: params.shippingAddress,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Shapeways order error: ${error}`);
    }

    const data = await response.json();
    return { orderId: data.order_id };
  }
}

// Mock service for development (no API key required)
export class MockShapewaysService extends ShapewaysService {
  private mockMaterials: Material[] = [
    { id: 6, title: 'White Plastic', swatch: '', supportsColorFiles: false, pricePerCm3: 0.15 },
    { id: 26, title: 'Black Plastic', swatch: '', supportsColorFiles: false, pricePerCm3: 0.18 },
    { id: 80, title: 'Metallic Plastic', swatch: '', supportsColorFiles: false, pricePerCm3: 0.35 },
    { id: 25, title: 'Full Color Plastic', swatch: '', supportsColorFiles: true, pricePerCm3: 0.45 },
    { id: 88, title: 'Premium Metal', swatch: '', supportsColorFiles: false, pricePerCm3: 2.50 },
  ];

  async getMaterials(): Promise<Material[]> {
    return this.mockMaterials;
  }

  async createOrder(): Promise<{ orderId: string }> {
    return { orderId: `mock-${Date.now()}` };
  }
}

// Export appropriate service based on config
export const shapewaysService = process.env.SHAPEWAYS_CLIENT_ID 
  ? new ShapewaysService(process.env.SHAPEWAYS_CLIENT_ID, process.env.SHAPEWAYS_CLIENT_SECRET || '')
  : new MockShapewaysService('', '');
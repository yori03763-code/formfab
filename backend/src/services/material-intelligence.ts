/**
 * Material Intelligence Service
 * Analyzes 3D models and recommends optimal materials per part
 * 
 * This is the KEY DIFFERENTIATOR for FormFab
 */

export interface PartAnalysis {
  id: string;
  name: string;
  type: 'structural' | 'decorative' | 'articulated' | 'flexible' | 'display';
  description: string;
  recommendedMaterial: number;
  recommendedMaterialName: string;
  rationale: string;
  alternativeMaterials: number[];
  estimatedVolumeCm3: number;
  priceRange: { min: number; max: number };
}

export interface ModelAnalysis {
  totalParts: number;
  parts: PartAnalysis[];
  overallComplexity: 'simple' | 'moderate' | 'complex';
  assemblyRequired: boolean;
  estimatedPrintTime: string;
  totalPriceRange: { min: number; max: number };
}

// Material definitions with properties
const MATERIALS = {
  6: { name: 'White Plastic', pricePerCm3: 0.15, properties: ['rigid', 'lightweight', 'affordable'], bestFor: ['structural', 'display'] },
  26: { name: 'Black Plastic', pricePerCm3: 0.18, properties: ['rigid', 'lightweight', 'contrasting'], bestFor: ['structural', 'decorative'] },
  25: { name: 'Full Color Plastic', pricePerCm3: 0.45, properties: ['colorful', 'detailed', 'expressive'], bestFor: ['decorative', 'display'] },
  80: { name: 'Metallic Plastic', pricePerCm3: 0.35, properties: ['premium-look', 'durable', 'aesthetic'], bestFor: ['decorative', 'display'] },
  77: { name: 'Steel', pricePerCm3: 1.20, properties: ['very-durable', 'heavy', 'industrial'], bestFor: ['structural', 'articulated'] },
  79: { name: 'Bronze', pricePerCm3: 1.80, properties: ['premium', 'heavy', 'artistic'], bestFor: ['display', 'decorative'] },
  88: { name: 'Premium Metal', pricePerCm3: 2.50, properties: ['luxury', 'durable', 'premium'], bestFor: ['display', 'articulated'] },
  50: { name: 'Rubber/TPE', pricePerCm3: 0.50, properties: ['flexible', 'grippy', 'ergonomic'], bestFor: ['flexible', 'articulated'] },
};

// Part type patterns for analysis
const PART_PATTERNS = {
  articulated: ['joint', 'hinge', 'moving', 'articulated', 'poseable', 'flexible', 'bendable'],
  structural: ['base', 'frame', 'support', 'body', 'shell', 'structure', 'core'],
  decorative: ['detail', 'decoration', 'ornament', 'pattern', 'texture', 'engraved'],
  flexible: ['rubber', 'soft', 'flexible', 'grip', 'cushion', 'padding'],
  display: ['figurine', 'statue', 'model', 'collectible', 'display', 'showpiece'],
};

/**
 * Analyze a text prompt to identify potential parts and their functions
 */
export function analyzePromptForParts(prompt: string): PartAnalysis[] {
  const lowerPrompt = prompt.toLowerCase();
  const parts: PartAnalysis[] = [];
  let partId = 1;

  // Detect main body/structure
  const hasBody = /body|main|base|core|frame|figure|figurine|character|object/.test(lowerPrompt);
  if (hasBody) {
    const volume = estimateVolume('structural', prompt);
    parts.push({
      id: `part-${partId++}`,
      name: 'Main Body',
      type: 'structural',
      description: 'Primary structure of the model',
      recommendedMaterial: 6, // White Plastic
      recommendedMaterialName: 'White Plastic',
      rationale: 'Lightweight and affordable for the main structure',
      alternativeMaterials: [26, 80],
      estimatedVolumeCm3: volume,
      priceRange: calculatePriceRange(volume, [6, 26, 80]),
    });
  }

  // Detect articulated parts
  const hasJoints = /joint|hinge|movable|moving|articulated|poseable|arm|leg|head/.test(lowerPrompt);
  if (hasJoints) {
    const volume = estimateVolume('articulated', prompt);
    parts.push({
      id: `part-${partId++}`,
      name: 'Joints/Articulated Parts',
      type: 'articulated',
      description: 'Moving or adjustable components',
      recommendedMaterial: 77, // Steel
      recommendedMaterialName: 'Steel',
      rationale: 'Durable metal for smooth articulation and longevity',
      alternativeMaterials: [88, 6],
      estimatedVolumeCm3: volume,
      priceRange: calculatePriceRange(volume, [77, 88, 6]),
    });
  }

  // Detect decorative elements
  const hasDecorative = /detail|pattern|decoration|ornament|face|eyes|texture|engrav/.test(lowerPrompt);
  if (hasDecorative) {
    const volume = estimateVolume('decorative', prompt);
    parts.push({
      id: `part-${partId++}`,
      name: 'Decorative Details',
      type: 'decorative',
      description: 'Fine details and surface features',
      recommendedMaterial: 25, // Full Color
      recommendedMaterialName: 'Full Color Plastic',
      rationale: 'Best for capturing fine details and colors',
      alternativeMaterials: [80, 6],
      estimatedVolumeCm3: volume,
      priceRange: calculatePriceRange(volume, [25, 80, 6]),
    });
  }

  // Detect flexible parts
  const hasFlexible = /rubber|soft|flexible|grip|cushion|pad|handle/.test(lowerPrompt);
  if (hasFlexible) {
    const volume = estimateVolume('flexible', prompt);
    parts.push({
      id: `part-${partId++}`,
      name: 'Flexible Components',
      type: 'flexible',
      description: 'Soft or bendable elements',
      recommendedMaterial: 50, // Rubber/TPE
      recommendedMaterialName: 'Rubber/TPE',
      rationale: 'Flexible material for ergonomic or functional parts',
      alternativeMaterials: [6],
      estimatedVolumeCm3: volume,
      priceRange: calculatePriceRange(volume, [50, 6]),
    });
  }

  // If no specific parts detected, create a single display part
  if (parts.length === 0) {
    const volume = estimateVolume('display', prompt);
    parts.push({
      id: `part-${partId++}`,
      name: 'Complete Model',
      type: 'display',
      description: 'Single-piece display model',
      recommendedMaterial: 6,
      recommendedMaterialName: 'White Plastic',
      rationale: 'Versatile material suitable for display pieces',
      alternativeMaterials: [26, 25, 80],
      estimatedVolumeCm3: volume,
      priceRange: calculatePriceRange(volume, [6, 26, 25, 80]),
    });
  }

  return parts;
}

/**
 * Estimate volume based on part type and prompt complexity
 */
function estimateVolume(partType: string, prompt: string): number {
  const words = prompt.split(' ').length;
  const complexity = words > 20 ? 1.5 : words > 10 ? 1.0 : 0.7;
  
  const baseVolumes: Record<string, number> = {
    structural: 30,
    articulated: 5,
    decorative: 3,
    flexible: 8,
    display: 25,
  };

  return Math.round((baseVolumes[partType] || 20) * complexity);
}

/**
 * Calculate price range for a volume across materials
 */
function calculatePriceRange(volumeCm3: number, materialIds: number[]): { min: number; max: number } {
  const prices = materialIds.map(id => {
    const material = MATERIALS[id as keyof typeof MATERIALS];
    return material ? material.pricePerCm3 * volumeCm3 * 100 : 0; // in cents
  });

  return {
    min: Math.round(Math.min(...prices)),
    max: Math.round(Math.max(...prices)),
  };
}

/**
 * Full model analysis with recommendations
 */
export function analyzeModel(prompt: string, modelUrl?: string): ModelAnalysis {
  const parts = analyzePromptForParts(prompt);
  
  const totalPriceMin = parts.reduce((sum, part) => sum + part.priceRange.min, 0);
  const totalPriceMax = parts.reduce((sum, part) => sum + part.priceRange.max, 0);

  return {
    totalParts: parts.length,
    parts,
    overallComplexity: parts.length > 3 ? 'complex' : parts.length > 1 ? 'moderate' : 'simple',
    assemblyRequired: parts.length > 1,
    estimatedPrintTime: estimatePrintTime(parts),
    totalPriceRange: { min: totalPriceMin, max: totalPriceMax },
  };
}

/**
 * Estimate total print time
 */
function estimatePrintTime(parts: PartAnalysis[]): string {
  const totalVolume = parts.reduce((sum, part) => sum + part.estimatedVolumeCm3, 0);
  const hours = Math.ceil(totalVolume / 15); // ~15 cm³ per hour average
  
  if (hours > 24) {
    return `${Math.floor(hours / 24)}d ${hours % 24}h`;
  }
  return `${hours}h`;
}

/**
 * Get recommended material for a part type
 */
export function getRecommendedMaterial(partType: PartAnalysis['type']): { id: number; name: string; rationale: string } {
  const recommendations: Record<string, { id: number; name: string; rationale: string }> = {
    structural: { id: 6, name: 'White Plastic', rationale: 'Lightweight and affordable for structural components' },
    decorative: { id: 25, name: 'Full Color Plastic', rationale: 'Best for detailed decorative elements' },
    articulated: { id: 77, name: 'Steel', rationale: 'Durable for moving parts and joints' },
    flexible: { id: 50, name: 'Rubber/TPE', rationale: 'Flexible material for ergonomic parts' },
    display: { id: 80, name: 'Metallic Plastic', rationale: 'Premium look for display pieces' },
  };

  return recommendations[partType] || recommendations.display;
}

/**
 * Calculate total price for selected materials
 */
export function calculateTotalPrice(
  parts: PartAnalysis[],
  selectedMaterials: Record<string, number>
): number {
  return parts.reduce((total, part) => {
    const materialId = selectedMaterials[part.id] || part.recommendedMaterial;
    const material = MATERIALS[materialId as keyof typeof MATERIALS];
    const price = material 
      ? material.pricePerCm3 * part.estimatedVolumeCm3 * 100 // in cents
      : 0;
    return total + price;
  }, 0);
}
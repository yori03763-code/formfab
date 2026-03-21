/**
 * AI Material Recommendation Service
 * Recommends optimal materials based on part function
 */

export interface MaterialRecommendation {
  materialId: number;
  materialName: string;
  confidence: number;
  rationale: string;
  alternatives: Array<{
    materialId: number;
    materialName: string;
    tradeoff: string;
    costDifference: number;
  }>;
}

export interface PartAnalysis {
  partName: string;
  partType: 'structural' | 'decorative' | 'articulated' | 'flexible' | 'display';
  requirements: string[];
}

const MATERIAL_DATABASE = [
  {
    id: 6,
    name: 'White Plastic',
    pricePerCm3: 0.15,
    properties: {
      strength: 0.5,
      flexibility: 0.1,
      durability: 0.5,
      aesthetics: 0.3,
      cost: 0.1,
    },
    bestFor: ['structural', 'display'],
  },
  {
    id: 26,
    name: 'Black Plastic',
    pricePerCm3: 0.18,
    properties: {
      strength: 0.5,
      flexibility: 0.1,
      durability: 0.5,
      aesthetics: 0.5,
      cost: 0.15,
    },
    bestFor: ['structural', 'decorative'],
  },
  {
    id: 25,
    name: 'Full Color Plastic',
    pricePerCm3: 0.45,
    properties: {
      strength: 0.4,
      flexibility: 0.1,
      durability: 0.4,
      aesthetics: 1.0,
      cost: 0.5,
    },
    bestFor: ['decorative', 'display'],
  },
  {
    id: 80,
    name: 'Metallic Plastic',
    pricePerCm3: 0.35,
    properties: {
      strength: 0.5,
      flexibility: 0.1,
      durability: 0.6,
      aesthetics: 0.8,
      cost: 0.35,
    },
    bestFor: ['decorative', 'display'],
  },
  {
    id: 77,
    name: 'Steel',
    pricePerCm3: 1.20,
    properties: {
      strength: 1.0,
      flexibility: 0.0,
      durability: 1.0,
      aesthetics: 0.6,
      cost: 1.0,
    },
    bestFor: ['structural', 'articulated'],
  },
  {
    id: 50,
    name: 'Rubber/TPE',
    pricePerCm3: 0.50,
    properties: {
      strength: 0.3,
      flexibility: 1.0,
      durability: 0.6,
      aesthetics: 0.4,
      cost: 0.4,
    },
    bestFor: ['flexible', 'articulated'],
  },
];

const PART_TYPE_KEYWORDS: Record<string, string[]> = {
  structural: ['body', 'base', 'frame', 'support', 'structure', 'core', 'main', 'housing'],
  decorative: ['face', 'detail', 'pattern', 'ornament', 'decoration', 'texture', 'colorful'],
  articulated: ['joint', 'hinge', 'moving', 'rotating', 'articulated', 'arm', 'leg', 'head'],
  flexible: ['grip', 'handle', 'soft', 'flexible', 'rubber', 'cushion', 'pad'],
  display: ['figurine', 'statue', 'model', 'display', 'showpiece', 'collectible'],
};

/**
 * Analyze part name and infer type
 */
export function analyzePart(partName: string, prompt?: string): PartAnalysis {
  const lowerName = partName.toLowerCase();
  const lowerPrompt = prompt?.toLowerCase() || '';
  const combined = `${lowerName} ${lowerPrompt}`;

  // Detect part type from keywords
  let partType: PartAnalysis['partType'] = 'structural';
  let maxScore = 0;

  Object.entries(PART_TYPE_KEYWORDS).forEach(([type, keywords]) => {
    const score = keywords.filter(kw => combined.includes(kw)).length;
    if (score > maxScore) {
      maxScore = score;
      partType = type as PartAnalysis['partType'];
    }
  });

  // Extract requirements from prompt
  const requirements: string[] = [];
  if (combined.includes('strong') || combined.includes('durable')) requirements.push('strength');
  if (combined.includes('flexible') || combined.includes('soft')) requirements.push('flexibility');
  if (combined.includes('colorful') || combined.includes('detailed')) requirements.push('aesthetics');
  if (combined.includes('cheap') || combined.includes('affordable')) requirements.push('cost');
  if (combined.includes('moving') || combined.includes('joint')) requirements.push('durability');

  return {
    partName,
    partType,
    requirements,
  };
}

/**
 * Recommend material for a part
 */
export function recommendMaterial(analysis: PartAnalysis, budget?: 'low' | 'medium' | 'high'): MaterialRecommendation {
  // Score each material
  const scores = MATERIAL_DATABASE.map(material => {
    let score = 0;

    // Base score for part type match
    if (material.bestFor.includes(analysis.partType)) {
      score += 3;
    }

    // Score for requirement match
    analysis.requirements.forEach(req => {
      const propValue = material.properties[req as keyof typeof material.properties] || 0;
      score += propValue * 2;
    });

    // Budget adjustment
    if (budget === 'low') {
      score += (1 - material.properties.cost) * 2;
    } else if (budget === 'high') {
      score += material.properties.cost; // Prefer premium materials
    }

    return { material, score };
  });

  // Sort by score
  scores.sort((a, b) => b.score - a.score);

  // Get top recommendation
  const top = scores[0];
  const alternatives = scores.slice(1, 4);

  // Calculate confidence
  const totalScore = scores.reduce((sum, s) => sum + s.score, 0);
  const confidence = top.score / totalScore;

  // Generate rationale
  const rationale = generateRationale(top.material, analysis);

  // Generate alternatives with trade-offs
  const alternativeRecommendations = alternatives.map(alt => ({
    materialId: alt.material.id,
    materialName: alt.material.name,
    tradeoff: generateTradeoff(alt.material, top.material, analysis),
    costDifference: Math.round((alt.material.pricePerCm3 - top.material.pricePerCm3) * 30 * 100) / 100, // For 30cm³ part
  }));

  return {
    materialId: top.material.id,
    materialName: top.material.name,
    confidence: Math.round(confidence * 100) / 100,
    rationale,
    alternatives: alternativeRecommendations,
  };
}

function generateRationale(material: any, analysis: PartAnalysis): string {
  const rationales: Record<string, Record<string, string>> = {
    structural: {
      'White Plastic': 'Lightweight and affordable for structural components',
      'Black Plastic': 'Sleek appearance with good structural properties',
      'Steel': 'Maximum strength and durability for load-bearing parts',
    },
    decorative: {
      'Full Color Plastic': 'Best for capturing fine details and vibrant colors',
      'Metallic Plastic': 'Premium metallic finish for decorative appeal',
      'Black Plastic': 'Modern, sleek appearance for visible parts',
    },
    articulated: {
      'Steel': 'Durable metal for smooth articulation and longevity',
      'Rubber/TPE': 'Flexible material for joints requiring movement',
    },
    flexible: {
      'Rubber/TPE': 'Flexible material for ergonomic grips and soft-touch surfaces',
    },
    display: {
      'Full Color Plastic': 'Vibrant colors for display pieces',
      'Metallic Plastic': 'Premium look for collectibles',
      'White Plastic': 'Clean, neutral base for display',
    },
  };

  return rationales[analysis.partType]?.[material.name] || 
    `Good match for ${analysis.partType} applications based on material properties`;
}

function generateTradeoff(selected: any, original: any, analysis: PartAnalysis): string {
  if (selected.pricePerCm3 < original.pricePerCm3) {
    return `Save $${((original.pricePerCm3 - selected.pricePerCm3) * 30).toFixed(2)} but ${getDownside(selected, analysis)}`;
  } else {
    return `${getUpside(selected, analysis)} but costs $${((selected.pricePerCm3 - original.pricePerCm3) * 30).toFixed(2)} more`;
  }
}

function getDownside(material: any, analysis: PartAnalysis): string {
  if (material.properties.strength < 0.5 && analysis.partType === 'structural') {
    return 'less strength';
  }
  if (material.properties.aesthetics < 0.5 && analysis.partType === 'decorative') {
    return 'less visual appeal';
  }
  if (material.properties.durability < 0.5) {
    return 'reduced durability';
  }
  return 'different properties';
}

function getUpside(material: any, analysis: PartAnalysis): string {
  if (material.properties.strength > 0.8 && analysis.partType === 'structural') {
    return 'Better strength';
  }
  if (material.properties.aesthetics > 0.8 && analysis.partType === 'decorative') {
    return 'Better appearance';
  }
  if (material.properties.durability > 0.8) {
    return 'Better durability';
  }
  return 'Different properties';
}

/**
 * Batch recommend materials for multiple parts
 */
export function recommendForParts(parts: Array<{ id: string; name: string; materialId: number }>, prompt?: string): Record<string, MaterialRecommendation> {
  const recommendations: Record<string, MaterialRecommendation> = {};

  parts.forEach(part => {
    const analysis = analyzePart(part.name, prompt);
    recommendations[part.id] = recommendMaterial(analysis);
  });

  return recommendations;
}

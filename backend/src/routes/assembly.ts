/**
 * Assembly Manual Generation Routes
 * Generates step-by-step assembly instructions
 */

import Fastify from 'fastify';
type FastifyInstance = Fastify.FastifyInstance;

export interface AssemblyStep {
  number: number;
  title: string;
  instructions: string[];
  tools?: string[];
  warnings?: string[];
  estimatedTime: number;
}

export interface AssemblyManual {
  partsList: Array<{ name: string; material: string; quantity: number }>;
  toolsRequired: string[];
  steps: AssemblyStep[];
  checklist: string[];
  troubleshooting: Array<{ problem: string; solution: string }>;
  estimatedTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

const CONNECTION_TEMPLATES: Record<string, (partA: string, partB: string) => AssemblyStep> = {
  'snap-fit': (partA, partB) => ({
    number: 0,
    title: `Attach ${partA} to ${partB}`,
    instructions: [
      `Orient ${partA} so the notch faces the connection point`,
      `Align the tab on ${partA} with the slot on ${partB}`,
      `Press firmly until you hear/feel a click`,
      `Gently tug to confirm secure connection`,
    ],
    tools: [],
    warnings: ['Ensure proper orientation before pressing'],
    estimatedTime: 1,
  }),
  'screw': (partA, partB) => ({
    number: 0,
    title: `Secure ${partA} to ${partB} with screws`,
    instructions: [
      `Insert screw through hole in ${partA}`,
      `Align threaded hole in ${partB}`,
      `Turn clockwise until snug (do not overtighten)`,
      `Repeat for remaining screws`,
    ],
    tools: ['Phillips screwdriver #2'],
    warnings: ['Do not overtighten - may strip threads'],
    estimatedTime: 3,
  }),
  'adhesive': (partA, partB) => ({
    number: 0,
    title: `Glue ${partA} to ${partB}`,
    instructions: [
      `Clean both surfaces with alcohol wipe`,
      `Apply thin layer of super glue to one surface`,
      `Press parts together firmly for 30 seconds`,
      `Hold in place for 2 minutes`,
      `Allow to cure for 24 hours before use`,
    ],
    tools: ['Super glue', 'Alcohol wipe'],
    warnings: ['Work in well-ventilated area', 'Avoid skin contact with glue'],
    estimatedTime: 5,
  }),
  'press-fit': (partA, partB) => ({
    number: 0,
    title: `Press ${partA} into ${partB}`,
    instructions: [
      `Align ${partA} with the receiving hole`,
      `Press firmly and evenly until flush`,
      `Check that part is seated completely`,
    ],
    tools: [],
    warnings: ['May require significant force'],
    estimatedTime: 1,
  }),
  'hinge': (partA, partB) => ({
    number: 0,
    title: `Install hinge connecting ${partA} and ${partB}`,
    instructions: [
      `Insert hinge pin through ${partA}`,
      `Align ${partB} with hinge`,
      `Insert hinge pin through ${partB}`,
      `Test rotation - should move smoothly`,
    ],
    tools: [],
    warnings: ['Ensure hinge pin is fully seated'],
    estimatedTime: 2,
  }),
  'sliding': (partA, partB) => ({
    number: 0,
    title: `Install ${partA} to slide on ${partB}`,
    instructions: [
      `Align track on ${partA} with rail on ${partB}`,
      `Slide ${partA} onto ${partB}`,
      `Test sliding motion - should move smoothly`,
      `Install end stops if provided`,
    ],
    tools: [],
    warnings: ['Ensure track is clean before installation'],
    estimatedTime: 2,
  }),
};

export async function assemblyRoutes(app: FastifyInstance) {
  /**
   * Generate assembly manual from parts and relationships
   */
  app.post('/api/assembly/generate', async (request, reply) => {
    const body = request.body as {
      parts: Array<{ id: string; name: string; materialId: number; connections?: Array<{ to: string; type: string }> }>;
    };

    const { parts } = body;

    if (!parts || parts.length === 0) {
      return reply.code(400).send({ error: 'Parts array is required' });
    }

    // Generate parts list
    const partsList = parts.map(part => ({
      name: part.name,
      material: getMaterialName(part.materialId),
      quantity: 1,
    }));

    // Infer tools required based on connections
    const toolsRequired = inferTools(parts);

    // Generate assembly steps
    const steps = generateSteps(parts);

    // Generate checklist
    const checklist = generateChecklist(parts);

    // Generate troubleshooting
    const troubleshooting = generateTroubleshooting(parts);

    // Calculate total time and difficulty
    const estimatedTime = steps.reduce((sum, step) => sum + step.estimatedTime, 0);
    const difficulty = steps.length <= 3 ? 'easy' : steps.length <= 7 ? 'medium' : 'hard';

    const manual: AssemblyManual = {
      partsList,
      toolsRequired,
      steps,
      checklist,
      troubleshooting,
      estimatedTime,
      difficulty,
    };

    return manual;
  });

  /**
   * Get connection template
   */
  app.get('/api/assembly/template/:type', async (request, reply) => {
    const params = request.params as { type: string };
    const template = CONNECTION_TEMPLATES[params.type];

    if (!template) {
      return reply.code(404).send({ error: `Template not found: ${params.type}` });
    }

    // Return template with placeholder parts
    const step = template('Part A', 'Part B');
    return { type: params.type, step };
  });
}

function getMaterialName(materialId: number): string {
  const materials: Record<number, string> = {
    6: 'White Plastic',
    26: 'Black Plastic',
    25: 'Full Color Plastic',
    80: 'Metallic Plastic',
    77: 'Steel',
    50: 'Rubber/TPE',
  };
  return materials[materialId] || 'Unknown Material';
}

function inferTools(parts: any[]): string[] {
  const tools = new Set<string>();

  parts.forEach(part => {
    part.connections?.forEach((conn: any) => {
      if (conn.type === 'screw') {
        tools.add('Phillips screwdriver #2');
        tools.add('Screws (included)');
      }
      if (conn.type === 'adhesive') {
        tools.add('Super glue');
        tools.add('Alcohol wipe');
      }
    });
  });

  return Array.from(tools);
}

function generateSteps(parts: any[]): AssemblyStep[] {
  const steps: AssemblyStep[] = [];
  let stepNumber = 1;

  // Sort parts by connections (parts with no dependencies first)
  const sorted = [...parts].sort((a, b) => {
    const aConnections = a.connections?.length || 0;
    const bConnections = b.connections?.length || 0;
    return aConnections - bConnections;
  });

  // Generate steps for each part
  sorted.forEach((part, index) => {
    if (part.connections && part.connections.length > 0) {
      part.connections.forEach((conn: any) => {
        const template = CONNECTION_TEMPLATES[conn.type] || CONNECTION_TEMPLATES['snap-fit'];
        const step = template(part.name, getPartName(parts, conn.to));
        step.number = stepNumber++;
        steps.push(step);
      });
    } else if (index === 0) {
      // First part with no connections is the base
      steps.push({
        number: stepNumber++,
        title: `Prepare ${part.name} (Base)`,
        instructions: [
          `Remove ${part.name} from packaging`,
          `Inspect for any defects or damage`,
          `Place on clean, flat work surface`,
        ],
        tools: [],
        warnings: [],
        estimatedTime: 1,
      });
    }
  });

  return steps;
}

function getPartName(parts: any[], partId: string): string {
  const part = parts.find(p => p.id === partId);
  return part?.name || 'Unknown Part';
}

function generateChecklist(parts: any[]): string[] {
  return [
    'All parts accounted for (see parts list)',
    'No visible defects or damage',
    'All connections secure (no loose parts)',
    'Moving parts move smoothly without binding',
    'Product stands stable on flat surface',
    'Final appearance matches preview',
  ];
}

function generateTroubleshooting(parts: any[]): Array<{ problem: string; solution: string }> {
  return [
    {
      problem: "Parts don't fit together",
      solution: 'Check orientation - rotate part 180° and try again. Ensure no debris in connection points.',
    },
    {
      problem: 'Connection too loose',
      solution: 'Check for debris or damage. Try adding a small amount of adhesive.',
    },
    {
      problem: 'Connection too tight',
      solution: 'Do not force. Check alignment. Gently wiggle while pressing.',
    },
    {
      problem: 'Parts damaged during assembly',
      solution: 'Stop assembly. Contact support with photos for replacement parts.',
    },
    {
      problem: "Product doesn't match preview",
      solution: 'Check that correct parts were used. Contact support if issue persists.',
    },
  ];
}

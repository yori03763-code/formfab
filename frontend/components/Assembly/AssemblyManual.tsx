'use client';

import { useState } from 'react';

export interface Part {
  id: string;
  name: string;
  materialId: number;
  volumeCm3: number;
}

export interface AssemblyStep {
  number: number;
  title: string;
  instructions: string[];
  tools?: string[];
  warnings?: string[];
  estimatedTime: number;
}

export interface AssemblyManualProps {
  parts: Part[];
  onGenerateManual: () => AssemblyStep[];
}

export function AssemblyManual({ parts, onGenerateManual }: AssemblyManualProps) {
  const [steps, setSteps] = useState<AssemblyStep[]>([]);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    const generatedSteps = onGenerateManual();
    setSteps(generatedSteps);
    setGenerated(true);
  };

  if (!generated) {
    return (
      <div style={{ 
        background: 'rgba(30, 41, 59, 0.5)', 
        borderRadius: '16px', 
        padding: '2rem', 
        border: '1px solid rgba(99, 102, 241, 0.1)',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
        <h3 style={{ color: '#f1f5f9', marginBottom: '0.5rem' }}>Assembly Instructions</h3>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>
          Generate step-by-step assembly guide for your {parts.length} parts
        </p>
        <button
          onClick={handleGenerate}
          style={{
            padding: '1rem 2rem',
            background: 'linear-gradient(135deg, #6366f1, #818cf8)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          📝 Generate Assembly Manual
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '16px', padding: '2rem', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
      <h3 style={{ color: '#f1f5f9', marginBottom: '1.5rem' }}>📋 Assembly Instructions</h3>
      
      {/* Parts List */}
      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ color: '#818cf8', marginBottom: '1rem' }}>Parts List</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
          {parts.map(part => (
            <div key={part.id} style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '0.75rem', borderRadius: '8px' }}>
              <div style={{ fontWeight: 600, color: '#f1f5f9' }}>{part.name}</div>
              <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Volume: {part.volumeCm3}cm³</div>
            </div>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div>
        <h4 style={{ color: '#818cf8', marginBottom: '1rem' }}>Assembly Steps</h4>
        {steps.map(step => (
          <div key={step.number} style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, #6366f1, #818cf8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                color: 'white',
              }}>
                {step.number}
              </div>
              <h5 style={{ color: '#f1f5f9', flex: 1 }}>{step.title}</h5>
              <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>⏱️ {step.estimatedTime} min</span>
            </div>
            
            <ol style={{ paddingLeft: '3rem', color: '#94a3b8' }}>
              {step.instructions.map((instruction, i) => (
                <li key={i} style={{ marginBottom: '0.5rem' }}>{instruction}</li>
              ))}
            </ol>

            {step.tools && step.tools.length > 0 && (
              <div style={{ marginTop: '0.5rem', paddingLeft: '3rem', color: '#fbbf24', fontSize: '0.875rem' }}>
                🔧 Tools: {step.tools.join(', ')}
              </div>
            )}

            {step.warnings && step.warnings.length > 0 && (
              <div style={{ marginTop: '0.5rem', paddingLeft: '3rem', color: '#f87171', fontSize: '0.875rem' }}>
                ⚠️ {step.warnings.join(', ')}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quality Checklist */}
      <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
        <h4 style={{ color: '#10b981', marginBottom: '1rem' }}>✅ Quality Checklist</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8' }}>
            <input type="checkbox" /> All parts present
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8' }}>
            <input type="checkbox" /> No visible defects
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8' }}>
            <input type="checkbox" /> Joints move smoothly
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8' }}>
            <input type="checkbox" /> All connections secure
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8' }}>
            <input type="checkbox" /> Product stable
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8' }}>
            <input type="checkbox" /> Matches preview
          </label>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';

const BACKEND_URL = 'https://senate-museums-Highway-Dinner.trycloudflare.com';

interface Part {
  id: string;
  name: string;
  type: string;
  description: string;
  recommendedMaterial: number;
  recommendedMaterialName: string;
  rationale: string;
  alternativeMaterials: number[];
  estimatedVolumeCm3: number;
  priceRange: { min: number; max: number };
}

interface Analysis {
  totalParts: number;
  parts: Part[];
  overallComplexity: string;
  assemblyRequired: boolean;
  estimatedPrintTime: string;
  totalPriceRange: { min: number; max: number };
}

const MATERIAL_OPTIONS = [
  { id: 6, name: 'White Plastic', price: '$', description: 'Lightweight, affordable' },
  { id: 26, name: 'Black Plastic', price: '$', description: 'Sleek, modern' },
  { id: 25, name: 'Full Color', price: '$$', description: 'Detailed, colorful' },
  { id: 80, name: 'Metallic', price: '$$', description: 'Premium look' },
  { id: 77, name: 'Steel', price: '$$$', description: 'Very durable' },
  { id: 50, name: 'Rubber/TPE', price: '$$', description: 'Flexible, grippy' },
];

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string>('pending');
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Material Intelligence State
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [selectedMaterials, setSelectedMaterials] = useState<Record<string, number>>({});
  const [scale, setScale] = useState(1.0);
  const [step, setStep] = useState<'prompt' | 'analyzing' | 'generating' | 'customize' | 'complete'>('prompt');

  // WebSocket connection for real-time progress
  useEffect(() => {
    if (!taskId) return;
    
    const wsUrl = `wss://dis-harvey-exec-democracy.trycloudflare.com/ws/generate/${taskId}`;
    const ws = new WebSocket(wsUrl);
    
    ws.onopen = () => console.log('WebSocket connected');
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'progress' || data.status) {
        setProgress(data.progress || 0);
        setStatus(data.status || 'processing');
        
        if (data.modelUrl) setModelUrl(data.modelUrl);
        if (data.thumbnailUrl) setThumbnailUrl(data.thumbnailUrl);
        if (data.error) setError(data.error);
        
        if (data.status === 'completed') {
          setIsGenerating(false);
          setStep('customize');
        }
        if (data.status === 'failed') {
          setIsGenerating(false);
          setError('Generation failed');
        }
      }
    };
    
    ws.onerror = (e) => console.error('WebSocket error:', e);
    ws.onclose = () => console.log('WebSocket closed');
    
    return () => ws.close();
  }, [taskId]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setStep('analyzing');
    setIsGenerating(true);
    setError(null);
    
    try {
      // First, analyze the prompt for materials
      const analyzeRes = await fetch(`${BACKEND_URL}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      
      const analyzeData = await analyzeRes.json();
      
      if (analyzeData.success) {
        setAnalysis(analyzeData.analysis);
        // Set default materials from recommendations
        const defaults: Record<string, number> = {};
        analyzeData.analysis.parts.forEach((part: Part) => {
          defaults[part.id] = part.recommendedMaterial;
        });
        setSelectedMaterials(defaults);
      }
      
      // Then, start generation
      setStep('generating');
      const genRes = await fetch(`${BACKEND_URL}/api/generate/text`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      
      const genData = await genRes.json();
      
      if (genData.error) {
        setError(genData.error);
        setStep('prompt');
        setIsGenerating(false);
      } else {
        setTaskId(genData.taskId);
      }
    } catch {
      setError('Failed to connect to API');
      setStep('prompt');
      setIsGenerating(false);
    }
  };

  const handleMaterialChange = (partId: string, materialId: number) => {
    setSelectedMaterials(prev => ({
      ...prev,
      [partId]: materialId,
    }));
  };

  const calculateTotal = () => {
    if (!analysis) return { min: 0, max: 0 };
    
    const min = analysis.parts.reduce((sum, part) => {
      return sum + (part.priceRange.min * scale);
    }, 0);
    
    return { 
      min: Math.round(min + 500), // Add shipping
      max: Math.round(min * 1.5 + 500) 
    };
  };

  const resetAll = () => {
    setPrompt('');
    setTaskId(null);
    setProgress(0);
    setStatus('pending');
    setModelUrl(null);
    setThumbnailUrl(null);
    setError(null);
    setAnalysis(null);
    setSelectedMaterials({});
    setScale(1.0);
    setStep('prompt');
    setIsGenerating(false);
  };

  const total = calculateTotal();

  return (
    <>
      <nav><div className="logo">FormFab</div></nav>
      
      <main>
        <section className="hero">
          <div className="badge">✨ AI-Powered 3D Printing</div>
          <h1><span className="gradient">Describe it.</span><br/>Print it. Ship it.</h1>
          <p>Transform your ideas into multi-material 3D-printed products. Our AI figures out the best materials for each part.</p>
          
          {/* Step 1: Prompt Input */}
          {step === 'prompt' && (
            <div className="generator">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A robot figurine with movable metal joints and a detailed colorful face..."
                disabled={isGenerating}
              />
              <button onClick={handleGenerate} disabled={isGenerating || !prompt.trim()} className="btn-primary">
                ✨ Generate 3D Model
              </button>
            </div>
          )}
          
          {/* Step 2: Analyzing */}
          {step === 'analyzing' && (
            <div className="generator">
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧠</div>
                <h3>Analyzing your design...</h3>
                <p style={{ color: '#94a3b8' }}>Our AI is identifying parts and recommending materials</p>
              </div>
            </div>
          )}
          
          {/* Step 3: Generating */}
          {step === 'generating' && analysis && (
            <div className="generator">
              <h3 style={{ marginBottom: '1rem' }}>🎨 Generating 3D Model</h3>
              
              {/* Show analysis preview */}
              <div style={{ background: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px', padding: '1rem', marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.9rem', color: '#818cf8', marginBottom: '0.5rem' }}>
                  ✅ Identified {analysis.totalParts} part{analysis.totalParts > 1 ? 's' : ''}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {analysis.parts.map(part => (
                    <span key={part.id} style={{ background: 'rgba(99, 102, 241, 0.2)', padding: '0.25rem 0.75rem', borderRadius: '50px', fontSize: '0.85rem' }}>
                      {part.name}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Progress bar */}
              <div style={{ marginTop: '1rem' }}>
                <div style={{ width: '100%', height: '20px', background: 'rgba(99, 102, 241, 0.2)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #6366f1, #818cf8)', transition: 'width 0.3s' }}></div>
                </div>
                <p style={{ marginTop: '0.5rem', color: '#818cf8' }}>
                  {progress}% - {status === 'processing' ? 'Creating 3D model...' : status}
                </p>
              </div>
            </div>
          )}
          
          {/* Step 4: Customize Materials */}
          {step === 'customize' && analysis && modelUrl && (
            <div className="generator" style={{ maxWidth: '700px' }}>
              <h3 style={{ marginBottom: '1rem', color: '#4ade80' }}>✅ Model Ready! Customize Your Materials</h3>
              
              {thumbnailUrl && (
                <img src={thumbnailUrl} alt="Preview" style={{ width: '100%', maxWidth: '300px', borderRadius: '12px', marginBottom: '1.5rem', display: 'block', margin: '0 auto' }} />
              )}
              
              {/* Scale Editor */}
              <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <h4 style={{ marginBottom: '0.75rem' }}>📏 Size</h4>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.1"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  style={{ width: '100%' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#94a3b8', marginTop: '0.5rem' }}>
                  <span>Half size</span>
                  <span style={{ color: '#818cf8', fontWeight: 600 }}>{scale.toFixed(1)}x</span>
                  <span>Triple size</span>
                </div>
              </div>
              
              {/* Material Selection per Part */}
              <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <h4 style={{ marginBottom: '1rem' }}>🎨 Materials per Part</h4>
                
                {analysis.parts.map(part => (
                  <div key={part.id} style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(99, 102, 241, 0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 600 }}>{part.name}</span>
                      <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{part.estimatedVolumeCm3} cm³</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.75rem' }}>{part.rationale}</p>
                    
                    <select
                      value={selectedMaterials[part.id] || part.recommendedMaterial}
                      onChange={(e) => handleMaterialChange(part.id, parseInt(e.target.value))}
                      style={{ 
                        width: '100%', 
                        padding: '0.75rem', 
                        borderRadius: '8px', 
                        background: 'rgba(15, 23, 42, 0.8)', 
                        border: '1px solid rgba(99, 102, 241, 0.3)', 
                        color: '#f1f5f9',
                        cursor: 'pointer'
                      }}
                    >
                      <option value={part.recommendedMaterial}>⭐ {part.recommendedMaterialName} (Recommended)</option>
                      {MATERIAL_OPTIONS.filter(m => m.id !== part.recommendedMaterial).map(mat => (
                        <option key={mat.id} value={mat.id}>{mat.name} - {mat.description}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
              
              {/* Price Summary */}
              <div style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(244, 114, 182, 0.1))', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Subtotal</span>
                  <span>${((total.min - 500) / 100).toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Shipping</span>
                  <span>$5.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.25rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <span>Total</span>
                  <span className="gradient">${(total.min / 100).toFixed(2)}</span>
                </div>
              </div>
              
              {/* Actions */}
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href={modelUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ textDecoration: 'none' }}>
                  📥 Download Model
                </a>
                <button style={{ padding: '1rem 2rem', borderRadius: '12px', fontWeight: 600, border: '2px solid rgba(99, 102, 241, 0.5)', background: 'transparent', color: '#f1f5f9', cursor: 'pointer' }}>
                  💳 Order Now
                </button>
                <button onClick={resetAll} style={{ padding: '1rem 2rem', borderRadius: '12px', fontWeight: 600, border: '2px solid rgba(99, 102, 241, 0.5)', background: 'transparent', color: '#f1f5f9', cursor: 'pointer' }}>
                  🔄 New Design
                </button>
              </div>
            </div>
          )}
          
          {error && <p style={{ marginTop: '1rem', color: '#f87171', textAlign: 'center' }}>❌ {error}</p>}
        </section>
        
        <section className="section">
          <h2>How It <span className="gradient">Works</span></h2>
          <div className="steps">
            <div className="step"><div className="step-icon">✍️</div><h3>1. Describe</h3><p>Tell us what you want.</p></div>
            <div className="step"><div className="step-icon">🧠</div><h3>2. AI Analyzes</h3><p>We identify parts and materials.</p></div>
            <div className="step"><div className="step-icon">🎨</div><h3>3. Customize</h3><p>Choose materials per part.</p></div>
            <div className="step"><div className="step-icon">📦</div><h3>4. Receive</h3><p>We print and ship it.</p></div>
          </div>
        </section>
        
        <section className="section">
          <h2>Why <span className="gradient">FormFab</span>?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
            <div style={{ background: 'rgba(30, 41, 59, 0.3)', padding: '2rem', borderRadius: '16px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🧠</div>
              <h3 style={{ marginBottom: '0.5rem' }}>Material Intelligence</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>AI analyzes your model and recommends the best material for each part—durable metal for joints, colorful plastic for details.</p>
            </div>
            <div style={{ background: 'rgba(30, 41, 59, 0.3)', padding: '2rem', borderRadius: '16px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📏</div>
              <h3 style={{ marginBottom: '0.5rem' }}>Scale Confidence</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Adjust the size with a slider. Know exactly what you're getting before you order.</p>
            </div>
            <div style={{ background: 'rgba(30, 41, 59, 0.3)', padding: '2rem', borderRadius: '16px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔧</div>
              <h3 style={{ marginBottom: '0.5rem' }}>Multi-Part Assembly</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Complex products with multiple materials. We handle the assembly so you don't have to.</p>
            </div>
          </div>
        </section>
      </main>
      
      <footer>Built by <span>Lava ✨</span> for Yori & Jinx</footer>
    </>
  );
}
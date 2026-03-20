'use client';

import { useState, useEffect } from 'react';

const BACKEND_URL = 'https://hang-carrier-preliminary-cat.trycloudflare.com';

const MATERIALS = [
  { id: 6, name: 'White Plastic', pricePerCm3: 0.15, description: 'Lightweight, affordable' },
  { id: 26, name: 'Black Plastic', pricePerCm3: 0.18, description: 'Sleek, modern' },
  { id: 25, name: 'Full Color', pricePerCm3: 0.45, description: 'Detailed, colorful' },
  { id: 80, name: 'Metallic Plastic', pricePerCm3: 0.35, description: 'Premium look' },
  { id: 77, name: 'Steel', pricePerCm3: 1.20, description: 'Very durable' },
  { id: 50, name: 'Rubber/TPE', pricePerCm3: 0.50, description: 'Flexible, grippy' },
];

interface Part {
  id: string;
  name: string;
  materialId: number;
  volumeCm3: number;
}

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string>('pending');
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [parts, setParts] = useState<Part[]>([]);
  const [newPartName, setNewPartName] = useState('');
  const [scale, setScale] = useState(1.0);
  const [step, setStep] = useState<'prompt' | 'generating' | 'customize'>('prompt');

  useEffect(() => {
    if (!taskId) return;
    const ws = new WebSocket(`wss://medicare-greeting-michigan-constraints.trycloudflare.com/ws/generate/${taskId}`);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'progress' || data.status) {
        setProgress(data.progress || 0);
        setStatus(data.status || 'processing');
        if (data.modelUrl) setModelUrl(data.modelUrl);
        if (data.thumbnailUrl) setThumbnailUrl(data.thumbnailUrl);
        if (data.status === 'completed') {
          setIsGenerating(false);
          setStep('customize');
          setParts([{ id: 'part-1', name: 'Whole Model', materialId: 6, volumeCm3: 30 }]);
        }
        if (data.status === 'failed') {
          setIsGenerating(false);
          setError('Generation failed');
        }
      }
    };
    return () => ws.close();
  }, [taskId]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setError(null);
    setStep('generating');
    
    try {
      const res = await fetch(`${BACKEND_URL}/api/generate/text`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setStep('prompt');
        setIsGenerating(false);
      } else {
        setTaskId(data.taskId);
      }
    } catch {
      setError('Failed to connect to API');
      setStep('prompt');
      setIsGenerating(false);
    }
  };

  const addPart = () => {
    if (!newPartName.trim()) return;
    setParts([...parts, { id: `part-${Date.now()}`, name: newPartName, materialId: 6, volumeCm3: 10 }]);
    setNewPartName('');
  };

  const removePart = (id: string) => setParts(parts.filter(p => p.id !== id));

  const updatePart = (id: string, field: string, value: any) => {
    setParts(parts.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const getPrice = (materialId: number, volume: number) => {
    const m = MATERIALS.find(x => x.id === materialId);
    return m ? Math.round(m.pricePerCm3 * volume * scale * 100) : 0;
  };

  const getTotal = () => {
    const subtotal = parts.reduce((sum, p) => sum + getPrice(p.materialId, p.volumeCm3), 0);
    return { subtotal, shipping: 500, total: subtotal + 500 };
  };

  const resetAll = () => {
    setPrompt(''); setTaskId(null); setProgress(0); setModelUrl(null);
    setThumbnailUrl(null); setError(null); setParts([]); setScale(1.0);
    setStep('prompt'); setIsGenerating(false);
  };

  const pricing = getTotal();

  return (
    <>
      <nav><div className="logo">FormFab</div></nav>
      <main>
        <section className="hero">
          <div className="badge">✨ Multi-Material 3D Printing</div>
          <h1><span className="gradient">Describe it.</span><br/>Customize it. Print it.</h1>
          <p>You control every part and material.</p>
          
          {step === 'prompt' && (
            <div className="generator">
              <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="A robot figurine with metal joints..." disabled={isGenerating} />
              <button onClick={handleGenerate} disabled={isGenerating || !prompt.trim()} className="btn-primary">✨ Generate 3D Model</button>
            </div>
          )}
          
          {step === 'generating' && (
            <div className="generator">
              <h3 style={{ marginBottom: '1rem' }}>🎨 Generating...</h3>
              <div style={{ width: '100%', height: '20px', background: 'rgba(99, 102, 241, 0.2)', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #6366f1, #818cf8)' }}></div>
              </div>
              <p style={{ marginTop: '0.5rem', color: '#818cf8' }}>{progress}%</p>
            </div>
          )}
          
          {step === 'customize' && modelUrl && (
            <div className="generator" style={{ maxWidth: '700px' }}>
              <h3 style={{ marginBottom: '1rem', color: '#4ade80' }}>✅ Model Ready!</h3>
              {thumbnailUrl && <img src={thumbnailUrl} alt="Preview" style={{ width: '100%', maxWidth: '300px', borderRadius: '12px', marginBottom: '1rem', display: 'block', margin: '0 auto' }} />}
              
              {/* Scale */}
              <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '12px', padding: '1rem', marginBottom: '1rem' }}>
                <h4>📏 Size: {(scale * 100).toFixed(0)}%</h4>
                <input type="range" min="0.5" max="3" step="0.1" value={scale} onChange={(e) => setScale(parseFloat(e.target.value))} style={{ width: '100%' }} />
              </div>
              
              {/* Parts */}
              <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '12px', padding: '1rem', marginBottom: '1rem' }}>
                <h4 style={{ marginBottom: '1rem' }}>🔧 Parts & Materials</h4>
                
                {parts.map(part => (
                  <div key={part.id} style={{ background: 'rgba(15, 23, 42, 0.5)', borderRadius: '8px', padding: '1rem', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <input value={part.name} onChange={(e) => updatePart(part.id, 'name', e.target.value)} style={{ flex: 1, padding: '0.5rem', borderRadius: '6px', background: 'transparent', border: '1px solid rgba(99, 102, 241, 0.3)', color: '#f1f5f9' }} />
                      {parts.length > 1 && <button onClick={() => removePart(part.id)} style={{ background: 'rgba(239, 68, 68, 0.2)', border: 'none', color: '#ef4444', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer' }}>✕</button>}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '0.5rem', alignItems: 'center' }}>
                      <select value={part.materialId} onChange={(e) => updatePart(part.id, 'materialId', parseInt(e.target.value))} style={{ padding: '0.5rem', borderRadius: '6px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(99, 102, 241, 0.3)', color: '#f1f5f9' }}>
                        {MATERIALS.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                      </select>
                      <input type="number" value={part.volumeCm3} onChange={(e) => updatePart(part.id, 'volumeCm3', parseInt(e.target.value) || 1)} min="1" style={{ padding: '0.5rem', borderRadius: '6px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(99, 102, 241, 0.3)', color: '#f1f5f9', width: '100%' }} />
                      <span style={{ color: '#4ade80', fontWeight: 600 }}>${(getPrice(part.materialId, part.volumeCm3) / 100).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
                
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input value={newPartName} onChange={(e) => setNewPartName(e.target.value)} placeholder="Add part (e.g., Base, Joints)" style={{ flex: 1, padding: '0.5rem', borderRadius: '6px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(99, 102, 241, 0.3)', color: '#f1f5f9' }} />
                  <button onClick={addPart} style={{ padding: '0.5rem 1rem', borderRadius: '6px', background: 'rgba(99, 102, 241, 0.2)', border: '1px solid rgba(99, 102, 241, 0.5)', color: '#818cf8', cursor: 'pointer' }}>+ Add</button>
                </div>
              </div>
              
              {/* Price */}
              <div style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(244, 114, 182, 0.1))', borderRadius: '12px', padding: '1rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}><span>Subtotal</span><span>${(pricing.subtotal / 100).toFixed(2)}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}><span>Shipping</span><span>$5.00</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.5rem' }}><span>Total</span><span className="gradient">${(pricing.total / 100).toFixed(2)}</span></div>
              </div>
              
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href={modelUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ textDecoration: 'none' }}>📥 Download</a>
                <button style={{ padding: '1rem 2rem', borderRadius: '12px', fontWeight: 600, border: '2px solid rgba(99, 102, 241, 0.5)', background: 'transparent', color: '#f1f5f9', cursor: 'pointer' }}>💳 Order</button>
                <button onClick={resetAll} style={{ padding: '1rem 2rem', borderRadius: '12px', fontWeight: 600, border: '2px solid rgba(99, 102, 241, 0.3)', background: 'transparent', color: '#94a3b8', cursor: 'pointer' }}>🔄 New</button>
              </div>
            </div>
          )}
          
          {error && <p style={{ marginTop: '1rem', color: '#f87171', textAlign: 'center' }}>❌ {error}</p>}
        </section>
        
        <section className="section">
          <h2>How It <span className="gradient">Works</span></h2>
          <div className="steps">
            <div className="step"><div className="step-icon">✍️</div><h3>1. Describe</h3><p>Tell us what you want</p></div>
            <div className="step"><div className="step-icon">🔧</div><h3>2. Customize</h3><p>Define parts & materials</p></div>
            <div className="step"><div className="step-icon">💰</div><h3>3. Price</h3><p>See exact cost</p></div>
            <div className="step"><div className="step-icon">📦</div><h3>4. Receive</h3><p>We print & ship</p></div>
          </div>
        </section>
        
        <section className="section">
          <h2>Available <span className="gradient">Materials</span></h2>
          <div className="materials">
            {MATERIALS.map(m => (
              <div key={m.id} className="material">
                <div className="material-name">{m.name}</div>
                <div className="material-price">${m.pricePerCm3}/cm³</div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer>Built by <span>Lava ✨</span> for Yori & Jinx</footer>
    </>
  );
}
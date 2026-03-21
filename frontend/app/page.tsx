'use client';

import { useState } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import Toast from '@/components/Toast';
import { ModelViewer } from '@/components/ModelViewer/ModelViewer';

const BACKEND_URL = 'https://donations-tubes-converter-agents.trycloudflare.com';

const MATERIALS = [
  { id: 6, name: 'White Plastic', pricePerCm3: 0.15, description: 'Lightweight, affordable', color: '#F5F5F5', roughness: 0.6, metalness: 0.0 },
  { id: 26, name: 'Black Plastic', pricePerCm3: 0.18, description: 'Sleek, modern', color: '#1a1a1a', roughness: 0.5, metalness: 0.0 },
  { id: 25, name: 'Full Color', pricePerCm3: 0.45, description: 'Detailed, colorful', color: '#f472b6', roughness: 0.4, metalness: 0.0 },
  { id: 80, name: 'Metallic Plastic', pricePerCm3: 0.35, description: 'Premium look', color: '#d4af37', roughness: 0.3, metalness: 0.6 },
  { id: 77, name: 'Steel', pricePerCm3: 1.20, description: 'Very durable', color: '#71797E', roughness: 0.2, metalness: 0.9 },
  { id: 50, name: 'Rubber/TPE', pricePerCm3: 0.50, description: 'Flexible, grippy', color: '#4a90d9', roughness: 0.8, metalness: 0.0 },
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
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setError(null);
    setStep('generating');
    setProgress(0);
    
    try {
      const res = await fetch(`${BACKEND_URL}/api/generate/text`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setToast({ message: data.error, type: 'error' });
        setStep('prompt');
        setIsGenerating(false);
      } else {
        setTaskId(data.taskId);
        setToast({ message: 'Generation started!', type: 'success' });
        // For demo, use sample model
        setTimeout(() => {
          setModelUrl('https://threejs.org/examples/models/gltf/Duck/glTF/Duck.gltf');
          setProgress(100);
          setStatus('completed');
          setStep('customize');
          setParts([
            { id: 'part-1', name: 'Body', materialId: 6, volumeCm3: 30 },
            { id: 'part-2', name: 'Head', materialId: 25, volumeCm3: 10 },
          ]);
          setIsGenerating(false);
        }, 3000);
      }
    } catch {
      setError('Failed to connect to API');
      setToast({ message: 'Network error. Please try again.', type: 'error' });
      setStep('prompt');
      setIsGenerating(false);
    }
  };

  const addPart = () => {
    if (!newPartName.trim()) return;
    setParts([...parts, { id: `part-${Date.now()}`, name: newPartName, materialId: 6, volumeCm3: 10 }]);
    setNewPartName('');
    setToast({ message: 'Part added!', type: 'success' });
  };

  const removePart = (id: string) => {
    setParts(parts.filter(p => p.id !== id));
    setSelectedPart(null);
    setToast({ message: 'Part removed', type: 'info' });
  };

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
    setStep('prompt'); setIsGenerating(false); setSelectedPart(null);
    setToast({ message: 'Reset complete', type: 'info' });
  };

  const pricing = getTotal();

  return (
    <>
      <nav style={{ 
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(2, 6, 23, 0.9)', 
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(99, 102, 241, 0.1)',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ fontSize: '1.5rem', fontWeight: 800, background: 'linear-gradient(135deg, #818cf8, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          FormFab
        </span>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <a href="/login" style={{ color: '#94a3b8', textDecoration: 'none' }}>Login</a>
          <a href="/signup" style={{ color: '#94a3b8', textDecoration: 'none' }}>Signup</a>
        </div>
      </nav>

      <main>
        <section className="hero" style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="badge" style={{ 
              display: 'inline-block', padding: '0.5rem 1rem', 
              background: 'rgba(99, 102, 241, 0.2)', border: '1px solid rgba(99, 102, 241, 0.3)', 
              borderRadius: '50px', fontSize: '0.875rem', color: '#818cf8', marginBottom: '1.5rem' 
            }}>
              ✨ AI-Powered Multi-Material 3D Printing
            </div>
            
            <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '1.5rem' }}>
              <span className="gradient" style={{ background: 'linear-gradient(135deg, #818cf8, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Describe it.</span>
              <br />
              <span style={{ color: '#f1f5f9' }}>Visualize it. Print it.</span>
            </h1>
            
            <p style={{ fontSize: '1.25rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
              Transform ideas into multi-material products with AI assistance and 3D preview.
            </p>
          </div>
          
          {step === 'prompt' && (
            <div className="generator" style={{ 
              background: 'rgba(30, 41, 59, 0.5)', borderRadius: '20px', padding: '2rem', 
              border: '1px solid rgba(99, 102, 241, 0.1)', maxWidth: '600px', margin: '0 auto' 
            }}>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A robot figurine with metal joints and colorful face..."
                disabled={isGenerating}
                style={{ 
                  width: '100%', height: '120px', 
                  background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(99, 102, 241, 0.3)', 
                  borderRadius: '12px', padding: '1rem', color: '#f1f5f9', fontSize: '1rem', resize: 'none', marginBottom: '1rem' 
                }}
              />
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="btn-primary"
                style={{ 
                  padding: '1rem 2rem', 
                  background: isGenerating ? 'rgba(99, 102, 241, 0.3)' : 'linear-gradient(135deg, #6366f1, #818cf8)', 
                  color: 'white', border: 'none', borderRadius: '12px', 
                  fontSize: '1rem', fontWeight: 600, cursor: isGenerating ? 'not-allowed' : 'pointer',
                  opacity: isGenerating ? 0.6 : 1,
                }}
              >
                {isGenerating ? '⏳ Generating...' : '✨ Generate 3D Model'}
              </button>
            </div>
          )}
          
          {step === 'generating' && (
            <div className="generator" style={{ 
              background: 'rgba(30, 41, 59, 0.5)', borderRadius: '20px', padding: '2rem', 
              border: '1px solid rgba(99, 102, 241, 0.1)', maxWidth: '800px', margin: '0 auto' 
            }}>
              <h3 style={{ marginBottom: '1rem', color: '#f1f5f9', textAlign: 'center' }}>🎨 Generating your 3D model...</h3>
              <LoadingSpinner size="lg" text={`${progress}% complete`} />
            </div>
          )}
          
          {step === 'customize' && modelUrl && (
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '2rem', alignItems: 'start' }}>
                {/* 3D Viewer */}
                <div>
                  <h3 style={{ marginBottom: '1rem', color: '#4ade80' }}>✅ Model Ready - Preview in 3D</h3>
                  <ModelViewer
                    modelUrl={modelUrl}
                    onModelLoad={(model) => {
                      console.log('Model loaded:', model);
                      setToast({ message: '3D model loaded!', type: 'success' });
                    }}
                    onError={(error) => {
                      console.error('Model error:', error);
                      setToast({ message: 'Failed to load 3D model', type: 'error' });
                    }}
                    autoRotate
                    showStats={process.env.NODE_ENV === 'development'}
                  />
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button style={{ padding: '0.5rem 1rem', background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '8px', cursor: 'pointer' }}>
                      🔄 Reset View
                    </button>
                    <button style={{ padding: '0.5rem 1rem', background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '8px', cursor: 'pointer' }}>
                      🔍 Full Screen
                    </button>
                  </div>
                </div>

                {/* Part Editor */}
                <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '16px', padding: '1.5rem', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
                  <h4 style={{ marginBottom: '1rem', color: '#f1f5f9' }}>🔧 Parts & Materials</h4>
                  
                  {parts.map(part => (
                    <div 
                      key={part.id} 
                      onClick={() => setSelectedPart(part.id)}
                      style={{ 
                        background: selectedPart === part.id ? 'rgba(99, 102, 241, 0.2)' : 'rgba(15, 23, 42, 0.5)', 
                        borderRadius: '8px', padding: '1rem', marginBottom: '1rem',
                        border: selectedPart === part.id ? '1px solid #818cf8' : '1px solid rgba(99, 102, 241, 0.1)',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <input 
                          value={part.name} 
                          onChange={(e) => updatePart(part.id, 'name', e.target.value)} 
                          onClick={(e) => e.stopPropagation()}
                          style={{ flex: 1, padding: '0.5rem', background: 'transparent', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '6px', color: '#f1f5f9' }} 
                        />
                        <button 
                          onClick={(e) => { e.stopPropagation(); removePart(part.id); }} 
                          style={{ background: 'rgba(239, 68, 68, 0.2)', border: 'none', color: '#ef4444', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', marginLeft: '0.5rem' }}
                        >✕</button>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <select 
                          value={part.materialId} 
                          onChange={(e) => updatePart(part.id, 'materialId', parseInt(e.target.value))}
                          onClick={(e) => e.stopPropagation()}
                          style={{ padding: '0.5rem', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '6px', color: '#f1f5f9' }}
                        >
                          {MATERIALS.map(m => (
                            <option key={m.id} value={m.id}>{m.name}</option>
                          ))}
                        </select>
                        <input 
                          type="number" 
                          value={part.volumeCm3} 
                          onChange={(e) => updatePart(part.id, 'volumeCm3', Math.max(1, parseInt(e.target.value) || 1))}
                          onClick={(e) => e.stopPropagation()}
                          min="1"
                          style={{ padding: '0.5rem', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '6px', color: '#f1f5f9', width: '100%' }} 
                        />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: MATERIALS.find(m => m.id === part.materialId)?.color, fontSize: '0.875rem' }}>
                          {MATERIALS.find(m => m.id === part.materialId)?.description}
                        </span>
                        <span style={{ color: '#4ade80', fontWeight: 600 }}>${(getPrice(part.materialId, part.volumeCm3) / 100).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                  
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input 
                      value={newPartName} 
                      onChange={(e) => setNewPartName(e.target.value)} 
                      placeholder="Add part name..." 
                      style={{ flex: 1, padding: '0.5rem', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '6px', color: '#f1f5f9' }} 
                    />
                    <button 
                      onClick={addPart} 
                      style={{ padding: '0.5rem 1rem', background: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '6px', cursor: 'pointer' }}
                    >+ Add</button>
                  </div>
                </div>
              </div>

              {/* Price Summary */}
              <div style={{ maxWidth: '400px', margin: '2rem auto', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(244, 114, 182, 0.1))', borderRadius: '16px', padding: '1.5rem', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                <h4 style={{ marginBottom: '1rem', color: '#f1f5f9' }}>💰 Price Summary</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#94a3b8' }}><span>Subtotal ({parts.length} parts)</span><span>${(pricing.subtotal / 100).toFixed(2)}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#94a3b8' }}><span>Shipping</span><span>$5.00</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.25rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', color: '#f1f5f9' }}><span>Total</span><span style={{ background: 'linear-gradient(135deg, #818cf8, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>${(pricing.total / 100).toFixed(2)}</span></div>
                <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                  <button style={{ flex: 1, padding: '1rem', background: 'linear-gradient(135deg, #6366f1, #818cf8)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 600, cursor: 'pointer' }}>💳 Order Now</button>
                  <button onClick={resetAll} style={{ flex: 1, padding: '1rem', background: 'rgba(30, 41, 59, 0.5)', color: '#94a3b8', border: '2px solid rgba(99, 102, 241, 0.3)', borderRadius: '12px', fontWeight: 600, cursor: 'pointer' }}>🔄 New Design</button>
                </div>
              </div>
            </div>
          )}
          
          {error && <p style={{ marginTop: '1rem', color: '#f87171', textAlign: 'center', maxWidth: '600px', margin: '1rem auto' }}>❌ {error}</p>}
        </section>

        {/* Features Section */}
        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, textAlign: 'center', marginBottom: '3rem', color: '#f1f5f9' }}>Why FormFab?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '16px', padding: '2rem', border: '1px solid rgba(99, 102, 241, 0.1)', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤖</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: '#f1f5f9' }}>AI-Powered</h3>
              <p style={{ color: '#94a3b8' }}>Smart material recommendations for each part</p>
            </div>
            <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '16px', padding: '2rem', border: '1px solid rgba(99, 102, 241, 0.1)', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👁️</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: '#f1f5f9' }}>3D Preview</h3>
              <p style={{ color: '#94a3b8' }}>See your model in 3D before ordering</p>
            </div>
            <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '16px', padding: '2rem', border: '1px solid rgba(99, 102, 241, 0.1)', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎨</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: '#f1f5f9' }}>Multi-Material</h3>
              <p style={{ color: '#94a3b8' }}>Different materials for different parts</p>
            </div>
            <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '16px', padding: '2rem', border: '1px solid rgba(99, 102, 241, 0.1)', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: '#f1f5f9' }}>Ready to Ship</h3>
              <p style={{ color: '#94a3b8' }}>Professional manufacturing & delivery</p>
            </div>
          </div>
        </section>
      </main>

      {/* Toast Notifications */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </>
  );
}

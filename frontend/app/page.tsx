'use client';

import { useState, useEffect } from 'react';

const BACKEND_URL = 'https://moss-occasion-bench-qualify.trycloudflare.com';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string>('pending');
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Connect to WebSocket when taskId changes
  useEffect(() => {
    if (!taskId) return;
    
    const wsUrl = `wss://moss-occasion-bench-qualify.trycloudflare.com/ws/generate/${taskId}`;
    console.log('Connecting to WebSocket:', wsUrl);
    const ws = new WebSocket(wsUrl);
    
    ws.onopen = () => console.log('WebSocket connected');
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('WebSocket message:', data);
      
      if (data.type === 'progress' || data.status) {
        setProgress(data.progress || 0);
        setStatus(data.status || 'processing');
        if (data.modelUrl) setModelUrl(data.modelUrl);
        if (data.thumbnailUrl) setThumbnailUrl(data.thumbnailUrl);
        if (data.error) setError(data.error);
        if (data.status === 'completed' || data.status === 'failed') setIsGenerating(false);
      }
    };
    
    ws.onerror = (e) => console.error('WebSocket error:', e);
    ws.onclose = () => console.log('WebSocket closed');
    
    return () => ws.close();
  }, [taskId]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setProgress(0);
    setStatus('pending');
    setModelUrl(null);
    setThumbnailUrl(null);
    setError(null);
    setTaskId(null);
    
    try {
      const res = await fetch(`${BACKEND_URL}/api/generate/text`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      
      const data = await res.json();
      
      if (data.error) {
        setError(data.error);
        setIsGenerating(false);
      } else {
        setTaskId(data.taskId);
      }
    } catch {
      setError('Failed to connect to API');
      setIsGenerating(false);
    }
  };

  const resetGenerator = () => {
    setPrompt('');
    setTaskId(null);
    setProgress(0);
    setStatus('pending');
    setModelUrl(null);
    setThumbnailUrl(null);
    setError(null);
    setIsGenerating(false);
  };

  return (
    <>
      <nav><div className="logo">FormFab</div></nav>
      
      <main>
        <section className="hero">
          <div className="badge">✨ AI-Powered 3D Printing</div>
          <h1><span className="gradient">Describe it.</span><br/>Print it. Ship it.</h1>
          <p>Transform your ideas into 3D-printed products. Just describe what you want, and we&apos;ll handle the rest.</p>
          
          <div className="generator">
            {!modelUrl ? (
              <>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="A small figurine of a cat sitting on a book..."
                  disabled={isGenerating}
                />
                <button onClick={handleGenerate} disabled={isGenerating || !prompt.trim()} className="btn-primary">
                  {isGenerating ? '⏳ Generating...' : '✨ Generate 3D Model'}
                </button>
                
                {isGenerating && (
                  <div style={{ marginTop: '1.5rem' }}>
                    <div style={{ width: '100%', height: '20px', background: 'rgba(99, 102, 241, 0.2)', borderRadius: '10px', overflow: 'hidden' }}>
                      <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #6366f1, #818cf8)', transition: 'width 0.3s' }}></div>
                    </div>
                    <p style={{ marginTop: '0.5rem', color: '#818cf8' }}>
                      {progress}% - {status === 'processing' ? 'Creating 3D model...' : status}
                    </p>
                  </div>
                )}
                
                {error && <p className="error" style={{ marginTop: '1rem' }}>❌ {error}</p>}
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ marginBottom: '1rem', color: '#4ade80' }}>✅ 3D Model Ready!</h3>
                {thumbnailUrl && <img src={thumbnailUrl} alt="Preview" style={{ width: '100%', maxWidth: '400px', borderRadius: '12px', marginBottom: '1rem' }} />}
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a href={modelUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ textDecoration: 'none' }}>📥 Download Model (GLB)</a>
                  <button onClick={resetGenerator} style={{ padding: '1rem 2rem', borderRadius: '12px', fontWeight: 600, border: '2px solid rgba(99, 102, 241, 0.5)', background: 'transparent', color: '#f1f5f9', cursor: 'pointer' }}>🔄 Generate Another</button>
                </div>
              </div>
            )}
          </div>
        </section>
        
        <section className="section">
          <h2>How It <span className="gradient">Works</span></h2>
          <div className="steps">
            <div className="step"><div className="step-icon">✍️</div><h3>1. Describe</h3><p>Tell us what you want.</p></div>
            <div className="step"><div className="step-icon">🎨</div><h3>2. Preview</h3><p>AI generates a 3D model.</p></div>
            <div className="step"><div className="step-icon">📦</div><h3>3. Receive</h3><p>We print and ship it.</p></div>
          </div>
        </section>
        
        <section className="section">
          <h2>Choose Your <span className="gradient">Material</span></h2>
          <div className="materials">
            <div className="material"><div className="material-swatch" style={{ background: '#f5f5f5' }}></div><div className="material-name">White Plastic</div><div className="material-price">From $19</div></div>
            <div className="material"><div className="material-swatch" style={{ background: '#1a1a1a' }}></div><div className="material-name">Black Plastic</div><div className="material-price">From $22</div></div>
            <div className="material"><div className="material-swatch" style={{ background: 'linear-gradient(135deg, #d4af37, #c0c0c0)' }}></div><div className="material-name">Metallic</div><div className="material-price">From $35</div></div>
            <div className="material"><div className="material-swatch" style={{ background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1)' }}></div><div className="material-name">Full Color</div><div className="material-price">From $45</div></div>
          </div>
        </section>
      </main>
      
      <footer>Built by <span>Lava ✨</span> for Yori & Jinx</footer>
    </>
  );
}
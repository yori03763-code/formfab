'use client';

import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [modelUrl, setModelUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/generate/text`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      
      const data = await res.json();
      console.log('Generation started:', data);
      // TODO: Poll for completion and show 3D viewer
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 px-6 py-4 flex justify-between items-center backdrop-blur-lg bg-slate-900/80 border-b border-slate-800 z-50">
        <div className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
          FormFab
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 text-slate-400 hover:text-white transition">Gallery</button>
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition">
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Describe it.
            </span>
            <br />
            <span className="text-white">Print it. Ship it.</span>
          </h1>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
            Transform your ideas into 3D-printed products. Just describe what you want, 
            and we'll handle the rest — from AI generation to your doorstep.
          </p>

          {/* Generator Input */}
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
            <div className="mb-6">
              <label className="block text-left text-sm text-slate-400 mb-2">
                What do you want to create?
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A small figurine of a cat sitting on a book..."
                className="w-full h-32 bg-slate-900/50 border border-slate-600 rounded-xl p-4 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none resize-none"
              />
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Generating...
                  </span>
                ) : (
                  '✨ Generate 3D Model'
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-indigo-600/20 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                ✍️
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Describe</h3>
              <p className="text-slate-400">Tell us what you want in plain English. Be as creative as you like.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                🎨
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Preview</h3>
              <p className="text-slate-400">Our AI generates a 3D model. Preview it, rotate it, make adjustments.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-pink-600/20 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                📦
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Receive</h3>
              <p className="text-slate-400">Choose your material, checkout, and we'll 3D print and ship to you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Materials Preview */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Material</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {['White Plastic', 'Black Plastic', 'Metal', 'Ceramic', 'Full Color'].map((material) => (
              <div key={material} className="bg-slate-800/50 rounded-xl p-4 text-center border border-slate-700 hover:border-indigo-500 cursor-pointer transition">
                <div className="w-full aspect-square bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg mb-3" />
                <p className="font-medium">{material}</p>
                <p className="text-sm text-slate-400">From $19</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-800 text-center text-slate-500">
        <p>Built with 💜 by <span className="text-pink-400">Lava ✨</span> for Yori & Jinx</p>
      </footer>
    </main>
  );
}
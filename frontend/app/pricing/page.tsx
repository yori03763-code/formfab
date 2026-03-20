'use client';

import Link from 'next/link';

const materials = [
  { id: 1, name: 'White Plastic', price: '$0.15', unit: '/cm³', description: 'Lightweight, affordable, versatile', bestFor: 'General prototypes, structural parts', preview: '⬜', color: '#f5f5f5' },
  { id: 2, name: 'Black Plastic', price: '$0.18', unit: '/cm³', description: 'Sleek, modern appearance', bestFor: 'Consumer products, displays', preview: '⬛', color: '#1a1a1a' },
  { id: 3, name: 'Full Color', price: '$0.45', unit: '/cm³', description: 'Detailed colors and textures', bestFor: 'Figurines, decorative items', preview: '🌈', color: 'linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1)' },
  { id: 4, name: 'Metallic Plastic', price: '$0.35', unit: '/cm³', description: 'Premium metal-like finish', bestFor: 'Luxury items, awards', preview: '✨', color: 'linear-gradient(135deg, #d4af37, #c0c0c0)' },
  { id: 5, name: 'Steel', price: '$1.20', unit: '/cm³', description: 'Very durable, industrial strength', bestFor: 'Functional parts, joints', preview: '⚙️', color: '#71797E' },
  { id: 6, name: 'Rubber/TPE', price: '$0.50', unit: '/cm³', description: 'Flexible, grippy texture', bestFor: 'Handles, grips, seals', preview: '🔵', color: '#4a90d9' },
];

const calculators = [
  { volume: 10, label: 'Small (keychain)' },
  { volume: 30, label: 'Medium (figurine)' },
  { volume: 100, label: 'Large (helmet)' },
  { volume: 500, label: 'X-Large (prop)' },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen" style={{ background: '#0f172a' }}>
      {/* Navigation */}
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
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontSize: '1.5rem', fontWeight: 800, background: 'linear-gradient(135deg, #818cf8, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            FormFab
          </span>
        </Link>
        
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link href="/dashboard" style={{ color: '#94a3b8', textDecoration: 'none' }}>Dashboard</Link>
          <Link href="/orders" style={{ color: '#94a3b8', textDecoration: 'none' }}>Orders</Link>
          <Link href="/models" style={{ color: '#94a3b8', textDecoration: 'none' }}>Models</Link>
          <Link href="/login" style={{ padding: '0.5rem 1.5rem', background: 'linear-gradient(135deg, #6366f1, #818cf8)', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>Sign In</Link>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '1rem' }}>Transparent Pricing</h1>
          <p style={{ fontSize: '1.25rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>Choose from 6+ premium materials. Pay only for what you print.</p>
        </div>

        {/* Materials Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {materials.map((material) => (
            <div key={material.id} style={{ 
              background: 'rgba(30, 41, 59, 0.5)', 
              borderRadius: '16px', 
              padding: '2rem', 
              border: '1px solid rgba(99, 102, 241, 0.1)',
              transition: 'all 0.3s',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ fontSize: '3rem' }}>{material.preview}</div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: '#818cf8' }}>{material.price}</div>
                  <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>{material.unit}</div>
                </div>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#f1f5f9', marginBottom: '0.5rem' }}>{material.name}</h3>
              <p style={{ color: '#94a3b8', marginBottom: '1rem', fontSize: '0.875rem' }}>{material.description}</p>

              <div style={{ background: 'rgba(15, 23, 42, 0.5)', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>Best For</div>
                <div style={{ color: '#f1f5f9', fontSize: '0.875rem' }}>{material.bestFor}</div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: material.color, border: '1px solid rgba(255,255,255,0.1)' }}></div>
                <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Material preview</span>
              </div>
            </div>
          ))}
        </div>

        {/* Price Calculator */}
        <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '16px', padding: '2rem', border: '1px solid rgba(99, 102, 241, 0.1)', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '1.5rem', textAlign: 'center' }}>Quick Price Calculator</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            {calculators.map((calc, index) => (
              <button key={index} style={{ 
                padding: '1rem', 
                background: 'rgba(99, 102, 241, 0.1)', 
                border: '1px solid rgba(99, 102, 241, 0.2)', 
                borderRadius: '8px', 
                color: '#94a3b8',
                cursor: 'pointer',
                textAlign: 'center',
              }}>
                <div style={{ fontWeight: 600, color: '#f1f5f9', marginBottom: '0.25rem' }}>{calc.volume}cm³</div>
                <div style={{ fontSize: '0.875rem' }}>{calc.label}</div>
              </button>
            ))}
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.5)', borderRadius: '12px', padding: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
              {materials.slice(0, 4).map((material) => (
                <div key={material.id} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>{material.name}</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#818cf8' }}>
                    ${(parseFloat(material.price.replace('$', '')) * 30).toFixed(2)}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>for 30cm³</div>
                </div>
              ))}
            </div>
          </div>

          <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.875rem', marginTop: '1rem' }}>
            * Prices shown are estimates. Final price includes shipping ($5.00) and tax.
          </p>
        </div>

        {/* Shipping Info */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '16px', padding: '2rem', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📦</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#f1f5f9', marginBottom: '0.5rem' }}>Flat Rate Shipping</h3>
            <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>Simple, predictable shipping costs</p>
            <ul style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: '2' }}>
              <li>Standard Shipping: $5.00</li>
              <li>Express Shipping: $15.00</li>
              <li>International: Calculated at checkout</li>
            </ul>
          </div>

          <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '16px', padding: '2rem', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏱️</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#f1f5f9', marginBottom: '0.5rem' }}>Production Time</h3>
            <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>Quality takes time</p>
            <ul style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: '2' }}>
              <li>Standard: 3-5 business days</li>
              <li>Rush: 1-2 business days (+50%)</li>
              <li>Complex parts may take longer</li>
            </ul>
          </div>

          <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '16px', padding: '2rem', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✓</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#f1f5f9', marginBottom: '0.5rem' }}>Quality Guarantee</h3>
            <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>We stand behind our prints</p>
            <ul style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: '2' }}>
              <li>Free reprint if defective</li>
              <li>30-day return policy</li>
              <li>Quality inspection on every order</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '3rem', padding: '3rem', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(244, 114, 182, 0.1))', borderRadius: '24px', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '1rem' }}>Ready to Create?</h2>
          <p style={{ color: '#94a3b8', fontSize: '1.125rem', marginBottom: '2rem' }}>Start with AI generation or upload your own 3D model</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" style={{ padding: '1rem 2rem', background: 'linear-gradient(135deg, #6366f1, #818cf8)', color: 'white', borderRadius: '12px', textDecoration: 'none', fontWeight: 600 }}>✨ Generate with AI</Link>
            <button style={{ padding: '1rem 2rem', background: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '12px', fontWeight: 600, cursor: 'pointer' }}>📤 Upload Model</button>
          </div>
        </div>
      </main>
    </div>
  );
}

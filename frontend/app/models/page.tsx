'use client';

import Link from 'next/link';

const models = [
  { id: 1, name: 'Robot Figurine', date: 'Mar 20, 2026', parts: 3, materials: ['White Plastic', 'Steel'], preview: '🤖', status: 'Ready' },
  { id: 2, name: 'Custom Part', date: 'Mar 19, 2026', parts: 1, materials: ['Full Color'], preview: '🔧', status: 'Ready' },
  { id: 3, name: 'Miniature Set', date: 'Mar 18, 2026', parts: 5, materials: ['Metallic Plastic'], preview: '♟️', status: 'Ready' },
  { id: 4, name: 'Phone Stand', date: 'Mar 17, 2026', parts: 2, materials: ['Black Plastic'], preview: '📱', status: 'Ready' },
  { id: 5, name: 'Desk Organizer', date: 'Mar 16, 2026', parts: 4, materials: ['White Plastic', 'Rubber'], preview: '🗂️', status: 'Ready' },
  { id: 6, name: 'Keychain', date: 'Mar 15, 2026', parts: 1, materials: ['Steel'], preview: '🔑', status: 'Ready' },
];

export default function ModelsPage() {
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
          <Link href="/models" style={{ color: '#818cf8', textDecoration: 'none', fontWeight: 600 }}>Models</Link>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.25rem', cursor: 'pointer' }}>🔔</button>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #818cf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600 }}>Y</div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '0.5rem' }}>My Models</h1>
            <p style={{ color: '#94a3b8' }}>Manage and organize your 3D designs</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input 
              type="search" 
              placeholder="Search models..." 
              style={{ 
                padding: '0.75rem 1rem', 
                background: 'rgba(30, 41, 59, 0.8)', 
                border: '1px solid rgba(99, 102, 241, 0.3)', 
                borderRadius: '8px', 
                color: '#f1f5f9',
                width: '250px',
              }}
            />
            <Link href="/" style={{ 
              padding: '0.75rem 1.5rem', 
              background: 'linear-gradient(135deg, #6366f1, #818cf8)', 
              color: 'white', 
              borderRadius: '8px', 
              textDecoration: 'none', 
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}>+ New Model</Link>
          </div>
        </div>

        {/* Models Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {models.map((model) => (
            <div key={model.id} style={{ 
              background: 'rgba(30, 41, 59, 0.5)', 
              borderRadius: '12px', 
              overflow: 'hidden',
              border: '1px solid rgba(99, 102, 241, 0.1)',
              transition: 'all 0.3s',
            }}>
              {/* Preview */}
              <div style={{ height: '200px', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem' }}>
                {model.preview}
              </div>

              {/* Content */}
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#f1f5f9' }}>{model.name}</h3>
                  <span style={{ fontSize: '0.75rem', color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '0.25rem 0.75rem', borderRadius: '50px' }}>{model.status}</span>
                </div>
                
                <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '1rem' }}>{model.date}</p>

                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>{model.parts} {model.parts === 1 ? 'part' : 'parts'}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                    {model.materials.map((material, i) => (
                      <span key={i} style={{ fontSize: '0.75rem', color: '#818cf8', background: 'rgba(99, 102, 241, 0.1)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>{material}</span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Link href={`/models/${model.id}/edit`} style={{ 
                    flex: 1, 
                    padding: '0.5rem', 
                    background: 'rgba(99, 102, 241, 0.1)', 
                    color: '#818cf8', 
                    borderRadius: '6px', 
                    textDecoration: 'none', 
                    textAlign: 'center', 
                    fontSize: '0.875rem',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                  }}>Edit</Link>
                  <Link href={`/checkout?model=${model.id}`} style={{ 
                    flex: 1, 
                    padding: '0.5rem', 
                    background: 'linear-gradient(135deg, #6366f1, #818cf8)', 
                    color: 'white', 
                    borderRadius: '6px', 
                    textDecoration: 'none', 
                    textAlign: 'center', 
                    fontSize: '0.875rem',
                  }}>Order</Link>
                </div>
              </div>
            </div>
          ))}

          {/* New Model Card */}
          <Link href="/" style={{ 
            background: 'rgba(30, 41, 59, 0.3)', 
            borderRadius: '12px', 
            border: '2px dashed rgba(99, 102, 241, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            minHeight: '350px',
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>+</div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#818cf8' }}>Create New Model</h3>
            <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '0.5rem' }}>Generate with AI</p>
          </Link>
        </div>

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '2rem' }}>
          <button style={{ padding: '0.5rem 1rem', background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(99, 102, 241, 0.1)', borderRadius: '6px', color: '#94a3b8', cursor: 'pointer' }}>Previous</button>
          <button style={{ padding: '0.5rem 1rem', background: 'linear-gradient(135deg, #6366f1, #818cf8)', border: 'none', borderRadius: '6px', color: 'white', fontWeight: 600, cursor: 'pointer' }}>1</button>
          <button style={{ padding: '0.5rem 1rem', background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(99, 102, 241, 0.1)', borderRadius: '6px', color: '#94a3b8', cursor: 'pointer' }}>2</button>
          <button style={{ padding: '0.5rem 1rem', background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(99, 102, 241, 0.1)', borderRadius: '6px', color: '#94a3b8', cursor: 'pointer' }}>3</button>
          <button style={{ padding: '0.5rem 1rem', background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(99, 102, 241, 0.1)', borderRadius: '6px', color: '#94a3b8', cursor: 'pointer' }}>Next</button>
        </div>
      </main>
    </div>
  );
}

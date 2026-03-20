'use client';

import { useState } from 'react';
import Link from 'next/link';

const galleryItems = [
  { id: 1, name: 'Robot Warrior', creator: 'Yori J.', likes: 234, downloads: 89, preview: '🤖', materials: ['White Plastic', 'Steel'], featured: true },
  { id: 2, name: 'Dragon Figurine', creator: 'Alex M.', likes: 456, downloads: 178, preview: '🐉', materials: ['Full Color'], featured: true },
  { id: 3, name: 'Phone Stand', creator: 'Sarah K.', likes: 189, downloads: 234, preview: '📱', materials: ['Black Plastic'], featured: false },
  { id: 4, name: 'Chess Set', creator: 'Mike R.', likes: 567, downloads: 145, preview: '♟️', materials: ['Metallic Plastic'], featured: true },
  { id: 5, name: 'Desk Organizer', creator: 'Emma L.', likes: 345, downloads: 267, preview: '🗂️', materials: ['White Plastic', 'Rubber'], featured: false },
  { id: 6, name: 'Keychain Custom', creator: 'John D.', likes: 123, downloads: 456, preview: '🔑', materials: ['Steel'], featured: false },
  { id: 7, name: 'Miniature Knight', creator: 'Lisa W.', likes: 678, downloads: 234, preview: '🏇', materials: ['Full Color'], featured: true },
  { id: 8, name: 'Cable Clips', creator: 'Tom H.', likes: 234, downloads: 567, preview: '📎', materials: ['Black Plastic'], featured: false },
  { id: 9, name: 'Plant Pot', creator: 'Anna B.', likes: 456, downloads: 189, preview: '🪴', materials: ['Full Color'], featured: false },
  { id: 10, name: 'Gear Set', creator: 'Chris P.', likes: 345, downloads: 123, preview: '⚙️', materials: ['Steel'], featured: false },
  { id: 11, name: 'Bookend', creator: 'Kate M.', likes: 234, downloads: 98, preview: '📚', materials: ['Metallic Plastic'], featured: false },
  { id: 12, name: 'Toy Car', creator: 'David L.', likes: 567, downloads: 345, preview: '🏎️', materials: ['Full Color', 'Rubber'], featured: true },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredItems = galleryItems.filter(item => {
    if (filter === 'featured' && !item.featured) return false;
    if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

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
          <Link href="/gallery" style={{ color: '#818cf8', textDecoration: 'none', fontWeight: 600 }}>Gallery</Link>
          <Link href="/login" style={{ padding: '0.5rem 1.5rem', background: 'linear-gradient(135deg, #6366f1, #818cf8)', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>Sign In</Link>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '1rem' }}>Community Gallery</h1>
          <p style={{ fontSize: '1.25rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>Discover amazing creations from the FormFab community</p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              onClick={() => setFilter('all')}
              style={{ padding: '0.5rem 1.5rem', background: filter === 'all' ? 'linear-gradient(135deg, #6366f1, #818cf8)' : 'rgba(30, 41, 59, 0.5)', color: filter === 'all' ? 'white' : '#94a3b8', border: 'none', borderRadius: '50px', fontWeight: 600, cursor: 'pointer' }}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('featured')}
              style={{ padding: '0.5rem 1.5rem', background: filter === 'featured' ? 'linear-gradient(135deg, #6366f1, #818cf8)' : 'rgba(30, 41, 59, 0.5)', color: filter === 'featured' ? 'white' : '#94a3b8', border: 'none', borderRadius: '50px', fontWeight: 600, cursor: 'pointer' }}
            >
              ⭐ Featured
            </button>
            <button 
              onClick={() => setFilter('popular')}
              style={{ padding: '0.5rem 1.5rem', background: filter === 'popular' ? 'linear-gradient(135deg, #6366f1, #818cf8)' : 'rgba(30, 41, 59, 0.5)', color: filter === 'popular' ? 'white' : '#94a3b8', border: 'none', borderRadius: '50px', fontWeight: 600, cursor: 'pointer' }}
            >
              🔥 Popular
            </button>
          </div>

          <input 
            type="search" 
            placeholder="Search gallery..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ 
              padding: '0.75rem 1rem', 
              background: 'rgba(30, 41, 59, 0.8)', 
              border: '1px solid rgba(99, 102, 241, 0.3)', 
              borderRadius: '8px', 
              color: '#f1f5f9',
              width: '250px',
            }}
          />
        </div>

        {/* Gallery Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {filteredItems.map((item) => (
            <div key={item.id} style={{ 
              background: 'rgba(30, 41, 59, 0.5)', 
              borderRadius: '12px', 
              overflow: 'hidden',
              border: '1px solid rgba(99, 102, 241, 0.1)',
              transition: 'all 0.3s',
              position: 'relative',
            }}>
              {item.featured && (
                <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 600, zIndex: 1 }}>
                  ⭐ Featured
                </div>
              )}

              {/* Preview */}
              <div style={{ height: '220px', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '6rem' }}>
                {item.preview}
              </div>

              {/* Content */}
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#f1f5f9', marginBottom: '0.25rem' }}>{item.name}</h3>
                <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '1rem' }}>by {item.creator}</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '1rem' }}>
                  {item.materials.map((material, i) => (
                    <span key={i} style={{ fontSize: '0.75rem', color: '#818cf8', background: 'rgba(99, 102, 241, 0.1)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>{material}</span>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: '#94a3b8' }}>
                    <span>❤️ {item.likes}</span>
                    <span>📥 {item.downloads}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button style={{ 
                    flex: 1, 
                    padding: '0.5rem', 
                    background: 'rgba(99, 102, 241, 0.1)', 
                    color: '#818cf8', 
                    borderRadius: '6px', 
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                  }}>View Details</button>
                  <button style={{ 
                    flex: 1, 
                    padding: '0.5rem', 
                    background: 'linear-gradient(135deg, #6366f1, #818cf8)', 
                    color: 'white', 
                    borderRadius: '6px', 
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                  }}>Remix</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '2rem' }}>
          <button style={{ padding: '0.5rem 1rem', background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(99, 102, 241, 0.1)', borderRadius: '6px', color: '#94a3b8', cursor: 'pointer' }}>Previous</button>
          <button style={{ padding: '0.5rem 1rem', background: 'linear-gradient(135deg, #6366f1, #818cf8)', border: 'none', borderRadius: '6px', color: 'white', fontWeight: 600, cursor: 'pointer' }}>1</button>
          <button style={{ padding: '0.5rem 1rem', background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(99, 102, 241, 0.1)', borderRadius: '6px', color: '#94a3b8', cursor: 'pointer' }}>2</button>
          <button style={{ padding: '0.5rem 1rem', background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(99, 102, 241, 0.1)', borderRadius: '6px', color: '#94a3b8', cursor: 'pointer' }}>3</button>
          <button style={{ padding: '0.5rem 1rem', background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(99, 102, 241, 0.1)', borderRadius: '6px', color: '#94a3b8', cursor: 'pointer' }}>Next</button>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '3rem', padding: '3rem', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(244, 114, 182, 0.1))', borderRadius: '24px', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '1rem' }}>Create Your Own</h2>
          <p style={{ color: '#94a3b8', fontSize: '1.125rem', marginBottom: '2rem' }}>Join the community and share your creations</p>
          <Link href="/" style={{ padding: '1rem 2rem', background: 'linear-gradient(135deg, #6366f1, #818cf8)', color: 'white', borderRadius: '12px', textDecoration: 'none', fontWeight: 600 }}>✨ Start Creating</Link>
        </div>
      </main>
    </div>
  );
}

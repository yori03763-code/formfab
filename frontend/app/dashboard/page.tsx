'use client';

import Link from 'next/link';

// Mock data - replace with real API calls
const recentProjects = [
  { id: 1, name: 'Robot Figurine', date: '2 hours ago', preview: '🤖' },
  { id: 2, name: 'Custom Part', date: 'Yesterday', preview: '🔧' },
  { id: 3, name: 'Miniature Set', date: '3 days ago', preview: '♟️' },
];

const recentOrders = [
  { id: '#12345', status: 'Processing', statusColor: '#3b82f6', items: 'Robot Figurine', total: '$35.50', eta: 'Mar 25' },
  { id: '#12344', status: 'Printing', statusColor: '#f59e0b', items: 'Custom Part', total: '$22.00', eta: 'Mar 23' },
  { id: '#12343', status: 'Shipped', statusColor: '#10b981', items: 'Miniature Set', total: '$18.50', eta: 'Mar 21' },
];

export default function DashboardPage() {
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
          <Link href="/dashboard" style={{ color: '#818cf8', textDecoration: 'none', fontWeight: 600 }}>Dashboard</Link>
          <Link href="/orders" style={{ color: '#94a3b8', textDecoration: 'none' }}>Orders</Link>
          <Link href="/models" style={{ color: '#94a3b8', textDecoration: 'none' }}>Models</Link>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.25rem', cursor: 'pointer' }}>🔔</button>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #818cf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600 }}>Y</div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Welcome */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '0.5rem' }}>
            Welcome back, Yori! 👋
          </h1>
          <p style={{ color: '#94a3b8' }}>Ready to create something amazing?</p>
        </div>

        {/* Quick Actions */}
        <div style={{ 
          background: 'rgba(30, 41, 59, 0.5)', 
          borderRadius: '16px', 
          padding: '1.5rem', 
          marginBottom: '2rem',
          border: '1px solid rgba(99, 102, 241, 0.1)',
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#f1f5f9', marginBottom: '1rem' }}>Quick Actions</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/" style={{ 
              padding: '1rem 2rem', 
              background: 'linear-gradient(135deg, #6366f1, #818cf8)', 
              color: 'white', 
              borderRadius: '12px', 
              textDecoration: 'none', 
              fontWeight: 600,
              boxShadow: '0 10px 30px rgba(99, 102, 241, 0.3)',
            }}>
              ✨ New Project
            </Link>
            <button style={{ 
              padding: '1rem 2rem', 
              background: 'rgba(99, 102, 241, 0.1)', 
              color: '#818cf8', 
              borderRadius: '12px', 
              border: '1px solid rgba(99, 102, 241, 0.3)',
              cursor: 'pointer',
              fontWeight: 600,
            }}>
              📤 Upload Model
            </button>
            <Link href="/orders" style={{ 
              padding: '1rem 2rem', 
              background: 'rgba(30, 41, 59, 0.5)', 
              color: '#f1f5f9', 
              borderRadius: '12px', 
              textDecoration: 'none', 
              border: '1px solid rgba(99, 102, 241, 0.1)',
              fontWeight: 600,
            }}>
              📋 View Orders
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '12px', padding: '1.5rem', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#818cf8', marginBottom: '0.5rem' }}>15</div>
            <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Projects</div>
          </div>
          <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '12px', padding: '1.5rem', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#10b981', marginBottom: '0.5rem' }}>8</div>
            <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Orders</div>
          </div>
          <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '12px', padding: '1.5rem', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#f59e0b', marginBottom: '0.5rem' }}>3</div>
            <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>In Cart</div>
          </div>
          <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '12px', padding: '1.5rem', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#f472b6', marginBottom: '0.5rem' }}>$245.50</div>
            <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Total Spent</div>
          </div>
        </div>

        {/* Recent Projects */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f1f5f9' }}>Recent Projects</h2>
            <Link href="/models" style={{ color: '#818cf8', textDecoration: 'none', fontSize: '0.875rem' }}>View all →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
            {recentProjects.map((project) => (
              <div key={project.id} style={{ 
                background: 'rgba(30, 41, 59, 0.5)', 
                borderRadius: '12px', 
                padding: '1rem',
                border: '1px solid rgba(99, 102, 241, 0.1)',
                transition: 'all 0.3s',
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>{project.preview}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#f1f5f9', marginBottom: '0.25rem' }}>{project.name}</h3>
                <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '1rem' }}>{project.date}</p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Link href={`/models/${project.id}/edit`} style={{ 
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
                  <button style={{ 
                    flex: 1, 
                    padding: '0.5rem', 
                    background: 'linear-gradient(135deg, #6366f1, #818cf8)', 
                    color: 'white', 
                    borderRadius: '6px', 
                    border: 'none', 
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                  }}>🛒 Order</button>
                </div>
              </div>
            ))}
            {/* New Project Card */}
            <Link href="/" style={{ 
              background: 'rgba(30, 41, 59, 0.3)', 
              borderRadius: '12px', 
              padding: '1rem',
              border: '2px dashed rgba(99, 102, 241, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              minHeight: '200px',
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>+</div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#818cf8' }}>New Project</h3>
            </Link>
          </div>
        </div>

        {/* Recent Orders */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f1f5f9' }}>Recent Orders</h2>
            <Link href="/orders" style={{ color: '#818cf8', textDecoration: 'none', fontSize: '0.875rem' }}>View all →</Link>
          </div>
          <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.1)', overflow: 'hidden' }}>
            {recentOrders.map((order, index) => (
              <div key={order.id} style={{ 
                padding: '1rem', 
                borderBottom: index < recentOrders.length - 1 ? '1px solid rgba(99, 102, 241, 0.1)' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>📦</div>
                  <div>
                    <div style={{ fontWeight: 600, color: '#f1f5f9' }}>{order.id}</div>
                    <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>{order.items}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Status</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: order.statusColor }}></div>
                      <span style={{ color: order.statusColor, fontWeight: 600 }}>{order.status}</span>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Total</div>
                    <div style={{ fontWeight: 600, color: '#f1f5f9' }}>{order.total}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Est. Delivery</div>
                    <div style={{ fontWeight: 600, color: '#f1f5f9' }}>{order.eta}</div>
                  </div>
                  <Link href={`/orders/${order.id.substring(1)}`} style={{ 
                    padding: '0.5rem 1rem', 
                    background: 'rgba(99, 102, 241, 0.1)', 
                    color: '#818cf8', 
                    borderRadius: '6px', 
                    textDecoration: 'none', 
                    fontSize: '0.875rem',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                  }}>Track</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

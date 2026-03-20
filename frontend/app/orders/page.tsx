'use client';

import Link from 'next/link';

const orders = [
  { id: '#12345', status: 'Processing', statusColor: '#3b82f6', date: 'Mar 20, 2026', items: 2, total: '$35.50', eta: 'Mar 25', products: ['Robot Figurine - Body (White Plastic)', 'Robot Figurine - Joints (Steel)'] },
  { id: '#12344', status: 'Printing', statusColor: '#f59e0b', date: 'Mar 19, 2026', items: 1, total: '$22.00', eta: 'Mar 23', products: ['Custom Part (Full Color)'] },
  { id: '#12343', status: 'Shipped', statusColor: '#10b981', date: 'Mar 18, 2026', items: 1, total: '$18.50', eta: 'Mar 21', products: ['Miniature (Metallic Plastic)'], tracking: '1Z999AA10123456784' },
  { id: '#12342', status: 'Delivered', statusColor: '#6b7280', date: 'Mar 15, 2026', items: 3, total: '$45.00', eta: 'Delivered', products: ['Collection Set (Mixed Materials)'] },
];

export default function OrdersPage() {
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
          <Link href="/orders" style={{ color: '#818cf8', textDecoration: 'none', fontWeight: 600 }}>Orders</Link>
          <Link href="/models" style={{ color: '#94a3b8', textDecoration: 'none' }}>Models</Link>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.25rem', cursor: 'pointer' }}>🔔</button>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #818cf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600 }}>Y</div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '0.5rem' }}>Order History</h1>
            <p style={{ color: '#94a3b8' }}>Track and manage your orders</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <select style={{ 
              padding: '0.75rem 1rem', 
              background: 'rgba(30, 41, 59, 0.8)', 
              border: '1px solid rgba(99, 102, 241, 0.3)', 
              borderRadius: '8px', 
              color: '#f1f5f9',
              cursor: 'pointer',
            }}>
              <option>All Statuses</option>
              <option>Processing</option>
              <option>Printing</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
            <input 
              type="search" 
              placeholder="Search orders..." 
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
        </div>

        {/* Orders List */}
        <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.1)', overflow: 'hidden' }}>
          {orders.map((order, index) => (
            <div key={order.id} style={{ 
              padding: '1.5rem', 
              borderBottom: index < orders.length - 1 ? '1px solid rgba(99, 102, 241, 0.1)' : 'none',
            }}>
              {/* Order Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f1f5f9' }}>{order.id}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: order.statusColor }}></div>
                    <span style={{ color: order.statusColor, fontWeight: 600 }}>{order.status}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Order Date</div>
                    <div style={{ color: '#f1f5f9', fontWeight: 600 }}>{order.date}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Total</div>
                    <div style={{ color: '#f1f5f9', fontWeight: 700 }}>{order.total}</div>
                  </div>
                  <Link href={`/orders/${order.id.substring(1)}`} style={{ 
                    padding: '0.75rem 1.5rem', 
                    background: 'linear-gradient(135deg, #6366f1, #818cf8)', 
                    color: 'white', 
                    borderRadius: '8px', 
                    textDecoration: 'none', 
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                  }}>View Details</Link>
                </div>
              </div>

              {/* Order Items Preview */}
              <div style={{ background: 'rgba(15, 23, 42, 0.5)', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.5rem' }}>{order.items} {order.items === 1 ? 'item' : 'items'}</div>
                {order.products.map((product, i) => (
                  <div key={i} style={{ fontSize: '0.875rem', color: '#f1f5f9', marginBottom: i < order.products.length - 1 ? '0.25rem' : '0' }}>• {product}</div>
                ))}
              </div>

              {/* Order Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                    {order.status === 'Delivered' ? 'Delivered on' : 'Estimated Delivery'}
                  </div>
                  <div style={{ color: '#f1f5f9', fontWeight: 600 }}>{order.eta}</div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button style={{ 
                    padding: '0.5rem 1rem', 
                    background: 'rgba(99, 102, 241, 0.1)', 
                    color: '#818cf8', 
                    borderRadius: '6px', 
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                  }}>Download Invoice</button>
                  {order.status === 'Delivered' && (
                    <button style={{ 
                      padding: '0.5rem 1rem', 
                      background: 'linear-gradient(135deg, #6366f1, #818cf8)', 
                      color: 'white', 
                      borderRadius: '6px', 
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                    }}>Reorder</button>
                  )}
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
      </main>
    </div>
  );
}

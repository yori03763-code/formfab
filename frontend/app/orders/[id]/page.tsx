'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id;

  // Mock order data
  const order = {
    id: `#${orderId}`,
    status: 'Processing',
    statusColor: '#3b82f6',
    date: 'March 20, 2026',
    items: [
      { name: 'Body', material: 'White Plastic', volume: '30cm³', price: '$4.50', preview: '⬜' },
      { name: 'Joints', material: 'Steel', volume: '10cm³', price: '$12.00', preview: '⚙️' },
    ],
    subtotal: '$16.50',
    shipping: '$5.00',
    tax: '$1.00',
    total: '$22.50',
    shippingAddress: {
      name: 'Yori Jawad',
      street: '123 Developer Street',
      city: 'San Francisco, CA 94102',
      country: 'United States',
    },
    timeline: [
      { status: 'Order Placed', date: 'Mar 20', completed: true, color: '#3b82f6' },
      { status: 'Payment Confirmed', date: 'Mar 20', completed: true, color: '#3b82f6' },
      { status: 'Printing Started', date: 'Mar 21', completed: false, color: '#3b82f6' },
      { status: 'Quality Check', date: 'Mar 23', completed: false, color: '#3b82f6' },
      { status: 'Shipped', date: 'Mar 24', completed: false, color: '#3b82f6' },
      { status: 'Delivered', date: 'Mar 25', completed: false, color: '#3b82f6' },
    ],
  };

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
        {/* Back Button */}
        <Link href="/orders" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.875rem', marginBottom: '1rem', display: 'inline-block' }}>
          ← Back to Orders
        </Link>

        {/* Order Header */}
        <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '16px', padding: '2rem', marginBottom: '2rem', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '0.5rem' }}>{order.id}</h1>
              <p style={{ color: '#94a3b8' }}>Placed on {order.date}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', justifyContent: 'flex-end' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: order.statusColor }}></div>
                <span style={{ color: order.statusColor, fontWeight: 700, fontSize: '1.25rem' }}>{order.status}</span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Estimated Delivery: Mar 25, 2026</p>
            </div>
          </div>

          {/* Progress Timeline */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', marginBottom: '1rem' }}>
              <div style={{ position: 'absolute', top: '12px', left: '0', right: '0', height: '2px', background: 'rgba(99, 102, 241, 0.2)' }}>
                <div style={{ width: '40%', height: '100%', background: order.statusColor }}></div>
              </div>
              {order.timeline.map((step, index) => (
                <div key={index} style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                  <div style={{ 
                    width: '24px', 
                    height: '24px', 
                    borderRadius: '50%', 
                    background: step.completed ? step.color : 'rgba(99, 102, 241, 0.2)',
                    border: `2px solid ${step.completed ? step.color : 'rgba(99, 102, 241, 0.3)'}`,
                    margin: '0 auto 0.5rem',
                  }}></div>
                  <div style={{ fontSize: '0.75rem', color: step.completed ? '#f1f5f9' : '#64748b', whiteSpace: 'nowrap' }}>{step.status}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{step.date}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button style={{ 
              padding: '0.75rem 1.5rem', 
              background: 'rgba(99, 102, 241, 0.1)', 
              color: '#818cf8', 
              borderRadius: '8px', 
              border: '1px solid rgba(99, 102, 241, 0.2)',
              cursor: 'pointer',
              fontWeight: 600,
            }}>Download Invoice</button>
            <button style={{ 
              padding: '0.75rem 1.5rem', 
              background: 'rgba(99, 102, 241, 0.1)', 
              color: '#818cf8', 
              borderRadius: '8px', 
              border: '1px solid rgba(99, 102, 241, 0.2)',
              cursor: 'pointer',
              fontWeight: 600,
            }}>Contact Support</button>
            {order.status === 'Delivered' && (
              <button style={{ 
                padding: '0.75rem 1.5rem', 
                background: 'linear-gradient(135deg, #6366f1, #818cf8)', 
                color: 'white', 
                borderRadius: '8px', 
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
              }}>Reorder</button>
            )}
          </div>
        </div>

        {/* Order Items */}
        <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '16px', padding: '2rem', marginBottom: '2rem', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '1.5rem' }}>Order Items ({order.items.length})</h2>
          
          {order.items.map((item, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem', 
              padding: '1rem', 
              background: 'rgba(15, 23, 42, 0.5)', 
              borderRadius: '12px', 
              marginBottom: index < order.items.length - 1 ? '1rem' : '0',
            }}>
              <div style={{ fontSize: '3rem' }}>{item.preview}</div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#f1f5f9', marginBottom: '0.25rem' }}>{item.name}</h3>
                <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>{item.material} • {item.volume}</p>
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f1f5f9' }}>{item.price}</div>
            </div>
          ))}
        </div>

        {/* Shipping Address & Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
          {/* Shipping Address */}
          <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '16px', padding: '2rem', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '1rem' }}>Shipping Address</h2>
            <div style={{ color: '#94a3b8', lineHeight: '1.8' }}>
              <div style={{ color: '#f1f5f9', fontWeight: 600, marginBottom: '0.5rem' }}>{order.shippingAddress.name}</div>
              <div>{order.shippingAddress.street}</div>
              <div>{order.shippingAddress.city}</div>
              <div>{order.shippingAddress.country}</div>
            </div>
          </div>

          {/* Order Summary */}
          <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '16px', padding: '2rem', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '1rem' }}>Order Summary</h2>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#94a3b8' }}>
                <span>Subtotal</span>
                <span>{order.subtotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#94a3b8' }}>
                <span>Shipping</span>
                <span>{order.shipping}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#94a3b8' }}>
                <span>Tax</span>
                <span>{order.tax}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '1.25rem', fontWeight: 700, color: '#f1f5f9' }}>
                <span>Total</span>
                <span style={{ background: 'linear-gradient(135deg, #818cf8, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{order.total}</span>
              </div>
            </div>
            <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
              <div style={{ marginBottom: '0.5rem' }}>Paid with Visa •••• 4242</div>
              <div>Transaction ID: txn_1234567890</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

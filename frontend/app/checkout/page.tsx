'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const orderSummary = {
    items: 2,
    subtotal: '$16.50',
    shipping: '$5.00',
    tax: '$1.00',
    total: '$22.50',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) {
      setStep(step + 1);
    } else {
      // Process payment
      alert('Order placed! Redirecting to confirmation...');
      window.location.href = '/orders/12345';
    }
  };

  return (
    <div className="min-h-screen" style={{ background: '#0f172a' }}>
      {/* Header */}
      <header style={{ 
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
        <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Need Help? contact@formfab.com</div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Progress Steps */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                background: step >= 1 ? 'linear-gradient(135deg, #6366f1, #818cf8)' : 'rgba(99, 102, 241, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 600,
              }}>{step >= 1 ? '✓' : '1'}</div>
              <span style={{ color: step >= 1 ? '#f1f5f9' : '#64748b', fontWeight: 600 }}>Shipping</span>
            </div>
            <div style={{ width: '100px', height: '2px', background: step >= 2 ? 'linear-gradient(135deg, #6366f1, #818cf8)' : 'rgba(99, 102, 241, 0.2)', alignSelf: 'center' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                background: step >= 2 ? 'linear-gradient(135deg, #6366f1, #818cf8)' : 'rgba(99, 102, 241, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 600,
              }}>{step >= 2 ? '✓' : '2'}</div>
              <span style={{ color: step >= 2 ? '#f1f5f9' : '#64748b', fontWeight: 600 }}>Payment</span>
            </div>
            <div style={{ width: '100px', height: '2px', background: step >= 3 ? 'linear-gradient(135deg, #6366f1, #818cf8)' : 'rgba(99, 102, 241, 0.2)', alignSelf: 'center' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                background: step >= 3 ? 'linear-gradient(135deg, #6366f1, #818cf8)' : 'rgba(99, 102, 241, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 600,
              }}>3</div>
              <span style={{ color: step >= 3 ? '#f1f5f9' : '#64748b', fontWeight: 600 }}>Confirmation</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '2rem' }}>
          {/* Form Section */}
          <div>
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '16px', padding: '2rem', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '1.5rem' }}>Shipping Information</h2>
                  
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Full Name</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                      style={{ width: '100%', padding: '0.75rem', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '8px', color: '#f1f5f9' }}
                      placeholder="Yori Jawad"
                    />
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      style={{ width: '100%', padding: '0.75rem', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '8px', color: '#f1f5f9' }}
                      placeholder="you@example.com"
                    />
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Street Address</label>
                    <input
                      type="text"
                      value={formData.street}
                      onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                      required
                      style={{ width: '100%', padding: '0.75rem', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '8px', color: '#f1f5f9' }}
                      placeholder="123 Developer Street"
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.5rem' }}>City</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        required
                        style={{ width: '100%', padding: '0.75rem', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '8px', color: '#f1f5f9' }}
                        placeholder="San Francisco"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.5rem' }}>State</label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        required
                        style={{ width: '100%', padding: '0.75rem', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '8px', color: '#f1f5f9' }}
                        placeholder="CA"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.5rem' }}>ZIP Code</label>
                      <input
                        type="text"
                        value={formData.zip}
                        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                        required
                        style={{ width: '100%', padding: '0.75rem', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '8px', color: '#f1f5f9' }}
                        placeholder="94102"
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Country</label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '8px', color: '#f1f5f9' }}
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                      <option>Germany</option>
                      <option>France</option>
                    </select>
                  </div>

                  <button type="submit" style={{ width: '100%', padding: '1rem', background: 'linear-gradient(135deg, #6366f1, #818cf8)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', boxShadow: '0 10px 30px rgba(99, 102, 241, 0.3)' }}>
                    Continue to Payment →
                  </button>
                </div>
              )}

              {step === 2 && (
                <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '16px', padding: '2rem', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '1.5rem' }}>Payment Information</h2>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                      <button type="button" style={{ flex: 1, padding: '1rem', background: 'linear-gradient(135deg, #6366f1, #818cf8)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600 }}>🃏 Credit Card</button>
                      <button type="button" style={{ flex: 1, padding: '1rem', background: 'rgba(30, 41, 59, 0.5)', color: '#94a3b8', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '8px', fontWeight: 600 }}>🅿️ PayPal</button>
                    </div>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Card Number</label>
                    <input
                      type="text"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      style={{ width: '100%', padding: '0.75rem', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '8px', color: '#f1f5f9' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Expiry Date</label>
                      <input
                        type="text"
                        value={formData.expiry}
                        onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                        placeholder="MM/YY"
                        maxLength={5}
                        style={{ width: '100%', padding: '0.75rem', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '8px', color: '#f1f5f9' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.5rem' }}>CVV</label>
                      <input
                        type="text"
                        value={formData.cvv}
                        onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                        placeholder="123"
                        maxLength={4}
                        style={{ width: '100%', padding: '0.75rem', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '8px', color: '#f1f5f9' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="button" onClick={() => setStep(1)} style={{ flex: 1, padding: '1rem', background: 'rgba(30, 41, 59, 0.5)', color: '#94a3b8', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '12px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}>← Back</button>
                    <button type="submit" style={{ flex: 1, padding: '1rem', background: 'linear-gradient(135deg, #6366f1, #818cf8)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', boxShadow: '0 10px 30px rgba(99, 102, 241, 0.3)' }}>Pay ${orderSummary.total}</button>
                  </div>

                  <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.75rem', color: '#64748b' }}>
                    🔒 Your payment is secured with 256-bit SSL encryption
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '16px', padding: '2rem', border: '1px solid rgba(99, 102, 241, 0.1)', position: 'sticky', top: '100px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '1.5rem' }}>Order Summary</h2>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '8px', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>🤖</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: '#f1f5f9', marginBottom: '0.25rem' }}>Robot Figurine</div>
                    <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>2 parts • Multi-material</div>
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#94a3b8' }}>
                  <span>Subtotal</span>
                  <span>{orderSummary.subtotal}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#94a3b8' }}>
                  <span>Shipping</span>
                  <span>{orderSummary.shipping}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#94a3b8' }}>
                  <span>Tax</span>
                  <span>{orderSummary.tax}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '1.25rem', fontWeight: 700, color: '#f1f5f9' }}>
                  <span>Total</span>
                  <span style={{ background: 'linear-gradient(135deg, #818cf8, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{orderSummary.total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: 'Yori Jawad',
    email: 'yori@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');

  const handleSave = () => {
    setMessage('Profile updated successfully!');
    setTimeout(() => setMessage(''), 3000);
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
          <Link href="/orders" style={{ color: '#94a3b8', textDecoration: 'none' }}>Orders</Link>
          <Link href="/models" style={{ color: '#94a3b8', textDecoration: 'none' }}>Models</Link>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.25rem', cursor: 'pointer' }}>🔔</button>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #818cf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600 }}>Y</div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '2rem' }}>Account Settings</h1>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid rgba(99, 102, 241, 0.1)' }}>
          <button 
            onClick={() => setActiveTab('profile')}
            style={{ 
              padding: '1rem 2rem', 
              background: 'none', 
              border: 'none', 
              borderBottom: activeTab === 'profile' ? '2px solid #818cf8' : '2px solid transparent',
              color: activeTab === 'profile' ? '#f1f5f9' : '#94a3b8',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Profile
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            style={{ 
              padding: '1rem 2rem', 
              background: 'none', 
              border: 'none', 
              borderBottom: activeTab === 'security' ? '2px solid #818cf8' : '2px solid transparent',
              color: activeTab === 'security' ? '#f1f5f9' : '#94a3b8',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Security
          </button>
          <button 
            onClick={() => setActiveTab('billing')}
            style={{ 
              padding: '1rem 2rem', 
              background: 'none', 
              border: 'none', 
              borderBottom: activeTab === 'billing' ? '2px solid #818cf8' : '2px solid transparent',
              color: activeTab === 'billing' ? '#f1f5f9' : '#94a3b8',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Billing
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '16px', padding: '2rem', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
            {message && (
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', color: '#10b981', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                {message}
              </div>
            )}

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '8px', color: '#f1f5f9' }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '8px', color: '#f1f5f9' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                onClick={handleSave}
                style={{ padding: '0.75rem 2rem', background: 'linear-gradient(135deg, #6366f1, #818cf8)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
              >
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '16px', padding: '2rem', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Current Password</label>
              <input
                type="password"
                value={formData.currentPassword}
                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '8px', color: '#f1f5f9' }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.5rem' }}>New Password</label>
              <input
                type="password"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '8px', color: '#f1f5f9' }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Confirm Password</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '8px', color: '#f1f5f9' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button style={{ padding: '0.75rem 2rem', background: 'linear-gradient(135deg, #6366f1, #818cf8)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
                Update Password
              </button>
            </div>

            <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#f1f5f9', marginBottom: '1rem' }}>Two-Factor Authentication</h3>
              <p style={{ color: '#94a3b8', marginBottom: '1rem', fontSize: '0.875rem' }}>Add an extra layer of security to your account</p>
              <button style={{ padding: '0.75rem 1.5rem', background: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
                Enable 2FA
              </button>
            </div>
          </div>
        )}

        {/* Billing Tab */}
        {activeTab === 'billing' && (
          <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '16px', padding: '2rem', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#f1f5f9', marginBottom: '1.5rem' }}>Payment Methods</h3>
            
            <div style={{ background: 'rgba(15, 23, 42, 0.5)', borderRadius: '8px', padding: '1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ fontSize: '2rem' }}>💳</div>
                <div>
                  <div style={{ fontWeight: 600, color: '#f1f5f9' }}>Visa ending in 4242</div>
                  <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Expires 12/2027</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button style={{ padding: '0.5rem 1rem', background: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem' }}>Edit</button>
                <button style={{ padding: '0.5rem 1rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem' }}>Remove</button>
              </div>
            </div>

            <button style={{ padding: '0.75rem 1.5rem', background: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
              + Add Payment Method
            </button>

            <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#f1f5f9', marginBottom: '1rem' }}>Billing History</h3>
              <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
                <div style={{ padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Order #12345 - Mar 20, 2026</span>
                  <span style={{ color: '#f1f5f9', fontWeight: 600 }}>$22.50</span>
                </div>
                <div style={{ padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Order #12344 - Mar 19, 2026</span>
                  <span style={{ color: '#f1f5f9', fontWeight: 600 }}>$22.00</span>
                </div>
                <div style={{ padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Order #12343 - Mar 18, 2026</span>
                  <span style={{ color: '#f1f5f9', fontWeight: 600 }}>$18.50</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

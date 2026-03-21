'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export interface UserMenuProps {
  user?: {
    email: string;
    name?: string;
  } | null;
  onLogin: () => void;
  onSignup: () => void;
  onLogout: () => void;
}

export function UserMenu({ user, onLogin, onSignup, onLogout }: UserMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
    setMenuOpen(false);
  };

  if (!user) {
    return (
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          onClick={onLogin}
          style={{
            padding: '0.5rem 1.5rem',
            background: 'transparent',
            color: '#94a3b8',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            borderRadius: '8px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Login
        </button>
        <button
          onClick={onSignup}
          style={{
            padding: '0.5rem 1.5rem',
            background: 'linear-gradient(135deg, #6366f1, #818cf8)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Sign Up
        </button>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          background: 'rgba(99, 102, 241, 0.1)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366f1, #818cf8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 700,
          fontSize: '0.875rem',
        }}>
          {user.name?.charAt(0) || user.email.charAt(0).toUpperCase()}
        </div>
        <span style={{ color: '#f1f5f9', fontWeight: 600 }}>{user.name || user.email.split('@')[0]}</span>
      </button>

      {menuOpen && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999,
            }}
            onClick={() => setMenuOpen(false)}
          />
          <div style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '0.5rem',
            minWidth: '200px',
            background: 'rgba(30, 41, 59, 0.95)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
            zIndex: 1000,
            overflow: 'hidden',
          }}>
            <div style={{ padding: '1rem', borderBottom: '1px solid rgba(99, 102, 241, 0.1)' }}>
              <div style={{ fontWeight: 600, color: '#f1f5f9' }}>{user.name || 'User'}</div>
              <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>{user.email}</div>
            </div>
            <button
              onClick={() => {
                // Navigate to profile
                window.location.href = '/profile';
                setMenuOpen(false);
              }}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                background: 'transparent',
                border: 'none',
                color: '#f1f5f9',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '0.875rem',
              }}
            >
              👤 Profile
            </button>
            <button
              onClick={() => {
                // Navigate to orders
                window.location.href = '/orders';
                setMenuOpen(false);
              }}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                background: 'transparent',
                border: 'none',
                color: '#f1f5f9',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '0.875rem',
              }}
            >
              📦 Orders
            </button>
            <button
              onClick={() => {
                // Navigate to models
                window.location.href = '/models';
                setMenuOpen(false);
              }}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                background: 'transparent',
                border: 'none',
                color: '#f1f5f9',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '0.875rem',
              }}
            >
              🎨 My Models
            </button>
            <hr style={{ border: 'none', borderTop: '1px solid rgba(99, 102, 241, 0.1)', margin: 0 }} />
            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                background: 'transparent',
                border: 'none',
                color: '#ef4444',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '0.875rem',
              }}
            >
              🚪 Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  );
}

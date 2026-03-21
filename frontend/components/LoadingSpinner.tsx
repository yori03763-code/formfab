'use client';

export default function LoadingSpinner({ size = 'md', text }: { size?: 'sm' | 'md' | 'lg'; text?: string }) {
  const sizes = {
    sm: '20px',
    md: '40px',
    lg: '60px',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div
        style={{
          width: sizes[size],
          height: sizes[size],
          border: `3px solid rgba(99, 102, 241, 0.2)`,
          borderTop: `3px solid #818cf8`,
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      />
      {text && (
        <p style={{ color: '#94a3b8', marginTop: '1rem', fontSize: size === 'lg' ? '1.25rem' : '0.875rem' }}>
          {text}
        </p>
      )}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

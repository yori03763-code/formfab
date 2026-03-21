'use client';

import Link from 'next/link';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
}

export default function EmptyState({
  icon = '📭',
  title,
  description,
  actionText,
  actionHref,
  onAction,
}: EmptyStateProps) {
  return (
    <div style={{
      minHeight: '400px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem',
      background: 'rgba(30, 41, 59, 0.3)',
      borderRadius: '16px',
      border: '1px solid rgba(99, 102, 241, 0.1)',
    }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{icon}</div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '0.5rem' }}>
        {title}
      </h2>
      <p style={{ color: '#94a3b8', marginBottom: '1.5rem', maxWidth: '400px' }}>
        {description}
      </p>
      {actionText && actionHref && (
        <Link
          href={actionHref}
          onClick={onAction}
          style={{
            padding: '0.75rem 2rem',
            background: 'linear-gradient(135deg, #6366f1, #818cf8)',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          {actionText}
        </Link>
      )}
      {actionText && onAction && (
        <button
          onClick={onAction}
          style={{
            padding: '0.75rem 2rem',
            background: 'linear-gradient(135deg, #6366f1, #818cf8)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {actionText}
        </button>
      )}
    </div>
  );
}

import type { Metadata } from 'next';
import ErrorBoundary from '@/components/ErrorBoundary';

export const metadata: Metadata = {
  title: 'FormFab — Multi-Material 3D Printing',
  description: 'Transform ideas into multi-material 3D-printed products. AI-assisted, user-controlled.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ 
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", 
        background: '#0f172a', 
        color: '#f1f5f9',
        margin: 0,
        padding: 0,
      }}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}

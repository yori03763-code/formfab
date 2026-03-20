import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FormFab — Text to 3D Print',
  description: 'Describe it. Print it. Ship it. Transform your ideas into 3D-printed products.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
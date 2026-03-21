'use client';

import { useEffect, useState } from 'react';

export interface ARViewerProps {
  modelUrl: string;
  scale?: number;
  onARStart?: () => void;
  onAREnd?: () => void;
}

export function ARViewer({ modelUrl, scale = 1, onARStart, onAREnd }: ARViewerProps) {
  const [loaded, setLoaded] = useState(false);
  const [arAvailable, setArAvailable] = useState(false);

  useEffect(() => {
    // Check if model-viewer is loaded
    const checkModelViewer = () => {
      if (typeof window !== 'undefined' && (window as any).customElements?.get('model-viewer')) {
        setLoaded(true);
        // Check AR availability
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const isAndroid = /Android/.test(navigator.userAgent);
        setArAvailable(isIOS || isAndroid);
      } else {
        // Load model-viewer script
        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js';
        script.onload = () => {
          setLoaded(true);
          const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
          const isAndroid = /Android/.test(navigator.userAgent);
          setArAvailable(isIOS || isAndroid);
        };
        document.head.appendChild(script);
      }
    };

    checkModelViewer();
  }, []);

  if (!loaded) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '400px',
        background: 'rgba(30, 41, 59, 0.5)',
        borderRadius: '12px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📱</div>
          <p style={{ color: '#94a3b8' }}>Loading AR viewer...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* @ts-ignore - model-viewer is loaded dynamically */}
      <model-viewer
        src={modelUrl}
        alt="3D model in AR"
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        auto-rotate
        shadow-intensity="1"
        min-scale={0.5 * scale}
        max-scale={2 * scale}
        style={{
          width: '100%',
          height: '500px',
          background: 'rgba(15, 23, 42, 0.5)',
          borderRadius: '12px',
        }}
        onARStart={onARStart}
        onAREnd={onAREnd}
      >
        <button
          slot="ar-button"
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            padding: '1rem 2rem',
            background: 'linear-gradient(135deg, #6366f1, #818cf8)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          📱 View in Your Space
        </button>
      </model-viewer>

      {!arAvailable && (
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          right: '20px',
          padding: '1rem',
          background: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: '8px',
          color: '#fbbf24',
          fontSize: '0.875rem',
          textAlign: 'center',
        }}>
          ℹ️ AR requires iOS or Android device. Use mouse/touch to rotate on desktop.
        </div>
      )}
    </div>
  );
}

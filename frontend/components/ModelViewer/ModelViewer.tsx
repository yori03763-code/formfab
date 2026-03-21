'use client';

import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows, Stats } from '@react-three/drei';
import * as THREE from 'three';

export interface ModelViewerProps {
  modelUrl?: string;
  onModelLoad?: (model: any) => void;
  onError?: (error: Error) => void;
  autoRotate?: boolean;
  showStats?: boolean;
}

function Model({ modelUrl, onModelLoad, onError }: { modelUrl: string; onModelLoad?: (model: any) => void; onError?: (error: Error) => void }) {
  const { scene, isLoading, error } = useGLTF(modelUrl);

  if (error) {
    onError?.(error);
    return null;
  }

  if (isLoading) {
    return null;
  }

  onModelLoad?.(scene);

  return <primitive object={scene} />;
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <Environment preset="studio" />
    </>
  );
}

function Controls() {
  return (
    <OrbitControls
      enableZoom={true}
      enableRotate={true}
      enablePan={true}
      minDistance={1}
      maxDistance={100}
      makeDefault
    />
  );
}

export function ModelViewer({
  modelUrl,
  onModelLoad,
  onError,
  autoRotate = false,
  showStats = false,
}: ModelViewerProps) {
  const [loading, setLoading] = useState(true);
  const [viewerError, setViewerError] = useState<Error | null>(null);

  const handleModelLoad = (model: any) => {
    setLoading(false);
    onModelLoad?.(model);
  };

  const handleError = (error: Error) => {
    setLoading(false);
    setViewerError(error);
    onError?.(error);
  };

  if (viewerError) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '400px',
        background: 'rgba(239, 68, 68, 0.1)',
        borderRadius: '12px',
        border: '1px solid rgba(239, 68, 68, 0.3)',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❌</div>
          <h3 style={{ color: '#ef4444', marginBottom: '0.5rem' }}>Failed to load model</h3>
          <p style={{ color: '#94a3b8' }}>{viewerError.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      width: '100%', 
      height: '500px', 
      background: 'rgba(15, 23, 42, 0.5)',
      borderRadius: '12px',
      border: '1px solid rgba(99, 102, 241, 0.1)',
      position: 'relative',
    }}>
      {loading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(99, 102, 241, 0.2)',
            borderTop: '3px solid #818cf8',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }} />
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}

      <Canvas
        camera={{ position: [5, 5, 5], fov: 50 }}
        shadows
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#0f172a']} />
        <Suspense fallback={null}>
          <Lighting />
          <Controls />
          {modelUrl && (
            <Model
              modelUrl={modelUrl}
              onModelLoad={handleModelLoad}
              onError={handleError}
            />
          )}
          <ContactShadows
            position={[0, -0.5, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={4}
          />
        </Suspense>
        {showStats && <Stats />}
      </Canvas>
    </div>
  );
}

// Preload common models
if (typeof window !== 'undefined') {
  useGLTF.preload('https://threejs.org/examples/models/gltf/Duck/glTF/Duck.gltf');
}

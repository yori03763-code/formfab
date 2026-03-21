'use client';

import { Suspense, useState, useRef, useEffect, useMemo } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows, Stats } from '@react-three/drei';
import * as THREE from 'three';
import { PartHighlight } from './PartHighlight';
import { ViewerControls } from './ViewerControls';

export interface ModelViewerProps {
  modelUrl?: string;
  parts?: Array<{ id: string; name: string; materialId: number }>;
  onModelLoad?: (model: any) => void;
  onError?: (error: Error) => void;
  onPartSelect?: (partId: string | null) => void;
  autoRotate?: boolean;
  showStats?: boolean;
}

function Model({ 
  modelUrl, 
  parts = [],
  onModelLoad, 
  onError,
  onPartSelect,
  xrayMode,
  explodedMode,
  explosionFactor,
}: { 
  modelUrl: string; 
  parts?: Array<{ id: string; name: string; materialId: number }>;
  onModelLoad?: (model: any) => void; 
  onError?: (error: Error) => void;
  onPartSelect?: (partId: string | null) => void;
  xrayMode: boolean;
  explodedMode: boolean;
  explosionFactor: number;
}) {
  const { scene, isLoading, error } = useGLTF(modelUrl);

  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  // Calculate model center
  const modelCenter = useMemo(() => {
    if (!scene) return new THREE.Vector3(0, 0, 0);
    const boundingBox = new THREE.Box3().setFromObject(scene);
    return boundingBox.getCenter(new THREE.Vector3());
  }, [scene]);

  if (error) {
    onError?.(error);
    return null;
  }

  if (isLoading || !scene) {
    return null;
  }

  onModelLoad?.(scene);

  // If no parts defined, treat whole model as one part
  const partsToRender = parts.length > 0 ? parts : [{ id: 'whole', name: 'Model', materialId: 6 }];

  return (
    <group>
      {partsToRender.map((part, index) => (
        <PartHighlight
          key={part.id}
          object={scene}
          materialId={part.materialId}
          isSelected={selectedPart === part.id}
          isHovered={hoveredPart === part.id}
          xrayMode={xrayMode}
          explodedMode={explodedMode}
          explosionFactor={explosionFactor}
          modelCenter={modelCenter}
          partIndex={index}
          totalParts={partsToRender.length}
          onSelect={() => {
            setSelectedPart(selectedPart === part.id ? null : part.id);
            onPartSelect?.(selectedPart === part.id ? null : part.id);
          }}
          onHover={(hovered) => {
            setHoveredPart(hovered ? part.id : null);
          }}
        />
      ))}
    </group>
  );
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

function Controls({ autoRotate }: { autoRotate: boolean }) {
  return (
    <OrbitControls
      enableZoom={true}
      enableRotate={true}
      enablePan={true}
      minDistance={1}
      maxDistance={100}
      autoRotate={autoRotate}
      autoRotateSpeed={0.5}
      makeDefault
    />
  );
}

export function ModelViewer({
  modelUrl,
  parts,
  onModelLoad,
  onError,
  onPartSelect,
  autoRotate = false,
  showStats = false,
}: ModelViewerProps) {
  const [loading, setLoading] = useState(true);
  const [viewerError, setViewerError] = useState<Error | null>(null);
  
  // New state for x-ray and exploded view
  const [xrayMode, setXrayMode] = useState(false);
  const [explodedMode, setExplodedMode] = useState(false);
  const [explosionFactor, setExplodedFactor] = useState(1);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'x' || e.key === 'X') {
        setXrayMode(prev => !prev);
      }
      if (e.key === 'e' || e.key === 'E') {
        setExplodedMode(prev => !prev);
      }
      if (e.key === 'r' || e.key === 'R') {
        setXrayMode(false);
        setExplodedMode(false);
        setExplodedFactor(1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleModelLoad = (model: any) => {
    setLoading(false);
    onModelLoad?.(model);
  };

  const handleError = (error: Error) => {
    setLoading(false);
    setViewerError(error);
    onError?.(error);
  };

  const handleReset = () => {
    setXrayMode(false);
    setExplodedMode(false);
    setExplodedFactor(1);
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
          <Controls autoRotate={autoRotate && !explodedMode} />
          {modelUrl && (
            <Model
              modelUrl={modelUrl}
              parts={parts}
              onModelLoad={handleModelLoad}
              onError={handleError}
              onPartSelect={onPartSelect}
              xrayMode={xrayMode}
              explodedMode={explodedMode}
              explosionFactor={explosionFactor}
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

      {/* Viewer Controls */}
      <ViewerControls
        xrayMode={xrayMode}
        explodedMode={explodedMode}
        explosionFactor={explosionFactor}
        onToggleXray={() => setXrayMode(prev => !prev)}
        onToggleExploded={() => setExplodedMode(prev => !prev)}
        onExplosionFactorChange={setExplodedFactor}
        onReset={handleReset}
      />

      {/* Mode Indicators */}
      {(xrayMode || explodedMode) && (
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          display: 'flex',
          gap: '0.5rem',
          zIndex: 10,
        }}>
          {xrayMode && (
            <div style={{
              padding: '0.5rem 1rem',
              background: 'rgba(99, 102, 241, 0.3)',
              border: '1px solid #818cf8',
              borderRadius: '6px',
              color: '#818cf8',
              fontWeight: 600,
              fontSize: '0.875rem',
            }}>
              🩻 X-Ray Mode
            </div>
          )}
          {explodedMode && (
            <div style={{
              padding: '0.5rem 1rem',
              background: 'rgba(99, 102, 241, 0.3)',
              border: '1px solid #818cf8',
              borderRadius: '6px',
              color: '#818cf8',
              fontWeight: 600,
              fontSize: '0.875rem',
            }}>
              💥 Exploded View
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Preload common models
if (typeof window !== 'undefined') {
  useGLTF.preload('https://threejs.org/examples/models/gltf/Duck/glTF/Duck.gltf');
}

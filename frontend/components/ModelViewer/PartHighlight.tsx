'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface PartHighlightProps {
  object: THREE.Object3D;
  materialId: number;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: () => void;
  onHover: (hovered: boolean) => void;
}

const MATERIAL_VISUALS: Record<number, { color: string; roughness: number; metalness: number }> = {
  6: { color: '#F5F5F5', roughness: 0.6, metalness: 0.0 },    // White Plastic
  26: { color: '#1a1a1a', roughness: 0.5, metalness: 0.0 },   // Black Plastic
  25: { color: '#f472b6', roughness: 0.4, metalness: 0.0 },   // Full Color
  80: { color: '#d4af37', roughness: 0.3, metalness: 0.6 },   // Metallic Plastic
  77: { color: '#71797E', roughness: 0.2, metalness: 0.9 },   // Steel
  50: { color: '#4a90d9', roughness: 0.8, metalness: 0.0 },   // Rubber/TPE
};

export function PartHighlight({
  object,
  materialId,
  isSelected,
  isHovered,
  onSelect,
  onHover,
}: PartHighlightProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const visual = MATERIAL_VISUALS[materialId] || MATERIAL_VISUALS[6];

  useFrame((state) => {
    if (meshRef.current) {
      // Pulse animation when selected
      if (isSelected) {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.02;
        meshRef.current.scale.set(scale, scale, scale);
      } else {
        meshRef.current.scale.set(1, 1, 1);
      }

      // Highlight on hover
      if (hovered || isHovered) {
        (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.3;
      } else {
        (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0;
      }
    }
  });

  return (
    <primitive
      ref={meshRef}
      object={object}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        onHover(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        onHover(false);
        document.body.style.cursor = 'auto';
      }}
    >
      <meshStandardMaterial
        color={visual.color}
        roughness={visual.roughness}
        metalness={visual.metalness}
        transparent={isSelected}
        opacity={isSelected ? 0.8 : 1}
      />
    </primitive>
  );
}

'use client';

export interface ViewerControlsProps {
  xrayMode: boolean;
  explodedMode: boolean;
  explosionFactor: number;
  onToggleXray: () => void;
  onToggleExploded: () => void;
  onExplosionFactorChange: (factor: number) => void;
  onReset: () => void;
}

export function ViewerControls({
  xrayMode,
  explodedMode,
  explosionFactor,
  onToggleXray,
  onToggleExploded,
  onExplosionFactorChange,
  onReset,
}: ViewerControlsProps) {
  return (
    <div style={{
      position: 'absolute',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '0.5rem',
      alignItems: 'center',
      background: 'rgba(30, 41, 59, 0.9)',
      padding: '1rem',
      borderRadius: '12px',
      border: '1px solid rgba(99, 102, 241, 0.3)',
      zIndex: 10,
    }}>
      {/* X-Ray Toggle */}
      <button
        onClick={onToggleXray}
        title="X-Ray Mode (X)"
        style={{
          padding: '0.5rem 1rem',
          background: xrayMode ? 'rgba(99, 102, 241, 0.3)' : 'rgba(15, 23, 42, 0.8)',
          border: `1px solid ${xrayMode ? '#818cf8' : 'rgba(99, 102, 241, 0.3)'}`,
          borderRadius: '6px',
          color: xrayMode ? '#818cf8' : '#f1f5f9',
          cursor: 'pointer',
          fontWeight: 600,
          fontSize: '0.875rem',
        }}
      >
        🩻 X-Ray
      </button>

      {/* Exploded View Toggle */}
      <button
        onClick={onToggleExploded}
        title="Exploded View (E)"
        style={{
          padding: '0.5rem 1rem',
          background: explodedMode ? 'rgba(99, 102, 241, 0.3)' : 'rgba(15, 23, 42, 0.8)',
          border: `1px solid ${explodedMode ? '#818cf8' : 'rgba(99, 102, 241, 0.3)'}`,
          borderRadius: '6px',
          color: explodedMode ? '#818cf8' : '#f1f5f9',
          cursor: 'pointer',
          fontWeight: 600,
          fontSize: '0.875rem',
        }}
      >
        💥 Explode
      </button>

      {/* Explosion Slider */}
      {explodedMode && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Intensity:</span>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={explosionFactor}
            onChange={(e) => onExplosionFactorChange(parseFloat(e.target.value))}
            style={{
              width: '100px',
              accentColor: '#818cf8',
            }}
          />
        </div>
      )}

      {/* Reset Button */}
      <button
        onClick={onReset}
        title="Reset View (R)"
        style={{
          padding: '0.5rem 1rem',
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          borderRadius: '6px',
          color: '#f1f5f9',
          cursor: 'pointer',
          fontWeight: 600,
          fontSize: '0.875rem',
        }}
      >
        🔄 Reset
      </button>
    </div>
  );
}

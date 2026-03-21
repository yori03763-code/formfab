'use client';

import { useState } from 'react';

export interface MaterialRecommendation {
  materialId: number;
  materialName: string;
  confidence: number;
  rationale: string;
  alternatives: Array<{
    materialId: number;
    materialName: string;
    tradeoff: string;
    costDifference: number;
  }>;
}

export interface MaterialRecommendationProps {
  partName: string;
  partType: string;
  currentMaterialId: number;
  onRecommend: (prompt: string) => MaterialRecommendation;
  onSelectMaterial: (materialId: number) => void;
}

export function MaterialRecommendation({
  partName,
  partType,
  currentMaterialId,
  onRecommend,
  onSelectMaterial,
}: MaterialRecommendationProps) {
  const [recommendation, setRecommendation] = useState<MaterialRecommendation | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetRecommendation = () => {
    setLoading(true);
    // Simulate AI recommendation
    setTimeout(() => {
      const rec = onRecommend(`Best material for ${partType} part: ${partName}`);
      setRecommendation(rec);
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ 
      background: 'rgba(99, 102, 241, 0.1)', 
      borderRadius: '12px', 
      padding: '1.5rem', 
      border: '1px solid rgba(99, 102, 241, 0.2)',
      marginTop: '1rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <span style={{ fontSize: '1.5rem' }}>🤖</span>
        <h4 style={{ color: '#f1f5f9' }}>AI Material Recommendation</h4>
      </div>

      {!recommendation && !loading && (
        <div>
          <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>
            Get AI-powered material recommendations for {partName}
          </p>
          <button
            onClick={handleGetRecommendation}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, #6366f1, #818cf8)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            ✨ Get Recommendation
          </button>
        </div>
      )}

      {loading && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(99, 102, 241, 0.2)',
            borderTop: '3px solid #818cf8',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto',
          }} />
          <p style={{ color: '#94a3b8', marginTop: '1rem' }}>AI is analyzing your part...</p>
        </div>
      )}

      {recommendation && (
        <div>
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ color: '#94a3b8' }}>Recommended:</span>
              <span style={{ 
                background: 'rgba(16, 185, 129, 0.2)', 
                color: '#10b981', 
                padding: '0.25rem 0.75rem', 
                borderRadius: '50px',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}>
                {Math.round(recommendation.confidence * 100)}% Confident
              </span>
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '0.5rem' }}>
              {recommendation.materialName}
            </div>
            <p style={{ color: '#94a3b8', fontStyle: 'italic' }}>
              "{recommendation.rationale}"
            </p>
            <button
              onClick={() => onSelectMaterial(recommendation.materialId)}
              style={{
                marginTop: '1rem',
                padding: '0.75rem 1.5rem',
                background: recommendation.materialId === currentMaterialId 
                  ? 'rgba(16, 185, 129, 0.2)' 
                  : 'linear-gradient(135deg, #10b981, #059669)',
                color: recommendation.materialId === currentMaterialId ? '#10b981' : 'white',
                border: `1px solid ${recommendation.materialId === currentMaterialId ? '#10b981' : 'transparent'}`,
                borderRadius: '8px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {recommendation.materialId === currentMaterialId ? '✓ Currently Selected' : 'Use This Material'}
            </button>
          </div>

          {recommendation.alternatives.length > 0 && (
            <div>
              <h5 style={{ color: '#94a3b8', marginBottom: '1rem' }}>Alternative Options:</h5>
              {recommendation.alternatives.map(alt => (
                <div
                  key={alt.materialId}
                  onClick={() => onSelectMaterial(alt.materialId)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.75rem',
                    background: 'rgba(15, 23, 42, 0.5)',
                    borderRadius: '8px',
                    marginBottom: '0.5rem',
                    cursor: 'pointer',
                    border: `1px solid ${alt.materialId === currentMaterialId ? '#818cf8' : 'transparent'}`,
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, color: '#f1f5f9' }}>{alt.materialName}</div>
                    <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>{alt.tradeoff}</div>
                  </div>
                  <div style={{ 
                    color: alt.costDifference < 0 ? '#10b981' : '#f59e0b',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                  }}>
                    {alt.costDifference < 0 ? 'Save' : '+'}${Math.abs(alt.costDifference).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

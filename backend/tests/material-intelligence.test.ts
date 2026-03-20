import { describe, it, expect } from 'vitest';
import { analyzePromptForParts, calculateTotalPrice, getRecommendedMaterial } from '../src/services/material-intelligence.js';

describe('Material Intelligence Service', () => {
  
  // ============================================
  // PART ANALYSIS TESTS
  // ============================================
  describe('analyzePromptForParts', () => {
    it('should identify body part from robot prompt', () => {
      const parts = analyzePromptForParts('A robot figurine');
      expect(parts.length).toBeGreaterThan(0);
      expect(parts.some(p => p.type === 'structural')).toBe(true);
    });

    it('should identify joints from articulated prompt', () => {
      const parts = analyzePromptForParts('A robot with movable joints');
      expect(parts.some(p => p.type === 'articulated')).toBe(true);
    });

    it('should identify decorative elements', () => {
      const parts = analyzePromptForParts('A statue with detailed face and colors');
      expect(parts.some(p => p.type === 'decorative')).toBe(true);
    });

    it('should identify flexible parts', () => {
      const parts = analyzePromptForParts('A toy with rubber grips');
      expect(parts.some(p => p.type === 'flexible')).toBe(true);
    });

    it('should return default part for simple prompt', () => {
      const parts = analyzePromptForParts('A cube');
      expect(parts).toHaveLength(1);
      expect(parts[0].name).toBe('Complete Model');
    });

    it('should set recommended material for each part', () => {
      const parts = analyzePromptForParts('A robot with metal joints');
      parts.forEach(part => {
        expect(part.recommendedMaterial).toBeDefined();
        expect(part.recommendedMaterialName).toBeDefined();
      });
    });

    it('should calculate price range for each part', () => {
      const parts = analyzePromptForParts('A complex robot');
      parts.forEach(part => {
        expect(part.priceRange).toBeDefined();
        expect(part.priceRange.min).toBeLessThanOrEqual(part.priceRange.max);
      });
    });

    it('should estimate volume for each part', () => {
      const parts = analyzePromptForParts('A large robot');
      parts.forEach(part => {
        expect(part.estimatedVolumeCm3).toBeGreaterThan(0);
      });
    });

    it('should provide rationale for recommendations', () => {
      const parts = analyzePromptForParts('A robot with joints');
      parts.forEach(part => {
        expect(part.rationale).toBeDefined();
        expect(part.rationale.length).toBeGreaterThan(0);
      });
    });
  });

  // ============================================
  // MATERIAL RECOMMENDATION TESTS
  // ============================================
  describe('getRecommendedMaterial', () => {
    it('should recommend plastic for structural parts', () => {
      const rec = getRecommendedMaterial('structural');
      expect(rec.id).toBe(6); // White Plastic
      expect(rec.name).toBe('White Plastic');
    });

    it('should recommend steel for articulated parts', () => {
      const rec = getRecommendedMaterial('articulated');
      expect(rec.id).toBe(77); // Steel
    });

    it('should recommend full color for decorative parts', () => {
      const rec = getRecommendedMaterial('decorative');
      expect(rec.id).toBe(25); // Full Color
    });

    it('should recommend rubber for flexible parts', () => {
      const rec = getRecommendedMaterial('flexible');
      expect(rec.id).toBe(50); // Rubber/TPE
    });

    it('should provide rationale for each recommendation', () => {
      const types = ['structural', 'articulated', 'decorative', 'flexible', 'display'] as const;
      types.forEach(type => {
        const rec = getRecommendedMaterial(type);
        expect(rec.rationale).toBeDefined();
      });
    });
  });

  // ============================================
  // PRICE CALCULATION TESTS
  // ============================================
  describe('calculateTotalPrice', () => {
    it('should calculate price for single part', () => {
      const parts = [
        { id: '1', name: 'Body', materialId: 6, volumeCm3: 30 }
      ];
      const selected = { '1': 6 };
      const total = calculateTotalPrice(parts, selected);
      expect(total).toBeGreaterThan(0);
    });

    it('should calculate price for multiple parts', () => {
      const parts = [
        { id: '1', name: 'Body', materialId: 6, volumeCm3: 30 },
        { id: '2', name: 'Joints', materialId: 77, volumeCm3: 10 }
      ];
      const selected = { '1': 6, '2': 77 };
      const total = calculateTotalPrice(parts, selected);
      // Body: 0.15 * 30 * 100 = 450 cents
      // Joints: 1.20 * 10 * 100 = 1200 cents
      expect(total).toBe(1650);
    });

    it('should use selected material over recommended', () => {
      const parts = [
        { id: '1', name: 'Body', materialId: 6, volumeCm3: 30 }
      ];
      const selected1 = { '1': 6 }; // White Plastic
      const selected2 = { '1': 77 }; // Steel
      
      const total1 = calculateTotalPrice(parts, selected1);
      const total2 = calculateTotalPrice(parts, selected2);
      
      expect(total2).toBeGreaterThan(total1);
    });
  });
});
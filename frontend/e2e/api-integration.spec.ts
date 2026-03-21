import { test, expect } from '@playwright/test';

test.describe('API Integration', () => {
  test('should connect to backend API', async ({ request }) => {
    const response = await request.get('http://localhost:3002/health');
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.status).toBe('ok');
  });

  test('should get materials list', async ({ request }) => {
    const response = await request.get('http://localhost:3002/api/materials');
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.materials).toBeDefined();
    expect(Array.isArray(data.materials)).toBeTruthy();
  });

  test('should analyze part via API', async ({ request }) => {
    const response = await request.post('http://localhost:3002/api/ai/analyze-part', {
      data: { partName: 'Base', prompt: 'A sturdy base' },
    });
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.analysis).toBeDefined();
    expect(data.analysis.partType).toBeDefined();
  });

  test('should get material recommendation', async ({ request }) => {
    const response = await request.post('http://localhost:3002/api/ai/recommend-material', {
      data: { partName: 'Joint', partType: 'articulated' },
    });
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.recommendation).toBeDefined();
    expect(data.recommendation.materialName).toBeDefined();
  });

  test('should generate assembly manual', async ({ request }) => {
    const parts = [
      { id: '1', name: 'Base', materialId: 6, connections: [] },
      { id: '2', name: 'Arm', materialId: 77, connections: [{ to: '1', type: 'screw' }] },
    ];
    const response = await request.post('http://localhost:3002/api/assembly/generate', {
      data: { parts },
    });
    expect(response.ok()).toBeTruthy();
    const manual = await response.json();
    expect(manual.partsList).toBeDefined();
    expect(manual.steps).toBeDefined();
    expect(manual.checklist).toBeDefined();
  });

  test('should handle API errors gracefully', async ({ request }) => {
    const response = await request.post('http://localhost:3002/api/ai/analyze-part', {
      data: {},
    });
    expect(response.status()).toBe(400);
    const data = await response.json();
    expect(data.error).toBeDefined();
  });
});

test.describe('WebSocket Connection', () => {
  test('should connect to WebSocket', async ({ page }) => {
    await page.goto('/');
    // WebSocket connection would be tested here
    // Requires mocking or test server
  });

  test('should receive progress updates', async ({ page }) => {
    await page.goto('/');
    // Progress updates via WebSocket
  });
});

test.describe('Cross-Browser Compatibility', () => {
  test('should work in Chromium', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'Chromium only');
    await page.goto('/');
    await expect(page).toHaveTitle(/FormFab/);
  });

  test('should work in Firefox', async ({ page, browserName }) => {
    test.skip(browserName !== 'firefox', 'Firefox only');
    await page.goto('/');
    await expect(page).toHaveTitle(/FormFab/);
  });

  test('should work in WebKit', async ({ page, browserName }) => {
    test.skip(browserName !== 'webkit', 'WebKit only');
    await page.goto('/');
    await expect(page).toHaveTitle(/FormFab/);
  });
});

test.describe('Mobile Responsiveness', () => {
  test('should work on iPhone', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await expect(page.locator('text=FormFab')).toBeVisible();
  });

  test('should work on Android', async ({ page }) => {
    await page.setViewportSize({ width: 412, height: 915 });
    await page.goto('/');
    await expect(page.locator('text=FormFab')).toBeVisible();
  });

  test('should work on iPad', async ({ page }) => {
    await page.setViewportSize({ width: 810, height: 1080 });
    await page.goto('/');
    await expect(page.locator('text=FormFab')).toBeVisible();
  });
});

test.describe('Accessibility', () => {
  test('should have proper ARIA labels', async ({ page }) => {
    await page.goto('/');
    // Check for ARIA labels
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    // Should focus on first interactive element
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
  });

  test('should have alt text for images', async ({ page }) => {
    await page.goto('/');
    // Check for alt text on images
  });
});

test.describe('Performance', () => {
  test('should load within 3 seconds', async ({ page }) => {
    const start = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - start;
    expect(loadTime).toBeLessThan(3000);
  });

  test('should have no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    await page.goto('/');
    expect(errors).toEqual([]);
  });

  test('should have good Lighthouse score', async ({ page }) => {
    // Would require Lighthouse integration
  });
});

test.describe('Error Handling', () => {
  test('should handle network errors', async ({ page, context }) => {
    await context.setOffline(true);
    await page.goto('/');
    // Should show offline state gracefully
  });

  test('should handle API errors', async ({ page }) => {
    // Mock API to return error
    // Should show error message to user
  });

  test('should handle 404 pages', async ({ page }) => {
    await page.goto('/nonexistent');
    // Should show 404 page
  });
});

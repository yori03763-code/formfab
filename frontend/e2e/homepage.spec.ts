import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/FormFab/);
  });

  test('should display hero section', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Describe it.')).toBeVisible();
    await expect(page.locator('text=Visualize it. Print it.')).toBeVisible();
  });

  test('should display AI features section', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=AI-Powered')).toBeVisible();
    await expect(page.locator('text=3D Preview')).toBeVisible();
    await expect(page.locator('text=Multi-Material')).toBeVisible();
  });

  test('should display generator form', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('textarea[placeholder*="robot"]')).toBeVisible();
    await expect(page.locator('button:text("Generate 3D Model")')).toBeVisible();
  });

  test('should disable generate button when empty', async ({ page }) => {
    await page.goto('/');
    const button = page.locator('button:text("Generate 3D Model")');
    await expect(button).toBeDisabled();
  });

  test('should enable generate button when text entered', async ({ page }) => {
    await page.goto('/');
    await page.fill('textarea', 'A test model');
    const button = page.locator('button:text("Generate 3D Model")');
    await expect(button).toBeEnabled();
  });

  test('should navigate to login page', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Login');
    await expect(page).toHaveURL('/login');
  });

  test('should navigate to signup page', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Signup');
    await expect(page).toHaveURL('/signup');
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page.locator('text=FormFab')).toBeVisible();
  });
});

test.describe('3D Viewer Controls', () => {
  test('should display viewer controls when model loaded', async ({ page }) => {
    await page.goto('/');
    // After model generation, controls should appear
    // This would require mocking the API response
  });

  test('should have X-Ray mode button', async ({ page }) => {
    await page.goto('/');
    // X-Ray button appears after model loads
  });

  test('should have Exploded View button', async ({ page }) => {
    await page.goto('/');
    // Explode button appears after model loads
  });
});

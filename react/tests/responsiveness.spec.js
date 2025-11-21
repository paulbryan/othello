import { test, expect } from '@playwright/test';

test.describe('Othello Responsive Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage and display key elements', async ({ page }) => {
    await expect(page).toHaveTitle(/Othello/);
    await expect(page.locator('header h1')).toBeVisible();
    await expect(page.locator('#board')).toBeVisible();
    await expect(page.locator('.game-controls')).toBeVisible();
  });

  test('should fit content within viewport without horizontal scroll', async ({ page }) => {
    const viewportSize = page.viewportSize();
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    
    // Allow a small margin of error for scrollbars
    expect(bodyWidth).toBeLessThanOrEqual(viewportSize.width + 1);
  });

  test('should allow game interaction on touch/mobile', async ({ page }) => {
    // Start a new game to ensure clean state
    await page.click('#newGame');
    
    // Find a valid move (highlighted cell)
    // Find a valid move (highlighted cell)
    const validMove = page.locator('.cell.valid-move').first();
    await expect(validMove).toBeVisible();
    
    // Get position to verify later
    const row = await validMove.getAttribute('data-row');
    const col = await validMove.getAttribute('data-col');

    // Click it
    await validMove.click();
    
    // Verify move was made (cell should contain a disc)
    // Note: The cell will no longer have 'valid-move' class, so we select by position
    const cell = page.locator(`.cell[data-row="${row}"][data-col="${col}"]`);
    await expect(cell.locator('.disc')).toBeVisible();
  });

  test('should display modals correctly', async ({ page }) => {
    // Open Color Modal
    await page.click('text=🎨 Colors');
    const modal = page.locator('.modal-content').first();
    await expect(modal).toBeVisible();
    
    // Check modal width is appropriate
    const modalBox = await modal.boundingBox();
    const viewportSize = page.viewportSize();
    
    // Modal should not be wider than viewport
    expect(modalBox.width).toBeLessThan(viewportSize.width);
    
    // Close modal
    await page.click('text=Cancel');
    await expect(modal).not.toBeVisible();
  });

  test('should have board fully visible in viewport', async ({ page }) => {
    const board = page.locator('#board');
    await expect(board).toBeVisible();
    
    const box = await board.boundingBox();
    const viewport = page.viewportSize();
    
    // Check if board is within viewport bounds
    expect(box.y).toBeGreaterThanOrEqual(0);
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.y + box.height).toBeLessThanOrEqual(viewport.height);
    expect(box.x + box.width).toBeLessThanOrEqual(viewport.width);
  });

  test('should show New Game button on iPhone SE (small screen)', async ({ page }) => {
    // Set viewport to iPhone SE dimensions
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload(); // Reload to apply media queries if needed

    const newGameBtn = page.locator('#newGame');
    await expect(newGameBtn).toBeVisible();
    
    // Ensure it's within the viewport
    const box = await newGameBtn.boundingBox();
    const viewport = page.viewportSize();
    
    expect(box.y + box.height).toBeLessThanOrEqual(viewport.height);
  });
});

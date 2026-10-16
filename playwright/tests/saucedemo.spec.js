import { test, expect } from '@playwright/test';

async function login(page, u = 'standard_user', p = 'secret_sauce') {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill(u);
  await page.locator('[data-test="password"]').fill(p);
  await page.locator('[data-test="login-button"]').click();
}

test('TC01 login success', async ({ page }) => {
  await login(page);
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('TC02 wrong username', async ({ page }) => {
  await login(page, 'standard', 'secret_sauce');
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toContainText('do not match');
});

test('TC03 wrong username & password', async ({ page }) => {
  await login(page, 'standard', 'secret');
  await expect(page.locator('[data-test="error"]')).toContainText('do not match');
});

test('TC04 empty username', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
});

test('TC05 empty password', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toContainText('Password is required');
});

test('TC06 logout', async ({ page }) => {
  await login(page);
  await page.locator('#react-burger-menu-btn').click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
});

test('TC07 add to cart & remove', async ({ page }) => {
  await login(page);
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');
  await page.locator('.shopping_cart_link').click();
  await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
  await expect(page.getByText('Sauce Labs Bike Light')).toHaveCount(0);
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
});

test('TC08 checkout', async ({ page }) => {
  await login(page);
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('.shopping_cart_link').click();
  await page.locator('[data-test="checkout"]').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
  await page.locator('[data-test="firstName"]').fill('Puv');
  await page.locator('[data-test="lastName"]').fill('Lim');
  await page.locator('[data-test="postalCode"]').fill('12345');
  await page.locator('[data-test="continue"]').click();
  await expect(page.getByText('Checkout: Overview')).toBeVisible();
  await page.locator('[data-test="finish"]').click();
  await expect(page.locator('.complete-header')).toContainText('Thank you for your order!');
});

test('TC09 sort price low to high', async ({ page }) => {
  await login(page);
  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
  await expect(page.locator('.inventory_item_price').first()).toHaveText('$7.99');
});

test('TC10 sort name Z to A', async ({ page }) => {
  await login(page);
  await page.locator('[data-test="product-sort-container"]').selectOption('za');
  await expect(page.locator('.inventory_item_name').first()).toHaveText('Test.allTheThings() T-Shirt (Red)');
});

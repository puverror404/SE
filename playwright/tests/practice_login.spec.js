import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('login (getByLabel)', async ({ page }) => {
  await page.goto('https://practicetestautomation.com/practice-test-login/');
  await page.getByLabel('Username').fill('student');
  await page.getByLabel('Password').fill('Password123');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page).toHaveURL('https://practicetestautomation.com/logged-in-successfully/');
});

test('login (id locator)', async ({ page }) => {
  await page.goto('https://practicetestautomation.com/practice-test-login/');
  await page.locator('#username').fill('student');
  await page.locator('#password').fill('Password123');
  await page.getByRole('button', { name: 'Submit' }).click();
  expect(page.url()).toBe('https://practicetestautomation.com/logged-in-successfully/');
});

test('login-username-wrong', async ({ page }) => {
  await page.goto('https://practicetestautomation.com/practice-test-login/');
  await page.getByLabel('Username').fill('wrongusername');
  await page.getByLabel('Password').fill('Password123');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('#error')).toHaveText('Your username is invalid!');
});

test('login-password-wrong', async ({ page }) => {
  await page.goto('https://practicetestautomation.com/practice-test-login/');
  await page.getByLabel('Username').fill('student');
  await page.getByLabel('Password').fill('wrongpassword');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('#error')).toHaveText('Your password is invalid!');
});

// ---- Page Object style ----
test.describe('login (page object)', () => {
  test('valid', async ({ page }) => {
    const lp = new LoginPage(page);
    await lp.goto();
    await lp.login('student', 'Password123');
    await lp.expectSuccess();
  });
  test('wrong username', async ({ page }) => {
    const lp = new LoginPage(page);
    await lp.goto();
    await lp.login('incorrectUser', 'Password123');
    await lp.expectError('Your username is invalid!');
  });
  test('wrong password', async ({ page }) => {
    const lp = new LoginPage(page);
    await lp.goto();
    await lp.login('student', 'incorrectPassword');
    await lp.expectError('Your password is invalid!');
  });
});

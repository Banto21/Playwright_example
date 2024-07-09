import { Page, expect } from '@playwright/test';

export const logIn = async (page: Page, email: string, password: string): Promise<void> => {
  await page.getByTestId('nav-sign-in').click();
  await page.getByTestId('email').fill(email);
  await page.getByTestId('password').fill(password);
  await page.getByTestId('login-submit').click();
  await page.waitForTimeout(5000);
  await page.waitForLoadState('domcontentloaded');
  await expect(page.getByTestId('page-title')).toContainText('My account');
};

export const randomEmail =  (): string => {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result.concat('@example.com');
}
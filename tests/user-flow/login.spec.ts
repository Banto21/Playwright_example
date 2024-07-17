import { test, expect} from '@playwright/test';

import { logIn } from '../helpers/auth.helpers';


test('Login with correct credentials',
  {tag: "@auth"},
   async ({ page }) => {
  await page.goto(`/`);
  await logIn(page, process.env.EMAIL!, process.env.PASSWORD!);
  await expect(page.getByTestId('page-title')).toContainText('My account');
  await page.close();
});

test('Login with invalid email',
  {tag: "@auth"},
   async ({ page }) => {
  await page.goto(`/`);
  await logIn(page, process.env.EMAIL!.concat('pl'), process.env.PASSWORD!);
  await expect(page.getByTestId('login-error')).toContainText('Invalid email or password');
  await page.close();
});

test('Login with invalid password',
  {tag: "@auth"},
   async ({ page }) => {
  await page.goto(`/`);
  await logIn(page, process.env.EMAIL!, process.env.PASSWORD!.concat('x'));
  await expect(page.getByTestId('login-error')).toContainText('Invalid email or password');
  await page.close();
});
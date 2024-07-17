import { test, expect} from '@playwright/test';

import { logIn } from '../helpers/auth.helpers';


// Full page visual regression test
test('Login page visual regression', 
  {tag: ["@visual",  "@auth"]},
   async ({page}) => {
  await page.goto(`/auth/login`);
  await expect(page).toHaveScreenshot('login-page.png', {animations: 'disabled', fullPage: true});
  await page.close();
}
)


// Select specifif UI element to test
test('Error message for invalid email', 
  {tag: ["@visual", "@auth"]},
  async ({ page }) => {
  await page.goto(`/`);
  await logIn(page, process.env.EMAIL!.concat('pl'), process.env.PASSWORD!);
  await expect(page.getByTestId('login-error')).toHaveScreenshot('error-message.png', {animations: 'disabled'});
  await page.close();
});
import { test} from '@playwright/test';

import { logIn } from '../helpers/auth.helpers';


test('do login @auth', async ({ page }) => {
  await page.goto(`/`);
  await logIn(page, process.env.EMAIL!, process.env.PASSWORD!);
  await page.close();
});
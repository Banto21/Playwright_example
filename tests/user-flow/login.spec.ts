import { test} from '@playwright/test';

// import { STORAGE_STATE } from '../../playwright.config';
import { logIn } from '../helpers/auth.helpers';


test('do login @auth', async ({ page }) => {
  await page.goto(`/`);
  await logIn(page, process.env.EMAIL!, process.env.PASSWORD!);
  // await checkIfLoggedIn(page);
  // await page.context().storageState({ path: STORAGE_STATE });
  await page.close();
});
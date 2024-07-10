import { chromium, type FullConfig, selectors } from '@playwright/test';
import { registerUser } from './helpers/auth.helpers';
import { validUser } from './test-data/user-register-data';

async function globalSetup(config: FullConfig) {
  const { storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await browser.newPage();
  try {
    await context.tracing.start({ screenshots: true, snapshots: true });
    selectors.setTestIdAttribute('data-test');
    await registerUser(page, validUser);
    await page.context().storageState({ path: storageState as string });
    await context.tracing.stop({
      path: './test-results/setup-trace.zip',
    });
    await browser.close();
  } catch (error) {
    await context.tracing.stop({
      path: './test-results/failed-setup-trace.zip',
    });
    await browser.close();
    throw error;
  }
}

export default globalSetup;
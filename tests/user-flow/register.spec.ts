import { test, expect} from '@playwright/test';
import { validUser } from '../test-data/user-register-data';
import { randomEmail } from '../helpers/auth.helpers';

test('Register with valid credentials @auth', async({page}) => {
  await page.goto(`/`);
  await page.getByTestId('nav-sign-in').click();
  await page.getByTestId('register-link').click();
  
  await page.getByTestId('first-name').fill(validUser.name);
  await page.getByTestId('last-name').fill(validUser.lastName);
  await page.getByTestId('dob').fill(validUser.date);
  await page.getByTestId('address').fill(validUser.address);
  await page.getByTestId('postcode').fill(validUser.postCode);
  await page.getByTestId('city').fill(validUser.city);
  await page.getByTestId('country').selectOption(validUser.countryCode);
  await page.getByTestId('state').fill(validUser.state);
  await page.getByTestId('phone').fill(validUser.phone);

  const randomEemail = randomEmail();
  process.env.EMAIL = randomEemail!;
  process.env.PASSWORD = validUser.password!;
  await page.getByTestId('email').fill(randomEemail);
  await page.getByTestId('password').fill(validUser.password);

  await page.getByTestId('register-submit').click();
  await page.waitForLoadState('domcontentloaded'); 
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();


})
import { Page, expect } from '@playwright/test';

export const logIn = async (page: Page, email: string, password: string): Promise<void> => {
  await page.getByTestId('nav-sign-in').click();
  await page.getByTestId('email').fill(email);
  await page.getByTestId('password').fill(password);
  await page.getByTestId('login-submit').click();
  await page.waitForTimeout(5000);
  await page.waitForLoadState('domcontentloaded');
};

export const randomEmail =  (): string => {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result.concat('@example.com');
}

export const registerUser = async (page : Page, user: any) => {
  await page.goto(`${process.env.BASE_URL}`);
  await page.getByTestId('nav-sign-in').click();
  await page.getByTestId('register-link').click();
  
  await page.getByTestId('first-name').fill(user.name);
  await page.getByTestId('last-name').fill(user.lastName);
  await page.getByTestId('dob').fill(user.date);
  await page.getByTestId('address').fill(user.address);
  await page.getByTestId('postcode').fill(user.postCode);
  await page.getByTestId('city').fill(user.city);
  await page.getByTestId('country').selectOption(user.countryCode);
  await page.getByTestId('state').fill(user.state);
  await page.getByTestId('phone').fill(user.phone);

  const randomEemail = randomEmail();
  process.env.EMAIL = randomEemail!;
  process.env.PASSWORD = user.password!;
  await page.getByTestId('email').fill(randomEemail);
  await page.getByTestId('password').fill(user.password);

  await page.getByTestId('register-submit').click();
  await page.waitForLoadState('domcontentloaded'); 
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
};
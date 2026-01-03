import {test as base, expect} from '@playwright/test';
import {LoginPage} from '../pages/loginPage';
import {HomePage} from '../pages/homePage';
import {CheckoutPage} from '../pages/checkoutPage';
import {APP_URLS} from '../testData/testConstants';
import dotenv from 'dotenv';

dotenv.config();


type TestFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  checkoutPage: CheckoutPage;
};


export const test = base.extend<TestFixtures>({
//Fixture: LoginPage instance
  loginPage: async ({page}, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

//Fixture: HomePage instance  
  homePage: async ({page}, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

// Fixture: CheckoutPage instance
  checkoutPage: async ({page}, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
});

//Setup hook: Runs before each test
test.beforeEach(async ({page, loginPage}) => {
  await loginPage.navigatetoLoginPage();
  await loginPage.loginToSauceLabs(process.env.SAUCE_USERNAME!, process.env.SAUCE_PASSWORD!);
  await page.goto(APP_URLS.INVENTORY_PAGE);
});

export {expect};

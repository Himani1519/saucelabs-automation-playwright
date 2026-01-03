import {Page, expect} from '@playwright/test';


export class LoginPage {
    readonly page: Page;

    constructor(page:Page){
        this.page = page;
    }
    async navigatetoLoginPage() {
        await this.page.goto('/');
    }

    async loginToSauceLabs(username: string, password: string) {
        await this.page.getByPlaceholder('Username').fill(username);
        await this.page.getByPlaceholder('Password').fill(password);
        await this.page.click('#login-button');
    }

    async validateHomePage(){
        return await this.page.locator('//div[@class= "app_logo"]').isVisible();
    }
}
import {Page, expect} from '@playwright/test';


export class CheckoutPage {
    readonly page: Page;

    constructor(page:Page){
        this.page = page;
    }


    async clickCheckoutButton(){
        await this.page.locator('//button[text()="Checkout"]').click();
    }

    async validateCheckoutPage(){
        return await this.page.locator('//span[text()="Checkout: Your Information"]').isVisible();
    }

    async startCheckout(): Promise<boolean> {
        await this.clickCheckoutButton();
        return await this.validateCheckoutPage();
    }

    async enterCheckoutInformation(firstName: string, lastName: string, postalCode: string){
        await this.page.getByPlaceholder('First Name').fill(firstName);
        await this.page.getByPlaceholder('Last Name').fill(lastName);
        await this.page.getByPlaceholder('Zip/Postal Code').fill(postalCode);
        await this.page.click('#continue');
    }

    async submitCheckoutInformation(firstName: string, lastName: string, postalCode: string): Promise<string | null> {
        await this.enterCheckoutInformation(firstName, lastName, postalCode);
        return await this.checkoutPageTitle();
    }

    async checkoutPageTitle(){
        const title = await this.page.locator('//span[@class="title"]').textContent();
        return title;
    }

    async clickFinishButton(){
        await this.page.locator('//button[text()="Finish"]').click();
    }

    async validateOrderCompletion(){
        const orderMessage = this.page.locator('//h2[text()="Thank you for your order!"]');
        await expect(orderMessage).toBeVisible();
        return true;
    }

    async completeCheckout(): Promise<boolean> {
        await this.clickFinishButton();
        return await this.validateOrderCompletion();
    }

    async verifyItemNamesInCart(itemNames: string[]): Promise<boolean> {
        for (const itemName of itemNames) {
            const isVisible = await this.page.locator(`//div[text()="${itemName}"]`).isVisible();
            if (!isVisible) {
                return false;
            }
        }
        return true;
    }

    async verifyAndStartCheckout(itemNames: string[]): Promise<boolean> {
        const itemsVerified = await this.verifyItemNamesInCart(itemNames);
        const checkoutStarted = await this.startCheckout();
        return itemsVerified && checkoutStarted;
    }

    async getCheckoutTotal(): Promise<number> {
        const subtotalText = await this.page.locator('//div[@class="summary_subtotal_label"]').textContent();
        if (subtotalText) {
            const priceString = subtotalText.replace('Item total: $', '').trim();
            return parseFloat(priceString);
        }
        return 0;
    }

    async verifyTotalPrice(expectedTotal: number): Promise<boolean> {
        const actualTotal = await this.getCheckoutTotal();
        console.log('Expected subtotal:', expectedTotal);
        console.log('Actual subtotal from checkout:', actualTotal);
        return actualTotal === expectedTotal;
    }
    
}
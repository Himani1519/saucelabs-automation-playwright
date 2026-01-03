import {Page, expect} from '@playwright/test';


export class HomePage {
    readonly page: Page;
    private selectedItemNames: string[] = [];
    private selectedItemPrices: number[] = [];

    constructor(page:Page){
        this.page = page;
    }

    async addItemToCart(count: number = 3){
        for (let i = 0; i < count; i++) {
            const item = this.page.locator('//div[@class="inventory_item"]').nth(i);
            const itemName = await item.locator('.inventory_item_name').textContent();
            const itemPrice = await item.locator('.inventory_item_price').textContent();
            
            if (itemName) {
                this.selectedItemNames.push(itemName.trim());
            }
            if (itemPrice) {
                const price = parseFloat(itemPrice.replace('$', ''));
                this.selectedItemPrices.push(price);
            }
            await item.locator('button').click();
        }
    }

    getSelectedItemNames(): string[] {
        return this.selectedItemNames;
    }

    getSelectedItemPrices(): number[] {
        return this.selectedItemPrices;
    }

    getTotalPrice(): number {
    let total = 0;
    this.selectedItemPrices.forEach(price => total += price);
    return total;
   }

    getCartData() {
        return {
            items: this.getSelectedItemNames(),
            prices: this.getSelectedItemPrices(),
            total: this.getTotalPrice()
        };
    }

    async verifyRemoveButton(){
        const removeButttonText = await this.page.locator('#remove-sauce-labs-backpack').textContent();
        return removeButttonText
        
    }

    async verifyAddToCartCount(){
        const cartCount = await this.page.locator('//span[@class="shopping_cart_badge"]').textContent();
        return cartCount
        
    }

    async verifyItemsAddedToCart(expectedButtonText: string, expectedCount: string): Promise<boolean> {
        const buttonText = await this.verifyRemoveButton();
        const cartCount = await this.verifyAddToCartCount();
        return buttonText === expectedButtonText && cartCount === expectedCount;
    }

    async clickOnCartIcon(){
        await this.page.locator('.shopping_cart_link').click();
    }

    async removeFirstItem(){
        const firstItem = this.page.locator('//div[@class="inventory_item"]').first();
        await firstItem.locator('button:has-text("Remove")').click();
    }

    async openItemDetails(index: number){
        const item = this.page.locator('//div[@class="inventory_item"]').nth(index);
        await item.locator('.inventory_item_name').click();
    }

    async addFromDetailsPage(){
        const itemName = await this.page.locator('[data-test="inventory-item-name"]').textContent();
        const itemPrice = await this.page.locator('[data-test="inventory-item-price"]').textContent();

        if (itemName) {
            this.selectedItemNames.push(itemName.trim());
        }
        if (itemPrice) {
            const price = parseFloat(itemPrice.replace('$', ''));
            this.selectedItemPrices.push(price);
        }
        await this.page.locator('//button[contains(text(), "Add to cart")]').click();
    }

        async goBack(){
            await this.page.locator('#back-to-products').click();
        }
    }
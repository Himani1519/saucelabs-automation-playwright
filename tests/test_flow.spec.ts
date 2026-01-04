import {test, expect} from './fixtures';
import {APP_URLS, TEST_USERS, PAGE_LABELS, ADD_TO_CART_CONFIG} from '../testData/testConstants';

test.describe('SauceDemo Login Flow', () => {
    //User adds 3 items to cart and completes a full checkout flow
    //This is the basic happy path scenario
    test('Happy Flow - Basic Checkout', async ({page, homePage, checkoutPage}) => {
        await homePage.addItemToCart(ADD_TO_CART_CONFIG.ITEMS_TO_ADD_BASIC);
        const { items: selectedItems, prices: selectedPrices, total: totalPrice } = homePage.getCartData();
        console.log('Selected items:', selectedItems,'Prices:', selectedPrices, 'Total Price:', totalPrice);

        // Verify items are added
        await expect(homePage.verifyItemsAddedToCart(PAGE_LABELS.REMOVE_BUTTON_TEXT, '3')).resolves.toBeTruthy();
        
        // Navigate to cart
        await homePage.clickOnCartIcon();
        
        // Verify item names in cart
        await expect(checkoutPage.verifyItemNamesInCart(selectedItems)).resolves.toBeTruthy();
        
        await checkoutPage.clickCheckoutButton();
        await expect(checkoutPage.validateCheckoutPage()).resolves.toBeTruthy();
        
        // Enter checkout information
        await checkoutPage.enterCheckoutInformation(TEST_USERS.HAPPY_FLOW.firstName, TEST_USERS.HAPPY_FLOW.lastName, TEST_USERS.HAPPY_FLOW.postalCode);
        await expect(page).toHaveURL(APP_URLS.CHECKOUT_OVERVIEW_PAGE);
        await expect(checkoutPage.checkoutPageTitle()).resolves.toBe(PAGE_LABELS.CHECKOUT_OVERVIEW_TITLE);
        
        // Verify item names in checkout overview
        await expect(checkoutPage.verifyItemNamesInCart(selectedItems)).resolves.toBeTruthy();
        
        // Verify total price
        const expectedTotal = homePage.getTotalPrice();
        await expect(checkoutPage.verifyTotalPrice(expectedTotal)).resolves.toBeTruthy();
        console.log('Verified checkout total: $' + expectedTotal.toFixed(2));
        
        // Complete checkout
        await expect(checkoutPage.completeCheckout()).resolves.toHaveText('Thank you for your order!');
    });

    //User adds 3 items, removes 1 from cart, then verifies the cart updates correctly
    //This tests cart modification functionality
    test('Complex Happy Flow - Cart Modification & Checkout', async ({page, homePage, checkoutPage}) => {
        
        // Add 3 random items to cart
        await homePage.addItemToCart(ADD_TO_CART_CONFIG.ITEMS_TO_ADD_BASIC);
        const selectedItems = homePage.getSelectedItemNames();
        console.log('Selected items:', selectedItems);
        
        // Verify 3 items added
        await expect(homePage.verifyAddToCartCount()).resolves.toBe('3');
        
        // Remove one item
        await homePage.removeFirstItem();
        
        // Verify cart count is now 2
        await expect(homePage.verifyAddToCartCount()).resolves.toBe('2');
        await homePage.clickOnCartIcon();
        await expect(page).toHaveURL(APP_URLS.CART_PAGE);
        
        // Verify only 2 items are in cart
        const remainingItems = selectedItems.slice(1);
        await expect(checkoutPage.verifyItemNamesInCart(remainingItems)).resolves.toBeTruthy();
        
        // Start checkout
        await checkoutPage.clickCheckoutButton();
        await expect(checkoutPage.validateCheckoutPage()).resolves.toBeTruthy();
        
        // Enter checkout information
        await checkoutPage.enterCheckoutInformation(TEST_USERS.HAPPY_FLOW.firstName, TEST_USERS.HAPPY_FLOW.lastName, TEST_USERS.HAPPY_FLOW.postalCode);
        await expect(page).toHaveURL(APP_URLS.CHECKOUT_OVERVIEW_PAGE);
        await expect(checkoutPage.checkoutPageTitle()).resolves.toBe(PAGE_LABELS.CHECKOUT_OVERVIEW_TITLE);
        
        // Verify item names in checkout overview
        await expect(checkoutPage.verifyItemNamesInCart(remainingItems)).resolves.toBeTruthy();
        
        // Complete checkout
        await expect(checkoutPage.completeCheckout()).resolves.toHaveText('Thank you for your order!');
    });

    // User adds items from inventory, opens product details page, adds another item,
    // then returns to inventory before completing checkout
    // This tests the product details page flow
    test('Complex Happy Flow - Product Details & Multi-Step Checkout', async ({page, homePage, checkoutPage}) => {
        
        // Add 2 more random items
        await homePage.addItemToCart(ADD_TO_CART_CONFIG.ITEMS_TO_ADD_COMPLEX);

        // Open 3rd item details
        await homePage.openItemDetails(2);
        
        // Add item from details page
        await homePage.addFromDetailsPage();
        console.log('Selected items so far:', homePage.getSelectedItemNames());
        
        // Go back to inventory
        await homePage.goBack();
        await page.waitForTimeout(ADD_TO_CART_CONFIG.WAIT_TIME_MS);
        
        const { items: selectedItems, prices: selectedPrices, total: totalPrice } = homePage.getCartData();

        
        // Verify 3 items added
        await expect(homePage.verifyAddToCartCount()).resolves.toBe('3');
        await homePage.clickOnCartIcon();
        
        // Verify item names in cart
        await expect(checkoutPage.verifyItemNamesInCart(selectedItems)).resolves.toBeTruthy();
        await checkoutPage.clickCheckoutButton();
        await expect(checkoutPage.validateCheckoutPage()).resolves.toBeTruthy();
        
        // Enter checkout information
        await checkoutPage.enterCheckoutInformation(TEST_USERS.COMPLEX_FLOW.firstName, TEST_USERS.COMPLEX_FLOW.lastName, TEST_USERS.COMPLEX_FLOW.postalCode);
        await expect(page).toHaveURL(APP_URLS.CHECKOUT_OVERVIEW_PAGE);
        await expect(checkoutPage.checkoutPageTitle()).resolves.toBe(PAGE_LABELS.CHECKOUT_OVERVIEW_TITLE);
        
        // Verify item names in checkout overview
        await expect(checkoutPage.verifyItemNamesInCart(selectedItems)).resolves.toBeTruthy();
        
       // Complete checkout
        await expect(checkoutPage.completeCheckout()).resolves.toHaveText('Thank you for your order!');
        
    });
});
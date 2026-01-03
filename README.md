# Sauce Labs Automation

## **Overview:**

**Sauce Labs Automation** is an end-to-end automation test suite built with **Playwright** and **TypeScript**, using the **Page Object Model (POM)** framework for maintainable and scalable test automation.

This project focuses on automating the complete checkout flow on the [SauceDemo](https://www.saucedemo.com) website, demonstrating real-world e-commerce testing scenarios including user authentication, product selection, cart management, and order completion.

## **Features**

- **Page Object Model Framework** - Separates test logic from page interactions for better maintainability
- **End-to-End Testing** - Complete user journey automation from login to order completion
- **Cross-browser Support** - Chrome, Firefox, Edge, and WebKit
- **Dynamic Item Selection** - Randomly selects items and validates them throughout the checkout flow
- **Cart Management** - Tests for adding/removing items and verifying cart counts
- **Environment Configuration** - Uses `.env` for credential management
- **TypeScript Support** - Full type safety for robust test automation
- **Playwright Test Runner** - Built-in assertions, parallelization, and reporting

---

## **Project Structure**

```plaintext
saucelabs-automation-playwright/
│
├── pages/                       # Page Object Models
│   ├── loginPage.ts            # Login page interactions
│   ├── homePage.ts             # Inventory/home page interactions
│   └── checkoutPage.ts         # Checkout flow interactions
│
├── tests/                       # Test specifications
│   ├── test_flow.spec.ts       # End-to-end test scenarios
│   └── fixtures.ts             # Playwright test fixtures with auto-login setup
│
├── testData/                    # Test data and constants
│   └── testConstants.ts        # Centralized constants (URLs, users, labels, config)
│
├── playwright.config.ts         # Playwright configuration
├── package.json                 # Project dependencies & scripts
├── .env                         # Environment variables (credentials)
└── README.md                    # Project documentation
```

---

## **Test Coverage**

### **Test 1: Happy Flow - Basic Checkout**

- **Description**: Standard end-to-end purchase flow with 3 randomly selected items
- **Steps**:
  - Login with valid credentials
  - Select 3 random items from inventory
  - Add items to cart and verify count
  - Navigate to cart and validate item names
  - Proceed to checkout
  - Enter shipping information
  - Verify order overview with total price
  - Complete order and confirm success

### **Test 2: Complex Happy Flow - Cart Modification & Checkout**

- **Description**: User adds items, removes one from cart, and verifies consistency before checkout
- **Steps**:
  - Login to application
  - Add 3 random items to cart
  - Navigate to cart
  - Remove the first item and verify cart count updates to 2
  - Validate remaining items in cart
  - Proceed through checkout with updated items
  - Complete order successfully

### **Test 3: Complex Happy Flow - Product Details & Multi-Step Checkout**

- **Description**: User interacts with product detail pages, adds items from multiple sources, and completes checkout
- **Steps**:
  - Login to application
  - Add 2 random items to cart
  - Open 3rd item details page
  - Add item directly from product details view
  - Verify all 3 items in cart
  - Proceed through checkout workflow
  - Complete order with full verification

---

## **Prerequisites**

- Node.js (v14 or higher)
- npm or yarn
- Git (optional, for version control)

---

## **Installation**

1. **Install dependencies**:

```bash
npm install
```

2. **Install Playwright browsers**:

```bash
npx playwright install
```

---

## **Configuration**

1. **Create `.env` file** in the project root

2. **Update `playwright.config.ts`** if needed for custom configurations (base URL, timeouts, etc.)

---

## **Running Tests**

### **Run all tests**

**By default each test case will run parallely on 3 different browsers, so as we have 3 test cases, will see 9 test case ran.**

```bash
npx playwright test
```

### **Run in specific browser**

```bash
npx playwright test --project=chromium
```

### **Run tests in headed mode** (see browser)

```bash
npx playwright test --headed
```

### **Run in UI Mode** (debug & watch)

```bash
npx playwright test --ui
```

### **Generate HTML Report**

```bash
npx playwright show-report
```

---

## **Supported Browsers**

1. **Chromium** (default)
2. **Firefox**
3. **WebKit** (Safari)

---

## **Project Dependencies**

- `@playwright/test` - Test framework and utilities
- `dotenv` - Environment variable management
- `typescript` - TypeScript support

### Run tests with coverage report

```bash
npm install --save-dev c8
npx c8 --reporter=html npx playwright test
```

The coverage report will be generated in the `coverage/` folder. Open `coverage/index.html` to view detailed coverage statistics.

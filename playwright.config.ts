import {defineConfig,devices} from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 30 *1000,
    reporter: [
        ['html'],
        ['list']
    ],
    use: {
        headless: false,
        baseURL : 'https://www.saucedemo.com/',
        viewport: {width: 1280, height: 720},
        actionTimeout: 10 * 1000,
        ignoreHTTPSErrors: true,    
    },
    projects: [
        {
            name: 'chromium',
            use: {...devices['Desktop Chrome']}
        },
        {
            name: 'firefox',
            use: {...devices['Desktop Firefox']}
        },
        {
            name: 'webkit',
            use: {...devices['Desktop Safari']}
        }
    ]
});
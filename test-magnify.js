const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    // Open the website
    await page.goto('file:///D:/HireMyTrip/WebSites_Temp/Use-Full-Web-Site/%23Nishant-Bhai-Webiste-2/WB-Main/index.html');

    // Wait for preloader to finish
    await page.waitForTimeout(3000);

    // Move mouse to test magnification effect
    const serviceCard = await page.locator('.service-card').first();
    await serviceCard.hover();

    // Take screenshot
    await page.screenshot({ path: 'magnify-test.png' });

    console.log('Screenshot saved! Check magnify-test.png');
    console.log('Browser will stay open for 10 seconds for manual testing...');

    await page.waitForTimeout(10000);
    await browser.close();
})();

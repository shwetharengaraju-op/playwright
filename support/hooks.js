require('dotenv').config();
const { Before, After, Status } = require('@cucumber/cucumber');
const fs = require('fs');
const BrowserManager = require('../utils/browserManager');

Before(async function () {
    const browserName = process.env.BROWSER || 'chromium';

    const browserDetails = await BrowserManager.launchBrowser(browserName);

    this.browser = browserDetails.browser;
    this.context = browserDetails.context;
    this.page = browserDetails.page;
});

After(async function (scenario) {
    if (scenario.result.status === Status.FAILED) {
        const screenshotPath = `screenshots/${Date.now()}.png`;

        await this.page.screenshot({
            path: screenshotPath,
            fullPage: true
        });

        const screenshot = fs.readFileSync(screenshotPath);
        await this.attach(screenshot, 'image/png');
    }

    await this.page.close();
    await this.context.close();
    await this.browser.close();
});
const { chromium, firefox, webkit } = require('playwright');

class BrowserManager {
    static async launchBrowser(browserName = 'chromium') {
        const browsers = { chromium, firefox, webkit };

        const browser = await browsers[browserName].launch({
            headless: false,
            args: browserName === 'chromium' ? ['--start-maximized'] : []
        });

        const context = await browser.newContext({
            viewport: null,
            recordVideo: { dir: 'videos/' }
        });

        const page = await context.newPage();

        return { browser, context, page };
    }
}

module.exports = BrowserManager;
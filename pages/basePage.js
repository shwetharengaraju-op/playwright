
//base page helps us as the building block for all the pages
//changes made in git hub
class BasePage{
    constructor(page){
        this.page =page
    }
    async openUrl(url) {
        await this.page.goto(url);
    }

    async clickElement(locator) {
        await locator.waitFor({ state: 'visible' });
        await locator.click();
    }

    async enterText(locator, value) {
        await locator.waitFor({ state: 'visible' });
        await locator.fill(value);
    }

    async getText(locator) {
        await locator.waitFor({ state: 'visible' });
        return await locator.textContent();
    }

    // =========================
    // Navigation
    // =========================
    async openUrl(url) {
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    }

    async reloadPage() {
        await this.page.reload();
    }

    async getTitle() {
        return await this.page.title();
    }

    // =========================
    // 🖱️ Actions
    // =========================
    async click(locator) {
        await locator.waitFor({ state: 'visible' });
        await locator.click();
    }

    async type(locator, value) {
        await locator.waitFor({ state: 'visible' });
        await locator.fill(value);
    }

    async clearAndType(locator, value) {
        await locator.fill('');
        await locator.fill(value);
    }

    async hover(locator) {
        await locator.hover();
    }

    async doubleClick(locator) {
        await locator.dblclick();
    }

    // =========================
    //  Keyboard
    // =========================
    async pressKey(key) {
        await this.page.keyboard.press(key);
    }

    // =========================
    //  Validations
    // =========================
    async isVisible(locator) {
        return await locator.isVisible();
    }

    async getText(locator) {
        await locator.waitFor({ state: 'visible' });
        return await locator.textContent();
    }

    async getAttribute(locator, attr) {
        return await locator.getAttribute(attr);
    }

    // =========================
    //  Waits
    // =========================
    async waitForElement(locator) {
        await locator.waitFor({ state: 'visible' });
    }

    async waitForTimeout(ms) {
        await this.page.waitForTimeout(ms);
    }

    async waitForURL(urlPart) {
        await this.page.waitForURL(`**${urlPart}**`);
    }

    // =========================
    //  Retry (Flaky handling)
    // =========================
    async retryAction(action, retries = 3) {
        for (let i = 0; i < retries; i++) {
            try {
                return await action();
            } catch (error) {
                if (i === retries - 1) throw error;
                console.log(`Retrying... Attempt ${i + 1}`);
            }
        }
    }

    // =========================
    //  Scroll
    // =========================
    async scrollToElement(locator) {
        await locator.scrollIntoViewIfNeeded();
    }

    async scrollToBottom() {
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    }

    // =========================
    //  File Upload / Download
    // =========================
    async uploadFile(locator, filePath) {
        await locator.setInputFiles(filePath);
    }

    async downloadFile(clickLocator) {
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            clickLocator.click()
        ]);

        const path = await download.path();
        return path;
    }

    // =========================
    //  Window / Tab Handling
    // =========================
    async handleNewTab(clickLocator) {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            clickLocator.click()
        ]);

        await newPage.waitForLoadState();
        return newPage;
    }

    // =========================
    //  Frame Handling
    // =========================
    getFrame(frameLocator) {
        return this.page.frameLocator(frameLocator);
    }

    // =========================
    //  Alerts
    // =========================
    async handleAlert(action = 'accept') {
        this.page.on('dialog', async dialog => {
            console.log(dialog.message());
            if (action === 'accept') {
                await dialog.accept();
            } else {
                await dialog.dismiss();
            }
        });
    }

    // =========================
    //  Screenshot
    // =========================
    async takeScreenshot(path) {
        await this.page.screenshot({ path, fullPage: true });
    }

    // =========================
    //  Network Handling (API Mock)
    // =========================
    async interceptAPI(url, response) {
        await this.page.route(url, route => {
            route.fulfill({
                status: 200,
                body: JSON.stringify(response)
            });
        });
    }

    // =========================
    //  Debugging
    // =========================
    async pause() {
        await this.page.pause();
    }
}
  
module.exports =BasePage;

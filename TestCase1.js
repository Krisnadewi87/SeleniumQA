const { Builder } = require('selenium-webdriver');
const LoginPage = require('./WebComponent/LoginPage');
const assert = require('assert');
const DashboardPage = require('./WebComponent/DashboardPage');
const fs = require('fs')

const screenshotDir = './screenshots/';

if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive: true});
}

describe('TestCase1', function() {
    this.timeout(40000);
    let driver;

    // Run setiap mulai test, satu kali saja paling awal
    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });

    // Test suite dimulai dengan apa, setiap melakukan test
    beforeEach(async function () {
        const loginPage = new LoginPage(driver);
        await loginPage.navigate();
        await loginPage.login('standar_user', 'secret_sauce');
    });

    // Assertion atau validasi
    it('Login successfully and verify dashboard', async function() {
        const dashboardPage = new DashboardPage(driver);
        const title = await dashboardPage.isOnDashboard();
        assert.strictEqual(title, 'Products', 'Expected dashboard title to be products')
    });

    afterEach(async function() {
        const screenshot = await driver.takeScreenshot();
        const filepath = `${screenshot}${this.currentTest.title.replace(/\s+/g, '-')}_${Date.now()}.png`
        fs.writeFileSync(filepath, screenshot, 'base64');
    })

    afterEach(async function () {
        const screenshot = await driver.takeScreenshot();
        const filepath = `${screenshotDir}${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`
        fs.writeFileSync(filepath, screenshot, 'base64');
    });

    after(async function() {
        await driver.quit();
    });

});
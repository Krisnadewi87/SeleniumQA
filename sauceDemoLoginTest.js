const { Builder, By, Key, until } = require('selenium-webdriver');
const { assert } = require('node:assert');

async function sauceDemoLoginTest() {
    // Make connection with Browser Driver
    let driver = await new Builder().forBrowser('chrome').build();    
    
    try {
        await driver.get("https://www.saucedemo.com");
        
        // Enter the username and password
        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.xpath('//input[@id="password"]')).sendKeys('secret_sauce');
    
        // Click Button Login
        await driver.findElement(By.xpath('//input[@id="login-button"]')).click();
        
        // Make sure we check the web title: "Swag Labs" displayed on the Dashboard
        let titleText = await driver.findElement(By.xpath("//div[@class= 'app_logo']")).getText();
        assert.strictEqual(titleText.includes('Swag Labs'), true, "Title does not include 'Swag Labs'");
        assert.s
    } finally {
        await driver.quit()
    }
}


sauceDemoLoginTest();

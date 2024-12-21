const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

async function sauceDemoLoginTest() {
    // Make connection with Browser Driver
    let driver = await new Builder().forBrowser('chrome').build();    
    
    try {
        /// Implicit Wait
        await driver.manage().setTimeouts({ implicit: 2000 });
        await driver.get("https://www.saucedemo.com/");
        // Enter the username and password
        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.xpath("//input[@id='password']")).sendKeys('secret_sauce');
    
        // Click Button Login
        await driver.findElement(By.xpath("//input[@id='login-button']")).click();
        
        // Verify the web title: "Swag Labs" displayed on the Dashboard
        let titleText = await driver.findElement(By.xpath("//div[@class='app_logo']")).getText();
        // console.log(titleText);
        assert.strictEqual(titleText.includes('Swag Labs'), true, "Title does not include 'Swag Labs'");
        /// Explicit Wait
        // let titleText = await driver.findElement(By.xpath("//div[@class='app_logo']"));
        // await driver.wait(until.elementIsVisible(titleText), 2000);
        // await titleText.getText()

        // Verify "Burger" button is visible
        let menuButton = await driver.findElement(By.xpath("//button[@id='react-burger-menu-btn']"));
        assert.strictEqual(await menuButton.isDisplayed(), true, "Menu button is not visible");

    } finally {
        await driver.quit();
    }
}

sauceDemoLoginTest();

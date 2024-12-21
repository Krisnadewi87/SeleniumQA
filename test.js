const { Builder, By, Key, until } = require('selenium-webdriver');

async function exampleTest() {
    // make connection to Browser Driver
    let driver = await new Builder().forBrowser('chrome').build();
    
    //Exception handling & conclusion
    try {
        // Open the URL on the browser
        await driver.get("https://www.google.com");
    } finally {
        // Close the browser
        await driver.quit();

    }
}

exampleTest();

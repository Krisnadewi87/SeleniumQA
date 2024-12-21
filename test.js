const { Builder, By, Key, until } = require('selenium-webdriver');

async function exampleTest() {
    // make connection to Browser Driver
    let driver = await new Builder().forBrowser('chrome').build();
    
    //Exception handling & conclusion
    try {
        // Open the URL on the browser
        await driver.get("https://www.google.com");


        // Searchin in searchbox
        let searchBox = await driver.findElement(By.name('q'));

        // Simulate user behavior typing "Hellow World!"
        await searchBox.sendKeys ("Hello World!", Key.RETURN);
        await driver.wait(until.elementLocated(By.id('result-stats')), 10000);


        let title = await driver.getTitle();
        console.log(`Page Title is: ${title}`);

    } finally {
        // Close the browser
        await driver.quit();

    }
}

exampleTest();

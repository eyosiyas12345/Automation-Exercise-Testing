const { Builder, By, until } = require('selenium-webdriver');

async function searchTest() {
    // 1. Initialize the browser
    let driver = await new Builder().forBrowser('chrome').build();
    
    try {
        // 2. Navigate to the Products page
        await driver.get('https://automationexercise.com/products');
        
        // 3. Wait for the search input to be visible (Better than just finding it)
        let searchInput = await driver.wait(until.elementLocated(By.id('search_product')), 10000);
        
        // 4. Type 'Dress' into the search bar
        await searchInput.sendKeys('Dress');

        // 5. Find the search button
        let searchBtn = await driver.findElement(By.id('submit_search'));

        // 6. Scroll the button into view and click using JavaScript 
        // This prevents "ElementClickInterceptedError" from Google Ads
        await driver.executeScript("arguments[0].scrollIntoView(true);", searchBtn);
        await driver.executeScript("arguments[0].click();", searchBtn);

        // 7. Verify the "SEARCHED PRODUCTS" header appears
        let resultsHeader = await driver.wait(
            until.elementLocated(By.xpath("//h2[contains(text(), 'Searched Products')]")), 
            10000
        );

        // 8. Log the final result for your Task 5 report
        let headerText = await resultsHeader.getText();
        console.log("Test Result: PASS. Verified Header: " + headerText);

    } catch (error) {
        console.error("Test Result: FAIL. Error encountered: ", error.message);
    } finally {
        // 9. Close the browser
        await driver.quit();
    }
}

searchTest();
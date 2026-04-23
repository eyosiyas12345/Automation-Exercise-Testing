const { Builder, By, until } = require('selenium-webdriver');

async function checkoutTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Pre-condition: User must be logged in to checkout (FR-09)
        await driver.get('https://automationexercise.com/login');
        await driver.findElement(By.css('input[data-qa="login-email"]')).sendKeys('tester_eyosiyas@aastu.edu.et');
        await driver.findElement(By.css('input[data-qa="login-password"]')).sendKeys('SecurePass123!');
        await driver.findElement(By.css('button[data-qa="login-button"]')).click();

        // Step 1: Add item and go to cart
        await driver.get('https://automationexercise.com/products');
        let addBtn = await driver.findElement(By.xpath("(//a[contains(@class, 'add-to-cart')])[1]"));
        await driver.executeScript("arguments[0].click();", addBtn);
        
        let viewCart = await driver.wait(until.elementLocated(By.xpath("//u[contains(text(), 'View Cart')]")), 10000);
        await driver.executeScript("arguments[0].click();", viewCart);

        // Step 2: Proceed to Checkout
        let checkoutBtn = await driver.findElement(By.className('check_out'));
        await checkoutBtn.click();

        // Step 3: Verify navigation to Checkout/Payment page
        await driver.wait(until.urlContains('checkout'), 10000);
        console.log("Test Result: PASS. Navigation to checkout successful.");
        console.log("Observation: Testing for BUG-001 (UI Footer overlap)...");

    } catch (error) {
        console.error("Test Result: FAIL. Error: ", error.message);
    } finally {
        await driver.quit();
    }
}
checkoutTest();
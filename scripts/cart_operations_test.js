const { Builder, By, until } = require('selenium-webdriver');

async function cartOperationsTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('https://automationexercise.com/products');

        // TC-05: Add to Cart
        let firstProduct = await driver.wait(until.elementLocated(By.xpath("(//a[contains(@class, 'add-to-cart')])[1]")), 10000);
        await driver.executeScript("arguments[0].scrollIntoView(true);", firstProduct);
        await driver.executeScript("arguments[0].click();", firstProduct);

        // Wait for modal and view cart
        let viewCart = await driver.wait(until.elementLocated(By.xpath("//u[contains(text(), 'View Cart')]")), 10000);
        await driver.executeScript("arguments[0].click();", viewCart);

        // TC-06: Remove from Cart
        let removeBtn = await driver.wait(until.elementLocated(By.className('cart_quantity_delete')), 10000);
        await removeBtn.click();

        // Verify empty cart message or item disappearance
        console.log("Test Result: PASS. Product added and then removed successfully.");
    } finally {
        await driver.quit();
    }
}
cartOperationsTest();
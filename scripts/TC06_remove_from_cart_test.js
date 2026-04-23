const { Builder, By, until } = require('selenium-webdriver');

async function removeFromCartTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('https://automationexercise.com/products');

        // Step 1: Add a product first
        let addBtn = await driver.wait(until.elementLocated(By.xpath("(//a[contains(@class, 'add-to-cart')])[1]")), 10000);
        await driver.executeScript("arguments[0].click();", addBtn);

        // Step 2: Go to Cart
        let viewCart = await driver.wait(until.elementLocated(By.xpath("//u[contains(text(), 'View Cart')]")), 10000);
        await driver.executeScript("arguments[0].click();", viewCart);

        // Step 3: Remove the item
        let deleteBtn = await driver.wait(until.elementLocated(By.className('cart_quantity_delete')), 10000);
        await deleteBtn.click();

        // Step 4: Verify the item is gone (Wait for the text "Cart is empty!")
        let emptyCartMsg = await driver.wait(until.elementLocated(By.id('empty_cart')), 10000);
        console.log("Test Result: PASS. Item removed successfully: " + await emptyCartMsg.getText());

    } finally {
        await driver.quit();
    }
}
removeFromCartTest();
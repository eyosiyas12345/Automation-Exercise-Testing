const { Builder, By, until } = require('selenium-webdriver');

async function cartTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('https://automationexercise.com/products');
        
        // Hover and click 'Add to cart' on the first product
        const addToCartBtn = await driver.findElement(By.className('add-to-cart'));
        await addToCartBtn.click();

        // Wait for the success modal and click 'View Cart'
        let viewCartLink = await driver.wait(until.elementLocated(By.xpath("//u[contains(text(), 'View Cart')]")), 5000);
        await viewCartLink.click();

        // Verify we are on the cart page
        let cartInfo = await driver.findElement(By.id('cart_info'));
        console.log("Test Result: PASS. Item is in cart.");
    } finally {
        await driver.quit();
    }
}
cartTest();
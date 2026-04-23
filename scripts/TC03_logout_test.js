const { Builder, By, until } = require('selenium-webdriver');

async function logoutTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('https://automationexercise.com/login');
        // Login first
        await driver.findElement(By.css('input[data-qa="login-email"]')).sendKeys('tester_eyosiyas@aastu.edu.et');
        await driver.findElement(By.css('input[data-qa="login-password"]')).sendKeys('SecurePass123!');
        await driver.findElement(By.css('button[data-qa="login-button"]')).click();

        // Find and click Logout
        let logoutBtn = await driver.wait(until.elementLocated(By.xpath("//a[contains(text(), 'Logout')]")), 10000);
        await driver.executeScript("arguments[0].click();", logoutBtn);

        // Verify redirection to login page
        await driver.wait(until.urlContains('/login'), 5000);
        console.log("Test Result: PASS. Logout successful, redirected to login.");
    } finally {
        await driver.quit();
    }
}
logoutTest();
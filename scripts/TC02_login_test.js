const { Builder, By, until } = require('selenium-webdriver');

async function loginTest() {
    // 1. Initialize the browser (Chrome)
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // 2. Navigate to the website (Pre-condition: User is on Login page)
        await driver.get('https://automationexercise.com/login');
        
        // 3. Enter valid email and password (Test Data from Task 4)
        await driver.findElement(By.css('input[data-qa="login-email"]'))
                    .sendKeys('tester_eyosiyas@aastu.edu.et'); // [cite: 118]
        await driver.findElement(By.css('input[data-qa="login-password"]'))
                    .sendKeys('SecurePass123!'); // [cite: 119]

        // 4. Click the 'Login' button
        await driver.findElement(By.css('button[data-qa="login-button"]')).click();

        // 5. Verification: Check if the "Logged in as" text is visible 
        let userStatus = await driver.wait(
            until.elementLocated(By.xpath("//*[contains(text(), 'Logged in as')]")), 
            10000
        );

        let statusText = await userStatus.getText();
        console.log("Test Result: PASS. Visible status: " + statusText);

    } catch (error) {
        console.error("Test Result: FAIL. Error: ", error.message);
    } finally {
        // 6. Close the browser
        await driver.quit();
    }
}

loginTest();
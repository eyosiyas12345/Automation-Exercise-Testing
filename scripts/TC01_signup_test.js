const { Builder, By, until } = require('selenium-webdriver');

async function signupTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('https://automationexercise.com/login');

        // Generate a unique email using the current timestamp
        const uniqueEmail = `user_${Date.now()}@aastu.edu.et`;

        // Step 1: Enter Name and Email in the Signup section
        await driver.findElement(By.css('input[data-qa="signup-name"]')).sendKeys('Eyosiyas Tester');
        await driver.findElement(By.css('input[data-qa="signup-email"]')).sendKeys(uniqueEmail);
        await driver.findElement(By.css('button[data-qa="signup-button"]')).click();

        // Step 2: Fill Account Details (FR-01)
        await driver.wait(until.elementLocated(By.id('id_gender1')), 10000).click();
        await driver.findElement(By.id('password')).sendKeys('SecurePass123!');
        
        // Step 3: Fill Address Information
        await driver.findElement(By.id('first_name')).sendKeys('Eyosiyas');
        await driver.findElement(By.id('last_name')).sendKeys('Gezahegn');
        await driver.findElement(By.id('address1')).sendKeys('AASTU Campus, Addis Ababa');
        await driver.findElement(By.id('state')).sendKeys('Addis Ababa');
        await driver.findElement(By.id('city')).sendKeys('Akaki');
        await driver.findElement(By.id('zipcode')).sendKeys('1000');
        await driver.findElement(By.id('mobile_number')).sendKeys('0911000000');

        // Step 4: Click Create Account
        let createBtn = await driver.findElement(By.css('button[data-qa="create-account"]'));
        await driver.executeScript("arguments[0].click();", createBtn);

        // Verification
        let successHeader = await driver.wait(until.elementLocated(By.css('h2[data-qa="account-created"]')), 10000);
        console.log("Test Result: PASS. Account Created: " + await successHeader.getText());

    } catch (error) {
        console.error("Test Result: FAIL. Error: ", error.message);
    } finally {
        await driver.quit();
    }
}
signupTest();
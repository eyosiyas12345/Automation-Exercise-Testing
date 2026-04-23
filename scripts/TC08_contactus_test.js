const { Builder, By, until } = require('selenium-webdriver');

async function contactUsTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('https://automationexercise.com/contact_us');

        await driver.findElement(By.css('input[data-qa="name"]')).sendKeys('Eyosiyas Gezahegn');
        await driver.findElement(By.css('input[data-qa="email"]')).sendKeys('tester_eyosiyas@aastu.edu.et');
        await driver.findElement(By.css('input[data-qa="subject"]')).sendKeys('SVVT Assignment Submission');
        await driver.findElement(By.css('textarea[data-qa="message"]')).sendKeys('Automated test message.');

        let submitBtn = await driver.findElement(By.css('button[data-qa="submit-button"]'));
        await driver.executeScript("arguments[0].click();", submitBtn);

        // Accept the browser alert
        await driver.wait(until.alertIsPresent());
        await driver.switchTo().alert().accept();

        // Verify success message
        let successMsg = await driver.wait(until.elementLocated(By.className('status alert alert-success')), 10000);
        console.log("Test Result: PASS. Contact form submitted: " + await successMsg.getText());
    } finally {
        await driver.quit();
    }
}
contactUsTest();
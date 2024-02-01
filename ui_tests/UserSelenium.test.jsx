import { Builder, By, Key, until } from "selenium-webdriver";
import { describe, it, expect } from "vitest";

describe("User Related Functions Test", () => {
  var driver; // Declare a WebDriver variable

  beforeEach(async () => {
    // Initialize a Chrome WebDriver instance
    driver = await new Builder().forBrowser("MicrosoftEdge").build();
  });

  afterEach(async () => {
    // Quit the WebDriver instance after each test
    await driver.quit();
  });

  let User = {
    username: "normaluser",
    email: "normaluser@gmail.com",
    password: "normaluser",
  };

  let accessToken;

  it("Should display SellerRegistration if user is not logged in", async function () {
    // Navigate to your application.
    await driver.get("http://localhost:5173/"); // Adjust URL as needed.
    await driver.executeScript(
      "localStorage.setItem('userInfo', JSON.stringify(null));"
    );
    await driver.navigate().refresh(); // Refresh to apply the localStorage change.
    await driver.wait(until.elementLocated(By.className("body")), 10000); // Adjust as needed

    // Wait for the page or specific elements to load.
    await driver.wait(
      until.elementLocated(By.className("sellerRegistrationContainer")),
      20000
    ); // Adjust the selector as needed.

    let sellerRegistration = await driver.findElement(
      By.className("sellerRegistrationContainer")
    ); // Use the appropriate selector.
    let isDisplayed = await sellerRegistration.isDisplayed();

    expect(isDisplayed).toBeTruthy(); // This line might need to be adjusted based on your assertion library.
  });

  it("Registers a new user", async function () {
    await driver.get("http://localhost:5173/register"); // Adjust this URL to where your RegisterForm is served
    await driver.findElement(By.id("username")).sendKeys(User.username);
    await driver.findElement(By.id("email")).sendKeys(User.email);
    await driver.findElement(By.id("password")).sendKeys(User.password);
    await driver.findElement(By.className("togglePassword")).click();
    await driver.findElement(By.className("togglePassword")).click();

    const submitButton = await driver.wait(
      until.elementLocated(By.xpath("//button[text()='Register']"))
    );
    submitButton.click();

    let successMessage = await driver.wait(
      until.elementLocated(By.className("formMessage")),
      10000
    );
  
    let messageText = await successMessage.getText();
    expect(messageText).toContain("Registration successful!"); 
  });


  it("Logs in a user", async function () {
    await driver.get("http://localhost:5173/login"); // Adjust URL as needed
    await driver.findElement(By.id("email")).sendKeys(User.email);
    await driver.findElement(By.id("password")).sendKeys(User.password);


    const submitButton = await driver.wait(
      until.elementLocated(By.xpath("//button[text()='Login']"))
    );
    submitButton.click();


    let successMessage = await driver.wait(
      until.elementLocated(By.className("formMessage")),
      20000
    );
    
    let messageText = await successMessage.getText();
    expect(messageText).toContain('Login successful!'); 

    let token = await driver.executeScript("return JSON.parse(localStorage.getItem('userInfo')).accessToken;");
    console.log("Token received:", token);
    accessToken = token;
  });


  it("Should display SellerRegistration if is logged in but not a seller", async function () {
    // Navigate to your application.
    await driver.get("http://localhost:5173/"); // Adjust URL as needed.

    // Define different userInfo scenarios
    const userScenarios = [
        null,                           // userInfo is null
        { is_seller: null },            // userInfo.is_seller is null
        { is_seller: 0 }                // userInfo.is_seller is 0
    ];

    for (const userInfo of userScenarios) {
        // Set userInfo in localStorage based on the current scenario
        await driver.executeScript("localStorage.setItem('userInfo', JSON.stringify(arguments[0]));", userInfo);
        await driver.navigate().refresh(); // Refresh to apply the localStorage change.
        await driver.wait(until.elementLocated(By.className("body")), 10000); // Adjust as needed

        // Check for SellerRegistration
        let sellerRegistration = await driver.findElement(By.className("sellerRegistrationContainer")); // Use the appropriate selector.
        let isDisplayed = await sellerRegistration.isDisplayed();
        expect(isDisplayed).toBeTruthy(); // This line might need to be adjusted based on your assertion library.
    }
});

it("Inserts userInfo and clicks the 'Apply' button for redirection to '/seller'", async function () {
  // Define mock userInfo
  const mockUserInfo = {
    email: User.email,
    username: User.username,
    accessToken: accessToken
  };

  // Navigate to the main page
  await driver.get("http://localhost:5173/"); // Adjust URL as needed

  // Insert mock userInfo into localStorage
  await driver.executeScript("localStorage.setItem('userInfo', JSON.stringify(arguments[0]));", mockUserInfo);

  // Refresh the page to apply the localStorage change
  await driver.navigate().refresh();

  // Find the 'Apply' button and click on it
  const applyButton = await driver.wait(until.elementLocated(By.xpath("//button[contains(text(), 'Apply')]")));
  applyButton.click();



  // Wait for the URL to change to '/seller'
  await driver.wait(until.urlContains('/seller'), 10000);

  // Get the current URL
  const currentUrl = await driver.getCurrentUrl();

  // Assert that the current URL is '/seller'
  expect(currentUrl).toBe("http://localhost:5173/seller"); // Adjust expected URL as needed
});

it("Apply user as seller", async function () {
  // Define mock userInfo with accessToken
  const mockUserInfo = {
      email: User.email,
      username: User.username,
      accessToken: accessToken
  };

  // Navigate to the SellerRegister page
  await driver.get("http://localhost:5173/"); 
  await driver.executeScript("localStorage.setItem('userInfo', JSON.stringify(arguments[0]));", mockUserInfo);
  await driver.navigate().refresh(); // Refresh to apply the localStorage change
  await driver.get("http://localhost:5173/seller"); // Adjust URL as needed

  // Interact with the Apply button
  const applyButton = await driver.findElement(By.xpath("//button[text()='Apply']"));
  applyButton.click();

  // Wait for the alert to be present
  await driver.wait(until.alertIsPresent(), 10000);

  // Switch to the alert
  let alert = await driver.switchTo().alert();

  // Get the text from the alert
  let alertText = await alert.getText();

  // Verify the alert text
  expect(alertText).toBe("Successly applied as a seller");

  // Accept the alert
  alert.accept();
});

it("SellerRegistration should not display if user is already a seller", async function () {
  const scenarios = [0, 1];
  for (const isSeller of scenarios) {
      const mockUserInfo = {
          email: User.email,
          username: User.username,
          is_seller: isSeller
      };

      await driver.get("http://localhost:5173/");
      await driver.executeScript("localStorage.setItem('userInfo', JSON.stringify(arguments[0]));", mockUserInfo);
      await driver.navigate().refresh();
      await driver.wait(until.elementLocated(By.className("body")), 20000);

      let sellerRegistrationElements = await driver.findElements(By.className("sellerRegistrationContainer"));
      let sellerRegistrationPresent = sellerRegistrationElements.length > 0;

      if (isSeller === 1) {
          expect(sellerRegistrationPresent).toBeFalsy();
      } else { // isSeller === 0
          expect(sellerRegistrationPresent).toBeTruthy();
      }
  }
});

it('should allow seller to delete account', async function() {
  // Navigate to the application and set userInfo
  const mockUserInfo = {
    email: User.email,
    username: User.username,
    is_seller: 1,
    accessToken: accessToken
};
  await driver.get('http://localhost:5173/');
await driver.executeScript("localStorage.setItem('userInfo', JSON.stringify(arguments[0]));", mockUserInfo);
  await driver.get('http://localhost:5173/admin');

  // Click on the "Delete Account" button
  const applyButton = await driver.findElement(By.xpath("//button[text()='Delete Account']"));
  applyButton.click();

  // Handle the confirmation dialog
  await driver.wait(until.alertIsPresent(), 10000); // Waits up to 10 seconds for the alert to appear

  let alert = await driver.switchTo().alert();
  let alertText = await alert.getText();
  assert.strictEqual(alertText, 'Are you sure to delete your account?');
  await alert.accept();

  // Wait for the alert that shows deletion was successful
  await driver.wait(until.alertIsPresent(), 10000);
  alert = await driver.switchTo().alert();
  alertText = await alert.getText();
  assert.strictEqual(alertText, 'Deleted Successfully!');
  await alert.accept();

  // Check redirection
  await driver.wait(until.urlIs('http://localhost:5173/'), 10000);
});





});

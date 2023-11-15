const { Builder, By, Key, until } = require("selenium-webdriver");
const { expect } = require("chai");
const firefox = require("selenium-webdriver/firefox");

describe("Selenium UI Testing", function () {
  let firefoxOptions = new firefox.Options();
  firefoxOptions.addArguments("-headless"); // Headless mode for Firefox
  firefoxOptions.addArguments("--no-sandbox");
  firefoxOptions.addArguments("--disable-dev-shm-usage");
  firefoxOptions.addArguments("--disable-gpu");
  let driver;
  let ip = "172.30.137.252";

  before(async function () {
    driver = new Builder()
      .forBrowser("firefox")
      .setFirefoxOptions(firefoxOptions)
      // If using Remote WebDriver
      .usingServer(`http://${ip}:4444/wd/hub`)
      .build();
  });

  it("should clear the search bar (XSS test)", async function () {
    this.timeout(5000);
    console.log(`http://${ip}:5173/`);
    await driver.get(`http://${ip}:5173/`);
    const searchInput = await driver.findElement(By.id("searchInput"));
    await searchInput.sendKeys("<script>alert('xss')</script>");
    const searchButton = await driver.findElement(By.id("search-button"));
    await searchButton.click();
    await driver.sleep(1000);
    const inputValue = await searchInput.getAttribute("value");
    expect(inputValue).to.equal(""); // Assertion
  });

  it("should clear the search bar (SQL test)", async function () {
    this.timeout(5000);
    await driver.get(`http://${ip}:5173/`);
    const searchInput = await driver.findElement(By.id("searchInput"));
    await searchInput.sendKeys("SELECT * FROM User;");
    const searchButton = await driver.findElement(By.id("search-button"));
    await searchButton.click();
    await driver.sleep(1000);
    const inputValue = await searchInput.getAttribute("value");
    expect(inputValue).to.equal(""); // Assertion
  });

  it("should go to the results page (Pass Case)", async function () {
    this.timeout(5000);
    await driver.get(`http://${ip}:5173/`);
    const searchInput = await driver.findElement(By.id("searchInput"));
    await searchInput.sendKeys("HONG SHEEN");
    const searchButton = await driver.findElement(By.id("search-button"));
    await searchButton.click();
    await driver.sleep(1000);
    const searchTermElement = await driver.findElement(
      By.id("searchTermDisplay")
    );
    const displayedSearchTerm = await searchTermElement.getText();
    expect(displayedSearchTerm).to.equal("HONG SHEEN");
  });

  after(async function () {
    await driver.quit();
  });
});

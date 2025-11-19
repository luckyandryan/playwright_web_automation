import { BasePage } from "./BasePage.js";

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.welcomeHeader =
      '//div[contains(@style, "margin-bottom: 50px")]//h2[text()="Welcome,"]';
    this.loginSubHeader =
      '//div[contains(@style, "margin-bottom: 50px")]//h5[text()="Login in Book Store"]';
    this.userNameInput = '//*[@id="userName"]';
    this.passwordInput = '//*[@id="password"]';
    this.loginButton = '//*[@id="login"]';
    this.invalidCredentialsMessage =
      '//p[@id="name" and text()="Invalid username or password!"]';
  }

  async getWelcomeHeader() {
    return await this.page.innerText(this.welcomeHeader);
  }

  async getLoginSubHeader() {
    return await this.page.innerText(this.loginSubHeader);
  }

  async enterUserName(userName) {
    await this.page.locator(this.userNameInput).scrollIntoViewIfNeeded();
    await this.page.fill(this.userNameInput, userName);
  }

  async enterPassword(password) {
    await this.page.locator(this.passwordInput).scrollIntoViewIfNeeded();
    await this.page.fill(this.passwordInput, password);
  }

  async clickLogin() {
    await this.page.locator(this.loginButton).scrollIntoViewIfNeeded();
    await this.page.click(this.loginButton);
  }

  async getInvalidCredentialsMessage() {
    return await this.page.innerText(this.invalidCredentialsMessage);
  }
}

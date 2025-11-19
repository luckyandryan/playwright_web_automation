import { BasePage } from "./BasePage.js";

export class ProfilePage extends BasePage {
  constructor(page) {
    super(page);
    this.notLoggedInLabel =
      "//*[@id='notLoggin-label' and contains(text(), 'not logged into the Book Store application')]";
    this.userNameValue = "//label[@id='userName-value']";
    this.logoutButton = "//button[@id='submit' and text()='Log out']";
  }

  async getNotLoggedInLabel() {
    return await this.page.innerText(this.notLoggedInLabel);
  }

  async getUserNameValue() {
    return await this.page.innerText(this.userNameValue);
  }

  async clickLogout() {
    await this.page.locator(this.logoutButton).scrollIntoViewIfNeeded();
    await this.page.click(this.logoutButton);
  }
}

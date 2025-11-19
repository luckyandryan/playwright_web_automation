import { BasePage } from './BasePage.js';

export class BooksPage extends BasePage {
    constructor(page) {
      super(page);
      this.searchBox = '#searchBox';
      this.bookTitles = '.mr-2';
      this.authorHeader = '//div[@class="rt-resizable-header-content" and text()="Author"]';
      this.publisherHeader = '//div[@class="rt-resizable-header-content" and text()="Publisher"]';
      this.rowsPerPageSelect = '//select[@aria-label="rows per page"]';
      this.nextButton = '//button[text()="Next"]';
      this.pageIndicator = 'input[aria-label="jump to page"]';
      this.bookAuthors = '//div[@class="rt-td"]';
    }

    async searchBook(keyword) {
      await this.page.fill(this.searchBox, keyword);
    }

    async getBooksList() {
      return await this.page.locator(this.bookTitles).allInnerTexts();
    }

    async getAuthorsList() {
      return await this.page.locator(this.bookAuthors).allInnerTexts();
    }

    async selectBook(bookName) {
      await this.page.locator(`a:has-text("${bookName}")`).click();
    }

    async sortByAuthor() {
      await this.page.click(this.authorHeader);
    }

    async sortByPublisher() {
      await this.page.click(this.publisherHeader);
    }

    async setRowsPerPage(count) {
      const select = this.page.locator(this.rowsPerPageSelect);
      await select.scrollIntoViewIfNeeded();
      await select.selectOption(count.toString());
    }

    async goToNextPage() {
      await this.page.locator(this.nextButton).scrollIntoViewIfNeeded();
      await this.page.click(this.nextButton);
    }

    async getCurrentPageNumber() {
      await this.page.locator(this.pageIndicator).scrollIntoViewIfNeeded();
      return await this.page.inputValue(this.pageIndicator);
    }
}

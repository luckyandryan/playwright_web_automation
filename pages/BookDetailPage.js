import { BasePage } from './BasePage.js';

export class BookDetailPage extends BasePage {
    constructor(page) {
        super(page);
        this.titleLabel = '#title-wrapper #userName-value';
    }

    async getBookTitle() {
        return await this.page.innerText(this.titleLabel);
    }
}

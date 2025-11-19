# DemoQA Bookstore UI Automation

Automation using Playwright (JS) for testing https://demoqa.com/books.

---

## 🤖 Tech Stack

```bash
Playwright Test
Page Object Model (POM)
Node.js
```

---

## 🔧 Setup

1. 📥 **Clone the Repository**

   ```bash
   git clone https://github.com/luckyandryan/playwright_web_automation.git
   ```

2. ➡️ **Move to the project directory**

   ```bash
   cd playwright_web_automation
   ```

3. 📦 **Install Dependencies**
   ```bash
   npm install
   ```

---

## 🚀 Run Tests

Run all **UI tests**:

```bash
npm test
```

or

```bash
npm run test:headed
```

---

## 📁 Project Structure

```bash
playwright_web_automation/
├── pages/
│   ├── BasePage.js
│   ├── BookDetailPage.js
│   ├── BooksPage.js
│   ├── LoginPage.js
│   └── ProfilePage.js
├── tests/
│   └── bookstore.spec.js
├── utils/
│   └── helpers.js            # Helper functions for API requests
├── package.json              # Project dependencies & scripts
├── playwright.config.js      # WebdriverIO configuration
└── README.md
```

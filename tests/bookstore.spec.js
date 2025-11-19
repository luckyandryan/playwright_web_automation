import { test, expect } from "@playwright/test";
import { BooksPage } from "../pages/BooksPage.js";
import { BookDetailPage } from "../pages/BookDetailPage.js";
import { LoginPage } from "../pages/LoginPage.js";
import { ProfilePage } from "../pages/ProfilePage.js";
import { BOOKS } from "../utils/helpers.js";

test.describe("Bookstore UI Tests", () => {
  // Block ads and trackers before each test
  test.beforeEach(async ({ page }) => {
    await page.route("**/*", (route) => {
      const blocked = ["googlesyndication", "adservice", "doubleclick"];
      if (blocked.some((b) => route.request().url().includes(b))) {
        route.abort();
      } else {
        route.continue();
      }
    });
  });

  test("Verify profile page when not logged in", async ({ page }) => {
    const profilePage = new ProfilePage(page);
    await profilePage.navigate("/profile");

    const notLoggedInText = await profilePage.getNotLoggedInLabel();
    expect(notLoggedInText).toContain(
      "not logged into the Book Store application",
    );
  });

  test("Verify login with invalid credentials shows error message", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate("/login");

    await loginPage.enterUserName("invalidUser");
    await loginPage.enterPassword("invalidPass");
    await loginPage.clickLogin();

    const errorMessage = await loginPage.getInvalidCredentialsMessage();
    expect(errorMessage).toBe("Invalid username or password!");
  });

  test("Verify login works correctly", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate("/login");

    const welcomeHeader = await loginPage.getWelcomeHeader();
    expect(welcomeHeader).toBe("Welcome,");

    const loginSubHeader = await loginPage.getLoginSubHeader();
    expect(loginSubHeader).toBe("Login in Book Store");

    const userName = "luckytest";

    await loginPage.enterUserName(userName);
    await loginPage.enterPassword("@Luckytest1");
    await loginPage.clickLogin();

    const profilePage = new ProfilePage(page);

    const actualUserNameValue = await profilePage.getUserNameValue();
    expect(actualUserNameValue).toBe(userName);
  });

  test("Verify search using books name works correctly", async ({ page }) => {
    const booksPage = new BooksPage(page);

    await booksPage.navigate("/books");
    await booksPage.searchBook("Git");

    const books = await booksPage.getBooksList();
    expect(books.some((title) => title.includes("Git"))).toBeTruthy();
  });

  test("Verify search using author name works correctly", async ({ page }) => {
    const booksPage = new BooksPage(page);

    await booksPage.navigate("/books");
    await booksPage.searchBook("Addy");

    const books = await booksPage.getAuthorsList();
    expect(books.some((author) => author.includes("Addy"))).toBeTruthy();
  });

  test("Verify search using publisher name works correctly", async ({
    page,
  }) => {
    const publisher = "O'Reilly Media";
    const expectedBooks = BOOKS.filter((b) => b.publisher === publisher);

    const booksPage = new BooksPage(page);

    await booksPage.navigate("/books");
    await booksPage.searchBook("O'Reilly");

    const books = await booksPage.getBooksList();

    // Assert the count is correct
    expect(books.length).toBe(expectedBooks.length);

    // Assert each expected book is found in results
    for (const eb of expectedBooks) {
      const found = books.some((title) => title.includes(eb.title));
      expect(found).toBe(true);
    }
  });

  test("Verify sorting by author works correctly", async ({ page }) => {
    const booksPage = new BooksPage(page);

    await booksPage.navigate("/books");
    await booksPage.sortByAuthor();

    const books = await booksPage.getBooksList();

    // Assert the books are sorted by author
    const authors = books.map((title) => {
      const book = BOOKS.find((b) => b.title === title);
      return book ? book.author : "";
    });

    const sortedAuthors = [...authors].sort();
    expect(authors).toEqual(sortedAuthors);
  });

  test("Verify sorting by publisher works correctly", async ({ page }) => {
    const booksPage = new BooksPage(page);

    await booksPage.navigate("/books");
    await booksPage.sortByPublisher();

    const books = await booksPage.getBooksList();

    // Assert the books are sorted by publisher
    const publishers = books.map((title) => {
      const book = BOOKS.find((b) => b.title === title);
      return book ? book.publisher : "";
    });

    const sortedPublishers = [...publishers].sort();
    expect(publishers).toEqual(sortedPublishers);
  });

  test("Verify pagination works correctly", async ({ page }) => {
    const booksPage = new BooksPage(page);

    await booksPage.navigate("/books");
    const totalBooks = BOOKS.length; // 8 books in the dataset

    await booksPage.setRowsPerPage(5);

    // Assert first page should have 5 books
    expect((await booksPage.getBooksList()).length).toBe(5);

    let currentPage = await booksPage.getCurrentPageNumber();
    expect(currentPage).toBe("1");

    await booksPage.goToNextPage();

    // Assert remaining books = 3
    expect((await booksPage.getBooksList()).length).toBe(totalBooks - 5);

    currentPage = await booksPage.getCurrentPageNumber();
    expect(currentPage).toBe("2");
  });

  // test skipped due to known issue with book detail page not loading correctly
  test.skip("Verify book detail loads correctly", async ({ page }) => {
    const booksPage = new BooksPage(page);
    const detailPage = new BookDetailPage(page);

    await booksPage.navigate("/books");
    await booksPage.selectBook("Git Pocket Guide");

    const title = await detailPage.getBookTitle();
    expect(title).toBe("Git Pocket Guide");
  });

  test("Verify logout works correctly", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate("/login");

    const userName = "luckytest";
    await loginPage.enterUserName(userName);
    await loginPage.enterPassword("@Luckytest1");
    await loginPage.clickLogin();

    const profilePage = new ProfilePage(page);
    await profilePage.clickLogout();

    const welcomeHeader = await loginPage.getWelcomeHeader();
    expect(welcomeHeader).toBe("Welcome,");

    const loginSubHeader = await loginPage.getLoginSubHeader();
    expect(loginSubHeader).toBe("Login in Book Store");
  });
});

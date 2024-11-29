import { test, expect } from "@playwright/test";
import { TIMEOUT } from "../utils/timeouts";
import { acceptAllCookies } from "../utils/cookiesByPass";

test("Guest checkout - Submit email fails with 500 error", async ({ page }) => {
  // Navigates to the checkout page
  await page.goto("/palazzo-pant-black");
  expect(page.url()).toContain("/palazzo-pant-black");

  // Handle cookie consent
  await acceptAllCookies(page);

  // Adds a product to the bag and proceeds to checkout
  await page.getByTestId("size-select-button-dropdown").click();
  await page.getByTestId("size-select-option-list").getByText("UK 12").click();
  await page.waitForTimeout(TIMEOUT.ONE_SECOND);
  await page.getByRole("button", { name: "Add to Bag" }).click();
  await page.waitForTimeout(TIMEOUT.ONE_SECOND);
  await page.getByRole("link", { name: "£59.00 – Review Bag and" }).click();
  await page.waitForTimeout(TIMEOUT.ONE_SECOND);
  await page.getByRole("link", { name: "Checkout" }).click();

  // Mocks a 500 server error for the guest email submission API
  await page.route("**/checkout", (route) => {
    console.log("Intercepted guest email submission API call"); // Debugging log
    route.fulfill({
      status: 500, // Mocks a 500 Internal Server Error
      contentType: "application/json",
      body: JSON.stringify({ message: "Internal Server Error" }),
    });
  });

  // Locates the error message element displayed when the guest email submission API call fails.
  // The error message is expected to indicate a generic checkout error caused by the mocked 500 server response.
  const errorMessage = page
    .locator('[id="\\32 "] div') // Targets the error container with the specific ID and filters based on text
    .filter({ hasText: "checkout.general.genericError" })
    .nth(2);
  await expect(errorMessage).toBeVisible(); // Ensures the error message is visible
  await expect(errorMessage).toHaveText("checkout.general.genericError"); // Validates the error message text
});

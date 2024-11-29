import { test, expect } from "@playwright/test";
import { fillDeliveryDetails } from "../utils/deliveryDetails";
import { fillCardDetails } from "../utils/cardDetails";
import { TIMEOUT } from "../utils/timeouts";
import { acceptAllCookies } from "../utils/cookiesByPass";

test("Positive path - Add product to cart and checkout", async ({ page }) => {
  // Navigate to PDP page
  await page.goto("/palazzo-pant-black");
  expect(page.url()).toContain("/palazzo-pant-black");

  // Handle cookie consent
  await acceptAllCookies(page);

  // Select product size and add to bag
  await page.getByTestId("size-select-button-dropdown").click();
  await page.getByTestId("size-select-option-list").getByText("UK 12").click();
  await page.getByRole("button", { name: "Add to Bag" }).click();

  // Review bag and proceed to checkout
  await page.getByRole("link", { name: "£59.00 – Review Bag and" }).click();
  await page.waitForTimeout(TIMEOUT.ONE_SECOND);
  await page.getByRole("link", { name: "Checkout" }).click();

  // Continue as guest
  await page.getByRole("button", { name: "Continue as guest" }).click();

  // Enter email address
  const emailField = page.getByTestId("signInOrRegister").getByPlaceholder(" ");
  await emailField.fill("test@example.com");
  await page.getByRole("button", { name: "Continue to Delivery" }).click();

  // Fill delivery details
  await fillDeliveryDetails(page);

  // Submit delivery details and proceed
  await page
    .getByTestId("deliveryAddress")
    .getByRole("button", { name: "Submit to Continue" })
    .click();
  await page.waitForTimeout(TIMEOUT.ONE_SECOND);

  // Fill card details
  await fillCardDetails(page);

  // Place order
  // Locates the Place Order button
  const placeOrderButton = page.getByRole("button", { name: "Place Order" });

  // Handles blocking elements
  const blockingElement = page.locator("div.blocking-spinner");
  if (await blockingElement.isVisible()) {
    await blockingElement.waitFor({ state: "hidden" });
  }

  // Ensures the button is stable
  await placeOrderButton.scrollIntoViewIfNeeded();
  await expect(placeOrderButton).toBeVisible();
  await expect(placeOrderButton).toBeEnabled();

  await placeOrderButton.click({ force: true });
});

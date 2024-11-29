import { test, expect } from "@playwright/test";
import { dismissCookieConsent } from "../utils/cookiesByPass";

test("Negative path - Error message for missing size selection", async ({
  page,
}) => {
  // Step 1: Navigate to the product detail page
  await page.goto("/palazzo-pant-black");
  expect(page.url()).toContain("/palazzo-pant-black");

  // Step 2: Dismiss the cookie consent overlay (if present)
  await dismissCookieConsent(page);

  // Step 3: Attempt to add the product to the bag without selecting a size
  await page.getByRole("button", { name: "Add to Bag" }).click();

  // Step 4: Verify the error message is displayed
  const errorMessage = page.locator(
    '[data-testid="product-detail-block-invalid-size"]'
  );
  await expect(errorMessage).toBeVisible(); // Assert the error message is visible
  await expect(errorMessage).toHaveText("You must select a size"); // Assert the error message text
});

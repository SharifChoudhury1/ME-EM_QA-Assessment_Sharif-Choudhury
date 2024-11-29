// Helper function to dismiss the cookie consent overlay if present
async function dismissCookieConsent(page) {
  const cookieOverlay = page.locator(".onetrust-pc-dark-filter");
  if (await cookieOverlay.isVisible()) {
    const acceptButton = page.locator("#onetrust-accept-btn-handler");
    if (await acceptButton.isVisible()) {
      await acceptButton.click();
      await page.waitForTimeout(500); // Allow the overlay to disappear
    }
  }
}

async function acceptAllCookies(page) {
  const acceptAllButton = page.getByRole("button", {
    name: "Accept All Cookies",
  });
  if (await acceptAllButton.isVisible()) {
    await acceptAllButton.click();
  }
}

module.exports = { dismissCookieConsent, acceptAllCookies };

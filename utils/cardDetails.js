// Utility function to fill card details
async function fillCardDetails(page) {
  // Fill card number
  const cardNumberFrame = page.frameLocator(
    'iframe[name="braintree-hosted-field-number"]'
  );
  await cardNumberFrame
    .locator('input[name="credit-card-number"]')
    .fill("4111111111111111");

  // Fill expiration date
  const expirationDateFrame = page.frameLocator(
    'iframe[name="braintree-hosted-field-expirationDate"]'
  );
  await expirationDateFrame.locator('input[placeholder="MM/YY"]').type("1225");

  // Fill CVV
  const cvvFrame = page.frameLocator(
    'iframe[name="braintree-hosted-field-cvv"]'
  );
  await cvvFrame.locator('input[name="cvv"]').fill("123");

  // Fill "Name on Card"
  const nameOnCardFrame = page.frameLocator(
    'iframe[name="braintree-hosted-field-cardholderName"]'
  );
  await nameOnCardFrame
    .locator('input[name="cardholder-name"]')
    .fill("Example Human");

  // Fill "Postcode"
  const postcodeFrame = page.frameLocator(
    'iframe[name="braintree-hosted-field-postalCode"]'
  );
  await postcodeFrame.locator('input[name="postal-code"]').fill("E13 9LE");
}

module.exports = { fillCardDetails };

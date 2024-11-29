// Utility function to fill delivery details
async function fillDeliveryDetails(page) {
  await page.getByLabel("First Name*").fill("Example");
  await page.getByLabel("Last Name*").fill("Human");
  await page.getByLabel("Phone Number*").fill("07812345678");
  await page.getByLabel("Address Line1*").fill("east, 143 railway");
  await page.getByLabel("County/State").fill("london");
  await page.getByLabel("Post code*").fill("E13 9LE");
  await page.getByLabel("City*").fill("london");
}

module.exports = { fillDeliveryDetails };

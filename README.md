## Setup Instructions

How to run the tests

1. **Install Dependencies**

After cloning the repo, go into your playwright tests folder by using cd "your test folder"

Install the required npm packages and dependencies by:

npm install

2. **Run the Tests**

To run all tests:

npx playwright test

To debug a specific test:

npx playwright test --debug

Running a Specific Test To run a specific test by name, use the --grep flag:

npx playwright test --grep "Test Name"

View Test Results After running the tests, a report will be generated. Open the HTML report to view results:

npx playwright show-report

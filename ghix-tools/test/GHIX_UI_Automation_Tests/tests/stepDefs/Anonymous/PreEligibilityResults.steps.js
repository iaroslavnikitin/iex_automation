const { Then } = require('cucumber');
const preEligibilityResults = require('../../pagemodels/Anonymous/PreEligibilityResultsPage.js');
const prop = require('../../common.utils/PropertyReader');
var state=prop.getEnvName();


Then('Verify PreEligibility Results Page', function () {
    preEligibilityResults.verifyPreEligibilityResultsPage();
}
);

Then('Click Previous To Go Back PreEligibility Page', function () {
  preEligibilityResults.clickPreviousButton();
}
);

Then('Click Next OR Start Application For Preferences OR Signup Page', function () {
  preEligibilityResults.clickNextOrStartApplicationButton();
}

);
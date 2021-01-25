const { Then, Given, When } = require('cucumber');
const preEligibility = require('../../pagemodels/Anonymous/PreEligibilityPage.js');

When(/^Global Data Json Updated With Anonymous Data(.*)$/, function (fileName) {
  preEligibility.getAnonymousDataAndUpdateGlobalDataJson(fileName);
});

Then('Verify PreEligibility Page', function () {
  preEligibility.verifyPreEligibilityPage();
});
Then('Enter Applicants Details On PreEligibilty Page For Non-Finanacial Flow', function () {

  preEligibility.enterApplicantDetailsForNonFinancialFlow();
 });

Then('Enter Applicants Details On PreEligibilty Page For Finanacial Flow', function () {

  preEligibility.enterApplicantDetailsForFinancialFlow();
});

Then('Remove Applicants Details On PreEligibilty Page', function () {
  preEligibility.removeDependentDetails();
});


Then('Click Check For Savings On PreEligibilty Page', function () {
  preEligibility.clickCheckForSavings();
});

Then('Click Browse Plans On PreEligibilty Page', function () {
  preEligibility.clickBrowsePlan();
});


Then('Click Skip And Signup From PreEligibilty Page', function(){
preEligibility.clickSkipAndSignUp();
});

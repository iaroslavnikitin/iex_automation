const {Given, Then, When} = require('cucumber');
const eligibility = require('../../pagemodels/MemberPortal/EligibilityOverview');

Then('Verify Eligibility Results', function(){
    eligibility.verifyEligibilityResults();
});
Then('Select Other Options for Medicaid Checkbox', function(){
    eligibility.selectOtherOptionsCheckbox();
});

Then('Click Continue To DashBoard', function(){
    eligibility.continueToDashBoardPage();
});

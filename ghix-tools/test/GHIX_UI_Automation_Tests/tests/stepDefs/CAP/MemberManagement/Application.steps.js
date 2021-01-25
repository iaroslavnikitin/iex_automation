const { Then } = require("cucumber");
const applicationPage = require("../../../pagemodels/CAP/MemberManagement/ApplicationPage");

Then("Click Actions Gear Icon", function () {
    applicationPage.clickOnActionsGearIcon();
});

Then("Click On Cancel", function () {
    applicationPage.clickOnCancel();
});

Then("Click On Change Coverage Start Date And Verify", function () {
    applicationPage.clickOnCoverageStartDateAndVerify();
});

Then("Click On Edit Application And Verify", function () {
    applicationPage.clickOnEditApplicationAndVerify();
});

Then("Click On Override Program Eligibility And Verify", function () {
    applicationPage.clickOnOverrideProgramEligibilityAndVerify();
});
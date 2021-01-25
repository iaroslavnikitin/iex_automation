const { Then } = require("cucumber");
const manageApplicantsModel = require("../../../pagemodels/CAP/MemberManagement/ManageApplicantsPage.js");
const adminDashboardModel = require("../../../pagemodels/CAP/AdminDashboardPage.js");
const { pauseBrowser } = require("../../../base/Browser.js");


Then("Search For Applicant With Full Name", function () {
    
    adminDashboardModel.clickManageApplicants();
    manageApplicantsModel.searchForApplicantWithFullName();
  });

Then("Search For Applicant With Full Name And SSN", function () {
    
    adminDashboardModel.clickManageApplicants();
    manageApplicantsModel.searchForApplicantWithFullNameAndSSN();
  });

  Then("Click On Primary Contact Member Link", function () {
    
    manageApplicantsModel.clickOnPrimaryContactLink();
  }); 
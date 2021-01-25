const { Then } = require("cucumber");
const viewmember = require("../../../pagemodels/CAP/MemberManagement/ViewMemberPage.js");

Then("Set RIDP Status as Marked As Verified On View Member Page And Logout", function () {
  viewmember.setRIDPStatusAsVerifiedAndLogout();
  });
  
  Then("Click On Enrollments Link To Go To Enrollment Page", function () {
    viewmember.clickOnEnrollments();
  });

  Then("Click On View Member Account", function () {
    viewmember.clickOnViewMemberAccount();
  });
  
  Then("Click On Applications Link To Go To Application Page", function () {
    viewmember.clickOnApplications();
  });
  Then(/^Click History On CAP And Verify Event For(.*)$/, function (event) {
    viewmember.clickOnHistoryAndVerifyEnrollmentEvent(event);
  }
  );
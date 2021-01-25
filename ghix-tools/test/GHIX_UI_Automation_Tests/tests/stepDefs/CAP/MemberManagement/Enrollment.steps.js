const { Then } = require("cucumber");
const enrollmentPage = require("../../../pagemodels/CAP/MemberManagement/EnrollmentPage.js");
const enrollmentDBQueries=require("../../../pagemodels/CAP/MemberManagement/EnrollmentDatabaseQueries.js");

Then("Verify Enrollment Page", function () {
  enrollmentPage.verifyEnrollmentPage();
});

Then("Select Coverage Year", function () {
  enrollmentPage.selectCoverageYear();
});

Then("Get Health Plan Enrollment Details", function () {
  enrollmentPage.getHealthPlanEnrollmentDetails();
});
Then("Verify Health Plan Enrollment Details", function () {
  enrollmentPage.verifyHealthPlanEnrollmentDetails();
});

Then("Click On Show Premium History Under Health Plan And Verify", function () {
  enrollmentPage.clickOnHealthPlanShowPremiumHistory();
}
);
Then("Go Back To Enrollment Page", function () {
  enrollmentPage.goBackToEnrollmentPage();
}
);
Then("Click Actions Gear Icon Under Enrollment Premium History And Verify", function () {
  enrollmentPage.clickActionsUnderHealthPlanShowPremiumHistory();
}
);
Then("Click Cancel On Edit Tool", function () {
  enrollmentPage.clickCancelOnEditTool();
}
);
Then("Select Reason For Enrollment Cancel", function () {
  enrollmentPage.selectReasonForEnrollmentCancel();
}
);
Then("Enter Comment For Enrollment Cancel", function () {
  enrollmentPage.enterCommentForEnrollmentCancel();
}
);
Then("Click Submit For Enrollment Cancel And Verify Success Popup", function () {
  enrollmentPage.submitEnrollmentCancelAndVerifySuccessPopup();
}
);
Then(/^Update Health Plan Enrollment Details For Enrollment (.*)$/, function (event) {
  enrollmentPage.updateHealthPlanEnrollmentDetails(event);
}
);
Then("Verify Enrollment Start Date And Enrollment End Date On Enrollment Edit Tool", function () {
  enrollmentPage.verifyEnrollmentStartAndEndDatesAfterEnrollmentCancel();
}
);
Then("Verify Member Level Details On Enrollment Edit Tool", function () {
  enrollmentPage.verifyMemberLevelDetails();
}
);
Then(/^Verify Monthly Gross Premium Net Premium And EHB Premium On Enrollment Edit Tool For(.*)$/, function (event) {
  enrollmentPage.verifyPremiumDataOnEnrollmentEditTool(event);
}
);
Then("Verify Enrollment Table In DB", function (){
  enrollmentDBQueries.verifyEnrollmentTableInDB();
}
);
Then(/^Verify Enrollment Premium Table In DB For Enrollment (.*)$/, function (enrollStatus){
  enrollmentDBQueries.verifyEnrollmentPremiumTableInDB(enrollStatus);
}
);
Then(/^Verify Enrollment Event Table In DB For Enrollment (.*)$/, function (enrollStatus){
  enrollmentDBQueries.verifyEnrollmentEventTableInDB(enrollStatus);
}
);
Then("Click On Resend 834 History Under Health Plan And Verify", function () {
  enrollmentPage.clickOnHealthPlanResend834History();
}
);
Then("Click On Resend Latest 834 Transaction Under Health Plan And Verify", function () {
  enrollmentPage.clickOnHealthPlanResendLatest834Transaction();
}
);
Then("Click On Additional Information Under Health Plan And Verify", function () {
  enrollmentPage.clickOnHealthPlanAdditionalInfo();
}
);
Then("Click On Show Premium History Under Dental Plan And Verify", function () {
  enrollmentPage.clickOnDentalPlanShowPremiumHistory();
}
);
Then("Click On Resend 834 History Under Dental Plan And Verify", function () {
  enrollmentPage.clickOnDentalPlanResend834History();
}
);
Then("Click On Resend Latest 834 Transaction Under Dental Plan And Verify", function () {
  enrollmentPage.clickOnDentalPlanResendLatest834Transaction();
}
);
Then("Click On Additional Information Under Dental Plan And Verify", function () {
  enrollmentPage.clickOnDentalPlanAdditionalInfo();
}
);
Then("Click Actions Gear Icon Under Health Plan And Verify", function () {
  enrollmentPage.clickOnHealthPlanActions();
}
);
Then("Click Actions Gear Icon Under Dental Plan And Verify", function () {
  enrollmentPage.clickOnDentalPlanActions();
}
);
Then("Click On Override Enroll Status Under Health Plan And Verify", function () {
  enrollmentPage.clickOnHealthPlanOverrideEnrollStatusAndClosePopup();
});
Then("Click On Override Enroll Status Under Dental Plan And Verify", function () {
  enrollmentPage.clickOnDentalPlanOverrideEnrollStatusAndClosePopup();
});

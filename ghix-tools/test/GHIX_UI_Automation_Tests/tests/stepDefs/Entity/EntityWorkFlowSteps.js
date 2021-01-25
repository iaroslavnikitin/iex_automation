const { Then, When } = require('cucumber');
const prop = require('../../common.utils/PropertyReader');
var state = prop.getEnvName();
const entity = require('../../pagemodels/Entity/EntityWorkFlow.js');
const searchCounselor = require('../../pagemodels/Entity/SearchCounselor');
const entityAdmin = require('../../pagemodels/Entity/EntityAdmin');
const landingPage = require('../../pagemodels/HomePage/LandingPage');
const loginPage = require('../../pagemodels/UserAccountManagement/LogInPage');
const reporter = require('@wdio/allure-reporter').default;


When(/^I Click Enrollment Entities Link On Landing Page$/, function () {
  reporter.addDescription("<p style='color:blue'><b>Entity flow test for "+state+"</b></p>","html");
  landingPage.clickOnEnrollmentEntities();
});

Then(/^I Enter Basic Information Of An Entity And Click Submit(.+)$/, function (filename) {
  entity.createEntityAccount(filename);
});

Then(/^I Enter Business Information Of An Entity And Click Next$/, function () {
  entity.setEntityInformation();
});

Then(/^I Enter Served Population Information And Click Next$/, function () {
  entity.addPopulationServedInformation();
});

Then(/^I Enter Locations And Hours Information Of Primary Site$/, function () {
  entity.addPrimarySiteLocationAndHours();
});

Then(/^I Click Add Sub-Site Button$/, function () {
  entity.addSubSiteDetails();
});

Then(/^I Enter Locations And Hours Information Of Sub Site$/, function () {
  entity.addSubSiteLocatonAndHours();
});

Then(/^I Click Done Button$/, function () {
  entity.clickDoneOnSubsitePage();
});

Then(/^I Enter Contact Information And Click Next$/, function () {
  entity.addContactInformation();
});

Then(/^I Click On Add Certified Enrollment Counselor$/, function () {
  entity.clickCertifiedEnrollmentCounselors();
});

Then(/^I Enter Counselor Information And Click Save$/, function () {
  entity.addCertifiedEnrollmentCounselors();
});

Then(/^I Upload The Document On Document Upload Page$/, function () {
  entity.documentUpload();
});

Then(/^I Click Next To Payment Information Page$/, function () {
  entity.clickNextToPayment();
});

Then(/^I Enter Payment Information and Click Submit$/, function () {
  entity.addPaymentInformation();
});

Then(/^I Should See Registartion Success PopUp$/, function () {

  entity.verifySuccessModel();
});

Then(/^I Should See Registation Status As Pending$/, function () {
  entity.verifyRegistrationStatus();
});

Then(/^I Select Manage Entities From Entities Tab$/, function () {
  entityAdmin.clickOnManageEntity();
});

Then(/^I Search For The Entity Using Entity Name$/, function () {
  entityAdmin.searchEntity();
});

Then(/^I Activate The Entity Status$/, function () {
  entityAdmin.activateEntity();
});

Then(/^I Should See Enrollment Status As Active$/, function () {
  entityAdmin.verifyEnitityStatus();
});

Then(/^I Should See Counselor Status As Certified$/, function () {
  entityAdmin.verifyCounselorStatus();
});

Then(/^I Click On Enrollment Counselors Tab$/, function () {
  entityAdmin.clickOnEnrollmentCouselors();
});

Then(/^I Click On Manage Enrollment Counselor$/, function () {
  entityAdmin.clickOnManageCounselors();
});

Then(/^I Search For The Counselor Using Counselor Name$/, function () {
  entityAdmin.searchCounselor();
});

Then(/^I Certify The Counselor$/, function () {
  entityAdmin.certifyCounselor();
});

Then(/^I Activate The Counselor$/, function () {
  entityAdmin.activateCounselor();
});

Then(/^I Activate Entity Account$/, function () {
  entityAdmin.activateEntityAccount();
});

Then(/^I Fill the Details of the Counselor and Click Submit$/, function () {
  entityAdmin.setUpCounselorAccount();
});
Then(/^I Should Be Navigated To DashBoard$/, function () {
  entityAdmin.verifyDashBoard();
});
Then(/^I Click LogOut On Counselor DashBoard$/, function () {

 // if(state.toUpperCase() != 'PA'&&state.toUpperCase() != 'ID'){
  if(state.toUpperCase() != 'ID'){
    loginPage.logout();
  }
});

Then(/^I Click Find Local Assistance From Help&Support Tab$/, function () {
  if(state.toUpperCase() != 'ID'){
  searchCounselor.clickFindLocalAssistance();
  }
});

Then(/^I Click On Find Certified Enrollment Counselor Link$/, function () {
  if(state.toUpperCase() != 'ID'){
    searchCounselor.clickFindCertifiedCounselor();
  }
  
});
Then(/^I Search For The Counselor Using Entity Name$/, function () {
  if(state.toUpperCase() != 'ID'){
  searchCounselor.searchForCertifiedCounselor();
  }
});

Then(/^I Click On Entity Name On The Results Window$/, function () {
  if(state.toUpperCase() != 'ID'){
  searchCounselor.clickonConsumerName();
  }
});

Then(/^I Should See Entity Details$/, function () {
  if(state.toUpperCase() != 'ID'){
  searchCounselor.verifyEntityDetails();
  }
});

Then(/^I Click On Show Certified Enrollment Counselors Link$/, function () {
  if(state.toUpperCase() != 'ID'){
  searchCounselor.clickShowCertifiedEnrollmentCounselor();
  }
});

Then(/^I Click On Counselor Name On The Results Window$/, function () {
  if(state.toUpperCase() != 'ID'){
  searchCounselor.clickonCounselorName();
  }
});

Then(/^I Should See Counselor Details On Results Window$/, function () {
  if(state.toUpperCase() != 'ID'){
  searchCounselor.verifyCounselorDetails();
  }

});



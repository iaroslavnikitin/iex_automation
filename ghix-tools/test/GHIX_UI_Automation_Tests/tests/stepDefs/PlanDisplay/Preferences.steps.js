const {Given, Then, When} = require('cucumber');
// const  HomePage = require('../pageobjects/HomePage');
const preferences = require('../../pagemodels/PlanDisplay/PreferencesPage.js');
const preJson = require('../../../resources/selectors/common/PlanDisplay/PreferencesPageObject.json');
// const SignUp = require('../pageobjects/SignUpPage');
const prop = require('../../common.utils/PropertyReader');
var state=prop.getEnvName();
var data;

Given(/^Navigate To Anonymous Shopping URL(.*)$/, function (fileName) {
  preferences.navigateToAnonymousShoppingUrl(fileName);
  
});

Then('Click Skip To View Plans', function(){
  preferences.clickSkipToViewPlans();
    
});

Then('Verify Elements On Doctor Visits Page', function(){
  preferences.verifyElementsOfDoctorVisits();
    
});

Then('Verify Elements On Monthly Subscription Page', function(){
  preferences.verifyElementsOfMonthlySubscription();
    
});

Then('Verify Prescription Drug Page', function(){
  preferences.verifyElementsOfPrescriptionDrug();
    
});


Then('Verify Optional Benefits Page', function(){
  preferences.verifyElementsOfOptionalBenefits();
    
});

Then('Select Applicant Preferences', function (){
 preferences.selectPreferences();

});





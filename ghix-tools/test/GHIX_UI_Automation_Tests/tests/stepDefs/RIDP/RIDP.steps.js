const {Given, Then, When} = require('cucumber');
const  RIDPPageModel = require('../../pagemodels/RIDP/RIDPPage.js');
const reporter = require('@wdio/allure-reporter').default;
const state = stateProfile;
const  logIn = require('../../pagemodels/UserAccountManagement/LogInPage.js');


Then('Click On Get Started On RIDP Page', function(){
    reporter.addDescription("<p style='color:blue'><b>RIDP flow test for " + state + "</b></p>", "html");
    RIDPPageModel.clickGetStarted();
});


Then('Click Continue On RIDP Contact Information Page', function(){
    RIDPPageModel.clickContinueOnContactInformationPage();
});

Then(/^Proceed With Manual Verification (.*) And Upload Document (.*)$/, function(user,role){
    console.log("*******"+user);
    let emailPassword = logIn.retieveLoginCredentials(user,role);
    RIDPPageModel.clickProceedWithManualVerification(emailPassword[0],emailPassword[1]);
});


Then('Click Proceed With Manual Verification On Finish Page', function(){
    RIDPPageModel.clickProceedWithManualVerificationOnFinishPage();
});


Then('Upload Document on Manual Verification Page', function(){
    RIDPPageModel.uploadDocumentOnManualVerificationPage();
});



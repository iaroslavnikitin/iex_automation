
const { Given, Then, When } = require('cucumber');
const individualSignup = require('../../pagemodels/UserAccountManagement/IndividualSignupPage.js');
const commonfunc = require('../../pagemodels/UserAccountManagement/Commom_UAMFunction')
const reporter = require('@wdio/allure-reporter').default;
const prop = require('../../common.utils/PropertyReader');
var state = prop.getEnvName();




Then(/^Signup An Individual (.*)$/, function (fileName) {
    individualSignup.setUpIndividualAccount(fileName);
});

Then(/^Click Cancel And Verify Landing Page$/, function () {
    individualSignup.clickCancelAndVerifyLandingPage();

});

Then(/^Verify Sign Up Page$/, function () {
    individualSignup.verifySignUpPage();

});

Then(/^Verify Signup Page For Mandatory Fields$/, function () {
    individualSignup.verifySignupPageForMandatoryFields();

});

Then(/^Verify Signup Page For Invalid Data (.*)$/, function (fileName) {
    console.log("file name==" + fileName)
    individualSignup.verifySignupPageForInvalidData(fileName);

});

Then(/^Create Individual Account And RIDP Verify(.*),(.*)$/, function (fileName, role) {
    reporter.addDescription("<p style='color:blue'><b>SSAP flow test for " + state + "</b></p>", "html");
    commonfunc.createIndividualAccountAndVerify(fileName, role);
});
Then(/^Setup Individual Account(.*),(.*) And Logout$/, function (fileName, role) {
    reporter.addDescription("<p style='color:blue'><b>CAP flow test for " + state + "</b></p>", "html");
    commonfunc.createIndividualAccountAndLogout(fileName, role);
});

Then(/^Create Account For An Individual(.*),(.*)$/, function (fileName, role) {
    //reporter.addDescription("<p style='color:blue'><b>RIDP flow test for " + state + "</b></p>", "html");
    commonfunc.createIndividual(fileName, role);
});


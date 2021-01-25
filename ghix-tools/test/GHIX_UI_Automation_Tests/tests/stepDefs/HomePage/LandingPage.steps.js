const { Given, Then, When } = require('cucumber');
const  global = require('../../pagemodels/Global_include');
const landingPage = require('../../pagemodels/HomePage/LandingPage.js');
const reporter = require('@wdio/allure-reporter').default;
const browser = require('../../base/Browser');
const state=stateProfile;
const commonConfig = require('../../common.utils/CommonConfig.js');

Given('I Am On Landing Page', function () {
  landingPage.navigateToUrl();
  //landingPage.verifyLandingPage(); 
});

Then('Verify Landing Page', function () {
  landingPage.verifyLandingPage();
});

When('I Click Start Shopping', function () {
  reporter.addDescription("<p style='color:blue'><b>Anonymous flow test for "+state+"</b></p>","html");
  landingPage.clickOnStartShopping();
});

Then('I Click Log In Link', function () {
  landingPage.clicklogIn();
});

  Then("Click Agent Broker Link In Footer", function () {
  reporter.addDescription("<p style='color:blue'><b>Agent flow test for "+state+"</b></p>","html");
  landingPage.clickAgentBrokerLink();
});
Then ('Update Global Data Json With Application Details', function (){  
landingPage.updateGlobalDataJsonWithAppTypeAndServerDate();
});


Then('Click Agency Link',function(){
  landingPage.clickAgencyLink();
});

/*Given('I am on Landing Page and Verify', function(){

    I am on Landing Page();
    Verify Landing Page();

});*/




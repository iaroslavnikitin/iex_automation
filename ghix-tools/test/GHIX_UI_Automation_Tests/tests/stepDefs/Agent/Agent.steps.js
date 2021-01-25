const { Then } = require("cucumber");
const agent = require("../../pagemodels/Agent/Agent");
const agentAccountSetupPageModel=require("../../pagemodels/Agent/AgentAccountSetupPage");
const reporter = require('@wdio/allure-reporter').default;
const prop = require('../../common.utils/PropertyReader');
var state=prop.getEnvName();
const  global = require('../../pagemodels/Global_include');

//MOVING TO LANDING PAGE
// Then("Click Health Insurance Agent", function () {
//   reporter.addDescription("<p style='color:blue'><b>Agent flow test for "+state+"</b></p>","html");
//agent.clickAgent();
// });

// Then (/^Create New Agent(.*)$/,function (dataFileName) // moved to agentaccountsetups page
// {
//   let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1; 
//   global.updateDataJson.agencies[agencyIndex]=require("../../../resources/data/Common/Agent/"+dataFileName);
//   agentAccountSetupPageModel.setAgentDetails();
//   logger.log("email=" + global.updateDataJson.agencies[agencyIndex].agent.email);
//   logger.log("***** On Agent Account Setup Page*****");
//   agentAccountSetupPageModel.setAccountSetupPageDetails()
// });


// OLD METHODS UNMOVED below this point
Then("Verify Health Insurance Agent Signup Page", function () {
  agent.verifyAgentSignupPage();
});

Then(/^Register New Agent Account(.*)$/, function (fileName) {

  agent.newAgentSetUp(fileName);
});


Then("Verify New Agent Registration Page", function () {
  agent.verifyAgentRegistrationPage();
});
Then("New Agent Registration", function () {
  agent.newAgentRegister();
});
Then("Verify Profile Information Page", function () {
  agent.verifyAgentProfilePage();
});
Then("Enter New Agent Profile Information", function () {
  agent.enterProfileDetails();
});

Then("Click on Account Registration Complete", function () {
  agent.clickCloseOnAccountRegistrationComplete();
});

// Then("Verify Certification Status", function () {
//   agent.verifyCertificationStatus();
// });

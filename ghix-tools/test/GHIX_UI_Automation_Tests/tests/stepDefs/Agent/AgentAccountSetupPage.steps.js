const { Then } = require("cucumber");
const agent = require("../../pagemodels/Agent/Agent");
const agentAccountSetupPageModel=require('../../pagemodels/Agent/AgentAccountSetupPage');
const agentInformationPageModel=require('../../pagemodels/Agent/AgentInformationPage');
const agentProfilePageModel=require('../../pagemodels/Agent/AgentProfilePage');
const agentCertificationPageModel=require('../../pagemodels/Agent/AgentCertificationPageModel');
const reporter = require('@wdio/allure-reporter').default;
const prop = require('../../common.utils/PropertyReader');
var state=prop.getEnvName();
const  global = require('../../pagemodels/Global_include');
const  logger = require('../../common.utils/LoggerUtil');

Then (/^Create New Agent(.*)$/,function (dataFileName)
{
    let agencyIndex = global.updateDataJson.agencies.length;
    global.updateDataJson.agencies[agencyIndex]=require("../../../resources/data/Common/Agent/"+dataFileName);
    agentAccountSetupPageModel.setAgentDetails();
    agentAccountSetupPageModel.fillAccountSetupPageDetails();
    global.updateDataJson.agencies[agencyIndex].agent.username=global.updateDataJson.agencies[agencyIndex].agent.email;
    logger.log("AGENT USERNAME=" + global.updateDataJson.agencies[agencyIndex].agent.username + " PASSWORD "+global.updateDataJson.agencies[agencyIndex].agent.password);
    agentInformationPageModel.verifyPrepopulatedFieldsOnAgentRegistration();
    agentInformationPageModel.fillAgentInformationPageDetails(true);
    //agentProfilePageModel.verifyPrepopulatedFieldsOnProfile();
    agentProfilePageModel.enterProfilePageDetails(true);
    agentProfilePageModel.clickCloseOnAccountRegistrationComplete();
    agentCertificationPageModel.verifyCertificationStatus("agent");



});

Then(/^Add New Agent To Agency(.*)$/,function(dataFileName)
{
    let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
    global.updateDataJson.agencies[agencyIndex]=require("../../../resources/data/Common/"+dataFileName);
    agentAccountSetupPageModel.setAgentDetails();


    logger.log("FORM STEP AGENT USERNAME after account setup=" + global.updateDataJson.agencies[agencyIndex].agent.username + " PASSWORD "+global.updateDataJson.agencies[agencyIndex].agent.password);
    agentInformationPageModel.enterFirstAndLastName();
    agentInformationPageModel.fillAgentInformationPageDetails(false);
   // agentProfilePageModel.verifyPrepopulatedFieldsOnProfile();
    agentProfilePageModel.enterProfilePageDetails(false);
    agentProfilePageModel.clickCloseOnAccountRegistrationComplete();
   // agentCertificationPageModel.verifyCertificationStatus("agent");
});
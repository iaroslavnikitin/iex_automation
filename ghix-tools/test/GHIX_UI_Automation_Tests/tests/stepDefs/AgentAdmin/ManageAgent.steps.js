const { Then } = require("cucumber");
//const agentCertificationPageModel=require('../../pagemodels/Agent/AgentCertificationPageModel')
const manageAgentsModel=require('../../pagemodels/AgentAdmin/ManageAgentsPageModel');
const reporter = require('@wdio/allure-reporter').default;
const prop = require('../../common.utils/PropertyReader');
var state=prop.getEnvName();
const  global = require('../../pagemodels/Global_include');
const  logger = require('../../common.utils/LoggerUtil');


Then(/^Search For \"([^\"]*)\"$/, function (role) {
    let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
    manageAgentsModel.searchForAgentOrAgencyManager(global.updateDataJson.agencies[agencyIndex][role]);
});

Then ("Click On Edit Option In Actions Menu",function() {

    manageAgentsModel.clickOnEditAction();
});
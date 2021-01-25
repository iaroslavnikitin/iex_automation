const { Then } = require("cucumber");
//const agentCertificationPageModel=require('../../pagemodels/Agent/AgentCertificationPageModel')
const topNavModel=require('../../pagemodels/AgentAdmin/TopNavBarModel');
//const reporter = require('@wdio/allure-reporter').default;
const prop = require('../../common.utils/PropertyReader');
//var state=prop.getEnvName();
//const  global = require('../../pagemodels/Global_include');
const  logger = require('../../common.utils/LoggerUtil');


Then("Go To Manage Agents Page", function () {
    topNavModel.selectManageAgents();
});

Then (/^Go To Manage Admin Staff Page$/,function()
{
    topNavModel.selectManageAdminStaff();

});
const { Then } = require("cucumber");
//const agent = require("../../pagemodels/Agent/Agent");
//const agentAccountSetupPageModel=require('../../pagemodels/Agent/AgentAccountSetupPage');
//const agentInformationPageModel=require('../../pagemodels/Agent/AgentInformationPage');
//const agentCertificationPageModel=require('../../pagemodels/Agent/AgentCertificationPageModel')

const dashboardModel=require('../../pagemodels/Agent/AgentDashboardPageModel');
const reporter = require('@wdio/allure-reporter').default;
const prop = require('../../common.utils/PropertyReader');
var state=prop.getEnvName();
const  global = require('../../pagemodels/Global_include');
const  logger = require('../../common.utils/LoggerUtil');

Then(/^I Should Be Navigated To \"([^\"]*)\" Dashboard$/, function (role) {

    dashboardModel.verifyUserLandedOnDashboard();



});
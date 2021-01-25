const { Then } = require("cucumber");
const agent = require("../../pagemodels/Agent/Agent");
const agentAccountSetupPageModel=require("../../pagemodels/Agent/AgentAccountSetupPage");
const reporter = require('@wdio/allure-reporter').default;
const prop = require('../../common.utils/PropertyReader');
var state=prop.getEnvName();
const  global = require('../../pagemodels/Global_include');
const searchAgentPageModel=require('../../pagemodels/LocalAssistance/AgentSearchPageModel');
const constants=require('../../common.utils/ConstantsAgentAgency')

Then(/^Search For Certified Agent Or Agency Manager \"([^\"]*)\"$/, function(role)
{
    let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
    searchAgentPageModel.ssearchForCertifiedAgent(global.updateDataJson.agencies[agencyIndex][role]);
    // let searchDetails = {
    //     tb_agent_firstName: global.updateDataJson.agencies[agencyIndex].agent.firstName,
    //     tb_agent_lastName: global.updateDataJson.agencies[agencyIndex].agent.lastName,
    //     tb_agent_businessName: global.updateDataJson.agencies[agencyIndex].agency.agencyName,
    //     btn_submit: ""
    // };
    // if(role=="AgencyManager")
    //     searchAgentPageModel.ssearchForCertifiedAgent(global.updateDataJson.agencies[agencyIndex].agencyManager); //remove extra s
    // //if(role=="Agent")
    //     searchAgentPageModel.ssearchForCertifiedAgent(global.updateDataJson.agencies[agencyIndex].agent);//REMOVE S

});


Then(/^Search For Certified Agent with data of \"([^\"]*)\" With Index \"([^\"]*)\"$/, function(role,index)//new
{
    let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
    if((index==undefined) || (index == null) || (index=="")) index=0;
    let userRole=constants.getUserRoleFromString(role);
    searchAgentPageModel.ssearchForCertifiedAgent(global.updateDataJson.agencies[agencyIndex][userRole][index]);


});

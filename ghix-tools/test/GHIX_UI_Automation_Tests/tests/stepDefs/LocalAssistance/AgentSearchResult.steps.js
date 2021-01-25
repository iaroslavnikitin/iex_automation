const { Then } = require("cucumber");
const agent = require("../../pagemodels/Agent/Agent");
const agentAccountSetupPageModel=require("../../pagemodels/Agent/AgentAccountSetupPage");
const reporter = require('@wdio/allure-reporter').default;
const prop = require('../../common.utils/PropertyReader');
var state=prop.getEnvName();
const  global = require('../../pagemodels/Global_include');
const searchResultModel=require('../../pagemodels/LocalAssistance/AgentSearchResultPageModel');
const searchResultLocators=require('../../../resources/selectors/common/LocalAssistance/AgentSearchResult.json')
const browser=require('../../base/Browser');
const constants=require('../../common.utils/ConstantsAgentAgency')
const  logger = require('../../common.utils/LoggerUtil');

Then(/^Verify \"([^\"]*)\" Is Found In The Search Results By Name and Email$/, function(role)
{
    let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
    searchResultModel.verifyAgentName(eval(searchResultLocators.agentNameInSearchResultTable),global.updateDataJson.agencies[agencyIndex][role].firstName,global.updateDataJson.agencies[agencyIndex][role].lastName);
    searchResultModel.verifyAgentEmail(eval(searchResultLocators.agentContactInfo),global.updateDataJson.agencies[agencyIndex][role].publicEmail);
});

// Then(/^Verify Agency Manager Is Found In The Search Results By Name and Email$/, function()
// {
//     let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
//     searchResultModel.verifyAgentName(eval(searchResultLocators.agentNameInSearchResultTable),global.updateDataJson.agencies[agencyIndex].agencyManager.firstName,global.updateDataJson.agencies[agencyIndex].agencyManager.lastName);
//     searchResultModel.verifyAgentEmail(eval(searchResultLocators.agentContactInfo),global.updateDataJson.agencies[agencyIndex].agencyManager.publicEmail);
// });


Then(/^Verify \"([^\"]*)\" Is NOT Found In The Search Results By Name and Email$/, function(role)
{
    let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
    var adminStaffIndex = role.match(/(\d+)/);
    let uRole=role.slice(0,role.search(/(\d+)/));
    logger.log("********** UserRole="+uRole+"**********");
    let userRole=constants.getUserRoleFromString(uRole.trim());
    //var adminStaffIndex = role.match(/(\d+)/);

    searchResultModel.verifyUserIsNotFound(eval(searchResultLocators.searchResultHeader),global.updateDataJson.agencies[agencyIndex][userRole][adminStaffIndex[0]].firstName,global.updateDataJson.agencies[agencyIndex][userRole][adminStaffIndex[0]].lastName)
});
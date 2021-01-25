const { Then } = require("cucumber");
const manageAdminStaffModel=require('../../pagemodels/AgentAdmin/ManageAgentsPageModel');
const reporter = require('@wdio/allure-reporter').default;
const prop = require('../../common.utils/PropertyReader');
var state=prop.getEnvName();
const  global = require('../../pagemodels/Global_include');
const  logger = require('../../common.utils/LoggerUtil');
const agentConstants=require('../../common.utils/ConstantsAgentAgency')
const dataUtil = require('../../common.utils/DataUtil')

const adminStaffLocators=require('../../../resources/selectors/common/AgentAdmin/ManageAdminStaffPage.object.json');
const adminStaffDetails=require('../../../resources/selectors/common/AgentAdmin/AdminStaffDetails.object.json');
const leftNavContent=require('../../../resources/content/common/AgentAdmin/AdminStaffDetailsLeftNav.content')
const browser = require('../../base/Browser')

Then(/^Search For \"([^\"]*)\" on Agent Admin Portal$/, function (role) {
    let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
    var adminStaffIndex = role.match(/(\d+)/);
    let dataJson=global.updateDataJson.agencies[agencyIndex].adminStaffs[adminStaffIndex[0]];
    let searchData = {
        tb_firstName: dataJson.firstName,
        tb_lastName: dataJson.lastName,
        tb_businessName: global.updateDataJson.agencies[agencyIndex].agency.businessName, //"Blake",
        sb_approvalStatus:dataJson.approvalStatus,
        btn_go:""
    };
    dataUtil.doFormFill(adminStaffLocators.leftNav,searchData);
    logger.log("***** Admin Staff Search Data Submitted *****");
});

Then(/^Go to Approval Status Page$/,function()
{
    browser.waitForPageToLoadAndCheckPartialHeaderText(eval(adminStaffDetails.leftNav.leftNavHeader),leftNavContent.leftNavHeader);
    browser.click(eval(adminStaffDetails.leftNav.lk_approvalStatus));
    logger.log("***** Clicked On Approval Status Tab On Left Nav *****");

});
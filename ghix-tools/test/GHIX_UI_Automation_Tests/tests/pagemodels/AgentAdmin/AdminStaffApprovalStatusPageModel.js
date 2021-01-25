const  global = require('../Global_include');
const dataUtil=require('../../common.utils/DataUtil');
const browser = require("../../base/Browser.js");
const  logger = require('../../common.utils/LoggerUtil');

const approvalStatusLocators=require('../../../resources/selectors/common/AgentAdmin/AdminStaffDetails.object.json');
const approvalStatusContent=require('../../../resources/content/common/AgentAdmin/AdminStaffApprovalStatusPage.content')
const content = require("../../../resources/content/common/Agent/AgentAdminPage.content.js");
const  jsonUtil = require('../../common.utils/JsonUtil');
const agentConstants=require('../../common.utils/ConstantsAgentAgency')
const fileUploadUtil=require('../../common.utils/FileUploadUtil')
const date=require('../../common.utils/CommonDateFunction');
const assert = require("../../base/Assert");
const dbQuery = require('../../pagemodels/AdminStaff/AdminStaffDataBaseQueries');
const random =require ('../../common.utils/RandomDataGenerator')


class AdminStaffApprovalStatusPageModel {
    updateApprovalStatus(newStatus)
    {
        browser.waitForPageToLoadAndCheckPartialHeaderText(eval(approvalStatusLocators.rightPanel.approvalStatus.viewMode.pageHeader),approvalStatusContent.viewMode.pageHeader)
        logger.log("***** Admin Staff Approval Status Page is Loaded*****");
        browser.click(eval(approvalStatusLocators.rightPanel.approvalStatus.viewMode.btn_edit));
        logger.log("***** Clicked On Edit Button *****");
        browser.waitForElementToDisplay(eval(approvalStatusLocators.rightPanel.approvalStatus.editMode.sb_newStatus));
        logger.log("***** Admin Staff Edit Approval Status Page Is Loaded *****");
        let statusObject=
            {
                sb_newStatus:newStatus,
                tb_comment:random.getRandomString(25,false)
            }
        dataUtil.doFormFill(approvalStatusLocators.rightPanel.approvalStatus.editMode,statusObject);
        browser.waitUntilElementIsClickable(approvalStatusLocators.rightPanel.approvalStatus.editMode.btn_submit);
        browser.click(eval(approvalStatusLocators.rightPanel.approvalStatus.editMode.btn_submit));
        browser.waitForElementToBeInvisible(eval(approvalStatusLocators.rightPanel.approvalStatus.editMode.btn_submit));
        logger.log("***** Admin Staff Approval Status Updates Are Submitted *****");
    };

    verifyApprovalStatus(staffIndex,expectedStatus)
    {
        let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
        logger.log("***** " + eval(approvalStatusLocators.rightPanel.approvalStatus.viewMode.lbl_approvalStatus).getText() + "On UI: " + eval(approvalStatusLocators.rightPanel.approvalStatus.viewMode.approvalStatus).getText() + " *****");
       // browser.pauseBrowser(2000);
        browser.waitForElementToDisplay(eval(approvalStatusLocators.rightPanel.approvalStatus.viewMode.approvalNumber));
        assert.assertElementContainsText(eval(approvalStatusLocators.rightPanel.approvalStatus.viewMode.approvalStatus), expectedStatus);

         this.verifyApprovalStatusFromDB(global.updateDataJson.agencies[agencyIndex].adminStaffs[staffIndex].personalEmail,expectedStatus);
    }
/// move to common file
   async  verifyApprovalStatusFromDB(email,expectedStatus)
    {
        logger.log("***** Verifying Approval Status From DB *****");
        logger.log("***** Searching for the Admin Staff With Personal Email: "+email+" in DB *****")
        let queryResult = await dbQuery.getApprovalStatusFromDB(email,expectedStatus);
        assert.assertTrue(queryResult);
        browser.waitUntil(() => queryResult !== null);
    }
}
module.exports = new AdminStaffApprovalStatusPageModel();
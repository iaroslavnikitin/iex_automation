const prop = require('../../common.utils/PropertyReader');
var state = prop.getEnvName();
const  jsonUtil = require('../../common.utils/JsonUtil');
const dataUtil=require('../../common.utils/DataUtil')
const random=require('../../common.utils/RandomDataGenerator')
const address = require('../../../resources/data/address.json')
const approvalStatusLocators=require('../../../resources/selectors/common/AdminStaff/AdminStaffApprovalStatusPage.object.json');
const adminStaffApprovalStatusContent=require('../../../resources/content/common/AdminStaff/AdminStaffApprovalStatusPage.content');
const statuses=require('../../common.utils/ConstantsAgentAgency')
const dbQuery = require('./AdminStaffDataBaseQueries')
const browser = require('../../base/Browser');
const  logger = require('../../common.utils/LoggerUtil');
const assert = require("../../base/Assert.js");
const  global = require('../Global_include');

class AdminStaffApprovalStatusPageModel {


    verifyApprovalStatus(adminStaffIndex,expectedStatus) {

        browser.waitForPageToLoadAndCheckPartialHeaderText(eval(approvalStatusLocators.rightPanel.rightPanelHeader), adminStaffApprovalStatusContent.rightPanelHeader);
        browser.pauseBrowser(1000);
        logger.log("***** UI:" + eval(approvalStatusLocators.rightPanel.lbl_approvalStatus).getText() + ": " + eval(approvalStatusLocators.rightPanel.approvalStatus).getText() + " *****");
        assert.assertElementContainsText(eval(approvalStatusLocators.rightPanel.approvalStatus),expectedStatus);
        logger.log("***** Verifying Approval Status From DB *****");
        this.verifyApprovalStatusFromDB(adminStaffIndex,expectedStatus);
        this.updateApprovalStatusInDataObject(adminStaffIndex);

    }
    async verifyApprovalStatusFromDB(adminStaffIndex,expectedStatus) {
        let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
        logger.log("***** Searching for the Admin Staff with personal email: " + global.updateDataJson.agencies[agencyIndex].adminStaffs[adminStaffIndex].personalEmail + " in DB *****")
        let dbStatus=await dbQuery.getApprovalStatusFromDB(global.updateDataJson.agencies[agencyIndex].adminStaffs[adminStaffIndex].personalEmail, adminStaffApprovalStatusContent.approvalStatus_pending).then(console.log("Approval Status from DB returned successfully"));
        assert.assertTrue(dbStatus);
        logger.log("**** Approval Status Verified. It's set to "+expectedStatus.toUpperCase() + " *****");

    }
    updateApprovalStatusInDataObject(adminStaffIndex)
    {
        let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
        global.updateDataJson.agencies[agencyIndex].adminStaffs[adminStaffIndex].approvalStatus_pending=eval(approvalStatusLocators.rightPanel.approvalStatus).getText();
    }

}
module.exports = new AdminStaffApprovalStatusPageModel();
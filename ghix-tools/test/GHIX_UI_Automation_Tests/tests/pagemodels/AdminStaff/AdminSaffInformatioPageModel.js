const  global = require('../Global_include');
const browser = require("../../base/Browser.js");
const assert = require("../../base/Assert.js");
const  logger = require('../../common.utils/LoggerUtil');
const prop = require('../../common.utils/PropertyReader');
var state = prop.getEnvName();

const adminStaffInformationLocators=require('../../../resources/selectors/common/AdminStaff/AdminStaffInformationPage.object.json');
const adminStaffInformationPageContent=require('../../../resources/content/common/AdminStaff/AdminStaffInformationPage.content');
const adminStaffApprovalStatusLocators=require('../../../resources/selectors/common/AdminStaff/AdminStaffApprovalStatusPage.object.json');
const adminStaffApprovalStatusContent=require('../../../resources/content/common/AdminStaff/AdminStaffApprovalStatusPage.content');
const  jsonUtil = require('../../common.utils/JsonUtil');
const dataUtil=require('../../common.utils/DataUtil')
const random=require('../../common.utils/RandomDataGenerator')
const address = require('../../../resources/data/address.json');

class AdminStaffInformationPageModel {

    addNewAdminStaff(index,staffLevel)
    {   
        let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
        logger.log("***** Setting Up Admin Staff Data File***");
        this.setAdminStaffInformationPageData(index,staffLevel);
        logger.log("***** Admin Staff Data Is Set ***");
        logger.log("***** Filling Admin Staff Information Page Field Values***");
        this.fillAdminStaffInformationPageDetails(global.updateDataJson.agencies[agencyIndex].adminStaffs[index]);

    };
    fillAdminStaffInformationPageDetails(adminStaffDataJson)
    {
        browser.waitForPageToLoadAndCheckPartialHeaderText(eval(adminStaffInformationLocators.rightPanel.rightPanelHeader),adminStaffInformationPageContent.rightPanelHeader);
        logger.log("***** On Admin Staff Information Page*****");
        logger.log("***** Entering Admin Staff Information Page Field Values*****");
        let adminStaffInformationMapping = {
            tb_firstName:adminStaffDataJson.firstName,
            tb_lastName:adminStaffDataJson.lastName,
            ph_primaryContactPhone: adminStaffDataJson.primaryContactPhone,
            ph_businessContactPhone: adminStaffDataJson.businessContactPhone,
            tb_personalEmail: adminStaffDataJson.personalEmail,
            tb_businessEmail:adminStaffDataJson.businessEmail,
            sb_communicationMethod: adminStaffDataJson.communicationMethod,
            ro_businessName: adminStaffDataJson.businessName,
            sb_staffLevel:adminStaffDataJson.staffLevel,
            sb_agencyLocation:adminStaffDataJson.agencyLocation,
            tb_correspondenceAddressL1:adminStaffDataJson.CorrespondenceAddress1,
            tb_correspondenceAddressL2:adminStaffDataJson.CorrespondenceAddress2,
            tb_correspondenceCity:adminStaffDataJson.CorrespondenceAddressCity,
            sb_state:adminStaffDataJson.CorrespondenceAddressState,
            tb_correspondenceZip:adminStaffDataJson.CorrespondenceAddressZip
        };
        dataUtil.doFormFill(adminStaffInformationLocators.rightPanel.createMode, adminStaffInformationMapping);
        browser.click(eval(adminStaffInformationLocators.rightPanel.createMode.btn_finish));
        browser.waitForElementToBeInvisible(eval(adminStaffInformationLocators.rightPanel.createMode.btn_finish));
        logger.log("***** Admin Staff Information Page Submitted *****");
        this.clickCloseOnAccountRegistrationComplete();
        logger.log("***** Admin Staff Account Registration Complete Popup Closed *****");
    }

    setAdminStaffInformationPageData(index,adminStaffLevel)
    {
        let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
        console.log("GLOBAL"+ global.updateDataJson.agencies[agencyIndex].adminStaffs[index]);
        if (global.updateDataJson.agencies[agencyIndex].adminStaffs[index]==undefined)
        {
            let newAdminStaffObject={firstName:""};
            global.updateDataJson.agencies[agencyIndex].adminStaffs.push(newAdminStaffObject);
        }

        let adminStaffData =global.updateDataJson.agencies[agencyIndex].adminStaffs[index];
        if (jsonUtil.isFieldEmpty(adminStaffData.firstName))
        {
            adminStaffData.firstName= random.getRandomFirstName();
        }
        if (jsonUtil.isFieldEmpty(adminStaffData.lastName))
        {
            adminStaffData.lastName = random.getRandomLastName();
        }
        if (jsonUtil.isFieldEmpty(adminStaffData.primaryContactPhone)) {
            adminStaffData.primaryContactPhone = random.getRandomPhoneNumberNoDashes();
        }
        if (jsonUtil.isFieldEmpty(adminStaffData.businessContactPhone)) {
            adminStaffData.businessContactPhone = random.getRandomPhoneNumberNoDashes();
        }
        if (jsonUtil.isFieldEmpty(adminStaffData.personalEmail))
        {
            adminStaffData.personalEmail = random.getRandomEmail(adminStaffData.firstName+"_ind_");
        }
        if (jsonUtil.isFieldEmpty(adminStaffData.username))
        {
            adminStaffData.username=adminStaffData.personalEmail;
        }
        if (jsonUtil.isFieldEmpty(adminStaffData.businessEmail))
        {
            adminStaffData.businessEmail = random.getRandomEmail(adminStaffData.firstName+"_biz_");
        }
        if (jsonUtil.isFieldEmpty(adminStaffData.communicationMethod))
        {
            adminStaffData.communicationMethod = random.getRandomInt(1,4);
        }
        if (jsonUtil.isFieldEmpty(adminStaffData.staffLevel)) {
            adminStaffData.staffLevel = adminStaffLevel;
        }
        if (jsonUtil.isFieldEmpty(adminStaffData.agencyLocation))
        {
            adminStaffData.agencyLocation = 1;
        }
        if (jsonUtil.isFieldEmpty(adminStaffData.CorrespondenceAddress1)) {
            adminStaffData.CorrespondenceAddress1 = address[state].address.addressLine1;
        }

        if (jsonUtil.isFieldEmpty(adminStaffData.CorrespondenceAddress2)) {
            adminStaffData.CorrespondenceAddress2 = address[state].address.addressLine2;
        }
        if (jsonUtil.isFieldEmpty(adminStaffData.CorrespondenceAddressCity)) {
            adminStaffData.CorrespondenceAddressCity = address[state].address.city;
        }
        if (jsonUtil.isFieldEmpty(adminStaffData.CorrespondenceAddressState)) {
            adminStaffData.CorrespondenceAddressState = address[state].address.state;
        }
        if (jsonUtil.isFieldEmpty(adminStaffData.CorrespondenceAddressZip)) {
            adminStaffData.CorrespondenceAddressZip = address[state].address.zip;
        }
        global.updateDataJson.agencies[agencyIndex].adminStaffs[index]=adminStaffData;

    }
    clickCloseOnAccountRegistrationComplete() {
        logger.log("***** Verifying Account Creation Complete Popup *****");
        browser.waitForElementToDisplay(eval(adminStaffInformationLocators.successfullyCompletedApplication_Box));
        logger.log("***** Account Creation Complete Popup Body displayed ***");
        browser.click(eval(adminStaffInformationLocators.btn_successfullyCompletedApplication_Ok));
        logger.log("***** Closed the Account Creation Complete Popup *****");
        browser.waitForPageToLoad(eval(adminStaffApprovalStatusLocators.rightPanel.rightPanelHeader), adminStaffApprovalStatusContent.rightPanelHeader);
        logger.log("******* Landed on "+ eval(adminStaffApprovalStatusLocators.rightPanel.rightPanelHeader).getText() + " page");
    }
}
module.exports = new AdminStaffInformationPageModel();

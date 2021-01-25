const  global = require('../Global_include');
const dataUtil=require('../../common.utils/DataUtil');
const browser = require("../../base/Browser.js");
const  logger = require('../../common.utils/LoggerUtil');

const certificationStatusLocators=require('../../../resources/selectors/common/AgentAdmin/AgentCertificationStatusPage.json');
const content = require("../../../resources/content/common/Agent/AgentAdminPage.content.js");
const  jsonUtil = require('../../common.utils/JsonUtil');
const agentConstants=require('../../common.utils/ConstantsAgentAgency')
const fileUploadUtil=require('../../common.utils/FileUploadUtil')
const date=require('../../common.utils/CommonDateFunction');
const assert = require("../../base/Assert");
const dbQuery = require('../Agent/AgentDatabaseQueries');


class AgentCertificationStatusPageModel
{
    updateAgentCertificationStatusDetails(newCertificationStatus)
    {
        let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;

       // let adminData = global.updateDataJson.agencies[agencyIndex].agentAdmin;
        let picFile= process.cwd()+"/resources/data/Testfiles/EODeclare.pdf";
        let loc_fileUploadPopupText=eval(certificationStatusLocators.editMode.fileUploadSuccessPopupText);
        let fileUploadPopupText = content.fileUploadPopupBody;
        let loc_fileUploadPopupClose=eval(certificationStatusLocators.editMode.fileUploadPopupClose);
        let loc_uploadedEODeclPage = eval(certificationStatusLocators.editMode.fileNameEODeclarationPage);
      //  global.updateDataJson.agencies[agencyIndex].agent.tb_certificationStartDate=date.addYearsToDateToday(0,"MM/DD/YYYY");
        //global.updateDataJson.agencies[agencyIndex].agent.tb_certificationEndDate=date.addYearsToDateToday(5,"MM/DD/YYYY");

        let updatedCertificationDetails =
            {
                sb_certificationStatus: newCertificationStatus,
            };
        if (newCertificationStatus===agentConstants.AGENT_CERTIFICATION_STATUS.certified)
        {
            this.setAgentCertificationDates();
            updatedCertificationDetails.tb_certificationStartDate=global.updateDataJson.agencies[agencyIndex].agent.tb_certificationStartDate;
            updatedCertificationDetails.tb_certificationEndDate=global.updateDataJson.agencies[agencyIndex].agent.tb_certificationEndDate;
        }


        dataUtil.doFormFill(certificationStatusLocators.editMode, updatedCertificationDetails);
        fileUploadUtil.fileUploadDirect(picFile,eval(certificationStatusLocators.editMode.chooseEODeclarationPage));
        browser.click(eval(certificationStatusLocators.editMode.btn_UploadEODeclaratioPage));
        fileUploadUtil.verifyFileUploadPopupAndClose(loc_fileUploadPopupText,fileUploadPopupText,loc_fileUploadPopupClose);
        assert.assertElementIsVisible(loc_uploadedEODeclPage);
        logger.log("***** Certified the Agent  *****");
        global.updateDataJson.agencies[agencyIndex].agent.certificationStatus=newCertificationStatus;
        this.clickSubmit();

    }

    clickSubmit() {
        browser.click(eval(certificationStatusLocators.editMode.btn_updateCertificationStatus));
        logger.log("***** Submitted Agent Certification Status Change Details *****");
    }
setAgentCertificationDates()
{
    let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
    if (jsonUtil.isFieldEmpty(global.updateDataJson.agencies[agencyIndex].agent.tb_certificationStartDate)) {
        global.updateDataJson.agencies[agencyIndex].agent.tb_certificationStartDate = date.addYearsToDateToday(0,"MM/DD/YYYY");
    }
    if (jsonUtil.isFieldEmpty(global.updateDataJson.agencies[agencyIndex].agent.tb_certificationEndDate)) {
        global.updateDataJson.agencies[agencyIndex].agent.tb_certificationEndDate = date.addYearsToDateToday(7,"MM/DD/YYYY");
    }
}

verifyAgentCertificationStatusInViewMode(role,certificationStatus)
    {
        let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
        //let dataJson = global.updateDataJson.agencies[agencyIndex].agent;
        logger.log("***** " + eval(certificationStatusLocators.detailsMode.lbl_certificationStatus).getText() + "On UI: " + eval(certificationStatusLocators.detailsMode.certificationStatus).getText() + " *****");
        assert.assertElementContainsText(eval(certificationStatusLocators.detailsMode.certificationStatus), certificationStatus);

        this.verifyCertificationStatusFromDB(global.updateDataJson.agencies[agencyIndex][role].personalEmail,certificationStatus);

    }

verifyCertificationStatusFromDB(email,certificationStatus)
    {
        logger.log("***** Verifying Certification Status From DB *****");
        logger.log("***** Searching for the Agent With Personal Email: "+email+" in DB *****")
        let queryResult = dbQuery.getDBdata(email,certificationStatus);
        browser.waitUntil(() => queryResult !== null);
    }

}


module.exports = new AgentCertificationStatusPageModel();





const  global = require('../Global_include');
const browser = require("../../base/Browser.js");
const assert = require("../../base/Assert.js");
const  logger = require('../../common.utils/LoggerUtil');
const agentCertificationPageLocator=require('../../../resources/selectors/common/Agent/AgentCertificationStatus.json');
const agentCertificationPageContent=require('../../../resources/content/common/Agent/AgentCertificationStatus.content');
const dbQuery = require('./AgentDatabaseQueries');


class AgentCertificationPageModel {
    verifyCertificationStatus(role) {
        browser.waitForPageToLoadAndCheckPartialHeaderText(eval(agentCertificationPageLocator.rightPanelHeader),agentCertificationPageContent.rightPanelHeader);
        logger.log("***** UI:" + eval(agentCertificationPageLocator.lbl_certificationStatus).getText() + ": " + eval(agentCertificationPageLocator.certificationStatus).getText() + " *****");
        assert.assertElementContainsText(eval(agentCertificationPageLocator.certificationStatus), agentCertificationPageContent.certificationStatus_pending);
        logger.log("***** Verifying Certification Status From DB *****");
        this.verifyCertificationStatusFromDB(role);
        this.updateAgentCertificationStatusInDataFile(role);
    }

    verifyCertificationStatusFromDB(role) {
        let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
        logger.log("***** Searching for the Agent with personal email: " + global.updateDataJson.agencies[agencyIndex][role].personalEmail + " in DB *****")
        dbQuery.getDBdata(global.updateDataJson.agencies[agencyIndex][role].personalEmail, agentCertificationPageContent.certificationStatus_pending);
    }
    updateAgentCertificationStatusInDataFile(role)
    {
        let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
        global.updateDataJson.agencies[agencyIndex][role].certificationStatus=eval(agentCertificationPageLocator.certificationStatus).getText();
    }

}
module.exports = new AgentCertificationPageModel();

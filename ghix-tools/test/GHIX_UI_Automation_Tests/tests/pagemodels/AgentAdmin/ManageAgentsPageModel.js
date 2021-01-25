const  global = require('../Global_include');
const dataUtil=require('../../common.utils/DataUtil');
const browser = require("../../base/Browser.js");
const  logger = require('../../common.utils/LoggerUtil');
const manageAgentLocators=require('../../../resources/selectors/common/AgentAdmin/ManageAgents.json');


class ManageAgentsPageModel
{

    searchForAgentOrAgencyManager(searchObject) {
        browser.pauseBrowser(2000);
        let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
        let searchData = {
            tb_firstName: searchObject.firstName,
            tb_lastName: searchObject.lastName,
            tb_businessName: global.updateDataJson.agencies[agencyIndex].agency.businessName,
            sb_certificationStatus:searchObject.certificationStatus,
        };
        dataUtil.doFormFill(manageAgentLocators.leftNav, searchData);
        browser.click(eval(manageAgentLocators.leftNav.btn_Go));
        logger.log("***** Submitted Agent Details to Search *****");
    }
    clickOnEditAction() {
        browser.click(eval(manageAgentLocators.actions.dd_Action));
        browser.click(eval(manageAgentLocators.actions.lk_Edit));
        logger.log("***** Clicked on Edit Button  *****");
    }

}

module.exports = new ManageAgentsPageModel();





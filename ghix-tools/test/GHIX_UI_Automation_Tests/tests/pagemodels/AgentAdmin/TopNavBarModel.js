const browser = require("../../base/Browser.js");
const  logger = require('../../common.utils/LoggerUtil');
const topNavLocators=require('../../../resources/selectors/common/AgentAdmin/TopNavBar.json');


class TopNavBarModel
{

    selectManageAgents()
    {
        browser.waitToBeClickableAndClick(topNavLocators.agentsMenu.dd_agents);
        browser.waitToBeClickableAndClick(topNavLocators.agentsMenu.lk_manageAgents);
        logger.log("***** Clicked on Manage Agents *****");
    }
    selectManageAdminStaff()
    {
        browser.waitToBeClickableAndClick(topNavLocators.adminStaffMenu.dd_adminStaff);
        browser.waitToBeClickableAndClick(topNavLocators.adminStaffMenu.lk_manageAdminStaff);

        logger.log("***** Clicked on Manage Admin Staff Option In Top Menu Bar Agent Admin Portal*****");
    }


}

module.exports = new TopNavBarModel();





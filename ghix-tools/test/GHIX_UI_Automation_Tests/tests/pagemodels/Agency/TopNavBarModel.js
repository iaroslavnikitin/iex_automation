const state = stateProfile;
const browser = require("../../base/Browser.js");
const  logger = require('../../common.utils/LoggerUtil');
const topNavLocators=require('../../../resources/selectors/Agency/TopNavBar.json');


class TopNavBarModel
{

    selectAddNewAgent()
    {
        browser.waitToBeClickableAndClick(topNavLocators.agentsMenu.dd_agents);
        browser.waitToBeClickableAndClick(topNavLocators.agentsMenu.lk_addNewAgent);
        logger.log("***** Clicked on Add New Agent *****");
    }

    selectAddNewAddminStaff()
    {
        browser.waitForElementToDisplay(eval(topNavLocators.topNavBar));
        logger.log("***** Top Nav Bar Loaded on Agency Manager Portal *****");
        browser.waitToBeClickableAndClick(topNavLocators.adminStaffMenu.dd_adminStaff);
        logger.log("***** Clicking on Add New Admin Staff *****");
        browser.waitToBeClickableAndClick(topNavLocators.adminStaffMenu.lk_addNewAdminStaff);
        logger.log("***** Clicked on Add New Admin Staff *****");
    }


}

module.exports = new TopNavBarModel();





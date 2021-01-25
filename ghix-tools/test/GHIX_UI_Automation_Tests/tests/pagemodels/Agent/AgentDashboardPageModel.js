const dashboardLocators = require('../../../resources/selectors/common/Agent/AgentDashboard.json')
const browser = require("../../base/Browser.js");
const assert = require("../../base/Assert.js");
const logger = require('../../common.utils/LoggerUtil');


class AgentDashboardPageModel {

    verifyUserLandedOnDashboard() {
        /* if (state.toUpperCase() == 'PA'){
         browser.waitForUrlContains(entityContentState.dashboardUrlContent);
          assert.assertPageTitle(entityContentState.dashboardPageTitle);
          assert.assertUrlContains(entityContentState.dashboardUrlContent);
         }
        else */
        //if (state.toUpperCase() == 'ID') {
            browser.waitForElementToDisplay(eval(dashboardLocators.dashboardHeader));
            assert.assertElementIsVisible(eval(dashboardLocators.dashboardHeader));
        // }
        // else{
        //     browser.waitForElementToDisplay(eval(dashboardLocators.dashboardHeader));
        //     assert.assertElementIsVisible(eval(dashboardLocators.dashboardHeader));
        // }
        logger.log("*****I'm successfully landed on DashBoard*****");
    }

}
module.exports = new AgentDashboardPageModel();



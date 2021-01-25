const dashboardLocators = require('../../../resources/selectors/common/AdminStaff/AdminStaffDashboardPage.object.json')
const browser = require("../../base/Browser.js");
const assert = require("../../base/Assert.js");
const logger = require('../../common.utils/LoggerUtil');


class AdminStaffDashboardPageModel {

    verifyAdminStaffLandedOnDashboard() {

        browser.waitForElementToDisplay(eval(dashboardLocators.mainContainer));
        assert.assertElementIsVisible(eval(dashboardLocators.mainContainer));
        logger.log("*****I'm successfully landed on Dashboard*****");
    }

}
module.exports = new AdminStaffDashboardPageModel();

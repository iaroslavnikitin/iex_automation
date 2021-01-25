const browser = require("../../../base/Browser.js");
const applicationLocator = require("../../../../resources/selectors/common/CAP/MemberManagement/ApplicationPageObject.json");
const applicationContent = require("../../../../resources/content/common/CAP/MemberManagement/ApplicationPage.content");
const commonCAPFunc = require('../CommonPageFunctions');
const logger = require('../../../../logger/WDIOLogger');
const constants = require('../../../common.utils/Constants');

class ApplicationPage {

    /**
     * Clicks on the action gear icon on the Application Page
	 */
    clickOnActionsGearIcon(){
        logger.log("***** Clicking On Action Gear Icon *****");
        commonCAPFunc.clickOnActionsGearIcon(eval(applicationLocator.actions.lk_actions));
        logger.log("***** Clicked On Action Gear Icon *****");
        logger.log(eval(applicationLocator.actions.dd_currentAppStatusPanel).isDisplayed());
        browser.pauseBrowser(constants.PAUSE_BROWSER_1000);
    }

    /**
     * Clicks on the cancel button on the pop up
	 */
    clickOnCancel(){
        logger.log("***** Clicking On Cancel *****");
        browser.click(eval(applicationLocator.actions.btn_CancelPopUp));
        logger.log("***** Clicked On Cancel *****");
    }

    /**
     * Clicks on the Coverage Start Date button and verifies the header in Pop up
	 */
    clickOnCoverageStartDateAndVerify(){
        logger.log("***** Clicking On Coverage Start Date *****");
        browser.waitForDisplayAndClick(eval(applicationLocator.actions.lk_changeCoverageDate));
        logger.log("***** Clicked On Coverage Start Date *****");
        browser.waitForPageToLoad(eval(applicationLocator.actions.popUpchangeCoverageDateHeader), applicationContent.changeCoverageStartDateHeader);
    }

    /**
     * Clicks on the Edit Application button and verifies the header in Pop up
	 */
    clickOnEditApplicationAndVerify(){
        logger.log("***** Clicking On Edit Application *****");
        browser.waitForDisplayAndClick(eval(applicationLocator.actions.lk_editApplication));
        logger.log("***** Clicked On Edit Application *****");
        browser.waitForPageToLoad(eval(applicationLocator.actions.popUpEditApplicationHeader), applicationContent.editApplicationHeader);
    }

    /**
     * Clicks on the Override Program Eligibility button and verifies the header in Pop up
	 */
    clickOnOverrideProgramEligibilityAndVerify(){
        logger.log("***** Clicking On Override Program Eligibility *****");
        browser.waitForDisplayAndClick(eval(applicationLocator.actions.lk_overrideProgramEligibility));
        logger.log("***** Clicked On Override Program Eligibility *****");
        browser.waitForPageToLoad(eval(applicationLocator.actions.popUpOverrideProgramEligibilityHeader), applicationContent.overrideProgramEligibilityHeader);
        browser.click(eval(applicationLocator.actions.btn_CancelOverrideProgramEligibility));
    }

}

module.exports = new ApplicationPage();
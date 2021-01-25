const browser = require("../../base/Browser.js");
const logger=require('../../common.utils/LoggerUtil');



class CommonPageFunctions {
    clickOnActionsGearIcon(element)
    {
        logger.log("**** Clicking On Actions Gear Icon*****");
        browser.click(element);
        logger.log("**** Clicked On Actions Gear Icon *****");
    }
    clickOnOverrideEnrollStatus(element, planType)
    {
        logger.log("**** Clicking On Override Enroll Status For "+planType+" Plan *****");
        browser.click(element);
        logger.log("**** Clicked On Override Enroll Status For "+planType+" Plan *****");
    }
    clickOnShowPremiumHistory(element, planType) {
        logger.log("***** Clicking On "+ planType + " Plan Premium History *****");
        browser.click(element);
        logger.log("***** Clicked On "+ planType +" Plan Premium History *****");
    }
    clickOnResend834History(element, planType) {
        logger.log("***** Clicking On "+ planType + " Plan Resend  834  History *****");
        browser.click(element);
        logger.log("***** Clicked On "+ planType +" Plan Resend  834  History *****");
    }
    clickOnResendLatest834Transaction(element, planType) {
        logger.log("***** Clicking On "+ planType + " Plan Resend Latest 834 Transaction *****");
        browser.click(element);
        logger.log("***** Clicked On "+ planType +" Plan Resend Latest 834 Transaction *****");
    }
    clickOnAdditionalInfo(element, planType) {
        logger.log("***** Clicking On "+ planType + " Plan Additional Information *****");
        browser.click(element);
        logger.log("***** Clicked On "+ planType +" Plan Additional Information *****");
    }
}

module.exports = new CommonPageFunctions();

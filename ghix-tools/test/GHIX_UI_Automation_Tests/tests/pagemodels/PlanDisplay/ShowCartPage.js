const locator = require('../../../resources/selectors/common/PlanDisplay/ShowCartPageObject.json');
const eSignLocator = require('../../../resources/selectors/common/PlanDisplay/ESignaturePageObjects.json');
const loginPageLocator = require('../../../resources/selectors/common/UserAccountManagement/LogInObject.json');
const browser = require('../../base/Browser.js');
const assert = require('../../base/Assert.js');
const logger=require('../../common.utils/LoggerUtil');

const commonfunc = require('../PlanDisplay/CommonPlanDisplayFunction');
const content = require('../../../resources/content/common/PlanDisplay/ShowCartPage.content.js');
const eSignPageContent = require('../../../resources/content/common/PlanDisplay/ESignPage.content');
const state=stateProfile;
const individualSignupPage = require('../UserAccountManagement/IndividualSignupPage');
const locatorState = require('../../../resources/selectors/exchange/' + state + '/PlanDisplay/ShowCartPageObject.json');
const contentState = require('../../../resources/content/exchange/' + state + '/PlanDisplay/ShowCartPage.content.js');
const global = require('../../pagemodels/Global_include');
const constants = require('../../common.utils/Constants');

class ShowCartPage {
    // Verifying Show Cart Page Header When User Logged In And Not Logged In
    verifyCartPageHeader() {
        browser.waitForUrlContains("showCart");
        if (browser.isDisplayed(eval(loginPageLocator.dd_myAccount))) { // If user logged in
            logger.log("***** The Header of Cart Page: " + eval(locator.accountPageHeader).getText() + " *****");
            assert.assertElementContainsText(eval(locator.accountPageHeader), content.accountPageHeader);
        } else { // If user not logged in(anonymous flow)
            logger.log("***** The Header of Cart Page: " + eval(locator.pageHeader).getText() + " *****");
            assert.assertElementContainsText(eval(locator.pageHeader), content.pageHeader);
        }
    }
    
    /* Author: Monica Thaneer
    This Verifies the header Of Cart Page - The existing method ^^ doesnt seem to be a common function
    */
    verifyHeaderOnCartPage()
    {
        browser.waitForUrlContains("showCart");
        console.log("***** The Header of Cart Page: " + eval(locator.txt_pageHeader).getText() + " *****");
        assert.assertElementContainsText(eval(locator.txt_pageHeader), contentState.header);
    }

    clickNextToRegister() {
        if (state.toUpperCase() == constants.STATE_ID || state.toUpperCase() == constants.STATE_MN) {
            //browser.pauseBrowser(3000);
            browser.click(eval(locatorState.btn_nextRegister));
        }
        else
            browser.click(eval(locator.btn_nextRegister));

        if (state.toUpperCase() == constants.STATE_MN) {
            // browser.pauseBrowser(3000);
            browser.waitForPageToLoad(eval(locatorState.enrollNowHeader), contentState.enrollNowHeader);
        }
        else
            individualSignupPage.verifySignUpPageHeader();
    }
    /* Verifying Cart Page Details:
        global.updateDataJson.households[householdIndex].healthPlan - health Plan JSON Object, stored details from Plan Display Page
        global.updateDataJson.households[householdIndex].dentalPlan - dental Plan JSON Object, stored details from Plan Display Page
    */
    verifyCartPage() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        commonfunc.verifyCartDetails(global.updateDataJson.households[householdIndex].healthPlan, global.updateDataJson.households[householdIndex].dentalPlan);
    }

    clickSignApplication() {
        browser.click(eval(locator.btn_signApplication));
        browser.waitForElementToDisplay(eval(locator.btn_readyToEnroll));
    }
    clickReadyToEnroll() {
        browser.click(eval(locator.btn_readyToEnroll));
        logger.log("***** The Header of esign Page: " + eval(eSignLocator.hd_esignHeader).getText() + " *****");
        browser.waitForPageToLoad(eval(eSignLocator.hd_esignHeader),eSignPageContent.pageHeader);
        assert.assertElementContainsText(eval(eSignLocator.hd_esignHeader), eSignPageContent.pageHeader);
    }


}

module.exports = new ShowCartPage();
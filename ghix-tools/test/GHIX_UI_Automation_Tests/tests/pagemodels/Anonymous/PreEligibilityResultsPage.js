const state = stateProfile;
const global = require('../../pagemodels/Global_include');

const preEligibilityResultsLoc = require('../../../resources/selectors/common/Anonymous/PreEligibilityResultsPageObject.json');
const preEligibilityResultsLocState = require('../../../resources/selectors/exchange/' + state + '/Anonymous/PreEligibilityResultsPageObject.json');
const preEligibilityLoc = require('../../../resources/selectors/common/Anonymous/PreEligibilityPageObject.json');
const preEligibilityResultsContent = require('../../../resources/content/common/Anonymous/PreEligibilityResultsPage.content.js');
const preEligibilityResultsContentState = require('../../../resources/content/exchange/' + state + '/Anonymous/PreEligibilityResultsPage.content.js');
const preEligibilityContent = require('../../../resources/content/common/Anonymous/PreEligibilityPage.content.js');

const browser = require('../../base/Browser.js');
const assert = require('../../base/Assert.js');
const logger=require('../../common.utils/LoggerUtil');

const preferencesPageModel = require('../../pagemodels/PlanDisplay/PreferencesPage');
const individualSignupPageModel = require('../../pagemodels/UserAccountManagement/IndividualSignupPage');
const  constants = require('../../common.utils/Constants');





class PreEligibilityResultsPage {

    waitForPreEliglibilityResultsPageLoad() {
        if (state.toUpperCase() == 'ID' || state.toUpperCase() == 'MN')
            browser.waitForPageToLoadAndCheckPartialHeaderText(eval(preEligibilityResultsLoc.pageHeader), preEligibilityResultsContentState.preEligibilityResultsPageHeader);
        else
            browser.waitForPageToLoadAndCheckPartialHeaderText(eval(preEligibilityResultsLoc.pageHeader), preEligibilityResultsContent.preEligibilityResultsPageHeader);
    }
    verifyPreEligibilityResultsPageHeader() {
        logger.log("***** The Header of Pre-Eligibility Results Page: " + eval(preEligibilityResultsLoc.pageHeader).getText() + " *****");
        if (state.toUpperCase() == 'ID' || state.toUpperCase() == 'MN')
            assert.assertElementContainsText(eval(preEligibilityResultsLoc.pageHeader), preEligibilityResultsContentState.preEligibilityResultsPageHeader);
        else
            assert.assertElementContainsText(eval(preEligibilityResultsLoc.pageHeader), preEligibilityResultsContent.preEligibilityResultsPageHeader);
    }

    verifyPreEligibilityResultsSectionHeader() {
        logger.log("***** The Header of Pre-Eligibility Results Page Section: " + eval(preEligibilityResultsLoc.resultsHeader).getText() + " *****");
        if (state.toUpperCase() == 'MN')
            assert.assertElementContainsText(eval(preEligibilityResultsLoc.resultsHeader), preEligibilityResultsContentState.resultsHeader);
        else
            assert.assertElementContainsText(eval(preEligibilityResultsLoc.resultsHeader), preEligibilityResultsContent.resultsHeader);
    }

    verifyPreEligibilityResultsPageLeftPanel() {
        let locator_arr = [eval(preEligibilityResultsLoc.lbl_inThisSection), eval(preEligibilityResultsLoc.lbl_requiredNotice)];
        if (state.toUpperCase() == 'PA')
            locator_arr = [eval(preEligibilityResultsLoc.lbl_inThisSection), eval(preEligibilityResultsLoc.lbl_requiredNotice), eval(preEligibilityResultsLocState.lbl_requiredNotice2)];
        if (state.toUpperCase() == 'NJ' || state.toUpperCase() == 'ID')
            locator_arr = [eval(preEligibilityResultsLoc.lbl_inThisSection), eval(preEligibilityResultsLocState.lbl_requiredNotice), eval(preEligibilityResultsLocState.lbl_requiredNotice2)];
        if (state.toUpperCase() == 'MN')
            locator_arr = [eval(preEligibilityResultsLoc.lbl_inThisSection), eval(preEligibilityResultsLocState.lbl_requiredNotice), eval(preEligibilityResultsLocState.lbl_requiredNotice2)];

        assert.assertArrayOfElementsAreDisplayed(locator_arr);
    }
    verifyPreEligibilityResultsChildCoverage() {
        let locator_arr = [eval(preEligibilityResultsLoc.lbl_childCoverage), eval(preEligibilityResultsLoc.lbl_childCoverageText)];
        assert.assertArrayOfElementsAreDisplayed(locator_arr);
    }
    verifyPreEligibilityResultsPageRightPanel(eligibility) {
        logger.log("***** Pre-Eligibility Right Panel Content Validation: ");
        let lbl_eligibility, lbl_eligibilitycontent;
        if (eligibility.toUpperCase() == 'MEDICAID') {
            lbl_eligibility = locator.lbl_medicaid;
            if (state.toUpperCase() == 'ID')
                lbl_eligibility = preEligibilityResultsLocState.lbl_medicaid;
            if (state.toUpperCase() == 'NJ' || state.toUpperCase() == 'ID')
                lbl_eligibilitycontent = preEligibilityResultsLocState.lbl_medcaidQualifyContent;
            else
                lbl_eligibilitycontent = locator.lbl_medcaidQualifyContent;

        }
        if (eligibility.toUpperCase() == 'APTC') {
            logger.log("***** Eligibility Type : ", eligibility);
            if (state.toUpperCase() == 'ID') {
                lbl_eligibility = preEligibilityResultsLocState.lbl_esimatedTaxCredit;
                lbl_eligibilitycontent = preEligibilityResultsLocState.lbl_esimatedTaxCreditContent;
            }
            else {
                lbl_eligibility = locator.lbl_esimatedTaxCredit;
                lbl_eligibilitycontent = locator.lbl_esimatedTaxCreditContent;
            }

        }
        if (eligibility.toUpperCase() == 'NOCREDIT') {
            if (state.toUpperCase() == 'ID') {
                lbl_eligibility = preEligibilityResultsLocState.lbl_esimatedTaxCredit;
                lbl_eligibilitycontent = preEligibilityResultsLocState.lbl_esimatedTaxCreditContent;
            }
            else {
                lbl_eligibility = locator.lbl_noTaxCredit;
                lbl_eligibilitycontent = locator.lbl_noTaxCreditContent;
            }
        }

        let locator_arr = [eval(preEligibilityResultsLoc.lbl_reultEstimateAlertText), eval(preEligibilityResultsLoc.resultsHeader), eval(lbl_eligibility), eval(lbl_eligibilitycontent), eval(preEligibilityResultsLoc.lbl_login), eval(preEligibilityResultsLoc.lbl_helpsupport)];
        if (state.toUpperCase() == 'NJ')
            locator_arr = [eval(preEligibilityResultsLocState.lbl_reultEstimateAlertText), eval(preEligibilityResultsLoc.resultsHeader), eval(lbl_eligibility), eval(lbl_eligibilitycontent), eval(preEligibilityResultsLoc.lbl_login), eval(preEligibilityResultsLoc.lbl_helpsupport)];
        if (state.toUpperCase() == 'MN')
            locator_arr = [eval(preEligibilityResultsLocState.lbl_reultEstimateAlertText), eval(preEligibilityResultsLoc.resultsHeader), eval(lbl_eligibility), eval(preEligibilityResultsLoc.lbl_login), eval(preEligibilityResultsLocState.lbl_getHelp), eval(preEligibilityResultsLocState.lbl_learnMore), eval(preEligibilityResultsLocState.lbl_languageSelect)];

        assert.assertArrayOfElementsAreDisplayed(locator_arr);
    }

    clickPreviousButton() {
        logger.log("***** Going back to Pre-Eligibility Page ***** ");
        browser.click(eval(preEligibilityResultsLoc.btn_previous));
        browser.waitForPageToLoadAndCheckPartialHeaderText(eval(preEligibilityLoc.pageHeader), preEligibilityContent.preEligibilityHeader);
    }
    updateAPTCAmountInJson() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
            let aptcAmt = browser.getText(eval(preEligibilityResultsLoc.span_aptcAmount)).trim().replace("$", "");
            global.updateDataJson.households[householdIndex].aptcAmount = aptcAmt;
            logger.log("preEligibilityObject.aptcAmount "+global.updateDataJson.households[householdIndex].aptcAmount)
            if (state.toUpperCase() == 'NJ') {
                let subsidyAmt = browser.getText(eval(preEligibilityResultsLoc.span_stateSubsidyAmount)).trim().replace("$", "");
                global.updateDataJson.households[householdIndex].stateSubsidy = subsidyAmt;
                logger.log("preEligibilityObject.stateSubsidy "+ global.updateDataJson.households[householdIndex].stateSubsidy)
            }
        logger.log(JSON.stringify(global.updateDataJson.households[householdIndex]));
    }
    clickNextOrStartApplicationButton() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        browser.pauseBrowser(constants.PAUSE_BROWSER_3000);
        if(browser.isDisplayed(eval(preEligibilityResultsLoc.span_aptcAmount)))
            this.updateAPTCAmountInJson();
        let eligibility = global.updateDataJson.households[householdIndex].eligibility;
        logger.log("***** Going to Preferences Or Signup Page ***** ");
        // For PA, NJ - Start Application will display inplace of Next for Medicaid eligible households
        if (eligibility.toUpperCase() == 'MEDICAID' && (state.toUpperCase() == 'PA' || state.toUpperCase() == 'NJ')) {
            logger.log("***** Clicking on Start Application *****");
            browser.click(eval(preEligibilityResultsLoc.btn_startAppication));
            logger.log("***** Clicked on Start Application *****");
            var windowhandles = browser.getWindowHandles();
            browser.switchToWindow(windowhandles[1]);
            individualSignupPageModel.verifySignUpPageHeader();
        }
        else {
            logger.log("***** Clicking on Next *****");
            browser.click(eval(preEligibilityResultsLoc.btn_next));
            browser.pauseBrowser(5000);
            logger.log("***** Clicked on Next *****");
            // browser.waitUntil(() => eval(stateLoc_preferences.btn_reset).isDisplayed()); 
            preferencesPageModel.waitForPreferencesPageLoad();
        }

    }
    verifyPreEligibilityResultsPage() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        let eligibility = global.updateDataJson.households[householdIndex].eligibility;
        let hasDependentChildren = global.updateDataJson.households[householdIndex].hasDependentChildren;
        this.verifyPreEligibilityResultsPageHeader();
        this.verifyPreEligibilityResultsSectionHeader();
        this.verifyPreEligibilityResultsPageLeftPanel();
        this.verifyPreEligibilityResultsPageRightPanel(eligibility);
        if ((state.toUpperCase() == 'PA' || state.toUpperCase() == 'NJ') && hasDependentChildren.toUpperCase() == 'YES' && eligibility.toUpperCase() == 'APTC')
            this.verifyPreEligibilityResultsChildCoverage();
    }

}
module.exports = new PreEligibilityResultsPage();
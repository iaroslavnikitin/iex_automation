const state = stateProfile;
const global = require('../../pagemodels/Global_include');
const constants = require('../../common.utils/Constants');

const dentalPlanLoc = require('../../../resources/selectors/common/PlanDisplay/DentalPlanDisplayPageObject.json');
const commonLoc = require('../../../resources/selectors/common/PlanDisplay/CommonPlanDisplayObject.json');
const dentalContent = require('../../../resources/content/common/PlanDisplay/DentalPlanDisplayPage.content');
const dentalContentState = require('../../../resources/content/exchange/' + state + '/PlanDisplay/DentalPlanDisplayPage.content');


const browser = require('../../base/Browser.js');
const assert = require('../../base/Assert');
const logger = require('../../common.utils/LoggerUtil');
const dataUtil = require('../../common.utils/DataUtil');



const commonfunc = require('../PlanDisplay/CommonPlanDisplayFunction');
const cartPage = require('../PlanDisplay/ShowCartPage');

const healthPlanPageLoc = require('../../../resources/selectors/common/PlanDisplay/HealthPlanDisplayPageObject.json');


class DentalPlanDisplayPage {

    addDentalPlan() {

        browser.click(eval(commonLoc.planTiles.btn_addPlan));
        assert.assertElementIsVisible(eval(commonLoc.continuePopup.btn_continueToCartFromDental));

    }
    addRandomDentalPlan() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        console.log("*****Add Random Dental Plan to Cart")
        browser.waitForPageToLoad(eval(commonLoc.header.pageHeader),  dentalContent.dentalCoverageHeader);
        if(global.updateDataJson.households[householdIndex].applicants.length>1&&global.updateDataJson.households[householdIndex].applicationStatus!=null){
            commonfunc.confirmCoverageSeekingMembers();
           }
        browser.waitForPageToLoad(eval(commonLoc.header.pageHeader), dentalContent.dentalCoverageHeader)
        browser.pauseBrowser(constants.PAUSE_BROWSER_3000);
        let dentalPlanObj=commonfunc.addRandomPlan(constants.DENTALPLAN);
        global.updateDataJson.households[householdIndex][constants.DENTALPLAN] = dentalPlanObj;
        logger.log("***** Dental Plan Got Added In Global Object \n" + JSON.stringify(global.updateDataJson.households[householdIndex]));

    }

    
    continueToCartPage() {
        browser.waitForDisplayAndClick(eval(commonLoc.continuePopup.btn_continueToCart));
        cartPage.verifyCartPageHeader();
    }

    /* Author: Monica Thaneer
    * Added because the current verifyCartPageHeader in continueToCartPage function does not seem to fit my purpose
    */
    clickContinueToCartPage() {
        browser.waitForDisplayAndClick(eval(commonLoc.continuePopup.btn_continueToCartFromDental));
        cartPage.verifyHeaderOnCartPage();
    }

    verifyDentalPlanDisplayPage() {
        this.verifyHeaderDetails();
        //   this.verifyLeftNav();
        //   this.verifyPlanTile();

    }
    // Verify Dental Plans Page Header
    verifyHeaderDetails() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        let healthPlans = "";
        if (state.toUpperCase() == constants.STATE_MN)
            healthPlans = dentalContentState.healthPlans;
        else
            healthPlans = dentalContent.healthPlans;
        let header = { [commonLoc.topNav.hd_healthPlans]: healthPlans, [commonLoc.topNav.hd_dentalPlans]: dentalContent.dentalPlans, [commonLoc.backToPreferences]: dentalContent.backToPreferences, [commonLoc.header.pageHeader]: dentalContent.dentalCoverage, [commonLoc.header.ZIP]: dentalContent.ZIP, [commonLoc.header.ZIP]: global.updateDataJson.households[householdIndex].zip, [commonLoc.header.memberInfo]: dentalContent.memberInfo, [commonLoc.header.coverageDateAPTC]: global.updateDataJson.households[householdIndex].coverageDate };
        assert.assertArrayOfElementsContainsTextIgnoringCase(header);
    }

    verifyLeftNav() {
        if (state.toUpperCase() == constants.STATE_CA) {
            let sortBy = { [commonLoc.leftNav.sortByHeading]: dentalContent.label_sortBy, [dentalPlanLoc.label_monthlyPrice]: dentalContentState.label_monthlyPrice, [dentalPlanLoc.label_deductible]: dentalContent.label_deductible };
            assert.assertArrayOfElementsContainsTextIgnoringCase(sortBy);

            let filterPlanType = { [dentalPlanLoc.label_filterBy]: dentalContent.label_filterBy, [dentalPlanLoc.label_planType]: dentalContent.label_planType, [dentalPlanLoc.label_PPO]: dentalContent.label_PPO };
            assert.assertArrayOfElementsContainsTextIgnoringCase(filterPlanType);

            let filterPlanTier = { [dentalPlanLoc.label_planTier]: dentalContent.label_planTier, [dentalPlanLoc.label_High]: dentalContent.label_High };
            assert.assertArrayOfElementsContainsTextIgnoringCase(filterPlanTier);

            let filterDeductible = { [dentalPlanLoc.label_deductible]: dentalContent.label_deductible, [locator["label_49&under"]]: dentalContent.label_49under, [dentalPlanLoc.label_50to99]: dentalContent.label_50to99, [locator["label_100&over"]]: dentalContent.label_100over, [dentalPlanLoc.label_company]: dentalContent.label_company };
            assert.assertArrayOfElementsContainsTextIgnoringCase(filterDeductible);
        }
        else {
            let sortBy = { [commonLoc.leftNav.sortByHeading]: dentalContent.label_sortBy, [dentalPlanLoc.label_monthlyPrice]: dentalContent.label_monthlyPrice, [dentalPlanLoc.label_deductible]: dentalContent.label_deductible, [dentalPlanLoc.label_OOP]: dentalContent.label_OOP };
            assert.assertArrayOfElementsContainsTextIgnoringCase(sortBy);

            let filterPlanType = { [dentalPlanLoc.label_filterBy]: dentalContent.label_filterBy, [dentalPlanLoc.label_planType]: dentalContent.label_planType, [dentalPlanLoc.label_PPO]: dentalContent.label_PPO };
            assert.assertArrayOfElementsContainsTextIgnoringCase(filterPlanType);

            let filterPlanTier = { [dentalPlanLoc.label_planTier]: dentalContent.label_planTier, [dentalPlanLoc.label_High]: dentalContent.label_High };
            assert.assertArrayOfElementsContainsTextIgnoringCase(filterPlanTier);

            let filterDeductible = { [dentalPlanLoc.label_deductible]: dentalContent.label_deductible, [locator["label_49&under"]]: dentalContent.label_49under, [dentalPlanLoc.label_50to99]: dentalContent.label_50to99, [locator["label_100&over"]]: dentalContent.label_100over, [dentalPlanLoc.label_company]: dentalContent.label_company };
            assert.assertArrayOfElementsContainsTextIgnoringCase(filterDeductible);
        }

    }

    verifyPlanTile() {
        assert.assertElementIsVisible(eval(dentalPlanLoc.tile));
        let tile = [eval(dentalPlanLoc.label_compare), eval(dentalPlanLoc.label_detail), eval(dentalPlanLoc.label_add)];
        assert.assertArrayOfElementsAreDisplayed(tile);
    }


    clickOnPlanDetail(index) {
        browser.pauseBrowser(constants.PAUSE_BROWSER_5000);
        if (!index) {
            index = commonFunc.getRandomPlanIndex();
        }
        let detailsfromPlanPage = commonfunc.getPlanDetails(index, constants.DENTALPLAN);
        detailsfromPlanPage = JSON.stringify(detailsfromPlanPage);
        browser.click(eval(commonLoc.planTiles.btn_detail));
        browser.waitForPageToLoad(eval(commonLoc.planDetailsPage.backToAllPlansLink), "Back to all plans");
        this.verifyPlanDetails(detailsfromPlanPage, index);

    }

    verifyDentalPlanDetails(detailsfromPlanPage, index) {
        let resultfromDetailPage = commonfunc.getDentalPlanDetailsFromDetailPage(index);
        resultfromDetailPage = JSON.stringify(resultfromDetailPage);
        let bool = detailsfromPlanPage == resultfromDetailPage;
        assert.assertTrue(bool);

    }

    verifyFilterOnPlanType() {
        let planType_arr = ["cb_PPO", "cb_HMO", "cb_EPO"];
        let planTypeObj = commonLoc.leftNav.filterBy.planType;
        for (let i = 0; i < planType_arr.length; i++) {
            let planTypeLoc = planTypeObj[planType_arr[i]];
            let planType = planType_arr[i].substring(3);
            if (browser.isDisplayed(eval(planTypeLoc))) {
                this.filterByPlanType(eval(planTypeLoc), planType);
                browser.scrollToViewAndClick(eval(planTypeLoc));
            }

        }
    }
    filterByPlanType(planTypeElement, planType) {
        browser.scrollToViewAndClick(planTypeElement);
        // browser.pauseBrowser(constants.PAUSE_BROWSER_6000);
        browser.waitUntil(() => browser.isDisplayed(eval(commonLoc.rightPanel.appliedFilter)));
        let filtered = commonfunc.filterBy(planType, dentalPlanLoc.planTiles.planTypeTier);
        logger.log("***Plans are filtered by " + planType + " =" + filtered)
        assert.assertTrue(filtered)

    }

    verifyFilterOnPlanTier() {
        this.filterByPlanTierLow();
        browser.click(eval(dentalPlanLoc.leftNav.filterBy.planTier.cb_low));
        this.filterByPlanTierHigh();
        browser.click(eval(dentalPlanLoc.leftNav.filterBy.planTier.cb_high));
    }

    filterByPlanTierLow() {
        browser.click(eval(dentalPlanLoc.leftNav.filterBy.planTier.cb_low));
        //  browser.pauseBrowser(2000);
        browser.waitUntil(() => browser.isDisplayed(eval(commonLoc.rightPanel.appliedFilter)));
        let filtered = commonfunc.filterBy("LOW", dentalPlanLoc.planTiles.planTypeTier);
        logger.log("***Plans are filtered by LOW =" + filtered)
        assert.assertTrue(filtered)
    }

    filterByPlanTierHigh() {
        browser.click(eval(dentalPlanLoc.leftNav.filterBy.planTier.cb_high));
        // browser.pauseBrowser(2000);
        browser.waitUntil(() => browser.isDisplayed(eval(commonLoc.rightPanel.appliedFilter)));
        let filtered = commonfunc.filterBy("HIGH", dentalPlanLoc.planTiles.planTypeTier);
        logger.log("***Plans are filtered by HIGH =" + filtered)
        assert.assertTrue(filtered)
    }

    verifyFilterOnDeductible() {
        this.filterByDeductibleLt49();
        browser.click(eval(dentalPlanLoc.leftNav.filterBy.deductible.cb_49));
        this.filterByDeductible50to99();
        browser.click(eval(dentalPlanLoc.leftNav.filterBy.deductible.cb_99));
        this.filterByDeductible100GT();
        browser.click(eval(dentalPlanLoc.leftNav.filterBy.deductible.cb_100));
    }

    filterByDeductibleLt49() {
        browser.click(eval(dentalPlanLoc.leftNav.filterBy.deductible.cb_49));
        //   browser.pauseBrowser(2000);
        browser.waitUntil(() => browser.isDisplayed(eval(commonLoc.rightPanel.appliedFilter)));
        let filtered = this.filterByDeductibleDental(49, 0, commonLoc.planTiles.deductible);
        logger.log("***Plans are filtered by LT 49 =" + filtered)
        assert.assertTrue(filtered)
    }

    filterByDeductible50to99() {
        browser.click(eval(dentalPlanLoc.leftNav.filterBy.deductible.cb_99));
        //browser.pauseBrowser(2000);
        browser.waitUntil(() => browser.isDisplayed(eval(commonLoc.rightPanel.appliedFilter)));
        let filtered = this.filterByDeductibleDental(50, 99, commonLoc.planTiles.deductible);
        logger.log("***Plans are filtered by BTW 49 and 99 =" + filtered)
        assert.assertTrue(filtered)
    }

    filterByDeductible100GT() {
        browser.click(eval(dentalPlanLoc.leftNav.filterBy.deductible.cb_100));
        //browser.pauseBrowser(5000);
        browser.waitUntil(() => browser.isDisplayed(eval(commonLoc.rightPanel.appliedFilter)));
        let filtered = this.filterByDeductibleDental(100, 0, commonLoc.planTiles.deductible);
        logger.log("***Plans are filtered by 100 and Over =" + filtered)
        assert.assertTrue(filtered)
    }


    filterByDeductibleDental(option, option2, selector) {
        logger.log("**** Sort Plan by " + option);
        browser.pauseBrowser(6000);
        let size = browser.getNumberOfChildElements(eval(commonLoc.planTiles.noOfTiles))
        let expectedValue = [];

        for (let index = 0; index < size; index++) {
            let value = eval(selector).getText();
            if (value.includes("/")) {
                let splitedDeduc = value.split("/");
                value = Number(dataUtil.extractNumber(splitedDeduc[0])) + Number(dataUtil.extractNumber(splitedDeduc[1]));
            }
            else {
                value = Number(dataUtil.extractNumber(value));
            }
            expectedValue.push(value);
            if (option == 50) {
                if (expectedValue[index] < option && expectedValue[[index] > option2]) {
                    return false;
                }
            }
            else if (option == 100) {
                if (expectedValue[[index] < option]) {
                    return false;
                }
            }
            else {
                if (expectedValue[index] > option) {
                    return false;
                }
            }
        }
        return true;
    }
    /** Verifying Sort By Option On Dental Plan Display Page */
    verifySortByFilterOnDentalPlan() {
        commonfunc.sortByMonthlyPrice();
        commonfunc.sortByDeductible();
        if (state.toUpperCase() != constants.STATE_CA)
            commonfunc.sortByOutOfPocket();
    }
    /** Verifying Compare Plans On Dental Plan Display Page */
    verifyDentalCompare() {
        // browser.pauseBrowser(constants.PAUSE_BROWSER_6000);
        browser.waitUntil(() => browser.isDisplayed(eval(commonLoc.planTiles.btn_addPlanLocNoIndex)));
        let comparePlanIndexes = [0, 1, 2, 5];
        let plansCount = browser.getNumberOfChildElements(eval(commonLoc.planTiles.noOfTiles));
        let compareBoxPlansCount = 1;
        for (let i = 0; i < comparePlanIndexes.length; i++) {
            let index = comparePlanIndexes[i];
            if (index < plansCount) //Checking if Plan Index less than total number of plans
            {
                if (compareBoxPlansCount > 3) //Trying to compare more than 3 plans
                {
                    browser.scrollToViewAndClick(eval(commonLoc.planTiles.btn_compare));
                    browser.waitUntil(() => browser.isDisplayed(eval(commonLoc.compare.hd_tooManyPansComparePopup)));
                    commonfunc.veryTooManyPlansToComparePopup();
                }
                else {
                    let compareResult = commonfunc.plancompare(constants.DENTALPLAN, index);
                    assert.assertTrue(compareResult);
                    logger.log("***** Dental Plan " + index + " Comparison Result = " + compareResult);
                    compareBoxPlansCount = compareBoxPlansCount + 1;
                }
            }
            else
                logger.log("***** Plan With Index: " + index + " Doesn't Exist *****");
        }
        commonfunc.verifyComparePlansPage(constants.DENTALPLAN);
    }

}
module.exports = new DentalPlanDisplayPage();

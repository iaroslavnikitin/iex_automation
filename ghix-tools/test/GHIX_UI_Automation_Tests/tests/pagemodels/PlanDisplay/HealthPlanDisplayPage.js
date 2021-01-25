const state = stateProfile;
const global = require('../../pagemodels/Global_include');
const constants = require('../../common.utils/Constants');

const pageHeaderLoc = require('../../../resources/selectors/common/PageHeaderObject.json');
const commonLoc = require('../../../resources/selectors/common/PlanDisplay/CommonPlanDisplayObject.json');
const healthPlanPageLoc = require('../../../resources/selectors/common/PlanDisplay/HealthPlanDisplayPageObject.json');
const healthPlanPageLocState = require('../../../resources/selectors/exchange/' + state + '/PlanDisplay/HealthPlanDisplayPageObject.json');
const healthContentState = require('../../../resources/content/exchange/' + state + '/PlanDisplay/HealthPlanDisplayPage.content');
const dentalContent = require('../../../resources/content/common/PlanDisplay/DentalPlanDisplayPage.content');
const healthContent = require('../../../resources/content/common/PlanDisplay/HealthPlanDisplayPage.content');

const assert = require('../../base/Assert');
const browser = require('../../base/Browser.js');
const logger = require('../../common.utils/LoggerUtil');
const dataUtil = require('../../common.utils/DataUtil');

const cartPage = require('../PlanDisplay/ShowCartPage');
const commonfunc = require('../PlanDisplay/CommonPlanDisplayFunction');
const healtPlanDetailsPage = require('../PlanDisplay/HealthPlanDetailsPage');


class HealthPlanDisplayPage {
    waitForHealthPlansPageToLoad() {
        let healthPlansHeader = '';
        if (state.toUpperCase() == constants.STATE_MN)
            healthPlansHeader = healthContentState.healthPlansHeader;
        else
            healthPlansHeader = healthContent.healthPlansHeader;
        browser.waitForPageToLoadAndCheckPartialHeaderText(eval(commonLoc.topNav.hd_healthPlans), healthPlansHeader);
        browser.waitUntilPageSubmit(() => eval(commonLoc.planTiles.btn_addPlanLocNoIndex).isDisplayed());

    }

    verifyHealthPlanPage() {
        this.verifyHeaderDetails();
        //    this.verifyLeftNav();
        //   this.verifyPlanTile();

    }
    //this will add first Health plan from plan display Page
    addHealthPlan() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        let healthPlanObj = commonfunc.addPlan(constants.HEALTHPLAN, 0);
        global.updateDataJson.households[householdIndex][constants.HEALTHPLAN] = healthPlanObj;
        logger.log("***** Health Plan Got Added In Global Object \n" + JSON.stringify(global.updateDataJson.households[householdIndex]));
        //browser.pauseBrowser(constants.PAUSE_BROWSER_6000);
        assert.assertElementIsVisible(eval(commonLoc.continuePopup.btn_continueToDentalPlans));
        assert.assertElementIsVisible(eval(commonLoc.continuePopup.lk_continueToCartLink));
    }
    // Verify Health Plans Page Header
    verifyHeaderDetails() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;

        let header = {};

        let aptcAmt = global.updateDataJson.households[householdIndex].aptcAmount;
        let subsidyAmt = global.updateDataJson.households[householdIndex].stateSubsidy;
        let aptcTotal = aptcAmt;

        if (aptcAmt == "" || aptcAmt == null || aptcAmt == undefined)
            header = { [commonLoc.topNav.hd_healthPlans]: healthContentState.healthPlans, [commonLoc.topNav.hd_dentalPlans]: healthContent.dentalPlans, [commonLoc.backToPreferences]: healthContent.backToPreferences, [healthPlanPageLoc.header.editFamilyInfo]: healthContent.editFamilyInfo, [commonLoc.header.ZIP]: healthContent.ZIP, [commonLoc.header.ZIP]: global.updateDataJson.households[householdIndex].zip, [commonLoc.header.memberInfo]: healthContent.memberInfo, [commonLoc.header.coverageDateAPTC]: global.updateDataJson.households[householdIndex].coverageDate };

        else {
            if (subsidyAmt != "" && subsidyAmt != null && subsidyAmt != undefined)
                aptcTotal = (parseFloat(aptcAmt) + parseFloat(subsidyAmt)).toFixed(2);

            aptcTotal = dataUtil.formatMoney(aptcTotal, true, true);

            header = {
                [commonLoc.topNav.hd_healthPlans]: healthContentState.healthPlans, [commonLoc.topNav.hd_dentalPlans]: healthContent.dentalPlans, [commonLoc.backToPreferences]: healthContent.backToPreferences, [healthPlanPageLoc.header.editFamilyInfo]: healthContent.editFamilyInfo, [commonLoc.header.ZIP]: healthContent.ZIP, [commonLoc.header.ZIP]: global.updateDataJson.households[householdIndex].zip, [commonLoc.header.memberInfo]: healthContent.memberInfo
                , [healthPlanPageLoc.header.aptcAmount]: aptcTotal, [commonLoc.header.coverageDateAPTC]: global.updateDataJson.households[householdIndex].coverageDate
            };
        }
        if (state.toUpperCase() == constants.STATE_CA)
            delete header[[healthPlanPageLoc.header.editFamilyInfo]];

        assert.assertArrayOfElementsContainsTextIgnoringCase(header);

    }

    verifyPlanMembers(group){
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        console.log("*****Verify Plan Members*****");
        let applicants = global.updateDataJson.households[householdIndex].applicants;
        assert.assertEqual(eval(commonLoc.header.memberNames).length, group.members.length);
        group.members.forEach(memberIndex => {
            assert.assertElementIsVisible(eval(commonLoc.header.memberName.replace("MEMBER_NAME_REPLACE",applicants[memberIndex].firstName)));
        });
    }
    verifyLeftNav() {
        let label_monthlyPrice = "";
        let label_deductible = "";
        let label_metalTier = "";
        if (state.toUpperCase() == constants.STATE_CA) {
            label_monthlyPrice = healthContentState.label_monthlyPrice;
            label_deductible = healthContentState.label_deductible;
        }
        else {
            label_monthlyPrice = healthContent.label_monthlyPrice;
            label_deductible = healthContent.label_deductible;
        }
        if (state.toUpperCase() == constants.STATE_MN)
            label_metalTier = healthContentState.label_metalTier;
        else
            label_metalTier = healthContent.label_metalTier;

        let sortBy = { [commonLoc.leftNav.sortBy.sortByHeading]: healthContent.sortByHeading, [healthPlanPageLoc.leftNav.sortBy.label_expenseEstimate]: healthContent.label_expenseEstimate, [commonLoc.leftNav.sortBy.label_monthlyPrice]: label_monthlyPrice, [commonLoc.leftNav.sortBy.label_deductible]: label_deductible, [commonLoc.leftNav.sortBy.label_OOP]: healthContent.label_OOP };

        if (state.toUpperCase() == constants.STATE_CA)
            delete sortBy[[commonLoc.leftNav.sortBy.label_OOP]];

        assert.assertArrayOfElementsContainsTextIgnoringCase(sortBy);

        let filterPlanType = { [commonLoc.leftNav.planType.filterBy.filterByHeading]: healthContent.filterByHeading, [commonLoc.leftNav.filterBy.planType.label_planType]: healthContent.label_planType, [commonLoc.leftNav.filterBy.planType.label_HMO]: healthContent.label_HMO };
        assert.assertArrayOfElementsContainsTextIgnoringCase(filterPlanType);

        let filterPlanFeatures = { [healthPlanPageLoc.leftNav.filterBy.planFeatures.label_planFeature]: healthContent.label_planFeature, [healthPlanPageLoc.leftNav.filterBy.planFeatures.label_HSA]: healthContent.label_HSA };
        assert.assertArrayOfElementsContainsTextIgnoringCase(filterPlanFeatures);

        let filterMetalTier = { [healthPlanPageLoc.leftNav.filterBy.metalTier.label_metalTier]: label_metalTier, [healthPlanPageLoc.leftNav.filterBy.metalTier.label_Platinum]: healthContent.label_Platinum, [healthPlanPageLoc.leftNav.filterBy.metalTier.label_Gold]: healthContent.label_Gold, [healthPlanPageLoc.leftNav.filterBy.metalTier.label_Silver]: healthContent.label_Silver, [healthPlanPageLoc.leftNav.filterBy.metalTier.label_Bronze]: healthContent.label_Bronze };
        assert.assertArrayOfElementsContainsTextIgnoringCase(filterMetalTier);

        let filterDeductible = { [healthPlanPageLoc.leftNav.filterBy.deductible.label_deductible]: label_deductible, [healthPlanPageLoc.leftNav.filterBy.deductible.label_2500]: healthContent.label_2500, [healthPlanPageLoc.leftNav.filterBy.deductible.label_5000]: healthContent.label_5000, [commonLoc.leftNav.filterBy.company.label_company]: healthContent.label_company };
        assert.assertArrayOfElementsContainsTextIgnoringCase(filterDeductible);


    }

    verifyPlanTile() {
        assert.assertElementIsVisible(eval(commonLoc.planTiles.planTileNoIndex));
        let tile = { [commonLoc.planTiles.label_compare]: healthContent.label_compare, [commonLoc.planTiles.btn_detail]: healthContent.label_detail, [commonLoc.planTiles.btn_addPlan]: healthContent.label_add };
        assert.assertArrayOfElementsContainsTextIgnoringCase(tile);
    }

    clickOnDentalPlans() {
        browser.click(eval(commonLoc.topNav.hd_dentalPlans));
        browser.waitForPageToLoad(eval(commonLoc.header.pageHeader), dentalContent.dentalCoverageHeader);
        browser.waitUntilPageSubmit(() => eval(commonLoc.planTiles.btn_addPlanLocNoIndex).isDisplayed());

    }

    clickContinueToDentalPlans() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        // browser.pauseBrowser(8000);
        browser.waitUntil(() => eval(commonLoc.continuePopup.btn_continueToDentalPlans).isDisplayed());
        browser.click(eval(commonLoc.continuePopup.btn_continueToDentalPlans))
        if(global.updateDataJson.households[householdIndex].applicants.length>1&&global.updateDataJson.households[householdIndex].applicationStatus!=null){
            commonfunc.confirmCoverageSeekingMembers();
           }
        browser.waitForPageToLoad(eval(commonLoc.header.pageHeader), dentalContent.dentalCoverageHeader)
        browser.pauseBrowser(constants.PAUSE_BROWSER_3000);
    }
    continueToCartPage()
    {
       // browser.pauseBrowser(8000);
        browser.waitUntil(()=>eval(commonLoc.continuePopup.fantasticPopUp).isDisplayed());
        if(eval(commonLoc.continuePopup.btn_continueToCartFromHealth).isDisplayed()){
            browser.click(eval(commonLoc.continuePopup.btn_continueToCartFromHealth));
        }else browser.click(eval(commonLoc.continuePopup.btn_continueToCart));
        cartPage.verifyCartPageHeader();
    }

    addHealthPlanFromDetailsPage() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        this.clickOnPlanDetail();
        this.addHealthPlanToCartFromDetailsPage(global.updateDataJson.households[householdIndex].healthPlan.name);

    }

      clickOnPlanDetail(planindex){
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        browser.pauseBrowser(constants.PAUSE_BROWSER_5000);
        let index = planindex;
        if (!index) {
            index = commonfunc.getRandomPlanIndex();
        }
        //check if the random plan is not a market place plan in NJ. If so, generate random index until a market place plan found
        if (state.toUpperCase() == constants.STATE_NJ && eval(pageHeaderLoc.commonHeaderAndFooter.lk_login).isDisplayed()) {
            logger.log("***** Market Place Plan? " + eval(healthPlanPageLocState.planTiles.planCategory).getText())
            let condition = eval(healthPlanPageLocState.planTiles.planCategory).getText().includes(constants.NOT_A_MARKET_PLACE_PLAN);
            while (condition) {
                index = commonfunc.getRandomPlanIndex();
                condition = eval(healthPlanPageLocState.planTiles.planCategory).getText().includes(constants.NOT_A_MARKET_PLACE_PLAN);
                logger.log(eval(healthPlanPageLocState.planTiles.planCategory).getText())
            }
        }

        logger.log("***** Getting Plan Details Of Index " + index);
        let detailsfromPlanPage = commonfunc.getPlanDetails(index, constants.HEALTHPLAN);
        global.updateDataJson.households[householdIndex][constants.HEALTHPLAN] = detailsfromPlanPage;
        logger.log("***** Health Plan Got Added In Global Object \n" + JSON.stringify(global.updateDataJson.households[householdIndex]));
        detailsfromPlanPage = JSON.stringify(detailsfromPlanPage);
        browser.click(eval(commonLoc.planTiles.btn_detail));
        healtPlanDetailsPage.waitForHealthPlansPageToLoad();
        this.verifyPlanDetails(detailsfromPlanPage, index);
    }

    verifyPlanDetails(detailsfromPlanPage, index) {
        logger.log("*****verifying Plan Details Page *****");
        let resultfromDetailPage = commonfunc.getPlanDetailsFromDetailPage(index);
        resultfromDetailPage = JSON.stringify(resultfromDetailPage);
        let bool = detailsfromPlanPage == resultfromDetailPage;
        assert.assertTrue(bool);

    }
    addHealthPlanToCartFromDetailsPage(planName) {
        logger.log("***** Adding Health Plan to Cart From Plan Details Page *****");
        browser.click(eval(commonLoc.planTiles.btn_addPlanLocNoIndex));
        commonfunc.verifyContinueToPopUp(planName);
    }
    addRandomHealthPlan(group) {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        console.log("*****Add Random Plan to Cart")
        let healthPlanObj= commonfunc.addRandomPlan(constants.HEALTHPLAN);
        if(typeof group !== "undefined"){
            global.updateDataJson.households[householdIndex].grouping[group.groupIndex][constants.HEALTHPLAN] = healthPlanObj;
        }else{
            global.updateDataJson.households[householdIndex][constants.HEALTHPLAN] = healthPlanObj;
        }
        console.log("***** Health Plan Got Added In Global Object \n" + JSON.stringify(global.updateDataJson.households[householdIndex]));
    }
    addHealthPlanForIssuer(issuerName) {
        this.addHealthPlan();
    }

    verifySortByFilterOnHealthPlan() {
        this.sortByExpenseEstimate();
        commonfunc.sortByMonthlyPrice();
        if (state.toUpperCase() != constants.STATE_CA) {
            commonfunc.sortByDeductible();
            commonfunc.sortByOutOfPocket();
        }
    }
    sortByExpenseEstimate() {
        // browser.pauseBrowser(constants.PAUSE_BROWSER_6000);
        browser.waitUntil(() => browser.isDisplayed(eval(commonLoc.planTiles.btn_addPlanLocNoIndex)));
        let sorted = false;
        if (state.toUpperCase() == constants.STATE_CA)
            sorted = commonfunc.sortBy("Expense Estimate", healthPlanPageLocState.planTiles.totalExpEst);
        else
            sorted = commonfunc.sortBy("Expense Estimate", healthPlanPageLoc.planTiles.planExpense);

        logger.log("***Plans are sorted by Expense Estimate =" + sorted)
        assert.assertTrue(sorted);

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
        if (browser.isDisplayed(eval(healthPlanPageLoc.leftNav.filterBy.planType.cb_POS))) {
            this.filterByPlanTypePOS();
            browser.click(eval(healthPlanPageLoc.leftNav.filterBy.planType.cb_POS));
        }
    }
    filterByPlanType(planTypeElement, planType) {
        browser.scrollToViewAndClick(planTypeElement);
        // browser.pauseBrowser(constants.PAUSE_BROWSER_6000);
        browser.waitUntil(() => browser.isDisplayed(eval(commonLoc.rightPanel.appliedFilter)));
        let filtered = commonfunc.filterBy(planType, healthPlanPageLoc.planTiles.planTypeTier);
        logger.log("***Plans are filtered by " + planType + " =" + filtered)
        assert.assertTrue(filtered)

    }

    filterByPlanTypePOS() {
        browser.click(eval(healthPlanPageLoc.leftNav.filterBy.planType.cb_POS));
        // browser.pauseBrowser(constants.PAUSE_BROWSER_6000);
        browser.waitUntil(() => browser.isDisplayed(eval(commonLoc.rightPanel.appliedFilter)));
        let filtered = commonfunc.filterBy("POS", healthPlanPageLoc.planTiles.planTypeTier);
        logger.log("***Plans are filtered by POS =" + filtered)
        assert.assertTrue(filtered)

    }

    verifyFilterOnPlanFeatures() {
        this.filterByPlanFeatureHSA();
        browser.click(eval(healthPlanPageLoc.leftNav.filterBy.planFeatures.cb_HSA));
    }


    filterByPlanFeatureHSA() {

        browser.click(eval(healthPlanPageLoc.leftNav.filterBy.planFeatures.cb_HSA));
        // browser.pauseBrowser(constants.PAUSE_BROWSER_6000);
        browser.waitUntil(() => browser.isDisplayed(eval(commonLoc.rightPanel.appliedFilter)));
        let filtered = commonfunc.filterBy("HSA", healthPlanPageLoc.planTiles.planTypeTier);
        logger.log("***Plans are filtered by HSA =" + filtered)
        assert.assertTrue(filtered)


    }

    verifyFilterOnMetalTier() {
        this.filterByMetalTierPlatinum();
        browser.click(eval(healthPlanPageLoc.leftNav.filterBy.metalTier.cb_Platinum));
        this.filterByMetalTierGold();
        browser.click(eval(healthPlanPageLoc.leftNav.filterBy.metalTier.cb_Gold));
        this.filterByMetalTierSilver();
        browser.click(eval(healthPlanPageLoc.leftNav.filterBy.metalTier.cb_Silver));
        this.filterByMetalTierBronze();
        browser.click(eval(healthPlanPageLoc.leftNav.filterBy.metalTier.cb_Bronze));
        this.filterByMetalTierCatastrophic(healthPlanPageLoc.leftNav.filterBy.metalTier.cb_Catastrophic);
        browser.click(eval(healthPlanPageLoc.leftNav.filterBy.metalTier.cb_Catastrophic));
    }

    filterByMetalTierPlatinum() {
        browser.scrollToView(eval(healthPlanPageLoc.leftNav.filterBy.metalTier.cb_Platinum));
        browser.click(eval(healthPlanPageLoc.leftNav.filterBy.metalTier.cb_Platinum));
        //  browser.pauseBrowser(2000);
        browser.waitUntil(() => browser.isDisplayed(eval(commonLoc.rightPanel.appliedFilter)));
        let filtered = commonfunc.filterBy("PLATINUM", healthPlanPageLoc.planTiles.planTypeTier);
        logger.log("***Plans are filtered by Platinum =" + filtered)
        assert.assertTrue(filtered)
    }

    filterByMetalTierGold() {
        browser.scrollToView(eval(healthPlanPageLoc.leftNav.filterBy.metalTier.cb_Gold));
        browser.click(eval(healthPlanPageLoc.leftNav.filterBy.metalTier.cb_Gold));
        //  browser.pauseBrowser(2000);
        browser.waitUntil(() => browser.isDisplayed(eval(commonLoc.rightPanel.appliedFilter)));

        let filtered = commonfunc.filterBy("GOLD", healthPlanPageLoc.planTiles.planTypeTier);
        logger.log("***Plans are filtered by Gold =" + filtered)
        assert.assertTrue(filtered)
    }

    filterByMetalTierSilver() {
        browser.scrollToView(eval(healthPlanPageLoc.leftNav.filterBy.metalTier.cb_Silver));
        browser.click(eval(healthPlanPageLoc.leftNav.filterBy.metalTier.cb_Silver));
        //  browser.pauseBrowser(5000);
        browser.waitUntil(() => browser.isDisplayed(eval(commonLoc.rightPanel.appliedFilter)));
        let filtered = commonfunc.filterBy("SILVER", healthPlanPageLoc.planTiles.planTypeTier);
        logger.log("***Plans are filtered by Silver =" + filtered)
        assert.assertTrue(filtered)
    }

    filterByMetalTierBronze() {
        browser.scrollToView(eval(healthPlanPageLoc.leftNav.filterBy.metalTier.cb_Bronze));
        browser.click(eval(healthPlanPageLoc.leftNav.filterBy.metalTier.cb_Bronze));
        //  browser.pauseBrowser(2000);
        browser.waitUntil(() => browser.isDisplayed(eval(commonLoc.rightPanel.appliedFilter)));
        let filtered = commonfunc.filterBy("BRONZE", healthPlanPageLoc.planTiles.planTypeTier);
        logger.log("***Plans are filtered by Bronze =" + filtered)
        assert.assertTrue(filtered)
    }
    filterByMetalTierCatastrophic() {
        browser.pauseBrowser(constants.PAUSE_BROWSER_3000);
        browser.scrollToView(eval(healthPlanPageLoc.leftNav.filterBy.metalTier.cb_Catastrophic));
        browser.click(eval(healthPlanPageLoc.leftNav.filterBy.metalTier.cb_Catastrophic));
        //  browser.pauseBrowser(2000);
        browser.waitUntil(() => browser.isDisplayed(eval(commonLoc.rightPanel.appliedFilter)));

        let filtered;
        if (state.toUpperCase() == constants.STATE_CA)
            filtered = commonfunc.filterBy(constants.MINIMUM_COVERAGE, healthPlanPageLoc.planTiles.planTypeTier);
        else
            filtered = commonfunc.filterBy(constants.CATASTROPHIC, healthPlanPageLoc.planTiles.planTypeTier);

        logger.log("***** Catastrophic Plans are filtered  = " + filtered);
        assert.assertTrue(filtered);
        logger.log("***** Catastrophic Plans are filtered  = " + filtered);

    }

    verifyFilterOnDeductible() {
        let deductible_arr = ["cb_2500", "cb_5000", "cb_7500", "cb_10000", "cb_12000", "cb_15000", "cb_17500", "cb_20000"];
        let deductibleObj = healthPlanPageLoc.leftNav.filterBy.deductible;
        for (let i = 0; i < deductible_arr.length; i++) {
            let deductibleLoc = deductibleObj[deductible_arr[i]];
            let deductibleAmt = Number(deductible_arr[i].substring(3));
            if (browser.isDisplayed(eval(deductibleLoc))) {
                this.filterByDeductibleLessThanAmount(eval(deductibleLoc), deductibleAmt);
                browser.scrollToViewAndClick(eval(deductibleLoc));
            }

        }
    }
    filterByDeductibleLessThanAmount(deductibleElement, deductibleAmt) {
        browser.scrollToViewAndClick(deductibleElement);
        // browser.pauseBrowser(2000);
        browser.waitUntil(() => browser.isDisplayed(eval(commonLoc.rightPanel.appliedFilter)));
        let filtered = this.filterByDeductible(deductibleAmt, commonLoc.planTiles.deductible);
        logger.log("***Plans are filtered by LT " + deductibleAmt + " =" + filtered)
        assert.assertTrue(filtered)
    }
    filterByDeductible(option, selector) {
        logger.log("**** Filter Plan by " + option);
        browser.pauseBrowser(6000);
        let noOfPages = 1
        if (eval(commonLoc.planTiles.noOfPages) != undefined && browser.isDisplayed(eval(commonLoc.planTiles.noOfPages)))
            noOfPages = parseInt(eval(commonLoc.planTiles.noOfPages).getText().split(' ')[2].trim());
        let expectedValue = [];
        for (let i = 1; i <= noOfPages; i++) {
            let size = browser.getNumberOfChildElements(eval(commonLoc.planTiles.noOfTiles));
            logger.log("Current Page No: " + i);
            console.log("Number Of Plans In Current Page: " + size);
            for (let index = 0; index < size; index++) {
                browser.scrollToView(eval(selector));
                let value = eval(selector).getText();
                if (value.includes("/")) {
                    let splitedDeduc = value.split("/");
                    value = Number(dataUtil.extractNumber(splitedDeduc[0])) + Number(dataUtil.extractNumber(splitedDeduc[1]));
                }
                else {
                    value = Number(dataUtil.extractNumber(value));
                }
                expectedValue.push(value);
                if (expectedValue[index] > option) {
                    return false;
                }
            }
            if (i < noOfPages)
                browser.click(eval(commonLoc.planTiles.icn_paginationArrowRight));
        }
        return true;
    }

    verifyHealthCompare() {
        // browser.pauseBrowser(constants.PAUSE_BROWSER_6000);
        browser.waitUntil(() => browser.isDisplayed(eval(commonLoc.planTiles.btn_addPlanLocNoIndex)));
        let comparePlanIndexes = [0, 2, 4, 5];
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
                    let compareResult = commonfunc.plancompare(constants.HEALTHPLAN, index);
                    assert.assertTrue(compareResult);
                    logger.log("***** Health Plan " + index + " Comparison Result = " + compareResult);
                    compareBoxPlansCount = compareBoxPlansCount + 1;
                }
            }
            else
                logger.log("***** Health Plan With Index: " + index + " Doesn't Exist *****");
        }
        commonfunc.verifyComparePlansPage(constants.HEALTHPLAN);
    }

}


module.exports = new HealthPlanDisplayPage();

const state = stateProfile;
const global = require('../Global_include');
const constants = require('../../common.utils/Constants');


const preEligibilityPageLoc = require('../../../resources/selectors/common/Anonymous/PreEligibilityPageObject.json');
const preEligibilityPageLocState = require('../../../resources/selectors/exchange/' + state + '/Anonymous/PreEligibilityPageObject.json');
const preferencesPageLocState = require('../../../resources/selectors/exchange/'+state+'/PlanDisplay/PreferencesPageObject.json');
const preEligibilityContent = require('../../../resources/content/common/Anonymous/PreEligibilityPage.content.js');
const preEligibilityContentState = require('../../../resources/content/exchange/' + state + '/Anonymous/PreEligibilityPage.content.js');

const browser = require('../../base/Browser.js');
const assert = require('../../base/Assert.js');
const logger=require('../../common.utils/LoggerUtil');
const jsonUtil = require('../../common.utils/JsonUtil');

const individualSignupPageModel = require('../../pagemodels/UserAccountManagement/IndividualSignupPage');
const preEligibilityResultsPageModel = require('../../pagemodels/Anonymous/PreEligibilityResultsPage');
const pageHeaderModel=require('../CommonPageFunctions/PageHeader');
const dbQuery = require('../../pagemodels/Anonymous/AnonymousDatabaseQueries');


class PreEligibilityPage {

    getAnonymousDataAndUpdateGlobalDataJson(fileName)
    {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        logger.log("fileName --> "+fileName)
        var data = require('../../../resources/data/Common/Anonymous/'+fileName);
        var preEligibilityObject=data.houseHold;
        global.updateDataJson.households[householdIndex]= jsonUtil.updateHouseholdDetails(preEligibilityObject);
        if(state.toUpperCase() == constants.STATE_CA)
        {
            global.updateDataJson.households[householdIndex].aptcAmount = data.CA_aptc;
            global.updateDataJson.households[householdIndex].stateSubsidy = data.CA_stateSubsidy;
            global.updateDataJson.households[householdIndex].coverageDate = data.CA_coverageDate;
        }
    }
    verifyPreEligibilityPage() {    
        logger.log("***** Verifying Pre-Eligibility Page *****");           
        if (state.toUpperCase() == constants.STATE_PA) {
            this.verifyPreEligibilityPageContinueSectionHeader();
            this.verifyPreEligibilityPageContinueSectionLabels();
            this.clickContinue();
            browser.waitForPageToLoadAndCheckPartialHeaderText(eval(preEligibilityPageLoc.pageHeader),preEligibilityContent.preEligibilityHeader);
        }
        pageHeaderModel.verifyHeaderAndFooterFields();
        this.verifyPreEligibilityPageHeader();
        this.verifyPreEligibilityPageLeftPanel();
        this.verifyPreEligibilityPageRightPanel();
        logger.log("***** Verified Pre-Eligibility Page *****");           


    }

    verifyPreEligibilityPageContinueSectionHeader() {
        logger.log("***** The Header of Pre-Eligibility Page Continue Section: " + eval(preEligibilityPageLocState.continueSectionHeader).getText() + " *****");
        assert.assertElementContainsText(eval(preEligibilityPageLocState.continueSectionHeader), preEligibilityContentState.preEligibilityContinueSectionHeader);
    }
    verifyPreEligibilityPageContinueSectionLabels() {
        let locator_arr = [eval(preEligibilityPageLocState.lbl_importantTextContinuePage)];
        assert.assertArrayOfElementsAreDisplayed(locator_arr);
    }


    clickContinue() {
        logger.log("***** Clicking on Continue *****");
        browser.scrollToViewAndClick(eval(preEligibilityPageLocState.lk_continue));
        logger.log("***** Clicked on Continue *****");

    }


    verifyPreEligibilityPageHeader() {
        logger.log("***** The Header of Pre-Eligibility Page: " + eval(preEligibilityPageLoc.pageHeader).getText() + " *****");
        assert.assertElementContainsText(eval(preEligibilityPageLoc.pageHeader), preEligibilityContentState.preEligibilityHeader);
    }

    verifyPreEligibilityPageLeftPanel() {
       let locator_arr = [eval(preEligibilityPageLocState.leftPanel.lbl_inThisSection), eval(preEligibilityPageLocState.leftPanel.lbl_requiredFields), eval(preEligibilityPageLocState.leftPanel.lbl_requiredNotice)];
       if(state.toUpperCase() != constants.STATE_NV)
       locator_arr.push(eval(preEligibilityPageLocState.leftPanel.lbl_requiredNotice2));
       assert.assertArrayOfElementsAreDisplayed(locator_arr);
    }

    verifyPreEligibilityPageRightPanel() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        let locator_arr=[];
        let pregnancyCheck=false;
        let nativeAmericanCheck=false;
        let tobaccoUseCheck=false;
        dbQuery.getDBdata().then(result => {
        let result_arr=result.split("-");
         pregnancyCheck = result_arr[0];
         nativeAmericanCheck = result_arr[1];
         tobaccoUseCheck = result_arr[2];
        }
        );
      


        if (state.toUpperCase() == constants.STATE_NV || state.toUpperCase() == constants.STATE_PA|| state.toUpperCase() == constants.STATE_ID) {
            locator_arr = [eval(preEligibilityPageLoc.rightPanel.lbl_whereDoYouLive), eval(preEligibilityPageLoc.rightPanel.lbl_householdNeedCoverage), 
                eval(preEligibilityPageLoc.rightPanel.lbl_members), eval(preEligibilityPageLoc.rightPanel.lbl_birthdate), 
                eval(preEligibilityPageLoc.rightPanel.lbl_tobaccoUse), eval(preEligibilityPageLoc.rightPanel.lbl_nativeAmerican),
                eval(preEligibilityPageLoc.rightPanel.lbl_seekingCoverage), eval(preEligibilityPageLoc.rightPanel.lbl_houseHoldQualifiesLowerCost),
                eval(preEligibilityPageLoc.rightPanel.lbl_incomeAlertText)];
            if (pregnancyCheck === true) {
                locator_arr.push(eval(preEligibilityPageLoc.rightPanel.lbl_pregnant));

            }
        }

        if (state.toUpperCase() == constants.STATE_MN) {
            locator_arr = [eval(preEligibilityPageLoc.rightPanel.lbl_whereDoYouLive), eval(preEligibilityPageLoc.rightPanel.lbl_householdNeedCoverage),
                 eval(preEligibilityPageLoc.rightPanel.lbl_members), eval(preEligibilityPageLoc.rightPanel.lbl_birthdate), eval(preEligibilityPageLoc.rightPanel.lbl_tobaccoUse),
                  eval(preEligibilityPageLocState.rightPanel.lbl_nativeAmerican),eval(preEligibilityPageLoc.rightPanel.lbl_pregnant), eval(preEligibilityPageLocState.rightPanel.lbl_seekingCoverage), 
                  eval(preEligibilityPageLoc.rightPanel.lbl_houseHoldQualifiesLowerCost),eval(preEligibilityPageLoc.rightPanel.lbl_incomeAlertText)];
           
        }

        if (state.toUpperCase() == constants.STATE_NJ) {
            locator_arr = [eval(preEligibilityPageLoc.rightPanel.lbl_whereDoYouLive), eval(preEligibilityPageLoc.rightPanel.lbl_householdNeedCoverage),
                 eval(preEligibilityPageLoc.rightPanel.lbl_members), eval(preEligibilityPageLoc.rightPanel.lbl_birthdate), 
                 eval(preEligibilityPageLoc.rightPanel.lbl_pregnant), eval(preEligibilityPageLocState.rightPanel.lbl_seekingCoverage), 
                 eval(preEligibilityPageLoc.rightPanel.lbl_houseHoldQualifiesLowerCost),eval(preEligibilityPageLocState.rightPanel.lbl_incomeAlertText)];
        
            if (tobaccoUseCheck === true) {
                locator_arr.push(eval(preEligibilityPageLoc.rightPanel.lbl_tobaccoUse));
            }

            if (nativeAmericanCheck === true) {
                locator_arr.push(eval(preEligibilityPageLoc.rightPanel.lbl_nativeAmerican));
            }


        }
      //  if(global.updateDataJson.households[householdIndex].applicationType == "OEP" && state.toUpperCase() != constants.STATE_NJ && state.toUpperCase() != constants.STATE_PA)
      //  locator_arr.splice(0,0,eval(preEligibilityPageLoc.rightPanel.lbl_whichCoverageYear));
        assert.assertArrayOfElementsAreDisplayed(locator_arr);
    }

    clickAddSpouseBtn() {
        browser.click(eval(preEligibilityPageLoc.btn_spouse));
        assert.assertElementIsNotVisible(eval(preEligibilityPageLoc.btn_spouse));
    }
    verifySeekCoverageIsSelectedByDefault(seekCoverage)
    {
         assert.assertElementIsSelected(seekCoverage);
    }

    clickAddDependentBtn() {
        browser.click(eval(preEligibilityPageLoc.btn_dependent));
    }
    enterZipCode(zip) {
        browser.setValueInTextField(eval(preEligibilityPageLoc.tb_zipCode), zip);
        logger.log("**** Zip code entered ****");
    }
    enterDob(element, dob) {
        browser.setValueInTextField(element, dob)
    }

    enterHouseholdIncome(income) {
        logger.log("***** Entering Household Income *****");
        browser.setValueInTextField(eval(preEligibilityPageLoc.tb_houseHoldIncome), income);
    }

    clickBrowsePlan() {
        //No Browse Plans Otpion for NJ
        logger.log("***** Clicking on Browse Plans *****");
        browser.click(eval(preEligibilityPageLoc.btn_browsePlans));
        browser.waitUntil(() => eval(preferencesPageLocState.btn_reset).isDisplayed()); 
    }
    clickCheckForSavings() {
        logger.log("***** Clicking on Check For Savings *****");
        browser.click(eval(preEligibilityPageLoc.btn_checkForSavings));
        preEligibilityResultsPageModel.waitForPreEliglibilityResultsPageLoad();

    }

    checkTobaccoUse(element) {
        browser.selectCheckBox(element);
    }

    checkNativeAmerican(element) {
        browser.selectCheckBox(element);
    }
    checkSeekingCoverage(element) {
        browser.selectCheckBox(element);
    }

    checkPregnant(element) {
        browser.selectCheckBox(element);
    }

    clickSkipAndSignUp() {
        logger.log("***** Clicking on Skip and Signup *****");
        browser.click(eval(preEligibilityPageLoc.btn_skipAndSignUp));
        individualSignupPageModel.verifySignUpPageHeader();
    }
    // This funcion enter applicants from json array.
    enterApplicantDetails(applicants_arr) {
        let birthdate;
        let tobaccoUse;
        let nativeAmerican;
        let seekingCoverage;
        let pregnant;
        logger.log("**** Entering Applicants Details - Max applicants you can enter is 11 includes primary applicant, spouse and children in Anonymous Flow****");
        for (let index = 1; index <= applicants_arr.length; index++) {
            if (index <= 11) {
                birthdate = preEligibilityPageLoc.tb_birthdate;
                tobaccoUse = preEligibilityPageLoc.cb_tobaccoUse;
                nativeAmerican = preEligibilityPageLoc.cb_nativeAmerican;
                seekingCoverage = preEligibilityPageLoc.cb_seekingCoverage;
                if (state.toUpperCase() == constants.STATE_NJ)
                    pregnant = preEligibilityPageLoc.cb_pregnant;

                if (applicants_arr[index - 1].relation.toUpperCase() == "SELF") {
                    this.verifySeekCoverageIsSelectedByDefault(eval(seekingCoverage));
                    if (state.toUpperCase() == constants.STATE_NJ)
                        this.fillDetailsNJ(applicants_arr, index, birthdate, pregnant, seekingCoverage);
                    else
                        this.fillDetails(applicants_arr, index, birthdate, tobaccoUse, nativeAmerican, seekingCoverage);
                }

                if (applicants_arr[index - 1].relation.toUpperCase() == "SPOUSE") {
                   // browser.click(eval(preEligibilityPageLoc.btn_spouse));
                   this.clickAddSpouseBtn();
                   this.verifySeekCoverageIsSelectedByDefault(eval(seekingCoverage));
                    if (state.toUpperCase() == constants.STATE_NJ)
                        this.fillDetailsNJ(applicants_arr, index, birthdate, pregnant, seekingCoverage);
                    else
                        this.fillDetails(applicants_arr, index, birthdate, tobaccoUse, nativeAmerican, seekingCoverage);
                }
                if (applicants_arr[index - 1].relation.toUpperCase() == "CHILD") {
                    //browser.click(eval(preEligibilityPageLoc.btn_dependent));
                    this.clickAddDependentBtn();
                    this.verifySeekCoverageIsSelectedByDefault(eval(seekingCoverage));
                    if (state.toUpperCase() == constants.STATE_NJ)
                        this.fillDetailsNJ(applicants_arr, index, birthdate, pregnant, seekingCoverage);
                    else
                        this.fillDetails(applicants_arr, index, birthdate, tobaccoUse, nativeAmerican, seekingCoverage);
                }
            }
            else {
                browser.click(eval(preEligibilityPageLoc.btn_dependent));
                this.verifyMaxDependentsPopUpHeader(preEligibilityPageLoc.limitOnNumberOfDependentPopUpHeader);
                this.clickCloseOnPopUp(preEligibilityPageLoc.btn_limitOnNumberOfDependentPopUpClose);
                browser.waitForPageToLoad(eval(preEligibilityPageLoc.lbl_whereDoYouLive), preEligibilityContent.whereDoYouLiveText);
            }
        }
    }
    fillDetailsNJ(applicants_arr, index, birthdate, pregnant, seekingCoverage) {
        if (applicants_arr[index - 1].dateOfBirth)
            this.enterDob(eval(birthdate), applicants_arr[index - 1].dateOfBirth);
        if (applicants_arr[index - 1].pregnant)
            this.checkPregnant(eval(pregnant));
        if (applicants_arr[index - 1].seekingCoverage)
            this.checkSeekingCoverage(eval(seekingCoverage));
    }
    fillDetails(applicants_arr, index, birthdate, tobaccoUse, nativeAmerican, seekingCoverage) {
        if (applicants_arr[index - 1].dateOfBirth)
            this.enterDob(eval(birthdate), applicants_arr[index - 1].dateOfBirth);
        if (applicants_arr[index - 1].tobaccoUse)
            this.checkTobaccoUse(eval(tobaccoUse));
        if (applicants_arr[index - 1].nativeAmerican)
            this.checkNativeAmerican(eval(nativeAmerican));
        if (applicants_arr[index - 1].seekingCoverage)
            this.checkSeekingCoverage(eval(seekingCoverage));
    }

    verifyMaxDependentsPopUpHeader(element) {
        assert.assertElementContainsText(eval(element), preEligibilityContent.limitOnNumberOfDependentsHeader);
    }
    clickCloseOnPopUp(element) {
        browser.click(eval(element));
    }

    enterApplicantDetailsForNonFinancialFlow() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;

      /*  if(global.updateDataJson.households[householdIndex].applicationType == "OEP" && state.toUpperCase() != constants.STATE_NJ && state.toUpperCase() != constants.STATE_PA)
        this.selectCoverageYear(global.updateDataJson.households[householdIndex].applicationYear); */
        this.enterZipCode(global.updateDataJson.households[householdIndex].zip);
        if(state.toUpperCase() == constants.STATE_ID)
        this.selectCountyName(global.updateDataJson.households[householdIndex].county);
        this.enterApplicantDetails(global.updateDataJson.households[householdIndex].applicants);
    }
    enterApplicantDetailsForFinancialFlow() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        this.enterApplicantDetailsForNonFinancialFlow();
        this.enterHouseholdIncome(global.updateDataJson.households[householdIndex].income);
    }
    selectCoverageYear(year)
    {
        let coverageYear = eval(preEligibilityPageLoc.sb_coverageYear);
        coverageYear.selectByVisibleText(year);
        logger.log("***** Coverage Year Selected *****");

    }
    selectCountyName(county)
    {
        let countyName = eval(preEligibilityPageLoc.sb_county);
        countyName.selectByVisibleText(county);
        logger.log("***** County Name Selected *****");
    }
    //remove dependent with index number
    removeDependentDetailsByIndex(index) {
        let row = index; //Index for Remove, can be from 0 (for first dependent inclusive of spouse) to 9 (for last dependent)
        //remove = preEligibilityPageLoc.lk_remove;
        browser.click(eval(preEligibilityPageLoc.lk_remove));
        logger.log("***** Dependent row " + row + " removed*****");
    }

    // This funcion removes dependents on PreEligibility Page.
    removeDependentDetails() {
        // minIndex= starting Index for Remove, can be from 0 (for first dependent inclusive of spouse) to 9 (for last dependent)
        //maxIndex= end Index, max value 9
        this.removeDetails(2, 9);
    }
 
    removeDetails(minIndex, maxIndex) {
        logger.log("*****Removing additional dependents *****");
        let row = maxIndex;
        while (row > minIndex) {
           // remove = preEligibilityPageLoc.lk_remove;
            browser.click(eval(preEligibilityPageLoc.lk_remove));
            logger.log("***** Dependent row " + row + " removed*****");
            row--;
        }
        logger.log("*****Additional dependents removed*****");
    }
    // verifies error messages displayed for invalid data
    verifyPreEligibilityPageForInvalidData(invalidDataLabels_arr) {
        assert.assertArrayOfElementsAreDisplayed(eval(invalidDataLabels_arr));
    }
}
module.exports = new PreEligibilityPage();

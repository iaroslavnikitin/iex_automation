const state = stateProfile;
const global = require('../../pagemodels/Global_include');
const constants = require('../../common.utils/Constants');
const random = require('../../common.utils/RandomDataGenerator');
const pageHeaderLoc = require('../../../resources/selectors/common/PageHeaderObject.json');
const commonLoc = require('../../../resources/selectors/common/PlanDisplay/CommonPlanDisplayObject.json')
const healthPageLoc = require('../../../resources/selectors/common/PlanDisplay/HealthPlanDisplayPageObject.json');
const healthPageLocState = require('../../../resources/selectors/exchange/' + state + '/PlanDisplay/HealthPlanDisplayPageObject.json');
const healthDetailsLoc = require('../../../resources/selectors/common/PlanDisplay/HealthPlanDetailsPageObject.json');
const healthDetailsLocState = require('../../../resources/selectors/exchange/' + state + '/PlanDisplay/HealthPlanDetailsPageObject.json');
const dentalPageLoc = require('../../../resources/selectors/common/PlanDisplay/DentalPlanDisplayPageObject.json');
const dentalDetailsLoc = require('../../../resources/selectors/common/PlanDisplay/DentalPlanDetailsPageObject.json');
const showCartLoc = require('../../../resources/selectors/common/PlanDisplay/ShowCartPageObject.json');
const healthPlanComparePageLoc = require('../../../resources/selectors/common/PlanDisplay/HealthPlanComparePlansPageObject.json');
const dentalPlanComparePageLoc = require('../../../resources/selectors/common/PlanDisplay/DentalPlanComparePlansPageObject.json');
const CommonComparePageLoc = require('../../../resources/selectors/common/PlanDisplay/CommonComparePlansPageObject.json');
const commonComparePlansContent = require('../../../resources/content/common/PlanDisplay/CommonComparePlansPage.content');
const commonComparePlansContentState = require('../../../resources/content/exchange/' + state + '/PlanDisplay/CommonComparePlansPage.content');
const assert = require('../../base/Assert');
const browser = require('../../base/Browser.js');
const logger = require('../../common.utils/LoggerUtil');
const dataUtil = require('../../common.utils/DataUtil');


class CommonPlanDisplayFunction {


  addPlan(plan, index) {
    browser.waitUntil(() => eval(commonLoc.planTiles.btn_addPlan).isDisplayed());
    let planDetail = this.getPlanDetails(index, plan);
    logger.log("****Adding Plan number " + index + " to cart")
    //browser.pauseBrowser(3000)
    browser.click(eval(commonLoc.planTiles.btn_addPlan));
    this.verifyContinueToPopUp(planDetail.name);
    return planDetail;

  }

  addRandomPlan(plan) {
    console.log("*****Adding Random Plan to Cart")
    let index = this.getRandomPlanIndex();
    logger.log("plan index " + index);

    //check if the random plan is "not a market place plan" in NJ. If so, generate random index until a "market place plan" found
    if (state.toUpperCase() == constants.STATE_NJ && plan == constants.HEALTHPLAN && eval(pageHeaderLoc.commonHeaderAndFooter.lk_login).isDisplayed()) {
      logger.log("***** Market Place Plan? " + eval(healthPageLocState.planTiles.planCategory).getText())
      let condition = eval(healthPageLocState.planTiles.planCategory).getText().includes(constants.NOT_A_MARKET_PLACE_PLAN);
      while (condition) {
        index = this.getRandomPlanIndex();
        condition = eval(healthPageLocState.planTiles.planCategory).getText().includes(constants.NOT_A_MARKET_PLACE_PLAN);
        logger.log(eval(healthPageLocState.planTiles.planCategory).getText())
      }
    }
    logger.log("plan index " + index);
    return this.addPlan(plan, index)
  }

  getRandomPlanIndex() {
    console.log("*****Get Random Plan Index")
    let noOfPlans = browser.getNumberOfChildElements(eval(commonLoc.planTiles.noOfTiles))
    let index = random.getRandomInt(0, noOfPlans);
    return index;
  }

  verifyContinueToPopUp(name) {
    //browser.pauseBrowser(3000)
    browser.waitUntil(() => browser.isDisplayed(eval(commonLoc.continuePopup.fantasticPopUp)));
    assert.assertElementIsVisible(eval(commonLoc.continuePopup.fantasticPopUp));
    assert.assertElementIsVisible(eval(commonLoc.continuePopup.fantasticPopUpText));
    assert.assertElementIsVisible(eval(commonLoc.continuePopup.fantasticPopUpPlanName));
    let planName = (eval(commonLoc.continuePopup.fantasticPopUpPlanName)).getText().includes(name);
    assert.assertTrue(planName);
    logger.log("Plan Name Matches in Pop Up");
  }

  getPlanDetails(index, planType) {
    logger.log("*****Get plan details of " + planType)
    var plan = {};
    if (planType == constants.HEALTHPLAN) {
      plan = this.getHealthPlanDetails(plan, index)
    }
    if (planType == constants.DENTALPLAN) {
      plan = this.getDentalPlanDetails(plan, index)
    }

    plan.company = eval(commonLoc.planTiles.img_planCompany).getAttribute('alt').substring(0, 6);
    plan.name = eval(commonLoc.planTiles.planName).getText().substring(0, 21);

    if (plan.name.includes(constants.HSA))
      plan.HSACompatablePlan = constants.YES;
    else
      plan.HSACompatablePlan = constants.NO;

    plan.premium = eval(commonLoc.planTiles.premiumAmt).getText();
    plan.index = index;
    plan.deductible = eval(commonLoc.planTiles.deductible).getText();

    if (state.toUpperCase() != constants.STATE_CA)
      plan.OOPmax = eval(commonLoc.planTiles.OOPmax).getText();

    let planobj = JSON.stringify(plan);

    logger.log("*****Plan Json " + planobj);
    return plan;
  }

  getHealthPlanDetails(plan, index) {
    let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
    plan.officeVisit = eval(healthPageLoc.planTiles.OfficeVisit).getText();
    plan.genericDrugs = eval(healthPageLoc.planTiles.genericDrug).getText();
    plan.tier = (eval(healthPageLoc.planTiles.planTypeTier)).getText().substring(0, 6);

    console.log("global.updateDataJson.households[householdIndex].aptcAmount: "+global.updateDataJson.households[householdIndex].aptcAmount)
   // if (global.updateDataJson.households[householdIndex].aptcAmount != "" && global.updateDataJson.households[householdIndex].aptcAmount != undefined && plan.tier != constants.PLANTIER_CATASTROPHIC && plan.tier != constants.PLANTIER_MINIMUM_COVERAGE) {
    if (global.updateDataJson.households[householdIndex].aptcAmount != "" && global.updateDataJson.households[householdIndex].aptcAmount != undefined && plan.tier != constants.PLANTIER_CATASTROPHIC && plan.tier != constants.PLANTIER_MINIMUM_COVERAGE) {
      browser.waitUntil(() => eval(healthPageLoc.planTiles.appliedAptc).isDisplayed());
      plan.aptc = eval(healthPageLoc.planTiles.appliedAptc).getText();

      //if (global.updateDataJson.households[householdIndex].stateSubsidy != "" && global.updateDataJson.households[householdIndex].stateSubsidy != undefined) {
      if (state.toUpperCase() == constants.STATE_CA || state.toUpperCase() == constants.STATE_NJ) {
        let aptcSavingsSplit = eval(healthPageLoc.planTiles.detail_aptc).getAttribute('data-original-title').replace(/[^$0-9.-]+/g, '').trim().split("$");
        plan.appliedAptc = aptcSavingsSplit[1];
        plan.appliedStateSubsidy = aptcSavingsSplit[2];
      }
    }
    else if (plan.tier == constants.PLANTIER_CATASTROPHIC || plan.tier == constants.PLANTIER_MINIMUM_COVERAGE) {
      global.updateDataJson.households[householdIndex].aptcAmount = "";
      global.updateDataJson.households[householdIndex].stateSubsidy = "";
    }

    if (state.toUpperCase() != constants.STATE_CA)
      plan.expense = (eval(healthPageLoc.planTiles.planExpense)).getText().substring(0, 3);

    if (state.toUpperCase() == constants.STATE_CA) {
      let totalExpEstSplit = eval(healthPageLocState.planTiles.totalExpEst).getAttribute('data-original-title').replace(/[^$0-9.-]+/g, '').trim().split("$");
      plan.totalExpenseEstimate = totalExpEstSplit[3];
      plan.qualityRating = eval(healthPageLocState.planTiles.qualityRating).getText();
    }

    if (state.toUpperCase() == constants.STATE_ID)
      plan.network = eval(healthPageLocState.planTiles.network).getText().trim();

    let planTileTxt = eval(commonLoc.planTiles.planTile).getText();
    if (global.updateDataJson.households[householdIndex].preferences != undefined && global.updateDataJson.households[householdIndex].preferences != null && global.updateDataJson.households[householdIndex].preferences != "") {
      let drugName = global.updateDataJson.households[householdIndex].preferences.Lipitor;
      if (drugName != "" && drugName != undefined) {
        if (planTileTxt.includes(drugName) || planTileTxt.includes(drugName.toUpperCase()))
          plan.preferDrug = drugName;
      }
      let doctorName = global.updateDataJson.households[householdIndex].preferences.preferDoc;
      if (doctorName != "" && doctorName != undefined) {
        if (planTileTxt.includes(doctorName) || planTileTxt.includes(doctorName.toUpperCase()))
          plan.preferDoc = doctorName;
      }

    }

    return plan;
  }


  getPlanDetailsFromDetailPage(index) {
    let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
    var detailPage = {
    };
    if (state.toUpperCase() == constants.STATE_CA) {
      detailPage.officeVisit = eval(healthDetailsLocState.planHighlights.planHighlight_officeVisit).getText();
      detailPage.genericDrugs = eval(healthDetailsLocState.planHighlights.planHighlight_drug).getText();
    }
    else {
      detailPage.officeVisit = eval(healthDetailsLoc.planHighlights.planHighlight_officeVisit).getText();
      detailPage.genericDrugs = eval(healthDetailsLoc.planHighlights.planHighlight_drug).getText();
    }

    detailPage.tier = (eval(healthDetailsLoc.planDetailTile.tier)).getText().substring(0, 6);
    if (global.updateDataJson.households[householdIndex].aptcAmount != "" && global.updateDataJson.households[householdIndex].aptcAmount != undefined && detailPage.tier != constants.PLANTIER_CATASTROPHIC && plan.tier != constants.PLANTIER_MINIMUM_COVERAGE) {
      detailPage.aptc = eval(healthDetailsLoc.planDetailTile.detailAPTC).getText();
    //  if (global.updateDataJson.households[householdIndex].stateSubsidy != "" && global.updateDataJson.households[householdIndex].stateSubsidy != undefined) {
      if (state.toUpperCase() == constants.STATE_CA || state.toUpperCase() != constants.STATE_NJ) {
        let aptcSavingsSplit = eval(healthDetailsLoc.planDetailTile.detailAPTC).getAttribute('data-original-title').replace(/[^$0-9.-]+/g, '').trim().split("$");
        detailPage.appliedAptc = aptcSavingsSplit[1];
        detailPage.appliedStateSubsidy = aptcSavingsSplit[2];
      }
    }
    else if (detailPage.tier == constants.PLANTIER_CATASTROPHIC) {
      global.updateDataJson.households[householdIndex].aptcAmount = "";
      global.updateDataJson.households[householdIndex].stateSubsidy = "";
    }


    if (state.toUpperCase() != constants.STATE_CA)
      detailPage.expense = (eval(healthDetailsLoc.planDetailTile.lk_expense)).getText().substring(0, 3);

    if (state.toUpperCase() == constants.STATE_CA) {
      detailPage.totalExpenseEstimate = (eval(healthDetailsLocState.planHighlights.planHighlight_totalExpEst)).getText().replace("$", "").trim();
      detailPage.qualityRating = (eval(healthDetailsLocState.planHighlights.planHighlight_qualityRating)).getText();

    }
    if (state.toUpperCase() == constants.STATE_ID)
      detailPage.network = eval(healthDetailsLocState.planHighlights.planHighlight_network).getText().trim();

    let planDetailTileTxt = eval(healthDetailsLoc.planHighlights.planHighlightTile).getText();
    if (global.updateDataJson.households[householdIndex].preferences != undefined && global.updateDataJson.households[householdIndex].preferences != null && global.updateDataJson.households[householdIndex].preferences != "") {
      let drugName = global.updateDataJson.households[householdIndex].preferences.Lipitor;
      if (drugName != "" && drugName != undefined) {
        if (planDetailTileTxt.includes(drugName) || planDetailTileTxt.includes(drugName.toUpperCase()))
          detailPage.preferDrug = drugName;
      }
      let doctorName = global.updateDataJson.households[householdIndex].preferences.preferDoc;
      if (doctorName != "" && doctorName != undefined) {
        if (planDetailTileTxt.includes(doctorName) || planDetailTileTxt.includes(doctorName.toUpperCase()))
          detailPage.preferDoc = doctorName;
      }
    }
    detailPage.company = eval(healthDetailsLoc.planDetailTile.img_company).getAttribute('alt').substring(0, 6);
    if (state.toUpperCase() == constants.STATE_CA)
      detailPage.name = eval(healthDetailsLocState.planHighlights.planHighlight_name).getText().substring(0, 21);
    else
      detailPage.name = eval(healthDetailsLoc.planHighlights.planHighlight_name).getText().substring(0, 21);

    detailPage.HSACompatablePlan = eval(healthDetailsLoc.planHighlights.planHighlight_hsaTypeDetail).getText();

    detailPage.premium = eval(healthDetailsLoc.planDetailTile.premium).getText();

    detailPage.index = index;

    if (state.toUpperCase() == constants.STATE_CA)
      detailPage.deductible = eval(healthDetailsLocState.planHighlights.planHighlight_deductible).getText();
    else
      detailPage.deductible = eval(healthDetailsLoc.planHighlights.planHighlight_deductible).getText();

    if (state.toUpperCase() != constants.STATE_CA)
      detailPage.OOPmax = eval(healthDetailsLoc.planHighlights.planHighlight_oopmax).getText();

    let planobj2 = JSON.stringify(detailPage);
    logger.log("***** Plan Json From Details Page " + planobj2);
    return detailPage;
  }

  getDentalPlanDetails(plan, index) {
    plan.dexpense = eval(dentalPageLoc.planTiles.planTypeTier).getText();
    plan.routineDental = eval(dentalPageLoc.planTiles.routineDental).getText();
    plan.dentalCheckup = eval(dentalPageLoc.planTiles.dentalCheckup).getText();
    return plan;
  }

  getDentalPlanDetailsFromDetailPage(index) {

    var detailPage = {
    };
    browser.click(eval(commonLoc.planTiles.btn_detail));
    detailPage.dexpense = eval(dentalDetailsLoc.planHighlights.planHighlight_dexpense).getText();
    detailPage.routineDental = eval(dentalDetailsLoc.planHighlights.planHighlight_routinedental).getText();
    detailPage.dentalCheckup = (eval(dentalDetailsLoc.planHighlights.planHighlight_dentalcheckup)).getText();
    detailPage.company = eval(dentalDetailsLoc.planHighlights.planHighlight_company).getAttribute('alt').substring(0, 10);
    detailPage.name = eval(dentalDetailsLoc.planHighlights.planHighlight_name).getText().substring(0, 21);
    detailPage.premium = eval(dentalDetailsLoc.planHighlights.planHighlight_dpremium).getText();
    detailPage.index = index;
    detailPage.deductible = eval(dentalDetailsLoc.planHighlights.planHighlight_ddeductible).getText();
    detailPage.OOPmax = eval(dentalDetailsLoc.planHighlights.planHighlight_doopmax).getText();

    let planobj2 = JSON.stringify(detailPage);
    logger.log("*****Plan Json " + planobj2);
    return detailPage;
  }

  isEstimateLarger(current, next) {
    var myMap = new Map();
    myMap.set("Lower Expense", 1);
    myMap.set("Medium Expense", 2);
    myMap.set("Higher Expense", 3);
    return myMap.get(current) > myMap.get(next);
  }
  isEstimateLargerCA(current, next) {
    var myMap = new Map();
    myMap.set("Lower", 1);
    myMap.set("Average", 2);
    myMap.set("Higher", 3);
    return myMap.get(current) > myMap.get(next);
  }
  /*** Sort Plans By Selected Option */
  sortBy(option, selector) {
    logger.log("**** Sort Plans by " + option);
    let noOfPages = 1
    if (eval(commonLoc.planTiles.noOfPages) != undefined && browser.isDisplayed(eval(commonLoc.planTiles.noOfPages)))
      noOfPages = parseInt(eval(commonLoc.planTiles.noOfPages).getText().split(' ')[2].trim());
    logger.log("No of Plan Pages " + noOfPages);
    let expectedValue = [];

    for (let i = 1; i <= noOfPages; i++) {
      let size = browser.getNumberOfChildElements(eval(commonLoc.planTiles.noOfTiles));
      logger.log("Current Page No: " + i);
      console.log("Number Of Plans In Current Page: " + size);
      for (let index = 0; index < size; index++) {
        browser.scrollToView(eval(selector));
        let value = eval(selector).getText();
        logger.log("value  ---->" + value)
        if (option == "Monthly Price" || option == "OOP") {
          value = parseFloat(value.substring(1)).toFixed(2);
        }
        else if (option == "Deductible") {
          if (value.includes("/")) {
            let splitedDeduc = value.split("/");
            value = Number(dataUtil.extractNumber(splitedDeduc[0])) + Number(dataUtil.extractNumber(splitedDeduc[1]));
          }
          else {
            value = Number(dataUtil.extractNumber(value));
          }
        }
        if (state.toUpperCase() != constants.STATE_NJ)
          expectedValue.push(value);
        else {
          if (eval(healthPageLocState.planTiles.planCategory) != undefined) //planCategory - Not applicable for dental plans
          {
            console.log("Not a Market Place Plan: " + eval(healthPageLocState.planTiles.planCategory).getText().includes(constants.NOT_A_MARKET_PLACE_PLAN));
            if (!(eval(healthPageLocState.planTiles.planCategory).getText().includes(constants.NOT_A_MARKET_PLACE_PLAN)))
              expectedValue.push(value);
          }

        }
      }
      if (i < noOfPages)
        browser.click(eval(commonLoc.planTiles.icn_paginationArrowRight));

    }

    if (option == "Expense Estimate") {
      for (let j = 0; j < expectedValue.length - 1; j++) {
        let correctlySorted = true;
        let current = expectedValue[j];
        let next = expectedValue[j + 1];
        if (state.toUpperCase() == constants.STATE_CA) {
          if (this.isEstimateLargerCA(current, next)) {
            correctlySorted = false;
            logger.log("correctlySorted " + correctlySorted);
            break;
          }
        }
        else
          if (this.isEstimateLarger(current, next)) {
            correctlySorted = false;
            logger.log("correctlySorted " + correctlySorted);
            break;
          }
        return correctlySorted;
      }
    }
    else {

      let sortedArray = expectedValue.sort();
      return (JSON.stringify(sortedArray) == JSON.stringify(expectedValue))

    }


  }
  /*** Filter Plans By Selected Option */
  filterBy(option, selector) {
    logger.log("**** Filter Plan by " + option);
    // browser.pauseBrowser(6000);
    let noOfPages = 1
    if (eval(commonLoc.planTiles.noOfPages) != undefined && browser.isDisplayed(eval(commonLoc.planTiles.noOfPages)))
      noOfPages = parseInt(eval(commonLoc.planTiles.noOfPages).getText().split(' ')[2].trim());
    logger.log("No of Plan Pages " + noOfPages);
    let tierValue = [];
    for (let i = 1; i <= noOfPages; i++) {
      let size = browser.getNumberOfChildElements(eval(commonLoc.planTiles.noOfTiles));
      logger.log("Current Page No: " + i);
      console.log("Number Of Plans In Current Page: " + size);
      for (let index = 0; index < size; index++) {
        browser.scrollToView(eval(selector));
        let tier = eval(selector).getText();
        tierValue.push(tier);
      }
      if (i < noOfPages)
        browser.click(eval(commonLoc.planTiles.icn_paginationArrowRight));
    }

    for (let index2 = 0; index2 < tierValue.length; index2++) {
      logger.log(">>>>>>>>>>" + tierValue[index2])
      if (!tierValue[index2].includes(option)) {
        return false;
      }
    }
    return true;
  }
  verifyFilterByCompanyName(companyName) {
    let noOfCompanies = $('#carrierFilter').$$('div');
    for (let index = 0; index < noOfCompanies.length; index++) {
      if (eval(commonLoc.cb_company).getAttribute('data-filter-label').includes(companyName)) {
        browser.click(eval(commonLoc.cb_company));
        let filtered = commonfunc.filterByCompany(companyName, eval(commonLoc.company));
        logger.log("***Plans are filtered by Company =" + filtered)
        assert.assertTrue(filtered);
      }
    }
  }
 /*** Verifying Filter By For Selected Company ***/
  filterByCompany(option, selector) {
    logger.log("**** Filter Plan by " + option);
    browser.pauseBrowser(constants.PAUSE_BROWSER_3000);
    let noOfPages = 1
    if (eval(commonLoc.planTiles.noOfPages) != undefined && browser.isDisplayed(eval(commonLoc.planTiles.noOfPages)))
      noOfPages = parseInt(eval(commonLoc.planTiles.noOfPages).getText().split(' ')[2].trim());
    let companyName = [];
    for (let i = 1; i <= noOfPages; i++) {
      let size = browser.getNumberOfChildElements(eval(commonLoc.planTiles.noOfTiles));
      logger.log("Current Page No: " + i);
      console.log("Number Of Plans In Current Page: " + size);
      for (let index = 0; index < size; index++) {
        browser.scrollToView(eval(selector));
        let company = eval(selector).getAttribute('alt');
        companyName.push(company);
      }
      if (i < noOfPages)
        browser.click(eval(commonLoc.planTiles.icn_paginationArrowRight));
    }

    for (let index2 = 0; index2 < companyName.length; index2++) {
      if (!companyName[index2].includes(option.substring(0, 23))) {
        return false;
      }
      logger.log(">>>>>>>>>>" + companyName[index2])

    }
    return true;
  }
  /*** Verifying Compare Plans Box On Plan Display Page to check the selected plan added to Compare Box ***/
  plancompare(planType, index) {
    browser.scrollToViewAndClick(eval(commonLoc.planTiles.btn_compare));
    let countOfComaprePlans = $('#compareBox').$$('i');
    logger.log("Count Of Plans In The Compare Box " + + countOfComaprePlans.length);
    // browser.pauseBrowser(constants.PAUSE_BROWSER_5000);

    for (let i = 0; i < countOfComaprePlans.length; i++) {
      browser.scrollToView(eval(commonLoc.compare.icn_compare));
      let comparePlanId = eval(commonLoc.compare.icn_compare).getAttribute('id').substring(10);
      browser.scrollToView(eval(commonLoc.planTiles.btn_compare));
      let planTilePlanId = eval(commonLoc.planTiles.btn_compare).getAttribute('id').substring(11);

      if (comparePlanId == planTilePlanId) {
        let tierCompare = false;
        if (planType == constants.HEALTHPLAN)
          tierCompare = (eval(healthPageLoc.compare.compareTier).getText().split(' ').join('') == eval(healthPageLoc.planTiles.planTypeTier).getText().split(' ').join(''))

        if (planType == constants.DENTALPLAN)
          tierCompare = (eval(dentalPageLoc.compare.compareTier).getText().split(' ').join('') == eval(dentalPageLoc.planTiles.planTypeTier).getText().split(' ').join(''))

        if (eval(commonLoc.compare.img_comparePlan).getAttribute('alt').substring(0, 21).replace(/[.]+/g, '') == eval(commonLoc.planTiles.img_planCompany).getAttribute('alt').substring(0, 21).replace(/[.]+/g, '') &&
          tierCompare && eval(commonLoc.compare.comparePremiumAmt).getText() == eval(commonLoc.planTiles.premiumAmt).getText())
          return true;
      }
    }
  }
  /*** Verifying Too Many Plans To Compare Popup appears when tried to add more than 3 compare plans ***/
  veryTooManyPlansToComparePopup() {
    logger.log("***** Verifying Too Many Plans To Compare Popup *****");
    assert.assertElementContainsText(eval(commonLoc.compare.hd_tooManyPansComparePopup), "Too Many Plans");
    browser.click(eval(commonLoc.compare.btn_cancelPopup));
    browser.waitUntil(() => eval(commonLoc.compare.compareNow).isDisplayed());
    logger.log("***** Verified Too Many Plans To Compare Popup *****");
  }
  /*** Verifying Compare Plans Page ***/
  verifyComparePlansPage(planType) {
    let noOfPlans = $('#compareBox').$$('i');
    let plansObjArr = this.getComparePlansObjectDetails(noOfPlans.length, planType);
    browser.click(eval(commonLoc.compare.compareNow));
    if (state.toUpperCase() == constants.STATE_CA)
      browser.waitForPageToLoad(eval(commonLoc.comparePlansPage.backToAllPlansLink), commonComparePlansContentState.backToPlans);
    else
      browser.waitForPageToLoad(eval(commonLoc.comparePlansPage.backToAllPlansLink), commonComparePlansContent.backToPlans);
    for (let index = 0; index < noOfPlans.length; index++) {
      let planTier = "";
      if (planType == constants.HEALTHPLAN) 
        planTier = eval(healthPlanComparePageLoc.planCompareTiles.tier).getText();
      else
        planTier = eval(dentalPlanComparePageLoc.planCompareTiles.tier).getText();

      assert.assertTrue(plansObjArr[index].company.replace(/[.]+/g, '') == eval(CommonComparePageLoc.planCompareTiles.img_company).getAttribute('alt').substring(0, 21).replace(/[.]+/g, ''));
      logger.log("***** " + planType + " " + index + " Company " + plansObjArr[index].company + " matched");
      assert.assertTrue(plansObjArr[index].companyTier.split(' ').join('') == planTier.split(' ').join(''));
      logger.log("***** " + planType + " " + index + " Plan Tier " + plansObjArr[index].companyTier + " matched");
      assert.assertTrue(plansObjArr[index].premiumAmt == eval(CommonComparePageLoc.planCompareTiles.premium).getText());
      logger.log("***** " + planType + " " + index + " premium " + plansObjArr[index].premiumAmt + " matched");

    }
  }


/*** get Details about Plans to be compared from Compare Box on Plan Display Page and store them in plansObj_arr  */
  getComparePlansObjectDetails(noOfPlans, planType) {
    logger.log("***** noOfPlans " + noOfPlans);
    logger.log("***** planType " + planType);
    let plansObj_arr = [];
    for (let i = 0; i < noOfPlans; i++) {
      let company = eval(commonLoc.compare.img_comparePlan).getAttribute('alt').substring(0, 21);
      let companyTier = "";
      if (planType == constants.HEALTHPLAN)
        companyTier = eval(healthPageLoc.compare.compareTier).getText().replace('HSA','');
      else
        companyTier = eval(dentalPageLoc.compare.compareTier).getText();
      let premiumAmt = eval(commonLoc.compare.comparePremiumAmt).getText();
      plansObj_arr.push({ company, companyTier, premiumAmt });
    }
    logger.log(JSON.stringify(plansObj_arr));
    return plansObj_arr;
  }

  /* 
    Created By: Anu Gorrepati
    Description: verifyCartDetails method verifies the health and/or dental plan details that are added to cart page from Plan Display Pages.
    Input: healthPlanObj - Health Plan JSON Object, dentalPlanObj - Dental Plan JSON Object.
  */
  verifyCartDetails(healthPlanObj, dentalPlanObj) {

    if (healthPlanObj != undefined && dentalPlanObj != undefined && healthPlanObj != null && dentalPlanObj != null) { //both healthPlanObj and dentalPlanObj added to cart
      logger.log("***** Verifying Health And Dental Plans *****");
      this.verifyHealthPlanDetails(healthPlanObj);
      this.verifyDentalPlanDetails(dentalPlanObj);
      this.verifyCartTotal(healthPlanObj, dentalPlanObj);
    }
    else if (healthPlanObj != undefined && healthPlanObj != null) { //if only healthPlanObj added to cart
      logger.log("***** Verifying Health Plan *****");
      this.verifyHealthPlanDetails(healthPlanObj);
      this.verifyCartTotalForOnePlan(healthPlanObj);
    }
    else if (dentalPlanObj != undefined && dentalPlanObj != null) { //if only dentalPlanObj added to cart
      logger.log("***** Verifying Dental Plan *****");
      this.verifyDentalPlanDetails(dentalPlanObj);
      this.verifyCartTotalForOnePlan(dentalPlanObj);
    }

  }

  verifyHealthPlanDetails(healthPlanObj) {
    logger.log("***** Verifying Health Plan Image Text *****")
    this.verifyPlanImageTxt(eval(showCartLoc.healthCart.cart_healthCompanyImg), healthPlanObj.company);
    logger.log("***** Verifying Health Plan Company, Name and Coverage Date Text *****")
    this.verifyHealthPlanAndCoverageDate(healthPlanObj);
    logger.log("***** Verifying Health Plan Monthly Prices And Subtotal *****")
    this.verifyHealthPlanPricesIndividualAndSubTotal(healthPlanObj);
  }
  verifyHealthPlanAndCoverageDate(healthPlanObj) {
    let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
    let cmpCompany = eval(showCartLoc.healthCart.cart_healthCompany).getText().includes(healthPlanObj.company);
    let cmpTier = eval(showCartLoc.healthCart.cart_healthCompany).getText().includes(healthPlanObj.name.substring(0, 20));
    let cmpCoverageDate = global.updateDataJson.households[householdIndex].coverageDate == eval(showCartLoc.healthCart.cart_healthCoverageDate).getText().substring(21);
    assert.assertTrue(cmpCompany);
    logger.log("***** Health Plan Company Matched*****")
    assert.assertTrue(cmpTier);
    logger.log("***** Health Plan Name Matched*****")
    assert.assertTrue(cmpCoverageDate);
    logger.log("***** Health Plan Coverage Date Matched*****")

  }

  verifyDentalPlanDetails(dentalPlanObj) {
    logger.log("***** Verifying Dental Plan Image Text *****")
    this.verifyPlanImageTxt(eval(showCartLoc.dentalCart.cart_dentalCompanyImg), dentalPlanObj.company.replace(/[.]+/g, ''));
    logger.log("***** Verifying Dental Plan Company, Name and Coverage Date Text *****")
    this.verifyDentalPlanAndCoverageDate(dentalPlanObj);
    logger.log("***** Verifying Dental Plan Monthly Prices And Subtotal *****")
    this.verifyDentalPlanPricesIndividualAndSubTotal(dentalPlanObj);

  }
  verifyDentalPlanAndCoverageDate(dentalPlanObj) {
    let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
    let cmpCompany = eval(showCartLoc.dentalCart.cart_dentalCompany).getText().includes(dentalPlanObj.company.replace(/[.]+/g, ''));
    let cmpTier = eval(showCartLoc.dentalCart.cart_dentalCompany).getText().includes(dentalPlanObj.name.substring(0, 20));
    let cmpCoverageDate = global.updateDataJson.households[householdIndex].coverageDate == eval(showCartLoc.dentalCart.cart_dentalCoverageDate).getText().substring(21);
    assert.assertTrue(cmpCompany);
    logger.log("***** Dental Plan Company Matched*****")
    assert.assertTrue(cmpTier);
    logger.log("***** Dental Plan Name Matched*****")
    assert.assertTrue(cmpCoverageDate);
    logger.log("***** Dental Plan Coverage Date Matched*****")
  }

  verifyPlanImageTxt(element, company) {
    let planImageTxt = element.getAttribute('alt').includes(company);
    logger.log("***** Plan Company from Plan Object: "+company);
    logger.log("***** Plan Company On Cart Page: "+element.getAttribute('alt'));
    assert.assertTrue(planImageTxt);
    logger.log("***** Plan Image Text Matched *****");
  }

  verifyHealthPlanPricesIndividualAndSubTotal(healthPlanObj) {
    let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
    let cmpPremAmt = false;
    let healthPlanObjPremium = 0;
    logger.log("**** aptcAmount: "+global.updateDataJson.households[householdIndex].aptcAmount);
    logger.log("**** stateSubsidy: "+global.updateDataJson.households[householdIndex].stateSubsidy);

    if (global.updateDataJson.households[householdIndex].aptcAmount == "" && global.updateDataJson.households[householdIndex].stateSubsidy == "") //Non-APTC, no State Subsidy
      cmpPremAmt = dataUtil.extractNumber(healthPlanObj.premium) == dataUtil.extractNumber(eval(showCartLoc.healthCart.cart_premium).getText());
    else {
      healthPlanObjPremium = Number(dataUtil.extractNumber(healthPlanObj.premium)) + Number(dataUtil.extractNumber(healthPlanObj.aptc));
      cmpPremAmt = healthPlanObjPremium.toFixed(2) == dataUtil.extractNumber(eval(showCartLoc.healthCart.cart_premium).getText());
      logger.log("healthPlanObjAPTC " + ("$" + dataUtil.extractNumber(healthPlanObj.aptc)));
    }
    logger.log("healthPlanObjPremium " + ("$" + dataUtil.extractNumber(healthPlanObj.premium)));
    logger.log("healthPlanCartPremium " + ("$" + eval(showCartLoc.healthCart.cart_premium).getText()));
    assert.assertTrue(cmpPremAmt);
    logger.log("***** Health Plan Premiun Amount Matched *****");
    if (global.updateDataJson.households[householdIndex].aptcAmount != "") {
      let cmpTaxCreditAmt = false;
      if (state.toUpperCase() == constants.STATE_NJ || state.toUpperCase() == constants.STATE_CA)
        cmpTaxCreditAmt = dataUtil.extractNumber(healthPlanObj.appliedAptc) == dataUtil.extractNumber(eval(showCartLoc.healthCart.cart_taxCredit).getText());
      else
        cmpTaxCreditAmt = dataUtil.extractNumber(healthPlanObj.aptc) == dataUtil.extractNumber(eval(showCartLoc.healthCart.cart_taxCredit).getText());
      assert.assertTrue(cmpTaxCreditAmt);
      logger.log("***** Health Plan APTC Amount Matched *****");

    }

    if (global.updateDataJson.households[householdIndex].stateSubsidy != "") {
      let cmpStateSubsidy = parseFloat(healthPlanObj.appliedStateSubsidy).toFixed(2) == parseFloat(eval(showCartLoc.healthCart.cart_stateSubsidy).getText()).toFixed(2);
      assert.assertTrue(cmpStateSubsidy);
      logger.log("***** Health Plan State Subsidy Amount Matched *****");

    }
    let cmpHealthMonthAmt = dataUtil.extractNumber(healthPlanObj.premium) == dataUtil.extractNumber(eval(showCartLoc.healthCart.cart_healthMonthPay).getText());
    assert.assertTrue(cmpHealthMonthAmt);
    logger.log("***** Health Plan Monthly Pay Amount Matched *****");
  }

  verifyDentalPlanPricesIndividualAndSubTotal(dentalPlanObj) {
    logger.log("dentalPlanObjPremium " + ("$" + dataUtil.extractNumber(dentalPlanObj.premium)));
    logger.log("dentalPlanCartPremium " + ("$" + dataUtil.extractNumber(eval(showCartLoc.dentalCart.cart_dentalpremium).getText())));

    let cmpPremAmt = dataUtil.extractNumber(dentalPlanObj.premium) == dataUtil.extractNumber(eval(showCartLoc.dentalCart.cart_dentalpremium).getText());
    assert.assertTrue(cmpPremAmt);
    logger.log("***** Dental Plan Premiun Amount Matched *****");

    logger.log("dentalPlanCartMonthlyPay " + ("$" + dataUtil.extractNumber(eval(showCartLoc.dentalCart.cart_DentalMonthlyPay).getText())));

    let cmpHealthMonthAmt = dataUtil.extractNumber(dentalPlanObj.premium) == dataUtil.extractNumber(eval(showCartLoc.dentalCart.cart_DentalMonthlyPay).getText());
    assert.assertTrue(cmpHealthMonthAmt);
    logger.log("***** Dental Plan Monthly Pay Amount Matched *****");


  }

  // Verifying Cart Total if both dental or health plans Added To Cart
  verifyCartTotal(healthPlanObj, dentalPlanObj) {

    let healthPremium = dataUtil.extractNumber(healthPlanObj.premium);
    let dentalPremium = dataUtil.extractNumber(dentalPlanObj.premium);
    let total = Number(healthPremium) + Number(dentalPremium);
    let healthMonthlyPaymentFromCart = 0;
    let dentalMonthlyPaymentFromCart = 0;
    if (healthPremium > 0) {
      healthMonthlyPaymentFromCart = dataUtil.extractNumber(eval(showCartLoc.cartTotal.cart_SumHealthMonthPay).getText());
      dentalMonthlyPaymentFromCart = dataUtil.extractNumber(eval(showCartLoc.cartTotal.cart_SumDentalMonthPay).getText());
    }
    else
      dentalMonthlyPaymentFromCart = dataUtil.extractNumber(eval(showCartLoc.cartTotal.cart_SumHealthMonthPay).getText());

    let totalSum = Number(healthMonthlyPaymentFromCart) + Number(dentalMonthlyPaymentFromCart);
    let totalMonthlyPaymentFromCart = false;
    if (healthPremium > 0)
      totalMonthlyPaymentFromCart = dataUtil.extractNumber(eval(showCartLoc.cartTotal.cart_TotalAmt).getText()) == totalSum.toFixed(2);
    else
      totalMonthlyPaymentFromCart = dataUtil.extractNumber(eval(showCartLoc.cartTotal.cart_TotalAmtIfNoHealthPlan).getText()) == totalSum.toFixed(2);
    assert.assertTrue(totalMonthlyPaymentFromCart);
    logger.log("***** Cart Total Monthly Payment = Cart Health Monthly Payment + Cart Dental Monthly Payment Matched *****");

    let cmpSummaryTotalAmt = total.toFixed(2) == totalSum.toFixed(2);
    assert.assertTrue(cmpSummaryTotalAmt);
    logger.log("***** Cart Total Monthly Payment = Sum Of Health And Dental Plan Premiums In Plan Objects *****");

  }

  // Verifying Cart Total if Only One Plan (either dental or health) Added To Cart
  verifyCartTotalForOnePlan(planObj) {
    let planPremium = dataUtil.extractNumber(planObj.premium);
    let planMonthlyPaymentFromCart = dataUtil.extractNumber(eval(showCartLoc.cartTotal.cart_planSummaryMonthlyForOnePlan).getText());
    let totalMonthlyPaymentFromCart = dataUtil.extractNumber(eval(showCartLoc.cartTotal.cart_totalAmtForOnePlan).getText()) == planMonthlyPaymentFromCart;
    assert.assertTrue(totalMonthlyPaymentFromCart);
    logger.log("***** Cart Total Monthly Payment = Cart Plan Monthly Payment Matched *****");
    let cmpSummaryTotalAmt = planPremium == planMonthlyPaymentFromCart;
    assert.assertTrue(cmpSummaryTotalAmt);
    logger.log("***** Cart Total Monthly Payment = Plan Premium In Plan Object Matched *****");
  }
  confirmCoverageSeekingMembers(){
    let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
    browser.pauseBrowser(constants.PAUSE_BROWSER_4000);
      if (eval(commonLoc.updateResultsPopup.seekingCoveragePopUpHeader).isDisplayed()){
   // if(global.updateDataJson.households[householdIndex].applicants.length>1){
  console.log("***Confirm Coverage Seeking Members")
  this.verifyCoverageSeekingPopUp();
  browser.waitForDisplayAndClick(eval(commonLoc.updateResultsPopup.updateResults));
   // }
  }else{
    console.log("***No Coverage Seeking Members PopUp ")
  }
    }
verifyCoverageSeekingPopUp(){
    console.log("***Verify Coverage Seeking PopUp")
    browser.pauseBrowser(constants.PAUSE_BROWSER_3000);
    assert.assertElementIsVisible(eval(commonLoc.updateResultsPopup.seekingCoveragePopUpHeader));
  }

  sortByMonthlyPrice() {
    browser.click(eval(commonLoc.leftNav.sortBy.rb_monthlyPrice));
    let sorted = this.sortBy("Monthly Price", commonLoc.planTiles.premiumAmt);
    logger.log("***Plans are sorted by Monthly Price/Premium =" + sorted)
    assert.assertTrue(sorted);
  }
  sortByDeductible() {
    browser.click(eval(commonLoc.leftNav.sortBy.rb_deductible))
    let sorted = this.sortBy("Deductible", commonLoc.planTiles.deductible);
    logger.log("***Plans are sorted =" + sorted)
    assert.assertTrue(sorted);
  }
  sortByOutOfPocket() {
    browser.click(eval(commonLoc.leftNav.sortBy.rb_oop));
    let sorted = this.sortBy("OOP", commonLoc.planTiles.OOPmax);
    logger.log("***Plans are sorted =" + sorted)
    assert.assertTrue(sorted);
  }
  // Verifies Filters For Plan Company Names, will loop through all the companies present on UI page
  verifyFilterOnCompany() {
    let listOfCompanies = eval(commonLoc.leftNav.filterBy.company.listOfCompanies);
    logger.log("Number Of Plan Companies : \n" + listOfCompanies.length);
    for (let index = 0; index < listOfCompanies.length; index++) {
      let companyName = eval(commonLoc.leftNav.filterBy.company.lbl_companyName).getText().trim();
      let cb_company = commonLoc.leftNav.filterBy.company.cb_companyName;
      logger.log("***** Company Name Being Filtered: " + companyName);
      browser.scrollToView(eval(cb_company));
      browser.click(eval(cb_company));
      let filtered = this.filterByCompany(companyName, commonLoc.planTiles.img_planCompany);
      logger.log("***** Plans are filtered by Company =" + filtered);
      assert.assertTrue(filtered);
      browser.scrollToView(eval(cb_company));
      browser.click(eval(cb_company));
    }
  }
}

//export default new HomePage();
module.exports = new CommonPlanDisplayFunction();

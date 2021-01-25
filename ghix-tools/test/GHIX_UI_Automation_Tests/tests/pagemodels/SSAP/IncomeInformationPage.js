const locatorJson = require('../../../resources/selectors/common/SSAP/IncomeInformationObject.json');
const browser = require('../../base/Browser.js');
const jsonUtil = require('../../common.utils/JsonUtil');
const commomfunc = require('../SSAP/CommonSSAPFunction');
const global = require('../Global_include');
const constants = require('../../common.utils/Constants');
const logger = require('../../common.utils/LoggerUtil');

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})


class IncomeInformationPage {


    continueIncomeSourcePage() {
        commomfunc.clickSaveAndContinueToNextPage("Income Sources", "");
    }
    continueToDeductionSourcesPage() {
        commomfunc.clickSaveAndContinueToNextPage("Deduction Sources", "");
    }
    continueToExpectedIncomePage() {
        commomfunc.clickSaveAndContinueToNextPage("Expected Income", "");
    }

    /*    
      
  * Add Income Sources 
  */

    enterIncomeDetails(index) {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;

        browser.pauseBrowser(constants.PAUSE_BROWSER_3000);
        if (global.updateDataJson.households[householdIndex].applicants[index].income.isGettingIncome == true) {
            browser.click(eval(locatorJson.incomeSources.rb_anyIncomeYes));
            browser.pauseBrowser(constants.PAUSE_BROWSER_3000);
            browser.click(eval(locatorJson.incomeSources.btn_addIncomeSource));
            browser.selectByVisibleText(eval(locatorJson.incomeSources.dd_selectIncomeSourcesType), global.updateDataJson.households[householdIndex].applicants[index].income.sourceOfIncome)
            browser.setValueInTextField(eval(locatorJson.incomeSources.tb_nameOfStateOrEmployer), global.updateDataJson.households[householdIndex].applicants[index].income.nameOfEmployer)
            browser.setValueInTextField(eval(locatorJson.incomeSources.tb_amount), global.updateDataJson.households[householdIndex].applicants[index].income.amount)
            browser.selectByVisibleText(eval(locatorJson.incomeSources.sb_howOften), global.updateDataJson.households[householdIndex].applicants[index].income.frequency)
            browser.click(eval(locatorJson.incomeSources.btn_saveOnIncomeType));
        } else {
            browser.click(eval(locatorJson.incomeSources.rb_anyIncomeNo));
        }
        browser.pauseBrowser(constants.PAUSE_BROWSER_3000);
    }

    /*
  *  Income Sources Verification
  */

    verifyIncomeDetails(index) {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;

        browser.pauseBrowser(constants.PAUSE_BROWSER_3000);
        if (global.updateDataJson.households[householdIndex].applicants[index].income.isGettingIncome == true) {
            let incomeType = browser.getText(eval(locatorJson.incomeSourcesVerification.td_incomeType));
            expect(incomeType).to.equal(global.updateDataJson.households[householdIndex].applicants[index].income.sourceOfIncome, "Income Type Verification")

            //read income amount from UI
            let amount = browser.getText(eval(locatorJson.incomeSourcesVerification.td_amount));

            //format income amount from Json
            let formattedAmntJson = formatter.format(global.updateDataJson.households[householdIndex].applicants[index].income.amount);
            expect(amount).to.equal(formattedAmntJson, "Income Amount Verification");

            let frequency = browser.getText(eval(locatorJson.incomeSourcesVerification.td_frequency));
            expect(frequency).to.equal(global.updateDataJson.households[householdIndex].applicants[index].income.frequency, "Income Frequency Verification");
        }
        browser.pauseBrowser(constants.PAUSE_BROWSER_3000);
    }

    /* 
    *Deduction Sources
    */
    selectDeductionSourcesInfo(index) {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        browser.pauseBrowser(constants.INTERVAL);
        if (global.updateDataJson.households[householdIndex].applicants[index].income.payingDeductions.toUpperCase() == "NO") {
            browser.click(eval(locatorJson.deductionSources.rb_anyDeductionNo));
        } else {
            browser.click(eval(locatorJson.deductionSources.rb_anyDeductionYes));
            //add dedudctable
        }

    }
    /*
    Expected Income
    */
    selectExpectedIncomeInfo(index) {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        browser.pauseBrowser(constants.INTERVAL);
        browser.waitForElementToDisplay(eval(locatorJson.expectedIncome.rb_isExpectIncomeYes));
        if (global.updateDataJson.households[householdIndex].applicants[index].income.expectedIncomeInNextYear.expectingSameIncome.toUpperCase() == "YES") {
            browser.click(eval(locatorJson.expectedIncome.rb_isExpectIncomeYes));
        } else {
            browser.click(eval(locatorJson.expectedIncome.rb_isExpectIncomeNo));
            this.expectedIncome(index);
        }
    }
    expectedIncome(index) {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        if (global.updateDataJson.households[householdIndex].applicants[index].income.expectedIncomeInNextYear.unknownIncome == true) {
            browser.click(eval(locatorJson.expectedIncome.lbl_unknownIncome));
            browser.setValueInTextField(eval(locatorJson.incomeSources.tb_enterExpectedIncome), global.updateDataJson.households[householdIndex].applicants[index].income.expectedIncomeInYear.totalExpectedYearlyAmount)

        } else {
            browser.setValueInTextField(eval(locatorJson.incomeSources.tb_enterExpectedIncome), global.updateDataJson.households[householdIndex].applicants[index].income.expectedIncomeInYear.totalExpectedYearlyAmount);
        }
    }

    fillExpectedIncomeInfoAndContinue(index) {
        this.selectExpectedIncomeInfo(index)
        commomfunc.clickSaveAndContinueToNextPage("Summary", "");
    }
    continueToSummaryPage() {
        commomfunc.clickSaveAndContinueToNextPage("Income Summary", "");
    }
    continueToMemberIncomeSummaryPage() {
        commomfunc.clickSaveAndContinueToNextPage("Summary", "");
    }

    enterIncomeInformation() {
        browser.pauseBrowser(constants.INTERVAL);
        this.continueIncomeSourcePage();
        this.enterIncomeDetails(0)
        //this.fillIncomeDetails(0);

        this.continueToDeductionSourcesPage();
        this.selectDeductionSourcesInfo(0);
        //this.fillDeductionSourcesInfoAndContinue(0);

        this.continueToExpectedIncomePage();
        this.selectExpectedIncomeInfo(0);
        this.continueToMemberIncomeSummaryPage();
        //this.fillExpectedIncomeInfoAndContinue(0);
        this.continueToSummaryPage();
    }

    //Below functions are deprecated.
    /*
    //deprecated below function. replace with this function -->enterIncomeDetails()
    fillIncomeDetails(index){ 
        this.continueIncomeSourcePage();
          this.enterIncomeDetails(index)
          commomfunc.clickSaveAndContinueToNextPage("Deduction Sources","");
             
      }
     //deprecated below function. replace with this function -->selectDeductionSourcesInfo()
     fillDeductionSourcesInfoAndContinue(index){
        this.selectDeductionSourcesInfo(index)
        commomfunc.clickSaveAndContinueToNextPage("Expected Income","");
    }
 //deprecated below function. replace with this function -->selectExpectedIncomeInfo()
     fillExpectedIncomeInfoAndContinue(index) {
        this.selectExpectedIncomeInfo(index)
        commomfunc.clickSaveAndContinueToNextPage("Summary", "");
    }
    */
}

module.exports = new IncomeInformationPage();

const prop = require('../../common.utils/PropertyReader');
var state = prop.getEnvName();
var moment = require('moment');
const  locatorJson =  require('../../../resources/selectors/common/SSAP/ReviewAndSignObject.json');
const  stateLocatorFile = require('../../../resources/selectors/exchange/'+state+'/SSAP/ReviewAndSignObject.json');
const  commonSsapJson =  require('../../../resources/selectors/common/SSAP/CommonObject.json');
const dashboardQueriesModel=require('../MemberPortal/DashBoardDatabaseQueries.js');

const browser = require('../../base/Browser.js');
const { pauseBrowser } = require('../../base/Browser.js');
const commomfunc = require('../SSAP/CommonSSAPFunction')
const global = require('../Global_include');
const JsonUtil = require('../../common.utils/JsonUtil');
const constants = require('../../common.utils/Constants');
const logger=require('../../common.utils/LoggerUtil');


class ReviewAndSignPage {

    continueToFinalReviewPage() {
        commomfunc.clickSaveAndContinueToNextPage("Final Review", "");
    }

    continueToSignAndSubmit() {
        commomfunc.clickSaveAndContinueToNextPage("Sign and Submit", "");

    }

    clickContinue() {
        pauseBrowser(2000);
        browser.doubleClick(eval(commonSsapJson.btn_continue));
    }

    agreeToTerms() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        pauseBrowser(constants.PAUSE_BROWSER_2000);
        var fullName = global.updateDataJson.households[householdIndex].applicants[0].firstName + " " + global.updateDataJson.households[householdIndex].applicants[0].lastName
        
            if (state.toUpperCase() == 'ID') {
                browser.click(eval(stateLocatorFile.signAndSubmit.cb_noIncarceration));
                browser.click(eval(stateLocatorFile.signAndSubmit.cb_agreeToUseIncomeData));
                browser.click(eval(stateLocatorFile.signAndSubmit.cb_acknowledgeoutsideparent));
                browser.click(eval(stateLocatorFile.signAndSubmit.cb_isReadyToReportForChanges));
                browser.click(eval(stateLocatorFile.signAndSubmit.cb_isTruthful));
                browser.setValueInTextField(eval(stateLocatorFile.signAndSubmit.tb_signature), fullName);

            }else {
                //var dataJson = jsonUtil.readJson('/resources/data/ssap.json')
                browser.waitForElementToDisplay(eval(locatorJson.signAndSubmit.cb_noIncarceration));
                browser.click(eval(locatorJson.signAndSubmit.cb_noIncarceration));
                browser.click(eval(locatorJson.signAndSubmit.cb_isReadyToReportForChanges));
                browser.click(eval(locatorJson.signAndSubmit.cb_isTruthful));
                browser.setValueInTextField(eval(locatorJson.signAndSubmit.tb_signature), fullName);
                browser.click(eval(locatorJson.signAndSubmit.cb_agreeToUseIncomeData));
                if (global.updateDataJson.households[householdIndex].financial) {
                    browser.click(eval(locatorJson.signAndSubmit.cb_agreeToEndCoverage));
                    browser.click(eval(locatorJson.signAndSubmit.cb_agreeToCooperateMedicaid));
                    if (state.toUpperCase() == 'PA') {
                        // if (global.updateDataJson.households[householdIndex].financial) {
                             browser.click(eval(locatorJson.signAndSubmit.cb_agreeToMoneyPersual));
                             browser.click(eval(locatorJson.signAndSubmit.cb_medicaidConsent));
                             browser.click(eval(locatorJson.signAndSubmit.cb_penaltyPerjury));
                        // }
                         
     
                     }
                } 
                if (state.toUpperCase() != 'PA') {
                    browser.click(eval(locatorJson.signAndSubmit.cb_acknowledgeOutsideParent));
                }
                if (state.toUpperCase() == 'NJ') {
                    browser.click(eval(locatorJson.signAndSubmit.cb_claimNoticeDMAHSAcknowledgment));
                }
                //else if (state.toUpperCase() == 'PA') {
                   // if (global.updateDataJson.households[householdIndex].financial) {
                     //   browser.click(eval(locatorJson.signAndSubmit.cb_agreeToMoneyPersual));
                     //   browser.click(eval(locatorJson.signAndSubmit.cb_medicaidConsent));
                      //  browser.click(eval(locatorJson.signAndSubmit.cb_penaltyPerjury));
                   // }
              //  }
            }

    }
    submitApplication() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        var headerText = "Welcome, " + global.updateDataJson.households[householdIndex].applicants[0].firstName + " " + global.updateDataJson.households[householdIndex].applicants[0].lastName
        if (state.toUpperCase() == 'ID') {
            browser.click(eval(stateLocatorFile.signAndSubmit.btn_submitApplication));
           // this.qualifyingEventDetails(global.updateDataJson.households[householdIndex].qualifyingEvent);
            browser.waitForPageToLoad(eval(commonSsapJson.header), headerText);
        } else {
            browser.click(eval(locatorJson.btn_continue));
            // commomfunc.clickSaveAndContinueToNextPage(headerText,"");
        }
        global.updateDataJson.households[householdIndex] = JsonUtil.updateApplicationStatus(global.updateDataJson.households[householdIndex], constants.APPLICATION_STATUS.SUBMITTED);
         //Upate Global Data Json with CaseNumber after application is submitted
         dashboardQueriesModel.updateGlobalDataJsonWithCaseNumber();  
        if (global.updateDataJson.households[householdIndex].applicationType.toUpperCase() === "OEP") {
            global.updateDataJson.households[householdIndex].nextStepButton = "SHOP FOR PLANS"
        } else {
            global.updateDataJson.households[householdIndex].nextStepButton = "CONFIRM EVENT AND SHOP"
        }
    }
    qualifyingEventDetails(lifeEvent) {
        let cuurentdate = moment().format('L');
        console.log("current Date: " + cuurentdate);
        console.log("Life Event: " + lifeEvent);
        browser.selectByVisibleText(eval(stateLocatorFile.signAndSubmit.sb_sepEvent), lifeEvent);
        browser.setValueInTextField(eval(stateLocatorFile.signAndSubmit.tb_sepEventDate), cuurentdate);
        if (state.toUpperCase() == 'NV') {
            browser.click(eval(stateLocatorFile.signAndSubmit.cb_terms));
            browser.click(eval(stateLocatorFile.signAndSubmit.btn_submitApplicationFinal));
            browser.click(eval(stateLocatorFile.signAndSubmit.btn_confirmEvent));
        } else {
            browser.click(eval(stateLocatorFile.signAndSubmit.btn_submitApplicationFinal));
        }

    }



    reviewAndSign() {
        this.continueToFinalReviewPage();
        pauseBrowser(2000);
        this.continueToSignAndSubmit();
        pauseBrowser(2000);
        this.agreeToTerms();
    }
}

module.exports = new ReviewAndSignPage();

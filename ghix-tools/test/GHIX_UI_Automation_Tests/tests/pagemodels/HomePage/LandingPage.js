const locatorJson = require('../../../resources/selectors/common/HomePage/LandingPageObject.json');
const browser = require('../../base/Browser.js');
const jsonUtil = require('../../common.utils/JsonUtil');
const assert = require('../../base/Assert.js');
const state = stateProfile;
const stateContent = require('../../../resources/content/exchange/' + state + '/HomePage/LandingPage.content.js')
const stateLoc = require('../../../resources/selectors/exchange/' + state + '/HomePage/LandingPageObject.json');
const stateContentPreEligibility = require('../../../resources/content/exchange/' + state + '/Anonymous/PreEligibilityPage.content.js')
const stateLocPreEligibility = require('../../../resources/selectors/exchange/' + state + '/Anonymous/PreEligibilityPageObject.json');
const locatorPreEligibility = require('../../../resources/selectors/common/Anonymous/PreEligibilityPageObject.json');
const dashboardQueriesModel=require('../MemberPortal/DashBoardDatabaseQueries.js');
const global = require('../Global_include');
const DbHelper = require('../../common.utils/DbHelper');
const logger=require('../../common.utils/LoggerUtil');


const commonConfig = require('../../common.utils/CommonConfig.js');



class LandingPage {

    verifyLandingPage() {
        logger.log("***** The Header of Landing Page : " + eval(locatorJson.pageHeader).getText() + " *****");
        assert.assertElementContainsText(eval(locatorJson.pageHeader), stateContent.landingPageHeader);
    }

    clickOnStartShopping() {
        browser.click(eval(stateLoc.btn_skipShopping));
        if (state.toUpperCase() == 'PA') {
            browser.waitForPageToLoad(eval(stateLocPreEligibility.continueSectionHeader), stateContentPreEligibility.preEligibilityContinueSectionHeader)
        }
        else {
            browser.waitForPageToLoadAndCheckPartialHeaderText(eval(locatorPreEligibility.pageHeader), stateContentPreEligibility.preEligibilityHeader);
        }
    }

    clicklogIn() {

        logger.log("***** Landing Page login *****");
        if (state.toUpperCase() == 'CA') {
            browser.waitForElementToDisplay(eval(stateLoc.lk_login));
            browser.click(eval(stateLoc.lk_login));
        }else{
            browser.waitForElementToDisplay(eval(locatorJson.lk_login));
            browser.click(eval(locatorJson.lk_login));
        }
    }

    navigateToUrl() {
        browser.navigateToUrl();
       // browser.waitForPageToLoadAndCheckPartialHeaderText(locatorJson.pageHeader,stateContent.landingPageHeader);
        this.verifyLandingPage();
    }

    clickOnEnrollmentEntities() {
        logger.log("*****Clicked Enrollment Entities Link*****");
        browser.click(eval(locatorJson.lk_enrollmentEntities));
    }

/**
 * Author: Sophia
 * Click broker link in footer
 */
    clickAgentBrokerLink() {

        browser.click(eval(locatorJson.lk_agentBroker));
        logger.log("***** Clicked On Agent/Broker Link In Footer *****");
        //moved to the beginning of next page
        // browser.waitForPageToLoadAndCheckPartialHeaderText(eval(agentLoc.pageHeader),agentSignUpContent.signupPageHeader);
      }
  
    /* Author: Monica 
    Reason it was added here is because the current method to update server date is nested within createIndividual() function 
    which cannot be used for MN
    This function will update the global data json with application type(OEP/QEP) and server date
    */
    async updateGlobalDataJsonWithAppTypeAndServerDate()
    {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        console.log('***** Updating Global DataJson With Application Type, CaseNumber, ServerDate & Coverage Date *****')
        global.updateDataJson.households[householdIndex]=commonConfig.getApplicationConfig(global.updateDataJson.households[householdIndex])
        dashboardQueriesModel.updateGlobalDataJsonWithCaseNumber();      
        global.updateDataJson.households[householdIndex].applicationYear=year;
     
    }

    clickAgencyLink() {
        if (locatorJson.agencyLink.selectors[state.toUpperCase()]) {
            browser.click(eval(locatorJson.agencyLink.selectors[state.toUpperCase()]));
        } else {
            browser.click(eval(locatorJson.agencyLink.selectors.common));
        }
    }
            
  

}

//export default new HomePage();
module.exports = new LandingPage();

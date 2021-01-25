const locator = require('../../../resources/selectors/common/PlanDisplay/ConfirmationPage.json');
const dashBoardPageLocator = require('../../../resources/selectors/common/MemberPortal/DashBoardObject.json');
const browser = require('../../base/Browser.js');
const constants = require('../../common.utils/Constants');
const state=stateProfile;
const dashBoardPageLocatorState = require('../../../resources/selectors/exchange/'+state+'/MemberPortal/DashBoardObject.json');
const logger=require('../../common.utils/LoggerUtil');


class ConfirmationPage {


    goToDashBoard(){
         browser.click(eval(locator.btn_goToDashBoard));
         if(state.toUpperCase()=='PA'){
         browser.waitForElementToDisplay(eval(dashBoardPageLocatorState.hd_nextSteps));
         }else{
           browser.pauseBrowser(constants.PAUSE_BROWSER_5000)
           browser.waitForElementToDisplay(eval(dashBoardPageLocator.hd_nextSteps));
         }
         
         logger.log("***** DashBoard Page: Enrollment Is Success *****");
        
    }


}

module.exports = new ConfirmationPage();

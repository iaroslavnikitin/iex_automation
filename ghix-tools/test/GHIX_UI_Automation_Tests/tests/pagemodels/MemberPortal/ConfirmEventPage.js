const browser = require('../../base/Browser');
const  global = require('../Global_include'); 
const assert = require('../../base/Assert');
const { pauseBrowser } = require('../../base/Browser');
const  confirmEventLocator = require('../../../resources/selectors/common/MemberPortal/ConfirmEventPage.object.json');
const  dashboardLocator = require('../../../resources/selectors/common/MemberPortal/DashBoardObject.json');
const  dashboardContent = require('../../../resources/content/common/MemberPortal/DashboardPage.content.js');
const  confirmEventContent = require('../../../resources/content/common/MemberPortal/ConfirmEventPage.content.js');
const  commonDateFunc = require('../../../tests/common.utils/CommonDateFunction.js');
const commonConfig = require('../../common.utils/CommonConfig');

var applicationYear = year;

class ConfirmEventPage{

    /* Author: Monica Thaneer 
    * This function will set event.
    * @param {String} : eventName
    */ 
    selectEvent(eventName){
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        console.log("***** Selecting Event "+eventName+" ********")
        global.updateDataJson.households[householdIndex].eventName = eventName.toString()
        console.log("**********eventtt**="+global.updateDataJson.households[householdIndex].applicants[0].firstName);
        browser.selectByVisibleText(eval(confirmEventLocator.sb_qualifyingEvent),global.updateDataJson.households[householdIndex].eventName);    
    }
 
    /* Author: Monica Thaneer
    * This function will set event date in MM/DD/YYYY format. Takes days as input calculates event date to server date minus the days given.
    * @param {Integer} : eventDays
    */   
    selectEventDate(eventDays){
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        console.log("***** Selecting Event Date to less than "+eventDays+" ********")
        let eventDate= commonDateFunc.getPreviousDate(eventDays,"MM/DD/YYYY")
        global.updateDataJson.households[householdIndex].eventDate = eventDate.toString()
        browser.setValueInTextField(eval(confirmEventLocator.tb_qualifyingEventDate),global.updateDataJson.households[householdIndex].eventDate);
        console.log("***** Event Date set to "+global.updateDataJson.households[householdIndex].eventDate+" ********")    
    }

    /* Author: Monica Thaneer
    * This function will set event and event date.
    * @param {String} : eventName
    * @param {Integer} : eventDays
    */ 
    eventAndDateSelection(eventName,eventDays){
         this.selectEvent(eventName)
         this.selectEventDate(eventDays)
    }

    acceptTermsClickContinueAndConfirmPopup()
    {    this.clickTermsCheckBox()
         this.clickContinueOnEventPage()
         this.clickConfirmOnPopUp()
    }

    /* Author: Monica Thaneer*/
    clickContinueOnEventPage()
    {   
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        console.log("***** Continue On Event Selection Page And Verify Pop Up ********")
        browser.click(eval(confirmEventLocator.btn_continue));
        //replaces event name and event date in content and then verifies content
        browser.waitForPageToLoad(eval(confirmEventLocator.confirmEventPopup.txt_confirmMessage),confirmEventContent.confirmEventPopupMessage.replace("EVENT_DATE",global.updateDataJson.households[householdIndex].eventDate).replace("EVENT_NAME",global.updateDataJson.households[householdIndex].eventName));
    }
    /* Author: Monica Thaneer*/
    clickTermsCheckBox()
    {   console.log("***** Accept Terms On Event Selection Page ********")
        browser.click(eval(confirmEventLocator.cb_acceptTerms));

    }
   /* Author: Monica Thaneer*/
    clickConfirmOnPopUp()
    {   let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        console.log("***** Click Confirm on Popup And Verify Dashboard Landing********")
        browser.click(eval(confirmEventLocator.confirmEventPopup.btn_confirm));
        let memberFullName= global.updateDataJson.households[householdIndex].applicants[0].firstName + " " +global.updateDataJson.households[householdIndex].applicants[0].lastName; //"Kylie Tandy"
        browser.waitForPageToLoadAndCheckPartialHeaderText(eval(dashboardLocator.welcomeDashboardHeading), dashboardContent.dashBoardHeader+memberFullName);
        //updating further action button in ssap json after confirm event
        let isGatedFlag= this.checkIfEventIsGated();
        if(isGatedFlag=="Y")
        {
         global.updateDataJson.households[householdIndex].nextStepButton ="UPLOAD DOCUMENTS"
        }
    }

    /* Author: Monica
Checks if application is in QEP then checkes if the selected event is gated
*/
checkIfEventIsGated(){
    let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
    let isGatedFlag= null;
    if(global.updateDataJson.households[householdIndex].applicationType=="QEP"){
        commonConfig.checkIfEventIsGated( global.updateDataJson.households[householdIndex].caseNumber, 
            global.updateDataJson.households[householdIndex].applicationType, global.updateDataJson.households[householdIndex].isFinancial).then(is_gated => {isGatedFlag=is_gated;});
            browser.waitUntil(() => isGatedFlag !== null);
            console.log("***** IS EVENT GATED = "+isGatedFlag+" ****")
        }
        return isGatedFlag
}

}
module.exports = new ConfirmEventPage();


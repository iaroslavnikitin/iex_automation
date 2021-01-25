/*
* Additional Information Needed Page
* https://mn2auto.eng.vimo.com/hix/indportal#/additionalinfo?caseNumber=<caseNumber>
*/
const browser = require('../../base/Browser');
const  global = require('../Global_include'); 
const assert = require('../../base/Assert');
const { pauseBrowser } = require('../../base/Browser');
const prop = require('../../common.utils/PropertyReader');
var state= prop.getEnvName()

const  locator = require('../../../resources/selectors/common/MemberPortal/AdditionalInformationPage.object.json');
const  customGroupingLocator = require('../../../resources/selectors/common/MemberPortal/CustomGroupingPage.object.json');
const  customGroupingContent = require('../../../resources/content/exchange/'+state+'/MemberPortal/CustomGroupingPage.content.js');
const  stateLocatorFile = require('../../../resources/selectors/exchange/'+state+'/MemberPortal/AdditionalInformationPage.object.json');
const  additionalInformationContent = require('../../../resources/content/common/MemberPortal/AdditionalInformationPage.content.js');

class AdditionalInformationPage{

    clickContinue()
    {
        console.log("***** Clicking Continue On Additional Information Page *****");
        browser.click(eval(locator.lk_continueOrSaveAndContinue));
        browser.waitForPageToLoadAndCheckPartialHeaderText(eval(customGroupingLocator.txt_shoppingFor),customGroupingContent.shoppingForHeader);

    }

    selectTobaccoforUsers(){
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        console.log("***** Selecting tobaco for Users On Additional Information Page *****");
        var dataJson = global.updateDataJson.households[householdIndex]
       for (let index = 0; index < dataJson.applicants.length; index++) {
           if(dataJson.applicants[index].relation == 'SELF'){
            var user = dataJson.applicants[index].firstName +" "+dataJson.applicants[index].lastName;
            if(dataJson.applicants[index].tobaccoUse == 'yes'){
                console.log("user name --"+user);
                console.log("locator --"+locator.rb_tobaccoUserno.replace("tUser",user));
                browser.click(eval(locator.rb_tobaccoUserno.replace("tUser",user)));
            }
            if(dataJson.applicants[index].tobaccoUse == 'no'){
                console.log("user name --"+user);
                console.log("locator --"+locator.rb_tobaccoUserNo.replace("tUser",user));
                browser.click(eval(locator.rb_tobaccoUserNo.replace("tUser",user)));
            }else{
                console.log("Failed to select tobocco user. Since, Json does not have tobaccouse fields")
            }		 														
           }
        }
    }
    

}

module.exports = new AdditionalInformationPage();
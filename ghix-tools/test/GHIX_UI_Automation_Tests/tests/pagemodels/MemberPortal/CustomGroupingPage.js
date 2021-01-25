/* Custom Grouping Page
* /hix/indportal#/customGrouping?caseNumber=<caseNumber>
*/
const browser = require('../../base/Browser');
const global = require('../Global_include');
const assert = require('../../base/Assert');
const { pauseBrowser } = require('../../base/Browser');
const prop = require('../../common.utils/PropertyReader');
var state = prop.getEnvName()
const locator = require('../../../resources/selectors/common/MemberPortal/CustomGroupingPage.object.json');
const customGroupingContent = require('../../../resources/content/common/MemberPortal/CustomGroupingPage.content.js');
const preferencesModel = require('../PlanDisplay/PreferencesPage.js');
const logger = require('../../common.utils/LoggerUtil');
const constants = require('../../common.utils/Constants');
const jsonUtil = require('../../common.utils/JsonUtil');

const preferences = require('../../pagemodels/PlanDisplay/PreferencesPage.js');
const healthPlan = require('../../pagemodels/PlanDisplay/HealthPlanDisplayPage.js');
const showCart = require('../../pagemodels/PlanDisplay/ShowCartPage');
const esignature = require('../../pagemodels/PlanDisplay/ESignaturePage');
const confirmation = require('../../pagemodels/PlanDisplay/ConfirmationPage');
const dashboard = require('../../pagemodels/MemberPortal/DashBoardPage');




class CustomGroupingPage{

    /* Monica Thaneer
    *This function clicks on Shop for Health Plans
     */
    clickShopHealthPlansOnCustomGrouping(){
        console.log("***** Clicking Shop For Health Plans On Custom Grouping Page*****")
        browser.click(eval(locator.lk_shopForHealth));
        preferencesModel.waitForPreferencesPageLoad();


    }
    selectCustomGroup() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        //var filePath = require('../../../resources/data/entityFlowCopy.json');
       // global.updateDataJson.households[householdIndex] = filePath;
        logger.log("*****Custom Grouping*****")
        let grouping = global.updateDataJson.households[householdIndex].grouping
        if (grouping.length > 0) {
            console.log(" grouing data ", grouping)
           for (let i = 0; i < grouping.length; i++) {
                console.log("*****Member Group Details : ", grouping[i]);
                this.selectCustomGroupingMembers(grouping[i]);
                logger.log("*****Click Shop Health Plans On Custom Grouping*****");
                this.clickShopHealthPlansOnCustomGrouping();
                logger.log("*****Click Skip To View Plans On Custom Grouping*****");
                preferences.clickSkipToViewPlans();
                logger.log("*****Verify HealthPlan Page*****");
                healthPlan.verifyPlanMembers(grouping[i]);
                logger.log("*****Add Random HealthPlan*****");
                healthPlan.addRandomHealthPlan(grouping[i]);
                logger.log("*****Continue To CartPage*****");
                healthPlan.continueToCartPage();
                logger.log("*****Click Sign Appication*****");
                showCart.clickSignApplication();
                logger.log("*****Click Ready To Enroll*****");
                showCart.clickReadyToEnroll();
                logger.log("*****Agree To TermsAndSign*****");
                esignature.agreeToTermsAndSign();
                logger.log("*****Go To DashBoard*****");
                confirmation.goToDashBoard();
                logger.log("*****Verify Dashboard Content*****");
                dashboard.verifyDashboardContent(grouping[i]);
                logger.log("*****Click Shop For Plans*****");
                if(i!=grouping.length-1){
                dashboard.clickShopPlansOnDashboard();
               // if(i==0){
                 //   console.log("inside loop: ", i)
                  //  dashboard.clickSaveAndContinue();
               // }
                }
            }
        }else{
            logger.log("*****Custom Grouping is Not defined In Test Data, Redirecting To DashBoard*****");
            browser.click(eval(locator.lk_goToDashboard));
        }
    }
    selectCustomGroupingMembers(group) {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        logger.log("*****Select Members For Custom Grouping*****")
        let applicants = global.updateDataJson.households[householdIndex].applicants;
        eval(locator.shopForHealthPlans.cb_allmembers).map(function (element) {
            browser.unSelectCheckBox(element);
        });
        group.members.forEach(memberIndex => {
            console.log("*****Member Index: ", memberIndex)
            console.log("*****Member FullName: ", applicants[memberIndex].firstName)
           browser.selectCheckBox(eval(locator.shopForHealthPlans.cb_memberName.replace("MEMBER_NAME_REPLACE", applicants[memberIndex].firstName)));
            
        });
    }

    clickShopHealthPlans() {
     
        logger.log("***Clicking Shop Health Plans***");
        browser.click(eval(locator.shopForHealthPlans.btn_shopForHealthPlans));
        browser.waitForPageToLoad(eval(locator.welcomeDashboardHeading), "Tell us about your healthcare needs");
    }
    clickShopDentalPlans() {
        logger.log("***Clicking Shop Dental Plans***");
        browser.click(eval(locator.tabs.lk_tab_dentalPlans));
        browser.pauseBrowser(constants.PAUSE_BROWSER_3000);
        if(eval(locator.switchToDentalBeforeHealthPopup.btn_startDentalShopping).isDisplayed()){
            browser.click(eval(locator.switchToDentalBeforeHealthPopup.btn_startDentalShopping));
        }
        browser.click(eval(locator.shopForDentalPlans.btn_shopForDentalPlans));
       }


}

module.exports = new CustomGroupingPage();
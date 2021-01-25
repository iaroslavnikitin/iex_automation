const state=stateProfile;

const constants = require('../../common.utils/Constants');

const commonLoc = require('../../../resources/selectors/common/PlanDisplay/CommonPlanDisplayObject.json');
const healthDetailsContentState = require('../../../resources/content/exchange/'+state+'/PlanDisplay/HealthPlanDetailsPage.content');
const healthDetailsContent = require('../../../resources/content/common/PlanDisplay/HealthPlanDetailsPage.content');

const browser = require('../../base/Browser.js');

class HealthPlanDetailsPage {
    waitForHealthPlansPageToLoad() {
        if(state.toUpperCase() ==constants.STATE_CA)
            browser.waitForPageToLoad(eval(commonLoc.planDetailsPage.backToAllPlansLink), healthDetailsContentState.backToPlans);
         else
            browser.waitForPageToLoad(eval(commonLoc.planDetailsPage.backToAllPlansLink), healthDetailsContent.backToPlans);

    }  
}


module.exports = new HealthPlanDetailsPage();

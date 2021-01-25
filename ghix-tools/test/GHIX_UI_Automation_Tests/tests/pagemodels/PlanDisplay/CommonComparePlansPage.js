
const commonLoc = require('../../../resources/selectors/common/PlanDisplay/CommonPlanDisplayObject.json');
const commonPlanDisplayContent = require('../../../resources/content/common/PlanDisplay/CommonPlanDisplayPage.content');

const browser = require('../../base/Browser.js');

class CommonComparePlansPage {
    //To go back to Plan Display Page
    clickOnBackToPlansLink() {
            browser.scrollToViewAndClick(eval(commonLoc.comparePlansPage.backToAllPlansLink));
            browser.waitForPageToLoad(eval(commonLoc.backToPreferences), commonPlanDisplayContent.backToPreferences);

    }  
}


module.exports = new CommonComparePlansPage();

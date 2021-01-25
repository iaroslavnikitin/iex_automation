const locatorJson = require('../../../resources/selectors/common/PlanDisplay/ESignaturePageObjects.json');
const confirmationPageLocator = require('../../../resources/selectors/common/PlanDisplay/ConfirmationPage.json');
const prop = require('../../common.utils/PropertyReader');
const constants = require('../../common.utils/Constants');
const jsonUtil = require('../../common.utils/JsonUtil');
var state = prop.getEnvName();
const stateLocatorJson = require('../../../resources/selectors/exchange/' + state + '/PlanDisplay/ESignaturePageObjects.json');
const browser = require('../../base/Browser.js');
const assert = require('../../base/Assert.js');
const confirmationPageContent = require('../../../resources/content/common/PlanDisplay/ConfirmationPage.content');
const global = require('../Global_include');
const logger = require('../../common.utils/LoggerUtil');

class ESignaturePage {


    agreeToTermsAndSign() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        if (state.toUpperCase() == 'PA') {
            browser.click(eval(locatorJson.cb_taxFiler_agreement));
        }
        browser.click(eval(locatorJson.cb_marketPlaceAgreement));

       // if (state === constants.STATE_NV) {
       //     browser.click(eval(stateLocatorJson.cb_taxFiler_esign));
       // }
        //else 
        if (state != constants.STATE_ID) {
            browser.click(eval(locatorJson.cb_taxFiler_esign));
        }
        this.enterFullNameAndSign();
      global.updateDataJson.households[householdIndex] = jsonUtil.updateApplicationStatus(global.updateDataJson.households[householdIndex], constants.APPLICATION_STATUS.ENROLLED);
        let grouping = global.updateDataJson.households[householdIndex].grouping;
        let nonEnrolledGroup = grouping.filter(el => { return el.healthPlan == "" });
        if ((jsonUtil.isFieldEmpty(global.updateDataJson.households[householdIndex].healthPlan)&&grouping.length == 0) || (grouping.length > 0&&nonEnrolledGroup.length > 0) || jsonUtil.isFieldEmpty(global.updateDataJson.households[householdIndex].dentalPlan)) {
            global.updateDataJson.households[householdIndex].nextStepButton = "CONTINUE SHOPPING"
        } else {
            if (global.updateDataJson.households[householdIndex].applicationType.toUpperCase() === "OEP") {
                global.updateDataJson.households[householdIndex].nextStepButton = "CHANGE PLANS"
            } else {
                global.updateDataJson.households[householdIndex].nextStepButton = "FINALIZE"
            }

        }
    }
    enterFullNameAndSign()
    {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        var fullName = global.updateDataJson.households[householdIndex].applicants[0].firstName +" "+global.updateDataJson.households[householdIndex].applicants[0].lastName
        browser.setValueInTextField(eval(locatorJson.tb_applicant_esign),fullName);
        browser.click(eval(locatorJson.cb_submitButton));
        logger.log("***** The Header of Confirmation Page: " + eval(confirmationPageLocator.hd_confirmation).getText() + " *****");
        assert.assertElementContainsText(eval(confirmationPageLocator.hd_confirmation), confirmationPageContent.pageHeader);
    }


}

module.exports = new ESignaturePage();
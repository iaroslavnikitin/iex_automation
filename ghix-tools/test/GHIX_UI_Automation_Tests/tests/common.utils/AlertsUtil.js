const browser = require('../base/Browser.js');
const browserOOP=require('../base/Browser_OOPApproach')
const alertsJson=require('../../resources/selectors/Agency/Alerts.json');

class AlertsUtil 
{
    /**
     * 
     * Waits for alert to pop up an accepts the Address Not In Postal DB Alert
     * 
     * Author: Sophia Oganesyan
     * Last Updated By: Sophia Oganesyan
     */

    confirmAddressNotInPostalDBAlert()
    {   let stateSelector=browserOOP.getStateSelector(alertsJson.IncorrectAddressAlert.selectors);
        browser.waitForElementToDisplay(eval(stateSelector.box));
        if(eval(stateSelector.box).isDisplayed())
        eval(stateSelector.okButton).click();
        browser.waitForElementToBeInvisible(eval(stateSelector.box));

    }
    // acceptFileUploadSuccess()
    // {
    //     let stateSelector=browser.getStateSelector(alertsJson.fileUploadSuccess.selectors);
    //     if(eval(stateSelector.box).isDisplayed())
    //     eval(stateSelector.okButton).click();        

    // }

    /**
     * Accepts allert with box given in argument. Works with Sophia's implementation 
     * @param {Alert Page Object} alertObject 
     * 
     * Author: Sophia Oganesyan
     * Last Updated By: Sophia Oganesyan
     */

    acceptAllert(alertObject)   
    {   
        let stateSelector=browserOOP.getStateSelector(alertObject.selectors);
        browser.waitForElementToDisplay(eval(stateSelector.box));
        if(eval(stateSelector.box).isDisplayed())
        {
            eval(stateSelector.okButton).click();
        }
        browser.waitForElementToBeInvisible(eval(stateSelector.box));
    }
}

module.exports = new AlertsUtil();
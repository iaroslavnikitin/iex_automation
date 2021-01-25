const browser = require("../../base/Browser.js");
const assert = require("../../base/Assert.js");
const locatorJson = require("../../../resources/selectors/common/Agent/AgentPageObject.json");
const content = require("../../../resources/content/common/Agent/AgentSignupPage.content.js");
const  logger = require('../../common.utils/LoggerUtil');



class CommonAgentFunction {

  verifyAgentRegistrationPageHeader() {
    logger.log("***** The Header of Agent/Broker Registration Page: " + eval(locatorJson.pageHeader).getText() + " *****");
    assert.assertElementContainsText(eval(locatorJson.pageHeader), content.registrationPageHeader);
  }
  confirmAddress(){
    browser.pauseBrowser(3000);
    if(eval(locatorJson.btn_modalData).isDisplayed()){
        browser.switchToFrame(eval(locatorJson.btn_modalData));
        browser.click(eval(locatorJson.cb_addressCheck));
        browser.click(eval(locatorJson.btn_submitAddr));
    }
  }

}

module.exports = new CommonAgentFunction();

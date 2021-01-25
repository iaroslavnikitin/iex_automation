var locatorJson = require('../../../resources/selectors/common/Entity/EntityAccountSetUp.json');
var content = require('../../../resources/content/common/Entity/AccountSetup.content');
var global = require('../Global_include');
const assert = require('../../base/Assert');
const browser = require('../../base/Browser');
const prop = require('../../common.utils/PropertyReader');
var state = prop.getEnvName();
var stateContent = require('../../../resources/content/exchange/'+state+'/Entity/AccountSetup.content');
const logger=require('../../common.utils/LoggerUtil');


class SearchCounselor {

  clickFindLocalAssistance() {
    //browser.click(eval(locatorJson.lk_helpsupport));
   // browser.click(eval(locatorJson.lk_findLocalAssistance));
   
    if (state.toUpperCase() == 'PA') {
      browser.click(eval(locatorJson.lk_helpsupport2));
      browser.click(eval(locatorJson.lk_findLocalAssistance));
      browser.switchToFrame(eval(locatorJson.findLocalAssistancePopupiframe2));
      
    }
    else if (state.toUpperCase() == 'ID') {
      browser.click(eval(locatorJson.lk_helpsupport));
      browser.click(eval(locatorJson.lk_findLocalAssistance));
      browser.click(eval(locatorJson.lk_findCertAgent_id));
    } else {
      browser.click(eval(locatorJson.lk_helpsupport));
      browser.click(eval(locatorJson.lk_findLocalAssistance));
      browser.switchToFrame(eval(locatorJson.findLocalAssistancePopupiframe));
      
    }
    logger.log("*****Clicked On Find Local Assistance Link*****");
    browser.waitForPageToLoad(eval(locatorJson.hd_findLocalassistance),content.findLocalAssistance);

  }
  clickFindCertifiedCounselor() {
    browser.click(eval(locatorJson.lk_aid_findCertifiedCounselor));
    logger.log("*****Clicked On Find Certified Counselor Link*****");
    browser.waitForPageToLoad(eval(locatorJson.hd_searchForInprsonAssistance),stateContent.searchForInprsonAssistance);

  }
  searchForCertifiedCounselor() {
    let entityIndex = (global.updateDataJson.entities.length === 0) ? 0 : global.updateDataJson.entities.length-1;
    var dataJson = global.updateDataJson.entities[entityIndex];
    if (state.toUpperCase() == 'ID') {
      var windowHandles = browser.getWindowHandles();
      browser.switchToWindow(windowHandles[1]);
    }
    browser.setValueInTextField(eval(locatorJson.tb_entityName), dataJson.entityInformation.entityName)
    browser.click(eval(locatorJson.btn_submit2));
    logger.log("*****Searched For The Certified Counselor*****");
  }

  clickonConsumerName() {
    logger.log("*****Click clickonConsumerName");
    browser.click(eval(locatorJson.lk_aid_entityName));
    logger.log("*****Clicked On Consumer Name in Search Result*****");
  }
  clickonCounselorName() {
    let entityIndex = (global.updateDataJson.entities.length === 0) ? 0 : global.updateDataJson.entities.length-1;
    var dataJson = global.updateDataJson.entities[entityIndex];
    var locator = "$('a*=" + dataJson.certifiedEnrollmentCounselors.firstName + ' ' + dataJson.certifiedEnrollmentCounselors.lastName + "')";
    browser.click(eval(locator));
    logger.log("*****Clicked On Counselor Name in Search Result*****");
  }

  clickShowCertifiedEnrollmentCounselor() {
    if (eval(locatorJson.lk_showCertifiedEnrollmentCounselors).isDisplayed()) {
      browser.click(eval(locatorJson.lk_showCertifiedEnrollmentCounselors));
    }
    else browser.click(eval(locatorJson.lk_showAssisters));
    logger.log("*****Clicked Show Certified Enrollment Counselor*****");
  }
  verifyEntityDetails() {
    let entityIndex = (global.updateDataJson.entities.length === 0) ? 0 : global.updateDataJson.entities.length-1;
    var dataJson = global.updateDataJson.entities[entityIndex];
    var locator = "$('h1*=" + dataJson.entityInformation.entityName + "')";
    browser.waitForElementToDisplay(eval(locator))
    assert.assertElementIsVisible(eval(locator));
    logger.log("*****Verified Entity Details In Search Results*****");
  }
  verifyCounselorDetails() {
    let entityIndex = (global.updateDataJson.entities.length === 0) ? 0 : global.updateDataJson.entities.length-1;
    var dataJson = global.updateDataJson.entities[entityIndex];
    var locator = "$('h3*=" + dataJson.certifiedEnrollmentCounselors.firstName + ' ' + dataJson.certifiedEnrollmentCounselors.lastName + "')";
    browser.waitForElementToDisplay(eval(locator))
    assert.assertElementIsVisible(eval(locator));
    logger.log("*****Verified Counselor Details In Search Results*****");

  }

}

module.exports = new SearchCounselor();

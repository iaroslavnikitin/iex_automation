const prop = require('../../common.utils/PropertyReader');
var state = prop.getEnvName();
const browser = require('../../base/Browser');
const commomLocator = require('../../../resources/selectors/common/SSAP/CommonObject.json')
var stateLocatorFile=  require('../../../resources/selectors/exchange/'+state+'/SSAP/CommonObject.json');
const logger=require('../../common.utils/LoggerUtil');


class CommonSSAPFunction{


clickSaveAndContinueToNextPage(headerText, locator){
    logger.log("****click continue to "+headerText+" Page")
   if(locator===""){
        locator =eval(commomLocator.header)
    }
    if(state.toUpperCase()=='ID'){
        browser.pauseBrowser(1000);
        browser.waitForElementToDisplay(eval(stateLocatorFile.btn_saveAndContinue));
        browser.click(eval(stateLocatorFile.btn_saveAndContinue))
       
    }else{
        browser.pauseBrowser(1000);
        eval(commomLocator.btn_saveAndContinue).scrollIntoView();
        browser.waitForElementToDisplay(eval(commomLocator.btn_saveAndContinue));
        browser.click(eval(commomLocator.btn_saveAndContinue))
       
    }
    browser.waitForPageToLoadAndCheckPartialHeaderText(locator,headerText);
}

clickSaveAndContinueinPersonalInformationPage(){
    logger.log("****click continue to Personal information Page");
   
        browser.pauseBrowser(1000);
        browser.waitForElementToDisplay(eval(stateLocatorFile.btn_saveAndContinue));
        browser.click(eval(stateLocatorFile.btn_saveAndContinue));
    }

}
module.exports = new CommonSSAPFunction();
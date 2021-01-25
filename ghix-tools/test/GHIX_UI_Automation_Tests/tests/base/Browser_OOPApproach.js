const prop = require('../common.utils/PropertyReader');
const state = prop.getEnvName();
const random = require('../common.utils/RandomDataGenerator');
const constants = require('../common.utils/Constants');
const { time } = require('console');
const browser =require('../base/Browser');
const logger = require("../common.utils/LoggerUtil");
class Browser_OOPApproach
{

     /**
       * 
       *  Sets text value on the field (Works with Sophia's implementation)
       * @param {Page Element Object} pageElement 
       * @param {String} value 
       * 
       * Author: Sophia Oganesyan
       * Last Updated By: Sophia Oganesyan
       */
      setTextValue(pageElement,value)
      {   
          let elementSelector=this.getStateSelector(pageElement.selectors);
         {
          browser.waitForElementToDisplay(eval(elementSelector));
          eval(elementSelector).setValue(value);
         }
      }
    
      /**
       * Gets state locator (Works with Sophia's implementation). 
       * @param {Selectors property of Page Element Object} selectors 
       * 
       * Author: Sophia Oganesyan
       * Last Updated By: Sophia Oganesyan
       */
      getStateSelector(selectors)
      {
                if(selectors[state.toUpperCase()])
                    return selectors[state];
                else 
                    return selectors.common;
      }
      /**
       * Splits the phone number into parts and fills the phone number sections.
       * Works with Sophia's implementation.
       * 
       * @param {page Element Object} pageElement 
       * @param {String} value
       * 
       * Author: Sophia Oganesyan
       * Last Updated By: Sophia Oganesyan 
       */
  
      setPhoneNumberSplited(pageElement,value)
      {
              let phoneSelector=this.getStateSelector(pageElement.selectors);
              eval(phoneSelector[0]).setValue("408");
              eval(phoneSelector[1]).setValue(value.slice(3,6));
              eval(phoneSelector[2]).setValue(value.slice(6,value.length));
  
      }
      /**
       * Calcualtes number of options in a dropdown object and sets random dropdown option. 
       * Works with Sophia's implementation.
       * @param {Page Element Object} pageElement 
       * 
       * Author: Sophia Oganesyan
       * Last Updated By: Sophia Oganesyan
       */
      setRandomDropDownValue(pageElement)
      {
          let selector =this.getStateSelector(pageElement.selectors);
          let numberOfOptions=browser.getNumberOfDropDownOptions(selector);
          let randomOption=random.getRandomInt(1,numberOfOptions);
          eval(selector).selectByIndex(randomOption);
          return randomOption;
      }

      /**
     * Set CheckBox to True.  Works with Sophia's implementation.
     * @param {Page Element Object} pageObject 
     * 
     * Author: Sophia Oganesyan
     * Last Updated By: Sophia Oganesyan
     */
    setCheckBoxToTrue(pageObject)
    {
        let selector=this.getStateSelector(pageObject.selectors);
        if (!eval(selector).isSelected()) eval(selector).click();
    }

     /**
     * Set CheckBox to False.  Works with Sophia's implementation.
     * @param {Page Element Object} pageObject 
     * 
     * Author: Sophia Oganesyan
     * Last Updated By: Sophia Oganesyan
     */
    setCheckBoxToFalse(pageObject)
    {
      let selector=this.getStateSelector(pageObject.selectors);
      if (eval(selector).isSelected()) eval(selector).click();
    }
    
    /**
     * Sets Hours for Agency by option index. Works with Sophia's implementation.
     * @param {Page Element Object} pageElementObj 
     * @param {Object with values 'From' and 'To'} dataObj 
     * 
     * Author: Sophia Oganesyan
     * Last Updated By: Sophia Oganesyan
     */
    setHoursFromTo(pageElementObj,dataObj)
    {
      let hoursSelector=this.getStateSelector(pageElementObj.selectors);
      eval(hoursSelector.from).selectByIndex(dataObj.from);
      eval(hoursSelector.to).selectByIndex(dataObj.to);
    }

  /**
     * Sets Random Hours for Agency. Works with Sophia's implementation. Excludes Close Options.
     * @param {Page Element Object} pageElementObj 
     * 
     * Author: Sophia Oganesyan
     * Last Updated By: Sophia Oganesyan
     */
    setRandomHoursFromTo(pageElementObj)
    {   
         let hoursSelector=this.getStateSelector(pageElementObj.selectors);
         let hoursOfOperation={};
         hoursOfOperation.closed=random.getRandomInt(0,1) ? true : false;
         if(!hoursOfOperation.closed) 
         {  
          hoursOfOperation.from=random.getRandomInt(1,(browser.getNumberOfDropDownOptions(hoursSelector.from)-2)); //not including last option
          eval(hoursSelector.from).selectByIndex(hoursOfOperation.from)
          hoursOfOperation.to=random.getRandomInt(1,(browser.getNumberOfDropDownOptions(hoursSelector.to)-1)); 
          eval(hoursSelector.to).selectByIndex(hoursOfOperation.to);
      }
         else
         {
           let numberOfOptions= browser.getNumberOfDropDownOptions(hoursSelector.from)

           eval(hoursSelector.from).selectByAttribute('label','closed');
           eval(hoursSelector.to).selectByAttribute('label','closed');
         }
         return hoursOfOperation;

    }

    /**
       * Sets dropdown value. Works with Sophia's implementation.
       * @param {Page Element Object} pageElement 
       * @param {string or option index} value 
       * 
       * Author: Sophia Oganesyan
       * Last Updated By: Sophia Oganesyan
       */
      setDropDown(pageElement,value)
      {   
          let selector =this.getStateSelector(pageElement.selectors);
          if((typeof(value))=="string") this.selectByVisibleText(eval(selector),value)
          else if ((typeof(value))=="number") eval(selector).selectByIndex(value);
  
      }

       /**
       * Wait until Element is clickable and Click. Works with Sophia's implementation.
       * @param {Page Element Object} pageElementSelector 
       * 
       *  Author: Sophia Oganesyan
       * Last Updated By: Sophia Oganesyan
       */
      clickButton(pageElement)
      {
          let elementSelector = eval(this.getStateSelector(pageElement.selectors));
         // this.waitForElementToDisplay(elementSelector);
          this.waitUntilElementIsClickable(pageElement);
          elementSelector.click();
      }

      /**
       * Waits for Element to be displayed. Works with Sophia's implementation.
       * @param {Page Element Object} elementObj 
       * 
       * Author: Sophia Oganesyan
       * Last Updated By: Sophia Oganesyan
       */
      waitForElementToBeDiplayed(elementObj)//working
      {
          let elementSelector =eval(this.getStateSelector(elementObj.selectors));
          let errorMessage= "Element "+ elementObj.label + "is not displayed!";
          elementSelector.waitForDisplayed({timeout:constants.PAUSE_BROWSER_3000, timeoutMsg: errorMessage,interval:constants.PAUSE_BROWSER_500});
      }


      /**
       * Waits for Element to be clickable. Works with Sophia's implementation.
       * @param {Page Element Object} pageElement 
       * 
       * Author: Sophia Oganesyan
       * Last Updated By: Sophia Oganesyan
       */
      waitUntilElementIsClickable(pageElement)
      {  
          let elementSelector=eval(this.getStateSelector(pageElement.selectors));
          let errMessage ="Element "+pageElement.label+ " is not clickable after "+constants.PAUSE_BROWSER_6000 +" miliseconds";
          browser.waitUntil(()=> {
                              return elementSelector.isClickable();
                              }, {timeout: constants.PAUSE_BROWSER_6000, timeoutMsg: errMessage, interval:constants.PAUSE_BROWSER_500});
      }

      /**
       * Checks  Privacy Policy Checkbox and Clicks submit button on Account setup page. 
       * Works with Sophia's implementation.
       * @param {Page Element Object} pageObj 
       * 
       * Author: Sophia Oganesyan
       * Last Updated By: Sophia Oganesyan
       */
      acceptPrivacyPolicyAndSubmit(pageObj)
      {   
          //let selector = this.getStateSelector(pageObj.privacyPolicyTerms.selectors);
          if (state.toUpperCase() !== "CA") {
            this.clickButton(pageObj.privacyPolicyTerms);
          }
          //selector=this.getStateSelector(pageObj.submitButton.selectors);
          this.clickButton(pageObj.submitButton);
          logger.log("*****  Submitted Account Setup Details ***** ")
      }
}
module.exports = new Browser_OOPApproach();
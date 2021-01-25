const prop = require('../common.utils/PropertyReader');
const state = prop.getEnvName();
const random = require('../common.utils/RandomDataGenerator');
const constants = require('../common.utils/Constants');
const { time } = require('console');


class Browser {
    getUrl(fileName) {
        var Url = '';
        return Url;
    }

    /**
     * Author: Artem
     * This function will create anonumous URL using data from JSON
     */
    getAnonymousShoppingUrl(fileName){   
        let dob="";
        let url = "";

        for(let i=0;i<fileName.houseHold.applicants.length-1;i++)
            dob+=fileName.houseHold.applicants[i].dateOfBirth.split("/").join("")+',';        
        
        dob=dob+fileName.houseHold.applicants[fileName.houseHold.applicants.length-1].dateOfBirth.split("/").join("");
        url = url+'private/anonymous?zip='+fileName.CA_Zip+'&listdobs='+dob+'&aptc='+fileName.CA_aptc+'&statesubsidy='+fileName.CA_stateSubsidy+'&csr=CS5&county=06085&coveragestart='+fileName.CA_coverageDate.split("/").join("")+'';
        
        return url;
    }

    /**
     * Get Url 
	 * @param fileName
	 */
    navigateToUrl(fileName) {
        let Url = this.getUrl(fileName);
        this.navigateToGivenUrl(Url);
        //browser.url(Url);
        //console.log(browser.getUrl());
        //browser.maximizeWindow();
    }

    /**
     * Navigate to the Retrieved Url 
	 * @param URL
	 */
     navigateToGivenUrl(url) {
        console.log("Browser url test", url)
        browser.url(url);
        console.log(browser.getUrl());
        browser.maximizeWindow();
    }
    
	/**
     * Sets Value
	 * @param selector
	 * @param value
	 */
    setValueInTextField(element, value) {
        element.waitForDisplayed(constants.WAIT_FOR_DISPLAYED_5000);
        element.setValue(value);
    }

    /**
     * Set Text in Alert 
	 * @param {String} : text
	 */
    setAlertText(text)
    {
        browser.sendAlertText(text);
    }

    /**
     * Pause browser for a specified amount of time in milliseconds
	 * @param {Integer} : time
	 */
    pauseBrowser(time) {
        browser.pause(time);
    }
    /**
     * Wait until the given condition is satisfied 
     * Example :
	 * @param condition
	 */
    waitUntilPageSubmit(condition) {
        browser.waitUntil(condition, {
            timeout: constants.WAIT_UNTIL_320000,
            timeoutMsg: 'Expected condition is not satisfied after 4 minutes',
            interval: constants.INTERVAL
        })

    }
    /**
     * Wait until the given condition is satisfied 
     * Example :
	 * @param condition
	 */
    waitUntil(condition) {
        browser.waitUntil(condition, {
            timeout: constants.WAIT_UNTIL_10000,
            timeoutMsg: 'Expected condition is not satisfied after 10000 ms',
            interval: constants.INTERVAL
        })
    }

    /**
     * Wait for given timeout until given condition is satisfied
     * Example :
     * @param condition
     * @param timeout
     */
    waitConditionTimeout(condition, timeout) {
        browser.waitUntil(condition, {
            timeout: timeout,
            timeoutMsg: `Expected condition is not satisfied after ${timeout}} ms`,
            interval: constants.INTERVAL
        })
    }

    /**
     * Wait until the given element is Displayed
	 * @param element
	 */
    waitForElementToDisplay(element) {
        element.waitForDisplayed(constants.WAIT_FOR_DISPLAYED_8000);
    }
    /**
     * Wait until Element is Displayed and then Click that Element
	 * @param element
	 */
    waitForDisplayAndClick(element) {
        this.waitForElementToDisplay(element);
        element.click();

    }

    /**
     * Wait for the Page to Load and Verify Partial HeaderText with the Displayed Header 
	 * @param element
     * @param {String} : headerText
	 */

    waitForPageToLoadAndCheckPartialHeaderText(element, headerText) {
        browser.waitUntil(function () {
            const state = browser.execute(function () {
                return document.readyState;
              });
            if(state === 'complete')
            {
                let abc =element.getText().toUpperCase();
                return (element.getText().toUpperCase().includes(headerText.toUpperCase()));
            }
        }, 
        {
            timeout: constants.WAIT_UNTIL_10000,
            timeoutMsg: 'Header ' + headerText+' is not displayed after given time',
            interval: constants.INTERVAL
        }
        )
        console.log("***** Current Page Header: " + element.getText() + " *****");
    }
    
    /**
     * Wait for the Page to Load and Verify PageHeaderText with the text of element Passed as parameter
	 * @param element
     * @param {String} : pageHeader
	 */
    waitForPageToLoad(element, pageHeader) {
        
        browser.waitUntil(function () {
            const state = browser.execute(function () {
                return document.readyState;
              });
            if(state === 'complete'){
            return (element.getText().toUpperCase().trim() === pageHeader.toUpperCase());
            }   
        },
        {
            timeout: constants.WAIT_UNTIL_10000,
            timeoutMsg: 'Header "'+pageHeader+'" is not displayed after given time',
            interval: constants.INTERVAL
        })
        console.log("***** Current Page Header : " + element.getText() + " *****");
    }

        /**
     * Wait Url is verified with the Expected Text passed as the parameter 
     * @param {String} : expectedText
	 */
    waitForUrlContains(expectedText) {
        browser.waitUntil(function () {
            return (browser.getUrl().toUpperCase().includes(expectedText.toUpperCase()))
        },
            {
                timeout: constants.WAIT_UNTIL_10000,
                timeoutMsg: 'Url Does not contain expected text after 10s',
                interval: constants.INTERVAL
            }
        )
    }

    /**
     * Wait Until Element is Verified as not Visible
     * @param element
	 */
    waitTillElementNotVisible(element,waitUntilGivenTime) {
        browser.waitUntil(function () {
           let isDisplayed =element.isDisplayed();
            return (isDisplayed==false)
        },
        {
            timeout: waitUntilGivenTime,
            timeoutMsg: 'Element is not Invisible text after 10s',
            interval: constants.INTERVAL
        })

    }


	/**
     * Appends value to Value Attribute of the element passed as a parameter
	 * @param selector
	 * @param value
	 */

    addAndAppendValue(element, value) {
        element.addValue(value);
        this.pauseBrowser(constants.PAUSE_BROWSER_3000);
    }

    /**
     * Gets the Text of the element passed as parameter
	 * @param selector
	 */
    getText(element) {
        element.waitForDisplayed(constants.WAIT_FOR_DISPLAYED_5000);
        return element.getText();
    }

    /**
     * Retrieve the list of all window handles available to the session.
	 */
    getWindowHandles() {
        return browser.getWindowHandles();
    }

    /**
     * Retrieve the current window handle.
	 */
    getParentHandle() {
        return browser.getWindowHandle();
    }

    /**
     * Returns the attribute value of the element and attribute passed as parameters
	 * @param element
	 * @param attribute
	 */
    getAttributeValue(element, attribute) {
        console.log("AttributeValue :"+element.getAttribute(attribute));
        return element.getAttribute(attribute);
    }

    /**
     * Uploads a file to the Selenium Standalone server or other browser driver
	 * @param filePath
	 */
    getUploadFilePath(filePath) {
        console.log("FilePath :"+filePath);
        return browser.uploadFile(filePath);
    }

    /**
     * Returns the number of child elements for the given element passed as parameter
	 * @param element
	 */
    getNumberOfChildElements(selector) {
        console.log("*****Getting Number Of Child Elements")
        browser.pause(constants.PAUSE_BROWSER_3000)
        return browser.execute(elem => elem.children.length, selector)

    }
   
    /**
     * Wait until PageTitleText is verified with the Page Title from Page and return the Page Title
     * @param {String} : pageTitle
	 */
    getPageTitle() {
        browser.waitUntil(function () {
            return (browser.getTitle().toUpperCase().includes(pageTitle.toUpperCase()))
        }, constants.WAIT_UNTIL_10000, 'title is not displayed after given time'
        )
        console.log("***** Current Page Title: " + browser.getTitle() + " *****");
        return browser.getTitle();
    }
 
     /**
     * Click the element passed as parameter
     * @param element
	 */
    click(element) {
        element.waitForDisplayed(constants.WAIT_FOR_DISPLAYED_10000);
        element.click();

    }

     /**
     * Double Click the element passed as parameter
     * @param element
	 */
    doubleClick(element) {
        element.waitForDisplayed(constants.WAIT_FOR_DISPLAYED_5000);
        element.doubleClick();
    }


     /**
     * select the element passed as parameter based on the Index passed drop down
     * @param element
     * @param index
	 */
    selectByIndex(element, index) {
        element.waitForDisplayed(constants.WAIT_FOR_DISPLAYED_5000);
        element.selectByIndex(index)

    }
    /**
     * select the dropdown list option by attribute value
     * @param element
     * @param attribute
     * @param index
	 */
    selectByAttribute(element, attribute, text) {
        element.waitForDisplayed(constants.WAIT_FOR_DISPLAYED_5000);
        element.selectByAttribute(attribute, text);
        

    }

    /**
     * Selects the Option by its visible option Value drop down
     * @param element
     * @param value
	 */
    selectByVisibleText(element, value) {
        element.waitForDisplayed(constants.WAIT_FOR_DISPLAYED_5000);
        element.selectByVisibleText(value)

    }
   
    /**
     * Selects the checkBox if it is not already selected
     * @param element
	 */
    selectCheckBox(element) {
        element.waitForDisplayed(constants.WAIT_FOR_DISPLAYED_5000);
        if (element.isSelected() == false) {
            element.click();
        }
    }

    /**
     * UnSelects the checkBox if it is selected
     * @param element
	 */
    unSelectCheckBox(element) {
        element.waitForDisplayed(constants.WAIT_FOR_DISPLAYED_5000);
        if (element.isSelected() == true) {
            element.click();
        }
        console.log("****UnSelecting CheckBox****")
    }


    /**
     * Change focus to another window. The window to change focus to may be specified by its server assigned window handle, or by the value of its `name` attribute.
     * @param windowHandle
	 */
    switchToWindow(windowHandle) {
        browser.switchToWindow(windowHandle);
    }
   
    /**
     * Checks if the given element passed as parameter is Displayed or not.
     * @param element
	 */
    isElementDisplayed(element) {
        element.waitForDisplayed(constants.WAIT_FOR_DISPLAYED_5000);
        if (element.isDisplayed()) {
            return true;
        }
        else return false;
    }
     /**
     * Checks if the given element passed as parameter is Displayed or not without wait.
     * @param element
     */
    isDisplayed(element) {
        if (element.isDisplayed()) 
            return true;
        else 
            return false;
    }
     /**
     * Scroll to a specific position based on two values passed as parameters
	 */
    moveoutFocus() {
        browser.scroll(0, 250);
    }

    /**
     * Change focus to another frame on the page. If the frame `id` is `null`, the server should switch to the page's default content.
     * @param selector
	 */
    switchToFrame(selector) {
        selector.waitForDisplayed(constants.WAIT_FOR_DISPLAYED_5000);
        browser.switchToFrame(selector);
    }

    /**
     * Removes focus from the given element passed as parameter
     * @param selector
	 */
    removeFocus(selector){
        browser.execute(el => el.blur(), selector);
    }

    
    execute(selector){
        browser.execute(el => el.click(), selector);
    }

    /**
     * Checks if the given element passed as parameter is visible or not
     * @param selector
	 */
    isElementVisible(selector)
    {
        this.pauseBrowser(constants.PAUSE_BROWSER_3000);
        return browser.isVisible(selector);
    }
    
    /**
     * Checks if the URL contains the expectedText passed as parameter
     * @param {String} : expectedText
	 */
    isUrlContains(expectedText) {
        return browser.getUrl().toUpperCase().includes(expectedText.toUpperCase());
    }
  
    /**
     * Checks Whether a simple dialog is currently open.
	 */
    isAlertPresent()
    {
        return browser.isAlertOpen();
    }
     /**
     * Accepts the alert.
	 */
    acceptTheAlert()
    {
        browser.acceptAlert();
    }

      /**
       
       * Waits for elementSelector to be invisible
       * 
       * @param {Evaluated Selector Object} elementSelector 
       * 
       * Author: Sophia Oganesyan
       * Last Updated By: Sophia Oganesyan
       
       */
      waitForElementToBeInvisible(elementSelector)
      {
        browser.waitUntil(
            () => elementSelector.isDisplayed() === false,
            {
                timeout: constants.PAUSE_BROWSER_6000,
                timeoutMsg: 'Element '+  elementSelector +' did not dissapear after '+constants.PAUSE_BROWSER_6000+'miliseconds'
            }
        );
      }
     
      /**
       * 
       * Returns number of options in a select/dropdown Page Element
       * @param {Selector} pageElementSelector (not evaluated)
       * 
       * Author: Sophia Oganesyan
       * Last Updated By: Sophia Oganesyan
       */
      getNumberOfDropDownOptions(pageElementSelector)
      {   let sel=eval(pageElementSelector);
          return sel.$$('<option>').length;
      }
      
      
        /**
       * Calcualtes number of options in a dropdown object and sets random dropdown option. 
       * @param {Page Element Object Selector} pageElement 
       * 
       * Author: Sophia Oganesyan
       * Last Updated By: Sophia Oganesyan
       */
      setRandomDropDownValueBySelector(pageElementSelector)
      {
          let numberOfOptions=this.getNumberOfDropDownOptions(pageElementSelector);
          let randomOption=random.getRandomInt(1,numberOfOptions);
          eval(pageElementSelector).selectByIndex(randomOption);
          return randomOption;
      }
      

      /**
       * Wait until Element is clickable and Click
       * @param {Page Element selector} pageElementSelector 
       * 
       *  Author: Sophia Oganesyan
       * Last Updated By: Sophia Oganesyan
       */
      waitToBeClickableAndClick(pageElementSelector)
      {
        
        this.waitUntilElementIsClickable(pageElementSelector);
        eval(pageElementSelector).click();
      }

      
      /**
       * Waits for Element to be clickable
       * @param {Page Element Selector} pageElementSelector 
       * 
       * Author: Sophia Oganesyan
       * Last Updated By: Sophia Oganesyan
       */
      waitUntilElementIsClickable(pageElementSelector)
      {  
          let elementSelector=eval(pageElementSelector);
          let errMessage ="Element "+pageElementSelector+ " is not clickable after "+constants.WAIT_UNTIL_10000 +" miliseconds";
          browser.waitUntil(()=> {
                              return elementSelector.isClickable();
                              }, {timeout: constants.WAIT_UNTIL_10000, timeoutMsg: errMessage, interval:constants.PAUSE_BROWSER_500});
      }


      /**
       * Unhide Element by selector. Change display to 'Block'
       * @param {Page Element Selector} pageElementSelector 
       * 
       * Author: Sophia Oganesyan
       * Last Updated By: Sophia Oganesyan
       */
      unhideElement(pageElementSelector)
      {
        
         browser.execute(function (pageElementSelector) {
            eval(pageElementSelector).css('display','block');
        },pageElementSelector);
      };

      /**
       * Hits enter key.
       * 
       * Author: Sophia Oganesyan
       * Last Updated By: Sophia Oganesyan
       */
      hitEnter()
      {
          browser.keys('\uE007');
      }

  
   
    /**
     * Scroll to the element view port.
	 */
    scrollToView(element)
    {
        element.scrollIntoView();
    }
     /**
     * Scroll to the element view port and click.
	 */
    scrollToViewAndClick(element)
    {
        element.scrollIntoView();
        element.click();

    }

}

module.exports = new Browser();

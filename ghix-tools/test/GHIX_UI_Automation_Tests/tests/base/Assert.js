//const { assert } = require("console");
const { expect } = require("chai");
class Assert {
    
	/**
     * Assert Element Contains Expected Text
	 * @param actual
	 * @param message
	 */
    assertElementContainsText(element, text) {
        
        expect(element.getText().toUpperCase()).to.contain(text.toUpperCase());
        console.log("*****UI: Assert "+element.getText().toUpperCase()+" Contains "+text.toUpperCase()+"");
    }

     
	/**
     * This function checks if Actual Text Equals To Expected Text (By Ignoring Case).
	 * @param {String} : actualText
     *  @param {String} : expectedText
	 */
    assertEqualIgnoreCase(actualText,expectedText){
        
        assert.equal(actualText.toUpperCase(),expectedText.toUpperCase(),'actual value not equal to expected value');
        console.log("***** Assert  "+actualText.toUpperCase()+" is equal to "+expectedText.toUpperCase()+"");
    }

    
	/**
     * This function gets the text of an element and asserts it with expected text.
	 * @param {array} : Key(Element):Value(Text). 
	 */
    assetArrayOfElementsTextEquals(array) {

        for (var entry in array) {
            assert.equal(eval(entry).getText().trim().toUpperCase(), array[entry].toUpperCase());
            console.log("***** Assert  "+eval(entry).getText().trim()+" is equal to "+array[entry]+"");
        }
    }

    	/**
     * This function gets the text of an element and asserts it with expected text(ignoring case).
	 * @param {array} : Key(Element):Value(Text). 
	 */
    assetArrayOfElementsTextEqualsIgnoreCase(array) {

        for (var entry in array) {
            assert.equal(eval(entry).getText().trim().toUpperCase(), array[entry].toUpperCase());
            console.log("***** Assert  "+eval(entry).getText().trim()+" is equal to "+array[entry]+"");
        }
    }

    /**
     * This function gets the text of an element and asserts by checking if it contains the expected text.
	 * @param {array} : Key(Element):Value(Text). 
	 */
    assertArrayOfElementsContainsTextIgnoringCase(array) {
        for (var entry in array) {
        expect(eval(entry).getText().toUpperCase()).to.contain(array[entry].toUpperCase());
        console.log("***** Assert  "+eval(entry).getText()+" Contains "+array[entry]+"");
        }
    }

    
	/**
     * This function gets the text of an element and asserts that it is Displayed.
	 * @param {Selector} 
	 */
    assertTextIsVisible(element) {
        var text = element.getText();
        expect(text).toBeDisplayed();
        console.log("***** Assert  "+eval(entry).getText().trim()+" is Visible");
    }

    
	/**
     * This function checks if Actual Text includes Expected Text.
	 * @param {String} : actualText
     *  @param {String} : expectedText
	 */
    assertContainsText(actualText, expectedText) {
        expect(actualText).to.include(expectedText);
        console.log("***** Assert  "+actualText+" Contains "+expectedText+"");
    }

    
	/**
     * This function checks if Actual Text Equals To Expected Text.
	 * @param {String} : actualText
     *  @param {String} : expectedText
	 */
    assertEqual(actualText, expectedText) {
       expect(actualText).to.equal(expectedText);
       console.log("***** Assert  "+actualText+" is equal to "+expectedText+"");
    }

    
	/**
     * This function asserts the element with the Visible Text that is Displayed.
	 * @param {array} : array of locators
     * Example : [$('*=CONTINUE TO CART'),$('a*=CONTINUE'),$('h3*=WELCOME')]
	 */
    assertArrayOfElementsAreDisplayed(arrayOfLocators){
        for(let i=0;i< arrayOfLocators.length;i++){
            let locText = arrayOfLocators[i].getText();
            this.assertElementIsVisible(arrayOfLocators[i]);
            console.log("***** Assert  "+locText+" is displayed");
        }
    }

    
	/**
     * This function gets the Value Attribute of an element and asserts it with expected text.
	 * @param {array} : Key(Element):Value(Value Attribute). 
	 */
    assertValueEquals(array) {
        
        for (var entry in array) {
            assert.equal(eval(entry).getValue().trim(), array[entry]);
            console.log("entry val=" + eval(entry).getValue().trim())
            console.log("expected val=" + array[entry])
        }
    }

 
    /**
     * This function checks if element is Visible.
	 * @param {Selector} 
	 */
    assertElementIsVisible(element) {
       
        expect((element).isDisplayed()).equals(true);
        //console.log("***** Assert  Element Is Displayed");

    }

     /**
     * This function checks if element is not Visible.
	 * @param {Selector} 
	 */
    assertElementIsNotVisible(element){
        
        expect((element).isDisplayed()).equals(false);
        console.log("***** Assert  Element Not Displayed");

    }

    /**
     * This function checks if element is Selected.
	 * @param {Selector} 
	 */
    assertElementIsSelected(element) {
        
        expect((element).isSelected()).equals(true);
        console.log("***** Assert  Element Is Selected");

    }


    /**
     * This function asserts if Given Value is True.
	 * @param {Boolean} 
	 */
    assertTrue(value) {
        
        assert.isTrue(value);
        console.log("***** Assert  Value Is True");
    }

    /**
     * This function asserts if Given Value is False.
	 * @param {Boolean} 
	 */
    assertFalse(value) {
        
        assert.isFalse(value);
        console.log("***** Assert  Value Is False");
    }

    /**
     * This function checks if Actual Title Equals To Expected Title.
	 * @param {String} : actualTitle
     *  @param {String} : expectedTitle
	 */
    assertPageTitle(expectedTitle){
        var title = browser.getTitle();
        expect(title).to.equal(expectedTitle); 
        console.log("***** Assert  "+title+" Contains "+expectedTitle+"");
    }

    /**
     * This function checks if Actual URL Equals To Expected URL content.
	 * @param {String} : actualUrl
     *  @param {String} : expectedURL
	 */
    assertUrlContains(expectedContent){
        var url = browser.getUrl();
        expect(url).to.contain(expectedContent);
        console.log("***** Assert  "+url+" Contains "+expectedContent+"");
    }

}

module.exports = new Assert();

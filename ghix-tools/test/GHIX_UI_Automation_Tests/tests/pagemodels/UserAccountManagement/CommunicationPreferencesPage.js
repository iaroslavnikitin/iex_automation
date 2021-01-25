const  dataUtil = require('../../common.utils/DataUtil');
const  jsonUtil = require('../../common.utils/JsonUtil');
const  global = require('../Global_include'); 
const { pauseBrowser } = require('../../base/Browser');
const browser = require('../../base/Browser');
const  assertionUtil = require('../../base/Assert');
var locatorJson= require('../../../resources/selectors/common/UserAccountManagement/CommunicationPreferencesObject.json');
const commonContent= require('../../../resources/content/common/UserAccountManagement/CommunicationPreferences.content.json');
const prop = require('../../common.utils/PropertyReader');
const { assert } = require('console');
var state;
state = prop.getEnvName();
const logger=require('../../common.utils/LoggerUtil');


class CommunicationPreferencesPage{
 
    enterCommunicationPreferences(){
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;

        var dataJson = global.updateDataJson.households[householdIndex]
                
        let array = {tb_mailingAddress1:dataJson.primaryAddress.mailing.addressLine1,
            tb_city:dataJson.primaryAddress.mailing.city,
            sb_state:dataJson.primaryAddress.mailing.state, 
            tb_zipCode:dataJson.primaryAddress.mailing.zip,
            sb_county:2,
            //sb_prefSpokenLang:dataJson.primaryContactPref.spokenLang, 
            //sb_prefWrittenLang:dataJson.primaryContactPref.writtenLang, 
            btn_emailRadio:"",cb_paperless1095:"",btn_continue:""}
    
            dataUtil.doFormFill(locatorJson,array)
    
        }

        FillUpdateMailingAddressDetails(){
            let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
            browser.waitForUrlContains("preferences")
            browser.waitForPageToLoad(eval(locatorJson.updateMailingAddressPopUp.hd_mailingAddPopup),commonContent.updateMailingAddressPopUp.mailingAddHeader); 
            var dataJson = global.updateDataJson.households[householdIndex]
            let commPrefDetailsArr = {tb_mailingAdd1:dataJson.primaryAddress.mailing.addressLine1,
                    tb_city:dataJson.primaryAddress.mailing.city,
                    sb_state:dataJson.primaryAddress.mailing.state,
                    tb_zipCode:dataJson.primaryAddress.mailing.zip,
                    sb_county:1,
                    btn_saveMailingAdd:"",
                 }       
         
                dataUtil.doFormFill(locatorJson.updateMailingAddressPopUp,commPrefDetailsArr)            
               browser.waitForElementToDisplay(eval(locatorJson.btn_ok));
               browser.click(eval(locatorJson.btn_ok));
               if(state.toUpperCase()=='NJ'){
                browser.waitForElementToDisplay(eval(locatorJson.btn_ok));
                browser.click(eval(locatorJson.btn_ok));   
               }
               
            }

        clickSaveMailingAddress(){
        browser.click(eval(locatorJson.updateMailingAddressPopUp.btn_saveMailingAdd))
        }

        clickSavePreferences(){
            browser.waitForElementToDisplay(eval(locatorJson.btn_savePreferences));
            browser.click(eval(locatorJson.btn_savePreferences))
            browser.click(eval(locatorJson.btn_ok))
            }

        clickOkOnPopUp()
        {
        browser.click(eval(locatorJson.btn_ok))
        }

        verifyPrefPageForInvalidAndMandatoryData(invalidSsapFile,validSsapFile){    
            let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;        
            
            //Fill in invalid data from invalid ssap json for mailing add , city and zip 
            var filePath= 'resources/data/Common/SSAP/'+invalidSsapFile
            var dataJson=jsonUtil.readJson(filePath)
            
            //verify cancel button is disabled before filling any data
            assert.equal(eval(locatorJson.btn_continue).isEnabled(),false );
               
            let array = {tb_mailingAddress1:dataJson.primaryAddress.mailing.addressLine1,
                tb_city:dataJson.primaryAddress.mailing.city,
                tb_zipCode:dataJson.primaryAddress.mailing.zip }        
            dataUtil.doFormFill(locatorJson,array)  
         
            //verify invalid error labels
             let dataArr={ [locatorJson.errorLabels.span_mailingAdd1]: commonContent.invalidFields.mailingAdd1,
                    [locatorJson.errorLabels.span_city]:commonContent.invalidFields.city,
                    [locatorJson.errorLabels.span_zipCode]:commonContent.invalidFields.zipCode }
            
            assertionUtil.assetArrayOfElementsTextEquals(dataArr)
        
        //Fill in valid mailing add, city and zip and select invalid state 
        var filePath= 'resources/data/Common/SSAP/'+validSsapFile
        var ssapObject=jsonUtil.readJson(filePath)
        global.updateDataJson.households[householdIndex]= jsonUtil.updateApplicantDetails(ssapObject)
        var dataJson = global.updateDataJson.households[householdIndex]

        let invalidArr = {tb_mailingAddress1:dataJson.primaryAddress.mailing.addressLine1,
            tb_city:dataJson.primaryAddress.mailing.city,
            tb_zipCode:dataJson.primaryAddress.mailing.zip,
            sb_state:"Alabama"               
            }    

        dataUtil.doFormFill(locatorJson,invalidArr)

        //verify cancel button is disabled after filling invalid data
        assert.equal(eval(locatorJson.btn_continue).isEnabled(),false );

        //verify invalid error labels for state
        var invalidDataArray={ [locatorJson.errorLabels.span_state]:commonContent.invalidFields.state }
        assertionUtil.assetArrayOfElementsTextEquals(invalidDataArray)
        
        //Empty mandatory fields to see mandatory error labels
        let mandatoryArr = {tb_mailingAddress1:"",
                tb_city:"",
                sb_state:0, 
                tb_zipCode:"",               
                }        
                dataUtil.doFormFill(locatorJson,mandatoryArr)  
        
        //verify cancel button is disabled when mandtaory data not provided
        assert.equal(eval(locatorJson.btn_continue).isEnabled(),false );
        
        //verify mandatory error labels (mailing add, city, state, zip)
        let mandatoryDataArr={ [locatorJson.errorLabels.span_mailingAdd1]: commonContent.mandatoryFields.mailingAdd1,
            [locatorJson.errorLabels.span_city]:commonContent.mandatoryFields.city,
            [locatorJson.errorLabels.span_state]:commonContent.mandatoryFields.state,
            [locatorJson.errorLabels.span_zipCode]:commonContent.mandatoryFields.zipCode }
        
        assertionUtil.assetArrayOfElementsTextEquals(mandatoryDataArr)

        //enable text message option
        browser.click(eval(locatorJson.cb_enableTxtMsg))
        browser.click(eval(locatorJson.btn_closeOnPopup))
        browser.click(eval(locatorJson.cb_enableTxtMsg))
        browser.click(eval(locatorJson.btn_okOnPopup))        
    }

    verifyNewPrefPageForInvalidAndMandatoryData(invalidSsapFile){ 
        //Fill in invalid data from invalid ssap json for mailing add , city and zip 
        var filePath= 'resources/data/Common/SSAP/'+invalidSsapFile
        console.log ("invalid file path=="+filePath)
        var dataJson=jsonUtil.readJson(filePath)

        //verify Save Mailing button is enabled before filling any data
        assert.equal(eval(locatorJson.updateMailingAddressPopUp.btn_saveMailingAdd).isEnabled(),true );
        browser.click(eval(locatorJson.updateMailingAddressPopUp.btn_saveMailingAdd))
    
        var mandatoryAssertionArr={ [locatorJson.updateMailingAddressPopUp.errorLabels.span_mailingAdd1]:commonContent.updateMailingAddressPopUp.mailingAdd1,
            [locatorJson.updateMailingAddressPopUp.errorLabels.span_city]:commonContent.updateMailingAddressPopUp.city,
            [locatorJson.updateMailingAddressPopUp.errorLabels.span_zipCode]:commonContent.updateMailingAddressPopUp.zipCode,
            [locatorJson.updateMailingAddressPopUp.errorLabels.span_county]:commonContent.updateMailingAddressPopUp.county}

        assertionUtil.assetArrayOfElementsTextEquals(mandatoryAssertionArr)

        logger.log("***verified mandatory assertions***")

        let invalidDataArray = {tb_mailingAdd1:dataJson.primaryAddress.mailing.addressLine1,
            tb_city:dataJson.primaryAddress.mailing.city,
            tb_zipCode:dataJson.primaryAddress.mailing.zip }       
 
        dataUtil.doFormFill(locatorJson.updateMailingAddressPopUp,invalidDataArray)  
    
        var invalidAssertionArr={ [locatorJson.updateMailingAddressPopUp.errorLabels.span_mailingAdd1]:commonContent.updateMailingAddressPopUp.mailingAdd1,
            [locatorJson.updateMailingAddressPopUp.errorLabels.span_city]:commonContent.updateMailingAddressPopUp.city,
            [locatorJson.updateMailingAddressPopUp.errorLabels.span_zipCode]:commonContent.updateMailingAddressPopUp.zipCode,
            [locatorJson.updateMailingAddressPopUp.errorLabels.span_county]:commonContent.updateMailingAddressPopUp.county}

        assertionUtil.assetArrayOfElementsTextEquals(invalidAssertionArr)
        logger.log("***verified invalid assertions***")        

    }
    
    /*
    * Verify Communication Preferences Page
    */
    verifyCommunicationPreferencesPage(){
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;

        var dataJson = global.updateDataJson.households[householdIndex]
        var phoneArr=dataJson.primaryContactPhone.mobile.split("-")
        
        var emailPhoneArr={ [locatorJson.tb_phoneNumber]:"("+phoneArr[0]+") "+phoneArr[1]+"-"+phoneArr[2],
                             [locatorJson.tb_emailAdd]:dataJson.applicants[0].email.toLowerCase()
            }        
        assertionUtil.assertValueEquals(emailPhoneArr)
        logger.log(">>>> Verified Phone and Email Auto Population")


        //check and uncheck boxes and radio buttons
        browser.click(eval(locatorJson.cb_enableTxtMsg))
        assertionUtil.assertEqual(eval(locatorJson.cb_enableTxtMsg).getAttribute('data-value'),'true')
        browser.click(eval(locatorJson.cb_enableTxtMsg))
        assertionUtil.assertEqual(eval(locatorJson.cb_enableTxtMsg).getAttribute('data-value'),'false')
        browser.click(eval(locatorJson.cb_emailMe))
        assertionUtil.assertEqual(eval(locatorJson.cb_emailMe).getAttribute('data-value'),'false')
        browser.click(eval(locatorJson.cb_emailMe))
        assertionUtil.assertEqual(eval(locatorJson.cb_emailMe).getAttribute('data-value'),'true')        
        logger.log(">>>> Verified text me and email me check box")

        browser.click(eval(locatorJson.lbl_paperlessNotices))
        assertionUtil.assertEqual(eval(locatorJson.btn_paperlessNotices).getAttribute('aria-checked'),'true')

        browser.click(eval(locatorJson.lbl_postalMailNotices))
        assertionUtil.assertEqual(eval(locatorJson.btn_postalMailNotices).getAttribute('aria-checked'),'true')
        logger.log(">>>> Verified postal mail radio buttons")

        browser.click(eval(locatorJson.lbl_paperless1095))
        assertionUtil.assertEqual(eval(locatorJson.btn_paperless1095).getAttribute('aria-checked'),'true')

        browser.click(eval(locatorJson.lbl_postalMail1095))
        assertionUtil.assertEqual(eval(locatorJson.btn_postalMail1095).getAttribute('aria-checked'),'true')
        logger.log(">>>> Verified 1095 mail radio buttons")

        browser.selectByIndex(eval(locatorJson.sb_prefSpokenLang),2)
        browser.selectByIndex(eval(locatorJson.sb_prefWrittenLang),2)
        logger.log(">>>> Verified spoken and written language dropdown...")

        let expectedAddress=dataJson.primaryAddress.mailing.addressLine1+", "+dataJson.primaryAddress.mailing.city+", "+state+", "+dataJson.primaryAddress.mailing.zip
        assertionUtil.assertEqual(eval(locatorJson.p_mailingAdd).getText(),expectedAddress)

        logger.log(">>>> Verified Address...")
        pauseBrowser(1000)

        //Click Update Mailing Address, Save Changes and Click Cancel Button
        browser.click(eval(locatorJson.btn_updateMailingAdd))
        pauseBrowser(1000)
        browser.click(eval(locatorJson.btn_cancelChanges))
        browser.click(eval(locatorJson.btn_updateMailingAdd))
        browser.setValueInTextField(eval(locatorJson.updateMailingAddressPopUp.tb_mailingAdd1),dataJson.primaryAddress.mailing.addressLine1)
        browser.click(eval(locatorJson.updateMailingAddressPopUp.btn_saveMailingAdd))
        browser.click(eval(locatorJson.btn_ok))
        assertionUtil.assertEqual(eval(locatorJson.p_mailingAdd).getText(),expectedAddress)
        logger.log(">>>> Updated Mailing Address and Verified...")

        browser.click(eval(locatorJson.btn_savePreferences))
        browser.click(eval(locatorJson.btn_ok))
        //dashboardPage.verifyDashboard("Individual");
        logger.log(">>>> Click Save Preferences and Verify Dashboard...")

    }    
}
    module.exports = new CommunicationPreferencesPage();
    
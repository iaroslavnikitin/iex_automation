var locatorJson = require('../../../resources/selectors/common/Entity/EntityAccountSetUp.json');
var content = require('../../../resources/content/common/Entity/AccountSetup.content');
var global = require('../Global_include');
const assert = require('../../base/Assert');
const browser = require('../../base/Browser');
const jsonUtil = require('../../common.utils/JsonUtil');
const fileUploadUtil = require('../../common.utils/FileUploadUtil');
const dataUtil = require('../../common.utils/DataUtil');
const prop = require('../../common.utils/PropertyReader');
const loginPage = require('../../pagemodels/UserAccountManagement/LogInPage.js');
var state = prop.getEnvName();
var stateLocatorJson = require('../../../resources/selectors/exchange/'+state+'/Entity/EntityAccountSetUp.json');
var stateContent = require('../../../resources/content/exchange/'+state+'/Entity/AccountSetup.content');
const logger=require('../../common.utils/LoggerUtil');
const constants = require('../../common.utils/Constants');





class EntityWorkFlow {


    createEntityAccount(fileName) {
        let entityIndex = global.updateDataJson.entities.length;
        var data=  require("../../../resources/data/Common/Entity/"+fileName);
        global.updateDataJson.entities[entityIndex] = jsonUtil.updateEntityDetails(data);
        logger.log("Entity Email : " + global.updateDataJson.entities[entityIndex].entityInformation.email);
        var phoneArr = global.updateDataJson.entities[entityIndex].entityInformation.mobile.split("-");

        var array = {
            tb_firstName: global.updateDataJson.entities[entityIndex].entityInformation.firstName,
            tb_lastName: global.updateDataJson.entities[entityIndex].entityInformation.lastName,
            tb_email: global.updateDataJson.entities[entityIndex].entityInformation.email,
            tb_confirmEmail: global.updateDataJson.entities[entityIndex].entityInformation.email,
            tb_phone1: phoneArr[0],
            tb_phone2: phoneArr[1],
            tb_phone3: phoneArr[2],
            sb_agent_securityQues: 1,
            tb_agent_securityAnswers: "automation",
            tb_password: global.updateDataJson.entities[entityIndex].entityInformation.password,
            tb_confirmPassword: global.updateDataJson.entities[entityIndex].entityInformation.password,
            cb_terms: "",
            btn_submitbtn: ""
        }
        dataUtil.doFormFill(locatorJson, array);
        logger.log("*****Created Entity Account*****");
              
    }
    loginAsEntity() {
        let entityIndex = (global.updateDataJson.entities.length === 0) ? 0 : global.updateDataJson.entities.length-1;
        var dataJson = global.updateDataJson.entities[entityIndex];
        loginPage.enterLogInCredentials(dataJson.entityInformation.email, dataJson.entityInformation.password);
        loginPage.clickSubmit();
        logger.log("*****Logged In As Entity*****");
    }
    setEntityInformation() {
        let entityIndex = (global.updateDataJson.entities.length === 0) ? 0 : global.updateDataJson.entities.length-1;
        browser.pauseBrowser(1000);
        if (eval(locatorJson.btn_Continue).isDisplayed()) {
            browser.waitForPageToLoad(eval(locatorJson.hd_accountCreation),content.accountCreation);
            browser.click(eval(locatorJson.btn_Continue));
            this.loginAsEntity();
            browser.waitForPageToLoad(eval(locatorJson.hd_entityInformation),content.entityInformation);
           
        }
        var dataJson = global.updateDataJson.entities[entityIndex];
        var phoneArr = dataJson.entityInformation.mobile.split("-");
        var array = {
            tb_entityName: dataJson.entityInformation.entityName,
            tb_businessLegalName: dataJson.entityInformation.lastName,
            tb_primaryEmailAddress: dataJson.entityInformation.email,
            tb_primaryPhone1: phoneArr[0],
            tb_primaryPhone2: phoneArr[1],
            tb_primaryPhone3: phoneArr[2],
            tb_faxNumber1: phoneArr[0],
            tb_faxNumber2: phoneArr[1],
            tb_faxNumber3: phoneArr[2],
            tb_federalTaxID: dataJson.entityInformation.federalTaxID,
            tb_stateTaxID: dataJson.entityInformation.stateTaxID,
            sb_orgType: 1,
            btn_countiesServed_chzn: "",
            btn_countiesServed_chzn_o_0: "",
            btn_SaveEntityInfo: ""
        }
        dataUtil.doFormFill(locatorJson, array);
        logger.log("*****Entered Entity Business Information*****");
        browser.waitForPageToLoad(eval(locatorJson.hd_populationServed),content.populationsServed);
        
    }
    addPopulationServedInformation() {
        var array = {
            btn_languages: "",
            cb_arb: "",
            tb_arbLangPercentage: 50,
            tb_arbLangStaff: 4,
            cb_eng: "",
            tb_engLangPercentage: 50,
            tb_engLangStaff: 4,
            btn_ethnicities: "",
            cb_russian: "",
            tb_russianEthnicityPercentage: 25,
            cb_vietnmese: "",
            tb_vietnmeseEthnicityPercentage: 50,
            cb_Ukrainian: "",
            tb_UkrainianEthnicityPercentage: 25,
            btn_industries: "",
            cb_trans: "",
            tb_transIndustryPercentage: 50,
            cb_teletech: "",
            tb_teletechIndustryPercentage: 25,
            cb_sales: "",
            tb_salesIndustryPercentage: 25,
            btn_populationServedSubmit: ""
        }
        dataUtil.doFormFill(locatorJson, array);
        logger.log("*****Added Population Served Information*****");
        browser.waitForPageToLoad(eval(locatorJson.hd_locationsAndHours),content.locationsAndHours);
        
    }
    addPrimarySiteLocationAndHours() {
        let entityIndex = (global.updateDataJson.entities.length === 0) ? 0 : global.updateDataJson.entities.length-1;
        var dataJson = global.updateDataJson.entities[entityIndex];
        browser.setValueInTextField(eval(locatorJson.tb_siteLocationName), dataJson.primarySiteLocation)
        this.addSiteDetails(dataJson);
        logger.log("*****Added Primary Site Location And Hours*****");
        browser.waitForPageToLoad(eval(locatorJson.hd_locationsAndHoursSubSite),content.locationsAndHoursSubSite);
        

    }
    addSubSiteDetails() {
        browser.click(eval(locatorJson.btn_addSubSite));
        logger.log("*****Cliked On Add Sub-Site Button*****");
    }
    addSubSiteLocatonAndHours() {
        let entityIndex = (global.updateDataJson.entities.length === 0) ? 0 : global.updateDataJson.entities.length-1;
        var dataJson = global.updateDataJson.entities[entityIndex];
        browser.setValueInTextField(eval(locatorJson.tb_siteLocationName), dataJson.subSiteLocation);
        this.addSiteDetails(dataJson);
        logger.log("*****Added Sub Site Location And Hours*****");

    }
    clickDoneOnSubsitePage() {
        browser.click(eval(locatorJson.btn_subSiteDone));
        logger.log("*****Clicked On Done After Adding Sub-Site*****");
        browser.waitForPageToLoad(eval(locatorJson.hd_contactInformation),content.contactInformation);
    }
    addSiteDetails(dataJson) {
        this.locationsAndHours(dataJson);
        this.checkForAddressPopUp();
      //  browser.click(eval(locatorJson.btn_falseClick));
        this.confirmAddress();
        browser.click(eval(locatorJson.cb_physicalAddressCheck));
        browser.click(eval(locatorJson.cb_spokenLanguagesId));
        browser.click(eval(locatorJson.cb_writtenLanguagesId));
        browser.click(eval(locatorJson.btn_next));
    }
    locationsAndHours(dataJson) {
        var phoneArr = dataJson.entityInformation.mobile.split("-");
        var array = {
            tb_primaryPhone1: phoneArr[0],
            tb_primaryPhone2: phoneArr[1],
            tb_primaryPhone3: phoneArr[2],
            sb_MondayFrom: 8,
            sb_MondayTo: 25,
            sb_TuesdayFrom: 8,
            sb_TuesdayTo: 25,
            sb_WednesdayFrom: 8,
            sb_WednesdayTo: 25,
            sb_ThursdayFrom: 8,
            sb_ThursdayTo: 25,
            sb_FridayFrom: 8,
            sb_FridayTo: 25,
            sb_SaturdayFrom: 1,
            sb_SundayFrom: 1,
            tb_mailingLocation_address1: dataJson.primaryAddress.mailing.addressLine1,
            tb_mailingLocation_city: dataJson.primaryAddress.mailing.city,
            sb_mailingLocation_state: dataJson.primaryAddress.mailing.state,
            tb_mailingLocation_zip: dataJson.primaryAddress.mailing.zip,
        }
        dataUtil.doFormFill(locatorJson, array);
    }
    confirmAddress() {
        browser.pauseBrowser(constants.PAUSE_BROWSER_3000);
        if (eval(locatorJson.btn_modalData).isDisplayed()) {
            browser.switchToFrame(eval(locatorJson.btn_modalData));
            browser.click(eval(locatorJson.cb_addressCheck));
            browser.click(eval(locatorJson.btn_submitAddr));
        }
    }

    checkForAddressPopUp(){
        browser.pauseBrowser(constants.PAUSE_BROWSER_3000);
        if (eval(locatorJson.popUpCheckYourAddress).isDisplayed()) {
                browser.click(eval(locatorJson.btn_backToInputModal));
                logger.log("***** Clicked OK on Address Validation Progress Popup *****")
         }
         else
         {
            browser.click(eval(locatorJson.btn_falseClick));
         }
    }

    addContactInformation() {
        let entityIndex = (global.updateDataJson.entities.length === 0) ? 0 : global.updateDataJson.entities.length-1;
        var dataJson = global.updateDataJson.entities[entityIndex];
        var phoneArr = dataJson.entityInformation.mobile.split("-");
        var array = {
            tb_priContactName: dataJson.entityInformation.entityName,
            tb_priContactEmailAddress: dataJson.entityInformation.email,
            tb_priContactPrimaryPhoneNumber1: phoneArr[0],
            tb_priContactPrimaryPhoneNumber2: phoneArr[1],
            tb_priContactPrimaryPhoneNumber3: phoneArr[2],
            tb_finContactName: dataJson.entityInformation.entityName,
            tb_finEmailAddress: dataJson.entityInformation.email,
            tb_finPrimaryPhoneNumber1: phoneArr[0],
            tb_finPrimaryPhoneNumber2: phoneArr[1],
            tb_finPrimaryPhoneNumber3: phoneArr[2],
            btn_SaveEntityInfo: ""
        }
        dataUtil.doFormFill(locatorJson, array);
        if (state.toUpperCase() == 'NJ'||state.toUpperCase() == 'PA') {
        browser.waitForPageToLoad(eval(stateLocatorJson.hd_certifiedAssisters),stateContent.certifiedAssisters);
        }else{
            browser.waitForPageToLoad(eval(locatorJson.hd_certifiedAssisters),content.certifiedAssisters);   
        }
        logger.log("*****Added Contact Information*****");
    }
    clickCertifiedEnrollmentCounselors() {
        browser.click(eval(locatorJson.btn_addAssister));
        logger.log("*****Clicked On Add Certified Enrollment Counselors*****");
    }
    addCertifiedEnrollmentCounselors() {
        let entityIndex = (global.updateDataJson.entities.length === 0) ? 0 : global.updateDataJson.entities.length-1;
        var dataJson = global.updateDataJson.entities[entityIndex];
        logger.log(" ***Entity Email : " + dataJson.entityInformation.email);
        var phoneArr = dataJson.certifiedEnrollmentCounselors.phoneNumber.split("-");
        var array = {
            tb_firstName: global.updateDataJson.entities[entityIndex].certifiedEnrollmentCounselors.firstName,
            tb_lastName: global.updateDataJson.entities[entityIndex].certifiedEnrollmentCounselors.lastName,
            tb_emailAddress: global.updateDataJson.entities[entityIndex].certifiedEnrollmentCounselors.email,
            tb_primaryPhone1: phoneArr[0],
            tb_primaryPhone2: phoneArr[1],
            tb_primaryPhone3: phoneArr[2],
            sb_primarySite: 1,
            tb_address1: dataJson.primaryAddress.mailing.addressLine1,
            tb_city: dataJson.primaryAddress.mailing.city,
            sb_state: dataJson.primaryAddress.mailing.state,
            tb_zip: dataJson.primaryAddress.mailing.zip,
            btn_falseClick: "",
        }
        dataUtil.doFormFill(locatorJson, array);
        this.confirmAddress(eval(locatorJson.btn_iframeMain));
        browser.click(eval(locatorJson.cb_spokenLanguagesIds));
        browser.click(eval(locatorJson.cb_writtenLanguagesIds));
        browser.selectByIndex(eval(locatorJson.sb_education), 2);
        browser.click(eval(locatorJson.btn_SaveAssister));
        browser.waitForElementToDisplay(eval(locatorJson.lk_table));
        browser.click(eval(locatorJson.btn_assisterDone));
        logger.log("*****Added Certified Enrollment Counselors*****");
        browser.waitForPageToLoad(eval(locatorJson.hd_documentUpload),content.documentUpload);
       
    }
    documentUpload() {
        let picFile = process.cwd() + "/resources/data/Testfiles/pic.jpg";
        fileUploadUtil.fileUploadDirect(picFile, eval(locatorJson.fileUpload));
        browser.click(eval(locatorJson.uploadSuccess));
        logger.log("*****Uploaded Documents*****");
          }
    clickNextToPayment() {
        browser.click(eval(locatorJson.btn_update));
        logger.log("*****Clicked Next To Payment*****");
        browser.waitForPageToLoad(eval(locatorJson.hd_paymentInformation),content.paymentInformation);
  
    }
    addPaymentInformation() {
        let entityIndex = (global.updateDataJson.entities.length === 0) ? 0 : global.updateDataJson.entities.length-1;
        var dataJson = global.updateDataJson.entities[entityIndex];
        browser.click(eval(locatorJson.rb_receivedPayments1));
        browser.click(eval(locatorJson.rb_CHECK));
        var array = {

            tb_address1_mailing: dataJson.primaryAddress.mailing.addressLine1,
            tb_city_mailing: dataJson.primaryAddress.mailing.city,
            sb_state_mailing: dataJson.primaryAddress.mailing.state,
            tb_zip_mailing: dataJson.primaryAddress.mailing.zip,
            btn_falseClick: "",
        }
        dataUtil.doFormFill(locatorJson, array);
        this.confirmAddress(eval(locatorJson.btn_iframeMain));
        browser.waitForElementToDisplay(eval(locatorJson.btn_finish));
        browser.click(eval(locatorJson.btn_finish));
        logger.log("*****Added Payment Information*****");
        browser.waitForElementToDisplay(eval(locatorJson.successPopUp));
    }
    verifySuccessModel() {
        assert.assertElementIsVisible(eval(locatorJson.successPopUp));
        browser.click(eval(locatorJson.btn_close));
        logger.log("*****Verified Success Model*****");
        browser.waitForPageToLoad(eval(locatorJson.hd_registrationStatus),content.registrationStatus);
  
    }
    verifyRegistrationStatus() {
        let entityIndex = (global.updateDataJson.entities.length === 0) ? 0 : global.updateDataJson.entities.length-1;
        var dataJson = global.updateDataJson.entities[entityIndex];
        browser.waitForElementToDisplay(eval(locatorJson.lk_pending));
        assert.assertElementIsVisible(eval(locatorJson.lk_pending));
        logger.log(" *****Registration Is Successfully Completed***** ");
        logger.log(" ****Registration Status Is :" + browser.getText(eval(locatorJson.lk_pending)));
        logger.log(" ***Entity Name : " + dataJson.entityInformation.entityName);
        logger.log(" ***Entity Email : " + dataJson.entityInformation.email);
        logger.log(" ***Counselor Name : " + dataJson.certifiedEnrollmentCounselors.firstName + " " + dataJson.certifiedEnrollmentCounselors.lastName);
        logger.log(" ***Counselor Email : " + dataJson.certifiedEnrollmentCounselors.email);
        logger.log(" ***Primary Site : " + dataJson.primarySiteLocation);
        logger.log(" ***Sub Site : " + dataJson.subSiteLocation);
        logger.log("*****Verified Registration Status*****");
    }
}

module.exports = new EntityWorkFlow();
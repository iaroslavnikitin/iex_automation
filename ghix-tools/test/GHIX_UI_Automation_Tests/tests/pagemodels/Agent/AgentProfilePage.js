const state = stateProfile;
const  global = require('../Global_include');
const constants = require('../../common.utils/Constants');

const browser = require("../../base/Browser.js");
const assert = require("../../base/Assert.js");
const dataUtil = require("../../common.utils/DataUtil");
const fileUploadUtil = require("../../common.utils/FileUploadUtil");
const  jsonUtil = require('../../common.utils/JsonUtil');
const  logger = require('../../common.utils/LoggerUtil');
const agentProfileLocators=require("../../../resources/selectors/common/Agent/AgentProfilePage.json");
const agentProfileContent=require("../../../resources/content/common/Agent/AgentProfilePage.content");
const agentInformationPageContent = require('../../../resources/content/common/Agent/AgentInformationPage.content');
const random = require('../../common.utils/RandomDataGenerator.js')


class AgentProfilePage
{
    enterProfilePageDetails(independentAgent) {
        let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
        this.setProfileData();
        logger.log("***** Verifying Pre-Populated Fields On Profile Page *****")
        if(independentAgent) {
            this.verifyPrepopulatedFieldsOnProfile();
            global.updateDataJson.agencies[agencyIndex].agent.publicEmail=global.updateDataJson.agencies[agencyIndex].agent.email;
        }
        logger.log("***** Entering Profile Details *****");

        let picFile= process.cwd()+"/resources/data/Testfiles/pic.jpg";
        let locator_fileInputTextbox=eval(agentProfileLocators.choosePhoto);
        let locator_fileUploadBtn=eval(agentProfileLocators.btn_UploadPhoto);
        let loc_fileUploadPopupText=eval(agentProfileLocators.fileUploadSuccessPopupText);
        let fileUploadPopupText = agentProfileContent.fileUploadPopupBody;
        let loc_fileUploadPopupClose=eval(agentProfileLocators.fileUploadPopupClose);

        let profileDetails = {
            cb_health: global.updateDataJson.agencies[agencyIndex].agent.health,
            cb_dental: global.updateDataJson.agencies[agencyIndex].agent.dental,
            tb_website: global.updateDataJson.agencies[agencyIndex].agent.website,
            sb_education: global.updateDataJson.agencies[agencyIndex].agent.education,
            tb_aboutYourself: global.updateDataJson.agencies[agencyIndex].agent.aboutYourself,
        };
        if(state.toUpperCase() == constants.STATE_ID)
        {
            profileDetails.cb_clientsServed = global.updateDataJson.agencies[agencyIndex].agent.clientsServed;
        }
        if (!independentAgent)
            profileDetails.tb_yourPublicEmail=global.updateDataJson.agencies[agencyIndex].agent.publicEmail;
        this.selectLanguages(global.updateDataJson.agencies[agencyIndex].agent.languages);
        dataUtil.doFormFill(agentProfileLocators, profileDetails);
        fileUploadUtil.fileUploadDirect(picFile,locator_fileInputTextbox);
        browser.click(locator_fileUploadBtn);
        fileUploadUtil.verifyFileUploadPopupAndClose(loc_fileUploadPopupText,fileUploadPopupText,loc_fileUploadPopupClose);
        browser.waitForPageToLoad(eval(agentProfileLocators.rightPanelHeader), agentProfileContent.rightPanelHeader);
        browser.click(eval(agentProfileLocators.btn_finish));
    }
    verifyPrepopulatedFieldsOnProfile()
    {
        let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
        let locator_arr=[eval(agentProfileLocators.cb_clientsServed),eval(agentProfileLocators.tb_yourPublicEmail)];
        let data_arr=[global.updateDataJson.agencies[agencyIndex].agent.clientsServed,global.updateDataJson.agencies[agencyIndex].agent.email];
        for(let i=0;i<locator_arr.length;i++)
        {
            assert.assertEqualIgnoreCase(browser.getAttributeValue(locator_arr[i],'value'),data_arr[i]);
        }
    }
    selectLanguages(languages_arr) {
        for (let i = 0; i < languages_arr.length; i++) {
            browser.setValueInTextField(eval(agentProfileLocators.tb_languages), '');
            browser.setValueInTextField(eval(agentProfileLocators.tb_languages), languages_arr[i]);
           // browser.pauseBrowser(3000);
            browser.waitUntilElementIsClickable(agentProfileLocators.dpDyn_selectLanguage);
            browser.click(eval(agentProfileLocators.dpDyn_selectLanguage));
        }
    }
    setProfileData ()
    {
        let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
        if (jsonUtil.isFieldEmpty(global.updateDataJson.agencies[agencyIndex].agent.health)) {
            global.updateDataJson.agencies[agencyIndex].agent.health = true;
        }
        if (jsonUtil.isFieldEmpty(global.updateDataJson.agencies[agencyIndex].agent.dental)) {
            global.updateDataJson.agencies[agencyIndex].agent.dental = true;
        }
        if (jsonUtil.isFieldEmpty(global.updateDataJson.agencies[agencyIndex].agent.website)) {
            global.updateDataJson.agencies[agencyIndex].agent.cb_vision = true;
        }
        if (jsonUtil.isFieldEmpty(global.updateDataJson.agencies[agencyIndex].agent.website)) {
            global.updateDataJson.agencies[agencyIndex].agent.website ="www."+random.getRandomString(5,false)+".com";
        }
        if (jsonUtil.isFieldEmpty(global.updateDataJson.agencies[agencyIndex].agent.education)) {
            global.updateDataJson.agencies[agencyIndex].agent.education =browser.setRandomDropDownValueBySelector(agentProfileLocators.sb_education);
        }

        if (jsonUtil.isFieldEmpty(global.updateDataJson.agencies[agencyIndex].agent.aboutYourself)) {
            global.updateDataJson.agencies[agencyIndex].agent.aboutYourself =global.updateDataJson.agencies[agencyIndex].agent.firstName+" : "+random.getRandomString(7,false);
        }
        if (jsonUtil.isFieldEmpty(global.updateDataJson.agencies[agencyIndex].agent.clientsServed)) {
            global.updateDataJson.agencies[agencyIndex].agent.clientsServed =true;
        }
        if (jsonUtil.isFieldEmpty(global.updateDataJson.agencies[agencyIndex].agent.publicEmail)) {
            global.updateDataJson.agencies[agencyIndex].agent.publicEmail =random.getRandomEmail(global.updateDataJson.agencies[agencyIndex].agent.firstName);
        }


    }
    clickCloseOnAccountRegistrationComplete() {
        let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
        logger.log("***** Verifying Account Creation Complete Popup *****");
        this.verifyAccountRegistrationCompletePopup();
        browser.switchToFrame(eval(agentProfileLocators.accountRegistrationCompleteiframe));
        browser.pauseBrowser(2000);//change to wait untilInvisibl
        logger.log("***** Account Creation Complete Popup Body: \n"+eval(agentProfileLocators.accountRegistrationCompletePopupText).getText()+"\n *****");
        browser.click(eval(agentProfileLocators.btn_close));
        logger.log("***** Closed the Account Creation Complete Popup *****");
        browser.waitForPageToLoad(eval(agentProfileLocators.pageHeader), global.updateDataJson.agencies[agencyIndex].agent.firstName+" "+global.updateDataJson.agencies[agencyIndex].agent.lastName);
    }
    verifyAccountRegistrationCompletePopup()
    { //only header is verified
        assert.assertElementContainsText(eval(agentProfileLocators.accountRegistrationCompletePopupHeader),agentProfileContent.accountRegistrationPopupHeader);
    }



}

module.exports = new AgentProfilePage();

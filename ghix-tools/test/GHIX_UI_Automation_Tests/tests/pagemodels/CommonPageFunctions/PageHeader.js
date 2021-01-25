const global = require('../Global_include');
const state = stateProfile;
const constants =  require("../../common.utils/Constants");
const agentAgencyConstants=require('../../common.utils/ConstantsAgentAgency');

const pageHeaderLoc = require('../../../resources/selectors/common/PageHeaderObject.json');
const pageHeaderContentState = require('../../../resources/content/exchange/'+state+'/PageHeader.content');
const pageHeaderLocState = require('../../../resources/selectors/exchange/'+state+'/PageHeaderObject.json');

const browser = require('../../base/Browser.js');
const assert = require('../../base/Assert.js');
const dataUtil = require("../../common.utils/DataUtil");
const logger = require("../../common.utils/LoggerUtil");

const states = require('../../../resources/data/states.json');
const landingPage = require('../../pagemodels/HomePage/LandingPage');
const loginPage = require('../../pagemodels/UserAccountManagement/LogInPage');
const stateContent = require('../../../resources/content/exchange/'+state+'/PageHeader.content');
const stateLoc = require('../../../resources/selectors/exchange/'+state+'/PageHeaderObject.json');
const locatorJson = require('../../../resources/selectors/common/PageHeaderObject.json');



class PageHeader {

    logoutAndLoginAsDifferentUser(username,password){
        loginPage.logout();
        this.clickLogInAndEnterUsernameAndPasswordAndClickSubmit(username,password)
    }
    clickLogInAndEnterUsernameAndPasswordAndSubmit(email, password) {
        landingPage.clicklogIn();
        loginPage.enterLogInCredentialsAndSubmit(email, password);

    }
    // enterLogInCredentialsAndSubmit considers Server Date which is not present in some cases 
    // For those cases, using enterLogInCredentials and clickSubmit
    clickLogInAndEnterUsernameAndPasswordAndClickSubmit(email, password) {
        landingPage.clicklogIn();
        loginPage.enterLogInCredentials(email, password);
        loginPage.clickSubmit();
    }
    verifySiteLogoIsDisplayed() {
        assert.assertElementIsVisible(eval(pageHeaderLoc.commonHeaderAndFooter.img_logo));
        logger.log("***** Assert  " + eval(pageHeaderLoc.commonHeaderAndFooter.img_logo).getAttribute('alt') + " Logo is displayed *****");
    }
    verifyHeaderAndFooterFields() {
        logger.log("***** Verifying Header and Footer Fields *****");
        this.verifySiteLogoIsDisplayed();
        let privacyPolicyLoc = this.getPrivacyPolicyLocator();
        let helpSupportLoc = this.getHelpSupportLocator();
        let locator_arr = {
            [pageHeaderLoc.commonHeaderAndFooter.lk_login]: pageHeaderContentState.headerAndFooterLabels.login,
            [helpSupportLoc]: pageHeaderContentState.headerAndFooterLabels.helpSupport,
            [privacyPolicyLoc]: pageHeaderContentState.headerAndFooterLabels.privacyPolicy
        };
   
        
        if(state.toUpperCase() == constants.STATE_NJ || state.toUpperCase() == constants.STATE_MN)
        assert.assertElementIsVisible(eval(pageHeaderLoc.commonHeaderAndFooter.lk_languageSelect));
        
        if(state.toUpperCase() == constants.STATE_MN)
        locator_arr[pageHeaderLocState.commonHeaderAndFooter.lk_learnMore] = pageHeaderContentState.headerAndFooterLabels.learnMore;

        assert.assetArrayOfElementsTextEquals(locator_arr);


        // clicking Help Support drop down to find if Local Assistance Link is available
        if(state.toUpperCase() != constants.STATE_MN)
        {
                browser.click(eval(helpSupportLoc));
                browser.waitUntil(()=>browser.isDisplayed(eval(pageHeaderLoc.commonHeaderAndFooter.lk_findLocalAssistance)));
                assert.assertEqualIgnoreCase(eval(pageHeaderLoc.commonHeaderAndFooter.lk_findLocalAssistance).getText(), pageHeaderContentState.headerAndFooterLabels.findLocalAssistance);
                browser.click(eval(helpSupportLoc));
        }
    }
    getPrivacyPolicyLocator() {
        let loc=pageHeaderLoc.commonHeaderAndFooter.lk_privacyPolicy.replace("index", 0);
        let privacyPolicyLocCount= $$('a*=Privacy Policy').length;
        if (privacyPolicyLocCount > 1)
            loc = pageHeaderLoc.commonHeaderAndFooter.lk_privacyPolicy.replace("index", (privacyPolicyLocCount-1));
        return loc;
    }
    getHelpSupportLocator()
    {
        let loc=pageHeaderLoc.commonHeaderAndFooter.lk_helpsupport;
        if(state.toUpperCase() == constants.STATE_MN)
        loc=pageHeaderLocState.commonHeaderAndFooter.lk_helpsupport;
        return loc;

    }
    verifyIconDisplayed(element, iconName) {
        assert.assertElementIsVisible(element);
        logger.log("***** Assert  " + iconName + " is displayed *****");
    }
    verifyHeaderAndFooterFieldsAfterLogInAsIndividual() {
        logger.log("***** Verifying Header and Footer Fields After User Logged In*****");
        this.verifySiteLogoIsDisplayed();
        this.verifyIconDisplayed(eval(pageHeaderLoc.commonHeaderAndFooter.home_icon), "Home Icon");
        this.verifyIconDisplayed(eval(pageHeaderLoc.commonHeaderAndFooter.mail_envelope), "Mail_Envelope Icon");

        let privacyPolicyLoc = this.getPrivacyPolicyLocator();
        let locator_arr2 = {
            [pageHeaderLoc.commonHeaderAndFooter.lk_helpsupport]: pageHeaderContentState.headerAndFooterLabels.helpSupport,
            [pageHeaderLocState.commonHeaderAndFooter.lk_myAccount]: pageHeaderContentState.headerAndFooterLabels.myAccount,
            [privacyPolicyLoc]: pageHeaderContentState.headerAndFooterLabels.privacyPolicy
        };
        assert.assetArrayOfElementsTextEquals(locator_arr2);

        browser.click(eval(pageHeaderLocState.commonHeaderAndFooter.lk_myAccount));
        let myaccount_locator_arr = {
            [pageHeaderLoc.commonHeaderAndFooter.lk_accountDashboard]: pageHeaderContentState.headerAndFooterLabels.dashboard,
            [pageHeaderLoc.commonHeaderAndFooter.lk_logout]: pageHeaderContentState.headerAndFooterLabels.logout
        };
        assert.assetArrayOfElementsTextEquals(myaccount_locator_arr);
        browser.click(eval(pageHeaderLocState.commonHeaderAndFooter.lk_myAccount));
    }

    verifyHeaderAndFooterFieldsForPrevilegedUser() {
        logger.log("***** Verifying Header and Footer Fields After Previleged User Logged In*****");
        this.verifySiteLogoIsDisplayed();

        if (state.toUpperCase() == constants.STATE_CA) {
            let headerLinksObj = {
                [pageHeaderLocState.lk_language]: pageHeaderContentState.headerAndFooterLabels.language,
                [pageHeaderLocState.lk_needHelp]: pageHeaderContentState.headerAndFooterLabels.needHelp,
                [pageHeaderLocState.lk_accountHome]: pageHeaderContentState.headerAndFooterLabels.accountHome,
                [pageHeaderLocState.lk_mySecurityProfile]: pageHeaderContentState.headerAndFooterLabels.mySecurityProfile
            };
            assert.assetArrayOfElementsTextEquals(headerLinksObj);
        }else{
            this.verifyIconDisplayed(eval(pageHeaderLoc.commonHeaderAndFooter.home_icon), "Home Icon");
            this.verifyIconDisplayed(eval(pageHeaderLoc.commonHeaderAndFooter.mail_envelope), "Mail_Envelope Icon");

            let privacyPolicyLoc = this.getPrivacyPolicyLocator();
            let locator_arr2 = {
                [pageHeaderLoc.commonHeaderAndFooter.lk_myAccount]: pageHeaderContentState.headerAndFooterLabels.myAccount,
                [privacyPolicyLoc]: pageHeaderContentState.headerAndFooterLabels.privacyPolicy
            };
            assert.assetArrayOfElementsTextEquals(locator_arr2);

            browser.click(eval(pageHeaderLoc.commonHeaderAndFooter.lk_myAccount));
            let myaccount_locator_arr = {
                [pageHeaderLoc.commonHeaderAndFooter.lk_accountDashboard]: pageHeaderContentState.headerAndFooterLabels.dashboard,
                [pageHeaderLoc.commonHeaderAndFooter.lk_accountSettings]: pageHeaderContentState.headerAndFooterLabels.accountSettings,
                [pageHeaderLoc.commonHeaderAndFooter.lk_logout]: pageHeaderContentState.headerAndFooterLabels.logout
            };
            assert.assetArrayOfElementsTextEquals(myaccount_locator_arr);
            browser.click(eval(pageHeaderLoc.commonHeaderAndFooter.lk_myAccount));
        }
    }

    clickFindLocalAssistance() {
        if(state.toUpperCase()=="PA"){
            browser.click(eval(stateLoc.lk_helpsupport));
            browser.click(eval(stateLoc.lk_findLocalAssistance));
            browser.switchToFrame(eval(stateLoc.findLocalAssistancePopupiframe));
        }else if(state.toUpperCase()=="CA"){
            browser.navigateToGivenUrl(agentAgencyConstants.AGENCY_URLS.brokerSearchURL);
        }else{
            browser.click(eval(locatorJson.commonHeaderAndFooter.lk_helpsupport));
            browser.click(eval(locatorJson.commonHeaderAndFooter.lk_findLocalAssistance));
            browser.switchToFrame(eval(locatorJson.findLocalAssistancePopupiframe));
        }
        logger.log("***** Header : " + eval(locatorJson.findLocalAssistanceHeader).getText() + " is displayed****");
    }
    clickFindCertifiedAgent() {
        browser.click(eval(pageHeaderLoc.lk_findCerifiedAgent));
        logger.log("***** Header : " + eval(pageHeaderLoc.searchAgentHeader).getText() + " is displayed****");
    }
    searchForCertifiedAgent() {
        let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
        let array = {
            tb_agent_firstName: global.updateDataJson.agencies[agencyIndex].Agent.tb_agent_firstName,
            tb_agent_lastName: global.updateDataJson.agencies[agencyIndex].Agent.tb_agent_lastName,
            tb_agent_businessName: global.updateDataJson.agencies[agencyIndex].Agent.tb_agent_businessName,
            btn_submit: ""
        };
        dataUtil.doFormFill(pageHeaderLoc, array);
        logger.log("***** Header : " + eval(pageHeaderLoc.agentsFoundHeader).getText() + " is displayed****");
    }
    verifySearchResult() {
        this.verifySearchResultsHeader();
        this.verifyResultsTableHeader();
        this.verifyCertifiedAgentDetailsFoundInSearchResult();

    }
    verifySearchResultsHeader() {
        let locator_arr = [eval(pageHeaderLoc.agentsFoundHeader), eval(pageHeaderLoc.lk_searchAgain)];
        assert.assertArrayOfElementsAreDisplayed(locator_arr);
    }
    verifyResultsTableHeader() {
        let locator_arr = [eval(pageHeaderLoc.lbl_name), eval(pageHeaderLoc.lbl_contactInfo), eval(pageHeaderLoc.lbl_prodExpert), eval(pageHeaderLoc.lbl_languages)];
        assert.assertArrayOfElementsAreDisplayed(locator_arr);
    }
    verifyCertifiedAgentDetailsFoundInSearchResult() {
        let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
        let phone = global.updateDataJson.agencies[agencyIndex].Agent.tb_agent_phone;
        let contactInfo_data = [global.updateDataJson.agencies[agencyIndex].Agent.tb_agent_businessName, global.updateDataJson.agencies[agencyIndex].Agent.tb_agent_businessAddress1, global.updateDataJson.agencies[agencyIndex].Agent.tb_agent_businessAddress2, global.updateDataJson.agencies[agencyIndex].Agent.tb_agent_BACity, states[global.updateDataJson.agencies[agencyIndex].Agent.sb_agent_BAState], global.updateDataJson.agencies[agencyIndex].Agent.tb_agent_BAZip, global.updateDataJson.agencies[agencyIndex].Agent.tb_agent_email, phone];
        let productExpertise_data = [global.updateDataJson.agencies[agencyIndex].Agent.cb_health, global.updateDataJson.agencies[agencyIndex].Agent.cb_dental];
        this.verifyAgentName(eval(pageHeaderLoc.agentNameSearchResult), global.updateDataJson.agencies[agencyIndex].Agent.tb_agent_firstName, global.updateDataJson.agencies[agencyIndex].Agent.tb_agent_lastName);
        this.verifyAgentContactInfo(eval(pageHeaderLoc.agentContactInfo), contactInfo_data);
        this.verifyAgentProductExpertise(eval(pageHeaderLoc.agentProdExpert), productExpertise_data);
        this.verifyAgentLanguages(eval(pageHeaderLoc.agentLanguages), global.updateDataJson.agencies[agencyIndex].Agent.tb_languages);
    }

    verifyAgentName(element, fName, lName) {
        assert.assertElementContainsText(element, fName + " " + lName);
        logger.log("***** Agent Name: " + element.getText() + " is  displayed****");
    }

    verifyAgentContactInfo(element, contactInfo_data) {
        for (let i = 0; i < contactInfo_data.length; i++)
            assert.assertElementContainsText(element, contactInfo_data[i]);
        logger.log("***** Agent Contact Info \n" + element.getText() + " is  displayed****");
    }


    verifyAgentProductExpertise(element, productExpertise_data) {

        for (let i = 0; i < productExpertise_data.length; i++) {
            assert.assertElementContainsText(element, productExpertise_data[i]);
        }
        logger.log("***** Agent Product Expertise \n" + element.getText() + " is  displayed****");
    }

    verifyAgentLanguages(element, lang_arr) {
        for (let i = 0; i < lang_arr.length; i++) {
            let language = lang_arr[i];
            assert.assertElementContainsText(element, language);
        }
        logger.log("***** Agent Languages \n" + element.getText() + " is  displayed****");
    }

    clickOnTheAgentNameFromSearchResult() {
        browser.click(eval(pageHeaderLoc.agentNameSearchResult));
        logger.log("***** Header : " + eval(pageHeaderLoc.agentSelectionHeader).getText() + " is displayed****");
    }
    verifyAgentProfile() {
        this.verifyAgentProfileHeaderAndFooter();
        this.verifyTheAgentProfileDetails();
    }
    verifyAgentProfileHeaderAndFooter() {
        let locator_arr = [eval(pageHeaderLoc.lbl_agentSelection), eval(pageHeaderLoc.lbl_agentSelectionTxt), eval(pageHeaderLoc.btn_Back), eval(pageHeaderLoc.lk_searchAgain), eval(pageHeaderLoc.agentProfile_footer)];
        assert.assertArrayOfElementsAreDisplayed(locator_arr);
        browser.click(eval(pageHeaderLoc.agentProfile_footer));
        locator_arr = [eval(pageHeaderLoc.agentProfile_footerTxt1), eval(pageHeaderLoc.agentProfile_footerTxt2), eval(pageHeaderLoc.agentProfile_footerTxt3), eval(pageHeaderLoc.agentProfile_footerTxt4)];
        assert.assertArrayOfElementsAreDisplayed(locator_arr);
    }
    verifyTheAgentProfileDetails() {
        let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
        let phone = global.updateDataJson.agencies[agencyIndex].Agent.tb_agent_phone;
        let contactInfo_data = [global.updateDataJson.agencies[agencyIndex].Agent.tb_agent_businessAddress1, global.updateDataJson.agencies[agencyIndex].Agent.tb_agent_businessAddress2, global.updateDataJson.agencies[agencyIndex].Agent.tb_agent_BACity, states[global.updateDataJson.agencies[agencyIndex].Agent.sb_agent_BAState], global.updateDataJson.agencies[agencyIndex].Agent.tb_agent_BAZip, global.updateDataJson.agencies[agencyIndex].Agent.tb_agent_email, phone];
        let productExpertise_data = [global.updateDataJson.agencies[agencyIndex].Agent.cb_health, global.updateDataJson.agencies[agencyIndex].Agent.cb_dental];
        this.verifyAgentName(eval(pageHeaderLoc.agentProfile_name), global.updateDataJson.agencies[agencyIndex].Agent.tb_agent_firstName, global.updateDataJson.agencies[agencyIndex].Agent.tb_agent_lastName);
        this.verifyAgentContactInfo(eval(pageHeaderLoc.agentProfile_contactInfo), contactInfo_data);
        this.verifyAgentProductExpertise(eval(pageHeaderLoc.agentProfile_prodExpert), productExpertise_data);
        this.verifyAgentLanguages(eval(pageHeaderLoc.agentProfile_languages), global.updateDataJson.agencies[agencyIndex].Agent.tb_languages);
        this.verifyAgentSateLicence(eval(pageHeaderLoc.agentProfile_statelic), global.updateDataJson.agencies[agencyIndex].Agent.tb_agent_licenceNumber);
        this.verifyAgentClentsServed(eval(pageHeaderLoc.agentProfile_clientsServered), global.updateDataJson.agencies[agencyIndex].Agent.cb_clientsServed);
    }
    verifyAgentSateLicence(element, licence) {
        assert.assertElementContainsText(element, licence);
        logger.log("***** Agent State Licence \n" + element.getText() + " is  displayed****");
    }
    verifyAgentClentsServed(element, clents) {
        assert.assertElementContainsText(element, clents);
        logger.log("***** Clients Served \n" + element.getText() + " is  displayed****");
    }

    searchForCertifiedAgencyManager() //MOVED// same as searchForCertifiedAgent() will be changed after Add agent is implemented //moved
    {  
        let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
        let array = {
            tb_agent_firstName: global.updateDataJson.agencies[agencyIndex].agent.firstName,
            tb_agent_lastName: global.updateDataJson.agencies[agencyIndex].agent.lastName,
            tb_agent_businessName: global.updateDataJson.agencies[agencyIndex].agency.agencyName,
            btn_submit: ""
        };
        
        dataUtil.doFormFill(locatorJson, array);
        browser.pauseBrowser(constants.PAUSE_BROWSER_2000);
        logger.log("*****======== Header : " + eval(locatorJson.agentsFoundHeader).getText() + " is displayed****");
    };

    verifyAgentIsFound() {
        let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
        this.verifyAgentName(eval(locatorJson.agentNameInSearchResultTable),
        global.updateDataJson.agencies[agencyIndex].agent.firstName, global.updateDataJson.agencies[agencyIndex].agent.lastName);
    }
 
    
    
}

module.exports = new PageHeader();

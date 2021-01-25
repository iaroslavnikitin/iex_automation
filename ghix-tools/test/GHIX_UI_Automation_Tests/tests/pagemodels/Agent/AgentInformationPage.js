const state = stateProfile;
const  global = require('../Global_include');
const constants = require('../../common.utils/Constants');

const browser = require("../../base/Browser.js");
const assert = require("../../base/Assert.js");
const dataUtil = require("../../common.utils/DataUtil");
const  jsonUtil = require('../../common.utils/JsonUtil');
const  logger = require('../../common.utils/LoggerUtil');

const agentInformationLocators=require('../../../resources/selectors/common/Agent/AgentInformationPage.json');
const agentInformationPageContent = require('../../../resources/content/common/Agent/AgentInformationPage.content');

const commonfunc = require('./CommonAgentFunction');
const random = require('../../common.utils/RandomDataGenerator.js')
const dateUtil=require('../../common.utils/CommonDateFunction');

const address = require('../../../resources/data/address');


class AgentInformationPage
{

    enterFirstAndLastName()
    {
        let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
        browser.setValueInTextField(eval(agentInformationLocators.tb_agent_firstName),global.updateDataJson.agencies[agencyIndex].agent.firstName);
        browser.setValueInTextField(eval(agentInformationLocators.tb_agent_lastName),global.updateDataJson.agencies[agencyIndex].agent.lastName);
    }
    fillAgentInformationPageDetails(independentAgent) {
        let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
        //browser.pauseBrowser(constants.PAUSE_BROWSER_2000);
        browser.waitForPageToLoadAndCheckPartialHeaderText(eval(agentInformationLocators.rightPanelHeader),agentInformationPageContent.rightPanelHeader);
        logger.log("***** On Agent Information Page*****");
       // logger.log("***** Verifying Pre-Populated Fields On Agent Information Page *****")
       // this.verifyPrepopulatedFieldsOnAgentRegistration();
        logger.log("***** Entering Remaining Agent Information *****");
        //this.fillRegistrationDetails();
        this.setAgentInformationData();

        if(!independentAgent)
            global.updateDataJson.agencies[agencyIndex].agent.username=global.updateDataJson.agencies[agencyIndex].agent.personalEmail;

        logger.log("AGENT EMAIL=" + global.updateDataJson.agencies[agencyIndex].agent.email );
        logger.log("AGENT personalEmail=" + global.updateDataJson.agencies[agencyIndex].agent.personalEmail );
        logger.log("AGENT USERNAME=" + global.updateDataJson.agencies[agencyIndex].agent.username + " PASSWORD "+global.updateDataJson.agencies[agencyIndex].agent.password);
        //browser.pauseBrowser(2000);
        let phoneArr = global.updateDataJson.agencies[agencyIndex].agent.primaryContact.split("-");
        let phoneArr_business = global.updateDataJson.agencies[agencyIndex].agency.businessContact.split("-");
        let phoneArr_alt = global.updateDataJson.agencies[agencyIndex].agent.alternatePhone.split("-");
        let faxNum_arr = global.updateDataJson.agencies[agencyIndex].agent.faxNumber.split("-");
        let agentInformationMapping = {
                tb_agent_licenceNumber: global.updateDataJson.agencies[agencyIndex].agent.licenceNumber,
                tb_agent_npn: global.updateDataJson.agencies[agencyIndex].agent.npn,
                tb_agent_licenceRenewDate: global.updateDataJson.agencies[agencyIndex].agent.licenceRenewDate,
                tb_agent_primaryContactP1: phoneArr[0],
                tb_agent_primaryContactP2: phoneArr[1],
                tb_agent_primaryContactP3: phoneArr[2],
                tb_agent_businessContactP1: phoneArr_business[0],
                tb_agent_businessContactP2: phoneArr_business[1],
                tb_agent_businessContactP3: phoneArr_business[2],
                tb_agent_alternatePhoneP1: phoneArr_alt[0],
                tb_agent_alternatePhoneP2: phoneArr_alt[1],
                tb_agent_alternatePhoneP3: phoneArr_alt[2],
                tb_agent_faxNumber1: faxNum_arr[0],
                tb_agent_faxNumber2: faxNum_arr[1],
                tb_agent_faxNumber3: faxNum_arr[2],
                sb_agent_methodOfCommunication: global.updateDataJson.agencies[agencyIndex].agent.prefferedMethodOfCommunication,
                tb_agent_businessName: global.updateDataJson.agencies[agencyIndex].agency.businessName,
                tb_agent_EIN: global.updateDataJson.agencies[agencyIndex].agency.EIN,
                // tb_agent_businessAddress1: global.updateDataJson.agencies[agencyIndex].agency.businessAddress1,
                // tb_agent_BACity: global.updateDataJson.agencies[agencyIndex].agency.BACity,
                // sb_agent_BAState: global.updateDataJson.agencies[agencyIndex].agency.BAState,
                 //tb_agent_BAZip: global.updateDataJson.agencies[agencyIndex].agent.BAZip,
            };

            if(state.toUpperCase() == constants.STATE_ID)
            {
                delete agentInformationMapping['tb_agent_npn'];
                agentInformationMapping.tb_agent_personalEmailAddress = global.updateDataJson.agencies[agencyIndex].agent.personalEmail;
            }
            if(state.toUpperCase()==constants.STATE_PA)
            {
                agentInformationMapping.tb_agent_individualEmail=global.updateDataJson.agencies[agencyIndex].agent.personalEmail;
            }
            //agentInformationMapping.tb_agent_BAZip = global.updateDataJson.agencies[agencyIndex].agency.BAZip;
            if(!independentAgent)
            {
             delete agentInformationMapping['tb_agent_businessName'];
             agentInformationMapping.sb_agency_location=global.updateDataJson.agencies[agencyIndex].agent.businessLocation;
             agentInformationMapping.tb_agent_CorrespondenceAddress1= global.updateDataJson.agencies[agencyIndex].agent.CorrespondenceAddress1;
             agentInformationMapping.tb_agent_CACity= global.updateDataJson.agencies[agencyIndex].agent.CACity;
             agentInformationMapping.sb_agent_CAState= global.updateDataJson.agencies[agencyIndex].agent.CAState;
             agentInformationMapping.tb_agent_CAZip = global.updateDataJson.agencies[agencyIndex].agent.CAZip;

            }
            else
            {
                agentInformationMapping.tb_agent_businessAddress1= global.updateDataJson.agencies[agencyIndex].agency.businessAddress1,
                agentInformationMapping.tb_agent_BACity= global.updateDataJson.agencies[agencyIndex].agency.BACity,
                agentInformationMapping.sb_agent_BAState= global.updateDataJson.agencies[agencyIndex].agency.BAState,
                agentInformationMapping.tb_agent_BAZip = global.updateDataJson.agencies[agencyIndex].agency.BAZip
            }
            //add to verify agency name
            dataUtil.doFormFill(agentInformationLocators, agentInformationMapping);
            //There is a pop up that validates zip code. It appears for a second and disappears
            // browser.waitForElementToDisplay(eval(agentInformationLocators.zipValidatePopup));
            if(independentAgent)
            {browser.removeFocus(eval(agentInformationLocators.tb_agent_BAZip));}
            else {
                browser.removeFocus(eval(agentInformationLocators.tb_agent_CAZip));
            }
            commonfunc.confirmAddress();
        if(independentAgent)  browser.click(eval(agentInformationLocators.cb_mailAddress));
            //this.verifyCorrespondenceAddress();
            browser.click(eval(agentInformationLocators.btn_next));
            //logger.log("***** Header of Profile Page: "+eval(agentInformationLocators.pageHeader).getText()+" *****");
        browser.waitForElementToBeInvisible(eval(agentInformationLocators.btn_next));
        logger.log("***** Agent Information Page Submitted *****");


        }

    verifyPrepopulatedFieldsOnAgentRegistration()
    {
        let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
        browser.waitForPageToLoadAndCheckPartialHeaderText(eval(agentInformationLocators.rightPanelHeader),agentInformationPageContent.rightPanelHeader);
        logger.log("***** Verifying Pre-Populated Fields On Agent Information Page *****")
        let locator_arr=[eval(agentInformationLocators.tb_agent_firstName),eval(agentInformationLocators.tb_agent_lastName)];
        let data_arr=[global.updateDataJson.agencies[agencyIndex].agent.firstName,global.updateDataJson.agencies[agencyIndex].agent.lastName];
        for(let i=0;i<locator_arr.length;i++)
            assert.assertEqual(browser.getAttributeValue(locator_arr[i],'value'),data_arr[i]);
        logger.log("*** Prepopulated Fields Verified ***");
    }

    setAgentInformationData()
    {
        let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
        if (jsonUtil.isFieldEmpty(global.updateDataJson.agencies[agencyIndex].agent.licenceNumber)) {
            global.updateDataJson.agencies[agencyIndex].agent.licenceNumber = random.getRandomString(10, true);
        }
        if (jsonUtil.isFieldEmpty(global.updateDataJson.agencies[agencyIndex].agent.npn)) {
            global.updateDataJson.agencies[agencyIndex].agent.npn = random.getRandomString(10, true);
        }
        if (jsonUtil.isFieldEmpty(global.updateDataJson.agencies[agencyIndex].agent.licenceRenewDate)) {
            global.updateDataJson.agencies[agencyIndex].agent.licenceRenewDate = dateUtil.addYearsToDateToday(3,"MM-DD-YYYY");
        }
        if (jsonUtil.isFieldEmpty(global.updateDataJson.agencies[agencyIndex].agent.personalEmail)) {
            global.updateDataJson.agencies[agencyIndex].agent.personalEmail = random.getRandomEmail(global.updateDataJson.agencies[agencyIndex].agent.firstName);
        }
        if (jsonUtil.isFieldEmpty(global.updateDataJson.agencies[agencyIndex].agent.primaryContact)) {
            global.updateDataJson.agencies[agencyIndex].agent.primaryContact = random.getRandomPhoneNumber();
        }
        if (jsonUtil.isFieldEmpty(global.updateDataJson.agencies[agencyIndex].agency.businessName)) {
            global.updateDataJson.agencies[agencyIndex].agency.businessName = random.getRandomBusinessName()+" "+random.getRandomString(3,false);
        }
        if (jsonUtil.isFieldEmpty(global.updateDataJson.agencies[agencyIndex].agent.EIN)) {
            global.updateDataJson.agencies[agencyIndex].agency.EIN = random.getRandomString(9, true);
        }
        if (jsonUtil.isFieldEmpty(global.updateDataJson.agencies[agencyIndex].agency.businessAddress1)) {
            global.updateDataJson.agencies[agencyIndex].agency.businessAddress1 = address[state].address.addressLine1;
        }
        if (jsonUtil.isFieldEmpty(global.updateDataJson.agencies[agencyIndex].agency.businessAddress2)) {
            global.updateDataJson.agencies[agencyIndex].agency.businessAddress2 = address[state].address.addressLine2;
        }
        if (jsonUtil.isFieldEmpty(global.updateDataJson.agencies[agencyIndex].agency.BACity)) {
            global.updateDataJson.agencies[agencyIndex].agency.BACity = address[state].address.city;
        }
        if (jsonUtil.isFieldEmpty(global.updateDataJson.agencies[agencyIndex].agency.BAState)) {
            global.updateDataJson.agencies[agencyIndex].agency.BAState = address[state].address.state;
        }
        if (jsonUtil.isFieldEmpty(global.updateDataJson.agencies[agencyIndex].agency.BAZip)) {
            global.updateDataJson.agencies[agencyIndex].agency.BAZip = address[state].address.zip;
        }
        if (jsonUtil.isFieldEmpty(global.updateDataJson.agencies[agencyIndex].agent.businessContact)) {
            global.updateDataJson.agencies[agencyIndex].agency.businessContact = random.getRandomPhoneNumber();
        }
        if (jsonUtil.isFieldEmpty(global.updateDataJson.agencies[agencyIndex].agent.alternatePhone)) {
            global.updateDataJson.agencies[agencyIndex].agent.alternatePhone = random.getRandomPhoneNumber();
        }
        if (jsonUtil.isFieldEmpty(global.updateDataJson.agencies[agencyIndex].agent.faxNumber)) {
            global.updateDataJson.agencies[agencyIndex].agent.faxNumber = random.getRandomPhoneNumber();
        }


        if (jsonUtil.isFieldEmpty(global.updateDataJson.agencies[agencyIndex].agent.CorrespondenceAddress1)) {
            global.updateDataJson.agencies[agencyIndex].agent.CorrespondenceAddress1 = address[state].address.addressLine1;
        }
        if (jsonUtil.isFieldEmpty(global.updateDataJson.agencies[agencyIndex].agent.CorrespondenceAddress2)) {
            global.updateDataJson.agencies[agencyIndex].agent.CorrespondenceAddress2 = address[state].address.addressLine2;
        }
        if (jsonUtil.isFieldEmpty(global.updateDataJson.agencies[agencyIndex].agent.CACity)) {
            global.updateDataJson.agencies[agencyIndex].agent.CACity = address[state].address.city;
        }
        if (jsonUtil.isFieldEmpty(global.updateDataJson.agencies[agencyIndex].agent.CAState)) {
            global.updateDataJson.agencies[agencyIndex].agent.CAState = address[state].address.state;
        }
        if (jsonUtil.isFieldEmpty(global.updateDataJson.agencies[agencyIndex].agent.CAZip)) {
            global.updateDataJson.agencies[agencyIndex].agent.CAZip = address[state].address.zip;
        }


    }
}

module.exports = new AgentInformationPage();

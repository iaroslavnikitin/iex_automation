const  global = require('../Global_include');
const constants = require('../../common.utils/Constants');

const browser = require("../../base/Browser.js");
const dataUtil = require("../../common.utils/DataUtil");
const  jsonUtil = require('../../common.utils/JsonUtil');
const  logger = require('../../common.utils/LoggerUtil');

const setupPageLocators=require('../../../resources/selectors/common/Agent/AgentAccountSetupPage.json');
const loginPageLocators=require('../../../resources/selectors/common/UserAccountManagement/LogInObject.json')
const agentAccountSetupContent =require('../../../resources/content/common/Agent/AgentAccountSetupPage.content');
const random = require('../../common.utils/RandomDataGenerator.js')
const accountSetupPageLoc=require('../../../resources/selectors/common/Agent/AgentAccountSetupPage.json');




class AgentAccountSetupPage
{
    setAgentDetails()       {
        let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
        if (jsonUtil.isFieldEmpty(global.updateDataJson.agencies[agencyIndex].agent.firstName))
        {
            global.updateDataJson.agencies[agencyIndex].agent.firstName= random.getRandomFirstName();
        }
        if (jsonUtil.isFieldEmpty(global.updateDataJson.agencies[agencyIndex].agent.lastName))
        {
            global.updateDataJson.agencies[agencyIndex].agent.lastName = random.getRandomLastName();
        }
        if (jsonUtil.isFieldEmpty(global.updateDataJson.agencies[agencyIndex].agent.email))
        {
            global.updateDataJson.agencies[agencyIndex].agent.email = random.getRandomEmail(global.updateDataJson.agencies[agencyIndex].agent.firstName);
        }
        if (jsonUtil.isFieldEmpty(global.updateDataJson.agencies[agencyIndex].agent.username))
        {
            global.updateDataJson.agencies[agencyIndex].agent.username=global.updateDataJson.agencies[agencyIndex].agent.email;
        }

        if (jsonUtil.isFieldEmpty(global.updateDataJson.agencies[agencyIndex].agent.confirmEmail)) {
            global.updateDataJson.agencies[agencyIndex].agent.confirmEmail = global.updateDataJson.agencies[agencyIndex].agent.email;
        }
        if (jsonUtil.isFieldEmpty(global.updateDataJson.agencies[agencyIndex].agent.phone)) {
            global.updateDataJson.agencies[agencyIndex].agent.phone = random.getRandomPhoneNumber();
        }
        let securityQuestionAnswer =random.getRandomSecurityQuestionAnswer();
        if (jsonUtil.isFieldEmpty(global.updateDataJson.agencies[agencyIndex].agent.securityQuestion)) {
            global.updateDataJson.agencies[agencyIndex].agent.securityQuestion = securityQuestionAnswer[0];
        }
        if (jsonUtil.isFieldEmpty(global.updateDataJson.agencies[agencyIndex].agent.securityAnswer)) {
            global.updateDataJson.agencies[agencyIndex].agent.securityAnswer = securityQuestionAnswer[1];
        }
        if (jsonUtil.isFieldEmpty(global.updateDataJson.agencies[agencyIndex].agent.password))
        {
            global.updateDataJson.agencies[agencyIndex].agent.password=constants.COMMON_PASSWORD;
        }

        logger.log("***** Agent Details are generated and saved to global.updateDataJson.agencies[agencyIndex]");


    }

    fillAccountSetupPageDetails() {
        let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
        browser.waitForPageToLoadAndCheckPartialHeaderText(eval(setupPageLocators.pageHeader),agentAccountSetupContent.pageHeader);
        logger.log("***** On Agent Account Setup Page*****");
        let phoneArr = global.updateDataJson.agencies[agencyIndex].agent.phone.split("-");
        let accountSetupPageDetails = {
            tb_agent_firstName: global.updateDataJson.agencies[agencyIndex].agent.firstName,
            tb_agent_lastName: global.updateDataJson.agencies[agencyIndex].agent.lastName,
            tb_agent_email: global.updateDataJson.agencies[agencyIndex].agent.email,
            tb_agent_confirmEmail: global.updateDataJson.agencies[agencyIndex].agent.email,
            tb_agent_Phone1:phoneArr[0],
            tb_agent_Phone2: phoneArr[1],
            tb_agent_Phone3:phoneArr[2],
            sb_agent_securityQues: global.updateDataJson.agencies[agencyIndex].agent.securityQuestion,
            tb_agent_securityAnswers: global.updateDataJson.agencies[agencyIndex].agent.securityAnswer,
            tb_agent_password: global.updateDataJson.agencies[agencyIndex].agent.password,
            tb_agent_confirmPassword: global.updateDataJson.agencies[agencyIndex].agent.password,
            cb_agent_cbTerms: global.updateDataJson.agencies[agencyIndex].agent.cbTerms,
            btn_agent_submit: global.updateDataJson.agencies[agencyIndex].agent.submit,
        };
        dataUtil.doFormFill(accountSetupPageLoc, accountSetupPageDetails);
        browser.pauseBrowser(constants.PAUSE_BROWSER_2000);


        if (eval(setupPageLocators.btn_Continue).isDisplayed()) {// move to single method for all ID related Continue button
            browser.click(eval(setupPageLocators.btn_Continue));
            browser.setValueInTextField(eval(loginPageLocators.tb_username_id), global.updateDataJson.agencies[agencyIndex].agent.email);
            browser.setValueInTextField(eval(loginPageLocators.tb_password_id), global.updateDataJson.agencies[agencyIndex].agent.password)
            browser.click(eval(loginPageLocators.btn_submit));
        }
        browser.waitForElementToBeInvisible(eval(setupPageLocators.btn_agent_submit));
        logger.log("*** Agent Account Setup Page Submitted***")
       // browser.waitForPageToLoad(eval(agentLoc.pageHeader), agentSignUpContent.registrationPageHeader);
    }


}
module.exports = new AgentAccountSetupPage();

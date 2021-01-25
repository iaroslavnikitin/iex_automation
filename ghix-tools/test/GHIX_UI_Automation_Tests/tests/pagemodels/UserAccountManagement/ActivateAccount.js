var locatorJson = require('../../../resources/selectors/common/UserAccountManagement/ActivateAccountObject.json');
const entityContent = require('../../../resources/content/common/Entity/AccountSetup.content.js');
var global = require('../Global_include');
const assert = require('../../base/Assert');
const browser = require('../../base/Browser');
const jsonUtil = require('../../common.utils/JsonUtil');
const DbHelper = require('../../common.utils/DbHelper');
var dbHelper = new DbHelper(url);
var activationCode = null;
const logger=require('../../common.utils/LoggerUtil');
const agentAccountSetupContent =require('../../../resources/content/common/Agent/AgentAccountSetupPage.content');
const dataUtil =require('../../common.utils/DataUtil')
const random =require('../../common.utils/RandomDataGenerator')
const constants=require('../../common.utils/Constants')

class ActivateAccount {


    getActivationUrl(email) {
        this.buildActivationUrl(email);
        browser.pauseBrowser(5000);
        browser.waitForElementToDisplay(eval(locatorJson.btn_submitBtn));
        browser.click(eval(locatorJson.btn_submitBtn));
    }

    buildActivationUrl(email) {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        var dataJson = global.updateDataJson.households[householdIndex];
        var query = "select token from account_activation where json_string ::jsonb-> 'createdObject' ->> 'emailId' = '" + email + "' order by sent_date desc";
        logger.log(query);
        dbHelper.getResultFromDB(query, 'token').then((token) => {
            var activationUrl = url + "account/user/activation/" + token
            logger.log("***** Activation URL : "+activationUrl +"  ******")
            browser.navigateToGivenUrl(activationUrl);
        }).catch(err => {
            console.error(err);
        });
        logger.log("*****Activation URL is Constructed *****");
        //browser.waitForPageToLoad(eval(locatorJson.hd_yourInformation),entityContent.yourInformation);
    }
    async getActivationCode(email) {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        var dataJson = global.updateDataJson.households[householdIndex];
        var query = "select activation_code from account_activation where json_string ::jsonb-> 'createdObject' ->> 'emailId' = '" + email + "' order by sent_date desc";
        logger.log(query);
        activationCode = await dbHelper.getResultFromDB(query, 'activation_code');
        logger.log("activation code"+activationCode)
        logger.log("*****Got Activation Code From DB*****");
    }

    submitActivationCode(email,content) {
        activationCode=null;
        this.getActivationCode(email);
        browser.waitUntil(() => activationCode !== null);
        logger.log("activationCode : " + activationCode);
        browser.setValueInTextField(eval(locatorJson.tb_verificationCode), activationCode);
        browser.click(eval(locatorJson.btn_verifycode_btn));
        logger.log("*****Submitted Activation Code*****");
        //browser.waitForPageToLoad(eval(locatorJson.lb_AccountSetUp),content);
    }


    verifyAccountSetUpPage() {
        browser.waitForElementToDisplay(eval(locatorJson.lb_AccountSetUp));
        assert.assertElementContainsText(eval(locatorJson.lb_AccountSetUp), entityContent.accountSetupHeader);
        logger.log("*****Verfied Account SetUp Page*****");
    }
    activateAgentAccount(){
        let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
        var dataJson = global.updateDataJson.agencies[agencyIndex];
        this.getActivationUrl(dataJson.agent.personalEmail);
        this.submitActivationCode(dataJson.agent.personalEmail,agentAccountSetupContent.pageHeader);
        browser.waitForPageToLoadAndCheckPartialHeaderText(eval(locatorJson.lb_AccountSetUp),agentAccountSetupContent.pageHeader)

    }
    // activateUserAccount(role) //common
    // {
    //     let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
    //     var dataJson = global.updateDataJson.households[householdIndex];
    //     this.getActivationUrl(dataJson[role].personalEmail);
    //     this.submitActivationCode(dataJson[role].personalEmail,"Account Set-Up");
    //     browser.waitForPageToLoadAndCheckPartialHeaderText(eval(locatorJson.lb_AccountSetUp),"Account Set-Up")
    //
    // }
//test
    activateUserAccount(userRole,index) //common
    {   
        let globalJsonIndex = 0;
        var dataJson;
        if (userRole == "agencyManager" || userRole == "adminStaffs" || userRole == "agent") {
            globalJsonIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
            dataJson = global.updateDataJson.agencies[globalJsonIndex][userRole][index];
        }else{
            globalJsonIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
            dataJson = global.updateDataJson.households[globalJsonIndex][userRole][index];
        }
        
        this.getActivationUrl(dataJson.personalEmail);
        this.submitActivationCode(dataJson.personalEmail,"Account Set-Up");
        browser.waitForPageToLoadAndCheckPartialHeaderText(eval(locatorJson.lb_AccountSetUp),"Account Set-Up")

    }
//used for ADD agent test. Refactor to use setUpUserAccount()
    setUpAccount(role)
    {
        let globalJsonIndex = 0;
        var dataJson;
        if (role == "agencyManager" || role == "adminStaffs" || role == "agent") {
            globalJsonIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
            dataJson = global.updateDataJson.agencies[globalJsonIndex][role];
        }else{
            globalJsonIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
            dataJson = global.updateDataJson.households[globalJsonIndex][role];
        }

        var array = {
            tb_confirmEmail: dataJson.personalEmail,
            sb_agent_securityQues: 1,
            tb_agent_securityAnswers: "automation",
            tb_password: dataJson.password,
            tb_confirmPassword: dataJson.password,
            cb_terms: "",
            btn_submitbtn: ""
        }

        dataUtil.doFormFill(locatorJson, array);
        logger.log("*****Account Setup Is Done*****");
    }

    setupUserAccount(userRole,index)
    {   
        if(index=="" || index==null|| index== undefined) index=0;
        // let userObjectData=global.updateDataJson.households[householdIndex][userRole][index];
        // global.updateDataJson.households[householdIndex][userRole][index]=this.setupUserData(userObjectData);

        let globalJsonIndex = 0;
        var dataJson;
        if (userRole == "agencyManager" || userRole == "adminStaffs" || userRole == "agent") {
            globalJsonIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
            dataJson = global.updateDataJson.agencies[globalJsonIndex][userRole][index];
        }else{
            globalJsonIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
            dataJson = global.updateDataJson.households[globalJsonIndex][userRole][index];
        }

        dataJson=this.setupUserData(dataJson);
        var array = {
            tb_confirmEmail: dataJson.confirmEmail,
            sb_agent_securityQues: dataJson.securityQuestion,
            tb_agent_securityAnswers: dataJson.securityAnswer,//"automation",
            tb_password: dataJson.password,
            tb_confirmPassword: dataJson.password,
            cb_terms: "",
            btn_submitbtn: ""
        }


        dataUtil.doFormFill(locatorJson, array);
        logger.log("*****Account Setup Is Done*****");
    }

    setupUserData(userObjectData)
    {
        if (jsonUtil.isFieldEmpty(userObjectData.username))
        {
            userObjectData.username=userObjectData.personalEmail;
        }

        if (jsonUtil.isFieldEmpty(userObjectData.confirmEmail)) {
            userObjectData.confirmEmail = userObjectData.username;
        }
        // if (jsonUtil.isFieldEmpty(global.updateDataJson.households[householdIndex][role].phone)) {
        //     global.updateDataJson.households[householdIndex][role].phone = random.getRandomPhoneNumber();
        // }
        let securityQuestionAnswer =random.getRandomSecurityQuestionAnswer();
        if (jsonUtil.isFieldEmpty(userObjectData.securityQuestion)) {
            userObjectData.securityQuestion = securityQuestionAnswer[0];
        }
        if (jsonUtil.isFieldEmpty(userObjectData.securityAnswer)) {
            userObjectData.securityAnswer = securityQuestionAnswer[1];
        }
        if (jsonUtil.isFieldEmpty(userObjectData.password))
        {
            userObjectData.password=constants.COMMON_PASSWORD;
        }

        logger.log("***** User Details are generated and saved to global.updateDataJson");
        return userObjectData;
    }

}

module.exports = new ActivateAccount();
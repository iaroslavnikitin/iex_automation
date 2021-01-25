const accessCodeObj = require('../../../resources/selectors/common/UserAccountManagement/AccessCodeRegistrationObject.json');
const referralLinkObj = require('../../../resources/selectors/common/UserAccountManagement/ReferralLinkingPageObject.json');
var indSignUpObj = require('../../../resources/selectors/common/UserAccountManagement/IndividualSignupPageObject.json');
const entityContent = require('../../../resources/content/common/Entity/AccountSetup.content.js');
const global = require('../Global_include');
const assert = require('../../base/Assert');
const browser = require('../../base/Browser');
const dataUtil = require('../../common.utils/DataUtil');
const prop = require('../../common.utils/PropertyReader');
var state = prop.getEnvName();
const logger = require('../../common.utils/LoggerUtil');


class ActivateAccount {

    clickRegisterWithAccessCode() {
        logger.log("***** Home Page Register With Access Code *****");
        browser.navigateToGivenUrl(url);
        if (stateProfile.toUpperCase() === "PA") {
            browser.waitForElementToDisplay(eval(accessCodeObj.btn_accessCode));
            browser.click(eval(accessCodeObj.btn_accessCode));
        }
        else if (stateProfile.toUpperCase() === "NJ"){
            browser.waitForElementToDisplay(eval(accessCodeObj.btn_accessCodeNJ));
            browser.click(eval(accessCodeObj.btn_accessCodeNJ));
        }
    }

    navigateToAccessCodePage() {
        logger.log("***** Navigating To Access Code Page *****");
        browser.navigateToGivenUrl(`${url}accessCode`);
    }

    enterAccessCode(accessCode) {
        logger.log("***** Enter Access Code *****");
        browser.waitForElementToDisplay(eval(accessCodeObj.txt_accessCode));
        browser.setValueInTextField(eval(accessCodeObj.txt_accessCode), accessCode);

        browser.waitForDisplayAndClick(eval(accessCodeObj.btn_submit));
    }


    enterReferralLinkingInfo() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        logger.log("***** Referral Linking Page *****");
        browser.waitForElementToDisplay(eval(referralLinkObj.txt_firstName));
        browser.setValueInTextField(eval(referralLinkObj.txt_firstName), global.updateDataJson.households[householdIndex].applicants[0].firstName);
        browser.setValueInTextField(eval(referralLinkObj.txt_lastName), global.updateDataJson.households[householdIndex].applicants[0].lastName);
        browser.setValueInTextField(eval(referralLinkObj.txt_birthDate), global.updateDataJson.households[householdIndex].applicants[0].dateOfBirth);
        if (eval(referralLinkObj.rb_GenderMale).isDisplayed()){
            switch(global.updateDataJson.households[householdIndex].applicants[0].gender) {
                case "Male":
                    browser.click(eval(referralLinkObj.rb_GenderMale));
                    break;
                case "Female":
                    browser.click(eval(referralLinkObj.rb_GenderFemale));
                    break;
                default:
                    throw (`Gender is not provided`);
            }
        }
        if (eval(referralLinkObj.txt_county).isDisplayed()){
            browser.setValueInTextField(eval(referralLinkObj.txt_county), global.updateDataJson.households[householdIndex].primaryAddress.mailing.countyName);
        }
        if (eval(referralLinkObj.txt_zipCode).isDisplayed()){
            browser.setValueInTextField(eval(referralLinkObj.txt_zipCode), global.updateDataJson.households[householdIndex].primaryAddress.mailing.zip);
        }
        if (eval(referralLinkObj.txt_email).isDisplayed()){
            browser.setValueInTextField(eval(referralLinkObj.txt_email), global.updateDataJson.households[householdIndex].applicants[0].email);
        }
        if (eval(referralLinkObj.txt_phoneNumber).isDisplayed()){
            browser.setValueInTextField(eval(referralLinkObj.txt_phoneNumber), global.updateDataJson.households[householdIndex].primaryContactPhone.mobile);
        }
        if (eval(referralLinkObj.txt_householdTotal).isDisplayed()){
            browser.setValueInTextField(eval(referralLinkObj.txt_householdTotal), global.updateDataJson.households[householdIndex].applicants.length);
        }

        browser.waitForDisplayAndClick(eval(accessCodeObj.btn_submit));
    }


    setUpIndividualAccountInboundAT() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        logger.log("email=" + global.updateDataJson.households[householdIndex].applicants[0].email + " firstname= " + global.updateDataJson.households[householdIndex].applicants[0].firstName);
        //Format Phone and SSN
        var phoneArr = global.updateDataJson.households[householdIndex].primaryContactPhone.mobile.split("-");
        let ssnArr = [global.updateDataJson.households[householdIndex].applicants[0].ssn.substring(0,3),
            global.updateDataJson.households[householdIndex].applicants[0].ssn.substring(3,5),
            global.updateDataJson.households[householdIndex].applicants[0].ssn.slice(-4)];

        logger.log("SSN 0: " + ssnArr[0]);
        logger.log("SSN 1: " + ssnArr[1]);
        logger.log("SSN 2: " + ssnArr[2]);

            let fillArray = {
                tb_confirmEmail: global.updateDataJson.households[householdIndex].applicants[0].email,
                sb_securityQuestionSelect: 1,
                tb_securityAnswer: "automation",
                tb_password: global.updateDataJson.households[householdIndex].password,
                tb_confirmPassword: global.updateDataJson.households[householdIndex].password,
                cb_terms: ""
            }

            if (stateProfile.toUpperCase() === "CA") {
                delete fillArray.cb_terms;
            }

            dataUtil.doFormFill(indSignUpObj, fillArray);
            browser.click(eval(indSignUpObj.btn_submit));

        if (eval(indSignUpObj.tb_ssn1).isDisplayed()){
            browser.setValueInTextField(eval(indSignUpObj.tb_ssn1), ssnArr[0]);
            browser.setValueInTextField(eval(indSignUpObj.tb_ssn2), ssnArr[1]);
            browser.setValueInTextField(eval(indSignUpObj.tb_ssn3), ssnArr[2]);
        }
        if (eval(indSignUpObj.tb_confirmSsn1).isDisplayed()){
            browser.setValueInTextField(eval(indSignUpObj.tb_confirmSsn1), ssnArr[0]);
            browser.setValueInTextField(eval(indSignUpObj.tb_confirmSsn2), ssnArr[1]);
            browser.setValueInTextField(eval(indSignUpObj.tb_confirmSsn3), ssnArr[2]);
        }

        logger.log("Global JSON: " + JSON.stringify(global.updateDataJson));
    }
}

module.exports = new ActivateAccount();
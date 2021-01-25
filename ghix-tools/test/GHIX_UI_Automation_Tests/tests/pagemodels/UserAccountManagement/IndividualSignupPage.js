
const browser = require('../../base/Browser.js');
const random =require('../../common.utils/RandomDataGenerator')
//imports
const jsonUtil = require('../../common.utils/JsonUtil');
const global = require('../Global_include');
const dataUtil = require('../../common.utils/DataUtil');
const assertionUtil = require('../../base/Assert');
const loginPage = require('../UserAccountManagement/LogInPage.js');
const state = stateProfile;
const stateContent = require('../../../resources/content/exchange/' + state + '/UserAccountManagement/IndividualSignupPage.content.json');
const commonContent = require('../../../resources/content/common/UserAccountManagement/IndividualSignupPage.content.json');
var locatorJson = require('../../../resources/selectors/common/UserAccountManagement/IndividualSignupPageObject.json');
var landingPageModel = require('../../pagemodels/HomePage/LandingPage');
const applYear = year;
const logger=require('../../common.utils/LoggerUtil');
const dbQueries=require('../SSAP/SSAPDatabaseQueries');

class IndividualSignupPage {
    //Verify signup page header
    verifySignUpPageHeader() {
        browser.waitForPageToLoad(eval(locatorJson.signupPageHeader), stateContent.header);
    }

    clickCancelAndVerifyLandingPage() {
        browser.click(eval(locatorJson.btn_cancel));
        landingPageModel.verifyLandingPage()
    }

    //Click accept terms and verify mandatory label texts
    verifySignupPageForMandatoryFields() {
        browser.click(eval(locatorJson.cb_terms));
        browser.click(eval(locatorJson.btn_submit));
        var array = {
            [locatorJson.errorLabels.span_firstName]: commonContent.mandatoryFields.firstName,
            [locatorJson.errorLabels.span_lastName]: commonContent.mandatoryFields.lastName,
            [locatorJson.errorLabels.span_email]: commonContent.mandatoryFields.email,
            [locatorJson.errorLabels.span_confirmEmail]: commonContent.mandatoryFields.confirmEmail,
            [locatorJson.errorLabels.span_phone3]: commonContent.mandatoryFields.phoneNumber,
            [locatorJson.errorLabels.span_ssn]: commonContent.mandatoryFields.ssn,
            [locatorJson.errorLabels.span_birthDate]: commonContent.mandatoryFields.dateOfBirth,
            [locatorJson.errorLabels.span_securityQuestion]: commonContent.mandatoryFields.securityQuestion,
            [locatorJson.errorLabels.span_securityAnswer]: commonContent.mandatoryFields.securityAnswer,
            [locatorJson.errorLabels.span_passwordSpan1]: commonContent.mandatoryFields.password,
            [locatorJson.errorLabels.span_confirmPassword]: commonContent.mandatoryFields.confirmPassword
        }

        assertionUtil.assertEquals(locatorJson, array)
    }

    verifySignupPageForInvalidData(fileName) {

        var filePath = 'resources/data/Common/SSAP/' + fileName
        var ssapObject = jsonUtil.readJson(filePath)

        var phoneArr = ssapObject.primaryContactPhone.mobile.split("-");
        var ssnArr = ssapObject.applicants[0].ssn.split("-");
        var confirmSsnArr = ssapObject.applicants[0].confirmSsn.split("-");

        browser.click(eval(locatorJson.cb_terms));
        browser.click(eval(locatorJson.tb_birthDate));
        browser.setValueInTextField(eval(locatorJson.tb_birthDate), ssapObject.applicants[0].dateOfBirth)

        //removd  tb_ssn1:ssnArr[0], tb_ssn2:ssnArr[1],tb_ssn3:ssnArr[2],tb_confirmSsn1:confirmSsnArr[0], tb_confirmSsn2:confirmSsnArr[1],
        //tb_confirmSsn3:confirmSsnArr[2],
        var array = {
            tb_firstName: ssapObject.applicants[0].firstName, tb_lastName: ssapObject.applicants[0].lastName,
            tb_email: ssapObject.applicants[0].email, tb_confirmEmail: ssapObject.applicants[0].confirmEmail,
            tb_phone1: phoneArr[0], tb_phone2: phoneArr[1],
            tb_phone3: phoneArr[2], tb_password: ssapObject.password,
            tb_confirmPassword: ssapObject.confirmPassword
        }

        dataUtil.doFormFill(locatorJson, array);
        browser.click(eval(locatorJson.btn_submit));

        // removed [locatorJson.errorLabels.span_ssn]:commonContent.invalidFields.ssn,


        var array = {
            [locatorJson.errorLabels.span_firstName]: commonContent.invalidFields.firstName,
            [locatorJson.errorLabels.span_lastName]: commonContent.invalidFields.lastName,
            [locatorJson.errorLabels.span_email]: commonContent.invalidFields.email,
            [locatorJson.errorLabels.span_confirmEmail]: commonContent.invalidFields.confirmEmail,
            [locatorJson.errorLabels.span_phone3]: commonContent.invalidFields.phoneNumber,
            [locatorJson.errorLabels.span_birthDate]: commonContent.invalidFields.dateOfBirth,
            [locatorJson.errorLabels.span_securityQuestion]: commonContent.invalidFields.securityQuestion,
            [locatorJson.errorLabels.span_securityAnswer]: commonContent.invalidFields.securityAnswer,
            [locatorJson.errorLabels.span_passwordSpan1]: commonContent.invalidFields.password,
            [locatorJson.errorLabels.span_confirmPassword]: commonContent.invalidFields.confirmPassword
        }

        browser.click(eval(locatorJson.lbl_confirmPassword));

        assertionUtil.assertEquals(locatorJson, array)
    }
  /**
     * Sets unique PrimaryPhoneNumber.Mobile, not present in cmr_household table
     * Author:Sophia Oganesyan
     * Last Updated: Sophia Oganesyan */

    setUniquePrimaryPhoneNumber(ssapObject) {
        let isNotUniquePhone = true;
        if (jsonUtil.isFieldEmpty(ssapObject.primaryContactPhone.mobile)) {
            while (isNotUniquePhone) {
                ssapObject.primaryContactPhone.mobile = random.getRandomPhoneNumber();
                let DOBdemoDB = dbQueries.getDOBWithGivenPhoneNumber(ssapObject.primaryContactPhone.mobile);
                if (DOBdemoDB.value == "" || DOBdemoDB.value == null || DOBdemoDB.value == undefined)

                    isNotUniquePhone = false;

            }
        }
        return ssapObject;
    }
    setUpIndividualAccount(fileName, role) {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;

        if (fileName.startsWith("cap"))
            var filePath = 'resources/data/Common/CAP/' + fileName;
        else
            var filePath = 'resources/data/Common/SSAP/' + fileName;
        var ssapObject = jsonUtil.readJson(filePath)
        ssapObject.role = role;
        ssapObject.applicationYear = applYear;
        ssapObject = this.setUniquePrimaryPhoneNumber(ssapObject);

        global.updateDataJson.households[householdIndex] = jsonUtil.updateApplicantDetails(ssapObject);

        //Format Phone and SSN
        var phoneArr = global.updateDataJson.households[householdIndex].primaryContactPhone.mobile.split("-");
        var ssnArr = global.updateDataJson.households[householdIndex].applicants[0].ssn.split("-");
        logger.log("email=" + global.updateDataJson.households[householdIndex].applicants[0].email + " role= " + ssapObject.role + " firstname= " + global.updateDataJson.households[householdIndex].applicants[0].firstName);
        //, tb_ssn1:ssnArr[0], tb_ssn2:ssnArr[1],tb_ssn3:ssnArr[2],
        //tb_confirmSsn1:ssnArr[0], tb_confirmSsn2:ssnArr[1],            tb_confirmSsn3:ssnArr[2],
        // Removed ssn for NV, PA and Nj states?
        let dob = global.updateDataJson.households[householdIndex].applicants[0].dateOfBirth.replace("/", "").replace("/", "");
        //browser.setValueInTextField(eval(locatorJson.tb_birthDate),dob);
        let i = 0;
        while (eval(locatorJson.tb_birthDate).getValue() != global.updateDataJson.households[householdIndex].applicants[0].dateOfBirth && i < 10) {
            browser.setValueInTextField(eval(locatorJson.tb_birthDate), dob);
            i++;
        }
        var array = {
            tb_firstName: global.updateDataJson.households[householdIndex].applicants[0].firstName,
            tb_lastName: global.updateDataJson.households[householdIndex].applicants[0].lastName,
            tb_email: global.updateDataJson.households[householdIndex].applicants[0].email,
            tb_confirmEmail: global.updateDataJson.households[householdIndex].applicants[0].email,
            tb_phone1: phoneArr[0],
            tb_phone2: phoneArr[1],
            tb_phone3: phoneArr[2],
            sb_securityQuestionSelect: 1,
            tb_securityAnswer: "automation",
            tb_password: global.updateDataJson.households[householdIndex].password,
            tb_confirmPassword: global.updateDataJson.households[householdIndex].password,
            cb_terms: ""
        }

        dataUtil.doFormFill(locatorJson, array);

        if (state.toUpperCase() == 'ID') {
            var array = {
                tb_ssn1: ssnArr[0],
                tb_ssn2: ssnArr[1],
                tb_ssn3: ssnArr[2],
                tb_confirmSsn1: ssnArr[0],
                tb_confirmSsn2: ssnArr[1],
                tb_confirmSsn3: ssnArr[2],
            }
            dataUtil.doFormFill(locatorJson, array);
        }

        browser.click(eval(locatorJson.btn_submit));
        //  browser.pauseBrowser(10000);
    }

    continuetoAccount() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        browser.pauseBrowser(1000);
        if (eval(locatorJson.btn_Continue).isDisplayed()) {
            browser.click(eval(locatorJson.btn_Continue));
            loginPage.enterLogInCredentials(global.updateDataJson.households[householdIndex].applicants[0].email, global.updateDataJson.households[householdIndex].password);
            loginPage.clickSubmit();
        }

    }

//COMMON FOR ALL USERS
    continueToAccountForID(username, password) {
        browser.pauseBrowser(1000);
        if (eval(locatorJson.btn_Continue).isDisplayed()) {
            browser.click(eval(locatorJson.btn_Continue));
            loginPage.logInToAccount(username, password);
        }

    }
}

module.exports = new IndividualSignupPage();
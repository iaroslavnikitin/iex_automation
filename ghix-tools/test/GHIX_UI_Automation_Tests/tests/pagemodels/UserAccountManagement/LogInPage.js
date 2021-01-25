const logInLoc = require('../../../resources/selectors/common/UserAccountManagement/LogInObject.json');
const commonConfig = require('../../../tests/common.utils/CommonConfig');
const browser = require('../../base/Browser.js');
const DbHelper = require('../../common.utils/DbHelper');
const moment = require('moment');
var userPresent;
var date;
var bool;
const state = stateProfile;
const locatorJson_state = require('../../../resources/selectors/exchange/'+state+'/UserAccountManagement/LogInObject.json');
const global = require('../Global_include');
const loginCredentials = require('../../../resources/data/priviledgedUsers.json');
const logInLocState = require('../../../resources/selectors/exchange/' + state + '/UserAccountManagement/LogInObject.json');
const logInPageContent = require('../../../resources/content/common/UserAccountManagement/LogInPage.content.json');
const logger = require('../../common.utils/LoggerUtil');
const landingPageLoc = require('../../../resources/selectors/common/HomePage/LandingPageObject.json');
const constants = require('../../../tests/common.utils/Constants');
const landingPageContentState = require('../../../resources/content/exchange/' + state + '/HomePage/LandingPage.content.js')


class LogInPage {

    async isUserPresent(email) {
        let dbHelper = new DbHelper(url);
        let result = await dbHelper.select("select email from users where EMAIL = '" + email + "'");
        let count = 0;
        for (const [key, value] of Object.entries(result)) {
            logger.log(key, value);
            count = count + 1;
        }
        return count;
    }

    getServerDate(serverDate) {
        let servdate = eval(serverDate).getText().substring(13,);
        date = moment(servdate).format("MM/DD/YYYY");
        logger.log("ServerDate: " + date);
        return date;
    }

    retieveLoginCredentials(user, role) {
        let userName;
        let password;
        let loginRole = loginCredentials[role];
        let emailPassword = loginRole[user];
        userName = emailPassword.email;
        password = emailPassword.password;
        console.log("retrieved username & password="+ userName + " & " + password);
        return [userName,password];
    }

    enterLogInCredentialsAndSubmit(email, password) {
        this.enterLogInCredentials(email, password);
        this.clickSubmit();
        date = commonConfig.getServerDate(logInLoc.serverDate);
        let isPresent = this.checkActivationIfUserPresent(email);
        let promise = Promise.resolve(isPresent);
        promise.then(function (val) {
            logger.log("UserPresent" + val);
            bool = val;

        });
        browser.waitUntil(() => bool !== undefined);
        logger.log("UserPresent " + bool);
        if (bool == true) {
            try {
                this.checkActivationNeeded(email, password, date);

            } catch (error) {
                logger.log(error);
            }
        }

    }

    async checkActivationIfUserPresent(email) {
        userPresent = await this.isUserPresent(email);
        browser.waitUntil(() => userPresent !== null);
        logger.log("userCount : " + userPresent);
        let present = false;
        if (userPresent > 0) {
            present = true;
        } else {
            logger.log("Email not present in Database");
        }
        return present;
    }

    async checkActivationIfUserPresent(email) {
        userPresent = await this.isUserPresent(email);
        browser.waitUntil(() => userPresent !== null);
        logger.log("userCount : " + userPresent);
        let present = false;
        if (userPresent > 0) {
            present = true;
        } else {
            logger.log("Email not present in Database");
        }
        return present;

    }


    enterLogInCredentials(email, password) {
        console.log("**********Logging in as "+email +" with password "+password+" **********");
        if (eval(logInLoc.tb_username_id).isDisplayed()) {
            browser.setValueInTextField(eval(logInLoc.tb_username_id), email);
            browser.setValueInTextField(eval(logInLoc.tb_password_id), password)
        } else {
            browser.setValueInTextField(eval(logInLoc.tb_emailAddress), email);
            browser.setValueInTextField(eval(logInLoc.tb_password), password);
        }

    }

    clickSubmit() {
        browser.click(eval(logInLoc.btn_submit));
        //browser.waitForElementToDisplay(eval(logInLoc.dd_myAccount));
        browser.pauseBrowser(5000);
    }

    checkActivationNeeded(email, password, date) {
        if (eval(logInLoc.tb_emailAddress).isDisplayed() || eval(logInLoc.changePassword).isDisplayed()) {
            logger.log("email Address is displayed/change password pop up displayed");
            if (eval(logInLoc.closeChangePassword).isDisplayed()) {
                browser.click(eval(logInLoc.closeChangePassword));
            }
            this.activateUserfromDb(email, date);
            this.enterLogInCredentialsAndSubmit(email, password)
        }
        /*else if(eval(logInLoc.changePassword).isDisplayed()){
            logger.log("change password pop up displayed");
            browser.click(eval(logInLoc.closeChangePassword));
            this.activateUserfromDb(email);
            this.enterLogInCredentialsAndSubmit(email,password)
        }*/
        else {
            logger.log("*****User Logged in*****");
            if (state.toUpperCase() == 'CA') {
                browser.waitForElementToDisplay(eval(logInLocState.lk_logout));
            }else{
                browser.waitForElementToDisplay(eval(logInLoc.dd_myAccount));
            }
        }
    }


    async activateUserfromDb(email, ServerDate) {
        let dbHelper = new DbHelper(url);
        let query = "update users set confirmed = 1, RETRY_COUNT = 0, STATUS = 'Active' where EMAIL = '" + email + "'";
        logger.log(query);
        await dbHelper.update(query);
        logger.log("ServerDate : " + ServerDate);
        let backDate = moment(ServerDate).subtract(2, 'd').format("YYYY-MM-DD");
        logger.log("BackDate : " + backDate)
        query = "update users set pwd_last_updated = '" + backDate + " 12:41:31.664' , lastlogin='" + backDate + " 12:41:31.664' where  email ='" + email + "'";
        logger.log(query);
        await dbHelper.update(query);
        let result = await dbHelper.select("select status from users where EMAIL = '" + email + "'");
        logger.log(result);
    }

    logout() {
        let dd_myAccount_CAP_loc;
        if (state.toUpperCase() == 'NV' || state.toUpperCase() == 'PA')
            dd_myAccount_CAP_loc = logInLocState.dd_myAccount_CAP;
        else
            dd_myAccount_CAP_loc = logInLoc.dd_myAccount_CAP;

        if (eval(dd_myAccount_CAP_loc).isDisplayed()) {
            logger.log("***** Clicking On Log Out*****");
            browser.click(eval(dd_myAccount_CAP_loc));
            browser.click(eval(logInLoc.lk_logout));
            browser.pauseBrowser(5000);
            logger.log("***** Clicked On Log Out *****");
        } else {
            if (state.toUpperCase() != 'CA') {
                browser.waitForElementToDisplay(eval(logInLoc.dd_myAccount));
                browser.click(eval(logInLoc.dd_myAccount));
                browser.click(eval(logInLoc.lk_logout));
            }else{
                browser.pauseBrowser(5000);
                if (browser.isDisplayed(eval(logInLocState.lk_logout))) {
                    browser.click(eval(logInLocState.lk_logout));
                }else{
                    browser.click(eval(logInLocState.lk_logout2));
                }
                
                //browser.waitForElementToDisplay(eval(logInLocState.lk_logout2));
                
            }
        }
        if (state.toUpperCase() == constants.STATE_MN || state.toUpperCase() == constants.STATE_NV || state.toUpperCase() == constants.STATE_CA)
            browser.waitForPageToLoadAndCheckPartialHeaderText(eval(logInLoc.logInPageHeader), logInPageContent.logInPageHeader);
        else
            browser.waitForPageToLoadAndCheckPartialHeaderText(eval(landingPageLoc.pageHeader), landingPageContentState.landingPageHeader);

    }

    logInToAccount(userName, password) {
        this.enterLogInCredentials(userName, password);
        this.clickSubmit();
        logger.log("*****Logging In*****");
    }

}

module.exports = new LogInPage();

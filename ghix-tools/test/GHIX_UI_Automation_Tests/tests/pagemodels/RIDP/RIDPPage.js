const locatorJson = require('../../../resources/selectors/common/RIDP/IdentityVerificationObject.json');
const contentJson = require('../../../resources/content/common/RIDP/IdentityVerification.content.json');
const browser = require('../../../tests/base/Browser');
const assert = require('../../base/Assert');
const fileUploadUtil = require("../../common.utils/FileUploadUtil");
const pageHeader = require('../CommonPageFunctions/PageHeader');
const manageMembers = require('../CAP/MemberManagement/ManangeMembersPage');
const login = require('../UserAccountManagement/LogInPage');
const global = require('../Global_include');
const dashboard = require('../MemberPortal/DashBoardPage');
const constants = require('../../common.utils/Constants');
const { pauseBrowser } = require('../../base/Browser.js');



class RIDPPage {

    /**
     * Clicks Get Started Button and verifies Header On Contact Information Page
     */
    clickGetStarted() {
        browser.click(eval(locatorJson.getStarted.btn_getStarted));
        browser.waitForPageToLoad(eval(locatorJson.contactInformation.contactInformationHeading), contentJson.contactInformation.contactInformationHeading)
    }

    /**
     * Clicks Continue button on Contact Information Page 
     */

    clickContinueOnContactInformationPage() {
        browser.scrollToViewAndClick(eval(locatorJson.contactInformation.btn_continue));
        //browser.click(eval(locatorJson.contactInformation.btn_continue));
        browser.waitForPageToLoad(eval(locatorJson.getStarted.verifyIdentityHeading), contentJson.identityVerificationHeader);
        browser.waitTillElementNotVisible(eval(locatorJson.ajaxLoader.loader), constants.WAIT_UNTIL_40000);
    }



    /**
     * Clicks On Manual Verification Button And Verifies Header on Manual Verification Page
     */
    clickProceedWithManualVerificationOnFinishPage() {
        browser.click(eval(locatorJson.finish.btn_manualVerification));
        browser.waitForPageToLoad(eval(locatorJson.manualVerification.manualVerificationHeading), contentJson.manualVerification.manualVerificationHeading)

    }

    /**
     * Uploads the Necessary Document and Submits File 
     */
    uploadDocumentOnManualVerificationPage() {
        let picFilePath = process.cwd() + "/resources/data/Testfiles/pic.jpg";
        let locator_fileUploadBtn = eval(locatorJson.manualVerification.btn_upload);

        browser.selectByIndex(eval(locatorJson.manualVerification.sb_documentType), 2)
        fileUploadUtil.fileUploadForDisabledTextbox(picFilePath, locator_fileUploadBtn)
        this.clickSubmitAfterFileUpload();


    }

    /**
     * Clicks On Submit And Verifies Submission
     */
    clickSubmitAfterFileUpload() {
        browser.waitForDisplayAndClick(eval(locatorJson.manualVerification.btn_submit));
        assert.assertContainsText(eval(locatorJson.manualVerification.verifyDocumentSubmitted).getText(), contentJson.manualVerification.submitted);

    }

    /**
     *  Does Manual Verification based on different Flows
     * * @param {String} : adminEmail
     * * @param {String} : adminPassword
     */
    clickProceedWithManualVerification(adminEmail, adminPassword) {
        if (browser.isDisplayed(eval(locatorJson.finish.btn_manualVerification))) {
            this.clickProceedWithManualVerificationOnFinishPage();
            this.uploadDocumentOnManualVerificationPage();
            login.logout();
        }
        else if (browser.isDisplayed(eval(locatorJson.manualVerification.tb_fileUploadInput))) {
            this.uploadDocumentOnManualVerificationPage();
            login.logout();
        }
        else {
            browser.click(eval(locatorJson.callExperian.identityOverPhone));
            browser.isElementDisplayed(eval(locatorJson.callExperian.experianUnresolved));
            assert.assertContainsText(eval(locatorJson.callExperian.experianUnresolved).getText(), contentJson.callExperian.experianUnresolved);
            let code = eval(locatorJson.callExperian.ridpCode).getText();
            this.getManualVerification(adminEmail, adminPassword);
        }
    }

    /**
     * Log In As Admin And Does Manual Verification
     * * @param {String} : adminEmail
     * * @param {String} : adminPassword 
     */
    getManualVerification(adminEmail, adminPassword) {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        login.logout();
        pageHeader.clickLogInAndEnterUsernameAndPasswordAndClickSubmit(adminEmail,adminPassword);
        manageMembers.searchMemberAndclickMemberNameInSearchResult();
        browser.isElementDisplayed(eval(locatorJson.adminManualVerification.basicInformationHeader));
        assert.assertContainsText(eval(locatorJson.adminManualVerification.basicInformationHeader).getText(), contentJson.adminManualVerification.basicInformationHeader);
        browser.click(eval(locatorJson.adminManualVerification.btn_remoteIdentityVerificationStatus));
        browser.waitTillElementNotVisible(eval(locatorJson.adminManualVerification.btn_remoteIdentityVerificationStatus), constants.WAIT_UNTIL_10000);
        login.logout();
        pageHeader.clickLogInAndEnterUsernameAndPasswordAndClickSubmit(global.updateDataJson.households[householdIndex].applicants[0].email,global.updateDataJson.households[householdIndex].password);
        dashboard.clickStartApplication();
        this.uploadDocumentOnManualVerificationPage();
        login.logout();
    }



}

module.exports = new RIDPPage();

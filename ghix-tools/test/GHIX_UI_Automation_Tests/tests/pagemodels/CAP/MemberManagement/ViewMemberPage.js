const browser = require("../../../base/Browser.js");
const locator = require('../../../../resources/selectors/common/CAP/MemberManagement/ViewMemberPageObject.json');
const locator_enrollment = require('../../../../resources/selectors/common/CAP/MemberManagement/EnrollmentPageObject.json');
const locator_memberPortal = require('../../../../resources/selectors/common/MemberPortal/DashBoardObject.json');
const content_enrollment = require('../../../../resources/content/common/CAP/MemberManagement/EnrollmentPage.content.js');
const content_viewMember = require('../../../../resources/content/common/CAP/MemberManagement/ViewMemberPage.content.js');
const content_memberPortal = require('../../../../resources/content/common/MemberPortal/DashboardPage.content.js');
const  global = require('../../Global_include');


const loginPage = require('../../UserAccountManagement/LogInPage');
const { pauseBrowser } = require("../../../base/Browser.js");
const locator_application = require('../../../../resources/selectors/common/CAP/MemberManagement/ApplicationPageObject.json');
const content_application = require('../../../../resources/content/common/CAP/MemberManagement/ApplicationPage.content');
const logger=require('../../../common.utils/LoggerUtil');
const locator_history = require('../../../../resources/selectors/common/CAP/MemberManagement/HistoryPageObject.json');
const content_history = require('../../../../resources/content/common/CAP/MemberManagement/HistoryPage.content');
const assert =  require("../../../base/Assert.js");
const { constants } = require("buffer");



class ViewMember {
    setRIDPStatusAsVerifiedAndLogout()
    {
        this.setRIDPStatusAsVerified();
        loginPage.logout();
    }
    setRIDPStatusAsVerified() {
        logger.log("**** Clicking On Mark As Verified *****");
        browser.click(eval(locator.btn_mark_verified));
        logger.log("**** Clicked On Mark As Verified *****");
        browser.setAlertText("Test Automation");
        browser.acceptTheAlert();
        logger.log("**** Submitted Mark As Verified *****");
        browser.waitUntil(() => eval(locator.ridp_verifiedStatus).isDisplayed());

    }
    clickOnEnrollments() {
        logger.log("**** Clicking On Enrollments Link *****");
        browser.click(eval(locator.leftNav.lk_enrollments));
        logger.log("**** Clicked On Enrollments Link *****");
        browser.waitForPageToLoadAndCheckPartialHeaderText(eval(locator_enrollment.pageHeader), content_enrollment.pageHeader);
    }

    /* Author: Monica Thaneer
    * Clicks View member Account link , confirms popup and verifies landing on dashboard page
    */
    clickOnViewMemberAccount() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        console.log("**** Clicking On View Member Account Link *****");
        let memberFullName=global.updateDataJson.households[householdIndex].applicants[0].firstName + " " +global.updateDataJson.households[householdIndex].applicants[0].lastName; //  "Kylie Tandy" 
        browser.click(eval(locator.leftNav.lk_viewMemberAccount));
        browser.waitForPageToLoadAndCheckPartialHeaderText(eval(locator.viewMemberAccountPopUp.txt_header), content_viewMember.viewMemberAccountPopup_header);
        browser.click(eval(locator.viewMemberAccountPopUp.btn_memberView));
        browser.waitForPageToLoadAndCheckPartialHeaderText(eval(locator_memberPortal.welcomeDashboardHeading), content_memberPortal.dashBoardHeader+memberFullName);
        
    }

    clickOnApplications() {
        console.log("**** Clicking On Applications Link *****");
        browser.click(eval(locator.leftNav.lk_applications));
        console.log("**** Clicked On Applications Link *****");
        browser.waitForPageToLoadAndCheckPartialHeaderText(eval(locator_application.actions.applicationPageHeader), content_application.pageHeader);
    }
    clickOnHistoryAndVerifyEnrollmentEvent(event)
    {
        this.clickOnHistory();
        this.verifyEnrollmentEvent("Enrollments - "+event);

    }
    clickOnHistory() {
        logger.log("**** Clicking On History Link *****");
        browser.scrollToViewAndClick(eval(locator.leftNav.lk_history));
        logger.log("**** Clicked On History Link *****");
        browser.waitForPageToLoadAndCheckPartialHeaderText(eval(locator_history.pageHeader), content_history.pageHeader);
    }
    verifyEnrollmentEvent(eventText)
    {
        logger.log("**** Verifying Enrollment Event *****");
        browser.pauseBrowser(3000);
        browser.scrollToView(eval(locator_history.category));
        browser.selectByVisibleText(eval(locator_history.category),"Enrollments");
        assert.assertElementContainsText(eval(locator_history.eventText),eventText)
        logger.log("**** Verified Enrollment Event *****");

    }
}

module.exports = new ViewMember();

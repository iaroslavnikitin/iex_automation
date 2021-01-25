const browser = require("../../base/Browser.js");
const assert = require("../../base/Assert.js");
const  navLinkLocator = require('../../../resources/selectors/common/CAP/AdminDashboardMenuPageObject.json');
const  locator = require('../../../resources/selectors/common/CAP/AdminDashboardMenuPageObject.json');
const  manageMemberLocator = require('../../../resources/selectors/common/CAP/MemberManagement/ManageMembersPageObject.json');
const  manageMemberContent = require('../../../resources/content/common/CAP/MemberManagement/ManageMembersPage.content.js');
const  manageApplicantsContent = require('../../../resources/content/common/CAP/MemberManagement/ManageApplicantsPage.content.js');
const  manageApplicantsLocator = require('../../../resources/selectors/common/CAP/MemberManagement/ManageMembersPageObject.json');
const ManageTicketPageObject = require('../../../resources/selectors/common/CAP/TicketManagement/ManageTicketPageObject.json');
const ticketsJson = require('../../../resources/content/common/CAP/TicketManagement/TicketsPage.content');
const logger=require('../../common.utils/LoggerUtil');

class AdminDashboardPage {
 
    clickManageMembers()
    {
        browser.waitUntil(() => eval(navLinkLocator.topNavigation.dd_members).isDisplayed()); 
        logger.log("**** Clicking On Manage Members *****");
        browser.click(eval(navLinkLocator.topNavigation.dd_members));
        browser.click(eval(navLinkLocator.subNavigation.members.lk_manageMembers));
        browser.waitForPageToLoad(eval(manageMemberLocator.pageHeader),manageMemberContent.pageHeader);
        logger.log("**** Clicked On Manage Members *****");
    }
    clickManageTickets(){
        browser.waitForPageToLoad(eval(manageMemberLocator.pageHeader),manageMemberContent.pageHeader);
        browser.click(eval(navLinkLocator.topNavigation.dd_tickets));
        browser.click(eval(navLinkLocator.subNavigation.tickets.lk_manageTickets));
        browser.waitForPageToLoadAndCheckPartialHeaderText(eval(ManageTicketPageObject.ticketsHeading),ticketsJson.pageHeader);
        browser.click(eval(ManageTicketPageObject.btn_showTicketFilters));
    }

    /* Author: Monica Thaneer
    * Clicks Members --> Manage Applicants and Verifies Member Applicant Page Header
    */ 
    clickManageApplicants()
    {
        browser.waitUntil(() => eval(navLinkLocator.topNavigation.dd_members).isDisplayed()); 
        logger.log("**** Clicking On Manage Applicants *****");
        browser.click(eval(navLinkLocator.topNavigation.dd_members));
        browser.click(eval(navLinkLocator.subNavigation.members.lk_manageApplicants));
        browser.waitForPageToLoad(eval(manageApplicantsLocator.pageHeader),manageApplicantsContent.pageHeader);
        logger.log("**** Clicked On Manage Applicants *****");
    }
  
 
    verifyAdminDashboard(user){        
        user = user.toString();
        if(user == 'Supervisor' || user == 'L1CSR' ){
        user = user.toString();
        logger.log("***** Verify Dashboard of "+user+" *****");
            assert.assertElementContainsText(eval(locator.landingPageHeader),"Members");
        }
}
}
 
module.exports = new AdminDashboardPage();

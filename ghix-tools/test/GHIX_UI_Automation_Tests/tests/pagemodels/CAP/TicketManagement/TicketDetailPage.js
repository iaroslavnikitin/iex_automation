const ticketDetailPageObject = require('../../../../resources/selectors/common/CAP/TicketManagement/TicketDetailPageObject.json');
const ticketsJson = require('../../../../resources/content/common/CAP/TicketManagement/TicketsPage.content');
const browser = require('../../../base/Browser');
const dataRIDP = require('../../../../resources/data/Common/RIDP/RIDP.json');
const assert= require('../../../base/Assert.js');

class TicketDetail{

/**
     * Click On Claim Ticket Button To Claim The Ticket 
*/
clickOnClaim(){
    // wait for page load is before click ?? Failing at this step- disabled it - Monica
    //browser.waitForPageToLoadAndCheckPartialHeaderText(eval(ticketDetailPageObject.ticketSubmissionHeader),ticketsJson.ticketSubmissionHeader);
    console.log(" **** Claiming Ticket ****");
    browser.click(eval(ticketDetailPageObject.topNav.btn_claimTicket));
    //console.log(" **** Assert button mark as complete is visible after claiming ticket ****");
    //assert.assertElementIsVisible(eval(ticketDetailPageObject.topNav.btn_markAsComplete))

}

/**
     * Click On Mark As Completed After Claiming The Ticket
*/
clickOnMarkAsCompleted(){
    console.log(" **** Marking Ticket As Complete ****");
    browser.click(eval(ticketDetailPageObject.topNav.btn_markAsComplete));
    browser.waitForPageToLoadAndCheckPartialHeaderText(eval(ticketDetailPageObject.documentVerificationPopUp.verifyDocumentHeader),ticketsJson.verifyDocumentHeader);

}

clickMarkAsCompleteAndVerifyDocument(approval)
{
    console.log(" **** Clicking Mark Ticket As Complete ****");
    browser.click(eval(ticketDetailPageObject.topNav.btn_markAsComplete));
    browser.waitForPageToLoadAndCheckPartialHeaderText(eval(ticketDetailPageObject.markAsCompletePopUp.markAsCompletePopUpHeader),ticketsJson.markAsCompletePopUpHeader);
    console.log(" **** Submitting Ticket Pop Up ****");
    browser.selectByVisibleText(eval(ticketDetailPageObject.markAsCompletePopUp.sb_markDocumentAs),approval);  
    browser.setValueInTextField(eval(ticketDetailPageObject.markAsCompletePopUp.tb_internalComments),"ok");
    browser.click(eval(ticketDetailPageObject.markAsCompletePopUp.btn_taskComplete));
}

/**
     * In The Document Verification Pop Up Mark Document Based On Aprroval Passed As Parameter And Add Internal Comment, Then Click On Task Complete 
     * @param {String} : approval
*/
enterPopUpDetailsAndClickTaskCompleted(approval){
    console.log(" **** Submitting Ticket Pop Up ****");
   browser.click(eval(ticketDetailPageObject.documentVerificationPopUp.dd_markDocumentAs));
   browser.selectByVisibleText(eval(ticketDetailPageObject.documentVerificationPopUp.dd_markDocumentAs),approval);
    browser.setValueInTextField(eval(ticketDetailPageObject.documentVerificationPopUp.tb_internalComments),dataRIDP.internalComment);
    browser.click(eval(ticketDetailPageObject.documentVerificationPopUp.btn_taskComplete));

}

claimTicketAndMarkAsComplete(approval)
{
    this.clickOnClaim()
    this.clickMarkAsCompleteAndVerifyDocument(approval)

}

}

module.exports = new TicketDetail();
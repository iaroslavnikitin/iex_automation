const ManageTicketPageObject = require('../../../../resources/selectors/common/CAP/TicketManagement/ManageTicketPageObject.json');
const ticketDetailObject = require('../../../../resources/selectors/common/CAP/TicketManagement/TicketDetailPageObject.json');
const ticketDetailContent = require('../../../../resources/content/common/CAP/TicketManagement/TicketDetailPage.content');


const ticketsJson = require('../../../../resources/content/common/CAP/TicketManagement/TicketsPage.content');
const browser = require('../../../base/Browser');
const  global = require('../../Global_include');
const ticketDatabaseQueries = require('./TicketDatabaseQueries');
const logger = require('../../../../logger/WDIOLogger');

class TicketSearch{

/**
     * Search For Ticket Using ticketStatus Passed As A Parameter 
     * @param {String} : ticketStatus
*/

getTicketNumber(){
    let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
    let ticketNumber = null;
    ticketDatabaseQueries.ticketNum(global.updateDataJson.households[householdIndex].applicants[0].email).then(tickNo => {
        ticketNumber = tickNo;
        });
    browser.waitUntil(() => ticketNumber !== null);
    logger.log("Ticket Number :   "+ticketNumber);
    return ticketNumber
}

searchForTickets(ticketStatus){
    logger.log("Ticket Status Displayed"+eval(ManageTicketPageObject.dd_ticketStatus).isDisplayed());
    logger.log("Ticket Status Clickable"+eval(ManageTicketPageObject.dd_ticketStatus).isClickable());
    browser.waitForDisplayAndClick(eval(ManageTicketPageObject.dd_ticketStatus));
    browser.selectByVisibleText(eval(ManageTicketPageObject.dd_ticketStatus),ticketStatus);    
    browser.setValueInTextField(eval(ManageTicketPageObject.tb_ticketNumber),this.getTicketNumber());
    browser.click(eval(ManageTicketPageObject.btn_searchAllTickets));
}

/**
     * Click On The Unclaimed Ticket Displayed After Ticket Search
*/
clickUnclaimedTicket(){
    logger.log("Ticket Submission Displayed"+eval(ManageTicketPageObject.lnk_ticketSubmission).isDisplayed());
    logger.log("Ticket Submission Clickable"+eval(ManageTicketPageObject.lnk_ticketSubmission).isClickable());
    browser.click(eval(ManageTicketPageObject.lnk_ticketSubmission));
}

/*
Author: Monica 
This function will get the ticket number and clicks on the exact ticket link from search results
*/
clickOnTicket()
{
let ticketNumber= this.getTicketNumber();
logger.log("**** Clicking on ticket link "+ManageTicketPageObject.ticketSearchResults.lk_ticketNumber.replace("REPLACE_TICKET_NUMBER",ticketNumber))
browser.click(eval(ManageTicketPageObject.ticketSearchResults.lk_ticketNumber.replace("REPLACE_TICKET_NUMBER",ticketNumber)));
browser.waitForPageToLoad(eval(ticketDetailObject.subHeader),ticketDetailContent.pageTitle)

}

searchForTicketAndClickOnTicket(ticketStatus)
{
this.searchForTickets(ticketStatus)
this.clickOnTicket();
}
}

module.exports = new TicketSearch();
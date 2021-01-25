const {Given, Then, When} = require('cucumber');
const  ticketDetail = require('../../../../pagemodels/CAP/TicketManagement/TicketDetailPage');
const RIDPdata = require('../../../../../resources/data/Common/RIDP/RIDP.json')

Then('Click On Claim Ticket', function(){
    ticketDetail.clickOnClaim();
});

Then('Click On Mark As Completed', function(){
    ticketDetail.clickOnMarkAsCompleted();
});

Then('Enter Pop Up Details And Click Completed', function(){
    ticketDetail.enterPopUpDetailsAndClickTaskCompleted(RIDPdata.documentStatus.Accepted);
});
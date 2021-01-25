const {Given, Then, When} = require('cucumber');
const  ManageTickets = require('../../../../pagemodels/CAP/TicketManagement/ManageTicketsPage');
const RIDPdata = require('../../../../../resources/data/Common/RIDP/RIDP.json')
const adminDashboardPage = require('../../../../pagemodels/CAP/AdminDashboardPage');


Then('Click On Tickets And Manage Tickets', function(){
    adminDashboardPage.clickManageTickets();
});

Then('Search For Ticket', function(){
    ManageTickets.searchForTickets(RIDPdata.ticketStatus.Any);
});

Then('Click On Unclaimed Ticket', function(){
    ManageTickets.clickUnclaimedTicket();
});

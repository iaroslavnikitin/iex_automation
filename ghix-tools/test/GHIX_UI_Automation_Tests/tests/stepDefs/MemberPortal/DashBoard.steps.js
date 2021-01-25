const {Given, Then, When} = require('cucumber');
const dashboard = require('../../pagemodels/MemberPortal/DashBoardPage');
const verificationDashboard = require('../../pagemodels/MemberPortal/DocumentVerificationDashboardPage.js');
const confirmEventModel = require('../../pagemodels/MemberPortal/ConfirmEventPage.js');

Then('I verify Dashboard of Individual', function(){
    dashboard.verifyDashboard();
});

Then('I Verify Dashboard Page Content', function(){
    dashboard.verifyDashboardContent();
});
Then('Click Start Application',function(){
    dashboard.clickStartApplication();

});
Then('Click Apply Without Cost-Savings Button',function(){
    dashboard.clickAppyWithoutCostSavings();

});
Then('Click Shop For Plans On DashBoard',function(){
    dashboard.clickShopPlansOnDashboard();

});

Then('Click Save And Continue On Additional Information Page',function(){
    dashboard.clickSaveAndContinue();

});

Then('Click View Details Link on DashBoard',function(){
    dashboard.clickVerifyDetailsLink();

});

Then('Click On Confirm Event',function(){
    dashboard.clickConfirmEvent();

});

/* Author: Monica Thaneer*/
Then(/^If In QEP Confirm Event with Event (.*) And Event Date Less Than (.*) Days And Continue$/,function(eventName, eventDays){
    dashboard.ifInQEPConfirmEvent(eventName, eventDays);
});

/* Author: Monica 
Confirm event if in QEP -->if event is gated --> Logout as individual -> login as CSR -> 
search for applicant --> goto dashboard --> click upload document -> override document upload-> logout as csr 
-> login in as individual
*/
Then(/^If AppType Is QEP Select Event (.*) And Date Less Than (.*) Days And Override As Priviledge User (.*) And Role (.*)$/,function(eventName, eventDays,user,role){
    dashboard.ifInQEPConfirmEvent(eventName,eventDays);
    dashboard.ifGatedThenOverrideDocumentUpload(user,role);
});

/* Author: Monica 
Confirm event if in QEP -->if event is gated --> uploads document
Logout as individual -> login as CSR -> search for ticket -> accept ticket -> logout as csr -> login in as individual
*/
Then(/^If QEP Select Event (.*) And Date Less Than (.*) Days And Upload And Verify Document As PriviledgeUser (.*) And Role (.*)$/,function(eventName, eventDays,user,role){
dashboard.ifInQEPConfirmEvent(eventName, eventDays);
dashboard.ifGatedThenUploadAndVerifyDocumentAsPriviledgeUser(user,role);
});

/* Author: Monica Thaneer
When logged in as priviledge User and landed on consumer dashboard
This will click upload document button on user's dashboard and overrides document upload*/
Then('Click Upload Documents And Override',function(){
    dashboard.clickUploadDocuments();
    verificationDashboard.clickOverrideAndSubmit();
    verificationDashboard.clickBackToDashboard();

});

Then('Upload Documents And Goto Dashboard',function(){
    dashboard.ifGatedUploadDocumentsAndGotoDashboard();
     
});

Then('If Gated Event Then Upload Document And Override',function(){
    dashboard.ifGatedThenOverrideAsPriviledgeUser();
   

});










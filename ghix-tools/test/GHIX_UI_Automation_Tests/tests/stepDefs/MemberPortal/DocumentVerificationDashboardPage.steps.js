const {Given, Then, When} = require('cucumber');
const verificationDashboard = require('../../pagemodels/MemberPortal/DocumentVerificationDashboardPage.js');


Then('Click Override And Submit',function(){
    verificationDashboard.clickOverrideAndSubmit();

});
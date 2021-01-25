const {Given, Then, When} = require('cucumber');
const { pauseBrowser } = require('../../base/Browser.js');
const confirmEventModel = require('../../pagemodels/MemberPortal/ConfirmEventPage.js');

Then(/^Select Event (.*) And Event Date Less Than (.*) Days$/, function(eventName, eventDays){
    confirmEventModel.selectEventAndDate(eventName,eventDays)
});

Then(/^Select Event (.*) And Event Date Less Than (.*) Days And Continue$/, function(eventName, eventDays){
    confirmEventModel.selectEventAndDate(eventName,eventDays)
    confirmEventModel.acceptTermsClickContinueAndConfirmPopup();
});
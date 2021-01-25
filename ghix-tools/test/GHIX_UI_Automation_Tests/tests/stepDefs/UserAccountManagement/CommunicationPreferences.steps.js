const {Given, Then, When} = require('cucumber');
const  communicationPref = require('../../pagemodels/UserAccountManagement/CommunicationPreferencesPage.js');
const database = require('../../pagemodels/UserAccountManagement/DataBase')
 
Then('Enter Communication Preference Details', function(){
    communicationPref.enterCommunicationPreferences();
});
Then('Click continue on communication preferences', function()
{
    communicationPref.clickContinueButton();
});


Then('Admin Verifies The Identity',  async function(){
    database.verifyIdentityOfIndividual();   
    
});

Then(/^Verify Communication Preferences For Invalid Data (.*) (.*)$/, function(invalidSsapFile, validSsapFile){
    communicationPref.verifyNewPrefPageForInvalidAndMandatoryData(invalidSsapFile,validSsapFile);  

});

Then(/^Provide Mailing Address Details$/, function(){
    communicationPref.FillUpdateMailingAddressDetails();  

});

Then(/^Click Save Mailing Address Button$/, function(){
    communicationPref.clickSaveMailingAddress();  

});

Then(/^Click Ok On Popup$/, function(){
    communicationPref.clickOkOnPopUp();  

});

Then(/^Verify Communication Preferences Page$/, function(){
    communicationPref.verifyCommunicationPreferencesPage();  
});

Then(/^Click Save Preferences On Communication Preferences Page$/, function(){
    communicationPref.clickSavePreferences()  

});


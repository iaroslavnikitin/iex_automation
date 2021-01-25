const {Given, Then, When} = require('cucumber');
const { pauseBrowser } = require('../../base/Browser.js');
const additionalinfoModel = require('../../pagemodels/MemberPortal/AdditionalInformationPage.js');


Then('Click Continue On Additional Information Page',function(){
    additionalinfoModel.clickContinue();
});

Then('select tobacco for household',function(){
    additionalinfoModel.selectTobaccoforUsers();

});
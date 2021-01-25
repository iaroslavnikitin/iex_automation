const {Given, Then, When} = require('cucumber');
const startApp = require('../../pagemodels/SSAP/StartYourApplication');
const prop = require('../../common.utils/PropertyReader');
var state = prop.getEnvName()

Then('Click Privacy CheckBox On Before We Begin',function(){
    startApp.clickPrivacyCheckBox();

});


// AT creates partial SSAP -
Then('Verify Privacy CheckBox Is Checked',function(){
    startApp.verifyPrivacyCheckBoxChecked();

});

Then('I Click Save And Continue To Get Ready Page',function(){
    console.log("****continue to get ready page");
    startApp.continueToGetReadyPage();
});

Then('Continue To Primary Contact And Information Page',function(){
    console.log("****continue To Primary Contact And Information Page");
    startApp.continueToPrimaryContactInformationPage();
});
Then('I Verify Auto Filled Data On Primary Contact Information Page', function(){
    startApp.verifyPrimaryContactInfoAutoFill();

});
Then('Verify Primary Contact Information Page Autofill', function(){
    startApp.verifyPrimaryContactNameAutoFill();

});

Then('Enter Primary Contact Home Address', function(){
    startApp.enterPrimaryContactAddress();

});

Then('Check If Mailing Address Is Same', function(){
    startApp.checkIfMailingAddressIsSame();

});

Then('Select Email Me', function(){
    startApp.selectEmailMe();
});

Then('Verify Mailing Address Is Checked', function(){
    startApp.verifyMailingAddressIsSameChecked();

});

Then('I click on OK On Information About Medicare Pop up',function() {
    startApp.clickOkOnMedicarePopUp();
});

Then('I Save And Continue To Help Applying For Coverage Page', function(){
    startApp.continueToHelpApplyingForCoverage();

});
Then('Select Who Is Helping You', function(){
    startApp.selectWhoIsHelpingYou();

});
Then('Continue To Help Paying For Coverage Page', function(){
    startApp.continueToHelpForPayingForCoverage();

});
Then('Select Help Paying For Coverage', function(){
    startApp.getHelpForPayingForCoverage();

});
Then('I Save And Continue To About Your Household Page', function(){
    startApp.continueToAboutYourHouseholdPage();
});
Then('I Verify Auto Filled Data On About Your Household Page', function(){
    startApp.verifyHousHoldAutoFillFields();
});
Then('I Enter Household Information',function(){
  startApp.aboutHousHold();
});
Then('Click Continue To Household Relation Page',function(){
    startApp.continueToHouseholdRelationPage();
});
Then('Select HouseHold RelationShip',function(){
    startApp.selectHouseHoldRelationShip();
});
Then('Click Continue To Where Household Member Lives Page',function(){
    startApp.continueToHouseholdAddressPage();
});
Then('Select Where Household Member Lives',function(){
    startApp.selectWhereHouseholdMemberLives();
});
Then('Select Primary Seeking Coverage',function(){
    startApp.clickSeekingCoverage(0);
});
Then('I Save And Continue To Summary Page',function(){
    startApp.continueToSummaryPage();
});
Then('Continue To Get Ready Page Of Family And Household',function(){
    // if(state.toUpperCase()=='ID'){
    //     startApp.continueToGetReadyForFamilyAndHousHold();
    // }else{
        startApp.continueToGetReadyPage();
  //  }
});

Then('Enter Application Details',function(){
    startApp.enterApplicationDetails();
});



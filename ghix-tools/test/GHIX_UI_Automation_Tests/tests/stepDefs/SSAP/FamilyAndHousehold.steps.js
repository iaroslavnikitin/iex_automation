const {Given, Then, When} = require('cucumber');
const  familyHouseholdModel = require('../../pagemodels/SSAP/FamilyAndHouseholdPage');
 
Then('Click Continue On Get Ready Page', function(){
    familyHouseholdModel.continuetoPersonalInformationPage();
});
Then('Enter Marital Status Information', function(){
    familyHouseholdModel.selectMaritalStatusInfo();
});
Then('Click Continue To Military Service Page', function(){
    familyHouseholdModel.continueToMilitaryServicePage();
});

Then('Enter Military Service Information', function(){
    familyHouseholdModel.selectMilitaryServiceInfo();
});
Then('Click Continue To Household Information Page', function(){
    familyHouseholdModel.continueToHouseholdInformationPage();
});
Then('Confirm The Household Information', function(){
    familyHouseholdModel.selectMakeAnyChangesInfo();
});
Then('Enter Tax Filers Information', function(){
    familyHouseholdModel.selectTaxFilerInfo();
});

Then('Verify Tax Filers Information is selected', function(){
    familyHouseholdModel.verifyTaxFilerInfoSelected();
});

Then('Click Continue To Native American Information Page', function(){
    familyHouseholdModel.continueToAmerIndianNdAlskNativeInfoPage();
});
Then('Click Continue To Family And Household Summary Page', function(){
    familyHouseholdModel.continueToHouseholdSummaryPage();
});

// Then('Enter Household Information', function(){
//     familyHouseholdModel.fillHouseholdInfoAndContinue();
// });

Then('Enter Native American Information', function(){
    familyHouseholdModel.selectAlaskanNativeInfo();
});

Then('Verify Native American Information is selected', function(){
    familyHouseholdModel.verifyAlaskanNativeInfoSelected();
});

Then('Click Continue To Medicaid And Chip Denial Info Page', function(){
    familyHouseholdModel.continueToMedicaidChipDenialInfoPage();
});
Then('Enter Medicaid Chip Denial Information', function(){
    familyHouseholdModel.selectMedicaidChipDenialInfo();
});
Then('Click Continue To Pregnancy Information Page', function(){
    familyHouseholdModel.continueToPregnancyInfoPage();
});
Then('Enter Pregnancy Information', function(){
    familyHouseholdModel.selectPregnancyInfo();
});
Then('Click Continue To Disability Information Page', function(){
    familyHouseholdModel.continueToDisabilityInfoPage();
});
Then('Enter Disability Information', function(){
    familyHouseholdModel.fillDisabilityInfoAndContinue();
});
Then('Verify Disability Information entered', function(){
    familyHouseholdModel.verifyDisabilityEntered();
});

Then('Click Continue To Foster Care Information Page', function(){
    familyHouseholdModel.continueToFosterCareInfoPage();
});
Then('Enter Foster Care Information', function(){
    familyHouseholdModel.selectFosterCareInfo();
});
Then('Click Continue To FullTime Student Information Page', function(){
    familyHouseholdModel.continueToFullTimeStudentInfoPage();
});
Then('Enter Full Time Student Information', function(){
    familyHouseholdModel.selectFullTimeStudentInfo();
});
Then('Click Continue On Family And Household Summary Page', function(){
    familyHouseholdModel.clickContinueOnSummaryPage();
});

Then('Click Continue To Marital Status Information Page', function(){
  familyHouseholdModel.continueToGetReadyPage();
});
Then('Click Continue To Personal Information Page', function(){
    familyHouseholdModel.continuetoPersonalInformationPage();
  });
Then('Enter Personal And Household Details', function(){
    familyHouseholdModel.enterPeronalAndHouseholdDetails();
});

Then(/^Enter Personal Information Of \"([^\"]*)\"$/, function (member) {
    if(member.toUpperCase()=="APPLICANT"){
        familyHouseholdModel.fillPersonalInfoAndContinue(0);
    }else{
        var matches = member.match(/(\d+)/); 
       // familyHouseholdModel.continuetoPersonalInformationPage();
        familyHouseholdModel.fillPersonalInfoAndContinue(matches[0]);
    }
  });
  Then('Click Continue To Citizenship Information Page', function(){
    familyHouseholdModel.continueToCitizenshipStatusInfoPage();
  });
 Then(/^Enter Citizenship Immigration Status Information Of \"([^\"]*)\"$/, function (member) {
    if(member.toUpperCase()=="APPLICANT"){
        familyHouseholdModel.fillCitizenImmigrationInfoAndContinue(0);
    }else{
        var matches = member.match(/(\d+)/); 
        familyHouseholdModel.fillCitizenImmigrationInfoAndContinue(matches[0]);
    }
  });

  Then('Click Continue To Ethnicity And Race Information Page', function(){
    familyHouseholdModel.continueToEthnicityRaceInfoPage();
  });

Then(/^Enter Ethnicity And Race Information Of \"([^\"]*)\"$/, function (member) {
    if(member.toUpperCase()=="APPLICANT"){
        familyHouseholdModel.fillEthinicityAndRaceInfoAndContinue(0);
    }else{
        var matches = member.match(/(\d+)/); 
        familyHouseholdModel.fillEthinicityAndRaceInfoAndContinue(matches[0]);
    }
  });

Then(/^Enter Ethnicity Of \"([^\"]*)\"$/, function (member) {
    if(member.toUpperCase()=="APPLICANT"){
        familyHouseholdModel.fillEthinicity(0);
    }else{
        var matches = member.match(/(\d+)/);
        familyHouseholdModel.fillEthinicity(matches[0]);
    }
});

  Then('Click Continue To Additional Information On Family And Household Page', function(){
    familyHouseholdModel.continueToAdditionalInfoPage();
  });
  Then('Click Continue To Caretaker Information Page', function(){
    familyHouseholdModel.continueToCaretakerInfoPage();
  });
Then(/^Enter Parent Or Caretaker Information Of \"([^\"]*)\"$/, function (member) {
    if(member.toUpperCase()=="APPLICANT"){
        familyHouseholdModel.parentCaretakerInformation(0);
    }else{
        var matches = member.match(/(\d+)/); 
        familyHouseholdModel.parentCaretakerInformation(matches[0]);
    }
  });

const {Given, Then, When} = require('cucumber');
const  incomeInformationModel = require('../../pagemodels/SSAP/IncomeInformationPage');
const additionalInfoPage = require('../../pagemodels/SSAP/AdditionalInformationPage');
const { pauseBrowser } = require('../../base/Browser');
const logger = require('../../common.utils/LoggerUtil');
 
Then('Click Continue To Income Information Page', function(){
   incomeInformationModel.continueIncomeSourcePage();
});

Then(/^Enter Income Sources Information Of \"([^\"]*)\"$/, function (member) {
    if(member.toUpperCase()=="APPLICANT"){
        incomeInformationModel.enterIncomeDetails(0); 
    }else{
        var matches = member.match(/(\d+)/); 
        incomeInformationModel.enterIncomeDetails(matches[0]); 
    }
  });

Then(/^Verify Income Information Of \"([^\"]*)\"$/, function (member) {
    if(member.toUpperCase()=="APPLICANT"){
        incomeInformationModel.verifyIncomeDetails(0);
    }else{
        var matches = member.match(/(\d+)/);
        logger.log("Enter Code for " + matches[0]);
    }
});


  Then('Click Continue To Deduction Sources Information Page', function(){
    incomeInformationModel.continueToDeductionSourcesPage();
 });
  Then(/^Enter Deduction Sources Information Of \"([^\"]*)\"$/, function (member) {
    if(member.toUpperCase()=="APPLICANT"){
        incomeInformationModel.selectDeductionSourcesInfo(0);
    }else{
        var matches = member.match(/(\d+)/); 
        incomeInformationModel.selectDeductionSourcesInfo(matches[0]);
    }      
});
Then('Click Continue To Expected Income Information Page', function(){
    incomeInformationModel.continueToExpectedIncomePage();
 });
  Then(/^Enter Expected Income Information Of \"([^\"]*)\"$/, function (member) {
    if(member.toUpperCase()=="APPLICANT"){
        incomeInformationModel.selectExpectedIncomeInfo(0);
    }else{
        var matches = member.match(/(\d+)/); 
        incomeInformationModel.selectExpectedIncomeInfo(matches[0]);
    }
  });
Then('Click Continue To Member Income Summary Page', function(){
    incomeInformationModel.continueToMemberIncomeSummaryPage();
});
Then('Click Continue To Overall Income Summary Page', function(){
    incomeInformationModel.continueToSummaryPage();
});

Then('Click Continue On Income Summary Page', function(){
    additionalInfoPage.continueToOtherHealthCoveragePage();
    pauseBrowser(5000)
});
Then('Enter Income Information', function(){
    incomeInformationModel.enterIncomeInformation();
});


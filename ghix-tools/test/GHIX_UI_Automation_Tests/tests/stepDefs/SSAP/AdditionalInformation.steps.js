const {Given, Then, When} = require('cucumber');
const  additionalInformationModel = require('../../pagemodels/SSAP/AdditionalInformationPage');

 

Then('Click Save And Continue On Additional Information Summary Page', function(){
    additionalInformationModel.continueToReviewAndSignPage();    

});

Then('Enter Additional Information', function(){
    additionalInformationModel.enterAdditionalInformation();

});

Then('Click Continue To Other Health Coverage Information Page', function(){
    additionalInformationModel.continueToOtherHealthCoveragePage();

});
Then(/^Enter Other Health Coverage Information Of \"([^\"]*)\"$/, function (member) {
    if(member.toUpperCase()=="APPLICANT"){
        additionalInformationModel.selectOtherHealthCoverageInfo(0);
    }else{
        var matches = member.match(/(\d+)/); 
        additionalInformationModel.selectOtherHealthCoverageInfo(matches[0]);    
    }
    
  });
  Then('Click Continue To Reconciliation of APTC Information Page', function(){
    additionalInformationModel.continueToReconciliationAptcPage();

});
  Then(/^Enter Reconciliation of APTC Information Of \"([^\"]*)\"$/, function (member) {
    if(member.toUpperCase()=="APPLICANT"){
        additionalInformationModel.selectReconciliationOfAptcInfo(0);   
    }else{
        var matches = member.match(/(\d+)/); 
        additionalInformationModel.selectReconciliationOfAptcInfo(matches[0]);   
    }
  });
  Then('Click Continue To Employer Coverage Detail Information Page', function(){
    additionalInformationModel.continueToEmployerCoverageDetailPage();

});
  Then(/^Enter Employer Coverage Detail Information Of \"([^\"]*)\"$/, function (member) {
    if(member.toUpperCase()=="APPLICANT"){
        additionalInformationModel.selectEmployerCoverageDetailInfo(0);
    }else{
        var matches = member.match(/(\d+)/); 
        additionalInformationModel.selectEmployerCoverageDetailInfo(matches[0]);
    }
  });
  Then('Click Continue To State Employee Health Benefit Information Page', function(){
    additionalInformationModel.continueToStateEmployeeBenefitPage();

});
  
  Then(/^Enter State Employee Health Benefit Information Of \"([^\"]*)\"$/, function (member) {
    if(member.toUpperCase()=="APPLICANT"){
        additionalInformationModel.selectStateEmployeeHealthBenefitInfo(0);
    }else{
        var matches = member.match(/(\d+)/); 
        additionalInformationModel.selectStateEmployeeHealthBenefitInfo(matches[0]);
    } 
  });
  Then('Click Continue To Additional Information Page', function(){
    additionalInformationModel.continueToAdditionalInformationPage();

});
  
  Then(/^Enter Additional Information Of \"([^\"]*)\"$/, function (member) {
    if(member.toUpperCase()=="APPLICANT"){
        additionalInformationModel.selectAdditionalInfo(0);
    }else{
        var matches = member.match(/(\d+)/); 
        additionalInformationModel.selectAdditionalInfo(matches[0]);
    }
  });
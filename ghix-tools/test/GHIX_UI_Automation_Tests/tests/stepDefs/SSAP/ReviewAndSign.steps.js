const {Given, Then, When} = require('cucumber');
const  reviewAndSignModel = require('../../pagemodels/SSAP/ReviewAndSignPage');

 
Then('Click Continue On Review And Sign Page', function(){
    reviewAndSignModel.continueToFinalReviewPage();     
});

Then('Click Continue On Final Review Page', function(){
    reviewAndSignModel.continueToSignAndSubmit();    
});

Then('Agree To Terms On Sign And Submit', function(){
    reviewAndSignModel.agreeToTerms(); 
});
Then('Submit Application', function(){
    reviewAndSignModel.submitApplication();
});

Then('Review The Details And Sign', function(){
    reviewAndSignModel.reviewAndSign();
});
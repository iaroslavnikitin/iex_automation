const {Then} = require('cucumber');
const  esignature = require('../../pagemodels/PlanDisplay/ESignaturePage');


Then('Check The Term And Sign', function(){
    esignature.agreeToTermsAndSign();
});

Then('ESign The Application', function(){
    esignature.enterFullNameAndSign();
});

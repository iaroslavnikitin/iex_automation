const {Given, Then, When} = require('cucumber');
const  commonComparePlansfunc = require('../../pagemodels/PlanDisplay/CommonComparePlansPage');


Then('Go Back To Plans Page', function(){
    commonComparePlansfunc.clickOnBackToPlansLink();
});


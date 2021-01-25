const {Given, Then, When} = require('cucumber');
const  dentalPlan = require('../../pagemodels/PlanDisplay/DentalPlanDisplayPage.js');
const  commonfunc = require('../../pagemodels/PlanDisplay/CommonPlanDisplayFunction');




Then('Add Dental Plan To Cart', function(){
   // dentalPlan.addDentalPlan();
   dentalPlan.addRandomDentalPlan();
});
Then('Click Continue To Cart Page', function()
{
 dentalPlan.continueToCartPage();
});

Then('Add Dental Plan To Cart and Continue To Cart Page', function()
{
    dentalPlan.addRandomDentalPlan();
    console.log("added dental plan")
    dentalPlan.clickContinueToCartPage();
});

Then('Verify Dental Plan Page', function()
{
    dentalPlan.verifyDentalPlanDisplayPage();
});

Then('Verify Sort By Filter On Dental Plan Page', function()
{
    dentalPlan.verifySortByFilterOnDentalPlan();
});

Then('Verify Filter By Plan Type On Dental Plan Page', function(){
    dentalPlan.verifyFilterOnPlanType();
});

Then('Verify Filter By Plan Tier On Dental Plan Page', function(){
    dentalPlan.verifyFilterOnPlanTier();
});

Then('Verify Filter By Deductible On Dental Plan Page', function(){
    dentalPlan.verifyFilterOnDeductible();
});

Then('Verify Filter By Company On Dental Plan Page', function(){
    commonfunc.verifyFilterOnCompany();
});

Then('Verify Details On Dental Page', function(){
    dentalPlan.verifyDentalPlanDetails();
});

Then('Verify Dental Plan Details Page', function(){
    //dentalPlan.verifyDentalPlanDisplayPage();
});
Then('Verify Dental Compare Plans', function(){
    dentalPlan.verifyDentalCompare();
});

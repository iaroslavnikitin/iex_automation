const {Given, Then, When} = require('cucumber');
const  healthPlan = require('../../pagemodels/PlanDisplay/HealthPlanDisplayPage.js');
const  commonfunc = require('../../pagemodels/PlanDisplay/CommonPlanDisplayFunction');




Then('Add Health Plan To Cart', function(){
    //healthPlan.addHealthPlan();
    healthPlan.addRandomHealthPlan();
});

Then('Click Continue To Dental Plans', function()
{
 healthPlan.clickContinueToDentalPlans();
});

Then('Add Health Plan To Cart And Continue', function(){
    //healthPlan.addHealthPlan();
    healthPlan.addRandomHealthPlan();
    healthPlan.clickContinueToDentalPlans();
});

Then('Verify Health Plan Page', function()
{
    healthPlan.verifyHealthPlanPage();
});

Then('Filter Catastrophic Health Plans', function()
{
    healthPlan.filterByMetalTierCatastrophic();
});

Then('Select A Health Plan And Add It To Cart From Plan Details Page', function()
{
    healthPlan.addHealthPlanFromDetailsPage();
});

Then('Click Continue To Cart From Health Plan', function()
{
    healthPlan.continueToCartPage();
});

Then('Verify SortBy Filter On Health Plan Page', function(){
    healthPlan.verifySortByFilterOnHealthPlan();
});

Then('Verify Filter By Plan Type On Health Plan Page', function(){
    healthPlan.verifyFilterOnPlanType();
});

Then('Verify Filter By Plan Features On Health Plan Page', function(){
    healthPlan.verifyFilterOnPlanFeatures();
});

Then('Verify Filter By Metal Tier On Health Plan Page', function(){
    healthPlan.verifyFilterOnMetalTier();
});

Then('Verify Filter By Deductible On Health Plan Page', function(){
    healthPlan.verifyFilterOnDeductible();
});

Then('Verify Filter By Company On Health Plan Page', function(){
    commonfunc.verifyFilterOnCompany();
});

Then('Verify Health Plan Details', function(){
    healthPlan.clickOnPlanDetail();
});

Then('Verify Health Compare Plans', function(){
    healthPlan.verifyHealthCompare();
});

Then('Click On Dental Plans', function()
{
 healthPlan.clickOnDentalPlans();
});


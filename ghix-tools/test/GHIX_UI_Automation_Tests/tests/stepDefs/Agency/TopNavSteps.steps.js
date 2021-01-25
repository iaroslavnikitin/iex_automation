const { Given, Then, When } = require('cucumber');
const { clickAgencyLink } = require('../../pagemodels/HomePage/LandingPage');
const topNavModel=require('../../pagemodels/Agency/TopNavBarModel');


Then(/^Go To Agents>>Add New Agent Page$/, function()
{
    topNavModel.selectAddNewAgent();
});

Then (/^Go to Add Admin Staff$/,function()
{
    topNavModel.selectAddNewAddminStaff();
});
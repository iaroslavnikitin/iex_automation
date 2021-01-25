const { Given, Then, When } = require('cucumber');
const { clickAgencyLink } = require('../../pagemodels/HomePage/LandingPage');
const adminStaffPageModel=require('../../pagemodels/AdminStaff/AdminSaffInformatioPageModel');
const  global = require('../../pagemodels/Global_include');

Then(/^Add \"([^\"]*)\" with \"([^\"]*)\" to Agency with data (.*)$/, function(role, staffLevel,dataFileName)
{
    var adminStaffIndex = role.match(/(\d+)/);
    adminStaffPageModel.addNewAdminStaff(adminStaffIndex[0],staffLevel);


});
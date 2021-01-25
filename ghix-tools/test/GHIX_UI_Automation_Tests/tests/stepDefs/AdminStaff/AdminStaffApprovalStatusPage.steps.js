const { Given, Then, When } = require('cucumber');
const { clickAgencyLink } = require('../../pagemodels/HomePage/LandingPage');
const adminStaffPageModel=require('../../pagemodels/AdminStaff/AdminStaffApprovalStatusPageModel');
const  global = require('../../pagemodels/Global_include');


Then(/^Verify Approval Status of \"([^\"]*)\" is \"([^\"]*)\"$/, function(role,approvalStatus)
{
    var adminStaffIndex = role.match(/(\d+)/);
    adminStaffPageModel.verifyApprovalStatus(adminStaffIndex[0],approvalStatus);
});
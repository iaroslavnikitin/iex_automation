const { Given, Then, When } = require('cucumber');
const dashboardModel=require('../../pagemodels/AdminStaff/AdminStaffDashboardPageModel');
const  global = require('../../pagemodels/Global_include');

Then(/^I Should Be Navigated To Admin Staff Dashboard$/, function () {

    dashboardModel.verifyAdminStaffLandedOnDashboard();

});
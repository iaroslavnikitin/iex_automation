const {Given, Then, When} = require('cucumber');
const  logIn = require('../../pagemodels/UserAccountManagement/LogInPage.js');
const  dashBoard = require('../../pagemodels/MemberPortal/DashBoardPage');
const  pageHeader = require('../../pagemodels/CommonPageFunctions/PageHeader.js');
const  adminDashboardModel = require('../../pagemodels/CAP/AdminDashboardPage.js');

const  global = require('../../pagemodels/Global_include');


Then(/^I enter username (.*) and Password (.*)$/, function(username, password){
    console.log("*******"+username);
    logIn.enterLogInCredentials(username, password);
});

Then(/^I Enter Username (.*), Password (.*) And Submit$/, function(username, password){
    console.log("*******"+username);
    logIn.enterLogInCredentialsAndSubmit(username, password);
});

Then('Click Submit button', function()
{
    logIn.clickSubmit();
});
 
  
  //When user passes individual email
  Then(/^Enter user details (.*)$/, function(username){
  logIn.enterLogInCredentials(username, "ghix123#");
 
  });

  //When user is created by dynamically
  Then(/^Enter Individual details (.*)$/, function(fileName){
    data = require('../../resources/data/Common/SSAP'+fileName);
    logIn.enterLogInCredentials(data.email, "ghix123#");
  });

   Then(/^Verify I Am On Admin Dashboard (.*)$/, function(admin){
    console.log("The Admin credential passed is >>>"+ admin);
    adminDashboardModel.verifyAdminDashboard(admin);
  });

  Then('I LogOut', function(){
    console.log("Accounts logout");
    logIn.logout();

  });

  Then(/^I Log In With Username (.*) And Role (.*)$/, function(user, role){
    console.log("*******"+user);
    let emailPassword = logIn.retieveLoginCredentials(user,role);
    pageHeader.clickLogInAndEnterUsernameAndPasswordAndSubmit(emailPassword[0], emailPassword[1]);
  });

  /*Then(/^I Log In With Username (.*) And Role (.*)$/, function(user, role){
    console.log("*******"+user);
    let userName;
    let password;
    let loginRole = loginCredentials[role];
    let emailPassword = loginRole[user];
    userName = emailPassword.email;
    password = emailPassword.password;
    console.log(userName + " = " + password);
      pageHeader.clickLogInAndEnterUsernameAndPasswordAndSubmit(userName, password);
  });*/

  /*Then(/^I Log In With Username (.*) And Password (.*)$/, function(username, password){
    console.log("*******"+username);
    pageHeader.clickLogInAndEnterUsernameAndPasswordAndSubmit(username, password);
  });*/
  
  Then('I Log In With Member Username And Password', function(){
    let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
    let member_email = global.updateDataJson.households[householdIndex].applicants[0].email;
    let member_password = global.updateDataJson.households[householdIndex].password;
    pageHeader.clickLogInAndEnterUsernameAndPasswordAndClickSubmit(member_email, member_password);
  });

  Then (/^Log In With Agency Manager Username And Password$/,function() // make more generic
  {
      let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
      logIn.enterLogInCredentialsAndSubmit(global.updateDataJson.agencies[agencyIndex].agencyManager.username, global.updateDataJson.agencies[agencyIndex].agencyManager.password);
  });
  
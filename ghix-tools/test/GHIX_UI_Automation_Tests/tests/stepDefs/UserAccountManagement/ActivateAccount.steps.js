const {Given, Then, When} = require('cucumber');
const  activateAccountModel = require('../../pagemodels/UserAccountManagement/ActivateAccount.js');
const database = require('../../pagemodels/UserAccountManagement/DataBase')
const signUpPage =require('../../pagemodels/UserAccountManagement/IndividualSignupPage')
var global=require('../../pagemodels/Global_include');
const constants=require('../../common.utils/ConstantsAgentAgency')

Then(/^Activate Account$/, function(){
    activateAccountModel.activateAgentAccount();

});

Then(/^Activate User Account \"([^\"]*)\"$/, function(userRole){
    activateAccountModel.activateUserAccount(userRole);

});
//test -WORKS

Then(/^Activate Account Of \"([^\"]*)\"$/, function(role){

    var adminStaffIndex = role.match(/(\d+)/);
    let uRole=role.slice(0,role.search(/(\d+)/));
    console.log("********** RR="+uRole+"**********");
    let userRole=constants.getUserRoleFromString(uRole.trim());
    console.log("********** RR="+userRole+"**********");
    activateAccountModel.activateUserAccount(userRole,adminStaffIndex[0]);

});
//original working

// Then(/^Activate \"([^\"]*)\" Account With Index \"([^\"]*)\"$/, function(role,index){
//
//     let userRole=constants.getUserRoleFromString(role);
//     activateAccountModel.activateUserAccount(userRole,index);
//
// });


Then(/^Fill \"([^\"]*)\" Setup Page Details and Click Submit$/, function (role) {

    let globalJsonIndex = 0;
    var dataJson;
    if (role == "agencyManager" || role == "adminStaffs" || role == "agent") {
        globalJsonIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
        dataJson = global.updateDataJson.agencies[globalJsonIndex];
    }else{
        globalJsonIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        dataJson = global.updateDataJson.households[globalJsonIndex];
    }

    activateAccountModel.setUpAccount(role);
    signUpPage.continueToAccountForID(dataJson[role].username,dataJson[role].password);
});


Then(/^Fill Setup Page Details for \"([^\"]*)\" and Click Submit$/, function (role) {
    
    var index = role.match(/(\d+)/);

    let uRole=role.slice(0,role.search(/(\d+)/));
    console.log("********** RR="+uRole+"**********");
    let userRole=constants.getUserRoleFromString(uRole.trim());
    console.log("********** userRole="+userRole+"**********");

    let globalJsonIndex = 0;
    var dataJson;
    if (userRole == "agencyManager" || userRole == "adminStaffs" || userRole == "agent") {
        globalJsonIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
        dataJson = global.updateDataJson.agencies[globalJsonIndex];
    }else{
        globalJsonIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        dataJson = global.updateDataJson.households[globalJsonIndex];
    }

    // let userRole=constants.getUserRoleFromString(role);
    if((index==undefined) || (index == null) || (index=="")) {
        index = 0;
        activateAccountModel.setupUserAccount(userRole, index);
        signUpPage.continueToAccountForID(dataJson[userRole][index].username, dataJson[userRole][index].password);
        //signUpPage.continueToAccountForID(global.updateDataJson.households[householdIndex][userRole][index].username, global.updateDataJson.households[householdIndex][userRole][index].password);
    }
    else
    {
        activateAccountModel.setupUserAccount(userRole, index[0]);
        signUpPage.continueToAccountForID(dataJson[userRole][index[0]].username, dataJson[userRole][index[0]].password);
        //signUpPage.continueToAccountForID(global.updateDataJson.households[householdIndex][userRole][index[0]].username, global.updateDataJson.households[householdIndex][userRole][index[0]].password);
    }
});
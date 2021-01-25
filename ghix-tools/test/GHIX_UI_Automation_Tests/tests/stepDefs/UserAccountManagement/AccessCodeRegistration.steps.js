const {Given, Then, When} = require('cucumber');
const  global = require('../../pagemodels/Global_include');
const  register = require('../../pagemodels/UserAccountManagement/RegisterWithAccessCode.js');
const browser = require('../../base/Browser');
const state = stateProfile.toUpperCase();
const logger = require('../../common.utils/LoggerUtil');

Then ('Navigate To Access Code Page', function(){
      register.navigateToAccessCodePage();
})

Then ('Enter Access Code And Submit', function(){
  register.enterAccessCode();
})


Then('Register With Access Code And Link', function(){
  let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
  switch(state) {
    case "PA":
    case "NJ":
      register.clickRegisterWithAccessCode();
      break;
    default:
      register.navigateToAccessCodePage();
  }
  register.enterAccessCode(global.updateDataJson.households[householdIndex].accessCode);
  register.enterReferralLinkingInfo();
})

Then('Setup Individual Account Inbound AT', function () {
  register.setUpIndividualAccountInboundAT();
});
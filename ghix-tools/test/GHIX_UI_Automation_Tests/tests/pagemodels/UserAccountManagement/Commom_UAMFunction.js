const landingPage = require('../HomePage/LandingPage')
const preelig = require('../Anonymous/PreEligibilityPage')
const indSigUp = require('./IndividualSignupPage');
const communicationPref = require('./CommunicationPreferencesPage')
const  logIn = require('../../pagemodels/UserAccountManagement/LogInPage.js');
const dataBase = require('./DataBase');
const JsonUtil = require('../../common.utils/JsonUtil');
const DataUtil = require('../../common.utils/DataUtil');
const constants = require('../../common.utils/Constants');
const state=stateProfile;  
const global = require('../Global_include');   


class CommonFunction {
  
    createIndividualAccountAndVerify(fileName,role) {
        this.createIndividual(fileName,role);
        dataBase.verifyIdentityOfIndividual();

    }
    createIndividualAccountAndLogout(fileName,role) {
      this.createIndividual(fileName,role);
      logIn.logout();

  }
    createIndividual(fileName,role) {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        landingPage.clickOnStartShopping();
        if (state.toUpperCase() == constants.STATE_PA)
        preelig.clickContinue();
        preelig.clickSkipAndSignUp();
        indSigUp.setUpIndividualAccount(fileName,role); 
        if (state.toUpperCase() != constants.STATE_ID) {
          communicationPref.FillUpdateMailingAddressDetails();
          communicationPref.clickSavePreferences();
        } else {
          indSigUp.continuetoAccount();
          communicationPref.enterCommunicationPreferences();
        }
        global.updateDataJson.households[householdIndex] = JsonUtil.updateApplicationStatus(global.updateDataJson.households[householdIndex],constants.APPLICATION_STATUS.CREATED);
      }

}
module.exports = new CommonFunction();

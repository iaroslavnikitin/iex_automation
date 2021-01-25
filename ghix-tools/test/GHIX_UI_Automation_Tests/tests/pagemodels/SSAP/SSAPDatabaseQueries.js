const prop = require('../../common.utils/PropertyReader');
var state = prop.getEnvName();
const DbHelper = require('../../common.utils/DbHelper');
const assert = require('../../base/Assert');
const global = require('../Global_include');
var dbHelper = new DbHelper(url);
var queryResult = false;
const logger=require('../../common.utils/LoggerUtil');

class EntityDatabaseQueries {

    
    async getIdFromDB(emailAddress) {
        logger.log("Get Id From DB");
        let getIdQuery = "select ID from cmr_household where email_address = '" + emailAddress.toLowerCase() + "'";
        let idValue = await dbHelper.getResultFromDB(getIdQuery, 'id');
        logger.log("idValue From DB: ", idValue);
        return idValue;

    }
    async getAptcAmountFromDB() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        logger.log("Get Aptc Amount From DB");
        let id = null;
        this.getIdFromDB(global.updateDataJson.households[householdIndex].applicants[0].email).then(idValue => {id = idValue;});
        browser.waitUntil(() => id !== null);
       let getAptcQuery = "select maximum_aptc from ssap_applications where CMR_HOUSEOLD_ID = " + id + " order by 1 desc";
       return await dbHelper.getResultFromDB(getAptcQuery, 'maximum_aptc');
    }
    async getCaseIdFromDB(emailAddress) {
        logger.log("Get Id From DB");
        let getIdQuery = "select external_household_case_id from cmr_household where email_address = '" + emailAddress.toLowerCase() + "'";
        let idValue = await dbHelper.getResultFromDB(getIdQuery, 'external_household_case_id');
        logger.log("Case Id From DB: ", idValue);
        return idValue;

    }


    async getstateSubsidyAmountFromDB() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        logger.log("Get stateSubsidy Amount From DB");
        let id = null;
        this.getIdFromDB(global.updateDataJson.households[householdIndex].applicants[0].email).then(idValue => {id = idValue;});
        browser.waitUntil(() => id !== null);
       let getAptcQuery = "select maximum_state_subsidy from ssap_applications where CMR_HOUSEOLD_ID = " + id + " order by 1 desc";
       return await dbHelper.getResultFromDB(getAptcQuery, 'maximum_state_subsidy');
    }
    async getDOBWithGivenPhoneNumber(phoneNumber) {
        logger.log("Check if phone exists in cmr_household table");
        phoneNumber=phoneNumber.replace('-','').replace('-','');
        let getDOBwithGivenPhone = "select birth_date from cmr_household where phone_number = '" + phoneNumber + "'";
        let dob = await dbHelper.getResultFromDB(getDOBwithGivenPhone, 'birth_date');
        return dob;
    }
}
module.exports = new EntityDatabaseQueries();
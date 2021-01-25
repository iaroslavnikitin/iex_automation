const prop = require('../../common.utils/PropertyReader');
var state = prop.getEnvName();
const DbHelper = require('../../common.utils/DbHelper');
const assert = require('../../base/Assert');
var dbHelper = new DbHelper(url);
const logger = require('../../common.utils/LoggerUtil');
const global = require('../Global_include');
const browser = require('../../base/Browser');
const constant = require('../../common.utils/Constants');


class DBQueries {

    updateJsonCmrHouseholdInformation() {
        //id, user_id, external_household_case_id
        this.getCmrHouseholdId()
        this.getUserId()
        this.getExternalHouseholdCaseId()
    }

    getCmrHouseholdId() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        let cmrHouseholdIdQuery = `select id from cmr_household where email_address = '${global.updateDataJson.households[householdIndex].applicants[0].email.toLowerCase()}'`;

        let id = undefined;
        let retries = 0;
        while (id == undefined && retries < 5) {
            id = this.setDBValue(cmrHouseholdIdQuery, 'id');
            retries++;
        }
        global.updateDataJson.households[householdIndex].cmrHouseholdId = id;
    }

    getUserId() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        let userIdQuery = `select user_id from cmr_household where email_address = '${global.updateDataJson.households[householdIndex].applicants[0].email.toLowerCase()}'`;
        global.updateDataJson.households[householdIndex].userId = this.setDBValue(userIdQuery, 'user_id');
    }

    getUserCount(email) {
        let userCountQuery = `select count(*) from users where email = '${email}'`;
        let result = this.setDBValue(userCountQuery, 'count');
        return result;
    }

    getExternalHouseholdCaseId() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        let externalHouseholdCaseIdQuery = `select external_household_case_id from cmr_household where email_address = '${global.updateDataJson.households[householdIndex].applicants[0].email.toLowerCase()}'`;
        global.updateDataJson.households[householdIndex].externalHouseholdCaseId = this.setDBValue(externalHouseholdCaseIdQuery, 'external_household_case_id');
    }

    getAccessCode() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        let query = `select token from account_activation where status = 'NOTPROCESSED' and created_object_id = '${global.updateDataJson.households[householdIndex].cmrHouseholdId}'`;

        let token = undefined;
        let retries = 0;
        while (token == undefined && retries < 5) {
            token = this.setDBValue(query, 'token');
            retries++;
        }
        global.updateDataJson.households[householdIndex].accessCode = token;
    }

    getCountyNameByZip() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        //ID and CA zipcode is not a string
        let query = "";
        switch (state) {
            case "CA":
            case "ID":
                query = `select county from zipcodes where zipcode = ${global.updateDataJson.households[householdIndex].primaryAddress.mailing.zip}`;
                break;
            default:
                query = `select county from zipcodes where zipcode = '${global.updateDataJson.households[householdIndex].primaryAddress.mailing.zip}'`;
        }
        global.updateDataJson.households[householdIndex].primaryAddress.mailing['countyName'] = this.setDBValue(query, 'county');
    }

    setSSAPApplicationId() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        let query = `select ssap_application_id from medicaid_outbound where household_case_id = '${global.updateDataJson.households[householdIndex].externalHouseholdCaseId}'`;
        global.updateDataJson.households[householdIndex].ssapApplicationId = this.setDBValue(query, 'ssap_application_id');

    }

    getMedicaidOutboundStatus() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        let query = `select status from medicaid_outbound where ssap_application_id = (${global.updateDataJson.households[householdIndex].ssapApplicationId})`;

        let status = undefined;
        let retries = 0;

        while (status == undefined && retries < 5) {
            status = this.setDBValue(query, 'status');
            retries++;
        }

        logger.log(`getMedicaidOutboundStatus: ${status}`);
        return status;



        while (status == undefined && retries < 5) {
            status = this.setDBValue(query, 'status');
            retries++;
        }
    }

    getGIWSPayloadResponseStatus() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        let query = `select status from gi_ws_payload where endpoint_function = 'MitC' and endpoint_operation_name = 'Determination' and ssap_application_id = (${global.updateDataJson.households[householdIndex].ssapApplicationId})`;
        let status = this.setDBValue(query, 'status');
        logger.log(`getGIWSPayloadStatus: ${status}`);
        return status;
    }

    getMedicaidInboundStatus() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        let query = `select status from medicaid_inbound where application_id = '${global.updateDataJson.households[householdIndex].externalHouseholdCaseId}'`;
        let status = this.setDBValue(query, 'status');
        logger.log(`getMedicaidOutboundStatus: ${status}`);
        return status;
    }

    quarantineMedicaidOutbound() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        let query = `update medicaid_outbound set status = 'QUARANTINED' where ssap_application_id = (${global.updateDataJson.households[householdIndex].ssapApplicationId})`;
        this.getDBUpdateRes(query);
        // This has to be about 1 min
        // to wait for responses to get through
        logger.log("Waiting for Outbound AT, Inbound Response.....");
        browser.pauseBrowser(60000);
    }

    async getValueFromDB(query, columnName) {
        logger.log(`Get ${columnName} query: ${query}`);
        let queryRes = await dbHelper.getResultFromDB(query, columnName);
        logger.log(`${columnName}:  ${queryRes}`);
        return queryRes;
    }

    setDBValue(query, columnName) {
        let id = null;
        this.getValueFromDB(query, columnName).then(res => {
            id = res;
        });
        browser.waitUntil(() => id !== null);
        return id;
    }

    async updateDB(query) {
        logger.log(`Update query: ${query}`);
        let queryRes = await dbHelper.update(query);
        logger.log(`Update Query Result:  ${queryRes}`);
        return queryRes;
    }

    getDBUpdateRes(query) {
        let id = null;
        this.updateDB(query).then(res => {
            id = res;
        });
        browser.waitUntil(() => id !== null);
        return id;
    }
}

module.exports = new DBQueries();
const DbHelper = require('../../common.utils/DbHelper');
var dbHelper = new DbHelper(url);
var queryResult = false;
const  logger = require('../../common.utils/LoggerUtil');

class AgentDatabaseQueries {

    async getAgencyCertificationStatusDBdata(businessName,expectedVal) {

        let query = "select certification_status from agency where business_legal_name = '" + businessName + "'";
        let key ='certification_status';  
        queryResult=await dbHelper.getValueFromDB(query,expectedVal,key);    
        return queryResult;  
    }

    async updateAgencyBusinessNameInAgencyDB(agencyJson){
        let query = "update agency set BUSINESS_LEGAL_NAME='"+agencyJson.businessName+"' where AGENCY_NAME='"+agencyJson.agencyName+"' and LICENSE_NUMBER='"+agencyJson.licenseNumber+"'";
        logger.log("*** query to update Agency Business Name in agency table: "+query);
        await dbHelper.update(query);
    }

    async updateAgencyBusinessNameInBrokersDB(agencyJson){
        let query = "update brokers set COMPANY_NAME='"+agencyJson.businessName+"' where AGENCY_ID=(select id from agency where AGENCY_NAME='"+agencyJson.agencyName+"' and LICENSE_NUMBER='"+agencyJson.licenseNumber+"')";
        logger.log("*** query to update Agency Business Name in brokers table: "+query);
        await dbHelper.update(query);
    }
}
module.exports = new AgentDatabaseQueries();
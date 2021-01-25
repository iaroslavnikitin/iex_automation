const DbHelper = require('../../common.utils/DbHelper.js');
var n = null;
var userID = null;
const logger=require('../../common.utils/LoggerUtil');
const global = require('../Global_include');



class DashBoardDatabaseQueries{

async updateGlobalDataJsonWithCaseNumber(email){
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        let dbHelper = new DbHelper(url);
        console.log("***** Fetching & updating casenumber in global data json ***** ")
        let query = "select case_number from ssap_applications sa inner join cmr_household ch on ch.id=sa.cmr_houseold_id where ch.email_address ='"+(global.updateDataJson.households[householdIndex].applicants[0].email).toLowerCase()+"'";
        let key = 'case_number'
        console.log(query);
        let caseNumber = await dbHelper.getResultFromDB(query, key)
        global.updateDataJson.households[householdIndex].caseNumber=caseNumber;    
    }

}

module.exports = new DashBoardDatabaseQueries();
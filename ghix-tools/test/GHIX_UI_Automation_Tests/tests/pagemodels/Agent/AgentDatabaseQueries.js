const DbHelper = require('../../common.utils/DbHelper');
var dbHelper = new DbHelper(url);
var queryResult = false;
class AgentDatabaseQueries {

    async getDBdata(email,expectedVal) {

        let query = "select certification_status from brokers where personal_email_address = '" + email + "'";
        let key ='certification_status';
        queryResult=await dbHelper.getValueFromDB(query,expectedVal,key);
        return queryResult;  
    }

}
module.exports = new AgentDatabaseQueries();
const DbHelper = require('../../common.utils/DbHelper');
var dbHelper = new DbHelper(url);
var queryResult = false;
class AdminStaffDatabaseQueries {

    async getApprovalStatusFromDB(email,expectedStatus) {

        let query = "select approval_status from agency_assistant where personal_email_address = '" + email + "'";
        let key ='approval_status';
        queryResult=await dbHelper.getValueFromDB(query,expectedStatus,key);
        return queryResult;
    }


}
module.exports = new AdminStaffDatabaseQueries();
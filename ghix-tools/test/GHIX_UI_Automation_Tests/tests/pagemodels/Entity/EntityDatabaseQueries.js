const prop = require('../../common.utils/PropertyReader');
var state = prop.getEnvName();
const DbHelper = require('../../common.utils/DbHelper');
const assert = require('../../base/Assert');
var dbHelper = new DbHelper(url);
var queryResult = false;
class EntityDatabaseQueries {

    
    async verifyCounselorStatusInDB(email,expectedVal) {
        
        let query = "select certification_status from ee_assisters where email_address = '" + email + "'";
        let key ='certification_status';  
       queryResult=await dbHelper.getValueFromDB(query,expectedVal,key);    
        assert.assertTrue(queryResult);
    }
    async verifyEntityStatusInDB(email,expectedVal) {

        let query = "select registration_status from ee_entities where primary_email_address = '" + email + "'";
        let key ='registration_status';  
       queryResult=await dbHelper.getValueFromDB(query,expectedVal,key);
        assert.assertTrue(queryResult);
    }

}
module.exports = new EntityDatabaseQueries();
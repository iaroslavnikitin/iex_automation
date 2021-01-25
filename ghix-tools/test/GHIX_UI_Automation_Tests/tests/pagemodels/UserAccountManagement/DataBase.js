const {Given, Then, When} = require('cucumber');
const  global = require('../Global_include'); 

const  DbHelper = require('../../common.utils/DbHelper');
const logger=require('../../common.utils/LoggerUtil');

class Database{
    
   async verifyIdentityOfIndividual(){
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
       
    //     browser.pause(60000);
        console.log ("*****ssap json="+global.updateDataJson.households[householdIndex].applicants[0].email)
        var dbHelper = new DbHelper(url);
        
        var email = global.updateDataJson.households[householdIndex].applicants[0].email;
        email = email.toLowerCase();
        await dbHelper.update("update cmr_household set ridp_verified ='Y' where email_address ='" +email+"'");
        var result =await dbHelper.select("select ridp_verified from cmr_household where email_address = '"+email+"'");
        logger.log(result);
    }

}
module.exports = new Database();
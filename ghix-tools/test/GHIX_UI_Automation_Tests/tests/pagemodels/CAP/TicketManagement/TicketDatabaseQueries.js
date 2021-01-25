const DbHelper = require('../../../common.utils/DbHelper');
var n = null;
var userID = null;
const logger=require('../../../common.utils/LoggerUtil');



class TicketDatabaseQueries{

async ticketNum(email){
    this.getUserId(email);
    browser.waitUntil(() => userID !== null);
    logger.log("User Id:   "+userID);
    let dbHelper = new DbHelper(url);
    var query = "select ticket_number from tkm_tickets where created_by = "+userID+" order by creation_timestamp desc";
    let key = 'ticket_number';
    logger.log(query);
    n = await dbHelper.getResultFromDB(query,key);
    return n;
    
}

async getUserId(email){
    var email = email.toLowerCase();
    let dbHelper = new DbHelper(url);
    var query = "select id from users where email = '"+email+"'";
    let key = 'id';
    logger.log(query);
    userID = await dbHelper.getResultFromDB(query,key);
    return userID;
}

}

module.exports = new TicketDatabaseQueries();
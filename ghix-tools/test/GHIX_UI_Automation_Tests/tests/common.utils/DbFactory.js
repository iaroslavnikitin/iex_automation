const PostgreDb = require('./PostgreDb.js');
const OracleDb = require('./OracleDb.js');
const ConnectionProperties = require('../../config/ConnectionProperties.json');

class DbFactory {
    static getProperties(endpoint) {
        return ConnectionProperties[endpoint];
    }
    static getDb(endpoint) {
        let properties = this.getProperties(endpoint);
        let username = gDatabaseUserName || properties['username'];
        let password = gDatabasePassword || properties['password'];
        let database = gDatabaseType || properties['database'];
        let server = gDatabaseServer || properties['server'];
        let port = gDatabasePort || properties['port'];
        console.log("Database Type: " + database);

        if (gDatabaseType === 'POSTGRESQL'|| database === 'postgres')
            return new PostgreDb(server, port, username, password);
        else return new OracleDb(server, port, username, password);
    }
}

module.exports = DbFactory;

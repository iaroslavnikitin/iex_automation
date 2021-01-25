const oracledb = require("oracledb");

class OracleDb {
  constructor(server, port, username, password) {
    this.config = {
      user: username,
      password: password,
      connectString: server + ":" + port + "/ghixdb",
      externalAuth: false,
    };
  }

  async select(query) {
    return await oracledb
      .getConnection(this.config)
      .then(async (conn) => {
        return await conn
          .execute(query)
          .then(function (data) {
            let arr = [];
            for (let i = 0; i < data.rows.length; i++) {
              let map = new Map();
              let row = data.rows[i];
              for (let j = 0; j < row.length; j++) {
                map.set(data.metaData[j].name.toLowerCase(), row[j]);
              }
              arr.push(map);
            }
            return arr;
          })
          .then((arr) => {
            conn.close();
            return arr;
          })
          .catch(function (err) {
            console.error(err);
            return conn.close();
          });
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  async update(query) {
    oracledb.autoCommit = true;
    return await oracledb
      .getConnection(this.config)
      .then(async (conn) => {
        return await conn
          .execute(query)
          .then((data) => {
            console.log(data);
            conn.close();
            return true;
          })
          .catch((err) => {
            console.error(err);
            conn.close();
            return false;
          });
      })
      .catch((err) => {
          console.error(err);
          return false;
      });
  }
}

module.exports = OracleDb;

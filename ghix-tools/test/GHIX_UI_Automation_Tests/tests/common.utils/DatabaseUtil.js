

/*
const {Client} = require('pg')
class DatabaseUtil{
   
    client = newClient({

        host: "sjc-pgqa1.eng.vimo.com",
        user: "nj2qa",
        password: "PTE1YTEDYjEsee3522TT",
        port:5444,
        database:"POSTGRESQL"
    })

    executeQuery(){

    client.connect()
    .then(()=> console.log("connected successfully"))
    //.then(()=> client.query("select * from users" )) //where email = $1",[""]
    //.then (results => console.table(results.rows))
    //.catch(e => console.log(e))
    .finally(() => client.end())
    console.log("Client disconnected successfully")

    }
}
var connectionString = "postgres://userName:password@serverName/ip:port/nameOfDatabase";
var pgClient = new pg.Client(connectionString);
pgClient.connect();
var query = pgClient.query("SELECT id from Customer where name = 'customername'");

//https://www.tothenew.com/blog/connect-to-postgresql-using-javascript/

*/
const DbFactory = require('./DbFactory.js');
var result;

class DbHelper {
    constructor(endpoint) {
        this.db = DbFactory.getDb(endpoint);
    }

    select(query) {
        return this.db.select(query);
    }
    async update(query) {
        return await this.db.update(query);
    }

    async verifyDbData(query, expected) {
        return await this.db.select(query)
            .then(actual => {
                if (actual.length === expected.length)
                    return actual;
                else
                    throw new Error('Expected ' + expected.length + ' number of rows. Got ' + actual.length);
            })
            .then(actual => {
                for (let row = 0; row < actual.length; row++) {
                    let actual_map = actual[row];
                    let expected_map = expected[row];
                    for (let [key, value] of expected_map) {
                        // Loop over each key in expected map and compare it with corresponding key in actual map
                        if (actual_map.get(key) !== value)
                            throw new Error('Values of row ' + row + " do not match");
                    }
                }
                return true;
            })
            .catch(err => {
                console.error(err);
                return false;
            });
    }
    
     async getValueFromDB(query, expectedval, key) {
        return await this.db.select(query)
            .then(result => {
                return result;
            }
            ).then(result => {
                if (result.length == 1) {
                    let actual_map = result[0];
                    if (actual_map.get(key).toUpperCase() === expectedval.toUpperCase())
                    {
                         console.log("***** "+key+" : "+actual_map.get(key)+" *****")
                         return true;
                    }
                    else
                    {
                       // console.log("***** Value From DB: "+actual_map.get(key)+" didn't match the expected value: "+expectedval+" *****");
                        return false;
                    }
                }
                else
                    return false;
            }).catch(err => {
                console.error(err);
                return false;
            });
    }

    async getResultFromDB(query, columnName) {
        return await this.db.select(query)
            .then(result => {
                if (result.length == 1) {
                    let actual_map = result[0];
                    return actual_map.get(columnName);
                }
                else
                    console.log("failed");


            }
            );
    }
}

module.exports = DbHelper;

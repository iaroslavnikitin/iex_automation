const pgp = require('pg-promise')({
    noWarnings: true
});

class PostgreDb {
    constructor(server, port, username, password) {
        this.db = pgp('postgres://' + username + ':' + password + '@' + server + ':' + port + '/' + username);
    }

    async select(query) {
        const data = await this.db.any(query);
        let arr = [];
        Object.keys(data).map(row_index => {
            let map = new Map();
            let row = data[row_index];
            Object.keys(row).map(key => {
                map.set(key.toLowerCase(), row[key]);
            });
            arr.push(map);
        });
        return arr;

    }
    async update(query) {
        return await this.db.none(query)
            .then(() => true)
            .catch(() => false);
    }
}
module.exports = PostgreDb;

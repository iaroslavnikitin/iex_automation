const randomData = require("../RandomDataGenerator");
const Global = require('../../pagemodels/Global_include');
const atConst = require("./ATConstants");
const fs = require('fs');
const crypto = require('crypto');
const soap = require('soap');
var http = require("https");

class DataGen {

    relationships (hh_size, singleParentHH) {

        const relationship = atConst.relationship();

        if (!hh_size || hh_size < 1 || hh_size > 10) {
            throw "Invalid household size: " + hh_size +
            "\nHoushold size should be between 1 and 10"
        };
        let r = [];

        //Parents/children relationship
        if (hh_size == 1) {
            var parents = 1;
            r[1] = null
        } else if (singleParentHH) {
            var parents = 1;
            r[1] = {};
            for (let i = 2; i <= hh_size; i++) {
                r[1][i] = relationship.CHILD;
            }
        } else {
            var parents = 2;
            r[1] = {};
            r[2] = {};
            r = {
                1: {2: relationship.SPOUSE},
                2: {1: relationship.SPOUSE}
            };
            for (let i = 3; i <= hh_size; i++) {

                r[1][i] = relationship.CHILD;
                r[2][i] = relationship.CHILD;
            }
        };

        //Children/parents relationship
        for (let i = parents; i < hh_size; i++) {
            r[i + 1] = {};
            if (hh_size == 1 || singleParentHH) {
                r[i + 1][1] = relationship.PARENT;
            } else {
                r[i + 1][1] = relationship.PARENT;
                r[i + 1][2] = relationship.PARENT;
            }
        };

        //Siblings relationship
        for (let i = parents; i < hh_size; i++) {
            for (let j = parents; j < hh_size; j++) {
                if (i !== j) {
                    r[i + 1][j + 1] = relationship.SIBLING;
                }
            }
        }

        console.log("Relationship created " + JSON.stringify(r));

        return r
    }

}

module.exports = new DataGen();
const randomData = require("./RandomDataGenerator");
const jsonUtil = require('../common.utils/JsonUtil');
const common = require("./CommonConfig");
const  global = require('../pagemodels/Global_include');
const fs = require('fs');
const crypto = require('crypto');
const soap = require('soap');
const http = require("https");
const request = require('request');
const browser = require('../base/Browser');

class AccountTransferUtils {

    generateATSSAPJson(){
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        global.updateDataJson.households[householdIndex] =  jsonUtil.readJson('resources/data/Common/SSAP/ssap.json');
    }

    TestCaseData() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        let serverInfo = common.getServerInfo();

        let ssn = randomData.genRandomSSN();
        let remoteId = 'WDIO' + ssn;
        let icnId = 'ICS' + ssn;
        let currentDateZ = new Date(serverInfo.now).toISOString();
        let currentDate = currentDateZ.split('T')[0];
        let aptcAmt = 150;
        let coverageYear = year;
        let eligibilityStartDate = coverageYear + '-01-01';
        let eligibilityEndDate = coverageYear + '-12-31';
        let email = ssn + '@yopmail.com';
        let phone = ssn + '3';
        let firstName = randomData.getRandomFirstName();
        let lastName = randomData.getRandomLastName();

        this.generateATSSAPJson();


        global.updateDataJson.households[householdIndex].applicationYear = coverageYear;
        global.updateDataJson.households[householdIndex].aptc = aptcAmt;
        global.updateDataJson.households[householdIndex].password = 'Ghix123#';
        global.updateDataJson.households[householdIndex].applicants[0].firstName = firstName;
        global.updateDataJson.households[householdIndex].applicants[0].lastName = lastName;
        global.updateDataJson.households[householdIndex].applicants[0].ssn = ssn;
        global.updateDataJson.households[householdIndex].applicants[0].email = email;
        global.updateDataJson.households[householdIndex].primaryContactPhone.mobile = phone;
        global.updateDataJson.households[householdIndex].primaryContactPhone.home = phone;
        global.updateDataJson.households[householdIndex].accountTransfer =
            {
            remote_id: remoteId,
            icn_id: icnId,
            current_date_UTCZ: currentDateZ,
            current_date_YYYY_MM_DD: currentDate,
            eligibility_start_date: eligibilityStartDate,
            eligibility_end_date: eligibilityEndDate,
        }
        console.log("TC Data: " + JSON.stringify(global.updateDataJson.households[householdIndex]));
        // return tcData;
    }


    TestCaseDataPA() {
        let serverInfo = common.getServerInfo();
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;

        let ssn = randomData.genRandomSSN();
        let remoteId1 = 'PAWD' + ssn + '11';
        let remoteId2 = remoteId1 + '11';
        let remoteId3 = remoteId1 + '12';
        let currentDateZ = new Date(serverInfo.now).toISOString();
        let currentDate = currentDateZ.split('T')[0];
        let coverageYear = global.updateDataJson.households[householdIndex].applicationYear;
        let eligibilityStartDate = coverageYear + '-01-01';
        let eligibilityEndDate = coverageYear + '-12-31';
        let firstName = randomData.getRandomFirstName();
        let lastName = randomData.getRandomLastName();
        let email = `${firstName}_${lastName}_${remoteId1}'@yopmail.com`;
        let phone = ssn + '3';
        let dob = randomData.getRandomDateOfBirth();

        global.updateDataJson.households[householdIndex] = {
            remote_id1: remoteId1,
            remote_id2: remoteId2,
            remote_id3: remoteId3,
            current_date_UTCZ: currentDateZ,
            current_date_YYYY_MM_DD: currentDate,
            eligibility_start_date: eligibilityStartDate,
            eligibility_end_date: eligibilityEndDate,
            coverage_year: coverageYear,
            person0_ssn: ssn,
            email_address_var: email,
            person0_phone_number: phone,
            person0_Fname: firstName,
            person0_Lname: lastName,
            person0_dob: dob,
            applicants:[     
            { 
             email: email
                }],
            password:"Ghix123#"            

        }
        console.log("TC Data: " + JSON.stringify(global.updateDataJson.households[householdIndex]));
        // return tcDataPA;
    }


    readXmlFile(inputfile) {
        let xml = fs.readFileSync(inputfile, 'utf-8');
        //console.log(xml);
        return xml;
    }

    generateAuthHeaderInfo(username, password) {
        let curDate = new Date();
        let created = curDate.toISOString();
        let nHash = crypto.createHash('sha1');
        nHash.update(created + Math.random());

        let nonce = nHash.digest('base64');
        let pDigest = soap.passwordDigest(nonce, created, password)

        let authHeaderInfo = {
            username: username,
            password: password,
            passwordDigest: pDigest,
            nonce: nonce,
            created: created
        }
        return authHeaderInfo;
    }

    generateUMString() {
        //let data = this.TestCaseData();
        let umAuthHeader = this.generateAuthHeaderInfo('exadmin@ghix.com', 'testpassword');
        let umXML = this.readXmlFile('resources/payloads/MN/user_management.xml');
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;

        umXML = umXML.replace(/UM_USERNAME/g, umAuthHeader.username);
        umXML = umXML.replace(/UM_PASSWORD/g, umAuthHeader.password);
        umXML = umXML.replace(/UM_NONCE/g, umAuthHeader.nonce);
        umXML = umXML.replace(/UM_CREATED/g, umAuthHeader.created);
        umXML = umXML.replace(/PERSON1_FIRST_NAME/g, global.updateDataJson.households[householdIndex].applicants[0].firstName);
        umXML = umXML.replace(/PERSON1_LAST_NAME/g, global.updateDataJson.households[householdIndex].applicants[0].lastName);
        umXML = umXML.replace(/REMOTE_ID/g, global.updateDataJson.households[householdIndex].accountTransfer.remote_id);
        umXML = umXML.replace(/PERSON1_EMAIL_ID/g, global.updateDataJson.households[householdIndex].applicants[0].email);
        console.log("UM xml request: " + umXML);

        return umXML;

    }

    generateATStringMN(inputfile) {
        //let data = this.TestCaseData();
        let atAuthHeader = this.generateAuthHeaderInfo('GI.MN*.DEV.001.001', 'MYk@I30*ubFqZ7Ua');
        let atXML = this.readXmlFile(`resources/payloads/MN/${inputfile}`);
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;

        atXML = atXML.replace(/AT_USERNAME/g, atAuthHeader.username);
        atXML = atXML.replace(/AT_PASSWORD_DIGEST/g, atAuthHeader.passwordDigest);
        atXML = atXML.replace(/AT_NONCE/g, atAuthHeader.nonce);
        atXML = atXML.replace(/AT_CREATED/g, atAuthHeader.created);
        atXML = atXML.replace(/REMOTE_ID/g, global.updateDataJson.households[householdIndex].accountTransfer.remote_id);
        atXML = atXML.replace(/CURRENT_DATE_UTCZ/g, global.updateDataJson.households[householdIndex].accountTransfer.current_date_UTCZ);
        atXML = atXML.replace(/CURRENT_DATE_YYYY-MM-DD/g, global.updateDataJson.households[householdIndex].accountTransfer.current_date_YYYY_MM_DD);
        atXML = atXML.replace(/ELIGIBILITY_START_DATE/g, global.updateDataJson.households[householdIndex].accountTransfer.eligibility_start_date);
        atXML = atXML.replace(/ELIGIBILITY_END_DATE/g, global.updateDataJson.households[householdIndex].accountTransfer.eligibility_end_date);      
        atXML = atXML.replace(/APTC_AMT/g, global.updateDataJson.households[householdIndex].aptc);
        atXML = atXML.replace(/COVERAGE_YEAR/g, global.updateDataJson.households[householdIndex].applicationYear);
        atXML = atXML.replace(/PERSON1_SSN/g, global.updateDataJson.households[householdIndex].applicants[0].ssn);
        atXML = atXML.replace(/PHONE_NUMBER_VAR/g, global.updateDataJson.households[householdIndex].primaryContactPhone.mobile);
        atXML = atXML.replace(/EMAIL_ADDRESS_VAR/g, global.updateDataJson.households[householdIndex].applicants[0].email);
        atXML = atXML.replace(/PERSON1_FIRST_NAME/g, global.updateDataJson.households[householdIndex].applicants[0].firstName);
        atXML = atXML.replace(/PERSON1_LAST_NAME/g, global.updateDataJson.households[householdIndex].applicants[0].lastName);

        console.log("AT xml request: " + atXML);

        return atXML;

    }

    generateATStringCA(inputfile) {
        //let data = this.TestCaseData();
        let atAuthHeader = this.generateAuthHeaderInfo('GI.ID*.ABC.001.001', 'kYL@I30ubFqZ7Ua');
        let atXML = this.readXmlFile(`resources/payloads/CA/${inputfile}`);
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;

        atXML = atXML.replace(/AT_USERNAME/g, atAuthHeader.username);
        atXML = atXML.replace(/AT_PASSWORD_DIGEST/g, atAuthHeader.passwordDigest);
        atXML = atXML.replace(/AT_NONCE/g, atAuthHeader.nonce);
        atXML = atXML.replace(/AT_CREATED/g, atAuthHeader.created);
        atXML = atXML.replace(/REMOTE_ID/g, global.updateDataJson.households[householdIndex].accountTransfer.remote_id);
        atXML = atXML.replace(/CURRENT_DATE_UTCZ/g, global.updateDataJson.households[householdIndex].accountTransfer.current_date_UTCZ);
        atXML = atXML.replace(/CURRENT_DATE_YYYY-MM-DD/g, global.updateDataJson.households[householdIndex].accountTransfer.current_date_YYYY_MM_DD);
        atXML = atXML.replace(/ELIGIBILITY_START_DATE/g, global.updateDataJson.households[householdIndex].accountTransfer.eligibility_start_date);
        atXML = atXML.replace(/ELIGIBILITY_END_DATE/g, global.updateDataJson.households[householdIndex].accountTransfer.eligibility_end_date);

        atXML = atXML.replace(/APTC_AMT/g, global.updateDataJson.households[householdIndex].aptc);
        atXML = atXML.replace(/COVERAGE_YEAR/g, global.updateDataJson.households[householdIndex].applicationYear);
        atXML = atXML.replace(/PERSON1_SSN/g, global.updateDataJson.households[householdIndex].applicants[0].ssn);
        atXML = atXML.replace(/PHONE_NUMBER_VAR/g, global.updateDataJson.households[householdIndex].primaryContactPhone.mobile);
        atXML = atXML.replace(/EMAIL_ADDRESS_VAR/g, global.updateDataJson.households[householdIndex].applicants[0].email);

        console.log("AT xml request: " + atXML);

        return atXML;

    }


    generateATStringPA(inputfile) {
        let atAuthHeader = this.generateAuthHeaderInfo('GI.PA*.DEV.002.001', 'NYk@I30*nvFqZ7PA');
        let atXML = this.readXmlFile(`resources/payloads/PA/${inputfile}`);
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;

        atXML = atXML.replace(/AT_USERNAME/g, atAuthHeader.username);
        atXML = atXML.replace(/AT_PASSWORD_DIGEST/g, atAuthHeader.passwordDigest);
        atXML = atXML.replace(/AT_NONCE/g, atAuthHeader.nonce);
        atXML = atXML.replace(/AT_CREATED/g, atAuthHeader.created);
        atXML = atXML.replace(/REMOTE_ID_1/g, global.updateDataJson.households[householdIndex].remote_id1);
        atXML = atXML.replace(/REMOTE_ID_2/g, global.updateDataJson.households[householdIndex].remote_id2);
        atXML = atXML.replace(/REMOTE_ID_3/g, global.updateDataJson.households[householdIndex].remote_id3);
        atXML = atXML.replace(/CURRENT_DATE_UTCZ/g, global.updateDataJson.households[householdIndex].current_date_UTCZ);
        atXML = atXML.replace(/CURRENT_DATE_YYYY-MM-DD/g, global.updateDataJson.households[householdIndex].current_date_YYYY_MM_DD);
        atXML = atXML.replace(/ELIGIBILITY_START_DATE/g, global.updateDataJson.households[householdIndex].eligibility_start_date);
        atXML = atXML.replace(/ELIGIBILITY_END_DATE/g, global.updateDataJson.households[householdIndex].eligibility_end_date);
        atXML = atXML.replace(/PERSON0_SSN/g, global.updateDataJson.households[householdIndex].person0_ssn);
        atXML = atXML.replace(/PHONE_NUMBER_0/g, global.updateDataJson.households[householdIndex].person0_phone_number);
        atXML = atXML.replace(/EMAIL_ADDRESS_0/g, global.updateDataJson.households[householdIndex].person0_email_address);
        atXML = atXML.replace(/FIRST_NAME_0/g, global.updateDataJson.households[householdIndex].person0_Fname);
        atXML = atXML.replace(/LAST_NAME_0/g, global.updateDataJson.households[householdIndex].person0_Lname);
        atXML = atXML.replace(/DOB_0/g, global.updateDataJson.households[householdIndex].person0_dob);

        console.log("AT xml request: " + atXML);

        return atXML;

    }

    generateUserManagementCall(umXML) {
        //let umXML = this.generateUMString();
        let headers = {
            "content-type": "text/xml;charset=UTF-8",
            "soapaction": "http://mn1dev.ghixqa.com/provision/createuser",
            "accept": "text/xml, text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2",
            "connection": "keep-alive"
        }

        let options = {
            "method": "POST",
            "hostname": url.split("/")[2],
            "port": 8443,
            "path": "/service/UserManagementService",
            "rejectUnauthorized": false,
            "headers": headers
        };

        this.requestPost(umXML, options);

    }



    requestPost(payload, options){
        let req = http.request(options, function (res) {

            let chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
                console.log('statusCode:', res.statusCode);
                console.log('headers:', res.headers);
            });

            res.on("end", function () {
                let body = Buffer.concat(chunks);
                console.log(body.toString());
            });

            req.on('error', (e) => {
                console.error(e);
            });

        });

        req.write(payload);
        req.end();
    }

    generateAccountTransferCall(atXML) {
        //let atXML = this.generateATString();
        let headers = {
            "Accept-Encoding": "gzip,deflate",
            "Content-Type": "application/soap+xml;charset=UTF-8",
            "User-Agent": "Apache-HttpClient/4.5.2 (Java/1.8.0_181)"
        }

        console.log (" inside generateAccountTransferCall() --- " + url.split("/")[2]);

        let options = {
            "method": "POST",
            "hostname": url.split("/")[2],
            "port": null,
            "path": "/ghix-eligibility/endpoints/AccountTransfer",
            "rejectUnauthorized": false,
            "headers": headers
        };

        let ab= this.requestPost(atXML, options);

    }

    generateAccountTransferCalPA(atXML) {
        //let atXML = this.generateATString();
        let headers = {
            "Accept-Encoding": "gzip,deflate",
            "Content-Type": "application/soap+xml;charset=UTF-8",
            "User-Agent": "Apache-HttpClient/4.5.2 (Java/1.8.0_181)"
        }

        console.log (" inside generateAccountTransferCall() --- " + url.split("/")[2]);

        let options = {
            "method": "POST",
            "hostname": url.split("/")[2],
            "port": 8443,
            "path": "/medicaid/soap/v24/account-transfer",
            "rejectUnauthorized": false,
            "headers": headers
        };

        this.requestPost(atXML, options);
    }

    getServerTime() {
        browser.url(url + '/ui/ping');
        let json = JSON.parse(browser.getHTML('body pre', false));
        return json;

        let options = {
            "method": "GET",
            "hostname": url.split("/")[2],
            "port": null,
            "path": "/ui/ping",
            "rejectUnauthorized": false
        };

        this.requestPost(atXML, options);
    }


    createAccountTransferMN(inputfile){
        this.TestCaseData();
        let umXML = this.generateUMString();
        let atXML = this.generateATStringMN(inputfile);

        this.generateUserManagementCall(umXML);
        this.generateAccountTransferCall(atXML);
    }

    createAccountTransferCA(inputfile){
        this.TestCaseData();
        let atXML = this.generateATStringCA(inputfile);
        this.generateAccountTransferCall(atXML);
    }

    createAccountTransferPA(inputfile){
        this.TestCaseDataPA();
        let atXML = this.generateATStringPA(inputfile);
        this.generateAccountTransferCalPA(atXML);
    }
}


module.exports = new AccountTransferUtils();
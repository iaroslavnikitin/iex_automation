const prop = require('../PropertyReader');
var state = prop.getEnvName();
const jsonUtil = require('../JsonUtil');
const atDB = require('../../pagemodels/CommonDBQueries/DBQueries');
const common = require("../CommonConfig");
const global = require('../../pagemodels/Global_include');
const fs = require('fs');
const crypto = require('crypto');
const soap = require('soap');
const http = require("https");
const dbquery = require('../../pagemodels/CommonDBQueries/DBQueries');
const logger = require('../../common.utils/LoggerUtil');
const assert = require("../../base/Assert.js");
const browser = require('../../base/Browser');

const randomData = require("../RandomDataGenerator");

const atc = require('../ATFactory');
const atConfigs = atc.getATConfig(server);

function nocache(module) {
    require("fs").watchFile(require("path").resolve(module), () => {
        delete require.cache[require.resolve(module)]
    })
}


class StaticUtilsMulti {

    generateATSSAPJson(applicantsNbr) {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        global.updateDataJson.households[householdIndex] = jsonUtil.readJson('resources/data/Common/SSAP/ssap.json');

        //Remove applicants from JSON to auto generate later
        delete global.updateDataJson.households[householdIndex].applicants;
    }

    updateApplicant(hhLastName) {
        //generate household last name if not provided
        // TODO: medicaidIds = check real world values
        if (!hhLastName) {
            let hhLastName = randomData.getRandomLastName();
        }
        let fn = randomData.getRandomFirstName();
        let ssn = randomData.genRandomSSN();
        let email = randomData.getRandomEmail(fn);
        let medicaidId = randomData.getRandomInt(10000000000, 100000000000);


        let applicant = {
            "memberId": "3819",
            "guid": "1000005824",
            "firstName": fn,
            "lastName": hhLastName,
            "gender": "Female",
            "ssn": ssn,
            "sameNameOnSSN": true,
            "suffix": "",
            "relation": "SELF",
            "dateOfBirth": "01/01/1980",
            "email": email,
            "isNative": false,
            "isDisabled": false,
            "helpWithActivities": false,
            "isPregnant": false,
            "noOfBabies": 0,
            "seekingCoverage": true,
            "seeksQHP": true,
            "exchangeEligible": true,
            "aptcEligible": true,
            "stateSubsidyEligible": true,
            "csrEligible": false,
            "assessedMedicaidMAGIEligibile": false,
            "assessedChipEligible": false,
            "assessedMedicaidnonMAGIEligibile": false,
            "assessedCHIPnonMAGIEligibile": false,
            "medicaidId": medicaidId,
            "medicaidMAGIEligibile": false,
            "medicaidNonMAGIEligibile": false,
            "chipEligible": false,
            "nativeAmerican": false,
            "csrLevel": null,
            "middleName": "",
            "nameSuffix": "",
            "fosterCareIndicator": false,
            "isStudent": false,
            "isDeniedMedicaid": false,
            "relationship": [
                {
                    "guid": "",
                    "relation": "Spouse"
                }
            ],
            "sameAsApplicantAddress": true,
            "address": {
                "addressLine1": "",
                "addressLine2": "",
                "city": "",
                "state": "",
                "county": "",
                "zip": ""
            },
            "immigration": {
                "isCitizen": true,
                "isNaturalizedCitizen": false
            },
            "ethnicityRace": {
                "isHispanic": false,
                "race": ""
            },
            "income": {
                "isGettingIncome": true,
                "sourceOfIncome": "Job",
                "nameOfEmployer": "StarShip",
                "amount": 45000,
                "frequency": "Yearly",
                "deductionSources": {
                    "sourceOfIncome": "Job",
                    "nameOfEmployer": "StarShip",
                    "amount": 45000,
                    "frequency": "Yearly"
                },
                "payingDeductions": "no",
                "expectedIncomeInNextYear": {
                    "expectingSameIncome": "Yes",
                    "unknownIncome": true,
                    "totalExpectedYearlyAmount": 45000
                }
            }
        };

        return applicant;
    }


    generateApplicants(hhSize) {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        var obj = {applicants: []};
        let hhLastName = randomData.getRandomLastName();
        logger.log("Inside generateApplicants");
        for (let index = 0; index < hhSize; index++) {
            logger.log(index + " - Inside generateApplicants")
            let app = this.updateApplicant(hhLastName);
            obj['applicants'].push(app);
        }
        //add generated applicants
        global.updateDataJson.households[householdIndex]['applicants'] = obj.applicants;
    }

    generateATString(inputfile) {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;

        logger.log("AT user: " + atConfigs.at_user);
        logger.log("AT pass: " + atConfigs.at_pass);
        let atAuthHeader = this.generateAuthHeaderInfo(atConfigs.at_user, atConfigs.at_pass);
        let atXML = this.readXmlFile(`resources/payloads/${state.toUpperCase()}/templates/${inputfile}`);

        atXML = atXML.replace(/AT_USERNAME/g, atAuthHeader.username);
        atXML = atXML.replace(/AT_PASSWORD_DIGEST/g, atAuthHeader.passwordDigest);
        atXML = atXML.replace(/AT_NONCE/g, atAuthHeader.nonce);
        atXML = atXML.replace(/AT_CREATED/g, atAuthHeader.created);

        //TODO: state specific ids generation?
        atXML = atXML.replace(/REMOTE_ID/g, global.updateDataJson.households[householdIndex].accountTransfer.remoteId);
        atXML = atXML.replace(/EXCHANGE_ID/g, global.updateDataJson.households[householdIndex].accountTransfer.exchangeId);
        atXML = atXML.replace(/APPLICATION_ID/g, global.updateDataJson.households[householdIndex].accountTransfer.applicationId);
        atXML = atXML.replace(/REFERRAL_ACTIVITY_ID/g, global.updateDataJson.households[householdIndex].accountTransfer.referralActivityId);


        atXML = atXML.replace(/CURRENT_DATE_UTCZ/g, global.updateDataJson.households[householdIndex].accountTransfer.currentDateZ);
        atXML = atXML.replace(/CURRENT_DATE_YYYY-MM-DD/g, global.updateDataJson.households[householdIndex].accountTransfer.currentDateYYYYMMDD);
        atXML = atXML.replace(/ELIGIBILITY_START_DATE/g, global.updateDataJson.households[householdIndex].accountTransfer.eligibilityStartDate);
        atXML = atXML.replace(/ELIGIBILITY_END_DATE/g, global.updateDataJson.households[householdIndex].accountTransfer.eligibilityEndDate);

        atXML = atXML.replace(/APTC_AMT/g, global.updateDataJson.households[householdIndex].aptc);
        atXML = atXML.replace(/COVERAGE_YEAR/g, global.updateDataJson.households[householdIndex].applicationYear);
        atXML = atXML.replace(/PHONE_NUMBER_VAR/g, global.updateDataJson.households[householdIndex].primaryContactPhone.mobile);
        for (let i = 0; i < global.updateDataJson.households[householdIndex].applicants.length; i++) {
            let index = i + 1;
            let firstNameReplaceStr = new RegExp(`PERSON${index}_FIRST_NAME`, "g");
            let lastNameReplaceStr = new RegExp(`PERSON${index}_LAST_NAME`, "g");
            let ssnReplaceStr = new RegExp(`PERSON${index}_SSN`, "g");
            let emailReplaceStr = new RegExp(`PERSON${index}_EMAIL`, "g");
            let medicaidIDReplaceStr = new RegExp(`PERSON${index}_MEDICAID_ID`)

            atXML = atXML.replace(firstNameReplaceStr, global.updateDataJson.households[householdIndex].applicants[i].firstName);
            atXML = atXML.replace(lastNameReplaceStr, global.updateDataJson.households[householdIndex].applicants[i].lastName);
            atXML = atXML.replace(ssnReplaceStr, global.updateDataJson.households[householdIndex].applicants[i].ssn);
            atXML = atXML.replace(emailReplaceStr, global.updateDataJson.households[householdIndex].applicants[i].email);
            atXML = atXML.replace(medicaidIDReplaceStr, global.updateDataJson.households[householdIndex].applicants[i].medicaidId);
        }

        logger.log("AT xml request: " + atXML);

        return atXML;

    }

    TestCaseData(hhSize) {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;

        if (!hhSize) {
            hhSize = 1;
        }

        this.generateATSSAPJson();
        this.generateApplicants(hhSize);

        let serverInfo = common.getServerInfo();
        let remoteId = 'WDIO' + global.updateDataJson.households[householdIndex].applicants[0].ssn;
        let icnId = 'ICS' + global.updateDataJson.households[householdIndex].applicants[0].ssn;
        let currentDateZ = new Date(serverInfo.now).toISOString();
        let currentDate = currentDateZ.split('T')[0];
        let aptcAmt = 150;
        let coverageYear = year;
        let eligibilityStartDate = coverageYear + '-01-01';
        let eligibilityEndDate = coverageYear + '-12-31';
        let phone = global.updateDataJson.households[householdIndex].applicants[0].ssn + '3';

        //TODO: PA specific?

        /**
         * PA Outbound:
         *   <ns3:ActivityIdentification>
         *       <ns3:IdentificationID>PAWD48984805011</ns3:IdentificationID>
         *       <ns3:IdentificationCategoryText>Exchange</ns3:IdentificationCategoryText>
         *   </ns3:ActivityIdentification>
         */
        let exchangeId = state + "WD" + randomData.getRandomInt(1000000000, 10000000000);

        /**
         *  <ns5:ApplicationIdentification>
         *      <ns3:IdentificationID>PAWD4898480501111</ns3:IdentificationID>
         *  </ns5:ApplicationIdentification>
         */
        let applicationId = state + "WD" + randomData.getRandomInt(1000000000, 10000000000);

        /**
         * <ns7:ReferralActivity>
         *       <ns3:ActivityIdentification>
         *           <ns3:IdentificationID>PAWD4898480501112</ns3:IdentificationID>
         *       </ns3:ActivityIdentification>
         *  ........
         *  </ns7:ReferralActivity>
         * */
        let referralActivityId = state + "WD" + randomData.getRandomInt(1000000000, 10000000000);

        global.updateDataJson.households[householdIndex].applicationYear = coverageYear;
        global.updateDataJson.households[householdIndex].aptc = aptcAmt;
        global.updateDataJson.households[householdIndex].password = 'Ghix123#';
        global.updateDataJson.households[householdIndex].primaryContactPhone.mobile = phone;
        global.updateDataJson.households[householdIndex].primaryContactPhone.home = phone;

        //Account Transfer specific information
        global.updateDataJson.households[householdIndex].accountTransfer =
            {
                remoteId: remoteId,
                exchangeId: exchangeId,
                applicationId: applicationId,
                referralActivityId: referralActivityId,
                icnId: icnId,
                currentDateZ: currentDateZ,
                currentDateYYYYMMDD: currentDate,
                eligibilityStartDate: eligibilityStartDate,
                eligibilityEndDate: eligibilityEndDate,
            }
        logger.log("TC Data: " + JSON.stringify(global.updateDataJson.households[householdIndex]));
    }

    readXmlFile(inputfile) {
        let xml = fs.readFileSync(inputfile, 'utf-8');
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
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        let umAuthHeader = this.generateAuthHeaderInfo(atConfigs.um_user, atConfigs.um_pass);
        let umXML = this.readXmlFile('resources/payloads/MN/user_management.xml');

        umXML = umXML.replace(/UM_USERNAME/g, umAuthHeader.username);
        umXML = umXML.replace(/UM_PASSWORD/g, umAuthHeader.password);
        umXML = umXML.replace(/UM_NONCE/g, umAuthHeader.nonce);
        umXML = umXML.replace(/UM_CREATED/g, umAuthHeader.created);
        umXML = umXML.replace(/PERSON1_FIRST_NAME/g, global.updateDataJson.households[householdIndex].applicants[0].firstName);
        umXML = umXML.replace(/PERSON1_LAST_NAME/g, global.updateDataJson.households[householdIndex].applicants[0].lastName);
        umXML = umXML.replace(/REMOTE_ID/g, global.updateDataJson.households[householdIndex].accountTransfer.remoteId);
        umXML = umXML.replace(/PERSON1_EMAIL_ID/g, global.updateDataJson.households[householdIndex].applicants[0].email);

        logger.log("UM xml request: " + umXML);

        return umXML;

    }

    generateUserManagementCall(umXML) {
        let headers = {
            "content-type": "text/xml;charset=UTF-8",
            "soapaction": "http://mn1dev.ghixqa.com/provision/createuser",
            "accept": "text/xml, text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2",
            "connection": "keep-alive"
        }

        let options = {
            "method": "POST",
            "hostname": atConfigs.um_url,
            "port": atConfigs.um_port,
            "path": atConfigs.um_path,
            "rejectUnauthorized": false,
            "headers": headers
        };

        this.requestPost(umXML, options);
        browser.pauseBrowser(3000);

    }


    async requestPost(payload, options) {
        let req = http.request(options, function (res) {
            let chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
                logger.log('statusCode:', res.statusCode);
                logger.log('headers:', res.headers);
            });

            res.on("end", function () {
                let body = Buffer.concat(chunks);
                logger.log(body.toString());
            });

            req.on('error', (e) => {
                logger.error(e);
            });

        });

        req.write(payload);
        req.end();
    };





    generateAccountTransferCall(atXML) {
        let headers = {
            "Accept-Encoding": "gzip,deflate",
            "Content-Type": "application/soap+xml;charset=UTF-8",
            "User-Agent": "Apache-HttpClient/4.5.2 (Java/1.8.0_181)"
        }

        let options = {
            "method": "POST",
            "hostname": atConfigs.at_url,
            "port": atConfigs.at_port,
            "path": atConfigs.at_path,
            "rejectUnauthorized": false,
            "headers": headers
        };

        if (state === "ID"){
            options.pfx = fs.readFileSync(atConfigs.p12_path);
            options.passphrase = "changeit";
        };

        this.requestPost(atXML, options);
        browser.pauseBrowser(3000);
    }

    createAccountTransfer(inputfile, hhSize, update) {
        this.TestCaseData(hhSize);

        if (stateProfile.toUpperCase() == 'MN' && update != true) {
            let umXML = this.generateUMString();
            this.generateUserManagementCall(umXML);
        }

        let atXML = this.generateATString(inputfile, hhSize);
        this.generateAccountTransferCall(atXML);
    }

    verifyMedicaidOutboundStatus(status){
        let moStatus = dbquery.getMedicaidOutboundStatus();
        assert.assertEqualIgnoreCase(moStatus, status);//TRANSMITTED
    }

    verifyMedicaidInboundStatus(status){
        let miStatus = dbquery.getMedicaidInboundStatus();
        assert.assertEqualIgnoreCase(miStatus, status);//COMPLETE
    }
    verifyGIWSPayloadStatus(status){
        let plStatus = dbquery.getGIWSPayloadResponseStatus();
        assert.assertEqualIgnoreCase(plStatus, status); //RESPONSE
    }
}

module.exports = new StaticUtilsMulti();
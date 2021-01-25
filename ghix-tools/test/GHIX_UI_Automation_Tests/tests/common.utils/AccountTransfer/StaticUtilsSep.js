const prop = require('../PropertyReader');
var state = prop.getEnvName();
const jsonUtil = require('../JsonUtil');
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
const indsignup = require('../../pagemodels/UserAccountManagement/IndividualSignupPage');
const dateFun = require('../CommonDateFunction');
const moment = require('moment');

const randomData = require("../RandomDataGenerator");

const atc = require('../ATFactory');
const atConfigs = atc.getATConfig(server);

function nocache(module) {
    require("fs").watchFile(require("path").resolve(module), () => {
        delete require.cache[require.resolve(module)]
    })
}

class StaticUtilsSep {

    generateATFromJsonFile(inputJson) {
        let householdIndex = global.updateDataJson.households.length;

        logger.log("Reading input file   ------------------------------");
        logger.log(`resources/payloads/${state}/${inputJson}`);
        global.updateDataJson.households[householdIndex] = jsonUtil.readJson(`resources/payloads/${state}/${inputJson}`);

        logger.log ("PASSWORD IS: " + global.updateDataJson.households[householdIndex].password);
        this.updateJsonDynamicData();
    }

    generateApplicantsInfo() {
        //var obj = {applicants: []};
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        let hhLastName = randomData.getRandomLastName()

        let eligibilityStartDate = year + '-01-01';
        let eligibilityEndDate = year + '-12-31';


        logger.log("Inside generateApplicants");
        for (let index = 0; index < global.updateDataJson.households[householdIndex].applicants.length; index++) {
            logger.log(index + " - Inside generateApplicants")
            global.updateDataJson.households[householdIndex].applicants[index].lastName = hhLastName;
            global.updateDataJson.households[householdIndex].applicants[index].firstName = randomData.getRandomFirstName();
            global.updateDataJson.households[householdIndex].applicants[index].ssn = randomData.genRandomSSN();
            global.updateDataJson.households[householdIndex].applicants[index].email = randomData.getRandomEmail(global.updateDataJson.households[householdIndex].applicants[index].firstName);
            global.updateDataJson.households[householdIndex].applicants[index].medicaidId = randomData.getRandomInt(10000000, 100000000);

            if (global.updateDataJson.households[householdIndex].applicants[index].at_aptcEligibilityStartDate === "") {
                global.updateDataJson.households[householdIndex].applicants[index].at_aptcEligibilityStartDate = eligibilityStartDate;
            };
            if (global.updateDataJson.households[householdIndex].applicants[index].at_aptcEligibilityEndDate === "") {
                global.updateDataJson.households[householdIndex].applicants[index].at_aptcEligibilityEndDate = eligibilityEndDate;
            };

            if (global.updateDataJson.households[householdIndex].applicants[index].at_csrEligibilityStartDate === "") {
                global.updateDataJson.households[householdIndex].applicants[index].at_csrEligibilityStartDate = eligibilityStartDate;
            };
            if (global.updateDataJson.households[householdIndex].applicants[index].at_csrEligibilityEndDate === "") {
                global.updateDataJson.households[householdIndex].applicants[index].at_csrEligibilityEndDate = eligibilityEndDate;
            };

            if (global.updateDataJson.households[householdIndex].applicants[index].at_exchangeEligibilityStartDate === "") {
                global.updateDataJson.households[householdIndex].applicants[index].at_exchangeEligibilityStartDate = eligibilityStartDate;
            };
            if (global.updateDataJson.households[householdIndex].applicants[index].at_exchangeEligibilityEndDate === "") {
                global.updateDataJson.households[householdIndex].applicants[index].at_exchangeEligibilityEndDate = eligibilityEndDate;
            };

            if (global.updateDataJson.households[householdIndex].applicants[index].at_magiEligibilityStartDate === "") {
                global.updateDataJson.households[householdIndex].applicants[index].at_magiEligibilityStartDate = eligibilityStartDate;
            };
            if (global.updateDataJson.households[householdIndex].applicants[index].at_magiEligibilityEndDate === "") {
                global.updateDataJson.households[householdIndex].applicants[index].at_magiEligibilityEndDate = eligibilityEndDate;
            };


            if (global.updateDataJson.households[householdIndex].applicants[index].at_stateSubsidyEligibilityStartDate === "") {
                global.updateDataJson.households[householdIndex].applicants[index].at_stateSubsidyEligibilityStartDate = eligibilityStartDate;
            };
            if (global.updateDataJson.households[householdIndex].applicants[index].at_stateSubsidyEligibilityEndDate === "") {
                global.updateDataJson.households[householdIndex].applicants[index].at_stateSubsidyEligibilityEndDate = eligibilityEndDate;
            };
            if (global.updateDataJson.households[householdIndex].applicants[index].at_chipEligibilityStartDate === "") {
                global.updateDataJson.households[householdIndex].applicants[index].at_chipEligibilityStartDate = eligibilityStartDate;
            };
            if (global.updateDataJson.households[householdIndex].applicants[index].at_chipEligibilityEndDate === "") {
                global.updateDataJson.households[householdIndex].applicants[index].at_chipEligibilityEndDate = eligibilityEndDate;
            };
        }
    }

    generateATString() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        // Getting server timestamp and formatting date
        let serverInfo = common.getServerInfo();
        let currentDateZ = new Date(serverInfo.now).toISOString();
        let currentDate = currentDateZ.split('T')[0];
        let pastDate = moment(currentDate).subtract(10, 'd').format("YYYY-MM-DD");

        let hhSize = global.updateDataJson.households[householdIndex].applicants.length;

        logger.log("AT user: " + atConfigs.at_user);
        logger.log("AT pass: " + atConfigs.at_pass);

        let atAuthHeader = this.generateAuthHeaderInfo(atConfigs.at_user, atConfigs.at_pass);
        let atXML = this.readXmlFile(`resources/payloads/${state.toUpperCase()}/templates/HH${hhSize}_template.xml`);

        atXML = atXML.replace(/AT_USERNAME/g, atAuthHeader.username);
        atXML = atXML.replace(/AT_PASSWORD_DIGEST/g, atAuthHeader.passwordDigest);
        atXML = atXML.replace(/AT_NONCE/g, atAuthHeader.nonce);
        atXML = atXML.replace(/AT_CREATED/g, atAuthHeader.created);

        atXML = atXML.replace(/AT_CURRENT_ELIGIBILITY_SPAN/g, global.updateDataJson.households[householdIndex].at_CurrentEligibilitySpan);
        atXML = atXML.replace(/AT_TOTAL_ELIGIBILITY_SPAN/g, global.updateDataJson.households[householdIndex].at_TotalEligibilitySpan);

        //TODO: state specific ids generation?
        atXML = atXML.replace(/REMOTE_ID/g, global.updateDataJson.households[householdIndex].remoteId);
        atXML = atXML.replace(/ICN_ID/g, global.updateDataJson.households[householdIndex].icnId);
        atXML = atXML.replace(/EXCHANGE_ID/g, global.updateDataJson.households[householdIndex].exchangeId);
        atXML = atXML.replace(/APPLICATION_ID/g, global.updateDataJson.households[householdIndex].applicationId);
        atXML = atXML.replace(/REFERRAL_ACTIVITY_ID/g, global.updateDataJson.households[householdIndex].referralActivityId);
        atXML = atXML.replace(/CHIP_ID/g, global.updateDataJson.households[householdIndex].chipId);
        atXML = atXML.replace(/EXTENDED_APPLICANT_ID/g, global.updateDataJson.households[householdIndex].extendedApplicantId);


        atXML = atXML.replace(/CURRENT_DATE_UTCZ/g, currentDateZ);
        atXML = atXML.replace(/CURRENT_DATE_YYYY-MM-DD/g, currentDate);
        atXML = atXML.replace(/PAST_DATE_YYYY-MM-DD/g, pastDate);

        atXML = atXML.replace(/APTC_AMT/g, global.updateDataJson.households[householdIndex].applicants[0].at_aptcMaximumAmount);
        atXML = atXML.replace(/COVERAGE_YEAR/g, global.updateDataJson.households[householdIndex].applicationYear);
        atXML = atXML.replace(/PHONE_NUMBER_VAR/g, global.updateDataJson.households[householdIndex].primaryContactPhone.mobile.replace(/-/g, ''));

        atXML = atXML.replace(/INSURANCE_PREMIUM_AMOUNT/g, global.updateDataJson.households[householdIndex].at_insurancePremiumAmount);
        atXML = atXML.replace(/REQUESTING_FINANCIAL_ASSISTANCE_INDICATOR/g, global.updateDataJson.households[householdIndex].at_insuranceApplicationRequestingFinancialAssistanceIndicator);
        atXML = atXML.replace(/INCOME_FEDERAL_POVERTY_LEVEL_PERCENT/g, global.updateDataJson.households[householdIndex].at_IncomeFederalPovertyLevelPercent);
        atXML = atXML.replace(/ADDRESS_LINE_1/g, global.updateDataJson.households[householdIndex].primaryAddress.mailing.addressLine1);
        atXML = atXML.replace(/CITY_NAME/g, global.updateDataJson.households[householdIndex].primaryAddress.mailing.city);
        atXML = atXML.replace(/COUNTY_CODE/g, global.updateDataJson.households[householdIndex].primaryAddress.mailing.county);
        atXML = atXML.replace(/STATE_CODE/g, global.updateDataJson.households[householdIndex].primaryAddress.mailing.state);
        atXML = atXML.replace(/ZIP_CODE/g, global.updateDataJson.households[householdIndex].primaryAddress.mailing.zip);

        for (let i = 0; i < global.updateDataJson.households[householdIndex].applicants.length; i++) {
            let index = i + 1;
            let firstNameReplaceStr = new RegExp(`PERSON${index}_FIRST_NAME`, "g");
            let lastNameReplaceStr = new RegExp(`PERSON${index}_LAST_NAME`, "g");
            let ssnReplaceStr = new RegExp(`PERSON${index}_SSN`, "g");
            let emailReplaceStr = new RegExp(`PERSON${index}_EMAIL`, "g");
            let medicaidIDReplaceStr = new RegExp(`PERSON${index}_MEDICAID_ID`, "g");
            let marriedIndicator = new RegExp(`PERSON${index}_MARRIED_INDICATOR`, "g");

            atXML = atXML.replace(firstNameReplaceStr, global.updateDataJson.households[householdIndex].applicants[i].firstName);
            atXML = atXML.replace(lastNameReplaceStr, global.updateDataJson.households[householdIndex].applicants[i].lastName);
            atXML = atXML.replace(ssnReplaceStr, global.updateDataJson.households[householdIndex].applicants[i].ssn);
            atXML = atXML.replace(emailReplaceStr, global.updateDataJson.households[householdIndex].applicants[i].email);
            atXML = atXML.replace(medicaidIDReplaceStr, global.updateDataJson.households[householdIndex].applicants[i].medicaidId);
            atXML = atXML.replace(marriedIndicator, global.updateDataJson.households[householdIndex].applicants[i].at_personMarriedIndicator);

            let birthDate = new RegExp(`PERSON${index}_BIRTH_DATE`, "g");
            let dob = moment(global.updateDataJson.households[householdIndex].applicants[i].dateOfBirth, "MM/DD/YYYY").format("YYYY-MM-DD")
            atXML = atXML.replace(birthDate, dob);

            let IncomeFrequencyCode = new RegExp(`PERSON${index}_INCOME_FREQUENCY_CODE`, "g");
            let IncomeAmount = new RegExp(`PERSON${index}_INCOME_AMOUNT`, "g");
            let IncomeCategoryCode = new RegExp(`PERSON${index}_INCOME_CATEGORY_CODE`, "g");
            atXML = atXML.replace(IncomeFrequencyCode, global.updateDataJson.households[householdIndex].applicants[i].income.frequency);
            atXML = atXML.replace(IncomeAmount, global.updateDataJson.households[householdIndex].applicants[i].income.amount);
            atXML = atXML.replace(IncomeCategoryCode, global.updateDataJson.households[householdIndex].applicants[i].income.sourceOfIncome);


            let raceText = new RegExp(`PERSON${index}_RACE`, "g");
            let gender = new RegExp(`PERSON${index}_GENDER`, "g");
            let citizenshipInd = new RegExp(`PERSON${index}_CITIZENSHIP_INDICATOR`, "g");
            let seekingCoverage = new RegExp(`PERSON${index}_SEEKING_COVERAGE_INDICATOR`, "g");
            let aianIndicatir = new RegExp(`PERSON${index}_AIAN_INDICATOR`, "g");

            atXML = atXML.replace(raceText, global.updateDataJson.households[householdIndex].applicants[i].ethnicityRace.race);
            atXML = atXML.replace(gender, global.updateDataJson.households[householdIndex].applicants[i].gender);
            atXML = atXML.replace(citizenshipInd, global.updateDataJson.households[householdIndex].applicants[i].immigration.isCitizen);
            atXML = atXML.replace(seekingCoverage, global.updateDataJson.households[householdIndex].applicants[i].seekingCoverage);
            atXML = atXML.replace(aianIndicatir, global.updateDataJson.households[householdIndex].applicants[i].at_AmericanIndianIndicator);

            let aptcEligibilityStartDate = new RegExp(`PERSON${index}_APTC_ELIGIBILITY_START_DATE`, "g");
            let aptcEligibilityEndDate = new RegExp(`PERSON${index}_APTC_ELIGIBILITY_END_DATE`, "g");
            let aptcEligibilityReasonText = new RegExp(`PERSON${index}_APTC_ELIGIBILITY_REASON_TEXT`, "g");
            let aptcEligibilityIndicator = new RegExp(`PERSON${index}_APTC_ELIGIBILITY_INDICATOR`, "g");

            atXML = atXML.replace(aptcEligibilityIndicator, global.updateDataJson.households[householdIndex].applicants[i].aptcEligible);
            atXML = atXML.replace(aptcEligibilityStartDate, global.updateDataJson.households[householdIndex].applicants[i].at_aptcEligibilityStartDate);
            atXML = atXML.replace(aptcEligibilityEndDate, global.updateDataJson.households[householdIndex].applicants[i].at_aptcEligibilityEndDate);
            atXML = atXML.replace(aptcEligibilityReasonText, global.updateDataJson.households[householdIndex].applicants[i].at_aptcEligibilityReasonText);

            let csrEligibilityStartDate = new RegExp(`PERSON${index}_CSR_ELIGIBILITY_START_DATE`, "g");
            let csrEligibilityEndDate = new RegExp(`PERSON${index}_CSR_ELIGIBILITY_END_DATE`, "g");
            let csrEligibilityReasonText = new RegExp(`PERSON${index}_CSR_ELIGIBILITY_REASON_TEXT`, "g");
            let csrEligibilityIndicator = new RegExp(`PERSON${index}_CSR_ELIGIBILITY_INDICATOR`, "g");
            let csrCategoryAlphaCode = new RegExp(`PERSON1_CSR_CATEGORY_ALPHA_CODE`, "g");

            atXML = atXML.replace(csrEligibilityIndicator, global.updateDataJson.households[householdIndex].applicants[i].csrEligible);
            atXML = atXML.replace(csrEligibilityStartDate, global.updateDataJson.households[householdIndex].applicants[i].at_csrEligibilityStartDate);
            atXML = atXML.replace(csrEligibilityEndDate, global.updateDataJson.households[householdIndex].applicants[i].at_csrEligibilityEndDate);
            atXML = atXML.replace(csrEligibilityReasonText, global.updateDataJson.households[householdIndex].applicants[i].at_csrEligibilityReasonText);
            atXML = atXML.replace(csrCategoryAlphaCode, global.updateDataJson.households[householdIndex].applicants[i].at_csrCategoryAlphaCode);

            let exchangeEligibilityStartDate = new RegExp(`PERSON${index}_EXCHANGE_ELIGIBILITY_START_DATE`, "g");
            let exchangeEligibilityEndDate = new RegExp(`PERSON${index}_EXCHANGE_ELIGIBILITY_END_DATE`, "g");
            let exchangeEligibilityReasonText = new RegExp(`PERSON${index}_EXCHANGE_ELIGIBILITY_REASON_TEXT`, "g");
            let exchangeEligibilityIndicator = new RegExp(`PERSON${index}_EXCHANGE_ELIGIBILITY_INDICATOR`, "g");

            atXML = atXML.replace(exchangeEligibilityIndicator, global.updateDataJson.households[householdIndex].applicants[i].at_exchangeEligibilityIndicator);
            atXML = atXML.replace(exchangeEligibilityStartDate, global.updateDataJson.households[householdIndex].applicants[i].at_exchangeEligibilityStartDate);
            atXML = atXML.replace(exchangeEligibilityEndDate, global.updateDataJson.households[householdIndex].applicants[i].at_exchangeEligibilityEndDate);
            atXML = atXML.replace(exchangeEligibilityReasonText, global.updateDataJson.households[householdIndex].applicants[i].at_exchangeEligibilityReasonText);

            let chipEligibilityStartDate = new RegExp(`PERSON${index}_CHIP_ELIGIBILITY_START_DATE`, "g");
            let chipEligibilityEndDate = new RegExp(`PERSON${index}_CHIP_ELIGIBILITY_END_DATE`, "g");
            let chipEligibilityReasonText = new RegExp(`PERSON${index}_CHIP_ELIGIBILITY_REASON_TEXT`, "g");
            let chipEligibilityIndicator = new RegExp(`PERSON${index}_CHIP_ELIGIBILITY_INDICATOR`, "g");

            atXML = atXML.replace(chipEligibilityIndicator, global.updateDataJson.households[householdIndex].applicants[i].at_chipEligibilityIndicator);
            atXML = atXML.replace(chipEligibilityStartDate, global.updateDataJson.households[householdIndex].applicants[i].at_chipEligibilityStartDate);
            atXML = atXML.replace(chipEligibilityEndDate, global.updateDataJson.households[householdIndex].applicants[i].at_chipEligibilityEndDate);
            atXML = atXML.replace(chipEligibilityReasonText, global.updateDataJson.households[householdIndex].applicants[i].at_chipEligibilityReasonText);

            let magiEligibilityStartDate = new RegExp(`PERSON${index}_MAGI_ELIGIBILITY_START_DATE`, "g");
            let magiEligibilityEndDate = new RegExp(`PERSON${index}_MAGI_ELIGIBILITY_END_DATE`, "g");
            let magiEligibilityReasonText = new RegExp(`PERSON${index}_MAGI_ELIGIBILITY_REASON_TEXT`, "g");
            let magiEligibilityIndicator = new RegExp(`PERSON${index}_MAGI_ELIGIBILITY_INDICATOR`, "g");

            atXML = atXML.replace(magiEligibilityIndicator, global.updateDataJson.households[householdIndex].applicants[i].at_magiEligibilityIndicator);
            atXML = atXML.replace(magiEligibilityStartDate, global.updateDataJson.households[householdIndex].applicants[i].at_magiEligibilityStartDate);
            atXML = atXML.replace(magiEligibilityEndDate, global.updateDataJson.households[householdIndex].applicants[i].at_magiEligibilityEndDate);
            atXML = atXML.replace(magiEligibilityReasonText, global.updateDataJson.households[householdIndex].applicants[i].at_magiEligibilityReasonText);

            let stateSubsidyEligibilityStartDate = new RegExp(`PERSON${index}_STATESUB_ELIGIBILITY_START_DATE`, "g");
            let stateSubsidyEligibilityEndDate = new RegExp(`PERSON${index}_STATESUB_ELIGIBILITY_END_DATE`, "g");
            let stateSubsidyEligibilityReasonText = new RegExp(`PERSON${index}_STATESUB_ELIGIBILITY_REASON_TEXT`, "g");
            let stateSubsidyEligibilityIndicator = new RegExp(`PERSON${index}_STATESUB_ELIGIBILITY_INDICATOR`, "g");
            let stateSubsidyEligibilityAmount = new RegExp(`PERSON${index}_STATESUB_ELIGIBILITY_AMOUNT`, "g");

            atXML = atXML.replace(stateSubsidyEligibilityStartDate, global.updateDataJson.households[householdIndex].applicants[i].at_stateSubsidyEligibilityStartDate);
            atXML = atXML.replace(stateSubsidyEligibilityEndDate, global.updateDataJson.households[householdIndex].applicants[i].at_stateSubsidyEligibilityEndDate);
            atXML = atXML.replace(stateSubsidyEligibilityReasonText, global.updateDataJson.households[householdIndex].applicants[i].at_stateSubsidyEligibilityReasonText);
            atXML = atXML.replace(stateSubsidyEligibilityIndicator, global.updateDataJson.households[householdIndex].applicants[i].at_stateSubsidyEligibilityIndicator);
            atXML = atXML.replace(stateSubsidyEligibilityAmount, global.updateDataJson.households[householdIndex].applicants[i].at_stateSubsidyEligibilityAmount);

        }

        logger.log("AT xml request: " + atXML);

        return atXML;

    }

    updateJsonDynamicData(hhSize) {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        this.generateApplicantsInfo();
        global.updateDataJson.households[householdIndex].primaryContactPhone.mobile = randomData.getRandomPhoneNumber();
        // indsignup.setUniquePrimaryPhoneNumber(global.updateDataJson.households[householdIndex]);

        global.updateDataJson.households[householdIndex].remoteId = state + "WD" + randomData.getRandomInt(100000000, 1000000000);
        global.updateDataJson.households[householdIndex].icnId = 'ICN' + randomData.getRandomInt(100000000, 1000000000);
        global.updateDataJson.households[householdIndex].chipId = randomData.getRandomInt(1000000, 10000000);
        global.updateDataJson.households[householdIndex].extendedApplicantId = randomData.getRandomInt(1000000, 10000000);

        /**
         * PA Outbound:
         *   <ns3:ActivityIdentification>
         *       <ns3:IdentificationID>PAWD48984805011</ns3:IdentificationID>
         *       <ns3:IdentificationCategoryText>Exchange</ns3:IdentificationCategoryText>
         *   </ns3:ActivityIdentification>
         */
        global.updateDataJson.households[householdIndex].exchangeId = state + "WD" + randomData.getRandomInt(1000000000, 10000000000);

        /**
         *  <ns5:ApplicationIdentification>
         *      <ns3:IdentificationID>PAWD4898480501111</ns3:IdentificationID>
         *  </ns5:ApplicationIdentification>
         */
        global.updateDataJson.households[householdIndex].applicationId = state + "WD" + randomData.getRandomInt(1000000000, 10000000000);

        /**
         * <ns7:ReferralActivity>
         *       <ns3:ActivityIdentification>
         *           <ns3:IdentificationID>PAWD4898480501112</ns3:IdentificationID>
         *       </ns3:ActivityIdentification>
         *  ........
         *  </ns7:ReferralActivity>
         * */
        global.updateDataJson.households[householdIndex].referralActivityId = state + "WD" + randomData.getRandomInt(1000000000, 10000000000);

        global.updateDataJson.households[householdIndex].applicationYear = year;

        if (!global.updateDataJson.households[householdIndex].password) {
            switch(state) {
                case "MN":
                    global.updateDataJson.households[householdIndex].password = 'Ghix123#';
                    break;
                default:
                    global.updateDataJson.households[householdIndex].password = 'ghix123#';
            }
        }
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
        umXML = umXML.replace(/REMOTE_ID/g, global.updateDataJson.households[householdIndex].remoteId);
        umXML = umXML.replace(/PERSON1_EMAIL_ID/g, global.updateDataJson.households[householdIndex].applicants[0].email);
        logger.log("umXML   ---   " + global.updateDataJson.households[householdIndex].password);
        umXML = umXML.replace(/USER_PASSWORD/g, global.updateDataJson.households[householdIndex].password);

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

        this.requestPost(umXML, options, "UM");
        browser.pauseBrowser(3000);
    }

    /**
     * Sending POST request
     * callType parameter is optional - there if need to verify response body
     * @param payload
     * @param options
     * @param callType
     * @returns {Promise<void>}
     */
    async requestPost(payload, options, callType) {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        let req = http.request(options, function (res) {
            let chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
                logger.log('statusCode:', res.statusCode);
                logger.log('statusMessage:', res.statusMessage);
            });

            res.on("end", function () {
                let body = Buffer.concat(chunks);
                let resBody = body.toString()
                logger.log("Respons body:  " + resBody);

                //Verify response from AT
                if (callType == "AT") {
                    let responseStatusRegex1 = new RegExp('<ns3:ResponseCode>HS000000</ns3:ResponseCode>' +
                        '<ns3:ResponseDescriptionText>Success</ns3:ResponseDescriptionText>');
                    expect(resBody).to.match(responseStatusRegex1, callType + " Response assertion")
                }

                if (callType == "UM") {
                    let remoteIdRegex = new RegExp('<remoteId>' + global.updateDataJson.households[householdIndex].remoteId + '</remoteId>')
                    expect(resBody).to.match(remoteIdRegex, "Checking User Management Service Response")
                }

            });

            req.on('error', (e) => {
                logger.error(e);
            });

        });

        await req.write(payload);
        await req.end();
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

        if (state === "ID") {
            options.pfx = fs.readFileSync(atConfigs.p12_path);
            options.passphrase = "changeit";
        }
        ;

        let resBody = this.requestPost(atXML, options, "AT");
        browser.pauseBrowser(3000);
    }

    createAccountTransfer(inputJson) {

        this.generateATFromJsonFile(inputJson);
        if (stateProfile.toUpperCase() == 'MN') {
            let umXML = this.generateUMString();
            this.generateUserManagementCall(umXML);
        }
        this.updateAccountTransfer();
    }

    updateAccountTransfer() {
        let atXML = this.generateATString();
        this.generateAccountTransferCall(atXML);
    }

    verifyMedicaidOutboundStatus(status) {
        let moStatus = dbquery.getMedicaidOutboundStatus();
        assert.assertEqualIgnoreCase(moStatus, status);//TRANSMITTED
    }

    verifyMedicaidInboundStatus(status) {
        let miStatus = dbquery.getMedicaidInboundStatus();
        assert.assertEqualIgnoreCase(miStatus, status);//COMPLETE
    }

    verifyGIWSPayloadStatus(status) {
        let plStatus = dbquery.getGIWSPayloadResponseStatus();
        assert.assertEqualIgnoreCase(plStatus, status); //RESPONSE
    }

}

module.exports = new StaticUtilsSep();
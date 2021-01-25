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
const moment = require('moment');

const randomData = require("../RandomDataGenerator");

const atc = require('../ATFactory');
const atConfigs = atc.getATConfig(server);

function nocache(module) {
    require("fs").watchFile(require("path").resolve(module), () => {
        delete require.cache[require.resolve(module)]
    })
}

class SepFunctions {


    aptcMaxAmountChange(diff, decrease) {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;

        //If no diff provided, set aptcMaximumAmount to 0
        diff = parseFloat(diff);
        logger.log("APTC max ammount before increase: " + global.updateDataJson.households[householdIndex].applicants[0].at_aptcMaximumAmount);
        if (!diff) {
            global.updateDataJson.households[householdIndex].applicants[0].at_aptcMaximumAmount = 0
        } else if (diff && !decrease) {
            global.updateDataJson.households[householdIndex].applicants[0].at_aptcMaximumAmount = global.updateDataJson.households[householdIndex].applicants[0].at_aptcMaximumAmount + diff
        } else if (diff && decrease) {

            if (diff > global.updateDataJson.households[householdIndex].applicants[0].at_aptcMaximumAmount) {
                throw  `Trying to subtract diff = ${diff} from aptcmaxAmount = ${global.updateDataJson.households[householdIndex].applicants[0].at_aptcMaximumAmount}`
            } else {
                global.updateDataJson.households[householdIndex].applicants[0].at_aptcMaximumAmount = global.updateDataJson.households[householdIndex].applicants[0].at_aptcMaximumAmount - diff
            }
        }
        logger.log("APTC max ammount after increase: " + global.updateDataJson.households[householdIndex].applicants[0].at_aptcMaximumAmount)
    }

    removeMember() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        let l = global.updateDataJson.households[householdIndex].applicants.length - 1
        logger.log(`Applicants index ${l}`)

        if (l > 0) {delete global.updateDataJson.households[householdIndex].applicants.splice(l)}
        else {throw `The household size is ${global.updateDataJson.households[householdIndex].applicants.length}. Unable to remove members`}
        logger.log("HH Size after removing: " + global.updateDataJson.households[householdIndex].applicants.length);
    }

    addMember() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        let personNbr = global.updateDataJson.households[householdIndex].applicants.length;
        let fn = randomData.getRandomFirstName();
        let ssn = randomData.genRandomSSN();
        let email = randomData.getRandomEmail(fn);
        let medicaidId = randomData.getRandomInt(10000000000, 100000000000);


        global.updateDataJson.households[householdIndex].applicants[personNbr] =
            {
                "memberId": "",
                "guid": "",
                "firstName": fn,
                "lastName": global.updateDataJson.households[householdIndex].applicants[0].lastName,
                "gender": "Male",
                "ssn": ssn,
                "sameNameOnSSN": true,
                "suffix": "",
                "relation": "SELF",
                "dateOfBirth": "12/25/2010",
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
                "at_aptcEligibilityStartDate": year + "-01-01",
                "at_aptcEligibilityEndDate": year + "-12-31",
                "at_aptcEligibilityReasonText": "999",
                "stateSubsidyEligible": true,
                "csrEligible": false,
                "at_csrEligibilityReasonText": "999",
                "at_csrCategoryAlphaCode": "73PercentActuarialVarianceLevelSilverPlanCSR",
                "at_csrEligibilityStartDate": year + "-01-01",
                "at_csrEligibilityEndDate": year + "-12-31",
                "at_exchangeEligibilityIndicator": true,
                "at_exchangeEligibilityReasonText": "999",
                "at_exchangeEligibilityStartDate": year + "-01-01",
                "at_exchangeEligibilityEndDate": year + "-12-31",
                "assessedMedicaidMAGIEligibile": false,
                "assessedChipEligible": false,
                "assessedMedicaidnonMAGIEligibile": false,
                "assessedCHIPnonMAGIEligibile": false,
                "medicaidMAGIEligibile": false,
                "medicaidNonMAGIEligibile": false,
                "medicaidId": medicaidId,
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
                        "relation": "Child"
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
                    "race": "white"
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
                        "totalExpectedYearlyAmount": 0
                    }
                },
                "hasOtherHealthCoverage": false,
                "hasReconciledAptc": true,
                "hasESI": false,
                "hasNonESI": false,
                "helpPayingMedicalBills": false,
                "at_personMedicaidIdentification": "",
                "at_personMarriedIndicator": false,
                "at_isPrimaryContact": false,
                "at_isPrimaryTaxFiler": false,
                "at_isSSFSigner": false,
                "at_isHouseholdMemberReference": false};
    }


}

module.exports = new SepFunctions();
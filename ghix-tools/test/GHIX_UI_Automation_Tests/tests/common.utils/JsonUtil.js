const random = require('./RandomDataGenerator.js')
const browser = require('../base/Browser.js');
var fs = require('fs');
const path = require("path");
var appRoot = require('app-root-path');
const prop = require('./PropertyReader');

var state = prop.getEnvName();
//var state = stateProfile;
const address = require('../../resources/data/address.json');
const commonConfig = require('../../tests/common.utils/CommonConfig');
var startDate = random.getDateToday();
var endDate = random.addYearsToDateToday(3);
var fname = random.getRandomFirstName();
var lname = random.getRandomLastName();
var email = random.getRandomEmail(fname);
var phoneNumber = random.getRandomPhoneNumber();
var securityQuestionAnswer = random.getRandomSecurityQuestionAnswer();
const eligibiltyIncome = require('../../resources/data/Common/Anonymous/eligibiltyIncome.json');
const applicantDetails = require('../../resources/data/Common/SSAP/applicantsInfo.json');

class JsonUtil {
    // readJson(filePath) {
    //     const obj = file.readFileSync(path.resolve(appRoot + filePath));
    //     var jsonStr = obj.toString()
    //     var json = JSON.parse(jsonStr);
    //     return json
    // }

    readJson(inputfile) {
        let input = JSON.parse(fs.readFileSync(inputfile, 'utf-8'));
        return input;
    }

    updateApplicantDetails(ssapJsonObj) {
        this.setApplicationDetailInJson(ssapJsonObj);
        this.setAddressInJson(ssapJsonObj);
        this.updateIncomeDetails(ssapJsonObj)
        ssapJsonObj = commonConfig.getApplicationConfig(ssapJsonObj);
        return ssapJsonObj;
    }

    updateEntityDetails(entityJsonObj) {
        this.setEntityDetailInJson(entityJsonObj);
        this.setAddressInJson(entityJsonObj)
        entityJsonObj = commonConfig.getApplicationConfig(entityJsonObj);
        return entityJsonObj;
    }
    updateAnonymousFlowData(anonymousJsonObj) {

        if (this.isFieldEmpty(anonymousJsonObj.houseHold.zip)) {
            anonymousJsonObj.houseHold.zip = address[state].address.zip;
        }
        return anonymousJsonObj;

    }
    updateApplicationStatus(dataJson, status) {
        dataJson.applicationStatus = status
        return dataJson;
    }
    isFieldEmpty(field) {
        var flag = false
        if (field == "" || field == null || field == undefined) {
            flag = true
        }
        return flag
    }

    setApplicationDetailInJson(ssapJsonObj) {
        for (var i = 0; i < ssapJsonObj.applicants.length; i++) {
            var firstName = random.getRandomFirstName()
            if (this.isFieldEmpty(ssapJsonObj.applicants[i].firstName)) {
                ssapJsonObj.applicants[i].firstName = firstName
            }
            if (this.isFieldEmpty(ssapJsonObj.applicants[i].lastName)) {
                ssapJsonObj.applicants[i].lastName = random.getRandomLastName();
            }
            if (this.isFieldEmpty(ssapJsonObj.applicants[i].email)) {
                ssapJsonObj.applicants[i].email = random.getRandomEmail(firstName);
            }
            if (this.isFieldEmpty(ssapJsonObj.applicants[i].ssn)) {
                ssapJsonObj.applicants[i].ssn = random.getRandomSSN();
            }
            if (this.isFieldEmpty(ssapJsonObj.applicants[i].dateOfBirth)) {
                ssapJsonObj.applicants[i].dateOfBirth = random.getRandomDateOfBirth();
            }
        }

    }


    setEntityDetailInJson(entityJsonObj) {
        var entityFirstName = random.getRandomFirstName();
        var entityLastName = random.getRandomLastName();
        var counselorFirstName = random.getRandomFirstName();
        var counselorLastName = random.getRandomLastName();

        if (this.isFieldEmpty(entityJsonObj.entityInformation.firstName)) {
            entityJsonObj.entityInformation.firstName = entityFirstName;
        }
        if (this.isFieldEmpty(entityJsonObj.entityInformation.lastName)) {
            entityJsonObj.entityInformation.lastName = entityLastName;
        }
        if (this.isFieldEmpty(entityJsonObj.entityInformation.email)) {
            entityJsonObj.entityInformation.email = random.getRandomEmail(entityFirstName);
        }
        if (this.isFieldEmpty(entityJsonObj.entityInformation.entityName)) {
            entityJsonObj.entityInformation.entityName = entityFirstName + ' ' + entityLastName
        }
        if (this.isFieldEmpty(entityJsonObj.entityInformation.businessName)) {
            entityJsonObj.entityInformation.businessName = entityLastName + ' LLC'
        }
        if (this.isFieldEmpty(entityJsonObj.certifiedEnrollmentCounselors.firstName)) {
            entityJsonObj.certifiedEnrollmentCounselors.firstName = counselorFirstName
        }
        if (this.isFieldEmpty(entityJsonObj.certifiedEnrollmentCounselors.lastName)) {
            entityJsonObj.certifiedEnrollmentCounselors.lastName = counselorLastName
        }
        if (this.isFieldEmpty(entityJsonObj.certifiedEnrollmentCounselors.email)) {
            entityJsonObj.certifiedEnrollmentCounselors.email = random.getRandomEmail(counselorFirstName);
        }
        if (this.isFieldEmpty(entityJsonObj.primarySiteLocation)) {
            let location = random.getRandomInt(1, 100) + ' ' + random.getRandomCity();
            entityJsonObj.primarySiteLocation = location;
        }
        if (this.isFieldEmpty(entityJsonObj.subSiteLocation)) {
            let location = random.getRandomInt(1, 100) + ' ' + random.getRandomCity();
            entityJsonObj.subSiteLocation = location;
        }
        if (this.isFieldEmpty(entityJsonObj.entityInformation.mobile)) {
            entityJsonObj.entityInformation.mobile = random.getRandomPhoneNumber();
        }
        if (this.isFieldEmpty(entityJsonObj.certifiedEnrollmentCounselors.phoneNumber)) {
            entityJsonObj.certifiedEnrollmentCounselors.phoneNumber = random.getRandomPhoneNumber();
        }
    }

    setAddressInJson(ssapJsonObj) {
        ssapJsonObj.primaryAddress.home.addressLine1 = address[state].address.addressLine1;
        console.log("new address=" + ssapJsonObj.primaryAddress.home.addressLine1)

        ssapJsonObj.primaryAddress.home.city = address[state].address.city;
        ssapJsonObj.primaryAddress.home.state = address[state].address.state;
        ssapJsonObj.primaryAddress.home.county = address[state].address.county;
        ssapJsonObj.primaryAddress.home.zip = address[state].address.zip;

        ssapJsonObj.primaryAddress.mailing.addressLine1 = address[state].address.addressLine1;
        ssapJsonObj.primaryAddress.mailing.city = address[state].address.city;
        ssapJsonObj.primaryAddress.mailing.state = address[state].address.state;
        ssapJsonObj.primaryAddress.mailing.county = address[state].address.county;
        ssapJsonObj.primaryAddress.mailing.zip = address[state].address.zip;

    }

    //read json
    //get count of applicants
    //generate random values if empty // firstname, lastname, email, ssn
    //update json values with gerenated values


    //one utility to generate random values based on type - take type as input, return val 
    //one utility - update json - take path, update value - i/p - path, val to be updated, return updated json

    //Updates Agent Object with random values
    updateAgentDetails(agentObject) {
        this.setAgentDetails(agentObject);
        this.setAgentAdminDetails(agentObject);
        agentObject = commonConfig.getApplicationConfig(agentObject);
        return agentObject;
    }
    setAgentDetails(agentObject) {

        if (this.isFieldEmpty(agentObject.Agent.tb_agent_firstName)) {
            agentObject.Agent.tb_agent_firstName = fname;
        }
        if (this.isFieldEmpty(agentObject.Agent.tb_agent_lastName)) {
            agentObject.Agent.tb_agent_lastName = lname;
        }
        if (this.isFieldEmpty(agentObject.Agent.tb_agent_email)) {
            agentObject.Agent.tb_agent_email = email;
        }
        if (this.isFieldEmpty(agentObject.Agent.tb_agent_confirmEmail)) {
            agentObject.Agent.tb_agent_confirmEmail = email;
        }
        if (this.isFieldEmpty(agentObject.Agent.tb_agent_phone)) {
            agentObject.Agent.tb_agent_phone = phoneNumber;
        }
        if (this.isFieldEmpty(agentObject.Agent.sb_agent_securityQues)) {
            agentObject.Agent.sb_agent_securityQues = securityQuestionAnswer[0];
        }
        if (this.isFieldEmpty(agentObject.Agent.tb_agent_securityAnswers)) {
            agentObject.Agent.tb_agent_securityAnswers = securityQuestionAnswer[1];
        }
        if (this.isFieldEmpty(agentObject.Agent.tb_agent_licenceNumber)) {
            agentObject.Agent.tb_agent_licenceNumber = random.getRandomString(10, true);
        }
        if (this.isFieldEmpty(agentObject.Agent.tb_agent_npn)) {
            agentObject.Agent.tb_agent_npn = random.getRandomString(10, true);
        }
        if (this.isFieldEmpty(agentObject.Agent.tb_agent_licenceRenewDate)) {
            agentObject.Agent.tb_agent_licenceRenewDate = endDate;
        }
        if (this.isFieldEmpty(agentObject.Agent.tb_agent_primaryContact)) {
            agentObject.Agent.tb_agent_primaryContact = phoneNumber;
        }
        if (this.isFieldEmpty(agentObject.Agent.tb_agent_businessName)) {
            agentObject.Agent.tb_agent_businessName = random.getRandomBusinessName();
        }
        if (this.isFieldEmpty(agentObject.Agent.tb_agent_EIN)) {
            agentObject.Agent.tb_agent_EIN = random.getRandomString(9, true);
        }
        if (this.isFieldEmpty(agentObject.Agent.tb_agent_businessAddress1)) {
            agentObject.Agent.tb_agent_businessAddress1 = address[state].address.addressLine1;;
        }
        if (this.isFieldEmpty(agentObject.Agent.tb_agent_businessAddress2)) {
            agentObject.Agent.tb_agent_businessAddress2 = address[state].address.addressLine2;
        }
        if (this.isFieldEmpty(agentObject.Agent.tb_agent_BACity)) {
            agentObject.Agent.tb_agent_BACity = address[state].address.city;
        }
        if (this.isFieldEmpty(agentObject.Agent.sb_agent_BAState)) {
            agentObject.Agent.sb_agent_BAState = address[state].address.state;
        }
        if (this.isFieldEmpty(agentObject.Agent.tb_agent_BAZip)) {
            agentObject.Agent.tb_agent_BAZip = address[state].address.zip;
        }

    }
    updateAgentAdminDetails(agentAdminObject) {

        return agentAdminObject;

    }
    setAgentAdminDetails(agentAdminObject) {
        if (this.isFieldEmpty(agentAdminObject.AgentAdmin.tb_newStartDate)) {
            agentAdminObject.AgentAdmin.tb_newStartDate = startDate;
        }
        if (this.isFieldEmpty(agentAdminObject.AgentAdmin.tb_newEndDate)) {
            agentAdminObject.AgentAdmin.tb_newEndDate = endDate;
        }
    }
    updateHouseholdDetails(preEligibilityObject) {
        this.setHouseholdDetails(preEligibilityObject);
        preEligibilityObject = commonConfig.getApplicationConfig(preEligibilityObject);
        return preEligibilityObject;
    }

    setHouseholdDetails(preEligibilityObject) {
        if (this.isFieldEmpty(preEligibilityObject.income)) {
            preEligibilityObject.income = eligibiltyIncome[state].QHPEligible3MemberIncome;
        }

        if (this.isFieldEmpty(preEligibilityObject.zip)) {
            preEligibilityObject.zip = address[state].address.zip;
        }
        if (this.isFieldEmpty(preEligibilityObject.county)) {
            preEligibilityObject.county = address[state].address.county;
        }
    }
    updateIncomeDetails(ssapJsonObj) {
        var scenarioTag = ssapJsonObj.scenario;
        let count = 0;
        ssapJsonObj.applicants.forEach(member => {
            if (this.isFieldEmpty(member.income.amount)&&member.income.amount!=0) {
                console.log("*****Updating Income Details*****")
                let incomeDetails = applicantDetails[state][scenarioTag].income;
                let deductionAmount = applicantDetails[state][scenarioTag].deductionAmount;
                console.log("incomeDetails: ", incomeDetails)
                if (member.relation.toUpperCase() === "SELF") {
                    member.income.amount = incomeDetails.applicant
                    member.income.deductionSources.amount = deductionAmount.applicant
                    member.income.expectedIncomeInNextYear.totalExpectedYearlyAmount = incomeDetails.applicant
                }else {
                    member.income.amount = incomeDetails.household[count]
                    member.income.deductionSources.amount = deductionAmount.household[count]
                    member.income.expectedIncomeInNextYear.totalExpectedYearlyAmount = incomeDetails.household[count]
                    count++;
                }

            }
        });
         
    }
}
module.exports = new JsonUtil();

const randomData = require("../RandomDataGenerator");
const atConst = require("./ATConstants");
const atData = require("./DataGen");
const jsonUtil = require("../JsonUtil");
const Global = require('../../pagemodels/Global_include');
const fs = require('fs');
const crypto = require('crypto');
const soap = require('soap');
var http = require("https");

class ATJsonGenerator {

    //Initiate HH Json creation with
    initHousehold(inputFile) {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        //Read household information from data input file
        global.updateDataJson.households[householdIndex] = jsonUtil.readJson(inputFile);

        /** Create HH relationships for default family
         Parents and children for now
         other relationships should be implemented or entered manually through the hh input file
         take care of default family relationships
         if some people information exists in hh input file **/
        
        if (global.updateDataJson.households[householdIndex].people && global.updateDataJson.households[householdIndex].hhFamily) {
            console.log("Inside people exist");
            // assume the relationships are not in hh input file
            //global.updateDataJson.households[householdIndex].people['rel'] = {}
            let relationships = atData.relationships(global.updateDataJson.households[householdIndex].people.length, global.updateDataJson.households[householdIndex].hhFamily.singleParent)
            for (let i = 0; i < global.updateDataJson.households[householdIndex].people.length; i++) {
                global.updateDataJson.households[householdIndex]['people'][i]['rel'] = relationships[`${i + 1}`]
            }
        }
        //add people if not in hh input file
        if (!global.updateDataJson.households[householdIndex].people && global.updateDataJson.households[householdIndex].hhFamily) {
            console.log("Inside people don't exist");
            global.updateDataJson.households[householdIndex].people = []
            let relationships = atData.relationships(global.updateDataJson.households[householdIndex].hhFamily.size, global.updateDataJson.households[householdIndex].hhFamily.singleParent)
            for (let i = 0; i < global.updateDataJson.households[householdIndex].hhFamily.size; i++) {
                global.updateDataJson.households[householdIndex].people[i] = {'rel': relationships[`${i + 1}`]}
            }
        }

        //If hhLastName = true, generate common LastName for the HH
        if (global.updateDataJson.households[householdIndex].hhLastName) {
            global.updateDataJson.households[householdIndex].lastName = randomData.getRandomLastName();
        }
        this.createHousehold();
        //console.log("Updated Info:" + JSON.stringify(global.updateDataJson.households[householdIndex]));
    }

    initPeople(){
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;

        console.log("Household size in datagen ---- " + global.updateDataJson.households[householdIndex].people.length)
        for (let i = 0; i < global.updateDataJson.households[householdIndex].people.length; i++) {

            if (!global.updateDataJson.households[householdIndex].people[i].personId) {
                let j = i
                global.updateDataJson.households[householdIndex].people[i].personId = 'Person' + (j+1);
                console.log(`PersonId ${i}: ` + global.updateDataJson.households[householdIndex].people[i].personId)
            }
            //TODO: refactor
            //TODO: generate eligDates
            if (!global.updateDataJson.households[householdIndex].people[i].aptcEligibilityStartDate) {
                global.updateDataJson.households[householdIndex].people[i].aptcEligibilityStartDate = global.updateDataJson.households[householdIndex].eligibilityStartDate
            };
            if (!global.updateDataJson.households[householdIndex].people[i].aptcEligibilityEndDate) {
                global.updateDataJson.households[householdIndex].people[i].aptcEligibilityEndDate = global.updateDataJson.households[householdIndex].eligibilityEndDate
            };
            if (!global.updateDataJson.households[householdIndex].people[i].csrEligibilityStartDate) {
                global.updateDataJson.households[householdIndex].people[i].csrEligibilityStartDate = global.updateDataJson.households[householdIndex].eligibilityStartDate
            };
            if (!global.updateDataJson.households[householdIndex].people[i].csrEligibilityEndDate) {
                global.updateDataJson.households[householdIndex].people[i].csrEligibilityEndDate = global.updateDataJson.households[householdIndex].eligibilityEndDate
            };
            if (!global.updateDataJson.households[householdIndex].people[i].exchangeEligibilityStartDate) {
                global.updateDataJson.households[householdIndex].people[i].exchangeEligibilityStartDate = global.updateDataJson.households[householdIndex].eligibilityStartDate
            };
            if (!global.updateDataJson.households[householdIndex].people[i].exchangeEligibilityEndDate) {
                global.updateDataJson.households[householdIndex].people[i].exchangeEligibilityEndDate = global.updateDataJson.households[householdIndex].eligibilityEndDate
            };
            if (!global.updateDataJson.households[householdIndex].people[i].activityDate) {
                global.updateDataJson.households[householdIndex].people[i].activityDate = global.updateDataJson.households[householdIndex].activityDate
            };

            if (!global.updateDataJson.households[householdIndex].people[i].firstName) {
                global.updateDataJson.households[householdIndex].people[i].firstName = randomData.getRandomFirstName();
            };
            if (!global.updateDataJson.households[householdIndex].people[i].aptcMaximumAmount && global.updateDataJson.households[householdIndex].aptcMaximumAmount ) {
                global.updateDataJson.households[householdIndex].people[i].aptcMaximumAmount = global.updateDataJson.households[householdIndex].aptcMaximumAmount;
            };

            if (!global.updateDataJson.households[householdIndex].people[i].lastName && global.updateDataJson.households[householdIndex].lastName) {
                global.updateDataJson.households[householdIndex].people[i].lastName = global.updateDataJson.households[householdIndex].lastName;
            }
            else if (!global.updateDataJson.households[householdIndex].people[i].lastName && !global.updateDataJson.households[householdIndex].lastName){
                global.updateDataJson.households[householdIndex].people[i].lastName = randomData.getRandomLastName();
            };

        };
    }

    randomAptcMaximumAmount() {
        let amntArr = [110, 115, 220.12, 225, 230, 235.55, 240, 245, 250, 255, 260, 265.05, 275, 280, 285.99, 290, 295, 300];
        let randAptcAmnt = amntArr[Math.floor(Math.random() * amntArr.length)];
        return randAptcAmnt;
    }
    randomInsurancePremiumAmmount() {
        let amntArr = [255.55, 125.80, 155.50, 342.50, 215.10, 225.25, 250.20, 275.30, 355.55];
        let randInsPremium = amntArr[Math.floor(Math.random() * amntArr.length)];
        return randInsPremium;
    }

    setPrimaryIds() {
        let primaryIds = {}
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;

        //Check if main subscriber flag is provided for any person in the hh
        for (let i = 0; i < global.updateDataJson.households[householdIndex].people.length; i++){
            if (global.updateDataJson.households[householdIndex].people[i].isHouseholdMemberReference){
                global.updateDataJson.households[householdIndex].people[i].householdMemberReferenceId = global.updateDataJson.households[householdIndex].people[i].personId
            };
            if (global.updateDataJson.households[householdIndex].people[i].pimaryTaxFilerProvided){
                global.updateDataJson.households[householdIndex].people[i].primaryTaxFilerId = global.updateDataJson.households[householdIndex].people[i].personId
            };
            if (global.updateDataJson.households[householdIndex].people[i].mainSubscriberProvided){
                global.updateDataJson.households[householdIndex].people[i].mainSubscriberId = global.updateDataJson.households[householdIndex].people[i].personId
            };
            if (global.updateDataJson.households[householdIndex].people[i].isSSFSigner){
                global.updateDataJson.households[householdIndex].people[i].ssfSignerId = global.updateDataJson.households[householdIndex].people[i].personId
            };

        };

        // if not provided set Person1 as main subscriber
        if (!global.updateDataJson.households[householdIndex].people.householdMemberReferenceId ) {
            global.updateDataJson.households[householdIndex].householdMemberReferenceId = global.updateDataJson.households[householdIndex].people[0].personId;
        };
        if (!global.updateDataJson.households[householdIndex].primaryTaxFilerId ) {
            global.updateDataJson.households[householdIndex].primaryTaxFilerId = global.updateDataJson.households[householdIndex].people[0].personId;
        };
        if (!global.updateDataJson.households[householdIndex].mainSubscriberId ) {
            global.updateDataJson.households[householdIndex].mainSubscriberId = global.updateDataJson.households[householdIndex].people[0].personId;
        };
        if (!global.updateDataJson.households[householdIndex].ssfSignerId ) {
            global.updateDataJson.households[householdIndex].ssfSignerId = global.updateDataJson.households[householdIndex].people[0].personId;
        };


        // global.updateDataJson.households[householdIndex]['taxDependants'] = [];
        // for (let i = 0; i < global.updateDataJson.households[householdIndex].people.length; i++){
        //     if (global.updateDataJson.households[householdIndex].people[i].primaryTaxFilerId != global.updateDataJson.households[householdIndex].people[i].personId){
        //         global.updateDataJson.households[householdIndex].people[i].taxDependants = global.updateDataJson.households[householdIndex].people[i].personId;
        //     }
        // };
    }

    primaryIDGeneration(){
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;

        if (global.updateDataJson.households[householdIndex].people.primaryTaxFilerId === "Person1") {
            global.updateDataJson.households[householdIndex].people[0]['isPrimaryTaxFiler'] = true

            if (!global.updateDataJson.households[householdIndex].people[0].aptcMaximumAmount && global.updateDataJson.households[householdIndex].aptcMaximumAmount){
                global.updateDataJson.households[householdIndex].people[0].aptcMaximumAmount = global.updateDataJson.households[householdIndex].aptcMaximumAmount
            }
            if (!global.updateDataJson.households[householdIndex].people[0].aptcMaximumAmount && !global.updateDataJson.households[householdIndex].aptcMaximumAmount){
                global.updateDataJson.households[householdIndex].people[0].aptcMaximumAmount = this.randomAptcMaximumAmount()
            }

            if (!global.updateDataJson.households[householdIndex].people[0].insurancePremiumAmount && global.updateDataJson.households[householdIndex].insurancePremiumAmount){
                global.updateDataJson.households[householdIndex].people[0].insurancePremiumAmount = global.updateDataJson.households[householdIndex].insurancePremiumAmount
            }
            if (!global.updateDataJson.households[householdIndex].people[0].insurancePremiumAmount && !global.updateDataJson.households[householdIndex].insurancePremiumAmount){
                global.updateDataJson.households[householdIndex].people[0].insurancePremiumAmount = this.randomInsurancePremiumAmmount()
            }
        }
    }

    createHousehold(){
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;

        if (!global.updateDataJson.households[householdIndex]){throw "(createHousehold) - no household info provided"};
        if (!global.updateDataJson.households[householdIndex].people) {throw "(createHousehold) - no household.people info provided"};
        //if (!global.updateDataJson.households[householdIndex].activityDate) {throw "(createHousehold) - no household.activityDate provided"};

        //TODO: what's default eligibilityStartDate/eligibilityEndDate?
        // NO HARD CODING!!!!
        if (!global.updateDataJson.households[householdIndex].eligibilityStartDate) {global.updateDataJson.households[householdIndex].eligibilityStartDate = "2021-01-01"};
        if (!global.updateDataJson.households[householdIndex].eligibilityEndDate) {global.updateDataJson.households[householdIndex].eligibilityEndDate = "2021-12-31"};
        if (global.updateDataJson.households[householdIndex].hhLastName) {
            global.updateDataJson.households[householdIndex].lastName = randomData.getRandomLastName();
        }

        //TODO: how do we read server date?
        // let serverDate = new Date(cy.ServerTime.now)
        //if (moment(serverDate).isAfter(global.updateDataJson.households[householdIndex].eligibilityStartDate)) global.updateDataJson.households[householdIndex]['coverageStarted'] = true


        this.initPeople();
        this.setPrimaryIds();
        this.primaryIDGeneration();


    }


}
module.exports = new ATJsonGenerator();
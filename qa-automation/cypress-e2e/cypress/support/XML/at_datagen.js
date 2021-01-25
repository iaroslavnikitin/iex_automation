import moment from 'moment'

cy.setGroups = (groups, grComb, person) => {
    let groupExists = false;

    for (let i = 0; i < groups.length; i++) {
        groupExists = (groups[i].groupCombination.csrIndicator === grComb.csrIndicator &&
            groups[i].groupCombination.csrLevel === grComb.csrLevel &&
            groups[i].groupCombination.aptcIndicator === grComb.aptcIndicator);

        if (groupExists) {
            groups[i].people.push(person.personId);
            break;
        };
    };
    //	_log("Group already exists - " + $groupExists);
    if (!groupExists) {
        let gr = {
            group: groups.length + 1,
            groupCombination: grComb,
            groupStatus: "at_created",
            people: [person.personId]
        };
        groups.push(gr);
    };
    return groups;
}

cy.defineGroups = (people) => {
    let groups = new Array();
    let ineligibleGroup = new Array();

    let gr = {};

    for (let i = 0; i < people.length; i++) {
        if (!people[i].exchangeEligibilityIndicator)
        {
            ineligibleGroup.push(people[i].personId);
        }
        else{
            let groupCombination = {
                csrIndicator: people[i].csrEligibilityIndicator,
                csrLevel: people[i].csrCategoryAlphaCode,
                aptcIndicator: people[i].aptcEligibilityIndicator
            };
            groups = cy.setGroups(groups, groupCombination, people[i]);
        }
    }

    gr["eligible"] = groups;
    gr["ineligible"] = ineligibleGroup;

    return gr;
}



cy.createPerson = function createPerson(p) {
    if (!p) {throw "(createPerson) - no person information provided"}

    //SSN and DOB should be created by now (init household)
    let dSSN = p.ssn;
    let dDOB = p.dob || cy.getRandomDateOfBirth();
    let eligStartDate = moment(new Date(p.aptcEligibilityStartDate)).add("month").startOf('month');
    let dob =  moment(new Date(dDOB)).startOf('month');
    let diff = eligStartDate.diff(dob);
    let dAge = Math.floor(moment.duration(diff).asYears());

    //setting some default values;
    let dPhone = p.phone || cy.phoneGen().join("");
    let dMedId = p.personMedicaidIdentification || dSSN + Cypress._.random(1, 9); //to create Medicaid id adding MED prefix to SSN
    let dEmail = p.email || dMedId + "@yopmail.com";

    //TODO: implement with if child (<18 yo) option
    // || cy.getRandomDateOfBirth();
    let dPersonId = p.personId;

    let dCsrCategoryAlphaCode;
    let dCsrLevel;
    if (p.csrCategoryAlphaCode){
       dCsrCategoryAlphaCode = p.csrCategoryAlphaCode
        console.log("p.csrCategoryAlphaCode exists")
    }
    else if (!p.csrCategoryAlphaCode && p.csrLevel){
        dCsrCategoryAlphaCode = cy.csrLevel[`${p.csrLevel}`].v
        dCsrLevel = cy.csrLevel[`${p.csrLevel}`].k
        console.log("p.csrCategoryAlphaCode doesn't exist and p.csrLevel exists")
    }
    else if (!p.csrCategoryAlphaCode && !p.csrLevel){
        dCsrCategoryAlphaCode = cy.csrLevel.CS4.v
        dCsrLevel = cy.csrLevel.CS4.k
        console.log("p.csrCategoryAlphaCode doesn't exist and p.csrLevel doesn't exist")
    }

    const dAmericanIndianIndicator = (p.csrLevel === cy.csrLevel.CS2.k || p.csrLevel === cy.csrLevel.CS3.k) ? true : false

    let person = {
        rel: p.rel,
        personId: dPersonId,
        firstName: p.firstName || cy.randomFirstName(),
        middleName: p.middleName,
        lastName: p.lastName || cy.randomLastName(),
        dob: dDOB,
        age: dAge,
        ssn: dSSN,
        email: dEmail,
        phone: dPhone,
        activityDate: p.activityDate,
        personSex: p.personSex || cy.randomGender(), //default??
        personRace: p.personRace  || cy.randomRace(), //default??
        personSpeaksLanguage: p.personSpeaksLanguage,
        personWritesLanguage: p.personWritesLanguage,
        USCitizenIndicator: p.USCitizenIndicator !== false,
        americanIndianIndicator: dAmericanIndianIndicator,

        //Elig Start and End Dates for aptc, csr, and exchange should match
        //APTC eligibility
        aptcEligibilityIndicator: p.aptcEligibilityIndicator !== false,
        aptcEligibilityStartDate: p.aptcEligibilityStartDate,
        aptcEligibilityEndDate: p.aptcEligibilityEndDate,
        aptcEligibilityReasonText: p.aptcEligibilityReasonText || '999',

        //CSR eligibility
        csrEligibilityIndicator: p.csrEligibilityIndicator !== false,
        csrEligibilityReasonText: p.csrEligibilityReasonText || '999',
        csrCategoryAlphaCode: dCsrCategoryAlphaCode,
        csrEligibilityStartDate: p.csrEligibilityStartDate,
        csrEligibilityEndDate: p.csrEligibilityEndDate,
        csrLevel: dCsrLevel,

        //Exchange eligibility
        exchangeEligibilityIndicator: p.exchangeEligibilityIndicator !== false,
        exchangeEligibilityReasonText: p.exchangeEligibilityReasonText || '999',
        exchangeEligibilityStartDate: p.exchangeEligibilityStartDate,
        exchangeEligibilityEndDate: p.exchangeEligibilityEndDate,

        personMedicaidIdentification: p.personMedicaidIdentification || dMedId,
        personMarriedIndicator: p.personMarriedIndicator || false,
        personMarriedIndicatorCode: p.personMarriedIndicatorCode,
        isMainSubscriber: p.isMainSubscriber,
        isSeekingCoverageIndicator: p.isSeekingCoverageIndicator !== false, //applies for Insurance?
        isPrimaryContact: p.isPrimaryContact || false,
        isPrimaryTaxFiler: p.isPrimaryTaxFiler || false, // PrimaryTaxFiler
        isSSFSigner: p.isSSFSigner || false,
        isHouseholdMemberReference: p.isHouseholdMemberReference || false
    };
    if (p.insurancePremiumAmount !== undefined || p.insurancePremiumAmount !== null){
        person.insurancePremiumAmount = p.insurancePremiumAmount
    }
    if (p.aptcMaximumAmount !== undefined || p.aptcMaximumAmount !== null){
        person.aptcMaximumAmount = p.aptcMaximumAmount
    }
    return person;
}

//TODO: refactor
cy.setPrimaryIds = function setPrimaryIds(ppl) {
    let primaryIds = {}

    //Check if main subscriber flag is provided for any person in the hh
    for (let i = 0; i < ppl.length; i++){
        if (ppl[i].isHouseholdMemberReference){
            primaryIds.householdMemberReferenceId = ppl[i].personId
        };
        if (ppl[i].pimaryTaxFilerProvided){
            primaryIds.primaryTaxFilerId = ppl[i].personId
        };
        if (ppl[i].mainSubscriberProvided){
            primaryIds.mainSubscriberId = ppl[i].personId
        };
        if (ppl[i].isSSFSigner){
            primaryIds.ssfSignerId = ppl[i].personId
        };

    };

    // if not provided set Person1 as main subscriber
    if (!primaryIds.householdMemberReferenceId ) {
        primaryIds.householdMemberReferenceId = ppl[0].personId;
    };
    if (!primaryIds.primaryTaxFilerId ) {
        primaryIds.primaryTaxFilerId = ppl[0].personId;
    };
    if (!primaryIds.mainSubscriberId ) {
        primaryIds.mainSubscriberId = ppl[0].personId;
    };
    if (!primaryIds.ssfSignerId ) {
        primaryIds.ssfSignerId = ppl[0].personId;
    };


    primaryIds['taxDependants'] = [];
    for (let i = 0; i < ppl.length; i++){
        if (primaryIds.primaryTaxFilerId != ppl[i].personId){
            primaryIds['taxDependants'].push(ppl[i].personId);
        }
    };

    return primaryIds;
}

cy.createHousehold = function createHousehold(hh){
    if (!hh){throw "(createHousehold) - no household info provided"};
    if (!hh.people) {throw "(createHousehold) - no household.people info provided"};
    if (!hh.activityDate) {throw "(createHousehold) - no household.activityDate provided"};

    if (!hh.eligibilityStartDate) {hh.eligibilityStartDate = "2020-01-01"};
    if (!hh.eligibilityEndDate) {hh.eligibilityEndDate = "2020-12-31"};


    let serverDate = new Date(cy.ServerTime.now)
    if (moment(serverDate).isAfter(hh.eligibilityStartDate)) hh['coverageStarted'] = true


    let person = new Array();
    cy.log("Household size in datagen ---- " + hh.people.length)
    for (let i = 0; i < hh.people.length; i++) {

        if (!hh.people[i].personId) {
            let j = i
            hh.people[i].personId = 'Person' + (j+1);
            cy.log(`PersonId ${i}: ` + hh.people[i].personId)
        }
        //TODO: refactor
        //TODO: generate eligDates
        if (!hh.people[i].aptcEligibilityStartDate) {
            hh.people[i].aptcEligibilityStartDate = hh.eligibilityStartDate
        };
        if (!hh.people[i].aptcEligibilityEndDate) {
            hh.people[i].aptcEligibilityEndDate = hh.eligibilityEndDate
        };
        if (!hh.people[i].csrEligibilityStartDate) {
            hh.people[i].csrEligibilityStartDate = hh.eligibilityStartDate
        };
        if (!hh.people[i].csrEligibilityEndDate) {
            hh.people[i].csrEligibilityEndDate = hh.eligibilityEndDate
        };
        if (!hh.people[i].exchangeEligibilityStartDate) {
            hh.people[i].exchangeEligibilityStartDate = hh.eligibilityStartDate
        };
        if (!hh.people[i].exchangeEligibilityEndDate) {
            hh.people[i].exchangeEligibilityEndDate = hh.eligibilityEndDate
        };
        if (!hh.people[i].activityDate) {
            hh.people[i].activityDate = hh.activityDate
        };

        if (!hh.people[i].firstName) {
            hh.people[i].firstName = cy.randomFirstName();
        };
        if (!hh.people[i].aptcMaximumAmount && hh.aptcMaximumAmount ) {
            hh.people[i].aptcMaximumAmount = hh.aptcMaximumAmount;
        };

        if (!hh.people[i].lastName && hh.lastName) {
            hh.people[i].lastName = hh.lastName;
        }
        else if (!hh.people[i].lastName && !hh.lastName){
            hh.people[i].lastName = cy.randomLastName();
        };

        let p = cy.createPerson(hh.people[i]);
        person.push(p);
    };

    hh["people"] = person;
    cy.log("People: " + JSON.stringify(hh.people));

    let primaryIds = cy.setPrimaryIds(hh.people);
    console.log("PrimaryIds are: " + JSON.stringify(primaryIds))
    if (primaryIds.primaryTaxFilerId === "Person1") {
        hh.people[0]['isPrimaryTaxFiler'] = true

        if (hh.people[0].aptcMaximumAmount === undefined && hh.aptcMaximumAmount){
            hh.people[0].aptcMaximumAmount = hh.aptcMaximumAmount
        }
        if (hh.people[0].aptcMaximumAmount === undefined && hh.aptcMaximumAmount === undefined){
            hh.people[0].aptcMaximumAmount = cy.randomAptcMaximumAmount()
        }

        if (hh.people[0].insurancePremiumAmount === undefined && hh.insurancePremiumAmount){
            hh.people[0].insurancePremiumAmount = hh.insurancePremiumAmount
        }
        if (hh.people[0].insurancePremiumAmount === undefined && hh.insurancePremiumAmount === undefined){
            hh.people[0].insurancePremiumAmount = cy.randomInsurancePremiumAmmount()
        }
    }

    console.log("person 1 primaryTaxFiler: " + hh.people[0].isPrimaryTaxFiler)

    hh["groups"] = cy.defineGroups(hh.people)
    if(!hh.applicationId){
        hh.applicationId = "CYPRESS" + Cypress._.random(10000000000,99999999990);
    }
    let aptcE = cy.hhAPTCEligibility(hh.people)

    cy.log("aptcE is " + JSON.stringify(aptcE))

    let household = {
        oep: hh.oep || false,
        coverageStarted: hh.coverageStarted || false,
        activityDate: hh.activityDate,
        applicationId: hh.applicationId,
        icn: hh.icn || "ICND" + Cypress._.random(100000000,999999990),  //ICND223115244,
        user: hh.user || hh.applicationId + "@yopmail.com",
        email: hh.email || hh.applicationId + "@yopmail.com",
        pass: hh.pass || "Ghix123#",
        lastName: hh.lastName || cy.randomLastName(),
        address: hh.address || cy.getRandomAddress(cy.ServerConfig.stateCode),
        year: hh.year || cy.current_coverage_year,
        aptcEligibility: aptcE,
        appStatus: hh.appStatus || 'at_created',
        eligibilityStartDate: hh.eligibilityStartDate,
        eligibilityEndDate: hh.eligibilityEndDate,
        currentEligibilitySpan: hh.currentEligibilitySpan || 1,
        totalEligibilitySpan: hh.totalEligibilitySpan || 1,
        insuranceApplicationRequestingFinancialAssistanceIndicator: hh.insuranceApplicationRequestingFinancialAssistanceIndicator !== false,
        householdMemberReferenceId: primaryIds.householdMemberReferenceId,
        primaryTaxFilerId: primaryIds.primaryTaxFilerId,
        mainSubscriberId: primaryIds.mainSubscriberId,
        taxDependants: primaryIds.taxDependants,
        ssfSignerId: primaryIds.ssfSignerId,
        rolename: hh.rolename || 'INDIVIDUAL',
        assisterBrokerId: hh.assisterBrokerId || Cypress._.random(100000000,999999999),
        assisterExternalId: hh.assisterExternalId || "AS" + Cypress._.random(1000000000,9999999990),
        assisterBrokerNPN: hh.assisterBrokerNPN || Cypress._.random(10000000,99999999),
        u: hh.u || {firstname: 'One', lastname: 'Cypress'},
        people: hh.people,
        groups: hh.groups
    }

    let ts = new Date()
    console.log("hh person 1 primaryTaxFiler: " + household.people[0].isPrimaryTaxFiler)
    let hhDatagen = `${Cypress.spec.name}_${household.applicationId}_household.json`
    cy.writeFile(hhDatagen, JSON.stringify(household) + "\n\n", {flag: "a+"})
    return household;

}


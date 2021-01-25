//const jsonQuery = require('json-query')
import moment from "moment"

Cypress.Commands.add("createAccountTransfer", (hh) => {
    cy.log("AT in createAccountTransfer = " + JSON.stringify(hh))
    cy.h = cy.createHousehold(hh)

    cy.postUMrequest(cy.h)
        .then((res_um_json) => {
            //UM post verification
            let resFile = `${Cypress.spec.name}_${cy.h.applicationId}_um_response.json`
            cy.writeFile(resFile, JSON.stringify(res_um_json) + "\n\n", {flag: "a+"})
            expect(res_um_json.status).to.equal(200, "Verifying User Management Service status")

            let remoteIdRegex = new RegExp('<remoteId>' + cy.h.applicationId + '</remoteId>')
            expect(res_um_json.body).to.match(remoteIdRegex, "Checking User Management Service Response")
        })
    cy.postATrequest(cy.h)
        .then((res_at_json) => {
            let resFile = `${Cypress.spec.name}_${cy.h.applicationId}_at_response.json`
             cy.writeFile(resFile, JSON.stringify(res_at_json) + "\n\n", {flag: "a+"})

            //AT post verification
            expect(res_at_json.status).to.equal(200, "Account Transfer response status")

            let responseStatusRegex1 = new RegExp('<ns3:ResponseCode>HS000000</ns3:ResponseCode>' +
                '<ns3:ResponseDescriptionText>Success</ns3:ResponseDescriptionText>')
            expect(res_at_json.body).to.match(responseStatusRegex1, "Account Transfer upload status")
        })
})


Cypress.Commands.add("createUser", (hh) => {
    cy.log("in createUser = " + JSON.stringify(hh))

    cy.postUMrequest(hh)
        .then((res_um_json) => {
            //UM post verification
            let resFile = `${Cypress.spec.name}_${hh.applicationId}_um_response.json`
            cy.writeFile(resFile, JSON.stringify(res_um_json) + "\n\n", {flag: "a+"})
            expect(res_um_json.status).to.equal(200, "Verifying User Management Service status")

            let remoteIdRegex = new RegExp('<remoteId>' + hh.applicationId + '</remoteId>')
            expect(res_um_json.body).to.match(remoteIdRegex, "Checking User Management Service Response")
        })
})

Cypress.Commands.add("updateAccountTransfer", (hh) => {
    cy.h = cy.createHousehold(hh)

    cy.postATrequest(cy.h)
        .then((res_at_json) => {
            //AT post verification
            expect(res_at_json.status).to.equal(200, "Account Transfer response status")

            let responseStatusRegex1 = new RegExp('<ns3:ResponseCode>HS000000</ns3:ResponseCode>' +
                '<ns3:ResponseDescriptionText>Success</ns3:ResponseDescriptionText>')
            expect(res_at_json.body).to.match(responseStatusRegex1, "Account Transfer upload status")
            let resFile = `${Cypress.spec.name}_${cy.h.applicationId}_at_response.json`
            cy.writeFile(resFile, JSON.stringify(res_at_json) + "\n\n", {flag: "a+"})
        })
        .then(() =>{
            cy.wait(10000)
        })
})

Cypress.Commands.add('addMember', (p) =>{
    //1.remove personId ("person1"...) and family relationships
    for (let ppl of cy.h.people){
        delete ppl.personId
        delete ppl.rel
    }

    //2. remove primary info
    delete cy.h.householdMemberReferenceId
    delete cy.h.primaryTaxFilerId
    delete cy.h.mainSubscriberId
    delete cy.h.taxDependants
    delete cy.h.ssfSignerId

    //3. remove groups
    delete cy.h.groups

    //4. generate and add member
    if (p){
        cy.h.people.push(p)
    }
    else{
        let ppl = {lastName: cy.h.lastName}
        cy.h.people.push(ppl)
    }
    //check/generate SSN
    cy.checkSSNunique(cy.h)

    //create relationships
   // cy.log("hh size: " + cy.h.people.length)
    let relationships = cy.rels(cy.h.people.length)
    for (let i =0; i < cy.h.people.length; i++) {
        cy.h.people[i].rel = relationships[`${i+1}`]
    }

    //5. call genData
    cy.h = cy.createHousehold(cy.h)
})

Cypress.Commands.add('removeMember', () => {
//1.remove personId ("person1"...) and family relationships
    for (let ppl of cy.h.people){
        delete ppl.personId
        delete ppl.rel
    }

    //2. remove primary info
    delete cy.h.householdMemberReferenceId
    delete cy.h.primaryTaxFilerId
    delete cy.h.mainSubscriberId
    delete cy.h.taxDependants
    delete cy.h.ssfSignerId

    //3. remove groups
    delete cy.h.groups

    //4. Remove last member
    let l = cy.h.people.length - 1
    cy.log(`index ${l}`)

    if (l > 0) {delete cy.h.people.splice(l)}
    else {throw `The household size is ${cy.h.people.length}. Unable to remove members`}

    //create relationships
    cy.log("hh size: " + cy.h.people.length)
    let relationships = cy.rels(cy.h.people.length)
    for (let i =0; i < cy.h.people.length; i++) {
        cy.h.people[i].rel = relationships[`${i+1}`]
    }

    //5. call genData
    cy.h = cy.createHousehold(cy.h)

})


//TODO: refactor to use initializeHouseholdInfo for create and update
Cypress.Commands.add('initHousehold', (file) => {
    cy.current_coverage_year = cy.ServerConfig.coverageYear
    cy.current_oe_end_date = cy.ServerConfig.oepEndDate
    cy.current_oe_start_date = cy.ServerConfig.oepStartDate

    cy.log("coverage year: " + cy.current_coverage_year)
    cy.log("oep start date: " + cy.current_oe_start_date)
    cy.log("oep end date: " + cy.current_oe_end_date)


    cy.fixture(file)
        .then (household => {
            let serverDate = new Date(cy.ServerTime.now)

            cy.log("Server time --- " + serverDate)
            cy.household = household

            if (moment(serverDate).isBetween(cy.ServerConfig.oepStartDate, cy.ServerConfig.oepEndDate, "day", '[]')){
                cy.household['oep'] = true
            }
            if (moment(serverDate).isAfter(cy.household.eligibilityStartDate)) cy.household['coverageStarted'] = true



            //add people if not in fixture hh file
            if (!cy.household.people && cy.household.hhFamily) {
                cy.household.people = []
                let relationships = cy.rels(cy.household.hhFamily.size, cy.household.hhFamily.singleParent)
                for (let i =0; i<cy.household.hhFamily.size; i++) {
                    cy.household.people[i] = {'rel': relationships[`${i + 1}`]}
                }
            }

            //take care of default family relationships
            if (cy.household.people && cy.household.hhFamily) {
                cy.household.people['rel'] = {}
                let relationships = cy.rels(cy.household.hhFamily.size, cy.household.hhFamily.singleParent)
                for (let i =0; i<cy.household.hhFamily.size; i++) {
                    cy.household['people'][i]['rel'] = relationships[`${i + 1}`]
                    cy.log(`rel in loop ${i + 1} ` + JSON.stringify(relationships[`${i + 1}`]))
                }
            }

            cy.checkSSNunique(cy.household)
            cy.household.activityDate = serverDate.toISOString()

            //Generate the same lastName for the household
            if (cy.household.hhLastName) {
                cy.household.lastName = cy.randomLastName()
            }
            // cy.wait(cy.checkSSNunique())
            cy.log("household in createAT : " + JSON.stringify(household))
            cy.log("serverInfo " + JSON.stringify(cy.ServerInfo))
            cy.log("serverConfig " + JSON.stringify(cy.ServerConfig))

            // cy.writeFile("at_create_hh.json", JSON.stringify(household))
            // cy.writeFile("at_create_serverInfo.json", JSON.stringify(serverInfo))
            // cy.writeFile("at_create_serverConfig.json", JSON.stringify(serverConfig))
        })
})

Cypress.Commands.add("runBeforeBlock", () => {
//get Server Information
    cy.getServerIsoDate().as("serverInfo")
        .then(res => {
            cy.log("Server Information: " + JSON.stringify(res.body))
        })

    cy.getServerTime().as("serverTime")
        .then(res => {
            cy.log("Server time: " + JSON.stringify(res.body))
        })

    cy.getServerConfig().as("serverConfig")
        .then(res => {
            cy.log("Server Conf All: " + JSON.stringify(res.body))
        })

    cy.logout()
})

Cypress.Commands.add("aptcMaxAmountChange", (diff, decrease) => {
    //If no diff provided, set aptcMaximumAmount to 0
    cy.log("APTC max ammount before increase: " + cy.h.people[0].aptcMaximumAmount)
    if (!diff) {
        cy.h.people[0].aptcMaximumAmount = 0
    }
    else if (diff && !decrease){
        cy.h.people[0].aptcMaximumAmount = cy.h.people[0].aptcMaximumAmount + diff
    }
    else if (diff && decrease){

        if (diff > cy.h.people[0].aptcMaximumAmount){
            throw  `Trying to subtract diff = ${diff} from aptcmaxAmount = ${cy.h.people[0].aptcMaximumAmount}`
        }
        else {
            cy.h.people[0].aptcMaximumAmount = cy.h.people[0].aptcMaximumAmount - diff
        }
    }
    cy.log("APTC max ammount after increase: " + cy.h.people[0].aptcMaximumAmount)
})

Cypress.Commands.add("csrChange", (csrLevel) => {
    //This function changes all members to the same CSR
    cy.log("Person1 CSRlevel before change: " + cy.h.people[0].csrLevel)
    if (csrLevel && cy.csrLevel[csrLevel]){
        for (let p of cy.h.people) {
            p.csrLevel = cy.csrLevel[csrLevel].k
            p.csrCategoryAlphaCode = cy.csrLevel[csrLevel].v
        }
    }
    else{

        console.warn(`Unknown CSR level [${csrLevel}].`)
        throw `Unknown CSR level [${csrLevel}].`
    }

    cy.log("Person1 CSRlevel after change: " + cy.h.people[0].csrLevel)
})
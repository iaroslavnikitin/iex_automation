const inputHouseholds = ["regression/APTC_CSR4_4HH"]
before(function () {
    cy.runBeforeBlock()
})

//L2_CSR for this testcase should be created in the environment
const l2_csr_username = 'cic_21_cypress_l2_csr@yopmail.com'
const l2_csr_pass = 'Ghix123#'
const test_case = 'MN-OnDemand'

inputHouseholds.forEach( file => {
    describe(`${test_case}: Financial to Non Financial plus Remove member for ${file}`, function() {

        it(`${test_case}: Change to OEP (manually) - ${file}`, function () {
            cy.debug()
        })
        it (`${test_case}: Init household info with SSN, DOB with checks for ${file}`, function() {
            cy.ServerInfo = this.serverInfo
            cy.ServerConfig = this.serverConfig.body
            cy.ServerTime = this.serverTime.body
            cy.initHousehold(file)
        })
        it(`${test_case}: Creates Account Transfer for ${file}`, function () {
            cy.createAccountTransfer(cy.household)
        })
        it(`${test_case}: Login to  ` + cy.conf.URL, function () {
            cy.login(cy.h.user, cy.h.pass)
        })

        it(`${test_case}: OEP or Qualifying event step`, function () {
            if (!cy.h.oep) {
                cy.log("Inside SEP")
                cy.sepVerifyConfirmEvent({
                    qEvent: cy.SEP_QUALIFYING_EVENTS.MARRIAGE,
                    l2_csr_pass: l2_csr_pass,
                    l2_csr_username: l2_csr_username
                })
            }
            else {
                cy.log("Inside OEP")
            }
        })
        it(`${test_case}: Enrolls household into Medical and Dental - ${file}`, function () {
            cy.enrollIntoMedicalAndDental();
        })
        it(`${test_case}: Change to QEP (manually) - ${file}`, function () {
            cy.debug()
        })

        it(`${test_case}: Logout`, function () {
            cy.logout()
        })

        it(`${test_case}: Remove member for ${file}`, function () {
            cy.removeMember()
        })
        it(`${test_case}: Update aptc/csr eligibility to false for ${file}`, function () {
                cy.h.people[1].aptcEligibilityIndicator = false
                cy.h.people[1].csrEligibilityIndicator = false
        })
        it(`${test_case}: Remove member for ${file}`, function () {
            cy.removeMember()
        })
        it(`${test_case}: Address change for ${file}`, function () {
            cy.h.address = {
                "ns2:LocationStreet": {
                    "ns2:StreetFullText": "14520 18th Ave N"
                },
                "ns2:LocationCityName": "Plymouth",
                    "ns2:LocationCountyCode": "053",
                    "ns2:LocationStateUSPostalServiceCode": "MN",
                    "ns2:LocationPostalCode": "55447"
            }
        })
        it(`${test_case}: AT update for ${file}`, function () {
            cy.updateAccountTransfer(cy.h)
        })
        it(`${test_case}: Login to  ` + cy.conf.URL, function () {
            cy.login(cy.h.user, cy.h.pass)
        })
        it(`${test_case}: Logout`, function () {
            cy.logout()
        })
    })
})
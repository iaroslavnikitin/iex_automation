const inputHouseholds = ["regression/APTC_2HH"]

before(function () {
    cy.runBeforeBlock()
})

//L2_CSR for this testcase should be created in the environment
const l2_csr_username = 'cic_47_cypress_l2_csr@yopmail.com'
const l2_csr_pass = 'Ghix123#'
const test_case = 'CIC47'

inputHouseholds.forEach( file => {
    describe(`${test_case}: Enroll Dental Disenroll Dental via Custom Grouping page for ${file}`, function() {
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
        it(`${test_case}: Verify dashboard`, function () {
            cy.verifyDashboard(cy.h)
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
            cy.enrollIntoDentalOnly()
        })
        it(`${test_case}: Verify dashboard`, function () {
            cy.verifyDashboard(cy.h)
        })
        it(`${test_case}: Disenrolls from Dental through Custom Grouping page - ${file}`, function () {
            cy.disenrollDentalCustomGrouping()
            cy.h.appStatus = cy.h.oep ? "at_created" : "event_verified"
        })
        it(`${test_case}: Verify dashboard`, function () {
            cy.verifyDashboard(cy.h)
        })
        it(`${test_case}: Logout`, function () {
            cy.logout()
        })
    })
})










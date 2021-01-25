const inputHouseholds = ["HH14"]
before(function () {
    cy.runBeforeBlock()
})
//L2_CSR for this testcase should be created in the environment
const l2_csr_username = 'cy1@ghix.com'
const l2_csr_pass = 'Ghix123#'
const test_case = "Fin1"

inputHouseholds.forEach(file => {
    describe(`${test_case}: Financial enrollment into med and dent for ${file}`, function () {

        it(`${test_case}: Init household info with SSN, DOB with checks for ${file}`, function () {
            cy.ServerInfo = this.serverInfo
            cy.ServerConfig = this.serverConfig.body
            cy.ServerTime = this.serverTime.body
            cy.initHousehold(file)
        })
        it(`${test_case}: Creates Account Transfer for ${file}`, function () {
            cy.h = cy.createHousehold(cy.household)
            cy.h['financial'] = true
            cy.log("HH: " + JSON.stringify(cy.h))
        })
        it(`${test_case}: SignUp  ` + cy.conf.URL, function () {
            cy.nvSignUp().wait(1000)
        })
        it(`${test_case}: Logout`, function () {
            cy.logout()
        })
        it(`${test_case}: Login as exadmin`, function () {
            cy.login(l2_csr_username, l2_csr_pass) //login as CAP user (L2_CSR)
                .then(() => {
                    cy.h['capUser'] = true
                    cy.h['appStatus'] = 'event_confirmed_l2_csr'
                })
        })
        it(`${test_case}: Verify HH`, function () {
            cy.approveHousehold()
        })
        it(`${test_case}: Logout`, function () {
            cy.logout()
        })
        it(`${test_case}: Login as user to ` + cy.conf.URL, function () {
            cy.login(cy.h.people[0].email, cy.h.pass)
        })
        it(`${test_case}: SSAP financial`, function () {
            cy.verifiedSignup()
        })
        it(`${test_case}: Logout`, function () {
            cy.logout()
        })
        it(`${test_case}: Login as user to ` + cy.conf.URL, function () {
            cy.wait(60000)
            cy.login(cy.h.people[0].email, cy.h.pass)
        })
        it(`${test_case}: Confirm event `, function () {
            cy.confirmEvent(cy.SEP_QUALIFYING_EVENTS.MARRIAGE)
        })
        it(`${test_case}: Logout`, function () {
            cy.logout()
        })
        it(`${test_case}: Login as user to ` + cy.conf.URL, function () {
            cy.wait(60000)
            cy.login(cy.h.people[0].email, cy.h.pass)
        })
        it(`${test_case}: Enrolls household into Medical and Dental - ${file}`, function () {
            cy.enrollMedicalAndDentalNV()
        })
        it(`${test_case}: Logout`, function () {
            cy.logout()
        })
    })
})










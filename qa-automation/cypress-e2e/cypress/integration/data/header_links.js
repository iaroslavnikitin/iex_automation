const inputHouseholds = ["regression/APTC_CSR_2HH"]
before(function () {
    cy.runBeforeBlock()
})
//L2_CSR for this testcase should be created in the environment
const l2_csr_username = 'cic_1_cypress_l2_csr@yopmail.com'
const l2_csr_pass = 'Ghix123#'
const test_case = "CIC1"

inputHouseholds.forEach( file => {
    describe(`${test_case}: Increase APTC max amount for ${file}`, function() {

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
        // it(`${test_case}: Verify dashboard`, function () {
        //     cy.verifyDashboard(cy.h)
        // })
        it(`${test_case}: Verify left navigation`, function () {
            cy.verifyHeaderLinks()
        })
    })
})
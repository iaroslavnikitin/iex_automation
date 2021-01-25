const inputHouseholds = ["regression/APTC_4HH_HIGH_APTC"]
before(function () {
    cy.runBeforeBlock()
})

//L2_CSR for this testcase should be created in the environment
const l2_csr_username = 'mn111817_12_cypress_l2_csr@yopmail.com'
const l2_csr_pass = 'Ghix123#'
const test_case = 'MNHIX111817'

inputHouseholds.forEach( file => {
    describe(`${test_case}: MEMBERS IN QEP WITH CS2 PLAN SELECTION for ${file}`, function() {

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


        it(`${test_case}: Make sure env is QEP (manually) - ${file}`, function () {
            cy.debug()
        })

        it(`${test_case}: Logout`, function () {
            cy.logout()
        })

    })
})
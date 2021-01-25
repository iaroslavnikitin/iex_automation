//const inputHouseholds = ["HH1", "HH2", "HH3", "HH4", "HH5", "HH7"]
const inputHouseholds = ["HH11"]

before(function () {
    cy.runBeforeBlock()
})

inputHouseholds.forEach( file => {
    describe(`Add member for ${file}`, function() {
        it (`Init household info with SSN, DOB with checks for ${file}`, function() {

            cy.ServerInfo = this.serverInfo
            cy.ServerConfig = this.serverConfig.body
            cy.ServerTime = this.serverTime.body
            cy.initHousehold(file)
        })
        it(`Creates Account Transfer for ${file}`, function () {
            cy.createAccountTransfer(cy.household)
        })
        it(`Login to  ` + cy.conf.URL, function () {
            cy.login(cy.h.user, cy.h.pass)
        })
        it(`Verify dashboard`, function () {
            cy.verifyDashboard()
        })
        it(`Logout`, function () {
            cy.logout()
        })
        it(`Add member`, function () {
            cy.addMember()
            cy.updateAccountTransfer(cy.h)
        })
        it(`Login to  ` + cy.conf.URL, function () {
            cy.login(cy.h.user, cy.h.pass)
        })
        it(`Verify dashboard`, function () {
            cy.verifyDashboard()
        })
        it(`Logout`, function () {
            cy.logout()
        })
    })
})







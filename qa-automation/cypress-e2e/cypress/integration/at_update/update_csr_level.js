const inputHouseholds = ["HH1", "HH2", "HH3", "HH4"]
//const inputHouseholds = ["HH1"]
before(function () {
    cy.runBeforeBlock()
})

inputHouseholds.forEach( file => {
    describe(`Update CSR level ${file}`, function() {

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
            cy.verifyDashboard(cy.h)
        })
        it(`Logout`, function () {
            cy.logout()
        })
        it(`Post updated AT for ${file}`, function () {
            cy.csrChange("CS6")
            cy.updateAccountTransfer(cy.h);
        })
        it(`Login to  ` + cy.conf.URL, function () {
            cy.login(cy.h.user, cy.h.pass)
        })
        it(`Verify dashboard`, function () {
            cy.verifyDashboard(cy.h)
        })
        it(`Logout`, function () {
            cy.logout()
        })
    })
})










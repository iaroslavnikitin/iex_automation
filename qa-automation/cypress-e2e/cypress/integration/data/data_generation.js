//const inputHouseholds = ["HH1", "HH2", "HH3", "HH4", "HH5", "HH7"]
const inputHouseholds = ["HH2"]
before(function () {
    cy.runBeforeBlock()
})

inputHouseholds.forEach( file => {
    describe(`Data generation for ${file}`, function() {
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
        // it(`Enrolls household into Medical and Dental - ${file}`, function () {
        //     cy.enrollIntoMedicalAndDental();
        //
        // })
        // it(`Verify dashboard`, function () {
        //     cy.verifyDashboard(cy.h)
        // })
        // it(`Logout`, function () {
        //     cy.logout()
        // })
        // it(`Change DOB for one member for ${file}`, function () {
        //     cy.h.people[1].personMedicaidIdentification = Cypress._.random(1111111111, 9999999999)
        // })
        // it(`AT update for ${file}`, function () {
        //     cy.updateAccountTransfer(cy.h)
        // })
        // it(`Login to  ` + cy.conf.URL, function () {
        //     cy.login(cy.h.user, cy.h.pass)
        // })
        // it(`Verify dashboard`, function () {
        //     cy.verifyDashboard(cy.h)
        // })
    })
})










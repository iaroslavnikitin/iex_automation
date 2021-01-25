const inputHouseholds = ["HH1", "HH2", "HH3", "HH4", "HH7"]

before(function () {
    cy.runBeforeBlock()
})

inputHouseholds.forEach( file => {
    describe(`Disenroll from Dental via My Eligibility Page for ${file}`, function() {
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
        it(`Enrolls household into Medical and Dental - ${file}`, function () {
            cy.enrollIntoMedicalAndDental();

        })
        it(`Verify dashboard`, function () {
            cy.verifyDashboard(cy.h)
        })
        it(`Disenrolls from Dental through My Eligibility History page - ${file}`, function () {
            cy.disenrollDentalMyEligibility();
            cy.h.appStatus = "med_full_enroll"
        })
        it(`Verify dashboard`, function () {
            cy.verifyDashboard(cy.h)
        })
    })
})










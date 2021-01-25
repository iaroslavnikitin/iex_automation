//const inputHouseholds = ["HH1", "HH2", "HH3", "HH4", "HH5", "HH7"]
const inputHouseholds = ["regression/APTC_2HH_2_groups"]

before(function () {
    cy.runBeforeBlock()
})

inputHouseholds.forEach( file => {
    describe(`Disenrolls from Health through My Enrollments page - ${file}`, function() {
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
        it(`Disenrolls from Health through My Enrollments page - ${file}`, function () {
            cy.disenrollHealthMyEnrollments();
            cy.h.appStatus = "enroll_dent"
        })
        it(`Verify dashboard`, function () {
            cy.verifyDashboard(cy.h)
        })
    })
})










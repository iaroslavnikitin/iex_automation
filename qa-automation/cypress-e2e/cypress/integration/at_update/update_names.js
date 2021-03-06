const inputHouseholds = ["HH1", "HH2", "HH3", "HH4"]
// const inputHouseholds = ["HH1"]

before(function () {
    cy.runBeforeBlock()
})
inputHouseholds.forEach( file => {
    describe(`Updates First names and Last name for ${file}`, function () {
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

        it(`Logout`, function () {
            cy.logout()
        })

        it(`Post updated AT for ${file}`, function () {
            let hh = cy.h
            let lName = cy.randomLastName()
            for (let i = 0; i < hh.people.length; i++){
                hh.people[i]['lastName'] = lName
                hh.people[i]['firstName'] = cy.randomFirstName()
            }
            cy.h = hh
            cy.updateAccountTransfer(cy.h);
            //need this wait for updates to go through. Without it some information on the page is not updated
            cy.wait(10000)
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











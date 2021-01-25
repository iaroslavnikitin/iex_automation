const inputHouseholds = ["HH1", "HH2", "HH3", "HH4"]
//const inputHouseholds = ["HH1"]
before(function () {
    cy.runBeforeBlock()
})

inputHouseholds.forEach( file => {
    describe(`Increase APTC max amount for ${file}`, function() {

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
            let hh = cy.h
            cy.log("APTC max ammount before increase: " + hh.people[0].aptcMaximumAmount)
            for (let i = 0; i < hh.people.length; i++){
                hh.people[i].aptcMaximumAmount = hh.people[i].aptcMaximumAmount + 25
            }
            cy.log("APTC max ammount after increase: " + hh.people[0].aptcMaximumAmount)
            cy.h = hh
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










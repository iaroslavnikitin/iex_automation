const inputHouseholds = ["regression/APTC_2HH"]
before(function () {
    cy.runBeforeBlock()
})

//L2_CSR for this testcase should be created in the environment
const l2_csr_username = 'cap_1_cypress_l2_csr@yopmail.com'
const l2_csr_pass = 'Ghix123#'
const test_case = 'CAP1'

inputHouseholds.forEach( file => {
    describe(`${test_case}: for ${file} enrolled into Health/Dental`, function() {

        it (`${test_case}: Init household info with SSN, DOB with checks for ${file}`, function() {
            cy.ServerInfo = this.serverInfo
            cy.ServerConfig = this.serverConfig.body
            cy.ServerTime = this.serverTime.body
            cy.initHousehold(file)
        })
        it(`${test_case}: Creates Account Transfer for ${file}`, function () {
            cy.createAccountTransfer(cy.household)
        })
        it(`${test_case}: Login as L2_CSR to  ` + cy.conf.URL, function () {
            cy.login(l2_csr_username, l2_csr_pass)
            cy.h['capUser'] = true
        })
        it(`${test_case}: L2_CSR search household`, function() {
            // cy.get('#firstName').type(cy.h.people[0].firstName)
            // cy.get('#lastName').type(cy.h.people[0].lastName)
            // cy.get('#contactNumber').type(cy.h.people[0].phone)
            // cy.get('#householdEmail').type(cy.h.people[0].email)
            // cy.get('.txt-right > .btn-primary').click()
            // cy.get("[href^='/hix/crm/member/viewmember']").click()

            cy.sepL2SCRSearchHousehold()
        })

        it(`${test_case}: Verify view member Basic Information`, function() {
            // cy.get('table').contains('td', 'Name:').should('be.visible')
            // cy.get('table').contains('td', `${cy.h.people[0].firstName}`).should('be.visible')
            // cy.get('table').contains('td', `${cy.h.people[0].lastName}`).should('be.visible')
            //
            // const dobFrmt = Cypress.moment(cy.h.people[0].dob).format('MM/DD/YYYY')
            // cy.get('table').contains('td', 'Date Of Birth:').should('be.visible')
            // cy.get('table').contains('td', `${dobFrmt}`).should('be.visible')
            //
            // cy.get('table').contains('td', 'Address:').should('be.visible')
            // cy.get('table').contains('td', `${cy.h.address['ns2:LocationStreet']['ns2:StreetFullText']}`).should('be.visible')
            // cy.get('table').contains('td', `${cy.h.address['ns2:LocationCityName']}`).should('be.visible')
            // cy.get('table').contains('td', `${cy.h.address['ns2:LocationStateUSPostalServiceCode']}`).should('be.visible')
            //
            // cy.get('table').contains('td', 'Zip').should('be.visible')
            // cy.get('table').contains('td', `${cy.h.address['ns2:LocationPostalCode']}`).should('be.visible')
            //
            // cy.get('table').contains('td', 'Email Address:').should('be.visible')
            // cy.get('table').contains('td', `${cy.h.people[0].email}`).should('be.visible')
            //
            // const ssnMask = cy.h.people[0].ssn.replace(/^.{5}/g, '*')
            // cy.get('table').contains('td', 'SSN:').should('be.visible')
            // cy.get('table').contains('td', `${ssnMask}`).should('be.visible')
            //
            // if (cy.conf.state === "MN") {
            //     cy.get('table').contains('td', 'Primary Contact External ID:').should('be.visible')
            // }

            cy.sepL2SCRVerifyBasicInformation()
        })


        it(`${test_case}: Navigate to View Member Account`, function() {
            // cy.get('.row-fluid > #sidebar > .nav:nth-child(15) > .navmenu > a').click()
            // cy.get('#sidebar > #dialogForm > #markCompleteDialog > .modal-footer > .btn-primary').click()
            cy.sepL2SCRViewMemberAccount()

        })

        it(`${test_case}: Verify dashboard`, function () {
            cy.h['capUser'] = true
            cy.verifyDashboard(cy.h)
        })

        it(`${test_case}: Qualifying event (MARRIAGE) as L2_CSR`, function() {
            // cy.get('body > #body-individual > #container-wrap').click()
            // cy.get('.row-fluid > #rightpanel > #myReactID > div > .wrapper').click()
            // cy.get('#further-action-btn').click()
            // cy.wait(3000)
            // cy.get('#qualifyEvent').select('MARRIAGE')
            // cy.get('#qualifyEventDate').type(Cypress.moment(cy.ServerTime.now).format('MM/DD/YYYY'))
            // cy.get('#continueBtn').click()
            // cy.get('#changeEventDateSubmit')
            //     .click()
            //     .then(() => {
            //         cy.wait(3000)
            //     })

            cy.sepConfirmEvent(cy.SEP_QUALIFYING_EVENTS.MARRIAGE, true)
        })
        it(`${test_case}: Change appStatus and verify dashboard`, function() {
            cy.h['capUser'] = true
            cy.h.appStatus = 'event_confirmed_l2_csr'
            cy.verifyDashboard(cy.h)
        })

        it(`${test_case}: Verifying event as L2_CSR`, function() {
            // cy.get('body > #body-individual > #container-wrap').click()
            // cy.get('#further-action-btn').click()
            // cy.get('#qleAccordion0 > .accordion-group > .accordion-heading > .pull-right > .btn').click()
            // cy.get('.gutter10 > #adminOverrideModal > .modal-body > .ng-pristine > .ng-pristine').type("NA")
            // cy.get('#container > .gutter10 > #adminOverrideModal > .modal-footer > .btn-primary').click()
            // cy.get('#container-wrap > #container > .gutter10 > .margin20-b > a').click()
            // cy.wait(3000)
            cy.sepL2SCRVerifyEvent()

        })
        it(`${test_case}: Change appStatus and verify dashboard`, function() {
            cy.h['capUser'] = true
            cy.h.appStatus = 'event_verified'
            cy.verifyDashboard(cy.h)
        })
        it(`${test_case}: Enrolls household into Medical and Dental - ${file}`, function () {
            cy.enrollIntoMedicalAndDental();
        })
        it(`${test_case}: Verify dashboard`, function () {
            cy.log("appStatus: " + cy.h.appStatus)
            cy.verifyDashboard(cy.h)
        })
    })
})










const inputHouseholds = ["regression/UQHP_3HH"]
before(function () {
    cy.runBeforeBlock()
})

//TODO: investigate SEP - doesn't remove enrollments if member's uQHP changed to false after enrollment

//L2_CSR for this testcase should be created in the environment
const l2_csr_username = 'cic_20_cypress_l2_csr@yopmail.com'
const l2_csr_pass = 'Ghix123#'
const test_case = 'CIC20'

inputHouseholds.forEach(file => {
    describe(`${test_case}: Change uQHP to false for ${file} enrolled into silver medical/dental`, function () {

        it(`${test_case}: Init household info with SSN, DOB with checks for ${file}`, function () {
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
        it(`${test_case}: Verify dashboard`, function () {
            cy.verifyDashboard(cy.h)
        })
        it(`${test_case}: OEP or Qualifying event step`, function () {
            if (!cy.h.oep) {
                cy.log("Inside SEP")
                cy.sepVerifyConfirmEvent({
                    qEvent: cy.SEP_QUALIFYING_EVENTS.MARRIAGE,
                    l2_csr_pass: l2_csr_pass,
                    l2_csr_username: l2_csr_username
                })
            } else {
                cy.log("Inside OEP")
            }
        })
        it(`${test_case}: Enrolls household into Medical and Dental - ${file}`, function () {
            cy.enrollIntoMedicalOnly()
        })
        it(`${test_case}: Verify dashboard`, function () {
            cy.verifyDashboard(cy.h)
        })
        it(`${test_case}: Enrolls household Dental - ${file}`, function () {
            cy.enrollIntoDentalOnly1()
        })
        it(`${test_case}: Verify dashboard`, function () {
            cy.verifyDashboard(cy.h)
        })
        it(`${test_case}: Logout`, function () {
            cy.logout()
        })
        it(`${test_case}: Remove member for ${file}`, function () {
            cy.removeMember()
        })
        it(`${test_case}: Change uQHP to false for ${file}`, function () {
            for (let i = 0; i < cy.h.people.length; i++) {
                cy.h.people[i].aptcEligibilityIndicator = true
                cy.h.people[i].csrEligibilityIndicator = true
            }
        })
        it(`${test_case}: Increase aptc Max for ${file}`, function () {
            cy.aptcMaxAmountChange(125) // increase by 125
        })
        it(`${test_case}: AT update for ${file}`, function () {
            cy.updateAccountTransfer(cy.h)
            //cy.h.appStatus = 'enroll_med_dent_aptc_update'
        })
        it(`${test_case}: Login to  ` + cy.conf.URL, function () {
            cy.login(cy.h.user, cy.h.pass)
        })
        it(`${test_case}: Verify dashboard`, function () {
//            if (!cy.h.oep) cy.h.appStatus = 'enroll_med_dent_demo_update'
            cy.verifyDashboard(cy.h)
        })
        it(`${test_case}: Logout`, function () {
            cy.logout()
        })
    })
})
const inputHouseholds = ["regression/APTC_2HH"]

before(function () {
    cy.runBeforeBlock()
})

//L2_CSR for this testcase should be created in the environment
const l2_csr_username = 'cic_45_cypress_l2_csr@yopmail.com'
const l2_csr_pass = 'Ghix123#'
const test_case = 'CIC45'

inputHouseholds.forEach( file => {
    describe.skip(`https://jira.getinsured.com/browse/HIX-119443 ${test_case}: Enroll all Disenroll all via Custom Grouping page for ${file}`, function() {
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
        it(`${test_case}: Verify dashboard`, function () {
            cy.verifyDashboard(cy.h)
        })
        it(`${test_case}: OEP or Qualifying event step`, function () {
            if (!cy.h.oep) {
                cy.log("Inside SEP")
                cy.sepVerifyConfirmEvent({
                    qEvent: cy.SEP_QUALIFYING_EVENTS.BIRTH,
                    l2_csr_pass: l2_csr_pass,
                    l2_csr_username: l2_csr_username
                })
            }
            else {
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
        it(`${test_case}: Disenrolls from Medical through Custom Grouping page - ${file}`, function () {
            cy.disenrollMedicalCustomGrouping()
        })
        it(`${test_case}: Disenrolls from Dental through Custom Grouping page - ${file}`, function () {
            cy.disenrollDentalCustomGrouping()
            cy.h.appStatus = "med_full_enroll"
        })
        it(`${test_case}: Verify dashboard`, function () {
            cy.verifyDashboard(cy.h)
        })
        it(`${test_case}: Logout`, function () {
            cy.logout()
        })
    })
})










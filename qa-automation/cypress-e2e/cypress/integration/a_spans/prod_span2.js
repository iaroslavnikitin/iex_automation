const inputHouseholds = ["regression/APTC_2HH_2021"]
before(function () {
    cy.runBeforeBlock()
})
//L2_CSR for this testcase should be created in the environment
//1 AT 1/1 and 2 spans
const l2_csr_username = 'cic_1_cypress_l2_csr@yopmail.com'
const l2_csr_pass = 'Ghix123#'
const test_case = "CIC1"

inputHouseholds.forEach( file => {
    describe(`${test_case}: Testing for ${file}`, function() {

        it (`${test_case}: Init household info with SSN, DOB with checks for ${file}`, function() {
            cy.ServerInfo = this.serverInfo
            cy.ServerConfig = this.serverConfig.body
            cy.ServerTime = this.serverTime.body
            cy.initHousehold(file)
        })
        it(`${test_case}: Creates Account Transfer for ${file}`, function () {
            cy.updateAccountTransfer(cy.household)
        })

        it(`${test_case}: Make sure env is SEP (manually) - ${file}`, function () {
                    cy.debug()
        })



         it(`${test_case}: Update exchange eligibility for ${file}`, function () {
                    cy.h.people[0].exchangeEligibilityIndicator = false
                    cy.h.people[1].exchangeEligibilityIndicator = false

                    cy.h.currentEligibilitySpan = 1
                    cy.h.totalEligibilitySpan = 2

                     cy.h.people[0].aptcEligibilityStartDate = "2021-01-01"
                     cy.h.people[0].aptcEligibilityEndDate = "2021-01-31"

                     cy.h.people[0].csrEligibilityStartDate = "2021-01-01"
                      cy.h.people[0].csrEligibilityEndDate = "2021-01-31"

                     cy.h.people[0].exchangeEligibilityStartDate = "2021-01-01"
                     cy.h.people[0].exchangeEligibilityEndDate = "2021-01-31"



                      cy.h.people[1].aptcEligibilityStartDate = "2021-01-01"
                      cy.h.people[1].aptcEligibilityEndDate = "2021-01-31"

                      cy.h.people[1].csrEligibilityStartDate = "2021-01-01"
                      cy.h.people[1].csrEligibilityEndDate = "2021-01-31"

                       cy.h.people[1].exchangeEligibilityStartDate = "2021-01-01"
                       cy.h.people[1].exchangeEligibilityEndDate = "2021-01-31"



         })

          it(`${test_case}: AT update for ${file}`, function () {
                     cy.updateAccountTransfer(cy.h)
           })


             it(`${test_case}: Increase APTC max amount by $25 for ${file}`, function () {
                               cy.h.people[0].exchangeEligibilityIndicator = true
                               cy.h.people[1].exchangeEligibilityIndicator = true

                               cy.h.currentEligibilitySpan = 2
                               cy.h.totalEligibilitySpan = 2

                                                    cy.h.people[0].aptcEligibilityStartDate = "2021-02-01"
                                                    cy.h.people[0].aptcEligibilityEndDate = "2021-12-31"

                                                    cy.h.people[0].csrEligibilityStartDate = "2021-02-01"
                                                     cy.h.people[0].csrEligibilityEndDate = "2021-12-31"

                                                    cy.h.people[0].exchangeEligibilityStartDate = "2021-02-01"
                                                    cy.h.people[0].exchangeEligibilityEndDate = "2021-12-31"


                                                     cy.h.people[1].aptcEligibilityStartDate = "2021-02-01"
                                                     cy.h.people[1].aptcEligibilityEndDate = "2021-12-31"

                                                     cy.h.people[1].csrEligibilityStartDate = "2021-02-01"
                                                     cy.h.people[1].csrEligibilityEndDate = "2021-12-31"

                                                      cy.h.people[1].exchangeEligibilityStartDate = "2021-02-01"
                                                      cy.h.people[1].exchangeEligibilityEndDate = "2021-12-31"

              })

              it(`${test_case}: AT update for ${file}`, function () {
                                cy.updateAccountTransfer(cy.h)
              })


    })
})










const inputHouseholds = ["span/prod_span4_data"]
//const inputHouseholds = ["regression/APTC_2HH_SPANS"]
before(function () {
    cy.runBeforeBlock()
})
//L2_CSR for this testcase should be created in the environment
//4 spans one after another
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
        it(`${test_case}: Update for span 1 of 4 for ${file}`, function () {
            cy.updateAccountTransfer(cy.household)
            //cy.createAccountTransfer(cy.household)

        })

        it(`${test_case}: Make sure env is SEP (manually) - ${file}`, function () {
                    cy.debug()
        })

         it(`${test_case}: Span 2 of 4 for ${file}`, function () {
//                    cy.h.people[0].exchangeEligibilityIndicator = false
//                    cy.h.people[1].exchangeEligibilityIndicator = false

                 let startDate = "2020-02-01"
                 let endDate = "2020-03-31"

                    cy.h.currentEligibilitySpan = 2
                    cy.h.totalEligibilitySpan = 4

                     cy.h.people[0].aptcEligibilityStartDate = startDate
                     cy.h.people[0].aptcEligibilityEndDate = endDate

                     cy.h.people[0].csrEligibilityStartDate = startDate
                      cy.h.people[0].csrEligibilityEndDate = endDate

                     cy.h.people[0].exchangeEligibilityStartDate = startDate
                     cy.h.people[0].exchangeEligibilityEndDate = endDate



                      cy.h.people[1].aptcEligibilityStartDate = startDate
                      cy.h.people[1].aptcEligibilityEndDate = endDate

                      cy.h.people[1].csrEligibilityStartDate = startDate
                      cy.h.people[1].csrEligibilityEndDate = endDate

                       cy.h.people[1].exchangeEligibilityStartDate = startDate
                       cy.h.people[1].exchangeEligibilityEndDate = endDate



         })

          it(`${test_case}: AT update for ${file}`, function () {
                     cy.updateAccountTransfer(cy.h)
           })


                    it(`${test_case}: Span 3 of 4 for ${file}`, function () {
           //                    cy.h.people[0].exchangeEligibilityIndicator = false
           //                    cy.h.people[1].exchangeEligibilityIndicator = false

                            let startDate = "2020-04-01"
                            let endDate = "2020-04-30"

                               cy.h.currentEligibilitySpan = 3
                               cy.h.totalEligibilitySpan = 4

                                cy.h.people[0].aptcEligibilityStartDate = startDate
                                cy.h.people[0].aptcEligibilityEndDate = endDate

                                cy.h.people[0].csrEligibilityStartDate = startDate
                                 cy.h.people[0].csrEligibilityEndDate = endDate

                                cy.h.people[0].exchangeEligibilityStartDate = startDate
                                cy.h.people[0].exchangeEligibilityEndDate = endDate



                                 cy.h.people[1].aptcEligibilityStartDate = startDate
                                 cy.h.people[1].aptcEligibilityEndDate = endDate

                                 cy.h.people[1].csrEligibilityStartDate = startDate
                                 cy.h.people[1].csrEligibilityEndDate = endDate

                                  cy.h.people[1].exchangeEligibilityStartDate = startDate
                                  cy.h.people[1].exchangeEligibilityEndDate = endDate



                    })


              it(`${test_case}: AT update for ${file}`, function () {
                                cy.updateAccountTransfer(cy.h)
              })

                           it(`${test_case}: Span 4 of 4 for ${file}`, function () {
                         //                    cy.h.people[0].exchangeEligibilityIndicator = false
                         //                    cy.h.people[1].exchangeEligibilityIndicator = false

                                          let startDate = "2020-05-01"
                                          let endDate = "2020-12-31"

                                             cy.h.currentEligibilitySpan = 4
                                             cy.h.totalEligibilitySpan = 4

                                              cy.h.people[0].aptcEligibilityStartDate = startDate
                                              cy.h.people[0].aptcEligibilityEndDate = endDate

                                              cy.h.people[0].csrEligibilityStartDate = startDate
                                               cy.h.people[0].csrEligibilityEndDate = endDate

                                              cy.h.people[0].exchangeEligibilityStartDate = startDate
                                              cy.h.people[0].exchangeEligibilityEndDate = endDate



                                               cy.h.people[1].aptcEligibilityStartDate = startDate
                                               cy.h.people[1].aptcEligibilityEndDate = endDate

                                               cy.h.people[1].csrEligibilityStartDate = startDate
                                               cy.h.people[1].csrEligibilityEndDate = endDate

                                                cy.h.people[1].exchangeEligibilityStartDate = startDate
                                                cy.h.people[1].exchangeEligibilityEndDate = endDate



                                  })


                            it(`${test_case}: AT update for ${file}`, function () {
                                              cy.updateAccountTransfer(cy.h)
                            })



    })
})










//const inputHouseholds = ["HH1", "HH2", "HH3", "HH4", "HH5", "HH7"]
const inputHouseholds = ["regression/DEMO_2HH"]

before(function () {
    cy.runBeforeBlock()
})

//L2_CSR for this testcase should be created in the environment
const l2_csr_username = 'mnuat760_9_cypress_l2_csr@yopmail.com'
const l2_csr_pass = 'Ghix123#'
const test_case = 'mnuat760_9'

inputHouseholds.forEach(file => {
    describe(`${test_case}: 2 MEMBER WITH IN QEP AND ADD CHILD IN SEP AND CHANGE DOB AND ADDRESS CHANGE IN SEP for ${file}`, function () {
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
//        it(`${test_case}: OEP or Qualifying event step`, function () {
//            if (!cy.h.oep) {
//                cy.log("Inside SEP")
//                cy.sepVerifyConfirmEvent({
//                    qEvent: cy.SEP_QUALIFYING_EVENTS.MARRIAGE,
//                    l2_csr_pass: l2_csr_pass,
//                    l2_csr_username: l2_csr_username
//                })
//            } else {
//                cy.log("Inside OEP")
//            }
//        })
//        it(`${test_case}: Enrolls household into Medical - ${file}`, function () {
//            cy.enrollIntoMedicalOnly({filter_silver: true})
//        })
//        it(`${test_case}: Verify dashboard`, function () {
//            cy.verifyDashboard(cy.h)
//        })
//        it(`${test_case}: Enrolls household Dental - ${file}`, function () {
//            cy.enrollIntoDentalOnly1()
//        })
//
//        it(`${test_case}: Verify dashboard`, function () {
//            cy.verifyDashboard(cy.h)
//        })
        it(`${test_case}: Logout`, function () {
            cy.logout()
        })

        it(`${test_case}: Make sure env is SEP within QEP(manually) - ${file}`, function () {
            cy.debug()
        })

        it(`${test_case}: Adding newborn for ${file}`, function () {
            cy.addMember()
        })

        it(`${test_case}: Change DOB of newborn for ${file}`, function () {
             cy.getServerTime()
                 .then(res => {
                     // cy.log("Server Information: " + JSON.stringify(res.body))
                     let dd = res.body.now
                     cy.log("DD: ----   " + JSON.stringify(dd))
                     cy.h.people[2].dob = Cypress.moment(dd).subtract(5, 'd').format('YYYY-MM-DD')
                 })
        })

         it(`${test_case}: AT update for ${file}`, function () {
                    cy.updateAccountTransfer(cy.h)
         })

        it(`${test_case}: Make sure env is SEP and DOB change (manually) - ${file}`, function () {
                    cy.debug()
        })

        it(`${test_case}: DOB change for one member for ${file}`, function () { //Updating the DoB
            cy.h.people[0].dob = "1981-10-10"
        })
                it(`${test_case}: AT update for ${file}`, function () {
                           cy.updateAccountTransfer(cy.h)
                })
                it(`${test_case}: Make sure env is SEP and address change (manually) - ${file}`, function () {
                            cy.debug()
                })

//        it(`${test_case}: Address change for ${file}`, function () {
//            cy.h.address = {
//                "ns2:LocationStreet": {
//                    "ns2:StreetFullText": "14520 18th Ave N"
//                },
//                "ns2:LocationCityName": "Plymouth",
//                "ns2:LocationCountyCode": "053",
//                "ns2:LocationStateUSPostalServiceCode": "MN",
//                "ns2:LocationPostalCode": "55447"
//            }
//        })

         it(`${test_case}: Address change for ${file}`, function () {
             cy.h.address = {
                "ns2:LocationStreet": {
             "ns2:StreetFullText": "234 Fake Street "
         },
         "ns2:LocationCityName": "Saint Paul",
         "ns2:LocationCountyCode": "123",
         "ns2:LocationStateUSPostalServiceCode": "MN",
         "ns2:LocationPostalCode": "55101"
         }
      })

        it(`${test_case}: AT update for ${file}`, function () {
            cy.updateAccountTransfer(cy.h)
        })

    })
})
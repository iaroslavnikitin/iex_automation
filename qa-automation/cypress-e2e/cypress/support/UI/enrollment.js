Cypress.Commands.add("tobacco", (v) => {
    cy.log("start tobacco")
    // Start with Dashboard page?
    cy.get('#further-action-btn').click()
        .then (() => {
            //TODO
            cy.title().should('include', 'MNsure')
        //    cy.url().should('include', "indportal#/customGrouping")
                .then(() => {
            if (v) {
                cy.verifyTobaccoPage()
            }
                })
        })
        .then(() => {
    cy.get('.form-horizontal > .gutter20 > strong > .pull-right > .btn').click()
        })
        .then(() => {
    cy.log("end tobacco")
        })
})

Cypress.Commands.add('medGroupsEnroll', (medOnly, options) => {
    cy.log("start medGroupsEnroll")
    for (const eligGroup of cy.h.groups.eligible) {
        cy.verifyCustomGrouping()
            .then(() => {
                cy.get('#aid_uneg_shop_for_members').click()
                    .then(() => {
                        cy.wait(3000)
                        cy.get('#aid_custom_grouping_failure_dialog > .modal-dialog > .modal-content > .modal-footer > .btn').should('not.exist')
                    })

                cy.url().then(url => {
                    url = url.replace(Cypress.config().baseUrl, "")
                    url = url.replace("/__/private/setHousehold", "/hix/private/setHousehold")
                    cy.visit(url)
                })
                cy.get('#skipButton').click()
                cy.wait(3000)

                //At this point choosing the first option
                //TODO: add random selection option?
                cy.verifyMedicalPlanSelection()
                    .then(() => {
                        cy.log("Inside enrollment plans to select: " + JSON.stringify(cy.plansToSelect))
                        cy.setMedicalEnrollmentOptions(options)
                            .then(() => {
                                //TODO: implement selected plan flag YYYYYYYYYYY
                                cy.get('[title="ADD"]').first().click()
                                cy.wait(3000)
                                cy.get('body')
                                    .then((body) => {
                                        if (body.find('[data-automation-id="continueDentalPlan"]').length > 0 && !medOnly) {
                                            cy.get('[data-automation-id="continueDentalPlan"]').click({force: true})
                                        } else {
                                            if (body.find('#aid_continueToCart_02').length > 0 && medOnly) {
                                                cy.get('#aid_continueToCart_02').click({force: true})
                                            } else {
                                                cy.get('#aid-continueCart_02').click({force: true})
                                            }
                                            cy.verifyHealthShowCart()
                                                .then(() =>{
                                            cy.get('#checkout').click({force: true})
                                                })
                                                .then(() =>{
                                            cy.get('#catch-all-light-box > .modal-footer > .btn-primary').click({force: true})
                                                })
                                                .then(() =>{
                                            cy.get('#applicant_esig').click()
                                            cy.get('#applicant_esig').type('a a')
                                                })
                                                .then(() =>{
                                            cy.get('#submitButton').click()
                                                })
                                                .then(() =>{
                                            cy.verifyHealthConfirmation()
                                                })
                                                .then(() =>{
                                            cy.get('.goto_grouping_google_tracking').click()
                                                })
                                        }
                                    })
                            })

                    })
            })
    }
    cy.log("end medGroupsEnroll")
})

Cypress.Commands.add('dentalEnroll', (options) => {
    cy.log("start dentalEnroll")
    cy.wait(3000)
    cy.get('body')
        .then((body) => {
            if (body.find('#aid_dental_shop_btn_dental_').length > 0) {
                cy.get('#aid_dental_shop_btn_dental_').click()
            }
        })

    cy.wait(3000)
    cy.url().then(url => {
        url = url.replace(Cypress.config().baseUrl, "")
        url = url.replace("/__/private/setHousehold", "/hix/private/setHousehold")
        cy.visit(url)
    })
    cy.wait(5000)
    cy.get('#shopping-modal-update').click({force: true})
    cy.url()
        .then(url => {
            url = url.replace(Cypress.config().baseUrl, "")
            url = url.replace("/__/planselection", "/hix/private/planselection")
            cy.visit(url)
        })

    //running with electron: #shopping-modal-update stays visible - using options {forse: true}
    // takes care of it
    cy.verifyDentalPlanSelection()
        .then(() => {
            cy.log("Inside enrollment plans to select: " + JSON.stringify(cy.plansToSelect))
            cy.get('[title="ADD"]').first().click({force: true})
                .then(() =>{
            cy.get('[data-automation-id="continueCartBtn"]').click({force: true})
                })
                .then(() =>{
            //cy.verifyDentalShowCart()
            cy.get('#checkout').click()
                })
                .then(() =>{
            cy.get('#catch-all-light-box > .modal-footer > .btn-primary').click({force: true})
                })
                .then(() =>{
            cy.get('#applicant_esig').click()
            cy.get('#applicant_esig').type('a a')
                })
                .then(() =>{
            cy.get('#submitButton').click()
                })
                .then(() =>{
            //cy.verifyDentalConfirmation()
            cy.get('#rightpanel > #frmorderconfirm > .form-actions > .controls > .goto_dashboard_google_tracking').click()
                })
            cy.log("end dentalEnroll")
        })
})

Cypress.Commands.add("enrollIntoMedicalOnly", (options) => {
    cy.tobacco(true)
    cy.medGroupsEnroll(true, options)
    cy.h.appStatus = 'med_full_enroll'
})

Cypress.Commands.add("enrollIntoMedicalAndDental", (options) => {
    //Tabacco page
    cy.tobacco(true)
    //Custom Groups
    cy.medGroupsEnroll(false, options)
    cy.dentalEnroll(options)
    cy.h.appStatus = 'med_full_enroll_dent'
})

Cypress.Commands.add("enrollIntoDentalOnly", (options) => {
    let st = cy.h.appStatus
    cy.log("Dental enrollment status = " + st)
    cy.tobacco(true)
    //click on Enroll into dental
    cy.get('#tab-1').click()
    cy.dentalEnroll(options)
    cy.h.appStatus = 'enroll_dent'
})

Cypress.Commands.add("enrollIntoDentalOnly1", (options) => {
    let st = cy.h.appStatus
    cy.log("Dental enrollment status = " + st)
    cy.get('#further-action-btn').click()
    //click on Enroll into dental
    cy.get('#tab-1').click()
    cy.dentalEnroll(options)
    cy.h.appStatus = 'med_full_enroll_dent'
})
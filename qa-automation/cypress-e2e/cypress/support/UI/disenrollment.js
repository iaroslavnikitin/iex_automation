Cypress.Commands.add("disenrollMedicalCustomGrouping", () => {
    for (const eligGroup of cy.h.groups.eligible) {
        cy.navigateTo('/indportal#/customGrouping')
            .then(() => {
                cy.get('#tab-0').click()
                cy.get(`#aid_btn_cancel_coverage${(eligGroup.group - 1)}`).click({force: true})
                if (!cy.h.oep && cy.h.qualifyEvent === cy.SEP_QUALIFYING_EVENTS.BIRTH) {
                    cy.get('.in > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click({force: true})
                    cy.get('.in > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click({force: true})
                    cy.get('[ng-show="disenrollDateDialog.step"] > .modal > .modal-dialog > .modal-content > .modal-body > .form-horizontal > .margin30-l > :nth-child(1) > .ng-pristine').click({force: true})
                    cy.get(':nth-child(1) > .ng-dirty').type('CURRENT_MONTH')
                    cy.get('.in > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click({force: true})
                    cy.get('[ng-show="disenrollDateDialog.step"] > .modal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click({force: true})
                    cy.get('.in > .modal-dialog > .modal-content > .modal-footer > .btn').click({force: true})
                    cy.get('.in > .modal-dialog > .modal-content > .modal-footer > .btn').click({force: true})
                } else {
                    cy.get('#disaffordability').click({force: true})
                    cy.get('.in > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click({force: true})
                    cy.get('.in > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click({force: true})
                    cy.get('.in > .modal-dialog > .modal-content > .modal-footer > .btn').click({force: true})
                }
            })
    }
})

Cypress.Commands.add("disenrollDentalCustomGrouping", () => {
    cy.navigateTo('/indportal#/customGrouping')
    cy.get('#tab-1').click()
    cy.wait(3000)
    cy.get('#aid_dental_btn_cancel_coverage_nrg_0').click()

    if (cy.h.coverageStarted) {
        cy.get('#disaffordability').click()
        cy.get('.in > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click({force: true})
        cy.get('.in > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click({force: true})
        cy.get('.in > .modal-dialog > .modal-content > .modal-footer > .btn').first().click({force: true})
    } else {
        cy.get('.in > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click({force: true})
        cy.get('.in > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click({force: true})
        cy.get('[ng-show="submitDisenrollmentDialog"]').click({force: true})
    }

})

Cypress.Commands.add("disenrollMedicalMyEligibility", () => {
    for (const eligGroup of cy.h.groups.eligible) {
        cy.navigateTo('/indportal#')
            .then(() => {
                cy.get('#eligibility__history').click()
                cy.wait(3000)
                cy.get('#planSummary').click()
                cy.get('body > #body-individual > #container-wrap > #container').click()
                cy.get('.activeEnrollment:nth-child(1) > .ng-scope > .row-fluid > .span6 > .center > #disenrollPlan > .ng-scope > .ng-scope').click()
                if (!cy.h.oep && cy.h.qualifyEvent === cy.SEP_QUALIFYING_EVENTS.BIRTH) {
                    cy.get('.in > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click({force: true})
                    cy.get('.in > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click({force: true})
                    cy.get('[ng-show="disenrollDateDialog.step"] > .modal > .modal-dialog > .modal-content > .modal-body > .form-horizontal > .margin30-l > :nth-child(1) > .ng-pristine').click({force: true})
                    cy.get(':nth-child(1) > .ng-dirty').type('CURRENT_MONTH')
                    cy.get('.in > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click({force: true})
                    cy.get('[ng-show="disenrollDateDialog.step"] > .modal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click({force: true})
                    cy.get('.in > .modal-dialog > .modal-content > .modal-footer > .btn').click({force: true})
                    cy.get('.in > .modal-dialog > .modal-content > .modal-footer > .btn').click({force: true})
                } else {

                    cy.get('#disenrollDialog > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click({force: true})
                    cy.get('.in > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click({force: true})
                    cy.get('[ng-click="goHome()"]').click({force: true})
                }
            })
    }
})

Cypress.Commands.add("disenrollDentalMyEligibility", () => {
    cy.navigateTo('/indportal#')
        .then(() => {
            cy.get('#eligibility__history').click()
            cy.wait(3000)
            cy.get('#currentApp > .row-fluid > .alert > .col-xs-12 > #planSummary').click()
            // cy.get('[ng-if="!activePlanDetails.validCoverageDental"]').click()
            cy.get(`[ng-if="activePlanDetails.typeOfPlan === 'Dental'"] > .ng-scope`).click()

            if (!cy.h.oep && cy.h.qualifyEvent === cy.SEP_QUALIFYING_EVENTS.BIRTH) {
                cy.log("qualifyEvent = " + cy.h.qualifyEvent)
                cy.get('.in > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click({force: true})
                cy.get('.in > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click({force: true})
                cy.get('.modal-body > .form-horizontal > .margin30-l:nth-child(1) > .radio:nth-child(1) > .ng-pristine').click({force: true})
                cy.get('.modal-body > .form-horizontal > .margin30-l > .radio > .ng-dirty').type('CURRENT_MONTH')
                cy.get('.in > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click({force: true})
                cy.get('.in > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click({force: true})
                cy.get('.in > .modal-dialog > .modal-content > .modal-footer > .btn').click({force: true})
                cy.get('.in > .modal-dialog > .modal-content > .modal-footer > .btn').click({force: true})
            } else {
                cy.log("qualifyEvent = " + cy.h.qualifyEvent)
                cy.get('.modal-content > .modal-body > .form-horizontal > .margin30-l > .radio:nth-child(1)').click({force: true})
                cy.get('.in > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click({force: true})
                cy.get('.in > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click({force: true})
                cy.get('.in > .modal-dialog > .modal-content > .modal-footer > .btn').click({force: true})


            }
        })
})

Cypress.Commands.add("disenrollAllMyEligibility", () => {
    cy.navigateTo('/indportal#')
        .then(() => {
            cy.get('#eligibility__history').click()
            cy.wait(3000)
            cy.get('#planSummary').click()
            cy.get('#disenrollBoth').click()
            cy.get('.modal-content > .modal-body > .form-horizontal > .margin30-l > .radio:nth-child(1)').click({force: true})
            cy.get('#disenrollDialog > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click({force: true})
            cy.get('.in > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click({force: true})
            cy.get('.in > .modal-dialog > .modal-content > .modal-footer > .btn').click({force: true})
        })
})


Cypress.Commands.add("disenrollHealthMyEnrollments", () => {
    for (const eligGroup of cy.h.groups.eligible) {
        cy.navigateTo('/indportal#')

        cy.get('[id="My Enrollments"]').click()
        cy.wait(3000)
        cy.get("[id^='disenrollFromPlan_Health']").first().click({force: true})
            .then(() => {
                if (!cy.h.oep && cy.h.qualifyEvent === cy.SEP_QUALIFYING_EVENTS.BIRTH) {
                    cy.get('#disenrollDialog > .modal-dialog > .modal-content > .modal-footer > #aid_skip').click({force: true})
                        .then(() => {
                            cy.get('.in > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click({force: true})
                        })
                        .then(() => {
                            cy.get('.modal-body > .form-horizontal > .margin30-l:nth-child(1) > .radio:nth-child(1) > .ng-pristine').click({force: true})
                        })
                        .then(() => {
                            cy.get('.modal-body > .form-horizontal > .margin30-l > .radio > .ng-dirty').type('CURRENT_MONTH')
                        })
                        .then(() => {
                            cy.get('.in > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click({force: true})
                        })
                        .then(() => {
                            cy.get('.in > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click({force: true})
                        })
                        .then(() => {
                            cy.get('.in > .modal-dialog > .modal-content > .modal-footer > .btn').click({force: true})
                        })
                        .then(() => {
                            cy.get('.in > .modal-dialog > .modal-content > .modal-footer > .btn').click({force: true})
                        })
                } else {
                    cy.get('.modal-content > .modal-body > .form-horizontal > .margin30-l > .radio:nth-child(1)').click({force: true})
                        .then(() => {
                            cy.get('#disenrollDialog > .modal-dialog > .modal-content > .modal-footer > #aid_continue').click({force: true})
                        })
                        .then(() => {
                            cy.get('.in > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click({force: true})
                        })
                        .then(() => {
                            cy.get('.in > .modal-dialog > .modal-content > .modal-footer > .btn').click({force: true})
                        })

                }
            })
    }
})


Cypress.Commands.add("disenrollDentalMyEnrollments", () => {
    cy.navigateTo('/indportal#')
    cy.get('[id="My Enrollments"]').click()
    cy.wait(3000)
    cy.get('#disenrollFromPlan_Dental_02').click()
        .then(() => {
            if (!cy.h.oep && cy.h.qualifyEvent === cy.SEP_QUALIFYING_EVENTS.BIRTH) {
                cy.get('#disenrollDialog > .modal-dialog > .modal-content > .modal-footer > #aid_skip').click({force: true})
                    .then(() => {
                        cy.get('.in > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click({force: true})
                    })
                    .then(() => {
                        cy.get('.modal-body > .form-horizontal > .margin30-l:nth-child(1) > .radio:nth-child(1) > .ng-pristine').click({force: true})
                    })
                    .then(() => {
                        cy.get('.modal-body > .form-horizontal > .margin30-l > .radio > .ng-dirty').type('CURRENT_MONTH')
                    })
                    .then(() => {
                        cy.get('.in > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click({force: true})
                    })
                    .then(() => {
                        cy.get('.in > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click({force: true})
                    })
                    .then(() => {
                        cy.get('.in > .modal-dialog > .modal-content > .modal-footer > .btn').click({force: true})
                    })
                    .then(() => {
                        cy.get('.in > .modal-dialog > .modal-content > .modal-footer > .btn').click({force: true})
                    })
            } else {
                cy.get('#disenrollDialog > .modal-dialog > .modal-content > .modal-footer > #aid_skip').click({force: true})
                cy.get('.in > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click({force: true})
                cy.get('[ng-click="goToDisenrollDateModal()"]').first().click({force: true})
            }
        })
})










import moment from 'moment-timezone'
import jsonQuery from 'json-query'

const _ = require('lodash');




Cypress.Commands.add('verifyTobaccoPage', () => {
    /**
     * Works in OE as of 08/28/2019
     */
    cy.navigateTo('/indportal#/additionalinfo')

    // if (cy.conf.functional_verification !== false) {
    let nameAge = []
    let currentDate = moment(new Date(cy.h.people[0].exchangeEligibilityStartDate)).endOf('month')
    for (let i = 0; i < cy.h.people.length; i++) {
        let dob = moment(new Date(cy.h.people[i].dob)).startOf('month')
        let diff = currentDate.diff(dob)
        let age = Math.floor(moment.duration(diff).asYears())
        let nm = {
            fName: cy.h.people[i].firstName,
            lName: cy.h.people[i].lastName,
            age: age
        }
        nameAge.push(nm)
    }

    for (let i = 0; i < nameAge.length; i++) {
        cy.log("Name age json:  " + JSON.stringify(nameAge[i]))
        cy.log("age:  " + nameAge[i].age)
        console.log("Name age json:  " + JSON.stringify(nameAge[i]))
        const j = i + 2
        cy.get(`:nth-child(${j}) > .ng-binding`)
        if (nameAge[i].age < 18) {
            cy.get(`:nth-child(${j}) > td.exemptCell > :nth-child(1) > .no-checkedselector > .f > [for="tobaccoUser-no"] > #tobaccoUser-no`).should('be.disabled')
            cy.get(`:nth-child(${j}) > td.exemptCell > :nth-child(1) > .no-checkedselector > .f > [for="tobaccoUser-yes"] > #tobaccoUser-yes`).should('be.disabled')
        } else {
            cy.get(`:nth-child(${j}) > td.exemptCell > :nth-child(1) > .no-checkedselector > .f > [for="tobaccoUser-no"] > #tobaccoUser-no`).should('not.be.disabled').check({force: true})
            cy.get(`:nth-child(${j}) > td.exemptCell > :nth-child(1) > .no-checkedselector > .f > [for="tobaccoUser-yes"] > #tobaccoUser-yes`).should('not.be.disabled')
        }
    }
    //}
    if (cy.conf.static_verification) {
        cy.log("Static verification will be here")
        cy.fixture('mp/tobacco_static.json')
            .then(ts => {
                cy.log("Time frame: " + JSON.stringify(cy.h.oep))
                cy.tobacco_static = ts
                cy.log("Tabacco Static: " + JSON.stringify(cy.tobacco_static))
                for (const el of cy.tobacco_static) {
                    cy.log("Element: " + JSON.stringify(el))
                    if (el !== "") {
                        cy.get(el.location).should('contain', el.text)
                    } else {
                        cy.get(el.location).should('be.visible')
                    }
                }
            })
    }
})

Cypress.Commands.add("setMedicalEnrollmentOptions", (options) => {
    //TODO: cy.planSelected is based on selecting first option on the page
    // may be implement random or specific selection?

    //TODO: implement handling multiple selections


    if (!options) {
        cy.planSelected = cy.getMin(cy.plansToSelect, "estimatedTotalHealthCareCost")
    } else {
        if (options.premiumAfterCredit) {
            cy.get('#premiumAfterCredit').check({force: true})
            cy.planSelected = cy.getMin(cy.plansToSelect, "oopMax")
        } else if (options.deductible) {
            cy.get('#deductible').check({force: true})
            cy.planSelected = cy.getMin(cy.plansToSelect, "deductible")
        } else if (options.oopMax) {
            cy.get('#oopMax').check({force: true})
            cy.planSelected = cy.getMin(cy.plansToSelect, "oopMax")
        } else {
            cy.get('#estimatedTotalHealthCareCost').check({force: true})
            cy.planSelected = cy.getMin(cy.plansToSelect, "estimatedTotalHealthCareCost")
        }


        if (options.plantype_filter_checkbox_EPO) {
            cy.get('#plantype_filter_checkbox_EPO').check({force: true}).should('be.checked')
        }
        if (options.plantype_filter_csr) {
            cy.get('#plantype_filter_csr').check({force: true}).should('be.checked')
        }
        if (options.plantype_filter_hsa) {
            cy.get('#plantype_filter_hsa').check({force: true}).should('be.checked')
        }
        if (options.filter_platinum) {
            cy.get('#filter_platinum').check({force: true}).should('be.checked')
            cy.planSelected = cy.getMin(jsonQuery(`[*level=PLATINUM]`, {data: cy.plansToSelect}).value, "estimatedTotalHealthCareCost")
        }
        if (options.filter_gold) {
            cy.get('#filter_gold').check({force: true}).should('be.checked')
            cy.planSelected = cy.getMin(jsonQuery(`[*level=GOLD]`, {data: cy.plansToSelect}).value, "estimatedTotalHealthCareCost")
        }
        if (options.filter_silver) {
            cy.get('#filter_silver').check({force: true}).should('be.checked')
            cy.planSelected = cy.getMin(jsonQuery(`[*level=SILVER]`, {data: cy.plansToSelect}).value, "estimatedTotalHealthCareCost")
        }
        if (options.filter_bronze) {
            cy.get('#filter_bronze').check({force: true}).should('be.checked')
            cy.planSelected = cy.getMin(jsonQuery(`[*level=BRONZE]`, {data: cy.plansToSelect}).value, "estimatedTotalHealthCareCost")
        }
        if (options.deductible_filter_2500) {
            cy.get('#deductible_filter_2500').check({force: true}).should('be.checked')
        }
        if (options.deductible_filter_5000) {
            cy.get('#deductible_filter_5000').check({force: true}).should('be.checked')
        }
        if (options.deductible_filter_7500) {
            cy.get('#deductible_filter_7500').check({force: true}).should('be.checked')
        }
        if (options.deductible_filter_15000) {
            cy.get('#deductible_filter_15000').check({force: true}).should('be.checked')
        }
        if (options.filter_catastrophic) {
            cy.get('#filter_catastrophic').check({force: true}).should('be.checked')
        }
    }
})

Cypress.Commands.add("sepConfirmEvent", (qualifyEvent, capUser) => {
    if (!qualifyEvent) qualifyEvent = cy.SEP_QUALIFYING_EVENTS.MARRIAGE
    cy.h.qualifyEvent = qualifyEvent
    // cy.get('body > #body-individual > #container-wrap').click()
    // cy.get('.row-fluid > #rightpanel > #myReactID > div > .wrapper').click()
    cy.get('#further-action-btn').click().wait(3000)
    cy.get('#qualifyEvent').select(qualifyEvent).wait(3000)
    cy.get('#qualifyEventDate').type(Cypress.moment(cy.ServerTime.now).format('MM/DD/YYYY')).wait(3000)
    cy.get('#qualifyEventDate').click().wait(3000)
    cy.get('#terms').check().wait(3000)
    cy.get('#continueBtn').click().wait(3000)
    cy.get('#changeEventDateSubmit').click().wait(3000)
        .then(() => {
            if (!capUser){
                cy.h['appStatus'] = 'event_confirmed'
                cy.h['capUser'] = false
                cy.verifyDashboard(cy.h)
            }
        })
})

Cypress.Commands.add("sepL2SCRVerifyBasicInformation", () => {
    cy.get('table').contains('td', 'Name:').should('be.visible')
    cy.get('table').contains('td', `${cy.h.people[0].firstName}`).should('be.visible')
    cy.get('table').contains('td', `${cy.h.people[0].lastName}`).should('be.visible')

    const dobFrmt = Cypress.moment(cy.h.people[0].dob).format('MM/DD/YYYY')
    cy.get('table').contains('td', 'Date Of Birth:').should('be.visible')
    cy.get('table').contains('td', `${dobFrmt}`).should('be.visible')

    cy.get('table').contains('td', 'Address:').should('be.visible')
    cy.get('table').contains('td', `${cy.h.address['ns2:LocationStreet']['ns2:StreetFullText']}`).should('be.visible')
    cy.get('table').contains('td', `${cy.h.address['ns2:LocationCityName']}`).should('be.visible')
    cy.get('table').contains('td', `${cy.h.address['ns2:LocationStateUSPostalServiceCode']}`).should('be.visible')

    cy.get('table').contains('td', 'Zip').should('be.visible')
    cy.get('table').contains('td', `${cy.h.address['ns2:LocationPostalCode']}`).should('be.visible')

    cy.get('table').contains('td', 'Email Address:').should('be.visible')
    cy.get('table').contains('td', `${cy.h.people[0].email}`).should('be.visible')

    const ssnMask = cy.h.people[0].ssn.replace(/^.{5}/g, '*')
    cy.get('table').contains('td', 'SSN:').should('be.visible')
    cy.get('table').contains('td', `${ssnMask}`).should('be.visible')

    if (cy.conf.state === "MN") {
        cy.get('table').contains('td', 'Primary Contact External ID:').should('be.visible')
    }
})

Cypress.Commands.add("sepL2SCRViewMemberAccount", () => {
    cy.get('.row-fluid > #sidebar > .nav:nth-child(15) > .navmenu > a').click()
    cy.get('#sidebar > #dialogForm > #markCompleteDialog > .modal-footer > .btn-primary').click()
})


Cypress.Commands.add("sepL2SCRSearchHousehold", () => {
    cy.get('#firstName').type(cy.h.people[0].firstName)
    cy.get('#lastName').type(cy.h.people[0].lastName)
    cy.get('#contactNumber').type(cy.h.people[0].phone)
    cy.get('#householdEmail').type(cy.h.people[0].email)
    cy.get('.txt-right > .btn-primary').click()
    cy.get("[href^='/hix/crm/member/viewmember']").click()
})

Cypress.Commands.add("sepL2SCRVerifyEvent", () => {
    // cy.get('body > #body-individual > #container-wrap').click()
    cy.get('#further-action-btn').click()
    cy.get('#qleAccordion0 > .accordion-group > .accordion-heading > .pull-right > .btn').click()
    cy.get('.gutter10 > #adminOverrideModal > .modal-body > .ng-pristine > .ng-pristine').type("NA")
    cy.get('#container > .gutter10 > #adminOverrideModal > .modal-footer > .btn-primary').click()
    cy.get('#container-wrap > #container > .gutter10 > .margin20-b > a').click()
})

Cypress.Commands.add("sepVerifyConfirmEvent", (options) => {

    if (options.qEvent) {
        cy.sepConfirmEvent(options.qEvent)
            .then(() => {
                cy.logout() //logout as user
            })
    }


    cy.login(options.l2_csr_username, options.l2_csr_pass) //login as CAP user (L2_CSR)
        .then(() => {
            cy.h['capUser'] = true
            cy.h['appStatus'] = 'event_confirmed_l2_csr'
        })

    cy.sepL2SCRSearchHousehold()
        .then(() => {
            cy.sepL2SCRVerifyBasicInformation()
        })
        .then(() => {
            cy.sepL2SCRViewMemberAccount()
        })
        //.wait(60000)
        .then(() => {
            cy.verifyDashboard(cy.h)
        })
        .then(() => {
            cy.sepL2SCRVerifyEvent()
        })
        //.wait(60000)
        .then(() => {
            cy.h['capUser'] = true
            cy.h['appStatus'] = 'event_verified'
            cy.verifyDashboard(cy.h)
        })
        .then(() => {
            cy.logout() //logout from L2_CSR
        })
        .then(() => {
            cy.login(cy.h.user, cy.h.pass) //login as user
        })
        //.wait(60000)
        .then(() => {
            cy.h['capUser'] = false
            cy.h.appStatus = 'event_verified'
            cy.verifyDashboard(cy.h)
        })
})

//Nevada
Cypress.Commands.add("approveHousehold", (options) => {
    cy.sepL2SCRSearchHousehold()
        .then(() => {
            cy.sepL2SCRVerifyBasicInformation()
        })
        .then(() => {
            cy.url()
                .then(url => {
                    let encryptedHH = url.split(/[/ ]+/).pop()
                    cy.get('#csrftoken').then((csrftoken) => {
                        cy.log("csrftoken: " + csrftoken.val())
                        cy.get("#householdId").first().then(householdId => {
                            cy.log("encrypted hh: " + householdId.val())
                            cy.request({
                                method: 'POST',
                                followRedirect: false,
                                form: true,
                                url: `/hix/crm/member/markRidpVerified`,
                                body: {
                                    csrftoken: csrftoken.val(),
                                    householdId: householdId.val(),
                                    comments: "test"
                                }
                            }).then((resp) => {
                                expect(resp.status).to.eq(200)
                                //expect(resp.body).to.eq({ResponseCode: "'HS000000'"})
                                cy.reload()
                            })
                        })


                    })
                })
        })
})
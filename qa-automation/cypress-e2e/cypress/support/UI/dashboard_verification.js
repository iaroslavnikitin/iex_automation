import moment from 'moment-timezone'
import jsonQuery from 'json-query'

const _ = require('lodash');


Cypress.Commands.add('verifyDashboard', () => {
    /**
     * Works in OE as of 08/28/2019
     */
    //TODO: refactor for easy read and maintenance

    cy.server()
    cy.route('GET', cy.conf.URL + '/indportal/getDashboardModels?**').as('ssapInfo')

    cy.navigateTo('/mp')
    cy.wait('@ssapInfo', {requestTimeout: 120000, responseTimeout: 240000})
        .then(() => {
            cy.request({
                url: cy.conf.URL + `/indportal/getDashboardModels?userId=1&apiVersion=2`,
                method: 'GET'
            })
                .then(res => {
                    expect(res.status).to.eq(200)
                    cy.appHousehold = res.body[0]
                    cy.fixture('mp/dashboard.json')
                        .then(dashboard => {
                            cy.log('Response body: ' + JSON.stringify(cy.appHousehold))

                            const period = (cy.h.oep === true) ? 'oep' : 'sep'
                            cy.dashboardStatus = jsonQuery(`${period}[status=${cy.h.appStatus}]`, {data: dashboard}).value
                            //verify tab shows current coverage year
                            cy.get('#tab-0').should("contain", cy.current_coverage_year)

                            cy.get('#application_status_year').should("contain", `${cy.current_coverage_year} Application`)

                            //verify Notice Text
                            let sDate = moment(new Date(cy.h.people[0].activityDate)).tz("America/Los_Angeles").startOf('day')
                            let oeEndDate = moment(new Date(cy.current_oe_end_date)).tz("America/Los_Angeles").startOf('day')
                            let diff = oeEndDate.diff(sDate)
                            let dateDiff = Math.ceil(moment.duration(diff).asDays()) + 1

                            cy.log("Dashboard status - " + cy.dashboardStatus.status)
                            cy.log("HH status - " + cy.h.appStatus)
                            cy.log("OEP notice should exist - " + cy.dashboardStatus.oep_notice)

                            if (cy.h.capUser) {
                                cy.get('#impersonation').contains(`Viewing Individual Account (${cy.h.people[0].firstName} ${cy.h.people[0].lastName})`)
                                cy.get('[href="/hix/account/user/switchNonDefRole/INDIVIDUAL"]').contains('My Account')
                            }

                            cy.log("******* Response enrollments: " + JSON.stringify(cy.appHousehold.enrollments))

                            //Enrollments
                            //let jqEnrollments = cy.appHousehold.enrollments
                            cy.h.enrollments = cy.appHousehold.enrollments
                                //jsonQuery(jqEnrollments, {data: cy.appHousehold}).value

                            let medEnrollment = jsonQuery(`[*type=HEALTH]`, {data: cy.h.enrollments}).value
                            let dentEnrollment = jsonQuery(`[*type=DENTAL]`, {data: cy.h.enrollments}).value

                            let allowPlanChange = jsonQuery(`[allowChangePlan=false]`, {data: medEnrollment}).value

                            cy.log("medEnrollment value: " + JSON.stringify(medEnrollment))
                            cy.log("allowPlanChange value: " + JSON.stringify(allowPlanChange))

                            if (cy.appHousehold.sepOpen == true && cy.appHousehold.applicationStatus === "EN" && cy.appHousehold.applicationDentalStatus === "EN" && allowPlanChange === null) {
                                cy.dashboardStatus.oep_notice = true
                                cy.log("changing oep_notice to true: " + cy.dashboardStatus.oep_notice)
                            }


                            if (cy.dashboardStatus.oep_notice === true && !cy.dashboardStatus.isSepOpen && period !== 'sep') {
                                cy.log("Time sDate  -- " + sDate)
                                cy.log("Time oeEndDate  -- " + oeEndDate)
                                cy.log("Time till OEP ends  -- " + moment.duration(diff).asDays())

                                let noticeText = dateDiff === 1 ? `You have ${dateDiff} day left to pick a plan` : `You have ${dateDiff} days left to pick a plan`

                                cy.get('#auto-warnings').should('contain', noticeText)
                            } else if (cy.dashboardStatus.oep_notice === true && (cy.dashboardStatus.isSepOpen && period !== 'sep')) {
                                cy.log("Time sDate  -- " + sDate)
                                cy.log("Time oeEndDate  -- " + oeEndDate)
                                cy.log("Time till OEP ends  -- " + moment.duration(diff).asDays())
                                let dd = dateDiff - 1
                                let noticeText = dd === 1 ?
                                    `You have ${dd} day remaining in your special enrollment period. Please promptly follow the next steps below.` :
                                    `You have ${dd} days remaining in your special enrollment period. Please promptly follow the next steps below.`
                                cy.get('#auto-warnings').should('contain', noticeText)
                            } else if (cy.dashboardStatus.oep_notice === true && period === 'sep') {

                                let noticeText = 'You have 60 days remaining in your special enrollment period. Please promptly follow the next steps below.'
                                // let noticeText = 'You have 60 days remaining in your special enrollment period to pick or change a plan.'
                                cy.get('#auto-warnings').should('contain', noticeText)
                            } else {
                                cy.get('#auto-warnings').should('not.exist')
                            }

                            //verify Further Action
                            cy.dashboardStatus.further_action_txt.forEach(faTxt => {
                                cy.contains('#further-action-txt', `${faTxt}`)
                            })
                            cy.contains('#further-action-btn', `${cy.dashboardStatus.further_action_btn}`)

                            //verify Welcome note
                            cy.get('#skip')
                                .contains("Welcome,")
                                .contains(cy.h.people[0].firstName)
                                .contains(cy.h.people[0].lastName)

                            //create name array to verify
                            let name = []
                            for (let i = 0; i < cy.h.people.length; i++) {
                                if (cy.h.people[i].middleName) {
                                    name.push(cy.h.people[i].firstName + " " + cy.h.people[i].middleName + " " + cy.h.people[i].lastName)
                                } else {
                                    name.push(cy.h.people[i].firstName + " " + cy.h.people[i].lastName)
                                }
                            }

                            //verify Household members show up properly

                            // Your Household Eligibility

                            cy.appHousehold.applicants.forEach((applicant, index) => {

                                cy.log(index + ". Applicant: " + JSON.stringify(applicant))


                                // let dbNameArr = array[index].innerText.trim().split(' ')

                                //let dbNameArr = ""

                                let jqExchInd = `people[firstName=${applicant.firstName}].exchangeEligibilityIndicator`
                                let jqAPTCInd = `people[firstName=${applicant.firstName}].aptcEligibilityIndicator`

                                let eligibility = {}

                                //get exchange and aptc info for each person
                                eligibility.exchange = jsonQuery(jqExchInd, {data: cy.h}).value
                                cy.log("Exchange Elig ind: " + eligibility.exchange)

                                eligibility.aptc = jsonQuery(jqAPTCInd, {data: cy.h}).value
                                cy.log("APTC Elig ind: " + eligibility.aptc)

                                if (eligibility.exchange === false) {
                                    cy.get(`#household_elig_member_${index}`).should('contain', 'Not eligible')
                                }
                                if (eligibility.aptc === false && eligibility.exchange && cy.h.aptcEligibility.length > 1) {
                                    cy.get(`#household_elig_member_${index}`).should('contain', 'Not eligible for APTC')
                                }

                                cy.get(`#household_elig_member_${index}`).siblings().should('contain', applicant.firstName)
                                cy.get(`#household_elig_member_${index}`).siblings().should('contain', applicant.lastName)


                                // cy.get(applicant[index]).invoke("text").then(text => {
                                //     expect(name).to.include(text.trim())
                                //     cy.log(text)
                                // })


                            })

                            //TODO: add application and enrollment checks
                            let coverageYear = String(cy.h.year)
                            //TODO: handle enrollments
                            //Verify Medical enrollment object
                            if (_.isEmpty(medEnrollment)) {
                                cy.get('#auto-health-plans').should('contain', "You will be able to see your medical plans here once you have completed plan shopping.")
                            } else { //(cy.dashboardStatus.Health_text) {
                                cy.log("medical enr: " + JSON.stringify(medEnrollment))
                                cy.get('#Health_text')
                                    // .parent().siblings().find(`[id*="plan_name"]`)
                                    .each((jqEl, index, el) => {
                                        // cy.log("el: " +JSON.stringify(el[index])
                                        cy.log("index: " + index)
                                        cy.log("array: " + el[index].innerText)
                                        expect(el[index]).to.contain(medEnrollment[index].plan.issuerName)
                                        expect(el[index]).to.contain(medEnrollment[index].plan.planName)
                                    })
                            }

                            if (_.isEmpty(dentEnrollment)) {
                                cy.get('#auto-dental-plans').should('contain', 'You will be able to see your dental plans here once you have completed plan shopping.')
                            } else { // (cy.dashboardStatus.Dental_text) {
                                cy.log("dental enr: " + JSON.stringify(dentEnrollment))
                                cy.get('#Dental_text')
                                    //.parent().siblings().find(`[id*="plan_name"]`)
                                    .each((jqEl, index, el) => {
                                        // cy.log("el: " +JSON.stringify(el[index])
                                        cy.log("index: " + index)
                                        cy.log("array: " + el[index].innerText)
                                        expect(el[index]).to.contain(dentEnrollment[index].plan.issuerName)
                                        expect(el[index]).to.contain(dentEnrollment[index].plan.planName)
                                    })

                            }
                        })
                })
        })
})


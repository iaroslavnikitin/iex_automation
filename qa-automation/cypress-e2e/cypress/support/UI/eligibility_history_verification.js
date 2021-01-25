import moment from 'moment-timezone'
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})
const _ = require('lodash');

Cypress.Commands.add('verifyEligibilityHistory', () => {
    /**
     * Works in OE as of 08/28/2019
     */
    //TODO: refactor for easy read and maintenance
    cy.server()
    cy.route('GET', cy.conf.URL + '/indportal/getApplications?**').as('eligibilityHistory')

    cy.navigateTo('/indportal#/applications')

    cy.wait('@eligibilityHistory')
    cy.get('@eligibilityHistory').then(function (xhr) {
        expect(xhr.status).to.eq(200)
        expect(xhr.method).to.eq('GET')
        cy.eligHistory = xhr.responseBody
        cy.log('XHR Response body: ' + JSON.stringify(xhr.responseBody))
        // let xhrFile = `${Cypress.spec.name}_${cy.h.applicationId}_elig_history_xhr.json`
        // cy.writeFile(xhrFile, JSON.stringify(xhr.responseBody) + "\n\n", {flag: "a+"})
        cy.log("Eligibility History: " + cy.eligHistory)

        let sDate = moment(new Date(cy.h.people[0].activityDate)).tz("America/Los_Angeles").startOf('day')
        let oeEndDate = moment(new Date(cy.current_oe_end_date)).tz("America/Los_Angeles").startOf('day')
        let diff = oeEndDate.diff(sDate)
        let dateDiff = Math.ceil(moment.duration(diff).asDays())+1

        if (cy.eligHistory.currentApplications.length > 0){
            cy.get('#currentAppStatus').contains(cy.h.year + ' Coverage')
        }

        if (!cy.eligHistory.currentApplications[0].isNonFinancial){
            cy.get('#aid_APTC').siblings().contains(formatter.format(cy.eligHistory.currentApplications[0].aptc))
        }

        if (cy.eligHistory.currentApplications[0].stateSubsidy){
            cy.get('#aid_STATESUBSIDY').siblings().contains(formatter.format(cy.eligHistory.currentApplications[0].stateSubsidy))
        }
        if (cy.eligHistory.currentApplications[0].appType != null){
            cy.get('[data-autamation-id="appType"]').contains(cy.eligHistory.currentApplications[0].appType)
        }

        if (cy.eligHistory.currentApplications[0].csr != null){
            cy.get('#aid_CSR').siblings().contains(cy.eligHistory.currentApplications[0].csr)
        }
        else {
            cy.get('#aid_CSR').siblings().contains("Not Eligible")
        }

        if (cy.eligHistory.currentApplications[0].caseNumber) {
            cy.get('[data-autamation-id="casenumber"]').contains(cy.eligHistory.currentApplications[0].caseNumber)
        }
        if (cy.eligHistory.currentApplications[0].createdDate) {
            cy.get('[data-autamation-id="createdDate"]').contains(cy.eligHistory.currentApplications[0].createdDate)
        }
        if (cy.eligHistory.currentApplications[0].lastUpdated) {
            cy.get('[data-autamation-id="lastUpdated"]').contains(cy.eligHistory.currentApplications[0].lastUpdated)
        }

        let appStatusArr = ["Eligibility Received", "Enrolled (Or Active)", "Partially Enrolled"]
        if (appStatusArr.includes(cy.eligHistory.currentApplications[0].applicationStatus)) {
            cy.get('[data-autamation-id="toViewYourApp"]').contains("To view your Demographic and Household info, click")
        }
        if ((cy.eligHistory.currentApplications[0].isSepApp || cy.eligHistory.currentApplications[0].isQep) && appStatusArr.includes(cy.eligHistory.currentApplications[0].applicationStatus)) {
            cy.get('[data-autamation-id="toViewYourChanges"]').contains("To view your changes click")
        }
        if ((cy.eligHistory.applicationStatus == 'Eligibility Received' && (cy.eligHistory.isSepApp==true || cy.eligHistory.isQep == true)) && dateDiff > 0) {
            cy.get('[data-autamation-id="pendingevent"]').contains("You have a pending Life Change Event. Please proceed to your dashboard to take any necessary action.")
        }

        if (cy.eligHistory.currentApplications[0].enableEligibilityResultsButton) {
            cy.get('[data-autamation-id="eligibilityResults"]').contains('ELIGIBILITY RESULTS')
        }

        if (!cy.eligHistory.currentApplications[0].applicationInProgress) {
            cy.get('[data-autamation-id="reportChange"]').contains('REPORT A CHANGE')
        }


    })
})
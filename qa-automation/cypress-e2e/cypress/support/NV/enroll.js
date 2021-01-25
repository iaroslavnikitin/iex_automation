Cypress.Commands.add("verifiedSignup", () => {


        cy.visit('https://nv4qa.eng.vimo.com/hix/mp')
        // cy.get('body > #root > div > #individual-portal').click()
        cy.get('#further-action-btn').click()

    cy.sepConfirmEvent(cy.SEP_QUALIFYING_EVENTS.MARRIAGE)

    // cy.visit('https://nv4qa.eng.vimo.com/hix/referral/lce/events/applicants/fo40oJ70nv-kJM710ARMXxEYkzX6CTXrBI7vYbfSVv-DBXGOykZ8bE5_wiP4dmou')
        // cy.get('.gutter20-lr > #lceStart > .row-fluid > .span6 > #qualifyEvent').click()
        // cy.get('.gutter20-lr > #lceStart > .row-fluid > .span6 > #qualifyEvent').select('MARRIAGE')
        // cy.get('.gutter20-lr > #lceStart > .row-fluid > .span6 > #qualifyEvent').click()
        // cy.get('#lceStart > .row-fluid > .span3 > .input-append > #qualifyEventDate').click()
        // cy.get('.datepicker-days > .table-condensed > tbody > tr:nth-child(3) > .day:nth-child(6)').click()
        // cy.get('fieldset > .form-group > .span12 > .checkbox > #terms').click()
        // cy.get('fieldset > .form-group > .span12 > .checkbox > #terms').check('Accept Terms')
        // cy.get('#rightpanel > div > .gutter20-lr > #lceStart > #continueBtn').click()
        // cy.get('.gutter20-lr > #lceStart > #futureDateModalConfirm > .modal-footer > #changeEventDateSubmit').click()
        // cy.visit('https://nv4qa.eng.vimo.com/hix/mp')

})

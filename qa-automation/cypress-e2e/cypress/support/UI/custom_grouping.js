Cypress.Commands.add('verifyCustomGrouping', () => {
    cy.server()
    cy.route('GET', cy.conf.URL + '/indportal/customGrouping?**').as('customGrouping')
    cy.navigateTo('/indportal#/customGrouping')
    cy.wait('@customGrouping')

    cy.get('@customGrouping').then(function (xhr) {
        expect(xhr.status).to.eq(200)
        expect(xhr.method).to.eq('GET')
        cy.customGrouping = xhr.responseBody
        cy.log('XHR Response body: ' + JSON.stringify(cy.customGrouping))
        cy.log("App hh: " + JSON.stringify(cy.customGrouping))
    })
})
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})

Cypress.Commands.add('verifyMedicalPlanSelection', () => {
    cy.server()
    cy.route('GET', cy.conf.URL + '/private/getIndividualPlans?**').as('healthPlans')
    cy.url().then(url => {
        cy.navigateTo('/private/planselection?insuranceType=HEALTH')
        cy.wait('@healthPlans')
        cy.get('@healthPlans').then(function (xhr) {
            expect(xhr.status).to.eq(200)
            expect(xhr.method).to.eq('GET')
            cy.plansToSelect = xhr.responseBody
        })
    })
})

Cypress.Commands.add('verifyDentalPlanSelection', () => {
    cy.server()
    cy.route('GET', cy.conf.URL + '/private/getIndividualPlans?**').as('dentalPlans')
    cy.url().then(url => {
        cy.navigateTo('/private/planselection?insuranceType=DENTAL&closedPopup=Y')
        cy.wait('@dentalPlans')
        cy.get('@dentalPlans').then(function (xhr) {
            expect(xhr.status).to.eq(200)
            expect(xhr.method).to.eq('GET')
            cy.plansToSelect = xhr.responseBody
        })
    })
})

Cypress.Commands.add("verifyHealthShowCart", (options) => {

    if (cy.planSelected.premium && cy.planSelected.premium > 0) {
        cy.get('#aid_planPremium').contains(formatter.format(cy.planSelected.premium))
    }
    if (cy.planSelected.aptc && cy.planSelected.aptc > 0) {
        cy.get(':nth-child(2)').contains(formatter.format(cy.planSelected.aptc))
    }
    if (cy.planSelected.premiumAfterCredit && cy.planSelected.premiumAfterCredit > 0) {
        cy.get('.individual-subtotal > .txt-right').contains(formatter.format(cy.planSelected.premiumAfterCredit))
        cy.get(':nth-child(2) > .txt-right').contains(formatter.format(cy.planSelected.premiumAfterCredit))
        cy.get('#summary_table > :nth-child(4) > .txt-right').contains(formatter.format(cy.planSelected.premiumAfterCredit))
    }
    cy.get('.span4 > a')
    cy.get('.coverage-start-date')
})

Cypress.Commands.add("verifyDentalShowCart", (options) => {
    if (cy.planSelected.premium && cy.planSelected.premium > 0) {
        cy.get('#aid_planPremium').contains(formatter.format(cy.planSelected.premium))
    }
    if (cy.planSelected.aptc && cy.planSelected.aptc > 0) {
        cy.get(':nth-child(2)').contains(formatter.format(cy.planSelected.aptc))
    }
    if (cy.planSelected.premiumAfterCredit && cy.planSelected.premiumAfterCredit > 0) {
        cy.get('.individual-subtotal > .txt-right').contains(formatter.format(cy.planSelected.premiumAfterCredit))
        cy.get(':nth-child(2) > .txt-right').contains(formatter.format(cy.planSelected.premiumAfterCredit))
        cy.get('#summary_table > :nth-child(4) > .txt-right').contains(formatter.format(cy.planSelected.premiumAfterCredit))
    }
    cy.get('.span4 > a')
    cy.get('.coverage-start-date')
})

Cypress.Commands.add("verifyHealthConfirmation", (options) => {
    cy.log('Inside verifyHealthConfirmation')
    if (cy.planSelected.premium && cy.planSelected.premium > 0) {
        cy.get('strong > :nth-child(1)').contains(formatter.format(cy.planSelected.premium).substring(2))
    }
    if (cy.planSelected.aptc && cy.planSelected.premiumAfterCredit > 0) {
        cy.get('strong > :nth-child(2)').contains(formatter.format(cy.planSelected.aptc).substring(2))
    }
    if (cy.planSelected.premiumAfterCredit && cy.planSelected.premiumAfterCredit > 0) {
        cy.get('.total_table').contains(formatter.format(cy.planSelected.premiumAfterCredit).substring(2))
    }
})

Cypress.Commands.add("verifyDentalConfirmation", (options) => {
    cy.log('Inside verifyDentalConfirmation')
    if (cy.planSelected.premium && cy.planSelected.premium > 0) {
        cy.get('tbody > :nth-child(1) > :nth-child(4)').contains(formatter.format(cy.planSelected.premium).substring(2))
    }
    if (cy.planSelected.aptc && cy.planSelected.aptc > 0) {
        cy.get('tbody > :nth-child(1) > :nth-child(4)').contains(formatter.format(cy.planSelected.aptc).substring(2))
    }
    if (cy.planSelected.premiumAfterCredit && cy.planSelected.premiumAfterCredit > 0) {
        cy.get('.txt-center > h3').contains(formatter.format(cy.planSelected.premiumAfterCredit).substring(2))
    }
})
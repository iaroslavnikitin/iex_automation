before(function () {
    cy.runBeforeBlock()
})

for (let tcn = 1; tcn < 25; tcn++) {
    describe(`Data generation mnuat760_${tcn}`, function () {
        it(`Get server info to create l2_csr user for mnuat760_${tcn}`, function () {
            const userName = `mnuat760_${tcn}_cypress_l2_csr`
            const userFirstName = 'Regression'
            cy.ServerInfo = this.serverInfo
            cy.ServerConfig = this.serverConfig.body
            cy.ServerTime = this.serverTime.body

            cy.serverDate = new Date(cy.ServerTime.now)

            cy.l2_csr_user = {
                applicationId: userName,
                email: `${userName}@yopmail.com`,
                user: `${userName}@yopmail.com`,
                pass: "Ghix123#",
                rolename: 'L2_CSR',
                u: {firstName: userFirstName, lastname: 'Cypress'},
                activityDate: cy.serverDate.toISOString()
            }
            cy.createUser(cy.l2_csr_user)
        })
    })
}










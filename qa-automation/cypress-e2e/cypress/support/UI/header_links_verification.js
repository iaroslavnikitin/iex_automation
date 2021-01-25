Cypress.Commands.add('verifyHeaderLinks', () => {

    //TODO: configure for all states if applicable

    // MN left navigation
    let header = [
        {
            innerHTML: '<a href="#" title="Link open in new window or tab" onclick="openInNewTab(\'https://www.mnsure.org\')"><img class="brand masthead-img" src="/hix/resources/img/logo_mn.png" alt="MNsure"></a>',
            innerText: false
        },
        {
            innerHTML: '<a href="https://people.idev.mnsure.org/CitizenPortal/application.do?AssociateAssistor"> Manage Assister </a>',
            innerText: 'Manage Assister'
        },
        {
            innerHTML: '<a href="#" title="Link open in new window or tab" onclick="openInNewTab(\'https://www.mnsure.org/learn-more/index.jsp\')">Learn More</a>',
            innerText: 'Learn More'
        },
        {
            innerHTML: '<a href="#" title="Link open in new window or tab" onclick="openInNewTab(\'https://www.mnsure.org/help/\')">Get Help</a>',
            innerText: 'Get Help'
        },
        {
            innerHTML: '<a href="/hix/account/user/logout" onclick="logOut()">Sign Out</a>',
            innerText: 'Sign Out'
        },
        {
            innerHTML: '<a href="#" id="language-select">Español</a>',
            innerText: 'Español'
        }
    ]


    cy.get('.navbar-inner > .container')
        .find('li')
        .each((jqEl, index, el) => {


            let innerHTML = el[index].innerHTML
            let innerText = el[index].innerText

            if (header[index].innerHTML)
                expect(innerHTML).to.contain(header[index].innerHTML)

            if (header[index].innerText)
                expect(el[index]).to.contain(header[index].innerText)
        })

})

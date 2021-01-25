Cypress.Commands.add('verifyLeftNavigation', () => {

    //TODO: configure for all states if applicable

    //TODO: refactor to merge with header_links_verification

    // MN left navigation
    let leftNav = [
        {
            innerHTML: '<a href="javascript:void(0)" ng-click="goDash()"><i class="icon-dashboard"></i> My Dashboard</a>',
            innerText: 'My Dashboard'
        },
        {
            innerHTML: '<a href="#applications"><i class="icon-info-sign"></i> My Eligibility History</a>',
            innerText:'My Eligibility History'
        },
        {
            innerHTML: '<a href="#enrollmenthistory"><i class="icon-check-sign"></i> My Enrollments</a>',
            innerText: 'My Enrollments'
        },
        {
            innerHTML: '<a href="/hix/inbox/home"><i class="icon-envelope"></i> My Inbox</a>',
            innerText: 'My Inbox'
        },
        {
            innerHTML: '<a href="https://people.idev.mnsure.org/CitizenPortal/application.do?CitizenAccountHome"><i class="icon-home"></i> My Eligibility Home</a>',
            innerText: 'My Eligibility Home'
        }
    ]


    cy.get('#sidebar')
        .find('li')
        .each((jqEl, index, el) =>{

            let innerHTML = el[index].innerHTML
            let innerText = el[index].innerText

            expect(innerHTML).to.contain(leftNav[index].innerHTML)
            expect(el[index]).to.contain(leftNav[index].innerText)
        })

})

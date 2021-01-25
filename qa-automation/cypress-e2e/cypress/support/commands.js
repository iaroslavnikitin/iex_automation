// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


Cypress.Commands.add('navigateTo', (hash) => {
    let navigateToURL = cy.conf.URL + hash
    cy.hash()
        .then(currentHash => {
            cy.log(`Current hash: ${currentHash}`)
            cy.log(`Navigate to hash: ${hash}`)
            if (currentHash === hash) {
                cy.reload()
            }
            else{
                cy.log("cy.visit action")
                cy.visit(navigateToURL,
                    {retryOnNetworkFailure: true})
            }
        })

    // cy.get('body')
    //     .then((body) => {
    //       if (body.find('#browser-detection-close').length > 0) {
    //         cy.get('#browser-detection-close').click()
    //         //reloading the page takes care of elements loading issue
    //         // noticed when running with Electron (dashboard page)
    //         //cy.reload()
    //         cy.reload()
    //       }
    //     })
})

Cypress.Commands.add("logout", () => {
    cy.navigateTo("/account/user/logout")
    cy.clearCookies()
    cy.clearLocalStorage()
})

Cypress.Commands.add("login", (email, password) => {
    cy.logout()
    cy.navigateTo("/account/user/login")
    cy.get("#j_username").type(email)
    cy.get("#j_password").type(password)
    cy.get('#submit').click()
})

Cypress.Commands.add("checkSSNDOB1", (ssn, dob) => {
    cy.login('M040319A7@yopmail.com', 'Ghix123#')
    cy.get('#csrftoken').then((elem) => {
        cy.log("csrftoken: " + elem.val())
        cy.log("ssn: " + ssn)
        cy.log("dob: " + dob)
        cy.request({
            method: 'POST',
            followRedirect: false,
            form: true,
            url: '/hix/account/signup/checkSSNAndBirthDate',
            body: {
                ssn: ssn,
                dob: dob,
                csrftoken: elem.val()
            }
        })
            .then((resp) => {
                expect(resp.status).to.eq(200)
                if (resp.body != '') {
                    return true
                } else {
                    return false
                }
                // expect(resp.body).to.eq('')
            })
    })
})

Cypress.Commands.add("getSSAP", () => {
    cy.login('M040319A7@yopmail.com', 'Ghix123#')
    cy.get('#csrftoken').then((elem) => {
        cy.log("csrftoken: " + elem.val())
        cy.log("ssn: " + ssn)
        cy.log("dob: " + dob)
        cy.request({
            method: 'POST',
            followRedirect: false,
            form: true,
            url: '/hix/account/signup/checkSSNAndBirthDate',
            body: {
                ssn: ssn,
                dob: dob,
                csrftoken: elem.val()
            }
        })
            .then((resp) => {
                expect(resp.status).to.eq(200)
                if (resp.body != '') {
                    return true
                } else {
                    return false
                }
                // expect(resp.body).to.eq('')
            })
    })
})

Cypress.Commands.add("loginOpsadmin", () => {
    cy.login(cy.ADMIN_USERNAME, cy.ADMIN_PASSWORD)
})

Cypress.Commands.add("getUser", (firstName, lastName) => {
    let user = {
        firstName: firstName,
        lastName: lastName,
        fullName: () => {
            return this.firstName + " " + this.lastName;
        }
    }

    return user;
})

Cypress.Commands.add('generateRandomUserData', () => {
    let uuid = () => Cypress._.random(0, 1e6)
    let rand2 = () => Cypress._.random(10, 99)
    let rand3 = () => Cypress._.random(100, 999)
    let rand4 = () => Cypress._.random(1000, 9999)
    let randFirst3ssn = () => Cypress._.random(100, 888)

    let randYear = () => Cypress._.random(1901, new Date().getFullYear() - 18)
    let randDayOfMonth = () => Cypress._.random(1, 28)


    let ssn = [randFirst3ssn(), rand2(), rand4()]

    let randDay = randDayOfMonth()
    if (randDay < 10) {
        randDay = "0" + randDay;
    }

    let dob = ['04', randDay + "", randYear() + ""]

    cy.RAND_USER.firstName = "Test"
    cy.RAND_USER.middleName = "Cypress"
    cy.RAND_USER.lastName = "User"

    cy.RAND_USER.dob = dob;
    cy.RAND_USER.email = cy.RAND_USER.firstName.toLowerCase() + "."
        + cy.RAND_USER.lastName.toLowerCase() + "." + uuid() + "@yopmail.com"
    cy.RAND_USER.ssn = ssn;
    cy.RAND_USER.phone = [rand3(), rand3(), rand4()]
    cy.RAND_USER.address1 = '1321 S Main St';
    cy.RAND_USER.address2 = 'Apt 103'
    cy.RAND_USER.city = 'Las Vegas'
    cy.RAND_USER.state = ['NV', 'Nevada']
    cy.RAND_USER.zip = '89104'
    cy.RAND_USER.county = ['32003', 'Clark']
    cy.RAND_USER.password = 'ghix123#'

    Cypress.env('RAND_USER', cy.RAND_USER);
})

Cypress.Commands.overwrite("writeFile", (originalFn, filePath, contents, encoding) => {
    const outputPath = Cypress.config().output
    filePath = outputPath + filePath

    return originalFn(filePath, contents, encoding)
})
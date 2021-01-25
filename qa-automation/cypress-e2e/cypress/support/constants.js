//MN
cy.conf = {
    baseUrl: Cypress.config().baseUrl,
    URL: "/hix",
    ADMIN_USERNAME: Cypress.config().admin_user,
    ADMIN_PASSWORD: Cypress.config().admin_pass,
    L2_CSR_USERNAME: Cypress.config().L2_CSR_user,
    L2_CSR_PASSWORD: Cypress.config().L2_CSR_pass,
    UM: {
        user: Cypress.config().um_user,
        pass: Cypress.config().um_pass,
        URI: Cypress.config().um_url
    }, //UserManagementService
    AT: {
        user: Cypress.config().at_user,
        pass: Cypress.config().at_pass,
        URI: Cypress.config().at_url
    }, //Account Transfer
    state: Cypress.config().state,
    outputPath: Cypress.config().output,
    functional_verification: Cypress.config().functional_verification,
    static_verification: Cypress.config().static_verification
}

cy.bURL = cy.conf.baseUrl + cy.conf.URL

cy.um_namespaces = {
    soap: "http://www.w3.org/2003/05/soap-envelope",
    soapenv:"http://schemas.xmlsoap.org/soap/envelope/",
    wsse: "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd",
    wsu: "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd",
    prov: "http://mn1dev.ghixqa.com/provision",
    pText: "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText",
    base64: "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary"

}

cy.um_headers = {
    "content-type": "text/xml;charset=UTF-8",
    "soapaction": "http://mn1dev.ghixqa.com/provision/createuser",
    "accept": "text/xml, text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2",
    "connection": "keep-alive"
}

cy.relationship = {
    SPOUSE: '01',
    PARENT: '03',
    GRANDPARENT: '04',
    GRANDCHILD: '05',
    UNCLE_OR_AUNT: '06',
    NEPHEW_OR_NIECE: '07',
    COUSIN: '08',
    FOSTER_CHILD: '10',
    CHILD_IN_LAW: '11',
    SIBLING_IN_LAW: '12',
    PARENT_IN_LAW: '13',
    SIBLING: '14',
    WARD: '15',
    STEPPARENT: '16',
    STEPCHILD: '17',
    SELF: '18',
    CHILD: '19',
    EX_SPOUSE: '25',
    GUARDIAN: '26',
    OTHER_RELATIONSHIP: 'G8',
    OTHER_RELATIVE: 'G9'
}

cy.csrLevel = {
    CS2: {k: "CS2", v: "OpenToIndiansBelow300PercentFPL"},
    CS3: {k: "CS3", v: "OpenToIndiansAbove300PercentFPL"},
    CS4: {k: "CS4", v: "73PercentActuarialVarianceLevelSilverPlanCSR"},
    CS5: {k: "CS5", v: "87PercentActuarialVarianceLevelSilverPlanCSR"},
    CS6: {k: "CS6", v: "94PercentActuarialVarianceLevelSilverPlanCSR"}
}


cy.at_namespaces = {
    soap: "http://www.w3.org/2003/05/soap-envelope",
    wsse: "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd",
    wsu: "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd",
    ns1: "http://niem.gov/niem/structures/2.0",
    ns10: "http://niem.gov/niem/appinfo/2.1",
    ns2: "http://niem.gov/niem/niem-core/2.0",
    ns3: "http://at.dsh.cms.gov/extension/1.0",
    ns4: "http://hix.cms.gov/0.1/hix-core",
    ns5: "http://hix.cms.gov/0.1/hix-ee",
    ns6: "http://niem.gov/niem/domains/screening/2.1",
    ns7: "http://hix.cms.gov/0.1/hix-pm",
    ns8: "http://niem.gov/niem/appinfo/2.0",
    ns9: "http://at.dsh.cms.gov/exchange/1.0",
    xsi: "http://www.w3.org/2001/XMLSchema-instance",
    pDigest: "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordDigest",
    base64: "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary"
}



cy.at_headers = {
    "Accept-Encoding": "gzip,deflate",
    "Content-Type": "application/soap+xml;charset=UTF-8",
    "User-Agent": "Apache-HttpClient/4.5.2 (Java/1.8.0_181)"
}


//NV
cy.SERVER = "https://nv1qa.eng.vimo.com"
cy.ADMIN_USERNAME = 'opsadmin@getinsured.com'
cy.ADMIN_PASSWORD = 'ghix123#'

cy.SEP_QUALIFYING_EVENTS = {
    ADOPTION: "ADOPTION",
    CHANGE_IN_AIAN_STATUS: "CHANGE_IN_AMERICAN INDIAN / ALSAKA NATIVE STATUS",
    BIRTH: "BIRTH",
    CHANGE_IN_LEGAL_PRESENCE: "CHANGE_IN_LEGAL_PRESENCE",
    LOSS_OF_COVERAGE_THROUGH_EMPLOYER: "LOSS_OF_COVERAGE_THROUGH_EMPLOYER",
    LOST_OTHER_MIN_ESSENTIAL_COVERAGE: "LOST_OTHER_MIN_ESSENTIAL_COVERAGE",
    MARRIAGE: "MARRIAGE",
    MOVED_INTO_STATE: "MOVED_INTO_STATE",
    CHANGE_IN_INCARCERATION: "CHANGE_IN_INCARCERATION",
    CHANGE_IN_ADDRESS: "CHANGE_IN_ADDRESS"
}



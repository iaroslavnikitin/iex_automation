class ATConstants {
    um_namespaces() {
        return {
            soap: "http://www.w3.org/2003/05/soap-envelope",
            soapenv: "http://schemas.xmlsoap.org/soap/envelope/",
            wsse: "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd",
            wsu: "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd",
            prov: "http://mn1dev.ghixqa.com/provision",
            pText: "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText",
            base64: "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary"
        }
    }

    um_headers() {
        return {
            "content-type": "text/xml;charset=UTF-8",
            "soapaction": "http://mn1dev.ghixqa.com/provision/createuser",
            "accept": "text/xml, text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2",
            "connection": "keep-alive"
        }
    }

    relationship() {
        //TODO: figure out other states
        //works for MN,CA

        return {
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
    }

    csrLevel() {
        return {
            CS2: {k: "CS2", v: "OpenToIndiansBelow300PercentFPL"},
            CS3: {k: "CS3", v: "OpenToIndiansAbove300PercentFPL"},
            CS4: {k: "CS4", v: "73PercentActuarialVarianceLevelSilverPlanCSR"},
            CS5: {k: "CS5", v: "87PercentActuarialVarianceLevelSilverPlanCSR"},
            CS6: {k: "CS6", v: "94PercentActuarialVarianceLevelSilverPlanCSR"}
        }
    }

    at_namespaces() {
        return {
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
    }


    at_headers() {
        return {
            "Accept-Encoding": "gzip,deflate",
            "Content-Type": "application/soap+xml;charset=UTF-8",
            "User-Agent": "Apache-HttpClient/4.5.2 (Java/1.8.0_181)"
        }
    }

}

module.exports = new ATConstants();
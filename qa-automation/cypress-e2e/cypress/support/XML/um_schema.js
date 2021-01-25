/// <reference types="Cypress" />

const convert = require('xml-js');
import './digest';


cy.postUMrequest = (hh) => {
    let um_xml = cy.convertUMJsToXml(hh);
    let reqFile = `${Cypress.spec.name}_${hh.applicationId}_um_post.xml`
     cy.writeFile(reqFile, um_xml + "\n\n",{flag: "a+"});

    return cy.request({
        url: cy.conf.UM.URI,
        method: 'POST',
        body: um_xml,
        headers: cy.um_headers,
        failOnStatusCode: false //set this option to false to be able to read the response
    })
}

cy.getServerIsoDate = () => {
    return cy.request({
        url: cy.conf.URL + '/actuator/info',
        method: 'GET'
    })
}

cy.getUMHeader = (isoDate) => {
    let dg = cy.wsseHeader(cy.conf.UM.user, cy.conf.UM.pass);
    let um_header = {
        "wsse:Security": {
            "_attributes": {
                "xmlns:wsse": cy.um_namespaces.wsse,
                "xmlns:wsu": cy.um_namespaces.wsu,
                "soapenv:mustUnderstand": "1"
            },
            "wsse:UsernameToken": {
                "_attributes": {
                    "wsu:Id": "MN-UserManagement-CYPRESS"
                },
                "wsse:Username": {
                    "_text": dg.Username
                },
                "wsse:Password": {
                    "_attributes": {
                        "Type": cy.um_namespaces.pText
                    },
                    "_text": cy.conf.UM.pass
                },
                "wsse:Nonce": {
                    "_attributes": {
                        "EncodingType": cy.um_namespaces.base64,
                    },
                    "_text": dg.Nonce
                },
                "wsu:Created": {
                    "_text": isoDate
                }
            }
        }
    }

    return um_header;
}


cy.um_json = (household) => {

    let um = {
        "soapenv:Envelope": {
            "_attributes": {
                "xmlns:prov": cy.um_namespaces.prov,
                "xmlns:soapenv": cy.um_namespaces.soapenv
            },
            "soapenv:Header": cy.getUMHeader(household.activityDate),
            "soapenv:Body": {
                "prov:CreateUserRequest": {
                    "remoteId": {
                        "_text": household.applicationId
                    },
                    "name": {
                        "firstname": {
                            "_text": household.u.firstname
                        },
                        "lastname": {
                            "_text": household.u.lastname
                        },
                        "middlename": {
                            "_text": "?"
                        }
                    },
                    "dateOfBirth": {
                        "_text": "01 Jan 1988"
                    },
                    "phone": {
                        "home_phone": {
                            "_text": "?"
                        },
                        "other_phone": {
                            "_text": "?"
                        }
                    },
                    "credentials": {
                        "managed": {
                            "_text": "false"
                        },
                        "password": {
                            "password": {
                                "_text": household.pass
                            }
                        },
                        "security_question": {
                            "question": {
                                "_text": "What is the name of your first pet"
                            },
                            "answer": {
                                "_text": "pet"
                            }
                        },
                        "role": {
                            "rolename": {
                                "_text": household.rolename
                            },
                            "is_default": {
                                "_text": "true"
                            }
                        }
                    },
                    "email": {
                        "_text": household.email
                    },
                    "username": {
                        "_text": household.user
                    }
                },
                "prov1:CreateUserRequest": {
                    "_attributes": {
                        "xmlns:prov1": cy.um_namespaces.prov
                    }
                }
            }
        }
    };
    return um;
}


//TODO: refactor
cy.convertUMJsToXml = (hh) => {
    let um_js = cy.um_json(hh);
    let options = {compact: true, ignoreComment: true, spaces: 4};
    let um_xml = convert.json2xml(um_js, options);

    return um_xml;
}
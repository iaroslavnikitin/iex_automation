const convert = require('xml-js');
import './digest';

cy.postATrequest = (hh) => {
    let at_xml = cy.convertATJsToXml(hh);
    let reqFile = `${Cypress.spec.name}_${hh.applicationId}_at_post.xml`
    cy.writeFile(reqFile, at_xml + "\n\n", {flag: "a+"});

    return cy.request({
        url: cy.conf.AT.URI,
        method: 'POST',
        body: at_xml,
        headers: cy.at_headers
    })
}

cy.getATHeader = (activityDate) => {
    let dg = cy.wsseHeader(cy.conf.AT.user, cy.conf.AT.pass);
    let at_header = {
        "wsse:Security": {
            "_attributes": {
                "xmlns:wsse": cy.at_namespaces.wsse,
                "xmlns:wsu": cy.at_namespaces.wsu,
                "soap:mustUnderstand": "true"
            },
            "wsse:UsernameToken": {
                "_attributes": {
                    "wsu:Id": "MN-AccountTransfer-CYPRESS"
                },
                "wsse:Username": {
                    "_text": cy.conf.AT.user
                },
                "wsse:Password": {
                    "_attributes": {
                        "Type": cy.at_namespaces.pDigest
                    },
                    "_text": dg.PasswordDigest
                },
                "wsse:Nonce": {
                    "_attributes": {
                        "EncodingType": cy.at_namespaces.base64
                    },
                    "_text": dg.Nonce
                },
                "wsu:Created": {
                    "_text": activityDate
                }
            }
        }
    }

    return at_header;
}

cy.at_json = (household) => {

    //TODO: create one place to create ids such as Person1, Person2, Person1Aptc...
    if (!household) {
        throw "(at_json) - No household info"
    }
    ;
    let activityDate = household.activityDate
    let activityDateShort = activityDate.split('T')[0];
    let ppl = cy.createATPeople(household.people, household.address);
    let insApplicants = cy.createATInsuranceApplicant(household.people);
    let taxDependants = cy.processTaxDependants(household.taxDependants);

    let householdMemberReference = household.householdMemberReferenceId;

    let at = {
        "soap:Envelope": {
            "_attributes": {
                "xmlns:soap": cy.at_namespaces.soap
            },
            "soap:Header": cy.getATHeader(activityDate),
            "soap:Body": {
                "ns9:AccountTransferRequest": {
                    "_attributes": {
                        "xmlns:ns9": cy.at_namespaces.ns9,
                        "xmlns:ns3": cy.at_namespaces.ns3,
                        "xmlns:ns1": cy.at_namespaces.ns1,
                        "xmlns:ns10": cy.at_namespaces.ns10,
                        "xmlns:ns2": cy.at_namespaces.ns2,
                        "xmlns:ns4": cy.at_namespaces.ns4,
                        "xmlns:ns5": cy.at_namespaces.ns5,
                        "xmlns:ns6": cy.at_namespaces.ns6,
                        "xmlns:ns7": cy.at_namespaces.ns7,
                        "xmlns:ns8": cy.at_namespaces.ns8,
                        "ns3:atVersionText": "2.4"
                    },
                    "ns3:TransferHeader": {
                        "ns3:TransferActivity": {
                            "ns2:ActivityIdentification": {
                                "ns2:IdentificationID": {
                                    "_text": household.applicationId //todo:
                                }
                            },
                            "ns2:ActivityDate": {
                                "ns2:DateTime": {
                                    "_text": activityDate
                                }
                            },
                            "ns3:TransferActivityReferralQuantity": {
                                "_text": insApplicants.length
                            },
                            "ns3:RecipientTransferActivityCode": {
                                "_text": "Exchange"
                            }
                        }
                    },
                    "ns4:Sender": {
                        "_attributes": {
                            "ns1:id": "SenderMedicaid"
                        },
                        "ns4:InformationExchangeSystemCategoryCode": {
                            "_text": "MedicaidAgency"
                        },
                        "ns4:InformationExchangeSystemStateCode": {
                            "_text": "MN"
                        }
                    },
                    "ns4:Receiver": {
                        "_attributes": {
                            "ns1:id": "ReceiverExchange"
                        },
                        "ns4:InformationExchangeSystemCategoryCode": {
                            "_text": "Exchange"
                        }
                    },
                    "ns5:InsuranceApplication": {
                        "ns4:ApplicationCreation": {
                            "_attributes": {
                                "xmlns:xsi": cy.at_namespaces.xsi,
                                "xsi:type": "ns4:ActivityType"
                            },
                            "ns2:ActivityDate": {
                                "ns2:Date": {
                                    "_text": activityDateShort
                                }
                            }
                        },
                        "ns4:ApplicationSubmission": {
                            "_attributes": {
                                "xmlns:xsi": cy.at_namespaces.xsi,
                                "xsi:type": "ns4:ActivityType"
                            },
                            "ns2:ActivityDate": {
                                "ns2:Date": {
                                    "_text": activityDateShort
                                }
                            }
                        },
                        "ns4:ApplicationIdentification": {
                            "ns2:IdentificationID": {
                                "_text": household.icn
                            },
                            "ns2:IdentificationCategoryText": {
                                "_text": "IntegratedCaseNumber"
                            }
                        },
                        "ns5:InsuranceApplicant": insApplicants,

                        "ns5:InsuranceApplicationRequestingFinancialAssistanceIndicator": {
                            "_text": household.insuranceApplicationRequestingFinancialAssistanceIndicator
                        },
                        "ns5:InsuranceApplicationCoverageRenewalYearQuantity": {
                            "_attributes": {
                                "xmlns:xsi": cy.at_namespaces.xsi,
                                "xsi:nil": "true"
                            }
                        },
                        "ns5:SSFSigner": {
                            "ns4:RoleOfPersonReference": {
                                "_attributes": {
                                    "ns1:ref": household.ssfSignerId
                                }
                            },
                            "ns5:Signature": {
                                "ns4:SignatureDate": {
                                    "ns2:Date": {
                                        "_text": activityDateShort
                                    }
                                }
                            },
                            "ns5:SSFAttestation": {
                                "ns5:SSFAttestationCollectionsAgreementIndicator": {
                                    "_text": "true"
                                },
                                "ns5:SSFAttestationMedicaidObligationsIndicator": {
                                    "_text": "true"
                                },
                                "ns5:SSFAttestationNonPerjuryIndicator": {
                                    "_text": "true"
                                },
                                "ns5:SSFAttestationNotIncarceratedIndicator": {
                                    "_text": "true"
                                },
                                "ns5:SSFAttestationInformationChangesIndicator": {
                                    "_text": "true"
                                },
                                "ns5:SSFAttestationApplicationTermsIndicator": {
                                    "_text": "true"
                                }
                            }
                        },
                        "ns5:InsuranceApplicationRequestingMedicaidIndicator": {
                            "_text": "false"
                        },
                        "ns5:SSFPrimaryContact": {
                            "ns4:RoleOfPersonReference": {
                                "_attributes": {
                                    "ns1:ref": household.mainSubscriberId
                                }
                            },
                            "ns5:SSFPrimaryContactPreferenceCode": {
                                "_text": "Mail"
                            }
                        },
                        "ns5:InsuranceApplicationTaxReturnAccessIndicator": {
                            "_text": "true"
                        },
                        "ns5:ApplicationExtension": {
                            "ns5:CoverageYear": {
                                "_text": household.year
                            },
                            "ns5:EligibilitySpans": {
                                "ns2:CurrentEligibilitySpan": {
                                    "_text": household.currentEligibilitySpan
                                },
                                "ns2:TotalEligibilitySpan": {
                                    "_text": household.totalEligibilitySpan
                                }
                            },
                            "ns5:ApplicationVerificationIndicator": {
                                "_text": "false"
                            }
                        }
                    },
                    "ns5:Assister": {
                        "ns4:RolePlayedByPerson": {
                            "ns2:PersonName": {
                                "ns2:PersonGivenName": {
                                    "_text": "NewTestC"
                                },
                                "ns2:PersonSurName": {
                                    "_text": "Assister"
                                }
                            },
                            "ns3:PersonAugmentation": {
                                "ns3:PersonOrganizationAssociation": {
                                    "ns3:Organization": {
                                        "ns2:OrganizationIdentification": {
                                            "ns2:IdentificationID": {
                                                "_text": household.assisterBrokerId
                                            }
                                        },
                                        "ns2:OrganizationName": {
                                            "_text": "Broker"
                                        }
                                    }
                                },
                                "ns4:PersonIdentification": [
                                    {
                                        "ns2:IdentificationID": {
                                            "_text": household.assisterExternalId
                                        },
                                        "ns2:IdentificationCategoryText": {
                                            "_text": "Assister ExternalID"
                                        }
                                    },
                                    {
                                        "ns2:IdentificationID": {
                                            "_text": household.assisterBrokerNPN
                                        },
                                        "ns2:IdentificationCategoryText": {
                                            "_text": "Broker NPN"
                                        }
                                    }
                                ]
                            }
                        }
                    },

                    "ns5:AuthorizedRepresentative": {
                        "ns4:RolePlayedByPerson": {
                            "ns2:PersonName": {
                                "ns2:PersonSurName": {
                                    "_text": "Cypress"
                                }
                            },
                            "ns3:PersonAugmentation": {
                                "ns3:PersonOrganizationAssociation": {
                                    "ns3:Organization": {
                                        "ns2:OrganizationIdentification": {
                                            "ns2:IdentificationID": {
                                                "_text": household.applicationId
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "ns4:Person": ppl,
                    "ns5:TaxReturn": {
                        "ns5:TaxHousehold": {
                            "ns5:HouseholdIncome": {
                                "ns4:IncomeFederalPovertyLevelPercent": {
                                    "_text": "367"
                                },
                                "ns4:IncomeEmploymentDescriptionText": {
                                    "_attributes": {
                                        "xmlns:xsi": cy.at_namespaces.xsi,
                                        "xsi:nil": "true"
                                    }
                                },
                                "ns4:IncomeUnemploymentSourceText": {
                                    "_attributes": {
                                        "xmlns:xsi": cy.at_namespaces.xsi,
                                        "xsi:nil": "true"
                                    }
                                }
                            },
                            "ns5:HouseholdSizeQuantity": {
                                "_text": household.people.length
                            },
                            "ns5:TaxDependent": {
                                "ns4:RoleOfPersonReference": taxDependants
                            },
                            "ns5:PrimaryTaxFiler": {
                                "ns4:RoleOfPersonReference": {
                                    "_attributes": {"ns1:ref": household.primaryTaxFilerId}
                                }
                            }
                        }
                    },
                    "ns3:PhysicalHousehold": {
                        "ns5:HouseholdMemberReference": {
                            "_attributes": {"ns1:ref": household.householdMemberReferenceId}
                        }
                    }
                }
            }
        }
    };
    return at;
}

//TODO: should be in schema
cy.processTaxDependants = (tDep) => {
    // if (!tDep) { throw "(processTaxDependants) = No people information provided"}

    let taxDep = new Array();

    for (let i = 0; i < tDep.length; i++) {
        let td = {"_attributes": {"ns1:ref": tDep[i]}};
        taxDep.push(td);
    }


    return taxDep;
}


cy.createATInsuranceApplicant = (people) => {
    //TODO: implement default values

    if (!people) {
        throw  "(createATInsuranceApplicant) - No HH People Information Provided"
    }
    ;


    let insuranceApplicants = new Array();

    for (let i = 0; i < people.length; i++) {
        if (people[i].isSeekingCoverageIndicator) {

            let aptcId = people[i].personId + "APTCEligibilityRef";
            let csrId = people[i].personId + "CSREligibilityRef";
            let exchangeId = people[i].personId + "ExchangeEligibilityRef";

            let exchangeEligibilityReasonText = people[i].exchangeEligibilityReasonText;

            let ia = {
                "ns4:RoleOfPersonReference": {
                    "_attributes": {
                        "ns1:ref": people[i].personId
                    }
                },
                "ns5:InsuranceApplicantFixedAddressIndicator": {
                    "_text": "true"
                },
                "ns5:InsuranceApplicantLawfulPresenceStatus": {
                    "ns5:LawfulPresenceStatusArrivedBefore1996Indicator": {
                        "_text": "false"
                    },
                    "ns5:LawfulPresenceStatusEligibility": {
                        "_attributes": {
                            "xmlns:xsi": cy.at_namespaces.xsi,
                            "xsi:nil": "true"
                        }
                    }
                },
                "ns5:InsuranceApplicantNonESICoverageIndicator": {
                    "_attributes": {
                        "xmlns:xsi": cy.at_namespaces.xsi,
                        "xsi:nil": "true"
                    }
                },
                "ns5:APTCEligibility": {
                    "_attributes": {
                        "ns1:id": aptcId
                    },
                    "ns5:EligibilityDateRange": {
                        "ns2:StartDate": {
                            "ns2:Date": {
                                "_text": people[i].aptcEligibilityStartDate
                            }
                        },
                        "ns2:EndDate": {
                            "ns2:Date": {
                                "_text": people[i].aptcEligibilityEndDate
                            }
                        }
                    },
                    "ns5:EligibilityDetermination": {
                        "ns2:ActivityDate": {
                            "ns2:DateTime": {
                                "_text": people[i].activityDate
                            }
                        }
                    },
                    "ns5:EligibilityReasonText": {
                        "_text": people[i].aptcEligibilityReasonText
                    },
                    "ns5:EligibilityIndicator": {
                        "_text": people[i].aptcEligibilityIndicator
                    }
                },
                "ns5:CSREligibility": {
                    "_attributes": {
                        "ns1:id": csrId
                    },
                    "ns5:EligibilityDateRange": {
                        "ns2:StartDate": {
                            "ns2:Date": {
                                "_text": people[i].csrEligibilityStartDate
                            }
                        },
                        "ns2:EndDate": {
                            "ns2:Date": {
                                "_text": people[i].csrEligibilityEndDate
                            }
                        }
                    },
                    "ns5:EligibilityDetermination": {
                        "ns2:ActivityDate": {
                            "ns2:DateTime": {
                                "_text": people[i].activityDate
                            }
                        }
                    },
                    "ns5:EligibilityReasonText": {
                        "_text": people[i].csrEligibilityReasonText
                    },
                    "ns5:EligibilityIndicator": {
                        "_text": people[i].csrEligibilityIndicator
                    },
                    "ns5:CSRAdvancePayment": {
                        "ns5:CSRCategoryAlphaCode": {
                            "_text": people[i].csrCategoryAlphaCode
                        }
                    }
                },
                "ns5:ExchangeEligibility": {
                    "_attributes": {
                        "ns1:id": exchangeId
                    },
                    "ns5:EligibilityDateRange": {
                        "ns2:StartDate": {
                            "ns2:Date": {
                                "_text": people[i].exchangeEligibilityStartDate
                            }
                        },
                        "ns2:EndDate": {
                            "ns2:Date": {
                                "_text": people[i].exchangeEligibilityEndDate
                            }
                        }
                    },
                    "ns5:EligibilityDetermination": {
                        "ns2:ActivityDate": {
                            "ns2:DateTime": {
                                "_text": people[i].activityDate
                            }
                        }
                    },
                    "ns5:EligibilityReasonText": {
                        "_text": exchangeEligibilityReasonText
                    },
                    "ns5:EligibilityIndicator": {
                        "_text": people[i].exchangeEligibilityIndicator
                    }
                },
                "ns5:ReferralActivity": {
                    "ns2:ActivityIdentification": {
                        "ns2:IdentificationID": {
                            "_text": "MN-01010"
                        }
                    },
                    "ns2:ActivityDate": {
                        "ns2:DateTime": {
                            "_text": people[i].activityDate
                        }
                    },
                    "ns5:ReferralActivitySenderReference": {
                        "_attributes": {
                            "ns1:ref": "SenderMedicaid"
                        }
                    },
                    "ns5:ReferralActivityReceiverReference": {
                        "_attributes": {
                            "ns1:ref": "ReceiverExchange"
                        }
                    },
                    "ns5:ReferralActivityStatus": {
                        "ns5:ReferralActivityStatusCode": {
                            "_text": "Updated"
                        }
                    },
                    "ns5:ReferralActivityEligibilityReasonReference": [
                        {
                            "_attributes": {
                                "ns1:ref": aptcId
                            }
                        },
                        {
                            "_attributes": {
                                "ns1:ref": csrId
                            }
                        }
                    ]
                }
            };

            if (people[i].isPrimaryTaxFiler === true) {
                let insuranceApplicantNonESIPolicyAttr = "ns5:InsuranceApplicantNonESIPolicy";
                let insPremiumAmnt = {"ns5:InsurancePremium": {"ns5:InsurancePremiumAmount": {"_text": people[i].insurancePremiumAmount}}};
                ia[insuranceApplicantNonESIPolicyAttr] = insPremiumAmnt;

                let APTCEligibility = "ns5:APTCEligibility"
                let APTC = "ns5:APTC"
                let aptcMax = {"ns5:APTCMaximumAmount": {"_text": people[i].aptcMaximumAmount}}
                ia[APTCEligibility][APTC] = aptcMax
            }
            ;
            insuranceApplicants.push(ia);

        }
        ;
    }
    ;
    return insuranceApplicants;
}

cy.createATPeople = (people, address) => {

    if (!people || !address) {
        throw "(createATPeople) - HH People information or Address is not provided"
    }
    ;

    let hhp = new Array();

    for (let i = 0; i < people.length; i++) {

        // if (people[i].rel) {
        //     var rel = cy.createATPersonAssociation(people[i].rel)
        // }
        let personName = cy.getPersonName(people[i].firstName, people[i].lastName, people[i].middleName);


        let p = {
            "_attributes": {
                "ns1:id": people[i].personId
            },
            "ns2:PersonBirthDate": {
                "ns2:Date": {
                    "_text": people[i].dob
                }
            },
            "ns2:PersonName": personName,
            "ns2:PersonRaceText": {
                "_text": people[i].personRace
            },
            "ns2:PersonSexText": {
                "_text": people[i].personSex
            },
            "ns2:PersonSSNIdentification": {
                "ns2:IdentificationID": {
                    "_text": people[i].ssn
                }
            },
            "ns2:PersonUSCitizenIndicator": {
                "_text": people[i].USCitizenIndicator
            },
            "ns2:PersonSeekingCoverageIndicator": {
                "_text": people[i].isSeekingCoverageIndicator
            },
            "ns4:TribalAugmentation": {
                "ns4:PersonAmericanIndianOrAlaskaNativeIndicator": {
                    "_text": people[i].americanIndianIndicator
                },
                "ns2:LocationStateUSPostalServiceCode": {
                    "_attributes": {
                        "xmlns:xsi": cy.at_namespaces.xsi,
                        "xsi:nil": "true"
                    }
                }
            },
            "ns4:PersonAugmentation": {

                "ns4:PersonContactInformationAssociation": [
                    {
                        "ns2:AssociationBeginDate": {
                            "_attributes": {
                                "xmlns:xsi": cy.at_namespaces.xsi,
                                "xsi:nil": "true"
                            }
                        },
                        "ns2:ContactInformationIsPrimaryIndicator": {
                            "_text": "false"
                        },
                        "ns4:ContactInformation": {
                            "ns2:ContactMailingAddress": {
                                "ns2:StructuredAddress": address
                            }
                        },
                        "ns4:ContactInformationCategoryCode": {
                            "_text": "Home"
                        }
                    },
                    {
                        "ns2:AssociationBeginDate": {
                            "_attributes": {
                                "xmlns:xsi": cy.at_namespaces.xsi,
                                "xsi:nil": "true"
                            }
                        },
                        "ns2:ContactInformationIsPrimaryIndicator": {
                            "_text": "false"
                        },
                        "ns4:ContactInformation": {
                            "ns2:ContactMailingAddress": {
                                "ns2:StructuredAddress": address
                            }
                        },
                        "ns4:ContactInformationCategoryCode": {
                            "_text": "Mailing"
                        }
                    },
                    {
                        "ns2:AssociationBeginDate": {
                            "_attributes": {
                                "xmlns:xsi": cy.at_namespaces.xsi,
                                "xsi:nil": "true"
                            }
                        },
                        "ns2:ContactInformationIsPrimaryIndicator": {
                            "_text": people[i].isPrimaryContact
                        },
                        "ns4:ContactInformation": {
                            "ns2:ContactTelephoneNumber": {
                                "ns2:FullTelephoneNumber": {
                                    "ns2:TelephoneNumberFullID": {
                                        "_text": people[i].phone
                                    }
                                }
                            }
                        },
                        "ns4:ContactInformationCategoryCode": {
                            "_text": "Self"
                        }
                    },
                    {
                        "ns2:AssociationBeginDate": {
                            "_attributes": {
                                "xmlns:xsi": cy.at_namespaces.xsi,
                                "xsi:nil": "true"
                            }
                        },
                        "ns2:ContactInformationIsPrimaryIndicator": {
                            "_text": people[i].isPrimaryContact
                        },
                        "ns4:ContactInformation": {
                            "ns2:ContactTelephoneNumber": {
                                "ns2:FullTelephoneNumber": {
                                    "ns2:TelephoneNumberFullID": {
                                        "_text": people[i].phone
                                    }
                                }
                            }
                        },
                        "ns4:ContactInformationCategoryCode": {
                            "_text": "Home"
                        }
                    },
                    {
                        "ns2:AssociationBeginDate": {
                            "_attributes": {
                                "xmlns:xsi": cy.at_namespaces.xsi,
                                "xsi:nil": "true"
                            }
                        },
                        "ns2:ContactInformationIsPrimaryIndicator": {
                            "_text": "false"
                        },
                        "ns4:ContactInformation": {
                            "ns2:ContactEmailID": {
                                "_text": people[i].email
                            }
                        }
                    }
                ],
                "ns4:PersonPregnancyStatus": {
                    "_attributes": {
                        "xmlns:xsi": cy.at_namespaces.xsi,
                        "xsi:nil": "true"
                    }
                },
                "ns4:PersonMedicaidIdentification": {
                    "ns2:IdentificationID": {
                        "_text": people[i].personMedicaidIdentification
                    }
                },
                "ns4:PersonMarriedIndicator": {
                    "_text": people[i].personMarriedIndicator
                }
            }
        };

        if (people[i].rel) {
            p["ns4:PersonAugmentation"]["ns4:PersonAssociation"] = cy.createATPersonAssociation(people[i].rel)
        }

        hhp.push(p);
    }
    ;
    return hhp;
}

cy.getPersonName = (fName, lName, mName) => {
    if (!fName || !lName) {
        throw "(getPersonName) - No First/Last Name is provided"
    } else if (!mName) {
        return [{
            "ns2:PersonGivenName": {"_text": fName},
            "ns2:PersonSurName": {"_text": lName}
        }];
    } else {
        return [{
            "ns2:PersonGivenName": {"_text": fName},
            "ns2:PersonSurName": {"_text": lName},
            "ns2:PersonMiddleName": {"_text": mName}
        }];
    }
}

cy.createATPersonAssociation = (personRel) => {
    let pa = new Array();
    for (let key in personRel) {
        let pId = "Person" + key;

        let re = {
            "ns2:AssociationBeginDate": {
                "_attributes": {
                    "xmlns:xsi": cy.at_namespaces.xsi,
                    "xsi:nil": "true"
                }
            },
            "ns2:PersonReference": {
                "_attributes": {
                    "ns1:ref": pId
                }
            },
            "ns4:FamilyRelationshipCode": {
                "_text": personRel[key]
            }
        };
        pa.push(re);
    }
    return pa;
}

//TODO: make common function for reuse by UM and AT
cy.convertATJsToXml = (hh) => {
    let at_js = cy.at_json(hh);
    let options = {compact: true, ignoreComment: true, spaces: 4};
    let at_xml = convert.json2xml(at_js, options);

    return at_xml;
}


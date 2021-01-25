const _ = require("lodash")

Cypress.Commands.add("nvSignUp", (options) => {
    let phone1 = cy.h.people[0].phone.slice(0, 3)
    let phone2 = cy.h.people[0].phone.slice(3, 6)
    let phone3 = cy.h.people[0].phone.slice(-4)
    let ssn1 = cy.h.people[0].ssn.slice(0, 3)
    let ssn2 = cy.h.people[0].ssn.slice(3, 5)
    let ssn3 = cy.h.people[0].ssn.slice(-4)
    let dob = Cypress.moment(cy.h.people[0].dob).format('MM/DD/YYYY')
    let addressLine1 = cy.h.address["ns2:LocationStreet"]["ns2:StreetFullText"]
    let city = cy.h.address["ns2:LocationCityName"]
    let state = cy.h.address.StateSelection[0]
    let zipcode = cy.h.address["ns2:LocationPostalCode"]

    cy.navigateTo("/")
    cy.get('.row-fluid > .landing-signup > .row-fluid > .col-xs-12 > h1').click()
    cy.get('.col-xs-12 > .register-group > .col-xs-12 > .shopbutton-wrapper > .btn').click()

    cy.get('#rightpanel > .form-horizontal > .question-group > .form-actions > #skip-sign-up').click()
        .then(() => {

    //Fill in the form
    cy.get('#firstName').type(cy.h.people[0].firstName)
    cy.get('#lastName').type(cy.h.people[0].lastName)
    cy.get('#email').type(cy.h.people[0].email)
    cy.get('#confirmEmail').type(cy.h.people[0].email)

    cy.get('#phone1').type(phone1).wait(300)
    cy.get('#phone2').type(phone2).wait(300)
    cy.get('#phone3').type(phone3).wait(300)

    cy.get('#ssn1').type(ssn1).wait(300)
    cy.get('#ssn2').type(ssn2).wait(300)
    cy.get('#ssn3').type(ssn3).wait(300)

    cy.get('#confirmSsn1').type(ssn1).wait(300)
    cy.get('#confirmSsn2').type(ssn2).wait(300)
    cy.get('#confirmSsn3').type(ssn3).wait(300)

    cy.get('#birthDate').type(dob).wait(300)
    cy.get('#securityQuestion1').focus().select('What was your childhood nickname?')
    cy.get('#securityAnswer1').type('nickname')
    cy.get('#password').type(cy.h.pass)
    cy.get('#confirmPassword').type(cy.h.pass)
    cy.get('#terms').check('Accept Terms').wait(300)
        })
        .then(() => {
    cy.get('#submitbtn').click().wait(300)
        })
        .then(() => {
            //Continue with the form
            cy.get('#addressLine1').type(addressLine1).wait(3000)
            cy.get('#city').type(city).wait(3000)
            cy.get('#state').select(state).wait(3000)
            cy.get('#zipcode').type(zipcode).wait(3000)
            cy.get('#optInPaperless1095').check('on')
        })
        .then(() => {
            cy.get('#addressLine1').should("have.value", addressLine1)
            cy.get('#city').should("have.value", city)
            cy.get('#zipcode').should("have.value", zipcode)

        })
        .then(() => {
            cy.get('#submitAdditionalInfo').click().wait(300)
        })
})


Cypress.Commands.add("verifiedSignup", () => {
//TODO: for Nevada make information dynamic from household.json
    cy.navigateTo('/indportal')
    cy.get('#further-action-btn').click()
    cy.get('#checkbox_page_00_acceptPrivacyIndicator_label').click()
    cy.get("[id^='Page_0_rightButton_id']").click()

    cy.get("[id^='Page_1_rightButton_id']").click()

    cy.get('#checkbox_page_02_householdContact_mailingAddressSameAsHomeAddressIndicator_label').click()
    cy.get("[id^='Page_2_rightButton_id']").click()

    cy.get('#page_03_getHelpIndicator_label1').click()
    cy.get("[id^='Page_3_rightButton_id']").click()

    if (!cy.h.financial) {

        cy.get("[id^='page_04_applyingForFinancialAssistanceIndicator_label']")
            .each(($el, index, $list) => {
                // $el is a wrapped jQuery element
                if ($el.attr('data-value') === "false") {
                    // wrap this element so we can
                    // use cypress commands on it
                    cy.log("Label elements data-value: " + $el.attr("data-value"))
                    cy.get($el).click()
                } else {
                    cy.log("This element is for financial")
                }
            })
        cy.get("[id^='Page_4_rightButton_id']").click()

        cy.get('#page_05_applyingForhouseHold_label0').click()
        cy.get("[id^='Page_5_rightButton_id']").click()

        cy.get('#checkbox_page_06_hhm0_applyingForCoverageIndicator_label').click()
        cy.get("[id^='Page_6_rightButton_id']").click()

        cy.get("[id^='Page_9_rightButton_id']").click()

        cy.get("[id^='Page_10_rightButton_id']").click()

        cy.get('#page_11_gender_label1').click()
        cy.get('#page_11_socialSecurityCard_nameSameOnSSNCardIndicator_label0').click()
        cy.get("[id^='Page_11_rightButton_id']").click()

        cy.get('#page_12_citizenshipImmigrationStatus_citizenshipStatusIndicator_label0').click()
        cy.get('#page_12_citizenshipImmigrationStatus_naturalizedCitizenshipIndicator_label1').click()
        cy.get("[id^='Page_12_rightButton_id']").click()

        cy.get('#page_13_ethnicityAndRace_hispanicLatinoSpanishOriginIndicator_label1').click()
        cy.get('#checkbox_page_13_2106-3_label').click()
        cy.get('#checkbox_page_13_2500-7_label').click()
        cy.get("[id^='Page_13_rightButton_id']").click()

        cy.get('#checkbox_page_14_noneOfTheAbove_label').click()
        cy.get("[id^='Page_14_rightButton_id']").click()

        cy.get('#checkbox_page_15_noneOfTheAbove_label').click()
        cy.get("[id^='Page_15_rightButton_id']").click()

        cy.get("[id^='Page_16_rightButton_id']").click()

        cy.get("[id^='Page_17_rightButton_id']").click()

        cy.get("[id^='Page_18_rightButton_id']").click()

        cy.get('#checkbox_page_19_incarcerationAsAttestedIndicator_label').click()
        cy.get('#page_19_consentAgreement_label0').click()
        cy.get('#checkbox_page_19_isReadyToReportForChanges_label').click()
        cy.get('#checkbox_page_19_isTruthful_label').click()
        cy.get('#page_19_signature').click()
        cy.get('#page_19_signature').type(`${cy.h.people[0].firstName} ${cy.h.people[0].lastName}`)
        cy.get("[id^='Page_19_rightButton_id']").click()

    }
    else{
        cy.get("[id^='page_04_applyingForFinancialAssistanceIndicator_label']")
            .each(($el, index, $list) => {
                // $el is a wrapped jQuery element
                if ($el.attr('data-value') === "true") {
                    // wrap this element so we can
                    // use cypress commands on it
                    cy.log("Label elements data-value: " + $el.attr("data-value"))
                    cy.get($el).click()
                } else {
                    cy.log("This element is for non financial")
                }
            })



        cy.get("[id^='Page_4_rightButton_id']").click()

        cy.get('#page_05_applyingForhouseHold_label0').click()
        cy.get("[id^='Page_5_rightButton_id']").click()

        cy.get('#checkbox_page_06_hhm0_applyingForCoverageIndicator_label').click()
        cy.get("[id^='Page_6_rightButton_id']").click()

        cy.get("[id^='Page_9_rightButton_id']").click()
        cy.get("[id^='Page_10_rightButton_id']").click()

        cy.get('#page_11_gender_label1').click()
        cy.get('#page_11_socialSecurityCard_nameSameOnSSNCardIndicator_label0').click()
        cy.get("[id^='Page_11_rightButton_id']").click()

        cy.get('#page_12_citizenshipImmigrationStatus_citizenshipStatusIndicator_label0').click()
        cy.get('#page_12_citizenshipImmigrationStatus_naturalizedCitizenshipIndicator_label1').click()
        cy.get("[id^='Page_12_rightButton_id']").click()

        cy.get('#page_13_ethnicityAndRace_hispanicLatinoSpanishOriginIndicator_label1').click()
        cy.get('#checkbox_page_13_2106-3_label').click()
        cy.get("[id^='Page_13_rightButton_id']").click()

        cy.get('#page_14_hhm0__isMarried_label1').click()
        cy.get("[id^='Page_14_rightButton_id']").click()

        cy.get('#checkbox_page_16_noneOfTheAbove_label').click()
        cy.get("[id^='Page_16_rightButton_id']").click()

        cy.get('#page_17_hhm0_anyChanges_label1').click()
        cy.get('#checkbox_page_17_hhm0_isTaxFiler_label').click()
        cy.get("[id^='Page_17_rightButton_id']").click()

        cy.get('#checkbox_page_18_noneOfTheAbove_label').click()
        cy.get("[id^='Page_18_rightButton_id']").click()

        cy.get('#checkbox_page_19_noneOfTheAbove_label').click()
        cy.get("[id^='Page_19_rightButton_id']").click()

        cy.get('#checkbox_page_20_noneOfTheAbove_label').click()
        cy.get("[id^='Page_20_rightButton_id']").click()

        cy.get('#checkbox_page_21_noneOfTheAboveblindOrDisabled_label').click()
        cy.get('#checkbox_page_21_noneOfTheAbovelongTermCare_label').click()
        cy.get("[id^='Page_21_rightButton_id']").click()

        cy.log("Person1 age: " + cy.h.people[0].age)

        if(_.inRange(cy.h.people[0].age, 18, 25)) {
            cy.get('#checkbox_page_22_noneOfTheAbove_label').click()
            cy.get("[id^='Page_22_rightButton_id']").click()
        }
        if(_.inRange(cy.h.people[0].age, 18, 22)){
            cy.get('#checkbox_page_23_noneOfTheAbove_label').click()
            cy.get("[id^='Page_23_rightButton_id']").click()
        }

        cy.get("[id^='Page_24_rightButton_id']").click()
        cy.get("[id^='Page_25_rightButton_id']").click()

        cy.get('#page_26_isAnyIncome_label0').click()
        cy.get("[id^='Page_26_addIncomeSourceButton_id']").click().wait(300)
        cy.get('#page_26_type').select('JOB')
        cy.get('#page_26_sourceName').click()
        cy.get('#page_26_sourceName').type('McDonalds')
        cy.get('#page_26_amount').click()
        cy.get('#page_26_amount').type('10')
        cy.get('#page_26_frequency').select('HOURLY')
        cy.get('#page_26_cyclesPerFrequency').click()
        cy.get('#page_26_cyclesPerFrequency').type('35')
        cy.get('#modal-content > .gi-modal__footer > .grid-row > .grid-offset-4 > .gi-button__primary').click()
        cy.get("[id^='Page_26_rightButton_id']").click()

        cy.get('#page_28_isAnyDeduction_label1').click()
        cy.get("[id^='Page_28_rightButton_id']").click()

        cy.get('#page_29_annualTaxIncome_variableIncome_label0').click()
        cy.get("[id^='Page_29_rightButton_id']").click()

        cy.get("[id^='Page_30_rightButton_id']").click()
        cy.get("[id^='Page_31_rightButton_id']").click()
        cy.get("[id^='Page_32_rightButton_id']").click()
        cy.get("[id^='Page_33_rightButton_id']").click()

        cy.get('#page_34_healthCoverage_employerWillOfferInsuranceIndicator_label1').click()
        cy.get("[id^='Page_34_rightButton_id']").click()

        cy.get('#page_35_healthCoverage_stateHealthBenefit_label1').click()
        cy.get("[id^='Page_35_rightButton_id']").click()

        cy.get('#page_36_healthCoverage_unpaidBill_label0').click()
        cy.get("[id^='Page_36_rightButton_id']").click()

        cy.get("[id^='Page_37_rightButton_id']").click()
        cy.get("[id^='Page_38_rightButton_id']").click()
        cy.get("[id^='Page_39_rightButton_id']").click()

        cy.get('#checkbox_page_40_incarcerationAsAttestedIndicator_label').click()
        cy.get('#page_40_agreeToUseIncomeDetails_label0').click()
        cy.get('#checkbox_page_40_agreeToEndCoverage_label').click()
        cy.get('#checkbox_page_40_isReadyToReportForChanges_label').click()
        cy.get('#checkbox_page_40_isTruthful_label').click()
        cy.get('#page_40_signature').click()
        cy.get('.grid-container > .fade-in > .subsection > .grid-row > #page_40_signature').click()
        cy.get('.grid-container > .fade-in > .subsection > .grid-row > #page_40_signature').type(`${cy.h.people[0].firstName} ${cy.h.people[0].lastName}`)
        cy.get("[id^='Page_40_rightButton_id']").click()
    }
})

Cypress.Commands.add("confirmEvent", (qualifyEvent) => {

    //TODO: Similar to MN - refactor with sepConfirmEvent() ub member_portal_functions
    if (!qualifyEvent) qualifyEvent = cy.SEP_QUALIFYING_EVENTS.MARRIAGE
    cy.h.qualifyEvent = qualifyEvent
    cy.reload()
    cy.get('#further-action-btn').click()
    cy.wait(3000)
    cy.get('#qualifyEvent').select(qualifyEvent)
    cy.wait(3000)
    cy.get('#qualifyEventDate').type(Cypress.moment(cy.ServerTime.now).format('MM/DD/YYYY'))
    cy.wait(3000)
    cy.get('#qualifyEventDate').click()
    cy.wait(3000)
    cy.get('fieldset > .form-group > .span12 > .checkbox > #terms').click()
    cy.wait(3000)
    cy.get('#continueBtn').click()
    cy.wait(3000)
    cy.get('#changeEventDateSubmit').click().wait(3000)
})

Cypress.Commands.add("enrollMedicalAndDentalNV", (financial) => {

    cy.navigateTo('/mp')
   // cy.get('body > #root > div > #individual-portal > .grid-container').click()
    cy.get('#further-action-btn').click()
    cy.get('.form-horizontal > .gutter20 > strong > .pull-right > .btn').click()
    cy.get('#aid_uneg_shop_for_members').click().wait(3000)
    cy.url()
        .then(url => {
            url = url.replace(Cypress.config().baseUrl, "")
            url = url.replace("/__/private/setHousehold", "/hix/private/setHousehold")
            cy.visit(url)
        })
    cy.get('#skipButton').click()
    cy.get('[title="ADD"]').first().click()
    cy.wait(3000)
    cy.get('#aid-continueDentalPlan').click()
    cy.get('[title="ADD"]').first().click()
    cy.wait(3000)
    cy.get('#aid-continueCart_03').click()
    cy.get('#checkout').click()
    cy.get('#container-wrap > #container > #catch-all-light-box > .modal-footer > .btn-primary').click()
    cy.get('#ind-terms').click()
    if (cy.h.financial){
        cy.get('#taxFiler_esign').click()
    }
    cy.get('#applicant_esig').click()
    cy.get('#applicant_esig').type('a a')
    cy.get('#submitButton').click()
    cy.get('#rightpanel > #frmorderconfirm > .form-actions > .controls > .goto_dashboard_google_tracking').click()

})

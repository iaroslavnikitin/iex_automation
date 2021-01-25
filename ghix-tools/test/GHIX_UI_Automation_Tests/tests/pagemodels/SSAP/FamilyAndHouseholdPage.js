const locatorJson = require('../../../resources/selectors/common/SSAP/FamilyAndHouseHoldObject.json');
const prop = require('../../common.utils/PropertyReader');
const jsonUtil = require('../../common.utils/JsonUtil');
var state = prop.getEnvName();
const stateLocatorFile = require('../../../resources/selectors/exchange/' + state + '/SSAP/FamilyAndHouseHoldObject.json');
const browser = require('../../base/Browser.js');
const commomfunc = require('../SSAP/CommonSSAPFunction')
const global = require('../Global_include');
const constants = require('../../common.utils/Constants');
const assert = require('../../base/Assert');
const logger=require('../../common.utils/LoggerUtil');


class FamilyAndHouseholdPage {

    continueToGetReadyPage() {
        commomfunc.clickSaveAndContinueToNextPage("Get Ready", "");
        assert.assertElementContainsText(eval(locatorJson.getReady.navHeading), "Steps");

    }

    continuetoPersonalInformationPage(index) {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        var dataJson = global.updateDataJson.households[householdIndex]
        // if (state.toUpperCase() == 'ID') {
        //   commomfunc.clickSaveAndContinueToNextPage("Personal Information " + dataJson.applicants[index].firstName + " " + dataJson.applicants[index].lastName, "");
        // } else {
        commomfunc.clickSaveAndContinueToNextPage("Personal Information", "");
        // }
    };

    continueToGetReadyPage() {
        commomfunc.clickSaveAndContinueToNextPage("Marital Status", "");

    }

    continueToMilitaryServicePage() {
        commomfunc.clickSaveAndContinueToNextPage("Military Service", "");
    }

    continueToHouseholdInformationPage() {
        commomfunc.clickSaveAndContinueToNextPage("Household information", "");
    }

    continueToAmerIndianNdAlskNativeInfoPage() {
        commomfunc.clickSaveAndContinueToNextPage("American Indian\/Alaska Native", "");
    }

    continueToReviewAndSignPage() {
        commomfunc.clickSaveAndContinueToNextPage("Review and Sign", "");
    }

    continueToHouseholdSummaryPage() {
        commomfunc.clickSaveAndContinueToNextPage("Family and Household Summary", "");
    }

    continueToMedicaidChipDenialInfoPage() {
      //   if (state.toUpperCase() == 'PA') {
      //    commomfunc.clickSaveAndContinueToNextPage("Medicaid\/ CHIP Denial Information",""); 
      //  } else {
        commomfunc.clickSaveAndContinueToNextPage("Medicaid\/CHIP Denial Information", "");
     // }
    }

    continueToPregnancyInfoPage() {
        commomfunc.clickSaveAndContinueToNextPage("Pregnancy Information", "");
    }

    continueToDisabilityInfoPage() {
        commomfunc.clickSaveAndContinueToNextPage("Disability Information", "");
    }

    continueToFosterCareInfoPage() {
        commomfunc.clickSaveAndContinueToNextPage("Foster Care Information", "");
    }

    continueToFullTimeStudentInfoPage() {
        commomfunc.clickSaveAndContinueToNextPage("Full Time Student", "");
    }

    continueToEthnicityRaceInfoPage() {
        commomfunc.clickSaveAndContinueToNextPage("Ethnicity and Race", "");

    }

    continueToAdditionalInfoPage() {
        commomfunc.clickSaveAndContinueToNextPage("Additional Information", "");
    }

    continueToCitizenshipStatusInfoPage() {
        commomfunc.clickSaveAndContinueToNextPage("Citizenship/Immigration Status", "");
    }

    continueToCaretakerInfoPage() {
        commomfunc.clickSaveAndContinueToNextPage("Parent / Caretaker Information", "");
    }

    /*
    Personal Information Page
    */
    selectGender(index) {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        if (global.updateDataJson.households[householdIndex].applicants[index].gender.toUpperCase() == "MALE") {
            if (state.toUpperCase() == 'ID') {
                browser.click(eval(stateLocatorFile.personalInformation.rb_male_id));
            } else {
                browser.click(eval(locatorJson.personalInformation.rb_male_id));
            }
        } else {
            if (state.toUpperCase() == 'ID') {
                browser.click(eval(stateLocatorFile.personalInformation.rb_female_id));
            } else {
                browser.click(eval(locatorJson.personalInformation.rb_female_id));
            }
        }
    }

    selectSocialSecurityQuestion() {
        if (state.toUpperCase() == 'ID') {
            browser.click(eval(stateLocatorFile.personalInformation.rb_yesForSocialSecurity_id));
        } else {
            browser.click(eval(locatorJson.personalInformation.rb_yesForSocialSecurity_id));

        }
    }

    enterSocialSecurityNumber(index) {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        var dataJson = global.updateDataJson.households[householdIndex];
        if (state.toUpperCase() == 'ID') {
            browser.setValueInTextField(eval(stateLocatorFile.personalInformation.tb_socialSecurityNumber), dataJson.applicants[index].ssn);
        } else {
            browser.setValueInTextField(eval(locatorJson.personalInformation.tb_socialSecurityNumber), dataJson.applicants[index].ssn);
        }

    }

    selectSocialSecuritySameNameQuestion(index) {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        if (global.updateDataJson.households[householdIndex].applicants[index].sameNameOnSSN) {
            browser.click(eval(stateLocatorFile.personalInformation.rb_yesForSameNameOnSSN));
        } else {
            browser.click(eval(locatorJson.personalInformation.rb_noForSameNameOnSSN));
        }
    }


    fillPersonalInfoAndContinue(index) {
        browser.pauseBrowser(constants.PAUSE_BROWSER_500);
        this.selectGender(index)
        browser.pauseBrowser(constants.PAUSE_BROWSER_500);
        if (state.toUpperCase() == 'ID') {
            this.selectSocialSecurityQuestion()
            this.enterSocialSecurityNumber(index);
            commomfunc.clickSaveAndContinueinPersonalInformationPage();
            this.selectSocialSecuritySameNameQuestion(index);
        } else {
            this.enterSocialSecurityNumber(index);
            this.continuetoPersonalInformationPage(index);
            this.selectSocialSecurityQuestion();
        }

    }

    /*
     Citizenship and Immigration Status Page
     */
    selectCitizenshipInfo(index) {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        if (global.updateDataJson.households[householdIndex].applicants[index].immigration.isCitizen) {
            if (state.toUpperCase() == 'ID') {
                browser.waitForDisplayAndClick(eval(stateLocatorFile.citizenshipImmigrationStatus.rb_citizenYes));
            } else {
                browser.waitForDisplayAndClick(eval(locatorJson.citizenshipImmigrationStatus.rb_citizenYes));
            }
        } else {
            if (state.toUpperCase() == 'ID') {
                browser.waitForDisplayAndClick(eval(stateLocatorFile.citizenshipImmigrationStatus.rb_citizenNo));
            } else {
                browser.waitForDisplayAndClick(eval(locatorJson.citizenshipImmigrationStatus.rb_citizenNo));
            }
        }
    }

    selectNaturalizedCitizenInfo(index) {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        if (global.updateDataJson.households[householdIndex].applicants[index].immigration.isNaturalizedCitizen == false) {
            if (state.toUpperCase() == 'ID') {
                if (eval(stateLocatorFile.citizenshipImmigrationStatus.rb_natualCitizenNo).isDisplayed()) {
                    browser.click(eval(stateLocatorFile.citizenshipImmigrationStatus.rb_natualCitizenNo));
                }
            } else {
                browser.click(eval(locatorJson.citizenshipImmigrationStatus.rb_natualCitizenNo));
            }
        } else {
            browser.click(eval(locatorJson.citizenshipImmigrationStatus.rb_natualCitizenYes));
        }

    }

    fillCitizenImmigrationInfoAndContinue(index) {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        var dataJson = global.updateDataJson.households[householdIndex];
        browser.pauseBrowser(constants.PAUSE_BROWSER_500);
        this.selectCitizenshipInfo(index)
        browser.pauseBrowser(constants.PAUSE_BROWSER_500);
        this.selectNaturalizedCitizenInfo(index)
        browser.pauseBrowser(constants.PAUSE_BROWSER_500);
    }

    //Parent / Caretaker Information
    parentCaretakerInformation(index) {
        browser.pauseBrowser(constants.PAUSE_BROWSER_500);
        browser.waitForElementToDisplay(eval(locatorJson.parentCaretaker.rb_yes));
        browser.click(eval(locatorJson.parentCaretaker.rb_yes));
    }

    /*
    Ethinicity and Race Info Page
    */
    selectHispanicInfo(index) {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        if (global.updateDataJson.households[householdIndex].applicants[index].ethnicityRace.isHispanic == false) {
            commomfunc.clickSaveAndContinueToNextPage("Ethnicity and Race", "");
            browser.click(eval(locatorJson.ethnicityAndRace.rb_hispanicOriginNo));
        } else {
            commomfunc.clickSaveAndContinueToNextPage("Ethnicity and Race", "");
            browser.click(eval(locatorJson.ethnicityAndRace.rb_hispanicOriginYes));
        }
    }

    selectRaceInfo(index) {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        let raceValue = global.updateDataJson.households[householdIndex].applicants[index].ethnicityRace.race;
        console.log(" Race :", raceValue)
        if (!(jsonUtil.isFieldEmpty(raceValue))) {
            browser.click(eval(locatorJson.ethnicityAndRace.cb_race.replace("race", raceValue)));
            browser.pauseBrowser(5000)
        }
    }

    // Revisit for seperation
    fillEthinicityAndRaceInfoAndContinue(index) {
        browser.pauseBrowser(constants.PAUSE_BROWSER_500);
        this.selectHispanicInfo(index)
        browser.pauseBrowser(constants.PAUSE_BROWSER_500);
        this.selectRaceInfo(index);
    }

    // Revisit for seperation
    fillEthinicity(index) {
        browser.pauseBrowser(constants.PAUSE_BROWSER_500);
        this.selectHispanicInfo(index)
    }

    /*
    Marital Status Page
    */
    selectMaritalStatusInfo() {
        browser.pauseBrowser(constants.PAUSE_BROWSER_500);
        browser.click(eval(locatorJson.maritalStatus.rb_marriedNo));
        browser.pauseBrowser(constants.PAUSE_BROWSER_500);
    }


    /*
    Military Service Page
    */
    selectMilitaryServiceInfo() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        browser.pauseBrowser(constants.PAUSE_BROWSER_500);
        let militaryService = global.updateDataJson.households[householdIndex].militaryService;
        if (militaryService.length == 0) {
            browser.selectCheckBox(eval(locatorJson.militaryService.cb_noneOfAbove));
        } else {
            for (let i = 0; i < militaryService.length; i++) {
                let fullName = global.updateDataJson.households[householdIndex].applicants[militaryService[i]].firstName + " " + global.updateDataJson.households[householdIndex].applicants[militaryService[i]].lastName
                browser.click(eval(locatorJson.militaryService.cb_member.replace("memberName", fullName)));
            }
        }
        browser.pauseBrowser(constants.PAUSE_BROWSER_500);
    }

    /*
    Household Information Page
    */
    selectMakeAnyChangesInfo() {
        browser.pauseBrowser(constants.PAUSE_BROWSER_500);
        browser.click(eval(locatorJson.householdInformation.rb_makeChangesNo));
        browser.pauseBrowser(constants.PAUSE_BROWSER_2000);
    }

    selectTaxFilerInfo() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        let taxFilers = global.updateDataJson.households[householdIndex].incomeTax.taxFilers;
        browser.waitForElementToDisplay(eval(locatorJson.householdInformation.cb_noneOfAboveTaxFiler));
        if (taxFilers.length == 0) {
            browser.click(eval(locatorJson.householdInformation.cb_noneOfAboveTaxFiler));
        } else {
            for (let i = 0; i < taxFilers.length; i++) {
                if (taxFilers[i] == 0) {
                    browser.click(eval(locatorJson.householdInformation.cb_memberTaxFiler.replace("hhm0_", "")));
                } else {
                    browser.click(eval(locatorJson.householdInformation.cb_memberTaxFiler.replace("hhm0", "hhm" + i)));

                }
            }
            if (global.updateDataJson.households[householdIndex].applicants.length > 1) {
                this.jointFederalIncomeTaxInfo();
                this.primaryTaxFilingapplicant();
                this.taxFilerDependentsInfo();
            }
        }
        browser.pauseBrowser(constants.PAUSE_BROWSER_500);
    }

    verifyTaxFilerInfoSelected() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        let taxFilers = global.updateDataJson.households[householdIndex].incomeTax.taxFilers;
        browser.waitForElementToDisplay(eval(locatorJson.householdInformation.cb_noneOfAboveTaxFiler));

        for (let i = 0; i < taxFilers.length; i++) {
            if (taxFilers[i] == 0) {
                let isChecked = browser.getAttributeValue(eval(locatorJson.householdInformation.cb_memberTaxFiler.replace("hhm0_", "")), "data-value").toLowerCase();
                assert.assertEqual(isChecked, 'true');
            } else {
                let isChecked = browser.getAttributeValue(eval(locatorJson.householdInformation.cb_memberTaxFiler.replace("hhm0", "hhm" + i)), "data-value").toLowerCase();
                assert.assertEqual(isChecked, 'true');
            }
        }
    }

    jointFederalIncomeTaxInfo() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        if (global.updateDataJson.households[householdIndex].incomeTax.jointFilingIndicator == true) {
            browser.click(eval(locatorJson.householdInformation.rb_TaxFilingTogetherYes));
        } else browser.click(eval(locatorJson.householdInformation.rb_TaxFilingTogetherNo));
    }

    primaryTaxFilingapplicant() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        let primaryTaxFiler = global.updateDataJson.households[householdIndex].incomeTax.primaryTaxFilerPersonId;
        if (primaryTaxFiler == 0) {
            browser.click(eval(locatorJson.householdInformation.cb_isPrimaryTaxFiler.replace("hhm0_", "")));
        } else {
            browser.click(eval(locatorJson.householdInformation.cb_isPrimaryTaxFiler.replace("hhm0", "hhm" + primaryTaxFiler)));
        }
    }

    // taxFilerDependentsInfo() {
    //   let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
    //   if (global.updateDataJson.households[householdIndex].incomeTax.jointFilingIndicator == true) {
    //     browser.click(eval(locatorJson.householdInformation.cb_isDependent));
    //   } else {
    //     browser.click(eval(locatorJson.householdInformation.cb_isDependent.replace("2__1_2", "2_1")));
    //   }
    // }

    taxFilerDependentsInfo() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        if (global.updateDataJson.households[householdIndex].incomeTax.dependentToTaxFilers.length > 0) {
            console.log("*****Adding Dependent Information*****");
            if (global.updateDataJson.households[householdIndex].incomeTax.jointFilingIndicator == true) {
                browser.click(eval(locatorJson.householdInformation.cb_isDependent));
            } else {
                browser.click(eval(locatorJson.householdInformation.cb_isDependent.replace("2__1_2", "2_1")));
            }
        } else console.log("*****No Dependents*****");
    }

    /*
    American Indian/Alaska Native Page
    */
    selectAlaskanNativeInfo() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        browser.pauseBrowser(constants.PAUSE_BROWSER_500);
        let alaskaNative = global.updateDataJson.households[householdIndex].AmericanIndianOrAlaskaNative;
        if (alaskaNative.length == 0) {
            browser.selectCheckBox(eval(locatorJson.americanAlaskanNative.cb_noneOfAboveNative));
        } else {
            this.selectAlaskanStateAndTribeInfo();
        }

    }

  verifyAlaskanNativeInfoSelected() {
    let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
    browser.pauseBrowser(constants.PAUSE_BROWSER_500);
    let alaskaNative = global.updateDataJson.households[householdIndex].AmericanIndianOrAlaskaNative;
    if (alaskaNative.length == 0) {
        let isChecked = browser.getAttributeValue(eval(locatorJson.americanAlaskanNative.cb_noneOfAboveNative), "data-value").toLowerCase();
        assert.assertEqual(isChecked, 'true');
    } else {
      // TODO: code for Alaska Native here
        //verify AIAN information selected
        logger.log("Need to add code for AIAN");
    }

  }

    selectAlaskanStateAndTribeInfo() {
        browser.pauseBrowser(constants.PAUSE_BROWSER_500);
        browser.selectByIndex(eval(locatorJson.americanAlaskanNative.sb_state), 1);
        browser.selectByIndex(eval(locatorJson.americanAlaskanNative.sb_tribe), 1);
    }

    /*
    Medicaid/ CHIP Denial Information Page
    */
    selectMedicaidChipDenialInfo() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        var applicants = global.updateDataJson.households[householdIndex].applicants;
        let isMedicaidDenied = false;
        for (let i = 0; i < applicants.length; i++) {
            if (applicants[i].isDeniedMedicaid == true) {
                isMedicaidDenied = true;
                let fullName = applicants[i].firstName + " " + applicants[i].lastName
                browser.selectCheckBox(eval(locatorJson.medicaidChipDenial.cb_member.replace("memberName", fullName)));
            }
        }
        if (isMedicaidDenied == false) {
            browser.selectCheckBox(eval(locatorJson.medicaidChipDenial.cb_noneOfAboveMedicaidDenied));
        }
    }


    /*
    Pregnancy Information Page
    */
    selectPregnancyInfo() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        browser.pauseBrowser(constants.PAUSE_BROWSER_500);
        var applicants = global.updateDataJson.households[householdIndex].applicants;
        let isPregnant = false;
        for (let i = 0; i < applicants.length; i++) {
            if (applicants[i].isPregnant == true) {
                isPregnant = true;
                let fullName = applicants[i].firstName + " " + applicants[i].lastName
                browser.selectCheckBox(eval(locatorJson.pregnancy.cb_member.replace("memberName", fullName)));
            }
        }
        if (isPregnant == false) {
            browser.selectCheckBox(eval(locatorJson.pregnancy.cb_noneOfAbovePregnant));
        }

    }

    /*
    Disability Information Page
    */
    selectDisabilityInfo() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        var applicants = global.updateDataJson.households[householdIndex].applicants;
        let isDisabled = false;
        for (let i = 0; i < applicants.length; i++) {
            if (applicants[i].isDisabled == true) {
                isDisabled = true;
                let fullName = applicants[i].firstName + " " + applicants[i].lastName
                browser.selectCheckBox(eval(locatorJson.disability.cb_member.replace("memberName", fullName)));
            }
        }
        if (isDisabled == false) {
            browser.selectCheckBox(eval(locatorJson.disability.cb_noneOfAboveDisabled));
        }
    }

    verifyDisabilityInfoSelected() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        var applicants = global.updateDataJson.households[householdIndex].applicants;
        let isDisabled = false;
        for (let i = 0; i < applicants.length; i++) {
            if (applicants[i].isDisabled == true) {
                isDisabled = true;
                let fullName = applicants[i].firstName + " " + applicants[i].lastName

                let isChecked = browser.getAttributeValue(eval(locatorJson.disability.cb_member.replace("memberName", fullName)), "data-value").toLowerCase();
                assert.assertEqual(isChecked, 'true');
            }
        }
        if (isDisabled == false) {
            let isChecked = browser.getAttributeValue(eval(locatorJson.disability.cb_noneOfAboveDisabled), "data-value").toLowerCase();
            assert.assertEqual(isChecked, 'true');
        }
    }

    selectAssistedLivingInfo() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        var applicants = global.updateDataJson.households[householdIndex].applicants;
        let reqiredHelp = false;
        for (let i = 0; i < applicants.length; i++) {
            if (applicants[i].helpWithActivities == true) {
                reqiredHelp = true;
                let fullName = applicants[i].firstName + " " + applicants[i].lastName
                browser.selectCheckBox(eval(locatorJson.disability.cb_member.replace("memberName", fullName)));
            }
        }
        if (reqiredHelp == false) {
            browser.selectCheckBox(eval(locatorJson.disability.cb_noneOfAboveAssistedLiving));
        }
    }

    verifyAssistedLivingInfoSelected() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        var applicants = global.updateDataJson.households[householdIndex].applicants;
        let reqiredHelp = false;
        for (let i = 0; i < applicants.length; i++) {
            if (applicants[i].helpWithActivities == true) {
                reqiredHelp = true;
                let fullName = applicants[i].firstName + " " + applicants[i].lastName

                let isChecked = browser.getAttributeValue(eval(locatorJson.disability.cb_member.replace("memberName", fullName)), "data-value").toLowerCase();
                assert.assertEqual(isChecked, 'true');
            }
        }
        if (reqiredHelp == false) {
            let isChecked = browser.getAttributeValue(eval(locatorJson.disability.cb_noneOfAboveAssistedLiving), "data-value").toLowerCase();
            assert.assertEqual(isChecked, 'true');
        }
    }

    fillDisabilityInfoAndContinue() {
        browser.pauseBrowser(constants.PAUSE_BROWSER_500);
        this.selectDisabilityInfo()
        browser.pauseBrowser(constants.PAUSE_BROWSER_500);
        this.selectAssistedLivingInfo();
    }

    verifyDisabilityEntered() {
        browser.pauseBrowser(constants.PAUSE_BROWSER_500);
        this.verifyDisabilityInfoSelected()
        browser.pauseBrowser(constants.PAUSE_BROWSER_500);
        this.verifyAssistedLivingInfoSelected();
    }

    /*
    Foster Care Information Page
    */
    selectFosterCareInfo() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        browser.pauseBrowser(constants.PAUSE_BROWSER_500);
        var applicants = global.updateDataJson.households[householdIndex].applicants;
        let fosterCare = false;
        for (let i = 0; i < applicants.length; i++) {
            if (applicants[i].fosterCareIndicator == true) {
                fosterCare = true;
                let fullName = applicants[i].firstName + " " + applicants[i].lastName
                browser.selectCheckBox(eval(locatorJson.fosterCare.cb_member.replace("memberName", fullName)));
            }
        }
        if (fosterCare == false) {
            browser.selectCheckBox(eval(locatorJson.fosterCare.cb_noneOfAboveFosterCare));
        }

    }

    /*
    Full Time Student Page
    */
    selectFullTimeStudentInfo() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        browser.pauseBrowser(constants.PAUSE_BROWSER_500);
        var applicants = global.updateDataJson.households[householdIndex].applicants;
        let fullTimeStudent = false;
        for (let i = 0; i < applicants.length; i++) {
            if (applicants[i].isStudent == true) {
                fullTimeStudent = true;
                let fullName = applicants[i].firstName + " " + applicants[i].lastName
                browser.selectCheckBox(eval(locatorJson.fullTimeStudent.cb_member.replace("memberName", fullName)));
            }
        }
        if (fullTimeStudent == false) {
            browser.selectCheckBox(eval(locatorJson.fullTimeStudent.cb_noneOfAboveFullTime));
        }
    }

    /*
    Summary Page
    */

    clickContinueOnSummaryPage() {
        commomfunc.clickSaveAndContinueToNextPage("Summary", "");
        commomfunc.clickSaveAndContinueToNextPage("Get Ready", "");

    }

    enterPeronalAndHouseholdDetails() {
        this.continuetoPersonalInformationPage(0);

        this.fillPersonalInfoAndContinue(0);

        this.continueToCitizenshipStatusInfoPage();

        this.fillCitizenImmigrationInfoAndContinue(0);

        this.fillEthinicityAndRaceInfoAndContinue(0);

        this.continueToGetReadyPage()

        this.selectMaritalStatusInfo()
        //this.fillMaritalStatusInfoAndContinue();

        this.continueToMilitaryServicePage();

        this.selectMilitaryServiceInfo();
        //this.fillMilitaryServiceAndContinue();

        this.continueToHouseholdInformationPage();

        this.selectMakeAnyChangesInfo();
        this.selectTaxFilerInfo();
        //this.fillHouseholdInfoAndContinue();

        this.continueToAmerIndianNdAlskNativeInfoPage();

        this.selectAlaskanNativeInfo();
        //this.fillAlaskaNativeInfoAndContinue();

        this.continueToMedicaidChipDenialInfoPage();

        this.selectMedicaidChipDenialInfo();
        //this.fillMedicaidChipDenialInfoAndContinue();

        this.continueToPregnancyInfoPage();

        this.selectPregnancyInfo();
        //this.fillPregnancyInfoAndContinue();

        this.continueToDisabilityInfoPage();

        this.fillDisabilityInfoAndContinue();

        browser.pauseBrowser(constants.PAUSE_BROWSER_2000);

        this.clickContinueOnSummaryPage();

    }


    //deprecated below function. please use the updated functions instead
    /*
      //deprecated below function. replace with this function -->selectMaritalStatusInfo()
      fillMaritalStatusInfoAndContinue() {
        browser.pauseBrowser(constants.PAUSE_BROWSER_500);
        this.selectMaritalStatusInfo()
        browser.pauseBrowser(constants.PAUSE_BROWSER_500);
        // commomfunc.clickSaveAndContinueToNextPage("Military Service","");
      }

    //deprecated below function. replace with this function -->selectMilitaryServiceInfo()
      fillMilitaryServiceAndContinue() {
        //commomfunc.clickSaveAndContinueToNextPage("Military Service", "");
        browser.pauseBrowser(constants.PAUSE_BROWSER_500);
        this.selectMilitaryServiceInfo()
        browser.pauseBrowser(constants.PAUSE_BROWSER_500);
        //commomfunc.clickSaveAndContinueToNextPage("Household information", "");
      }

      //deprecated below function. replace with this function -->selectAlaskanNativeInfo()
      fillAlaskaNativeInfoAndContinue() {
        //Cosmetic Bug in PA(Extra Space)
        //if (state.toUpperCase() == 'PA') {
         //this.selectAlaskanNativeInfo()
         //commomfunc.clickSaveAndContinueToNextPage("Medicaid\/ CHIP Denial Information","");
     //  }else
       if (state.toUpperCase() == 'ID') {
        commomfunc.clickSaveAndContinueToNextPage("Family and Household Summary", "");
      } else {
        this.selectAlaskanNativeInfo()
        commomfunc.clickSaveAndContinueToNextPage("Medicaid\/CHIP Denial Information", "");
      }
    }

    //deprecated below function. replace with this function -->selectMakeAnyChangesInfo()
    fillHouseholdInfoAndContinue() {
      if (state.toUpperCase() != 'ID') {
        browser.pauseBrowser(constants.PAUSE_BROWSER_500);
        this.selectMakeAnyChangesInfo()
        this.selectTaxFilerInfo()
        browser.pauseBrowser(constants.PAUSE_BROWSER_500);
        commomfunc.clickSaveAndContinueToNextPage("American Indian\/Alaska Native", "");
      } else {
        commomfunc.clickSaveAndContinueToNextPage("Review and Sign", "");
      }

    }
    //deprecated below function. replace with this function -->selectMilitaryServiceInfo(),selectTaxFilerInfo();
    fillMedicaidChipDenialInfoAndContinue() {
      this.selectMedicaidChipDenialInfo()

    }

    //deprecated below function. replace with this function -->selectPregnancyInfo()
    fillPregnancyInfoAndContinue() {
      this.selectPregnancyInfo()
      commomfunc.clickSaveAndContinueToNextPage("Disability Information", "");
    }

    //deprecated below function. replace with this function -->selectFosterCareInfo()
    fillFosterCareInfoAndContinue() {
      // this.selectFosterCareInfo()
    }

    //deprecated below function. replace with this function -->selectFullTimeStudentInfo()
    fillFullTimeStudentInfoAndContinue() {
      this.selectFullTimeStudentInfo();
    }
    */
}

module.exports = new FamilyAndHouseholdPage();

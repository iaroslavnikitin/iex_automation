var locatorJson = require('../../../resources/selectors/common/SSAP/StartYourApplicationPageObject.json');
var stateData = require('../../../resources/data/states.json');
const prop = require('../../common.utils/PropertyReader');
const constants = require('../../common.utils/Constants');
var state = prop.getEnvName();
var stateLocatorFile = require('../../../resources/selectors/exchange/' + state + '/SSAP/StartYourApplicationPageObject.json');
var global = require('../../pagemodels/Global_include');
const browser = require('../../base/Browser');
const assert = require('../../base/Assert');
const commomfunc = require('../SSAP/CommonSSAPFunction')
const  dataUtil = require('../../common.utils/DataUtil');
const logger=require('../../common.utils/LoggerUtil');
const commomLocator = require('../../../resources/selectors/common/SSAP/CommonObject.json')




class StartYourApplication {
    //  dataJson = global.updateDataJson.households[householdIndex]
    //Before We Begin Page    
    clickPrivacyCheckBox() {
        if (state.toUpperCase() == 'ID') {
            browser.click(eval(stateLocatorFile.cb_acceptanceCB));
        }
        else {
            browser.click(eval(locatorJson.beforeWeBegin.cb_acceptPrivacyIndicator));

        }
    }

    verifyPrivacyCheckBoxChecked() {
        if (state.toUpperCase() == 'ID') {
            let isChecked = browser.getAttributeValue(eval(stateLocatorFile.cb_acceptanceCB),"data-value").toLowerCase();
            assert.assertEqual(isChecked, 'true');
        }
        else {
            let isChecked = browser.getAttributeValue(eval(locatorJson.beforeWeBegin.cb_acceptPrivacyIndicator),"data-value").toLowerCase();
            assert.assertEqual(isChecked, 'true');
        }
    }
    continueToGetReadyPage() {
        // if (state.toUpperCase() == 'ID') {
        //     commomfunc.clickSaveAndContinueToNextPage("Get Ready to Start Your Application", "");
        // }
        // else {
            commomfunc.clickSaveAndContinueToNextPage("Get Ready", "");
       // }
    }

    continueToGetReadyForFamilyAndHousHold() {
        commomfunc.clickSaveAndContinueToNextPage("Get Ready for Family and Household", "");
    }

    //Get Ready Page

    continueToPrimaryContactInformationPage() {

        commomfunc.clickSaveAndContinueToNextPage("Primary Contact Information", "");


    }

    //Primary Contact Information Page
    enterPrimaryContactAddress() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        var dataJson = global.updateDataJson.households[householdIndex];
        logger.log("****Enter Primary Contact Home Address");
        if (state.toUpperCase() != 'ID') {
        let array = {
            tb_Address1: dataJson.primaryAddress.home.addressLine1,
            tb_city: dataJson.primaryAddress.home.city,
            tb_zipCode: dataJson.primaryAddress.home.zip,
            sb_state: dataJson.primaryAddress.home.state,
            sb_county: 1,
        }

        dataUtil.doFormFill(stateLocatorFile, array)
    }
    }
    enterMailingAddress() {
        logger.log("****Enter Mailing Address");
        let array = {
            tb_Address1: dataJson.primaryAddress.mailing.addressLine1,
            tb_city: dataJson.primaryAddress.mailing.city,
            tb_zipCode: dataJson.primaryAddress.mailing.zip,
            sb_state: dataJson.primaryAddress.mailing.state,
            sb_county: 1,
        }

        dataUtil.doFormFill(stateLocatorFile, array)
    }

    checkIfMailingAddressIsSame() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        var dataJson = global.updateDataJson.households[householdIndex]
        if (dataJson.primaryAddress.mailing.mailingAddSameAsHomeIndicator) {
            logger.log("****click same as mailing address")
            browser.pauseBrowser(constants.INTERVAL);
            if (state.toUpperCase() == 'ID') {
                browser.click(eval(stateLocatorFile.cb_samePrimaryContactHomeAddress));
            } else {
                browser.click(eval(locatorJson.primaryContactInformation.cb_samePrimaryContactHomeAddress));

            }

        }else{
            this.enterMailingAddress();
        }
    }

    selectEmailMe() {
        let isTextMeCheckedbrowser = browser.getAttributeValue(eval(locatorJson.primaryContactInformation.cb_emailMe),"data-value");
        if (isTextMeCheckedbrowser != 'true') {
            browser.click(eval(locatorJson.primaryContactInformation.cb_emailMe));
        }
    }

    verifyMailingAddressIsSameChecked() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        var dataJson = global.updateDataJson.households[householdIndex]
        if (dataJson.primaryAddress.mailing.mailingAddSameAsHomeIndicator) {
            logger.log("****click same as mailing address")
            browser.pauseBrowser(constants.INTERVAL);

            if (state.toUpperCase() == 'ID') {
                let isChecked = browser.getAttributeValue(eval(stateLocatorFile.cb_samePrimaryContactHomeAddress),"data-value").toLowerCase();
                assert.assertEqual(isChecked, 'true');
            }
            else {
                let isChecked = browser.getAttributeValue(eval(locatorJson.primaryContactInformation.cb_samePrimaryContactHomeAddress),"data-value").toLowerCase();
                assert.assertEqual(isChecked, 'true');
            }
        }else{
            this.enterMailingAddress();
        }
    }

    verifyPrimaryContactInfoAutoFill() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        var dataJson = global.updateDataJson.households[householdIndex];
        this.verifyPrimaryContactNameAutoFill(dataJson);
        this.verifyPrimaryContactHomeAddressInfoAutoFill(dataJson);
        this.verifyPrimaryContactMailingAddress(dataJson);
        this.verifyPrimaryContactPhoneAutoFill(dataJson);
        this.verifyPrimaryContactPreferencesAutoFill(dataJson);
    }

    verifyPrimaryContactNameAutoFill(dataJson) {
      let dobArray = dataJson.applicants[0].dateOfBirth.split("/")
        logger.log("****Verify Primary Contact Name Fields Auto Population");
        var primaryContactNameArray = {
            [locatorJson.primaryContactInformation.tb_firstName]: dataJson.applicants[0].firstName,
            [locatorJson.primaryContactInformation.tb_lastName]: dataJson.applicants[0].lastName,
            [locatorJson.primaryContactInformation.tb_dob1]: dobArray[0],
            [locatorJson.primaryContactInformation.tb_dob2]: dobArray[1],
            [locatorJson.primaryContactInformation.tb_dob3]: dobArray[2],
            [locatorJson.primaryContactInformation.tb_emailAdd]: dataJson.applicants[0].email.toLowerCase(),
        }
        assert.assertValueEquals(primaryContactNameArray);
        logger.log(">>>> Verified Primary Contact Name Fields Auto Population");
    };
    verifyPrimaryContactHomeAddressInfoAutoFill(dataJson) {
        logger.log("****Verify Primary Contact Home Address Fields Auto Population");
        var primaryContactHomeArr = {
            [locatorJson.primaryContactInformation.tb_homeAddress1]: dataJson.primaryAddress.home.addressLine1,
            [locatorJson.primaryContactInformation.tb_homeCity]: dataJson.primaryAddress.home.city,
            [locatorJson.primaryContactInformation.tb_homePostalCode]: dataJson.primaryAddress.home.zip,
            [locatorJson.primaryContactInformation.tb_homeState]: stateData[dataJson.primaryAddress.home.state]
           }
        assert.assertValueEquals(primaryContactHomeArr);
        assert.assertElementContainsText(eval(locatorJson.primaryContactInformation.tb_homeCounty),dataJson.primaryAddress.home.county);
        logger.log(">>>> Verified Primary Contact Home Address Fields Auto Population");
    };
    verifyPrimaryContactMailingAddress(dataJson) {
        logger.log("****Verify Primary Contact Mailing Address Fields Auto Population");
        var primaryContactMailaddressArr = {
            [locatorJson.primaryContactInformation.tb_mailAddress1]: dataJson.primaryAddress.mailing.addressLine1,
            [locatorJson.primaryContactInformation.tb_mailCity]: dataJson.primaryAddress.mailing.city,
            [locatorJson.primaryContactInformation.tb_mailPostalCode]: dataJson.primaryAddress.mailing.zip,
            [locatorJson.primaryContactInformation.tb_mailState]: stateData[dataJson.primaryAddress.mailing.state]
               }
        assert.assertValueEquals(primaryContactMailaddressArr);
        assert.assertElementContainsText(eval(locatorJson.primaryContactInformation.tb_mailCounty),dataJson.primaryAddress.mailing.county);
        
        logger.log(">>>> Verified Primary Contact Mailing Address Fields Auto Population");
    };
    verifyPrimaryContactPhoneAutoFill(dataJson) {
        logger.log("****Verify Primary Contact Phone Fields Auto Population");
        var phoneArr= dataJson.primaryContactPhone.mobile.split("-")
       
        var primaryContactPhoneArr = {
            [locatorJson.primaryContactInformation.tb_phone_phoneNumber]: "("+phoneArr[0]+") "+phoneArr[1]+"-"+phoneArr[2]
        }
        assert.assertValueEquals(primaryContactPhoneArr);
        logger.log(">>>> Verified Primary Contact Phone Fields Auto Population");
    };
    verifyPrimaryContactPreferencesAutoFill(dataJson) {
        logger.log("****Verify Primary Contact Preferences Fields Auto Population");
        var primaryContactPrefArr = {
            [locatorJson.primaryContactInformation.sb_spokenLanguage]: dataJson.primaryContactPref.spokenLang,
            [locatorJson.primaryContactInformation.sb_writtenLanguage]: dataJson.primaryContactPref.writtenLang
        }
        assert.assertValueEquals(primaryContactPrefArr);
        logger.log(">>>> Verified Primary Contact Preferences Fields Auto Population");
    };

    continueToHelpApplyingForCoverage() {
        // if (state.toUpperCase() == 'ID') {
        //     commomfunc.clickSaveAndContinueToNextPage("Application Assistance", "");
        // }
        // else {
            commomfunc.clickSaveAndContinueToNextPage("Help applying for coverage", "");
       // }
    }

    //Help applying for Coverage
    selectWhoIsHelpingYou() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        var dataJson = global.updateDataJson.households[householdIndex]
        browser.pauseBrowser(constants.INTERVAL);
        if (dataJson.startYourApplication.getHelpApplyingIndicator==false) {
            logger.log("****I am filling for my family")
            browser.pauseBrowser(constants.PAUSE_BROWSER_3000);
            if(state.toUpperCase()=='ID'){
            browser.waitForElementToDisplay(eval(stateLocatorFile.rb_fillingOutForMyselfAndFamily));
            browser.click(eval(stateLocatorFile.rb_fillingOutForMyselfAndFamily));
            }
            else{
                browser.waitForElementToDisplay(eval(locatorJson.helpApplyingForCoverage.rb_fillingOutForMyselfAndFamily));
                browser.click(eval(locatorJson.helpApplyingForCoverage.rb_fillingOutForMyselfAndFamily)); 
            }
        }
        else {
             browser.click(eval(locatorJson.helpApplyingForCoverage.rb_someoneIsHelpingMe));
        }

    }
    continueToHelpForPayingForCoverage() {
        if (state.toUpperCase() == 'ID') {
            commomfunc.clickSaveAndContinueToNextPage("Applicants", "");
        }
        else {
            commomfunc.clickSaveAndContinueToNextPage("Help Paying for Coverage", "");

        }
    }
    //Help Paying for Coverage
    getHelpForPayingForCoverage() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        var dataJson = global.updateDataJson.households[householdIndex];
        browser.pauseBrowser(constants.INTERVAL);
        if (dataJson.isFinancial==true) {
            logger.log("****I will provide income Information")
            if (state.toUpperCase() == 'ID') {
                browser.click(eval(stateLocatorFile.rb_provideIncomeInformation));
            }
            else {
                browser.waitForElementToDisplay(eval(locatorJson.helpPayingForCoverage.rb_provideIncomeInformation));
                browser.click(eval(locatorJson.helpPayingForCoverage.rb_provideIncomeInformation));

            }
        }
        else {
            browser.waitForElementToDisplay(eval(locatorJson.helpPayingForCoverage.rb_payFullCoverage));
            browser.click(eval(locatorJson.helpPayingForCoverage.rb_payFullCoverage));
        }
    }
    continueToAboutYourHouseholdPage() {
        commomfunc.clickSaveAndContinueToNextPage("About Your Household", "");
    }
    continueToHouseholdRelationPage() {
        commomfunc.clickSaveAndContinueToNextPage("Household Relationship", "");
    }
    continueToHouseholdAddressPage() {
        commomfunc.clickSaveAndContinueToNextPage("Household Addresses", "");
        
    }
    //About Your Household
    verifyHousHoldAutoFillFields(){
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        var dataJson = global.updateDataJson.households[householdIndex]
        let dobArray = dataJson.applicants[0].dateOfBirth.split("/")
    var houseHoldData = {
        [locatorJson.aboutYourHousehold.tb_firstNameAuto]: dataJson.applicants[0].firstName,
        [locatorJson.aboutYourHousehold.tb_lastNameAuto]: dataJson.applicants[0].lastName,
        [locatorJson.aboutYourHousehold.tb_dobOne]: dobArray[0],
        [locatorJson.aboutYourHousehold.tb_dobTwo]: dobArray[1],
        [locatorJson.aboutYourHousehold.tb_dobThree]: dobArray[2]
        }
    assert.assertValueEquals(houseHoldData);
    logger.log(">>>> Verified 'About Your Household' Page Fields Auto Population");
    }
    clickSeekingCoverage(index) {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        browser.pauseBrowser(constants.INTERVAL);
       let isSeekingCoverage = global.updateDataJson.households[householdIndex].applicants[index].seekingCoverage
        if (state.toUpperCase() == 'ID') {
            browser.pauseBrowser(constants.INTERVAL);
            browser.click(eval(stateLocatorFile.rb_seekingCoverage));
        } else {
            let seekCoverage;
            if (index == 0) {
                if (isSeekingCoverage) { seekCoverage = eval(locatorJson.aboutYourHousehold.rb_seekingCoverage.replace("hhm0_", "")) }
                else { seekCoverage = eval(locatorJson.aboutYourHousehold.rb_notSeekingCoverage.replace("hhm0_", "")) }
            } else {
                if (isSeekingCoverage) { seekCoverage = eval(locatorJson.aboutYourHousehold.rb_seekingCoverage.replace("hhm0", "hhm" + index)) }
                else { seekCoverage = eval(locatorJson.aboutYourHousehold.rb_notSeekingCoverage.replace("hhm0", "hhm" + index)) }
            }
            browser.waitForElementToDisplay(seekCoverage);
            browser.click(seekCoverage);
        }
    }

    clickAddPerson() {
        browser.click(eval(locatorJson.aboutYourHousehold.btn_addPerson));
    }
    aboutHousHold() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        var dataJson = global.updateDataJson.households[householdIndex]
        for (let index = 0; index < dataJson.applicants.length; index++) {
            if (index == 0) {
                this.clickSeekingCoverage(index);
            } else {
                this.clickAddPerson();
                this.enterApplicantInformation(index);
            }
        }
        //Deprecated
       // if (dataJson.applicants.length > 1) {
       //     this.continueToHouseholdRelationPage();
        //    this.selectHouseHoldRelationShip();
       //     this.selectWhereHouseholdMemberLives();
        //}

    }

    enterApplicantInformation(index) {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        var dataJson = global.updateDataJson.households[householdIndex]
        this.clickSeekingCoverage(index);
        let hhm = "hhm" + index;
        var dobArr = dataJson.applicants[index].dateOfBirth.split("/");
        browser.setValueInTextField(eval(locatorJson.aboutYourHousehold.tb_firstName.replace("hhm0", hhm)), dataJson.applicants[index].firstName)
        browser.setValueInTextField(eval(locatorJson.aboutYourHousehold.tb_lastName.replace("hhm0", hhm)), dataJson.applicants[index].lastName)
        browser.setValueInTextField(eval(locatorJson.aboutYourHousehold.tb_dobOne.replace("hhm0", hhm)), dobArr[0])
        browser.setValueInTextField(eval(locatorJson.aboutYourHousehold.tb_dobTwo.replace("hhm0", hhm)), dobArr[1])
        browser.setValueInTextField(eval(locatorJson.aboutYourHousehold.tb_dobThree.replace("hhm0", hhm)), dobArr[2])

    }
    selectHouseHoldRelationShip() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        let count = 0;
        let applicantsSize = parseInt(global.updateDataJson.households[householdIndex].applicants.length);
        //applicants loop
        for (let index = 0; index < applicantsSize - 1; index++) {
            let member_A_Relation = global.updateDataJson.households[householdIndex].applicants[index].relation;
            // self
            //relationship loop
            for (let i = index + 1; i < applicantsSize; i++) {
                let member_B_Relation = global.updateDataJson.households[householdIndex].applicants[i].relation;
                //spouse                                            //self spouse
                let relationShipToApplicant = this.getRelationship(member_A_Relation, member_B_Relation);
                logger.log("Applicant Relationship To Member : ", relationShipToApplicant);
                browser.pauseBrowser(constants.INTERVAL);
                browser.selectByVisibleText(eval(locatorJson.householdRelationship.sb_household), relationShipToApplicant);
                count++;
            }
        }
        this.continueToHouseholdAddressPage();
    }

     /*
     getRelationship Function takes two members relationship type as input arguments  
     And returns the relationship between those two members
     The member relationship type is retrived from data Json file
     
     Example: Applicant(SELF), Member1(Spouse), Member2(Child)
     If we have three members in one application then we have to define the relationship like below
     Applicant To Member1   --> Spouse // input: getRelationship("SELF","Spouse") --> output:"Spouse"
     Applicant To Member2  --> Parent //  input: getRelationship("SELF","Child") --> output:"Parent"
     Member1 To Member2  --> Parent // input: getRelationship("Spouse","Child") --> output:"Parent"
*/
    getRelationship(member_A_Relation, member_B_Relation) {
        var constant
      if(state=='NJ'){constant  = constants.RELATIONSHIP_NJ}
        else{constant  = constants.RELATIONSHIP_NV}
      let relationship;
      if (member_A_Relation == "SELF") {
        switch (member_B_Relation) {
            
            case "Spouse": relationship = constant.SPOUSE; break;
            case "Child": relationship = constant.PARENT; break;
            case "Domestic Partner": relationship = constant.DOMESTIC_PARTNER; break;
            case "Grandchild": relationship = constant.GRAND_PARENT; break;
            case "Stepchild": relationship = constant.STEP_PARENT; break;
            case "Child-Ward": relationship = constant.PARENT; break;
            case "Stepparent": relationship = constant.STEP_CHILD; break;
            case "Uncle or Aunt": relationship = constant.NEPHEW_OR_NIECE; break;
            case "Son-in-law or Daughter-in-law": relationship = constant.MOTHER_IN_LAW_OR_FATHER_IN_LAW; break;
            case "Nephew or Niece": relationship = constant.UNCLE_AUNT; break;
            default: console.log("*****ERROR: Not a Valid Relationship Value");

        }
    }
    else if (member_A_Relation == "Child" && member_B_Relation != "Child") {
        switch (member_B_Relation) {
            case "Domestic Partner": relationship = constant.PARENTS_DOMESTIC_PARTNER; break;
            case "Grand-Child": relationship = constant.PARENT; break;
            case "Son-in-law or Daughter-in-law": relationship = constant.BROTHER_IN_LAW_OR_SISTER_IN_LAW; break;
            case "Nephew or Niece": relationship =constant.BROTHER_IN_LAW_OR_SISTER_IN_LAW; break;
            case "Stepchild": relationship = constant.FIRST_COUSIN; break;
            default: console.log("*****ERROR: Not a Valid Relationship Value");
        }
    }
    else if (member_B_Relation == "Child") {
        switch (member_A_Relation) {
            case "Stepchild": relationship = constant.SIBLING; break;
            case "Son-in-law or Daughter-in-law": relationship = constant.BROTHER_IN_LAW_OR_SISTER_IN_LAW; break;
            case "Child": relationship = constant.SIBLING; break;
            case "Spouse": relationship = constant.PARENT; break;
            case "Domestic Partner": relationship = constant.PARENT; break;
            case "Nephew or Niece": relationship = constant.BROTHER_IN_LAW_OR_SISTER_IN_LAW; break;
            default: console.log("*****ERROR: Not a Valid Relationship Value in side Switch");
        }
    }
    else if (member_A_Relation == "Child-Ward" && member_B_Relation == "Domestic Partner") {
        relationship = constant.WARD
    }
    else if (member_A_Relation == "Domestic Partner" && member_B_Relation == "Child-Ward") {
        relationship = constant.COURT_APPOINTED_GUARDIAN
    }
    else if (member_A_Relation == "Son-in-law or Daughter-in-law" && member_B_Relation == "Nephew or Niece") {
        relationship = constant.FIRST_COUSIN
    } else {
        console.log("*****ERROR: Not a Valid Relationship Value");
    }
    return relationship;

}
   


    //Household Addresses
    selectWhereHouseholdMemberLives() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        var applicants = global.updateDataJson.households[householdIndex].applicants;
        let sameAddress =true;
        for(let i=0; i<applicants.length;i++){
            if(applicants[i].sameAsApplicantAddress==false){
                sameAddress=false;
                let fullName = applicants[i].firstName+ " "+applicants[i].lastName
                browser.click(eval(locatorJson.householdAddress.cb_member.replace("memberName",fullName)));
                }        
            }
            if(sameAddress){ browser.click(eval(locatorJson.householdAddress.cb_NoneOfTheAbove));}
    }

    continueToSummaryPage() {
        browser.pauseBrowser(constants.PAUSE_BROWSER_2000);
        // if (state.toUpperCase() == 'ID') {
        //     commomfunc.clickSaveAndContinueToNextPage("Household Summary", "");
        // } else {
            commomfunc.clickSaveAndContinueToNextPage("Summary", "");
       // }


    }

    clickOkOnMedicarePopUp()
    { 
    browser.click(eval(commomLocator.btn_saveAndContinue))
    logger.log("****Medicare Information pop up");
    browser.pauseBrowser(5000);
    browser.click(eval(locatorJson.medicarePopup.btn_ok));
    logger.log("****OK button clicked on pop up");
    }

    enterApplicationDetails() {
        this.clickPrivacyCheckBox();
        logger.log("****continue to get ready page");
        this.continueToGetReadyPage();
        logger.log("****continue To Primary Contact And Information Page");
        this.continueToPrimaryContactInformationPage();
        this.checkIfMailingAddressIsSame();
        this.continueToHelpApplyingForCoverage();
        this.selectWhoIsHelpingYou();
        this.continueToHelpForPayingForCoverage();
        this.getHelpForPayingForCoverage();
        this.continueToAboutYourHouseholdPage();
        // this.clickSeekingCoverage(0);
        this.aboutHousHold();
        this.continueToSummaryPage();
        this.continueToGetReadyPage();
    }

}

module.exports = new StartYourApplication();
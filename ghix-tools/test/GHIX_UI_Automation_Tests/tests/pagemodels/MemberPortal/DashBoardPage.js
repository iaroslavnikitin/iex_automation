const state = stateProfile;
const confirmEventModel = require('./ConfirmEventPage')

const stateLocatorFile = require('../../../resources/selectors/exchange/' + state + '/MemberPortal/DashBoardObject.json');
const locator = require('../../../resources/selectors/common/MemberPortal/DashBoardObject.json');
const confirmEventLocator = require('../../../resources/selectors/common/MemberPortal/ConfirmEventPage.object.json');
const commConfirmEventContent = require('../../../resources/content/common/MemberPortal/ConfirmEventPage.content.js');
const stateConfirmEventContent = require('../../../resources/content/exchange/' + state + '/MemberPortal/ConfirmEventPage.content.js');
const documentVerificationLocator = require('../../../resources/selectors/common/MemberPortal/DocumentVerificationDashboardPage.object.json');
const documentVerificationContent = require('../../../resources/content/common/MemberPortal/DocumentVerificationDashboardPage.content.js');
const documentVerificationModel = require('./DocumentVerificationDashboardPage.js');
const pageHeaderModel = require('../CommonPageFunctions/PageHeader.js');

const additionalInfoLocator = require('../../../resources/selectors/common/MemberPortal/AdditionalInformationPage.object.json');
const additionalInfoContent = require('../../../resources/content/common/MemberPortal/AdditionalInformationPage.content.js');
const reviewAndSignPage = require('../../../tests/pagemodels/SSAP/ReviewAndSignPage')
const jsonUtil = require('../../common.utils/JsonUtil');
const eligibilityLocator = require('../../../resources/selectors/common/MemberPortal/EligibilityPageObjects.json');
const content = require('../../../resources/content/common/MemberPortal/DashBoard.content');
const stateContent = require('../../../resources/content/exchange/' + state + '/MemberPortal/DashBoard.content');
const browser = require('../../base/Browser');
const global = require('../Global_include');
const assert = require('../../base/Assert');
const dbQueries = require('../SSAP/SSAPDatabaseQueries');
const dataUtil = require('../../common.utils/DataUtil');
const constants = require('../../common.utils/Constants');
const commonConfig = require('../../common.utils/CommonConfig');

var applicationYear = year;
const logger = require('../../common.utils/LoggerUtil');

class DashBoardPage {
    //remove this block
    verifyDashboard() {
        logger.log("***** Verify Dashboard of Individual *****");
        assert.assertElementContainsText(locator.dashboardTitle, "Welcome");
    }

    clickStartApplication() {
        browser.pauseBrowser(constants.PAUSE_BROWSER_5000);
        this.selectYearTab();
        browser.click(eval(locator.nextSteps.btn_furtherAction));
        // if (state.toUpperCase() == 'ID') {
        //     this.reportLifeEventndShop();
        //     browser.click(eval(locator.nextSteps.btn_furtherAction));
        // }
    }
   
    selectYearTab() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        let yearofAppln = global.updateDataJson.households[householdIndex].applicationYear;
        browser.pauseBrowser(constants.PAUSE_BROWSER_5000);
        console.log("***** Clicking Year Tab " + yearofAppln + "*****")
        if (state == "ID") {
            browser.scrollToViewAndClick(eval(stateLocatorFile.yearTab.replace("year", yearofAppln)));
        } else {
            browser.scrollToViewAndClick(eval(locator.yearTab.replace("year", yearofAppln)));
        }
    }
    clickAppyWithoutCostSavings() {
        browser.click(eval(stateLocatorFile.btn_applyWithoutCost));

    }
    reportLifeEventndShop() {
        browser.click(eval(stateLocatorFile.btn_nativeAmerican));
        browser.click(eval(stateLocatorFile.btn_continue));
    }
    // remove this function and use clickshopplansondashbboard func   
    clickshopForPlans() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        logger.log("Clicking Shop For Plans");
        browser.pauseBrowser(constants.PAUSE_BROWSER_4000);
        this.selectYearTab();
        browser.click(eval(locator.nextSteps.btn_furtherAction));

        if (global.updateDataJson.households[householdIndex].applicationType.toUpperCase() === "QEP") {
            reviewAndSignPage.qualifyingEventDetails(global.updateDataJson.households[householdIndex].qualifyingEvent);
            browser.pauseBrowser(constants.PAUSE_BROWSER_4000);
            this.selectYearTab();
            browser.click(eval(locator.nextSteps.btn_furtherAction));
        }
        browser.waitForElementToDisplay(eval(locator.nextSteps.btn_saveAndContinue));
    }



/*Author: Monica Thaneer*/
clickShopPlansOnDashboard(){
    console.log("***** Clicking Shop Health Plans *****");
    this.selectYearTab();

    browser.click(eval(locator.nextSteps.btn_furtherAction)) ;
    if(state ==constants.STATE_ID){
        browser.waitForPageToLoadAndCheckPartialHeaderText(eval(additionalInfoLocator.txt_header),additionalInfoContent.header);
    }
    
    //too many h4s- unique locator to find
    //browser.waitForPageToLoadAndCheckPartialHeaderText(eval(additionalInfoLocator.txt_header),additionalInfoContent.header);
}

    /********************************************************************************************************/
    /****************************  BEGIN CONFIRM EVENT AND DOCUMENT UPLOAD SECTION **************************/

    /* Monica Thaneer
    *This function clicks confirm event and verifies confirm event page header 
    */
    clickConfirmEvent() {
        this.selectYearTab();
        console.log("***** Clicking Confirm Event *****");
        browser.click(eval(locator.nextSteps.btn_confirmEvent));
        if (state == "MN") {
            browser.waitForPageToLoad(eval(confirmEventLocator.txt_heading), commConfirmEventContent.header);
        } else {
            browser.waitForPageToLoad(eval(confirmEventLocator.txt_heading), stateConfirmEventContent.header);
        }
    }

    /* Monica Thaneer
    *This function clicks on upload document button on dashboard page 
    */
    clickUploadDocuments() {
        this.selectYearTab();
        console.log("***** Clicking Upload Documents *****");
        browser.click(eval(locator.nextSteps.btn_uploadDocuments));
        browser.waitForPageToLoad(eval(documentVerificationLocator.txt_header), documentVerificationContent.header);
    }



    /* Monica Thaneer
    *This function clicks on upload document, uploads a document and goto to dashboard page 
    */
    ifGatedUploadDocumentsAndGotoDashboard() {
        if (confirmEventModel.checkIfEventIsGated() == "Y") {
            this.clickUploadDocuments();
            documentVerificationModel.uploadDocumentsAndGotoDashboard();

        }
    }

/* Monica Thaneer
*When logged in as 'PRIVILEDGE USER' and provided that you are on consumer's dashboard
This function clicks on upload document as Priviledge User, Overrides the upload and goes back to consumer dashboard page 
*/
    ifGatedThenOverrideAsPriviledgeUser() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        if(global.updateDataJson.households[householdIndex].applicationType=="QEP"){
            if (confirmEventModel.checkIfEventIsGated()=="Y"){
                this.clickUploadDocuments();
                documentVerificationModel.clickOverrideAndSubmitAndGotoDashboard();
            }
        }
    }
    /* Monica Thaneer
    **Given that logged in as 'CONSUMER' and event selected is gated**
    This function will logout --> login as priviledge user --> searches for user -->
    goes to member dashboard --> clicks upload document --> then overrides
    --> logouts --> logs back in as consumer
    */
    ifGatedThenOverrideDocumentUpload(user, role) {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        if (global.updateDataJson.households[householdIndex].applicationType == "QEP") {
            if (confirmEventModel.checkIfEventIsGated() == "Y") {
                documentVerificationModel.overrideUploadWithNoDocumentUploaded(user, role)
                this.clickUploadDocuments();
                documentVerificationModel.clickOverrideAndSubmitAndGotoDashboard();
                pageHeaderModel.logoutAndLoginAsDifferentUser(global.updateDataJson.households[householdIndex].applicants[0].email, global.updateDataJson.households[householdIndex].password)
            }
        }
    }

    /* Monica Thaneer
    *When logged in as CONSUMER.
    This function clicks on upload document, Uploads a document 
    Logouts As Consumer
    Logins as Priviledge User --> Searches for Member -> Goes to consumers Dashboard & Overrides the document upload
    */
    ifGatedThenUploadAndOverride() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        if (global.updateDataJson.households[householdIndex].applicationType == "QEP") {
            if (confirmEventModel.checkIfEventIsGated() == "Y") {
                this.clickUploadDocuments();
                documentVerificationModel.uploadAndOverrideAsPriviledgeUser();
            }
        }
    }

    /* Monica Thaneer
    *When logged in as consumer.
    This function clicks on upload document, Uploads a document 
    Logouts As Consumer
    Logins as Priviledge User --> Searches For Ticket --> Approves it --> Logout --> Logs back in As Consumer
    */
    ifGatedThenUploadAndVerifyDocumentAsPriviledgeUser(user, role) {
        if (confirmEventModel.checkIfEventIsGated() == "Y") {
            this.clickUploadDocuments();
            documentVerificationModel.uploadDocumentsAsUserAndVerifyUploadAsPriviledgeUser(user, role)
        }
    }

    /* Monica Thaneer
    This function will check if QEP, then confirms event with given eventname and days.
    */
    ifInQEPConfirmEvent(eventName, eventDays) {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        console.log("Application Type = " + global.updateDataJson.households[householdIndex].applicationType)
        if (global.updateDataJson.households[householdIndex].applicationType == "QEP") {
            this.clickConfirmEvent();
            confirmEventModel.eventAndDateSelection(eventName, eventDays)
            confirmEventModel.acceptTermsClickContinueAndConfirmPopup();
        }
    }

    /**********************   END OF CONFIRM EVENT AND DOCUMENT UPLOAD SECTION  ****************************/
    /********************************************************************************************************/

    clickSaveAndContinue() {
        console.log("Clicking Save And Continue");
        browser.click(eval(locator.nextSteps.btn_saveAndContinue));
        browser.waitForUrlContains("customGrouping");
        //  browser.waitForElementToDisplay(eval(locator.nextSteps.btn_shopForHealthPlans))
    }

    //This function will be removed
    // use function clickShopHealthPlansOnCustomGrouping() from customgroupingpage.js
    clickShopHealthPlans() {
        logger.log("Clicking Shop Health Plans");
        browser.click(eval(locator.nextSteps.btn_shopForHealthPlans));
        browser.waitForPageToLoad(eval(locator.welcomeDashboardHeading), "Tell us about your healthcare needs");
    }


    clickVerifyDetailsLink() {
        logger.log("Clicking Verify Details Link On DashBoard");
        browser.click(eval(locator.yourHouseholdEligibility.lk_viewDetails));
        browser.waitForPageToLoadAndCheckPartialHeaderText(eval(eligibilityLocator.eligibilityResults.hd_eligibilityHeader), "Eligibility Overview");
    }
    verifyDashboardContent() {
        this.verifyHeaders();
        this.verifyNextSteps();
        this.verifyOverView();
        this.verifyYourhouseholdEligibility();
        this.verifyHealthPlans();
        this.verifyDentalPlans();
        this.verifyOepAlert();
    }

    verifyNextSteps() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        logger.log("***Verify Next Steps Content***");
        logger.log("*****Application Status: " + global.updateDataJson.households[householdIndex].applicationStatus);
        let dataArr;
        if (global.updateDataJson.households[householdIndex].applicationStatus === constants.APPLICATION_STATUS.CREATED) {
            let nextbuttonText = content.beforeApplicationSubmission.nextStepsButtonText;
           if (state === "PA") { nextbuttonText = stateContent.beforeApplicationSubmission.nextStepsButtonText; }
            dataArr = {
                [locator.nextSteps.p_further_action_txt]: content.beforeApplicationSubmission.nextStepsContent,
                [locator.nextSteps.btn_furtherAction]: nextbuttonText,
            }
        } else if (global.updateDataJson.households[householdIndex].applicationStatus === constants.APPLICATION_STATUS.SUBMITTED) {
            logger.log("Button Text"+ global.updateDataJson.households[householdIndex].nextStepButton);
            dataArr = { [locator.nextSteps.btn_furtherAction]: global.updateDataJson.households[householdIndex].nextStepButton, }
            if (global.updateDataJson.households[householdIndex].financial) {
                            dataArr[[locator.nextSteps.p_further_action_txt]]= content.afterApplicationSubmission.nextStepsContentFinacial;
                        } else {
                            dataArr[[locator.nextSteps.p_further_action_txt]]= content.afterApplicationSubmission.nextStepsContentNonFinacial;
                        }
        } else if (global.updateDataJson.households[householdIndex].applicationStatus === constants.APPLICATION_STATUS.ENROLLED) {
            logger.log("Button Text"+ global.updateDataJson.households[householdIndex].nextStepButton)
            //constants.APPLICATION_STATUS.ENROLLED
            let grouping = global.updateDataJson.households[householdIndex].grouping;
            let nonEnrolledGroup = grouping.filter(el => { return el.healthPlan == "" });
            if ((!jsonUtil.isFieldEmpty(global.updateDataJson.households[householdIndex].healthPlan) || nonEnrolledGroup.length == 0) && jsonUtil.isFieldEmpty(global.updateDataJson.households[householdIndex].dentalPlan)) {
                // enrolled in health, continue to dental
                logger.log("*****Enrolled in Health Plan Only*****");
                dataArr = {
                    [locator.nextSteps.p_further_action_txt]: content.afterEnrollment.nextStepsContent.enrolledOnlyHealth,
                    [locator.nextSteps.btn_furtherAction]: global.updateDataJson.households[householdIndex].nextStepButton,
                }
            } else if (((jsonUtil.isFieldEmpty(global.updateDataJson.households[householdIndex].healthPlan)&&grouping.length == 0) || (grouping.length > 0 && nonEnrolledGroup.length == grouping.length)) && !jsonUtil.isFieldEmpty(global.updateDataJson.households[householdIndex].dentalPlan)) {
                // enrolled in Dental, continue to Health
                console.log("Group length: ", grouping.length)
                console.log("Non Group length: ", nonEnrolledGroup.length)
                logger.log("*****Enrolled in Dental Plan Only*****");
                dataArr = {
                    [locator.nextSteps.p_further_action_txt]: content.afterEnrollment.nextStepsContent.enrolledOnlyDental,
                    [locator.nextSteps.btn_furtherAction]: global.updateDataJson.households[householdIndex].nextStepButton,
                }

            } else if (grouping.length > 0 && nonEnrolledGroup.length > 0) {
                logger.log("*****Enrolled in Health Plan For Only One group*****");
                // enrolled in health for one member
                dataArr = {
                    [locator.nextSteps.p_further_action_txt]: content.afterEnrollment.nextStepsContent.enrolledOnlyOneGroup,
                    [locator.nextSteps.btn_furtherAction]: global.updateDataJson.households[householdIndex].nextStepButton,
                }
            } else {
                logger.log("*****Enrolled in Both Health And Dental Plans*****");
                // enrolled in health and dental
                dataArr = {
                    [locator.nextSteps.p_further_action_txt]: content.afterEnrollment.nextStepsContent.enrolledAllPlans,
                    [locator.nextSteps.btn_furtherAction]: global.updateDataJson.households[householdIndex].nextStepButton,
                }

            }
        }

        assert.assetArrayOfElementsTextEquals(dataArr);

    }
    

    verifyOverView() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        logger.log("**Verify OverView Content**");
        let caseIDContent = null;
        let caseID = null;
        dbQueries.getCaseIdFromDB(global.updateDataJson.households[householdIndex].applicants[0].email).then(caseIDvalue => { caseID = caseIDvalue; });
        browser.waitUntil(() => caseID !== null);
        if (state == "NV") { caseIDContent = "(Your Case ID is " + caseID + ")" }
        else if (state == "PA") { caseIDContent = "(Your Case ID is " + caseID + " )" }
        else { caseIDContent = "( Your Case ID is " + caseID + ")" }
        assert.assertEqual(eval(locator.overview.p_application_status_year).getText(), applicationYear + " Application");
        assert.assetArrayOfElementsTextEquals({ [locator.overview.ct_caseId]: caseIDContent });
        logger.log("*****Application Status: ", global.updateDataJson.households[householdIndex].applicationStatus);
        if (global.updateDataJson.households[householdIndex].applicationStatus === constants.APPLICATION_STATUS.CREATED) {
            let dataArr = {
                [locator.overview.p_application_status_value]: content.beforeApplicationSubmission.applicationStatus,
                [locator.overview.lk_application_status_link_0]: content.beforeApplicationSubmission.applicationLinkText
            }
            assert.assetArrayOfElementsTextEquals(dataArr);
        }
        else if (global.updateDataJson.households[householdIndex].applicationStatus === constants.APPLICATION_STATUS.SUBMITTED || global.updateDataJson.households[householdIndex].applicationStatus === constants.APPLICATION_STATUS.ENROLLED) {
            let dataArr = {
                [locator.overview.p_application_status_value]: content.afterApplicationSubmission.applicationStatus,
                [locator.overview.lk_application_status_link_0]: content.afterApplicationSubmission.applicationLinkText,
            }
            assert.assetArrayOfElementsTextEquals(dataArr);
            assert.assertElementContainsText(eval(locator.overview.ct_applicantsSize), "For " + global.updateDataJson.households[householdIndex].applicants.length + " member");
        }

    }
    verifyOepAlert() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        logger.log("***Verify OEP Alert Content***");
        logger.log("*****Application Status: " + global.updateDataJson.households[householdIndex].applicationStatus);
        if (!global.updateDataJson.households[householdIndex].applicationStatus === constants.APPLICATION_STATUS.ENROLLED) {
            let oepEndDate = null;
            let oepDaysLeft = commonConfig.getRemainingOepDays();
            logger.log("*****Remaining OEP Days Left : " + oepDaysLeft)
            commonConfig.getOepEndDate().then(oepEnd => { oepEndDate = oepEnd; });
            browser.waitUntil(() => oepEndDate !== null);
            logger.log("*****OEP End Date : " + oepEndDate)
            let oePAlertContent = content.afterApplicationSubmission.oepContent.replace("remainingDays", oepDaysLeft).replace("oepEndDate", oepEndDate);
            assert.assetArrayOfElementsTextEquals({ [locator.p_oepAlert]: oePAlertContent });
        }
    }

    verifyYourhouseholdEligibility() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        logger.log("**Verify Your HouseHold Eligibility Content**");
        let applicants = global.updateDataJson.households[householdIndex].applicants;
        logger.log("*****Application Status: ", global.updateDataJson.households[householdIndex].applicationStatus);
        if (global.updateDataJson.households[householdIndex].applicationStatus === constants.APPLICATION_STATUS.CREATED) {
            let dataArr = {
                [locator.yourHouseholdEligibility.p_householdEligibility]: content.beforeApplicationSubmission.yourHouseholdEligibility,
            }
            assert.assetArrayOfElementsTextEquals(dataArr);
        } else if (global.updateDataJson.households[householdIndex].applicationStatus === constants.APPLICATION_STATUS.SUBMITTED || global.updateDataJson.households[householdIndex].applicationStatus === constants.APPLICATION_STATUS.ENROLLED) {
            let memberDetailsFromUI;
            let aptc = null;
            let eligibilityList;
            let stateSubsidy = null;
            let isChipOrMedicaid = false;

            let count = 0;
            for (let j = 0; j < eval(locator.yourHouseholdEligibility.ct_eligibilityTable).length; j++) {
                memberDetailsFromUI = eval(locator.yourHouseholdEligibility.ct_groupMembers).map(function (element) {
                    return element.getAttribute('innerText');
                });

                eligibilityList = eval(locator.yourHouseholdEligibility.ct_groupStatus).map(function (element) {
                    return element.getAttribute('innerText');
                });
                for (let i = 0; i < applicants.length; i++) {
                    let fullName = applicants[i].firstName + " " + applicants[i].lastName;
                    console.log(" test " + fullName)
                    console.log(" index " + i)
                    let isMemberPresent = memberDetailsFromUI.includes(fullName);
                    var memberEligibility = [];
                    var pMedicaidContent = null;
                    var csrContent = null;
                    if (global.updateDataJson.households[householdIndex].financial) {
                        pMedicaidContent = stateContent.afterApplicationSubmission.yourHouseholdEligibility.potentiallyMedicaidFinancial;
                        csrContent = content.afterApplicationSubmission.yourHouseholdEligibility.csrFinacial;
                    }
                    else {
                        pMedicaidContent = stateContent.afterApplicationSubmission.yourHouseholdEligibility.potentiallyMedicaidNonFinancial;
                        csrContent = content.afterApplicationSubmission.yourHouseholdEligibility.csrNonFinacial;
                    }
                    var pChipContent = content.afterApplicationSubmission.yourHouseholdEligibility.potentiallyChip;
                    var nativeAmericanContent = content.afterApplicationSubmission.yourHouseholdEligibility.nativeAmerican;
                    var notSeekingCoverageContent = content.afterApplicationSubmission.yourHouseholdEligibility.notSeekingCoverage;


                    //Potentially Medicaid Eligible
                    applicants[i].assessedMedicaidMAGIEligibile ? (memberEligibility[pMedicaidContent] = true, isChipOrMedicaid = true) : "";
                    //Potentially CHIP Eligible
                    applicants[i].assessedChipEligible ? (memberEligibility[pChipContent] = true, isChipOrMedicaid = true) : "";

                    //CHIP Referral
                    applicants[i].assessedCHIPnonMAGIEligibile ? (memberEligibility[pChipContent] = true, isChipOrMedicaid = true) : "";

                    //Medicaid Referral
                    applicants[i].assessedMedicaidnonMAGIEligibile ? (memberEligibility[pMedicaidContent] = true, isChipOrMedicaid = true) : "";

                    //CHIP eligible
                    applicants[i].chipEligible ? (memberEligibility[pChipContent] = true, isChipOrMedicaid = true) : "";

                    //Medicaid Eligible
                    applicants[i].medicaidMAGIEligibile ? (memberEligibility[pMedicaidContent] = true, isChipOrMedicaid = true) : "";

                    //Native American
                    applicants[i].isNative ? memberEligibility[nativeAmericanContent] = true : "";

                    //Not Seeking Coverage
                    applicants[i].seekingCoverage === false ? memberEligibility[notSeekingCoverageContent] = true : "";

                    let eligibilitytype = Object.keys(memberEligibility).find(key => memberEligibility[key] === true);
                    let isHhEligible = memberDetailsFromUI.includes(fullName + " " + eligibilitytype)
                    //- At least one member of the HH is APTC eligible (aptcEligible': true,) or state subsidy ( stateSubsidyEligible=true)				
                    if ((applicants[i].aptcEligible || applicants[i].stateSubsidyEligible) && (isHhEligible || isMemberPresent)) {
                        logger.log("*****At least one of the HH is APTC eligible or state subsidy eligible*****")
                        typeof eligibilitytype !== "undefined" ? (assert.assertTrue(isHhEligible), count++, logger.log("*****Applicant Name: " + fullName + " " + eligibilitytype)) : (assert.assertTrue(isMemberPresent), count++, logger.log("*****Applicant Name: " + fullName));

                        if (applicants[i].aptcEligible) {
                            dbQueries.getAptcAmountFromDB().then(aptcvalue => { aptc = aptcvalue; });
                            browser.waitUntil(() => aptc !== null);
                            let aptcAmount = dataUtil.formatMoney(aptc, true, true)
                            logger.log("*****APTC Amount" + aptcAmount);
                            let aptcContent = content.afterApplicationSubmission.yourHouseholdEligibility.aptc;
                            let isAptcEligible = eligibilityList.includes(aptcContent);
                            applicants[i].aptcEligible ? (logger.log("*****APTC Eligible: " + aptcContent), assert.assertTrue(isAptcEligible), assert.assertEqual(eligibilityList[eligibilityList.indexOf(aptcContent) + 1], aptcAmount + " per month")) : "";
                        }

                        //State Subsidy Eligible
                        if (applicants[i].stateSubsidyEligible && state === "NJ") {
                            dbQueries.getstateSubsidyAmountFromDB().then(susidyvalue => { stateSubsidy = susidyvalue; });
                            browser.waitUntil(() => stateSubsidy !== null);
                            let stateSubsidyAmount = dataUtil.formatMoney(stateSubsidy, true, true)
                            logger.log("*****State Subsidy Amount" + stateSubsidyAmount);
                            let stateSubsidyContent = content.afterApplicationSubmission.yourHouseholdEligibility.stateSavings.replace("stateName", state)
                            let isStateSubsidyEligible = eligibilityList.includes(stateSubsidyContent);
                            applicants[i].stateSubsidyEligible ? (logger.log("*****State Subsidy Eligible: " + stateSubsidyContent), assert.assertTrue(isStateSubsidyEligible), assert.assertEqual(eligibilityList[eligibilityList.indexOf(stateSubsidyContent) + 1], stateSubsidyAmount + " per month")) : "";
                        }

                        //CSR Eligible
                        let isCsrEligible = eligibilityList.includes(csrContent);
                        applicants[i].csrEligible ? (logger.log("*****CSR Eligible: " + csrContent), assert.assertTrue(isCsrEligible)) : "";

                    } // Eligible to enroll in a plan on the Marketplace And Not eligible for APTC or State Subsidy
                    else if (applicants[i].exchangeEligible && !(applicants[i].aptcEligible && applicants[i].stateSubsidyEligible) && (isHhEligible || isMemberPresent)) {
                        logger.log("*****Eligible For Marketplace And Not eligible for APTC or State Subsidy*****")
                        typeof eligibilitytype !== "undefined" ? (assert.assertTrue(isHhEligible), count++, logger.log("*****Applicant Name: " + fullName + " " + eligibilitytype)) : (assert.assertTrue(isMemberPresent), count++, logger.log("*****Applicant Name: " + fullName));

                        //QHP Eligible
                        let qhpContent = content.afterApplicationSubmission.yourHouseholdEligibility.eligibleForMarketPlaces;
                        let isQhpEligible = eligibilityList.includes(qhpContent);
                        applicants[i].exchangeEligible ? (logger.log("*****QHP Eligible: " + qhpContent), assert.assertTrue(isQhpEligible)) : assert.assertFalse(isQhpEligible);

                        //CSR Eligible
                        let isCsrEligible = eligibilityList.includes(csrContent);
                        applicants[i].csrEligible ? (logger.log("*****CSR Eligible: " + csrContent), assert.assertTrue(isCsrEligible)) : "";

                    }// Not eligible to enroll in a plan on the Marketplace
                    else if (!(applicants[i].exchangeEligible) && (isHhEligible || isMemberPresent)) {
                        logger.log("*****Not eligible to enroll in a plan on the Marketplace*****")
                        let exchangeContent = content.afterApplicationSubmission.yourHouseholdEligibility.notEligibleForMarketPlaces;
                        if (state === "PA"||state === "NV") { exchangeContent = stateContent.afterApplicationSubmission.yourHouseholdEligibility.notEligibleForMarketPlaces; }
                        typeof eligibilitytype !== "undefined" ? (assert.assertTrue(isHhEligible), count++, logger.log("*****Applicant Name: " + fullName + " " + eligibilitytype)) : (assert.assertTrue(isMemberPresent), count++, logger.log("*****Applicant Name: " + fullName));
                        assert.assertEqual(eval(locator.yourHouseholdEligibility.ct_groupStatus)[0].getText(), exchangeContent);
                    }
                }
            }
            assert.assertEqual(count, applicants.length);
            if(isChipOrMedicaid){
                logger.log("*****Chip Or Medicaid Content*****");
                console.log("chip content :",locator.yourHouseholdEligibility.p_chipContent.replace("chipContent", stateContent.afterApplicationSubmission.chipContent));
                assert.assertElementIsVisible(eval(locator.yourHouseholdEligibility.p_chipContent.replace("chipContent", stateContent.afterApplicationSubmission.chipContent)))

            }
            //isChipOrMedicaid ? (logger.log("*****Chip Or Medicaid Content*****"),assert.assertElementIsVisible(eval(locator.yourHouseholdEligibility.p_chipContent.replace("chipContent", stateContent.chipContent)))) : "";
        }

    }
    verifyHealthPlans() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        logger.log("***Verify Your Health Plans Content***");
        logger.log("*****Application Status: " + global.updateDataJson.households[householdIndex].applicationStatus);
        if (global.updateDataJson.households[householdIndex].applicationStatus === constants.APPLICATION_STATUS.CREATED || global.updateDataJson.households[householdIndex].applicationStatus === constants.APPLICATION_STATUS.SUBMITTED) {
            let dataArr = { [locator.yourHealthPlans.p_healthPlans]: content.beforeApplicationSubmission.yourHealthPlans }
            assert.assetArrayOfElementsTextEquals(dataArr);
        } else if (global.updateDataJson.households[householdIndex].applicationStatus === constants.APPLICATION_STATUS.ENROLLED) {
            let grouping = global.updateDataJson.households[householdIndex].grouping;
            if (!jsonUtil.isFieldEmpty(global.updateDataJson.households[householdIndex].healthPlan) || grouping.length > 0) {
                logger.log("*****Enrolled In Health Plan");
                let applicants = global.updateDataJson.households[householdIndex].applicants;
                let qualifiedMembersHealth;
                if (grouping.length > 0) {
                    for (let i = 0; i < grouping.length; i++) {
                        if (!jsonUtil.isFieldEmpty(grouping[i].healthPlan)) {
                            logger.log("*****Health Plan Group Object" + grouping[i]);
                            qualifiedMembersHealth = grouping[i].members.length;
                            let healthPlanContent = [
                                eval(locator.yourHealthPlans.ct_company.replace("planCompany", grouping[i].healthPlan.company)),
                                eval(locator.yourHealthPlans.ct_companyName.replace("planCompanyName", grouping[i].healthPlan.name)),
                                eval(locator.yourHealthPlans.ct_status),
                                eval(locator.yourHealthPlans.lk_viewDetails)];
                            assert.assertArrayOfElementsAreDisplayed(healthPlanContent);
                        } else logger.log("***** Health Plan object is empty")
                    }
                } else {
                    let i = 0;
                    qualifiedMembersHealth = applicants.length;
                    for (let j = 0; j < applicants.length; j++) {
                        if (applicants[j].exchangeEligible == false) {
                            qualifiedMembersHealth--;
                        }
                    }
                    logger.log("**Qualified Members Health: " + qualifiedMembersHealth)
                    let healthPlanContent = [
                        eval(locator.yourHealthPlans.ct_company.replace("planCompany", global.updateDataJson.households[householdIndex].healthPlan.company)),
                        eval(locator.yourHealthPlans.ct_companyName.replace("planCompanyName", global.updateDataJson.households[householdIndex].healthPlan.name)),
                        eval(locator.yourHealthPlans.ct_status),
                        eval(locator.yourHealthPlans.ct_members.replace("enrolledMembers", qualifiedMembersHealth)),
                        eval(locator.yourHealthPlans.lk_viewDetails)];
                    assert.assertArrayOfElementsAreDisplayed(healthPlanContent);

                }

            } else {
                logger.log("*****Not Enrolled In Health Plan");
                let dataArr = { [locator.yourHealthPlans.p_healthPlans]: content.beforeApplicationSubmission.yourHealthPlans }
                assert.assetArrayOfElementsTextEquals(dataArr);
            }
        }
    }
    verifyDentalPlans() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        logger.log("***Verify Your Dental Plans Content***");
        logger.log("*****Application Status: " + global.updateDataJson.households[householdIndex].applicationStatus);
        if (global.updateDataJson.households[householdIndex].applicationStatus === constants.APPLICATION_STATUS.CREATED || global.updateDataJson.households[householdIndex].applicationStatus === constants.APPLICATION_STATUS.SUBMITTED) {
            let dataArr = { [locator.yourDentalPlans.p_dentalPlans]: content.beforeApplicationSubmission.yourDentalPlans }
            assert.assetArrayOfElementsTextEquals(dataArr);
        } else if (global.updateDataJson.households[householdIndex].applicationStatus === constants.APPLICATION_STATUS.ENROLLED) {
            if (!jsonUtil.isFieldEmpty(global.updateDataJson.households[householdIndex].dentalPlan)) {
                let applicants = global.updateDataJson.households[householdIndex].applicants;
                logger.log("***Enrolled In Dental Plan***");
                let qualifiedMembersDental = applicants.length;
                for (let i = 0; i < applicants.length; i++) {
                    if (applicants[i].exchangeEligible == false) {
                        qualifiedMembersDental--;
                    }
                }
                logger.log("**Qualified Members Dental: " + qualifiedMembersDental)
                let dentalPlanContent = [
                    eval(locator.yourDentalPlans.ct_company.replace("planCompany", global.updateDataJson.households[householdIndex].dentalPlan.company)),
                    eval(locator.yourDentalPlans.ct_companyName.replace("planCompanyName", global.updateDataJson.households[householdIndex].dentalPlan.name)),
                    eval(locator.yourDentalPlans.ct_status),
                    eval(locator.yourDentalPlans.ct_members.replace("enrolledMembers", qualifiedMembersDental)),
                    eval(locator.yourDentalPlans.lk_viewDetails)];
                assert.assertArrayOfElementsAreDisplayed(dentalPlanContent);
            } else {
                logger.log("***Not Enrolled In Dental Plan***");
                let dataArr = { [locator.yourDentalPlans.p_dentalPlans]: content.beforeApplicationSubmission.yourDentalPlans }
                assert.assetArrayOfElementsTextEquals(dataArr);
            }
        }
    }

    verifyHeaders() {
        logger.log("**Verify DashBoard Page Headers **");
        let headers = [eval(locator.overview.hd_overview), eval(locator.yourHouseholdEligibility.hd_yourHouseholdEligibility), eval(locator.yourHealthPlans.hd_yourHealthPlans), eval(locator.yourDentalPlans.hd_yourDentalPlans)];
        assert.assertArrayOfElementsAreDisplayed(headers);
        if (state == "PA") { assert.assertElementIsVisible(eval(stateLocatorFile.hd_nextSteps)) }
        else assert.assertElementIsVisible(eval(locator.hd_nextSteps))
    }

}

module.exports = new DashBoardPage();

const global = require("../../Global_include");
const state = stateProfile;
const browser = require("../../../base/Browser.js");
const assert = require("../../../base/Assert.js");
const enrollmentPageLoc = require("../../../../resources/selectors/common/CAP/MemberManagement/EnrollmentPageObject.json");
const enrollmentPageLocState = require("../../../../resources/selectors/exchange/"+state+"/CAP/MemberManagement/EnrollmentPageObject.json");
const enrollmentPageContent = require("../../../../resources/content/common/CAP/MemberManagement/EnrollmentPage.content");
const commonCAPFunc = require("../CommonPageFunctions.js");
const permissions = require("../../../../resources/data/permissions.json");
const logger=require('../../../common.utils/LoggerUtil');
const dataUtil = require('../../../common.utils/DataUtil');
const constants=require('../../../common.utils/Constants');

const moment = require('moment');



class EnrollmentPage {
    verifyEnrollmentPage() {
        this.verifyEnrollmentsPageHeader();
        browser.pauseBrowser(constants.PAUSE_BROWSER_6000);
        this.verifyUserPermissions();
    }
    verifyEnrollmentsPageHeader() {
        logger.log("***** The Header of Enrollment Page: " + eval(enrollmentPageLoc.pageHeader).getText() + " *****");
        assert.assertElementContainsText(eval(enrollmentPageLoc.pageHeader), enrollmentPageContent.pageHeader);
    }
    verifyUserPermissions() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        let role = global.updateDataJson.households[householdIndex].role;
       // let role ="supervisor";
        let enrollmentPermissions_arr =  permissions[state][role].enrollments;
        logger.log(enrollmentPermissions_arr);
        let locator_arr = [];
        let locator_health,locator_dental;
        for (let i = 0; i < enrollmentPermissions_arr.length; i++) {
            locator_health="\"$$('a*="+enrollmentPermissions_arr[i].trim()+"')[0]\"";
            locator_dental="\"$$('a*="+enrollmentPermissions_arr[i].trim()+"')[1]\"";
            locator_arr.push(eval(eval(locator_health)),eval(eval(locator_dental)));
          }
        assert.assertArrayOfElementsAreDisplayed(locator_arr);
    }
    
    getHealthPlanEnrollmentDetails()
    {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        logger.log("***** Getting Health Plan Enrollment Details *****");
        var healthEnrollment = {};
        healthEnrollment.enrollStatus=browser.getText(eval(enrollmentPageLoc.td_enrollmentStatusHealth));
        healthEnrollment.effectiveStartDate=browser.getText(eval(enrollmentPageLoc.td_effectiveDateHealth)).split('-')[0].trim();
        healthEnrollment.effectiveEndDate=browser.getText(eval(enrollmentPageLoc.td_effectiveDateHealth)).split('-')[1].trim();
        healthEnrollment.enrollmentID=browser.getText(eval(enrollmentPageLoc.td_enrollmentID));
        healthEnrollment.netPremium=browser.getText(eval(enrollmentPageLoc.td_netPremium));
        healthEnrollment.grossPremium=browser.getText(eval(enrollmentPageLoc.td_grossPremium));
        healthEnrollment.aptc=browser.getText(eval(enrollmentPageLoc.td_aptc));
        if(state.toUpperCase()==constants.STATE_NJ)
        healthEnrollment.stateSubsidy=browser.getText(eval(enrollmentPageLoc.td_stateSubsidy));
        healthEnrollment.txnId=browser.getText(eval(enrollmentPageLoc.td_txnId));
        healthEnrollment.cmsPlanId=browser.getText(eval(enrollmentPageLoc.td_cmsPlanId));
        global.updateDataJson.households[householdIndex]["healthPlanEnrollment"] = healthEnrollment;
        logger.log("***** Health Plan Enrollment Got Added In Global Object \n" + JSON.stringify(global.updateDataJson.households[householdIndex]));

    }
    
    
    verifyHealthPlanEnrollmentDetails()
    {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        logger.log("***** Verifying Health Plan Enrollment Details *****");
        browser.waitUntil(()=>browser.isDisplayed(eval(enrollmentPageLoc.img_healthPlan)));
        let IsPlanCompanyInImgMatched=(eval(enrollmentPageLoc.img_healthPlan).getAttribute('alt').substring(0, 6).replace(/[.]+/g, '').trim().toUpperCase() == global.updateDataJson.households[householdIndex].healthPlan.company.replace(/[.]+/g, '').trim().toUpperCase());
        assert.assertTrue(IsPlanCompanyInImgMatched);
        logger.log("***** Verified Health Plan Company *****");
        let IsPlanNameMatched=(eval(enrollmentPageLoc.healthPlanName).getText().substring(0, 21).replace(/[.]+/g, '').trim().toUpperCase() == global.updateDataJson.households[householdIndex].healthPlan.name.replace(/[.]+/g, '').trim().toUpperCase());
        assert.assertTrue(IsPlanNameMatched);
        logger.log("***** Verified Health Plan Name *****");
        let effectiveDate=global.updateDataJson.households[householdIndex].coverageDate+" - "+global.updateDataJson.households[householdIndex].coverageEndDate;
        let netPremium = global.updateDataJson.households[householdIndex].healthPlan.premium;
        let grossPremium ="$"+(parseFloat(dataUtil.extractNumber(global.updateDataJson.households[householdIndex].healthPlan.premium))+parseFloat(dataUtil.extractNumber(global.updateDataJson.households[householdIndex].healthPlan.aptc))).toFixed(2);
        let locator_arr={[enrollmentPageLoc.td_enrollmentStatusHealth]:global.updateDataJson.households[householdIndex].healthPlanEnrollment.enrollStatus,[enrollmentPageLoc.td_effectiveDateHealth]:effectiveDate,[enrollmentPageLoc.td_grossPremium]:grossPremium,[enrollmentPageLoc.td_netPremium]:netPremium};
        assert.assetArrayOfElementsTextEquals(locator_arr);
        logger.log("***** Verified Health Plan Enrollment Details *****");
    }
    selectCoverageYear() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        logger.log("***** Selecting Coverage Year *****");
        let coverageYear = eval(enrollmentPageLoc.sb_coverageYear);
        let year = global.updateDataJson.households[householdIndex].applicationYear;
       // let year = "2021";
        logger.log("year "+year)
        browser.pauseBrowser(constants.PAUSE_BROWSER_2000);
        coverageYear.selectByVisibleText(year);
        logger.log("***** Coverage Year Selected *****");
    }
    clickOnHealthPlanActions() {
        logger.log("***** Clicking On Health Plan Actions *****");
        commonCAPFunc.clickOnActionsGearIcon(eval(enrollmentPageLoc.lk_actions_health));
        logger.log("***** Clicked On Health Plan Actions *****");
        browser.pauseBrowser(constants.PAUSE_BROWSER_6000);
        //browser.waitUntil(() => eval(enrollmentPageLoc.lk_OverrideEnrollStatus_health).isDisplayed()); 
    }
    clickOnHealthPlanOverrideEnrollStatusAndClosePopup() {
        let planType = "Health";
        commonCAPFunc.clickOnOverrideEnrollStatus(eval(enrollmentPageLoc.lk_OverrideEnrollStatus_health),planType);
        browser.pauseBrowser(constants.PAUSE_BROWSER_5000);
        this.verifyAndCloseOESPopup();
    }
    clickOnHealthPlanShowPremiumHistory() {
        let planType = "Health";
        commonCAPFunc.clickOnShowPremiumHistory(eval(enrollmentPageLoc.lk_showPremiumHistory_health),planType);
        this.verifyShowPremiumHistoryHeaderSection();
       // this.goBackToEnrollmentPage();
    }
    goBackToEnrollmentPage() {
        browser.pauseBrowser(constants.PAUSE_BROWSER_5000);
        logger.log("***** Clicking On Back Button *****");
        browser.click(eval(enrollmentPageLoc.btn_back));
        browser.waitForPageToLoad(eval(enrollmentPageLoc.pageHeader), enrollmentPageContent.pageHeader);
        logger.log("***** Clicked On Back Button *****");
    }

    clickActionsUnderHealthPlanShowPremiumHistory() {
        this.clickHealthPlanShowPremiumHistoryActions();
      //  this.goBackToEnrollmentPage();
    }

    clickHealthPlanShowPremiumHistoryActions()
    {
        logger.log("***** Clicking On Actions Link Under Health Plan Show Premium History *****");
        browser.click(eval(enrollmentPageLoc.lk_actions));
        logger.log("***** Clicked On Actions Link Under Health Plan Show Premium History *****");
        this.verifyHealthPlanShowPremiumHistoryActions();
    }

    verifyHealthPlanShowPremiumHistoryActions()
    { 
        logger.log("***** Verifying Actions Under Health Plan Show Premium History *****");
        assert.assertElementIsVisible(eval(enrollmentPageLoc.btn_change)); 
        assert.assertElementIsVisible(eval(enrollmentPageLoc.btn_cancel)); 
        logger.log("***** Verified Actions Under Health Plan Show Premium History *****");

    }
    
    clickCancelOnEditTool()
    {   
        logger.log("***** Clicking Cancel On Edit Tool *****");
        browser.scrollToViewAndClick(eval(enrollmentPageLoc.btn_cancel));
        logger.log("***** Clicked Cancel On Edit Tool *****");
        browser.waitUntil(()=>browser.isDisplayed(eval(enrollmentPageLoc.cancelPopup.hd_cancelEnrollmentModalHeader)));
    }
      
      selectReasonForEnrollmentCancel()
      {   
          logger.log("***** Selecting Reason For Enrollment Cancel *****");
          browser.selectByIndex(eval(enrollmentPageLoc.cancelPopup.sb_reasonForCancel),1);
          logger.log("***** Selected Reason For Enrollment Cancel *****");
      }
           
      enterCommentForEnrollmentCancel()
      {   
          logger.log("***** Entering Comment For Enrollment Cancel *****");
          browser.setValueInTextField(eval(enrollmentPageLoc.cancelPopup.tb_commment),"Test Automation");
          logger.log("***** Entered Comment For Enrollment Cancel *****");
      }
                 
      submitEnrollmentCancelAndVerifySuccessPopup()
      {
        logger.log("***** Submitting Enrollment Cancel *****");
        browser.click(eval(enrollmentPageLoc.cancelPopup.btn_submit));
        logger.log("***** Submitted Enrollment Cancel *****");
        browser.pauseBrowser(constants.PAUSE_BROWSER_3000)
        //browser.waitUntil(()=>browser.isDisplayed(eval(enrollmentPageLoc.successPopup.hd_successPopup)));
        this.verifyEnrollmentCancelSuccessPopup();
      }
                       

      verifyEnrollmentCancelSuccessPopup()
      {
        logger.log("***** Verifying Success Popup Header *****");
        assert.assertContainsText(browser.getText(eval(enrollmentPageLoc.successPopup.hd_successPopup)),enrollmentPageContent.popUpHeader_Sucess); 
        logger.log("***** Verified Success Popup Header *****");
        logger.log("***** Closing Success Popup *****");
        browser.click(eval(enrollmentPageLoc.successPopup.btn_close));
        logger.log("***** Closed Success Popup *****");
      }
      
    updateHealthPlanEnrollmentDetails(event)
    {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        global.updateDataJson.households[householdIndex].healthPlanEnrollment.enrollStatus=browser.getText(eval(enrollmentPageLoc.td_enrollmentStatusHealth));
        if(event.toUpperCase() == 'CANCEL')
        {
            global.updateDataJson.households[householdIndex].coverageEndDate=browser.getText(eval(enrollmentPageLoc.td_effectiveDateHealth)).split('-')[1].trim();
            global.updateDataJson.households[householdIndex].healthPlanEnrollment.effectiveEndDate=browser.getText(eval(enrollmentPageLoc.td_effectiveDateHealth)).split('-')[1].trim();
        }
        logger.log("Coverage End Date And Enrollment Status Updated In Global Data Json After Enrollment Cancel: "+JSON.stringify(global.updateDataJson.households[householdIndex]));
        
    }
      
      verifyEnrollmentStartAndEndDatesAfterEnrollmentCancel()
      {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        logger.log("Verifying Enrollment Start Date With Calculated Coverage Date in Global Object");
        let IsCoverageStartDateMatched = (browser.getText(eval(enrollmentPageLoc.td_enrollmentStartDate))==global.updateDataJson.households[householdIndex].coverageDate);
        assert.assertTrue(IsCoverageStartDateMatched);
        logger.log("***** Enrollment Coverage Start Date Matched ******");
        logger.log("Verifying Enrollment Start Date With Enrollment End Date");
        let IsCoverageEndDateMatched = (browser.getText(eval(enrollmentPageLoc.td_enrollmentStartDate))==browser.getText(eval(enrollmentPageLoc.td_enrollmentEndDate)));
        assert.assertTrue(IsCoverageEndDateMatched);
        logger.log("***** Enrollment Coverage End Date Matched ******");
      }
      
      
      verifyMemberLevelDetails()
      {
            let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
            logger.log("***** Verifying Member Level Details *****");
            let seekingCoverage = global.updateDataJson.households[householdIndex].applicants[0].seekingCoverage;
            if(seekingCoverage)
            {
                let type = global.updateDataJson.households[householdIndex].applicants[0].relation;
                let name = global.updateDataJson.households[householdIndex].applicants[0].firstName +" "+global.updateDataJson.households[householdIndex].applicants[0].lastName;
                let gender = global.updateDataJson.households[householdIndex].applicants[0].gender;
                let ssn = global.updateDataJson.households[householdIndex].applicants[0].ssn.split("-")[2];
                let benefitEffectiveDate= browser.getText(eval(enrollmentPageLoc.td_enrollmentStartDate))+" - "+browser.getText(eval(enrollmentPageLoc.td_enrollmentEndDate));
                let locator_arr = { [enrollmentPageLoc.memberDetailsTable.type]: type, 
                    [enrollmentPageLoc.memberDetailsTable.name]: name, 
                    [enrollmentPageLoc.memberDetailsTable.gender]: gender, 
                    [enrollmentPageLoc.memberDetailsTable.ssn]: ssn, 
                    [enrollmentPageLoc.memberDetailsTable.benefitEffectiveDate]: benefitEffectiveDate};
                assert.assertArrayOfElementsContainsTextIgnoringCase(locator_arr);
            }

        logger.log("***** Verified Member Level Details *****");

      }
      
      verifyPremiumDataOnEnrollmentEditTool(event)
      {
        logger.log("***** Verifying Premium Data*****");
        let noOfRows=eval(enrollmentPageLoc.premiumHistoryTable.noOfRows).length;
        let months=moment.months();
        for(let i=1;i <= noOfRows;i++)
        {
            let locator_arr={};            
            if(event.toUpperCase() == "CANCEL")
            {
                if (state.toUpperCase()==constants.STATE_NJ)
                    locator_arr={[enrollmentPageLoc.premiumHistoryTable.month.replace("index",i)]:months[i-1],[enrollmentPageLoc.premiumHistoryTable.grossPremium.replace("index",i)]:"Not Applicable",
                    [enrollmentPageLocState.premiumHistoryTable.netPremium.replace("index",i)]:""};
                else
                    locator_arr={[enrollmentPageLoc.premiumHistoryTable.month.replace("index",i)]:months[i-1],[enrollmentPageLoc.premiumHistoryTable.grossPremium.replace("index",i)]:"Not Applicable",
                    [enrollmentPageLoc.premiumHistoryTable.netPremium.replace("index",i)]:""};
                    //,[enrollmentPageLoc.premiumHistoryTable.premiumEHB.replace("index",i)]:""};
            }
             assert.assetArrayOfElementsTextEquals(locator_arr);
        }
        logger.log("***** Verified Premium Data*****");

      }
  
    clickOnDentalPlanShowPremiumHistory() {
        let planType = "Dental";
        commonCAPFunc.clickOnShowPremiumHistory(eval(enrollmentPageLoc.lk_showPremiumHistory_dental),planType);
        this.verifyShowPremiumHistoryHeaderSection();
       // this.goBackToEnrollmentPage();
    }
 
    verifyShowPremiumHistoryHeaderSection()
    {
        logger.log("***** The Header of Show Premium History: " + eval(enrollmentPageLoc.pageHeader_premiumHistory).getText() + " *****");
        assert.assertElementContainsText(eval(enrollmentPageLoc.pageHeader_premiumHistory), enrollmentPageContent.pageHeader_premiumHistory);       
        assert.assertElementIsVisible(eval(enrollmentPageLoc.btn_back));
    }
    clickOnHealthPlanResend834History() {
        let planType = "Health";
        browser.pauseBrowser(constants.PAUSE_BROWSER_5000);
        commonCAPFunc.clickOnResend834History(eval(enrollmentPageLoc.lk_resend834History_health),planType);
        browser.pauseBrowser(constants.PAUSE_BROWSER_5000);
        this.verifyResend834HistoryPopup();
    }
    clickOnDentalPlanResend834History() {
        let planType = "Dental";
        browser.pauseBrowser(constants.PAUSE_BROWSER_5000);
        commonCAPFunc.clickOnResend834History(eval(enrollmentPageLoc.lk_resend834History_dental),planType);
        browser.pauseBrowser(constants.PAUSE_BROWSER_5000);
        this.verifyResend834HistoryPopup();
    }
 
    verifyResend834HistoryPopup()
    {
        logger.log("***** Verifying the Resend 834 History Popup *****");
        assert.assertElementContainsText(eval(enrollmentPageLoc.popUpHeader_834History),enrollmentPageContent.popUpHeader_834History);
        browser.pauseBrowser(constants.PAUSE_BROWSER_6000);
        browser.click(eval(enrollmentPageLoc.lk_Cancel_834));
        browser.waitUntil(() => eval(enrollmentPageLoc.lk_showPremiumHistory_health).isDisplayed()); 
        logger.log("***** Closed the Resend 834 History Popup *****");
    }

    clickOnHealthPlanResendLatest834Transaction() {
        let planType = "Health";
        commonCAPFunc.clickOnResendLatest834Transaction(eval(enrollmentPageLoc.lk_resendLatest834Transaction_health),planType);
        browser.pauseBrowser(constants.PAUSE_BROWSER_5000);
        this.verifyResendLatest834TransactionPopup();
    }
    clickOnDentalPlanResendLatest834Transaction() {
        let planType = "Dental";
        commonCAPFunc.clickOnResendLatest834Transaction(eval(enrollmentPageLoc.lk_resendLatest834Transaction_dental),planType);
        browser.pauseBrowser(constants.PAUSE_BROWSER_5000);
        this.verifyResendLatest834TransactionPopup();
    }
 
    verifyResendLatest834TransactionPopup()
    {
        logger.log("***** Verifying the Resend Latest 834 Transaction Popup *****");
        assert.assertElementContainsText(eval(enrollmentPageLoc.popUpHeader_834Transaction),enrollmentPageContent.popUpHeader_834Transaction);
        browser.pauseBrowser(constants.PAUSE_BROWSER_6000);
        browser.click(eval(enrollmentPageLoc.lk_Cancel_834_Trans));
        browser.waitUntil(() => eval(enrollmentPageLoc.lk_resendLatest834Transaction_health).isDisplayed()); 
        logger.log("***** Closed the Resend Latest 834 Transaction Popup *****");
    }

    clickOnHealthPlanAdditionalInfo() {
        let planType = "Health";
        commonCAPFunc.clickOnAdditionalInfo(eval(enrollmentPageLoc.lk_additionalInfo_health),planType);
        browser.pauseBrowser(3000);
        let locator_arr=[eval(enrollmentPageLoc.lbl_enrollees_health),eval(enrollmentPageLoc.lbl_enrollmentHistory_health)];
        this.verifyAdditionalInfoHeaderSection(locator_arr);
    }
    clickOnDentalPlanAdditionalInfo() {
        let planType = "Dental";
        commonCAPFunc.clickOnAdditionalInfo(eval(enrollmentPageLoc.lk_additionalInfo_dental),planType);
        browser.pauseBrowser(3000);
        let locator_arr=[eval(enrollmentPageLoc.lbl_enrollees_dental),eval(enrollmentPageLoc.lbl_enrollmentHistory_dental)];
        this.verifyAdditionalInfoHeaderSection(locator_arr);
    }
 
    verifyAdditionalInfoHeaderSection(locator_arr)
    {
        assert.assertArrayOfElementsAreDisplayed(locator_arr);

    }


    clickOnDentalPlanActions() {
        logger.log("***** Clicking On Dental Plan Actions *****");
        commonCAPFunc.clickOnActionsGearIcon(eval(enrollmentPageLoc.lk_actions_dental));
        logger.log("***** Clicked On Dental Plan Actions *****");
        browser.pauseBrowser(constants.PAUSE_BROWSER_6000);
      //  browser.waitUntil(() => eval(enrollmentPageLoc.lk_OverrideEnrollStatus_dental).isDisplayed()); 

    }
    clickOnDentalPlanOverrideEnrollStatusAndClosePopup() {
        let planType = "Dental";
        commonCAPFunc.clickOnOverrideEnrollStatus(eval(enrollmentPageLoc.lk_OverrideEnrollStatus_dental),planType);
        browser.pauseBrowser(constants.PAUSE_BROWSER_5000);
        this.verifyAndCloseOESPopup();
    }
    verifyAndCloseOESPopup() {
        logger.log("***** Verifying the Override Enroll Status Popup *****");
        assert.assertElementContainsText(eval(enrollmentPageLoc.popUpHeader_oes),enrollmentPageContent.popUpHeader_OES);
        browser.pauseBrowser(constants.PAUSE_BROWSER_6000);
        browser.click(eval(enrollmentPageLoc.lk_popUp_Cancel));
        browser.waitUntil(() => eval(enrollmentPageLoc.lk_actions_health).isDisplayed()); 
        logger.log("***** Closed the  Override Enroll Status Popup *****");
    }
}

module.exports = new EnrollmentPage();

const locatorJson = require('../../../resources/selectors/common/SSAP/AdditionalInformationObject.json');
const commomfunc = require('../SSAP/CommonSSAPFunction')
const browser = require('../../base/Browser.js');
const global = require('../Global_include');
const constants = require('../../../tests/common.utils/Constants');
const logger = require('../../common.utils/LoggerUtil');


class AdditionalInformationPage {

    continueToOtherHealthCoveragePage() {
        commomfunc.clickSaveAndContinueToNextPage("Other Health Coverage", "");
    }
    continueToReconciliationAptcPage() {
        commomfunc.clickSaveAndContinueToNextPage("Reconciliation of APTC", "");
    }
    continueToEmployerCoverageDetailPage() {
        commomfunc.clickSaveAndContinueToNextPage("Employer Coverage Detail", "");
    }
    continueToStateEmployeeBenefitPage() {
        commomfunc.clickSaveAndContinueToNextPage("State Employee Health Benefit", "");
    }
    continueToAdditionalInformationPage() {
        commomfunc.clickSaveAndContinueToNextPage("Additional Information", "");
    }


    /*
* Other Health Coverage
*/    
    selectOtherHealthCoverageInfo(index){ 
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        browser.pauseBrowser(constants.PAUSE_BROWSER_500);
        let applicant = global.updateDataJson.households[householdIndex].applicants[index];
        logger.log("*****Has Other Health Coverage: "+global.updateDataJson.households[householdIndex].applicants[index].hasOtherHealthCoverage)
        if(applicant.hasOtherHealthCoverage==true){ 
            logger .log("***** inside if loop");
            browser.doubleClick(eval(locatorJson.otherHealthCoverage.rb_healthCoverageYes));
            browser.pauseBrowser(constants.PAUSE_BROWSER_3000);
            applicant.otherHealthCoverage.forEach(otherHealth => {
                logger .log("***** Other Helath Coverage: "+otherHealth);
                logger .log("***** Other Helath Locator : "+locatorJson.otherHealthCoverage.cb_otherHealthCoverage.replace("OTHER_HEALTH_REPLACE",otherHealth));
                browser.selectCheckBox(eval(locatorJson.otherHealthCoverage.cb_otherHealthCoverage.replace("OTHER_HEALTH_REPLACE",otherHealth)));
            });
        }else {
            browser.doubleClick(eval(locatorJson.otherHealthCoverage.rb_healthCoverageNo));
        }
    }


    /*
    * Reconciliation of APTC
    */
    selectReconciliationOfAptcInfo(index) {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        browser.pauseBrowser(constants.PAUSE_BROWSER_500);
        if (global.updateDataJson.households[householdIndex].applicants[index].hasReconciledAptc == true) {
            browser.doubleClick(eval(locatorJson.reconcilationOfAPTC.rb_reconcileAptcOptionYes));
        } else {
            browser.doubleClick(eval(locatorJson.reconcilationOfAPTC.rb_reconcileAptcOptionNo));
        }
    }

    /*
    * Employer Coverage Detail
    */
    selectEmployerCoverageDetailInfo(index) {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        if (global.updateDataJson.households[householdIndex].applicants[index].hasESI == true) {
            browser.doubleClick(eval(locatorJson.employerCoverageDetail.rb_employerWillOfferInsuranceYes));
        } else {
            browser.doubleClick(eval(locatorJson.employerCoverageDetail.rb_employerWillOfferInsuranceNo));
            browser.pauseBrowser(constants.PAUSE_BROWSER_500);
        }

    }

    /*
    * State Employee Health Benefit
    */
    selectStateEmployeeHealthBenefitInfo(index) {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        console.log("Select State Employee Health Benefit Info")
        if (global.updateDataJson.households[householdIndex].applicants[index].hasstateHealthBenifit == true) {
            browser.doubleClick(eval(locatorJson.stateEmployeeHealthBenefit.rb_stateHealthBenefitYes));
        } else {
            console.log("Else block")
            browser.doubleClick(eval(locatorJson.stateEmployeeHealthBenefit.rb_stateHealthBenefitNo));
        }
    }


    /*
    * Additional Information
    */
    selectAdditionalInfo(index) {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        if (global.updateDataJson.households[householdIndex].applicants[index].helpPayingMedicalBills == true) {
            browser.doubleClick(eval(locatorJson.additionalInformation.rb_helpWithUnpaidBillYes));
        } else {
            browser.doubleClick(eval(locatorJson.additionalInformation.rb_helpWithUnpaidBillNo));
        }

    }

    continueToReviewAndSignPage() {
        commomfunc.clickSaveAndContinueToNextPage("Summary", "");
        commomfunc.clickSaveAndContinueToNextPage("Review and Sign", "");
    }

    enterAdditionalInformation() {
        browser.pauseBrowser(8000)
        this.continueToOtherHealthCoveragePage();
        this.selectOtherHealthCoverageInfo(0);
        //this.fillOtherHealthCoverageInfoAndContinue(0);
        browser.pauseBrowser(2000);
        this.continueToReconciliationAptcPage();
        this.selectReconciliationOfAptcInfo(0);
        //this.fillReconciliationOfAptcInfoAndContinue(0);
        browser.pauseBrowser(2000);
        this.continueToEmployerCoverageDetailPage();
        this.selectEmployerCoverageDetailInfo(0);
        //this.fillEmployerCoverageDetailInfoAndContinue(0);
        browser.pauseBrowser(2000);
        this.continueToStateEmployeeBenefitPage();
        this.selectStateEmployeeHealthBenefitInfo(0);
        //this.fillStateEmployeeHealthBenefitInfoAndContinue(0);
        browser.pauseBrowser(2000);
        this.continueToAdditionalInformationPage();
        this.selectAdditionalInfo(0);
        //this.fillAdditionalInfoAndContinue(0);
        browser.pauseBrowser(2000);
        this.continueToReviewAndSignPage();
        browser.pauseBrowser(2000);
    }

    /*Below functions are deprecated.
    //deprecated below function. replace with this function -->selectOtherHealthCoverageInfo()
    fillOtherHealthCoverageInfoAndContinue(index) {
        this.continueToOtherHealthCoveragePage();
        this.selectOtherHealthCoverageInfo(index)
    }
    //deprecated below function. replace with this function -->selectReconciliationOfAptcInfo() 
    fillReconciliationOfAptcInfoAndContinue(index) {
        this.continueToReconciliationAptcPage();
        this.selectReconciliationOfAptcInfo(index)
    }
    //deprecated below function. replace with this function -->selectEmployerCoverageDetailInfo()
    fillEmployerCoverageDetailInfoAndContinue(index) {
        this.continueToEmployerCoverageDetailPage();
        this.selectEmployerCoverageDetailInfo(index)
    }
    //deprecated below function. replace with this function -->selectStateEmployeeHealthBenefitInfo()
    fillStateEmployeeHealthBenefitInfoAndContinue(index) {
        this.selectStateEmployeeHealthBenefitInfo(index)
    }
    //deprecated below function. replace with this function -->selectAdditionalInfo()
    fillAdditionalInfoAndContinue(index) {
        this.selectAdditionalInfo(index);

    }
    */
}

module.exports = new AdditionalInformationPage();

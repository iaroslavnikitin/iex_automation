const prop = require('../../common.utils/PropertyReader');
var state = prop.getEnvName();
const  global = require('../Global_include');
const stateLocator_HealthPlanDisplay = require('../../../resources/selectors/exchange/' + state + '/PlanDisplay/HealthPlanDisplayPageObject.json');
const  locator = require('../../../resources/selectors/common/PlanDisplay/PreferencesPageObject.json');
const  commnlocator = require('../../pagemodels/PlanDisplay/CommonPlanDisplayFunction.js');
const locators_AnonymousTT =  require('../../../resources/selectors/common/Anonymous/ToolTipsValidationObjects.json');
//const stateLocators_AnonymousTT =   require('../../../resources/selectors/exchange/' + state + '/Anonymous/ToolTipValidationsObjects.json');
const content_AnonymousTT = require('../../../resources/content/common/Anonymous/ToolTipValidation.content.js');
//const stateContent_AnonymousTT = require('../../../resources/content/exchange/' + state + '/Anonymous/PreEligibilityPage.content.js');

const browser = require('../../base/Browser.js');
const assert = require('../../base/Assert.js');
const logger=require('../../common.utils/LoggerUtil');




class ToolTipValidationPage{

verifyTTonPreElegibilityPage(){
   /*
    let locator_arr = [
        eval(locators_PreEle.lbl_tobaccoUse),
        eval(stateLocator_PreEleRsult.lbl_nativeAmerican),
        eval(stateLocator_PreEleRsult.lbl_seekingCoverage),
        eval(stateLocators_AnonymousTT.lbl_taxHouseholdIncome)
    ];
    let content_arr = [content_AnonymousTT.tobaccoUse,
        content_AnonymousTT.nativeAmerican,
        content_AnonymousTT.needsCoverage,
        content_AnonymousTT.taxHouseholdIncome
    ]
    this.verifyTooltip(locator_arr,content_arr);
*/
};

verifyTTonPreElegibilityResultPage(){
 
    let locator_arr = [
        eval(locators_AnonymousTT.lbl_coInsurance),
        eval(locators_AnonymousTT.lbl_coPay),
        eval(locators_AnonymousTT.lbl_deductible)
    ];
    let content_arr = [
        content_AnonymousTT.coInsurance,
        content_AnonymousTT.coPay,
        content_AnonymousTT.deductible
    ]
    this.verifyTooltip(locator_arr,content_arr);

};

verifyTTonPreferencePage(){
    this.verifyTTonDoctorVisitsPage();
    browser.click(eval(locator.btn_next));
    this.verifyTTonPriscriptionPage();
    browser.click(eval(locator.btn_pnext));
    this.verifyTTonDrugSelctionPage();
    browser.click(eval(locator.btn_subscriptionNxt));
    this.verifyTTonChildDentalPage();
    browser.click(eval(locator.viewPlans));
};
verifyTTonPlanDisplayPage(){
    let locator_arr = [
        eval(stateLocator_HealthPlanDisplay.label_EPO),
        eval(stateLocator_HealthPlanDisplay.label_PPO),
        eval(stateLocator_HealthPlanDisplay.label_HMO),
        eval(locators_AnonymousTT.lbl_HSAEligible),
        eval(locators_AnonymousTT.lbl_CsrEligible),
        eval(locators_AnonymousTT.lbl_MetelLevel),
        eval(stateLocator_HealthPlanDisplay.label_Catastrophic),
        eval(locators_AnonymousTT.lbl_yearlyDeductible),
        eval(locators_AnonymousTT.lbl_psEligibilityAmount),
        eval(locators_AnonymousTT.lbl_CSR), //t
        eval(locators_AnonymousTT.lbl_CpTile),
        eval(locators_AnonymousTT.lbl_PrimaryCareVisits),
        eval(locators_AnonymousTT.lbl_GenericDrugs),
        eval(locators_AnonymousTT.lbl_YearlyDeductible),
        //eval(locators_AnonymousTT.lbl_OutOfPocketMax) //t
    ];

    let content_arr = [
        content_AnonymousTT.EPO,
        content_AnonymousTT.PPO,
        content_AnonymousTT.HMO,
        content_AnonymousTT.HSAEligible,
        content_AnonymousTT.CSREligible,
        content_AnonymousTT.metalLevel,
        content_AnonymousTT.Catastrophic,
        content_AnonymousTT.yearlyDeductible,
        content_AnonymousTT.psEligibilityAmount,
        content_AnonymousTT.CSR, //t
       content_AnonymousTT.cp_tile,
        content_AnonymousTT.primaryCareVisits,
        content_AnonymousTT.genericDrugs,
        content_AnonymousTT.yearlyDeductible,
      // content_AnonymousTT.OutOfPocketMax  // t
    ];
    this.verifyTooltip(locator_arr,content_arr);


};
verifyTTonPlanDetailsPage(){
    
    let locator_arr = [
         //eval(locators_AnonymousTT.lbl_totalExpenseEstimate), //t
          eval(locators_AnonymousTT.lbl_PrimaryCareVisit),
          //eval(locators_AnonymousTT.lbl_GenericDrugs),
           eval(locators_AnonymousTT.lbl_yearlyDeductible),
            eval(locators_AnonymousTT.lbl_yearlyDeductible), //t
           eval(locators_AnonymousTT.lbl_OutOfPocketMaximum), //t
                eval(locators_AnonymousTT.lbl_HSACompatible), //t
                eval(locators_AnonymousTT.lbl_specialistVisit),
                eval(locators_AnonymousTT.lbl_otherPractitionerOfficeVisit),
                eval(locators_AnonymousTT.lbl_preventiveCare),
                eval(locators_AnonymousTT.lbl_inpatientHospitalServices),
                eval(locators_AnonymousTT.lbl_inNetwork),
                eval(locators_AnonymousTT.lbl_outofNetwork),
               
            ];
        
            let content_arr = [
            //content_AnonymousTT.totalExpenseEstimate, //t
             content_AnonymousTT.primaryCareVisit,
             //content_AnonymousTT.genericDrug,
              content_AnonymousTT.YearlyDeductible,
            content_AnonymousTT.YearlyDeductible, //t
              content_AnonymousTT.outOfPocketMaximum, //t
                content_AnonymousTT.HSACompatible, //t
                content_AnonymousTT.specialistVisit,
               content_AnonymousTT.otherPractitionerOfficeVisit,
                content_AnonymousTT.preventiveCare,
                content_AnonymousTT.inpatientHospitalServices,
                content_AnonymousTT.inNetwork,
                content_AnonymousTT.outofNetwork,
                
            ];
        
            this.verifyTooltip(locator_arr,content_arr);
        browser.pauseBrowser(10000);
        commnlocator.clickBacktoPlanDisplayPage();
        browser.pauseBrowser(10000);
};
verifyTTonDentalPlanDisplayPage(){
    let locator_arr = [
                eval(stateLocator_HealthPlanDisplay.label_PPO),
                eval(locators_AnonymousTT.lbl_yearlyDeductible),
                eval(locators_AnonymousTT.lbl_YearlyDeductible),
                eval(locators_AnonymousTT.lbl_OutOfPocketMax)
               
            ];
        
            let content_arr = [
                content_AnonymousTT.PPO,
                content_AnonymousTT.yearlyDeductible,
                content_AnonymousTT.yearlyDeductible,
                content_AnonymousTT.OutOfPocketMaxDental

                     ];
            this.verifyTooltip(locator_arr,content_arr);
};
verifyTTonDentalPlanDetailsPage(){
    let locator_arr = [
         eval(locators_AnonymousTT.lbl_YearlyDeductible),
         eval(locators_AnonymousTT.lbl_OutOfPocketMaximum),
         eval(locators_AnonymousTT.lbl_inNetwork),
         eval(locators_AnonymousTT.lbl_outofNetwork),
               
            ];
        
    let content_arr = [
        content_AnonymousTT.yearlyDeductible,
        content_AnonymousTT.OutOfPocketMaxDental,
        content_AnonymousTT.inNetworkDental,
        content_AnonymousTT.outofNetwork,
                
            ];
        
this.verifyTooltip(locator_arr,content_arr);

};

verifyTTonCartDetailsPage(){
    let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
    var healthResults = global.updateDataJson.households[householdIndex];
    var dentalResults = global.updateDataJson.households[householdIndex];
    logger.log("healthResults",healthResults);
    logger.log("dentalResults",dentalResults);

    let locator_arr = [
        eval(locators_AnonymousTT.lbl_Details),
        eval(locators_AnonymousTT.lbl_TotalMonthlyDue)        
              
           ];
       
   let content_arr = [
       content_AnonymousTT.details,
       content_AnonymousTT.TotalMonthlyDue
               
           ];
       
this.verifyTooltip(locator_arr,content_arr);
   // let result = this.getPlanDetails(0,"healthPlan");

};

verifyTTonDoctorVisitsPage(){
    let locator_arr = [eval(locators_AnonymousTT.lbl_medicalService)];
    let content_arr = [content_AnonymousTT.medicalService];
    this.verifyTooltip(locator_arr,content_arr);
}
verifyTTonPriscriptionPage(){
    let locator_arr = [eval(locators_AnonymousTT.lbl_prescriptionDrug)];
    let content_arr = [content_AnonymousTT.prescriptionDrug];
    this.verifyTooltip(locator_arr,content_arr);
}
verifyTTonDrugSelctionPage(){
    let locator_arr = [eval(locators_AnonymousTT.lbl_doYouKnow)];
    let content_arr = [content_AnonymousTT.doYouKnow]
    this.verifyTooltip(locator_arr,content_arr);
}
verifyTTonChildDentalPage(){
    let locator_arr = [eval(locators_AnonymousTT.lbl_childrenDental),eval(locators_AnonymousTT.lbl_HSAEligible)];
    let content_arr = [content_AnonymousTT.childrenDental,content_AnonymousTT.hsaEligible,]
   this.verifyTooltip(locator_arr,content_arr);
}



verifyTooltip(locatorsArray, contentArray) {
    logger.log("verify tooltip Page");
    for(let i=0;i< locatorsArray.length;i++){
       // browser.waitForElementToDisplay(locatorsArray[i]);
       browser.pauseBrowser(4000);
        logger.log("contentArray: ", contentArray[i]);
        locatorsArray[i].scrollIntoView();
        locatorsArray[i].moveTo();
        var ToolTipText = $(`a[data-original-title*="${contentArray[i]}"]`);
        logger.log("***** Assert "+ locatorsArray[i].getText()+" ToolTip is displayed");
        
        
        var isToolTipTextDisplayed=ToolTipText.isDisplayed();
        logger.log("ToolTip Present ?: ", isToolTipTextDisplayed);
        if(isToolTipTextDisplayed){
            assert.assertElementIsVisible(ToolTipText);
        }
        else{
            var toolTipText = browser.getAttributeValue(locatorsArray[i],'data-original-title');
            logger.log("Attribute Value",toolTipText);
            assert.assertEqual(toolTipText,contentArray[i]);
           // assert.assertAttributeContainsText(locatorsArray[i],'data-original-title',contentArray[i]);
        }
        
    }     
}

}
module.exports = new ToolTipValidationPage();
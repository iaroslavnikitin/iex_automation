const state=stateProfile;
const global = require('../../pagemodels/Global_include');
const constants = require('../../common.utils/Constants')

const  locator = require('../../../resources/selectors/common/PlanDisplay/PreferencesPageObject.json');
const content=require('../../../resources/content/common/PlanDisplay/PreferencesPage.content');
const stateContent=require('../../../resources/content/exchange/'+state+'/PlanDisplay/PreferencesPage.content');

const assert = require('../../base/Assert');
const browser = require('../../base/Browser.js');
const logger=require('../../common.utils/LoggerUtil');

const healthPlan = require('../../pagemodels/PlanDisplay/HealthPlanDisplayPage');




class PreferencesPage{

    /**
     * Author: Artem
     * This function will create anonumous URL using data from JSON and redirect to anonymous shopping URL
     */
    navigateToAnonymousShoppingUrl(fileName) {
        let file = require('../../../resources/data/Common/Anonymous/'+fileName);
        var anonymousUrl = browser.getAnonymousShoppingUrl(file);
        browser.navigateToGivenUrl(anonymousUrl);
        this.waitForPreferencesPageLoad();
    }

    waitForPreferencesPageLoad()
    {
        if (state.toUpperCase() == constants.STATE_MN || state.toUpperCase() == constants.STATE_CA)
            browser.waitForPageToLoad(eval(locator.pageHeader), content.preferences_PageTitle);
        else
            browser.waitForPageToLoad(eval(locator.pageHeader), content.preferencesPageHeader);
    }
   
    clickSkipToViewPlans(){
       browser.click(eval(locator.btn_skipToViewPlan));
       healthPlan.waitForHealthPlansPageToLoad();
    }

    clickNext(){
        browser.click(eval(locator.next_btn));
    }

    clickBack(){
        browser.click(eval(locator.back_btn));
    }

    clickReset(){
        browser.click(eval(locator.button_reset));
    }


    //need to update - not applicable for smokes
    verifyElementsOfDoctorVisits(){
        let doctorVisitsElements = [eval(locator.doctorVisits["doctorVisits"]),eval(locator.doctorVisits["1_2times"]),eval(locator.doctorVisits["3_4times"]),
            eval(locator.doctorVisits["5_11times"]), eval(locator.doctorVisits.gt12times)]

        let dataElements = [data.doctorVisits,data.times1_2,data.times3_4,
        data.times5_11, data.timesgt_12]
        
        for(let index=0;index< 4;index++){
            browser.click(eval(locator.rb_doctorVisit));
        }

        for(let i=0;i< doctorVisitsElements.length;i++){
             let result = doctorVisitsElements[i].getText() == dataElements[i];
             assert.assertTrue(result);
            
    }

    browser.click(eval(locator.Reset_DV));
}

    //need to update - not applicable for smokes

verifyElementsOfMonthlySubscription(){

    browser.click(eval(locator.btn_next));
    browser.pauseBrowser(1000)
    let monthlySubsciptionElements = [eval(locator.monthlySubscription["monthlysub"]),eval(locator.monthlySubscription["0_2"]),eval(locator.monthlySubscription["3_4"]),
    eval(locator.monthlySubscription["5_11"]), eval(locator.monthlySubscription.gt12)]

    let dataElements2 = [data.monthlySubsciption,data.mS0_2,data.mS3_4,
        data.mS5_11, data.mSgt_12]

        for(let index2=0;index2<4;index2++){
            browser.click(eval(locator.rb_monthlySubscription));
        }
    for(let i=0;i< monthlySubsciptionElements.length;i++){
            let result2 = monthlySubsciptionElements[i].getText() == dataElements2[i];
            assert.assertTrue(result2);
   }

   browser.click(eval(locator.Reset_MS));

}
    //need to update - not applicable for smokes

verifyElementsOfPrescriptionDrug(){

    browser.click(eval(locator.btn_pnext));
    browser.pauseBrowser(1000)

    let result = eval(locator.add5Drugs).getText() == data.add5drugs;
    assert.assertTrue(result);

    browser.setValueInTextField(eval(locator.tb_drug), data.Lipitor);
    browser.click(eval(locator.druglipitor_click));
    browser.click(eval(locator.rb_1drug));
    browser.click(eval(locator.selectDosage));

    browser.setValueInTextField(eval(locator.tb_drug), data.Atorvastatin);
    browser.click(eval(locator.drugAtorvastatin1_click));
    browser.click(eval(locator.rb_1drug));
    browser.click(eval(locator.selectDosage));

    browser.setValueInTextField(eval(locator.tb_drug), data.Atorvastatin);
    browser.click(eval(locator.drugAtorvastatin2_click));
    browser.click(eval(locator.rb_1drug));
    browser.click(eval(locator.selectDosage));
    
    browser.setValueInTextField(eval(locator.tb_drug), data.UtaCapsule);
    browser.click(eval(locator.UtaCapsule));
    browser.click(eval(locator.rb_1drug));
    browser.click(eval(locator.selectDosage));

    browser.setValueInTextField(eval(locator.tb_drug), data.Atorvastatin);
    browser.click(eval(locator.drugAtorvastatin3_click));
    browser.click(eval(locator.rb_1drug));
    browser.click(eval(locator.selectDosage));

    let result2 = eval(locator.important).getText() == data.important;
    assert.assertTrue(result2);

browser.click(eval(locator.Reset_drug));

}
    //need to update - not applicable for smokes

verifyElementsOfOptionalBenefits(){
    browser.click(eval(locator.btn_subscriptionNxt));

    let result = eval(locator.optionalBenefit).getText().substring(0,91) == data.optionalBenefit;
   logger.log(eval(locator.optionalBenefit).getText().substring(0,91))
   logger.log(data.optionalBenefit)
    assert.assertTrue(result);

    let result2 = eval(locator.note).getText() == data.note;
   logger.log(eval(locator.note).getText())
   logger.log(data.note)
    assert.assertTrue(result2);

    browser.click(eval(locator.cb_childDental));
    browser.click(eval(locator.cb_acupuncture));

    browser.click(eval(locator.Reset_benefit));


}
selectPreferences()
{
    let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
    if(state.toUpperCase() == constants.STATE_NV){
        this.performNvPreference(global.updateDataJson.households[householdIndex].preferences);
    }
    else if(state.toUpperCase() == constants.STATE_PA){
        this.performPaPreference(global.updateDataJson.households[householdIndex].preferences);
    }
    else if(state.toUpperCase() == constants.STATE_NJ){
        this.performNjPreference(global.updateDataJson.households[householdIndex].preferences);
    }
    else if(state.toUpperCase() == constants.STATE_ID){
        this.performIDPreference(global.updateDataJson.households[householdIndex].preferences);
    }
    else if(state.toUpperCase()==constants.STATE_MN){
        this.performMNPreference(global.updateDataJson.households[householdIndex].preferences);
    }
    else if(state.toUpperCase()==constants.STATE_CA){
        this.performCaPreference(global.updateDataJson.households[householdIndex].preferences);
    }
    healthPlan.waitForHealthPlansPageToLoad();
}

performNvPreference(preferencesData)
    {        
    this.selectDoctorVisits(stateContent.doctorVisits[preferencesData.selectDoctorVisits]);
    this.clickNext(locator.next_btn);
    browser.waitUntil(() => eval(locator.rb_monthlySubscriptions.rb_0_2).isDisplayed());
    this.selectMonthlyPrescriptions(stateContent.monthlySubsciption[preferencesData.selectMonthlyPrescriptions]);
    this.clickNext(locator.next_btn);
    browser.waitUntil(() =>eval(locator.tb_drug).isDisplayed());
    this.selectDrug(preferencesData.drug,preferencesData.Lipitor);
    browser.click(eval(locator.selectDosage));
    this.clickNext(locator.next_btn);
    browser.pauseBrowser(constants.PAUSE_BROWSER_3000);
    browser.waitUntil(() => eval(locator.cb_childDental).isDisplayed());
    browser.click(eval(locator.cb_childDental));
    browser.pauseBrowser(constants.PAUSE_BROWSER_5000);
    browser.click(eval(locator.viewPlans));
    healthPlan.waitForHealthPlansPageToLoad();

    }

    performPaPreference(preferencesData)
    {

        browser.click(eval(locator.docSearch));
        if(preferencesData.dropSearch=="doctor"){
        browser.click(eval(locator.docdrop));
        }
        else if(preferencesData.dropSearch=="facility"){
            browser.click(eval(locator.facilitydrop));
        }
        else{
            browser.click(eval(locator.facilitydrop));
        }

        this.selectDocOrFacility(preferencesData.doctor);
        this.clickNext(locator.next_btn);
        browser.waitUntil(() => eval(locator.rb_doctorVisits.rb_1_2times).isDisplayed());
        this.selectDoctorVisits(stateContent.doctorVisits[preferencesData.selectDoctorVisits]);
        browser.pauseBrowser(constants.PAUSE_BROWSER_4000)
        this.clickNext(locator.next_btn);
        browser.waitUntil(() => eval(locator.rb_monthlySubscriptions.rb_0_2).isDisplayed());
        this.selectMonthlyPrescriptions(stateContent.monthlySubsciption[preferencesData.selectMonthlyPrescriptions]);
        this.clickNext(locator.next_btn);
        browser.waitUntil(() =>eval(locator.tb_drug).isDisplayed());
        this.selectDrug(preferencesData.drug,preferencesData.Lipitor);
        browser.click(eval(locator.selectDosage));
        browser.click(eval(locator.btn_prescriptionSubmit));
        healthPlan.waitForHealthPlansPageToLoad();


    }


    performNjPreference(preferencesData)
    {

        browser.click(eval(locator.docSearch));
        if(preferencesData.dropSearch=="doctor"){
            browser.click(eval(locator.docdrop));
            }
            else if(preferencesData.dropSearch=="facility"){
                browser.click(eval(locator.facilitydrop));
            }
            else{
                browser.click(eval(locator.facilitydrop));
            }

        this.selectDocOrFacility(preferencesData.doctor);
    
        this.clickNext(locator.next_btn);
        browser.waitUntil(() => eval(locator.rb_doctorVisits.rb_1_2times).isDisplayed());
        this.selectDoctorVisits(stateContent.medicalService[preferencesData.medicalService_use]);
        browser.pauseBrowser(constants.PAUSE_BROWSER_4000);
        this.clickNext(locator.next_btn);
        browser.waitUntil(()=>eval(locator.rb_monthlySubscriptions.rb_0_2).isDisplayed());
        this.selectMonthlyPrescriptions(stateContent.prescriptionDrug[preferencesData.prescriptionDrug_use]);
        this.clickNext(locator.next_btn);
        //browser.pauseBrowser(constants.PAUSE_BROWSER_4000);
        browser.waitUntil(() =>eval(locator.tb_drug).isDisplayed());
        this.selectDrug(preferencesData.drug,preferencesData.Lipitor);
        browser.click(eval(locator.selectDosage));
        browser.click(eval(locator.btn_prescriptionSubmit));
        healthPlan.waitForHealthPlansPageToLoad();

    }


    performCaPreference(preferencesData)
    {

        browser.click(eval(locator.docSearch));
        if(preferencesData.dropSearch=="doctor"){
            browser.click(eval(locator.docdrop));
        }
        else if(preferencesData.dropSearch=="facility"){
            browser.click(eval(locator.facilitydrop));
        }
        else{
            browser.click(eval(locator.facilitydrop));
        }

        this.selectDocOrFacility(preferencesData.doctor);
        this.clickNext(locator.next_btn);
        browser.waitUntil(()=>eval(locator.rb_doctorVisits.rb_1_2times).isDisplayed());
        this.selectDoctorVisits(stateContent.medicalService[preferencesData.medicalServiceUse]);
        browser.pauseBrowser(constants.PAUSE_BROWSER_4000)
        this.clickNext(locator.next_btn);
        browser.waitUntil(()=>eval(locator.rb_monthlySubscriptions.rb_0_2).isDisplayed());
        this.selectMonthlyPrescriptions(stateContent.prescriptionDrug[preferencesData.prescriptionDrugUse]);
        browser.click(eval(locator.btn_prescSubmit));
        healthPlan.waitForHealthPlansPageToLoad();


    }

    performIDPreference(preferencesData)
    {
        browser.click(eval(locator.docSearch));
        if(preferencesData.dropSearch=="doctor"){
            browser.click(eval(locator.docdrop));
        }
        else if(preferencesData.dropSearch=="facility"){
            browser.click(eval(locator.facilitydrop));
        }
        else{
            browser.click(eval(locator.facilitydrop));
        }
        this.selectDocOrFacility(preferencesData.doctor);
        browser.click(eval(locator.btn_psNext));
        browser.waitUntil(()=>eval(locator.doctor_visits["1_2times"]).isDisplayed());
        this.selectDoctorVisitsID(stateContent.doctorVisits[preferencesData.selectDoctorVisits]);
        browser.pauseBrowser(constants.PAUSE_BROWSER_4000);
        browser.click(eval(locator.btn_next));
        browser.waitUntil(()=>eval(locator.monthly_subscription["0_2"]).isDisplayed());
        this.selectMonthlyPrescriptionsID(stateContent.monthlySubsciption[preferencesData.selectMonthlyPrescriptions]);
        browser.click(eval(locator.btn_pnext));
        browser.waitUntil(() => eval(locator.tb_drug).isDisplayed());
        this.selectDrug(preferencesData.drug,preferencesData.Lipitor);
        browser.click(eval(locator.selectDosage));
        browser.pauseBrowser(constants.PAUSE_BROWSER_4000);
        browser.click(eval(locator.btn_subscriptionNxt));
        browser.pauseBrowser(constants.PAUSE_BROWSER_4000);
        browser.waitUntil(()=>eval(locator.cb_childDental).isDisplayed());
        browser.click(eval(locator.cb_childDental));
        browser.pauseBrowser(constants.PAUSE_BROWSER_5000);
        browser.click(eval(locator.viewPlans));
        healthPlan.waitForHealthPlansPageToLoad();
    }

    performMNPreference(preferencesData)
    {
        
        this.selectDoctorVisits(stateContent.medicalService[preferencesData.medicalService_use]);
        browser.pauseBrowser(constants.PAUSE_BROWSER_4000);
        browser.click(eval(locator.btn_next));
        browser.waitUntil(()=>eval(locator.rb_monthlySubscriptions.rb_0_2).isDisplayed());
        this.selectMonthlyPrescriptions(stateContent.prescriptionDrug[preferencesData.prescriptionDrug_use]);
        browser.click(eval(locator.btn_pnext));
        browser.waitUntil(() => eval(locator.tb_drug).isDisplayed());
        this.selectDrug(preferencesData.drug,preferencesData.Lipitor);
        browser.click(eval(locator.selectDosage));
        browser.pauseBrowser(constants.PAUSE_BROWSER_4000);
        browser.click(eval(locator.btn_subscriptionNxt));
        browser.waitUntil(()=>eval(locator.cb_childDental).isDisplayed());
        browser.click(eval(locator.cb_childDental));
        browser.pauseBrowser(constants.PAUSE_BROWSER_5000);
        browser.click(eval(locator.viewPlans));
        healthPlan.waitForHealthPlansPageToLoad();

    }



selectDoctorVisits(visits){
    if(eval(locator.doctorVisits["1_2times"]).getText().includes(String(visits))){
        browser.click(eval(locator.rb_doctorVisits.rb_1_2times));
    }
    else if(eval(locator.doctorVisits["3_4times"]).getText().includes(String(visits))){
        browser.click(eval(locator.rb_doctorVisits.rb_3_4times));
    }
    else if(eval(locator.doctorVisits["5_11times"]).getText().includes(String(visits))){
        browser.click(eval(locator.rb_doctorVisits.rb_5_11times));
    }
    else if(eval(locator.doctorVisits["gt12times"]).getText().includes(String(visits))){
        browser.click(eval(locator.rb_doctorVisits.rb_gt12times));
    }
}
selectDoctorVisitsID(visits){
    if(eval(locator.doctor_visits["1_2times"]).getText().includes(String(visits))){
        browser.click(eval(locator.doctor_visits["1_2times"]));
    }
    else if(eval(locator.doctor_visits["3_4times"]).getText().includes(String(visits))){
        browser.click(eval(locator.doctor_visits["3_4times"]));
    }
    else if(eval(locator.doctor_visits["5_11times"]).getText().includes(String(visits))){
        browser.click(eval(locator.doctor_visits["5_11times"]));
    }
    else if(eval(locator.doctor_visits["gt12times"]).getText().includes(String(visits))){
        browser.click(eval(locator.doctor_visits["gt12times"]));
    }
}

selectMonthlyPrescriptions(prescriptions){
    if(eval(locator.monthlySubscription["0_2"]).getText().includes(String(prescriptions))){
        browser.click(eval(locator.rb_monthlySubscriptions.rb_0_2));
    }
    else if(eval(locator.monthlySubscription["3_4"]).getText().includes(String(prescriptions))){
        browser.click(eval(locator.rb_monthlySubscriptions.rb_3_4));
    }
    else if(eval(locator.monthlySubscription["5_11"]).getText().includes(String(prescriptions))){
        browser.click(eval(locator.rb_monthlySubscriptions.rb_5_11));
    }
    else if(eval(locator.monthlySubscription["gt12"]).getText().includes(String(prescriptions))){
        browser.click(eval(locator.rb_monthlySubscriptions.rb_gt12));
    }
}

selectMonthlyPrescriptionsID(prescriptions){
   logger.log(eval(locator.monthly_subscription["0_2"]).getText());
   logger.log(eval(locator.monthly_subscription["3_4"]).getText());
   logger.log(eval(locator.monthly_subscription["5_11"]).getText());
   logger.log(eval(locator.monthly_subscription["gt12"]).getText());

    if(eval(locator.monthly_subscription["0_2"]).getText().includes(String(prescriptions))){
        browser.click(eval(locator.monthly_subscription["0_2"]));
    }
    else if(eval(locator.monthly_subscription["3_4"]).getText().includes(String(prescriptions))){
        browser.click(eval(locator.monthly_subscription["3_4"]));
    }
    else if(eval(locator.monthly_subscription["5_11"]).getText().includes(String(prescriptions))){
        browser.click(eval(locator.monthly_subscription["5_11"]));
    }
    else if(eval(locator.monthly_subscription["gt12"]).getText().includes(String(prescriptions))){
        browser.click(eval(locator.monthly_subscription["gt12"]));
    }
}

selectDrug(drug,drugname){
    browser.setValueInTextField(eval(locator.tb_drug), drugname);
    browser.click(eval(locator.druglipitor_click));
    let id2=$('#drugDosages').$('.gutter10').$$('label');
    for(let index = 0 ; index < id2.length; index++){
       logger.log(eval(locator.label_1drug).getText())
        if(eval(locator.label_1drug).getText().includes(drug)){
            browser.click(eval(locator.rb_1drug));
        }
    }
}

selectDocOrFacility(docOrFac){
    let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
    browser.selectByIndex(eval(locator.sb_providerDistance),7); //choosing 100 miles for provider distance
    browser.setValueInTextField(eval(locator.tb_doctor),docOrFac);
    browser.pauseBrowser(constants.PAUSE_BROWSER_5000);
    let id2=$$('#ui-id-1 > li');
   logger.log(id2.length)
    for(let index = 0 ; index < id2.length-1; index++){
       logger.log(eval(locator.drop_list).getText())
        if(eval(locator.drop_list).getText().includes(docOrFac)){
           browser.click(eval(locator.drop_list));
           global.updateDataJson.households[householdIndex].preferences.preferDoc=eval(locator.preferDoc).getText().substring(0,11);
           break;
        }
    }
    browser.pauseBrowser(constants.PAUSE_BROWSER_5000);

}




}


module.exports = new PreferencesPage();

const locatorJson = require('../../../GHIX_UI_Automation_Tests/resources/selectors/common/UserAccountManagement/LogInObject.json');
const DbHelper = require('../../tests/common.utils/DbHelper');
const moment = require('moment');
var date;
var currentCovYear;
var applicationType;
var coverageDate;
var applicationYear = year;
const prop = require('../../tests/common.utils/PropertyReader');
var globalOEP = null;
var state=prop.getEnvName();
const browser = require('../base/Browser');
class CommonConfig{

    /**
         * Function to query currentCoverageYear from DB and return.
    */
    async getCurrentCoverageYearFromDB() {
        let dbHelper = new DbHelper(url);
        let query = "select property_value from gi_app_config where property_key like '%iex.current_coverage%'";
        let key = 'property_value'
        console.log(query);
        let currentCovYear = await dbHelper.getResultFromDB(query, key)
        console.log("*****Current Coverage Year is  :" + currentCovYear);
        return currentCovYear;
    }
    /**
         * Function to query OE Coverage Effective Date from DB and return.
    */
    async getOECoverageEffectiveDateFromDB() {
        let dbHelper = new DbHelper(url);
        let query = "select property_value from gi_app_config where property_key like '%iex.indportal.global_oe_coverage_effective_date%'";
        let key = 'property_value';
        let oeCoverageEffectiveDate = await dbHelper.getResultFromDB(query, key)
        console.log("*****OE Coverage Effective Date from DB is  :" + oeCoverageEffectiveDate);
        return oeCoverageEffectiveDate;
    }

    /**
         * Returns the Server Date in specified format.
    */
    getServerDate(){
        if(state.toUpperCase() == 'ID'){
            date = moment().format("MM/DD/YYYY");
            console.log("ServerDate: " + date);
        }
        else {
            date = eval(locatorJson.serverDate).getText().substring(13,);
            date = moment(date).format("MM/DD/YYYY");
            console.log("ServerDate: " + date);
        }
        return date;
    }

    /**
     * Returns JSON object with Server info on [url]/hix/ui/ping
     * If not logged in the info looks like this
     *  {   "lastAccessedTime":1606104063060,
     *      "inactiveIntervalMin":30,
     *      "creationTime":1606104063060,
     *      "now":1606104063112,
     *      "nowTimeShifted":1606104063112,
     *      "sessionMaxIdle":1800}
     * Where "now" is current Epoch server time
     * @returns {JSON object}
     */
    getServerInfo(){
        browser.navigateToGivenUrl(url+'ui/ping');
        let res = JSON.parse($('pre').getText());
        return res;
    }

    /**
     * Navigates to  [url]/ghix-batch/jobs/jobs/${batchJobName}
     *
     * @Precondition: logged in as opsadmin -> click on Batch -> click on Manage Jobs
     *
     */
    navigateToBatchJobURL(batchJobName) {
        browser.navigateToGivenUrl(`https://${server}/ghix-batch/jobs/jobs/${batchJobName}`);
    }

    /**
         * Returns OEP On or OFF using applicationYear as parameter.
         * @param {String} : applicationYear.
    */
    inGlobalOEPOrQEP(applicationYear){
        date = this.getServerDate();
        applicationType = this.checkServerInOEP(applicationYear, date);
    }

    /**
         * Returns OEP On or OFF using isAfter and isBefore Functions, applicationYear and serverDate as parameter.
         * @param {String} : applicationYear.
         * @param {date} : Server Date.
    */
    async checkServerInOEP(applicationYear,date){
    let inGlobalOEPOrQEP = "QEP"; 
    currentCovYear = await this.getCurrentCoverageYearFromDB();
    if(applicationYear ==currentCovYear){

    let dbHelper = new DbHelper(url);  
    let query = "select property_value from gi_app_config where property_key like '%iex.current_oe_end_date%'";  
    let key = 'property_value'     
    console.log(query);
    let endDate = await dbHelper.getResultFromDB(query, key)
    endDate = moment(endDate).format("MM/DD/YYYY");
    console.log("*****OEP End Date  :"+endDate);
    query = "select property_value from gi_app_config where property_key like '%iex.current_oe_start_date%'";
   
    console.log(query);
    let startDate = await dbHelper.getResultFromDB(query, key)
    startDate = moment(startDate).format("MM/DD/YYYY");
    console.log("*****OEP start Date  :"+startDate);

    console.log("date"+date);
    let isAfter = moment(date).isAfter(startDate);
    let isBefore = moment(date).isBefore(endDate);
  
    if( isBefore && isAfter) 
         inGlobalOEPOrQEP = "OEP";
    
    }
    console.log("Global OEP is   "+inGlobalOEPOrQEP);

return inGlobalOEPOrQEP;

    }


    /**
         * Calculate the coverage Start Date
         * @param {jsonFile}
    */
   getCoverageStartDate(ConfigJson) {
        let serverDate = this.getServerDate();
        let currentDate = parseInt(moment().format('DD'));
        let currentMonth = parseInt(moment().format('MM'));
        console.log(currentMonth)
        let currentYear = parseInt(moment().format('YYYY'));
        console.log(currentYear)
        //let coverageDate;
    //  let globalOEP=this.inGlobalOEPOrQEP(applicationYear);

        if (globalOEP == "OEP") {
        // coverageDate = this.getCoverageDateForOEP(currentDate,serverDate, ConfigJson);
        this.getCoverageDateForOEP(currentDate,serverDate, ConfigJson).then(val=>{coverageDate=val;});
        browser.waitUntil(() => coverageDate != undefined);
        }
        else {
            coverageDate = this.getCoverageDateForQEP(currentDate, serverDate, ConfigJson);
        }
        console.log("Coverage Start Date = " + coverageDate);
        return coverageDate;
    }
    /**
         * Calculate the coverage Start Date
         * @param {applicationYear}
    */
    getCoverageEndDate(configJson)
    {
        let coverageEndDate="12/31/"+configJson.coverageDate.substring(6);
        console.log("Coverage End Date ="+ coverageEndDate);
        return coverageEndDate;
    }
	
	async getCoverageDateForOEP(currentDate,serverDate, ConfigJson) {
        let coverageDate = await this.getOECoverageEffectiveDateFromDB();
        console.log("coverageDate ---------> " + coverageDate);
        console.log("ConfigJson.flowType ---------> " + ConfigJson.flowType);

        if (coverageDate == null && ConfigJson.flowType != undefined && ConfigJson.flowType.toUpperCase() == 'ANONYMOUS') {
            let coverageMonth="";
            let coverageYear = year;
            if (currentDate > 15) {
                coverageMonth = moment(serverDate).add(2, 'M').format('MM')
                coverageDate = coverageMonth + "/01/" + coverageYear;
            }
            if (currentDate <= 15) {
                coverageDate = moment(serverDate).add(1, 'M').format('MM/DD/YYYY');
                coverageDate = coverageDate.substring(0, 3) + "01" + coverageDate.substring(5, 10);
            }
        }
       
        console.log("Coverage Start Date =" + coverageDate);
        return coverageDate;
    }

	getCoverageDateForQEP(currentDate,serverDate,ConfigJson){
        let coverageDate = '';
        if (ConfigJson.eventType == 1) {
            coverageDate = moment(serverDate).add(1, 'M').format('MM/DD/YYYY');
            coverageDate = coverageDate.substring(0, 3) + "01" + coverageDate.substring(5, 10);
        }

        else if (ConfigJson.eventType == 2) {
            coverageDate = moment(serverDate).add(1, 'M').format('MM/DD/YYYY');
            coverageDate = coverageDate.substring(0, 3) + "01" + coverageDate.substring(5, 10);
        }
        else if (ConfigJson.eventType == 3) {
            if (currentDate <= 15) {
                coverageDate = moment(serverDate).add(1, 'M').format('MM/DD/YYYY');
                coverageDate = coverageDate.substring(0, 3) + "01" + coverageDate.substring(5, 10);
            }
            else {
                coverageDate = moment(serverDate).add(2, 'M').format('MM/DD/YYYY');
                coverageDate = coverageDate.substring(0, 3) + "01" + coverageDate.substring(5, 10);
            }

        }
        else if (ConfigJson.eventType == 4) {
            coverageDate = moment(ConfigJson.eventDate).add(1, 'M').format('MM/DD/YYYY');
            coverageDate = coverageDate.substring(0, 3) + "01" + coverageDate.substring(5, 10);
        }
        else {
            console.log("If no event is passed, coverage date will be calculated for event 2(Marriage)");
            coverageDate = moment(serverDate).add(1, 'M').format('MM/DD/YYYY');
            coverageDate = coverageDate.substring(0, 3) + "01" + coverageDate.substring(5, 10);
        }

        console.log("Coverage Start Date =" + coverageDate);
        return coverageDate
    }

    /*Returs the number of days left to enroll before the open enrollment period ends */
    getRemainingOepDays() {
        let oepEndDate=null;
        let currentDate = moment().format("MM/DD/YYYY");
        this.getOepEndDate().then(oepdate => { oepEndDate = oepdate; });
        browser.waitUntil(() => oepEndDate !== null);
        let start = moment(currentDate, "MM/DD/YYYY");
        let end = moment(oepEndDate, "MM/DD/YYYY");
       let daysLeft =moment.duration(end.diff(start)).asDays();
       return daysLeft;
    }
     /*Returs the open enrollment period end date */
    async getOepEndDate(){
        let dbHelper = new DbHelper(url);
        let query = "select property_value from gi_app_config where property_key like '%iex.current_oe_end_date%'";
        let key = 'property_value'
        console.log(query);
        let endDate = await dbHelper.getResultFromDB(query, key)
        endDate = moment(endDate).format("MM/DD/YYYY");
        return endDate;
  
    }
     /**
         * Update Json file with Application Year , Application Type and Coverage Date.
         * @param {jsonFile}
    */
    getApplicationConfig(json){
        json.applicationYear=applicationYear;
       this.inGlobalOEPOrQEP(applicationYear);
        let promise = Promise.resolve(applicationType);
        promise.then(function (val) {
            applicationType = val;
            globalOEP = applicationType;
            json.applicationType=applicationType;
            
        });
        browser.waitUntil(() => json.applicationType != "");
        json.coverageDate=this.getCoverageStartDate(json);
        json.coverageEndDate=this.getCoverageEndDate(json);
      //  json.coverageDate="01/01/2021";
        console.log(JSON.stringify(json));
        return json;
    }

     /*Author: Monica Thaneer
     Returns if the given event is gated */
     async checkIfEventIsGated(caseNumber,applicationType,isFinancialFlag){
        let dbHelper = new DbHelper(url);
        let isFinancial='N'
        let query=""
        if(isFinancialFlag==true)
            isFinancial='Y';
        if(applicationType=="QEP")
        {
            query = `select is_gated from sep_enrollment_events where id in
            (
                select sep_enrollment_events_id from ssap_Applicant_events 
                where ssap_Application_event_id in (select id from ssap_application_events 
                             where ssap_application_id in (select id from ssap_Applications 
                                                     where id = (select id from ssap_Applications 
                                                               where case_number ='`+ caseNumber +`'))))and event_category='QUALIFYING_EVENT' and IS_FINANCIAL='`+isFinancial+`'`;
              
        }
        else
        if(applicationType=="SEP")
        {
            query = `select is_gated from sep_enrollment_events where id in
            ( select sep_enrollment_events_id from ssap_Applicant_events 
                where ssap_Application_event_id in 
                             (select id from ssap_application_events 
                             where ssap_application_id in (select id from ssap_Applications 
                                                     where id = (select id from ssap_Applications 
                                                               where case_number ='`+ caseNumber +`')))) and event_category not in ('OTHER') and IS_FINANCIAL='`+isFinancial+`'`;
        }
            let key = 'is_gated'
            console.log(query);
            let isGated = await dbHelper.getResultFromDB(query, key)
            return isGated;  
    }
}

module.exports = new CommonConfig();
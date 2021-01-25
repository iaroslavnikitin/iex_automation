const  global = require('../../Global_include'); 
const DbHelper = require('../../../common.utils/DbHelper');
const logger=require('../../../common.utils/LoggerUtil');
const browser=require('../../../base/Browser');
const assert=require('../../../base/Assert');
const enrollStatusMap = require('../../../../resources/data/enrollmentStatusMapping.json');
const enrollEventMap = require('../../../../resources/data/enrollmentEventMapping.json');
const moment = require('moment');



class EnrollmentDatabaseQueries{

   async verifyEnrollmentTableInDB(){
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
       
        logger.log("***** Verifying Enrollment Table Data In DB *****");
        let dbHelper = new DbHelper(url);      
        let enrollmentId = global.updateDataJson.households[householdIndex].healthPlanEnrollment.enrollmentID;
        logger.log ("***** Getting Details From Enrollment Table For Enrollment ID: "+enrollmentId);
        let query = "select id,enrollment_status_lkp,enrollment_confirmation_date,benefit_effective_date,benefit_end_date,gross_premium_amt,aptc_amt,csr_amt,net_premium_amt,cms_plan_id,payment_txn_id from enrollment where id="+enrollmentId;
        let result =await dbHelper.select(query);
        browser.waitUntil(()=>result!=undefined);
        let result_map = result[0];
        logger.log ("***** Query: "+query);
        logger.log ("***** Query result: "+JSON.stringify([...result_map]));
        assert.assertTrue(enrollStatusMap[result_map.get('enrollment_status_lkp')]==global.updateDataJson.households[householdIndex].healthPlanEnrollment.enrollStatus); 
        logger.log("***** Enrollment Status Data Matched In DB *****");
       
        let effectiveStartDateDB= this.formatDate(result_map.get('benefit_effective_date'));
        let effectiveEndDateDB= this.formatDate(result_map.get('benefit_end_date'));

        assert.assertTrue((effectiveStartDateDB+" - "+effectiveEndDateDB)==(global.updateDataJson.households[householdIndex].healthPlanEnrollment.effectiveStartDate+" - "+global.updateDataJson.households[householdIndex].healthPlanEnrollment.effectiveEndDate));
        logger.log("***** Effective Date Matched In DB *****");
        assert.assertTrue(result_map.get('net_premium_amt')==global.updateDataJson.households[householdIndex].healthPlanEnrollment.netPremium.replace("$","")); 
        logger.log("***** Net Premium Amount Matched In DB *****");
        assert.assertTrue(result_map.get('gross_premium_amt')==global.updateDataJson.households[householdIndex].healthPlanEnrollment.grossPremium.replace("$","")); 
        logger.log("***** Gross Premium Amount Matched In DB *****");
        assert.assertTrue(result_map.get('cms_plan_id')==global.updateDataJson.households[householdIndex].healthPlanEnrollment.cmsPlanId); 
        logger.log("***** CMS Plan ID Matched In DB *****");
        logger.log("***** Verified Enrollment Table Data In DB *****");

    }
//returns date in MM/DD/YYYY format
    formatDate(effectiveDate) {
        let d = effectiveDate;
        return ((d.getMonth() + 1) < 10 ? ('0' + (d.getMonth() + 1)) : (d.getMonth() + 1)) + '/' + (d.getDate() < 10 ? ("0" + d.getDate()) : d.getDate()) + '/' + d.getFullYear();
    }

    async verifyEnrollmentPremiumTableInDB(enrollStatus)
    {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        logger.log("***** Verifying Enrollment Premium Table Data In DB *****");
        let dbHelper = new DbHelper(url);      
        let enrollmentId = global.updateDataJson.households[householdIndex].healthPlanEnrollment.enrollmentID;
        logger.log ("***** Getting Details From Enrollment Premium Table For Enrollment ID: "+enrollmentId);
        let query = "select id,enrollment_id,month,year,gross_prem_amt,aptc_amt,state_subsidy_amt,net_prem_amt from enrollment_premium where enrollment_id="+enrollmentId+" order by month";
        let result =await dbHelper.select(query);
        browser.waitUntil(()=>result!=undefined);
        logger.log ("***** Query: "+query);
        for(let i=0;i<result.length;i++)
        {
            let result_map = result[i];
            logger.log ("***** Query result: "+JSON.stringify([...result_map]));
            if(enrollStatus.toUpperCase() == 'CANCEL')
            {
                logger.log("Verifying Premium Data For Month Year: "+moment().month(i).format("MMMM")+" "+result_map.get('year'));
                assert.assertTrue(result_map.get('gross_prem_amt')== null);
                logger.log("***** Gross Premium Amount Matched *****");
                assert.assertTrue(result_map.get('net_prem_amt')== null);
                logger.log("***** Net Premium Amount Matched *****");
                assert.assertTrue(result_map.get('aptc_amt')== null);
                logger.log("***** APTC Amount Matched *****");
                assert.assertTrue(result_map.get('state_subsidy_amt')== null);
                logger.log("***** State Subsidy Amount Matched *****");
            }
        }       
        logger.log("***** Verified Enrollment Premium Table Data In DB *****"); 
    }
    async verifyEnrollmentEventTableInDB(enrollStatus)
    {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        logger.log("***** Verifying Enrollment Event Table Data In DB *****");
        let dbHelper = new DbHelper(url);      
        let enrollmentId = global.updateDataJson.households[householdIndex].healthPlanEnrollment.enrollmentID;
        logger.log ("***** Getting Details From Enrollment Event Table For Enrollment ID: "+enrollmentId);
        let query = "select event_type_lkp,event_reason_lkp,txn_identifier,extraction_status from enrollment_event where enrollment_id ='"+enrollmentId+"' and enrollee_id in (select id from enrollee where enrollment_id ='"+enrollmentId+"' and person_type_lkp in (select lookup_value_id from lookup_value where lookup_value_code in ('SUBSCRIBER', 'ENROLLEE')) order by id) order by creation_timestamp desc";
        result =await dbHelper.select(query);
        browser.waitUntil(()=>result!=undefined);
        let result_map = result[0];
        logger.log ("***** Query: "+query);
        logger.log ("***** Query result: "+JSON.stringify([...result_map]));
        if(enrollStatus.toUpperCase() == 'CANCEL')
        {
            assert.assertTrue(enrollEventMap[result_map.get('event_type_lkp')]=='Enrollments - Cancel Override');
            logger.log("***** Event Type Matched In DB *****");
        }
        assert.assertTrue(result_map.get('txn_identifier')=='EDIT_TOOL');
        logger.log("***** Transaction Identifier Matched In DB *****");
        logger.log("***** Verified Enrollment Event Table Data In DB *****"); 
    }
}
module.exports = new EnrollmentDatabaseQueries();
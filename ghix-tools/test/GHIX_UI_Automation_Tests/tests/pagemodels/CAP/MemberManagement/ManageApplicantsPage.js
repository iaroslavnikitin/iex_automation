const browser = require("../../../base/Browser.js");
const assert = require("../../../base/Assert.js");
const dataUtil = require("../../../common.utils/DataUtil");
const  global = require('../../Global_include');
const states = require("../../../../resources/data/states.json");
const  jsonUtil = require('../../../common.utils/JsonUtil');
const  locator = require('../../../../resources/selectors/common/CAP/MemberManagement/ManageApplicantsPageObject.json');
const  viewMemberLocator = require('../../../../resources/selectors/common/CAP/MemberManagement/ViewMemberPageObject.json');
const  content = require('../../../../resources/content/common/CAP/MemberManagement/ManageApplicantsPage.content.js');
const  navLinkLocator = require('../../../../resources/selectors/common/CAP/AdminDashboardMenuPageObject.json');
const adminDashboardModel= require("../../CAP/AdminDashboardPage.js");
const { pauseBrowser } = require("../../../base/Browser.js");
const state = stateProfile;

class ManageApplicantsPage {

    searchForApplicantWithFullName(){
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;

        console.log("**** Start Of Searching For The Created Member *****");
        let firstName = global.updateDataJson.households[householdIndex].applicants[0].firstName; //"Scarlett"
        let lastName = global.updateDataJson.households[householdIndex].applicants[0].lastName; //"Yang" 
        browser.setValueInTextField(eval(locator.search.tb_firstName), firstName);
        browser.setValueInTextField(eval(locator.search.tb_lastName), lastName);
        this.clickGoOnApplicantSearchPage();      
    }

    /* Author: Monica Thaneer
    Searches for an applicant with full name and ssn
    */
    searchForApplicantWithFullNameAndSSN(){
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        console.log("**** Start Of Searching For The Created Member *****");
        let firstName = global.updateDataJson.households[householdIndex].applicants[0].firstName; //"Kylie"
        let lastName =   global.updateDataJson.households[householdIndex].applicants[0].lastName;// "Tandy"//
        let ssn = (global.updateDataJson.households[householdIndex].applicants[0].ssn).substr(7); //"722636370".substr(5)
      
        browser.setValueInTextField(eval(locator.search.tb_firstName), firstName);
        browser.setValueInTextField(eval(locator.search.tb_lastName), lastName);
        browser.setValueInTextField(eval(locator.search.tb_ssn), ssn);
        browser.selectByVisibleText(eval(locator.search.sb_applicationYear), "All");
        this.clickGoOnApplicantSearchPage();     
    }

    /* Author: Monica Thaneer
    Clicks on Go Button On Search Page and verifies member search result footer
    */
    clickGoOnApplicantSearchPage(){
        browser.click(eval(locator.search.btn_go));
        browser.waitForPageToLoadAndCheckPartialHeaderText(eval(locator.txt_totalCount),content.pageFooterAfterMemberSearch);
        console.log("**** End Of Searching For The Created Member *****");

    }

    /* Author: Monica Thaneer
    Clicks on member link to land on View Member Page 
    */
    clickOnPrimaryContactLink()
    {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        console.log("**** Clicking on Primary Contact Link & Landing on View Member Page *****");
        browser.click(eval(locator.lk_viewMember));
        let memberFullName= global.updateDataJson.households[householdIndex].applicants[0].firstName + " " +global.updateDataJson.households[householdIndex].applicants[0].lastName; // "Kylie Tandy" 
        browser.waitForPageToLoadAndCheckPartialHeaderText(eval(viewMemberLocator.pageHeader),memberFullName);


    }

  
}

module.exports = new ManageApplicantsPage();
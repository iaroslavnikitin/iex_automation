const browser = require("../../../base/Browser.js");
const assert = require("../../../base/Assert.js");
const dataUtil = require("../../../common.utils/DataUtil");
const fileUploadUtil = require("../../../common.utils/FileUploadUtil");
const  global = require('../../Global_include');
const states = require("../../../../resources/data/states.json");
const  jsonUtil = require('../../../common.utils/JsonUtil');
const  locator = require('../../../../resources/selectors/common/CAP/MemberManagement/ManageMembersPageObject.json');
const  navLinkLocator = require('../../../../resources/selectors/common/CAP/AdminDashboardMenuPageObject.json');
const  locator_viewMember = require('../../../../resources/selectors/common/CAP/MemberManagement/ViewMemberPageObject.json');
const  content = require('../../../../resources/content/common/CAP/MemberManagement/ManageMembersPage.content');
const permissions = require("../../../../resources/data/permissions.json");
const adminDashboardModel= require("../../CAP/AdminDashboardPage.js");
const state = stateProfile;
const logger=require('../../../common.utils/LoggerUtil');


class ManangeMembers {
    verifyTopNavLinks()
    {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        let role = global.updateDataJson.households[householdIndex].role;
        //let role ="supervisor";
        let topNavLinks_arr =  permissions[state][role].topNavLinks;
        logger.log(topNavLinks_arr);
        let locator_arr = [];
        let locator_link;
        for (let i = 0; i < topNavLinks_arr.length; i++) {
            locator_link="\"$('a*="+topNavLinks_arr[i].trim()+"')\"";
            locator_arr.push(eval(eval(locator_link)));
          }
        assert.assertArrayOfElementsAreDisplayed(locator_arr);
    }
    searchMemberAndclickMemberNameInSearchResult()
    {
        adminDashboardModel.clickManageMembers();
        this.searchMemberByEmail();
        this.clickOnMemberNameFromSearchResult();
    }  
    
    //Edited By: Monica Thaneer
    //this method has been added to adminDashboardPage - to be removed if tests pass
    //Remove after 11/15/2020 
    /*clickManageMembers()
    {
        browser.waitUntil(() => eval(navLinkLocator.topNavigation.dd_members).isDisplayed()); 
        logger.log("**** Clicking On Manage Members *****");
        browser.click(eval(navLinkLocator.topNavigation.dd_members));
        browser.click(eval(navLinkLocator.subNavigation.members.lk_manageMembers));
        browser.waitForPageToLoad(eval(locator.pageHeader),content.pageHeader);
        console.log("**** Clicked On Manage Members *****");
    }*/

    
    searchMemberByEmail()
    {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        logger.log("**** Start Of Searching For The Created Member *****");
        let email = global.updateDataJson.households[householdIndex].applicants[0].email;
        //let email = "Brooklyn1601067066459@yopmail.com";

        browser.setValueInTextField(eval(locator.tb_member_email), email);
        browser.click(eval(locator.btn_member_submit));

        browser.waitForPageToLoadAndCheckPartialHeaderText(eval(locator.pageHeader),content.pageHeaderAfterMemberSearch);
        logger.log("**** End Of Searching For The Created Member *****");
    }
    clickOnMemberNameFromSearchResult()
    {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        let fullName = global.updateDataJson.households[householdIndex].applicants[0].firstName +" "+global.updateDataJson.households[householdIndex].applicants[0].lastName
       //let fullName = "Brooklyn Kalleg";
        logger.log("**** Clicking On The Member In Search Result *****");
        browser.click(eval(locator.lk_viewMember));
        browser.waitForPageToLoadAndCheckPartialHeaderText(eval(locator_viewMember.pageHeader),fullName);
        logger.log("**** Clicked On The Member In Search Result *****");   
    }
}

module.exports = new ManangeMembers();

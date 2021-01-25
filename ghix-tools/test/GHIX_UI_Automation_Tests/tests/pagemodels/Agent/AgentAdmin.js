const  global = require('../../pagemodels/Global_include');

const locatorJson = require("../../../resources/selectors/common/Agent/AgentAdminPageObject.json");
const content = require("../../../resources/content/common/Agent/AgentAdminPage.content.js");

const browser = require("../../base/Browser.js");
const assert = require("../../base/Assert.js");
const dataUtil = require("../../common.utils/DataUtil");
const logger = require('../../common.utils/LoggerUtil');
const fileUploadUtil = require("../../common.utils/FileUploadUtil");

const dbQuery = require('./AgentDatabaseQueries');
const logIn = require("../../pagemodels/UserAccountManagement/LogInPage.js");
const date=require('../../common.utils/CommonDateFunction');
const pageHeader=require('../CommonPageFunctions/PageHeader');

const prop = require('../../common.utils/PropertyReader');
const state = prop.getEnvName();


//const data = require("../../../resources/data/Common/AgentBroker/agentBrokerData.js");
//const commonfunc = require('./CommonAgentBrokerFunction');


class AgentAdmin {

  verifyAgentAdminPage() {
    pageHeader.verifyHeaderAndFooterFieldsForPrevilegedUser();
    this.verifyAgentAdminNavigationMenu();
  }
  verifyAgentAdminNavigationMenu() {
    let locator_arr = [];
    if (state.toUpperCase() == "CA") {
      locator_arr = [eval(locatorJson.dd_agents)];
      assert.assertElementIsNotVisible(eval(locatorJson.dd_tickets));
    }else{
      locator_arr = [eval(locatorJson.dd_agents), eval(locatorJson.dd_tickets)];
    }
    
    assert.assertArrayOfElementsAreDisplayed(locator_arr);
  }

  selectManageAgents() {//moved to TopNavBar model
    browser.click(eval(locatorJson.dd_agents));
    browser.click(eval(locatorJson.lk_manageAgents));
    logger.log("***** Clicked on Manage Agents *****");
  }

  verifyAgentsPage() {
    this.verifyAgentAdminAgentsPageHeader();
  }
  verifyAgentAdminAgentsPageHeader() {
    logger.log("***** Broker Admin Page Agents Page: " + eval(locatorJson.pageHeader).getText() + " *****");
    assert.assertElementContainsText(eval(locatorJson.pageHeader), content.agents_PageHeader);
  }

  searchAgent() { // will combine with SearForAgent ones I'll work on add agent flow
    let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
    let dataJson = global.updateDataJson.agencies[agencyIndex].Agent;
    browser.pauseBrowser(2000);
    let searchData = {
      tb_agentFname: dataJson.tb_agent_firstName,
      tb_agentLname: dataJson.tb_agent_lastName,
      tb_companyName: dataJson.tb_agent_businessName,
      sb_certificationStatus: dataJson.certStatus,
    };
    dataUtil.doFormFill(locatorJson, searchData);
    browser.click(eval(locatorJson.btn_submit));
    logger.log("***** Submitted Agent Details to Search *****");
  }

  clickOnEdit() {
    browser.click(eval(locatorJson.dd_Action));
    browser.click(eval(locatorJson.lk_Edit));
    logger.log("***** Clicked on Edit Agent  *****");
  }

  updateAgentCertificationStatusDetails () // will combine . this is the new one //MVED TO MANAGE AGENTS
  {
    let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
    let adminData = global.updateDataJson.agencies[agencyIndex].agentAdmin;
    let picFile= process.cwd()+"/resources/data/Testfiles/EODeclare.pdf";
    let loc_fileUploadPopupText=eval(locatorJson.fileUploadSuccessPopupText);
    let fileUploadPopupText = content.fileUploadPopupBody;
    let loc_fileUploadPopupClose=eval(locatorJson.fileUploadPopupClose);
    let loc_uploadedEODeclPage = eval(locatorJson.fileNameEODeclPage);
    global.updateDataJson.agencies[agencyIndex].agentAdmin.tb_newStartDate=date.addYearsToDateToday(0,"MM/DD/YYYY");
    global.updateDataJson.agencies[agencyIndex].agentAdmin.tb_newEndDate=date.addYearsToDateToday(5,"MM/DD/YYYY");
    let updateCertDetails = {
      sb_certificationStatus: adminData.sb_certificationStatus,
      tb_newStartDate: adminData.tb_newStartDate,
      tb_newEndDate: adminData.tb_newEndDate,
    };
    dataUtil.doFormFill(locatorJson, updateCertDetails);
    fileUploadUtil.fileUploadDirect(picFile,eval(locatorJson.chooseEODeclPage));
    browser.click(eval(locatorJson.btn_UploadEODeclPage));
    fileUploadUtil.verifyFileUploadPopupAndClose(loc_fileUploadPopupText,fileUploadPopupText,loc_fileUploadPopupClose);
    assert.assertElementIsVisible(loc_uploadedEODeclPage);
    logger.log("***** Certified the Agent  *****");

  }

  updateCertStatusDetails() { // will combine with updateAgentCertificationStatusDetails()
    let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
    let adminData = global.updateDataJson.agencies[agencyIndex].AgentAdmin;
    let picFile= process.cwd()+"/resources/data/Testfiles/EODeclare.pdf";
    let loc_fileUploadPopupText=eval(locatorJson.fileUploadSuccessPopupText);
    let fileUploadPopupText = content.fileUploadPopupBody;
    let loc_fileUploadPopupClose=eval(locatorJson.fileUploadPopupClose);
    let loc_uploadedEODeclPage = eval(locatorJson.fileNameEODeclPage);
    let updateCertDetails = {
      sb_certificationStatus: adminData.sb_certificationStatus,
      tb_newStartDate: adminData.tb_newStartDate,
      tb_newEndDate: adminData.tb_newEndDate,
    };
    dataUtil.doFormFill(locatorJson, updateCertDetails);
    fileUploadUtil.fileUploadDirect(picFile,eval(locatorJson.chooseEODeclPage));
    browser.click(eval(locatorJson.btn_UploadEODeclPage));
    fileUploadUtil.verifyFileUploadPopupAndClose(loc_fileUploadPopupText,fileUploadPopupText,loc_fileUploadPopupClose);
    assert.assertElementIsVisible(loc_uploadedEODeclPage);
    logger.log("***** Certified the Agent  *****");

  }
  clickSubmit() {
    browser.click(eval(locatorJson.btn_updateCertStatus));
    logger.log("***** Submitted the Certified Agent Details *****");
  }
  verifyUpdatedCertificationStatus() { //will combine with other method ones I work on add agent
    let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
    let dataJson = global.updateDataJson.agencies[agencyIndex].Agent;
    logger.log("***** " + eval(locatorJson.lbl_certStatus).getText() + ": " + eval(locatorJson.updatedCertStatus).getText() + " *****");
    assert.assertElementContainsText(eval(locatorJson.updatedCertStatus), content.certificationStatus_certified);

    this.verifyCertificationStatusFromDB(dataJson.tb_agent_email);
  }
  verifyCertificationStatusFromDB(email)
  {
    logger.log("***** Verifying Certification Status From DB *****");
    logger.log("***** Searching for the Agent with email: "+email+" in DB *****")
    let queryResult = dbQuery.getDBdata(email,'Certified');
    browser.waitUntil(() => queryResult !== null);
  }

  searchForAgent() { // will combine with searchAgent above ones I work on add agent // MOVED TOAGENTADMIN
    let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
    let dataJson = global.updateDataJson.agencies[agencyIndex];
    browser.pauseBrowser(2000);
    let searchData = {
      tb_agentFname: dataJson.agencyManager.firstName,
      tb_agentLname: dataJson.agencyManager.lastName,
      tb_companyName: dataJson.agency.businessName,
      sb_certificationStatus: dataJson.agencyManager.certificationStatus,
    };
    dataUtil.doFormFill(locatorJson, searchData);
    browser.click(eval(locatorJson.btn_submit));
    logger.log("***** Submitted Agent Details to Search *****");
  }

  verifyUpdatedAgentCertificationStatus() { //will combine with other method ones I work on add agent //MOVED to agentcertific page
    let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
    let dataJson = global.updateDataJson.agencies[agencyIndex].agencyManager;
    logger.log("***** " + eval(locatorJson.lbl_certStatus).getText() + ": " + eval(locatorJson.updatedCertStatus).getText() + " *****");
    assert.assertElementContainsText(eval(locatorJson.updatedCertStatus), content.certificationStatus_certified);

    this.verifyCertificationStatusFromDB(dataJson.email);
  }

  selectManageAgencies() {

    browser.click(eval(locatorJson.agencyControls.dp_agencies));
    browser.click(eval(locatorJson.agencyControls.lk_manageAgencies));
    //browser.waitForUrlContains(locatorJson.agencyControls.manageAgenciesURL);
    browser.waitForPageToLoadAndCheckPartialHeaderText(eval(locatorJson.agencyControls.agenciesPageHeader),content.agency.agencyPageHeader);
  }

  searchForAgency()
  {
    let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
    let dataJson = global.updateDataJson.agencies[agencyIndex];
    browser.pauseBrowser(2000);
    let searchData = {
      tb_companyName: dataJson.agency.businessName,
      sb_certificationStatus: dataJson.agency.certificationStatus,
    };
    dataUtil.doFormFill(locatorJson.agencyControls.leftSidebarMain, searchData);
    browser.click(eval(locatorJson.agencyControls.leftSidebarMain.btn_go));
    logger.log("***** Submitted Agent Details to Search *****");
  }

  setAgencyCertificationStatus(newStatus)
  {
    this.goToAgencyDetailsPage();
    this.navigateToPageFromSidebar(locatorJson.agencyControls.agencyDetails.leftSidebar.lk_agencyCertificationStatus);
    browser.click(eval(locatorJson.agencyControls.agencyDetails.agencyCertificationPage.btn_editCertificationStatus));
    let newCertificationStatus={
      sb_newCertificationStatus: newStatus,
      btn_submit:""
    };


    dataUtil.doFormFill(locatorJson.agencyControls.agencyDetails.agencyCertificationPage,newCertificationStatus);
  }


  navigateToPageFromSidebar(pageSelector)
  {
    browser.click(eval(pageSelector));
  }

  goToAgencyDetailsPage()
  {
     let agencyName=eval(locatorJson.agencyControls.lnk_agencyRecord);
     browser.click(agencyName);
  }

  verifyUpdatedAgencyCertificationStatus() {
    let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
    let dataJson = global.updateDataJson.agencies[agencyIndex].agency;
    browser.waitUntilElementIsClickable(locatorJson.agencyControls.agencyDetails.agencyCertificationPage.btn_editCertificationStatus);
    logger.log("*****  New Agency Certification Status: " + eval(locatorJson.agencyControls.agencyDetails.agencyCertificationPage.certificationStatus).getText() + " *****");
    assert.assertElementContainsText(eval(locatorJson.agencyControls.agencyDetails.agencyCertificationPage.certificationStatus), content.certificationStatus_certified);
    this.verifyAgencyCertificationStatusFromDB(dataJson.businessName);
  };

  verifyAgencyCertificationStatusFromDB(businessName)
  {
    logger.log("***** Verifying Certification Status From DB *****");
    logger.log("***** Searching for the Agent with email: "+businessName+" in DB *****")
    let queryResult = dbQuery.getDBdata(businessName,'CERTIFIED');
    browser.waitUntil(() => queryResult !== null);
  };



}

module.exports = new AgentAdmin();

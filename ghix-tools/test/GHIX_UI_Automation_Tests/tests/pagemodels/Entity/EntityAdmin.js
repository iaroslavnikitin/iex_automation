const prop = require('../../common.utils/PropertyReader');
var state = prop.getEnvName();
var locatorJson = require('../../../resources/selectors/common/Entity/EntityAccountSetUp.json');
var content = require('../../../resources/content/common/Entity/AccountSetup.content');
const loginPage = require('../../pagemodels/UserAccountManagement/LogInPage.js');
var global = require('../Global_include');
const assert = require('../../base/Assert');
const browser = require('../../base/Browser');
const dataUtil = require('../../common.utils/DataUtil');
const DbHelper = require('../../common.utils/DbHelper');
var dbQuery = require('./EntityDatabaseQueries');
const  ActivateAccount = require('../../pagemodels/UserAccountManagement/ActivateAccount');
const logger=require('../../common.utils/LoggerUtil');


class EntityAdmin {

  clickOnManageEntity() {
    this.clickOnEntity();
    browser.click(eval(locatorJson.lk_manageEntities));
    logger.log("*****Clicked On Manage Entity Option*****");
  }
  clickOnEntity() {
    browser.click(eval(locatorJson.lk_entities));
    logger.log("*****Clicked On Manage Entity Tab*****");
  }
  searchEntity() {
    let entityIndex = (global.updateDataJson.entities.length === 0) ? 0 : global.updateDataJson.entities.length-1;
    var dataJson = global.updateDataJson.entities[entityIndex];
    browser.setValueInTextField(eval(locatorJson.tb_entityName_id), dataJson.entityInformation.entityName)
    browser.click(eval(locatorJson.btn_submit));
    logger.log("*****Searched For The Entity*****");

  }
  activateEntity() {
    let activateEntity = {
      btn_dropdown_toggle: "",
      btn_updateStatus: "",
      sb_registrationStatus: "Active",
      btn_update: ""
    };
    dataUtil.doFormFill(locatorJson, activateEntity);
    logger.log("*****updated Entity Status To Active*****");
    browser.waitForPageToLoad(eval(locatorJson.hd_registrationStatus),content.registrationStatus);
  }
  verifyEnitityStatus() {
    let entityIndex = (global.updateDataJson.entities.length === 0) ? 0 : global.updateDataJson.entities.length-1;
    var dataJson = global.updateDataJson.entities[entityIndex];
    browser.waitForElementToDisplay(eval(locatorJson.lk_Active));
    assert.assertElementIsVisible(eval(locatorJson.lk_Active));
    logger.log("*****Verified Entity Status And The status is :" + browser.getText(eval(locatorJson.lk_Active)) + "*****");
    logger.log("***** Verifying Entity Status From DB *****");
   dbQuery.verifyEntityStatusInDB(dataJson.entityInformation.email,'Active');
  }
  verifyCounselorStatus() {
    let entityIndex = (global.updateDataJson.entities.length === 0) ? 0 : global.updateDataJson.entities.length-1;
    var dataJson = global.updateDataJson.entities[entityIndex];
    browser.waitForElementToDisplay(eval(locatorJson.lk_Certified));
    assert.assertElementIsVisible(eval(locatorJson.lk_Certified));
    logger.log("*****Verified Counselor Status And The status is :" + browser.getText(eval(locatorJson.lk_Certified)) + "*****");
    logger.log("***** Verifying Counselor Status From DB *****");
    dbQuery.verifyCounselorStatusInDB(dataJson.certifiedEnrollmentCounselors.email,'Certified');
  }
  clickOnManageCounselors() {
    if(eval(locatorJson.lk_manageEnrollmentCounselors).isDisplayed()){
      browser.click(eval(locatorJson.lk_manageEnrollmentCounselors));
    }
    else
    browser.click(eval(locatorJson.lk_Manage_Assisters));
    logger.log("*****Clicked On Manage Counselors Option*****");
    assert.assertUrlContains("assisteradmin/manageassister");
  }
  clickOnEnrollmentCouselors() {
    if(eval(locatorJson.btn_enrollmentCounselors).isDisplayed()){
      browser.click(eval(locatorJson.btn_enrollmentCounselors));
    }
    else 
    browser.click(eval(locatorJson.btn_Assisters));
    logger.log("*****Clicked On Enrollment Couselors Option*****");

  }
  searchCounselor() {
    let entityIndex = (global.updateDataJson.entities.length === 0) ? 0 : global.updateDataJson.entities.length-1;
    var dataJson = global.updateDataJson.entities[entityIndex];

    let searchCounselor = {
      tb_firstName: dataJson.certifiedEnrollmentCounselors.firstName,
      tb_lastName: dataJson.certifiedEnrollmentCounselors.lastName,
      btn_submit: ""
    };
    dataUtil.doFormFill(locatorJson, searchCounselor);
    logger.log("*****Searched For The Counselor*****");

  }
  certifyCounselor() {
    let certifyCoun = {
      btn_dropdown_toggle_couns: "",
      btn_edit: "",
      btn_edit_a: "",
      sb_certificationStatus: "Certified",
      btn_update: ""
    };
    dataUtil.doFormFill(locatorJson, certifyCoun);
    logger.log("*****Update Counselor Status To Certified*****");
    browser.waitForPageToLoad(eval(locatorJson.hd_certificationStatus),content.certificationStatus);
  }
  activateCounselor() {
    let activateCoun = {
      btn_assisterStatus: "",
      btn_edit_a: "",
      sb_status: "Active",
      btn_save: "",
    };
    dataUtil.doFormFill(locatorJson, activateCoun);
    logger.log("*****Update Counselor Status To Active*****");
    browser.waitForPageToLoad(eval(locatorJson.hd_status),content.Status);
  }

  activateEntityAccount(){
    let entityIndex = (global.updateDataJson.entities.length === 0) ? 0 : global.updateDataJson.entities.length-1;
    var dataJson = global.updateDataJson.entities[entityIndex];
    ActivateAccount.getActivationUrl(dataJson.certifiedEnrollmentCounselors.email);
    ActivateAccount.submitActivationCode(dataJson.certifiedEnrollmentCounselors.email,content.accountSetupHeader);
    ActivateAccount.verifyAccountSetUpPage(dataJson.certifiedEnrollmentCounselors.email);

  }
  
  setUpCounselorAccount() {
    let entityIndex = (global.updateDataJson.entities.length === 0) ? 0 : global.updateDataJson.entities.length-1;

    var array = {
      tb_confirmEmail: global.updateDataJson.entities[entityIndex].certifiedEnrollmentCounselors.email,
      sb_agent_securityQues: 1,
      tb_agent_securityAnswers: "automation",
      tb_password: global.updateDataJson.entities[entityIndex].entityInformation.password,
      tb_confirmPassword: global.updateDataJson.entities[entityIndex].entityInformation.password,
      cb_terms: "",
      btn_submitbtn: ""
    }

    dataUtil.doFormFill(locatorJson, array);
    logger.log("*****Counselor Account Setup Is Done*****");
  }
  verifyDashBoard() {
    /* if (state.toUpperCase() == 'PA'){
     browser.waitForUrlContains(entityContentState.dashboardUrlContent);
      assert.assertPageTitle(entityContentState.dashboardPageTitle);
      assert.assertUrlContains(entityContentState.dashboardUrlContent);
     }
    else */
        if (state.toUpperCase() == 'ID') {
      browser.waitForElementToDisplay(eval(locatorJson.lb_accountCreated));
      assert.assertElementIsVisible(eval(locatorJson.lb_accountCreated));
    }
    else{
      browser.waitForElementToDisplay(eval(locatorJson.lb_dashboard));
    assert.assertElementIsVisible(eval(locatorJson.lb_dashboard));
    }
    logger.log("*****Verfied Counselor DashBoard*****");
  }

}

module.exports = new EntityAdmin();

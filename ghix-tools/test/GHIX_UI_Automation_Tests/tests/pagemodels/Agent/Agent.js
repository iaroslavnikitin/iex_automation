// const state = stateProfile;
// const global = require('../Global_include');
// const constants = require('../../common.utils/Constants');
//
// const browser = require("../../base/Browser.js");
// const assert = require("../../base/Assert.js");
// const dataUtil = require("../../common.utils/DataUtil");
// const fileUploadUtil = require("../../common.utils/FileUploadUtil");
// const  jsonUtil = require('../../common.utils/JsonUtil');
// const  logger = require('../../common.utils/LoggerUtil');
//
//
// const agentLoc = require("../../../resources/selectors/common/Agent/AgentPageObject.json");
// const agentSignUpContent = require("../../../resources/content/common/Agent/AgentSignupPage.content.js");
// const states = require("../../../resources/data/states.json");
// const agentRegistrationContentState = require('../../../resources/content/exchange/'+state+'/Agent/AgentRegistrationPage.content.js');
// const agentProfileContentState = require('../../../resources/content/exchange/'+state+'/Agent/AgentProfilePage.content.js');
//
// const commonfunc = require('./CommonAgentFunction');
// const dbQuery = require('./AgentDatabaseQueries');
//
// const pageHeader=require('../CommonPageFunctions/PageHeader');
// const random = require('../../common.utils/RandomDataGenerator.js')
// const dateUtil=require('../../common.utils/CommonDateFunction');
//
// const accountSetupPageLoc=require('../../../resources/selectors/common/Agent/AgentAccountSetupPage.json');
//
//
//
//
// class Agent {
//   //MOVING TO LANDING PAGE
//   // clickAgent() {
//   //   browser.click(eval(agentLoc.btn_agentBrokerLnk));
//   //   logger.log("***** Clicked On Health Insurance Agent/Broker *****");
//   //   browser.waitForPageToLoadAndCheckPartialHeaderText(eval(agentLoc.pageHeader),agentSignUpContent.signupPageHeader);
//   // }
//
// //Sophia
// createAgent() //remove after all moved
// {
//   this.setAgentDetails();
//  //  logger.log("email=" + global.updateDataJson.agent.email);
//  //  logger.log("***** On Agent Account Setup Page*****");
//   this.setAccountSetupPageDetails();
//
// }
//
// // setAccountSetupPageDetails() { // moved to agent account setup page.js
// //   let phoneArr = global.updateDataJson.agent.phone.split("-");
// //   let accountSetupPageDetails = {
// //     tb_agent_firstName: global.updateDataJson.agent.firstName,
// //     tb_agent_lastName: global.updateDataJson.agent.lastName,
// //     tb_agent_email: global.updateDataJson.agent.email,
// //     tb_agent_confirmEmail: global.updateDataJson.agent.email,
// //     tb_agent_Phone1:phoneArr[0],
// //     tb_agent_Phone2: phoneArr[1],
// //     tb_agent_Phone3:phoneArr[2],
// //     sb_agent_securityQues: global.updateDataJson.agent.securityQuestion,
// //     tb_agent_securityAnswers: global.updateDataJson.agent.securityAnswer,
// //     tb_agent_password: global.updateDataJson.agent.password,
// //     tb_agent_confirmPassword: global.updateDataJson.agent.password,
// //     cb_agent_cbTerms: global.updateDataJson.agent.cbTerms,
// //     btn_agent_submit: global.updateDataJson.agent.submit,
// //   };
// //   dataUtil.doFormFill(accountSetupPageLoc, accountSetupPageDetails);
// //   browser.pauseBrowser(3000);
// //
// //
// //  if (eval(agentLoc.btn_Continue).isDisplayed()) {
// //     browser.click(eval(agentLoc.btn_Continue));
// //     browser.setValueInTextField(eval(agentLoc.tb_username_id), global.updateDataJson.Agent.tb_agent_email);
// //     browser.setValueInTextField(eval(agentLoc.tb_password_id), global.updateDataJson.Agent.tb_agent_password)
// //     browser.click(eval(agentLoc.btn_submit));
// //   }
// //   browser.waitForPageToLoad(eval(agentLoc.pageHeader), agentSignUpContent.registrationPageHeader);
// // }
//
// // setAgentDetails()
// // {
// //    if (jsonUtil.isFieldEmpty(global.updateDataJson.agent.firstName))
// //    {
// //     global.updateDataJson.agent.firstName= random.getRandomFirstName();
// //     }
// //    if (jsonUtil.isFieldEmpty(global.updateDataJson.agent.lastName))
// //    {
// //      global.updateDataJson.agent.lastName = random.getRandomLastName();
// //    }
// //    if (jsonUtil.isFieldEmpty(global.updateDataJson.agent.email))
// //    {
// //     global.updateDataJson.agent.email = random.getRandomEmail(global.updateDataJson.agent.firstName);
// //    }
// //    if (jsonUtil.isFieldEmpty(global.updateDataJson.agent.username))
// //    {
// //        global.updateDataJson.agent.username=global.updateDataJson.agent.email;
// //    }
// //     if (jsonUtil.isFieldEmpty(global.updateDataJson.agent.password))
// //     {
// //         global.updateDataJson.agent.password=constants.COMMON_PASSWORD;
// //     }
// //
// // if (jsonUtil.isFieldEmpty(global.updateDataJson.agent.confirmEmail)) {
// //   global.updateDataJson.agent.confirmEmail = global.updateDataJson.agent.email;
// // }
// // if (jsonUtil.isFieldEmpty(global.updateDataJson.agent.phone)) {
// //    global.updateDataJson.agent.phone = random.getRandomPhoneNumber();
// // }
// // let securityQuestionAnswer =random.getRandomSecurityQuestionAnswer();
// // if (jsonUtil.isFieldEmpty(global.updateDataJson.agent.securityQuestion)) {
// //    global.updateDataJson.agent.securityQuestion = securityQuestionAnswer[0];
// // }
// // if (jsonUtil.isFieldEmpty(global.updateDataJson.agent.securityAnswer)) {
// //    global.updateDataJson.agent.securityAnswer = securityQuestionAnswer[1];
// // }
// // if (jsonUtil.isFieldEmpty(global.updateDataJson.agent.licenceNumber)) {
// //    global.updateDataJson.agent.licenceNumber = random.getRandomString(10, true);
// // }
// // if (jsonUtil.isFieldEmpty(global.updateDataJson.agent.npn)) {
// //    global.updateDataJson.agent.npn = random.getRandomString(10, true);
// // }
// // if (jsonUtil.isFieldEmpty(global.updateDataJson.agent.licenceRenewDate)) {
// //    global.updateDataJson.agent.licenceRenewDate = dateUtil.addYearsToDateToday(0,"MM/DD/YYY");
// // }
// // if (jsonUtil.isFieldEmpty(global.updateDataJson.agent.primaryContact)) {
// //    global.updateDataJson.agent.primaryContact = phoneNumber;
// // }
// // if (jsonUtil.isFieldEmpty(global.updateDataJson.agent.businessName)) {
// //    global.updateDataJson.agent.businessName = random.getRandomBusinessName();
// // }
// // if (jsonUtil.isFieldEmpty(global.updateDataJson.agent.EIN)) {
// //    global.updateDataJson.agent.EIN = random.getRandomString(9, true);
// // }
// // if (jsonUtil.isFieldEmpty(global.updateDataJson.agent.businessAddress1)) {
//    //global.updateDataJson.agent.businessAddress1 = address[state].address.addressLine1;
// // }
// // if (jsonUtil.isFieldEmpty(global.updateDataJson.agent.businessAddress2)) {
// //    global.updateDataJson.agent.businessAddress2 = address[state].address.addressLine2;
// // }
// // if (jsonUtil.isFieldEmpty(global.updateDataJson.agent.BACity)) {
// //    global.updateDataJson.agent.BACity = address[state].address.city;
// // }
// // if (jsonUtil.isFieldEmpty(global.updateDataJson.agent.BAState)) {
// //    global.updateDataJson.agent.BAState = address[state].address.state;
// // }
// // if (jsonUtil.isFieldEmpty(global.updateDataJson.agent.BAZip)) {
// //    global.updateDataJson.agent.BAZip = address[state].address.zip;
// // }
// //
// // }
//
//
//
//  //end Sophia
//
//   //OLD CODE
//   verifyAgentSignupPage() {
//     pageHeader.verifyHeaderAndFooterFields();
//     this.verifyAgentSignupPageHeader();
//     this.verifyAgentSignupPageRightPanel();
//   }
//
//    verifyAgentSignupPageHeader() {
//     logger.log("***** The Header of Agent/Broker Signup Page: " + eval(agentLoc.pageHeader).getText() + " *****");
//     assert.assertElementContainsText(eval(agentLoc.pageHeader), agentSignUpContent.signupPageHeader);
//   }
//   verifyAgentSignupPageRightPanel() {
//     let locator_arr = [eval(agentLoc.lbl_reqFieldsText), eval(agentLoc.lbl_basicInfo), eval(agentLoc.lbl_securityQtns), eval(agentLoc.lbl_setPassword)];
//     assert.assertArrayOfElementsAreDisplayed(locator_arr);
//
//   }
//   newAgentSetUp(fileName) {
//     var data=  require("../../../resources/data/Common/Agent/"+fileName);
//     global.updateDataJson= jsonUtil.updateAgentDetails(data);
//     logger.log("email=" + global.updateDataJson.Agent.tb_agent_email);
//     logger.log("***** Setting up New Agent Account *****");
//     this.enterAgentDetails();
//   }
//
//   enterAgentDetails() {
//     let phoneArr = global.updateDataJson.agent.phone.split("-");
//     let array = {
//       tb_agent_firstName: global.updateDataJson.agent.firstName,
//       tb_agent_lastName: global.updateDataJson.agent.lastName,
//       tb_agent_email: global.updateDataJson.agent.email,
//       tb_agent_confirmEmail: global.updateDataJson.agent.confirmEmail,
//       tb_agent_Phone1: phoneArr[0],
//       tb_agent_Phone2: phoneArr[1],
//       tb_agent_Phone3:phoneArr[2],
//       sb_agent_securityQues: global.updateDataJson.agent.securityQuestion,
//       tb_agent_securityAnswers: global.updateDataJson.agent.securityAnswers,
//       tb_agent_password: global.updateDataJson.agent.password,
//       tb_agent_confirmPassword: global.updateDataJson.agent.confirmPassword,
//       cb_agent_cbTerms: global.updateDataJson.agent.cbTerms,
//       btn_agent_submit: global.updateDataJson.agent.submit,
//     };
//     dataUtil.doFormFill(agentLoc, array);
//     browser.pauseBrowser(3000);
//
//    if (eval(agentLoc.btn_Continue).isDisplayed()) {
//       browser.click(eval(agentLoc.btn_Continue));
//       browser.setValueInTextField(eval(agentLoc.tb_username_id), global.updateDataJson.Agent.tb_agent_email);
//       browser.setValueInTextField(eval(agentLoc.tb_password_id), global.updateDataJson.Agent.tb_agent_password)
//       browser.click(eval(agentLoc.btn_submit));
//     }
//     browser.waitForPageToLoad(eval(agentLoc.pageHeader), agentSignUpContent.registrationPageHeader);
//   }
//
//   verifyAgentRegistrationPage() {
//     pageHeader.verifyHeaderAndFooterFieldsAfterLogInAsIndividual();
//     commonfunc.verifyAgentRegistrationPageHeader();
//     this.verifyAgentRegistrationPageLeftPanel();
//     this.verifyAgentRegistrationPageRightPanel();
//   }
//
//   verifyAgentRegistrationPageLeftPanel() {
//     let locator_arr = [eval(agentLoc.lbl_steps), eval(agentLoc.lk_agent_information), eval(agentLoc.lk_agent_profile)];
//     assert.assertArrayOfElementsAreDisplayed(locator_arr);
//   }
//  verifyAgentRegistrationPageRightPanel() {
//    let locator_arr = {[agentLoc.lbl_agentInfo] : agentRegistrationContentState.headerAndFooterLabels.agentInfo,
//     [agentLoc.lbl_provideInfoText] : agentRegistrationContentState.headerAndFooterLabels.providerInfo,
//     [agentLoc.lbl_businessAddress] : agentRegistrationContentState.headerAndFooterLabels.businessAddress,
//     [agentLoc.lbl_correspondanceAddress] : agentRegistrationContentState.headerAndFooterLabels.correspAddr
//   };
//
//   assert.assetArrayOfElementsTextEquals(locator_arr);
//   }
//
//   newAgentRegister() {//coppied to agent infor page
//     logger.log("***** Registering New Agent *****");
//     logger.log("***** Verifying Pre-Populated Fields On Agent Information Page *****")
//     this.verifyPrepopulatedFieldsOnAgentRegistration();
//     logger.log("***** Entering Agent Information *****");
//     this.fillRegistrationDetails();
//   }
//
//   verifyPrepopulatedFieldsOnAgentRegistration()
//   {
//     let locator_arr=[eval(agentLoc.tb_agent_firstName),eval(agentLoc.tb_agent_lastName)];
//     let data_arr=[global.updateDataJson.Agent.tb_agent_firstName,global.updateDataJson.Agent.tb_agent_lastName];
//     for(let i=0;i<locator_arr.length;i++)
//     assert.assertEqual(browser.getAttributeValue(locator_arr[i],'value'),data_arr[i]);
//   }
//
//   fillRegistrationDetails() {
//     browser.pauseBrowser(2000);
//     let phoneArr = global.updateDataJson.Agent.tb_agent_primaryContact.split("-");
//     let phoneArr_business = global.updateDataJson.Agent.tb_agent_businessContact.split("-");
//     let phoneArr_alt = global.updateDataJson.Agent.tb_agent_alternatePhone.split("-");
//     let faxNum_arr = global.updateDataJson.Agent.tb_agent_faxNumber.split("-");
//     let array = {
//       tb_agent_licenceNumber: global.updateDataJson.Agent.tb_agent_licenceNumber,
//       tb_agent_npn: global.updateDataJson.Agent.tb_agent_npn,
//       tb_agent_licenceRenewDate: global.updateDataJson.Agent.tb_agent_licenceRenewDate,
//       tb_agent_primaryContactP1: phoneArr[0],
//       tb_agent_primaryContactP2: phoneArr[1],
//       tb_agent_primaryContactP3: phoneArr[2],
//       tb_agent_businessContactP1: phoneArr_business[0],
//       tb_agent_businessContactP2: phoneArr_business[1],
//       tb_agent_businessContactP3: phoneArr_business[2],
//       tb_agent_alternatePhoneP1: phoneArr_alt[0],
//       tb_agent_alternatePhoneP2: phoneArr_alt[1],
//       tb_agent_alternatePhoneP3: phoneArr_alt[2],
//       tb_agent_faxNumber1: faxNum_arr[0],
//       tb_agent_faxNumber2: faxNum_arr[1],
//       tb_agent_faxNumber3: faxNum_arr[2],
//       sb_agent_methodOfCommunication: global.updateDataJson.Agent.sb_agent_methodOfCommunication,
//       tb_agent_businessName: global.updateDataJson.Agent.tb_agent_businessName,
//       tb_agent_EIN: global.updateDataJson.Agent.tb_agent_EIN,
//       tb_agent_businessAddress1: global.updateDataJson.Agent.tb_agent_businessAddress1,
//       tb_agent_BACity: global.updateDataJson.Agent.tb_agent_BACity,
//       sb_agent_BAState: global.updateDataJson.Agent.sb_agent_BAState,
//      // tb_agent_BAZip: global.updateDataJson.tb_agent_BAZip,
//     };
//     if(state.toUpperCase() == constants.STATE_ID)
//     {
//       delete array['tb_agent_npn'];
//       array.tb_agent_personalEmailAddress = global.updateDataJson.Agent.tb_agent_email;
//     }
//     array.tb_agent_BAZip = global.updateDataJson.Agent.tb_agent_BAZip;
//     dataUtil.doFormFill(agentLoc, array);
//     //There is a pop up that validates zip code. It appears for a second and disappears
//     // browser.waitForElementToDisplay(eval(agentLoc.zipValidatePopup));
//     browser.removeFocus(eval(agentLoc.tb_agent_BAZip));
//     commonfunc.confirmAddress();
//     browser.click(eval(agentLoc.cb_mailAddress));
//     this.verifyCorrespondenceAddress();
//     browser.click(eval(agentLoc.btn_next));
//     logger.log("***** Header of Profile Page: "+eval(agentLoc.pageHeader).getText()+" *****");
//   }
//
//   verifyCorrespondenceAddress()
//   {
//     logger.log("***** Verifying Correspondence Address Copied Fields On Agent Information Page *****")
//     let locator_arr=[eval(agentLoc.tb_agent_CorrespondenceAddress1),eval(agentLoc.tb_agent_CorrespondenceAddress2),eval(agentLoc.tb_agent_CACity),eval(agentLoc.sb_agent_CAState),eval(agentLoc.tb_agent_CAZip)];
//     let data_arr=[global.updateDataJson.Agent.tb_agent_businessAddress1,global.updateDataJson.Agent.tb_agent_businessAddress2,global.updateDataJson.Agent.tb_agent_BACity,states[global.updateDataJson.Agent.sb_agent_BAState],global.updateDataJson.Agent.tb_agent_BAZip];
//     for(let i=0;i<locator_arr.length;i++)
//     {
//     assert.assertEqual(browser.getAttributeValue(locator_arr[i],'value'),data_arr[i]);
//     if(i == 3) //for select box, checking for disabled
//       assert.assertEqual(browser.getAttributeValue(locator_arr[i],'disabled'),"true");
//     else
//     //for select box, checking for readonly
//       assert.assertEqual(browser.getAttributeValue(locator_arr[i],'readonly'),"true");
//     }
//
//
//   }
//   verifyAgentProfilePage() {
//     pageHeader.verifyHeaderAndFooterFieldsAfterLogInAsIndividual();
//     this.verifyAgentProfilePageLeftPanel();
//     this.verifyAgentProfilePageRightPanel();
//   }
//
//   verifyAgentProfilePageLeftPanel() {
//     this.verifyAgentRegistrationPageLeftPanel();
//     assert.assertElementIsVisible(eval(agentLoc.agentInfo_OK_icon));
//     logger.log("***** Assert  " + eval(agentLoc.agentInfo_OK_icon).getAttribute('class') + " tick displayed before Agent Information in Left Nav*****");
//   }
//   verifyAgentProfilePageRightPanel() {
//  let locator_arr = {[agentLoc.lbl_profileInfo]:agentProfileContentState.labels.lbl_profileInfo,
//     [agentLoc.lbl_provideInfoText_profile]:agentProfileContentState.labels.lbl_provideInfoText_profile,
//     [agentLoc.lbl_clientsServed]:agentProfileContentState.labels.lbl_clientsServed,
//     [agentLoc.lbl_productExpertise_health]:agentProfileContentState.labels.lbl_productExpertise_health,
//     [agentLoc.lbl_productExpertise_dental]:agentProfileContentState.labels.lbl_productExpertise_dental,
//     [agentLoc.lbl_productExpertise_vision]:agentProfileContentState.labels.lbl_productExpertise_vision,
//     [agentLoc.lbl_productExpertise_life]:agentProfileContentState.labels.lbl_productExpertise_life,
//     [agentLoc.lbl_productExpertise_medicare]:agentProfileContentState.labels.lbl_productExpertise_medicare,
//     [agentLoc.lbl_productExpertise_medicaid]:agentProfileContentState.labels.lbl_productExpertise_medicaid,
//     [agentLoc.lbl_productExpertise_CHIP]:agentProfileContentState.labels.lbl_productExpertise_CHIP,
//     [agentLoc.lbl_productExpertise_compensation]:agentProfileContentState.labels.lbl_productExpertise_compensation,
//     [agentLoc.lbl_productExpertise_property]:agentProfileContentState.labels.lbl_productExpertise_property,
//     [agentLoc.lbl_fileTypeText]:agentProfileContentState.labels.lbl_fileTypeText};
//     if(state.toUpperCase() == constants.STATE_ID)
//     {
//       //Remove eval(agentLoc.cb_medicaid),eval(agentLoc.cb_CHIP) from locator_arr
//       delete locator_arr[[agentLoc.lbl_productExpertise_medicaid]];
//       delete locator_arr[[agentLoc.lbl_productExpertise_CHIP]];
//     }
//     assert.assetArrayOfElementsTextEquals(locator_arr);
//   }
//
//   enterProfileDetails() {
//     logger.log("***** Entering Profile Details *****");
//     let picFile= process.cwd()+"/resources/data/Testfiles/pic.jpg";
//     let locator_fileInputTextbox=eval(agentLoc.choosePhoto);
//     let locator_fileUploadBtn=eval(agentLoc.btn_UploadPhoto);
//     let loc_fileUploadPopupText=eval(agentLoc.fileUploadSuccessPopupText);
//     let fileUploadPopupText = agentSignUpContent.fileUploadPopupBody;
//     let loc_fileUploadPopupClose=eval(agentLoc.fileUploadPopupClose);
//     let profileDetails = {
//       cb_health: global.updateDataJson.Agent.cb_health,
//       cb_dental: global.updateDataJson.Agent.cb_dental,
//       tb_website: global.updateDataJson.Agent.tb_website,
//       sb_education: global.updateDataJson.Agent.sb_education,
//       tb_aboutYourself: global.updateDataJson.Agent.tb_aboutYourself,
//     };
//     if(state.toUpperCase() == constants.STATE_ID)
//     {
//       profileDetails.cb_clientsServed = global.updateDataJson.Agent.cb_clientsServed;
//     }
//     logger.log("***** Verifying Pre-Populated Fields On Profile Page *****")
//     this.verifyPrepopulatedFieldsOnProfile();
//     this.selectLanguages(global.updateDataJson.Agent.tb_languages);
//     dataUtil.doFormFill(agentLoc, profileDetails);
//     fileUploadUtil.fileUploadDirect(picFile,locator_fileInputTextbox);
//     browser.click(locator_fileUploadBtn);
//     fileUploadUtil.verifyFileUploadPopupAndClose(loc_fileUploadPopupText,fileUploadPopupText,loc_fileUploadPopupClose);
//     browser.waitForPageToLoad(eval(agentLoc.pageHeader), agentSignUpContent.registrationPageHeader);
//     browser.click(eval(agentLoc.btn_finish));
//   }
//   verifyPrepopulatedFieldsOnProfile()//moved to profile page
//   {
//     let locator_arr=[eval(agentLoc.cb_clientsServed),eval(agentLoc.tb_yourPublicEmail)];
//     let data_arr=[global.updateDataJson.Agent.cb_clientsServed,global.updateDataJson.Agent.tb_agent_email];
//     for(let i=0;i<locator_arr.length;i++)
//     {
//     assert.assertEqualIgnoreCase(browser.getAttributeValue(locator_arr[i],'value'),data_arr[i]);
//     }
//   }
//   selectLanguages(languages_arr) {//moved to profile page
//     for (let i = 0; i < languages_arr.length; i++) {
//       browser.setValueInTextField(eval(agentLoc.tb_languages), '');
//       browser.setValueInTextField(eval(agentLoc.tb_languages), languages_arr[i]);
//       browser.pauseBrowser(3000);
//       browser.click(eval(agentLoc.dpDyn_selectLanguage));
//     }
//   }
//
//
//   clickCloseOnAccountRegistrationComplete() {//moved to profile page
//     logger.log("***** Verifying Account Registration Complete Popup *****");
//     this.verifyccountRegistrationCompletePopup();
//     browser.switchToFrame(eval(agentLoc.accountRegistrationCompleteiframe));
//     browser.pauseBrowser(2000);
//     logger.log("***** Account Registration Complete Popup Body: \n"+eval(agentLoc.accountRegistrationCompletePopupText).getText()+"\n *****");
//     browser.click(eval(agentLoc.btn_close));
//     logger.log("***** Closed the Account Registration Complete Popup *****");
//     browser.waitForPageToLoad(eval(agentLoc.pageHeader), global.updateDataJson.Agent.tb_agent_firstName+" "+global.updateDataJson.Agent.tb_agent_lastName);
//   }
//
//   verifyccountRegistrationCompletePopup()//moved to prfile page
//   {
//     assert.assertElementContainsText(eval(agentLoc.accountRegistrationCompletePopupHeader),agentSignUpContent.accountRegistrationPopupHeader);
//   }
//   verifyCertificationStatus()//moved to certification page
//   {
//     logger.log("***** " + eval(agentLoc.lbl_certStatus).getText() + ": " + eval(agentLoc.certStatus).getText() + " *****");
//     assert.assertElementContainsText(eval(agentLoc.certStatus), agentSignUpContent.certificationStatus_pending);
//     logger.log("***** Verifying Certification Status From DB *****");
//     this.verifyCertificationStatusFromDB();
//   }
//
//   verifyCertificationStatusFromDB()//moved to certification page
//   {
//     logger.log("***** Searching for the Agent with email: "+global.updateDataJson.Agent.tb_agent_email+" in DB *****")
//     dbQuery.getDBdata(global.updateDataJson.Agent.tb_agent_email,'Pending');
//   }
//
// }
//
// module.exports = new Agent();

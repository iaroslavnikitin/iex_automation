const setupPageJson= require('../../../resources/selectors/Agency/AccountSetupPage.json');
const agencyInfoPageJson=require('../../../resources/selectors/Agency/AgencyInformationPage.json');
const locationAndHoursPageJson=require('../../../resources/selectors/Agency/LocationAndHoursPage.json');
const agencyManagerInfoPageJson=require('../../../resources/selectors/Agency/AgencyManagerInformationPage.json');
const profilePageJson=require('../../../resources/selectors/Agency/PublicProfilePage.json');
const documentsPageJson=require('../../../resources/selectors/Agency/DocumentUploadPage.json');
const agencyCertificationPageJson=require('../../../resources/selectors/Agency/AgencyCertificationStatusPage.json');
const agent=require('../Agent/Agent_OOPApproach');
const dataUtilOOP = require('../../common.utils/DataUtilOOPApproach');
const browser = require('../../base/Browser.js');
const browserOOP=require('../../base/Browser_OOPApproach');
const alertUtils=require ('../../common.utils/AlertsUtil.js');
var global=require('../../pagemodels/Global_include');
const fileUploadUtil = require("../../common.utils/FileUploadUtil");
const random = require('../../common.utils/RandomDataGenerator');
const  logger = require('../../common.utils/LoggerUtil');
const prop = require('../../common.utils/PropertyReader');
var state = prop.getEnvName();
//const loginPage = require('../UserAccountManagement/LogInPage');
const commonSignUpPage=require('../UserAccountManagement/IndividualSignupPage')

const constants=require('../../common.utils/Constants');
const agentConstants=require('../../common.utils/ConstantsAgentAgency')
const agencyDBQueries = require('./AgencyDatabaseQueries')


class Agency
{

    createBasicAgency(dataFile)
        {   
            let agencyIndex = global.updateDataJson.agencies.length;
            // if (state.toUpperCase() == "CA") {
            //     //global.updateDataJson.agencies[agencyIndex] = require("../../../resources/data/"+state+"/"+dataFile);
            
            global.updateDataJson.agencies[agencyIndex]= require("../../../resources/data/Common/"+dataFile);
            logger.log("***** JSON: "+JSON.stringify(global.updateDataJson));

            if(!global.updateDataJson.agencies[agencyIndex].agencyManager.firstName) global.updateDataJson.agencies[agencyIndex].agencyManager.firstName=random.getRandomFirstName();
            if(!global.updateDataJson.agencies[agencyIndex].agencyManager.lastName) global.updateDataJson.agencies[agencyIndex].agencyManager.lastName=random.getRandomLastName();
            if(!global.updateDataJson.agencies[agencyIndex].agency.agencyName) global.updateDataJson.agencies[agencyIndex].agency.agencyName=global.updateDataJson.agencies[agencyIndex].agencyManager.firstName+ " Agency "+ random.getRandomString(3).toUpperCase();
            if(!global.updateDataJson.agencies[agencyIndex].agency.businessName) global.updateDataJson.agencies[agencyIndex].agency.businessName= global.updateDataJson.agencies[agencyIndex].agencyManager.firstName + " BusinessName " +random.getRandomString(3).toUpperCase();
            if(!global.updateDataJson.agencies[agencyIndex].agencyManager.certificationStatus) global.updateDataJson.agencies[agencyIndex].agencyManager.certificationStatus = agentConstants.AGENT_CERTIFICATION_STATUS.pending;
           // global.updateDataJson.agencies[agencyIndex].agency.certificationStatus= "Pending";
            //*** ACCOUNT SETUP PAGE */
            logger.log("***** On Account Setup Page ***");
            browser.waitForPageToLoadAndCheckPartialHeaderText(eval(browserOOP.getStateSelector(setupPageJson.header.selectors)),setupPageJson.header.headerText);
            dataUtilOOP.fillRequiredInformation(setupPageJson,global.updateDataJson.agencies[agencyIndex].agencyManager);
            if(!global.updateDataJson.agencies[agencyIndex].agencyManager.username) global.updateDataJson.agencies[agencyIndex].agencyManager.username=global.updateDataJson.agencies[agencyIndex].agencyManager.email;
            //Setting username to be equal  email address
            browserOOP.acceptPrivacyPolicyAndSubmit(setupPageJson);
            logger.log("Agency manager credentials created: " + global.updateDataJson.agencies[agencyIndex].agencyManager.email + "---password-- " + global.updateDataJson.agencies[agencyIndex].agencyManager.password );
            browser.pauseBrowser(constants.PAUSE_BROWSER_1000);
            // if (eval(setupPageJson.btn_Continue).isDisplayed())
            // {
            //     this.continueToAccount(global.updateDataJson.agencies[agencyIndex].agencyManager.email,global.updateDataJson.agencies[agencyIndex].agencyManager.password)
            // }
            commonSignUpPage.continueToAccountForID(global.updateDataJson.agencies[agencyIndex].agencyManager.email,global.updateDataJson.agencies[agencyIndex].agencyManager.password);


            //*** AGENCY INFORMATION PAGE */
            logger.log("***** On Agency Information Page ***");
           browser.waitForPageToLoadAndCheckPartialHeaderText(eval(browserOOP.getStateSelector(agencyInfoPageJson.agencyInfoHeader.selectors)),agencyInfoPageJson.agencyInfoHeader.headerText);
           
            dataUtilOOP.fillRequiredInformation(agencyInfoPageJson,global.updateDataJson.agencies[agencyIndex].agency);
            browserOOP.clickButton(agencyInfoPageJson.nextButton);
            logger.log("***** Submitted Agency Information Details ***");

            //***  UPDATE AGENCY BUSINESS NAME IN DB FOR CA ONLY*/
            if (state.toUpperCase() == "CA") {
                logger.log("***** Agency JSON: "+JSON.stringify(global.updateDataJson.agencies[agencyIndex].agency)+" ***");
                agencyDBQueries.updateAgencyBusinessNameInAgencyDB(global.updateDataJson.agencies[agencyIndex].agency);
                agencyDBQueries.updateAgencyBusinessNameInBrokersDB(global.updateDataJson.agencies[agencyIndex].agency);
            }

            //***  LOCATION AND HOURS PAGE*/

            browser.waitForPageToLoadAndCheckPartialHeaderText(eval(browserOOP.getStateSelector(locationAndHoursPageJson.locationAndHoursHeader.selectors)),locationAndHoursPageJson.locationAndHoursHeader.headerText);
            logger.log("***** On Location and Hours Page ***");
            dataUtilOOP.fillRequiredInformation(locationAndHoursPageJson.siteElements,global.updateDataJson.agencies[agencyIndex].agency.agencySites.primarySite);
            dataUtilOOP.setHoursOfOperation(locationAndHoursPageJson.siteElements.hoursOfOperation,global.updateDataJson.agencies[agencyIndex].agency.agencySites.primarySite.hoursOfOperation);
            browserOOP.clickButton(locationAndHoursPageJson.siteElements.saveSiteButton);
            logger.log("***** Saved Site Information ***");
            browserOOP.clickButton(locationAndHoursPageJson.nextButton);
            logger.log("***** Submitted Location and Hours Information Details ***");

            //** AGENCY MANAGER INFORMATION PAGE*/
           
            browser.waitForPageToLoadAndCheckPartialHeaderText(eval(browserOOP.getStateSelector(agencyManagerInfoPageJson.headerRightPanel.selectors)),agencyManagerInfoPageJson.headerRightPanel.headerText);
            logger.log("***** On Agency Manager Information Page ***");
            dataUtilOOP.fillRequiredInformation(agencyManagerInfoPageJson,global.updateDataJson.agencies[agencyIndex].agencyManager);
            browserOOP.clickButton(agencyManagerInfoPageJson.nextButton);
            alertUtils.confirmAddressNotInPostalDBAlert();
            browserOOP.clickButton(agencyManagerInfoPageJson.nextButton);
            logger.log("***** Submitted Agency Manager Information Details ***");

            //** AGENCY MANAGER PROFILE PAGE */
          
            browser.waitForPageToLoadAndCheckPartialHeaderText(eval(browserOOP.getStateSelector(profilePageJson.headerRightPanel.selectors)),profilePageJson.headerRightPanel.headerText);
            logger.log("***** On Agency Manager Profile Page ***");
            dataUtilOOP.fillRequiredInformation(profilePageJson,global.updateDataJson.agencies[agencyIndex].agencyManager);
            agent.setProductExpertise(profilePageJson.productExpertise.options,global.updateDataJson.agencies[agencyIndex].agencyManager.productExpertise);
            agent.setLanguages(profilePageJson.languages,global.updateDataJson.agencies[agencyIndex].agencyManager);
            agent.chooseAndUploadFile(profilePageJson.photo);
           // browser.pauseBrowser(constants.PAUSE_BROWSER_6000);
            alertUtils.acceptAllert(profilePageJson.fileUploadSuccessAlert);
            browserOOP.clickButton(profilePageJson.nextButton);
            logger.log("***** Submitted Agency Manager Profile Details ***");

            //** DOCUMENT UPLOAD PAGE */
            browser.waitForPageToLoadAndCheckPartialHeaderText(eval(browserOOP.getStateSelector(documentsPageJson.headerRightPanel.selectors)),documentsPageJson.headerRightPanel.headerText);
            logger.log("***** On Agency Document Upload Page ***");
            this.uploadAgencyDocuments(documentsPageJson.uploaddocument,"AgencyDocumenUploadFile.docx");
            alertUtils.acceptAllert(documentsPageJson.fileUploadSuccessAlert);
            browserOOP.clickButton(documentsPageJson.finishButton);
            alertUtils.acceptAllert(documentsPageJson.successfullyCompletedApplication);
           logger.log("***** Submitted Agency Document Upload Details ***");

            //** AGENCY CERTIFICATION PAGE */
        
           browser.waitForPageToLoadAndCheckPartialHeaderText(eval(browserOOP.getStateSelector(agencyCertificationPageJson.headerRightPanel.selectors)),agencyCertificationPageJson.headerRightPanel.headerText);
            logger.log("***** On Agency Certification Page ***");
            let certificationsStatus =browserOOP.getStateSelector(agencyCertificationPageJson.certificationStatus.selectors);
            global.updateDataJson.agencies[agencyIndex].agency.certificationStatus=eval(certificationsStatus).getText();
            logger.log("***** Ne Agency Certification Status = "+global.updateDataJson.agencies[agencyIndex].agency.certificationStatus+" *****");
            logger.log("***** agency JSON: "+JSON.stringify(global.updateDataJson.agencies[agencyIndex])+" *****");

         };

         uploadAgencyDocuments(pageObject,fileName)
        {
          let filePath= process.cwd()+"/resources/data/Testfiles/"+fileName;
          let chooseDocumentSelector=browserOOP.getStateSelector(pageObject.selectors);
          browser.unhideElement(chooseDocumentSelector.chooseFileButton);
          fileUploadUtil.fileUploadForDisabledTextbox(filePath,eval(chooseDocumentSelector.chooseFileButton));
          browser.waitToBeClickableAndClick(chooseDocumentSelector.uploadButton);
        }

    // continueToAccount(username,password) {
    //          browser.click(eval(setupPageJson.btn_Continue));
           //   loginPage.logInToAccount(username, password);
    // }

}
module.exports=new Agency();
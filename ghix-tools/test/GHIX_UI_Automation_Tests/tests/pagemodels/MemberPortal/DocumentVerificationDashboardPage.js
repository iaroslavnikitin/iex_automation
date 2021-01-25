const  global = require('../Global_include'); 
const browser = require('../../base/Browser');
const assert = require('../../base/Assert');
const { pauseBrowser } = require('../../base/Browser');
const  verificationLocator = require('../../../resources/selectors/common/MemberPortal/DocumentVerificationDashboardPage.object.json');
const  dashboardLocator = require('../../../resources/selectors/common/MemberPortal/DashBoardObject.json');
const  dashboardContent = require('../../../resources/content/common/MemberPortal/DashboardPage.content.js');
const  fileUploadUtil = require('../../common.utils/FileUploadUtil.js');
const loginModel= require('../UserAccountManagement/LogInPage.js')
const adminDashboardModel=require('../CAP/AdminDashboardPage.js'); 
const manageTicketsModel =require('../CAP/TicketManagement/ManageTicketsPage.js'); 
const ticketDetailModel =require('../CAP/TicketManagement/TicketDetailPage.js'); 
const  pageHeaderModel = require('../CommonPageFunctions/PageHeader.js');
const  manageApplicantsModel = require('../CAP/MemberManagement/ManageApplicantsPage.js');
const  viewMemberModel = require('../CAP/MemberManagement/ViewMemberPage.js');


var applicationYear = year;

class DocumentVerificationDashboard{

    /* Monica Thaneer
    *This function clicks override button and Submits on pop up */
    clickOverrideAndSubmit(){
        console.log("***** Clicking Override *****");
        browser.click(eval(verificationLocator.lk_override));
        browser.setValueInTextField(eval(verificationLocator.overridePopup.txt_overrideReason),"Override Ok");
        browser.click(eval(verificationLocator.overridePopup.lk_submit));       
 
    }

    clickOverrideAndSubmitAndGotoDashboard(){
        this.clickOverrideAndSubmit();
        this.clickBackToDashboard();
    }

    clickBackToDashboard()
    {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        console.log("***** Click Back To Dashboard *****");
        browser.click(eval(verificationLocator.lk_backToDashboard));
        let memberFullName= global.updateDataJson.households[householdIndex].applicants[0].firstName + " " +global.updateDataJson.households[householdIndex].applicants[0].lastName;
        browser.waitForPageToLoadAndCheckPartialHeaderText(eval(dashboardLocator.welcomeDashboardHeading),dashboardContent.dashBoardHeader+memberFullName) 
    }

    uploadDocuments(){
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        console.log("***** Uploading Documents *****");
        let eventName=global.updateDataJson.households[householdIndex].eventName
        //let eventName="birth"
        const eventNameCapitalized = eventName.charAt(0).toUpperCase() + eventName.slice(1)
        browser.click(eval(verificationLocator.lk_qleEventExpand.replace("EVENT_NAME",eventNameCapitalized)))
        let picFile= process.cwd()+"/resources/data/Testfiles/pic.jpg";
        browser.unhideElement(verificationLocator.tb_chooseFile)
        fileUploadUtil.fileUploadDirect(picFile,eval(verificationLocator.tb_chooseFile))
        browser.click(eval(verificationLocator.btn_submit))
    }

    uploadDocumentsAndGotoDashboard(){
        this.uploadDocuments()
        this.clickBackToDashboard()

    }

    overrideUploadWithNoDocumentUploaded(user,role)
    {
        loginModel.logout()
        let emailPassword = loginModel.retieveLoginCredentials(user,role);
        pageHeaderModel.clickLogInAndEnterUsernameAndPasswordAndSubmit(emailPassword[0], emailPassword[1]);
        adminDashboardModel.clickManageApplicants();        
        manageApplicantsModel.searchForApplicantWithFullNameAndSSN();
        manageApplicantsModel.clickOnPrimaryContactLink();
        viewMemberModel.clickOnViewMemberAccount();
        //removed below methods from here because of circular reference to dashboard model
        //dashboardModel.clickUploadDocuments();
        //this.clickOverrideAndSubmitAndGotoDashboard();
    }    
  
    uploadDocumentsAsUserAndVerifyUploadAsPriviledgeUser(user,role)
    {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length-1;
        this.uploadDocuments()
        this.clickBackToDashboard()
        loginModel.logout()
        let emailPassword = loginModel.retieveLoginCredentials(user,role);
        pageHeaderModel.clickLogInAndEnterUsernameAndPasswordAndSubmit(emailPassword[0], emailPassword[1]);
        adminDashboardModel.clickManageTickets()
        manageTicketsModel.searchForTicketAndClickOnTicket("Any")
        ticketDetailModel.claimTicketAndMarkAsComplete("Accepted")
        pageHeaderModel.logoutAndLoginAsDifferentUser(global.updateDataJson.households[householdIndex].applicants[0].email, global.updateDataJson.households[householdIndex].password);

    }



}
module.exports = new DocumentVerificationDashboard();
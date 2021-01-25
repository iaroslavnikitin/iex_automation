const state = stateProfile;
const  global = require('../Global_include');
const constants = require('../../common.utils/Constants');

const browser = require("../../base/Browser.js");
const assert = require("../../base/Assert.js");
const dataUtil = require("../../common.utils/DataUtil");
const fileUploadUtil = require("../../common.utils/FileUploadUtil");
const  jsonUtil = require('../../common.utils/JsonUtil');
const dateUtil=require('../../common.utils/CommonDateFunction');
const  logger = require('../../common.utils/LoggerUtil');

const agentInformationLocators=require('../../../resources/selectors/common/Agent/AgentInformationPage.json');
//const agentLoc = require("../../../resources/selectors/common/Agent/AgentPageObject.json");
//const agentSignUpContent = require("../../../resources/content/common/Agent/AgentSignupPage.content.js");//remove - old
//const agentAccountSetupContent =require('../../../resources/content/common/Agent/AgentAccountSetupPage.content');
//const agentInformationPageContent = require('../../../resources/content/common/Agent/AgentInformationPage.content');
const states = require("../../../resources/data/states.json");

const commonfunc = require('../Agent/CommonAgentFunction');
const dbQuery = require('../Agent/AgentDatabaseQueries');

const pageHeader=require('../CommonPageFunctions/PageHeader');
const random = require('../../common.utils/RandomDataGenerator.js')


const agentSearchLocators=require('../../../resources/selectors/common/LocalAssistance/AgentSearchPage.json');
const agentSearchContent=require('../../../resources/content/common/LocalAssistance/AgentSearch')
const agentSearchStateContent = require('../../../resources/content/exchange/' + state + '/LocalAssistance/AgentSearch');
const address = require('../../../resources/data/address.json');


class AgentSearchPageModel
{
    ssearchForCertifiedAgent(searchObject)//remove S
    {
        let agencyIndex = (global.updateDataJson.agencies.length === 0) ? 0 : global.updateDataJson.agencies.length-1;
        let searchDetails = {
            tb_agent_firstName: searchObject.firstName,
            tb_agent_lastName: searchObject.lastName,
            tb_agent_businessName: global.updateDataJson.agencies[agencyIndex].agency.agencyName,
            btn_submit: ""
        };
        
        if (state.toUpperCase() == 'CA') {
            browser.waitForPageToLoadAndCheckPartialHeaderText(eval(agentSearchLocators.pageHeader),agentSearchStateContent.searchFormPageHeader)
        }else{
            browser.waitForPageToLoadAndCheckPartialHeaderText(eval(agentSearchLocators.pageHeader),agentSearchContent.searchFormPageHeader)
        }
        
        dataUtil.doFormFill(agentSearchLocators.searchByName, searchDetails);
        //browser.pauseBrowser(constants.PAUSE_BROWSER_2000);
        logger.log("*****======== Agent Search Criteria Submitted ****");
    };

}

module.exports = new AgentSearchPageModel();

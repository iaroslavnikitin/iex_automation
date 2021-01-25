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

const searchResultLocators=require('../../../resources/selectors/common/LocalAssistance/AgentSearchResult.json');
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
const address = require('../../../resources/data/address.json');


class AgentSearchResultPageModel
{

    verifyAgentName(nameLocator, firstName, lastName) {
        assert.assertElementContainsText(nameLocator, firstName + " " + lastName);
        logger.log("***** Agent Name: " + nameLocator.getText() + " is  displayed****");
    }

    verifyAgentEmail(emailLocator, agentEmail) {
        assert.assertElementContainsText(emailLocator, agentEmail);
        logger.log("***** Agent Email: " + emailLocator.getText() + " is  displayed****");
    }

    verifyUserIsNotFound(elementLocator,firstName,lastName)
    {
        assert.assertElementContainsText(elementLocator,"0");
        logger.log("***** User "+firstName +" "+lastName+ " is NOT displayed in Agent Search Results****");
    }


}

module.exports = new AgentSearchResultPageModel();

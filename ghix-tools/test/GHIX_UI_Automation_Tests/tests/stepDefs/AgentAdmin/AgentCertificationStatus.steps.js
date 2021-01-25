const { Then } = require("cucumber");
//const agentCertificationPageModel=require('../../pagemodels/Agent/AgentCertificationPageModel')
const agentCertificationStatusModel=require('../../pagemodels/AgentAdmin/AgentCertificationStatusPageModel');
//const agentCertificationStatusModel=require('')
const reporter = require('@wdio/allure-reporter').default;
const prop = require('../../common.utils/PropertyReader');
var state=prop.getEnvName();
const  global = require('../../pagemodels/Global_include');
const  logger = require('../../common.utils/LoggerUtil');
const agentConstants=require('../../common.utils/ConstantsAgentAgency')


Then(/^Update Agent Certification Status to CERTIFIED$/, function(){
    agentCertificationStatusModel.updateAgentCertificationStatusDetails(agentConstants.AGENT_CERTIFICATION_STATUS.certified);
});

Then(/^Verify Certification Status Of \"([^\"]*)\" Is CERTIFIED on UI and DB$/, function(role){
    agentCertificationStatusModel.verifyAgentCertificationStatusInViewMode(role,agentConstants.AGENT_CERTIFICATION_STATUS.certified);
});
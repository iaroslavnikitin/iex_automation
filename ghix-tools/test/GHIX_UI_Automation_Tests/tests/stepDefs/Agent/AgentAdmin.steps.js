const { Then } = require("cucumber");
const agentAdmin = require("../../pagemodels/Agent/AgentAdmin.js");

Then("Verify Broker Admin Page", function () {
  agentAdmin.verifyAgentAdminPage();
});
Then("Select Manage Agents", function () {//moved to AgentAdmin/TopNav
  agentAdmin.selectManageAgents();
});
Then("Verify Agents Page", function () {
  agentAdmin.verifyAgentsPage();
});

Then("Search for Agent", function(){
  agentAdmin.searchAgent();
});

Then("Click On Edit Activity Link", function(){
  agentAdmin.clickOnEdit();
});

Then("Update Certification Status Details", function(){
  agentAdmin.updateCertStatusDetails();
});
Then ("Update Agency Manager Certification Status Details", function(){ // this step will combine with previous one ones I work on Agent 
  agentAdmin.updateAgentCertificationStatusDetails();
});


Then("Click Update Certification Status Submit button", function(){
  agentAdmin.clickSubmit();
});

Then("Verify Updated Certification Status", function(){
  agentAdmin.verifyUpdatedCertificationStatus();
});

Then("Search for Agency Manager", function(){
  agentAdmin.searchForAgent();
});

Then("Verify Updated Certification Status Agency Manager", function(){
  agentAdmin.verifyUpdatedAgentCertificationStatus();
});

Then(/^Go To Manage Agency Page$/, function(){
  agentAdmin.selectManageAgencies();
});

Then(/^Search For Agency$/, function(){
  agentAdmin.searchForAgency();
});

Then(/^Set Agency Certification Status to CERTIFIED$/, function()
{
  agentAdmin.setAgencyCertificationStatus("Certified"); 

});
Then("Verify Updated Agency Certification Status", function(){
  agentAdmin.verifyUpdatedAgencyCertificationStatus();
});




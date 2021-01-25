
const {Given, Then, When} = require('cucumber');
const  pageHeader = require('../pagemodels/CommonPageFunctions/PageHeader.js');


When('I Click Find Local Assistance Link', function()
{
  pageHeader.clickFindLocalAssistance();
});

Then('Click On Find A Certified Agent Near You', function()
{
  pageHeader.clickFindCertifiedAgent();
});
// Then('Search For A Certified Agent By Name', function()
// {
//   pageHeader.searchForCertifiedAgent();
// });

// Then('Verify Agent Found In The Search Results', function()
// {
//   pageHeader.verifySearchResult();
// });
// Then('Click On The Agent Name From Search Results', function()
// {
//   pageHeader.clickOnTheAgentNameFromSearchResult();
// });
// Then('Verify The Agent Profile', function()
// {
//   pageHeader.verifyAgentProfile();
// });

//MOVED
// Then('Search For Certified Agency Manager By Name', function() //same as search for agent , Just Json structure is diferent . Will be combined with agent search ones I'll work on add agent
//
// {
//   pageHeader.searchForCertifiedAgencyManager();
//});
Then('Verify Agency Manager Is Found', function() //just verifies that agent is found
{
  pageHeader.verifyAgentIsFound();
});





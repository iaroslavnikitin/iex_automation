const { Given, Then, When } = require('cucumber');
const { clickAgencyLink } = require('../../pagemodels/HomePage/LandingPage');
const agency=require('../../pagemodels/Agency/Agency.js');

Then(/^Create Agency with Agency Manager(.+)$/, function(dataFile)
{
    agency.createBasicAgency(dataFile);
});





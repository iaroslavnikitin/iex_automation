const { Given,When,Then } = require("cucumber");
const atUtilsMulti = require('../../common.utils/AccountTransfer/StaticUtilsMulti'); //to be deprecated
const atUtilsSep = require('../../common.utils/AccountTransfer/StaticUtilsSep');
const sepFunctions = require('../../common.utils/AccountTransfer/SepFunctions');
const  global = require('../../pagemodels/Global_include');
const atDB = require('../../pagemodels/CommonDBQueries/DBQueries');
const batch = require('../../common.utils/BatchJobs');
const browser = require('../../base/Browser');
const constants = require('../../common.utils/Constants');


Then(/^Create Account Transfer (.*) household size (.*)$/, function (inputfile, size) {
    atUtilsMulti.createAccountTransfer(inputfile, size);
    browser.pauseBrowser(30000);
});

// Then ('Link Accounts After AT', )

Then(/^Create AT From Json File (.*)$/, function (inputJson) {
    atUtilsSep.createAccountTransfer(inputJson);
});

Then(/^Increase APTCMaximumAmmount by \$(.*) And Send AT$/, function (increaseBy) {
    sepFunctions.aptcMaxAmountChange(increaseBy);
});

Then(/^Decrease APTCMaximumAmmount by \$(.*) And Send AT$/, function (increaseBy) {
    sepFunctions.aptcMaxAmountChange(increaseBy, true);
    atUtilsSep.updateAccountTransfer();
});

Then ('Add Member And Send AT', function () {
    sepFunctions.addMember();
    atUtilsSep.updateAccountTransfer();
});

Then ('Remove Member And Send AT', function () {
    sepFunctions.removeMember();
    atUtilsSep.updateAccountTransfer();
});

Then('Get SSAP Application Id From DB', function () {
    atDB.setSSAPApplicationId();
});

Then('Update Medicaid Outbound Status to Quarantine And Wait', function () {
    atDB.quarantineMedicaidOutbound();
});

Then('Update CMR Household Information', function () {
    atDB.updateJsonCmrHouseholdInformation();
})

Then(/^Verify MEDICAID_OUTBOUND Table Status (.*)$/, function (status) {
    atUtilsMulti.verifyMedicaidOutboundStatus(status);
})

Then(/^Verify MEDICAID_INBOUND Table Status (.*)$/, function (status) {
    atUtilsMulti.verifyMedicaidInboundStatus(status);
})

Then(/^Verify GI_WS_PAYLOAD Table Status (.*)$/, function (status) {
    atUtilsMulti.verifyGIWSPayloadStatus(status);
})


Then('Run NoticeQueuedProcessorJob And Logout', function () {
    batch.runNoticeQueuedProcessorJob();
})

Then('Get CMR Household Id From CMR_HOUSEHOLD Table', function () {
    atDB.getCmrHouseholdId();
})

Then('Get Access Code From ACCOUNT_ACTIVATION Table', function () {
    atDB.getCmrHouseholdId();
    atDB.getCountyNameByZip();
    atDB.getAccessCode();
})

//atDB.getCountyNameByZip();

Then('Link Accounts after AT created', function () {
    atDB.getCountyNameByZip();

})




Then('Print Out Json Results', function () {
    console.log("************************************");
    console.log(JSON.stringify(global.updateDataJson));
    console.log("************************************");
});
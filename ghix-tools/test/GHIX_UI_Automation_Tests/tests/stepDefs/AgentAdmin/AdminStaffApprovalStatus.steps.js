const { Then } = require("cucumber");
const agentCertificationStatusModel=require('../../pagemodels/AgentAdmin/AgentCertificationStatusPageModel');
const reporter = require('@wdio/allure-reporter').default;
const prop = require('../../common.utils/PropertyReader');
var state=prop.getEnvName();
const  global = require('../../pagemodels/Global_include');
const  logger = require('../../common.utils/LoggerUtil');
const adminStaffStatuses=require('../../common.utils/ConstantsAgentAgency')
const adminStaffApprovalStatusModel =require('../../pagemodels/AgentAdmin/AdminStaffApprovalStatusPageModel')

Then(/^Update Admin Staff Certification Status to APPROVED$/, function () {
    adminStaffApprovalStatusModel.updateApprovalStatus(adminStaffStatuses.ADMIN_STAFF_APPROVAL_STATUS.approved);
});

Then(/^Verify Approval Status of \"([^\"]*)\" on Agent Admin Portal$/, function (role) {
    var adminStaffIndex = role.match(/(\d+)/);
    adminStaffApprovalStatusModel.verifyApprovalStatus(adminStaffIndex[0],adminStaffStatuses.ADMIN_STAFF_APPROVAL_STATUS.approved);
});

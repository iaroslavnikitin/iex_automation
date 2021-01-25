const { Then } = require("cucumber");
const members = require("../../../pagemodels/CAP/MemberManagement/ManangeMembersPage.js");

Then("Verify Top Navigation Links", function () {
  members.verifyTopNavLinks();
});

Then("Search For The Member And Click On The Member Displayed In Search Result", function () {
    members.searchMemberAndclickMemberNameInSearchResult();
  });
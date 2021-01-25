const reporter = require('@wdio/allure-reporter').default;
const jira = "https://jira.getinsured.com/browse/";
class LoggerUtil{

log(msg)
{
   browser.logger.log(msg);
}

addIssues(issues)
{
   
   if (issues !== undefined) {
      var issueArray = issues.split(",");
      issueArray.forEach(issue => reporter.addIssue(jira+issue));
   }
}

}

module.exports = new LoggerUtil();
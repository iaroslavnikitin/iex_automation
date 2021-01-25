const opsAdminPageJson = require('../../resources/selectors/common/UserAccountManagement/OpsAdminPage.json');
const logger = require('../common.utils/LoggerUtil');
const browser = require("../base/Browser.js");
const assert = require("../base/Assert.js");

class BatchJobs {


    runNoticeQueuedProcessorJob() {

        browser.click(eval(opsAdminPageJson.lk_Batch));
        browser.click(eval(opsAdminPageJson.lk_manageJobs));
        assert.assertPageTitle(opsAdminPageJson.tle_BatchJobsPage);
        browser.navigateToGivenUrl(`https://${server}/ghix-batch/jobs/jobs/noticeQueuedProcessorJob`);

        this.launchBatchJobWithParameters();

        //TODO: Check the status of the job before log out CR
        browser.click(eval(opsAdminPageJson.lk_logout));
    }

    launchBatchJobWithParameters() {
        if (eval(opsAdminPageJson.txt_jobParameters).isDisplayed() && eval(opsAdminPageJson.btn_launch).isDisplayed()) {
            let jobParameter = 'status=STAGED';
            logger.log("Batch Job Parameters: " + jobParameter);
            browser.setValueInTextField(eval(opsAdminPageJson.txt_jobParameters), jobParameter)
            browser.click(eval(opsAdminPageJson.btn_launch));
        }
    }
}

module.exports = new BatchJobs();
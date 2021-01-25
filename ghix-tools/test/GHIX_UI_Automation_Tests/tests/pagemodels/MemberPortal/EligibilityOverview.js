const prop = require('../../common.utils/PropertyReader');
const dataUtil = require('../../common.utils/DataUtil');
var state = prop.getEnvName();
const locatorJson = require('../../../resources/selectors/common/MemberPortal/EligibilityPageObjects.json');
const commonSsapJson = require('../../../resources/selectors/common/SSAP/CommonObject.json');
const content = require('../../../resources/content/common/MemberPortal/EligibilityPage.content');
const stateContent = require('../../../resources/content/exchange/' + state + '/MemberPortal/EligibilityPage.content');
const dbQueries = require('../SSAP/SSAPDatabaseQueries')
const browser = require('../../base/Browser');
const global = require('../Global_include');
const assert = require('../../base/Assert');
const logger = require('../../common.utils/LoggerUtil');



class EligibilityOverview {

    verifyEligibilityResults() {
        logger.log("***Verify Eligibility Results***");
        browser.waitUntilPageSubmit(() => eval(locatorJson.btn_eligibilityDetailsGoTo).isDisplayed());
        browser.waitForPageToLoadAndCheckPartialHeaderText(eval(locatorJson.eligibilityResults.hd_eligibilityHeader), "Eligibility");
        let eligibilityResults = this.verifyEligibilityDetails();
        this.verifyEligibilitySummary(eligibilityResults);
        this.verifyOptinalActions();

    }

    verifyEligibilityDetails() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length - 1;
        logger.log("***Verify Eligibility Details***");
        var applicants = global.updateDataJson.households[householdIndex].applicants;
        var scenarioTag = global.updateDataJson.households[householdIndex].scenario;
        let overallEligibility = new Set();
        for (let i = 0; i < applicants.length; i++) {
            let applicantNameFromData = applicants[i].firstName + " " + applicants[i].lastName;
            assert.assertEqual(eval(locatorJson.eligibilityResults.td_memberArray).length, applicants.length)
            for (let j = 0; j < applicants.length; j++) {
                let applicantNameFromUI = eval(locatorJson.eligibilityResults.td_memberText).getText();
                if (applicantNameFromData === applicantNameFromUI) {
                    logger.log("*****Applicant Name: " + applicantNameFromData);
                    let eligibilityList = eval(locatorJson.eligibilityResults.ul_eligibilityResult).map(function (element) {
                        return element.getAttribute('innerText');
                    });
                    logger.log("Eligibility Results: " + eligibilityList)

                    //Eligibility Results for SimpleA Scenario is different for PA and NV, NJ. below is the logic to update the medicaid eligibility for PA
                    let isMedicaidRef = applicants[i].assessedMedicaidnonMAGIEligibile; //Medicaid referal
                    let isMedicaidpotential = applicants[i].assessedMedicaidMAGIEligibile; //Potential Medicaid
                    if ((state == "PA" && isMedicaidRef) && scenarioTag === "SimpleA") {
                        isMedicaidRef = false;
                        isMedicaidpotential = true;
                        global.updateDataJson.households[householdIndex].applicants[i].assessedMedicaidnonMAGIEligibile = false //Medicaid referal
                        global.updateDataJson.households[householdIndex].applicants[i].assessedMedicaidMAGIEligibile = true; //Potential Medicaid

                    }
                    //Eligibility Results for SimpleJ Scenario is different for PA,NV and NJ. below is the logic to update the medicaid eligibility for NJ
                    let isChipPotential = applicants[i].assessedChipEligible; //Potential CHIP
                    if (state == "NJ" && isMedicaidpotential && scenarioTag === "SimpleJ") {
                        isMedicaidpotential = false;
                        isChipPotential = true;
                        global.updateDataJson.households[householdIndex].applicants[i].assessedMedicaidMAGIEligibile = false
                        global.updateDataJson.households[householdIndex].applicants[i].assessedChipEligible = true;

                    }
                    applicants = global.updateDataJson.households[householdIndex].applicants;

                    //Exchange Eligible
                    let exchangeContent
                    if (state != "NJ") { exchangeContent = stateContent.eligibilityResults.eligibleForMarketPlaces; }
                    else { exchangeContent = content.eligibilityResults.eligibleForMarketPlaces; }
                    let isExchangeEligible = eligibilityList.includes(exchangeContent);
                    applicants[i].exchangeEligible ? (logger.log("*****Exchange Eligible Content: " + exchangeContent), assert.assertTrue(isExchangeEligible)) : assert.assertFalse(isExchangeEligible);
                    isExchangeEligible ? overallEligibility.add("Exchange Eligible") : "";

                    //Exchange Not Eligible
                    let nonExchangeContent;
                    if (state === "NV" || state === "PA") { nonExchangeContent = stateContent.eligibilityResults.notEligibleForMarketPlaces; }
                    else { nonExchangeContent = content.eligibilityResults.notEligibleForMarketPlaces; }
                    let isExchangeNotEligible = eligibilityList.includes(nonExchangeContent);
                    applicants[i].exchangeEligible ? assert.assertFalse(isExchangeNotEligible) : (logger.log("*****Exchange Not Eligible Content: " + nonExchangeContent), assert.assertTrue(isExchangeNotEligible));

                    //APTC Eligible
                    let aptcCotent = content.eligibilityResults.aptc;
                    let isAptcEligible = eligibilityList.includes(aptcCotent);
                    applicants[i].aptcEligible ? (logger.log("*****APTC Eligible Content: " + aptcCotent), assert.assertTrue(isAptcEligible)) : assert.assertFalse(isAptcEligible);
                    isAptcEligible ? overallEligibility.add("APTC Eligible") : "";

                    //State Subsidy Eligible
                    if (state == "NJ") {
                        let stateSubsidyContent = content.eligibilityResults.stateSavings.replace("stateName", state)
                        let isStateSubsidyEligible = eligibilityList.includes(stateSubsidyContent);
                        applicants[i].stateSubsidyEligible ? (logger.log("*****State Subsidy Eligible Content: " + stateSubsidyContent), assert.assertTrue(isStateSubsidyEligible)) : assert.assertFalse(isStateSubsidyEligible);
                        isStateSubsidyEligible ? overallEligibility.add("State Subsidy Eligible") : "";
                    }

                    //CSR Eligible
                    let csrContent = content.eligibilityResults.csr;
                    let isCsrEligible = eligibilityList.includes(csrContent);
                    applicants[i].csrEligible ? (logger.log("*****CSR Eligible Content: " + csrContent), assert.assertTrue(isCsrEligible)) : assert.assertFalse(isCsrEligible);
                    isCsrEligible ? overallEligibility.add("CSR Eligible") : "";

                    //Potentially Medicaid Eligible
                    let potentialMedicaidContent = null;
                    if (!(global.updateDataJson.households[householdIndex].financial) || scenarioTag === "SimpleA") { potentialMedicaidContent = stateContent.eligibilityResults.potentiallyMedicaidNonFinancial; }
                    else { potentialMedicaidContent = stateContent.eligibilityResults.potentiallyMedicaid; }
                    let isPotentialMedicaidEligible = eligibilityList.includes(potentialMedicaidContent);
                    isMedicaidpotential ? (logger.log("*****Potentially Medicaid Eligible Content: " + potentialMedicaidContent), assert.assertTrue(isPotentialMedicaidEligible)) : assert.assertFalse(isPotentialMedicaidEligible);
                    isPotentialMedicaidEligible ? overallEligibility.add("Medicaid Eligible") : "";

                    
                    //Potentially CHIP Eligible
                    let potentialChipContent = content.eligibilityResults.potentiallyChip;
                    let isPotentialChipEligible = eligibilityList.includes(potentialChipContent);
                    isChipPotential ? (logger.log("*****Potentially CHIP Eligible Content: " + potentialChipContent), assert.assertTrue(isPotentialChipEligible)) : assert.assertFalse(isPotentialChipEligible);
                    isPotentialChipEligible ? overallEligibility.add("CHIP Eligible") : "";
                    //  }
                    //CHIP Referral
                    let referralChipContent = content.eligibilityResults.referralChip;
                    let isChipReferral = eligibilityList.includes(referralChipContent);
                    applicants[i].assessedCHIPnonMAGIEligibile ? (logger.log("*****CHIP Referral Eligible Content: " + referralChipContent), assert.assertTrue(isChipReferral)) : assert.assertFalse(isChipReferral);

                    //Medicaid Referral
                    let referralMedicaidContent = content.eligibilityResults.referralMedicaid;
                    let isMedicaidReferral = eligibilityList.includes(referralMedicaidContent);
                    isMedicaidRef ? (logger.log("*****Medicaid Referral Eligible Content: " + referralMedicaidContent), assert.assertTrue(isMedicaidReferral)) : assert.assertFalse(isMedicaidReferral);

                    //CHIP Eligible
                    let chipContent = content.eligibilityResults.chip;
                    let isChipEligible = eligibilityList.includes(chipContent);
                    applicants[i].chipEligible ? (logger.log("*****CHIP Eligible Content: " + chipContent), assert.assertTrue(isChipEligible)) : assert.assertFalse(isChipEligible);

                    //Medicaid Eligible
                    let medicaidContent = content.eligibilityResults.medicaid;
                    let isMedicaidEligible = eligibilityList.includes(medicaidContent);
                    applicants[i].medicaidMAGIEligibile ? (logger.log("*****Medicaid Eligible Content: " + medicaidContent), assert.assertTrue(isMedicaidEligible)) : assert.assertFalse(isMedicaidEligible);

                    //Seeking Coverage
                    let isSeekingCoverage = eligibilityList.includes(content.eligibilityResults.notSeekingCoverage);
                    applicants[i].seekingCoverage ? assert.assertFalse(isSeekingCoverage) : (logger.log("*****Not Seeking Coverage: " + isSeekingCoverage), assert.assertTrue(isSeekingCoverage));


                }
            }
        }
        return overallEligibility;
    }

    verifyEligibilitySummary(overallEligibilityResults) {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length - 1;
        logger.log("***Verify Eligibility Summary***");
        let mpContent = null;
        let csrSummaryContent = null;
        var applicants = global.updateDataJson.households[householdIndex].applicants;
        var scenarioTag = global.updateDataJson.households[householdIndex].scenario;
        if (applicants.stateSubsidyEligible) {

        }
        let eligibilityOverView = eval(locatorJson.summary.ul_eligibilityOverview).map(function (element) {
            return element.getAttribute('innerText');
        });
        logger.log("***** Eligibility Summary From UI " + eligibilityOverView);
        overallEligibilityResults.forEach(eligibility => {
            switch (eligibility) {
                case "Exchange Eligible":
                    if (state == "PA") { mpContent = stateContent.summary.marketplace; }
                    else { mpContent = content.summary.marketplace; }
                    logger.log("*****Exchange Eligible:" + mpContent);
                    assert.assertTrue(eligibilityOverView.includes(mpContent));
                    break;
                case "APTC Eligible":
                    let aptc = null;
                    dbQueries.getAptcAmountFromDB().then(aptcvalue => { aptc = aptcvalue; });
                    browser.waitUntil(() => aptc !== null);
                    let aptcAmount = dataUtil.formatMoney(aptc, false, true);
                    logger.log("*****APTC Amount: " + aptcAmount);
                    let aptcContent = content.summary.aptc.replace("APTCAmount", aptcAmount)
                    if (state === "NV" || state === "PA") { aptcContent = stateContent.summary.aptc.replace("APTCAmount", aptcAmount) } //$1073.51
                    logger.log("*****APTC Eligible  ", aptcContent);
                    assert.assertTrue(eligibilityOverView.includes(aptcContent));
                    break;
                case "State Subsidy Eligible":
                    let stateSubsidy = null;
                    dbQueries.getstateSubsidyAmountFromDB().then(susidyvalue => { stateSubsidy = susidyvalue; });
                    browser.waitUntil(() => stateSubsidy !== null);
                    let stateSubsidyAmount = dataUtil.formatMoney(stateSubsidy, true, true);
                    logger.log("*****State Subsidy Amount: " + stateSubsidyAmount);
                    let stateSubsidyContent = content.summary.stateSavings.replace("stateName", state).replace("stateSavingsAmount", stateSubsidyAmount);
                    logger.log("*****State Subsidy Eligible  ", stateSubsidyContent);
                    assert.assertTrue(eligibilityOverView.includes(stateSubsidyContent));
                    break;
                case "CSR Eligible":
                    if (state == "PA") { csrSummaryContent = stateContent.summary.csr; }
                    else { csrSummaryContent = content.summary.csr; }
                    logger.log("*****CSR Eligible  " + csrSummaryContent);
                    assert.assertTrue(eligibilityOverView.includes(csrSummaryContent));
                    break;
                case "CHIP Eligible":
                    logger.log("*****CHIP Eligible  " + stateContent.summary.chip);
                    assert.assertTrue(eligibilityOverView.includes(stateContent.summary.chip));
                    assert.assertEqual(eval(locatorJson.summary.p_chipContent).getText(), stateContent.summary.chipContent)
                    break;
                case "Medicaid Eligible":                    
                    let medicaidContent= null;
                    if (state == "NJ") { medicaidContent = stateContent.summary.medicaidforSimpleB;}
                    else { medicaidContent = stateContent.summary.medicaid; }
                    logger.log("*****Medicaid Eligible  " + medicaidContent);
                    assert.assertTrue(eligibilityOverView.includes(medicaidContent));
                    assert.assertEqual(eval(locatorJson.summary.p_chipContent).getText(), stateContent.summary.chipContent)
                    break;

            }
        });

    }
    verifyOptinalActions() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length - 1;
        logger.log("***Verify Optinal Actions***");
        var applicants = global.updateDataJson.households[householdIndex].applicants;
        if (state == "NJ") {
            for (let i = 0; i < applicants.length; i++) {
                let fullName = applicants[i].firstName
                let chipEligibility = applicants[i].assessedChipEligible;
                let medicaidEligibility = applicants[i].assessedMedicaidMAGIEligibile;
                if (chipEligibility == true || medicaidEligibility == true) {
                    logger.log("*****Application Name:  " + fullName);
                    browser.click(eval(locatorJson.optionalActions.hd_otherOptions));
                    assert.assertElementIsVisible(eval(locatorJson.optionalActions.hd_optionsHeader));
                    assert.assertEqual(eval(locatorJson.optionalActions.p_optionsContent).getText(), stateContent.otherOptions.description);
                    assert.assertElementIsVisible(eval(locatorJson.optionalActions.p_member.replace("memberName", fullName)));
                    chipEligibility ? assert.assertElementIsVisible(eval(locatorJson.optionalActions.p_chipEligible)) : "";
                    let p_medicaidChipContent = null;
                    if (chipEligibility) { p_medicaidChipContent = stateContent.otherOptions.potentiallyChip; }
                    else { p_medicaidChipContent = stateContent.otherOptions.potentiallyMedicaid; }
                    medicaidEligibility ? assert.assertElementIsVisible(eval(locatorJson.optionalActions.p_medicaidEligible.replace("P_MEDICAID_CONTENT", p_medicaidChipContent))) : "";
                }
            }
        }
    }
    selectOtherOptionsCheckbox() {

    }
    continueToDashBoardPage() {
        let householdIndex = (global.updateDataJson.households.length === 0) ? 0 : global.updateDataJson.households.length - 1;
        browser.waitUntilPageSubmit(() => eval(locatorJson.btn_eligibilityDetailsGoTo).isDisplayed());
        browser.click(eval(locatorJson.btn_eligibilityDetailsGoTo));
        let headerText = "Welcome, " + global.updateDataJson.households[householdIndex].applicants[0].firstName + " " + global.updateDataJson.households[householdIndex].applicants[0].lastName
        browser.waitForPageToLoad(eval(commonSsapJson.header), headerText);

    }

}

module.exports = new EligibilityOverview();

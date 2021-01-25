Feature: One member Simple C



   @NJ_Regression @PA_Regression @NV_Regression @Eligibility @SimpleC
    Scenario Outline: This is a scenario where the consumer is not requesting financial assistance
        Given I Am On Landing Page
        Then Create Individual Account And RIDP Verify<fileName>,<role>
        # Then I Verify Dashboard Page Content
        Then Click Start Application
        Then Click Privacy CheckBox On Before We Begin
        Then I Click Save And Continue To Get Ready Page
        Then Continue To Primary Contact And Information Page
        #Then I Verify Auto Filled Data On Primary Contact Information Page
        Then Check If Mailing Address Is Same
        Then I Save And Continue To Help Applying For Coverage Page
        Then Select Who Is Helping You
        Then Continue To Help Paying For Coverage Page
        Then Select Help Paying For Coverage
        Then I Save And Continue To About Your Household Page
        Then I Enter Household Information        
        Then I Save And Continue To Summary Page
        Then Continue To Get Ready Page Of Family And Household
        Then Click Continue On Get Ready Page
        Then Enter Personal Information Of "Applicant"
        Then Click Continue To Citizenship Information Page
        Then Enter Citizenship Immigration Status Information Of "Applicant"
        Then Enter Ethnicity And Race Information Of "Applicant"
        Then Click Continue To Military Service Page
        Then Enter Military Service Information
        Then Click Continue To Native American Information Page
        Then Enter Native American Information
        Then Click Save And Continue On Additional Information Summary Page
        Then Click Continue On Review And Sign Page
        Then Click Continue On Final Review Page
        Then Agree To Terms On Sign And Submit
        Then Submit Application
        Then Verify Eligibility Results
       

        Examples:
            | fileName                          | role       |
            | ssap_oneMem_SimpleC.json               | individual |

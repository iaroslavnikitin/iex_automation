Feature: Two member Complex A



   @NJ_Regression @PA_Regression @NV_Regression @Eligibility @ComplexA
    Scenario Outline: A young married couple applies together for coverage without financial assistance.One member is an American Indian,consumer receives CSR even though it is a non-financial assistance application.
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
        # Then I Verify Auto Filled Data On About Your Household Page
        Then I Enter Household Information
        Then Click Continue To Household Relation Page
        Then Select HouseHold RelationShip
        Then Click Continue To Where Household Member Lives Page
        Then Select Where Household Member Lives
        Then I Save And Continue To Summary Page
        Then Continue To Get Ready Page Of Family And Household
        Then Click Continue On Get Ready Page
        Then Enter Personal Information Of "Applicant"
        Then Click Continue To Citizenship Information Page
        Then Enter Citizenship Immigration Status Information Of "Applicant"
        Then Enter Ethnicity And Race Information Of "Applicant"
        Then Click Continue To Personal Information Page
        Then Enter Personal Information Of "Additional Member 1"
        Then Click Continue To Citizenship Information Page
        Then Enter Citizenship Immigration Status Information Of "Additional Member 1"
        Then Enter Ethnicity And Race Information Of "Additional Member 1"
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
        Then Click Continue To DashBoard
        Then I Verify Dashboard Page Content


        Examples:
            | fileName                          | role       |
            | elligibility_twoMem_ComplexA.json | individual |

Feature: SampleTest

    @NV_Test
    Scenario Outline: Consumer flow with valid data
        Given I Am On Landing Page
        Then Create Individual Account And RIDP Verify<fileName>,<role>
        Then Click Start Application
        Then Click Privacy CheckBox On Before We Begin
        Then I Click Save And Continue To Get Ready Page
        Then Continue To Primary Contact And Information Page
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
        Then Enter Citizenship Immigration Status Information Of "Applicant"
        Then Enter Ethnicity And Race Information Of "Applicant"
        Then Click Continue To Marital Status Information Page
        Then Enter Marital Status Information And Continue
        Then Enter Military Service Information And Continue
        Then Confirm The Household Information
        Then Enter Tax Filers Information
        Then Click Continue To Native American Information Page
        Then Enter Native American Information And Continue
        Then Enter Medicaid Chip Denial Information And Continue
        Then Enter Pregnancy Information And Continue
        Then Enter Disability Information And Continue
        Then Click Continue On Family And Household Summary Page
        Then Enter Income Sources Information Of "Applicant"
        Then Enter Deduction Sources Information Of "Applicant"
        Then Enter Expected Income Information Of "Applicant"
        Then Click Continue To Member Income Summary Page
        Then Click Continue To Overall Income Summary Page
        Then Click Continue To Other Health Coverage Information Page
        Then Enter Other Health Coverage Information Of "Applicant"
        Then Enter Reconciliation of APTC Information Of "Applicant"
        Then Enter Employer Coverage Detail Information Of "Applicant"
        Then Enter State Employee Health Benefit Information Of "Applicant"
        Then Enter Additional Information Of "Applicant" and Continue
        Then Click Save And Continue On Additional Information Summary Page
        Then Click Continue On Review And Sign Page
        Then Click Continue On Final Review Page
        Then Agree To Terms On Sign And Submit
        Then Submit Application
        Then Click Continue To DashBoard
        #Then I Click Log In Link
        #Then I enter username <username> and Password <password>
        #Then Click Submit button
        #Then Update Global Data Json With Application Details
        Then If QEP Select Event <eventName> And Date Less Than <eventDays> Days And Upload And Verify Document As PriviledgeUser <privilegedUser> And Role <priviledgeUserRole>
        #Then If AppType Is QEP Select Event <eventName> And Date Less Than <eventDays> Days And Override As Priviledge User <privilegedUser> And Role <priviledgeUserRole>

        Examples:
            | fileName  | role       | eventName | eventDays | privilegedUser | priviledgeUserRole | username                       | password |
            | ssap.json | individual | Birth     | 30        | SampleTest     | L1CSR              | layla1608068369937@yopmail.com | ghix123# |

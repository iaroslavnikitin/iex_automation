Feature: Three member Simple J
    @NJ_Regression @PA_Regression @NV_Regression @SimpleJ
    Scenario Outline: A married couple with the child in their application-QHP and APTC w/CSR eligible and the child is Medicaid eligible
        Given I Am On Landing Page
        Then Create Individual Account And RIDP Verify<fileName>,<role>
        Then I Verify Dashboard Page Content
        Then Click Start Application
        Then Click Privacy CheckBox On Before We Begin
        Then I Click Save And Continue To Get Ready Page
        Then Continue To Primary Contact And Information Page
        Then I Verify Auto Filled Data On Primary Contact Information Page
        Then Check If Mailing Address Is Same
        Then I Save And Continue To Help Applying For Coverage Page
        Then Select Who Is Helping You
        Then Continue To Help Paying For Coverage Page
        Then Select Help Paying For Coverage
        Then I Save And Continue To About Your Household Page
        Then I Verify Auto Filled Data On About Your Household Page
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
        Then Click Continue To Caretaker Information Page
        Then Enter Parent Or Caretaker Information Of "Additional Member 1"
        Then Click Continue To Personal Information Page
        Then Enter Personal Information Of "Additional Member 1"
        Then Click Continue To Citizenship Information Page
        Then Enter Citizenship Immigration Status Information Of "Additional Member 1"
        Then Enter Ethnicity And Race Information Of "Additional Member 1"
        Then Click Continue To Caretaker Information Page
        Then Enter Parent Or Caretaker Information Of "Additional Member 1"
        Then Click Continue To Personal Information Page
        Then Enter Personal Information Of "Additional Member 2"
        Then Click Continue To Citizenship Information Page
        Then Enter Citizenship Immigration Status Information Of "Additional Member 2"
        Then Enter Ethnicity And Race Information Of "Additional Member 2"
        Then Click Continue To Military Service Page
        Then Enter Military Service Information
        Then Click Continue To Household Information Page
        Then Confirm The Household Information
        Then Enter Tax Filers Information
        Then Click Continue To Native American Information Page
        Then Enter Native American Information
        Then Click Continue To Medicaid And Chip Denial Info Page
        Then Enter Medicaid Chip Denial Information
        Then Click Continue To Pregnancy Information Page
        Then Enter Pregnancy Information
        Then Click Continue To Disability Information Page
        Then Enter Disability Information
        Then Click Continue To Foster Care Information Page
        Then Enter Foster Care Information
        Then Click Continue To FullTime Student Information Page
        Then Enter Full Time Student Information
        Then Click Continue On Family And Household Summary Page
        Then Click Continue To Income Information Page
        Then Enter Income Sources Information Of "Applicant"
        Then Click Continue To Deduction Sources Information Page
        Then Enter Deduction Sources Information Of "Applicant"
        Then Click Continue To Expected Income Information Page
        Then Enter Expected Income Information Of "Applicant"
        Then Click Continue To Member Income Summary Page
        Then Click Continue To Income Information Page
        Then Enter Income Sources Information Of "Additional Member 1"
        Then Click Continue To Deduction Sources Information Page
        Then Enter Deduction Sources Information Of "Additional Member 1"
        Then Click Continue To Expected Income Information Page
        Then Enter Expected Income Information Of "Additional Member 1"
        Then Click Continue To Member Income Summary Page
        Then Click Continue To Income Information Page
        Then Enter Income Sources Information Of "Additional Member 2"
        Then Click Continue To Deduction Sources Information Page
        Then Enter Deduction Sources Information Of "Additional Member 2"
        Then Click Continue To Expected Income Information Page
        Then Enter Expected Income Information Of "Additional Member 2"
        Then Click Continue To Member Income Summary Page
        Then Click Continue To Overall Income Summary Page
        Then Click Continue To Other Health Coverage Information Page
        Then Enter Other Health Coverage Information Of "Applicant"
        Then Click Continue To Reconciliation of APTC Information Page
        Then Enter Reconciliation of APTC Information Of "Applicant"
        Then Click Continue To Employer Coverage Detail Information Page
        Then Enter Employer Coverage Detail Information Of "Applicant"
        Then Click Continue To State Employee Health Benefit Information Page
        Then Enter State Employee Health Benefit Information Of "Applicant"
        Then Click Continue To Additional Information Page
        Then Enter Additional Information Of "Applicant"
        Then Click Continue To Other Health Coverage Information Page
        Then Enter Other Health Coverage Information Of "Additional Member 1"
        Then Click Continue To Employer Coverage Detail Information Page
        Then Enter Employer Coverage Detail Information Of "Additional Member 1"
        Then Click Continue To State Employee Health Benefit Information Page
        Then Enter State Employee Health Benefit Information Of "Additional Member 1"
        Then Click Continue To Additional Information Page
        Then Enter Additional Information Of "Additional Member 1"
        Then Click Continue To Other Health Coverage Information Page
        Then Enter Other Health Coverage Information Of "Additional Member 2"
        Then Click Continue To Employer Coverage Detail Information Page
        Then Enter Employer Coverage Detail Information Of "Additional Member 2"
        Then Click Continue To State Employee Health Benefit Information Page
        Then Enter State Employee Health Benefit Information Of "Additional Member 2"
        Then Click Continue To Additional Information Page
        Then Enter Additional Information Of "Additional Member 2"
        Then Click Save And Continue On Additional Information Summary Page
        Then Click Continue On Review And Sign Page
        Then Click Continue On Final Review Page
        Then Agree To Terms On Sign And Submit
        Then Submit Application
        Then Verify Eligibility Results
        Then Click Continue To DashBoard
        Then I Verify Dashboard Page Content
        Then Click Shop For Plans On DashBoard
        Then Click Save And Continue On Additional Information Page
        Then Click On Shop Health Plans
        Then Click Skip To View Plans
        Then Add Health Plan To Cart
        Then Click Continue To Dental Plans
        Then Add Dental Plan To Cart
        Then Click Continue To Cart Page
        Then Click Sign Application
        Then Click On I am Ready To Enroll
        Then Check The Term And Sign
        Then Click Go To DashBoard
        Then I Verify Dashboard Page Content

        Examples:
            | fileName                   | role       |
            | ssap_threeMem_SimpleJ.json | individual |

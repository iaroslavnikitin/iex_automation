Feature: Anonymous Workflow
    
    @NJ_Regression @PA_Regression @NV_Regression @ID_Regression @MN_Regression
    Scenario Outline:  Anonymous Flow Sort By And Filters Verification
        Given I Am On Landing Page
        When Global Data Json Updated With Anonymous Data<fileName>
        When I Click Start Shopping
        Then Verify PreEligibility Page
        Then Enter Applicants Details On PreEligibilty Page For Finanacial Flow
        Then Click Check For Savings On PreEligibilty Page
        Then Click Next OR Start Application For Preferences OR Signup Page
        Then Click Skip To View Plans
        Then Verify Health Plan Page
        Then Verify SortBy Filter On Health Plan Page
        Then Verify Filter By Plan Type On Health Plan Page
        Then Verify Filter By Plan Features On Health Plan Page
        Then Verify Filter By Metal Tier On Health Plan Page
        Then Verify Filter By Deductible On Health Plan Page
        Then Verify Filter By Company On Health Plan Page
        Then Click On Dental Plans
        Then Verify Sort By Filter On Dental Plan Page
        Then Verify Filter By Plan Type On Dental Plan Page
        Then Verify Filter By Plan Tier On Dental Plan Page
        Then Verify Filter By Deductible On Dental Plan Page
        Then Verify Filter By Company On Health Plan Page
     
        Examples:
        | fileName |
        | TwoAdultsCatastrophicHealthOnly.json |

@CA_Regression
Scenario Outline: CA Anonymous Flow Sort By And Filters Verification
        Given I Am On Landing Page
        Then Navigate To Anonymous Shopping URL<fileName>
        When Global Data Json Updated With Anonymous Data<fileName>
        Then Select Applicant Preferences
        Then Verify Health Plan Page
        Then Verify SortBy Filter On Health Plan Page
        Then Verify Filter By Plan Type On Health Plan Page
        Then Verify Filter By Plan Features On Health Plan Page
        Then Verify Filter By Metal Tier On Health Plan Page
        Then Verify Filter By Deductible On Health Plan Page
        Then Verify Filter By Company On Health Plan Page
        Then Click On Dental Plans
        Then Verify Sort By Filter On Dental Plan Page
        Then Verify Filter By Plan Type On Dental Plan Page
        Then Verify Filter By Plan Tier On Dental Plan Page
        Then Verify Filter By Deductible On Dental Plan Page
        Then Verify Filter By Company On Health Plan Page

        Examples:
        | fileName |
        | TwoAdultsCatastrophicHealthOnly.json |
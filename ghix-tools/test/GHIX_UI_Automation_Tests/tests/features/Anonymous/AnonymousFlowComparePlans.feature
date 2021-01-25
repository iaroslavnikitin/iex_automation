Feature: Anonymous Workflow
    
    @NJ_Regression @PA_Regression @NV_Regression @ID_Regression @MN_Regression
    Scenario Outline:  Anonymous Flow Compare Plans
        Given I Am On Landing Page
        When Global Data Json Updated With Anonymous Data<fileName>
        When I Click Start Shopping
        Then Verify PreEligibility Page
        Then Enter Applicants Details On PreEligibilty Page For Finanacial Flow
        Then Click Check For Savings On PreEligibilty Page
        Then Click Next OR Start Application For Preferences OR Signup Page
        Then Click Skip To View Plans
        Then Verify Health Compare Plans
        Then Go Back To Plans Page
        Then Click On Dental Plans
        Then Verify Dental Compare Plans
      
        Examples:
        | fileName |
        | anonymousComparePlans.json |

@CA_Regression
Scenario Outline: CA Anonymous Flow Compare Plans
        Given I Am On Landing Page
        Then Navigate To Anonymous Shopping URL<fileName>
        Then Global Data Json Updated With Anonymous Data<fileName>
        Then Select Applicant Preferences
        Then Verify Health Compare Plans
        Then Go Back To Plans Page
        Then Click On Dental Plans
        Then Verify Dental Compare Plans
      

        Examples:
        | fileName |
        | anonymousComparePlans.json |
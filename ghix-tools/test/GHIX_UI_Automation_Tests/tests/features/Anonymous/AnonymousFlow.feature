Feature: Anonymous Workflow
    
    @NJ_Smoke @PA_Smoke @NV_Smoke @ID_Smoke @MN_Smoke
    Scenario Outline: Common Anonymous Flow with valid data
        Given I Am On Landing Page
        When Global Data Json Updated With Anonymous Data<fileName>
        When I Click Start Shopping
        Then Verify PreEligibility Page
        Then Enter Applicants Details On PreEligibilty Page For Finanacial Flow
        Then Click Check For Savings On PreEligibilty Page
        Then Click Next OR Start Application For Preferences OR Signup Page
        Then Click Skip To View Plans
        Then Add Health Plan To Cart
        Then Click Continue To Dental Plans
        Then Add Dental Plan To Cart
        Then Click Continue To Cart Page
        Then Click Next To Register
     
        Examples:
        | fileName |
        | anonymousSmokeData.json |

@CA_Smoke
Scenario Outline: CA Anonymous Flow with valid data
        Given I Am On Landing Page
        Then Navigate To Anonymous Shopping URL<fileName>
        Then Global Data Json Updated With Anonymous Data<fileName>
        Then Select Applicant Preferences
        Then Add Health Plan To Cart
        Then Click Continue To Dental Plans
        Then Add Dental Plan To Cart
        Then Click Continue To Cart Page
        Examples:
        | fileName |
        | anonymousSmokeData.json |
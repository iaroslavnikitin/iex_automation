Feature: Anonymous Workflow
    
    @NJ_Regression @PA_Regression @NV_Regression @ID_Regression @MN_Regression
    Scenario Outline: Common Anonymous Flow with valid data
        Given I Am On Landing Page
        When Global Data Json Updated With Anonymous Data<fileName>
        When I Click Start Shopping
        Then Verify PreEligibility Page
        Then Enter Applicants Details On PreEligibilty Page For Finanacial Flow
        Then Click Check For Savings On PreEligibilty Page
        Then Click Next OR Start Application For Preferences OR Signup Page
        Then Select Applicant Preferences
        Then Verify Health Plan Page
        Then Add Health Plan To Cart
        Then Click Continue To Dental Plans
        Then Verify Dental Plan Page
        Then Add Dental Plan To Cart
        Then Click Continue To Cart Page
        Then Verify Show Cart Page
        Then Click Next To Register
     
        Examples:
        | fileName |
        | anonymousE2EDataOneAdult2Kids.json |

@CA_Regression
Scenario Outline: CA Anonymous Flow with valid data
        Given I Am On Landing Page
        Then Navigate To Anonymous Shopping URL<fileName>
        Then Global Data Json Updated With Anonymous Data<fileName>
        Then Select Applicant Preferences
        Then Verify Health Plan Page
        Then Add Health Plan To Cart
        Then Click Continue To Dental Plans
        Then Verify Dental Plan Page
        Then Add Dental Plan To Cart
        Then Click Continue To Cart Page
        Then Verify Show Cart Page

        Examples:
        | fileName |
        | anonymousE2EDataOneAdult2Kids.json |
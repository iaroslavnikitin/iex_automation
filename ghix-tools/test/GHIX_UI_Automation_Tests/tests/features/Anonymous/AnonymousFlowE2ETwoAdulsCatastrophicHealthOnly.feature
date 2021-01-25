Feature: Anonymous Workflow
    
    @NJ_Regression @PA_Regression @NV_Regression @ID_Regression @MN_Regression
    Scenario Outline:  Anonymous Flow For Two Adults With Catastrophic Health Plan Only
        Given I Am On Landing Page
        When Global Data Json Updated With Anonymous Data<fileName>
        When I Click Start Shopping
        Then Verify PreEligibility Page
        Then Enter Applicants Details On PreEligibilty Page For Finanacial Flow
        Then Click Check For Savings On PreEligibilty Page
        Then Click Next OR Start Application For Preferences OR Signup Page
        Then Select Applicant Preferences
        Then Verify Health Plan Page
        Then Filter Catastrophic Health Plans
        Then Select A Health Plan And Add It To Cart From Plan Details Page
        Then Click Continue To Cart From Health Plan
        Then Verify Show Cart Page
        Then Click Next To Register
     
        Examples:
        | fileName |
        | TwoAdultsCatastrophicHealthOnly.json |

@CA_Regression
Scenario Outline: CA Anonymous Flow For Two Adults With Catastrophic Health Plan Only
        Given I Am On Landing Page
        Then Navigate To Anonymous Shopping URL<fileName>
        Then Global Data Json Updated With Anonymous Data<fileName>
        Then Select Applicant Preferences
        Then Verify Health Plan Page
        Then Filter Catastrophic Health Plans
        Then Select A Health Plan And Add It To Cart From Plan Details Page
        Then Click Continue To Cart From Health Plan
        Then Verify Show Cart Page

        Examples:
        | fileName |
        | TwoAdultsCatastrophicHealthOnly.json |
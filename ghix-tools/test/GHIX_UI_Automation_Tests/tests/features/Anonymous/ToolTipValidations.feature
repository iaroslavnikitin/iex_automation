Feature: Anonymous Workflow

    
    
    Scenario Outline: Common Anonymous Flow with valid data
        Given I Am On Landing Page
        When I Click Start Shopping
        Then Enter Applicants Details On PreEligibilty Page For Finanacial Flow<fileName>
        Then Verify ToolTips On PreEligibility Page
        Then Click Check For Savings On PreEligibilty Page
        Then Verify ToolTips PreEligibility on Results Page
        Then Click Next OR Start Application For Preferences OR Signup Page
        Then Verify Tooltips on Preferences Page
        Then Verify ToolTips on Health Plan Display Page
        Then Click Details Tab On Health Plan
        Then Verify ToolTips on Plan Details Page
        #Then Click Back to all Plans Link
        Then Add Health Plan To Cart
       Then Click continue to cart page
        #Then Verify ToolTips on Cart Page
        #Then Click go to dental plans
        Then Click Continue To Dental Plans
       Then Verify ToolTip on Dental Plan Display Page
        Then Click Details Tab On Any Dental Plan
       Then Verify ToolTip on Dental Plan Details Page
        Then Add Dental Plan To Cart
        Then Click continue to cart page
        #Then Verify ToolTips on Cart Page
        
       

        Examples:
        | fileName |
        | ToolTipData-APTC.json |



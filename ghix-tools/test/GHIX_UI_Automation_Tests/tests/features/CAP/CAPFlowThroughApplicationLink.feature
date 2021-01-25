Feature: CAP Workflow Through Application Link
    
@NJ_Smoke @NV_Smoke @PA_Smoke
        Scenario Outline: Consumer flow with valid data
        Given I Am On Landing Page
        Then Setup Individual Account<fileName>,<role> And Logout
        Then I Log In With Username <privilegedUser> And Role <role>
        Then Search For The Member And Click On The Member Displayed In Search Result
        Then Set RIDP Status as Marked As Verified On View Member Page And Logout
        Then I Log In With Member Username And Password

        Then Click Start Application
        Then Enter Application Details
        Then Enter Personal And Household Details
        Then Enter Income Information
        Then Enter Additional Information
        Then Review The Details And Sign
        Then Submit Application
        Then Click Continue To DashBoard

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
        Then I LogOut
       
        Then I Log In With Username <privilegedUser> And Role <role>
        Then Verify Top Navigation Links
        Then Search For The Member And Click On The Member Displayed In Search Result
        Then Click On Applications Link To Go To Application Page
        Then Click Actions Gear Icon
        Then Click On Change Coverage Start Date And Verify
        Then Click On Cancel
        Then Click Actions Gear Icon
        Then Click On Edit Application And Verify
        Then Click On Cancel
        Then Click Actions Gear Icon
        Then Click On Override Program Eligibility And Verify


        Examples:
        | fileName | privilegedUser | role |
        | cap.json | CAPFlowThroughApplicationLink | supervisor |

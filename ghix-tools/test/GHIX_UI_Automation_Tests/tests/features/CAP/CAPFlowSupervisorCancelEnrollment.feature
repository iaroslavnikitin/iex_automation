Feature: CAP Flow Supervisor Cancel Enrollment
    
@NJ_Regression @NV_Regression @PA_Regression
        Scenario Outline: CAP Flow Supervisor Cancel Enrollment 
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

        # Add Steps For Confirm Event And Shop

        Then Click On Shop Health Plans
        Then Click Skip To View Plans
        Then Add Health Plan To Cart
        Then Click Continue To Cart From Health Plan
        Then Click Sign Application
        Then Click On I am Ready To Enroll
        Then Check The Term And Sign
        Then Click Go To DashBoard
        Then I LogOut
       
        Then I Log In With Username <privilegedUser> And Role <role>
        Then Search For The Member And Click On The Member Displayed In Search Result
        Then Click On Enrollments Link To Go To Enrollment Page

        Then Select Coverage Year
        Then Get Health Plan Enrollment Details
        Then Verify Health Plan Enrollment Details

        Then Click On Show Premium History Under Health Plan And Verify

        Then Click Actions Gear Icon Under Enrollment Premium History And Verify
        Then Click Cancel On Edit Tool
        Then Select Reason For Enrollment Cancel
        Then Enter Comment For Enrollment Cancel
        Then Click Submit For Enrollment Cancel And Verify Success Popup
        
        Then Verify Enrollment Start Date And Enrollment End Date On Enrollment Edit Tool
        Then Verify Member Level Details On Enrollment Edit Tool
        Then Verify Monthly Gross Premium Net Premium And EHB Premium On Enrollment Edit Tool For<event>
        Then Verify Enrollment Premium Table In DB For Enrollment <event>
        Then Go Back To Enrollment Page
        Then Select Coverage Year
        Then Update Health Plan Enrollment Details For Enrollment <event>
        Then Verify Health Plan Enrollment Details
        Then Verify Enrollment Table In DB

        Then Click History On CAP And Verify Event For<event>
        Then Verify Enrollment Event Table In DB For Enrollment <event>
        Then I LogOut

       Examples:
        | fileName | privilegedUser | role | event |
        | cap.json | CAPFlowSupervisorCancelEnrollment | supervisor | Cancel |
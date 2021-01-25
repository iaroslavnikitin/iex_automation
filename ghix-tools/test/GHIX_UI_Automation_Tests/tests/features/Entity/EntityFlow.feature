Feature: Entity Workflow

    @NJ_Smoke @NV_Smoke @PA_Smoke
    Scenario Outline: Entity flow with valid data
        Given I Am On Landing Page
        When I Click Enrollment Entities Link On Landing Page
        Then I Enter Basic Information Of An Entity And Click Submit<fileName>
        Then I Enter Business Information Of An Entity And Click Next
        Then I Enter Served Population Information And Click Next
        Then I Enter Locations And Hours Information Of Primary Site
        Then I Click Add Sub-Site Button
        Then I Enter Locations And Hours Information Of Sub Site
        Then I Click Done Button
        Then I Enter Contact Information And Click Next
        Then I Click On Add Certified Enrollment Counselor
        Then I Enter Counselor Information And Click Save
        Then I Upload The Document On Document Upload Page
        Then I Click Next To Payment Information Page
        Then I Enter Payment Information and Click Submit
        Then I Should See Registartion Success PopUp
        Then I Should See Registation Status As Pending
        Then I LogOut
        Then I Log In With Username <privilegedUser> And Role <role>
        Then I Select Manage Entities From Entities Tab
        Then I Search For The Entity Using Entity Name
        Then I Activate The Entity Status
        Then I Should See Enrollment Status As Active
        Then I Click On Enrollment Counselors Tab
        Then I Click On Manage Enrollment Counselor
        Then I Search For The Counselor Using Counselor Name
        Then I Certify The Counselor
        Then I Should See Counselor Status As Certified
        Then I Activate The Counselor
        Then I LogOut
        Then I Activate Entity Account
        Then I Fill the Details of the Counselor and Click Submit
        Then I Should Be Navigated To DashBoard
        Then I Click LogOut On Counselor DashBoard
        Then I Click Find Local Assistance From Help&Support Tab
        Then I Click On Find Certified Enrollment Counselor Link
        Then I Search For The Counselor Using Entity Name
        Then I Click On Entity Name On The Results Window
        Then I Should See Entity Details
        Then I Click On Show Certified Enrollment Counselors Link
        Then I Click On Counselor Name On The Results Window
       Then I Should See Counselor Details On Results Window

        Examples:
            | fileName        | privilegedUser | role |
            | entityFlow.json | EntityFlow | admin |

   @ID_Smoke
    Scenario Outline: Entity flow for ID with valid data
       Given I Am On Landing Page
       When I Click Enrollment Entities Link On Landing Page
        Then I Enter Basic Information Of An Entity And Click Submit<fileName>
        Then I Enter Business Information Of An Entity And Click Next
       Then I Enter Served Population Information And Click Next
        Then I Enter Locations And Hours Information Of Primary Site
        Then I Click Add Sub-Site Button
        Then I Enter Locations And Hours Information Of Sub Site
        Then I Click Done Button
        Then I Enter Contact Information And Click Next
        Then I Click On Add Certified Enrollment Counselor
        Then I Enter Counselor Information And Click Save
        Then I Upload The Document On Document Upload Page
        Then I Click Next To Payment Information Page
        Then I Enter Payment Information and Click Submit
        Then I Should See Registartion Success PopUp
        Then I Should See Registation Status As Pending
        Then I LogOut
        Then I Log In With Username <privilegedUser> And Role <role>
        Then I Select Manage Entities From Entities Tab
        Then I Search For The Entity Using Entity Name
        Then I Activate The Entity Status
        Then I Should See Enrollment Status As Active
        Then I Click On Enrollment Counselors Tab
        Then I Click On Manage Enrollment Counselor
        Then I Search For The Counselor Using Counselor Name
        Then I Certify The Counselor
        Then I Activate The Counselor
        Then I LogOut
        Then I Activate Entity Account
        Then I Fill the Details of the Counselor and Click Submit
        #Then I Should Be Navigated To DashBoard
        

       Examples:
            | fileName        | privilegedUser | role |
            | entityFlow.json | EntityFlow | admin |


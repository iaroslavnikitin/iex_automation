Feature: RIDP Flow

    
@NV_Smoke @NJ_Smoke @PA_Smoke
    Scenario Outline: RIDP flow with valid data
        Given I Am On Landing Page
        Then Create Account For An Individual<fileName>,<role>
        Then Click Start Application
        Then Click On Get Started On RIDP Page
        Then Click Continue On RIDP Contact Information Page
        Then Proceed With Manual Verification <privilegedUser> And Upload Document <role>
        Then I Log In With Username <privilegedUser> And Role <role>
        Then Click On Tickets And Manage Tickets
        Then Search For Ticket
        Then Click On Unclaimed Ticket
        Then Click On Claim Ticket
        Then Click On Mark As Completed
        Then Enter Pop Up Details And Click Completed
        Then I LogOut
        Then I Log In With Member Username And Password
        Then Click Start Application
        Then Click Privacy CheckBox On Before We Begin
        Then I Click Save And Continue To Get Ready Page

       
         Examples:
        | fileName | role| privilegedUser |
        | ssap.json | CSR| RIDPFlow       |

       

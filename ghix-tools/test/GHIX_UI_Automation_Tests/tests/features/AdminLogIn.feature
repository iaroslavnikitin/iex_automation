Feature: Login with Admin User

    
   @NJ_Smoke @NV_Smoke @PA_Smoke
     Scenario Outline: Supervisor Login flow
        Given I Am On Landing Page
        Then I Log In With Username <privilegedUser> And Role <role>
        Then verify I am on Admin dashboard <role>
        


        
        Examples:
        | privilegedUser | role |
        | AdminLogin | supervisor |
        

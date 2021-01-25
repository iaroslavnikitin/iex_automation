Feature: CAP AT Flow

    @MN_Regression
         Scenario Outline: CAP AT Flow
#        Then Create Account Transfer PA OneApp.xml
#        Then Create Account Transfer CA OnePersonHH.xml
         #Then Create Account Transfer MN OnePersonHH.xml  
         Then Create Account Transfer OnePersonHH.xml household size 1       
         # Then Print out json results    
         Given I Am On Landing Page
         Then Update Global Data Json With Application Details
         Then I Log In With Username <privilegedUser> And Role <role>
         Then Verify I Am On Admin Dashboard <role>
         Then Search For Applicant With Full Name And SSN
         Then Click On Primary Contact Member Link
         Then Click On View Member Account
         Then If In QEP Confirm Event with Event <eventName> And Event Date Less Than <eventDays> Days And Continue
         Then If Gated Event Then Upload Document And Override
         Then Click Shop For Plans On DashBoard
         Then Click Continue On Additional Information Page
         Then Click Shop For Plans On Custom Grouping Page
         Then Click Skip To View Plans
         Then Add Health Plan To Cart And Continue
         Then Add Dental Plan To Cart and Continue To Cart Page
         Then Click Continue And I Am Ready To Enroll
         Then ESign The Application
         Then Click Go To DashBoard
                  
        Examples:
        | privilegedUser                     | role| eventName | eventDays |
        | MNCSREnrollsIndividual | L1CSR| Birth | 30  |

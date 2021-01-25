Feature: Create Agency

   # Feature Description: creates Agency with Required  fields 

    @PA_Smoke @PA_Regression @CA_Smoke
    Scenario Outline: Create Agency with valid data
    Given I Am On Landing Page
    Then Click Agency Link  
    Then Create Agency with Agency Manager<dataFile>
    Then I LogOut
    Then I Log In With Username <privilegedUser> And Role <role>
    Then Verify Broker Admin Page
    Then Select Manage Agents
    Then Verify Agents Page
    Then Search For "agencyManager"
    Then Click On Edit Activity Link
    Then Update Agency Manager Certification Status Details
    Then Click Update Certification Status Submit button
    Then Verify Updated Certification Status Agency Manager
    Then Go To Manage Agency Page
    Then Search For Agency
    Then Set Agency Certification Status to CERTIFIED
    Then Verify Updated Agency Certification Status
    Then I LogOut
    When I Click Find Local Assistance Link 
    Then Click On Find A Certified Agent Near You
    Then Search For Certified Agent Or Agency Manager "agencyManager"
    Then Verify "agencyManager" Is Found In The Search Results By Name and Email
      Examples:
        | dataFile                         | privilegedUser | role |
        | Agency/AgencyManagerAndAgencyData.json  | CreateAgency   | admin |

        

    @ID_Smoke
    Scenario Outline: Create Agency with valid data
    Given I Am On Landing Page
    Then Click Agency Link  
    Then Create Agency with Agency Manager<dataFile>
    Then I LogOut
    Then I Log In With Username <privilegedUser> And Role <role>
    Then Verify Broker Admin Page
    Then Select Manage Agents
    Then Verify Agents Page
    Then Search For "agencyManager"
    Then Click On Edit Activity Link
    Then Update Agency Manager Certification Status Details
    Then Click Update Certification Status Submit button
    Then Verify Updated Certification Status Agency Manager
    Then Go To Manage Agency Page
    Then Search For Agency
    Then Set Agency Certification Status to CERTIFIED
    Then Verify Updated Agency Certification Status
    Then I LogOut


    Examples:
        | dataFile                         | privilegedUser | role |
        | Agency/AgencyManagerAndAgencyData.json  | CreateAgency   | admin |
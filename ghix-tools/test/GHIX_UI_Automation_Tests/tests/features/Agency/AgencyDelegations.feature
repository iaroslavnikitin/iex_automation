Feature: Create Agency

   # Feature Description: creates Agency with Required  fields 

    @CA_Smoke @CA_Regression
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
    Then I LogOut

    Then Create AT From Json File HH1.json
    Then Print Out Json Results

    Then Get Access Code From ACCOUNT_ACTIVATION Table
    Then Register With Access Code And Link
    Then Setup Individual Account Inbound AT

      Examples:
        | dataFile                          | privilegedUser | role  |
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
    Then Click On Edit Button On Certification Page
    Then Verify Updated Agency Certification Status
    Then I LogOut


    Examples:
        | dataFile                         | privilegedUser | role |
        | Agency/AgencyManagerAndAgencyData.json  | CreateAgency   | admin |
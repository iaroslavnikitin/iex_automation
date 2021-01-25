Feature: Add AdminStaff to Agency .

   # Feature Description:
      #Creates agency,certifies agency manager and agency. Then adds admin staff level1 and level2 to the agency,
      #approves both level admin staffs, activates their accounts,
      #checks that admin staff is NOT searchable for consumers in local assistance
  # Author: Sophia Oganesyan

  @PA_Smoke
  Scenario Outline: Creates basic agency and adds Admin Staff Level 1 and Level2 to it.
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
    Given I Am On Landing Page
    Then I Click Log In Link
    Then Log In With Agency Manager Username And Password
    Then Go to Add Admin Staff
    Then Add "Admin Staff 0" with "Level1" to Agency with data <dataFile>
    Then Verify Approval Status of "Admin Staff 0" is "Pending"
    Then Go to Add Admin Staff
    Then Add "Admin Staff 1" with "Level2" to Agency with data <dataFile>
    Then Verify Approval Status of "Admin Staff 1" is "Pending"
    Then I LogOut
    Then I Log In With Username <privilegedUser> And Role <role>
    Then Go To Manage Admin Staff Page
    Then Search For "Admin Staff 0" on Agent Admin Portal
    Then Click On Edit Option In Actions Menu
    Then Go to Approval Status Page
    Then Update Admin Staff Certification Status to APPROVED
    Then Verify Approval Status of "Admin Staff 0" on Agent Admin Portal
    #LEVEL2
    Then Go To Manage Admin Staff Page
    Then Search For "Admin Staff 1" on Agent Admin Portal
    Then Click On Edit Option In Actions Menu
    Then Go to Approval Status Page
    Then Update Admin Staff Certification Status to APPROVED
    Then Verify Approval Status of "Admin Staff 1" on Agent Admin Portal
    Then I LogOut
     #ACCOUNT ACTIVATION
    Then Activate Account Of "Admin Staff 0"
    Then Fill Setup Page Details for "Admin Staff 0" and Click Submit
    Then I Should Be Navigated To Admin Staff Dashboard
    Then I LogOut
    #LEVEL 2 ACTIVATION
    Then Activate Account Of "Admin Staff 1"
    Then Fill Setup Page Details for "Admin Staff 1" and Click Submit
    Then I Should Be Navigated To Admin Staff Dashboard
    Then I LogOut
        #SEARCH AGENT
    When I Click Find Local Assistance Link
    Then Click On Find A Certified Agent Near You
    Then Search For Certified Agent with data of "Admin Staff" With Index "0"
    Then Verify "Admin Staff 0" Is NOT Found In The Search Results By Name and Email
    Given I Am On Landing Page
    When I Click Find Local Assistance Link
    Then Click On Find A Certified Agent Near You
    Then Search For Certified Agent with data of "Admin Staff" With Index "1"
    Then Verify "Admin Staff 1" Is NOT Found In The Search Results By Name and Email



    Examples:
      | dataFile                                | privilegedUser | role |
      | Agency/AgencyManagerAndAgencyData.json  | AddAdminStaff   | admin |




  @ID_Smoke
  Scenario Outline: Creates basic agency and adds Admin Staff Level 1 and Level2 to it.
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
    Given I Am On Landing Page
    Then I Click Log In Link
    Then Log In With Agency Manager Username And Password
    Then Go to Add Admin Staff
    Then Add "Admin Staff 0" with "Level1" to Agency with data <dataFile>
    Then Verify Approval Status of "Admin Staff 0" is "Pending"
    Then Go to Add Admin Staff
    Then Add "Admin Staff 1" with "Level2" to Agency with data <dataFile>
    Then Verify Approval Status of "Admin Staff 1" is "Pending"
    Then I LogOut
    Then I Log In With Username <privilegedUser> And Role <role>
    Then Go To Manage Admin Staff Page
    Then Search For "Admin Staff 0" on Agent Admin Portal
    Then Click On Edit Option In Actions Menu
    Then Go to Approval Status Page
    Then Update Admin Staff Certification Status to APPROVED
    Then Verify Approval Status of "Admin Staff 0" on Agent Admin Portal

    #LEVEL2
    Then Go To Manage Admin Staff Page
    Then Search For "Admin Staff 1" on Agent Admin Portal
    Then Click On Edit Option In Actions Menu
    Then Go to Approval Status Page
    Then Update Admin Staff Certification Status to APPROVED
    Then Verify Approval Status of "Admin Staff 1" on Agent Admin Portal
    Then I LogOut
     #ACCOUNT ACTIVATION
    Then Activate Account Of "Admin Staff 0"
    Then Fill Setup Page Details for "Admin Staff 0" and Click Submit
    Then I Should Be Navigated To Admin Staff Dashboard
    Then I LogOut
    #LEVEL 2 ACTIVATION
    Then Activate Account Of "Admin Staff 1"
    Then Fill Setup Page Details for "Admin Staff 1" and Click Submit
    Then I Should Be Navigated To Admin Staff Dashboard
    Then I LogOut


    Examples:
      | dataFile                                | privilegedUser | role |
      | Agency/AgencyManagerAndAgencyData.json  | AddAdminStaff   | admin |
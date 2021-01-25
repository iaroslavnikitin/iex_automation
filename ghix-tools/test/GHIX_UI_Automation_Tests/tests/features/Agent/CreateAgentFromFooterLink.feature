Feature: Create Agent aka Broker from Link in Footer

   @NJ_Smoke @NV_Smoke @PA_Smoke @PA_Regression @NJ_Regression @NV_Regression
   Scenario Outline: Create Agent From Footer Link with valid data
    Given I Am On Landing Page
    Then Click Agent Broker Link In Footer
    Then Create New Agent<dataFileName>
    Then Verify "agent" Certification Status On UI and DB
    Then I LogOut
    Then I Log In With Username <privilegedUser> And Role <role>
    Then Go To Manage Agents Page
    Then Search For "agent"
    Then Click On Edit Option In Actions Menu

    Then Update Agent Certification Status to CERTIFIED
    Then Verify Certification Status Of "agent" Is CERTIFIED on UI and DB
    Then I LogOut
    When I Click Find Local Assistance Link
    Then Click On Find A Certified Agent Near You
    Then Search For Certified Agent Or Agency Manager "agent"
    Then Verify "agent" Is Found In The Search Results By Name and Email

     Examples:
        | dataFileName | privilegedUser | role |
        |SingleAgentData.json | AgentFlow | admin |


  @ID_Smoke
 Scenario Outline: Create Agent From Footer Link with valid data
   Given I Am On Landing Page
   Then Click Agent Broker Link In Footer
   Then Create New Agent<dataFileName>
   Then Verify "agent" Certification Status On UI and DB
   Then I LogOut
   Then I Log In With Username <privilegedUser> And Role <role>
   Then Go To Manage Agents Page
   Then Search For "agent"
   Then Click On Edit Option In Actions Menu

   Then Update Agent Certification Status to CERTIFIED
   Then Verify Certification Status Of "agent" Is CERTIFIED on UI and DB
   Then I LogOut

  Examples:
   | dataFileName | privilegedUser | role |
   |SingleAgentData.json | AgentFlow | admin |
Feature: Agent Broker Workflow


   Scenario Outline: Agent Broker Flow with valid data
       Given I Am On Landing Page
       Then Verify Landing Page
       Then Click Agent Broker Link In Footer
       Then Verify Health Insurance Agent Signup Page
       Then Register New Agent Account<fileName>
       Then Verify New Agent Registration Page
       Then New Agent Registration
       Then Verify Profile Information Page
       Then Enter New Agent Profile Information
       Then Click on Account Registration Complete
       Then Verify Certification Status
       Then I LogOut
       Then I Log In With Username <privilegedUser> And Role <role>
       Then Verify Broker Admin Page
       Then Select Manage Agents
       Then Verify Agents Page
       Then Search for Agent
       Then Click On Edit Activity Link
       Then Update Certification Status Details
       Then Click Update Certification Status Submit button
       Then Verify Updated Certification Status
       Then I LogOut
       When I Click Find Local Assistance Link
       Then Click On Find A Certified Agent Near You
      # Then Search For A Certified Agent By Name
       #Then Verify Agent Found In The Search Results
       #Then Click On The Agent Name From Search Results
       #Then Verify The Agent Profile
    Examples:
        | fileName | privilegedUser | role |
        | agentData.json | AgentFlow | admin |


   Scenario Outline: Agent Broker Flow for ID with valid data
       Given I Am On Landing Page
       Then Click Agent Broker Link In Footer
       Then Verify Health Insurance Agent Signup Page
       Then Register New Agent Account<fileName>
       Then Verify New Agent Registration Page
       Then New Agent Registration
       Then Verify Profile Information Page
       Then Enter New Agent Profile Information
       Then Click on Account Registration Complete
       Then Verify Certification Status
       Then I LogOut
       Then I Log In With Username <privilegedUser> And Role <role>
       Then Verify Broker Admin Page
       Then Select Manage Agents
       Then Verify Agents Page
       Then Search for Agent
       Then Click On Edit Activity Link
       Then Update Certification Status Details
       Then Click Update Certification Status Submit button
       Then Verify Updated Certification Status
       Then I LogOut
Examples:
        | fileName | privilegedUser | role |
        | agentData.json | AgentFlow | admin |
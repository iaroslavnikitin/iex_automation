Feature: Add Agent to Agency

   # Feature Description: 
            #Creates agency,certifies agency manager and agency. Then adds agent to the agent,
             #certifies the agent, activates agent accout, checks that agent is searchable for consumers in anonymous flow

    @PA_Smoke
    Scenario Outline: Creates basic agency and adds agent to it.
        Given I Am On Landing Page
        Then Click Agency Link
        Then Create Agency with Agency Manager<dataFile>
        Then I LogOut
        Then I Log In With Username <privilegedUser> And Role <role>
        Then Go To Manage Agents Page
        Then Search For "agencyManager"
        Then Click On Edit Option In Actions Menu
        Then Update Agent Certification Status to CERTIFIED
        Then Verify Certification Status Of "agent" Is CERTIFIED on UI and DB

        #refactor FROM here to nwe design for agency
        Then Go To Manage Agency Page
        Then Search For Agency
        Then Set Agency Certification Status to CERTIFIED

        # refactor up to here to new design
        Then I LogOut
        Given I Am On Landing Page
        Then I Click Log In Link
        #AGENCY MANAGER PORTAL
        Then Log In With Agency Manager Username And Password
        Then Go To Agents>>Add New Agent Page
        Then Add New Agent To Agency<dataFile>
        Then Verify "agent" Certification Status On UI and DB
        Then I LogOut
        #AGENT ADMIN MANAGER PORTAL
        Then I Log In With Username <privilegedUser> And Role <role>
        Then Go To Manage Agents Page
        Then Search For "agent"
        Then Click On Edit Option In Actions Menu
        Then Update Agent Certification Status to CERTIFIED
        Then Verify Certification Status Of "agent" Is CERTIFIED on UI and DB
        Then I LogOut
        #ACCOUNT ACTIVATION
        Then Activate Account
        Then Fill "agent" Setup Page Details and Click Submit
        Then I Should Be Navigated To "agent" Dashboard
        Then I LogOut
        #SEARCH AGENT
        When I Click Find Local Assistance Link
        Then Click On Find A Certified Agent Near You
        Then Search For Certified Agent Or Agency Manager "agent"
        Then Verify "agent" Is Found In The Search Results By Name and Email



        Examples:
            | dataFile               | privilegedUser | role |
            | Agent/AddAgentToAgency.json  | AddAgentToAgency   | admin |


    @ID_Smoke
    Scenario Outline: Creates basic agency and adds agent to it.
        Given I Am On Landing Page
        Then Click Agency Link
        Then Create Agency with Agency Manager<dataFile>
        Then I LogOut
        #AGENT ADMIN MANAGER PORTAL
        Then I Log In With Username <privilegedUser> And Role <role>
        Then Go To Manage Agents Page
        Then Search For "agencyManager"
        Then Click On Edit Option In Actions Menu
        Then Update Agent Certification Status to CERTIFIED
        Then Verify Certification Status Of "agent" Is CERTIFIED on UI and DB

        #refactor FROM here to nwe design for agency
        Then Go To Manage Agency Page
        Then Search For Agency
        Then Set Agency Certification Status to CERTIFIED

        # refactor up to here to new design
        Then I LogOut
        #AGENCY MANAGER PORTAL
        Given I Am On Landing Page
        Then I Click Log In Link
        Then Log In With Agency Manager Username And Password
        Then Go To Agents>>Add New Agent Page
        Then Add New Agent To Agency<dataFile>
        Then Verify "agent" Certification Status On UI and DB
        Then I LogOut
        #AGENT ADMIN MANAGER PORTAL
        Then I Log In With Username <privilegedUser> And Role <role>
        Then Go To Manage Agents Page
        Then Search For "agent"
        Then Click On Edit Option In Actions Menu
        Then Update Agent Certification Status to CERTIFIED
        Then Verify Certification Status Of "agent" Is CERTIFIED on UI and DB
        Then I LogOut
        #ACCOUNT ACTIVATION
        Then Activate Account
        Then Fill "agent" Setup Page Details and Click Submit
        Then I Should Be Navigated To "agent" Dashboard
        Then I LogOut

        Examples:
            | dataFile                     | privilegedUser | role |
            | Agent/AddAgentToAgency.json        | AddAgentToAgency  | admin |
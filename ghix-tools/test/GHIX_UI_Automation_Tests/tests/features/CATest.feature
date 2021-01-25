Feature: Sample test to test Plan Display

    Scenario Outline: CA Anonymous Flow with valid data
            Given I Am On Landing Page
            Then Select Applicant Preferences<fileName>
            Then Add Health Plan To Cart
            Then Click Continue To Dental Plans
            Then Add Dental Plan To Cart
            Then Click Continue To Cart Page
            
            Examples:
            | fileName |
            | anonymousSmokeData.json |
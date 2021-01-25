#  TODO: Need a stable environment with disabled CAPTCHA to test


Feature: Inbound Account Transfer
  @NJ_Test @PA_Test
  Scenario: Inbound AT
    Then Create AT From Json File CommonInbound_HH1.json
    Given I Am On Landing Page
    Then I Click Log In Link
    Then I Log In With Username opsadmin And Role opsadmin
    Then Run NoticeQueuedProcessorJob And Logout

    Then Get Access Code From ACCOUNT_ACTIVATION Table
    Then Register With Access Code And Link
    Then Setup Individual Account Inbound AT

  #    TODO: CR
#    Then I Verify Dashboard Page Content

    Then Click Resume Application

  #   The Privacy CheckBox should be checked from AT
    Then Verify Privacy CheckBox Is Checked
    Then I Click Save And Continue To Get Ready Page
    Then Continue To Primary Contact And Information Page

#  Same as Mailing box should be checked from AT
  #    Then Verify Primary Contact Information Page Autofill
#    TODO: add which page (Contact Information) CR
    Then Select Email Me
    Then Verify Mailing Address Is Checked

    Then I Save And Continue To Help Applying For Coverage Page
    Then Select Who Is Helping You
    Then Continue To Help Paying For Coverage Page
    Then Select Help Paying For Coverage
    Then I Save And Continue To About Your Household Page
    Then I Enter Household Information
    Then I Save And Continue To Summary Page
    Then Continue To Get Ready Page Of Family And Household
    Then Click Continue On Get Ready Page
    Then Enter Personal Information Of "Applicant"
    Then Click Continue To Citizenship Information Page
    Then Enter Citizenship Immigration Status Information Of "Applicant"

    # Enter Ethnicity modified -- "white" in the global json doesn't correspond to White or Caucasion in the UI, so Other is checked by default
    Then Enter Ethnicity Of "Applicant"
    Then Click Continue To Marital Status Information Page
    Then Enter Marital Status Information
    Then Click Continue To Military Service Page
    Then Enter Military Service Information
    Then Click Continue To Household Information Page
    Then Confirm The Household Information
    Then Click Continue To Native American Information Page

  #    Native American Information should be there from AT
    Then Verify Native American Information is selected
    Then Click Continue To Medicaid And Chip Denial Info Page

    Then Enter Medicaid Chip Denial Information
    Then Click Continue To Disability Information Page

#   Disability should be selected from AT
    Then Verify Disability Information entered

    Then Click Continue On Family And Household Summary Page
    Then Click Continue To Income Information Page

    #   Income information should be selected from AT
    Then Verify Income Information Of "Applicant"

    Then Click Continue To Deduction Sources Information Page
    Then Enter Deduction Sources Information Of "Applicant"
    Then Click Continue To Expected Income Information Page
    Then Enter Expected Income Information Of "Applicant"
    Then Click Continue To Member Income Summary Page
    Then Click Continue To Overall Income Summary Page
    Then Click Continue To Other Health Coverage Information Page
#    Then Enter Other Health Coverage Information Of "Applicant"
#    Then Click Continue To Reconciliation of APTC Information Page

#    Then Enter Reconciliation of APTC Information Of "Applicant"
    Then Click Continue To Employer Coverage Detail Information Page
    Then Enter Employer Coverage Detail Information Of "Applicant"
    Then Click Continue To State Employee Health Benefit Information Page
    Then Enter State Employee Health Benefit Information Of "Applicant"
    Then Click Continue To Additional Information Page
    Then Enter Additional Information Of "Applicant"
    Then Click Save And Continue On Additional Information Summary Page
    Then Click Continue On Review And Sign Page
    Then Click Continue On Final Review Page
    Then Agree To Terms On Sign And Submit
    Then Submit Application
    Then Click Continue To DashBoard
    #    TODO: CR
    Then I Verify Dashboard Page Content

  @NV_Test
  Scenario: Inbound AT
    Then Create AT From Json File CommonInbound_HH1.json
    Given I Am On Landing Page
    Then I Click Log In Link
    Then I Log In With Username opsadmin And Role opsadmin
    Then Run NoticeQueuedProcessorJob And Logout

    Then Get Access Code From ACCOUNT_ACTIVATION Table
    Then Register With Access Code And Link
    Then Setup Individual Account Inbound AT
    Then Print Out Json Results

  #    TODO: CR
    Then I Verify Dashboard Page Content
    Then Click Resume Application

  #   The Privacy CheckBox should be checked from AT
    Then Click Privacy CheckBox On Before We Begin
    Then I Click Save And Continue To Get Ready Page
    Then Continue To Primary Contact And Information Page

  #   Same as Mailing box should be checked from AT
    Then Verify Mailing Address Is Checked

    Then I Save And Continue To Help Applying For Coverage Page
    Then Select Who Is Helping You
    Then Continue To Help Paying For Coverage Page
    Then Select Help Paying For Coverage
    Then I Save And Continue To About Your Household Page
    Then I Enter Household Information
    Then I Save And Continue To Summary Page
    Then Continue To Get Ready Page Of Family And Household
    Then Click Continue On Get Ready Page
    Then Enter Personal Information Of "Applicant"
    Then Click Continue To Citizenship Information Page
    Then Enter Citizenship Immigration Status Information Of "Applicant"

    # Enter Ethnicity modified -- "white" in the global json doesn't correspond to White or Caucasion in the UI, so Other is checked by default
    Then Enter Ethnicity Of "Applicant"
    Then Click Continue To Marital Status Information Page
    Then Enter Marital Status Information
    Then Click Continue To Military Service Page
    Then Enter Military Service Information
    Then Click Continue To Household Information Page
    Then Confirm The Household Information

#    Tax Filer Information should be checked
    Then Enter Tax Filers Information
#    Then Verify Tax Filers Information is selected


    Then Click Continue To Native American Information Page

  #    Native American Information should be there from AT
    Then Verify Native American Information is selected
    Then Click Continue To Medicaid And Chip Denial Info Page

    Then Enter Medicaid Chip Denial Information
    Then Click Continue To Disability Information Page

#   Disability should be selected from AT
    Then Verify Disability Information entered

    Then Click Continue On Family And Household Summary Page
    Then Click Continue To Income Information Page

    #   Income information should be selected from AT
    Then Verify Income Information Of "Applicant"

    Then Click Continue To Deduction Sources Information Page
    Then Enter Deduction Sources Information Of "Applicant"
    Then Click Continue To Expected Income Information Page
    Then Enter Expected Income Information Of "Applicant"
    Then Click Continue To Member Income Summary Page
    Then Click Continue To Overall Income Summary Page
    Then Click Continue To Other Health Coverage Information Page
    Then Enter Other Health Coverage Information Of "Applicant"
    Then Click Continue To Reconciliation of APTC Information Page
    Then Enter Reconciliation of APTC Information Of "Applicant"
    Then Click Continue To Employer Coverage Detail Information Page
    Then Enter Employer Coverage Detail Information Of "Applicant"
    Then Click Continue To State Employee Health Benefit Information Page
    Then Enter State Employee Health Benefit Information Of "Applicant"
    Then Click Continue To Additional Information Page
    Then Enter Additional Information Of "Applicant"
    Then Click Save And Continue On Additional Information Summary Page
    Then Click Continue On Review And Sign Page
    Then Click Continue On Final Review Page
    Then Agree To Terms On Sign And Submit
    Then Submit Application
    Then Click Continue To DashBoard
    #    TODO: CR
#    Then I Verify Dashboard Page Content










Feature: AccountTransfer

    @MN_Smoke @ID_Smoke @CA_Smoke @PA_Smoke @NV_Smoke @NJ_Smoke
    @PA_Regression @MN_Regression @ID_Regression @CA_Regression @PA_Regression @NV_Regression @NJ_Regression
    Scenario: AccountTransfer
#        Then Create Account Transfer 4Member_AT_Payload.xml household size 4



        Then Create AT From Json File HH1.json
        Then Print Out Json Results

        Then Get Access Code From ACCOUNT_ACTIVATION Table
        Then Register With Access Code And Link
        Then Setup Individual Account Inbound AT
#
#        Then Increase APTCMaximumAmmount by $5.00 And Send AT
#        Then Print Out Json Results
#
#        Then Decrease APTCMaximumAmmount by $50.00 And Send AT
#        Then Print Out Json Results

#        Then Add Member And Send AT
#        Then Print Out Json Results

#        Then Remove Member And Send AT
#        Then Print Out Json Results




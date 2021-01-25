const { Then } = require('cucumber');
var toolTipStep = require('../../pagemodels/Anonymous/ToolTipValidation.js');



Then('Verify ToolTips On PreEligibility Page', function () {
    console.log("On Step Def");
    toolTipStep.verifyTTonPreElegibilityPage();
  }
  );
  Then('Verify ToolTips PreEligibility on Results Page', function () {
    toolTipStep.verifyTTonPreElegibilityResultPage();
}
);

Then('Verify Tooltips on Preferences Page', function () {
    toolTipStep.verifyTTonPreferencePage();
}
);

Then('Verify ToolTips on Health Plan Display Page', function () {
    toolTipStep.verifyTTonPlanDisplayPage();
}
);
Then('Verify ToolTip on Dental Plan Display Page', function () {
    toolTipStep.verifyTTonDentalPlanDisplayPage();
}
);

Then('Verify ToolTips on Plan Details Page', function () {
    toolTipStep.verifyTTonPlanDetailsPage();
}
);

Then('Verify ToolTips on Cart Page', function () {
    toolTipStep.verifyTTonCartDetailsPage();
}
);

Then('Verify ToolTip on Dental Plan Details Page', function () {
    toolTipStep.verifyTTonDentalPlanDetailsPage();
}
);

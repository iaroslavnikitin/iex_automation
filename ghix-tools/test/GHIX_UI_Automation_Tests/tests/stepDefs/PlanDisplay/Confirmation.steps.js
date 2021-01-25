const {Then} = require('cucumber');
const  confirmation = require('../../pagemodels/PlanDisplay/ConfirmationPage');




Then('Click Go To DashBoard', function()
{
    confirmation.goToDashBoard();
});



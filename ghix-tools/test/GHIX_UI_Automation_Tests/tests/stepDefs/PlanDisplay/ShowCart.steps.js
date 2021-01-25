const {Given, Then, When} = require('cucumber');
const  showCart = require('../../pagemodels/PlanDisplay/ShowCartPage.js');



Then('Click Next To Register', function(){
    showCart.clickNextToRegister();
});

Then('Verify Show Cart Page', function()
{
    showCart.verifyCartPage();
});
Then('Click Sign Application', function()
{
    showCart.clickSignApplication();
});
Then('Click On I am Ready To Enroll', function()
{
    showCart.clickReadyToEnroll();
});

Then('Click Continue And I Am Ready To Enroll', function()
{
    showCart.clickSignApplication();
    showCart.clickReadyToEnroll();
});



const {Given, Then, When} = require('cucumber');
const { pauseBrowser } = require('../../base/Browser.js');
const customGroupingModel = require('../../pagemodels/MemberPortal/CustomGroupingPage.js');


Then('Click Shop For Plans On Custom Grouping Page',function(){
    customGroupingModel.clickShopHealthPlansOnCustomGrouping();
    pauseBrowser(10000);
});

Then('Select Members For Custom Grouping And Add Health Plan To The Groups',function(){
    customGroupingModel.selectCustomGroup();
});

Then('Click On Shop Health Plans',function(){
    customGroupingModel.clickShopHealthPlans();

});

Then('Click On Shop Dental Plans',function(){
    customGroupingModel.clickShopDentalPlans();

});


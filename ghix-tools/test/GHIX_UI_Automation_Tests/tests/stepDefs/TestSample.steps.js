const {Given, Then, When} = require('cucumber');
const  sample = require('../common.utils/SampleDataUtil');
const browser = require('../base/Browser.js');
const { pauseBrowser } = require('../base/Browser.js');

Then('Click Resume Application', function(){    

    browser.click($('//*[@id="further-action-btn"]'))
      
    if($('h1').getText()=='Summary'){
        browser.click($('button[id*=rightButton]'))
        pauseBrowser(2000)
        }
    //browser.click($('=Income information')) 
 
});


Then('Wait For 10Sec', function(){ 
    console.log ("in 10 sec loop")
    pauseBrowser(10000)  
 
});

Then('Click Continue On Familyhousehold Summary Page', function(){ 
       if($('h1').getText()=='Summary'){
        browser.click($('button[id*=rightButton]'))
        pauseBrowser(2000)
        } 
});



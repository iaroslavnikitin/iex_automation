const browser = require('../base/Browser.js')
const browserOOP = require('../base/Browser_OOPApproach')
const random = require('./RandomDataGenerator.js');
const dateUtil=require('../common.utils/CommonDateFunction')
const prop = require('../common.utils/PropertyReader');
const constants = require('../common.utils/Constants');
const state = prop.getEnvName();

class DataUtilOOPApproach{

 /**
   *  Fills required fields based on type. Works with Sophia's implementation.
   * 
   * @param {Page Element Object} pageObj 
   * @param {Value Object} fieldValueData 
   * 
   * Author: Sophia Oganesyan
   * Last Updated By: Sophia Oganesyan
   */
  fillRequiredInformation(pageObj,fieldValueData)
  {
     //take value randomization to agency page.s
      for (let field in pageObj)
      {        
                  if(!((pageObj[field].stateToSkip!=undefined) && (pageObj[field].stateToSkip.includes(state.toUpperCase())) ))
                  {
                  if(pageObj[field].required)
                  { switch(pageObj[field].fieldType)
                      {
                      case "text":
                      {   
                          if(!fieldValueData[pageObj[field].matchingDataProperty])
                          {
                               fieldValueData[pageObj[field].matchingDataProperty]=random.getRandomString(10,0).toLowerCase();
                             
                          }
                          
                          browserOOP.setTextValue(pageObj[field],fieldValueData[pageObj[field].matchingDataProperty]);
                          break;
                      }
                      case "email":
                      {   if(!fieldValueData[pageObj[field].matchingDataProperty])
                               fieldValueData[pageObj[field].matchingDataProperty]=random.getRandomEmail(fieldValueData.firstName.toLowerCase());
                               browserOOP.setTextValue(pageObj[field],fieldValueData[pageObj[field].matchingDataProperty]);
                          break;
                      }
                      case "phoneSplit":
                      { 
                          if(!fieldValueData[pageObj[field].matchingDataProperty])
                                  fieldValueData[pageObj[field].matchingDataProperty]=random.getRandomString(10,true);
                          browserOOP.setPhoneNumberSplited(pageObj[field],fieldValueData[pageObj[field].matchingDataProperty]);
                          break;
                          
                      }
                      case "zipCode":
                          {
                              if(!fieldValueData[pageObj[field].matchingDataProperty])
                              {
                                  fieldValueData[pageObj[field].matchingDataProperty]=random.getRandomString(5,true)
                              }
                              browserOOP.setTextValue(pageObj[field],fieldValueData[pageObj[field].matchingDataProperty]);
                              break;
                          }

                      case "numeric":
                          {   
                              if(!fieldValueData[pageObj[field].matchingDataProperty])
                              {
                                  fieldValueData[pageObj[field].matchingDataProperty]=random.getRandomString(pageObj[field].limit,true)
                              }
                              browserOOP.setTextValue(pageObj[field],fieldValueData[pageObj[field].matchingDataProperty]);
                              break;
                          }  
                          case "futureDate":
                          {
                              if(!fieldValueData[pageObj[field].matchingDataProperty])
                              {
                                  fieldValueData[pageObj[field].matchingDataProperty]=dateUtil.addYearsToDateToday(3,"MM-DD-YYYY");
                                 
                              }
                              browserOOP.setTextValue(pageObj[field],fieldValueData[pageObj[field].matchingDataProperty]);
                              break;
                          }
                          
                      case "dropDown":
                      {
                          if (fieldValueData[pageObj[field].matchingDataProperty])
                          {
                            browserOOP.setDropDown(pageObj[field],fieldValueData[pageObj[field].matchingDataProperty]);
                          }
                          else
                          {   
                              fieldValueData[pageObj[field].matchingDataProperty]=browserOOP.setRandomDropDownValue(pageObj[field]);
                              
                          }
                          break;
                      }
                      case "password":
                      {
                          fieldValueData[pageObj[field].matchingDataProperty]="ghix123#";
                          browser.pauseBrowser(constants.PAUSE_BROWSER_1000);
                          browserOOP.setTextValue(pageObj[field],fieldValueData[pageObj[field].matchingDataProperty]);
                          break;
                      }
                      case "ein":
                      {
                          if(!fieldValueData[pageObj[field].matchingDataProperty])
                          fieldValueData[pageObj[field].matchingDataProperty]=random.getRandomString(9,true);
                          browserOOP.setTextValue(pageObj[field],fieldValueData[pageObj[field].matchingDataProperty]);
                          break;
                      }
                      case "licenseNumber":
                          {
                              if(!fieldValueData[pageObj[field].matchingDataProperty])
                              fieldValueData[pageObj[field].matchingDataProperty]=random.getRandomString(10,true);
                              browserOOP.setTextValue(pageObj[field],fieldValueData[pageObj[field].matchingDataProperty]);
                              break;
                          }
                   
                  }
              }
          }
            
      }
      return fieldValueData;
   }
  
   /**
    * Goes over all days in the HoursOf Operations Object and sets hours for each day. 
    * If the data Object has values (indexes of hour options) it sets the corresponding value, otherwise sets random values.
    *  Works with Sophia's implementation.
    * 
    * @param {Page Object for hours of operation} hoursPageObject 
    * @param {Hours Of Operations} hoursDataObject 
    * 
    * Author: Sophia Oganesyan
    * Last Updated By: Sophia Oganesyan
    */
  setHoursOfOperation(hoursPageObject,hoursDataObject)
  {
      for (let day in hoursPageObject)
      {
          if (hoursDataObject[hoursPageObject[day].matchingDataProperty])
          {
            browserOOP.setHoursFromTo(hoursPageObject[day],hoursDataObject[hoursPageObject[day].matchingDataProperty]);
          }
          else
          {   
              hoursDataObject[hoursPageObject[day].matchingDataProperty]=browserOOP.setRandomHoursFromTo(hoursPageObject[day]);
              
          }
      }

   }
}
module.exports = new DataUtilOOPApproach();
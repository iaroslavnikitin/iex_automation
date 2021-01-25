const browser = require("../../base/Browser.js");
const browserOOP =require('../../base/Browser_OOPApproach');
const fileUploadUtil = require("../../common.utils/FileUploadUtil");
class Agent_OOPApproach {

  
  setAgentProfilePage(pageObject,dataObject)
  {
    this.setClientServed(pageObject.clientServed,dataObject);
    this.setLanguages(pageObject.languages,dataObject);
    this.setProductExpertise();
    dataUtil.fillRequiredInformation();

  }
  setProductExpertise(productExpertiseOptionsObject,dataValueObject)
         {
             
             for(let i=0;i<dataValueObject.length;i++)
             {
              browserOOP.setCheckBoxToTrue(productExpertiseOptionsObject[dataValueObject[i]],dataValueObject[i]);

             }
         }
    setLanguages(languagesPageObject,dataObject)
    {
      let languages=dataObject[languagesPageObject.matchingDataProperty];
      
      if(!(languages==null ||languages==undefined))
      {
        for(let i=0;i<languages.length;i++)
        { 
          browserOOP.setTextValue(languagesPageObject,languages[i]);
          browser.hitEnter();
        }
      }
    } 
  
/** Select and uploads file . Works with Sophia's implementation. 
 * Author: Sophia Oganesyan
 * Last updated: Sophia Oganesyan
*/
    chooseAndUploadFile(pageObject)
    {
      let picFile= process.cwd()+"/resources/data/Testfiles/pic.jpg";
      let uploadPhotoSelector=browserOOP.getStateSelector(pageObject.selectors);
     
      fileUploadUtil.fileUploadDirect(picFile,eval(uploadPhotoSelector.chooseFileButton));

      browser.waitToBeClickableAndClick(uploadPhotoSelector.uploadButton);
    }

}
module.exports = new Agent_OOPApproach();
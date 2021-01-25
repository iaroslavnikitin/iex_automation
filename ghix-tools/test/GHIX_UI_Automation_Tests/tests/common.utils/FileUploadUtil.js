const browser = require('../base/Browser.js');
const assert = require('../base/Assert.js');


class FileUploadUtil {
  /**
       * This function sets the file path in file input text box
       * @param String file = full file path including file name; 
       * @param String locator_fileInputTextbox = locator for file input text box; 
  */
  fileUploadDirect(file, locator_fileInputTextbox) {
    console.log("***** Uploading the file *****");
    let filePath = browser.getUploadFilePath(file); 
    browser.setValueInTextField(locator_fileInputTextbox, filePath);

  }

  fileUploadForDisabledTextbox(path,element)
  {    
    console.log("***** Uploading the file *****");
    const remoteFilePath=browser.getUploadFilePath(path);
    element.setValue(remoteFilePath); 
  }


  /**
         * This function verifies the file upload sucessful popup
         * @param String loc_fileUploadPopupText = locator to the file upload popup text; 
         * @param String fileUploadPopupText = file upload popup text to be verified; 
         * @param String loc_fileUploadPopupClose = file upload popup close locator; 

    */
  verifyFileUploadPopupAndClose(loc_fileUploadPopupText, fileUploadPopupText, loc_fileUploadPopupClose) {
    console.log("***** Verifying the File Upload Successful Popup *****");
    assert.assertElementContainsText(loc_fileUploadPopupText, fileUploadPopupText);
    browser.click(loc_fileUploadPopupClose);
    console.log("***** Closed the File Upload Successful Popup *****");
  }
}

module.exports = new FileUploadUtil();
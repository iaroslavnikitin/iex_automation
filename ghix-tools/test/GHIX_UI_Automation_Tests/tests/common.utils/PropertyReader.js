
//const path= 'C:/sampleWebdriverio/webdriver_cucumber/GI_WebdriverioTests/config/testConfig.properties';
var filePath= require('fs');
const path = require("path");

class PropertyReader{

 getPropertyValue(propertyName, fileName){

   var rawContent = "";
 
   if(fileName !== "undefined") 
   {
      rawContent = filePath.readFileSync(path.resolve(__dirname, "../../config/"+fileName));
   }
   else{
      rawContent = filePath.readFileSync(path.resolve(__dirname, "../../config/testConfig.properties"));
   }

  var propertyMap = {}
  var fullContent = rawContent.toString()
  var allPairs = fullContent.split("\n")
  
  for (var i = 0; i < allPairs.length; i++) {
         var keyValue = allPairs[i].split("=");
         propertyMap[keyValue[0]] = keyValue[1];
  }

  var property = propertyMap[propertyName]
  console.log("property map stateprofile="+property);
  
    return property
}

getIssues(propertyName)
{
   
   var file = "KnowIssues.txt"
   return this.getPropertyValue(propertyName, file)
}

getEnvName(){
   //return this.getPropertyValue('stateProfile');
   return stateProfile
}

}
module.exports = new PropertyReader();
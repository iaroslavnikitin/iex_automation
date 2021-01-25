
const {random} = require('./RandomDataGenerator')

var file= require('fs');
const path = require("path");
class DataUtil{
 
getDataValues(filePath){
 
const obj = file.readFileSync(path.resolve(__dirname, "../../resources/data/sample.json"));      
   var jsonStr = obj.toString()
   const json=JSON.parse(jsonStr);
  
  console.log("I am"+json.firstName);
 
}
 
}
 
module.exports = new DataUtil();
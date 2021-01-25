
const random = require('../../tests/common.utils/RandomDataGenerator.js');
 
class GenerateData{
    fname =random.getRandomFirstName();
    lname = random.getRandomLastName();
    email = random.getRandomEmail(this.fname);

     household ={
        "family": {
            "coverageDate": "01/01/2020",
            "zip":"17025",
            "phone1":"408",
            "phone2":"444",
            "phone3":"7895",
            "ssn1":"382",
             "ssn2": '88',
            "ssn3": '2322',
            "SecurityQuestion": 'abc',
            "password": 'ghix123#',
            "mailingAddress1":'4510 Marketplace Way',
            "city":'Enola',
            "state":'Pennsylvania',
            "prefSpokenLangSelectBox": 'English',
            "prefWrittenLangSelectBox": 'English',
    
            "HealthPlan": "",
            "DentalPlan": "",
            "members": [{
                    "firstNname": this.fname,
                    "lastName": this.lname,
                    "email":"",
                    "dob": "01/01/1990",
                    "realtionShip": "self",
                    "seekingCoverage": true
                }                
       
            ]
        }
    }
    
        
    //createHouseHoldInformation(household)>>>>>>household.family.members.length
    




}


module.exports = new GenerateData();


var moment = require('moment');
const commonConfig = require('./CommonConfig');
const logger=require('../common.utils/LoggerUtil');




class CalculateCoverageDate{
    
    /**
         * Converts Date to a given format
         * @param {String} str: Is a Date in US Format.
    */
    convertDate(str) {
        let date =moment(str).format("MMM DD, YYYY");
        return date;
    }


    /**
        * Subtracts the given number of days from Server date, changes it to a specific format and returns the date.
        * @param {Integer} days: To subtract given days from the server date.
        * @param {String} format: To convert date to the given format passed as parameter.
        * Example : 10/03/2020-(2,"MM/DD/YYYY") = 10/01/2020.
    */
    getPreviousDate(days, format){
        if(!format){
            format = "MM/DD/YYYY"
        }
        let serverDate = commonConfig.getServerDate();
        let backDate = moment(serverDate).subtract(days,'d').format(format);
        console.log(backDate);
        return backDate;
    }

    
    /**
        * Returns End Date of Previous Month Of Server Date.
    */
    getEndDateOfLastMonth(){
        let serverDate = commonConfig.getServerDate();
        let endDateOfLastMonth=moment(serverDate).subtract(1,'months').endOf('month').format('MM/DD/YYYY');
        /*if(inGlobalOEP()=="ON"){
            endDateOfLastMonth = endDateOfLastMonth.substring(0,6)+   getCurrentCoverageYear();
        }*/
        console.log(" End of last month for coverage Year is "+endDateOfLastMonth)

    

            return endDateOfLastMonth;
    }

     /**
         * Returns the midDate of the previous month by taking Coverage Year as parameter.
         * @param {String} coverageYear: To calculate midDate
    */
    getMidOfLastMonth(coverageYear){
        let midDate;
        let serverDate = commonConfig.getServerDate();
        let currentMonth = moment(serverDate).get('month') + 1;
        if(currentMonth == 1)
        {
            midDate="01/02/"+coverageYear;
        }
        else{
            midDate=moment(serverDate).subtract(1, 'months').format('MM/16/YYYY');
        }
        return midDate;
    }

    /**
         * Returns the Start Date Of The Coverage Year by taking Coverage Year as parameter.
         * @param {String} coverageYear: To calculate Start Date Of The Year.
    */
    getStartDateOfCoverageYear(coverageYear){
        let startDateOfYear = "01/01/"+coverageYear;
        console.log("Start Date of Year: " +startDateOfYear);
        return startDateOfYear;
    }

    /**
         * Returns the Date after adding Years to serverDate by taking number of Years as parameter.
         * Formats the date with given format if parameter is given.
         * @param {Integer} numOfYears: To add to serverDate and return.
         * @param {String} dateFormat: To format the date
    */
    addYearsToDateToday(numOfYears,dateFormat){ 
        let serverDate = commonConfig.getServerDate();
        let dateAfterYearsAdded = moment(serverDate).add(numOfYears, 'y');
        logger.log("Date After Years Added: " +dateAfterYearsAdded);
        if (dateFormat != "" && dateFormat != null && dateFormat != undefined) 
        {   
            dateAfterYearsAdded=moment(dateAfterYearsAdded).format(dateFormat);
            logger.log("Formatted Date: " +dateAfterYearsAdded);
            
        }
        return dateAfterYearsAdded;
        
    }
  


}
module.exports = new CalculateCoverageDate();
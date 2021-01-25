const browser = require('../base/Browser.js')
const logger=require('../common.utils/LoggerUtil');
class DataUtil {
    doFormFill(locatorJson, array) {

        for (var entry in array) {
            browser.pauseBrowser(500);
            if (entry.includes("tb_")) {
                browser.setValueInTextField(eval(locatorJson[entry]), array[entry]);
            } else if (entry.includes("sb_")) {
                if (typeof (array[entry]) == "number")
                    browser.selectByIndex(eval(locatorJson[entry]), array[entry])
                else if (typeof (array[entry]) == "string")
                    browser.selectByVisibleText(eval(locatorJson[entry]), array[entry])
            } else if (entry.includes("btn_") || entry.includes("cb_")) {
                browser.click(eval(locatorJson[entry]))
            }
            else if (entry.includes("ph_"))
            {   browser.setValueInTextField(eval(locatorJson[entry][0]), array[entry].slice(0,3));
                browser.setValueInTextField(eval(locatorJson[entry][1]), array[entry].slice(3,6));
                browser.setValueInTextField(eval(locatorJson[entry][2]), array[entry].slice(6,array[entry].length));
            }
        }

    }

    /**
     * Akhilash Lakma
     * This function Takes any number as an input and returns in specific format.
     * @param number Actual input value
     * @param thousandSeperator Boolean value to specify whether we need thosand seprator in output or not
     * @param currencyIndicator Boolean value to specify whether we need Currency symbol in output or not
     * @param decimalPlaces Numeric Value for denoting integer and non-integer numbers, If not specified then defaults to 2 
     * ex: formatMoney(524, true, true) -->$524.00
     * ex: formatMoney(1025.22, true, true) -->$1,025.22
     * ex: formatMoney(1025.22, false, true) -->$1025.22
     * ex: formatMoney(1025.22, false, false) -->1025.22
     * ex: formatMoney(1025.22, true, false) -->$1025.22
     * ex: formatMoney(1025, true, true) -->$1,025.00
     * ex: formatMoney(1025, true, true,0) -->$1,025
     * ex: formatMoney("1025", true, true,0) -->$1,025
     * ex: formatMoney("1,025.22", true, true) -->$1,025.22
     * ex: formatMoney("1,025.22", false, false) -->1025.22
     * ex: formatMoney("$1,025.22", false, false) -->1025.22
    */

    formatMoney(number, thousandSeperator, currencyIndicator, decimalPlaces) {
        logger.log("*****Number Formating*****");
        number= typeof number === "string" ? number.replace(",","") : number;
        number= typeof number === "string" ? number.replace("$","") : number;
        decimalPlaces = isNaN(decimalPlaces = Math.abs(decimalPlaces)) ? "2" : decimalPlaces;
        var currencySign = currencyIndicator === true ? "$" : "";
        var thouSep = thousandSeperator === true ? "," : "";
        var sign = number < 0 ? "-" : "";
        var i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decimalPlaces)));
        var j = (j = i.length) > 3 ? j % 3 : 0;
        
        return sign + currencySign +
            (j ? i.substr(0, j) + thouSep : "") +
            i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
            (decimalPlaces ? "." + Math.abs(number - i).toFixed(decimalPlaces).slice(2) : "");
    }




    // extracts number from a string by replacing all other chars with "". EX: str="abc$1,123.45 abc" returns 1123.45
    extractNumber(str) {
        return str.replace(/[^0-9.]+/g, "");
    }
}



module.exports = new DataUtil();
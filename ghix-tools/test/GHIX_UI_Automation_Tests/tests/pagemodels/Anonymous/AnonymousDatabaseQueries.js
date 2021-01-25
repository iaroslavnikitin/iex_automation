const DbHelper = require('../../common.utils/DbHelper');
var dbHelper = new DbHelper(url);
const logger=require('../../common.utils/LoggerUtil');


class AnonymousDatabaseQueries {

    async getDBdata() {
        let pregnancy_property_key = 'iex.prescreener.pregnancy_indicator';
        let nativeAmerican_property_key = 'iex.enableNativeAmericanCheck';
        let tobaccoUse_property_key = 'iex.additionalInfo.tobacco';
        let pregnancyCheckQuery = "select property_value from gi_app_config where property_key= '" + pregnancy_property_key + "'";
        let pregnancyCheck = await dbHelper.getValueFromDB(pregnancyCheckQuery, 'ON', 'property_value');
        let nativeAmericanCheckQuery = "select property_value from gi_app_config where property_key= '" + nativeAmerican_property_key + "'";
        let nativeAmericanCheck = await dbHelper.getValueFromDB(nativeAmericanCheckQuery, 'ON', 'property_value');
        let tobaccoUseCheckQuery = "select property_value from gi_app_config where property_key= '" + tobaccoUse_property_key + "'";
        let tobaccoUseCheck = await dbHelper.getValueFromDB(tobaccoUseCheckQuery, 'ON', 'property_value');
        logger.log('Pregnancy check :-'+pregnancyCheck+'  Native AmericanCheck -'+nativeAmericanCheck+'-  TobaccoUseCheck -'+tobaccoUseCheck);
        return pregnancyCheck+"-"+nativeAmericanCheck+"-"+tobaccoUseCheck;
    }

}
module.exports = new AnonymousDatabaseQueries();
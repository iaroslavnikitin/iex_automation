const ATProperties = require('../../config/AccountTransferProperties.json');

class ATFactory {

    getATConfig(endpoint) {
        if (ATProperties[`${stateProfile.toUpperCase()}`] != undefined) {
            if (ATProperties[`${stateProfile.toUpperCase()}`][endpoint] == undefined) {
                let atProperties = ATProperties[`${stateProfile.toUpperCase()}`]['default'];
                if (stateProfile.toUpperCase() == 'MN') {
                    console.log("Properties in ATFactory: " + JSON.stringify(atProperties));
                    atProperties['um_url'] = envPrefix + '.eng.vimo.com';
                    atProperties['at_url'] = envPrefix + '.eng.vimo.com';
                    return atProperties;
                } else {
                    atProperties['at_url'] = envPrefix + '.eng.vimo.com';
                    return atProperties;
                }
            } else {
                let atProperties = ATProperties[`${stateProfile.toUpperCase()}`][endpoint];
                return atProperties;
            }
        }
    }
}

module.exports = new ATFactory();

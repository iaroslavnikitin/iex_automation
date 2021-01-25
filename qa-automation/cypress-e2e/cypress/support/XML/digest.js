const wsse = require('wsse-header');

cy.wsseHeader = function wsseHeader(email, password) {
    wsse.setup();
    let salt = 'CYPRESS-nuc42b7tt28kogkcsw08cswwkco0c0s';
    let encodePassword = wsse.encodePassword(password);

    let credentials = {
        username: email,
        passwordEncoded: encodePassword
    };
    let headerToken = wsse.buildWsseHeader(credentials);

    /**
     * headerToken returns:
     *  UsernameToken Username="oumarpoulo", PasswordDigest="cSqBypCjILzC11ZpDxEqtyysYYc=", Nonce="a3ppZWdsMnBkMHBzYzNkaQ==", Created="2015-09-24T13:34:28+02:00"
     */

        //getting digest information from wsse:
    let digest = headerToken.split(',');
    let local_time = new Date(digest[3].split('"')[1]).toISOString();

    let digestInfo = {
        Username: digest[0].split('"')[1],
        PasswordDigest: digest[1].split('"')[1],
        Nonce: digest[2].split('"')[1],
        Created: local_time,
    };
    return digestInfo;
}

cy.getServerIsoDate = function getServerIsoDate() {
    return cy.request({
        url: cy.conf.URL + '/actuator/info',
        method: 'GET'
    })
}
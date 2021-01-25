import jsonQuery from 'json-query'
cy.getRandomAddress = (state) =>  {
    state = state.toUpperCase()
    let addr = {}
    addr.MN = [{
        "ns2:LocationStreet": {
            "ns2:StreetFullText": "4013 Forest Rd"
        },
        "ns2:LocationCityName": "MINNEAPOLIS",
        "ns2:LocationCountyCode": "053",
        "ns2:LocationStateUSPostalServiceCode": "MN",
        "ns2:LocationPostalCode": "55416"
    },
        {
            "ns2:LocationStreet": {
                "ns2:StreetFullText": "1711 Tamarack Lake Rd"
            },
            "ns2:LocationCityName": "Wright",
            "ns2:LocationCountyCode": "017",
            "ns2:LocationStateUSPostalServiceCode": "MN",
            "ns2:LocationPostalCode": "55798"
        },
        {
            "ns2:LocationStreet": {
                "ns2:StreetFullText": "17963 62nd St"
            },
            "ns2:LocationCityName": "Becker",
            "ns2:LocationCountyCode": "141",
            "ns2:LocationStateUSPostalServiceCode": "MN",
            "ns2:LocationPostalCode": "55308"
        },
        {
            "ns2:LocationStreet": {
                "ns2:StreetFullText": "101 Geneva Blvd"
            },
            "ns2:LocationCityName": "Burnsville",
            "ns2:LocationCountyCode": "037",
            "ns2:LocationStateUSPostalServiceCode": "MN",
            "ns2:LocationPostalCode": "55306"
        },
        {
            "ns2:LocationStreet": {
                "ns2:StreetFullText": "14590 Joppa Ave S"
            },
            "ns2:LocationCityName": "Savage",
            "ns2:LocationCountyCode": "139",
            "ns2:LocationStateUSPostalServiceCode": "MN",
            "ns2:LocationPostalCode": "55378"
        }
    ]

    addr.NV = [
        // {
        //     "ns2:LocationStreet": {
        //         "ns2:StreetFullText": "4809 Kietzke Ln"
        //     },
        //     "ns2:LocationCityName": "Reno",
        //     "ns2:LocationCountyCode": "031",
        //     "ns2:LocationStateUSPostalServiceCode": "NV",
        //     "StateSelection": ["Nevada", "28", "NV"],
        //     "ns2:LocationPostalCode": "89509"
        // },
        {
            "ns2:LocationStreet": {
                "ns2:StreetFullText": "6179 Bluehill Ave"
            },
            "ns2:LocationCityName": "Las Vegas",
            "ns2:LocationCountyCode": "003",
            "ns2:LocationStateUSPostalServiceCode": "NV",
            "StateSelection": ["Nevada", "28", "NV"],
            "ns2:LocationPostalCode": "89156"
        },
        {
            "ns2:LocationStreet": {
                "ns2:StreetFullText": "5453 San Pietro Dr"
            },
            "ns2:LocationCityName": "Pahrump",
            "ns2:LocationCountyCode": "023",
            "ns2:LocationStateUSPostalServiceCode": "NV",
            "StateSelection": ["Nevada", "28", "NV"],
            "ns2:LocationPostalCode": "89061"
        }
        // ,
        // {
        //     "ns2:LocationStreet": {
        //         "ns2:StreetFullText": "10211 Red Pueblo Pl"
        //     },
        //     "ns2:LocationCityName": "Las Vegas",
        //     "ns2:LocationCountyCode": "003",
        //     "ns2:LocationStateUSPostalServiceCode": "NV",
        //     "StateSelection": ["Nevada", "28", "NV"],
        //     "ns2:LocationPostalCode": "89144"
        // }
        // ,
        // {
        //     "ns2:LocationStreet": {
        //         "ns2:StreetFullText": "2214 Windrow Dr"
        //     },
        //     "ns2:LocationCityName": "Fernley",
        //     "ns2:LocationCountyCode": "019",
        //     "ns2:LocationStateUSPostalServiceCode": "NV",
        //     "StateSelection": ["Nevada","28", "NV"],
        //     "ns2:LocationPostalCode": "89408"
        // }
    ];

    //let addrState = jsonQuery(`${state}`, {data: addr}).value

    //let addrState = addr[[`${state}`]]
    let randAddr = addr[state][Math.floor(Math.random() * [state].length)];

    return randAddr;
}

cy.randomFirstName = function randomFirstName() {
    let firstNamesArray = ["Jackson", "Aiden", "Liam", "Lucas", "Noah", "Mason", "Jayden", "Ethan", "Jacob", "Jack", "Caden", "Logan", "Benjamin", "Michael", "Caleb", "Ryan", "Alexander", "Elijah", "James", "William", "Oliver", "Connor", "Matthew", "Daniel", "Luke", "Brayden", "Joyce", "Henry", "Carter", "Dylan", "Gabriel", "Joshua", "Nicholas", "Isaac", "Owen", "Nathan", "Grayson", "Elise", "Landon", "Andrew", "Maxim", "Samuel", "Gavin", "Wyatt", "Christian", "Hunter", "Cameron", "Evan", "Charlie", "David", "Sebastian", "Joseph", "Dominic", "Anthony", "Colton", "John", "Tyler", "Zachary", "Thomas", "Julian", "Levi", "Adam", "Isaiah", "Alex", "Aaron", "Parker", "Cooper", "Miles", "Chase", "Muhammad", "Christopher", "Blake", "Austin", "Jordan", "Leon", "Jonathan", "Adrian", "Colin", "Hudson", "Ianic", "Xavier", "Camden", "Tristan", "Carson", "Jason", "Nolan", "Riley", "Lincoln", "Brody", "Bentley", "Nathaniel", "Josiah", "Declan", "Jake", "Asher", "Jeremiah", "Cole", "Mateo", "Micah", "Elliot", "Sophia", "Emma", "Olivia", "Isabella", "Miaa", "Avaa", "Lily", "Zoee", "Emily", "Chloe", "Layla", "Madison", "Madelyn", "Abigail", "Aubrey", "Charlotte", "Amelia", "Ella", "Kaylee", "Avery", "Aaliyah", "Hailey", "Hannah", "Addison", "Riley", "Harper", "Aria", "Ariannah", "Mackenzie", "Lila", "Evelyn", "Adalyn", "Grace", "Brooklyn", "Ellie", "Hanna", "Kaitlyn", "Isabelle", "Sophie", "Scarlett", "Natalie", "Leah", "Sarah", "Nora", "Mila", "Elizabeth", "Lillian", "Kylie", "Audrey", "Lucy", "Maya", "Annabelle", "Makayla", "Gabriella", "Elena", "Victoria", "Claire", "Savannah", "Peyton", "Maria", "Alaina", "Kennedy", "Stella", "Liliana", "Allison", "Samantha", "Keira", "Alyssa", "Reagan", "Molly", "Alexandra", "Violet", "Charlie", "Julia", "Sadie", "Ruby", "Evali", "Alice", "Eliana", "Taylor", "Callie", "Penelope", "Camilla", "Bailey", "Kaelyn", "Alexis", "Kayla", "Katherine", "Sydney", "Lauren", "Jasmine", "London", "Bella", "Adeline", "Caroline", "Vivian", "Juliana", "Gianna", "Skyler", "Jordyn"];
    let randFirstName = firstNamesArray[Math.floor(Math.random() * firstNamesArray.length)];
    return randFirstName;
}

cy.randomGender = function randomGender() {
    let genderArray = ["Male", "Female"];
    let randGender = genderArray[Math.floor(Math.random() * genderArray.length)];
    return randGender;
}
cy.randomRace = function randomRace() {
    let raceArray = ["Asian", "White", "Hispanic"];
    let randRace = raceArray[Math.floor(Math.random() * raceArray.length)];
    return randRace;
}

cy.randomInsurancePremiumAmmount = function randomInsurancePremiumAmmount() {
    let amntArr = [255.55, 125.80, 155.50, 342.50, 215.10, 225.25, 250.20, 275.30, 355.55];
    let randInsPremium = amntArr[Math.floor(Math.random() * amntArr.length)];
    return randInsPremium;
}

cy.randomAptcMaximumAmount = function randomAptcMaximumAmount() {
    let amntArr = [110, 115, 220.12, 225, 230, 235.55, 240, 245, 250, 255, 260, 265.05, 275, 280, 285.99, 290, 295, 300];
    let randAptcAmnt = amntArr[Math.floor(Math.random() * amntArr.length)];
    return randAptcAmnt;
}

cy.randomLastName = function randomLastName() {

    let lastNameArray = [
        "Anderson",
        "Ashwoon",
        "Aikin",
        "Bateman",
        "Bongard",
        "Bowers",
        "Boyd",
        "Cannon",
        "Cast",
        "Deitz",
        "Dewalt",
        "Ebner",
        "Frick",
        "Hancock",
        "Haworth",
        "Hesch",
        "Hoffman",
        "Kassing",
        "Knutson",
        "Lawless",
        "Lawicki",
        "Mccord",
        "McCormack",
        "Miller",
        "Myers",
        "Nugent",
        "Ortiz",
        "Orwig",
        "Oryg",
        "Paiser",
        "Paki",
        "Pettigrew",
        "Quinn",
        "Quizoz",
        "Ramachandran",
        "Resnick",
        "Sagar",
        "Schickowski",
        "Schiebel",
        "Sellon",
        "Severson",
        "Shaffer",
        "Solberg",
        "Soloman",
        "Sonderling",
        "Soukup",
        "Soulis",
        "Stahl",
        "Sweeney",
        "Tandy",
        "Trebil",
        "Trusela",
        "Trussel",
        "Turco",
        "Uddin",
        "Uflan",
        "Ulrich",
        "Upson",
        "Vader",
        "Vail",
        "Valente",
        "Vanzandt",
        "Vanderpoel",
        "Ventotla",
        "Vogal",
        "Wagle",
        "Wagner",
        "Wakefield",
        "Weinstein",
        "Weiss",
        "Woow",
        "Yang",
        "Yates",
        "Yocum",
        "Zeaser",
        "Zeller",
        "Ziegler",
        "Bauer",
        "Baxster",
        "Casal",
        "Cataldi",
        "Caswell",
        "Celedon",
        "Chambers",
        "Chapman",
        "Christensen",
        "Darnell",
        "Davidson",
        "Davis",
        "DeLorenzo",
        "Dinkins",
        "Doran",
        "Dugelman",
        "Dugan",
        "Duffman",
        "Eastman",
        "Ferro",
        "Ferry",
        "Fletcher",
        "Fietzer",
        "Hylan",
        "Hydinger",
        "Illingsworth",
        "Ingram",
        "Irwin",
        "Jagtap",
        "Jenson",
        "Johnson",
        "Johnsen",
        "Jones",
        "Jurgenson",
        "Kalleg",
        "Kaskel",
        "Keller",
        "Leisinger",
        "LePage",
        "Lewis",
        "Linde",
        "Lulloff",
        "Maki",
        "Martin",
        "McGinnis",
        "Mills",
        "Moody",
        "Moore",
        "Napier",
        "Nelson",
        "Norquist",
        "Nuttle",
        "Olson",
        "Ostrander",
        "Reamer",
        "Reardon",
        "Reyes",
        "Rice",
        "Ripka",
        "Roberts",
        "Rogers",
        "Root",
        "Sandstrom",
        "Sawyer",
        "Schlicht",
        "Schmitt",
        "Schwager",
        "Schutz",
        "Schuster",
        "Tapia",
        "Thompson",
        "Tiernan",
        "Tisler"];
    let randLastName = lastNameArray[Math.floor(Math.random() * lastNameArray.length)];
    return randLastName;
}

cy.getRandomSSN = function getRandomSSN() {
    // do {
    let ssn2 = Cypress._.random(10, 99);
    let ssn4 = Cypress._.random(1000, 9999);

    let ssn3Arr = [Cypress._.random(100, 665), Cypress._.random(667, 888)]
    let ssn3 = ssn3Arr[Math.floor(Math.random() * ssn3Arr.length)];

    let ssn = ssn3.toString() + ssn2.toString() + ssn4.toString();
    return ssn;
}

cy.phoneGen = function phoneGen() {
    let phone4 = () => Cypress._.random(1000, 9999);
    let phone3 = () => Cypress._.random(100, 888);
    let phone = [phone3(), phone3(), phone4()];

    return phone;
}

cy.getRandomDateOfBirth = function getRandomDateOfBirth() {
    let randYear = () => Cypress._.random(1955, (new Date().getFullYear() - 20));
    let randDayOfMonth = () => Cypress._.random(1, 28);
    let randMonthNumber = () => Cypress._.random(1, 12);

    let randDay = randDayOfMonth();
    if (randDay < 10) {
        randDay = "0" + randDay;
    }
    ;
    let randMonth = randMonthNumber();
    if (randMonth < 10) {
        randMonth = "0" + randMonth;
    }
    ;

    let dob = randYear() + "-" + randMonth + "-" + randDay;
    return dob;
}

cy.checkSSNunique = ((hh) => {
    for (const p of hh.people) {
        if (!p.ssn) {
            p.ssn = cy.getRandomSSN()
            cy.wrap(cy.checkSSN(p.ssn))
        }
    }
})

cy.encryptStr = (str) => {
    return cy.request({
        url: cy.conf.URL + `/account/signup/encrypt?string=${str}`,
        method: 'GET'
    })
}

cy.checkSSN = (ssn) => {
    cy.encryptStr(ssn)
        .then((res) => {
            let encryptedSSN = res.body.value
            cy.request({
                url: cy.conf.URL + `/account/signup/ssn/check?ssn=${encryptedSSN}`,
                method: 'GET',
                failOnStatusCode: false
            })
                .then((resp) => {
                    let status = resp.status
                    let response = resp.body.exists
                    expect(status).to.eq(404)
                    expect(response).to.eq(false)
                })
        })
}

cy.checkEmail = (email) => {
    let encryptedEmail = cy.encryptStr(email)
    return cy.request({
        url: cy.conf.URL + `/account/signup/email/check?email=${encryptedEmail}`,
        method: 'GET'
    })
}

cy.checkSSNDOB = (ssn, dob) => {

    cy.login(cy.conf.L2_CSR_USERNAME, cy.conf.L2_CSR_PASSWORD)

    cy.get('#csrftoken')
        .then((elem) => {
            cy.log("csrftoken: " + elem.val())
            cy.log("ssn: " + ssn)
            cy.log("dob: " + dob)
            cy.request({
                method: 'POST',
                followRedirect: false,
                form: true,
                url: '/hix/account/signup/checkSSNAndBirthDate',
                body: {
                    ssn: ssn,
                    dob: dob,
                    csrftoken: elem.val()
                }
            }).then((resp) => {
                expect(resp.status).to.eq(200)
                expect(resp.body).to.eq('')
                // cy.logout()
            })
        })
}
cy.getServerConfig = () => {
    return cy.request({
        url: cy.conf.URL + '/ui/environment',
        method: 'GET'
    })
}

cy.getServerTime = () => {
    return cy.request({
        url: cy.conf.URL + '/ui/ping',
        method: 'GET'
    })
}

cy.rels = (hh_size, singleParentHH) => {

    if (!hh_size || hh_size < 1 || hh_size > 10) {
        throw "Invalid household size: " + hh_size +
        "\nHoushold size should be between 1 and 10"
    }
    ;
    let r = [];

    //Parents/children relationship
    if (hh_size == 1) {
        var parents = 1;
        r[1] = null
    } else if (singleParentHH) {
        var parents = 1;
        r[1] = {};
        for (let i = 2; i <= hh_size; i++) {
            r[1][i] = cy.relationship.CHILD;
        }
    } else {
        var parents = 2;
        r[1] = {};
        r[2] = {};
        r = {
            1: {2: cy.relationship.SPOUSE},
            2: {1: cy.relationship.SPOUSE}
        };
        for (let i = 3; i <= hh_size; i++) {

            r[1][i] = cy.relationship.CHILD;
            r[2][i] = cy.relationship.CHILD;
        }
    }
    ;

    //Children/parents relationship
    for (let i = parents; i < hh_size; i++) {
        r[i + 1] = {};
        if (hh_size == 1 || singleParentHH) {
            r[i + 1][1] = cy.relationship.PARENT;
        } else {
            r[i + 1][1] = cy.relationship.PARENT;
            r[i + 1][2] = cy.relationship.PARENT;
        }
    }
    ;

    //Siblings relationship
    for (let i = parents; i < hh_size; i++) {
        for (let j = parents; j < hh_size; j++) {
            if (i !== j) {
                r[i + 1][j + 1] = cy.relationship.SIBLING;
            }
        }
    }

    console.log("Relationship created " + JSON.stringify(r));

    return r
}

cy.hhAPTCEligibility = (people) => {
    let hhAPTCElig = new Set()
    for (let p of people) {
        console.log("p is " + JSON.stringify(p))
        let pAPTCInd = p.aptcEligibilityIndicator
        console.log("pAPTCInd is " + pAPTCInd)
        hhAPTCElig.add(pAPTCInd)
    }
    hhAPTCElig.forEach(function (el) {
        console.log("********* " + el);
    })
    return Array.from(hhAPTCElig)
}
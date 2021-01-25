//const  dataBase = require('../base/DataBase'); 

class RandomDataGenerator {
    //Get Today's date
    getDateToday() {
        var d = new Date();
        return ((d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear());
    }

    //Add number of Years to Today's date
    addYearsToDateToday(numOfYears) {
        var d = new Date();
        return ((d.getMonth() + 1) + '/' + d.getDate() + '/' + (d.getFullYear() + numOfYears));
    }
    

    getRandomString($length, $digits) {
        var $chars;
        var $str = "";
        if ($digits) {
            $chars = "1234567890";
        } else {
            $chars = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
        }

        for (var $i = 0; $i < $length; $i++) {
            var $index = Math.floor(Math.random() * $chars.length);
            $str += $chars.charAt($index);
        }
        return $str;
    }

    getRandomEmail($name) {
        var $timestamp = new Date().getTime();
        var $email = $name + $timestamp + '@yopmail.com';
        return $email;
    }

    getRandomSecurityQuestionAnswer() {
        /* Question Index -
        1.What was your childhood nickname?
        2.In what city did you meet your spouse/significant other?
        3.What is the name of your favorite childhood friend?
        4.What street did you live on in third grade?
        5.What is your oldest sibling's birthday month and year? (Please use this format: January 1900)
        6.What is the name of your oldest child?
        7.What is your oldest sibling's middle name?
        */
        var $securityQuestionAnswerArray = [[1, "curious"], [2, "MAS"], [3, "JES"], [4, "GVP"], [5, "May 1985"], [6, "ANN"], [7, "TEJ"]];
        return $securityQuestionAnswerArray[Math.floor(Math.random() * $securityQuestionAnswerArray.length)];
    }

    getRandomFirstName() {

        var $firstNamesArray = ["Jackson", "Aiden", "Liam", "Lucas", "Noah", "Mason", "Jayden", "Ethan", "Jacob", "Jack", "Caden", "Logan", "Benjamin", "Michael", "Caleb", "Ryan", "Alexander", "Elijah", "James", "William", "Oliver", "Connor", "Matthew", "Daniel", "Luke", "Brayden", "Jayce", "Henry", "Carter", "Dylan", "Gabriel", "Joshua", "Nicholas", "Isaac", "Owen", "Nathan", "Grayson", "Elise", "Landon", "Andrew", "Maxim", "Samuel", "Gavin", "Wyatt", "Christian", "Hunter", "Cameron", "Evan", "Charlie", "David", "Sebastian", "Joseph", "Dominic", "Anthony", "Colton", "John", "Tyler", "Zachary", "Thomas", "Julian", "Levi", "Adam", "Isaiah", "Alex", "Aaron", "Parker", "Cooper", "Miles", "Chase", "Muhammad", "Christopher", "Blake", "Austin", "Jordan", "Leon", "Jonathan", "Adrian", "Colin", "Hudson", "Ianic", "Xavier", "Camden", "Tristan", "Carson", "Jason", "Nolan", "Riley", "Lincoln", "Brody", "Bentley", "Nathaniel", "Josiah", "Declan", "Jake", "Asher", "Jeremiah", "Cole", "Mateo", "Micah", "Elliot", "Sophia", "Emma", "Olivia", "Isabella", "Miaa", "Avaa", "Lily", "Zoee", "Emily", "Chloe", "Layla", "Madison", "Madelyn", "Abigail", "Aubrey", "Charlotte", "Amelia", "Ella", "Kaylee", "Avery", "Aaliyah", "Hailey", "Hannah", "Addison", "Riley", "Harper", "Aria", "Arianna", "Mackenzie", "Lila", "Evelyn", "Adalyn", "Grace", "Brooklyn", "Ellie", "Anna", "Kaitlyn", "Isabelle", "Sophie", "Scarlett", "Natalie", "Leah", "Sarah", "Nora", "Mila", "Elizabeth", "Lillian", "Kylie", "Audrey", "Lucy", "Maya", "Annabelle", "Makayla", "Gabriella", "Elena", "Victoria", "Claire", "Savannah", "Peyton", "Maria", "Alaina", "Kennedy", "Stella", "Liliana", "Allison", "Samantha", "Keira", "Alyssa", "Reagan", "Molly", "Alexandra", "Violet", "Charlie", "Julia", "Sadie", "Ruby", "Evali", "Alice", "Eliana", "Taylor", "Callie", "Penelope", "Camilla", "Bailey", "Kaelyn", "Alexis", "Kayla", "Katherine", "Sydney", "Lauren", "Jasmine", "London", "Bella", "Adeline", "Caroline", "Vivian", "Juliana", "Gianna", "Skyler", "Jordyn"];
        return $firstNamesArray[Math.floor(Math.random() * $firstNamesArray.length)];
    }

    getRandomLastName() {

        var $lastNameArray = ["Anderson", "Ashwoon", "Aikin", "Bateman", "Bongard", "Bowers", "Boyd", "Cannon", "Cast", "Deitz", "Dewalt", "Ebner", "Frick", "Hancock", "Haworth", "Hesch", "Hoffman", "Kassing", "Knutson", "Lawless", "Lawicki", "Mccord", "Mccormack", "Miller", "Myers", "Nugent", "Ortiz", "Orwig", "Oryg", "Paiser", "Paki", "Pettigrew", "Quinn", "Quizoz", "Lee", "Resnick", "Smith", "Schickowski", "Schiebel", "Sellon", "Severson", "Shaffer", "Solberg", "Soloman", "Sonderling", "Soukup", "Soulis", "Stahl", "Sweeney", "Tandy", "Trebil", "Trusela", "Trussel", "Turco", "Uddin", "Uflan", "Ulrich", "Upson", "Vader", "Vail", "Valente", "Vanzandt", "Vanderpoel", "Ventotla", "Vogal", "Wagle", "Wagner", "Wakefield", "Weinstein", "Weiss", "Woow", "Yang", "Yates", "Yocum", "Zeaser", "Zeller", "Ziegler", "Bauer", "Baxster", "Casal", "Cataldi", "Caswell", "Celedon", "Chambers", "Chapman", "Christensen", "Darnell", "Davidson", "Davis", "Delorenzo", "Dinkins", "Doran", "Dugelman", "Dugan", "Duffman", "Eastman", "Ferro", "Ferry", "Fletcher", "Fietzer", "Hylan", "Hydinger", "Illingsworth", "Ingram", "Irwin", "Jagtap", "Jenson", "Johnson", "Johnsen", "Jones", "Jurgenson", "Kalleg", "Kaskel", "Keller", "Leisinger", "Lepage", "Lewis", "Linde", "Lulloff", "Maki", "Martin", "McGinnis", "Mills", "Moody", "Moore", "Napier", "Nelson", "Norquist", "Nuttle", "Olson", "Ostrander", "Reamer", "Reardon", "Reyes", "Rice", "Ripka", "Roberts", "Rogers", "Root", "Sandstrom", "Sawyer", "Schlicht", "Schmitt", "Schwager", "Schutz", "Schuster", "Tapia", "Thompson", "Tiernan", "Tisler"]
        return $lastNameArray[Math.floor(Math.random() * $lastNameArray.length)];

    }

    /*
    RULES FOR CREATING VALID PHONE NUNBER
        The phone number should consist of 10 digits
        The first 3 are the area code and should not begin with 0, 8 or 9
        The second 3 digits should not be greater than 742 and not less than 100.
        The last 4 digits can be any digits

        */
    getRandomPhoneNumber() {
        var $firstDigits = ["408", "650","510"];//, "530", "559", "562","661", "669", "707", "714"]
       // var $firstDigits = ["510"]

        var $first = $firstDigits[Math.floor(Math.random() * $firstDigits.length)];

        var $second = Math.floor(Math.random() * 742) + 100;
        var $third = this.getRandomString(4, true);
        var phoneNumber = $first + '-' + $second + '-' + $third
        // [$first, $second, $third];
        return phoneNumber

    }
    getRandomPhoneNumberNoDashes()
    {
        var $firstDigits = ["408", "650","510"];//, "530", "559", "562","661", "669", "707", "714"]
        //var $firstDigits = ["510"]

        var $first = $firstDigits[Math.floor(Math.random() * $firstDigits.length)];

        var $second = 367;//Math.floor(Math.random() * 742) + 100;
        var $third = this.getRandomString(4, true);
        var phoneNumber = $first + $second + $third;
        // [$first, $second, $third];
        return phoneNumber
    }

    getRandomSpecialString($stringLength) {

        var $string = "";
        var $possible = "~`@#$%^&*()_-+=|\}]{[':;?/>.<,";

        for (var $i = 0; $i < $stringLength; $i++)
            $string += $possible.charAt(Math.floor(Math.random() * $possible.length));

        return $string;
    }

    getRandomCity() {
        var $cityNames = ["Aberdeen", "Abilene", "Akron", "Albany", "Albuquerque", "Alexandria", "Allentown", "Amarillo", "Anaheim", "Anchorage", "Ann Arbor", "Antioch", "Apple Valley", "Appleton", "Arlington", "Arvada", "Asheville", "Athens", "Atlanta", "Atlantic City", "Augusta", "Aurora", "Austin", "Bakersfield", "Baltimore", "Barnstable", "Baton Rouge", "Beaumont", "Bel Air", "Bellevue", "Berkeley", "Bethlehem", "Billings", "Birmingham", "Bloomington", "Boise", "Boise City", "Bonita Springs", "Boston", "Boulder", "Bradenton", "Bremerton", "Bridgeport", "Brighton", "Brownsville", "Bryan", "Buffalo", "Burbank", "Burlington", "Cambridge", "Canton", "Cape Coral", "Carrollton", "Cary", "Cathedral City", "Cedar Rapids", "Champaign", "Chandler", "Charleston", "Charlotte", "Chattanooga", "Chesapeake", "Chicago", "Chula Vista", "Cincinnati", "Clarke County", "Clarksville", "Clearwater", "Cleveland", "College Station", "Colorado Springs", "Columbia", "Columbus", "Concord", "Coral Springs", "Corona", "Corpus Christi", "Costa Mesa", "Dallas", "Daly City", "Danbury", "Davenport", "Davidson County", "Dayton", "Daytona Beach", "Deltona", "Denton", "Denver", "Des Moines", "Detroit", "Downey", "Duluth", "Durham", "El Monte", "El Paso", "Elizabeth", "Elk Grove", "Elkhart", "Erie", "Escondido", "Eugene", "Evansville", "Fairfield", "Fargo", "Fayetteville", "Fitchburg", "Flint", "Fontana", "Fort Collins", "Fort Lauderdale", "Fort Smith", "Fort Walton Beach", "Fort Wayne", "Fort Worth", "Frederick", "Fremont", "Fresno", "Fullerton", "Gainesville", "Garden Grove", "Garland", "Gastonia", "Gilbert", "Glendale", "Grand Prairie", "Grand Rapids", "Grayslake", "Green Bay", "GreenBay", "Greensboro", "Greenville", "Gulfport-Biloxi", "Hagerstown", "Hampton", "Harlingen", "Harrisburg", "Hartford", "Havre de Grace", "Hayward", "Hemet", "Henderson", "Hesperia", "Hialeah", "Hickory", "High Point", "Hollywood", "Honolulu", "Houma", "Houston", "Howell", "Huntington", "Huntington Beach", "Huntsville", "Independence", "Indianapolis", "Inglewood", "Irvine", "Irving", "Jackson", "Jacksonville", "Jefferson", "Jersey City", "Johnson City", "Joliet", "Kailua", "Kalamazoo", "Kaneohe", "Kansas City", "Kennewick", "Kenosha", "Killeen", "Kissimmee", "Knoxville", "Lacey", "Lafayette", "Lake Charles", "Lakeland", "Lakewood", "Lancaster", "Lansing", "Laredo", "Las Cruces", "Las Vegas", "Layton", "Leominster", "Lewisville", "Lexington", "Lincoln", "Little Rock", "Long Beach", "Lorain", "Los Angeles", "Louisville", "Lowell", "Lubbock", "Macon", "Madison", "Manchester", "Marina", "Marysville", "McAllen", "McHenry", "Medford", "Melbourne", "Memphis", "Merced", "Mesa", "Mesquite", "Miami", "Milwaukee", "Minneapolis", "Miramar", "Mission Viejo", "Mobile", "Modesto", "Monroe", "Monterey", "Montgomery", "Moreno Valley", "Murfreesboro", "Murrieta", "Muskegon", "Myrtle Beach", "Naperville", "Naples", "Nashua", "Nashville", "New Bedford", "New Haven", "New London", "New Orleans", "New York", "New York City", "Newark", "Newburgh", "Newport News", "Norfolk", "Normal", "Norman", "North Charleston", "North Las Vegas", "North Port", "Norwalk", "Norwich", "Oakland", "Ocala", "Oceanside", "Odessa", "Ogden", "Oklahoma City", "Olathe", "Olympia", "Omaha", "Ontario", "Orange", "Orem", "Orlando", "Overland Park", "Oxnard", "Palm Bay", "Palm Springs", "Palmdale", "Panama City", "Pasadena", "Paterson", "Pembroke Pines", "Pensacola", "Peoria", "Philadelphia", "Phoenix", "Pittsburgh", "Plano", "Pomona", "Pompano Beach", "Port Arthur", "Port Orange", "Port Saint Lucie", "Port St. Lucie", "Portland", "Portsmouth", "Poughkeepsie", "Providence", "Provo", "Pueblo", "Punta Gorda", "Racine", "Raleigh", "Rancho Cucamonga", "Reading", "Redding", "Reno", "Richland", "Richmond", "Richmond County", "Riverside", "Roanoke", "Rochester", "Rockford", "Roseville", "Round Lake Beach", "Sacramento", "Saginaw", "Saint Louis", "Saint Paul", "Saint Petersburg", "Salem", "Salinas", "Salt Lake City", "San Antonio", "San Bernardino", "San Buenaventura", "San Diego", "San Francisco", "San Jose", "Santa Ana", "Santa Barbara", "Santa Clara", "Santa Clarita", "Santa Cruz", "Santa Maria", "Santa Rosa", "Sarasota", "Savannah", "Scottsdale", "Scranton", "Seaside", "Seattle", "Sebastian", "Shreveport", "Simi Valley", "Sioux City", "Sioux Falls", "South Bend", "South Lyon", "Spartanburg", "Spokane", "Springdale", "Springfield", "St. Louis", "St. Paul", "St. Petersburg", "Stamford", "Sterling Heights", "Stockton", "Sunnyvale", "Syracuse", "Tacoma", "Tallahassee", "Tampa", "Temecula", "Tempe", "Thornton", "Thousand Oaks", "Toledo", "Topeka", "Torrance", "Trenton", "Tucson", "Tulsa", "Tuscaloosa", "Tyler", "Utica", "Vallejo", "Vancouver", "Vero Beach", "Victorville", "Virginia Beach", "Visalia", "Waco", "Warren", "Washington", "Waterbury", "Waterloo", "West Covina", "West Valley City", "Westminster", "Wichita", "Wilmington", "Winston", "Winter Haven", "Worcester", "Yakima", "Yonkers", "York", "Youngstown"];
        return $cityNames[Math.round(Math.random() * ($cityNames.length - 1))];
    }

    getRandomState() {
        var $usStates = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
        return $usStates[Math.round(Math.random() * ($usStates.length - 1))];
    }


    /*
SSN RULES: Some special numbers are never allocated:
			Numbers with all zeros in any digit group (000-##-####, ###-00-####, ###-##-0000).
			Numbers with 666 or 900-999 (Individual Taxpayer Identification Number) in the first digit group.
*/
    getRandomSSN() {
        // Keep generating until a valid SSN is generated
        var $SSN;
        var $SSNFlag;
        // var dd = dataBase.isSSNAlreadyPresent("123-33-1234")

        do {
            $SSN = this.getRandomString(3, true) + "-" + this.getRandomString(2, true) + "-" + this.getRandomString(4, true);
            $SSNFlag = "";
            //var result =dataBase.isSSNAlreadyPresent($SSN);
            //console.log(">>>>>value =  "+result);
            // Conform to SSN requirements  
        }
        while (($SSN.charAt(0) === '0' && $SSN.charAt(1) === '0' && $SSN.charAt(2) === '0')
        || ($SSN.charAt(0) === '6' && $SSN.charAt(1) === '6' && $SSN.charAt(2) === '6')
        || $SSN.charAt(0) === '9'
        || ($SSN.charAt(4) === '0' && $SSN.charAt(5) === '0')
        || ($SSN.charAt(7) === '0' && $SSN.charAt(8) === '0' && $SSN.charAt(9) === '0' && $SSN.charAt(10) === '0'
            || $SSNFlag != ""));
        console.log(`****Random SSN created + ${$SSN}`);

        return $SSN;

    }

    //Alternative way to create an SSN
    // also returns 9 digit without "-"
    genRandomSSN() {
        // do {
        let ssn2 = this.getRandomInt(10, 99);
        let ssn4 = this.getRandomInt(1000, 9999);

        let ssn3Arr = [this.getRandomInt(100, 665), this.getRandomInt(667, 888)]
        let ssn3 = ssn3Arr[Math.floor(Math.random() * ssn3Arr.length)];

        let ssn = ssn3.toString() + ssn2.toString() + ssn4.toString();
        return ssn;
    }

    getRandomInt($min, $max) {
        let min = Math.ceil($min);
        let max = Math.floor($max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    getRandomBusinessName() {
        var $businessName = ['GI', 'Vimo', 'Kaiser', 'Aetna', 'UHC', 'Blue Shield', 'Cigna', 'Anthem', 'Wellcare', 'Blue Cross'];
        return $businessName[Math.round(Math.random() * ($businessName.length - 1))];
    }

    getRandomDateOfBirth() {
        let randYear = this.getRandomInt(1955, (new Date().getFullYear() - 30));
        let randDayOfMonth = this.getRandomInt(1, 28);
        let randMonthNumber = this.getRandomInt(1, 12);

        let randDay = randDayOfMonth;
        if (randDay < 10) {
            randDay = "0" + randDay;
        }
        ;
        let randMonth = randMonthNumber;
        if (randMonth < 10) {
            randMonth = "0" + randMonth;
        }
        ;

        let dob = randMonth+ "-"+ randDay + "-" +randYear;//randYear + "-" + randMonth + "-" + randDay;
        return dob;
    }

}

module.exports = new RandomDataGenerator();
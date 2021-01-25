
const RELATIONSHIP_NJ=Object.freeze({
	SPOUSE:"Spouse",
	CHILD:"Child (son or daughter)",
	PARENT:"Parent (Father or Mother)",
	SIBLING:"Sibling (Brother or Sister)",
	GRAND_CHILD:"Grandchild (Grandson or Granddaughter)",
	GRAND_PARENT:"Grandparent (Grandfather or Grandmother)",
	BROTHER_IN_LAW_OR_SISTER_IN_LAW:"Brother-in-law or Sister-in-law",
	COURT_APPOINTED_GUARDIAN:"Court Appointed or Live-In Guardian",
	DOMESTIC_PARTNER:"Domestic Partner",
	FIRST_COUSIN:"First Cousin",
	FORMER_SPOUSE:"Former Spouse",
	MOTHER_IN_LAW_OR_FATHER_IN_LAW:"Mother-in-law or Father-in-law",
	NEPHEW_OR_NIECE:"Nephew or Niece",
	SON_IN_LAW_OR_DAUGHTER_IN_LAW:"Son-in-law or Daughter-in-law",
	STEP_CHILD:"Stepchild (Stepson or Stepdaughter)",
	STEP_PARENT:"Stepparent (Stepfather or Stepmother)",
	UNCLE_AUNT:"Uncle or Aunt",
	WARD:"Ward",
	UNRELATED:"Unrelated",
	OTHER_RELATIVE:"Other Relative",
	CHILD_OF_DOMESTIC_PARTNER:"Child of Domestic Partner",
	PARENTS_DOMESTIC_PARTNER:"Parent's Domestic Partner"
	
	})


	const RELATIONSHIP_NV=Object.freeze({
		SPOUSE:"Spouse",
		CHILD:"Child (son or daughter)",
		PARENT:"Parent (father or mother)", //NV
		SIBLING:"Sibling (Brother or Sister)",
		GRAND_CHILD:"Grandchild (Grandson or Granddaughter)",
		GRAND_PARENT:"Grandparent (grandfather or grandmother)", //NV
		BROTHER_IN_LAW_OR_SISTER_IN_LAW:"Brother-in-law or Sister-in-law",
		COURT_APPOINTED_GUARDIAN:"Court Appointed or Live-In Guardian",
		DOMESTIC_PARTNER:"Domestic Partner",
		FIRST_COUSIN:"First Cousin",
		FORMER_SPOUSE:"Former Spouse",
		MOTHER_IN_LAW_OR_FATHER_IN_LAW:"Mother-in-law or Father-in-law",
		NEPHEW_OR_NIECE:"Nephew or Niece",
		SON_IN_LAW_OR_DAUGHTER_IN_LAW:"Son-in-law or Daughter-in-law",
		STEP_CHILD:"Stepchild (Stepson or Stepdaughter)",
		STEP_PARENT:"Stepparent (Stepfather or Stepmother)",
		UNCLE_AUNT:"Uncle or Aunt",
		WARD:"Ward",
		UNRELATED:"Unrelated",
		OTHER_RELATIVE:"Other Relative",
		CHILD_OF_DOMESTIC_PARTNER:"Child of Domestic Partner",
		PARENTS_DOMESTIC_PARTNER:"Parent's Domestic Partner"
		})
	
	const APPLICATION_STATUS=Object.freeze({
		CREATED:"OP",
		SUBMITTED:"ER",
		ENROLLED:"EN",
		PENDING:"PN",
		CLOSED:"CL",
		CANCELLED:"CC"
	});

const INTERVAL = 1000;
const WAIT = 15000;
const WAIT_FOR_DISPLAYED_5000 = 5000;
const WAIT_FOR_DISPLAYED_8000 = 8000;
const WAIT_FOR_DISPLAYED_10000 = 10000;
const WAIT_UNTIL_5000 = 5000;
const WAIT_UNTIL_10000 = 10000;
const WAIT_UNTIL_240000 = 240000;
const WAIT_UNTIL_320000= 320000;
const WAIT_UNTIL_40000 = 40000;
const PAUSE_BROWSER_3000 = 3000;
const PAUSE_BROWSER_1000 = 1000;
const PAUSE_BROWSER_500 = 500;
const PAUSE_BROWSER_2000 = 2000;

const STATE_NJ = "NJ";
const STATE_NV = "NV";
const STATE_PA = "PA";
const STATE_MN = "MN";
const STATE_ID = "ID";
const STATE_CA = "CA";
const NOT_A_MARKET_PLACE_PLAN = "NOT A MARKETPLACE PLAN";
const HEALTHPLAN = "healthPlan";
const DENTALPLAN = "dentalPlan";
const PAUSE_BROWSER_4000 = 4000;
const PAUSE_BROWSER_5000 = 5000;
const PAUSE_BROWSER_6000 = 6000;

const MINIMUM_COVERAGE="MINIMUM COVERAGE";
const CATASTROPHIC="CATASTROPHIC";
const PLANTIER_CATASTROPHIC="CATAST";
const PLANTIER_MINIMUM_COVERAGE="MINIMU";
const HSA="HSA";
const YES="Yes";
const NO="No";
const COMMONPASSWORD="ghix123#";



class Constants {

	get RELATIONSHIP_NJ() {
		return RELATIONSHIP_NJ;
	}
	get RELATIONSHIP_NV() {
		return RELATIONSHIP_NV;
	}
	get APPLICATION_STATUS() {
		return APPLICATION_STATUS;
	}

	get INTERVAL() {
		return INTERVAL;
	}
	get WAIT() {
		return WAIT;
	}
	get WAIT_FOR_DISPLAYED_5000() {
		return WAIT_FOR_DISPLAYED_5000;
	}
	get WAIT_FOR_DISPLAYED_8000() {
		return WAIT_FOR_DISPLAYED_8000;
	}
	get WAIT_FOR_DISPLAYED_10000() {
		return WAIT_FOR_DISPLAYED_10000;
	}
	get WAIT_UNTIL_5000() {
		return WAIT_UNTIL_5000;
	}
	get WAIT_UNTIL_10000() {
		return WAIT_UNTIL_10000;
	}
	get WAIT_UNTIL_40000() {
		return WAIT_UNTIL_40000;
	}
	get WAIT_UNTIL_240000() {
		return WAIT_UNTIL_240000;
	}
	get WAIT_UNTIL_320000() {
		return WAIT_UNTIL_320000;
	}
	get PAUSE_BROWSER_3000() {
		return PAUSE_BROWSER_3000;
	}
	get PAUSE_BROWSER_1000() {
		return PAUSE_BROWSER_1000;
	}
	get STATE_NJ() { return STATE_NJ; }
	get STATE_NV() { return STATE_NV; }
	get STATE_PA() { return STATE_PA; }
	get STATE_MN() { return STATE_MN; }
	get STATE_ID() { return STATE_ID; }
	get STATE_CA() { return STATE_CA; }
	get NOT_A_MARKET_PLACE_PLAN() { return NOT_A_MARKET_PLACE_PLAN; }
	get HEALTHPLAN() { return HEALTHPLAN; }
	get DENTALPLAN() { return DENTALPLAN; }
	get PAUSE_BROWSER_4000() { return PAUSE_BROWSER_4000; }
	get PAUSE_BROWSER_5000() { return PAUSE_BROWSER_5000; }
	get PAUSE_BROWSER_6000() { return PAUSE_BROWSER_6000; }
	get MINIMUM_COVERAGE() { return MINIMUM_COVERAGE; }
	get CATASTROPHIC() { return CATASTROPHIC; }
	get PLANTIER_CATASTROPHIC() { return PLANTIER_CATASTROPHIC; }
	get PLANTIER_MINIMUM_COVERAGE() { return PLANTIER_MINIMUM_COVERAGE; }
	get HSA() { return HSA; }
	get YES() { return YES; }
	get NO() { return NO; }
	get PAUSE_BROWSER_500() { return PAUSE_BROWSER_500; }
	get PAUSE_BROWSER_2000() { return PAUSE_BROWSER_2000; }
	get COMMON_PASSWORD() {return COMMONPASSWORD;}
}
module.exports = new Constants();

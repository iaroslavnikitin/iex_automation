const AGENT_CERTIFICATION_STATUS=Object.freeze({
	pending : "Pending",
	withdrawn : "Withdrawn",
	certified : "Certified",
	eligible : "Eligible",
	denied : "Denied",
	terminatedVested : "Terminated-Vested",
	terminatedForCause : "Terminated-For-Cause",
	deceased : "Deceased",
	suspended : "Suspended"

	});

	const AGENCY_CERTIFICATION_STATUS=Object.freeze({
		pending : "Pending",
		suspended : "Suspended",
		certified : "Certified",
		terminated : "Terminated",
	
		});
const ADMIN_STAFF_APPROVAL_STATUS=Object.freeze(
	{
		pending:"Pending",
		approved:"Approved",
		eligible:"Eligible",
		denied: "Denied",
		terminated: "Terminated",
		terminatedForCause:"Terminated-For-Cause"
	}
);

const AGENCY_URLS=Object.freeze({
	brokerSearchURL: "/hix/broker/search?anonymousFlag=Y?lang=es"
});

class ConstantsAgentAgency
{
	get AGENCY_CERTIFICATION_STATUS()
	{
		return AGENCY_CERTIFICATION_STATUS;
	}

	get AGENT_CERTIFICATION_STATUS()
	{
		return AGENT_CERTIFICATION_STATUS;
	}
	get ADMIN_STAFF_APPROVAL_STATUS()
	{
		return ADMIN_STAFF_APPROVAL_STATUS;
	}


	get AGENCY_URLS()
	{
		return AGENCY_URLS;
	}

	getUserRoleFromString(role) {
		let userRole = "";
		switch (role) {
			case 'Admin Staff': {
				userRole = "adminStaffs";
				break;
			}
			case 'Agent': {
				userRole = "agents";
				break;
			}
			case 'Agency Manager': {
				userRole = "agencyManagers";
				break;
			}

		}
		return userRole;
	}

}
module.exports = new ConstantsAgentAgency();




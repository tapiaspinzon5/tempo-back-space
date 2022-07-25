///////ACTIONS
export const TYPES = {
	GET_DATA_CAMPAIGN: "GET_DATA_CAMPAIGN",
	SELECT_CAMPAIGN: "SELECT_MISSIONS",
	SELECT_AGENTS: "SELECT_AGENTS",
	SELECT_LOBS: "SELECT_LOBS",
	SELECT_TEAMS: "SELECT_TEAMS",
	SELECT_TIME: "SELECT_TIME",
	GET_DATA_AGENTS: "GET_DATA_AGENTS",
	GET_DATA_LOBS: "GET_DATA_LOBS",
	GET_DATA_TEAMS: "GET_DATA_TEAMS",
	SEARCH_MISSION: "SEARCH_MISSION",
	SEARCH_ASSIGN: "SEARCH_ASSIGN",
};

export const organigramaInitialState = {
	campaign: [],
	users: [],
	lobs: [],
	teams: [],
	dbMissions: [],
	dbUsers: [],
	dbLobs: [],
	dbTeams: [],
	dataToSend: {},
	searchM: "",
	searchA: "",
	missionsCheck: [],
	AssignsCheck: [],
};

//////REDUCER

export function organigramaReducer(state, action) {
	switch (action.type) {
		case TYPES.GET_DATA_CAMPAIGN:
			break;

		default:
			return state;
	}
}

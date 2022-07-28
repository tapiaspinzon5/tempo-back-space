///////ACTIONS
export const TYPES = {
	GET_DATA_CAMPAIGN: "GET_DATA_CAMPAIGN",
	SELECT_CAMPAIGN: "SELECT_CAMPAIGN",
	SHOW_DATA_CAMPAIGN: "SHOW_DATA_CAMPAIGN",
	SHOW_DATA_LOB: "SHOW_DATA_LOB",
	SHOW_DATA_TEAM: "SHOW_DATA_TEAM",
};

export const organigramaInitialState = {
	campaign: null,
	dataCampaign: [],
	agents: [],
	lobs: [],
	teams: [],
	kpis: [],
	QA: [],
	OM: [],
	RL: [],
};

//////REDUCER

export function organigramaReducer(state, action) {
	switch (action.type) {
		case TYPES.GET_DATA_CAMPAIGN:
			return {
				...state,
				dataCampaign: action.payload.dataCampaign.map((data) => {
					return data;
				}),
			};
		case TYPES.SELECT_CAMPAIGN:
			return {
				...state,
				campaign: action.payload.campaign,
				QA: [],
				RL: [],
				OM: [],
				lobs: [],
				kpis: [],
				teams: [],
				agents: [],
			};
		case TYPES.SHOW_DATA_CAMPAIGN:
			return {
				...state,
				QA: action.payload.admins.filter(
					(data) => data.RoleAgent === "QA Lead"
				),
				RL: action.payload.admins.filter(
					(data) => data.RoleAgent === "Reporting Lead"
				),
				OM: action.payload.admins.filter(
					(data) => data.RoleAgent === "Operation Manager"
				),
				lobs: action.payload.lobs,
				kpis: action.payload.kpis,
			};
		case TYPES.SHOW_DATA_LOB:
			return { ...state, teams: action.payload.teams, agents: [] };
		case TYPES.SHOW_DATA_TEAM:
			return { ...state, agents: action.payload.agents };
		default:
			return state;
	}
}

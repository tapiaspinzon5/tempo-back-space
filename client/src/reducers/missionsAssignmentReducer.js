///////ACTIONS
export const TYPES = {
	SELECT_MISSIONS: "SELECT_MISSIONS",
	SELECT_AGENTS: "SELECT_AGENTS",
	SELECT_LOBS: "SELECT_LOBS",
	SELECT_TEAMS: "SELECT_TEAMS",
	SELECT_TIME: "SELECT_TIME",
	GET_DATA: "GET_DATA",
	ORIGINAL_DB_DATA: "ORIGINAL_DB_DATA",
};

export const missionsAssignmentInitialState = {
	missions: [],
	users: [],
	lobs: [],
	teams: [],
	dbMissions: [],
	dbUsers: [],
	dbLobs: [],
	dbTeams: [],
	dataToSend: {},
};

//////REDUCER

export function missionsAssignmentReducer(state, action) {
	switch (action.type) {
		case TYPES.GET_DATA: {
			return {
				...state,
				missions: action.payload.missions.map((data) => {
					data.time = "";
					return data;
				}),
				users: action.payload.groups[0].Users.map((data) => data),
				lobs: action.payload.groups[0].Lobs.map((data) => data),
				teams: action.payload.groups[0].Teams.map((data) => data),
				dbMissions: action.payload.missions.map((data) => {
					data.time = "";
					return data;
				}),
				dbUsers: action.payload.groups[0].Users.map((data) => data),
				dbLobs: action.payload.groups[0].Lobs.map((data) => data),
				dbTeams: action.payload.groups[0].Teams.map((data) => data),
			};
		}
		case TYPES.SELECT_MISSIONS: {
			if (action.payload.name === "selecct-all") {
				let tempMission = state.missions.map((mission) => {
					return { ...mission, isChecked: action.payload.checked, time: "" };
				});
				return { ...state, missions: tempMission };
			} else {
				let tempMission = state.missions.map((mission) =>
					mission.missionName === action.payload.name
						? { ...mission, isChecked: action.payload.checked, time: "" }
						: mission
				);
				return { ...state, missions: tempMission };
			}
		}
		case TYPES.SELECT_TIME: {
			let tempMission = state.missions.map((mission) =>
				mission.missionName === action.payload.name &&
				mission.isChecked === true
					? { ...mission, time: action.payload.time }
					: mission
			);
			return { ...state, missions: tempMission };
		}
		case TYPES.SELECT_AGENTS: {
			if (action.payload.name === "selecct-all") {
				let tempUser = state.users.map((user) => {
					return { ...user, isChecked: action.payload.checked };
				});
				return { ...state, users: tempUser };
			} else {
				let tempUser = state.users.map((user) =>
					user.Agent === action.payload.name
						? { ...user, isChecked: action.payload.checked }
						: user
				);
				return { ...state, users: tempUser };
			}
		}
		case TYPES.SELECT_LOBS: {
			if (action.payload.name === "selecct-all") {
				let tempLob = state.lobs.map((lob) => {
					return { ...lob, isChecked: action.payload.checked };
				});
				return { ...state, lobs: tempLob };
			} else {
				let tempLob = state.lobs.map((lob) =>
					lob.lobName === action.payload.name
						? { ...lob, isChecked: action.payload.checked }
						: lob
				);
				return { ...state, lobs: tempLob };
			}
		}
		case TYPES.SELECT_TEAMS: {
			if (action.payload.name === "selecct-all") {
				let tempTeam = state.teams.map((team) => {
					return { ...team, isChecked: action.payload.checked };
				});
				return { ...state, teams: tempTeam };
			} else {
				let tempTeam = state.teams.map((team) =>
					team.teamName === action.payload.name
						? { ...team, isChecked: action.payload.checked }
						: team
				);
				return { ...state, teams: tempTeam };
			}
		}
		case TYPES.ORIGINAL_DB_DATA: {
			return {
				...state,
				users: state.dbUsers,
				lobs: state.dbLobs,
				teams: state.dbTeams,
			};
		}
		default:
			return state;
	}
}

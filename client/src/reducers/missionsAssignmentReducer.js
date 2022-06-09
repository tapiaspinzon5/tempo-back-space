///////ACTIONS
export const TYPES = {
	SELECT_MISSIONS: "SELECT_MISSIONS",
	SELECT_AGENTS: "SELECT_AGENTS",
	SELECT_LOBS: "SELECT_LOBS",
	SELECT_TEAMS: "SELECT_TEAMS",
	SELECT_TIME: "SELECT_TIME",
	GET_DATA_MISSIONS: "TYPES.GET_DATA_MISSIONS",
	GET_DATA_AGENTS: "GET_DATA_AGENTS",
	GET_DATA_LOBS: "GET_DATA_LOBS",
	GET_DATA_TEAMS: "GET_DATA_TEAMS",
	SEARCH_MISSION: "SEARCH_MISSION",
	SEARCH_ASSIGN: "SEARCH_ASSIGN",
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
	searchM: "",
	searchA: "",
	missionsCheck: [],
	AssignsCheck: [],
};

//////REDUCER

export function missionsAssignmentReducer(state, action) {
	switch (action.type) {
		case TYPES.GET_DATA_MISSIONS: {
			return {
				...state,
				missions: action.payload.missions.map((data) => {
					data.start = null;
					data.end = null;
					return data;
				}),
				dbMissions: action.payload.missions.map((data) => {
					data.start = null;
					data.end = null;
					return data;
				}),
			};
		}
		case TYPES.GET_DATA_AGENTS: {
			return {
				...state,
				users: action.payload.agents.map((data) => data),
				dbUsers: action.payload.agents.map((data) => data),
				searchA: "",
			};
		}
		case TYPES.GET_DATA_LOBS: {
			return {
				...state,
				lobs: action.payload.lobs.map((data) => data),
				dbLobs: action.payload.lobs.map((data) => data),
				searchA: "",
			};
		}
		case TYPES.GET_DATA_TEAMS: {
			return {
				...state,
				teams: action.payload.teams.map((data) => data),
				dbTeams: action.payload.teams.map((data) => data),
				searchA: "",
			};
		}
		case TYPES.SELECT_MISSIONS: {
			if (action.payload.name === "selecct-all") {
				if (state.searchM) {
					let tempMission = state.missions.map((mission) => {
						return {
							...mission,
							isChecked: action.payload.checked,
							start: null,
							end: null,
						};
					});
					let tempDBMissions = state.dbMissions.map((mission) =>
						mission.Name === action.payload.name
							? {
									...mission,
									isChecked: action.payload.checked,
									start: null,
									end: null,
							  }
							: mission
					);
					return {
						...state,
						missions: tempMission,
						dbMissions: tempDBMissions,
					};
				} else {
					let tempMission = state.missions.map((mission) => {
						return {
							...mission,
							isChecked: action.payload.checked,
							start: "",
							end: "",
						};
					});
					let tempDBMissions = state.dbMissions.map((mission) => {
						return {
							...mission,
							isChecked: action.payload.checked,
							start: null,
							end: null,
						};
					});
					return {
						...state,
						missions: tempMission,
						dbMissions: tempDBMissions,
					};
				}
			} else {
				let tempMission = state.missions.map((mission) =>
					mission.Name === action.payload.name
						? {
								...mission,
								isChecked: action.payload.checked,
								start: null,
								end: null,
						  }
						: mission
				);
				let tempDBMissions = state.dbMissions.map((mission) =>
					mission.Name === action.payload.name
						? {
								...mission,
								isChecked: action.payload.checked,
								start: null,
								end: null,
						  }
						: mission
				);
				return { ...state, missions: tempMission, dbMissions: tempDBMissions };
			}
		}
		case TYPES.SELECT_TIME: {
			if (action.payload.time === "start") {
				let tempMission = state.missions.map((mission) =>
					mission.Name === action.payload.name && mission.isChecked === true
						? { ...mission, start: action.payload.value, end: null }
						: mission
				);
				let tempDBMissions = state.dbMissions.map((mission) =>
					mission.Name === action.payload.name && mission.isChecked === true
						? { ...mission, start: action.payload.value, end: null }
						: mission
				);
				return { ...state, missions: tempMission, dbMissions: tempDBMissions };
			} else {
				let tempMission = state.missions.map((mission) =>
					mission.Name === action.payload.name && mission.isChecked === true
						? { ...mission, end: action.payload.value }
						: mission
				);
				let tempDBMissions = state.dbMissions.map((mission) =>
					mission.Name === action.payload.name && mission.isChecked === true
						? { ...mission, end: action.payload.value }
						: mission
				);
				return { ...state, missions: tempMission, dbMissions: tempDBMissions };
			}
		}
		case TYPES.SELECT_AGENTS: {
			if (action.payload.name === "selecct-all") {
				if (state.searchA) {
					let tempUser = state.users.map((user) => {
						return { ...user, isChecked: action.payload.checked };
					});
					let tempDBUser = state.dbUsers.map((user) =>
						user.Agent === action.payload.name
							? { ...user, isChecked: action.payload.checked }
							: user
					);
					return { ...state, users: tempUser, dbUsers: tempDBUser };
				} else {
					let tempUser = state.users.map((user) => {
						return { ...user, isChecked: action.payload.checked };
					});
					let tempDBUser = state.dbUsers.map((user) => {
						return { ...user, isChecked: action.payload.checked };
					});
					return { ...state, users: tempUser, dbUsers: tempDBUser };
				}
			} else {
				let tempUser = state.users.map((user) =>
					user.Agent === action.payload.name
						? { ...user, isChecked: action.payload.checked }
						: user
				);
				let tempDBUser = state.dbUsers.map((user) =>
					user.Agent === action.payload.name
						? { ...user, isChecked: action.payload.checked }
						: user
				);
				return { ...state, users: tempUser, dbUsers: tempDBUser };
			}
		}
		case TYPES.SELECT_LOBS: {
			if (action.payload.name === "selecct-all") {
				if (state.searchA) {
					let tempLob = state.lobs.map((lob) => {
						return { ...lob, isChecked: action.payload.checked };
					});
					let tempDBLob = state.dbLobs.map((lob) =>
						lob.NameLob === action.payload.name
							? { ...lob, isChecked: action.payload.checked }
							: lob
					);
					return { ...state, lobs: tempLob, dbLobs: tempDBLob };
				} else {
					let tempLob = state.lobs.map((lob) => {
						return { ...lob, isChecked: action.payload.checked };
					});
					let tempDBLob = state.dbLobs.map((lob) => {
						return { ...lob, isChecked: action.payload.checked };
					});
					return { ...state, lobs: tempLob, dbLobs: tempDBLob };
				}
			} else {
				let tempLob = state.lobs.map((lob) =>
					lob.NameLob === action.payload.name
						? { ...lob, isChecked: action.payload.checked }
						: lob
				);
				let tempDBLob = state.dbLobs.map((lob) =>
					lob.NameLob === action.payload.name
						? { ...lob, isChecked: action.payload.checked }
						: lob
				);
				return { ...state, lobs: tempLob, dbLobs: tempDBLob };
			}
		}
		case TYPES.SELECT_TEAMS: {
			if (action.payload.name === "selecct-all") {
				if (state.searchA) {
					let tempTeam = state.teams.map((team) => {
						return { ...team, isChecked: action.payload.checked };
					});
					let tempDBTeam = state.dbTeams.map((team) =>
						team.Team === action.payload.name
							? { ...team, isChecked: action.payload.checked }
							: team
					);
					return { ...state, teams: tempTeam, dbTeams: tempDBTeam };
				} else {
					let tempTeam = state.teams.map((team) => {
						return { ...team, isChecked: action.payload.checked };
					});
					let tempDBTeam = state.dbTeams.map((team) => {
						return { ...team, isChecked: action.payload.checked };
					});
					return { ...state, teams: tempTeam, dbTeams: tempDBTeam };
				}
			} else {
				let tempTeam = state.teams.map((team) =>
					team.Team === action.payload.name
						? { ...team, isChecked: action.payload.checked }
						: team
				);
				let tempDBTeam = state.dbTeams.map((team) =>
					team.Team === action.payload.name
						? { ...team, isChecked: action.payload.checked }
						: team
				);
				return { ...state, teams: tempTeam, dbTeams: tempDBTeam };
			}
		}
		case TYPES.SEARCH_MISSION: {
			if (action.payload === "") {
				return {
					...state,
					searchM: action.payload,
					missions: state.dbMissions,
				};
			} else {
				let tempMiss = state.dbMissions.filter((miss) =>
					miss.Name.toLowerCase().includes(action.payload)
				);
				return { ...state, searchM: action.payload, missions: tempMiss };
			}
		}
		case TYPES.SEARCH_ASSIGN: {
			if (action.payload.select === "agents") {
				if (action.payload.word === "") {
					return {
						...state,
						searchA: action.payload.word,
						users: state.dbUsers,
					};
				} else {
					let tempUsers = state.dbUsers.filter((user) =>
						user.Agent.toLowerCase().includes(action.payload.word)
					);
					return { ...state, searchA: action.payload.word, users: tempUsers };
				}
			} else if (action.payload.select === "lobs") {
				if (action.payload.word === "") {
					return { ...state, searchA: action.payload.word, lobs: state.dbLobs };
				} else {
					let tempLobs = state.dbLobs.filter((lob) =>
						lob.NameLob.toLowerCase().includes(action.payload.word)
					);
					return { ...state, searchA: action.payload.word, lobs: tempLobs };
				}
			} else {
				if (action.payload.word === "") {
					return {
						...state,
						searchA: action.payload.word,
						teams: state.dbTeams,
					};
				} else {
					let tempTeams = state.dbTeams.filter((team) =>
						team.Team.toLowerCase().includes(action.payload.word)
					);
					return { ...state, searchA: action.payload.word, teams: tempTeams };
				}
			}
		}
		default:
			return state;
	}
}

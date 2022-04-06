import { axiosInstance } from "../api/interceptor";

/* SUPER ADMIN */

//Peticion carga de achivos creacion de equipos SuperUser
const createTeamSuperUser = (dataCSV) => {
	try {
		return axiosInstance
			.post(`uploadSU`, {
				data: dataCSV,
			})
			.catch(function (error) {
				if (error.response) {
					return error.response;
				}
			});
	} catch (error) {
		return Promise.resolve({ data: null, error: error });
	}
};

const downloadCounts = () => {
	try {
		return axiosInstance.post(`getteamsbysu`).catch(function (error) {
			if (error.response) {
				return error.response;
			}
		});
	} catch (error) {
		return Promise.resolve({ data: null, error: error });
	}
};

/* OPERATION MANAGER */

const createTeamOperationManager = (dataCSV) => {
	try {
		return axiosInstance
			.post(`uploadopsm`, {
				data: dataCSV,
			})
			.catch(function (error) {
				if (error.response) {
					return error.response;
				}
			});
	} catch (error) {
		return Promise.resolve({ data: null, error: error });
	}
};

/* REPORTING LEAD */

const createTeamReportingLead = (dataCSV) => {
	try {
		return axiosInstance
			.post(`uploadrepl`, {
				data: dataCSV,
			})
			.catch(function (error) {
				if (error.response) {
					return error.response;
				}
			});
	} catch (error) {
		return Promise.resolve({ data: null, error: error });
	}
};
const downloadReportExp = () => {
	try {
		return axiosInstance.post(`getanalyticsexprl`).catch(function (error) {
			if (error.response) {
				return error.response;
			}
		});
	} catch (error) {
		return Promise.resolve({ data: null, error: error });
	}
};
const downloadReportKpi = () => {
	try {
		return axiosInstance.post(`getanalyticskpirl`).catch(function (error) {
			if (error.response) {
				return error.response;
			}
		});
	} catch (error) {
		return Promise.resolve({ data: null, error: error });
	}
};
//Peticion carga de achivos carag KPI
const uploadKPIs = (dataCSV) => {
	console.log(dataCSV);
	return { status: 200 };
	/* try {
		return axiosInstance
			.post(`uploadkpirl`, {
				data: dataCSV,
			})
			.catch(function (error) {
				if (error.response) {
					return error.response;
				}
			});
	} catch (error) {
		return Promise.resolve({ data: null, error: error });
	} */
};
//Peticion carga de achivos carag KPI
const getKPIsCampaign = () => {
	try {
		return axiosInstance.post(`getkpiscampaign`).catch(function (error) {
			if (error.response) {
				return error.response;
			}
		});
	} catch (error) {
		return Promise.resolve({ data: null, error: error });
	}
};

/* QA LEAD */

const loadQuizes = () => {
	try {
		return axiosInstance.post(`getquizqa`).catch(function (error) {
			if (error.response) {
				return error.response;
			}
		});
	} catch (error) {
		return Promise.resolve({ data: null, error: error });
	}
};

const uploadQuizes = (data) => {
	try {
		return axiosInstance.post(`uploadquiz`, data).catch(function (error) {
			if (error.response) {
				return error.response;
			}
		});
	} catch (error) {
		return Promise.resolve({ data: null, error: error });
	}
};

/* TEAM LEADER */
// trae info Home team leader
const downloadHomeDataTl = () => {
	try {
		return axiosInstance.post(`getdashboardtl`).catch(function (error) {
			if (error.response) {
				return error.response;
			}
		});
	} catch (error) {
		return Promise.resolve({ data: null, error: error });
	}
};

//Trae el equipo de un TEam Leader para asignarle actividades

const downloadUsers = () => {
	try {
		return axiosInstance
			.post(`getagentschallengeassignmenttl`)
			.catch(function (error) {
				if (error.response) {
					return error.response;
				}
			});
	} catch (error) {
		return Promise.resolve({ data: null, error: error });
	}
};

//funcion para Traer los KPI del Team Leader
const getKPIteamTL = () => {
	try {
		return axiosInstance.post(`getkpiteamtl`).catch(function (error) {
			if (error.response) {
				return error.response;
			}
		});
	} catch (error) {
		return Promise.resolve({ data: null, error: error });
	}
};
//funcion para Traer los KPI con sus usuarios  del Team Leader
const getUsersKPI = (idKPI, time, agentIdccms, context) => {
	try {
		return axiosInstance
			.post(`getagentsbykpitl`, {
				idKpi: idKPI,
				time: time,
				agentIdccms: agentIdccms,
				context: context,
			})
			.catch(function (error) {
				if (error.response) {
					return error.response;
				}
			});
	} catch (error) {
		return Promise.resolve({ data: null, error: error });
	}
};

/* AGENT */
//trae la data del Home no se esta usando
const downloadHomeData = () => {
	try {
		return axiosInstance.post(`gethomedata`).catch(function (error) {
			if (error.response) {
				return error.response;
			}
		});
	} catch (error) {
		return Promise.resolve({ data: null, error: error });
	}
};
//Trae data profile agente
const downloadProfile = () => {
	try {
		return axiosInstance.post(`getagentprofiledata`).catch(function (error) {
			if (error.response) {
				return error.response;
			}
		});
	} catch (error) {
		return Promise.resolve({ data: null, error: error });
	}
};

//Trae los quices del agente no se usa
const loadQuizesUser = () => {
	try {
		return axiosInstance
			.post(`getquizbyagent`, {
				context: 2,
			})
			.catch(function (error) {
				if (error.response) {
					return error.response;
				}
			});
	} catch (error) {
		return Promise.resolve({ data: null, error: error });
	}
};

//Trae el Quiz para realizarlo

const getExam = (idquiz) => {
	try {
		return axiosInstance
			.post(`getQuizDetail`, {
				idQuiz: idquiz,
			})
			.catch(function (error) {
				if (error.response) {
					return error.response;
				}
			});
	} catch (error) {
		return Promise.resolve({ data: null, error: error });
	}
};

//Sube las  Respuestas del Quiz
const uploadAnswers = (data, idExam) => {
	try {
		return axiosInstance
			.post(`getresultquiz?idExam=${idExam}`, {
				data: data,
			})
			.catch(function (error) {
				if (error.response) {
					return error.response;
				}
			});
	} catch (error) {
		return Promise.resolve({ data: null, error: error });
	}
};

///Envia token Navegador del agente a la base
const tokenNotification = (data) => {
	try {
		return axiosInstance
			.post(`postfcmtoken`, {
				fcmNotification: data,
			})
			.catch(function (error) {
				if (error.response) {
					return error.response;
				}
			});
	} catch (error) {
		return Promise.resolve({ data: null, error: error });
	}
};

//Trae las Notificaciones que tiene el Agente
const downloadNotifications = () => {
	try {
		return axiosInstance
			.post(`getmynotifications`, {
				min: 1,
				max: 11,
				context: 3,
			})
			.catch(function (error) {
				if (error.response) {
					return error.response;
				}
			});
	} catch (error) {
		return Promise.resolve({ data: null, error: error });
	}
};

//Trae Todas  las Notificaciones del Agente y el Team
const getNotifications = (min, max, context) => {
	try {
		return axiosInstance
			.post(`getmynotifications`, {
				min: min,
				max: max,
				context: context,
			})
			.catch(function (error) {
				if (error.response) {
					return error.response;
				}
			});
	} catch (error) {
		return Promise.resolve({ data: null, error: error });
	}
};

///updatestatusnotification
const updateStatusNotifications = (id) => {
	try {
		return axiosInstance
			.post(`updatestatusnotification`, {
				idNotificationMin: id,
				idNotificationMax: id,
			})
			.catch(function (error) {
				if (error.response) {
					return error.response;
				}
			});
	} catch (error) {
		return Promise.resolve({ data: null, error: error });
	}
};

//funcion para traer las actividades del usuario
const loadUserActivities = (context) => {
	try {
		return axiosInstance
			.post(`getactivitiesviewagent`, {
				context: context,
			})
			.catch(function (error) {
				if (error.response) {
					return error.response;
				}
			});
	} catch (error) {
		return Promise.resolve({ data: null, error: error });
	}
};

//funcion para deactividad individual
const userActivityDesc = (idActivity, context) => {
	try {
		return axiosInstance
			.post(`getactivitiesdescriptionagent`, {
				idActivity: idActivity,
				context: context,
			})
			.catch(function (error) {
				if (error.response) {
					return error.response;
				}
			});
	} catch (error) {
		return Promise.resolve({ data: null, error: error });
	}
};

//Trae data Analytics Agente no se esta usando
const getDataAnalytics = (kpi) => {
	try {
		return axiosInstance
			.post(`getkpiandanlyticsagent`, {
				kpi: kpi,
			})
			.catch(function (error) {
				if (error.response) {
					return error.response;
				}
			});
	} catch (error) {
		return Promise.resolve({ data: null, error: error });
	}
};

/* TRANSVERSALES */

//Traer los Challenges para asignar Tanto TL como AG
const downloadActivities = (ccmsAgent) => {
	try {
		return axiosInstance
			.post(`getchanllenges`, {
				context: 2,
				idccmsAssigned: ccmsAgent,
			})
			.catch(function (error) {
				if (error.response) {
					return error.response;
				}
			});
	} catch (error) {
		return Promise.resolve({ data: null, error: error });
	}
};
//Traer los kpi para el HOme Tanto TL como AG
const getKpisHome = (context) => {
	try {
		return axiosInstance
			.post(`getkpiagentkpiteam`, {
				context: context,
			})
			.catch(function (error) {
				if (error.response) {
					return error.response;
				}
			});
	} catch (error) {
		return Promise.resolve({ data: null, error: error });
	}
};

//Envia TPVs
const assingTpvs = (data) => {
	try {
		return axiosInstance
			.post(`postassigntpv`, {
				userName: data.userName,
				nameTPV: data.nameTPV,
				idTpv: data.idTpv,
				idccmsAssigned: data.idccmsAssigned,
				fcmTokens: data.fcmTokens,
			})
			.catch(function (error) {
				if (error.response) {
					return error.response;
				}
			});
	} catch (error) {
		return Promise.resolve({ data: null, error: error });
	}
};

//Asignación de actividades

const assingChallenges = (data) => {
	try {
		return axiosInstance
			.post(`postassignchallenges`, {
				userName: data.userName,
				nameChallenge: data.nameChallenge,
				idChallenge: data.idChallenge,
				idccmsAssigned: data.idccmsAssigned,
				fcmTokens: data.fcmTokens,
			})
			.catch(function (error) {
				if (error.response) {
					return error.response;
				}
			});
	} catch (error) {
		return Promise.resolve({ data: null, error: error });
	}
};

//getinfoleaderboard
//Traer los datos del leaderboard para el agente y el Team leader
const getDataLeaderboard = (context, kpi, time, group) => {
	try {
		return axiosInstance
			.post(`getinfoleaderboard`, {
				context: context,
				kpi: kpi,
				time: time,
				group: group,
			})
			.catch(function (error) {
				if (error.response) {
					return error.response;
				}
			});
	} catch (error) {
		return Promise.resolve({ data: null, error: error });
	}
};

// Trae la informacion del Equipo Creado Para OPSM Y REPL
const downloadDataAdmin = (caso) => {
	try {
		return axiosInstance
			.post(`gettemplatesloaded`, {
				caso: caso,
			})
			.catch(function (error) {
				if (error.response) {
					return error.response;
				}
			});
	} catch (error) {
		return Promise.resolve({ data: null, error: error });
	}
};
/* Actividades  no se esta usando*/
const welcomeToEGP = () => {
	try {
		return axiosInstance.post(`welcomeegp`).catch(function (error) {
			if (error.response) {
				return error.response;
			}
		});
	} catch (error) {
		return Promise.resolve({ data: null, error: error });
	}
};

export {
	uploadQuizes,
	loadQuizes,
	loadQuizesUser,
	getExam,
	createTeamSuperUser,
	createTeamOperationManager,
	uploadAnswers,
	downloadHomeData,
	downloadCounts,
	downloadDataAdmin,
	downloadActivities,
	createTeamReportingLead,
	downloadUsers,
	downloadNotifications,
	getNotifications,
	assingChallenges,
	loadUserActivities,
	userActivityDesc,
	tokenNotification,
	getKPIteamTL,
	getUsersKPI,
	updateStatusNotifications,
	welcomeToEGP,
	getDataLeaderboard,
	getDataAnalytics,
	downloadReportExp,
	downloadReportKpi,
	downloadHomeDataTl,
	downloadProfile,
	assingTpvs,
	getKpisHome,
	uploadKPIs,
	getKPIsCampaign,
};

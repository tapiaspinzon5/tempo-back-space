import { axiosInstance } from "../api/interceptor";

/* SUPER ADMIN */

//Peticion carga de achivos creacion de equipos SuperUser
const createTeamSuperUser = (dataCSV) => {
  try {
    //postcreatecampaign
    //uploadSU
    return axiosInstance
      .post(`postcreatecampaign`, {
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

const createTeamOperationManager = (context, idLeader, emails, cas) => {
  try {
    return axiosInstance
      .post(`uploadopsm`, {
        context,
        idLeader,
        emails,
        cas,
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

const createLobOperationManager = (
  context,
  lobName,
  idlob,
  tlIdccms,
  emails
) => {
  try {
    return axiosInstance
      .post(`postcreatelob`, {
        lobName,
        context,
        idlob,
        tlIdccms,
        emails,
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

//trae el RL y el QA de una cuenta
const getQARLCount = () => {
  try {
    return axiosInstance.post(`getrlqacampaignleaders`).catch(function (error) {
      if (error.response) {
        return error.response;
      }
    });
  } catch (error) {
    return Promise.resolve({ data: null, error: error });
  }
};

//trae las LOBs de una cuenta
const getLobs = (context, idLob) => {
  try {
    return axiosInstance
      .post(`getlobsopsm`, {
        context: context,
        idLob: idLob,
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

const createTeamReportingLead = (dataCSV, emails) => {
  try {
    return axiosInstance
      .post(`uploadrepl`, {
        data: dataCSV,
        emails: emails,
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
  try {
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
  }
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

//Funcion para traer listado de agentes por campaña
const getAgentsCampaign = () => {
  try {
    return axiosInstance.post(`getagentscampaignrl`).catch(function (error) {
      if (error.response) {
        return error.response;
      }
    });
  } catch (error) {
    return Promise.resolve({ data: null, error: error });
  }
};

//Funcion desactivar agente
const agentManage = (idccms) => {
  try {
    return axiosInstance
      .post(`postinactiveagent`, {
        idccmsAgent: idccms,
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

//TRAER LOS TEAM Y TEAM LEADER
const getTeamsInformation = () => {
  try {
    return axiosInstance
      .post(`getmissionsinformation`, {
        idccmsAgent: "",
        idTeam: 0,
        context: 1,
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

/* QA LEAD */ ///////////////

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

const uploadQuizes = (data, context) => {
  try {
    return axiosInstance
      .post(`uploadquiz`, { data, context })
      .catch(function (error) {
        if (error.response) {
          return error.response;
        }
      });
  } catch (error) {
    return Promise.resolve({ data: null, error: error });
  }
};

//Search Mission Categories
const getMissionsCategories = () => {
  try {
    return axiosInstance.post(`getmissionscategories`).catch(function (error) {
      if (error.response) {
        return error.response;
      }
    });
  } catch (error) {
    return Promise.resolve({ data: null, error: error });
  }
};

// Add Mission Categories
const addMissionCategories = (data) => {
  try {
    return axiosInstance
      .post(`postcreatecategory`, data)
      .catch(function (error) {
        if (error.response) {
          return error.response;
        }
      });
  } catch (error) {
    return Promise.resolve({ data: null, error: error });
  }
};
// Disabled Missions
const disabledMission = (data) => {
  try {
    return axiosInstance
      .post(`postinactivatemission`, data)
      .catch(function (error) {
        if (error.response) {
          return error.response;
        }
      });
  } catch (error) {
    return Promise.resolve({ data: null, error: error });
  }
};

//http://localhost:4343/api/postcreatecategory?idccms=4472074

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

const downloadUsers = (context, idChallenge) => {
  try {
    return axiosInstance
      .post(`getagentschallengeassignmenttl`, {
        context: context,
        idChallenge: idChallenge,
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

//funcion para Crear Nuevos Challenges
const createNewChallenge = (data, period) => {
  try {
    return axiosInstance
      .post(`postcreatenewchallengtl`, {
        action: data.action,
        kpi: data.kpi.Kpi,
        quantity: data.quantity,
        measureUnit: data.kpi.unitKpi,
        initialDate: period[0],
        finalDate: period[1],
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

//funcion para Traer los Agentes del equipo y sus Challenges asignados
const getTeamAgents = (context, idccmsAgent) => {
  try {
    return axiosInstance
      .post(`getteamagentsinformation`, {
        context: context,
        idccmsAgent: idccmsAgent,
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
//funcion para Cambiar el Nombre del Equipo
const changeTeamName = (idTeam, newTeamName) => {
  try {
    return axiosInstance
      .post(`postupdateteamname`, {
        idTeam: idTeam,
        newTeamName: newTeamName,
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
const uploadAnswers = (data, idMission) => {
  try {
    return axiosInstance
      .post(`getresultquiz`, {
        idMission,
        data,
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

//Cambia el estado de una mision a perdida cuando caduca el tiempo para su presentacion
const postMissionExpired = (idMission) => {
  try {
    return axiosInstance
      .post(`postupdatemissionstatusexpired`, {
        idMission: idMission,
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
const downloadActivities = (ccmsAgent, context) => {
  try {
    return axiosInstance
      .post(`getchanllenges`, {
        context: context,
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
const getKpisHome = (context, agentIdccms) => {
  try {
    return axiosInstance
      .post(`getkpiagentkpiteam`, {
        context: context,
        agentIdccms: agentIdccms,
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

/* Trae info de agente en especifico */
const getInfoAgent = (idccmsAgent) => {
  try {
    return axiosInstance
      .post(`getmasterinfoagents`, {
        context: 2,
        idccmsAgent: idccmsAgent,
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

/* Si se usa */
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

export const simpleRequest = (endpoint) => {
  try {
    return axiosInstance.post(endpoint).catch(function (error) {
      if (error.response) {
        return error.response;
      }
    });
  } catch (error) {
    return Promise.resolve({ data: null, error: error });
  }
};

export const requestWithData = (endpoint, data) => {
  try {
    return axiosInstance.post(endpoint, data).catch(function (error) {
      if (error.response) {
        return error.response;
      }
    });
  } catch (error) {
    return Promise.resolve({ data: null, error: error });
  }
};
/* solo existe una */
export const requestWithParam = (endpoint, param, data) => {
  try {
    return axiosInstance
      .post(`${endpoint}=${param}`, {
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
  createNewChallenge,
  getLobs,
  getInfoAgent,
  getQARLCount,
  createLobOperationManager,
  getMissionsCategories,
  addMissionCategories,
  disabledMission,
  getTeamAgents,
  changeTeamName,
  getAgentsCampaign,
  agentManage,
  getTeamsInformation,
  postMissionExpired,
};

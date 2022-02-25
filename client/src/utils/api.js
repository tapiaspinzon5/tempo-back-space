import { axiosInstance } from "../api/interceptor";

/* SUPER ADMIN */

//Peticion carga de achivos creacion de equipos SuperUser
const createTeamSuperUser = (dataCSV, idccms) => {
  try {
    return axiosInstance
      .post(`uploadSU?idccms=${idccms}`, {
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

const downloadCounts = (idccms) => {
  try {
    return axiosInstance
      .post(`getteamsbysu?idccms=${idccms}`)
      .catch(function (error) {
        if (error.response) {
          return error.response;
        }
      });
  } catch (error) {
    return Promise.resolve({ data: null, error: error });
  }
};

/* OPERATION MANAGER */

const createTeamOperationManager = (dataCSV, idccms) => {
  try {
    return axiosInstance
      .post(`uploadopsm?idccms=${idccms}`, {
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

const createTeamReportingLead = (dataCSV, idccms) => {
  try {
    return axiosInstance
      .post(`uploadrepl?idccms=${idccms}`, {
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

/* QA LEAD */

const loadQuizes = (idccms) => {
  try {
    return axiosInstance
      .post(`getquizqa?idccms=${idccms}`)
      .catch(function (error) {
        if (error.response) {
          return error.response;
        }
      });
  } catch (error) {
    return Promise.resolve({ data: null, error: error });
  }
};

const uploadQuizes = (data, idccms) => {
  try {
    return axiosInstance
      .post(`uploadquiz?idccms=${idccms}`, data)
      .catch(function (error) {
        if (error.response) {
          return error.response;
        }
      });
  } catch (error) {
    return Promise.resolve({ data: null, error: error });
  }
};

/* TEAM LEADER */

//Trae el equipo de un TEam Leader para asignarle actividades

const downloadUsers = (idccms) => {
  try {
    return axiosInstance
      .post(`getagentschallengeassignmenttl?idccms=${idccms}`)
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

const assingActivities = (data, idccms) => {
  try {
    return axiosInstance
      .post(`postassignactivitiestl?idccms=${idccms}`, {
        tlName: data.tlName,
        nameActivity: data.nameActivity,
        idActivity: data.idActivity,
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

//funcion para Traer los KPI del Team Leader
const getKPIteamTL = (idccms) => {
  try {
    return axiosInstance
      .post(`getkpiteamtl?idccms=${idccms}`)
      .catch(function (error) {
        if (error.response) {
          return error.response;
        }
      });
  } catch (error) {
    return Promise.resolve({ data: null, error: error });
  }
};
//funcion para Traer los KPI con sus usuarios  del Team Leader
const getUsersKPI = (idccms, idKPI) => {
  try {
    return axiosInstance
      .post(`getagentsbykpitl?idccms=${idccms}`, {
        idKpi: idKPI,
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
//trae la data del Home
const downloadHomeData = (idccms) => {
  try {
    return axiosInstance
      .post(`gethomedata?idccms=${idccms}`)
      .catch(function (error) {
        if (error.response) {
          return error.response;
        }
      });
  } catch (error) {
    return Promise.resolve({ data: null, error: error });
  }
};

//Trae los quices del agente
const loadQuizesUser = (idccms) => {
  try {
    return axiosInstance
      .post(`getquizbyagent?idccms=${idccms}`, {
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

const getExam = (idccms, idquiz) => {
  try {
    return axiosInstance
      .post(`getQuizDetail?idccms=${idccms}`, {
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
const uploadAnswers = (data, idccms, idExam) => {
  try {
    return axiosInstance
      .post(`getresultquiz?idccms=${idccms}&idExam=${idExam}`, {
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
const tokenNotification = (data, idccms) => {
  try {
    return axiosInstance
      .post(`postfcmtoken?idccms=${idccms}`, {
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
const downloadNotifications = (idccms) => {
  try {
    return axiosInstance
      .post(`getmynotifications?idccms=${idccms}`, {
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
const getNotifications = (idccms, min, max, context) => {
  try {
    return axiosInstance
      .post(`getmynotifications?idccms=${idccms}`, {
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
const updateStatusNotifications = (idccms, id) => {
  try {
    return axiosInstance
      .post(`updatestatusnotification?idccms=${idccms}`, {
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
const loadUserActivities = (idccms, context) => {
  try {
    return axiosInstance
      .post(`getactivitiesviewagent?idccms=${idccms}`, {
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
const userActivityDesc = (idccms, idActivity, context) => {
  try {
    return axiosInstance
      .post(`getactivitiesdescriptionagent?idccms=${idccms}`, {
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

//Trae data Analytics Agente
const getDataAnalytics = (idccms, kpi) => {
  try {
    return axiosInstance
      .post(`getkpiandanlyticsagent?idccms=${idccms}`, {
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
const downloadActivities = (idccms) => {
  try {
    return axiosInstance
      .post(`getchanllenges?idccms=${idccms}`, {
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

//getinfoleaderboard
//Traer los datos del leaderboard para el agente y el Team leader
const getDataLeaderboard = (idccms, context, kpi, time, group) => {
  try {
    return axiosInstance
      .post(`getinfoleaderboard?idccms=${idccms}`, {
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
const downloadDataAdmin = (idccms, caso) => {
  try {
    return axiosInstance
      .post(`gettemplatesloaded?idccms=${idccms}`, {
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
/* Actividades */
const welcomeToEGP = (idccms) => {
  try {
    return axiosInstance
      .post(`welcomeegp?idccms=${idccms}`)
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
  assingActivities,
  loadUserActivities,
  userActivityDesc,
  tokenNotification,
  getKPIteamTL,
  getUsersKPI,
  updateStatusNotifications,
  welcomeToEGP,
  getDataLeaderboard,
  getDataAnalytics,
};

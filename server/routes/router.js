const routes = require("../controllers/routes.controller");
const { checkIdccms } = require("../middleware/checkIdccms");
const { checkJwtToken } = require("../middleware/checkJwtToken");
const { checkMsToken } = require("../middleware/checkMsToken");
const { decryptBody } = require("../middleware/decrypt");
const oauth = require("../middleware/oauth");

module.exports = (router) => {
  //Login
  router.post("/ccmslogin", (req, res) => {
    oauth.login(req, res);
  });

  //Refresh token
  router.post("/refreshToken", (req, res) => {
    oauth.refresh(req, res);
  });

  // METODOS PERSONALIZADOS

  // LOGIN NUEVO
  router.post("/login", checkMsToken, routes.login);

  // Rutas para la carga de plantillas
  router.post("/uploadquiz", checkJwtToken, decryptBody, routes.saveQuiz); // Endpoint para la carga de la plantilla del QALeader.
  // router.post("/getquizqa", checkJwtToken, routes.getQuizQA); // Este enpoint trae todos los quizes que el QALeader haya cargado.
  router.post("/getteamsbysu", checkJwtToken, decryptBody, routes.getTeamsSU); // Retorna los equipos creados por el superuser.
  router.post("/uploadopsm", checkJwtToken, decryptBody, routes.uploadOpsM); // Endpoint para la carga de la plantilla del operation manager.
  router.post("/uploadrepl", checkJwtToken, decryptBody, routes.uploadRepLead); // Endpoint para la carga de la plantilla del reporting lead.

  // Rutas para visualizar informacion.
  // Trae toda la informacion del home del agente (podio, kpis, estadisticas, futuramente notificaciones).
  // router.post("/gethomedata", checkJwtToken, routes.getHomeData);
  // Retorna las notificaciones dependiendo del contexto 1.agente 2.Equipo, con un rango (min - max).
  // router.post("/getmynotifications", checkJwtToken, routes.getMyNotifications);
  // Almacena en DB el token del navegador del usuario junto a su idccms
  // router.post("/postfcmtoken", checkJwtToken, routes.postFcmToken);
  // Lista todos los examenes asignados por cssmid del agente.
  // router.post("/getquizbyagent", checkJwtToken, routes.getQuizByAgent);
  // Retorna las preguntas y respuestas de un examen por ID del examen.
  // router.post("/getQuizDetail", checkJwtToken, routes.getQuizDetail);
  // Recibe las respuestas seleccionadas por el agente y retorna los resultados del examen.
  // TODO: PENDIENTE
  router.post("/getresultquiz", checkJwtToken, decryptBody, routes.getResultQuiz);
  // Retorna los retos tanto para el TL (para asiganarlo a un agente) como para los agentes(cuando se retan entre ellos)
  router.post("/getchanllenges", checkJwtToken, decryptBody, routes.getChanllenges);
  // Retorna la cantidad de registros cargados en cada plantilla.
  router.post("/gettemplatesloaded", checkJwtToken, decryptBody, routes.getTemplatesLoaded);
  // Retorna las instrucciones para el cargue de plantillas.
  // router.post("/getloadinstructions", checkJwtToken, routes.getLoadInstructions);
  // Retorna la lista de agentes para asiganar un reto por parte del TL.
  // router.post("/getagentschallengeassignmenttl", checkJwtToken, routes.getAgentsChallengeAssignmentTL);
  // Retorna los retos, acvtividades y misiones de acuerdo al contexto.
  // router.post("/getactivitiesviewagent", checkJwtToken, routes.getActivitiesViewAgent);
  // Retorna la descripcion de una actividad para el agente.
  // router.post("/getactivitiesdescriptionagent", checkJwtToken, routes.getActivitiesDescriptionAgent);
  // Asignar challenges desde TL y agentes.
  router.post("/postassignchallenges", checkJwtToken, decryptBody, routes.postAssignChallenges);
  // Retorna los kpi de la campaña para la vista de KPI del Team leader
  // router.post("/getkpiteamtl", checkJwtToken, routes.getkpiteamTL);
  // Retorna los agentes por kpi seleccionado en la vista KPI TL.
  // router.post("/getagentsbykpitl", checkJwtToken, routes.getAgentsbykpiTL);
  // Cambia el estado de una notificacion de no leida a leida.
  // router.post("/updatestatusnotification", checkJwtToken, routes.updateStatusNotification);
  // Retorna la data del leaderboard dependiendo los filtros (funciona tanto para agente, TL , SU).
  // router.post("/getinfoleaderboard", checkJwtToken, routes.getInfoLeaderboard);
  // Retorna la informacion del perfil del agente .
  // router.post("/getagentprofiledata", checkJwtToken, routes.getAgentProfiledata);
  // Retorna la informacio de los kpi por agente.
  // router.post("/getkpiandanlyticsagent", checkJwtToken, routes.getKpiandAnlyticsAgent);

  // Retorna reporte de kpi de los agentes de todos los equipo y campañas.
  // router.post("/getanalyticskpirl", checkJwtToken, routes.getanalyticskpirl);
  // Retorna reporte de EXP y EC de los agentes de todos los equipo y campañas.
  // router.post("/getanalyticsexprl", checkJwtToken, routes.getanalyticsexprl);

  // Trae toda la informacion del home del agente (podio, kpis, estadisticas, futuramente notificaciones).
  // router.post("/getdashboardtl", checkJwtToken, routes.getDashboardTL);
  // Endpoint para asignar TPV
  router.post("/postassigntpv", checkJwtToken, decryptBody, routes.postassigntpv);

  router.post("/getkpiagentkpiteam", checkJwtToken, decryptBody, routes.getKpiAgentKpiTeam);

  // Carga el seguimiento de los kpi de forma manual.
  router.post("/uploadkpirl", checkJwtToken, decryptBody, routes.uploadKpirl);

  // Entrega los kpis de la campaña.
  // router.post("/getkpiscampaign", checkJwtToken, routes.getKpisCampaign);

  // Enpoint implementado para insertar nuevos challenges por parte del TL.
  // TODO:REVISAR CON DANIEL
  // router.post("/postcreatenewchallengtl", checkJwtToken, routes.postCreateNewChallengTl);

  // Enpoint implementado para inactivar agentes.
  // router.post("/postinactiveagent", checkJwtToken, routes.postinactiveagent);

  // Endpoint para consultar agentes creados en la master Data.
  // router.post("/getmasterinfoagents", checkJwtToken, routes.getMasterInfoAgents);

  // Leaderboard para RL.
  // router.post("/getinfoleaderboardrl", checkJwtToken, routes.getInfoLeaderBoardrl);

  // Endpoint para crear campañas.
  router.post("/postcreatecampaign", checkJwtToken, decryptBody, routes.postCreateCampaign);

  // Endpoint para crear LOB.
  router.post("/postcreatelob", checkJwtToken, decryptBody, routes.postCreateLOB);
  // Endpoint para crear LOB.
  router.post("/postsetlobskpis", checkJwtToken, decryptBody, routes.postSetLobsKpis);

  // Consulta todas las LOB y los equipos de una campaña.
  // router.post("/getlobsopsm", checkJwtToken, routes.getLobsOpsm);

  // Consulta el Reporting Lead y el QA Lead de la campaña.
  // router.post("/getrlqacampaignleaders", checkJwtToken, routes.getrlqaCampaignLeaders);

  // Este endpoint CREA las categorías para las misiones.
  // router.post("/postcreatecategory", checkJwtToken, routes.postCreateCategory);

  // Este endpoint es utilizado para asignar Misiones a los agentes.
  router.post("/postassignmission", checkJwtToken, decryptBody, routes.postAssignMission);

  // Este endpoint se usa para desactivar las misiones.
  // router.post("/postinactivatemission", checkJwtToken, routes.postInactivateMission);

  // Este endpoint consulta las categorias creadas anteriormente en la DB
  // router.post("/getmissionscategories", checkJwtToken, routes.getMissionsCategories);
  // Este endpoint se usa para consultar las misiones creadas, con el fin que sean asignadas a Agente, Lob o Equipo
  // router.post("/getmissionsassignmentinfo", checkJwtToken, routes.getMissionsAssignmentInfo);

  //Endpoint para consultar equipos, Agentes de los equipos y misiones asignadas a cada Agente
  // router.post("/getmissionsinformation", checkJwtToken, routes.getMissionsInformation);

  // Endpoint para inactivar misiones a agentes
  // router.post("/inactivatemissionchallengeagent", checkJwtToken, routes.inactivateMissionChallengeAgent);

  // Endpoint para obtener informacion de las campañas
  // router.post("/getcampaigninfo", checkJwtToken, routes.getCampaignInfo);

  // Endpoint para actualizar las campañas
  router.post("/postupdatecampaigninfo", checkJwtToken, decryptBody, routes.postUpdateCampaignInfo);
  router.post("/postinsertrolecampaign", checkJwtToken, decryptBody, routes.postInsertRoleCampaign);
  router.post("/postinactivateuser", checkJwtToken, decryptBody, routes.postInactivateUser);
  router.post("/postchangeuserrole", checkJwtToken, decryptBody, routes.postChangeUserRole);
  router.post("/postsendreaction", checkJwtToken, decryptBody, routes.postSendReaction);

  //Endpoint para consultar los kpi de la master data.
  // router.post("/getkpisfrommd", checkJwtToken, routes.getKpisFromMD);

  // Endpoint para consultar los integrantes de un team o saber que challenges tiene asignado un agente.
  // router.post("/getteamagentsinformation", checkJwtToken, routes.getTeamAgentsInformation);

  // Endpoint para consultar los integrantes de un team o saber que challenges tiene asignado un agente.
  // router.post("/getagentscampaignrl", checkJwtToken, routes.getAgentsCampignrl);

  // RUTAS RELACIONADAS A LAS ACTIVIDADES
  // Utilizado en el primer logueo del Agente para la visualización del video de inducción, una vez visto marca la actividad como realizada y genera la puntuación
  // router.post("/welcomeegp", checkJwtToken, routes.welcomeegp);

  // Descargar archivos
  // http://localhost:4343/api/gettemplate/SuperUser.csv
  // Recibe las respuestas seleccionadas por el agente y retorna los resultados del examen.
  // router.get("/gettemplate/:name", checkJwtToken, decryptBody, routes.getTemplate);

  // Prueba para enviar correos
  router.post("/sendemailnotification", checkJwtToken, decryptBody, routes.sendEmailNotification);

  // Ruta de prueba para enviar notificaciones.
  router.post("/sendfcmnotification", checkJwtToken, decryptBody, routes.sendFCMNotificacion);

  router.post("/getexamdetail", checkJwtToken, decryptBody, routes.getExamDetail);
  router.post("/postupdateexam", checkJwtToken, decryptBody, routes.postUpdateExam);
  router.post("/getmasterinfoagents", checkJwtToken, decryptBody, routes.getMasterinfoAgents);

  // TODO: Borrar este endpoint
  router.post("/postchangerol", routes.postChangeRol); // Retorna las actividades por categoria y stage.

  // Endpoints para Consulta Analytics
  // router.post("/getusersconnections", checkJwtToken, routes.getUsersConnections);
  // router.post("/getusersteamchanges", checkJwtToken, routes.getUsersTeamChanges);
  // router.post("/getuserstimecompletechallenges", checkJwtToken, routes.getUsersTimeCompleteChallenges);
  // router.post("/getmoreinteractiveusers", checkJwtToken, routes.getMoreInteractiveUsers);
  // router.post("/gettopuploaders", checkJwtToken, routes.getTopUploaders);
  // router.post("/getrolesinfo", checkJwtToken, routes.getRolesInfo);
  // router.post("/getplatformanalytics", checkJwtToken, routes.getPlatformAnalytics);
  // router.post("/getgeneralanalytics", checkJwtToken, routes.getGeneralAnalytics);

  //CRUD
  MapSpRouter("/sqlget", "spGetCentral");
  MapSpRouter("/sqlupdate", "spUpdateCentral");
  MapSpRouter("/sqlinsert", "spInsertCentral");
  MapSpRouter("/sqldelete", "spDeleteCentral");
  MapSpRouter("/sqldelete", "spDeleteCentral");

  MapSpRouter("/sqlgetquiz", "spLoadExamQA");
  MapSpRouter("/gethomedata", "spQueryDashBoarhAgent");
  MapSpRouter("/getmynotifications", "spQueryNotifications");
  MapSpRouter("/postfcmtoken", "spInsertToken");
  MapSpRouter("/getquizbyagent", "spQueryExamEmployee");
  MapSpRouter("/getQuizDetail", "spQueryExamDetail");
  MapSpRouter("/getloadinstructions", "spQueryLoadInstructions");
  MapSpRouter("/getagentschallengeassignmenttl", "spQueryTeamsAgents");
  MapSpRouter("/getactivitiesviewagent", "spQueryActivitiesAgent");
  MapSpRouter("/getactivitiesdescriptionagent", "spQueryDescriptionActivitiesAgent");
  MapSpRouter("/getkpiteamtl", "spQueryKpiTeam");
  MapSpRouter("/getagentsbykpitl", "spQueryKpiTeamAgent");
  MapSpRouter("/updatestatusnotification", "spChangeStatusNotifications");
  MapSpRouter("/getinfoleaderboard", "spQueryLeaderBoard");
  MapSpRouter("/getagentprofiledata", "spProfileAgent");
  MapSpRouter("/getkpiandanlyticsagent", "spQueryKpisAgents");
  MapSpRouter("/getanalyticskpirl", "spQueryAnalitycsKpi");
  MapSpRouter("/getanalyticsexprl", "spQueryAnalitycsExp");
  MapSpRouter("/getdashboardtl", "spQueryDasboardTeamLeader");
  // MapSpRouter("/uploadkpirl", "spInsertKpi");
  MapSpRouter("/getkpiscampaign", "spQueryListKpi");
  MapSpRouter("/postcreatenewchallengtl", "spInsertChallenge");
  // MapSpRouter("/postinactiveagent", "spInactivateAgent");
  // MapSpRouter("/getmasterinfoagents", "spQueryAgents");
  MapSpRouter("/getinfoleaderboardrl", "spQueryLeaderBoardRL");
  MapSpRouter("/getlobsopsm", "spQueryLobTeams");
  MapSpRouter("/getrlqacampaignleaders", "spQueryManagementOP");
  MapSpRouter("/postcreatecategory", "spInsertExamCategory");
  MapSpRouter("/postinactivatemission", "spInactivateExam");
  MapSpRouter("/getmissionscategories", "spQueryExamCategories");
  MapSpRouter("/getmissionsassignmentinfo", "spQueryMissions");
  MapSpRouter("/getmissionsinformation", "spQueryMissionsInformation");
  MapSpRouter("/inactivatemissionchallengeagent", "spInactivateMissionChallengeAgent");
  MapSpRouter("/getcampaigninfo", "spQueryCampaign");
  MapSpRouter("/postupdateteamname", "spUpdateNameTeam");
  MapSpRouter("/getkpisfrommd", "spQueryKpiMD");
  MapSpRouter("/getteamagentsinformation", "spQueryTeamInformation");
  MapSpRouter("/getagentscampaignrl", "spQueryAgentsCampaign");
  MapSpRouter("/getorganizationalunit", "spQueryOrganizationalUnits");
  MapSpRouter("/getLobsKpis", "spQueryKpiCampaignLob");
  MapSpRouter("/postupdatemissionstatusexpired", "spUpdateStatusMission");
  MapSpRouter("/getinactiveusersapplications", "spQueryUsrInactivation");
  MapSpRouter("/getAnalyticsClusterDirector", "spQueryAnalitycsDirector");
  MapSpRouter("/getgeneraljourneyresults", "spQueryGeneralJourney");

  MapSpRouter("/welcomeegp", "spBgWelcomeEGP");

  MapSpRouter("/getusersconnections", "spConnectionsPlayer");
  MapSpRouter("/getusersteamchanges", "spUserChangeTeam");
  MapSpRouter("/getuserstimecompletechallenges", "spTimeCompleteChallenges");
  MapSpRouter("/getmoreinteractiveusers", "spUsersMostInteract");
  MapSpRouter("/gettopuploaders", "spUserUploadsFiles");
  MapSpRouter("/getrolesinfo", "spUsersRole");
  MapSpRouter("/getplatformanalytics", "spQueryAnalitycs");
  MapSpRouter("/getgeneralanalytics", "spQueryAnalitycsGeneral");
  MapSpRouter("/getquizqa", "spLoadExamQA");
  MapSpRouter("/getmissionsanswers", "spAnswerMissions");
  MapSpRouter("/getpodium", "spQueryPodium");

  // function MapSpRouter(route, spName) {
  //   router.post(route,  checkJwtToken, (req, res) =>
  //   router.post(route, (req, res) => routes.CallSp(spName, req, res));
  // }
  function MapSpRouter(route, spName) {
    router.post(route, checkJwtToken, decryptBody, (req, res) => routes.CallSp(spName, req, res));
  }
};

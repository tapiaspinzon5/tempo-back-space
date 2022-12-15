const routes = require("../controllers/routes.controller");
const { checkIdccms } = require("../middleware/checkIdccms");
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
  // Rutas para la carga de plantillas
  router.post("/uploadquiz", oauth.oauthOther, decryptBody, routes.saveQuiz); // Endpoint para la carga de la plantilla del QALeader.
  // router.post("/getquizqa", oauth.oauthOther, routes.getQuizQA); // Este enpoint trae todos los quizes que el QALeader haya cargado.
  router.post("/getteamsbysu", oauth.oauthOther, decryptBody, routes.getTeamsSU); // Retorna los equipos creados por el superuser.
  router.post("/uploadopsm", oauth.oauthOther, decryptBody, routes.uploadOpsM); // Endpoint para la carga de la plantilla del operation manager.
  router.post("/uploadrepl", oauth.oauthOther, decryptBody, routes.uploadRepLead); // Endpoint para la carga de la plantilla del reporting lead.

  // Rutas para visualizar informacion.
  // Trae toda la informacion del home del agente (podio, kpis, estadisticas, futuramente notificaciones).
  // router.post("/gethomedata", oauth.oauthOther, routes.getHomeData);
  // Retorna las notificaciones dependiendo del contexto 1.agente 2.Equipo, con un rango (min - max).
  // router.post("/getmynotifications", oauth.oauthOther, routes.getMyNotifications);
  // Almacena en DB el token del navegador del usuario junto a su idccms
  // router.post("/postfcmtoken", oauth.oauthOther, routes.postFcmToken);
  // Lista todos los examenes asignados por cssmid del agente.
  // router.post("/getquizbyagent", oauth.oauthOther, routes.getQuizByAgent);
  // Retorna las preguntas y respuestas de un examen por ID del examen.
  // router.post("/getQuizDetail", oauth.oauthOther, routes.getQuizDetail);
  // Recibe las respuestas seleccionadas por el agente y retorna los resultados del examen.
  // TODO: PENDIENTE
  router.post("/getresultquiz", oauth.oauthOther, decryptBody, routes.getResultQuiz);
  // Retorna los retos tanto para el TL (para asiganarlo a un agente) como para los agentes(cuando se retan entre ellos)
  router.post("/getchanllenges", oauth.oauthOther, decryptBody, routes.getChanllenges);
  // Retorna la cantidad de registros cargados en cada plantilla.
  router.post("/gettemplatesloaded", oauth.oauthOther, decryptBody, routes.getTemplatesLoaded);
  // Retorna las instrucciones para el cargue de plantillas.
  // router.post("/getloadinstructions", oauth.oauthOther, routes.getLoadInstructions);
  // Retorna la lista de agentes para asiganar un reto por parte del TL.
  // router.post("/getagentschallengeassignmenttl", oauth.oauthOther, routes.getAgentsChallengeAssignmentTL);
  // Retorna los retos, acvtividades y misiones de acuerdo al contexto.
  // router.post("/getactivitiesviewagent", oauth.oauthOther, routes.getActivitiesViewAgent);
  // Retorna la descripcion de una actividad para el agente.
  // router.post("/getactivitiesdescriptionagent", oauth.oauthOther, routes.getActivitiesDescriptionAgent);
  // Asignar challenges desde TL y agentes.
  router.post("/postassignchallenges", oauth.oauthOther, decryptBody, routes.postAssignChallenges);
  // Retorna los kpi de la campaña para la vista de KPI del Team leader
  // router.post("/getkpiteamtl", oauth.oauthOther, routes.getkpiteamTL);
  // Retorna los agentes por kpi seleccionado en la vista KPI TL.
  // router.post("/getagentsbykpitl", oauth.oauthOther, routes.getAgentsbykpiTL);
  // Cambia el estado de una notificacion de no leida a leida.
  // router.post("/updatestatusnotification", oauth.oauthOther, routes.updateStatusNotification);
  // Retorna la data del leaderboard dependiendo los filtros (funciona tanto para agente, TL , SU).
  // router.post("/getinfoleaderboard", oauth.oauthOther, routes.getInfoLeaderboard);
  // Retorna la informacion del perfil del agente .
  // router.post("/getagentprofiledata", oauth.oauthOther, routes.getAgentProfiledata);
  // Retorna la informacio de los kpi por agente.
  // router.post("/getkpiandanlyticsagent", oauth.oauthOther, routes.getKpiandAnlyticsAgent);

  // Retorna reporte de kpi de los agentes de todos los equipo y campañas.
  // router.post("/getanalyticskpirl", oauth.oauthOther, routes.getanalyticskpirl);
  // Retorna reporte de EXP y EC de los agentes de todos los equipo y campañas.
  // router.post("/getanalyticsexprl", oauth.oauthOther, routes.getanalyticsexprl);

  // Trae toda la informacion del home del agente (podio, kpis, estadisticas, futuramente notificaciones).
  // router.post("/getdashboardtl", oauth.oauthOther, routes.getDashboardTL);
  // Endpoint para asignar TPV
  router.post("/postassigntpv", oauth.oauthOther, decryptBody, routes.postassigntpv);

  router.post("/getkpiagentkpiteam", oauth.oauthOther, decryptBody, routes.getKpiAgentKpiTeam);

  // Carga el seguimiento de los kpi de forma manual.
  router.post("/uploadkpirl", oauth.oauthOther, decryptBody, routes.uploadKpirl);

  // Entrega los kpis de la campaña.
  // router.post("/getkpiscampaign", oauth.oauthOther, routes.getKpisCampaign);

  // Enpoint implementado para insertar nuevos challenges por parte del TL.
  // TODO:REVISAR CON DANIEL
  // router.post("/postcreatenewchallengtl", oauth.oauthOther, routes.postCreateNewChallengTl);

  // Enpoint implementado para inactivar agentes.
  // router.post("/postinactiveagent", oauth.oauthOther, routes.postinactiveagent);

  // Endpoint para consultar agentes creados en la master Data.
  // router.post("/getmasterinfoagents", oauth.oauthOther, routes.getMasterInfoAgents);

  // Leaderboard para RL.
  // router.post("/getinfoleaderboardrl", oauth.oauthOther, routes.getInfoLeaderBoardrl);

  // Endpoint para crear campañas.
  router.post("/postcreatecampaign", oauth.oauthOther, decryptBody, routes.postCreateCampaign);

  // Endpoint para crear LOB.
  router.post("/postcreatelob", oauth.oauthOther, decryptBody, routes.postCreateLOB);
  // Endpoint para crear LOB.
  router.post("/postsetlobskpis", oauth.oauthOther, decryptBody, routes.postSetLobsKpis);

  // Consulta todas las LOB y los equipos de una campaña.
  // router.post("/getlobsopsm", oauth.oauthOther, routes.getLobsOpsm);

  // Consulta el Reporting Lead y el QA Lead de la campaña.
  // router.post("/getrlqacampaignleaders", oauth.oauthOther, routes.getrlqaCampaignLeaders);

  // Este endpoint CREA las categorías para las misiones.
  // router.post("/postcreatecategory", oauth.oauthOther, routes.postCreateCategory);

  // Este endpoint es utilizado para asignar Misiones a los agentes.
  router.post("/postassignmission", oauth.oauthOther, decryptBody, routes.postAssignMission);

  // Este endpoint se usa para desactivar las misiones.
  // router.post("/postinactivatemission", oauth.oauthOther, routes.postInactivateMission);

  // Este endpoint consulta las categorias creadas anteriormente en la DB
  // router.post("/getmissionscategories", oauth.oauthOther, routes.getMissionsCategories);
  // Este endpoint se usa para consultar las misiones creadas, con el fin que sean asignadas a Agente, Lob o Equipo
  // router.post("/getmissionsassignmentinfo", oauth.oauthOther, routes.getMissionsAssignmentInfo);

  //Endpoint para consultar equipos, Agentes de los equipos y misiones asignadas a cada Agente
  // router.post("/getmissionsinformation", oauth.oauthOther, routes.getMissionsInformation);

  // Endpoint para inactivar misiones a agentes
  // router.post("/inactivatemissionchallengeagent", oauth.oauthOther, routes.inactivateMissionChallengeAgent);

  // Endpoint para obtener informacion de las campañas
  // router.post("/getcampaigninfo", oauth.oauthOther, routes.getCampaignInfo);

  // Endpoint para actualizar las campañas
  router.post("/postupdatecampaigninfo", oauth.oauthOther, decryptBody, routes.postUpdateCampaignInfo);
  router.post("/postinsertrolecampaign", oauth.oauthOther, decryptBody, routes.postInsertRoleCampaign);
  router.post("/postinactivateuser", oauth.oauthOther, decryptBody, routes.postInactivateUser);
  router.post("/postchangeuserrole", oauth.oauthOther, decryptBody, routes.postChangeUserRole);
  router.post("/postsendreaction", oauth.oauthOther, decryptBody, routes.postSendReaction);

  //Endpoint para consultar los kpi de la master data.
  // router.post("/getkpisfrommd", oauth.oauthOther, routes.getKpisFromMD);

  // Endpoint para consultar los integrantes de un team o saber que challenges tiene asignado un agente.
  // router.post("/getteamagentsinformation", oauth.oauthOther, routes.getTeamAgentsInformation);

  // Endpoint para consultar los integrantes de un team o saber que challenges tiene asignado un agente.
  // router.post("/getagentscampaignrl", oauth.oauthOther, routes.getAgentsCampignrl);

  // RUTAS RELACIONADAS A LAS ACTIVIDADES
  // Utilizado en el primer logueo del Agente para la visualización del video de inducción, una vez visto marca la actividad como realizada y genera la puntuación
  // router.post("/welcomeegp", oauth.oauthOther, routes.welcomeegp);

  // Descargar archivos
  // http://localhost:4343/api/gettemplate/SuperUser.csv
  router.get("/gettemplate/:name", oauth.oauthOther, decryptBody, routes.getTemplate); // Recibe las respuestas seleccionadas por el agente y retorna los resultados del examen.

  // Prueba para enviar correos
  router.post("/sendemailnotification", oauth.oauthOther, decryptBody, routes.sendEmailNotification);

  // Ruta de prueba para enviar notificaciones.
  router.post("/sendfcmnotification", oauth.oauthOther, decryptBody, routes.sendFCMNotificacion);

  // TODO: Borrar este endpoint
  router.post("/postchangerol", routes.postChangeRol); // Retorna las actividades por categoria y stage.

  // Endpoints para Consulta Analytics
  // router.post("/getusersconnections", oauth.oauthOther, routes.getUsersConnections);
  // router.post("/getusersteamchanges", oauth.oauthOther, routes.getUsersTeamChanges);
  // router.post("/getuserstimecompletechallenges", oauth.oauthOther, routes.getUsersTimeCompleteChallenges);
  // router.post("/getmoreinteractiveusers", oauth.oauthOther, routes.getMoreInteractiveUsers);
  // router.post("/gettopuploaders", oauth.oauthOther, routes.getTopUploaders);
  // router.post("/getrolesinfo", oauth.oauthOther, routes.getRolesInfo);
  // router.post("/getplatformanalytics", oauth.oauthOther, routes.getPlatformAnalytics);
  // router.post("/getgeneralanalytics", oauth.oauthOther, routes.getGeneralAnalytics);

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
  MapSpRouter("/getmasterinfoagents", "spQueryAgents");
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

  // function MapSpRouter(route, spName) {
  //   router.post(route,  oauth.oauthOther, (req, res) =>
  //   router.post(route, (req, res) => routes.CallSp(spName, req, res));
  // }
  function MapSpRouter(route, spName) {
    router.post(route, oauth.oauthOther, decryptBody, (req, res) => routes.CallSp(spName, req, res));
  }
};

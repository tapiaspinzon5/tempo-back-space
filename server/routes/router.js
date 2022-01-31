const routes = require("../controllers/routes.controller");
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
  router.post("/uploadquiz", routes.saveQuiz);      // Endpoint para la carga de la plantilla del QALeader.
  router.post("/getquizqa", routes.getQuizQA);      // Este enpoint trae todos los quizes que el QALeader haya cargado.
  router.post("/uploadsu", routes.uploadSU);        // Endpoint para la carga de la plantilla del SuperUsuario.
  router.post("/getteamsbysu", routes.getTeamsSU);  // Retorna los equipos creados por el superuser.
  router.post("/uploadopsm", routes.uploadOpsM);    // Endpoint para la carga de la plantilla del operation manager.
  router.post("/uploadrepl", routes.uploadRepLead); // Endpoint para la carga de la plantilla del reporting lead.

  // Rutas para visualizar informacion.
  // Trae toda la informacion del home del agente (podio, kpis, estadisticas, futuramente notificaciones).
  router.post("/gethomedata", routes.getHomeData); 
  router.post("/getmynotifications", routes.getMyNotifications); 
  router.post("/postfcmtoken", routes.postFcmToken); 
  
  router.post("/getquizbyagent", routes.getQuizByAgent); // Lista todos los examenes asignados por cssmid del agente.
  router.post("/getQuizDetail", routes.getQuizDetail);   // Retorna las preguntas y respuestas de un examen por ID del examen.
  router.post("/getresultquiz", routes.getResultQuiz);   // Recibe las respuestas seleccionadas por el agente y retorna los resultados del examen.
   // Retorna los retos tanto para el TL (para asiganarlo a un agente) como para los agentes(cuando se retan entre ellos)
  router.post("/getchanllenges", routes.getChanllenges);  
  router.post("/gettemplatesloaded", routes.getTemplatesLoaded);   // Retorna la cantidad de registros cargados en cada plantilla.
  router.post("/getloadinstructions", routes.getLoadInstructions);   // Retorna la cantidad de registros cargados en cada plantilla.
  router.post("/getagentschallengeassignmenttl", routes.getAgentsChallengeAssignmentTL);   // Retorna la cantidad de registros cargados en cada plantilla.
  router.post("/getactivitiesviewagent", routes.getActivitiesViewAgent);   // Retorna la cantidad de registros cargados en cada plantilla.
  router.post("/getactivitiesdescriptionagent", routes.getActivitiesDescriptionAgent);   // Retorna la cantidad de registros cargados en cada plantilla.
  
  // Descargar archivos
  // http://localhost:4343/api/gettemplate/SuperUser.csv
  router.get("/gettemplate/:name", routes.getTemplate);   // Recibe las respuestas seleccionadas por el agente y retorna los resultados del examen.
  
  // Asignar challenges
  router.post("/postassignactivitiestl",routes.assignActivitiesTL);
  
  router.post("/sendemailnotification", routes.sendEmailNotification);
  
  // Ruta de prueba para enviar notificaciones.
  router.post("/sendfcmnotification", routes.sendFCMNotificacion);
  
  


  // TODO: Borrar este endpoint
  router.post("/postchangerol", routes.postChangeRol);   // Retorna las actividades por categoria y stage.
  //CRUD
  MapSpRouter("/sqlget", "spGetCentral");
  MapSpRouter("/sqlupdate", "spUpdateCentral");
  MapSpRouter("/sqlinsert", "spInsertCentral");
  MapSpRouter("/sqldelete", "spDeleteCentral");
  MapSpRouter("/sqldelete", "spDeleteCentral");
  MapSpRouter("/sqlgetquiz", "spConsultaDetalleExamen");

  function MapSpRouter(route, spName) {
    // router.post(route,  oauth.oauthOther, (req, res) =>
    router.post(route, (req, res) => routes.CallSp(spName, req, res));
  }
};

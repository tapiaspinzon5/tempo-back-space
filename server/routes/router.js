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
  router.post("/uploadquiz",oauth.oauthOther, routes.saveQuiz);      // Endpoint para la carga de la plantilla del QALeader.
  router.post("/getquizqa",oauth.oauthOther, routes.getQuizQA);      // Este enpoint trae todos los quizes que el QALeader haya cargado.
  router.post("/uploadsu",oauth.oauthOther, routes.uploadSU);        // Endpoint para la carga de la plantilla del SuperUsuario.
  router.post("/getteamsbysu",oauth.oauthOther, routes.getTeamsSU);  // Retorna los equipos creados por el superuser.
  router.post("/uploadopsm",oauth.oauthOther, routes.uploadOpsM);    // Endpoint para la carga de la plantilla del operation manager.
  router.post("/uploadrepl",oauth.oauthOther, routes.uploadRepLead); // Endpoint para la carga de la plantilla del reporting lead.

  // Rutas para visualizar informacion.
  // Trae toda la informacion del home del agente (podio, kpis, estadisticas, futuramente notificaciones).
  router.post("/gethomedata",oauth.oauthOther, oauth.oauthOther, routes.getHomeData ); 
  // Retorna las notificaciones creadas en la DB cuando se asigna un challenge
  router.post("/getmynotifications",oauth.oauthOther, routes.getMyNotifications); 
  // Almacena en DB el token del navegador del usuario junto a su idccms
  router.post("/postfcmtoken", oauth.oauthOther, routes.postFcmToken); 
  // Lista todos los examenes asignados por cssmid del agente.
  router.post("/getquizbyagent", oauth.oauthOther, routes.getQuizByAgent); 
  // Retorna las preguntas y respuestas de un examen por ID del examen.
  router.post("/getQuizDetail", oauth.oauthOther, routes.getQuizDetail);  
  // Recibe las respuestas seleccionadas por el agente y retorna los resultados del examen.
  router.post("/getresultquiz", oauth.oauthOther, routes.getResultQuiz);   
   // Retorna los retos tanto para el TL (para asiganarlo a un agente) como para los agentes(cuando se retan entre ellos)
  router.post("/getchanllenges", oauth.oauthOther, routes.getChanllenges);
  // Retorna la cantidad de registros cargados en cada plantilla.
  router.post("/gettemplatesloaded", oauth.oauthOther, routes.getTemplatesLoaded);   
  // Retorna las instrucciones para el cargue de plantillas.
  router.post("/getloadinstructions", oauth.oauthOther, routes.getLoadInstructions);   
  // Retorna la lista de agentes para asiganar un reto por parte del TL.
  router.post("/getagentschallengeassignmenttl", oauth.oauthOther, routes.getAgentsChallengeAssignmentTL);   
  // Retorna los retos, acvtividades y misiones de acuerdo al contexto.
  router.post("/getactivitiesviewagent", oauth.oauthOther, routes.getActivitiesViewAgent);   
  // Retorna la descripcion de una actividad para el agente.
  router.post("/getactivitiesdescriptionagent", oauth.oauthOther, routes.getActivitiesDescriptionAgent);   
  // Asignar challenges por parte del tl
  router.post("/postassignactivitiestl", oauth.oauthOther,routes.assignActivitiesTL);
  

  // Descargar archivos
  // http://localhost:4343/api/gettemplate/SuperUser.csv
  router.get("/gettemplate/:name",oauth.oauthOther, routes.getTemplate);   // Recibe las respuestas seleccionadas por el agente y retorna los resultados del examen.
  
  // Prueba para enviar correos
  router.post("/sendemailnotification", oauth.oauthOther, routes.sendEmailNotification);
  
  // Ruta de prueba para enviar notificaciones.
  router.post("/sendfcmnotification", oauth.oauthOther, routes.sendFCMNotificacion);
  
  // Retorna los kpi de la campaña para la vista de KPI del Team leader
  router.post("/getkpiteamtl", oauth.oauthOther, routes.getkpiteamTL);

  // Retorna los agentes por kpi seleccionado en la vista KPI TL. 
  router.post("/getagentsbykpitl", oauth.oauthOther, routes.getAgentsbykpiTL);
  

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

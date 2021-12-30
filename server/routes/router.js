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

  // CARGA QUIZ CSV
  router.post("/uploadquiz", routes.saveQuiz);// Valida el csv cargado para crear la intradia de un escenario
  
  // Carga SuperUser
  router.post("/uploadsu", routes.uploadSU);// Valida el csv cargado para crear la intradia de un escenario
  // Carga Ops.Manager
  router.post("/uploadopsm", routes.uploadOpsM);// Valida el csv cargado para crear la intradia de un escenario
  
  // Ver examenes por IDCSSM
  router.post("/getquizbyagent", routes.getQuizByAgent);

  router.post("/gethomedata", routes.getHomeData);


  //CRUD
  MapSpRouter("/sqlget", "spGetCentral");
  MapSpRouter("/sqlupdate", "spUpdateCentral");
  MapSpRouter("/sqlinsert", "spInsertCentral");
  MapSpRouter("/sqldelete", "spDeleteCentral");
  MapSpRouter("/sqldelete", "spDeleteCentral");
  MapSpRouter("/sqlgetquiz", "spConsultaDetalleExamen");

  function MapSpRouter(route, spName) {
    // router.post(route,  oauth.oauthOther, (req, res) =>
    router.post(route, (req, res) =>
      routes.CallSp(spName, req, res)
    );
  }
};

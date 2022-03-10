const sql = require("./sql.controller");
const parametros = require("./params.controller").parametros;
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { decrypt } = require("./crypt.controller");
const multiparty = require("multiparty");
const path = require('path');
const {transport} = require("../nodemailerConfig");
const {sendFCMMessage} = require("../helpers/sendNotification");

exports.CallSp = (spName, req, res) => {
  // const payload = jwt.verify(req.headers.authorization.split(" ")[1],  process.env.SECRET);
  // const idccms = JSON.parse(decrypt(payload.data)).data.idccms;
  // req.body.idccms = 1234567;

  sql
    .query(spName, parametros(req.body, spName))
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};
// };

function isEmpty(req) {
  for (var key in req) {
    if (req.hasOwnProperty(key)) return false;
  }
  return true;
}

exports.test = (req, res) => {
  let num = Math.floor(Math.random() * (100 - 1)) + 1;
  let options = {
    //ms s    m     h   d
    maxAge: 1000 * 60 * 60 * 24 * 60, // would expire after 15 minutes
    httpOnly: true,
  };
  res.cookie("XSRF-TOKEN", req.csrfToken(), options);
  res.status(200).json({ random: num });
};

exports.test2 = (req, res) => {
  res.status(200).json({ RST: "Funcional" });
};

let responsep = (tipo, req, res, resultado, cookie) => {
  return new Promise((resolve, reject) => {
    if (tipo == 1) {
      res.cookie("XSRF-TOKEN", req.csrfToken(), {
        "max-Age": new Date(Date.now() + 90000000),
        path: "/",
      });
      res.status(200).json(resultado);
      resolve("Enviado");
    } else if (tipo == 2) {
      console.log("Error at:", new Date(), "res: ", resultado);
      res.status(400).json(resultado);
      // reject('Paila')
    }
  });
};

exports.saveQuiz = async (req, res) => {
  
  // Funcion para insertar un id a las preguntas
  let i = 0;
  let data = req.body.data;

  let rows = data.map((quest) => {
    i = i + 1;
    return [...quest, i];
  });

  sql
    .query(
      "spInsertExam",
      parametros({ idccms: req.query.idccms, rows }, "spInsertExam")
    )
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.uploadSU = async (req, res) => {

   // Funcion para insertar un id a las preguntas
   let i = 0;
   let data = req.body.data;
 
   let rows = data.map((quest) => {
     i = i + 1;
     return [...quest, i];
   });

  sql
    .query(
      "spInsertTeam",
      parametros(
        { idccms: req.query.idccms, rows},
        "spInsertTeam"
      )
    )
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.uploadOpsM = async (req, res) => {
 
  sql
    .query(
      "spInsertOrganizationalUnit",
      parametros(
        { idccms: req.query.idccms, rows: req.body.data },
        "spInsertOrganizationalUnit"
      )
    )
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.uploadRepLead = async (req, res) => {
  sql
    .query(
      "spInsertEmployee",
      parametros(
        { idccms: req.query.idccms, rows: req.body.data },
        "spInsertEmployee"
      )
    )
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.getQuizByAgent = async (req, res) => {
  sql
    .query(
      "spQueryExamEmployee",
      parametros({ idccms: req.query.idccms }, "spQueryExamEmployee")
    )
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.getQuizDetail = async (req, res) => {
  let { idQuiz } = req.body;

  sql
    .query(
      "spQueryExamDetail",
      parametros({ idccms: req.query.idccms, idQuiz }, "spQueryExamDetail")
    )
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.getResultQuiz = async (req, res) => {
  let { quizResolved } = req.body;

  sql
    .query(
      "spInsertExamResult",
      parametros(
        { idccms: req.query.idccms, quizResolved },
        "spInsertExamResult"
      )
    )
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.getResultQuiz = async (req, res) => {
  sql
    .query(
      "spInsertExamResult",
      parametros(
        {
          idccms: req.query.idccms,
          idQuiz: req.query.idExam,
          rows: req.body.data,
        },
        "spInsertExamResult"
      )
    )
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.getHomeData = async (req, res) => {
  sql
    .query(
      "spQueryDashBoarhAgent",
      parametros({ idccms: req.query.idccms }, "spQueryDashBoarhAgent")
    )
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.getQuizQA = async (req, res) => {
  sql
    .query(
      "spLoadExamQA",
      parametros({ idccms: req.query.idccms }, "spLoadExamQA")
    )
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.getTeamsSU = async (req, res) => {
  sql
    .query(
      "spQueryTeams",
      parametros({ idccms: req.query.idccms }, "spQueryTeams")
    )
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.getTemplate = async (req, res) => {

  let __basedir = path.resolve();
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });

}

exports.getChanllenges = async (req, res) => {

  const {context, idccmsAssigned }= req.body;

  sql
    .query(
      "spQueryActivities",
      parametros({idccms:req.query.idccms, context,idccmsAssigned },"spQueryActivities"
      )
    )
    .then((result) => {

      // let tempGetStarted = []
      // let tempGetStronger = []
      // let tempBattle = []
      // let tempDevelopingSkills = []
      // let tempBeingAwarded = []

      // result.forEach(element => {

      //   switch (element?.Stage) {
      //     case "Getting started":
      //       tempGetStarted.push(element)
      //       break;
      //     case "Getting stronger":
      //       tempGetStronger.push(element)
      //       break;
      //     case "Battle":
      //       tempBattle.push(element)
      //       break;
      //     case "Developing skills":
      //       tempDevelopingSkills.push(element)
      //       break;
      //     case "Being Awarded":
      //       tempBeingAwarded.push(element)
      //       break;
        
      //     default:
      //       break;
      //   }
      // });

      // let filterData = {
      //   "Getting started":tempGetStarted,
      //   "Getting stronger":tempGetStronger,
      //   "Battle":tempBattle,
      //   "Developing skills":tempDevelopingSkills,
      //   "Being Awarded":tempBeingAwarded,
      // }

      // console.log(filterData);
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.getTemplatesLoaded = async (req, res) => {

  const { caso } = req.body;
  const nameArray = [];

  sql
    .query(
      "spQueryLoadTemplate",
      parametros({ idccms: req.query.idccms, caso }, "spQueryLoadTemplate"))
    .then((result) => {

      // Si el caso solicitado es el 2 tenemos que filtrar.
      if (caso === 2) {

        // Array con solo los nombres
        result.forEach(element => {
          nameArray.push(element.Nombre);
        });
        
        // Array filtrado con los nombres sin repetir
        const resultado = nameArray.filter((item,index)=>{
          return nameArray.indexOf(item) === index;
        })
  
        // Agrupamos los elementos de la respuesta (result) por nombre; 
        let filteredData= resultado.map(el => {
  
          let tempArray = []
  
          result.forEach(element => {
            if (element.Nombre === el) tempArray.push(element) 
          });
  
          return tempArray;
        })
  
        // Recorremos el nuevo array (el que agrupa por nombre) para conocer cuantos de cada lideres tiene
        let objResponse = filteredData.map(el => {
  
          let name = el[0]?.Nombre;
          let cantTL = 0;
          let cantRL = 0;
          let cantQAL = 0;
          let cantOM = 0;
  
          el.forEach(elemnt => {
            
            switch (elemnt?.RoleAgent) {
              case 'Team Leader':
                cantTL=elemnt?.Total
                break;
  
              case 'Reporting Lead':
                cantRL=elemnt?.Total
                break;
  
              case 'QA Lead':
                cantQAL=elemnt?.Total
                break;
  
              case 'Operation Manager':
                cantOM=elemnt?.Total
                break;
            
              default:
                break;
            }
          });
  
          return ({
            "nombre": name,
            "teamLeads": cantTL,
            "reportingLeads": cantRL,
            "QALeads":cantQAL,
            "OpsManagers":cantOM
          })
        })      
  
        responsep(1, req, res, objResponse);
      } else {
        responsep(1, req, res, result);
      }
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.getLoadInstructions = async (req, res) => {

  sql
    .query(
      "spQueryLoadInstructions",
      parametros({ idccms: req.query.idccms}, "spQueryLoadInstructions")
    )
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};


exports.postAssignChallenges = async (req, res) => {

  // const {data} = req.body
  const {userName, nameChallenge, idChallenge, idccmsAssigned, fcmTokens} = req.body;  
  let rows = [];
  let i = 0;

  // Filtramos las personas que si tienen token para notificarlos
  let fcmTokensFiltered = fcmTokens.filter(token => token);

  // Armo tabla para la DB
  idChallenge.forEach(act => {
    idccmsAssigned.forEach(id => {
      i = i + 1;
      rows.push([id,act,i])
    })
  });

  // Recorremos cada actividad
  for (let i = 0; i < nameChallenge.length; i++) {
    try {
      // enviamos la actividad por c/u  de los tokens
      fcmTokensFiltered.forEach(async (token) => {
        // console.log(userName, nameChallenge[i], token);
        return await sendFCMMessage(userName, nameChallenge[i], token)
      })
      // res.status(200).json(resp);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // try {
  //   let resp = fcmTokens.map(async (token) => {
  //     return await sendFCMMessage(token,msg)
  //   })
  //   // res.status(200).json(resp);
  // } catch (error) {
  //   res.status(500).json(error);
  // }

  sql
    .query(
      "spInsertChallengeAgent",
      parametros({ idccms: req.query.idccms, rows}, "spInsertChallengeAgent")
    )
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.getAgentsChallengeAssignmentTL = async (req, res) => {
  sql
    .query(
      "spQueryTeamsAgents",
      parametros({ idccms: req.query.idccms }, "spQueryTeamsAgents")
    )
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.getActivitiesViewAgent = async (req, res) => {

  const { context } = req.body;

  sql
    .query(
      "spQueryActivitiesAgent",
      parametros({ idccms: req.query.idccms, context }, "spQueryActivitiesAgent")
    )
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.sendEmailNotification = async (req, res) => {

  const {sendTo, msg} = req.body;

  const message = {
    from: 'MalumaBby@gmail.com', // Sender address
    to: sendTo,         // List of recipients
    subject: 'Notifiacion de prueba', // Subject line
    text: msg // Plain text body
  };

  transport.sendMail(message, function(err, info) {
      if (err) {
        console.log(err)
        res.status(500).json(err)
      } else {
        console.log(info);
        res.status(200).json(info)
      }
  });
};

exports.sendFCMNotificacion = async (req, res) => {

  const {FCMtoken, msg} = req.body;
 
  try {
    let resp = FCMtoken.map(async (token) => {
      return await sendFCMMessage(token, msg)
    })
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json(error);
  }
  // try {
  //   let resp = await sendFCMMessage(FCMtoken, msg)
  //   console.log(resp);
  //   res.status(200).json(resp);
  // } catch (error) {
  //   res.status(500).json(error);
  // }
};


exports.getActivitiesDescriptionAgent = async (req, res) => {

  const { idActivity, context } = req.body;

  sql
    .query(
      "spQueryDescriptionActivitiesAgent",
      parametros({ idccms: req.query.idccms, idActivity, context}, "spQueryDescriptionActivitiesAgent")
    )
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.getMyNotifications = async (req, res) => {

  const {min, max, context} = req.body; 

  sql
    .query(
      "spQueryNotifications",
      parametros({ idccms: req.query.idccms, context, min, max }, "spQueryNotifications")
    )
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};


exports.postFcmToken = async (req, res) => {

  const {fcmNotification} = req.body;

  sql
    .query(
      "spInsertToken",
      parametros({ idccms: req.query.idccms,fcmNotification }, "spInsertToken")
    )
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.postChangeRol = async (req, res) => {

  const {RoleAgent}= req.body;

  sql
    .query(
      "spChangeRoleAgent",
      parametros({idccms:req.query.idccms, RoleAgent},"spChangeRoleAgent"
      )
    )
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.getkpiteamTL = async (req, res) => {
  sql
    .query(
      "spQueryKpiTeam",
      parametros({ idccms: req.query.idccms }, "spQueryKpiTeam")
    )
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.getAgentsbykpiTL = async (req, res) => {

  const { idKpi } = req.body;

  sql
    .query(
      "spQueryKpiTeamAgent",
      parametros({ idccms: req.query.idccms, idKpi}, "spQueryKpiTeamAgent")
    )
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.updateStatusNotification = async (req, res) => {

  const { idNotificationMin, idNotificationMax } = req.body;

  sql
    .query(
      "spChangeStatusNotifications",
      parametros({ idccms: req.query.idccms, idNotificationMin, idNotificationMax }, "spChangeStatusNotifications")
    )
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.getInfoLeaderboard = async (req, res) => {

  const { context,kpi,time,group } = req.body;

  sql
    .query(
      "spQueryLeaderBoard",
      parametros({ idccms: req.query.idccms, context,kpi,time,group }, "spQueryLeaderBoard")
    )
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.getAgentProfiledata = async (req, res) => {

  sql
    .query(
      "spProfileAgent",
      parametros({ idccms: req.query.idccms}, "spProfileAgent")
    )
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.getKpiandAnlyticsAgent = async (req, res) => {

  const { kpi,time} = req.body;

  sql
    .query(
      "spQueryKpisAgents",
      parametros({ idccms: req.query.idccms, kpi, time}, "spQueryKpisAgents")
    )
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};


exports.getanalyticskpirl = async (req, res) => {

  sql
    .query(
      "spQueryAnalitycsKpi",
      parametros({ idccms: req.query.idccms}, "spQueryAnalitycsKpi")
    )
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.getanalyticsexprl = async (req, res) => {

  sql
    .query(
      "spQueryAnalitycsExp",
      parametros({ idccms: req.query.idccms}, "spQueryAnalitycsExp")
    )
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};


exports.getDashboardTL = async (req, res) => {
  sql
    .query(
      "spQueryDasboardTeamLeader",
      parametros({ idccms: req.query.idccms }, "spQueryDasboardTeamLeader")
    )
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.postassigntpv = async (req, res) => {

  const {userName, nameTPV, idTpv, idccmsAssigned, fcmTokens} = req.body;  

  // Filtramos las personas que si tienen token para notificarlos
  let fcmTokensFiltered = fcmTokens.filter(token => token);

  // Recorremos cada actividad
  for (let i = 0; i < nameTPV.length; i++) {
    try {
      // enviamos la actividad por c/u  de los tokens
      fcmTokensFiltered.forEach(async (token) => {
        // console.log(userName, nameTPV[i], token);
        return await sendFCMMessage(userName, nameTPV[i], token)
      })
      // res.status(200).json(resp);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  sql
    .query(
      "spInsertTpvs",
      parametros({idccms:req.query.idccms, idTpv, idccmsAssigned },"spInsertTpvs"
      )
    )
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

/****************** SPs actividades ******************/
exports.welcomeegp = async (req, res) => {

  sql
    .query(
      "spBgWelcomeEGP",
      parametros({ idccms: req.query.idccms}, "spBgWelcomeEGP")
    )
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

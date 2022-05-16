const sql = require("./sql.controller");
const parametros = require("./params.controller").parametros;
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { decrypt } = require("./crypt.controller");
const multiparty = require("multiparty");
const path = require('path');
const {transport} = require("../nodemailerConfig");
const {sendFCMMessage} = require("../helpers/sendNotification");
const { randomInt } = require('crypto');
const axios = require('axios').default;

exports.CallSp = (spName, req, res) => {
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

function isEmpty(req) {
  for (var key in req) {
    if (req.hasOwnProperty(key)) return false;
  }
  return true;
}

exports.test = (req, res) => {
  let num = Math.floor(randomInt(0,10) * (100 - 1)) + 1;
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
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV !== "development",
        sameSite: "Strict",
      });
      res.status(200).json(resultado);
      resolve("Enviado");
    } else if (tipo == 2) {
      console.log("Error at:", new Date(), "res: ", resultado);
      res.status(400).json(resultado);
    }
  });
};

exports.saveQuiz = async (req, res) => {
  
  const {data, context} = req.body;

  let i = 0;
  let rows = [];
  let rows2 = [];

  if (context == 1) {

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

  } else {

    for (let i = 1; i < data.length; i++) {
      rows.push(data[i][0]) 
    }

    for (let i = 0; i < rows.length; i++) {
      rows2.push([
        rows[i].ask, 
        rows[i].questionType === 'trueFalse' ? 'true' : rows[i][1], 
        rows[i].questionType === 'trueFalse' ? 'false' : rows[i][2],   
        rows[i].questionType === 'trueFalse' ? null : rows[i][3],   
        rows[i].questionType === 'trueFalse' ? null : rows[i][4],
        rows[i].answer,
        rows[i].Q,
        data[0][0].quizName,
        data[0][0].quizDescription,
        +data[0][0].quizTarget,
        data[0][0].quizCategory,
        i+1
      ]) 
    }

    sql
      .query(
        "spInsertExam",
        parametros({ idccms: req.query.idccms, rows:rows2 }, "spInsertExam")
      )
      .then((result) => {
        responsep(1, req, res, result);
      })
      .catch((err) => {
        console.log(err, "sp");
        responsep(2, req, res, err);
      });
  }
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

  const {context, idLeader, cas, email} = req.body;

  sql
    .query(
      "spInsertOrganizationalUnit",
      parametros(
        { idccms: req.query.idccms, context, idLeader, cas },
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

  const path = 'https://ApiEmail.teleperformance.co/api/sendEmail';

  // const message = {
  //   from: 'noresponse@teleperformance.co', // Sender address
  //   to: email,         // List of recipients
  //   subject: 'Notifiacion de prueba QA RL, // Subject line',
  //   text: 'Notification QA RL' // Plain text body
  // };

  let message = {
    "emails": `${email}` ,
    "subject": "Role assignment",
    "name": "Notification SpaceGP",
    "emailSender": "noresponse@teleperformance.com",
    "HTML": 'Body Notification assigment QA RL' 
  }

  let responseEmail = await axios.post(path, message)
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

  let {idccmsAssigned, context }= req.body;

  if (context === 1) {
    idccmsAssigned = req.query.idccms
  }

  console.log(idccmsAssigned);
  sql
    .query(
      "spQueryActivities",
      parametros({idccms:req.query.idccms, context, idccmsAssigned},"spQueryActivities"
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

  const {context, idChallenge } = req.body;

  sql
    .query(
      "spQueryTeamsAgents",
      parametros({ idccms: req.query.idccms, context, idChallenge }, "spQueryTeamsAgents")
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

  const { idKpi, time, agentIdccms, context } = req.body;

  sql
    .query(
      "spQueryKpiTeamAgent",
      parametros({ idccms: req.query.idccms, idKpi, time, agentIdccms,context }, "spQueryKpiTeamAgent")
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

exports.getKpiAgentKpiTeam = async (req, res) => {

  const {context, agentIdccms} = req.body;

  if (context && agentIdccms) {
    sql
    .query(
      "spQueryDashboardKPI",
      parametros({ idccms: agentIdccms, context}, "spQueryDashboardKPI")
    )
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
  } else {
    sql
    .query(
      "spQueryDashboardKPI",
      parametros({ idccms: req.query.idccms, context}, "spQueryDashboardKPI")
    )
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
  }

 
};


exports.uploadKpirl = async (req, res) => {

 sql
   .query(
     "spInsertKpi",
     parametros(
       { idccms: req.query.idccms, rows:req.body.data},
       "spInsertKpi"
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


exports.getKpisCampaign = async (req, res) => {


 sql
   .query(
     "spQueryListKpi",
     parametros(
       { idccms: req.query.idccms},
       "spQueryListKpi"
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


exports.postCreateNewChallengTl = async (req, res) => {

  sql
    .query(
      "spInsertChallenge",
      parametros(
        { idccms: req.query.idccms, body: req.body },
        "spInsertChallenge"
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

exports.postinactiveagent = async (req, res) => {

  const { idccmsAgent} = req.body;

  sql
    .query(
      "spInactivateAgent",
      parametros(
        { idccms: req.query.idccms, idccmsAgent},
        "spInactivateAgent"
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

exports.getMasterInfoAgents = async (req, res) => {

  const {idccmsAgent, context} = req.body;

  sql
    .query(
      "spQueryAgents",
      parametros(
        { idccmsAgent, context},
        "spQueryAgents"
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

exports.getInfoLeaderBoardrl = async (req, res) => {

  const { context,kpi,time } = req.body;

  sql
    .query(
      "spQueryLeaderBoardRL",
      parametros({ idccms: req.query.idccms, context,kpi,time }, "spQueryLeaderBoardRL")
    )
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.postCreateCampaign = async (req, res) => {

  let i = 0;
  let data = req.body.data;

  let rows = data.map((quest) => {
    i = i + 1;
    return [...quest, i];
  });

  sql
    .query(
      "spInsertCampaign",
      parametros({ idccms: req.query.idccms, rows}, "spInsertCampaign")
    )
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.postCreateLOB = async (req, res) => {

  const {lobName, tlIdccms, context, idlob} = req.body;

  sql
    .query(
      "spInsertLob",
      parametros({ idccms: req.query.idccms, lobName, tlIdccms, context,idlob}, "spInsertLob")
    )
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.getLobsOpsm = async (req, res) => {

  const {idLob, context} = req.body;

  sql
    .query(
      "spQueryLobTeams",
      parametros({ idccms: req.query.idccms,idLob, context}, "spQueryLobTeams")
    )
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.getrlqaCampaignLeaders = async (req, res) => {

  sql
    .query(
      "spQueryManagementOP",
      parametros({ idccms: req.query.idccms}, "spQueryManagementOP")
    )
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.postCreateCategory = async (req, res) => {

  const {nameCategory, context, idCategory} = req.body;
  sql
    .query(
      "spInsertExamCategory",
      parametros({ idccms: req.query.idccms, nameCategory, context
        ,idCategory}, "spInsertExamCategory")
    )
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.postAssignMission = async (req, res) => {

  const {userName, nameMissions, idMissions, idAssigned, fcmTokens, expTime, context} = req.body;

  let rows = [];
  let rows2 = [];
  let rows3 = [];
  let i = 0;
  let i2 = 0;

    
  // Filtramos las personas que si tienen token para notificarlos
  let fcmTokensFiltered = fcmTokens.filter(token => token !== "0");

  switch (context) {
    case 1:

      for (let i = 0; i < idMissions.length; i++) {
        rows2.push([idMissions[i], expTime[i]])
      }

      rows2.forEach(ele => {
        idAssigned.forEach(id => {
          i2 = i2 + 1;
          rows3.push([id,ele[0],ele[1],i2])
        })
      });

      sql
        .query(
          "spInsertExamEmployee",
          parametros({ idccms: req.query.idccms, contextLobTeam:1, rows3}, "spInsertExamEmployee")
        )
        .then((result) => {
          responsep(1, req, res, result);
        })
        .catch((err) => {
          console.log(err, "sp");
          responsep(2, req, res, err);
        });

      // Recorremos cada actividad
      for (let i = 0; i < nameMissions.length; i++) {
        try {
          // enviamos la actividad por c/u  de los tokens
          fcmTokensFiltered.forEach(async (token) => {
            // console.log(userName, nameChallenge[i], token);
            return await sendFCMMessage(userName, nameMissions[i], token)
          })
        } catch (error) {
          res.status(500).json(error);
        }
      }
    
      break;

    case 2:
      // POR EQUIPOS
      idAssigned.forEach(id => {
        i = i + 1;
        rows.push([id,i])
      })

      sql
        .query(
          "spQueryMissionsDetail",
          parametros({ idccms: req.query.idccms, contextLobTeam:1, rows}, "spQueryMissionsDetail")
        )
        .then((result) => {
          let agentsInfo = result[0].Agents;

          for (let i = 0; i < idMissions.length; i++) {
            rows2.push([idMissions[i], expTime[i]])
          }

          rows2.forEach(ele => {
            agentsInfo.forEach(inf => {
              i2 = i2 + 1;
              rows3.push([inf.Ident,ele[0],ele[1],i2])
            })
          });

          // Filtramos las personas que si tienen token para notificarlos
          let usersWithFcmTokens = agentsInfo.filter(token => token.Token !== "0");

          sql
            .query(
              "spInsertExamEmployee",
              parametros({ idccms: req.query.idccms, contextLobTeam:2, rows3}, "spInsertExamEmployee")
            )
            .then((result) => {
              responsep(1, req, res, result);
            })
            .catch((err) => {
              console.log(err, "sp");
              responsep(2, req, res, err);
            });

          // Recorremos cada actividad
          for (let i = 0; i < nameMissions.length; i++) {
            try {
              // enviamos la actividad por c/u  de los tokens
              usersWithFcmTokens.forEach(async (user) => {
                // console.log(userName, nameChallenge[i], token);
                return await sendFCMMessage(userName, nameMissions[i], user.Token)
              })
            } catch (error) {
              res.status(500).json(error);
            }
          }
          
        })
        .catch((err) => {
          console.log(err, "sp");
          responsep(2, req, res, err);
        });
      break;
  
    case 3:
      // POR LOBS
      idAssigned.forEach(id => {
        i = i + 1;
        rows.push([id,i])
      })

      sql
        .query(
          "spQueryMissionsDetail",
          parametros({ idccms: req.query.idccms, contextLobTeam:2, rows}, "spQueryMissionsDetail")
        )
        .then((result) => {

          let agentsInfo = result[0].Agents;

          for (let i = 0; i < idMissions.length; i++) {
            rows2.push([idMissions[i], expTime[i]])
          }

          // Filtramos las personas que si tienen token para notificarlos
          let usersWithFcmTokens = agentsInfo.filter(token => token.Token !== "0");
          
          rows2.forEach(ele => {
            agentsInfo.forEach(inf => {
              i2 = i2 + 1;
              rows3.push([inf.Ident,ele[0],ele[1],i2])
            })
          });

          sql
            .query(
              "spInsertExamEmployee",
              parametros({ idccms: req.query.idccms, contextLobTeam:3, rows3}, "spInsertExamEmployee")
            )
            .then((result) => {
              responsep(1, req, res, result);
            })
            .catch((err) => {
              console.log(err, "sp");
              responsep(2, req, res, err);
            });

          // Recorremos cada actividad
          for (let i = 0; i < nameMissions.length; i++) {
            try {
              // enviamos la actividad por c/u  de los tokens
              usersWithFcmTokens.forEach(async (user) => {
                // console.log(userName, nameChallenge[i], token);
                return await sendFCMMessage(userName, nameMissions[i], user.Token)
              })
            } catch (error) {
              res.status(500).json(error);
            }
          }

        })
        .catch((err) => {
          console.log(err, "sp");
          responsep(2, req, res, err);
        });

      break;

    default:
      break;
  }
};

exports.postInactivateMission = async (req, res) => {

  const {idMission} = req.body;
  sql
    .query(
      "spInactivateExam",
      parametros({ idccms: req.query.idccms, idMission}, "spInactivateExam")
    )
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.getMissionsCategories = async (req, res) => {

  sql
    .query(
      "spQueryExamCategories",
      parametros({ idccms: req.query.idccms}, "spQueryExamCategories")
    )
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.getMissionsAssignmentInfo = async (req, res) => {

  const {context, caso} = req.body;

  sql
    .query(
      "spQueryMissions",
      parametros({ idccms: req.query.idccms, context, caso}, "spQueryMissions")
    )
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.getMissionsInformation = async (req, res) => {

  const {idccmsAgent, idTeam, context} = req.body;

  sql
    .query(
      "spQueryMissionsInformation",
      parametros({ idccms: req.query.idccms, idccmsAgent, idTeam, context}, "spQueryMissionsInformation")
    )
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.inactivateMissionAgent = async (req, res) => {

  const {idccmsAgent, idMission} = req.body;

  sql
    .query(
      "spInactivateMissionAgent",
      parametros({ idccms: req.query.idccms, idccmsAgent, idMission}, "spInactivateMissionAgent")
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

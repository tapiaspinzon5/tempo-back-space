require("dotenv").config();
const path = require("path");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const { randomInt } = require("crypto");
const sql = require("./sql.controller");
const parametros = require("./params.controller").parametros;
const { decrypt } = require("./crypt.controller");
const { transport } = require("../nodemailerConfig");
const { sendFCMMessage } = require("../helpers/sendNotification");
const { sendEmail, sendConfirmInactivationEmail, sendUserChangeRolEmail } = require("../helpers/sendEmail");
const { getNumberOfDays } = require("../helpers/daysDifference");

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
  let num = Math.floor(randomInt(0, 10) * (100 - 1)) + 1;
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
      // res.status(200).json({ resultado });
      res.status(200).json(CryptoJS.AES.encrypt(JSON.stringify(resultado), `secret key 123`).toString());
      resolve("Enviado");
    } else if (tipo == 2) {
      console.log("Error at:", new Date(), "res: ", resultado);
      // res.status(400).json(resultado);
      res.status(400).json(CryptoJS.AES.encrypt(JSON.stringify(resultado), `secret key 123`).toString());
    }
  });
};

exports.saveQuiz = async (req, res) => {
  const { data, context, idccms } = req.body;

  let i = 0;
  let rows = [];
  let rows2 = [];
  let rows3 = [];
  const quartiles = ["Q1", "Q2", "Q3", "Q4"];

  if (context == 1) {
    data.forEach((quest) => {
      if (quest[6] === "All") {
        quartiles.forEach((q) => {
          quest[6] = q;
          rows.push([...quest]);
        });
      } else {
        rows.push([...quest]);
      }
    });

    let rows2 = rows.map((quest) => {
      i = i + 1;
      return [...quest, i];
    });

    sql
      .query("spInsertExam", parametros({ idccms, rows: rows2 }, "spInsertExam"))
      .then((result) => {
        responsep(1, req, res, result);
      })
      .catch((err) => {
        console.log(err, "sp");
        responsep(2, req, res, err);
      });
  } else {
    for (let i = 1; i < data.length; i++) {
      rows.push(data[i][0]);
    }

    for (let i = 0; i < rows.length; i++) {
      switch (rows[i].questionType) {
        case "multipleAnswer":
          rows2.push([
            rows[i].ask,
            rows[i][1],
            rows[i][2],
            rows[i][3],
            rows[i][4],
            rows[i].answer,
            rows[i].Q,
            data[0][0].quizName,
            data[0][0].quizDescription,
            +data[0][0].quizTarget,
            data[0][0].quizCategory,
            3,
          ]);
          break;

        case "multipleChoice":
          rows2.push([
            rows[i].ask,
            rows[i][1],
            rows[i][2],
            rows[i][3],
            rows[i][4],
            rows[i].answer,
            rows[i].Q,
            data[0][0].quizName,
            data[0][0].quizDescription,
            +data[0][0].quizTarget,
            data[0][0].quizCategory,
            1,
          ]);
          break;

        case "trueFalse":
          rows2.push([
            rows[i].ask,
            "true",
            "false",
            null,
            null,
            rows[i].answer,
            rows[i].Q,
            data[0][0].quizName,
            data[0][0].quizDescription,
            +data[0][0].quizTarget,
            data[0][0].quizCategory,
            2,
          ]);
          break;

        default:
          break;
      }
    }

    rows2.forEach((quest) => {
      if (quest[6] === "All") {
        quartiles.forEach((q) => {
          quest[6] = q;
          rows3.push([...quest]);
        });
      } else {
        rows3.push([...quest]);
      }
    });

    let rows4 = rows3.map((quest) => {
      i = i + 1;
      return [...quest, i];
    });

    sql
      .query("spInsertExam", parametros({ idccms, rows: rows4 }, "spInsertExam"))
      .then((result) => {
        responsep(1, req, res, result);
      })
      .catch((err) => {
        console.log(err, "sp");
        responsep(2, req, res, err);
      });
  }
};

exports.uploadOpsM = async (req, res) => {
  const { idccms, context, idLeader, cas, emails, imageUrl } = req.body;

  sql
    .query(
      "spInsertOrganizationalUnit",
      parametros({ idccms, context, idLeader, cas, imageUrl }, "spInsertOrganizationalUnit")
    )
    .then(async (result) => {
      await sendEmail(
        emails,
        "SpaceGP role assignment",
        "Notification SpaceGP",
        "noresponse@teleperformance.com"
      );
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.uploadRepLead = async (req, res) => {
  const { data, idccms } = req.body;
  let i = 0;

  // Esto se hace para no tener que modificar el sp de incersion
  data.forEach((el) => {
    el.unshift("Q4");
    el.push("Agent");
  });

  let newData = data.map((ele) => {
    i = i + 1;
    return [ele[1], i];
  });

  sql
    .query("spQueryAgentsMD", parametros({ idccms, rows: newData }, "spQueryAgentsMD"))
    .then((result) => {
      let problemStatus = [
        "Unknown",
        "Terminated",
        "",
        "No Hire",
        "Leave of Absence",
        "Candidate",
        "Not exist",
        "Exists in another campaign",
      ];

      let usersWithProblems = result.filter((user) => problemStatus.includes(user.status));

      if (usersWithProblems.length > 0) return responsep(2, req, res, usersWithProblems);

      result.forEach((el, idx) => {
        data[idx][0] = getNumberOfDays(el.DateCampaign);
      });

      sql
        .query("spInsertEmployee", parametros({ idccms, rows: data }, "spInsertEmployee"))
        .then(async (result) => {
          // Esta condicion se hace debido a que si se carga el user por fomulario, este campo me lo envian, en caso contrario (carga por plantilla) lo debo tomar desde la respuesta una vez los agentes han sido cargados
          if (req.body.emails) {
            await sendEmail(
              req.body.emails,
              "SpaceGP role assignment",
              "Notification SpaceGP",
              "noresponse@teleperformance.com"
            );
          } else {
            let emails = result.map((user) => {
              return {
                email: user.email,
                rolManager: "Flight Engineer",
                name: user.Employee,
                rol: "Cosmonaut",
              };
            });

            await sendEmail(
              emails,
              "SpaceGP role assignment",
              "Notification SpaceGP",
              "noresponse@teleperformance.com"
            );
          }

          responsep(1, req, res, result);
        })
        .catch((err) => {
          console.log(err, "sp");
          responsep(2, req, res, err);
        });
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.postInsertRoleCampaign = async (req, res) => {
  let i = 0;
  let campaignTable = [];
  let loadAgentTable = [];
  const { idccms, idUser, role, idCampaign, idLob, idTeam, nameTeam, context, emails } = req.body;

  if (role === "Cluster Director") {
    campaignTable = idCampaign.map((el) => {
      i = i + 1;
      return [el, i];
    });
  }

  if (role === "Agent") loadAgentTable = [["Q4", idUser, nameTeam, "Agent"]];

  sql
    .query(
      "spInsertRoleCampaign",
      parametros(
        {
          idccms,
          idUser,
          role,
          idCampaign: idCampaign[0] ?? 0,
          idLob,
          idTeam,
          context,
          rows: role !== "Cluster Director" ? [[0, 0]] : campaignTable,
          rows2: role !== "Agent" ? [["Q4", 0, "0", "Agent"]] : loadAgentTable,
        },
        "spInsertRoleCampaign"
      )
    )
    .then(async (result) => {
      await sendEmail(
        emails,
        "SpaceGP role assignment",
        "Notification SpaceGP",
        "noresponse@teleperformance.com"
      );
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

// exports.getQuizDetail = async (req, res) => {
//   let { idQuiz } = req.body;

//   sql
//     .query("spQueryExamDetail", parametros({ idccms: req.query.idccms, idQuiz }, "spQueryExamDetail"))
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };

// exports.getResultQuiz = async (req, res) => {
//   let { quizResolved } = req.body;

//   sql
//     .query("spInsertExamResult", parametros({ idccms: req.query.idccms, quizResolved }, "spInsertExamResult"))
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };

exports.getResultQuiz = async (req, res) => {
  const { idccms, idMission, data } = req.body;
  sql
    .query(
      "spInsertExamResult",
      parametros(
        {
          idccms,
          idMission,
          rows: data,
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

// exports.getHomeData = async (req, res) => {
//   sql
//     .query("spQueryDashBoarhAgent", parametros({ idccms: req.query.idccms }, "spQueryDashBoarhAgent"))
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };

// exports.getQuizQA = async (req, res) => {
//   sql
//     .query("spLoadExamQA", parametros({ idccms: req.query.idccms }, "spLoadExamQA"))
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };

exports.getTeamsSU = async (req, res) => {
  sql
    .query("spQueryTeams", parametros({ idccms }, "spQueryTeams"))
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
};

exports.getChanllenges = async (req, res) => {
  let { idccmsAssigned, context, idccms } = req.body;

  if (context === 1) {
    idccmsAssigned = idccms;
  }

  sql
    .query("spQueryActivities", parametros({ idccms, context, idccmsAssigned }, "spQueryActivities"))
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.getTemplatesLoaded = async (req, res) => {
  const { caso, idccms } = req.body;
  const nameArray = [];

  sql
    .query("spQueryLoadTemplate", parametros({ idccms, caso }, "spQueryLoadTemplate"))
    .then((result) => {
      // Si el caso solicitado es el 2 tenemos que filtrar.
      if (caso === 2) {
        // Array con solo los nombres
        result.forEach((element) => {
          nameArray.push(element.Nombre);
        });

        // Array filtrado con los nombres sin repetir
        const resultado = nameArray.filter((item, index) => {
          return nameArray.indexOf(item) === index;
        });

        // Agrupamos los elementos de la respuesta (result) por nombre;
        let filteredData = resultado.map((el) => {
          let tempArray = [];

          result.forEach((element) => {
            if (element.Nombre === el) tempArray.push(element);
          });

          return tempArray;
        });

        // Recorremos el nuevo array (el que agrupa por nombre) para conocer cuantos de cada lideres tiene
        let objResponse = filteredData.map((el) => {
          let name = el[0]?.Nombre;
          let cantTL = 0;
          let cantRL = 0;
          let cantQAL = 0;
          let cantOM = 0;

          el.forEach((elemnt) => {
            switch (elemnt?.RoleAgent) {
              case "Team Leader":
                cantTL = elemnt?.Total;
                break;

              case "Reporting Lead":
                cantRL = elemnt?.Total;
                break;

              case "QA Lead":
                cantQAL = elemnt?.Total;
                break;

              case "Operation Manager":
                cantOM = elemnt?.Total;
                break;

              default:
                break;
            }
          });

          return {
            nombre: name,
            teamLeads: cantTL,
            reportingLeads: cantRL,
            QALeads: cantQAL,
            OpsManagers: cantOM,
          };
        });

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

// exports.getLoadInstructions = async (req, res) => {
//   sql
//     .query("spQueryLoadInstructions", parametros({ idccms: req.query.idccms }, "spQueryLoadInstructions"))
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };

exports.postAssignChallenges = async (req, res) => {
  // const {data} = req.body
  const { idccms, userName, nameChallenge, idChallenge, idccmsAssigned, fcmTokens } = req.body;
  let rows = [];
  let i = 0;

  // Filtramos las personas que si tienen token para notificarlos
  let fcmTokensFiltered = fcmTokens.filter((token) => token);

  // Armo tabla para la DB
  idChallenge.forEach((act) => {
    idccmsAssigned.forEach((id) => {
      i = i + 1;
      rows.push([id, act, i]);
    });
  });

  // Recorremos cada actividad
  for (let i = 0; i < nameChallenge.length; i++) {
    try {
      // enviamos la actividad por c/u  de los tokens
      fcmTokensFiltered.forEach(async (token) => {
        // console.log(userName, nameChallenge[i], token);
        return await sendFCMMessage(userName, nameChallenge[i], token, "challenge");
      });
      // res.status(200).json(resp);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  sql
    .query("spInsertChallengeAgent", parametros({ idccms, rows }, "spInsertChallengeAgent"))
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

// exports.getAgentsChallengeAssignmentTL = async (req, res) => {
//   const { context, idChallenge, idccms } = req.body;

//   sql
//     .query("spQueryTeamsAgents", parametros({ idccms, context, idChallenge }, "spQueryTeamsAgents"))
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };

// exports.getActivitiesViewAgent = async (req, res) => {
//   const { context, idccms } = req.body;

//   sql
//     .query("spQueryActivitiesAgent", parametros({ idccms, context }, "spQueryActivitiesAgent"))
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };

exports.sendEmailNotification = async (req, res) => {
  const { sendTo, msg } = req.body;

  const message = {
    from: "MalumaBby@gmail.com", // Sender address
    to: sendTo, // List of recipients
    subject: "Notifiacion de prueba", // Subject line
    text: msg, // Plain text body
  };

  let emails = [sendTo];

  await sendConfirmInactivationEmail(
    emails,
    "SpaceGP email",
    "Deactivation Notification SpaceGP",
    "noresponse@teleperformance.com"
  );

  // transport.sendMail(message, function (err, info) {
  //   if (err) {
  //     console.log(err);
  //     res.status(500).json(err);
  //   } else {
  //     console.log(info);
  //     res.status(200).json(info);
  //   }
  // });
};

exports.sendFCMNotificacion = async (req, res) => {
  const { FCMtoken, msg } = req.body;

  try {
    let resp = FCMtoken.map(async (token) => {
      return await sendFCMMessage("Enviador TPV", "Nombre TPV", token, "TPV");
    });
    res.status(200).json(resp);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// exports.getActivitiesDescriptionAgent = async (req, res) => {
//   const { idActivity, context, idccms } = req.body;

//   sql
//     .query(
//       "spQueryDescriptionActivitiesAgent",
//       parametros({ idccms, idActivity, context }, "spQueryDescriptionActivitiesAgent")
//     )
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };

// exports.getMyNotifications = async (req, res) => {
//   const { min, max, context } = req.body;

//   sql
//     .query(
//       "spQueryNotifications",
//       parametros({ idccms: req.query.idccms, context, min, max }, "spQueryNotifications")
//     )
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };

// exports.postFcmToken = async (req, res) => {
//   const { fcmNotification } = req.body;

//   sql
//     .query("spInsertToken", parametros({ idccms: req.query.idccms, fcmNotification }, "spInsertToken"))
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };

exports.postChangeRol = async (req, res) => {
  const { RoleAgent } = req.body;

  sql
    .query("spChangeRoleAgent", parametros({ idccms: req.query.idccms, RoleAgent }, "spChangeRoleAgent"))
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

// exports.getkpiteamTL = async (req, res) => {
//   sql
//     .query("spQueryKpiTeam", parametros({ idccms: req.body.idccms }, "spQueryKpiTeam"))
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };

// exports.getAgentsbykpiTL = async (req, res) => {
//   const { idccms, idKpi, time, agentIdccms, context } = req.body;

//   sql
//     .query(
//       "spQueryKpiTeamAgent",
//       parametros({ idccms, idKpi, time, agentIdccms, context }, "spQueryKpiTeamAgent")
//     )
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };

// exports.updateStatusNotification = async (req, res) => {
//   const { idccms, idNotificationMin, idNotificationMax } = req.body;

//   sql
//     .query(
//       "spChangeStatusNotifications",
//       parametros({ idccms, idNotificationMin, idNotificationMax }, "spChangeStatusNotifications")
//     )
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };

// exports.getInfoLeaderboard = async (req, res) => {
//   const { idccms, context, kpi, time, group } = req.body;

//   sql
//     .query("spQueryLeaderBoard", parametros({ idccms, context, kpi, time, group }, "spQueryLeaderBoard"))
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };

// exports.getAgentProfiledata = async (req, res) => {
//   sql
//     .query("spProfileAgent", parametros({ idccms: req.body.idccms }, "spProfileAgent"))
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };

// exports.getKpiandAnlyticsAgent = async (req, res) => {
//   const { idccms, kpi, time } = req.body;

//   sql
//     .query("spQueryKpisAgents", parametros({ idccms, kpi, time }, "spQueryKpisAgents"))
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };

// exports.getanalyticskpirl = async (req, res) => {
//   sql
//     .query("spQueryAnalitycsKpi", parametros({ idccms: req.body.idccms }, "spQueryAnalitycsKpi"))
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };

// exports.getanalyticsexprl = async (req, res) => {
//   sql
//     .query("spQueryAnalitycsExp", parametros({ idccms: req.body.idccms }, "spQueryAnalitycsExp"))
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };

// exports.getDashboardTL = async (req, res) => {
//   sql
//     .query("spQueryDasboardTeamLeader", parametros({ idccms: req.body.idccms }, "spQueryDasboardTeamLeader"))
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };

exports.postassigntpv = async (req, res) => {
  const { idccms, userName, nameTPV, idTpv, idccmsAssigned, fcmTokens } = req.body;

  // Filtramos las personas que si tienen token para notificarlos
  let fcmTokensFiltered = fcmTokens.filter((token) => token);

  // Recorremos cada actividad
  for (let i = 0; i < nameTPV.length; i++) {
    try {
      // enviamos la actividad por c/u  de los tokens
      fcmTokensFiltered.forEach(async (token) => {
        // console.log(userName, nameTPV[i], token);
        return await sendFCMMessage(userName, nameTPV[i], token, "TPV");
      });
      // res.status(200).json(resp);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  sql
    .query("spInsertTpvs", parametros({ idccms, idTpv, idccmsAssigned }, "spInsertTpvs"))
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.getKpiAgentKpiTeam = async (req, res) => {
  const { idccms, context, agentIdccms } = req.body;

  if (context && agentIdccms) {
    sql
      .query("spQueryDashboardKPI", parametros({ idccms: agentIdccms, context }, "spQueryDashboardKPI"))
      .then((result) => {
        responsep(1, req, res, result);
      })
      .catch((err) => {
        console.log(err, "sp");
        responsep(2, req, res, err);
      });
  } else {
    sql
      .query("spQueryDashboardKPI", parametros({ idccms, context }, "spQueryDashboardKPI"))
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
  const { data, idccms } = req.body;
  let i = 0;

  const unique = [...new Set(data.map((item) => item[3]))];

  let newData = unique.map((ele) => {
    i = i + 1;
    return [ele, i];
  });

  sql
    .query("spQueryAgentsMD", parametros({ idccms, rows: newData }, "spQueryAgentsMD"))
    .then((result) => {
      let problemStatus = [
        "Unknown",
        "Terminated",
        "",
        "No Hire",
        "Leave of Absence",
        "Candidate",
        "Not exist",
      ];

      let usersWithProblems = result.filter((user) => problemStatus.includes(user.status));

      if (usersWithProblems.length > 0) return responsep(2, req, res, usersWithProblems);

      sql
        .query("spInsertKpi", parametros({ idccms, data }, "spInsertKpi"))
        .then((result) => {
          responsep(1, req, res, result);
        })
        .catch((err) => {
          console.log(err, "sp");
          responsep(2, req, res, err);
        });
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

// exports.getKpisCampaign = async (req, res) => {
//   sql
//     .query("spQueryListKpi", parametros({ idccms: req.body.idccms }, "spQueryListKpi"))
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };

// exports.postCreateNewChallengTl = async (req, res) => {
//   sql
//     .query("spInsertChallenge", parametros({ idccms: req.body.idccms, body: req.body }, "spInsertChallenge"))
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };

// exports.postinactiveagent = async (req, res) => {
//   const { idccms, idccmsAgent } = req.body;

//   sql
//     .query("spInactivateAgent", parametros({ idccms, idccmsAgent }, "spInactivateAgent"))
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };

// exports.getMasterInfoAgents = async (req, res) => {
//   const { idccmsAgent, context } = req.body;

//   sql
//     .query("spQueryAgents", parametros({ idccmsAgent, context }, "spQueryAgents"))
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };

// exports.getInfoLeaderBoardrl = async (req, res) => {
//   const { idccms, context, kpi, time } = req.body;

//   sql
//     .query("spQueryLeaderBoardRL", parametros({ idccms, context, kpi, time }, "spQueryLeaderBoardRL"))
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };

exports.postCreateCampaign = async (req, res) => {
  let i = 0;
  let { idccms, data, emails, context, idLob = 0 } = req.body;

  let rowsOM = [[null, null, 0, 0, 0, 0, 0, null, 0, 0, 1]];

  let rows = data.map((quest) => {
    i = i + 1;
    return [...quest, i];
  });

  sql
    .query(
      "spInsertCampaign",
      parametros({ idccms, rowsSU: rows, rowsOM, context, idLob }, "spInsertCampaign")
    )
    .then(async (result) => {
      await sendEmail(
        emails,
        "SpaceGP role assignment",
        "Notification SpaceGP",
        "noresponse@teleperformance.com"
      );
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.postCreateLOB = async (req, res) => {
  // const { idccms, lobName, tlIdccms, context, idlob, emails } = req.body;

  let i = 1;
  let createNewTLContext1 = [];
  let context2table = [];

  const { idccms, lobName, context, idLob, createNewTL, changeTL, reassingTeam, inactivateTeam, emails } =
    req.body;

  if (context == 1) {
    createNewTLContext1 = createNewTL.map((el) => [el]);
  } else {
    if (createNewTL.length > 0) {
      createNewTL.forEach((idccms) => {
        context2table.push([idccms, 1, null, null, i]);
        i = i + 1;
      });
    }
    if (changeTL.length > 0) {
      changeTL.forEach((el) => {
        context2table.push([el[1], 2, el[0], null, i]);
        i = i + 1;
      });
    }
    if (reassingTeam.length > 0) {
      reassingTeam.forEach((el) => {
        context2table.push([el[1], 3, null, el[0], i]);
        i = i + 1;
      });
    }
    if (inactivateTeam.length > 0) {
      inactivateTeam.forEach((id) => {
        context2table.push([id, 4, null, null, i]);
        i = i + 1;
      });
    }
  }

  sql
    .query(
      "spInsertLob",
      parametros(
        {
          idccms,
          lobName,
          context,
          idLob,
          tlIdccms: context == 1 ? createNewTLContext1 : [[0]],
          tableEdition: context == 2 ? context2table : [[0, 1, 0, 0, 1]],
        },
        "spInsertLob"
      )
    )
    .then(async (result) => {
      await sendEmail(
        emails,
        "SpaceGP role assignment",
        "Notification SpaceGP",
        "noresponse@teleperformance.com"
      );
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.postSetLobsKpis = async (req, res) => {
  let i = 0;
  let { idccms, data, context, idLob } = req.body;

  let rowsSU = [[idccms, "null", "null", 0, 0, 0]];

  let rows = data.map((quest) => {
    i = i + 1;
    return [...quest, i];
  });

  sql
    .query(
      "spInsertCampaign",
      parametros({ idccms, rowsSU, rowsOM: rows, context, idLob }, "spInsertCampaign")
    )
    .then(async (result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

// exports.getLobsOpsm = async (req, res) => {
//   const { idccms, idLob, context } = req.body;

//   sql
//     .query("spQueryLobTeams", parametros({ idccms, idLob, context }, "spQueryLobTeams"))
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };

// exports.getrlqaCampaignLeaders = async (req, res) => {
//   sql
//     .query("spQueryManagementOP", parametros({ idccms: req.body.idccms }, "spQueryManagementOP"))
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };

// exports.postCreateCategory = async (req, res) => {
//   const { idccms, nameCategory, context, idCategory } = req.body;
//   sql
//     .query(
//       "spInsertExamCategory",
//       parametros({ idccms, nameCategory, context, idCategory }, "spInsertExamCategory")
//     )
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };

exports.postAssignMission = async (req, res) => {
  const { idccms, userName, nameMissions, idMissions, idAssigned, fcmTokens, initDate, endDate, context } =
    req.body;

  let rows = [];
  let rows2 = [];
  let rows3 = [];
  let i = 0;
  let i2 = 0;

  // Filtramos las personas que si tienen token para notificarlos
  let fcmTokensFiltered = fcmTokens.filter((token) => token !== "0");

  switch (context) {
    case 1:
      for (let i = 0; i < idMissions.length; i++) {
        rows2.push([idMissions[i], initDate[i], endDate[i]]);
      }

      rows2.forEach((ele) => {
        idAssigned.forEach((id) => {
          i2 = i2 + 1;
          rows3.push([id, ele[0], ele[1], ele[2], i2]);
        });
      });

      sql
        .query(
          "spInsertExamEmployee",
          parametros({ idccms, contextLobTeam: 1, rows3 }, "spInsertExamEmployee")
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
            return await sendFCMMessage(userName, nameMissions[i], token, "mission");
          });
        } catch (error) {
          res.status(500).json(error);
        }
      }

      break;

    case 2:
      // POR EQUIPOS
      idAssigned.forEach((id) => {
        i = i + 1;
        rows.push([id, i]);
      });

      sql
        .query(
          "spQueryMissionsDetail",
          parametros({ idccms, contextLobTeam: 1, rows }, "spQueryMissionsDetail")
        )
        .then((result) => {
          let agentsInfo = result[0].Agents;

          for (let i = 0; i < idMissions.length; i++) {
            rows2.push([idMissions[i], initDate[i], endDate[i]]);
          }

          rows2.forEach((ele) => {
            agentsInfo.forEach((inf) => {
              i2 = i2 + 1;
              rows3.push([inf.Ident, ele[0], ele[1], ele[2], i2]);
            });
          });

          // Filtramos las personas que si tienen token para notificarlos
          let usersWithFcmTokens = agentsInfo.filter((token) => token.Token !== "0");

          sql
            .query(
              "spInsertExamEmployee",
              parametros({ idccms, contextLobTeam: 2, rows3 }, "spInsertExamEmployee")
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
                return await sendFCMMessage(userName, nameMissions[i], user.Token, "mission");
              });
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
      idAssigned.forEach((id) => {
        i = i + 1;
        rows.push([id, i]);
      });

      sql
        .query(
          "spQueryMissionsDetail",
          parametros({ idccms, contextLobTeam: 2, rows }, "spQueryMissionsDetail")
        )
        .then((result) => {
          let agentsInfo = result[0].Agents;

          for (let i = 0; i < idMissions.length; i++) {
            rows2.push([idMissions[i], initDate[i], endDate[i]]);
          }

          // Filtramos las personas que si tienen token para notificarlos
          let usersWithFcmTokens = agentsInfo.filter((token) => token.Token !== "0");

          rows2.forEach((ele) => {
            agentsInfo.forEach((inf) => {
              i2 = i2 + 1;
              rows3.push([inf.Ident, ele[0], ele[1], ele[2], i2]);
            });
          });

          sql
            .query(
              "spInsertExamEmployee",
              parametros({ idccms, contextLobTeam: 3, rows3 }, "spInsertExamEmployee")
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
                return await sendFCMMessage(userName, nameMissions[i], user.Token, "mission");
              });
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

// exports.postInactivateMission = async (req, res) => {
//   const { idccms, idMission } = req.body;
//   sql
//     .query("spInactivateExam", parametros({ idccms, idMission }, "spInactivateExam"))
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };

// exports.getMissionsCategories = async (req, res) => {
//   sql
//     .query("spQueryExamCategories", parametros({ idccms: req.body.idccms }, "spQueryExamCategories"))
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };

// exports.getMissionsAssignmentInfo = async (req, res) => {
//   const { idccms, context, caso } = req.body;

//   sql
//     .query("spQueryMissions", parametros({ idccms, context, caso }, "spQueryMissions"))
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };

// exports.getMissionsInformation = async (req, res) => {
//   const { idccms, idccmsAgent, idTeam, context } = req.body;

//   sql
//     .query(
//       "spQueryMissionsInformation",
//       parametros({ idccms, idccmsAgent, idTeam, context }, "spQueryMissionsInformation")
//     )
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };

// exports.inactivateMissionChallengeAgent = async (req, res) => {
//   const { idccms, idccmsAgent, idMissionChallenge, context } = req.body;

//   sql
//     .query(
//       "spInactivateMissionChallengeAgent",
//       parametros({ idccms, idccmsAgent, idMissionChallenge, context }, "spInactivateMissionChallengeAgent")
//     )
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };

// exports.getCampaignInfo = async (req, res) => {
//   const { idccms, context, idcampaign } = req.body;

//   sql
//     .query("spQueryCampaign", parametros({ idccms, context, idcampaign }, "spQueryCampaign"))
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };

exports.postUpdateCampaignInfo = async (req, res) => {
  const { idccms, data, idcampaign, emails, context, idLob = 0 } = req.body;
  let i = 0;

  if (context == 1) {
    let rowsOM = [[null, null, 0, 0, 0, 0, 0, null, 0, 0, 1]];

    let rows = data.map((quest) => {
      i = i + 1;
      return [...quest, i];
    });

    sql
      .query(
        "spUpdateCampaign",
        parametros({ idccms, idcampaign, context, idLob: 0, rowsSU: rows, rowsOM }, "spUpdateCampaign")
      )
      .then(async (result) => {
        await sendEmail(
          emails,
          "SpaceGP role assignment",
          "Notification SpaceGP",
          "noresponse@teleperformance.com"
        );
        responsep(1, req, res, result);
      })
      .catch((err) => {
        console.log(err, "sp");
        responsep(2, req, res, err);
      });
  } else if (context == 2) {
    let rowsSU = [[idccms, "null", "null", 0, 0, 0]];

    let rows = data.map((quest) => {
      i = i + 1;
      return [...quest, i];
    });

    sql
      .query(
        "spUpdateCampaign",
        parametros({ idccms, idcampaign, context, idLob, rowsSU, rowsOM: rows }, "spUpdateCampaign")
      )
      .then(async (result) => {
        await sendEmail(
          emails,
          "SpaceGP role assignment",
          "Notification SpaceGP",
          "noresponse@teleperformance.com"
        );
        responsep(1, req, res, result);
      })
      .catch((err) => {
        console.log(err, "sp");
        responsep(2, req, res, err);
      });
  }
};

exports.postInactivateUser = async (req, res) => {
  const {
    idccms, //idccms del segundo aprobador
    name, //nombre del segundo aprobador,
    role, //role del segundo aprobador
    idccmsUser, //usuario a desactivar
    roleUser, //Rol del usuario a desactivar
    nameUser, //Nombre del usuario a desactivar
    inactivate, //Estado de inactivacion
    nameRequester, //Nombre 1er aprobador
    roleRequester, //Rol 1er aprobador
    emailRequester, //Correo 1er aprobador
    fcmToken, //Token para notificar al segundo aprobador
  } = req.body;

  let fcmTokens = [fcmToken];

  let dataApprover = {
    name,
    role,
    inactivate,
  };

  let dataUser = {
    nameUser,
    roleUser,
  };

  let emails = [{ emailRequester, dataApprover, dataUser }];

  let fcmTokensFiltered = fcmTokens.filter((token) => token);

  sql
    .query("spInactivateAgent", parametros({ idccms, idccmsUser, inactivate }, "spInactivateAgent"))
    .then(async (result) => {
      if (!nameRequester) {
        await sendConfirmInactivationEmail(
          emails,
          "SpaceGP email",
          "Deactivation Notification SpaceGP",
          "noresponse@teleperformance.com"
        );
      } else {
        try {
          fcmTokensFiltered.forEach(async (token) => {
            return await sendFCMMessage(nameRequester, "Deactivation request", token, "Deactivation");
          });
        } catch (error) {
          res.status(500).json(error);
        }
      }
      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.postChangeUserRole = async (req, res) => {
  let i = 0;
  let campaignTable = [];
  let loadAgentTable = [];
  const { idccms, idccmsUser, oldRole, role, idTeam, nameTeam, idCampaign, context, emails } = req.body;

  if (role === "Cluster Director") {
    campaignTable = idCampaign.map((el) => {
      i = i + 1;
      return [el, i];
    });
  }

  if (role === "Agent") loadAgentTable = [["Q4", idUser, nameTeam, "Agent"]];

  // el oldRole deberia pedir que lo inserten en el email
  // Esto lo  hago porque se me pasó pedir que lo enviaran así
  emails[0].oldRole = oldRole;

  sql
    .query(
      "spUpdateRoleUser",
      parametros(
        {
          idccms,
          idccmsUser,
          role,
          idTeam,
          context,
          rows: role !== "Cluster Director" ? [[0, 0]] : campaignTable,
          rows2: role !== "Agent" ? [["Q4", 0, "0", "Agent"]] : loadAgentTable,
        },
        "spUpdateRoleUser"
      )
    )
    .then(async (result) => {
      await sendUserChangeRolEmail(
        emails,
        "SpaceGP new role assignment",
        "Change role Notification SpaceGP",
        "noresponse@teleperformance.com"
      );

      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

exports.postSendReaction = async (req, res) => {
  let notificationMessage;
  const { idccms, userName, typeReaction, idNotification, fcmToken } = req.body;

  switch (typeReaction) {
    case 1:
      notificationMessage = `${userName} has reacted to your recent achievement`;
      break;

    case 2:
      notificationMessage = `${userName} has reacted to your recent achievement`;
      break;

    case 3:
      notificationMessage = `${userName} has reacted to your recent achievement`;
      break;

    default:
      break;
  }

  sql
    .query(
      "spInsertReactions",
      parametros({ idccms, typeReaction, idNotification, notificationMessage }, "spInsertReactions")
    )
    .then(async (result) => {
      if (fcmToken) {
        await sendFCMMessage(userName, "Someone has reacted to you !", fcmToken, "reaction");
      }

      responsep(1, req, res, result);
    })
    .catch((err) => {
      console.log(err, "sp");
      responsep(2, req, res, err);
    });
};

// exports.getTeamAgentsInformation = async (req, res) => {
//   const { idccms, context, idccmsAgent } = req.body;

//   sql
//     .query("spQueryTeamInformation", parametros({ idccms, context, idccmsAgent }, "spQueryTeamInformation"))
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };

// exports.getAgentsCampignrl = async (req, res) => {
//   sql
//     .query("spQueryAgentsCampaign", parametros({ idccms: req.body.idccms }, "spQueryAgentsCampaign"))
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };
// exports.getUsersConnections = async (req, res) => {
//   // const { ident, DateIni, DateEnd, Context } = req.body;
//   const { idccms, initDate, endDate, context } = req.body;

//   sql
//     .query("spConnectionsPlayer", parametros({ idccms, initDate, endDate, context }, "spConnectionsPlayer"))
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };
// exports.getUsersTeamChanges = async (req, res) => {
//   const { idccms, initDate, endDate } = req.body;

//   sql
//     .query("spUserChangeTeam", parametros({ idccms, initDate, endDate }, "spUserChangeTeam"))
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };
// exports.getUsersTimeCompleteChallenges = async (req, res) => {
//   const { idccms, initDate, endDate } = req.body;

//   sql
//     .query("spTimeCompleteChallenges", parametros({ idccms, initDate, endDate }, "spTimeCompleteChallenges"))
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };
// exports.getMoreInteractiveUsers = async (req, res) => {
//   const { idccms, initDate, endDate, context } = req.body;

//   sql
//     .query("spUsersMostInteract", parametros({ idccms, initDate, endDate, context }, "spUsersMostInteract"))
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };
// exports.getTopUploaders = async (req, res) => {
//   const { idccms, initDate, endDate } = req.body;

//   sql
//     .query("spUserUploadsFiles", parametros({ idccms, initDate, endDate }, "spUserUploadsFiles"))
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };
// exports.getRolesInfo = async (req, res) => {
//   const { idccms, initDate, endDate, context } = req.body;

//   sql
//     .query("spUsersRole", parametros({ idccms, initDate, endDate, context }, "spUsersRole"))
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };
// exports.getPlatformAnalytics = async (req, res) => {
//   const { idccms, initDate, endDate, context, kpi } = req.body;

//   sql
//     .query("spQueryAnalitycs", parametros({ idccms, initDate, endDate, context, kpi }, "spQueryAnalitycs"))
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };

// exports.getGeneralAnalytics = async (req, res) => {
//   const { idccms, initDate, endDate } = req.body;

//   sql
//     .query("spQueryAnalitycsGeneral", parametros({ idccms, initDate, endDate }, "spQueryAnalitycsGeneral"))
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };

/****************** SPs actividades ******************/
// exports.welcomeegp = async (req, res) => {
//   sql
//     .query("spBgWelcomeEGP", parametros({ idccms: req.body.idccms }, "spBgWelcomeEGP"))
//     .then((result) => {
//       responsep(1, req, res, result);
//     })
//     .catch((err) => {
//       console.log(err, "sp");
//       responsep(2, req, res, err);
//     });
// };

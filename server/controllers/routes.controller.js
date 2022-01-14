const sql = require("./sql.controller");
const parametros = require("./params.controller").parametros;
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { decrypt } = require("./crypt.controller");
const multiparty = require("multiparty");

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
  
  sql
    .query(
      "spInsertTeam",
      parametros(
        { idccms: req.query.idccms, rows: req.body.data },
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

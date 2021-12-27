const sql = require("./sql.controller");
const parametros = require("./params.controller").parametros;
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { decrypt } = require("./crypt.controller");
const multiparty = require('multiparty');
const fs = require('fs')
let csvToJson = require('convert-csv-to-json');
const xlsx = require("xlsx");




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
      console.log(err, 'sp')
      responsep(2, req, res, err);
    });
}
// };

function isEmpty(req) {
  for (var key in req) {
    if (req.hasOwnProperty(key))
      return false;
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
      resolve('Enviado')
    } else if (tipo == 2) {
      console.log("Error at:", new Date(), "res: ", resultado);
      res.status(400).json(resultado);
      // reject('Paila')
    }
  });
};


exports.saveQuiz = async (req, res) =>  {
  
  let form = new multiparty.Form();

  form.parse(req, async function(err, fields, files) {
    // if(isNaN(fields.idccmsUser[0]) || isNaN(fields.idLob[0])){
    //   //req.body.error = "Datos de User y/o lob inválidos";
    //   //next();
    //   responsep(2, req, res, "Datos de User y/o lob inválidos");  
    // }else{

    const workbook = xlsx.readFile(files.file[0].path);
    const sheetNames = workbook.SheetNames;
    
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]],{header:1})

    // Removemos los headers para enviar a DB
    data.shift()
    let i = 0;

    let rows = data.map(person => {
      i=i+1;
      return ([
        ...person,
        i
      ]) 
    })

    sql
      .query('spInsertaExamen', parametros({rows},'spInsertaExamen'))
      .then((result) => {
        responsep(1, req, res, result);
      })
      .catch((err) => {
        console.log(err, 'sp')
        responsep(2, req, res, err);
      });
  })
}
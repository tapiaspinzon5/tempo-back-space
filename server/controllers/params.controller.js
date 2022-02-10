const TYPES = require("tedious").TYPES;
const moment = require("moment");

// let parametrizacion = (data) => {
//   console.log(data)
//   try {
//     let obj = {
//       table: [],
//     };
//     data.forEach((dato) => {
//       let nombre = dato.item;
//       let valor = dato.datos.valor;
//       let tipo = dato.datos.tipo;
//       console.log(nombre, valor, tipo)
//       if (tipo == "varchar") {
//         obj.table.push({ nombre: nombre, valor: valor, tipo: TYPES.VarChar });
//       } else if (tipo == "int") {
//         obj.table.push({ nombre: nombre, valor: valor, tipo: TYPES.Int });
//       } else if (tipo == "bit") {
//         obj.table.push({ nombre: nombre, valor: valor, tipo: TYPES.Bit });
//       } else if (tipo == "date") {
//         obj.table.push({ nombre: nombre, valor: valor, tipo: TYPES.Date });
//       } else if (tipo == "time") {
//         obj.table.push({ nombre: nombre, valor: valor, tipo: TYPES.Time });
//       } else if (tipo == "char") {
//         obj.table.push({ nombre: nombre, valor: valor, tipo: TYPES.Char });
//       } else if (tipo == "bigint") {
//         obj.table.push({ nombre: nombre, valor: valor, tipo: TYPES.BigInt });
//       }
//     });
//     return obj.table;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };

let parametrizacion = (data) => {
  try {
    return data.map(({ name, value, type, schema }) => ({
      nombre: name,
      valor: value,
      tipo: type,
    }));
  } catch (error) {
    console.error(error);
    return error;
  }
};

class SpParam {
  name;
  value;
  type;
  schema;

  constructor(name, value, type, schema = null) {
    this.name = name;
    this.value = value;
    this.type = type;
    this.schema = schema;
  }
}

let SpParamTable = (nameParam, colums, rows) => {
  try {
    let table;
    let obj = {
      table: [],
    };
    table = {
      columns: colums,
      rows: rows,
    };
    obj.table.push({ nombre: nameParam, valor: table, tipo: TYPES.TVP });

    return obj.table;
  } catch (error) {
    console.log(error, "Tipo Tabla");
    return error;
  }
};

// Esta funcion se armó con la finalidad de poder enviar parametros individuales y tablas en conjunto a un SP
let SpParamTable2 = (nameParam, colums, rows) => {
  try {
    let table;
    // let obj = {
    //   table: []
    // }
    table = {
      columns: colums,
      rows: rows,
    };
    return { name: nameParam, value: table, type: TYPES.TVP, schema: null };
    //  obj.table;
  } catch (error) {
    console.log(error, "Tipo Tabla");
    return error;
  }
};

// Columnas para armar la tabla del superusuario
let suTable = [
  { name: "Ident", type: TYPES.Int },
  { name: "TeamName", type: TYPES.VarChar },
  { name: "KPI", type: TYPES.VarChar },
  { name: "Campaign", type: TYPES.VarChar },
  { name: "Q1", type: TYPES.Int },
  { name: "Q2", type: TYPES.Int },
  { name: "Q3", type: TYPES.Int },
  { name: "Q4", type: TYPES.Int },
];

// Columnas para armar la tabla del operationManager
let opsmTable = [
  { name: "Ident", type: TYPES.Int },
  { name: "RoleAgent", type: TYPES.VarChar },
  { name: "Team", type: TYPES.VarChar },
  { name: "Lob", type: TYPES.VarChar },
];

// Columnas para armar la tabla del reportingLead
let reportLeadTable = [
  { name: "Quartile", type: TYPES.VarChar },
  { name: "Ident", type: TYPES.Int },
  { name: "Team", type: TYPES.VarChar },
  { name: "RoleAgent", type: TYPES.VarChar },
];

// Columnas para armar la tabla del QAleader (quizes)
let quizTable = [
  { name: "Question", type: TYPES.VarChar },
  { name: "Option1", type: TYPES.VarChar },
  { name: "Option2", type: TYPES.VarChar },
  { name: "Option3", type: TYPES.VarChar },
  { name: "Option4", type: TYPES.VarChar },
  { name: "Answer", type: TYPES.VarChar },
  { name: "Quartile", type: TYPES.VarChar },
  { name: "ExamName", type: TYPES.VarChar },
  { name: "DescriptionExam", type: TYPES.VarChar },
  { name: "ApprovalExam", type: TYPES.Int },
  { name: "IdPregunta", type: TYPES.Int },
];

// Columnas para armar la tabla de respuestas del usuario.
let quizResults = [
  { name: "Respuesta", type: TYPES.VarChar },
  { name: "IdPregunta", type: TYPES.Int },
];

// Columnas para armar la tabla del reportingLead
let assignActivitiesTLTable = [
  { name: "Ident", type: TYPES.Int },
  { name: "idChallenge", type: TYPES.Int },
  { name: "idRegistry", type: TYPES.Int },
];

exports.parametros = (req, tipo) => {
  switch (tipo) {
    case "spInsertCentral":
      console.log(
        parametrizacion([
          new SpParam("central", req.id, TYPES.VarChar),
          new SpParam("mercado", req.id, TYPES.VarChar),
          new SpParam("pais", req.id, TYPES.VarChar),
        ]),
        "ddddddddddd"
      );
      return parametrizacion([
        new SpParam("central", req.id, TYPES.VarChar),
        new SpParam("mercado", req.id, TYPES.VarChar),
        new SpParam("pais", req.id, TYPES.VarChar),
      ]);
    case "spUpdateCentral":
      return parametrizacion([
        new SpParam("id", req.id, TYPES.Int),
        new SpParam("central", req.id, TYPES.VarChar),
        new SpParam("mercado", req.id, TYPES.VarChar),
        new SpParam("pais", req.id, TYPES.VarChar),
      ]);
    case "spDeleteCentral":
      return parametrizacion([new SpParam("id", req.id, TYPES.VarChar)]);
    case "spConsultaDetalleExamen":
      return parametrizacion([new SpParam("Examen", req.Examen, TYPES.Int)]);
    case "spQueryRoleEmployee":
      return parametrizacion([new SpParam("ident", req.idccms, TYPES.Int)]);
    case "spQueryExamEmployee":
      return parametrizacion([new SpParam("ident", req.idccms, TYPES.Int)]);
    case "spQueryExamDetail":
      return parametrizacion([
        new SpParam("ident", req.idccms, TYPES.Int),
        new SpParam("Examen", req.idQuiz, TYPES.Int),
      ]);

    case "spInsertExamResult":
      return parametrizacion([
        new SpParam("ident", req.idccms, TYPES.Int),
        new SpParam("Examen", req.idQuiz, TYPES.Int),
        SpParamTable2("table", quizResults, req.rows),
      ]);

    case "spLoadExamQA":
      return parametrizacion([new SpParam("ident", req.idccms, TYPES.Int)]);

    case "spQueryTeams":
      return parametrizacion([new SpParam("ident", req.idccms, TYPES.Int)]);
    case "spQueryDashBoarhAgent":
      return parametrizacion([new SpParam("ident", req.idccms, TYPES.Int)]);
    case "spInsertExam":
      return parametrizacion([
        new SpParam("ident", req.idccms, TYPES.Int),
        SpParamTable2("table", quizTable, req.rows),
      ]);
    case "spInsertTeam":
      return parametrizacion([
        new SpParam("ident", req.idccms, TYPES.Int),
        SpParamTable2("table", suTable, req.rows),
      ]);
    case "spInsertOrganizationalUnit":
      return parametrizacion([
        new SpParam("ident", req.idccms, TYPES.Int),
        SpParamTable2("table", opsmTable, req.rows),
      ]);
    case "spInsertEmployee":
      return parametrizacion([
        new SpParam("ident", req.idccms, TYPES.Int),
        SpParamTable2("table", reportLeadTable, req.rows),
      ]);

    case "spQueryActivities":
      return parametrizacion([
        new SpParam("case", req.context, TYPES.Int),
        new SpParam("ident", req.idccms, TYPES.Int),
      ]);

    case "spQueryLoadInstructions":
      return parametrizacion([new SpParam("ident", req.idccms, TYPES.Int)]);

    case "spQueryLoadTemplate":
      return parametrizacion([
        new SpParam("case", req.caso, TYPES.Int),
        new SpParam("ident", req.idccms, TYPES.Int),
      ]);

    case "spInsertChallengeAgent":
      return parametrizacion([
        new SpParam("identAssignmen", req.idccms, TYPES.Int),
        SpParamTable2("table", assignActivitiesTLTable, req.rows),
      ]);

    case "spQueryTeamsAgents":
      return parametrizacion([new SpParam("ident", req.idccms, TYPES.Int)]);

    case "spQueryActivitiesAgent":
      return parametrizacion([
        new SpParam("case", req.context, TYPES.Int),
        new SpParam("ident", req.idccms, TYPES.Int),
      ]);

    case "spInsertToken":
      return parametrizacion([
        new SpParam("Token", req.fcmNotification, TYPES.VarChar),
        new SpParam("ident", req.idccms, TYPES.Int),
      ]);

    case "spQueryDescriptionActivitiesAgent":
      return parametrizacion([
        new SpParam("idActivity", req.idActivity, TYPES.Int),
        new SpParam("ident", req.idccms, TYPES.Int),
        new SpParam("case", req.context, TYPES.Int),
      ]);

    case "spQueryNotifications":
      return parametrizacion([
        new SpParam("ident", req.idccms, TYPES.Int),
        new SpParam("Case", req.context, TYPES.Int),
        new SpParam("IdNotificationMin", req.min, TYPES.Int),
        new SpParam("IdNotificationMax", req.max, TYPES.Int),
      ]);
    
    case "spAddJumpRegister":
      return SpParamTable("jumpTable", JumpEmployee, req.rows);

    case "spQueryActivitiesAgent":
      return parametrizacion([
        new SpParam("case", req.context, TYPES.Int),
        new SpParam("ident", req.idccms, TYPES.Int),
      ]);

    case "spQueryKpiTeam":
      return parametrizacion([new SpParam("ident", req.idccms, TYPES.Int)]);
    
    case "spQueryKpiTeamAgent":
      return parametrizacion([
        new SpParam("idKpi", req.idKpi, TYPES.Int),
        new SpParam("ident", req.idccms, TYPES.Int),
      ]);

<<<<<<< HEAD
    //TODO: Borrar para despues
=======
    case "spChangeStatusNotifications":
      return parametrizacion([
        new SpParam("ident", req.idccms, TYPES.Int),
        new SpParam("IdNotificationMin", req.idNotificationMin, TYPES.Int),
        new SpParam("IdNotificationMax", req.idNotificationMax, TYPES.Int),
      ]);

    case "spBgWelcomeEGP":
      return parametrizacion([new SpParam("ident", req.idccms, TYPES.Int)]);

    //TODO: Borrar para despues 
>>>>>>> 33a33cbc27080a82cd68081835c4575d89cd8416
    case "spChangeRoleAgent":
      return parametrizacion([
        new SpParam("Role", req.RoleAgent, TYPES.VarChar),
        new SpParam("ident", req.idccms, TYPES.Int),
      ]);

    default:
      return null;
  }
  // var size = Object.keys(req.body).length;
  // if (size == 0) {
  //   return [];
  // }
};

let parame = (data) => {
  try {
    let obj = {
      table: [],
    };
    data.forEach((dato) => {
      let nombre = dato.item;
      let valor = dato.datos.valor;
      let tipo = dato.datos.tipo;
      let schema = dato.datos.schema || null;
      if (tipo == "table") {
        obj.table.push({
          nombre: nombre,
          valor: schemaRows(schema, valor),
          tipo: TYPES.TVP,
        });
      }
    });
    return obj.table;
  } catch (error) {
    console.log(error);
    return error;
  }
};

let schemaRows = (schema, valor) => {
  let c = [];
  if (schema == "JumpEmployee") {
    c = valor;
  }
  let table;
  if (schema == "JumpEmployee") {
    table = {
      columns: [
        { name: "idccms", type: TYPES.Int },
        { name: "jumpRole", type: TYPES.VarChar },
        { name: "site", type: TYPES.Int },
        { name: "market", type: TYPES.Int },
        { name: "workingDay", type: TYPES.VarChar },
        { name: "phone", type: TYPES.BigInt },
        { name: "email", type: TYPES.VarChar },
        { name: "jumpCertificate", type: TYPES.VarChar },
        { name: "certificateType", type: TYPES.VarChar },
        { name: "currentStudy", type: TYPES.VarChar },
        { name: "studyDay", type: TYPES.VarChar },
        { name: "notEndedStudies", type: TYPES.VarChar },
        { name: "semesterEnded", type: TYPES.VarChar },
        { name: "Endedstudies", type: TYPES.VarChar },
        { name: "title", type: TYPES.VarChar },
        { name: "levelEnglish", type: TYPES.Int },
        { name: "levelSQL", type: TYPES.Int },
        { name: "levelExcel", type: TYPES.Int },
      ],
      rows: c,
    };
  }

  console.log(table, "ssssssssss");
  return table;
};

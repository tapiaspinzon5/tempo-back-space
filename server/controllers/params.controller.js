const TYPES = require("tedious").TYPES;

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
    obj.table.push({
      nombre: nameParam,
      valor: table,
      tipo: TYPES.TVP,
    });

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
    return {
      name: nameParam,
      value: table,
      type: TYPES.TVP,
      schema: null,
    };
    //  obj.table;
  } catch (error) {
    console.log(error, "Tipo Tabla");
    return error;
  }
};

// Columnas para armar la tabla del superusuario
let suTable = [
  {
    name: "Ident",
    type: TYPES.Int,
  },
  {
    name: "TeamName",
    type: TYPES.VarChar,
  },
  {
    name: "KPI",
    type: TYPES.VarChar,
  },
  {
    name: "Campaign",
    type: TYPES.VarChar,
  },
  {
    name: "Q1",
    type: TYPES.Float,
  },
  {
    name: "Q2",
    type: TYPES.Float,
  },
  {
    name: "Q3",
    type: TYPES.Float,
  },
  {
    name: "Q4",
    type: TYPES.Float,
  },
  {
    name: "Target",
    type: TYPES.Float,
  },
  {
    name: "OrderKpi",
    type: TYPES.VarChar,
  },
  {
    name: "IdRegistryKpi",
    type: TYPES.Int,
  },
];

let suTable2 = [
  {
    name: "IdentPM",
    type: TYPES.Int,
  },
  {
    name: "Campaign",
    type: TYPES.VarChar,
  },
  {
    name: "KPI",
    type: TYPES.VarChar,
  },
  {
    name: "Q1",
    type: TYPES.Float,
  },
  {
    name: "Q2",
    type: TYPES.Float,
  },
  {
    name: "Q3",
    type: TYPES.Float,
  },
  {
    name: "Q4",
    type: TYPES.Float,
  },
  {
    name: "CriticalPoint",
    type: TYPES.Float,
  },
  {
    name: "OrderKpi",
    type: TYPES.VarChar,
  },
  {
    name: "typeLoad",
    type: TYPES.Bit,
  },
  {
    name: "idKpiMD",
    type: TYPES.Int,
  },
  {
    name: "IdRegistryKpi",
    type: TYPES.Int,
  },
];

// Columnas para armar la tabla del operationManager
let opsmTable = [
  {
    name: "Ident",
    type: TYPES.Int,
  },
  {
    name: "RoleAgent",
    type: TYPES.VarChar,
  },
  {
    name: "Team",
    type: TYPES.VarChar,
  },
  {
    name: "Lob",
    type: TYPES.VarChar,
  },
];

// Columnas para armar la tabla del reportingLead
let reportLeadTable = [
  {
    name: "Quartile",
    type: TYPES.VarChar,
  },
  {
    name: "Ident",
    type: TYPES.Int,
  },
  {
    name: "Team",
    type: TYPES.VarChar,
  },
  {
    name: "RoleAgent",
    type: TYPES.VarChar,
  },
];

// Columnas para armar la tabla del QAleader (quizes)
let quizTable = [
  {
    name: "Question",
    type: TYPES.VarChar,
  },
  {
    name: "Option1",
    type: TYPES.VarChar,
  },
  {
    name: "Option2",
    type: TYPES.VarChar,
  },
  {
    name: "Option3",
    type: TYPES.VarChar,
  },
  {
    name: "Option4",
    type: TYPES.VarChar,
  },
  {
    name: "Answer",
    type: TYPES.VarChar,
  },
  {
    name: "Quartile",
    type: TYPES.VarChar,
  },
  {
    name: "ExamName",
    type: TYPES.VarChar,
  },
  {
    name: "DescriptionExam",
    type: TYPES.VarChar,
  },
  {
    name: "ApprovalExam",
    type: TYPES.Int,
  },
  {
    name: "Topic",
    type: TYPES.VarChar,
  },
  {
    name: "IdPregunta",
    type: TYPES.Int,
  },
];

// Columnas para armar la tabla de respuestas del usuario.
let quizResults = [
  {
    name: "Respuesta",
    type: TYPES.VarChar,
  },
  {
    name: "IdPregunta",
    type: TYPES.Int,
  },
];

// Columnas para armar la tabla de respuestas del usuario.
let kpiReports = [
  {
    name: "Kpi",
    type: TYPES.VarChar,
  },
  {
    name: "unitKpi",
    type: TYPES.VarChar,
  },
  {
    name: "Type",
    type: TYPES.Int,
  },
  {
    name: "Idccms",
    type: TYPES.Int,
  },
  {
    name: "Date",
    type: TYPES.VarChar,
  },
  {
    name: "Score",
    type: TYPES.Float,
  },
];

// Columnas para armar la tabla del reportingLead
let assignActivitiesTLTable = [
  {
    name: "Ident",
    type: TYPES.Int,
  },
  {
    name: "idChallenge",
    type: TYPES.Int,
  },
  {
    name: "idRegistry",
    type: TYPES.Int,
  },
];

let tlIdccmsArray = [
  {
    name: "identTL",
    type: TYPES.Int,
  },
];

let assignMissionsQATable = [
  {
    name: "Ident",
    type: TYPES.Int,
  },
  {
    name: "idMission",
    type: TYPES.Int,
  },
  {
    name: "dateIni",
    type: TYPES.DateTime,
  },
  {
    name: "dateEnd",
    type: TYPES.DateTime,
  },
  {
    name: "idRegistry",
    type: TYPES.Int,
  },
];

let idLobTeamTable = [
  {
    name: "idTeamLob",
    type: TYPES.Int,
  },
  {
    name: "idRegistry",
    type: TYPES.Int,
  },
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
        new SpParam("idccms", req.idLeader, TYPES.Int),
        new SpParam("context", req.context, TYPES.Int),
        new SpParam("case", req.cas, TYPES.Int),
        // SpParamTable2("table", opsmTable, req.rows),
      ]);
    case "spInsertEmployee":
      return parametrizacion([
        new SpParam("ident", req.idccms, TYPES.Int),
        SpParamTable2("table", reportLeadTable, req.rows),
      ]);

    case "spQueryActivities":
      return parametrizacion([
        new SpParam("ident", req.idccms, TYPES.Int),
        new SpParam("idccms", req.idccmsAssigned, TYPES.Int),
        new SpParam("Context", req.context, TYPES.Int),
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
      return parametrizacion([
        new SpParam("ident", req.idccms, TYPES.Int),
        new SpParam("context", req.context, TYPES.Int),
        new SpParam("IdChallenge", req.idChallenge, TYPES.Int),
      ]);

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

    case "spQueryKpiTeam":
      return parametrizacion([new SpParam("ident", req.idccms, TYPES.Int)]);

    case "spQueryKpiTeamAgent":
      return parametrizacion([
        new SpParam("idKpi", req.idKpi, TYPES.Int),
        new SpParam("ident", req.idccms, TYPES.Int),
        new SpParam("Time", req.time, TYPES.VarChar),
        new SpParam("idccms", req.agentIdccms, TYPES.Int),
        new SpParam("Case", req.context, TYPES.Int),
      ]);

    case "spChangeStatusNotifications":
      return parametrizacion([
        new SpParam("ident", req.idccms, TYPES.Int),
        new SpParam("IdNotificationMin", req.idNotificationMin, TYPES.Int),
        new SpParam("IdNotificationMax", req.idNotificationMax, TYPES.Int),
      ]);

    case "spQueryLeaderBoard":
      return parametrizacion([
        new SpParam("case", req.context, TYPES.Int),
        new SpParam("ident", req.idccms, TYPES.Int),
        new SpParam("Kpi", req.kpi, TYPES.VarChar),
        new SpParam("Time", req.time, TYPES.VarChar),
        new SpParam("Group", req.group, TYPES.VarChar),
      ]);

    case "spProfileAgent":
      return parametrizacion([new SpParam("ident", req.idccms, TYPES.Int)]);

    case "spQueryAgents":
      return parametrizacion([
        new SpParam("ident", req.idccmsAgent, TYPES.Int),
        new SpParam("context", req.context, TYPES.Int),
      ]);

    case "spInsertExamEmployee":
      return parametrizacion([
        new SpParam("ident", req.idccms, TYPES.Int),
        new SpParam("context", req.contextLobTeam, TYPES.Int),
        SpParamTable2("table", assignMissionsQATable, req.rows3),
      ]);

    case "spQueryLobTeams":
      return parametrizacion([
        new SpParam("ident", req.idccms, TYPES.Int),
        new SpParam("IdLob", req.idLob, TYPES.Int),
        new SpParam("Context", req.context, TYPES.Int),
      ]);

    case "spQueryAnalitycsKpi":
      return parametrizacion([new SpParam("ident", req.idccms, TYPES.Int)]);

    case "spQueryAnalitycsExp":
      return parametrizacion([new SpParam("ident", req.idccms, TYPES.Int)]);

    case "spQueryDasboardTeamLeader":
      return parametrizacion([new SpParam("ident", req.idccms, TYPES.Int)]);

    case "spInsertTpvs":
      return parametrizacion([
        new SpParam("idTpv", req.idTpv, TYPES.Int),
        new SpParam("idAssignmentUser", req.idccms, TYPES.Int),
        new SpParam("ident", req.idccmsAssigned, TYPES.Int),
      ]);

    case "spQueryDashboardKPI":
      return parametrizacion([
        new SpParam("ident", req.idccms, TYPES.Int),
        new SpParam("Case", req.context, TYPES.Int),
      ]);

    case "spInsertKpi":
      return parametrizacion([
        new SpParam("ident", req.idccms, TYPES.Int),
        SpParamTable2("table", kpiReports, req.rows),
      ]);

    case "spQueryListKpi":
      return parametrizacion([new SpParam("ident", req.idccms, TYPES.Int)]);

    case "spInsertChallenge":
      return parametrizacion([
        new SpParam("ident", req.idccms, TYPES.Int),
        new SpParam("action", req.body.action, TYPES.VarChar),
        new SpParam("kpi", req.body.kpi, TYPES.VarChar),
        new SpParam("quantity", req.body.quantity, TYPES.Int),
        new SpParam("measureUnit", req.body.measureUnit, TYPES.VarChar),
        new SpParam("initialDate", req.body.initialDate, TYPES.Date),
        new SpParam("finalDate", req.body.finalDate, TYPES.Date),
      ]);

    case "spInactivateAgent":
      return parametrizacion([
        new SpParam("ident", req.idccmsAgent, TYPES.Int),
        new SpParam("identassignement", req.idccms, TYPES.Int),
      ]);

    case "spQueryLeaderBoardRL":
      return parametrizacion([
        new SpParam("case", req.context, TYPES.Int),
        new SpParam("ident", req.idccms, TYPES.Int),
        new SpParam("Kpi", req.kpi, TYPES.VarChar),
        new SpParam("Time", req.time, TYPES.VarChar),
      ]);

    case "spInsertCampaign":
      return parametrizacion([
        new SpParam("ident", req.idccms, TYPES.VarChar),
        SpParamTable2("table", suTable2, req.rows),
      ]);

    case "spInsertLob":
      return parametrizacion([
        new SpParam("ident", req.idccms, TYPES.Int),
        new SpParam("NameLob", req.lobName, TYPES.VarChar),
        new SpParam("Context", req.context, TYPES.Int),
        new SpParam("idlob", req.idlob, TYPES.Int),
        SpParamTable2("table", tlIdccmsArray, req.tlIdccms),
      ]);

    case "spQueryManagementOP":
      return parametrizacion([new SpParam("ident", req.idccms, TYPES.Int)]);

    case "spQueryExamCategories":
      return parametrizacion([new SpParam("ident", req.idccms, TYPES.Int)]);

    case "spInsertExamCategory":
      return parametrizacion([
        new SpParam("ident", req.idccms, TYPES.Int),
        new SpParam("Context", req.context, TYPES.Int),
        new SpParam("idCategory", req.idCategory, TYPES.Int),
        new SpParam("NameCategory", req.nameCategory, TYPES.VarChar),
      ]);

    case "spInactivateExam":
      return parametrizacion([
        new SpParam("ident", req.idccms, TYPES.Int),
        new SpParam("idExamen", req.idMission, TYPES.Int),
      ]);

    case "spQueryMissions":
      return parametrizacion([
        new SpParam("ident", req.idccms, TYPES.Int),
        new SpParam("context", req.context, TYPES.Int),
        new SpParam("case", req.caso, TYPES.Int),
      ]);

    case "spQueryMissionsDetail":
      return parametrizacion([
        new SpParam("ident", req.idccms, TYPES.Int),
        new SpParam("context", req.contextLobTeam, TYPES.Int),
        SpParamTable2("table", idLobTeamTable, req.rows),
      ]);

    case "spQueryMissionsInformation":
      return parametrizacion([
        new SpParam("ident", req.idccms, TYPES.Int),
        new SpParam("idccms", req.idccmsAgent, TYPES.Int),
        new SpParam("IdTeam", req.idTeam, TYPES.Int),
        new SpParam("Context", req.context, TYPES.Int),
      ]);

    case "spInactivateMissionChallengeAgent":
      return parametrizacion([
        new SpParam("ident", req.idccms, TYPES.Int),
        new SpParam("idccms", req.idccmsAgent, TYPES.Int),
        new SpParam("idmisionChallenge", req.idMissionChallenge, TYPES.Int),
        new SpParam("Context", req.context, TYPES.Int),
      ]);

    case "spQueryCampaign":
      return parametrizacion([
        new SpParam("ident", req.idccms, TYPES.Int),
        new SpParam("context", req.context, TYPES.Int),
        new SpParam("idcampaign", req.idcampaign, TYPES.Int),
      ]);

    case "spUpdateCampaign":
      return parametrizacion([
        new SpParam("ident", req.idccms, TYPES.Int),
        new SpParam("idcampaign", req.idcampaign, TYPES.Int),
        SpParamTable2("table", suTable2, req.rows),
      ]);

    case "spUpdateNameTeam":
      return parametrizacion([
        new SpParam("ident", req.idccms, TYPES.Int),
        new SpParam("idTeam", req.idTeam, TYPES.Int),
        new SpParam("NameTeam", req.newTeamName, TYPES.VarChar),
      ]);

    case "spQueryKpiMD":
      return parametrizacion([
        new SpParam("ident", req.idccms, TYPES.Int),
        new SpParam("kpi", req.kpi, TYPES.VarChar),
      ]);

    case "spQueryTeamInformation":
      return parametrizacion([
        new SpParam("ident", req.idccms, TYPES.Int),
        new SpParam("context", req.context, TYPES.VarChar),
        new SpParam("idccms", req.idccmsAgent, TYPES.VarChar),
      ]);

    case "spQueryAgentsCampaign":
      return parametrizacion([new SpParam("ident", req.idccms, TYPES.Int)]);

    // Casos de Actividades
    case "spBgWelcomeEGP":
      return parametrizacion([new SpParam("ident", req.idccms, TYPES.Int)]);

    //TODO: Borrar para despues

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
        {
          name: "idccms",
          type: TYPES.Int,
        },
        {
          name: "jumpRole",
          type: TYPES.VarChar,
        },
        {
          name: "site",
          type: TYPES.Int,
        },
        {
          name: "market",
          type: TYPES.Int,
        },
        {
          name: "workingDay",
          type: TYPES.VarChar,
        },
        {
          name: "phone",
          type: TYPES.BigInt,
        },
        {
          name: "email",
          type: TYPES.VarChar,
        },
        {
          name: "jumpCertificate",
          type: TYPES.VarChar,
        },
        {
          name: "certificateType",
          type: TYPES.VarChar,
        },
        {
          name: "currentStudy",
          type: TYPES.VarChar,
        },
        {
          name: "studyDay",
          type: TYPES.VarChar,
        },
        {
          name: "notEndedStudies",
          type: TYPES.VarChar,
        },
        {
          name: "semesterEnded",
          type: TYPES.VarChar,
        },
        {
          name: "Endedstudies",
          type: TYPES.VarChar,
        },
        {
          name: "title",
          type: TYPES.VarChar,
        },
        {
          name: "levelEnglish",
          type: TYPES.Int,
        },
        {
          name: "levelSQL",
          type: TYPES.Int,
        },
        {
          name: "levelExcel",
          type: TYPES.Int,
        },
      ],
      rows: c,
    };
  }

  console.log(table, "ssssssssss");
  return table;
};

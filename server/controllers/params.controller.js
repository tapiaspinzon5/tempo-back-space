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



let = parametrizacion = (data) => {
  try {
    return data.map(({ name, value, type, schema }) => ({ nombre: name, valor: value, tipo: type }));
  } catch (error) {
    console.error(error);
    return error;
  }
}

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

let = SpParamTable = (nameParam, colums, rows) => {
  try {
    let table;
    let obj = {
      table: []
    }
    table = {
      columns: colums,
      rows: rows
    };
    obj.table.push({ nombre: nameParam, valor: table, tipo: TYPES.TVP })

    return obj.table;
  } catch (error) {
    console.log(error, 'Tipo Tabla');
    return error
  }




}

let JumpEmployee = [
  { name: 'idccms', type: TYPES.Int },
  { name: 'jumpRole', type: TYPES.VarChar },
  { name: 'site', type: TYPES.Int },
  { name: 'market', type: TYPES.Int },
  { name: 'workingDay', type: TYPES.VarChar },
  { name: 'phone', type: TYPES.BigInt },
  { name: 'email', type: TYPES.VarChar },
  { name: 'jumpCertificate', type: TYPES.VarChar },
  { name: 'certificateType', type: TYPES.VarChar },
  { name: 'currentStudy', type: TYPES.VarChar },
  { name: 'studyDay', type: TYPES.VarChar },
  { name: 'notEndedStudies', type: TYPES.VarChar },
  { name: 'semesterEnded', type: TYPES.VarChar },
  { name: 'Endedstudies', type: TYPES.VarChar },
  { name: 'title', type: TYPES.VarChar },
  { name: 'levelEnglish', type: TYPES.Int },
  { name: 'levelSQL', type: TYPES.Int },
  { name: 'levelExcel', type: TYPES.Int },
]



exports.parametros = (req, tipo) => {
  switch (tipo) {
    case "spInsertCentral":
      console.log(parametrizacion([
        new SpParam('central', req.id, TYPES.VarChar),
        new SpParam('mercado', req.id, TYPES.VarChar),
        new SpParam('pais', req.id, TYPES.VarChar),
      ]), 'ddddddddddd')
      return parametrizacion([
        new SpParam('central', req.id, TYPES.VarChar),
        new SpParam('mercado', req.id, TYPES.VarChar),
        new SpParam('pais', req.id, TYPES.VarChar),
      ]);
    case "spUpdateCentral":
      return parametrizacion([
        new SpParam('id', req.id, TYPES.Int),
        new SpParam('central', req.id, TYPES.VarChar),
        new SpParam('mercado', req.id, TYPES.VarChar),
        new SpParam('pais', req.id, TYPES.VarChar),
      ]);
    case "spDeleteCentral":
      return parametrizacion([
        new SpParam('id', req.id, TYPES.VarChar),
      ]);
    case "ConsultaDetalleExamen":
      return parametrizacion([
        new SpParam('Examen', req.Examen, TYPES.Int),
      ]);
    case "spAddJumpRegister":
      return SpParamTable('jumpTable', JumpEmployee, req.rows);
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
      table: []
    }
    data.forEach(dato => {
      let nombre = dato.item
      let valor = dato.datos.valor
      let tipo = dato.datos.tipo
      let schema = dato.datos.schema || null
      if (tipo == 'table') {
        obj.table.push({ nombre: nombre, valor: (schemaRows(schema, valor)), tipo: TYPES.TVP })
      }
    })
    return obj.table
  } catch (error) {
    console.log(error)
    return error
  }
}


let schemaRows = (schema, valor) => {

  let c = [];
  if (schema == 'JumpEmployee') {
    c = valor;
  }
  let table;
  if (schema == 'JumpEmployee') {
    table = {
      columns: [
        { name: 'idccms', type: TYPES.Int },
        { name: 'jumpRole', type: TYPES.VarChar },
        { name: 'site', type: TYPES.Int },
        { name: 'market', type: TYPES.Int },
        { name: 'workingDay', type: TYPES.VarChar },
        { name: 'phone', type: TYPES.BigInt },
        { name: 'email', type: TYPES.VarChar },
        { name: 'jumpCertificate', type: TYPES.VarChar },
        { name: 'certificateType', type: TYPES.VarChar },
        { name: 'currentStudy', type: TYPES.VarChar },
        { name: 'studyDay', type: TYPES.VarChar },
        { name: 'notEndedStudies', type: TYPES.VarChar },
        { name: 'semesterEnded', type: TYPES.VarChar },
        { name: 'Endedstudies', type: TYPES.VarChar },
        { name: 'title', type: TYPES.VarChar },
        { name: 'levelEnglish', type: TYPES.Int },
        { name: 'levelSQL', type: TYPES.Int },
        { name: 'levelExcel', type: TYPES.Int },
      ],
      rows: c
    };
  }

  console.log(table, 'ssssssssss')
  return table
}

//Validar Header carga de quiz
export const validateHeaders = (headers) => {
  let differentsArrays = false;

  let defaultHeaders = [
    "Pregunta",
    "Respuesta1",
    "Respuesta2",
    "Respuesta3",
    "Respuesta4",
    "Puntuacion",
    "Respuesta Correcta",
    "Quartil",
  ];

  if (headers.length !== defaultHeaders.length) {
    console.log("Las columnas no coinciden");
    differentsArrays = true;
    return differentsArrays;
  }

  for (let i = 0; i < defaultHeaders.length; i++) {
    if (defaultHeaders[i] != headers[i]) {
      console.log(`${defaultHeaders[i]} es diferente a ${headers[i]}`);
      differentsArrays = true;
      break;
    }
  }

  return differentsArrays;
};

//Validacion de campos carga de quiz

export const validateFields = (data) => {
  let errorField = false;
  let quartiles = ["Q1", "Q2", "Q3", "Q4"];

  data.forEach((col) => {
    let answers = [col[1], col[2], col[3], col[4]];

    if (col[0] === undefined) {
      errorField = true;
    } else if (col[1] === undefined) {
      errorField = true;
    } else if (col[2] === undefined) {
      errorField = true;
      // } else if (col[3] === undefined ){
      // errorField = true;
      // } else if (col[4] === undefined){
      // errorField = true;
    } else if (isNaN(col[5])) {
      errorField = true;
    } else if (!answers.includes(col[6])) {
      errorField = true;
    } else if (!quartiles.includes(col[7])) {
      errorField = true;
    }
  });

  return errorField;
};

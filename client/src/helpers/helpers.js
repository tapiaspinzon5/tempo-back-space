//Validar Header carga de quiz

export const validateHeaders = (headers) => {
  let differentsArrays = false;

  let defaultHeaders = [
    "Question",
    "Option1",
    "Option2",
    "Option3",
    "Option4",
    "Answer",
    "Quartile",
    "ExamName",
    "DescriptionExam",
    "ApprovalExam",
  ];

  if (headers.length !== defaultHeaders.length) {
    differentsArrays = true;
    return differentsArrays;
  }

  for (let i = 0; i < defaultHeaders.length; i++) {
    if (defaultHeaders[i] !== headers[i]) {
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
    } else if (!answers.includes(col[5])) {
      errorField = true;
    } else if (!quartiles.includes(col[6])) {
      errorField = true;
    } else if (col[7] === undefined) {
      errorField = true;
    } else if (col[8] === undefined) {
      errorField = true;
    } else if (isNaN(col[9])) {
      errorField = true;
    }
  });

  return errorField;
};

//Helper Validacion Headers carga archivos SuperUser creacion de equipos

export const validateHeadersCreateTeam = (headers) => {
  let differentsArrays = false;

  let defaultHeaders = [
    "Ident",
    "TeamName",
    "KPI",
    "Campaign",
    "Q1",
    "Q2",
    "Q3",
    "Q4",
  ];

  if (headers.length !== defaultHeaders.length) {
    return;
  }

  for (let i = 0; i < defaultHeaders.length; i++) {
    if (defaultHeaders[i] !== headers[i]) {
      differentsArrays = true;
      break;
    }
  }

  return differentsArrays;
};

//Helper Validacion Campos carga archivos SuperUser creacion de equipos
export const validateFieldsCreateTeams = (data) => {
  let errorField = false;

  data.forEach((col) => {
    if (col[0] === undefined || isNaN(col[0])) {
      errorField = true;
    } else if (col[1] === undefined) {
      errorField = true;
    } else if (col[2] === undefined) {
      errorField = true;
    } else if (col[3] === undefined) {
      errorField = true;
    } else if (col[4] === undefined || isNaN(col[4])) {
      errorField = true;
    } else if (col[5] === undefined || isNaN(col[5])) {
      errorField = true;
    } else if (col[6] === undefined || isNaN(col[6])) {
      errorField = true;
    } else if (col[7] === undefined || isNaN(col[7])) {
      errorField = true;
    }
  });

  return errorField;
};

//Helper Validacion carga archivos Operation Manager
export const validateHeadersTeamOM = (headers) => {
  let differentsArrays = false;

  let defaultHeaders = ["Ident", "RoleAgent", "Team", "Lob"];

  if (headers.length !== defaultHeaders.length) {
    return;
  }

  for (let i = 0; i < defaultHeaders.length; i++) {
    if (defaultHeaders[i] !== headers[i]) {
      differentsArrays = true;
      break;
    }
  }

  return differentsArrays;
};

export const validateFieldsTeamOM = (data) => {
  let roles = ["Team Leader", "Reporting Lead", "QA Lead"];

  let errorField = false;

  data.forEach((col) => {
    if (col[0] === undefined || isNaN(col[0])) {
      errorField = true;
    } else if (col[1] === undefined || !roles.includes(col[1])) {
      errorField = true;
    } else if (col[2] === undefined) {
      errorField = true;
    } else if (col[3] === undefined) {
      errorField = true;
    }
  });

  return errorField;
};

//Helper Validacion carga archivos Reporting Lead
export const validateHeadersProvideUsersRL = (headers) => {
  let differentsArrays = false;

  let defaultHeaders = ["Quartile", "Ident", "Team", "RoleAgent"];

  if (headers.length !== defaultHeaders.length) {
    return;
  }

  for (let i = 0; i < defaultHeaders.length; i++) {
    if (defaultHeaders[i] !== headers[i]) {
      differentsArrays = true;
      break;
    }
  }

  return differentsArrays;
};

export const validateFieldsProvideUsersRL = (data) => {
  let roles = ["Agent"];
  let quartiles = ["Q1", "Q2", "Q3", "Q4"];
  let errorField = false;

  data.forEach((col) => {
    if (!quartiles.includes(col[0])) {
      errorField = true;
    } else if (col[1] === undefined || isNaN(col[1])) {
      errorField = true;
    } else if (col[2] === undefined) {
      errorField = true;
    } else if (!roles.includes(col[3])) {
      errorField = true;
    }
  });

  return errorField;
};

export const shortName = (word) => {
  let p = word.indexOf(" ");
  const newName = word.substring(0, p + 2);

  return newName;
};

export const validateDataCheck = (agents, activities) => {
  const newData = [];
  const funData = () => {
    const ag = [];
    const ac = [];

    /* agents.map((agt) => {
      if (agt.isChecked === true) {
        ag.push(agt.ident);
      }
    }); */
    agents.forEach((agt) => {
      if (agt.isChecked === true) {
        ag.push(agt.ident);
      }
    });

    /* activities.map((act) => {
      if (act.isChecked === true) {
        ac.push(act.Id);
      }
    }); */
    activities.forEach((act) => {
      if (act.isChecked === true) {
        ac.push(act.Id);
      }
    });

    newData.push({ idActivity: ac, idccmsAssigned: ag });
  };
  funData();
  return newData;
};

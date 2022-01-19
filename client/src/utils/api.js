import axios from "axios";

//const url = "http://10.151.232.218:4305";
//const url ='http://localhost:4343'
//import { axiosInstance } from "../api/interceptor";

//localhost: 10.142.24.175:
// const loginSubmit = (data) => {
//   try {
//     return (
//       axios
//         //.post(`http://localhost:4343/api/ccmslogin`, data)
//         .post(`http://10.142.24.175:4343/api/ccmslogin`, data)
//         .catch(function (error) {
//           if (error.response) {
//             return error.response;
//           }
//         })
//     );
//   } catch (error) {
//     return Promise.resolve({ data: null, error: error });
//   }
// };

// export { loginSubmit };

// /* const newBody = {

//         user : req.body.body.id,

//         pass : req.body.body.password,

//     }

//     const btoaData = btoa(JSON.stringify(newBody));

//     const bdata = {body: 's'+ btoaData}; */

const uploadQuizes = (data, idccms) => {
  try {
    return (
      axios
        .post(
          `http://10.151.232.218:4305/api/uploadquiz?idccms=${idccms}`,
          data
        )
        //.post(`http://localhost:4343/api/uploadquiz?idccms=${idccms}`, data)
        .catch(function (error) {
          if (error.response) {
            return error.response;
          }
        })
    );
  } catch (error) {
    return Promise.resolve({ data: null, error: error });
  }
};

const loadQuizes = (idccms) => {
  try {
    return (
      axios

        .post(`http://10.151.232.218:4305/api/getquizqa?idccms=${idccms}`)
        // .post(`http://localhost:4343/api/getquizqa?idccms=${idccms}`)
        .catch(function (error) {
          if (error.response) {
            return error.response;
          }
        })
    );
  } catch (error) {
    return Promise.resolve({ data: null, error: error });
  }
};

const loadQuizesUser = (idccms) => {
  try {
    return (
      axios

        .post(`http://10.151.232.218:4305/api/getquizbyagent?idccms=${idccms}`)
        //.post(`http://localhost:4343/api/getquizbyagent?idccms=${idccms}`)
        .catch(function (error) {
          if (error.response) {
            return error.response;
          }
        })
    );
  } catch (error) {
    return Promise.resolve({ data: null, error: error });
  }
};

const getExam = (idccms, idquiz) => {
  try {
    return axios

      .post(`http://10.151.232.218:4305/api/getQuizDetail?idccms=${idccms}`, {
        //.post(`http://localhost:4343/api/getQuizDetail?idccms=${idccms}`, {
        idQuiz: idquiz,
      })
      .catch(function (error) {
        if (error.response) {
          return error.response;
        }
      });
  } catch (error) {
    return Promise.resolve({ data: null, error: error });
  }
};

//Peticion carga de achivos creacion de equipos SuperUser

const createTeamSuperUser = (dataCSV, idccms) => {
  try {
    return axios
      .post(`http://10.151.232.218:4305/api/uploadSU?idccms=${idccms}`, {
        //.post(`http://localhost:4343/api/uploadSU?idccms=${idccms}`, {
        data: dataCSV,
      })
      .catch(function (error) {
        if (error.response) {
          return error.response;
        }
      });
  } catch (error) {
    return Promise.resolve({ data: null, error: error });
  }
};

const createTeamOperationManager = (dataCSV, idccms) => {
  try {
    return axios
      .post(`http://10.151.232.218:4305/api/uploadopsm?idccms=${idccms}`, {
        //.post(`http://localhost:4343/api/uploadopsm?idccms=${idccms}`, {
        data: dataCSV,
      })
      .catch(function (error) {
        if (error.response) {
          return error.response;
        }
      });
  } catch (error) {
    return Promise.resolve({ data: null, error: error });
  }
};

const createTeamReportingLead = (dataCSV, idccms) => {
  try {
    return axios
      .post(`http://10.151.232.218:4305/api/uploadrepl?idccms=${idccms}`, {
        //.post(`http://localhost:4343/api/uploadrepl?idccms=${idccms}`, {
        data: dataCSV,
      })
      .catch(function (error) {
        if (error.response) {
          return error.response;
        }
      });
  } catch (error) {
    return Promise.resolve({ data: null, error: error });
  }
};

const uploadAnswers = (data, idccms, idExam) => {
  //10.142.73.193
  try {
    return axios
      .post(
        `http://10.151.232.218:4305/api/getresultquiz?idccms=${idccms}&idExam=${idExam}`,
        //.post(
        // `http://localhost:4343/api/getresultquiz?idccms=${idccms}&idExam=${idExam}`,
        {
          data: data,
        }
      )
      .catch(function (error) {
        if (error.response) {
          return error.response;
        }
      });
  } catch (error) {
    return Promise.resolve({ data: null, error: error });
  }
};

const downloadHomeData = (idccms) => {
  //10.142.73.193 - 10.142.24.65
  try {
    return (
      axios
        .post(`http://10.151.232.218:4305/api/gethomedata?idccms=${idccms}`)
        //.post(`http://localhost:4343/api/gethomedata?idccms=${idccms}`)
        .catch(function (error) {
          if (error.response) {
            return error.response;
          }
        })
    );
  } catch (error) {
    return Promise.resolve({ data: null, error: error });
  }
};
const downloadCounts = (idccms) => {
  //10.142.73.193 - 10.142.24.65
  try {
    return (
      axios
        // .post(`http://10.151.232.218:4305/api/gethomedata?idccms=${idccms}`)
        .post(`http://localhost:4343/api/getteamsbysu?idccms=${idccms}`)
        .catch(function (error) {
          if (error.response) {
            return error.response;
          }
        })
    );
  } catch (error) {
    return Promise.resolve({ data: null, error: error });
  }
};

export {
  uploadQuizes,
  loadQuizes,
  loadQuizesUser,
  getExam,
  createTeamSuperUser,
  createTeamOperationManager,
  uploadAnswers,
  downloadHomeData,
  downloadCounts,
  createTeamReportingLead,
};

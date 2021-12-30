import axios from "axios";

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
  console.log(idccms);
  try {
    return (
      axios
        //.post(`http://localhost:4343/api/ccmslogin`, data)
        .post(`http://localhost:4343/api/uploadquiz?idccms=${idccms}`, data)
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
  console.log(idccms);
  try {
    return (
      axios
        //.post(`http://localhost:4343/api/ccmslogin`, data)
        .post(`http://localhost:4343/api/getquizqa?idccms=${idccms}`)
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

export { uploadQuizes, loadQuizes };

import axios from "axios";

//localhost: 10.142.24.175:
const loginSubmit = (data) => {
  try {
    return axios
      .post(`http://localhost:4343/api/ccmslogin`, data)
      .catch(function (error) {
        if (error.response) {
          return error.response;
        }
      });
  } catch (error) {
    return Promise.resolve({ data: null, error: error });
  }
};

export { loginSubmit };

/* const newBody = {

        user : req.body.body.id,

        pass : req.body.body.password,

    }

    const btoaData = btoa(JSON.stringify(newBody));

    const bdata = {body: 's'+ btoaData}; */

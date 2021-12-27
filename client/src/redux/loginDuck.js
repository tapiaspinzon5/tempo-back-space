import axios from "axios";

//datainicial
const initialData = {
  loading: false,
  userData: null,
};

//types
const LOADING = "LOADING";
const INICIO_SESION_EXITO = "INICIO_SESION_EXITO";

// reduceres

export default function loginReducer(state = initialData, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case INICIO_SESION_EXITO:
      return {
        ...state,
        userData: action.payload.data,
        loading: false,
      };
    default:
      return state;
  }
}

//ACTIONS

//Action login de usuario
export const loginSubmit = (data) => async (dispatch) => {
  console.log(data, "desde el pato");
  dispatch({
    type: LOADING,
  });

  try {
    const requestData = await axios
      // .post(`http://10.142.24.175:4343/api/ccmslogin`, data)
      .post(`http://localhost:4343/api/ccmslogin`, data)
      .catch(function (error) {
        if (error.response) {
          return error.response;
        }
      });

    dispatch({
      type: INICIO_SESION_EXITO,
      payload: {
        data: requestData.data,
      },
    });

    localStorage.setItem(
      "userTP",
      JSON.stringify({
        token: requestData.data.token,
        role: requestData.data.role,
        username: requestData.data.username,
      })
    );
  } catch (error) {
    return Promise.resolve({ data: null, error: error });
  }
};

export const readUserActiveAction = () => (dispatch) => {
  if (localStorage.getItem("userTP")) {
    dispatch({
      type: INICIO_SESION_EXITO,
      payload: { data: JSON.parse(localStorage.getItem("userTP")) },
    });
  }
};

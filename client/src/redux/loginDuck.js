import axios from "axios";
import Swal from "sweetalert2";

//url de apuntamiento
//Localhost
const url = "http://localhost:4343";
// Desarrollo - testing
//const url = "https://gamificationtest.teleperformance.co";
// Pilot
//const url = "https://spacegptest.teleperformance.co";

//datainicial
const initialData = {
  loading: false,
  userData: null,
};

//roles
// Super Admin
// Operation Manager
// Team Leader
// Reporting Lead
// QA Lead
// Agent

//types
const LOADING = "LOADING";
const ERROR_LOGIN = "ERROR_LOGIN";
const INICIO_SESION_EXITO = "INICIO_SESION_EXITO";
const CERRANDO_SESION_EXITO = "CERRANDO_SESION_EXITO";

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
    case CERRANDO_SESION_EXITO:
      return {
        ...initialData,
        loading: false,
      };

    case ERROR_LOGIN:
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
  dispatch({
    type: LOADING,
  });

  try {
    const requestData = await axios
      .post(`${url}/api/ccmslogin`, data)
      .catch(function (error) {
        if (error.response) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "warning",
            title: "wrong username or password!!",
          });
          dispatch({
            type: ERROR_LOGIN,
            payload: {
              data: error.response.data,
            },
          });
          return;
        }
      });

    dispatch({
      type: INICIO_SESION_EXITO,
      payload: {
        data: requestData.data,
      },
    });

    sessionStorage.setItem(
      "userTP",
      JSON.stringify({
        Token: requestData.data.Token,
        RefreshToken: requestData.data.RefreshToken,
        NumberLogins: requestData.data.NumberLogins,
        Role: requestData.data.Role,
        UserName: requestData.data.UserName,
        Idccms: requestData.data.Idccms,
        Quartile: requestData.data.Quartile,
        Nombre: requestData.data.Nombre,
      })
    );
  } catch (error) {
    return Promise.resolve({ data: null, error: error });
  }
};

//action de verificacion de  usuario activo
export const readUserActiveAction = () => (dispatch) => {
  if (sessionStorage.getItem("userTP")) {
    dispatch({
      type: INICIO_SESION_EXITO,
      payload: { data: JSON.parse(sessionStorage.getItem("userTP")) },
    });
  }
};

//action logout
export const logoutAction = () => (dispatch) => {
  sessionStorage.removeItem("userTP");
  dispatch({
    type: CERRANDO_SESION_EXITO,
  });
};

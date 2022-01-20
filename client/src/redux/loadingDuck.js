const initialData = {
  loading: false,
};

//types
const LOADING = "LOADING";

// reduceres

export default function loadingReducer(state = initialData, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
}

//ACTIONS

//Action login de usuario
export const loading = (state) => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
};

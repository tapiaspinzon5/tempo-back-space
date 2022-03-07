import axios from "axios";
import { axiosInstance } from "../api/interceptor";

//initialData
const initialData ={
    loading: false,
    homeData: null,
    headerData: null
}


//TYPES
const LOADING = "LOADING";
const ERROR_DATA = 'ERROR_DATA';
const GET_HOME_DATA = 'GET_HOME_DATA'
const GET_HEADER_DATA = 'GET_HEADER_DATA'


//REDUCERS

export default function homeDataReducer(state = initialData, action){
    switch (action.type){
        case LOADING:
      return {
        ...state,
        loading: true,
      };

      case GET_HOME_DATA:
          return{
              ...state,
              homeData: action.payload.data,
            loading: false
        }
        case ERROR_DATA:
            return{
                ...state,
                homeData: action.payload.error,
                loading:false
            }
          
        case GET_HEADER_DATA:
          return{
            ...state,
            headerData: action.payload.data,
            loading:false
          }

            default:
                return state;
    }
}

//ACTIONS

//trae la data del Home
export const downloadHomeData =  (idccms) => (dispatch)=>{

    dispatch({
        type: LOADING,
      });

     const dataHome =async ()=>{
         try {
       const data =  await  axiosInstance
         .post(`gethomedata?idccms=${idccms}`)
         .catch(function (error) {
              if (error.response) {
                dispatch({
                    type: ERROR_DATA,
                    payload: {
                      error: error.response.data,
                    },
                });
            }})
        
        dispatch({
        type: GET_HOME_DATA,
        payload: {
          data: data.data,
        },
     });
    
} catch (error) {
    dispatch({
        type: ERROR_DATA,
        payload: {
          error: error,
        },
    });
}
}
dataHome()
};


//trae la data del Home
export const headerDataAction =  (idccms) => (dispatch)=>{

    dispatch({
        type: LOADING,
      });

     const dataHeader =async ()=>{
         try {
       const data =  await  axiosInstance
         .post(`gethomedata?idccms=${idccms}`)
         .catch(function (error) {
              if (error.response) {
                dispatch({
                    type: ERROR_DATA,
                    payload: {
                      error: error.response.data,
                    },
                });
            }})
        
        dispatch({
        type: GET_HEADER_DATA,
        payload: {
          data: data.data[6].Level[0],
        },
     });
    
} catch (error) {
    dispatch({
        type: ERROR_DATA,
        payload: {
          error: error,
        },
    });
}
}
dataHeader()
};


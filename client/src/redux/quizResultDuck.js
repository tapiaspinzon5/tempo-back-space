const initialData = {
  myQuiz: {
    PreguntasCorrectas: 0,
    TotalPreguntas: 0,
    Calificación: 0,
    EstadoExamen: "",
    idExamen: 0,
    NombreExamen: "",
    DescriptionExam: "",
    UrlBadge: "",
    idUser: 0,
    Respuestas: [
      {
        Pregunta: "",
        Respuesta1: "",
        Respuesta2: "",
        Respuesta3: "",
        Respuesta4: "",
        Answer1: "",
        AnswerUser1: "",
        idPregunta: 0,
        TypeQuestionId: 0,
        TypeQuestion: "",
      },
    ],
  },
};

const GET_MY_RESULT = "GET_MY_RESULT";

export default function quizResultReducer(state = initialData, action) {
  switch (action.type) {
    case GET_MY_RESULT: {
      return {
        ...state,
        myQuiz: action.payload.data,
      };
    }
    default:
      return state;
  }
}

export const getQuizResultAction = (dataResult) => (dispatch) => {
  dispatch({
    type: GET_MY_RESULT,
    payload: {
      data: dataResult,
    },
  });
};

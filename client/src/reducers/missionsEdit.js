///////ACTIONS
export const TYPES = {
	GET_DATA_MISSION: "GET_DATA_MISSION",
	EDIT_NAME: "EDIT_NAME",
	CHECKED_NAME: "CHECKED_NAME",
	EDIT_DESCRIPTION: "EDIT_DESCRIPTION",
	CHECKED_DESCRIPTION: "CHECKED_DESCRIPTION",
	EDIT_TARGET: "EDIT_TARGET",
	CHECKED_TARGET: "CHECKED_TARGET",
	EDIT_QUESTION: "EDIT_QUESTION",
	CANCEL_EDIT: "CANCEL_EDIT",
	DELETE_QUESTION: "DELETE_QUESTION",
	ADD_QUESTION: "ADD_QUESTION",
	RESET_ALL: "RESET_ALL",
};

export const missionsEditInitialState = {
	TotalPreguntasTemp: "",
	ApprovalExamTemp: 0,
	NameExamTemp: "",
	DescriptionExamTemp: "",
	RespuestasTemp: [],
	TotalPreguntas: "",
	ApprovalExam: 0,
	NameExam: "",
	DescriptionExam: "",
	UrlBadge: "",
	Respuestas: [],
	reset: false,
};

//////REDUCER

export function missionsEditReducer(state, action) {
	switch (action.type) {
		case TYPES.GET_DATA_MISSION:
			//state = action.payload.missInfo;
			return {
				...state,
				...action.payload.missInfo,
				TotalPreguntasTemp: action.payload.missInfo.TotalPreguntas,
				ApprovalExamTemp: action.payload.missInfo.ApprovalExam,
				NameExamTemp: action.payload.missInfo.NameExam,
				DescriptionExamTemp: action.payload.missInfo.DescriptionExam,
				RespuestasTemp: action.payload.missInfo.Respuestas,
			};
		case TYPES.EDIT_NAME:
			return {
				...state,
				NameExamTemp: action.payload,
			};
		case TYPES.CHECKED_NAME:
			if (action.payload) {
				return {
					...state,
					reset: true,
				};
			}
			return {
				...state,
				NameExamTemp: state.NameExam,
				reset: false,
			};
		case TYPES.EDIT_DESCRIPTION:
			return {
				...state,
				DescriptionExamTemp: action.payload,
			};
		case TYPES.CHECKED_DESCRIPTION:
			if (action.payload) {
				return {
					...state,
					reset: true,
				};
			}
			return {
				...state,
				DescriptionExamTemp: state.DescriptionExam,
				reset: false,
			};
		case TYPES.EDIT_TARGET:
			return { ...state, ApprovalExamTemp: action.payload };
		case TYPES.CHECKED_TARGET:
			if (action.payload) {
				return {
					...state,
					reset: true,
				};
			}
			return {
				...state,
				ApprovalExamTemp: state.ApprovalExam,
				reset: false,
			};
		case TYPES.RESET_ALL:
			return { ...state, agents: action.payload.agents };
		default:
			return state;
	}
}

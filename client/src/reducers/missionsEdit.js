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
	EDIT_TENIOR: "EDIT_TENIOR",
	CHECKED_QUESTION: "CHECKED_QUESTION",
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
				Respuestas: action.payload.missInfo.Respuestas,
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
		case TYPES.EDIT_TENIOR:
			const replaceQ = state.RespuestasTemp.map((q) => {
				if (q.idP === action.payload.idP) {
					return { ...q, Tenior: action.payload.data, edit: true };
				}
				return { ...q };
			});
			return { ...state, RespuestasTemp: replaceQ };
		case TYPES.EDIT_QUESTION:
			switch (action.payload.type) {
				case "question":
					const replaceQ = state.RespuestasTemp.map((q) => {
						if (q.idP === action.payload.idP) {
							return { ...q, Pregunta: action.payload.data, edit: true };
						}
						return { ...q };
					});
					return { ...state, RespuestasTemp: replaceQ };
				case "option":
					const replaceO = state.RespuestasTemp.map((q) => {
						if (q.idP === action.payload.idP) {
							const newRes = q.RespuestasAG.map((el, i) => {
								if (i === action.payload.option) {
									return action.payload.data;
								}
								return el;
							});
							return {
								...q,
								RespuestasAG: newRes,
								edit: true,
							};
						}
						return { ...q };
					});
					return { ...state, RespuestasTemp: replaceO, reset: true };
				case "check":
					const replaceC = state.RespuestasTemp.map((q) => {
						if (q.idP === action.payload.idP) {
							const newcheck = q.RespuestasAG.map((el, i) => {
								if (i === action.payload.option) {
									return action.payload.data;
								}
								return el;
							});
							return {
								...q,
								RespuestasAG: newcheck,
								edit: true,
							};
						}
						return { ...q };
					});
					return {
						...state,
						RespuestasTemp: replaceC,
						reset: true,
					};
				case "check2":
					const replaceC2 = state.RespuestasTemp.map((q) => {
						if (q.idP === action.payload.idP) {
							const newcheck2 = q.RespuestasAG.map((el, i) => {
								if (i === action.payload.option) {
									return action.payload.data;
								}
								return { ...el, checked: false };
							});
							return {
								...q,
								RespuestasAG: newcheck2,
								edit: true,
							};
						}
						return { ...q };
					});
					return {
						...state,
						RespuestasTemp: replaceC2,
						reset: true,
					};
				default:
					return { ...state };
			}
		case TYPES.CHECKED_QUESTION:
			if (action.payload.value) {
				return {
					...state,
					reset: true,
				};
			}
			const back = state.RespuestasTemp.map((q) => {
				if (q.idP === action.payload.idP) {
					if (q.new) {
						return q.TypeQuestionId === 2
							? {
									...q,
									RespuestasAG: [
										{
											value: "true",
											checked: false,
										},
										{
											value: "false",
											checked: false,
										},
									],
									Pregunta: "Write your question",
									RespuestaCorrecta: "",
									Tenior: "all",
							  }
							: {
									...q,
									RespuestasAG: [
										{
											value: "Write your option A",
											checked: false,
										},
										{
											value: "Write your option B",
											checked: false,
										},
										{
											value: "Write your option C",
											checked: false,
										},
										{
											value: "Write your option D",
											checked: false,
										},
									],
									Pregunta: "",
									RespuestaCorrecta: "",
									Tenior: "all",
							  };
					}
					return state.Respuestas.filter((el) => q.idP === el.idP)[0];
				}
				return q;
			});
			return {
				...state,
				RespuestasTemp: back,
				reset: false,
			};
		case TYPES.ADD_QUESTION:
			return {
				...state,
				RespuestasTemp: [...state.RespuestasTemp, action.payload],
				reset: true,
			};
		case TYPES.DELETE_QUESTION:
			const delQ = state.RespuestasTemp.filter(
				(q) => q.idP !== action.payload.idP
			);
			return { ...state, RespuestasTemp: delQ, reset: true };
		case TYPES.RESET_ALL:
			return { ...state, RespuestasTemp: state.Respuestas, reset: false };
		default:
			return state;
	}
}

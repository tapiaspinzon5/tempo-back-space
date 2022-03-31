//Validar Header carga de quiz

export const validateHeaders = (headers) => {
	let differentsArrays = false;

	let defaultHeaders = [
		"Question",
		"Option1",
		"Option2",
		"Option3",
		"Option4",
		"Answer",
		"Quartile",
		"ExamName",
		"DescriptionExam",
		"ApprovalExam",
		"LOB",
		"Topic",
	];

	if (headers.length !== defaultHeaders.length) {
		differentsArrays = true;
		return differentsArrays;
	}

	for (let i = 0; i < defaultHeaders.length; i++) {
		if (defaultHeaders[i] !== headers[i]) {
			differentsArrays = true;
			break;
		}
	}

	return differentsArrays;
};

//Validacion de campos carga de quiz

export const validateFields = (data) => {
	let errorField = false;
	let quartiles = ["Q1", "Q2", "Q3", "Q4"];

	data.forEach((col) => {
		let answers = [col[1], col[2], col[3], col[4]];

		if (col[0] === undefined) {
			errorField = true;
		} else if (col[1] === undefined) {
			errorField = true;
		} else if (col[2] === undefined) {
			errorField = true;
			// } else if (col[3] === undefined ){
			// errorField = true;
			// } else if (col[4] === undefined){
			// errorField = true;
		} else if (!answers.includes(col[5])) {
			errorField = true;
		} else if (!quartiles.includes(col[6])) {
			errorField = true;
		} else if (col[7] === undefined) {
			errorField = true;
		} else if (col[8] === undefined) {
			errorField = true;
		} else if (isNaN(col[9])) {
			errorField = true;
		} else if (col[10] === undefined) {
			errorField = true;
		} else if (col[11] === undefined) {
			errorField = true;
		}
	});

	return errorField;
};

//Helper Validacion Headers carga archivos SuperUser creacion de equipos

export const validateHeadersCreateTeam = (headers) => {
	let differentsArrays = false;

	let defaultHeaders = [
		"Ident",
		"TeamName",
		"KPI",
		"Campaign",
		"Q1",
		"Q2",
		"Q3",
		"Q4",
		"Target",
		"Order",
	];

	if (headers.length !== defaultHeaders.length) {
		return;
	}

	for (let i = 0; i < defaultHeaders.length; i++) {
		if (defaultHeaders[i] !== headers[i]) {
			differentsArrays = true;
			break;
		}
	}

	return differentsArrays;
};

//Helper Validacion Campos carga archivos SuperUser creacion de equipos
export const validateFieldsCreateTeams = (data) => {
	let errorField = false;
	const orderOptions = ["asc", "dsc"];
	data.forEach((col) => {
		if (col[0] === undefined || isNaN(col[0])) {
			errorField = true;
		} else if (col[1] === undefined) {
			errorField = true;
		} else if (col[2] === undefined) {
			errorField = true;
		} else if (col[3] === undefined) {
			errorField = true;
		} else if (col[4] === undefined || isNaN(col[4])) {
			errorField = true;
		} else if (col[5] === undefined || isNaN(col[5])) {
			errorField = true;
		} else if (col[6] === undefined || isNaN(col[6])) {
			errorField = true;
		} else if (col[7] === undefined || isNaN(col[7])) {
			errorField = true;
		} else if (col[8] === undefined || isNaN(col[8])) {
			errorField = true;
		} else if (col[9] === undefined || !orderOptions.includes(col[9])) {
			errorField = true;
		}
	});

	return errorField;
};

//Helper Validacion carga archivos Operation Manager
export const validateHeadersTeamOM = (headers) => {
	let differentsArrays = false;

	let defaultHeaders = ["Ident", "RoleAgent", "Team", "Lob"];

	if (headers.length !== defaultHeaders.length) {
		return;
	}

	for (let i = 0; i < defaultHeaders.length; i++) {
		if (defaultHeaders[i] !== headers[i]) {
			differentsArrays = true;
			break;
		}
	}

	return differentsArrays;
};

export const validateFieldsTeamOM = (data) => {
	let roles = ["Team Leader", "Reporting Lead", "QA Lead"];

	let errorField = false;

	data.forEach((col) => {
		if (col[0] === undefined || isNaN(col[0])) {
			errorField = true;
		} else if (col[1] === undefined || !roles.includes(col[1])) {
			errorField = true;
		} else if (col[2] === undefined) {
			errorField = true;
		} else if (col[3] === undefined) {
			errorField = true;
		}
	});

	return errorField;
};

//Helper Validacion carga archivos Reporting Lead
export const validateHeadersProvideUsersRL = (headers) => {
	let differentsArrays = false;

	let defaultHeaders = ["Quartile", "Ident", "Team", "RoleAgent"];

	if (headers.length !== defaultHeaders.length) {
		return;
	}

	for (let i = 0; i < defaultHeaders.length; i++) {
		if (defaultHeaders[i] !== headers[i]) {
			differentsArrays = true;
			break;
		}
	}

	return differentsArrays;
};

export const validateFieldsProvideUsersRL = (data) => {
	let roles = ["Agent"];
	let quartiles = ["Q1", "Q2", "Q3", "Q4"];
	let errorField = false;

	data.forEach((col) => {
		if (!quartiles.includes(col[0])) {
			errorField = true;
		} else if (col[1] === undefined || isNaN(col[1])) {
			errorField = true;
		} else if (col[2] === undefined) {
			errorField = true;
		} else if (!roles.includes(col[3])) {
			errorField = true;
		}
	});

	return errorField;
};

export const shortName = (word) => {
	let p = word.indexOf(" ");
	const newName = word.substring(0, p + 2);

	return newName;
};

export const validateDataCheck = (agents, challenge, userName) => {
	const newData = [];
	const funData = () => {
		const ag = [];
		const tokens = [];
		agents.forEach((agt) => {
			if (agt.isChecked === true) {
				ag.push(agt.ident);
				tokens.push(agt.Token);
			}
		});

		newData.push({
			userName: userName,
			nameChallenge: [challenge.Name],
			idChallenge: [challenge.Id],
			idccmsAssigned: ag,
			fcmTokens: tokens,
		});
	};
	funData();
	return newData;
};
export const validateDataCheckTpvs = (agents, tpv, userName) => {
	const newData = [];
	const funData = () => {
		const ag = [];
		const tokens = [];
		agents.forEach((agt) => {
			if (agt.isChecked === true) {
				ag.push(agt.ident);
				tokens.push(agt.Token);
			}
		});

		newData.push({
			userName: userName,
			nameTPV: [tpv.TPV],
			idTpv: [tpv.id],
			idccmsAssigned: ag,
			fcmTokens: tokens,
		});
	};
	funData();
	return newData;
};

export const positionValue = (kpi) => {
	const { ACTUAL, Quartile, Target, TargetQ1, TargetQ2, TargetQ3, TargetQ4 } =
		kpi;

	const direction = TargetQ1 - TargetQ2;
	let setArrowPos;

	if (direction > 0) {
		if (Target <= ACTUAL) {
			setArrowPos = 82;
		} else {
			if (Quartile === "Q1") {
				if (ACTUAL > TargetQ2) {
					setArrowPos = 50;
				} else {
					setArrowPos = 16.666;
				}
			}
			if (Quartile === "Q2") {
				if (ACTUAL > TargetQ3) {
					setArrowPos = 50;
				} else {
					setArrowPos = 16.666;
				}
			}
			if (Quartile === "Q3") {
				if (ACTUAL > TargetQ4) {
					setArrowPos = 50;
				} else {
					setArrowPos = 16.666;
				}
			}
			if (Quartile === "Q4") {
				const pos = TargetQ3 - TargetQ4;
				if (ACTUAL > TargetQ4 - pos) {
					setArrowPos = 50;
				} else {
					setArrowPos = 16.666;
				}
			}
		}
	} else {
		//TARGET NEGATIVO
		if (Target >= ACTUAL) {
			setArrowPos = 82;
		} else {
			if (Quartile === "Q1") {
				if (ACTUAL < TargetQ2) {
					setArrowPos = 50;
				} else {
					setArrowPos = 16.666;
				}
			}
			if (Quartile === "Q2") {
				if (ACTUAL < TargetQ3) {
					setArrowPos = 50;
				} else {
					setArrowPos = 16.666;
				}
			}
			if (Quartile === "Q3") {
				if (ACTUAL < TargetQ4) {
					setArrowPos = 50;
				} else {
					setArrowPos = 16.666;
				}
			}
			if (Quartile === "Q4") {
				const pos = TargetQ4 - TargetQ3;
				if (ACTUAL < TargetQ4 + pos) {
					setArrowPos = 50;
				} else {
					setArrowPos = 16.666;
				}
			}
		}
	}
	return setArrowPos;
};

export const dataGraphics = (data) => {
	const series = [];
	const date = [];
	data.forEach((dato) => {
		series.push(dato.actual.toFixed(2));
		date.push(dato.Date.split("T")[0]);
	});
	return [{ name: data[0].Kpi, data: series }, date];
};

export const deleteDuplicatesScore = async (data) => {
	const hash = {};
	let printData = await data.filter(function (current) {
		let exists = !hash[current.id];
		hash[current.id] = true;
		return exists;
	});

	const dataOrder = printData.sort((a, b) => b.score - a.score);
	let cont = 1;
	dataOrder.forEach((el) => {
		if (el.score) {
			el.rank = cont;
			cont += 1;
		} else {
			el.rank = dataOrder.length;
		}
	});

	return dataOrder;
};

export const deleteDuplicatesKpis = async (data, time) => {
	const hash = {};
	let printData = await data.filter(function (current) {
		let exists = !hash[current.id];
		hash[current.id] = true;
		return exists;
	});

	if (time === "Day") {
		const dataOrder =
			printData[0].OrderKpi === "asc"
				? printData.sort((a, b) => b.KPIR - a.KPIR)
				: printData.sort((a, b) => a.KPIR - b.KPIR);
		let cont = 1;
		dataOrder.forEach((el) => {
			if (el.KPIR) {
				el.rank = cont;
				el.KPIR = el.KPIR.toFixed(2);
				cont += 1;
			} else {
				el.rank = dataOrder.length;
				el.KPIR = el.KPIR.toFixed(2);
			}
		});
		return dataOrder;
	} else if (time === "Week") {
		const dataOrder =
			printData[0].OrderKpi === "asc"
				? printData.sort((a, b) => b.AverageWeek - a.AverageWeek)
				: printData.sort((a, b) => a.AverageWeek - b.AverageWeek);
		let cont = 1;
		dataOrder.forEach((el) => {
			if (el.AverageWeek) {
				el.rank = cont;
				el.KPIR = el.AverageWeek.toFixed(2);
				cont += 1;
			} else {
				el.rank = dataOrder.length;
				el.KPIR = el.AverageWeek.toFixed(2);
			}
		});
		return dataOrder;
	} else if (time === "Month") {
		const dataOrder =
			printData[0].OrderKpi === "asc"
				? printData.sort((a, b) => b.AverageMonth - a.AverageMonth)
				: printData.sort((a, b) => a.AverageMonth - b.AverageMonth);
		let cont = 1;
		dataOrder.forEach((el) => {
			if (el.AverageMonth) {
				el.rank = cont;
				el.KPIR = el.AverageMonth.toFixed(2);
				cont += 1;
			} else {
				el.rank = dataOrder.length;
				el.KPIR = el.AverageMonth.toFixed(2);
			}
		});
		return dataOrder;
	}
};
export const ConvertMonth = (month) => {
	let mes;
	switch (month) {
		case 1:
			mes = "January";
			break;
		case 2:
			mes = "February";
			break;
		case 3:
			mes = "March";
			break;
		case 4:
			mes = "April";
			break;
		case 5:
			mes = "May";
			break;
		case 6:
			mes = "June";
			break;
		case 7:
			mes = "July";
			break;
		case 8:
			mes = "August";
			break;
		case 9:
			mes = "September";
			break;
		case 10:
			mes = "October";
			break;
		case 11:
			mes = "November";
			break;
		case 12:
			mes = "December";
			break;

		default:
			break;
	}
	return mes;
};

export const quizFilter = (quices, filter) => {
	const newData = [];
	const categories = [];
	quices.forEach((quiz) => {
		if (quiz.EstadoExamen === filter.split("-")[0]) {
			newData.push(quiz);
			categories.push(quiz.Topic);
		}
	});
	return { quices: newData, categories: categories };
};

export const challengesFilter = (challenges, filter) => {
	let newData = [];
	challenges.forEach((challenge) => {
		if (challenge.ShowActivity === filter.split("-")[1]) {
			newData.push(challenge);
		}
	});
	return newData;
};
export const activitiesFilter = (activities, filter) => {
	let newData = [];
	if (filter.split("-")[0] === "Complete") {
		activities.forEach((activity) => {
			if (activity.Status === true) {
				newData.push(activity);
			}
		});
	} else {
		activities.forEach((activity) => {
			if (activity.Stage === filter) {
				newData.push(activity);
			}
		});
	}
	return newData;
};

//Helper Validacion Headers carga archivos carga KPI  Rep Lead

export const validateHeadersUploadKPIs = (headers) => {
	let differentsArrays = false;

	let defaultHeaders = ["Kpi", "unitKpi", "Type", "Idccms", "Date", "Score"];

	if (headers.length !== defaultHeaders.length) {
		return;
	}

	for (let i = 0; i < defaultHeaders.length; i++) {
		if (defaultHeaders[i] !== headers[i]) {
			differentsArrays = true;
			break;
		}
	}

	return differentsArrays;
};

//Helper Validacion Campos carga archivos carga KPI  Rep Lead

export const validateFieldsUploadKPIs = (data) => {
	let errorField = false;
	const typeOptions = [1, 2, 4, 5];
	const unitOptions = ["Hours", "Seconds", "Avg", "Percentage"];
	data.forEach((col) => {
		if (col[0] === undefined) {
			errorField = true;
		} else if (col[1] === undefined || !unitOptions.includes(col[1])) {
			errorField = true;
		} else if (col[2] === undefined || !typeOptions.includes(col[2])) {
			errorField = true;
		} else if (col[3] === undefined || isNaN(col[3])) {
			errorField = true;
		} else if (col[4] === undefined || dateValidator(col[4])) {
			errorField = true;
		} else if (col[5] === undefined) {
			errorField = true;
		}
	});

	return errorField;
};

const dateValidator = (date) => {
	console.log(date);
	if (typeof date === "string") {
		let arr = date.split("-");
		let year = new Date().getYear();
		if (arr[0] !== date) {
			if (
				year - 2 < parseInt(arr[0]) < year + 1 &&
				0 < parseInt(arr[1]) < 13 &&
				0 < parseInt(arr[2]) < 32
			) {
				return false;
			} else {
				return true;
			}
		} else {
			return true;
		}
	} else {
		return true;
	}
};

export const quizCategories = async (data) => {
	const hash = {};
	const categories = [];
	let catData = await data.filter(function (current) {
		let exists = !hash[current.Topic];
		hash[current.Topic] = true;
		return exists;
	});
	catData.forEach((cat) => {
		categories.push(cat.Topic);
	});
	return categories;
};

export const quizByCategory = (data, status) => {
	console.log(data);
	const quizFilter = [];
	const catFilter = [];
	data.forEach((quiz) => {
		if (quiz.EstadoExamen === status) {
			quizFilter.push(quiz);
			catFilter.push(quiz.Topic);
		}
	});
	return { quices: quizFilter, categories: catFilter };
};

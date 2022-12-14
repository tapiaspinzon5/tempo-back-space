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
		"Topic",
		"Type",
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

export const validateFields = (data, topics) => {
	let errorField = false;
	let quartiles = ["Q1", "Q2", "Q3", "Q4", "All"];
	let types = [1, 2, 3];
	let ansopt = ["AB", "AC", "AD", "BC", "BD", "CD", "ABC", "ABD", "ACD", "BCD"];
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
		} else if (
			col[11] === 3 ? !ansopt.includes(col[5]) : !answers.includes(col[5])
		) {
			errorField = true;
		} else if (!quartiles.includes(col[6])) {
			errorField = true;
		} else if (col[7] === undefined) {
			errorField = true;
		} else if (col[8] === undefined) {
			errorField = true;
		} else if (isNaN(col[9])) {
			errorField = true;
		} else if (!topics.includes(col[10])) {
			errorField = true;
		} else if (isNaN(col[11]) || !types.includes(col[11])) {
			errorField = true;
		}
	});

	return errorField;
};

//Helper Validacion Headers carga archivos SuperUser creacion de equipos

export const changeTQ = (data) => {
	let reemplazo;
	if (data === "Tenior") {
		reemplazo = "Quartile";
	} else {
		reemplazo = data?.replace("T", "Q");
	}
	return reemplazo;
};

export const validateHeadersCreateTeam = (headers) => {
	let differentsArrays = false;

	let defaultHeaders = [
		"IdentOM",
		"Campaign",
		"KPI",
		"Q1",
		"Q2",
		"Q3",
		"Q4",
		"CriticalPoint",
		"OrderKpi",
		"typeLoad",
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
	const typeLoad = [0, 1];
	data.forEach((col) => {
		if (col[0] === undefined || isNaN(col[0])) {
			errorField = true;
		} else if (col[1] === undefined) {
			errorField = true;
		} else if (col[2] === undefined) {
			errorField = true;
		} else if (col[3] === undefined || isNaN(col[3])) {
			errorField = true;
		} else if (col[4] === undefined || isNaN(col[4])) {
			errorField = true;
		} else if (col[5] === undefined || isNaN(col[5])) {
			errorField = true;
		} else if (col[6] === undefined || isNaN(col[6])) {
			errorField = true;
		} else if (col[7] === undefined || isNaN(col[7])) {
			errorField = true;
		} else if (col[8] === undefined || !orderOptions.includes(col[8])) {
			errorField = true;
		} else if (col[9] === undefined || !typeLoad.includes(col[9])) {
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

export const teamValidation = (dataFile, dataTeam) => {
	let errorTeam = "";
	dataFile.map((agent) => {
		const teamName = agent[1];
		const exist = dataTeam.find((team) => {
			return team.NameTeam === teamName;
		});
		if (!exist) {
			errorTeam = teamName;
		}
		return agent;
	});
	return errorTeam;
};

export const teamValidationKPI = (dataFile, dataKpi) => {
	let errorKPI;
	let date = Date.now();
	let validate = 0;

	dataFile.map((kpi) => {
		const dateKPI = new Date(kpi[4]).getTime();

		validate = date - dateKPI;
		if (validate < 0) {
			errorKPI = `Wrong date (${kpi[4]}), It's not possible to store a date greater than today `;
		}
		// Validacion del kpi
		const kpiD = kpi[0];
		const kpiUnit = kpi[1];
		const exist = dataKpi.find((data) => {
			return data.Kpi === kpiD;
		});
		if (!exist) {
			errorKPI = `The KPI (${kpiD}) does not exist or is badly written, correct it and re-upload the file`;
			return;
		}

		// Validacion de la unidad de medida del kpi

		// if(kpiUnit !== 'Undefined'){}
		// const exist2 = dataKpi.find((data) => {
		//   return data.unitKpi === kpiUnit;
		// });
		// if (!exist2) {
		//   errorKPI = `The unit of measurre  (${kpiUnit}) of the KPI (${kpiD}) does not exist or is badly written, correct it and re-upload the file`;
		//   return;
		// }
	});
	return errorKPI;
};

//Helper Validacion carga archivos Reporting Lead
export const validateHeadersProvideUsersRL = (headers) => {
	let differentsArrays = false;

	let defaultHeaders = ["Ident", "Team"];

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
	//let roles = ["Agent"];
	//let quartiles = ["Q1", "Q2", "Q3", "Q4"];
	let errorField = false;

	data.forEach((col) => {
		if (col[0] === undefined || isNaN(col[0])) {
			errorField = true;
		} else if (col[1] === undefined) {
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

export const targetKPI = (kpi) => {
	let target;
	switch (kpi.Quartile) {
		case "Q1":
			target = kpi.TargetQ1;
			break;
		case "Q2":
			target = kpi.TargetQ2;
			break;
		case "Q3":
			target = kpi.TargetQ3;
			break;
		case "Q4":
			target = kpi.TargetQ4;
			break;

		default:
			break;
	}
	return target;
};

export const positionValue = (kpi) => {
	const {
		Actual,
		Quartile,
		Target,
		TargetQ1,
		TargetQ2,
		TargetQ3,
		TargetQ4,
		OrderKpi,
	} = kpi;

	const criticalPoint = Target;
	let setArrowPos;
	const red = 16.66666;
	const yellow = 50;
	const green = 82;

	//KPI Incrementales
	if (OrderKpi === "asc") {
		if (Actual > criticalPoint) {
			if (Quartile === "Q1") {
				if (Actual < TargetQ1) {
					setArrowPos = yellow;
				} else {
					setArrowPos = green;
				}
			} else if (Quartile === "Q2") {
				if (Actual < TargetQ2) {
					setArrowPos = yellow;
				} else {
					setArrowPos = green;
				}
			} else if (Quartile === "Q3") {
				if (Actual < TargetQ3) {
					setArrowPos = yellow;
				} else {
					setArrowPos = green;
				}
			} else {
				if (Actual < TargetQ4) {
					setArrowPos = yellow;
				} else {
					setArrowPos = green;
				}
			}
		} else {
			setArrowPos = red;
		}
	} else {
		//KPI decrementales
		if (Actual < criticalPoint) {
			//
			if (Quartile === "Q1") {
				if (Actual > TargetQ1) {
					setArrowPos = yellow;
				} else {
					setArrowPos = green;
				}
			} else if (Quartile === "Q2") {
				if (Actual > TargetQ2) {
					setArrowPos = yellow;
				} else {
					setArrowPos = green;
				}
			} else if (Quartile === "Q3") {
				if (Actual > TargetQ3) {
					setArrowPos = yellow;
				} else {
					setArrowPos = green;
				}
			} else {
				if (Actual > TargetQ4) {
					setArrowPos = yellow;
				} else {
					setArrowPos = green;
				}
			}

			//
		} else {
			setArrowPos = red;
		}
	}
	return setArrowPos;
};

export const dataGraphics = (data) => {
	const series = [];
	const date = [];
	data.forEach((dato) => {
		series.push(dato.actual?.toFixed(2));
		date.push(dato.Date.split("T")[0]);
	});
	return [{ name: data[0].Kpi, data: series }, date];
};

export const deleteDuplicatesScore = async (data, exp) => {
	if (exp) {
		const tableData = data.map((el, index) => {
			el.rank = index + 1;
			el.id = index + 1;
			el.KpiScore = el.ExpPoint?.toFixed(2);
			return el;
		});
		return { dataOrder: tableData, podium: tableData };
	}

	const hash = {};
	let printData = data.filter(function (current) {
		let exists = !hash[current.ccmsid];
		hash[current.ccmsid] = true;
		return exists;
	});
	const dataOrder =
		data[0].OrderKpi === "asc"
			? data.sort((a, b) => b.KpiScore - a.KpiScore)
			: data.sort((a, b) => a.KpiScore - b.KpiScore);

	const podium = printData.sort((a, b) => b.ExpPoint - a.ExpPoint);

	let cont = 1;

	dataOrder.forEach((el) => {
		el.rank = cont;
		el.id = cont;
		el.KpiScore = el.KpiScore?.toFixed(2);
		cont += 1;
	});

	return { dataOrder, podium };
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
				el.KPIR = el.KPIR?.toFixed(2);
				cont += 1;
			} else {
				el.rank = dataOrder.length;
				el.KPIR = el.KPIR?.toFixed(2);
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
				el.KPIR = el.AverageWeek?.toFixed(2);
				cont += 1;
			} else {
				el.rank = dataOrder.length;
				el.KPIR = el.AverageWeek?.toFixed(2);
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
				el.KPIR = el.AverageMonth?.toFixed(2);
				cont += 1;
			} else {
				el.rank = dataOrder.length;
				el.KPIR = el.AverageMonth?.toFixed(2);
			}
		});
		return dataOrder;
	}
};
export const validateDate = (date) => {
	let mes;
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const getShortMonthName = (date) => {
		return monthNames[date.getMonth()]?.substring(0, 3);
	};

	mes = getShortMonthName(new Date(date));
	return mes;
};

export const targetSemaforo = (kpi) => {
	const { Quartile, TargetQ1, TargetQ2, TargetQ3, TargetQ4 } = kpi;
	let target;
	switch (Quartile) {
		case "Q1":
			target = TargetQ1;
			break;
		case "Q2":
			target = TargetQ2;
			break;
		case "Q3":
			target = TargetQ3;
			break;
		case "Q4":
			target = TargetQ4;
			break;

		default:
			break;
	}

	return target;
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

export const quizFilter = async (quices, filter) => {
	const newData = quices.filter((Q) => Q.EstadoExamen === filter.split("-")[0]);
	const hash = {};
	const categories = newData.map((q) => q.Topic);
	let catData = await categories.filter(function (current) {
		let exists = !hash[current];
		hash[current] = true;
		return exists;
	});
	return { quices: newData, categories: catData };
};

export const challengesFilter = (challenges, filter) => {
	let newData = challenges.filter(
		(c) => c.Status === parseInt(filter.split("-")[1])
	);
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

// filtra las LOB
export const filterLobList = async (data) => {
	const hash = {};
	let lobData = await data.filter(function (current) {
		let exists = !hash[current.NameLob];
		hash[current.NameLob] = true;
		return exists;
	});
	//return lobData;
	const lwd = await lobsWithDate(lobData);
	return lwd;
};

const dateConfig = (date) => {
	let fecha;
	let hora;
	let fechaBase = new Date(date).toLocaleString([], {
		timeZone: "Etc/UTC",
		hourCycle: "h23",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});

	let now = new Date().toLocaleString([], {
		hourCycle: "h23",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});

	let fa = new Date(
		`${now.split("/")[1]}/${now.split("/")[0]}/${now.split("/")[2]}`
	);
	let fb = new Date(
		`${fechaBase.split("/")[1]}/${fechaBase.split("/")[0]}/${
			fechaBase.split("/")[2]
		}`
	);
	if (
		now.replace(",", "").split(" ")[0] ===
		fechaBase.replace(",", "").split(" ")[0]
	) {
		hora = Math.trunc((fa - fb) / 60000);
		if (hora < 31) {
			fecha = `${hora} minutes ago`;
		} else {
			fecha = fechaBase.replace(",", "").split(" ")[1];
		}
	} else {
		fecha = fechaBase.replace(",", "").split(" ")[0];
	}

	return fecha;
};

const lobsWithDate = (data) => {
	const lwd = data.map((lob) => {
		const fecha = dateConfig(lob.DateRegistry);
		lob.DateRegistry = fecha;
		return lob;
	});
	return lwd;
};
//filtra los team leaders de cada LOB
export const teamLeaderList = async (data, firstLob) => {
	const TLList = data.filter((lob) => lob.NameLob === firstLob.NameLob);
	return TLList;
};

export const getTopics = (topics) => {
	const arr = [];
	topics.forEach((t) => arr.push(t.NameCategory));
	return arr;
};

export const wordExist = (categories, newCategory) => {
	let error = "";
	categories.forEach((cat) => {
		const newName = newCategory.NameCategory.toLowerCase();
		const exist = cat.NameCategory.toLowerCase();
		const word = exist.includes(newName);
		if (word === true) {
			error = "There is a category with that name";
		}
	});
	return error;
};

export const dateFormat = (fechaInfo) => {
	let fecha;
	let hora;
	let fechaBase = new Date(fechaInfo).toLocaleString([], {
		timeZone: "Etc/UTC",
		hourCycle: "h23",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});

	let now = new Date().toLocaleString([], {
		hourCycle: "h23",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});

	let fa = new Date(
		`${now.split("/")[1]}/${now.split("/")[0]}/${now.split("/")[2]}`
	);
	let fb = new Date(
		`${fechaBase.split("/")[1]}/${fechaBase.split("/")[0]}/${
			fechaBase.split("/")[2]
		}`
	);

	if (
		now.replace(",", "").split(" ")[0] ===
		fechaBase.replace(",", "").split(" ")[0]
	) {
		hora = Math.trunc((fa - fb) / 60000);
		if (hora < 31) {
			fecha = `${hora} minutes ago`;
		} else {
			fecha = fechaBase.replace(",", "").split(" ")[1];
		}
	} else {
		fecha = fechaBase.replace(",", "").split(" ")[0];
	}

	return fecha;
};

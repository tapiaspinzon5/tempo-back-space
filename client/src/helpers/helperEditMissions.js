export const dtsEditMissions = (dataMiss) => {
	//console.log(dataMiss);
	const data = dataQuestion(dataMiss.RespuestasTemp);
	data.splice.apply(
		data,
		[0, 0].concat([
			[
				{
					quizName: dataMiss.NameExamTemp,
					quizDescription: dataMiss.DescriptionExamTemp,
					quizCategory: dataMiss.Category,
					quizTarget: dataMiss.ApprovalExamTemp,
					quizQuestions: `${dataMiss.RespuestasTemp.length}`,
				},
			],
		])
	);
	const dts = {
		data,
		idQuiz: dataMiss.IdExamen,
	};
	return dts;
};

const dataQuestion = (data) => {
	const dqts = data.map((q) => {
		const quartile = q.Tenior === "all" ? "All" : q.Tenior;
		switch (q.TypeQuestionId) {
			case 1:
				const ansMC = q.RespuestasAG.filter((el) => el.checked);
				return [
					{
						1: q.RespuestasAG[0].value,
						2: q.RespuestasAG[1].value,
						3: q.RespuestasAG[2].value,
						4: q.RespuestasAG[3].value,
						questionType: "multipleChoice",
						ask: q.Pregunta,
						answer: ansMC[0].value,
						Q: quartile === "All" ? quartile : quartile.replace("T", "Q"),
					},
				];
			case 2:
				const ansTF = q.RespuestasAG.filter((el) => el.checked);
				return [
					{
						questionType: "trueFalse",
						ask: q.Pregunta,
						answer: ansTF[0].value,
						Q: quartile === "All" ? quartile : quartile.replace("T", "Q"),
					},
				];
			case 3:
				const ansMA = `${q.RespuestasAG[0].checked ? "A" : ""}${
					q.RespuestasAG[1].checked ? "B" : ""
				}${q.RespuestasAG[2].checked ? "C" : ""}${
					q.RespuestasAG[3].checked ? "D" : ""
				}`;
				return [
					{
						1: q.RespuestasAG[0].value,
						2: q.RespuestasAG[1].value,
						3: q.RespuestasAG[2].value,
						4: q.RespuestasAG[3].value,
						questionType: "multipleAnswer",
						Q: quartile === "All" ? quartile : quartile.replace("T", "Q"),
						ask: q.Pregunta,
						check1: q.RespuestasAG[0].checked,
						check2: q.RespuestasAG[1].checked,
						check3: q.RespuestasAG[2].checked,
						check4: q.RespuestasAG[3].checked,
						answer: ansMA,
					},
				];
			default:
				return q;
		}
	});
	return dqts;
};

/* const dts = {
	data: [
		[
			{
				quizName: dataMiss.NameExamTemp,
				quizDescription: dataMiss.NameExamTemp,
				quizCategory: dataMiss.Category,
				quizTarget: dataMiss.ApprovalExamTemp,
				quizQuestions: `${dataMiss.RespuestasTemp.lenght}`,
			},
		],
		[
			{
				questionType: "trueFalse",
				ask: "pregunta true false",
				answer: "true",
				Q: "All",
			},
		],
		[
			{
				1: "rta1",
				2: "rta2",
				3: "rta3",
				4: "rta4",
				questionType: "multipleChoice",
				ask: "multiple opcion",
				answer: "rta3",
				Q: "Q1",
			},
		],
		[
			{
				1: "rta1",
				2: "rta2",
				3: "rta3",
				4: "rta4",
				questionType: "multipleAnswer",
				Q: "All",
				ask: "multiple res",
				check1: false,
				check2: true,
				check3: true,
				check4: false,
				answer: "BC",
			},
		],
	],
	idQuiz: 2,
	idccms: "4468566",
};
 */

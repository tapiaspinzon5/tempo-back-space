import React from "react";
import { Typography, Box, styled, Button } from "@mui/material";
import instructions from "../../assets/images/instructions.png";
import Quiz_template from "../../assets/filesTemplatesCSV/QuizTemplate.csv";
import OM_template from "../../assets/filesTemplatesCSV/OpsManagerTemplate.csv";
import RL_template from "../../assets/filesTemplatesCSV/ReportingTemplate.csv";
import SU_template from "../../assets/filesTemplatesCSV/SuperUserTemplate.csv";
import Kpi_template from "../../assets/filesTemplatesCSV/Load_Kpi_Template.csv";

const MainModal = styled(Box)(() => ({
	minHeight: "50vh",
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-around",
	textAlign: "center",

	h5: {
		fontWeight: 900,
		marginBottom: "2rem",
	},

	button: {
		textTransform: "none",
		color: "white",
		width: "177px",
		height: "61px",
		background: "linear-gradient(180deg, #3047B0 0%, #0087FF 100%)",
	},
}));
const Su = () => {
	return (
		<Typography variant="body2" color="initial">
			Ident: CCMSID del operation Manager (Solo números)
			<br /> TeamName: Nombre del equipo <br /> KPI: KPI a evaluar (i.e.: %Abs,
			AHT_In, QACL )<br /> Campaign: Nombre de la campaña
			<br /> Q1: valores objetivos para agentes Q1 (solo números)
			<br /> Q2: valores objetivos para agentes Q2 (solo números) <br /> Q3:
			valores objetivos para agentes Q3 (solo números) <br /> Q4: valores
			objetivos para agentes Q4 (solo números)
			<br />
			Target: valor objetivo para el KPI (solo números)
			<br />
			Order: "asc"(mas mejor) o "dsc"(menos mejor)
		</Typography>
	);
};
const Om = () => {
	return (
		<Typography variant="body2" color="initial">
			Ident: CCMSID del usuario al cual se le va asignar un rol (Solo números)
			<br />
			RoleAgent: Rol que va a desempeñar el usuario. (Team Leader, Reporting
			Lead,QA Lead) <br />
			Team: Nombre del equipo al cual va a pertenecer
			<br /> Lob: Nombre de la "line of bussines"
		</Typography>
	);
};
const Rep = () => {
	return (
		<Typography variant="body2" color="initial">
			Quartile: Cuartile en que se ubica el agente (Q1, Q2, Q3, Q4). <br />
			Ident: CCMSID del agente (solo numeros)
			<br /> Team: Nombre del equipo al que va a pertenecer
			<br /> RoleAgent: en este campo solo debe ir la palabra "Agent"
		</Typography>
	);
};

const Qa = () => {
	return (
		<Typography variant="body2" color="initial">
			Question: campo para ingresar el enunciado de la pregunta
			<br /> Option1: primera respuesta
			<br /> Option2: segunda respuesta <br />
			Option3: Tercera respuesta (dejar en blanco, si la pregunta es verdaro o
			falso) <br />
			Option4: Cuarta respuesta (dejar en blanco, si la pregunta es verdaro o
			falso)
			<br /> Answer: Respuesta correcta (debe ser el mismo texto de la opcion)
			<br />
			Quartile: Cuartil del agente al que va destinada la pregunta
			<br /> ExamName: Nombre del examen
			<br /> DescriptionExam: Descripcion del examen
			<br /> ApprovalExam: Porcentaje con el que se aprueba el examen (solo
			numeros sin el signo %)
			<br /> LOB: Nombre de la "line of bussines"
			<br />
			Topic: Nombre de la categoria a la que pertenece el quiz
		</Typography>
	);
};

const LoadKpis = () => {
	return (
		<Typography variant="body2" color="initial">
			Kpi: campo para ingresar el acronimo del KPI
			<br /> unitKpi: Unidad de medida del Kpi(Percentage, Seconds, Minutes,
			Avg)
			<br /> Type: Tipo de Unidad (1,2,4,5) <br />
			<br />
			La relacion entre Type y unitKpi debe ser
			<br /> 1= Hours
			<br /> 2 = Seconds
			<br />4 = Avg
			<br />5 = Percentage
			<br />
			<br /> Idccms:CCMSID del agente (solo numeros)
			<br /> Date: Fecha de resultado de Kpi (sigue el siguiente formato
			MM/DD/YYYY)
			<br /> Score: Valor de resultado Kpi (solo numeros)
		</Typography>
	);
};

const UpQuizModal = ({ handleClose, template }) => {
	let dwounloadTemplate;
	switch (template) {
		case "Quiz Template":
			dwounloadTemplate = Quiz_template;
			break;
		case "OM Template":
			dwounloadTemplate = OM_template;
			break;
		case "Rep Lead Template":
			dwounloadTemplate = RL_template;
			break;
		case "Super User Template":
			dwounloadTemplate = SU_template;
			break;
		case "Load Kpi Template":
			dwounloadTemplate = Kpi_template;
			break;

		default:
			break;
	}

	//Funcion para descargar archivos locales
	const downloadFile = () => {
		var link = document.createElement("a");
		link.setAttribute("download", template);
		//link.href = Quiz_template;
		link.href = dwounloadTemplate;
		document.body.appendChild(link);
		link.click();
		link.remove();
		handleClose();
	};

	return (
		<MainModal>
			<img src={instructions} alt="instructions" />
			<Box marginBottom={5}>
				<Typography variant="h5" color="initial">
					Instructions for downloading the {template}
				</Typography>
				<Typography variant="body1" color="initial">
					Below you will find the instructions that you must attend and carry
					out to download the {template}
				</Typography>
				{template === "Quiz Template" ? (
					<Qa />
				) : template === "OM Template" ? (
					<Om />
				) : template === "Rep Lead Template" ? (
					<Rep />
				) : template === "Super User Template" ? (
					<Su />
				) : template === "Load Kpi Template" ? (
					<LoadKpis />
				) : (
					<Typography variant="body2" color="initial">
						We work
					</Typography>
				)}
			</Box>
			<Box>
				<Button sx={{ marginRight: "2rem" }} onClick={handleClose}>
					Return
				</Button>
				<Button onClick={() => downloadFile()}>Download</Button>
			</Box>
		</MainModal>
	);
};

export default UpQuizModal;

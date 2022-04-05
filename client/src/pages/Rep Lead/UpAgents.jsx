import React, { useState, useEffect } from "react";
import {
	Typography,
	Grid,
	styled,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Modal,
	Box,
	Button,
} from "@mui/material";
import { useSelector } from "react-redux";
//import Header from "../components/homeUser/Header";
import Footer from "../../components/Footer";
import { FiDownload } from "react-icons/fi";
import {
	downloadDataAdmin,
	downloadReportExp,
	downloadReportKpi,
} from "../../utils/api";
import { UploadAgents } from "../../components/Agents/UploadAgents";
import { ModalLoading } from "../../components/ModalLoading";
import UpQuizModal from "../../components/Modals/UpQuizModal";
import ExcelJS from "exceljs";

const MainUpCampaign = styled(Grid)(({ theme }) => ({
	position: "relative",
	overflow: "hidden",
	minHeight: "90vh",
	width: "100%",
	padding: "0 2rem 2rem",
	[theme.breakpoints.down("md")]: {
		top: "15px",
	},
}));
const ModalBox = styled(Box)(() => ({
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	//width: 400,
	borderRadius: "20px",
	boxShadow: "2px 2px 5px #2f2f2f",
	padding: "1rem",
	backgroundColor: "RGBA(255,255,255,0.9)",
}));

export const UpAgents = () => {
	const [loading, setLoading] = useState(false);
	const userData = useSelector((store) => store.loginUser.userData);
	const idccms = userData.Idccms;
	const [template, setTemplate] = useState("");
	const [open, setOpen] = React.useState(false);

	const [myAgents, setMyAgents] = useState([]);
	const [repKpi, setRepKpi] = useState([]);
	const [repExp, setRepExp] = useState([]);
	const [download, setDownload] = useState(true);

	useEffect(() => {
		const getData = async () => {
			const agents = await downloadDataAdmin(idccms, 3);
			setMyAgents(agents.data);
		};

		getData();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		const getReports = async () => {
			const expReport = await downloadReportExp(idccms);
			const kpiReport = await downloadReportKpi(idccms);
			if (
				expReport &&
				expReport.status === 200 &&
				expReport.data.length > 4 &&
				expReport.data[0].length !== 0 &&
				kpiReport &&
				kpiReport.status === 200 &&
				kpiReport.data.length > 4 &&
				kpiReport.data[0].length !== 0
			) {
				setDownload(false);
				setRepExp(expReport.data);
				setRepKpi(kpiReport.data);
			}
		};

		getReports();
		// eslint-disable-next-line
	}, []);

	const handleOpen = () => {
		setOpen(true);
		setTemplate("Rep Lead Template");
	};
	const handleClose = () => {
		setOpen(false);
	};
	const kpiSheet = (workbook) => {
		const worksheet = workbook.getWorksheet("KPI´s");
		worksheet.columns = [
			{ header: "Campaign", key: "Campaign" },
			{ header: "CCMS ID Agent", key: "IdAgent" },
			{ header: "Agent", key: "Agent" },
			{ header: "Level", key: "level" },
			{ header: "Quartile", key: "Quartile" },
			{ header: "LOB", key: "Lob" },
			{ header: "CCMS ID Team Leader", key: "idTeamLeader" },
			{ header: "Team Leader", key: "TeamLeader" },
			{ header: "Team Name", key: "team" },
			{ header: "IdEquipo", key: "IdEquipo" },
			{ header: "Date Value", key: "Date" },
			{ header: "Week Average", key: "Week" },
			{ header: "Kpi", key: "kpi" },
			{ header: "Unit Kpi", key: "unitKpi" },
			{ header: "Value Kpi", key: "KPIR" },
			{ header: "Average Kpi Week", key: "AverageWeek" },
			{ header: "Average Kpi Month", key: "AverageMonth" },
		];
		worksheet.addRows(repKpi);
	};
	const expSheet = (workbook) => {
		const worksheet = workbook.getWorksheet("Space GP");
		worksheet.columns = [
			{ header: "Campaign", key: "Campaign" },
			{ header: "CCMS ID Agent", key: "IdAgent" },
			{ header: "Agent", key: "Agent" },
			{ header: "Level", key: "Level" },
			{ header: "Quartile", key: "Quartile" },
			{ header: "LOB", key: "Lob" },
			{ header: "CCMS ID Team Leader", key: "idTeamLeader" },
			{ header: "Team Leader", key: "TeamLeader" },
			{ header: "Team Name", key: "Team" },
			{ header: "IdEquipo", key: "IdEquipo" },
			{ header: "Date Value", key: "Date" },
			{ header: "Week Average", key: "Week" },
			{ header: "Score", key: "ScoreExp" },
			{ header: "Score Week", key: "SumExpWeek" },
			{ header: "Score Month", key: "SumExpMonth" },
			{ header: "Epicoins in GP", key: "ScoreCoins" },
			{ header: "Epicoins GP Week", key: "SumCoinsWeek" },
			{ header: "Epicoins GP Month", key: "SumCoinsMonth" },
			{ header: "Login", key: "Login" },
		];
		/* 
AssignedMissions: 3
BadgesWon: "Polished and Ready"
ChallengesWon: 0
FalledMissions: 0
QuizGrading: 0
 */
		worksheet.addRows(repExp);
	};

	const handleDownloadReport = async (e) => {
		e.preventDefault();
		const workbook = new ExcelJS.Workbook();
		workbook.addWorksheet("KPI´s");
		workbook.addWorksheet("EXP Points");
		await kpiSheet(workbook);
		await expSheet(workbook);
		let fecha = new Date().toLocaleDateString();
		const uint8Array = await workbook.xlsx.writeBuffer();
		const blob = new Blob([uint8Array], { type: "application/octet-binary" });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `Report_${fecha}.xlsx`;
		a.click();
		a.remove();
	};

	return (
		<>
			{loading && <ModalLoading />}
			<Grid width="100%">
				<MainUpCampaign>
					<Modal
						open={open}
						onClose={handleClose}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<ModalBox sx={{ width: { xs: "390px", md: "600px", lg: "780px" } }}>
							<UpQuizModal handleClose={handleClose} template={template} />
						</ModalBox>
					</Modal>
					<Grid container>
						<Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
							<Typography variant="h5" fontWeight="bold" mt={4}>
								Acquire new skills to strengthen your progress
							</Typography>
							<Typography variant="body1" mt={2}>
								Acquire new skills to strengthen your progress
							</Typography>
						</Grid>
						<Grid item mt={4} xs={12} sm={6} md={6} lg={3} xl={2}>
							<Button
								disabled={download}
								startIcon={<FiDownload />}
								onClick={handleDownloadReport}
								sx={{ height: "3rem", textTransform: "none" }}
							>
								Download Reports
							</Button>
						</Grid>
					</Grid>

					<Grid container spacing={3} mt={4}>
						<Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
							<UploadAgents idccms={idccms} setLoading={setLoading} />
							<Button
								startIcon={<FiDownload />}
								onClick={handleOpen}
								sx={{ height: "3rem", textTransform: "none" }}
							>
								Download Rep. Lead Template
							</Button>
						</Grid>
						<Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
							<TableContainer component={Paper}>
								<Table sx={{ minWidth: 300 }} aria-label="simple table">
									<TableHead>
										<TableRow>
											<TableCell sx={{ color: "#3047B0" }}>Teams</TableCell>
											<TableCell align="right" sx={{ color: "#3047B0" }}>
												Agents
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{myAgents.map((row, index) => (
											<TableRow
												key={index}
												sx={{
													"&:last-child td, &:last-child th": { border: 0 },
												}}
											>
												<TableCell
													component="th"
													scope="row"
													sx={{ color: "#3047B0" }}
												>
													{row.Nombre}
												</TableCell>
												<TableCell align="right" sx={{ color: "#3047B0" }}>
													{row.Total}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</Grid>
					</Grid>
				</MainUpCampaign>
				<Footer />
			</Grid>
		</>
	);
};

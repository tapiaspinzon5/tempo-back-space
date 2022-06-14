import React, { useState } from "react";
import { Typography, Box, styled, Button, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DownloadingComponent from "../DownloadingComponent";
import ExcelJS from "exceljs";
import { requestWithData } from "../../utils/api";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/loginDuck";
import { useNavigate } from "react-router-dom";

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
}));

const MainButtons = styled(Box)(() => ({
	button: {
		textTransform: "none",
		color: "white",
		width: "177px",
		height: "61px",
		background: "linear-gradient(180deg, #3047B0 0%, #0087FF 100%)",
	},
}));

export const DownLoadReportSA = ({ setModal }) => {
	const navigate = useNavigate();
	const rxDispatch = useDispatch();
	const [date1, setDate1] = useState(null);
	const [date2, setDate2] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [noData, setNoData] = useState(false);
	const [report, setReport] = useState(false);
	const [topUsersConexion, setTopUsersConexion] = useState([]);
	const [monthConexion, setMonthConexion] = useState([]);
	const [dailyConexion, setDailyConexion] = useState([]);
	const [changesTeams, setChangesTeams] = useState([]);
	const [challengesTime, setChallengesTime] = useState([]);
	const [usersRetan, setusersRetan] = useState([]);
	const [usersRetados, setusersRetados] = useState([]);
	const [usersInteractions, setusersInteractions] = useState([]);
	const [chargeData, setChargeData] = useState([]);
	const [rolesQ, setrolesQ] = useState([]);
	const [rolesD, setrolesD] = useState([]);
	const [genInfo, setGenInfo] = useState([]);

	const topcxSheet = (workbook) => {
		const worksheet = workbook.getWorksheet("Top_Users_Connection");
		worksheet.columns = [
			{ header: "Campaign", key: "nameCampaign" },
			{ header: "LOB", key: "NameLob" },
			{ header: "Team Name", key: "NameTeam" },
			{ header: "CCMS ID", key: "ident" },
			{ header: "User", key: "UserLog" },
			{ header: "Total Log", key: "TotalLog" },
		];
		worksheet.addRows(topUsersConexion);
	};

	const monthcxSheet = (workbook) => {
		const worksheet = workbook.getWorksheet("Month Connection");
		worksheet.columns = [
			{ header: "Campaign", key: "nameCampaign" },
			{ header: "LOB", key: "NameLob" },
			{ header: "Team Name", key: "NameTeam" },
			{ header: "CCMS ID", key: "ident" },
			{ header: "User", key: "UserLog" },
			{ header: "Month", key: "Month" },
			{ header: "Total Log", key: "TotalLog" },
		];
		worksheet.addRows(monthConexion);
	};

	const daycxSheet = (workbook) => {
		const worksheet = workbook.getWorksheet("daily Connection");
		worksheet.columns = [
			{ header: "Campaign", key: "nameCampaign" },
			{ header: "LOB", key: "NameLob" },
			{ header: "Team Name", key: "NameTeam" },
			{ header: "CCMS ID", key: "ident" },
			{ header: "User", key: "UserLog" },
			{ header: "Date Log", key: "DateLog" },
			{ header: "Total Log", key: "TotalLog" },
		];
		worksheet.addRows(dailyConexion);
	};
	const changesTeamsSheet = (workbook) => {
		const worksheet = workbook.getWorksheet("Teams Changes");
		worksheet.columns = [
			{ header: "Campaign", key: "nameCampaign" },
			{ header: "LOB", key: "NameLob" },
			{ header: "Team Name", key: "NameTeam" },
			{ header: "CCMS ID", key: "ident" },
			{ header: "User", key: "UserLog" },
			{ header: "Date Change", key: "FchChange" },
		];
		worksheet.addRows(changesTeams);
	};
	const challengesTimeSheet = (workbook) => {
		const worksheet = workbook.getWorksheet("Time Challenges");
		worksheet.columns = [
			{ header: "Campaign", key: "nameCampaign" },
			{ header: "LOB", key: "NameLob" },
			{ header: "Team Name", key: "NameTeam" },
			{ header: "CCMS ID", key: "ident" },
			{ header: "User", key: "UserLog" },
			{ header: "Time", key: "TimeCompleteChallenge" },
		];
		worksheet.addRows(challengesTime);
	};
	const retosSheet = (workbook) => {
		const worksheet = workbook.getWorksheet("The most challenging");
		worksheet.columns = [
			{ header: "Campaign", key: "nameCampaign" },
			{ header: "LOB", key: "NameLob" },
			{ header: "Team Name", key: "NameTeam" },
			{ header: "CCMS ID", key: "identAssignement" },
			{ header: "User", key: "NameAssignement" },
			{ header: "Month", key: "Month" },
			{ header: "Year", key: "Year" },
			{ header: "Total Challenges", key: "TotalChallenges" },
		];
		worksheet.addRows(usersRetan);
	};

	const retadoSheet = (workbook) => {
		const worksheet = workbook.getWorksheet("The most challenged");
		worksheet.columns = [
			{ header: "Campaign", key: "nameCampaign" },
			{ header: "LOB", key: "NameLob" },
			{ header: "Team Name", key: "NameTeam" },
			{ header: "CCMS ID", key: "ident" },
			{ header: "User", key: "Agent" },
			{ header: "Month", key: "Month" },
			{ header: "Year", key: "Year" },
			{ header: "Total Challenges", key: "TotalChallenges" },
		];
		worksheet.addRows(usersRetados);
	};
	const interactionSheet = (workbook) => {
		const worksheet = workbook.getWorksheet("Those who interact the most");
		worksheet.columns = [
			{ header: "Campaign", key: "nameCampaign" },
			{ header: "LOB", key: "NameLob" },
			{ header: "Team Name", key: "NameTeam" },
			{ header: "CCMS ID", key: "AssignmentUser" },
			{ header: "User", key: "User" },
			{ header: "Date", key: "DateRegistry" },
			{ header: "Total", key: "Total" },
		];
		worksheet.addRows(usersInteractions);
	};
	const chargeSheet = (workbook) => {
		const worksheet = workbook.getWorksheet("Those who upload the most files");
		worksheet.columns = [
			{ header: "CCMS ID", key: "ident" },
			{ header: "State", key: "Estado" },
			{ header: "Total File KPI", key: "TotalFilesKPI" },
			{ header: "Load Agents", key: "LoadAgent" },
			{ header: "Load Missions", key: "LoadMissions" },
		];
		worksheet.addRows(chargeData);
	};
	const rolesSheet = (workbook) => {
		const worksheet = workbook.getWorksheet("Users by role");
		worksheet.columns = [
			{ header: "Campaign", key: "nameCampaign" },
			{ header: "LOB", key: "NameLob" },
			{ header: "Team Name", key: "NameTeam" },
			{ header: "Role", key: "RoleAgent" },
			{ header: "Total", key: "Total" },
		];
		worksheet.addRows(rolesQ);
	};
	const rolesDSheet = (workbook) => {
		const worksheet = workbook.getWorksheet("Role users");
		worksheet.columns = [
			{ header: "Campaign", key: "nameCampaign" },
			{ header: "LOB", key: "NameLob" },
			{ header: "Team Name", key: "NameTeam" },
			{ header: "CCMS ID", key: "ident" },
			{ header: "User", key: "User" },
			{ header: "Role", key: "RoleAgent" },
		];
		worksheet.addRows(rolesD);
	};

	const generalInfoSheet = (workbook) => {
		const worksheet = workbook.getWorksheet("General Information");
		worksheet.columns = [
			{ header: "Campaign", key: "Campaign" },
			{ header: "LOB", key: "LOB" },
			{ header: "Team Name", key: "Team" },
			{ header: "CCMS ID", key: "ccmsid" },
			{ header: "User", key: "Name" },
			{ header: "Role", key: "Role" },
			{ header: "EXP Points", key: "ExpPoint" },
			{ header: "Badges Earned", key: "BadgesEarned" },
			{ header: "Missions Assigned", key: "Missions Assigned" },
			{ header: "Missions Approved", key: "MissionsApproved" },
			{ header: "Missions Failed", key: "MissionsFailed" },
			{ header: "Missions Score", key: "MissionsScore" },
			{
				header: "Missions Questions Approved",
				key: "MissionsQuestionsApproved",
			},
			{ header: "Missions Questions Failed", key: "MissionsQuestionsFailed" },
			{ header: "Challenges Assigned", key: "ChallengesAssigned" },
			{ header: "Challenges Won", key: "ChallengesWon" },
			{ header: "Kpi 1", key: "Kpi1" },
			{ header: "Score Kpi 1", key: "ScoreKpi1" },
			{ header: "Kpi 2", key: "Kpi2" },
			{ header: "Score Kpi 2", key: "ScoreKpi2" },
			{ header: "Kpi 3", key: "Kpi3" },
			{ header: "Score Kpi 3", key: "ScoreKpi3" },
			{ header: "Kpi 4", key: "Kpi4" },
			{ header: "Score Kpi 4", key: "ScoreKpi4" },
			{ header: "Kpi 5", key: "Kpi5" },
			{ header: "Score Kpi 5", key: "ScoreKpi5" },
		];
		worksheet.addRows(genInfo);
	};

	const handleReport = async () => {
		setLoading(true);
		const data1 = await requestWithData("getusersconnections", {
			initDate: date1,
			endDate: date2,
			context: 1,
		});

		if (data1 && data1.status === 200 && data1.data.length > 0) {
			if (data1) {
				const data2 = await requestWithData("getusersconnections", {
					initDate: date1,
					endDate: date2,
					context: 2,
				});
				if (data2) {
					const data3 = await requestWithData("getusersconnections", {
						initDate: date1,
						endDate: date2,
						context: 3,
					});
					if (data3) {
						const data4 = await requestWithData("getusersteamchanges", {
							initDate: date1,
							endDate: date2,
						});
						if (data4) {
							const data5 = await requestWithData(
								"getuserstimecompletechallenges",
								{
									initDate: date1,
									endDate: date2,
								}
							);
							if (data5) {
								const data6 = await requestWithData("getmoreinteractiveusers", {
									initDate: date1,
									endDate: date2,
									context: 1,
								});
								if (data6) {
									const data7 = await requestWithData(
										"getmoreinteractiveusers",
										{
											initDate: date1,
											endDate: date2,
											context: 2,
										}
									);
									if (data7) {
										const data8 = await requestWithData(
											"getmoreinteractiveusers",
											{
												initDate: date1,
												endDate: date2,
												context: 3,
											}
										);
										if (data8) {
											const data9 = await requestWithData("gettopuploaders", {
												initDate: date1,
												endDate: date2,
											});
											if (data9) {
												const data10 = await requestWithData("getrolesinfo", {
													initDate: date1,
													endDate: date2,
													context: 1,
												});
												if (data10) {
													const data11 = await requestWithData("getrolesinfo", {
														initDate: date1,
														endDate: date2,
														context: 2,
													});
													if (data11) {
														const data12 = await requestWithData(
															"getgeneralanalytics",
															{
																initDate: date1,
																endDate: date2,
															}
														);
														setTopUsersConexion(data1.data);
														setMonthConexion(data2.data);
														setDailyConexion(data3.data);
														setChangesTeams(data4.data);
														setChallengesTime(data5.data);
														setusersRetan(data6.data);
														setusersRetados(data7.data);
														setusersInteractions(data8.data);
														setChargeData(data9.data);
														setrolesQ(data10.data);
														setrolesD(data11.data);
														setReport(true);
														setLoading(false);
														setGenInfo(data12.data[0].Analitycs);
													} else {
														setLoading(false);
														setNoData(true);
													}
												} else {
													setLoading(false);
													setNoData(true);
												}
											} else {
												setLoading(false);
												setNoData(true);
											}
										} else {
											setLoading(false);
											setNoData(true);
										}
									} else {
										setLoading(false);
										setNoData(true);
									}
								} else {
									setLoading(false);
									setNoData(true);
								}
							} else {
								setLoading(false);
								setNoData(true);
							}
						} else {
							setLoading(false);
							setNoData(true);
						}
					} else {
						setLoading(false);
						setNoData(true);
					}
				} else {
					setLoading(false);
					setNoData(true);
				}
			} else {
				setLoading(false);
				setNoData(true);
			}
		} else if (data1 && data1.data === "UnauthorizedError") {
			rxDispatch(logoutAction());
			navigate("/");
		} else {
			setLoading(false);
			setError(true);
		}
	};

	const handleDownload = async (e) => {
		e.preventDefault();
		const workbook = new ExcelJS.Workbook();
		workbook.addWorksheet("General Information");
		workbook.addWorksheet("Top_Users_Connection");
		workbook.addWorksheet("Month Connection");
		workbook.addWorksheet("daily Connection");
		workbook.addWorksheet("Teams Changes");
		workbook.addWorksheet("Time Challenges");
		workbook.addWorksheet("The most challenging");
		workbook.addWorksheet("The most challenged");
		workbook.addWorksheet("Those who interact the most");
		workbook.addWorksheet("Those who upload the most files");
		workbook.addWorksheet("Users by role");
		workbook.addWorksheet("Role users");
		generalInfoSheet(workbook);
		topcxSheet(workbook);
		monthcxSheet(workbook);
		daycxSheet(workbook);
		changesTeamsSheet(workbook);
		challengesTimeSheet(workbook);
		retosSheet(workbook);
		retadoSheet(workbook);
		interactionSheet(workbook);
		chargeSheet(workbook);
		rolesSheet(workbook);
		rolesDSheet(workbook);
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
		<MainModal>
			<Typography variant="h3" color="initial">
				Select Report Dates
			</Typography>
			{loading ? (
				<>
					<Typography variant="body1" color="initial">
						This process can take time, please do not close the window until the
						report is downloaded.
					</Typography>
					<DownloadingComponent theme={"Report"} />
				</>
			) : report ? (
				<MainButtons>
					<Button sx={{ marginRight: "2rem" }} onClick={handleDownload}>
						Download Report
					</Button>
				</MainButtons>
			) : (
				<Box
					sx={{
						display: "flex",
						margin: "2rem 0 0 2rem",
						justifyContent: "center",
						textAlign: "center",
					}}
				>
					<LocalizationProvider
						dateAdapter={AdapterDateFns}
						sx={{ width: "20rem" }}
					>
						<DatePicker
							label="Start"
							value={date1}
							onChange={(newValue) => {
								setDate1(
									`${newValue.getFullYear()}-${
										newValue.getMonth() + 1
									}-${newValue.getDate()}`
								);
							}}
							renderInput={(params) => <TextField {...params} />}
						/>
						<DatePicker
							label="End"
							value={date2}
							onChange={(newValue) => {
								setDate2(
									`${newValue.getFullYear()}-${
										newValue.getMonth() + 1
									}-${newValue.getDate()}`
								);
							}}
							renderInput={(params) => (
								<TextField {...params} sx={{ m: "0 4rem" }} />
							)}
						/>
					</LocalizationProvider>
				</Box>
			)}
			<MainButtons>
				<Button sx={{ marginRight: "2rem" }} onClick={() => setModal(false)}>
					Return
				</Button>
				<Button sx={{ marginRight: "2rem" }} onClick={handleReport}>
					Generate Report
				</Button>
			</MainButtons>
		</MainModal>
	);
};

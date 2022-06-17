import React, { useState } from "react";
import {
	Box,
	FormControl,
	InputLabel,
	Select,
	TextField,
	MenuItem,
	styled,
	Grid,
	Button,
} from "@mui/material";
import { FiDownload } from "react-icons/fi";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useSelector } from "react-redux";

const BoxFormControl = styled(FormControl)(() => ({
	width: "8rem",
	margin: "2rem 0 0 2rem",
}));

const BoxSelect = styled(Box)(() => ({
	display: "flex",
	marginBottom: "1rem",
	color: "red",
}));

const LeaderRankBoard = ({ kpis, setFilters, leaderBoard, setModal }) => {
	const userData = useSelector((store) => store.loginUser.userData);
	const userRol = userData.Role;
	const [date1, setDate1] = useState(null);
	const [date2, setDate2] = useState(null);
	const [kpiFilter, setKpiFilter] = useState("");
	const [timeFilter, setTimeFilter] = useState("Day");
	const [groupFilter, setGroupFilter] = useState("My Team");
	return (
		<>
			<BoxSelect>
				<BoxFormControl>
					<InputLabel id="kpi-label">Kpi</InputLabel>
					<Select
						labelId="kpi-label"
						value={kpiFilter}
						label="Kpi"
						onChange={(e) => {
							setKpiFilter(e.target.value);
							setFilters({
								kpi: e.target.value,
								time: timeFilter,
								group: groupFilter,
								start: date1,
								end: date2,
							});
						}}
					>
						{leaderBoard && <MenuItem value="">EXP Points</MenuItem>}
						{kpis.map((kpi, index) => (
							<MenuItem key={index} value={kpi.Kpi}>
								{kpi.Kpi}
							</MenuItem>
						))}
					</Select>
				</BoxFormControl>
				{leaderBoard && (
					<BoxFormControl>
						<InputLabel id="time-label">Time View</InputLabel>
						<Select
							labelId="time-label"
							value={timeFilter}
							label="Time View"
							onChange={(e) => {
								setTimeFilter(e.target.value);
								setFilters({
									kpi: kpiFilter,
									time: e.target.value,
									group: groupFilter,
									start: date1,
									end: date2,
								});
							}}
						>
							<MenuItem value="Day">Day</MenuItem>
							<MenuItem value="Week">Week</MenuItem>
							<MenuItem value="Month">Month</MenuItem>
						</Select>
					</BoxFormControl>
				)}
				{(userRol === "Team Leader" || userRol === "Agent") && (
					<BoxFormControl>
						<InputLabel id="time-label">Group</InputLabel>
						<Select
							labelId="group-label"
							value={groupFilter}
							label="Group"
							onChange={(e) => {
								setGroupFilter(e.target.value);
								setFilters({
									kpi: kpiFilter,
									time: timeFilter,
									group: e.target.value,
									start: date1,
									end: date2,
								});
							}}
						>
							<MenuItem value="My Team">My Team</MenuItem>
							<MenuItem value="My Campaign">My Campaign</MenuItem>
						</Select>
					</BoxFormControl>
				)}
				{!leaderBoard && (
					<Box
						sx={{
							display: "flex",
							margin: "2rem 0 0 2rem",
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
									setFilters({
										kpi: kpiFilter,
										time: timeFilter,
										group: groupFilter,
										start: `${newValue.getFullYear()}-${
											newValue.getMonth() + 1
										}-${newValue.getDate()}`,
										end: date2,
									});
								}}
								renderInput={(params) => (
									<TextField {...params} sx={{ width: "8rem" }} />
								)}
							/>
							<DatePicker
								minDate={new Date(date1)}
								label="End"
								value={date2}
								onChange={(newValue) => {
									setDate2(
										`${newValue.getFullYear()}-${
											newValue.getMonth() + 1
										}-${newValue.getDate()}`
									);
									setFilters({
										kpi: kpiFilter,
										time: timeFilter,
										group: groupFilter,
										start: date1,
										end: `${newValue.getFullYear()}-${
											newValue.getMonth() + 1
										}-${newValue.getDate()}`,
									});
								}}
								renderInput={(params) => (
									<TextField {...params} sx={{ width: "8rem", m: "0 2rem" }} />
								)}
							/>
						</LocalizationProvider>
					</Box>
				)}
				{!leaderBoard && (
					<Grid
						item
						mt={4}
						xs={12}
						sm={6}
						md={6}
						lg={3}
						xl={2}
						sx={{ marginLeft: "auto" }}
					>
						<Button
							startIcon={<FiDownload />}
							onClick={() => setModal(true)}
							sx={{ height: "3rem", textTransform: "none" }}
						>
							Download Reports
						</Button>
					</Grid>
				)}
			</BoxSelect>
		</>
	);
};

export default LeaderRankBoard;

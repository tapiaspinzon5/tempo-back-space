import React, { useState } from "react";
import {
	Box,
	styled,
	Typography,
	FormControl,
	TextField,
	InputLabel,
	MenuItem,
	Select,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { BsClock } from "react-icons/bs";

const CardMission = styled(Box)(() => ({
	background: "#fff",
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	padding: "1rem",
	borderRadius: "20px",
	marginBottom: "3px",
	color: "#3047b0",
}));
const MissionAssignmentCard = ({ mission, handleMissions, handleTime }) => {
	return (
		<CardMission>
			<input
				type="checkbox"
				className="checkBox"
				name={mission?.Name}
				checked={mission?.isChecked || false}
				onChange={handleMissions}
			/>
			<Box width="55%">
				<Typography variant="body1">{mission.Name}</Typography>
				<Typography variant="caption">{mission.Topic}</Typography>
			</Box>
			<Box display="flex" alignItems="center">
				<BsClock size={20} color="#3047B0" />
			</Box>
			<Box display="flex" alignItems="center">
				<Typography variant="caption" marginRight={1}>
					Time
				</Typography>
			</Box>
			<Box sx={{ display: "flex", mt: "1rem" }}>
				<LocalizationProvider
					dateAdapter={AdapterDateFns}
					sx={{ width: "20rem" }}
				>
					<DatePicker
						label="Start"
						value={mission.start}
						onChange={(newValue) => {
							handleTime(
								"start",
								`${newValue.getFullYear()}-${
									newValue.getMonth() + 1
								}-${newValue.getDate()}`,
								mission.Name
							);
						}}
						renderInput={(params) => <TextField {...params} />}
					/>
					<DatePicker
						label="End"
						value={mission.end}
						onChange={(newValue) => {
							handleTime(
								"end",
								`${newValue.getFullYear()}-${
									newValue.getMonth() + 1
								}-${newValue.getDate()}`,
								mission.Name
							);
						}}
						renderInput={(params) => <TextField {...params} />}
					/>
				</LocalizationProvider>
			</Box>
			{/* <FormControl sx={{ width: "25%", height: "50%" }} size="small">
				<InputLabel id="demo-simple-select-label">Time</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={mission.time}
					label="Assignment Time"
					onChange={(e) => handleTime(e, mission.Name)}
				>
					<MenuItem value={"daily"}>Daily</MenuItem>
					<MenuItem value={"weekly"}>Weekly</MenuItem>
					<MenuItem value={"monthly"}>Monthly</MenuItem>
				</Select>
			</FormControl> */}
		</CardMission>
	);
};

export default MissionAssignmentCard;

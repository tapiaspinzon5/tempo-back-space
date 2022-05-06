import React from "react";
import {
	Box,
	styled,
	Typography,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from "@mui/material";
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
			<FormControl sx={{ width: "25%", height: "50%" }} size="small">
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
			</FormControl>
		</CardMission>
	);
};

export default MissionAssignmentCard;

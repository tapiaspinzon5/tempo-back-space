import React from "react";
import { styled, Typography, Box } from "@mui/material";

const CardTeam = styled(Box)(() => ({
	background: "#fff",
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	padding: "1rem",
	borderRadius: "20px",
	marginBottom: "3px",
	color: "#3047b0",
}));

const ShowTeamAssign = ({ team, handleTeam }) => {
	return (
		<>
			<CardTeam>
				<input
					type="checkbox"
					className="checkBox"
					name={team.teamName}
					checked={team?.isChecked || false}
					onChange={handleTeam}
				/>
				<Box width="85%">
					<Typography variant="body1">{team.teamName}</Typography>
				</Box>
			</CardTeam>
		</>
	);
};

export default ShowTeamAssign;

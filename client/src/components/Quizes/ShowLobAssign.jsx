import React from "react";
import { styled, Typography, Box } from "@mui/material";

const CardLob = styled(Box)(() => ({
	background: "#fff",
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	padding: "1rem",
	borderRadius: "20px",
	marginBottom: "3px",
	color: "#3047b0",
}));

const ShowLobAssign = ({ lob, handleLob }) => {
	return (
		<>
			<CardLob>
				<input
					type="checkbox"
					className="checkBox"
					name={lob.lobName}
					checked={lob?.isChecked || false}
					onChange={handleLob}
				/>
				<Box width="85%">
					<Typography variant="body1">{lob.lobName}</Typography>
				</Box>
			</CardLob>
		</>
	);
};

export default ShowLobAssign;

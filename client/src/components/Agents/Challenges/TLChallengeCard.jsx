import React from "react";
import { styled, Typography, Box, Radio } from "@mui/material";
import image from "../../../assets/temp-image/challenge.png";

const CardActiviy = styled(Box)(() => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	background: "#fff",
	color: "#3047b0",
	padding: "1rem",
	borderRadius: "20px",
	marginBottom: "3px",

	button: {
		textTransform: "none",
		//border: "1px solid blue",
		borderRadius: "10px",
		padding: ".6rem 1.2rem",
		color: "#3047b0",
		background: "#fff",
		"&:hover": {
			boxShadow: "0px 3px 6px #3047b0",
			background: "#e8e8e8",
		},
	},
}));

const TLChallengeCard = ({ challenge, handleChallenge }) => {
	return (
		<>
			<CardActiviy
				sx={{
					height: "90px",
					backgroundImage: `linear-gradient(90deg, rgba(52, 48, 102, 0.8), rgba(0, 135, 255, 0.2)), url(${image})`,
					backgroundSize: "cover",
				}}
			>
				<Radio
					checked={challenge?.isChecked || false}
					onChange={handleChallenge}
					value={challenge.Description + "-" + challenge.Id}
					name="radio-button"
					inputProps={{ "aria-label": "A" }}
				/>
				<Box width="90%">
					<Typography variant="body1" color="#FFF">
						{challenge.Name}
					</Typography>
				</Box>
			</CardActiviy>
		</>
	);
};

export default TLChallengeCard;

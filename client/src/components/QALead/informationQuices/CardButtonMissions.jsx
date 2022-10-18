import React from "react";
import { Typography, Box, styled, Button } from "@mui/material";
import { BiTrash } from "react-icons/bi";
import { useCountdown } from "../../../Hooks/useCountdown";
import { useEffect } from "react";

const ButtonCard = styled(Button)(() => ({
	display: "flex",
	justifyContent: "space-between",
	padding: ".5rem 1rem ",
	width: "99%",
	margin: "1rem 1rem 0 0.1rem ",
	borderRadius: "10px",
	backgroundColor: "#fff",
	color: "#3047B0",
	"&:hover": {
		boxShadow: "1px 1px 5px #A2A2A2",
	},
	textTransform: "none",
	textAlign: "start",
}));

const CardButtonMissions = ({ miss, removeMission }) => {
	const { DateIni, DateEnd } = miss;
	const [days, hours, minutes, seconds] = useCountdown(DateIni, DateEnd);

	return (
		<ButtonCard
			onClick={() => removeMission(miss)}
			disabled={miss.Status !== 1}
			//disabled={true}
		>
			<Box>
				<Typography variant="body1">{miss.NameMission}</Typography>
				<Typography variant="body2">{miss.Topic}</Typography>
				<Typography variant="caption">
					{days}D-{hours}h:{minutes}m:{seconds}s
				</Typography>
			</Box>

			{miss.Status === 1 && <BiTrash size={20} />}
		</ButtonCard>
	);
};

export default CardButtonMissions;

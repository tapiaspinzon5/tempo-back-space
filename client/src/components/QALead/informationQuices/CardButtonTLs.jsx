import React from "react";
import { Typography, Box, styled, Button } from "@mui/material";
import { IoIosArrowForward } from "react-icons/io";
import { BiTrash } from "react-icons/bi";

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

const CardButtonTLs = ({ tl, icon, handleAgent }) => {
	return (
		<ButtonCard onClick={() => handleAgent(tl.idTeam)}>
			<Box>
				<Typography variant="body1">{tl.NameTeam}</Typography>
				<Typography variant="body2">{`Team Leader: ${tl.TeamLeader}`}</Typography>
			</Box>
			{icon === "arrow" && <IoIosArrowForward size={30} />}
			{icon === "trash" && <BiTrash size={20} />}
		</ButtonCard>
	);
};

export default CardButtonTLs;

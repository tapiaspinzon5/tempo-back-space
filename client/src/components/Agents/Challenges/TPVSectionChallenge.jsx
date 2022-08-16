import React from "react";
import { Typography, styled, Box, Button } from "@mui/material";
import tpv1 from "../../../assets/images/tpv/tpv1.png";
import tpv2 from "../../../assets/images/tpv/tpv2.png";
import tpv3 from "../../../assets/images/tpv/tpv3.png";
import tpv4 from "../../../assets/images/tpv/tpv4.png";
import tpv5 from "../../../assets/images/tpv/tpv5.png";

const tpv = [
	{ image: tpv1 },
	{ image: tpv2 },
	{ image: tpv3 },
	{ image: tpv4 },
	{ image: tpv5 },
];

const BoxTPVUser = styled(Box)(() => ({
	color: "#3047b0",
	display: "flex",
	flexDirection: "column",
	padding: " .5rem",
}));
const CardTPV = styled(Box)(() => ({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	marginBottom: ".551rem",
	backgroundColor: "#FFF",
	borderRadius: "10px",
	overflow: "hidden",
	img: {
		height: "4.5rem",
		margin: ".5rem",
	},
	button: {
		boxShadow: "0px 3px 6px #00000029",
		borderRadius: "10px",
		textTransform: "none",
		padding: ".3rem 2.5rem",
		"&:hover": {
			boxShadow: "0px 3px 6px #3047b0",
			background: "#e9e9e9",
		},
	},
}));

const TPVSectionChallenge = ({ tpvs, handleSubmitTpvs }) => {
	return (
		<BoxTPVUser>
			{tpvs.map((data, index) => (
				<CardTPV key={index}>
					<img
						src={tpv[index].image}
						alt={data.Element}
						style={{ filter: data.Status === 0 && "grayscale(100%)" }}
					/>
					<Box width="60%">
						<Typography variant="body2">{data.TPV}</Typography>
					</Box>
					<Button
						sx={{ color: "#3047B0", mr: "8px" }}
						disabled={data.Status === 1 ? false : true}
						onClick={() => handleSubmitTpvs(data)}
					>
						Send{" "}
					</Button>
				</CardTPV>
			))}
		</BoxTPVUser>
	);
};

export default TPVSectionChallenge;

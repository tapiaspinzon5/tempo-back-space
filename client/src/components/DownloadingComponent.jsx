import React from "react";
import { PongSpinner } from "react-spinners-kit";
import { Typography, Box, styled } from "@mui/material";

const BoxLoading = styled(Box)(() => ({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	h6: {
		color: "#0087FF",
	},
}));

const DownloadingComponent = ({ theme }) => {
	return (
		<BoxLoading>
			<Typography variant="h6" color="initial">
				Downloading {theme}...
			</Typography>
			<PongSpinner size={100} color="#0087FF" />
		</BoxLoading>
	);
};

export default DownloadingComponent;

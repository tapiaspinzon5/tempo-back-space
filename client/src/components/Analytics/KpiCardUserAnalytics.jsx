import React from "react";
import { BsClock, BsPercent } from "react-icons/bs";
import { Box, Typography, styled, Button } from "@mui/material";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import ProgressKPI from "../progressCharts/ProgressKPI";

const BoxCard = styled(Box)(() => ({
	height: "4rem",
	backgroundColor: "white",
	color: "#3047b0",
	display: "flex",
	margin: "1rem 0rem",
	padding: ".5rem",
	borderRadius: "10px",
	boxShadow: "0px 3px 6px #00000029",
}));

const KpiCardUserAnalytics = ({ kpi, setActualKpi, handleKPI }) => {
	const handleChange = () => {
		setActualKpi(kpi);
		handleKPI(kpi.IdRegistryKpi);
	};

	return (
		<BoxCard>
			<Box width="70%">
				<Typography variant="body1">{kpi.Kpi}</Typography>
				<ProgressKPI kpi={kpi} />
			</Box>
			<Box
				display="flex"
				flexDirection="column"
				alignItems="center"
				justifyContent="space-between"
				width="20%"
			>
				{kpi.unitKpi === "Percentage" || kpi.unitKpi === "Avg" ? (
					<BsPercent />
				) : (
					<BsClock />
				)}
				<Typography variant="body1" fontWeight="bold" fontSize="12px">
					{`${kpi.Actual.toFixed(2)} / ${kpi.Target}`}
				</Typography>
				<Typography variant="body1" fontWeight="bold" fontSize="10px">
					{`${kpi.unitKpi}`}
				</Typography>
			</Box>
			<Button
				onClick={handleChange}
				size="small"
				endIcon={<MdOutlineArrowForwardIos size={30} />}
			/>
		</BoxCard>
	);
};

export default KpiCardUserAnalytics;

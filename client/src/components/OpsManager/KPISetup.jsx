import { Box, Typography, styled } from "@mui/material";
import React from "react";
import { ScrollBox } from "../../assets/styled/muistyled";
import KpiSetup from "../SuperAdmin/KpiSetup";

const BoxHead = styled(Box)(() => ({
	display: "flex",
	textAlign: "center",
	marginBottom: "1rem",
	color: "#3047B0",
}));

const KPISetup = ({ kpiWork, setKpiWork, kpisList, setKpisList }) => {
	return (
		<div>
			<>
				<Typography
					variant="h6"
					textAlign="center"
					color="#3047B0"
					marginY={1}
					fontWeight={700}
				>
					KPI's Set up
				</Typography>
				<BoxHead>
					<Box width="10%">
						<Typography variant="body1" fontWeight={700}></Typography>
					</Box>
					<Box width="20%">
						<Typography variant="body1" fontWeight={700}>
							KPI
						</Typography>
					</Box>
					<Box width="10%">
						<Typography variant="body1" fontWeight={700}>
							Critical
						</Typography>
					</Box>
					<Box width="10%">
						<Typography variant="body1" fontWeight={700}>
							Q1
						</Typography>
					</Box>
					<Box width="10%">
						<Typography variant="body1" fontWeight={700}>
							Q2
						</Typography>
					</Box>
					<Box width="10%">
						<Typography variant="body1" fontWeight={700}>
							Q3
						</Typography>
					</Box>
					<Box width="10%">
						<Typography variant="body1" fontWeight={700}>
							Q4
						</Typography>
					</Box>
					<Box width="10%">
						<Typography variant="body1" fontWeight={700}>
							ASC
						</Typography>
					</Box>
					<Box width="10%">
						<Typography variant="body1" fontWeight={700}>
							DSC
						</Typography>
					</Box>
				</BoxHead>
				<ScrollBox height="18rem">
					{kpiWork.map((item, index) => (
						<KpiSetup
							kpi={item}
							kpisList={kpisList}
							setKpisList={setKpisList}
							kpiWork={kpiWork}
							setKpiWork={setKpiWork}
							key={index}
						/>
					))}
				</ScrollBox>
			</>
		</div>
	);
};

export default KPISetup;

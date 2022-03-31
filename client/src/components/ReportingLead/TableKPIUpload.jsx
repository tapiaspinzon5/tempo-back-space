import React from "react";
import { FiCopy } from "react-icons/fi";

import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import {
	BoxBodyTable,
	BoxDataTable,
	BoxHeaderTable,
} from "../../assets/styled/muistyled";
import { toast } from "react-toastify";
import LoadingComponent from "../../components/LoadingComponent";

const TableKPIUpload = ({ dataKPI, tableLoading }) => {
	const handleCopy = async (infoKpi) => {
		await navigator.clipboard.writeText(infoKpi.Kpi + "	" + infoKpi.unitKpi);
		notify();
	};
	const notify = () => {
		toast(
			<div>
				<p>
					<b>Copy to ClipBoard</b>
				</p>
			</div>
		);
	};
	return (
		<Box padding="1rem">
			<BoxHeaderTable>
				<Box sx={{ width: "30%" }}>
					<Typography variant="body1"> KPI</Typography>
				</Box>
				<Box sx={{ width: "60%" }}>
					<Typography variant="body1"> Unit</Typography>
				</Box>
				<Box sx={{ width: "10%" }}></Box>
			</BoxHeaderTable>
			<BoxBodyTable>
				{!tableLoading ? (
					dataKPI.map((kpi, index) => (
						<BoxDataTable key={index}>
							<Box sx={{ width: "30%" }}>
								<Typography variant="body2"> {kpi.Kpi || "No Data"}</Typography>
							</Box>
							<Box sx={{ width: "60%" }}>
								<Typography variant="body2"> {kpi.unitKpi}</Typography>
							</Box>

							<Box sx={{ width: "10%" }}>
								<Tooltip title="Copy KPI Information" placement="top" arrow>
									<IconButton onClick={() => handleCopy(kpi)}>
										<FiCopy size={20} color="#3047B0" />
										{/* <HiOutlineClipboardCopy size={20} color="#3047B0" /> */}
									</IconButton>
								</Tooltip>
							</Box>
						</BoxDataTable>
					))
				) : (
					<LoadingComponent />
				)}
			</BoxBodyTable>
		</Box>
	);
};

export default TableKPIUpload;

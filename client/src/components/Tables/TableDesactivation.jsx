import React, { useState, useEffect, useRef } from "react";
import { Button, styled, Grid } from "@mui/material";

import { BiCheckCircle, BiXCircle } from "react-icons/bi";

import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { ButtonAction } from "../../assets/styled/muistyled";

const BoxTable = styled(Grid)(() => ({
	height: "32rem",
	padding: "1rem",
	"& .super-app-theme--header": {
		borderRadius: "3px",
		height: "2rem",
		color: "#3047b0",
		fontSize: "18px",
		fontWeight: "900",
	},
	"& .super-app-theme--cell": {
		backgroundColor: "#fff",
		color: "#3047b0",
	},
}));

const TableAgentUpload = ({ dataAgent, handleAction }) => {
	const ref = useRef();
	const [width, setWidth] = useState(0);

	let ancho = ref.current !== undefined ? ref.current.clientWidth : 0;

	useEffect(() => {
		setWidth(ancho);
	}, [ancho]);

	const columns = [
		{
			field: "Agent",
			headerName: "Agents",
			width: width < 250 ? 200 : width * 0.3,
			headerClassName: "super-app-theme--header",
			cellClassName: "super-app-theme--cell",
		},
		{
			field: "ident",
			headerName: "CCMS",
			width: width < 250 ? 200 : width * 0.18,
			headerClassName: "super-app-theme--header",
			cellClassName: "super-app-theme--cell",
		},
		{
			field: "dateRequest",
			editable: true,
			headerName: "Request Date",
			width: width < 250 ? 200 : width * 0.28,
			headerClassName: "super-app-theme--header",
			cellClassName: "super-app-theme--cell",
		},
		{
			field: "Estado",
			headerName: "Aprove/Deny",
			width: width < 250 ? 200 : width * 0.2,
			headerClassName: "super-app-theme--header",
			cellClassName: "super-app-theme--cell",
			renderCell: (params) => (
				<Box width=" 100%" display="flex" justifyContent="center">
					<ButtonAction
						onClick={() =>
							handleAction(
								[
									params.row.ident,
									params.row.Agent,
									params.row.RoleAgent,
									params.row.emailUsrRequest,
								],
								"approved",
								params.row
							)
						}
						disabled={params.row.Request}
						sx={{ marginRight: "5px" }}
					>
						<BiCheckCircle color="#3047B0" size={25} />
					</ButtonAction>
					<ButtonAction
						onClick={() =>
							handleAction(
								[
									params.row.ident,
									params.row.Agent,
									params.row.RoleAgent,
									params.row.emailUsrRequest,
								],
								"cancelled"
							)
						}
						disabled={params.row.Request}
						sx={{ marginRight: "5px" }}
					>
						<BiXCircle color="#f00" size={25} />
					</ButtonAction>
				</Box>
			),
		},
	];
	return (
		<>
			<BoxTable ref={ref}>
				<DataGrid
					key={(row) => row.ident}
					rows={dataAgent}
					columns={columns}
					getRowId={(row) => row.ident}
					pageSize={10}
					rowsPerPageOptions={[10]}
				/>
			</BoxTable>
		</>
	);
};

export default TableAgentUpload;

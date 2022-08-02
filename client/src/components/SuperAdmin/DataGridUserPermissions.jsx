import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import { Avatar, Grid, styled } from "@mui/material";
import { GiSandsOfTime } from "react-icons/gi";

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

const DataGridUserPermissions = ({
	dataAgent,
	width,
	setCheckUser,
	setToken,
}) => {
	const columns = [
		{
			field: "Request",
			headerName: "",
			width: 20,
			renderCell: (params) => (
				<div
					style={{ display: "flex", justifyContent: "center", width: "100%" }}
				>
					{/* {console.log(params.row)} */}
					{params.value}
					{params.row.Request ? (
						<GiSandsOfTime color="#3047B0" size={18} />
					) : (
						<input
							type="radio"
							id={params.id}
							name="users"
							value={params.row.Ident}
							onChange={(e) => {
								setCheckUser(e.target.value);
								setToken(params.row.TokenOP);
							}}
							style={{
								height: "1.5rem",
								width: "1.5rem",
							}}
						/>
					)}
				</div>
			),
			headerClassName: "super-app-theme--header",
			cellClassName: "super-app-theme--cell",
		},

		{
			field: "Ident",
			headerName: "CCMS",
			width: width / 10 < 100 ? 100 : width / 13,

			headerClassName: "super-app-theme--header",
			cellClassName: "super-app-theme--cell",
		},
		{
			field: "Agent",
			headerName: "Name",
			width: (2 * width) / 10 < 250 ? 200 : (2 * width) / 10,
			headerClassName: "super-app-theme--header",
			cellClassName: "super-app-theme--cell",
		},
		{
			field: "Team",
			headerName: "Team",
			width: (2 * width) / 10 < 250 ? 200 : (2 * width) / 10,
			headerClassName: "super-app-theme--header",
			cellClassName: "super-app-theme--cell",
		},
		{
			field: "Lob",
			headerName: "LOB",
			width: (2 * width) / 10 < 250 ? 200 : (2 * width) / 10,
			headerClassName: "super-app-theme--header",
			cellClassName: "super-app-theme--cell",
		},
		{
			field: "Campaign",
			headerName: "Campaign",
			width: (2 * width) / 10 < 250 ? 200 : (2 * width) / 10,
			headerClassName: "super-app-theme--header",
			cellClassName: "super-app-theme--cell",
		},
		{
			field: "RoleAgent",
			headerName: "Rol",
			width: (2 * width) / 10 < 250 ? 200 : (2 * width) / 10,
			headerClassName: "super-app-theme--header",
			cellClassName: "super-app-theme--cell",
		},
	];

	return (
		<BoxTable>
			<DataGrid
				getRowId={(row) => row.Ident}
				rows={dataAgent}
				columns={columns}
				pageSize={7}
				rowsPerPageOptions={[7]}
				// checkboxSelection
				// onSelectionModelChange={(e) => {
				//   setCheckUser(e);
				// }}
			/>
		</BoxTable>
	);
};

export default DataGridUserPermissions;

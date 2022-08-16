import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Grid, styled } from "@mui/material";

import avatar from "../../assets/temp-image/avatar.png";

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

const TableLeaderBoardRL = ({ width, data, xpOrkpi }) => {
	const columns = [
		{
			field: "rank",
			headerName: "Rank",
			width: width / 4 < 200 ? 120 : width / 4,
			renderCell: (params) => (
				<>
					{params.value}
					<Avatar
						alt="Remy Sharp"
						src={avatar}
						sx={{ width: 40, height: 40 }}
						style={{ marginLeft: 16 }}
					/>
				</>
			),
			headerClassName: "super-app-theme--header",
			cellClassName: "super-app-theme--cell",
		},
		{
			field: "Name",
			headerName: "User",
			width: (2 * width) / 4 < 200 ? 200 : width / 4,
			headerClassName: "super-app-theme--header",
			cellClassName: "super-app-theme--cell",
		},
		{
			field: "Team",
			headerName: "Team",
			width: width / 4 < 200 ? 230 : width / 4,
			headerClassName: "super-app-theme--header",
			cellClassName: "super-app-theme--cell",
		},
		{
			field: "Level",
			headerName: "level",
			width: width / 4 < 100 ? 100 : width / 4,
			headerClassName: "super-app-theme--header",
			cellClassName: "super-app-theme--cell",
		},
		{
			field: "ExpPoint",
			headerName: "XP Points",
			width: width / 4 < 100 ? 100 : width / 4,
			headerClassName: "super-app-theme--header",
			cellClassName: "super-app-theme--cell",
		},
	];
	return (
		<BoxTable sx={{}}>
			<DataGrid
				rows={data}
				columns={columns}
				pageSize={10}
				rowsPerPageOptions={[10]}
			/>
		</BoxTable>
	);
};

export default TableLeaderBoardRL;

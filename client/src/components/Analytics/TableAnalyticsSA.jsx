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
/* CCMS ID
Name
Role
Team
LOB
Campaign
Level
XP Points
Quartile
Badges Earned
Missions Assigned
Missions Approved
Missions Failed
Missions Score
Missions Questions approved and failed
Challenges Assigned
Challenges Won
KPIs Score (day, week, month) */
const TableAnalyticsSA = ({ width, data }) => {
	const columns = [
		{
			field: "rank",
			headerName: "Rank",
			width: width / 10 < 100 ? 100 : width / 13,
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
			field: "ccmsid",
			headerName: "CCMS ID",
			width: (2 * width) / 10 < 250 ? 200 : (2 * width) / 10,
			headerClassName: "super-app-theme--header",
			cellClassName: "super-app-theme--cell",
		},
		{
			field: "user",
			headerName: "User",
			width: (2 * width) / 10 < 250 ? 200 : (2 * width) / 10,
			headerClassName: "super-app-theme--header",
			cellClassName: "super-app-theme--cell",
		},
		{
			field: "role",
			headerName: "Role",
			width: (2 * width) / 10 < 250 ? 200 : (2 * width) / 10,
			headerClassName: "super-app-theme--header",
			cellClassName: "super-app-theme--cell",
		},
		{
			field: "team",
			headerName: "Team",
			width: width / 10 < 100 ? 150 : width / 11,
			headerClassName: "super-app-theme--header",
			cellClassName: "super-app-theme--cell",
		},
		{
			field: "lob",
			headerName: "LOB",
			width: width / 10 < 10 ? 150 : width / 11,
			headerClassName: "super-app-theme--header",
			cellClassName: "super-app-theme--cell",
		},
		{
			field: "campaign",
			headerName: "Campaign",
			width: width / 10 < 10 ? 150 : width / 11,
			headerClassName: "super-app-theme--header",
			cellClassName: "super-app-theme--cell",
		},
		{
			field: "level",
			headerName: "Level",
			width: width / 10 < 90 ? 100 : width / 13,
			headerClassName: "super-app-theme--header",
			cellClassName: "super-app-theme--cell",
		},
		{
			field: "score",
			headerName: "XP Score",
			width: width / 10 < 90 ? 100 : width / 12,
			headerClassName: "super-app-theme--header",
			cellClassName: "super-app-theme--cell",
		},
		{
			field: "quartile",
			headerName: "Quartile",
			width: width / 10 < 90 ? 100 : width / 12,
			headerClassName: "super-app-theme--header",
			cellClassName: "super-app-theme--cell",
		},
		{
			field: "missionsA",
			headerName: "Missions A",
			width: width / 10 < 90 ? 100 : width / 10,
			headerClassName: "super-app-theme--header",
			cellClassName: "super-app-theme--cell",
		},
		{
			field: "missionsC",
			headerName: "Missions C",
			width: width / 10 < 90 ? 100 : width / 10,
			headerClassName: "super-app-theme--header",
			cellClassName: "super-app-theme--cell",
		},
		{
			field: "missionsF",
			headerName: "Missions F",
			width: width / 10 < 90 ? 100 : width / 10,
			headerClassName: "super-app-theme--header",
			cellClassName: "super-app-theme--cell",
		},
		{
			field: "missionsS",
			headerName: "Missions Score",
			width: width / 10 < 90 ? 150 : width / 10,
			headerClassName: "super-app-theme--header",
			cellClassName: "super-app-theme--cell",
		},
		{
			field: "questionsA",
			headerName: "Questions Approved",
			width: width / 10 < 90 ? 150 : width / 10,
			headerClassName: "super-app-theme--header",
			cellClassName: "super-app-theme--cell",
		},
		{
			field: "questionsF",
			headerName: "Questions Failed",
			width: width / 10 < 90 ? 150 : width / 10,
			headerClassName: "super-app-theme--header",
			cellClassName: "super-app-theme--cell",
		},
		{
			field: "challengesA",
			headerName: "Challenges A",
			width: width / 10 < 100 ? 120 : width / 10,
			headerClassName: "super-app-theme--header",
			cellClassName: "super-app-theme--cell",
		},
		{
			field: "challengesC",
			headerName: "Challenges C",
			width: width / 10 < 100 ? 120 : width / 10,
			headerClassName: "super-app-theme--header",
			cellClassName: "super-app-theme--cell",
		},
		{
			field: "KPIR",
			headerName: "KPI Score",
			width: width / 10 < 90 ? 100 : width / 10,
			headerClassName: "super-app-theme--header",
			cellClassName: "super-app-theme--cell",
		},
	];
	return (
		<BoxTable sx={{}}>
			<DataGrid
				rows={data}
				columns={columns}
				pageSize={7}
				rowsPerPageOptions={[7]}
			/>
		</BoxTable>
	);
};

export default TableAnalyticsSA;

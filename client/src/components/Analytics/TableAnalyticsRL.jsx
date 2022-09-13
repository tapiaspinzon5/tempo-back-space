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

const TableAnalyticsRL = ({ width, data }) => {
  const dataRow = data.map((element) => {
    return { ...element, Quartile: element.Quartile.replace("Q", "T") };
  });

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
      field: "Name",
      headerName: "User",
      width: (2 * width) / 10 < 250 ? 200 : (2 * width) / 10,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "Role",
      headerName: "Role",
      width: (2 * width) / 10 < 250 ? 200 : (2 * width) / 10,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "Team",
      headerName: "Team",
      width: width / 10 < 100 ? 150 : width / 11,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "LOB",
      headerName: "LOB",
      width: width / 10 < 10 ? 150 : width / 11,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "Level",
      headerName: "Level",
      width: width / 10 < 90 ? 100 : width / 13,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "ExpPoint",
      headerName: "XP Score",
      width: width / 10 < 90 ? 100 : width / 12,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "Quartile",
      headerName: "Tenior",
      width: width / 10 < 90 ? 100 : width / 12,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "BadgesEarned",
      headerName: "Badges Earned",
      width: width / 10 < 90 ? 150 : width / 10,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "MissionsAssigned",
      headerName: "Missions A",
      width: width / 10 < 90 ? 100 : width / 10,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "MissionsApproved",
      headerName: "Missions C",
      width: width / 10 < 90 ? 100 : width / 10,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "MissionsFailed",
      headerName: "Missions F",
      width: width / 10 < 90 ? 100 : width / 10,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "MissionsScore",
      headerName: "Missions Score",
      width: width / 10 < 90 ? 150 : width / 10,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "MissionsQuestionsApproved",
      headerName: "Questions Approved",
      width: width / 10 < 90 ? 150 : width / 10,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "MissionsQuestionsFailed",
      headerName: "Questions Failed",
      width: width / 10 < 90 ? 150 : width / 10,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "ChallengesAssigned",
      headerName: "Challenges A",
      width: width / 10 < 100 ? 120 : width / 10,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "ChallengesWon",
      headerName: "Challenges C",
      width: width / 10 < 100 ? 120 : width / 10,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "KpiScore",
      headerName: "KPI Score",
      width: width / 10 < 90 ? 100 : width / 10,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
  ];
  return (
    <BoxTable sx={{}}>
      <DataGrid
        rows={dataRow}
        columns={columns}
        pageSize={7}
        rowsPerPageOptions={[7]}
      />
    </BoxTable>
  );
};

export default TableAnalyticsRL;

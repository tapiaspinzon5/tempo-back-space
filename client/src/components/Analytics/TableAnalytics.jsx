import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Grid, styled } from "@mui/material";

import avatar from "../../assets/temp-image/avatar.png";

const BoxTable = styled(Grid)(() => ({
  //background: "red",
  height: "32rem",
  padding: "1rem",
  "& .super-app-theme--header": {
    //backgroundColor: "#E8E8E8",
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

const TableAnalytics = ({ width, data }) => {
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
      field: "user",
      headerName: "User",
      width: (2 * width) / 10 < 250 ? 200 : (2 * width) / 10,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "team",
      headerName: "Team",
      width: width / 10 < 100 ? 100 : width / 11,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "lob",
      headerName: "LOB",
      width: width / 10 < 10 ? 100 : width / 11,
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
      headerName: "Score",
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
      field: "KPIR",
      headerName: "KPI R",
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

export default TableAnalytics;

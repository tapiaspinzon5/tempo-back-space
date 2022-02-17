import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Grid, styled } from "@mui/material";

import avatar from "../../assets/temp-image/avatar.png";

const BoxTable = styled(Grid)(() => ({
  //background: "red",
  height: "32rem",
  padding: "1rem",
  "& .super-app-theme--header": {
    backgroundColor: "#E8E8E8",
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

const rows = [
  {
    id: 1,
    rank: 1,
    user: "Snow Jhon Alexander",
    team: "Team1",
    level: 35,
    score: 2312,
  },
  {
    id: 2,
    rank: 2,
    user: "Lannister",
    team: "Team1",
    level: 42,
    score: 3234,
  },
  { id: 3, rank: 3, user: "Lannister", team: "Team2", level: 45, score: 3423 },
  { id: 4, rank: 4, user: "Stark", team: "Team1", level: 16, score: 23423 },
  {
    id: 5,
    rank: 5,
    user: "Targaryen",
    team: "Team1",
    level: null,
    score: 5432,
  },
  {
    id: 6,
    rank: 6,
    user: "Melisandre",
    team: "Team2",
    level: 150,
    score: 3241,
  },
  { id: 7, rank: 7, user: "Clifford", team: "Team1", level: 44, score: 348 },
  { id: 8, rank: 8, user: "Frances", team: "Team3", level: 36, score: 2359 },
  { id: 9, rank: 9, user: "Roxie", team: "Team1", level: 65, score: 981 },
];

const TableLeaderBoard = ({ width }) => {
  console.log(width);
  const columns = [
    {
      field: "rank",
      headerName: "Rank",
      width: width / 5 < 120 ? 120 : width / 6,
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
      width: (2 * width) / 5 < 250 ? 250 : width / 3.5,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "team",
      headerName: "Team",
      width: width / 5 < 120 ? 120 : width / 6,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "level",
      headerName: "level",
      width: width / 5 < 120 ? 120 : width / 6,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "score",
      headerName: "Score",
      width: width / 5 < 120 ? 120 : width / 6,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
  ];
  return (
    <BoxTable sx={{}}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={7}
        rowsPerPageOptions={[7]}
      />
    </BoxTable>
  );
};

export default TableLeaderBoard;

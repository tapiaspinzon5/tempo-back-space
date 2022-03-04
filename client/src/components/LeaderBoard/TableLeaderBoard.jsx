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

const TableLeaderBoard = ({ width, data, xpOrkpi }) => {
  //console.log(data);
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
      field: xpOrkpi ? "KPIR" : "score",
      headerName: xpOrkpi ? "KPI R" : "Score",
      width: width / 5 < 120 ? 120 : width / 6,
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

export default TableLeaderBoard;

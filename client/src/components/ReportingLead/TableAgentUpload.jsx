import React, { useState, useEffect, useRef } from "react";
import { IconButton, styled, Grid } from "@mui/material";

import { BsTrash } from "react-icons/bs";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { GiSandsOfTime } from "react-icons/gi";

import { DataGrid } from "@mui/x-data-grid";

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

const TableAgentUpload = ({ dataAgent, handleState }) => {
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
      width: width < 250 ? 200 : width * 0.25,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "Ident",
      headerName: "CCMS",
      width: width < 250 ? 200 : width * 0.15,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "NameTeam",
      editable: true,
      headerName: "Team",
      width: width < 250 ? 200 : width * 0.25,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "idLob",
      headerName: "LOB",
      width: width < 250 ? 200 : width * 0.2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "Estado",
      headerName: "",
      width: width < 250 ? 200 : width * 0.1,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      renderCell: (params) => (
        <IconButton
          onClick={() => handleState(params.row.Ident)}
          disabled={params.row.Request}
        >
          {params.row.Request ? (
            <GiSandsOfTime color="#3047B0" size={18} />
          ) : (
            <BsTrash color="#3047B0" size={18} />
          )}
        </IconButton>
      ),
    },
  ];

  return (
    <>
      <BoxTable ref={ref}>
        <DataGrid
          key={(row) => row.Ident}
          rows={dataAgent}
          columns={columns}
          getRowId={(row) => row.Ident}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </BoxTable>
    </>
  );
};

export default TableAgentUpload;

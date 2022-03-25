import React from "react";
import { FiTrash2 } from "react-icons/fi";

import { Box, Typography, IconButton } from "@mui/material";
import {
  BoxBodyTable,
  BoxDataTable,
  BoxHeaderTable,
} from "../../assets/styled/muistyled";

const TableKPIUpload = ({ dataKPI }) => {
  return (
    <Box padding="1rem">
      <BoxHeaderTable>
        <Box sx={{ width: "30%" }}>
          <Typography variant="body1"> KPI</Typography>
        </Box>
        <Box sx={{ width: "60%" }}>
          <Typography variant="body1"> Description</Typography>
        </Box>
        <Box sx={{ width: "10%" }}></Box>
      </BoxHeaderTable>
      <BoxBodyTable>
        {dataKPI.map((kpi, index) => (
          <BoxDataTable key={index}>
            <Box sx={{ width: "30%" }}>
              <Typography variant="body2"> {kpi.acron}</Typography>
            </Box>
            <Box sx={{ width: "60%" }}>
              <Typography variant="body2"> {kpi.description}</Typography>
            </Box>
            <Box sx={{ width: "10%" }}>
              <IconButton>
                <FiTrash2 size={20} color="#3047B0" />
              </IconButton>
            </Box>
          </BoxDataTable>
        ))}
      </BoxBodyTable>
    </Box>
  );
};

export default TableKPIUpload;

import React from "react";
import { Typography, Box } from "@mui/material";
import {
  BoxBodyTable,
  BoxDataTable,
  BoxHeaderTable,
} from "../../assets/styled/muistyled";

const UsersErrorRL = ({ usersError }) => {
  return (
    <div>
      <Typography variant="h4" color="#3047B0" textAlign="center" marginY={2}>
        Agent upload Error
      </Typography>
      <Typography
        variant="body1"
        color="#3047B0"
        textAlign="center"
        marginY={2}
      >
        The following agents have an error
      </Typography>
      <BoxHeaderTable>
        <Box sx={{ width: "30%" }}>
          <Typography variant="body1">CCMSID</Typography>
        </Box>
        <Box sx={{ width: "40%" }}>
          <Typography variant="body1">Name</Typography>
        </Box>
        <Box sx={{ width: "30%" }}>Status</Box>
      </BoxHeaderTable>
      <BoxBodyTable>
        {usersError.map((user, index) => (
          <BoxDataTable key={index}>
            <Box sx={{ width: "30%" }}>
              <Typography variant="body2"> {user.Idccms}</Typography>
            </Box>
            <Box sx={{ width: "40%" }}>
              <Typography variant="body2">
                {user.NameAgent || "No Data"}
              </Typography>
            </Box>
            <Box sx={{ width: "30%" }}>
              <Typography variant="body2">
                {user.status || "No Data"}
              </Typography>
            </Box>
          </BoxDataTable>
        ))}
      </BoxBodyTable>
      <Typography
        variant="body1"
        color="#3047B0"
        textAlign="center"
        marginY={2}
      >
        Make the corrections and re-upload the file
      </Typography>
    </div>
  );
};

export default UsersErrorRL;

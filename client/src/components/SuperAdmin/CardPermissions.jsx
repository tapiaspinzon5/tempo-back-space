import React from "react";
import { Box, styled } from "@mui/material";
import { ButtonActionBlue } from "../../assets/styled/muistyled";

const BoxPermissions = styled(Box)(() => ({
  height: "4rem",
  width: "500px",
  borderRadius: "10px",
  boxShadow: "3px 3px 8px #A2A2A2",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  textAlign: "center",
  padding: ".5rem",
  input: {
    height: "1.5rem",
    width: "1.5rem",
  },
  label: {
    color: "#3047B0",
    fontWeight: "bold",
  },
}));

const CardPermissions = ({ setRole, permissions }) => {
  return (
    <BoxPermissions>
      {permissions.map((role, index) => (
        <Box key={index}>
          <input
            type="radio"
            id="role"
            name="role"
            value={role.tag}
            onChange={(e) => setRole(e.target.value)}
          />
          <br />
          <label htmlFor="role">{role.rol}</label>
        </Box>
      ))}
      <ButtonActionBlue>Assignment</ButtonActionBlue>
    </BoxPermissions>
  );
};

export default CardPermissions;

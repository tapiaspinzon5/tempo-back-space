import React, { useState } from "react";
import { Avatar, Box, styled, Typography } from "@mui/material";
import { ButtonActionBlue } from "../../assets/styled/muistyled";
import avatarIMG from "../../assets/temp-image/avatar.png";

const BoxPermissions = styled(Box)(() => ({
  position: "relative",
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

const BoxExist = styled(Box)(() => ({
  position: "absolute",
  top: "-4.3rem",
  minHeight: "4rem",
  minWidth: "15rem",
  borderRadius: "10px",
  boxShadow: "1px 1px 5px #A2A2A2",
  background: "#f2f2f2de",
  padding: "5px",
  color: "#3047b0",
}));

const CardPermissions = ({
  setRole,
  role,
  permissions,
  checkUser,
  handleChangeRol,
  setShowAccounts,
  dataAgent,
}) => {
  const [roleExist, setRoleExist] = useState([]);

  const handleRole = (e) => {
    const role = e.target.value;
    setRole(role);
    if (role === "Cluster Director") {
      setShowAccounts(true);
    }
    if (
      role === "Operation Manager" ||
      role === "QA Lead" ||
      role === "Reporting Lead"
    ) {
      const existeRol = dataAgent.filter((user) => user.RoleAgent === role);
      setRoleExist(existeRol);
    } else {
      setRoleExist([]);
    }
  };

  return (
    <BoxPermissions>
      {permissions.map((role, index) => (
        <Box key={index}>
          <input
            type="radio"
            id="role"
            name="role"
            value={role.tag}
            onChange={(e) => handleRole(e)}
            disabled={
              !checkUser.Ident || role.tag === checkUser.RoleAgent
                ? true
                : false
            }
          />
          <br />
          <label htmlFor="role">{role.rol}</label>
        </Box>
      ))}

      <ButtonActionBlue
        onClick={() => {
          handleChangeRol();
          setRoleExist([]);
        }}
      >
        {roleExist.length > 0 ? "Change User" : "Assignment"}
      </ButtonActionBlue>
      {roleExist.length > 0 && (
        <BoxExist>
          <Typography variant="body1">Actual {role}</Typography>
          <Box display="flex" alignItems="center" justifyContent="space-around">
            <Avatar src={avatarIMG} />
            <Typography variant="body2" fontWeight={700}>
              {roleExist[0].Agent}
            </Typography>
          </Box>
        </BoxExist>
      )}
    </BoxPermissions>
  );
};

export default CardPermissions;

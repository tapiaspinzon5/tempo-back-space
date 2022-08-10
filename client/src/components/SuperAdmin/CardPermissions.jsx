import React, { useState } from "react";
import {
  Avatar,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  Typography,
} from "@mui/material";
import { ButtonAction, ButtonActionBlue } from "../../assets/styled/muistyled";
import avatarIMG from "../../assets/temp-image/avatar.png";
import { requestWithData } from "../../utils/api";
import AvatarIMG from "../../assets/temp-image/avatar.png";

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
  top: "4.5rem",
  minHeight: "4rem",
  minWidth: "15rem",
  borderRadius: "10px",
  boxShadow: "1px 1px 5px #A2A2A2",
  background: "#f2f2f2de",
  padding: "5px",
  color: "#3047b0",
  zIndex: 1000,
}));

const BoxTL = styled(Box)(() => ({
  position: "absolute",
  background: "#f2f2f2de",
  color: "#3047b0",
  top: "4.5rem",
  zIndex: 1000,
  width: "300px",
  borderRadius: "10px",
  boxShadow: "3px 3px 8px #A2A2A2",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "1rem",
}));

const CardPermissions = ({
  setRole,
  role,
  permissions,
  checkUser,
  handleChangeRol,
  setShowAccounts,
  dataAgent,
  searchCampaign,
  setRoleSpace,
  teamLeader,
  setTeamLeader,
}) => {
  const [roleExist, setRoleExist] = useState([]);
  const [newTL, setnewTL] = useState(null);
  const [teams, setTeams] = useState([]);
  const [lobs, setLobs] = useState([]);

  const handleRole = (e, roleSpace) => {
    setTeamLeader({});
    setnewTL(null);
    setTeams([]);
    setLobs([]);
    const role = e.target.value;
    setRole(role);
    setRoleSpace(roleSpace);
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

  const handleAccount = async (tl) => {
    setnewTL(tl);

    const data = await requestWithData("getorganizationalunit", {
      context: 2,
      idcampaign: searchCampaign,
    });
    setLobs(data.data[1].Lobs);
    setTeams(data.data[2].Teams);
  };
  return (
    <BoxPermissions>
      {permissions.map((rol, index) => (
        <Box key={index}>
          <input
            type="radio"
            id="role"
            name="role"
            checked={role === rol.tag ? true : false}
            value={rol.tag}
            onChange={(e) => handleRole(e, rol.roleSpace)}
            disabled={
              !checkUser.Ident || rol.tag === checkUser.RoleAgent ? true : false
            }
          />
          <br />
          <label htmlFor="role">{rol.rol}</label>
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
      {role === "Team Leader" && (
        <BoxTL>
          <Box
            marginY={1}
            display="flex"
            justifyContent="space-evenly"
            width={1}
          >
            <ButtonAction
              sx={
                newTL
                  ? {
                      background: "#fff",
                      margin: "0px",
                      height: "2rem",
                      boxShadow: "1px 1px 5px #3047b0",
                    }
                  : { margin: "0px", height: "2rem" }
              }
              onClick={() => handleAccount(true)}
            >
              New Team
            </ButtonAction>
            <ButtonAction
              sx={
                newTL === false
                  ? {
                      background: "#fff",
                      margin: "0px",
                      height: "2rem",
                      boxShadow: "1px 1px 5px #3047b0",
                    }
                  : { margin: "0px", height: "2rem" }
              }
              onClick={() => handleAccount(false)}
            >
              Change TL
            </ButtonAction>
          </Box>

          {newTL && lobs.length > 0 ? (
            <Box width={1} marginY={2}>
              <FormControl fullWidth>
                <InputLabel id="lob-select-label">Select LOB</InputLabel>
                <Select
                  labelId="lob-select-label"
                  id="lob-simple-select"
                  value={teamLeader.idLob || ""}
                  label="Select LOB"
                  // disabled={!error && agent.length !== 0 ? false : true}
                  onChange={(e) => setTeamLeader({ idLob: e.target.value })}
                >
                  {lobs.map((lob) => (
                    <MenuItem value={lob.idLob} key={lob.idLob}>
                      {lob.NameLob}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          ) : (
            ""
          )}
          {!newTL && teams.length > 0 ? (
            <Box width={1} margin={2}>
              <FormControl fullWidth>
                <InputLabel id="team-select-label">Select Team</InputLabel>
                <Select
                  labelId="team-select-label"
                  id="team-simple-select"
                  value={teamLeader.idTeam || ""}
                  label="Select Team"
                  onChange={(e) => setTeamLeader({ idTeam: e.target.value })}
                >
                  {teams.map((team) => (
                    <MenuItem value={team.idTeam} key={team.idTeam}>
                      <Box display="flex">
                        <Avatar src={AvatarIMG} />
                        <Box textAlign="left" marginLeft="8px" color="#3047b0">
                          <Typography variant="body2" fontWeight={700}>
                            {team.NameTL}
                          </Typography>
                          <Typography variant="caption">
                            {team.NameTeam}
                          </Typography>
                        </Box>
                      </Box>{" "}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          ) : (
            ""
          )}
        </BoxTL>
      )}
    </BoxPermissions>
  );
};

export default CardPermissions;

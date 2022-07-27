import React, { useState } from "react";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  styled,
  Avatar,
  Select,
  MenuItem,
} from "@mui/material";
import searchIco from "../../assets/Icons/search-ico.svg";
import avatar from "../../assets/temp-image/avatar.png";
import { ButtonActionBlue } from "../../assets/styled/muistyled";
import { requestWithData } from "../../utils/api";

const BoxUser = styled(Box)(() => ({
  backgroundColor: "white",
  marginBottom: "1rem",
  padding: ".5rem 1rem",
  borderRadius: "10px",
  textAlign: "start",
}));

const BoxPermissions = styled(Box)(() => ({
  margin: "2rem 0",
  height: "4rem",
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
    fontSize: "14px",
    fontWeight: "bold",
  },
}));

const AddUserSuperAdmin = ({ newUser, setNewUser, permissions, campaign }) => {
  const [idccms, setIdccms] = useState("");
  const [error, setError] = useState("");
  const [agent, setAgent] = useState([]);
  const [lobs, setLobs] = useState([]);
  const [teams, setTeams] = useState([]);

  const handleSearchUser = async () => {
    setError("");
    const getData = await requestWithData("getmasterinfoagents", {
      context: 2,
      idccmsAgent: idccms,
    });

    if (getData.data[0]?.StatusGP === "Active") {
      setError("This user is already in a team");
    } else if (getData.data.length === 0) {
      setError("This user does not exist");
    } else {
      setNewUser({ ...newUser, idUser: getData.data[0].ident, context: 1 });
      setAgent(getData.data[0]);
    }
  };

  const handleAccount = async (e) => {
    setNewUser({ ...newUser, idCampaign: [e.target.value] });

    const data = await requestWithData("getorganizationalunit", {
      context: 2,
      idcampaign: e.target.value,
    });
    console.log(data);
    setLobs(data.data[1].Lobs);
    setTeams(data.data[2].Teams);
  };

  const addUser = async (e) => {
    e.preventDefault();
    const createUser = await requestWithData("postinsertrolecampaign", newUser);
    console.log(createUser);
  };

  console.log(newUser);
  console.log(agent);

  return (
    <Box>
      <Typography
        variant="h6"
        color="#3047B0"
        textAlign="center"
        fontWeight={700}
      >
        Add New User
      </Typography>
      <BoxPermissions>
        {permissions.map((role, index) => (
          <Box key={index}>
            <input
              type="radio"
              id="role"
              name="role"
              value={role.tag}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            />
            <br />
            <label htmlFor="role">{role.rol}</label>
          </Box>
        ))}
      </BoxPermissions>
      <form onSubmit={addUser}>
        <Box>
          <Box marginBottom="1rem">
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Search CCMS Id
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type="number"
                value={idccms}
                onChange={(e) => setIdccms(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleSearchUser}
                      edge="end"
                      disabled={idccms ? false : true}
                    >
                      <img src={searchIco} alt="" />
                    </IconButton>
                  </InputAdornment>
                }
                label="Search CCMS Id"
              />
            </FormControl>
          </Box>

          <BoxUser display="flex" alignItems="center">
            {!error && agent.length !== 0 ? (
              <>
                <Avatar
                  alt="User"
                  src={avatar}
                  sx={{ width: 50, height: 50, marginRight: "2rem" }}
                />
                <Box>
                  <Typography variant="body1">{agent.FullName}</Typography>
                  <Typography variant="body2">{agent.Rol}</Typography>
                </Box>
              </>
            ) : (
              <Typography
                variant="caption"
                color="#f00"
                width="100%"
                textAlign="center"
              >
                {error}
              </Typography>
            )}
          </BoxUser>
          <FormControl fullWidth>
            <InputLabel id="campaign-select-label">Select Campaign</InputLabel>
            <Select
              labelId="campaign-select-label"
              id="campaign-simple-select"
              value={newUser.idCampaign || ""}
              label="Select Campaign"
              onChange={(e) => handleAccount(e)}
              disabled={!error && agent.length !== 0 ? false : true}
            >
              {campaign.map((account) => (
                <MenuItem value={account.IdCampaign} key={account.IdCampaign}>
                  {account.nameCampaign}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {newUser.role === "Agent" || newUser.role === "Team Leader" ? (
            <Box marginY={2}>
              <FormControl fullWidth>
                <InputLabel id="lob-select-label">Select LOB</InputLabel>
                <Select
                  labelId="lob-select-label"
                  id="lob-simple-select"
                  value={newUser.idLob || ""}
                  label="Select LOB"
                  disabled={!error && agent.length !== 0 ? false : true}
                  onChange={(e) =>
                    setNewUser({ ...newUser, idLob: e.target.value })
                  }
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
            <></>
          )}
          {newUser.role === "Agent" && (
            <FormControl fullWidth>
              <InputLabel id="team-select-label">Select Team</InputLabel>
              <Select
                labelId="team-select-label"
                id="team-simple-select"
                value={newUser.idTeam || ""}
                label="Select Team"
                disabled={!error && agent.length !== 0 ? false : true}
                onChange={(e) =>
                  setNewUser({ ...newUser, idTeam: e.target.value })
                }
              >
                {teams.map((team) => (
                  <MenuItem value={team.idTeam} key={team.idTeam}>
                    {team.NameTeam}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>

        <Box textAlign="end" marginY={2}>
          <ButtonActionBlue type="submit" sx={{ width: "10rem" }}>
            Add User
          </ButtonActionBlue>
        </Box>
      </form>
    </Box>
  );
};

export default AddUserSuperAdmin;

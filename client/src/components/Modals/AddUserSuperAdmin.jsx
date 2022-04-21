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
import { ButtonActionBlue } from "../../assets/styled/muistyled";

const BoxUser = styled(Box)(() => ({
  backgroundColor: "white",
  marginBottom: "1rem",
  padding: ".5rem 1rem",
  borderRadius: "10px",
  textAlign: "start",
}));

const BoxPermissions = styled(Box)(() => ({
  marginTop: "2rem",
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

const AddUserSuperAdmin = ({ newUser, setNewUser, permissions }) => {
  const [idccms, setIdccms] = useState("");
  const handleSearchUser = () => {
    console.log("buscando Agente");
  };

  const addUser = (e) => {
    e.preventDefault();
    console.log("agregando suario");
  };
  return (
    <Box>
      <Typography variant="h6">Add New User</Typography>
      <form onSubmit={addUser}>
        <Box
        //display="flex" alignItems="center" justifyContent="space-between"
        >
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
            <Avatar
              alt="User"
              src="1.jpg"
              sx={{ width: 50, height: 50, marginRight: "2rem" }}
            />
            <Box>
              <Typography variant="body1">Agent Name</Typography>
              <Typography variant="body2">Agent Cargo</Typography>
            </Box>
          </BoxUser>
          <FormControl fullWidth>
            <InputLabel id="campaign-select-label">Select Campaign</InputLabel>
            <Select
              labelId="campaign-select-label"
              id="campaign-simple-select"
              value={newUser.campaign}
              label="Select Campaign"
              onChange={(e) =>
                setNewUser({ ...newUser, campaign: e.target.value })
              }
            >
              <MenuItem value={"Campaña1"}>Campaña1</MenuItem>
              <MenuItem value={"Campaña2"}>Campaña2</MenuItem>
              <MenuItem value={"Campaña3"}>Campaña3</MenuItem>
              <MenuItem value={"Campaña4"}>Campaña4</MenuItem>
            </Select>
          </FormControl>
          <Box marginY={2}>
            <FormControl fullWidth>
              <InputLabel id="lob-select-label">Select LOB</InputLabel>
              <Select
                labelId="lob-select-label"
                id="lob-simple-select"
                value={newUser.lob}
                label="Select LOB"
                onChange={(e) =>
                  setNewUser({ ...newUser, lob: e.target.value })
                }
              >
                <MenuItem value={"lob1"}>lob1</MenuItem>
                <MenuItem value={"lob2"}>lob2</MenuItem>
                <MenuItem value={"lob3"}>lob3</MenuItem>
                <MenuItem value={"lob4"}>lob4</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <FormControl fullWidth>
            <InputLabel id="team-select-label">Select Team</InputLabel>
            <Select
              labelId="team-select-label"
              id="team-simple-select"
              value={newUser.team}
              label="Select Team"
              onChange={(e) => setNewUser({ ...newUser, team: e.target.value })}
            >
              <MenuItem value={"team1"}>team1</MenuItem>
              <MenuItem value={"team2"}>team2</MenuItem>
              <MenuItem value={"team3"}>team3</MenuItem>
              <MenuItem value={"team4"}>team4</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <BoxPermissions>
          {permissions.map((role, index) => (
            <Box key={index}>
              <input
                type="radio"
                id="role"
                name="role"
                value={role.tag}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
              />
              <br />
              <label htmlFor="role">{role.rol}</label>
            </Box>
          ))}
        </BoxPermissions>
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

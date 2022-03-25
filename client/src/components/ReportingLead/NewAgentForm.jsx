import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  styled,
  Typography,
} from "@mui/material";
import searchIco from "../../assets/Icons/search-ico.svg";

const BoxAssignAgent = styled(Box)(() => ({
  padding: "2rem",
  minHeight: "15rem",
  textAlign: "center",
}));

const BoxUser = styled(Box)(() => ({
  backgroundColor: "white",
  marginBottom: "1rem",
  padding: ".5rem 1rem",
  borderRadius: "10px",
  textAlign: "start",
}));
const BoxButton = styled(Box)(() => ({
  textAlign: "end",
  marginTop: "1rem",
  button: {
    textTransform: "none",
    backgroundColor: "blue",
    color: "#fff",
    borderRadius: "10px",
    padding: ".5rem 1rem",
  },
}));

const NewAgentForm = () => {
  const [idccms, setIdccms] = useState("");
  const [teamLeader, setTeamLeader] = useState("");

  const handleSearchAgent = () => {
    console.log("buscando Agente");
  };

  const handleUserAssign = (e) => {
    e.preventDefault();
    console.log("asignado usuarios");
  };

  console.log(idccms, teamLeader);

  return (
    <BoxAssignAgent>
      <Typography
        variant="subtitle1"
        marginBottom="2rem"
        color="#3047B0"
        fontWeight={700}
      >
        New Agent
      </Typography>
      <form onSubmit={handleUserAssign}>
        <Box marginBottom="1rem">
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Search CCMS Id
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={"text"}
              value={idccms}
              onChange={(e) => setIdccms(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleSearchAgent}
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
            sx={{ width: 60, height: 60, marginRight: "2rem" }}
          />
          <Box>
            <Typography variant="body1">Agent Name</Typography>
            <Typography variant="body2">Agent Cargo</Typography>
          </Box>
        </BoxUser>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Assignment Team Lead
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={teamLeader}
            label="Assignment Team Lead"
            onChange={(e) => setTeamLeader(e.target.value)}
          >
            <MenuItem value={4472074}>Deiby Niño</MenuItem>
            <MenuItem value={471475}>Diego Tapias</MenuItem>
            <MenuItem value={321564}>Daniel Moreno</MenuItem>
          </Select>
        </FormControl>

        <BoxButton>
          <Button type="submit">Assignment</Button>
        </BoxButton>
      </form>
    </BoxAssignAgent>
  );
};

export default NewAgentForm;

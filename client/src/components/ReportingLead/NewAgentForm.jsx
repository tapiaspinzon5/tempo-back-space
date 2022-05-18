import React, { useState, useEffect } from "react";
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
import { getInfoAgent } from "../../utils/api";
import avatar from "../../assets/temp-image/avatar.png";
import { SwapSpinner } from "react-spinners-kit";
import { ButtonActionBlue } from "../../assets/styled/muistyled";

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

const NewAgentForm = ({ dataTeam }) => {
  const [idccms, setIdccms] = useState("");
  const [teamLeader, setTeamLeader] = useState("");
  const [quartile, setQuartile] = useState("");
  const [error, setError] = useState(null);
  const [agent, setAgent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newAgent, setNewAgent] = useState(["Agent"]);

  const getAgentData = async () => {
    setError(null);
    setLoading(true);
    const getData = await getInfoAgent(idccms);
    setAgent(getData.data[0]);
    if (getData.data[0]?.StatusGP === "Active") {
      console.log("esta activo");
      setError("This user is already in a team");
    } else if (getData.data.length === 0) {
      setError("This user does not exist");
    }
    console.log(getData);
    setLoading(false);
  };

  const addAgent = (e) => {
    setNewAgent([...newAgent, e.target.value]);
  };

  const handleUserAssign = (e) => {
    e.preventDefault();
  };

  console.log(agent);
  console.log(newAgent);

  useEffect(() => {
    setNewAgent([quartile, idccms, teamLeader, "Agent"]);
  }, [quartile, idccms, teamLeader]);

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
              error={error ? true : false}
              endAdornment={
                <InputAdornment position="end">
                  {loading ? (
                    <SwapSpinner />
                  ) : (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={getAgentData}
                      edge="end"
                      disabled={!idccms}
                    >
                      <img src={searchIco} alt="" />
                    </IconButton>
                  )}
                </InputAdornment>
              }
              label="Search CCMS Id"
            />
          </FormControl>
          <Typography variant="caption" color="red">
            {error}
          </Typography>
        </Box>

        {agent?.length !== 0 && (
          <BoxUser display="flex" alignItems="center">
            <Avatar
              alt="User"
              src={avatar}
              sx={{ width: 60, height: 60, marginRight: "2rem" }}
            />
            <Box>
              <Typography variant="body1">{agent?.FullName}</Typography>
              <Typography variant="body2">{agent?.Rol}</Typography>
            </Box>
          </BoxUser>
        )}

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Quartile</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={quartile}
            label="Quartile"
            onChange={(e) => setQuartile(e.target.value)}
          >
            <MenuItem value={"Q1"}>Q1</MenuItem>
            <MenuItem value={"Q2"}>Q2</MenuItem>
            <MenuItem value={"Q3"}>Q3</MenuItem>
            <MenuItem value={"Q4"}>Q4</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mt: "10px" }}>
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
            {dataTeam.map((team) => (
              <MenuItem value={team.NameTeam} key={team.idTeam}>
                {team.TeamLeader}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <BoxButton>
          <ButtonActionBlue disabled={error ? true : false} type="submit">
            Assignment
          </ButtonActionBlue>
        </BoxButton>
      </form>
    </BoxAssignAgent>
  );
};

export default NewAgentForm;

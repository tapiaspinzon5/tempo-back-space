import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
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
import { createTeamReportingLead, getInfoAgent } from "../../utils/api";
import avatar from "../../assets/temp-image/avatar.png";
import { SwapSpinner } from "react-spinners-kit";
import { ButtonActionBlue } from "../../assets/styled/muistyled";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

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

const NewAgentForm = ({ dataTeam, getData }) => {
  const [idccms, setIdccms] = useState("");
  const [teamLeader, setTeamLeader] = useState("");
  const [quartile, setQuartile] = useState("");
  const [error, setError] = useState(null);
  const [agent, setAgent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newAgent, setNewAgent] = useState([]);
  const [emails, setEmails] = useState([]);

  const manager = JSON.parse(sessionStorage.getItem("userTP"));

  const getAgentData = async () => {
    setError(null);
    setLoading(true);
    const getData = await getInfoAgent(idccms);

    setAgent(getData.data[0]);
    if (getData.data[0]?.StatusGP === "Active") {
      setError("This user is already in a team");
    } else if (getData.data.length === 0) {
      setError("This user does not exist");
    } else {
      setNewAgent([quartile, idccms, teamLeader, "Agent"]);
      setEmails([
        {
          email: getData.data[0].email,
          manager: manager.Nombre,
          rolManager: "Flight Engineer",
          name: getData.data[0].FullName,
          rol: "Cosmonaut",
        },
      ]);
    }

    setLoading(false);
  };

  const handleUserAssign = async (data) => {
    setError(false);
    if (!newAgent[0] || !newAgent[1] || !newAgent[2] || !newAgent[3]) {
      setError("All fields required!");
      return;
    }
    const resp = await createTeamReportingLead([data], emails);
    if (resp.status === 200) {
      setLoading(false);
      MySwal.fire({
        title: <p>File upload</p>,
        icon: "success",
        confirmButtonText: "Accept",
        allowOutsideClick: false,
      }).then((resultado) => {
        if (resultado.value) {
          getData();
        }
      });
    }
    setNewAgent([]);
    setAgent([]);
    setQuartile("");
    setIdccms("");
    setTeamLeader("");
  };

  useEffect(() => {
    setError(false);

    setNewAgent([quartile, idccms, teamLeader, "Agent"]);
  }, [quartile, teamLeader]);

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
      <form onSubmit={() => handleUserAssign(newAgent)}>
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
              error={error && !idccms ? true : false}
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
          <InputLabel id="quartile-select-label">Quartile</InputLabel>
          <Select
            labelId="quartile-select-label"
            id="quartile-select"
            value={quartile}
            label="Quartile"
            error={error && !quartile ? true : false}
            onChange={(e) => setQuartile(e.target.value)}
            disabled={
              error === "This user is already in a team" ||
              error === "This user does not exist"
                ? true
                : false
            }
          >
            <MenuItem value={"Q1"}>Q1</MenuItem>
            <MenuItem value={"Q2"}>Q2</MenuItem>
            <MenuItem value={"Q3"}>Q3</MenuItem>
            <MenuItem value={"Q4"}>Q4</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mt: "10px" }}>
          <InputLabel id="team-select-label">Assignment Team Lead</InputLabel>
          <Select
            labelId="team-select-label"
            id="team-select"
            value={teamLeader}
            label="Assignment Team Lead"
            error={error && !teamLeader ? true : false}
            onChange={(e) => setTeamLeader(e.target.value)}
            disabled={
              error === "This user is already in a team" ||
              error === "This user does not exist"
                ? true
                : false
            }
          >
            {dataTeam.length > 0 ? (
              dataTeam.map((team) => (
                <MenuItem value={team.NameTeam} key={team.idTeam}>
                  {team.TeamLeader}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="">No data Team</MenuItem>
            )}
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

import React, { useState, useEffect } from "react";
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
import { SwapSpinner } from "react-spinners-kit";
import searchIco from "../../assets/Icons/search-ico.svg";
import avatar from "../../assets/temp-image/avatar.png";
import { ButtonActionBlue } from "../../assets/styled/muistyled";
import { requestWithData } from "../../utils/api";
import SearchDirCampaign from "../SuperAdmin/SearchDirCampaign";
import LoadingComponent from "../LoadingComponent";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

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

const AddUserSuperAdmin = ({
  newUser,
  setNewUser,
  permissions,
  campaign,
  handleClose,
  setShowAccounts,
  setSearchCampaign,
  getData2,
}) => {
  const [idccms, setIdccms] = useState("");
  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [agent, setAgent] = useState([]);
  const [lobs, setLobs] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    if (newUser.role === "Super Admin") {
      setNewUser({
        ...newUser,
        idCampaign: [campaign[0].IdCampaign],
      });
    }
  }, [newUser.role]);

  const handleSearchUser = async () => {
    setSearch(true);
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
      if (newUser.role === "Super Admin") {
        setNewUser({
          ...newUser,
          idUser: getData.data[0].ident,
          context: 1,
          idCampaign: [campaign[0].IdCampaign],
        });
        setSearchCampaign(campaign[0].IdCampaign);
      } else {
        setNewUser({
          ...newUser,
          idUser: getData.data[0].ident,
          context: 1,
        });
      }
      setAgent(getData.data[0]);
    }
    setSearch(false);
  };

  const handleAccount = async (e) => {
    setNewUser({ ...newUser, idCampaign: [e.target.value] });
    setSearchCampaign(e.target.value);
    const data = await requestWithData("getorganizationalunit", {
      context: 2,
      idcampaign: e.target.value,
    });

    setLobs(data.data[1].Lobs);
    setTeams(data.data[2].Teams);
  };

  const addUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    const createUser = await requestWithData("postinsertrolecampaign", newUser);

    if (createUser.status == 200) {
      handleClose();
      setNewUser([]);
      setIdccms("");
      setError("");
      getData2();
      MySwal.fire({
        title: <p>User added succesfully</p>,
        icon: "success",
      });
    } else {
      MySwal.fire({
        title: <p>Houston, we have a problem! </p>,
        icon: "error",
      });
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <Box>
      {loading && (
        <Box
          sx={{
            width: "92%",
            height: "92%",
            background: "#e8e8e8a8",
            position: "absolute",
            zIndex: "10000",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoadingComponent />
        </Box>
      )}
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
              checked={newUser.role === role.tag ? true : false}
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
                      disabled={search || !idccms ? true : false}
                    >
                      <img src={searchIco} alt="" />
                    </IconButton>
                  </InputAdornment>
                }
                label="Search CCMS Id"
              />
            </FormControl>
          </Box>

          <BoxUser
            sx={{
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            {search && <SwapSpinner color="#3047B0" />}
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
              error && (
                <Typography
                  variant="body1"
                  color="#f00"
                  width="100%"
                  textAlign="center"
                >
                  {error}
                </Typography>
              )
            )}
          </BoxUser>
          {newUser.role !== "Cluster Director" &&
          newUser.role !== "Super Admin" ? (
            <FormControl fullWidth>
              <InputLabel id="campaign-select-label">
                Select Campaign
              </InputLabel>
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
          ) : (
            ""
          )}

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

        {newUser.role === "Cluster Director" && (
          <Box
            sx={{
              width: "100%",
              marginTop: "1rem",
              borderRadius: "10px",
              background: "#fff",
              zIndex: 1100,
            }}
          >
            <SearchDirCampaign
              dataCampaign={campaign}
              setShowAccounts={setShowAccounts}
              newUser={newUser}
              setNewUser={setNewUser}
            />
          </Box>
        )}

        <Box textAlign="end" marginY={2}>
          <ButtonActionBlue
            type="submit"
            sx={{ width: "10rem" }}
            disabled={
              newUser.idUser && idccms && newUser.role && newUser.idCampaign
                ? false
                : true
            }
          >
            Add User
          </ButtonActionBlue>
        </Box>
      </form>
    </Box>
  );
};

export default AddUserSuperAdmin;

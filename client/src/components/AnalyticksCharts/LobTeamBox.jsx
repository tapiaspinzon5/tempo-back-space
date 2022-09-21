import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { Box } from "@mui/system";
import {
  ButtonAction,
  ButtonActionBlue,
  InputText,
} from "../../assets/styled/muistyled";
import Typography from "@mui/material/Typography";
import useClickOutside from "../../Hooks/useClickOutside";

const LobTeamCard = styled(Box)(() => ({
  height: "22rem",
  width: "15rem",
  background: "#fff",
  boxShadow: "0px 3px 6px #00000029",
  position: "absolute",
  zIndex: 10000,
  top: "3.5rem",
  borderRadius: "5px",
}));

const BoxSearch = styled(Box)(() => ({
  // marginBottom: "1rem",
  input: {
    padding: "5px 1rem",
    borderRadius: "10px",
    border: "1px solid #0087FF",
    ":focus": {
      color: "#3047B0",
    },
  },
}));
const BoxAccounts = styled(Box)(() => ({
  width: "100%",
  overflow: "scroll",
  "&::-webkit-scrollbar": {
    width: "6px",
  },

  "&::-webkit-scrollbar-track": {
    background: "white",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#e8e8e8",
    borderRadius: "20px",
  },

  label: {
    color: "#3047B0",
  },
}));

const BoxOption = styled(Box)(() => ({
  minHeight: "25px",
  display: "flex",
  alignItems: "center",
  marginTop: "5px",
  borderRadius: "5px",
  padding: "5px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#f9f9f9",
  },
  input: {
    marginRight: "1rem",
  },
}));

const LobTeamBox = ({
  LOBs,
  idLob,
  setIdLob,
  teams,
  idTeam,
  setIdTeam,
  setShowGroup,
  setCaso,
  setAgents,
  setGroup,
}) => {
  const refNav = useRef();
  const [showTeam, setShowTeam] = useState(false);
  const [search, setSearch] = useState("");
  const [dataGroup, setDataGroup] = useState(LOBs);
  const [dataTeam, setDataTeam] = useState(teams);

  //clickoutside
  useClickOutside(refNav, () => {
    setShowGroup(false);
  });

  useEffect(() => {
    setDataGroup(LOBs);
    setDataTeam(teams);
  }, [LOBs, teams]);

  //filtro por input search
  const handleFilter = (e) => {
    setSearch(e.target.value);
    let textIn = e.target.value;
    if (showTeam) {
      const dataFilter = teams.filter((account) =>
        account.NameTeam.toLowerCase().includes(textIn.toLowerCase())
      );
      setDataTeam(dataFilter);
    } else {
      const dataFilter = LOBs.filter((account) =>
        account.NameLob.toLowerCase().includes(textIn.toLowerCase())
      );
      setDataGroup(dataFilter);
    }
  };
  //End filtro potr input search
  const handleClear = () => {
    if (showTeam) {
      setIdTeam([]);
      setGroup("Group");
      setCaso(2);
    } else {
      setIdTeam([]);
      setIdLob([]);
      setGroup("Group");
      setCaso(1);
    }
    setAgents([]);
  };

  return (
    <LobTeamCard ref={refNav}>
      <Box display="flex" justifyContent="space-evenly" marginTop={2}>
        <ButtonAction
          sx={{ height: "2rem", margin: "0", width: "5rem" }}
          onClick={() => setShowTeam(false)}
        >
          LOB
        </ButtonAction>
        <ButtonAction
          sx={{ height: "2rem", margin: "0", width: "5rem" }}
          onClick={() => setShowTeam(true)}
        >
          Team
        </ButtonAction>
      </Box>
      <Box margin={1}>
        <BoxSearch>
          <InputText
            fullWidth
            placeholder="Search"
            value={search}
            onChange={(e) => handleFilter(e)}
          />
        </BoxSearch>
        <BoxAccounts
          sx={{
            height: "200px",
            marginTop: "1rem",
          }}
        >
          {showTeam ? (
            <>
              {dataTeam ? (
                <>
                  {dataTeam.map((camp) => (
                    <BoxOption key={camp.idTeam}>
                      <input
                        type="radio"
                        id="account"
                        name="account"
                        checked={camp.idTeam === idTeam ? true : false}
                        value={camp.idTeam}
                        onChange={() => {
                          setIdTeam(camp.idTeam);
                          setGroup(camp.NameTeam);
                          setCaso(3);
                        }}
                      />
                      <label htmlFor="account">
                        {camp.NameTeam}- {camp.idTeam}
                      </label>
                    </BoxOption>
                  ))}
                </>
              ) : (
                <Typography variant="body1" color="#3047B0" textAlign="center">
                  No data
                </Typography>
              )}
            </>
          ) : (
            <>
              {dataGroup ? (
                <>
                  {dataGroup.map((camp) => (
                    <BoxOption key={camp.idLob}>
                      <input
                        type="radio"
                        id="account"
                        name="account"
                        checked={camp.idLob === idLob ? true : false}
                        value={camp.idLob}
                        onChange={() => {
                          setIdLob(camp.idLob);
                          setGroup(camp.NameLob);
                          setCaso(2);
                        }}
                      />
                      <label htmlFor="account">{camp.NameLob}</label>
                    </BoxOption>
                  ))}
                </>
              ) : (
                <Typography variant="body1" color="#3047B0" textAlign="center">
                  No data
                </Typography>
              )}
            </>
          )}
        </BoxAccounts>
        <Box display="flex" justifyContent="space-between">
          <ButtonActionBlue
            onClick={() => handleClear()}
            sx={{ width: "6rem" }}
          >
            Clear {showTeam ? "Team" : "LOB"}
          </ButtonActionBlue>
          <ButtonActionBlue
            onClick={() => setShowGroup(false)}
            sx={{ width: "6rem" }}
          >
            Acept
          </ButtonActionBlue>
        </Box>
      </Box>
    </LobTeamCard>
  );
};

export default LobTeamBox;

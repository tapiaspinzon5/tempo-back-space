import React, { useState } from "react";
import {
  Box,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  TextField,
  Typography,
  styled,
  Button,
} from "@mui/material";
// mport { DatePicker } from "@mui/x-date-pickers/DatePicker";
// mport AdapterDateFns from "@mui/lab/AdapterDateFns";
// mport { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import SearchComponent from "./SearchComponent";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import LobTeamBox from "./LobTeamBox";
import { ButtonActionBlue } from "../../assets/styled/muistyled";
import { optionCharts } from "../../helpers/helperOptionsCharts";
import SelectAnalytics from "./SelectAnalytics";

const BoxGroup = styled(Box)(() => ({
  border: "1px solid #c8c8c8",
  //width: "48%",
  width: "48%",
  height: "3.5rem",
  borderRadius: "4px",
  display: "flex",
  // flexDirection: "column",
  // justifyContent: "center",
  cursor: "pointer",
  position: "relative",
  "&:hover": {
    border: "1px solid #696969",
  },
}));

const NavChartsAnalytics = ({
  Role,
  kpiData,
  missionsData,
  accounts,
  idcampaign,
  setIdcampaign,
  LOBs,
  idLob,
  setIdLob,
  teams,
  idTeam,
  setIdTeam,
  date1,
  setDate1,
  date2,
  setDate2,
  setAgents,
  agents,
  setAgent,
  setSelectKpi,
  handleConsulta,
  setContext,
  setCaso,
  setIdMission,
  idMission,
  selectKpi,
  agent,
  group,
  setGroup,
}) => {
  const [showGroup, setShowGroup] = useState(false);
  const [motherDropDown, setMotherDropDown] = useState("");
  const info = optionCharts(Role);

  return (
    <Box sx={{ marginTop: "1rem" }}>
      <FormControl fullWidth>
        <InputLabel id="info-select-label">Info</InputLabel>
        <Select
          labelId="info-select-label"
          id="info-simple-select"
          value={motherDropDown || ""}
          label="Info"
          onChange={(e) => {
            setMotherDropDown(e.target.value);
            setContext(e.target.value);
          }}
        >
          {info.map((type) => (
            <MenuItem value={type.context} key={type.context}>
              {type.type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box
        marginTop={1}
        sx={{
          display: "flex",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            sx={{ width: "100%" }}
            label="Start"
            value={date1}
            onChange={(newValue) => {
              setDate1(
                newValue
                  ? `${newValue.getFullYear()}-${
                      newValue.getMonth() + 1
                    }-${newValue.getDate()}`
                  : null
              );
            }}
            renderInput={(params) => (
              <TextField {...params} sx={{ width: "48%", marginRight: "4%" }} />
            )}
          />
          <DatePicker
            minDate={new Date(date1)}
            label="End"
            value={date2}
            onChange={(newValue) => {
              setDate2(
                newValue
                  ? `${newValue.getFullYear()}-${
                      newValue.getMonth() + 1
                    }-${newValue.getDate()}`
                  : null
              );
            }}
            renderInput={(params) => (
              <TextField {...params} sx={{ width: "48%" }} />
            )}
          />
        </LocalizationProvider>
      </Box>
      <Box marginTop={1} display="flex">
        {Role === "Super Admin" || Role === "Cluster Director" ? (
          <FormControl sx={{ width: "48%", marginRight: "4%" }}>
            <InputLabel id="campaign-select-label">Campaign</InputLabel>
            <Select
              labelId="campaign-select-label"
              id="campaign-simple-select"
              value={idcampaign || ""}
              label="Campaign"
              disabled={date1 && date2 ? false : true}
              onChange={(e) => {
                setIdcampaign(e.target.value);
                setCaso(1);
              }}
            >
              {accounts.map((type) => (
                <MenuItem value={type.IdCampaign} key={type.IdCampaign}>
                  {type.nameCampaign}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          ""
        )}

        {Role !== "Team Leader" && (
          <BoxGroup
            sx={
              showGroup
                ? {
                    border: "2px solid #3047B0",
                    "&:hover": {
                      border: "2px solid #3047B0",
                    },
                  }
                : {}
            }
          >
            <Button
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                textTransform: "none",
              }}
              disabled={date1 && date2 ? false : true}
              margin="0 1rem"
              onClick={() => setShowGroup(true)}
            >
              <Typography
                variant="body1"
                color="#686868"
                sx={{
                  width: "100%",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  textAlign: "left",
                }}
              >
                {group}
              </Typography>
              {showGroup ? (
                <IoMdArrowDropup size={18} />
              ) : (
                <IoMdArrowDropdown size={18} />
              )}
            </Button>

            {showGroup && (
              <LobTeamBox
                LOBs={LOBs}
                idLob={idLob}
                setIdLob={setIdLob}
                teams={teams}
                idTeam={idTeam}
                setIdTeam={setIdTeam}
                setShowGroup={setShowGroup}
                setCaso={setCaso}
                setAgents={setAgents}
                setGroup={setGroup}
              />
            )}
          </BoxGroup>
        )}
      </Box>

      <Box>
        {/* KPIS */}
        {motherDropDown === 1 && (
          <>
            {/* <SearchComponent
              label="KPI"
              dataSearch={kpiData}
              context="kpi"
              setSelectKpi={setSelectKpi}
              selectKpi={selectKpi}
              disabled={kpiData?.length > 0 ? false : true}
            /> */}

            <SelectAnalytics
              label="KPI"
              dataSearch={kpiData}
              context="kpi"
              setSelectKpi={setSelectKpi}
              selectKpi={selectKpi}
              disabled={kpiData?.length > 0 ? false : true}
            />

            <SearchComponent
              label="Agents"
              dataSearch={agents}
              context="agents"
              setAgent={setAgent}
              setCaso={setCaso}
              agent={agent}
              disabled={agents?.length > 0 ? false : true}
            />
          </>
        )}

        {/* Missions */}
        {/* {motherDropDown === 2 && <SearchComponent label="Missions" />} */}
        {/* questions */}
        {motherDropDown === 3 && (
          <SearchComponent
            label="Missions"
            dataSearch={missionsData}
            context="missions"
            idMission={idMission}
            setIdMission={setIdMission}
            disabled={missionsData?.length > 0 ? false : true}
          />
        )}
        {/* challenges */}
        {motherDropDown === 4 && (
          <SelectAnalytics
            label="KPI"
            dataSearch={kpiData}
            context="kpi"
            setSelectKpi={setSelectKpi}
            selectKpi={selectKpi}
            disabled={kpiData?.length > 0 ? false : true}
          />
        )}
      </Box>
      <Box textAlign="end" marginY={3}>
        <ButtonActionBlue onClick={handleConsulta} sx={{ width: "8rem" }}>
          Show
        </ButtonActionBlue>
      </Box>
    </Box>
  );
};

export default NavChartsAnalytics;

{
  /* <SearchComponent
            label="KPI"
            dataSearch={kpiData}
            context="kpi"
            setSelectKpi={setSelectKpi}
            disabled={kpiData?.length > 0 ? false : true}
          /> */
}

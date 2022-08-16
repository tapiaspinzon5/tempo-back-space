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
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import SearchComponent from "./SearchComponent";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import LobTeamBox from "./LobTeamBox";
import { ButtonActionBlue } from "../../assets/styled/muistyled";

const BoxGroup = styled(Box)(() => ({
  border: "1px solid #c8c8c8",
  width: "48%",
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

const info = [
  { type: "KPIS", context: 1 },
  { type: "Missions", context: 2 },
  { type: "Questions", context: 3 },
  { type: "Challenges", context: 4 },
  { type: "Usage Data", context: 5 },
];

const NavChartsAnalytics = ({
  kpiData,
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
  agents,
  setAgent,
  setSelectKpi,
  handleConsulta,
  setContext,
}) => {
  const [showGroup, setShowGroup] = useState(false);
  const [motherDropDown, setMotherDropDown] = useState("");
  console.log(motherDropDown);
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
            console.log(e);
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

      <Box marginTop={1} display="flex">
        <FormControl sx={{ width: "48%", marginRight: "4%" }}>
          <InputLabel id="campaign-select-label">Campaign</InputLabel>
          <Select
            labelId="campaign-select-label"
            id="campaign-simple-select"
            value={idcampaign || ""}
            label="Campaign"
            onChange={(e) => setIdcampaign(e.target.value)}
          >
            {accounts.map((type) => (
              <MenuItem value={type.IdCampaign} key={type.IdCampaign}>
                {type.nameCampaign}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            margin="0 1rem"
            onClick={() => setShowGroup(true)}
          >
            <Typography variant="body1" color="#686868">
              Group
            </Typography>
            {showGroup ? (
              <IoMdArrowDropup size={18} />
            ) : (
              <IoMdArrowDropdown size={18} />
            )}
          </Box>

          {showGroup && (
            <LobTeamBox
              LOBs={LOBs}
              idLob={idLob}
              setIdLob={setIdLob}
              teams={teams}
              idTeam={idTeam}
              setIdTeam={setIdTeam}
              setShowGroup={setShowGroup}
            />
          )}
        </BoxGroup>
      </Box>
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
      <Box>
        {/* KPIS */}
        {motherDropDown === 1 && (
          <>
            <SearchComponent
              label="Agents"
              dataSearch={agents}
              context="agents"
              setAgent={setAgent}
            />
            <SearchComponent
              label="KPI"
              dataSearch={kpiData}
              context="kpi"
              setSelectKpi={setSelectKpi}
            />
          </>
        )}

        {/* Missions */}
        {/* {motherDropDown === 2 && <SearchComponent label="Missions" />} */}
        {/* questions */}
        {motherDropDown === 3 && <SearchComponent label="Questions" />}
        {/* challenges */}
        {motherDropDown === 4 && <SearchComponent label="KPI" />}
        {/* Usage Data */}
        {motherDropDown === 5 && <SearchComponent label="Type Of Info" />}
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

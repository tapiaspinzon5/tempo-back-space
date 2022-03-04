import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  styled,
} from "@mui/material";

const BoxFormControl = styled(FormControl)(() => ({
  width: "8rem",
  margin: "2rem 0 0 2rem",
}));

const BoxSelect = styled(Box)(() => ({
  marginBottom: "1rem",
  color: "red",
}));

const LeaderRankBoard = ({ kpis, setFilters, leaderBoard }) => {
  const [kpiFilter, setKpiFilter] = useState("");
  const [timeFilter, setTimeFilter] = useState("Day");
  const [groupFilter, setGroupFilter] = useState("My Team");
  return (
    <>
      <BoxSelect>
        <BoxFormControl>
          <InputLabel id="kpi-label">Kpi</InputLabel>
          <Select
            labelId="kpi-label"
            value={kpiFilter}
            label="Kpi"
            onChange={(e) => {
              setKpiFilter(e.target.value);
              setFilters({
                kpi: e.target.value,
                time: timeFilter,
                group: groupFilter,
              });
            }}
          >
            {leaderBoard && <MenuItem value="">EXP Points</MenuItem>}
            {kpis.map((kpi, index) => (
              <MenuItem key={index + kpi.Kpi} value={kpi.Kpi}>
                {kpi.Kpi}
              </MenuItem>
            ))}
         
          </Select>
        </BoxFormControl>
        <BoxFormControl>
          <InputLabel id="time-label">Time View</InputLabel>
          <Select
            labelId="time-label"
            value={timeFilter}
            label="Time View"
            onChange={(e) => {
              setTimeFilter(e.target.value);
              setFilters({
                kpi: kpiFilter,
                time: e.target.value,
                group: groupFilter,
              });
            }}
          >
            <MenuItem value="Day">Day</MenuItem>
            <MenuItem value="Week">Week</MenuItem>
            <MenuItem value="Month">Month</MenuItem>
          </Select>
        </BoxFormControl>
        <BoxFormControl>
          <InputLabel id="time-label">Group</InputLabel>
          <Select
            labelId="group-label"
            value={groupFilter}
            label="Group"
            onChange={(e) => {
              setGroupFilter(e.target.value);
              setFilters({
                kpi: kpiFilter,
                time: timeFilter,
                group: e.target.value,
              });
            }}
          >
            <MenuItem value="My Team">My Team</MenuItem>
            <MenuItem value="My Lob">My LOB</MenuItem>
            <MenuItem value="My Campaign">My Campaign</MenuItem>
          </Select>
        </BoxFormControl>
      </BoxSelect>
  
    </>
  );
};

export default LeaderRankBoard;

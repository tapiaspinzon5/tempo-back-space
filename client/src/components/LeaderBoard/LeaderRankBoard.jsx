import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  styled,
} from "@mui/material";
import TableLeaderBoard from "./TableLeaderBoard";

const BoxFormControl = styled(FormControl)(() => ({
  width: "8rem",
  margin: "2rem 0 0 2rem",
}));

const BoxSelect = styled(Box)(() => ({
  marginBottom: "1rem",
  color: "red",
}));

const LeaderRankBoard = () => {
  const [kpiFilter, setKpiFilter] = useState("");
  const [timeFilter, setTimeFilter] = useState("");
  const [groupFilter, setGroupFilter] = useState("");

  console.log(kpiFilter, timeFilter, groupFilter);
  return (
    <>
      <BoxSelect>
        <BoxFormControl>
          <InputLabel id="kpi-label">Kpi</InputLabel>
          <Select
            labelId="kpi-label"
            value={kpiFilter}
            label="Kpi"
            onChange={(e) => setKpiFilter(e.target.value)}
          >
            <MenuItem value="aht">%AHT</MenuItem>
            <MenuItem value="qa">QA</MenuItem>
            <MenuItem value="ahd">Ahd</MenuItem>
          </Select>
        </BoxFormControl>
        <BoxFormControl>
          <InputLabel id="time-label">Time View</InputLabel>
          <Select
            labelId="time-label"
            value={timeFilter}
            label="Time View"
            onChange={(e) => setTimeFilter(e.target.value)}
          >
            <MenuItem>Day</MenuItem>
            <MenuItem value="week">Week</MenuItem>
            <MenuItem value="mont">Month</MenuItem>
          </Select>
        </BoxFormControl>
        <BoxFormControl>
          <InputLabel id="time-label">Group</InputLabel>
          <Select
            labelId="time-label"
            value={groupFilter}
            label="Group"
            onChange={(e) => setGroupFilter(e.target.value)}
          >
            <MenuItem value="team">My Team</MenuItem>
            <MenuItem value="lob">My LOB</MenuItem>
            <MenuItem value="campaing">My Campaing</MenuItem>
          </Select>
        </BoxFormControl>
      </BoxSelect>
      {/* <TableLeaderBoard /> */}
    </>
  );
};

export default LeaderRankBoard;
